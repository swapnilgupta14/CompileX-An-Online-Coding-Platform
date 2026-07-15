import { NextResponse, type NextRequest } from "next/server";
import { readSession, SESSION_COOKIE } from "@/lib/auth/session";
import { tryGetAuthConfig } from "@/lib/auth/config";

/**
 * Protects /app/* — redirects unauthenticated requests to /login with a
 * ?next= parameter so we can bounce back after signing in.
 */
export async function proxy(req: NextRequest) {
  const config = tryGetAuthConfig();
  if (!config) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "unconfigured");
    return NextResponse.redirect(url);
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await readSession(token, config.secret);

  if (!session) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
