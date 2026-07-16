import { http } from "./client";
import { mockProblemsForRoom } from "./mock";
import type {
  ApiResponse,
  ApiResponseFormatted,
  BattleGroundQues,
} from "./types";

/**
 * Everything under /battlefield/ — rooms, room-problems, name → user_id.
 * Falls back to mock data when the backend is unreachable so demo
 * deployments remain fully clickable.
 */
export const battleApi = {
  async createRoom(input: {
    b_name: string;
    start_time: string;
    end_time: string;
  }): Promise<ApiResponseFormatted<{ room_id: string }>> {
    try {
      const res = await http.post("/battlefield/create_room/", input);
      return res.data;
    } catch {
      // Deterministic id from the name so re-creates land on the same room.
      const room_id = input.b_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return { error: false, status_code: 200, responseData: { room_id } };
    }
  },
  async addProblem(input: {
    p_title: string;
    p_content: string;
    p_author: string;
    p_difficulty: number;
    room_id: string;
  }): Promise<ApiResponse> {
    try {
      const res = await http.post("/battlefield/add_problem/", input);
      return res.data;
    } catch {
      return { error: false, status_code: 200, responseData: "ok (mock)" };
    }
  },
  async getUserId(input: {
    name: string;
    room_id: string;
  }): Promise<ApiResponseFormatted<{ user_id?: string }>> {
    try {
      const res = await http.post("/battlefield/get_user_id/", input);
      return res.data;
    } catch {
      // Synthetic uid so the play page can boot in demo mode.
      const user_id = `mock-${input.name.toLowerCase().replace(/\s+/g, "-")}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
      return { error: false, status_code: 200, responseData: { user_id } };
    }
  },
  async getProblemsByRoom(
    room_id: string,
  ): Promise<ApiResponseFormatted<BattleGroundQues[]>> {
    try {
      const res = await http.get(
        `/battlefield/get_problem_by_room/?room_id=${encodeURIComponent(room_id)}`,
      );
      const data = res.data as ApiResponseFormatted<BattleGroundQues[]>;
      if (data?.responseData && data.responseData.length > 0) return data;
      // Backend returned an empty list — prefer the mock so the room feels alive.
      const mock = mockProblemsForRoom(room_id);
      if (mock.length > 0) {
        return { error: false, status_code: 200, responseData: mock };
      }
      return data;
    } catch {
      return {
        error: false,
        status_code: 200,
        responseData: mockProblemsForRoom(room_id),
      };
    }
  },
};
