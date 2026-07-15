# Admin

## Purpose
Author + manage problems and their testcases. Also create Battleground rooms.

## Routes
- Problems list → `/app/admin/problems` (was `/Admin`).
- Add problem → `/app/admin/problems/new` (was `/Question/add`).
- Add testcases → `/app/admin/problems/[id]/testcases` (was `/Question/testcase/[id]`).
- Add battleground room + up to 4 problems → `/app/admin/battlegrounds/new` (was `/Battleground/AddProblem`).

## Add-problem form fields
- `p_title` (text, required)
- `p_content` (textarea, required, markdown allowed)
- `p_author` (text, required — should later be auto-set to the signed-in user)
- `p_difficulty` (select: 1 Easy / 2 Medium / 3 Hard)

## Add-testcase form fields
- `input_case` (textarea, required)
- `output_case` (textarea, required)
- `is_public` (radio: true/false)
- `p_id` (from route)

## Battleground add-problem flow (`AddProblem.js`)
- Cap at 4 problems per room, enforced client-side.
- For each problem: title, content, author, difficulty, N testcases.
- Submit-all calls `POST /battlefield/add_problem/` per problem and `POST /arena/add_testcase/` per testcase.
- Any single failure → toast + keep the rest.

## Rebuild notes
- All forms use `react-hook-form` + `zod` (both in stack).
- Validation errors shown inline, not `alert()`.
- Use a shared `ProblemForm` component reused by "new problem" and "add battleground problem".
- Testcase editor is a repeater with add/remove; keep last row focused after add.
- Show a live preview of the markdown content on the right (uses `react-markdown`).
- Optimistic list update after create (React Query mutate + invalidate).
