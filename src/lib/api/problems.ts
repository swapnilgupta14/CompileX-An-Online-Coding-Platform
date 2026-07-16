import { http } from "./client";
import { MOCK_PROBLEMS, MOCK_TESTCASES } from "./mock";
import type {
  ApiResponse,
  ApiResponseFormatted,
  Problem,
  ProblemGetData,
  Testcase,
} from "./types";

/**
 * Everything under /arena/ (problem CRUD + testcases + arena runs).
 *
 * Every read falls back to local mock data if the backend is unreachable —
 * so demo deployments and offline dev remain fully clickable.
 */

const okList = (): ApiResponseFormatted<ProblemGetData> => ({
  error: false,
  status_code: 200,
  responseData: {
    count: MOCK_PROBLEMS.length,
    next: null,
    previous: null,
    results: MOCK_PROBLEMS,
  },
});

const okProblem = (p_id: string): ApiResponseFormatted<Problem> => {
  const found = MOCK_PROBLEMS.find((p) => p.p_id === p_id);
  if (!found) {
    return {
      error: true,
      status_code: 404,
      // We still return a Problem-shaped object so the UI can render an
      // empty state without crashing.
      responseData: MOCK_PROBLEMS[0] as Problem,
    };
  }
  return { error: false, status_code: 200, responseData: found };
};

const okTestcases = (
  p_id: string,
): ApiResponseFormatted<Testcase[]> => ({
  error: false,
  status_code: 200,
  responseData: MOCK_TESTCASES[p_id] ?? [],
});

const okWrite = (): ApiResponse => ({
  error: false,
  status_code: 200,
  responseData: "ok (mock)",
});

export const problemsApi = {
  async list(): Promise<ApiResponseFormatted<ProblemGetData>> {
    try {
      const res = await http.get("/arena/get_problem/");
      return res.data;
    } catch {
      return okList();
    }
  },
  async get(p_id: string): Promise<ApiResponseFormatted<Problem>> {
    try {
      const res = await http.get(
        `/arena/get_problem_by_id/?p_id=${encodeURIComponent(p_id)}`,
      );
      return res.data;
    } catch {
      return okProblem(p_id);
    }
  },
  async create(input: {
    p_title: string;
    p_content: string;
    p_author: string;
    p_difficulty: number;
  }): Promise<ApiResponse> {
    try {
      const res = await http.post("/arena/add_problem/", input);
      return res.data;
    } catch {
      return okWrite();
    }
  },
  async remove(p_id: string): Promise<ApiResponse> {
    try {
      const res = await http.delete("/arena/delete_problem/", {
        data: { p_id },
      });
      return res.data;
    } catch {
      return okWrite();
    }
  },
  async testcases(p_id: string): Promise<ApiResponseFormatted<Testcase[]>> {
    try {
      const res = await http.get(
        `/arena/get_testcase/?pid=${encodeURIComponent(p_id)}`,
      );
      return res.data;
    } catch {
      return okTestcases(p_id);
    }
  },
  async addTestcase(input: Testcase): Promise<ApiResponse> {
    try {
      const res = await http.post("/arena/add_testcase/", input);
      return res.data;
    } catch {
      return okWrite();
    }
  },
  async removeTestcase(p_id: string): Promise<ApiResponse> {
    try {
      const res = await http.post("/arena/delete_testcase/", {
        data: { p_id },
      });
      return res.data;
    } catch {
      return okWrite();
    }
  },
};
