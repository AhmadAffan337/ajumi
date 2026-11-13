import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "seo_admin_token";
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.SEO_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEO_ADMIN_PASSWORD;

async function signJwt(payload: object): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const data = `${encodedHeader}.${encodedPayload}`;

  if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is missing");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  return `${data}.${encodedSignature}`;
}

async function verifyJwt(token: string): Promise<boolean> {
  try {
    if (!JWT_SECRET) return false;
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const [header, payload, signature] = parts;
    const data = `${header}.${payload}`;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const base64 = signature.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4 ? "=".repeat(4 - (base64.length % 4)) : "";
    const binary = atob(base64 + pad);
    const sigBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      sigBytes[i] = binary.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(data));
    if (!isValid) return false;

    const parsedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    if (parsedPayload.exp && Date.now() / 1000 > parsedPayload.exp) return false;

    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (
      ADMIN_EMAIL &&
      ADMIN_PASSWORD &&
      email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim() &&
      password === ADMIN_PASSWORD
    ) {
      const jwtToken = await signJwt({
        role: "admin",
        sub: "seo-manager",
        email: ADMIN_EMAIL,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      });

      const response = NextResponse.json({ success: true, message: "Authenticated successfully" });

      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: jwtToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`${AUTH_COOKIE_NAME}=([^;]+)`));
  const token = match ? match[1] : null;

  const isAuthenticated = token ? await verifyJwt(token) : false;

  if (isAuthenticated) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
