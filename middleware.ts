import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "seo_admin_token";
const JWT_SECRET = process.env.JWT_SECRET;

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude login page itself from authentication redirect to prevent infinite redirect loop
  if (pathname === "/seo-manager/login") {
    return NextResponse.next();
  }

  // Protect /seo-manager page route
  if (pathname.startsWith("/seo-manager")) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isValid = token ? await verifyJwt(token) : false;

    if (!isValid) {
      // Redirect unauthenticated request to /seo-manager/login
      const loginUrl = new URL("/seo-manager/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /api/seo endpoints (except public GETs if needed)
  if (pathname.startsWith("/api/seo") && request.method !== "GET") {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isValid = token ? await verifyJwt(token) : false;

    if (!isValid) {
      return NextResponse.json(
        { error: "Unauthorized access. Valid session cookie required." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/seo-manager/:path*", "/api/seo/:path*"],
};
