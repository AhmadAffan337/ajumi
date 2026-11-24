"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { CONTACT_SERVICES, CONTACT_BUDGETS, contactSchema } from "@/lib/contact-schema";

type Status = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<string, string>>;

const inputClass =
  "mt-2 w-full bg-transparent border-b py-3 focus:border-ember outline-none transition-colors";

function FieldError({ message, id }: { message?: string; id: string }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="mt-2 block text-xs text-[#ff5a2a]">
      {message}
    </span>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      services: fd.getAll("services").map(String),
      budget: fd.get("budget") ? String(fd.get("budget")) : undefined,
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      startedAt: startedAt.current || Date.now(),
      page: window.location.pathname,
    };

    // Same rules as the server, so most mistakes are caught instantly.
    const check = contactSchema.safeParse(payload);
    if (!check.success) {
      const errs: FieldErrors = {};
      for (const issue of check.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      setFormError("Please check the highlighted fields.");
      setStatus("error");
      return;
    }

    setFieldErrors({});
    setFormError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      setFieldErrors(data.fieldErrors ?? {});
      setFormError(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32 grid md:grid-cols-5 gap-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="md:col-span-2 space-y-8"
      >
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4">Studio</div>
          <p className="text-white/80 leading-relaxed">876 70th Street,<br /> Brooklyn, NY 11228-1013<br />United States</p>
        </div>
        <div className="space-y-4 text-sm">
          {[
            { icon: Phone, label: "+1 (888) 511-9194", href: "tel:+18885119194" },
            { icon: Mail, label: "sales@ajumiai.com", href: "mailto:sales@ajumiai.com" },
            { icon: MapPin, label: "Book a video call", href: "#" },
          ].map((c) => (
            <a key={c.label} href={c.href} className="flex items-center gap-4 group">
              <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-ember group-hover:text-ember transition-colors">
                <c.icon className="w-4 h-4" />
              </span>
              <span className="text-white/80 group-hover:text-ember transition-colors">{c.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-ember transition-colors" />
            </a>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10 text-xs uppercase tracking-[0.25em] text-white/40">
          Response time: within 1 business day
        </div>
      </motion.div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          role="status"
          className="md:col-span-3 flex flex-col items-start justify-center gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-10"
        >
          <CheckCircle2 className="w-10 h-10 text-ember" />
          <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
            Thanks, your message is <span className="text-ember italic">on its way</span>.
          </h3>
          <p className="text-white/60 leading-relaxed max-w-lg">
            Our team will reply within 1 business day. If it&apos;s urgent, call us at{" "}
            <a href="tel:+18885119194" className="text-white hover:text-ember transition-colors">+1 (888) 511-9194</a>.
          </p>
        </motion.div>
      ) : (
        <motion.form
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="md:col-span-3 space-y-8"
        >
          {/* Honeypot: hidden from people, bots tend to fill it in. */}
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.25em] text-white/50">Your name</span>
              <input
                name="name"
                required
                type="text"
                autoComplete="name"
                maxLength={100}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "err-name" : undefined}
                className={`${inputClass} ${fieldErrors.name ? "border-[#ff5a2a]" : "border-white/20"}`}
              />
              <FieldError id="err-name" message={fieldErrors.name} />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.25em] text-white/50">Work email</span>
              <input
                name="email"
                required
                type="email"
                autoComplete="email"
                maxLength={200}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "err-email" : undefined}
                className={`${inputClass} ${fieldErrors.email ? "border-[#ff5a2a]" : "border-white/20"}`}
              />
              <FieldError id="err-email" message={fieldErrors.email} />
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.25em] text-white/50">Company</span>
            <input
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={150}
              aria-invalid={!!fieldErrors.company}
              className={`${inputClass} ${fieldErrors.company ? "border-[#ff5a2a]" : "border-white/20"}`}
            />
            <FieldError id="err-company" message={fieldErrors.company} />
          </label>

          <fieldset>
            <legend className="text-xs uppercase tracking-[0.25em] text-white/50">What do you need?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONTACT_SERVICES.map((s) => (
                <label key={s} className="cursor-pointer">
                  <input type="checkbox" name="services" value={s} className="peer sr-only" />
                  <span className="inline-block px-4 py-2 rounded-full border border-white/15 text-sm text-white/70 hover:border-ember peer-checked:bg-ember peer-checked:text-black peer-checked:border-ember peer-focus-visible:ring-2 peer-focus-visible:ring-ember/60 transition-colors">
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs uppercase tracking-[0.25em] text-white/50">Budget</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONTACT_BUDGETS.map((b) => (
                <label key={b} className="cursor-pointer">
                  <input type="radio" name="budget" value={b} className="peer sr-only" />
                  <span className="inline-block px-4 py-2 rounded-full border border-white/15 text-sm text-white/70 hover:border-ember peer-checked:bg-ember peer-checked:text-black peer-checked:border-ember peer-focus-visible:ring-2 peer-focus-visible:ring-ember/60 transition-colors">
                    {b}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.25em] text-white/50">Tell us about your project</span>
            <textarea
              name="message"
              rows={4}
              maxLength={5000}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "err-message" : undefined}
              className={`${inputClass} resize-none ${fieldErrors.message ? "border-[#ff5a2a]" : "border-white/20"}`}
            />
            <FieldError id="err-message" message={fieldErrors.message} />
          </label>

          {status === "error" && formError && (
            <div role="alert" className="rounded-lg border border-[#ff5a2a]/40 bg-[#ff5a2a]/[0.06] px-4 py-3 text-sm text-white/80">
              {formError}{" "}
              <span className="text-white/50">
                You can also email us at{" "}
                <a href="mailto:sales@ajumiai.com" className="text-white underline hover:text-ember">sales@ajumiai.com</a>.
              </span>
            </div>
          )}

          <div className="pt-4">
            <CTAButton type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </CTAButton>
          </div>
        </motion.form>
      )}
    </section>
  );
}
