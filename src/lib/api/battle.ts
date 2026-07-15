import { http } from "./client";
import type {
  ApiResponse,
  ApiResponseFormatted,
  BattleGroundQues,
} from "./types";

/**
 * Everything under /battlefield/ — rooms, room-problems, name → user_id.
 */
export const battleApi = {
  createRoom(input: {
    b_name: string;
    start_time: string; // ISO
    end_time: string; // ISO
  }): Promise<ApiResponseFormatted<{ room_id: string }>> {
    return http
      .post("/battlefield/create_room/", input)
      .then((r) => r.data);
  },
  addProblem(input: {
    p_title: string;
    p_content: string;
    p_author: string;
    p_difficulty: number;
    room_id: string;
  }): Promise<ApiResponse> {
    return http
      .post("/battlefield/add_problem/", input)
      .then((r) => r.data);
  },
  getUserId(input: {
    name: string;
    room_id: string;
  }): Promise<ApiResponseFormatted<{ user_id?: string }>> {
    return http
      .post("/battlefield/get_user_id/", input)
      .then((r) => r.data);
  },
  getProblemsByRoom(
    room_id: string,
  ): Promise<ApiResponseFormatted<BattleGroundQues[]>> {
    return http
      .get(
        `/battlefield/get_problem_by_room/?room_id=${encodeURIComponent(room_id)}`,
      )
      .then((r) => r.data);
  },
};
