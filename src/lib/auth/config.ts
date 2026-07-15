/**
 * Reads and validates required auth env vars. Access via the getters so
 * `.env.local` reloads are always picked up on the next request.
 */

function required(name: string): string {
  const v = process.env[name];
  if (!v || v.length === 0) {
    throw new Error(
      `Missing required environment variable: ${name}. See .env.example.`,
    );
  }
  return v;
}

export function getAuthConfig() {
  return {
    adminEmail: required("ADMIN_EMAIL"),
    adminPassword: required("ADMIN_PASSWORD"),
    secret: required("AUTH_SECRET"),
  } as const;
}

/** Non-throwing variant, useful in middleware where absence should just 401. */
export function tryGetAuthConfig() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.AUTH_SECRET;
  if (!adminEmail || !adminPassword || !secret) return null;
  return { adminEmail, adminPassword, secret } as const;
}
