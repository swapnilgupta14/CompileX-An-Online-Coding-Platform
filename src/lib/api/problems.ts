import { http } from "./client";
import type {
  ApiResponse,
  ApiResponseFormatted,
  Problem,
  ProblemGetData,
  Testcase,
} from "./types";

/**
 * Everything under /arena/ (problem CRUD + testcases + arena runs).
 */
export const problemsApi = {
  list(): Promise<ApiResponseFormatted<ProblemGetData>> {
    return http.get("/arena/get_problem/").then((r) => r.data);
  },
  get(p_id: string): Promise<ApiResponseFormatted<Problem>> {
    return http
      .get(`/arena/get_problem_by_id/?p_id=${encodeURIComponent(p_id)}`)
      .then((r) => r.data);
  },
  create(input: {
    p_title: string;
    p_content: string;
    p_author: string;
    p_difficulty: number;
  }): Promise<ApiResponse> {
    return http.post("/arena/add_problem/", input).then((r) => r.data);
  },
  remove(p_id: string): Promise<ApiResponse> {
    return http
      .delete("/arena/delete_problem/", { data: { p_id } })
      .then((r) => r.data);
  },
  testcases(p_id: string): Promise<ApiResponseFormatted<Testcase[]>> {
    return http
      .get(`/arena/get_testcase/?pid=${encodeURIComponent(p_id)}`)
      .then((r) => r.data);
  },
  addTestcase(input: Testcase): Promise<ApiResponse> {
    return http.post("/arena/add_testcase/", input).then((r) => r.data);
  },
  removeTestcase(p_id: string): Promise<ApiResponse> {
    return http
      .post("/arena/delete_testcase/", { data: { p_id } })
      .then((r) => r.data);
  },
};
