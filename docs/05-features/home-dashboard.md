# Home / Dashboard

## Purpose
Landing after sign-in. Get to work in one click.

## Route
`/app` (was `/Home`).

## Blocks
1. **Greeting header** — "Good to see you, {name}." + today's date. Short.
2. **Quick actions** — 3 large tiles: Arena, Battleground, Playground. Icon + title + 1-sentence description + hover lift.
3. **Problems list** — current API: `GET /arena/get_problem/`.
   - Table columns: `Title`, `Author`, `Difficulty`, `Actions (Solve / Edit if admin)`.
   - Sort by difficulty, filter by difficulty, search by title (client-side; API has no filter params).
4. **(optional) Recent activity** — feed of your submissions. Blocked on backend endpoint; leave as empty state with "Coming soon".

## Rebuild notes
- Move the 3-card block above the fold.
- Table: sticky header, keyboard-navigable rows, `→ Solve` chip on hover.
- Empty state for problems list must be first-class (no problems yet).
- Loading state: shimmer rows, not spinner.

## Current mistakes to not repeat
- Old dashboard hard-codes bright pastel backgrounds on cards (`#FFD199` etc.). Redesign: white cards, black icon, hover lift only.
- Old dashboard mixes Redux, `useSelector((state) => state.changeTab.tab.payload)` — this was for the sidebar. In the rebuild, sidebar is stateless (URL-driven); Redux goes.
