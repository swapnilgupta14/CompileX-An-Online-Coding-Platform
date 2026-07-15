# CompileX — Overview

## What it is
- Competitive coding platform for practice + live 1-v-1/room battles.
- Frontend: this Next.js repo. Backend: Django REST + WebSocket at `NEXT_PUBLIC_BACKEND_URL` (currently `http://18.60.99.56:8000`).
- Old repo name: `code-editor`. Product name: CompileX (also spelled "Compilex").

## Core surfaces
- **Landing** — public marketing page, sign-in.
- **Home** (`/Home`) — dashboard: 3 hero cards (Arena, Battleground, Playground) + problems list.
- **Playground** (`/Editor`) — free-form Monaco editor, run code with custom input via WebSocket.
- **Arena** (`/Arena/[id]`) — single-problem practice: problem statement, testcases, editor, run/submit.
- **Battleground** (`/Battleground/Battles`, `/Battleground/[id]`, `/Battleground/play/[room]/[user]`) — multi-question timed rooms with live leaderboard.
- **Profile** (`/Profile/[username]`) — user stats, submission heatmap, recent submissions, achievements.
- **Admin** (`/Admin`) — CRUD questions, add testcases (`/Question/add`, `/Question/testcase/[id]`).

## Users
- **Player** — signs in, practices in Playground/Arena, joins Battlegrounds.
- **Admin** — adds problems and testcases.
- **Room creator** — spins up a Battleground room, adds up to 4 problems.

## Non-goals (of the redesign)
- Not touching the Django backend.
- Not adding new capabilities beyond what the routes above already promise.
- Not preserving any legacy styling — full redesign.

## Success criteria for the rebuild
- Modern App Router, React 19, TS strict, Tailwind v4.
- Every current route works end-to-end against the existing API.
- Auth actually works (env-based for now, swappable later).
- Design system feels like Linear/Vercel/Stripe/Apple — minimal, premium, calm.
- Portfolio-quality landing page.

## File map (see other docs)
- `01-routes.md` — every route, its purpose, its data.
- `02-api.md` — REST + WebSocket contracts.
- `03-data-model.md` — Problem, Testcase, Room, User, Submission shapes.
- `04-auth.md` — current (broken) auth + target env-based auth.
- `05-features/` — one file per surface (Playground, Arena, Battleground, Home, Profile, Admin, Landing).
- `06-design-system.md` — colors, type, motion, components.
- `07-tech-stack.md` — packages, structure, conventions.
- `08-migration-plan.md` — how to greenfield from the current state.
