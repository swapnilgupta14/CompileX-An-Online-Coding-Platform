/**
 * Backend types. Field names come from the Django backend — do not rename
 * them in the frontend.
 */

export interface ApiResponse {
  error: boolean;
  responseData: string;
  status_code: number;
}

export interface ApiResponseFormatted<T> {
  error: boolean;
  responseData: T;
  status_code: number;
}

export type Difficulty = 1 | 2 | 3; // 1 Easy, 2 Medium, 3 Hard

export interface Problem {
  p_id: string;
  p_title: string;
  p_content: string; // markdown-ish
  p_author: string;
  p_likes: number;
  p_difficulty: Difficulty;
  created_at: string; // ISO
}

export interface Testcase {
  p_id: string;
  input_case: string;
  output_case: string;
  is_public: boolean;
}

export interface ProblemGetData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Problem[];
}

export interface BattleGroundQues {
  p_id: string;
  p_title: string;
  p_content: string;
  p_author: string;
  // ⚠ backend returns a string here; Problem returns number
  p_difficulty: string;
}

export interface LeaderboardRow {
  rank: number;
  uid_name: string;
  total_testcases_passed: number;
}

/* -------- Execution / WebSocket -------- */

export interface PlaygroundCodeReq {
  code: string;
  input: string;
}

export interface PlaygroundCodeRes {
  error: boolean;
  responseData: {
    error: boolean | string;
    data:
      | { exec_time: number; message: string; output: string }
      | { details: string; message: string };
  };
  status: number;
}

export interface ArenaCodeReq {
  code: string;
  p_id: string;
}

export interface TestResult {
  error: boolean;
  data: {
    message: string;
    output: string;
    error: string;
    exec_time: number;
  };
  t_id: number;
  expected_out?: string;
  user_input?: string;
  passed: boolean;
}

export interface ArenaCodeRes {
  error: boolean;
  responseData: TestResult[];
  status: number;
}

export interface BattlegroundCodeReq {
  code: string;
  p_id: string;
  uid: string;
}

/** Battle socket carries multiple event types on the same channel. */
export type BattleCodeRes =
  | {
      event: "runner";
      error: boolean;
      responseData: TestResult[] | string;
      status: number;
    }
  | {
      event: "leaderboard";
      error: boolean;
      responseData: LeaderboardRow[];
      status: number;
    };
