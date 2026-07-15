# Migration plan — greenfield rebuild

## Prep (from your machine, outside the sandbox)
1. Back up the branch: `git switch -c archive/legacy-cmx && git push -u origin archive/legacy-cmx`.
2. On `main` (or a new `feat/redesign`), delete everything except `.git`, `README.md`, `public/`:
   ```
   git rm -rf src package.json package-lock.json tsconfig.json \
     next.config.mjs postcss.config.js tailwind.config.js .env
   ```
3. Commit as `chore: reset codebase for greenfield rebuild`.

## Bootstrap
```
npx create-next-app@latest . --typescript --app --tailwind --eslint \
  --src-dir --import-alias "@/*" --use-npm --no-git
```
Then align versions in `package.json` per `docs/07-tech-stack.md`:
```
npm i motion clsx tailwind-merge lucide-react zod \
      react-hook-form @hookform/resolvers \
      @tanstack/react-query axios \
      embla-carousel-react cobe recharts react-markdown next-themes
```

## Files to bring back from this doc
Everything in `docs/` — treat it as the spec.
Legacy code has already been mined for what's worth keeping:
- Types (`src/types/API.ts`, `src/types/Socket.ts`) → move to `src/lib/api/types.ts`.
- API surface (`src/utils/ProblemAPI.ts`, `src/utils/battlefield-apis/*`) → split into `src/lib/api/problems.ts` + `src/lib/api/battle.ts`.
- WebSocket hook → new `src/hooks/use-websocket.ts`, deduped.
- Static difficulty map → `src/lib/problems/difficulty.ts` (extend to Hard).

## Order of operations
1. **Design system + tokens** — `globals.css`, `cn`, `Container`, `Section`, `Button`, `Card`, `SectionHeading`, `Wordmark`.
2. **Auth** — env-based session, login page, proxy, `requireSession`.
3. **Marketing homepage** — Navbar, Hero, LogoCloud, Features, Showcase, Stats, Timeline, Testimonials, FAQ, CTA, Footer.
4. **App shell** — sidebar + topbar + protected layout.
5. **Dashboard** — StatCards, chart, activity, problems list.
6. **Playground** — Monaco + Output panel + WS hook.
7. **Arena** — problem view + testcases + submit results.
8. **Battleground** — list + join gate + play + leaderboard.
9. **Profile** — mock now; wire real endpoint later.
10. **Admin** — problems CRUD + testcase editor + battleground authoring.

## Definition of done (per surface)
- Route works in `next build`.
- Zero `any`.
- Loading, empty, error states.
- Mobile pass at 320/768/1024/1440.
- No console warnings in production build.
- Keyboard-navigable primary actions.

## Env / secrets
- Nothing lives in the frontend beyond `NEXT_PUBLIC_BACKEND_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `AUTH_SECRET`.
- `.env.example` committed. `.env.local` gitignored.

## Ship checklist
- Lighthouse ≥ 95 across the board on landing.
- `next build` clean.
- `tsc --noEmit` clean.
- Route smoke-test: `/`, `/login`, `/app`, `/app/playground`, `/app/problems`, `/app/problems/<id>`, `/app/battlegrounds`, `/app/battlegrounds/<room>`, `/app/battlegrounds/<room>/play/<user>`, `/app/profile/<u>`, `/app/admin/problems`.
