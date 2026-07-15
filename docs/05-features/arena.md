# Arena

## Purpose
Solve one specific problem. See public testcases. Submit code, get per-testcase pass/fail with output diff.

## Routes
- List → `/app/problems` (was `/Home`).
- Detail → `/app/problems/[id]` (was `/Arena/[id]`).

## Data
- `GET /arena/get_problem_by_id/?p_id=<id>` → problem
- `GET /arena/get_testcase/?pid=<id>` → public testcases only
- WS `/arena/code_execute` → submit against all testcases (incl. hidden)
- WS `/pg/code_execute` → "custom input" tab, same as Playground

## Layout (target)
Split view:
```
+-------------------------+---------------------------+
|  Problem statement      |  Editor                   |
|  Difficulty badge       |  Language / theme / size  |
|  Public testcases       |                           |
|  (inputs + outputs)     |                           |
|                         +---------------------------+
|                         |  Output tabs              |
|                         |  [Test results] [Custom]  |
+-------------------------+---------------------------+
```
- Mobile: stack; tabs switch between problem / editor / output.

## States
- Loading problem (skeleton).
- Loading testcases.
- Editor idle.
- Submission running (`LOADING`).
- Result rendered (`OUTPUT`) — per-case chips: passed = neutral-950 bg, failed = ring-1 red.

## Rebuild notes
- Render problem markdown with `react-markdown` (already in stack) — the current `<p>` dump is not enough for real problem statements.
- Add a "copy problem statement" affordance.
- Difficulty badge + author + createdAt in a single meta row.
- Testcase list collapses; expand shows input/output.
- Add a "Reset code" button that restores the starter.
- No auto-save yet, but a debounce hook to persist code per `p_id` in `localStorage` (safe: not auth-sensitive).
