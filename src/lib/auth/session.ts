/**
 * Minimal, dependency-free signed session using Web Crypto (works in Node
 * and Edge runtimes). Token layout: base64url(JSON) . base64url(HMAC-SHA256).
 *
 * Swap path: change `signSession`/`readSession` to hit a DB or a real
 * provider — callers only see `getSession()` and `createSession()`.
 */

const encoder = new TextEncoder();

export interface SessionPayload {
  sub: string; // subject — the admin email
  iat: number; // issued at (seconds)
  exp: number; // expiry (seconds)
}

function b64urlEncode(input: ArrayBuffer | Uint8Array | string): string {
  const bytes =
    typeof input === "string"
      ? encoder.encode(input)
      : input instanceof Uint8Array
        ? input
        : new Uint8Array(input);
  let bin = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    bin += String.fromCharCode(bytes[i]!);
  }
  return btoa(bin).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64urlDecode(input: string): Uint8Array {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function sign(secret: string, data: string): Promise<string> {
  const sig = await crypto.subtle.sign(
    "HMAC",
    await importKey(secret),
    encoder.encode(data),
  );
  return b64urlEncode(sig);
}

async function verify(
  secret: string,
  data: string,
  signature: string,
): Promise<boolean> {
  // Copy into a fresh Uint8Array<ArrayBuffer> to satisfy the strict BufferSource
  // typing that Web Crypto expects.
  const sigBytes = b64urlDecode(signature);
  const sigBuf = new Uint8Array(sigBytes.byteLength);
  sigBuf.set(sigBytes);
  return crypto.subtle.verify(
    "HMAC",
    await importKey(secret),
    sigBuf,
    encoder.encode(data),
  );
}

export async function signSession(
  payload: SessionPayload,
  secret: string,
): Promise<string> {
  const body = b64urlEncode(JSON.stringify(payload));
  const sig = await sign(secret, body);
  return `${body}.${sig}`;
}

export async function readSession(
  token: string | undefined,
  secret: string,
): Promise<SessionPayload | null> {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const ok = await verify(secret, body, sig);
  if (!ok) return null;
  try {
    const bytes = b64urlDecode(body);
    const json = new TextDecoder().decode(bytes);
    const payload = JSON.parse(json) as SessionPayload;
    if (typeof payload.exp !== "number") return null;
    if (Math.floor(Date.now() / 1000) > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "cmx_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
