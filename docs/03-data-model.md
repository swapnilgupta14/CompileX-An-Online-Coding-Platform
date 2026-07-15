# Data model

Types as they exist today in `src/types/API.ts` and `src/types/Socket.ts`. Field names come from the Django backend — do not rename in the frontend.

## Problem
```ts
interface Problem {
  p_id: string;
  p_title: string;
  p_content: string;    // markdown-ish
  p_author: string;
  p_likes: number;
  p_difficulty: 1 | 2 | 3;  // 1 easy, 2 medium, 3 hard
  created_at: string;   // ISO
}
```

## Testcase
```ts
interface Testcase {
  p_id: string;
  input_case: string;
  output_case: string;
  is_public: boolean;
}
```

## Paginated problem list
```ts
{ count: number; next: string|null; previous: string|null; results: Problem[] }
```

## Battleground question (subset of Problem)
```ts
interface BattleGroundQues {
  p_id: string;
  p_title: string;
  p_content: string;
  p_author: string;
  p_difficulty: string;  // ⚠ note: string here, number in Problem — reconcile
}
```

## Room
- Backend fields: `b_name`, `start_time`, `end_time`, `room_id`.
- Frontend doesn't have a formal type yet. **Create one** in the rebuild:
  ```ts
  interface Room {
    room_id: string;
    b_name: string;
    start_time: string; // ISO
    end_time: string;   // ISO
    status?: "upcoming" | "ongoing" | "completed"; // derived client-side
  }
  ```

## Leaderboard row
```ts
interface LeaderboardRow {
  rank: number;
  uid_name: string;
  total_testcases_passed: number;
}
```

## Execution result (per testcase)
```ts
interface TestResult {
  error: boolean;
  data: { message: string; output: string; error: string; exec_time: number };
  t_id: number;
  expected_out?: string;
  user_input?: string;
  passed: boolean;
}
```

## Difficulty display
Currently only mapped for 1 and 2 in `Static.ts`. Add 3 (Hard) mapping in the rebuild.
| Value | Label | Suggested badge |
|---|---|---|
| 1 | Easy | neutral-100 text-neutral-800 |
| 2 | Medium | ring-1 ring-neutral-400 |
| 3 | Hard | bg-neutral-950 text-white |

## Gaps to close
- No formal User/Profile type — the Profile page is 100% mocked. Design one when the backend endpoint lands.
- No Submission history type — Profile currently invents it inline.
- `p_difficulty` inconsistency (number vs string) between Problem and BattleGroundQues.
