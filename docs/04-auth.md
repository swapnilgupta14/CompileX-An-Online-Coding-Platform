# Auth

## Current state (broken)
- `_app.js` reads `localStorage.authToken` on mount, redirects.
- Landing "Sign In" button writes a hard-coded `dummyToken` and pushes to `/Home`.
- No server-side check anywhere.
- No API sends the token in requests — backend accepts anything.
- Verdict: this is placeholder auth. Kill it.

## Target — env-based auth (interim)
Simple, HttpOnly cookie based, server-verified. Swappable for a real provider later.

### Env vars (`.env.local`)
```
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=change-me
AUTH_SECRET=<64 random hex>
```

### Pieces
- `src/lib/auth/session.ts` — HMAC-signed cookie via Web Crypto (`base64url(JSON).base64url(sig)`), 7-day expiry.
- `src/lib/auth/server.ts` — `createSession`, `destroySession`, `getSession`, `requireSession`, `verifyCredentials` (constant-time compare).
- `src/lib/auth/config.ts` — reads/validates env, throws early on missing values.
- `src/proxy.ts` (Next 16 rename of `middleware.ts`) — matches `/app/:path*`, redirects unauth to `/login?next=...`.
- `src/app/(auth)/login/page.tsx` + `LoginForm.tsx` + `actions.ts` — server-action login, zod validation, useActionState.
- `src/app/logout/actions.ts` — server action, clears cookie, redirects `/login`.

### Cookie
- Name: `cmx_session`
- `HttpOnly; SameSite=Lax; Path=/; Secure` (only in production).
- Max-Age: 7 days.
- Never touched from client JS. No `localStorage` for auth.

### Swap path (for real auth later)
Everything goes through `getSession()` and `requireSession()`. Replace their implementations to hit your DB/provider — routes and components don't change.

## Post-login redirect
- Login form takes `?next=` query. Validates it starts with `/` and not `//` before redirecting (open-redirect guard). Default target: `/app`.
