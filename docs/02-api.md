# API — REST + WebSocket

Base URL: `NEXT_PUBLIC_BACKEND_URL` (default `http://18.60.99.56:8000`).
All REST responses use this envelope:
```ts
{ error: boolean, responseData: T | string, status_code: number }
```

## REST — /arena
| Method | Path | Body / Query | Purpose |
|---|---|---|---|
| GET | `/arena/get_problem/` | — | List all problems (paged: `count`, `next`, `previous`, `results`). |
| GET | `/arena/get_problem_by_id/?p_id=<id>` | — | Single problem. |
| POST | `/arena/add_problem/` | `{p_title, p_content, p_author, p_difficulty}` | Create problem. |
| DELETE | `/arena/delete_problem/` | `{p_id}` (in body) | Delete problem. |
| GET | `/arena/get_testcase/?pid=<id>` | — | Public testcases for a problem. |
| GET | `/arena/get_testcase_battle/?pid=<id>` | — | Testcases in battle context. |
| POST | `/arena/add_testcase/` | `{p_id, input_case, output_case, is_public}` | Add testcase. |
| POST | `/arena/delete_testcase/` | `{data: {...}}` | Delete testcase (⚠ current impl wraps args in `data`, worth cleaning up). |

## REST — /battlefield
| Method | Path | Body | Purpose |
|---|---|---|---|
| POST | `/battlefield/create_room/` | `{b_name, start_time, end_time}` | Create battleground room. |
| POST | `/battlefield/add_problem/` | `{p_title, p_content, p_author, p_difficulty, room_id}` | Add problem to room. |
| POST | `/battlefield/get_user_id/` | `{name, room_id}` | Assign a user id for the room (used as anonymous handle). |
| GET | `/battlefield/get_problem_by_room/?room_id=<id>` | — | List problems in room. |

## WebSocket
Full URL: `NEXT_PUBLIC_BACKEND_URL + <path>` (over `ws://` — hence the "Insecure Content" README).

### `/pg/code_execute` — Playground execute
- **Req**: `{ code, input }`
- **Res**: `{ error, responseData: { error, data: { exec_time, message, output } | { details, message } }, status }`

### `/arena/code_execute` — Arena submit-against-testcases
- **Req**: `{ code, p_id }`
- **Res**: `{ error, responseData: TestResult[], status }` where
  ```ts
  TestResult = { error, data: { message, output, error, exec_time }, t_id, expected_out?, user_input?, passed }
  ```

### `/battle/code_execute/[room_id]/` — Battleground submit
- **Req**: `{ code, p_id, uid }`
- **Res**: `{ event: "runner"|"leaderboard", error, responseData: TestResult[] | string, status }`
- Leaderboard events are delivered on the same socket; UI ignores them here (see `useLeaderBoardSocket`).

### Leaderboard socket
- Separate hook (currently a copy-paste of `useWebSocket` — collapse into one).
- Room path is the same battle socket; frames tagged `event: "leaderboard"`.

## Notes for the rebuild
- Wrap everything in typed clients: `problems.ts`, `battle.ts`, `execution.ts`.
- Replace the two duplicate WS hooks with one generic `useWebSocket<Req,Res>`.
- Add explicit `event` discriminator in Battle response types.
- Every request currently uses raw `axios` with 5s timeout — keep it, but add error toasts.
