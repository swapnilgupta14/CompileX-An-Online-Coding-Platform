# Battleground

## Purpose
Time-boxed multi-question room. Up to 4 problems per room. Live leaderboard by testcases passed.

## Routes
- List → `/app/battlegrounds` (was `/Battleground/Battles`).
- Join gate → `/app/battlegrounds/[room]` (was `/Battleground/[id]`).
- Play → `/app/battlegrounds/[room]/play/[user]` (was `/Battleground/play/[room]/[user]`).
- Author flow → `/app/admin/battlegrounds/new`, `/app/admin/battlegrounds/[room]/problems`.

## Flow
1. User opens room URL.
2. Prompted for display name → `POST /battlefield/get_user_id/` returns a `user_id`.
3. Redirect to `/play/[room]/[user]`.
4. Fetch problems in room: `GET /battlefield/get_problem_by_room/?room_id=<>`.
5. WS opens to `/battle/code_execute/[room_id]/` — this stream carries both `runner` and `leaderboard` events.
6. WS `/pg/code_execute` also used for the "custom input" tab.

## Play screen
- Left: current problem statement + testcases + tab switcher (`QUESTION` | `LEADERBOARD`).
- Right: Monaco editor (per-question code buffer — array indexed by `currentQuesIndex`).
- Bottom: output panel (test outputs, custom output).
- Top: problem pager (1..N), timer (needs `end_time` from room), name/uid badge.

## Anti-cheat & UX guards
- Disable paste? — not in spec; skip.
- Warn on tab-blur? — nice-to-have.
- Confirm on refresh (unsaved code).
- Persist code buffer per `(room_id, user_id, p_id)` in `localStorage` (helper already exists).

## Rebuild notes
- Consolidate `useWebSocket` + `useLeaderBoardSocket` into one hook with a discriminated `event` union.
- Fix current bug: `WebSocket("http://...")` should be `WebSocket("ws://...")` — old code concatenates `NEXT_PUBLIC_BACKEND_URL` (http) directly. Add a helper `wsUrl(path)` that swaps scheme.
- Handle disconnect + reconnect gracefully (exponential backoff, max 5 attempts).
- Move leaderboard into a right-side collapsible drawer, not a tab, so it stays visible.
