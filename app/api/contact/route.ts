import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, MIN_FILL_TIME_MS, type ContactData } from "@/lib/contact-schema";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "sales@ajumiai.com";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/* ---------- Rate limiting (in-memory, per server instance) ---------- */

const rateLimiter = createRateLimiter({ max: 5, windowMs: 10 * 60 * 1000 });

/* ---------- Email formatting ---------- */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip characters that could break an email header. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function buildEmail(data: ContactData, submittedAt: string) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Services", data.services.length ? data.services.join(", ") : "—"],
    ["Budget", data.budget ?? "—"],
    ["Message", data.message || "—"],
    ["Page", data.page || "—"],
    ["Submitted", submittedAt],
  ];

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#111;max-width:640px">
    <h2 style="margin:0 0 16px">New website lead</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([label, value]) => `
        <tr>
          <td style="border:1px solid #e5e5e5;background:#fafafa;font-weight:bold;width:120px;vertical-align:top">${label}</td>
          <td style="border:1px solid #e5e5e5;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`
        )
        .join("")}
    </table>
    <p style="color:#666;font-size:12px;margin-top:16px">Reply to this email to respond directly to ${escapeHtml(data.name)}.</p>
  </div>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const company = data.company ? ` (${data.company})` : "";
  const subject = headerSafe(`New lead: ${data.name}${company}`).slice(0, 200);

  return { html, text, subject };
}

/* ---------- Handler ---------- */

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bot checks: pretend success so bots don't learn they were caught.
  const raw = (body ?? {}) as Record<string, unknown>;
  const startedAt = typeof raw.startedAt === "number" ? raw.startedAt : 0;
  const elapsed = Date.now() - startedAt;
  if ((typeof raw.website === "string" && raw.website.length > 0) || elapsed < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  if (rateLimiter.isLimited(getClientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  if (!resend || !CONTACT_FROM_EMAIL) {
    console.error("[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL is not configured.");
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now." },
      { status: 500 }
    );
  }

  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" }) + " ET";
  const { html, text, subject } = buildEmail(parsed.data, submittedAt);

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      replyTo: parsed.data.email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message right now." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] Unexpected send failure:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
