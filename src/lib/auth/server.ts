import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  readSession,
  signSession,
  type SessionPayload,
} from "./session";
import { getAuthConfig } from "./config";

/** Constant-time string compare — prevents user-enumeration via timing. */
function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let out = 0;
  for (let i = 0; i < ab.length; i++) out |= ab[i]! ^ bb[i]!;
  return out === 0;
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const { adminEmail, adminPassword } = getAuthConfig();
  return (
    timingSafeEqual(email.trim().toLowerCase(), adminEmail.toLowerCase()) &&
    timingSafeEqual(password, adminPassword)
  );
}

export async function createSession(email: string): Promise<void> {
  const { secret } = getAuthConfig();
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: email.toLowerCase(),
    iat: now,
    exp: now + SESSION_MAX_AGE,
  };
  const token = await signSession(payload, secret);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const { secret } = getAuthConfig();
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  return readSession(token, secret);
}

/** For Server Components: bounce to /login if no session. */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
    // Unreachable — redirect throws.
    throw new Error("redirect");
  }
  return session;
}
