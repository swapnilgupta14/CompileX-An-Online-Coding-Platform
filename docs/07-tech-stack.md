# Tech stack

## Framework
- Next.js 16 (App Router, Turbopack).
- React 19.
- TypeScript strict.

## Styling
- TailwindCSS v4 (CSS-first config in `src/app/globals.css`, no `tailwind.config.js`).
- `clsx` + `tailwind-merge` via a `cn()` helper.

## Motion
- `motion` (formerly `framer-motion`) — `motion/react`.

## Forms
- `react-hook-form`
- `zod`
- `@hookform/resolvers`

## Data
- `@tanstack/react-query` for REST caching + mutations.
- `axios` for the HTTP client (already used by legacy).
- Native `WebSocket` wrapped in a typed hook.

## Icons
- `lucide-react` only. No `react-icons`, no Flaticon.

## Extras (installed but selective use)
- `embla-carousel-react` — Testimonials.
- `cobe` — optional globe if we do a "global leaderboard" section later.
- `recharts` — dashboard charts (default), submission stats.
- `react-markdown` — problem statements, changelog.
- `next-themes` — reserved (no dark mode in v1, but we don't want to fight the setup later).

## Project structure
```
src/
  app/
    (auth)/login/           # login page + action + form
    app/                    # protected shell + dashboard
      layout.tsx            # sidebar + topbar + requireSession()
      page.tsx              # dashboard
      playground/
      problems/
      problems/[id]/
      battlegrounds/
      battlegrounds/[room]/
      battlegrounds/[room]/play/[user]/
      profile/[username]/
      admin/
    logout/actions.ts
    layout.tsx              # root
    page.tsx                # marketing landing
    globals.css
  components/
    ui/                     # design system primitives
    marketing/              # landing sections
    dashboard/              # /app widgets
    coding/                 # editor, output panel, testcase list, leaderboard
    forms/                  # ProblemForm, TestcaseForm, LoginForm
  lib/
    auth/                   # session, config, server
    api/                    # typed clients (problems.ts, battle.ts, execution.ts)
    site.ts                 # nav + copy + brand
    cn.ts
  hooks/
    use-scroll.ts
    use-in-view-count.ts
    use-websocket.ts        # single, typed, discriminated events
    use-persisted-code.ts
  proxy.ts                  # Next 16 middleware replacement
```

## Conventions
- Server Components by default; add `"use client"` only when needed.
- No Redux. State lives in the URL, in React Query, or in local component state.
- No `localStorage` for auth. `localStorage` OK for UI prefs and per-problem code buffers.
- All API calls go through typed clients in `lib/api/`. No `axios.get` sprinkled across pages.
- Env variables read via `getAuthConfig()`-style helpers, not raw `process.env` in components.
- One WebSocket hook, generic `<Req, Res>`, with `event` discriminator.
- Alias imports with `@/*` → `src/*`.
- Strict TS. `noUncheckedIndexedAccess: false` for now (Recharts data).
