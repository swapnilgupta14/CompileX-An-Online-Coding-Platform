# Routes

## Public
| Route | Purpose | Notes |
|---|---|---|
| `/` | Landing page | Hero + features + footer. "Sign in" sets dummy token, redirects to `/Home`. |

## Authenticated
| Route | Purpose | Data source |
|---|---|---|
| `/Home` | Dashboard: 3 nav cards + problems list | `GET /arena/get_problem/` |
| `/Editor` | Standalone Monaco playground | WS `/pg/code_execute` |
| `/Arena/[id]` | Solve one problem | `GET /arena/get_problem_by_id/`, `GET /arena/get_testcase/`, WS `/arena/code_execute`, WS `/pg/code_execute` |
| `/Battleground/Battles` | List ongoing/upcoming/completed contests | Currently mock — needs real endpoint. |
| `/Battleground/[id]` | Enter-name gate for room | `POST /battlefield/get_user_id/` |
| `/Battleground/play/[room]/[user]` | Live multi-question room | `GET /battlefield/get_problem_by_room/`, WS `/battle/code_execute/[room]/`, WS `/pg/code_execute` + leaderboard WS |
| `/Profile/[username]` | Stats + heatmap | Currently 100% mock — needs profile endpoint. |

## Admin / Author
| Route | Purpose | Data source |
|---|---|---|
| `/Admin` | List problems, edit/delete | `GET /arena/get_problem/`, `DELETE /arena/delete_problem/` |
| `/Question/add` | Add a problem | `POST /arena/add_problem/` |
| `/Question/testcase/[id]` | Add testcases for a problem | `GET /arena/get_testcase/`, `POST /arena/add_testcase/` |
| `/Battleground/AddProblem` (with `?RoomId=`) | Add up to 4 problems + testcases to a room | `POST /battlefield/add_problem/`, `POST /arena/add_testcase/` |

## Route conventions after redesign (App Router)
- Marketing at `/` (public).
- App at `/app/*` (protected).
- Auth at `/login`, `/logout`.
- Suggested paths post-rename:
  - `/app` → dashboard
  - `/app/playground`
  - `/app/problems`, `/app/problems/[id]`
  - `/app/battlegrounds`, `/app/battlegrounds/[room]`, `/app/battlegrounds/[room]/play`
  - `/app/profile/[username]`
  - `/app/admin/problems`, `/app/admin/problems/new`, `/app/admin/problems/[id]/testcases`
