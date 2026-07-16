/**
 * Local fixture data. Used as a graceful fallback in the API clients when
 * the Django backend isn't reachable — so the UI is fully clickable in
 * demo mode without touching a real server.
 *
 * Also used directly by the mock-only Battleground list page (no backend
 * endpoint for rooms exists yet).
 */

import type {
  BattleGroundQues,
  LeaderboardRow,
  Problem,
  Testcase,
} from "./types";

/* -------------------------------------------------------------------- */
/* Problems                                                             */
/* -------------------------------------------------------------------- */

export const MOCK_PROBLEMS: Problem[] = [
  {
    p_id: "p-two-sum",
    p_title: "Two-Sum",
    p_content:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nReturn the answer in any order.\n\n### Constraints\n- 2 ≤ nums.length ≤ 10⁴\n- -10⁹ ≤ nums[i] ≤ 10⁹\n- Only one valid answer exists.",
    p_author: "sanat_km",
    p_likes: 412,
    p_difficulty: 1,
    created_at: "2026-05-14T09:00:00.000Z",
  },
  {
    p_id: "p-reverse-ll",
    p_title: "Reverse Linked List",
    p_content:
      "Given the head of a singly linked list, reverse the list, and return the reversed list.\n\n### Follow-up\nA linked list can be reversed either iteratively or recursively. Could you implement both?",
    p_author: "priya.i",
    p_likes: 289,
    p_difficulty: 1,
    created_at: "2026-05-19T12:15:00.000Z",
  },
  {
    p_id: "p-valid-parens",
    p_title: "Valid Parentheses",
    p_content:
      "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    p_author: "rd_9",
    p_likes: 174,
    p_difficulty: 1,
    created_at: "2026-05-22T18:40:00.000Z",
  },
  {
    p_id: "p-merge-intervals",
    p_title: "Merge Intervals",
    p_content:
      "Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.\n\n### Example\n`[[1,3],[2,6],[8,10],[15,18]]` → `[[1,6],[8,10],[15,18]]`",
    p_author: "b_okafor",
    p_likes: 331,
    p_difficulty: 2,
    created_at: "2026-06-01T07:30:00.000Z",
  },
  {
    p_id: "p-longest-substring",
    p_title: "Longest Substring Without Repeating Characters",
    p_content:
      "Given a string `s`, find the length of the **longest substring** without repeating characters.\n\n### Constraints\n- 0 ≤ s.length ≤ 5 · 10⁴\n- `s` consists of English letters, digits, symbols and spaces.",
    p_author: "priya.i",
    p_likes: 512,
    p_difficulty: 2,
    created_at: "2026-06-08T11:05:00.000Z",
  },
  {
    p_id: "p-course-schedule",
    p_title: "Course Schedule",
    p_content:
      "There are `numCourses` courses labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
    p_author: "sanat_km",
    p_likes: 247,
    p_difficulty: 2,
    created_at: "2026-06-15T09:00:00.000Z",
  },
  {
    p_id: "p-lru-cache",
    p_title: "LRU Cache",
    p_content:
      "Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)` — initialize the LRU cache with positive size `capacity`.\n- `int get(int key)` — return the value if the key exists, otherwise `-1`.\n- `void put(int key, int value)` — update the value; if adding a new key would exceed capacity, evict the least recently used key.\n\nThe functions `get` and `put` must each run in **O(1)** average time complexity.",
    p_author: "j_weiss",
    p_likes: 621,
    p_difficulty: 3,
    created_at: "2026-06-20T14:22:00.000Z",
  },
  {
    p_id: "p-word-ladder",
    p_title: "Word Ladder",
    p_content:
      "Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`. Return `0` if no such sequence exists.\n\nA transformation sequence is a sequence of words `beginWord → s₁ → s₂ → ... → sₖ` such that every adjacent pair differs by a single letter and every `sᵢ` is in `wordList`.",
    p_author: "sofia.m",
    p_likes: 188,
    p_difficulty: 3,
    created_at: "2026-06-28T16:10:00.000Z",
  },
];

/* -------------------------------------------------------------------- */
/* Testcases (public only — hidden ones live server-side)               */
/* -------------------------------------------------------------------- */

export const MOCK_TESTCASES: Record<string, Testcase[]> = {
  "p-two-sum": [
    {
      p_id: "p-two-sum",
      input_case: "4\n2 7 11 15\n9",
      output_case: "0 1",
      is_public: true,
    },
    {
      p_id: "p-two-sum",
      input_case: "3\n3 2 4\n6",
      output_case: "1 2",
      is_public: true,
    },
  ],
  "p-reverse-ll": [
    {
      p_id: "p-reverse-ll",
      input_case: "5\n1 2 3 4 5",
      output_case: "5 4 3 2 1",
      is_public: true,
    },
  ],
  "p-valid-parens": [
    {
      p_id: "p-valid-parens",
      input_case: "()[]{}",
      output_case: "true",
      is_public: true,
    },
    {
      p_id: "p-valid-parens",
      input_case: "(]",
      output_case: "false",
      is_public: true,
    },
  ],
  "p-merge-intervals": [
    {
      p_id: "p-merge-intervals",
      input_case: "4\n1 3\n2 6\n8 10\n15 18",
      output_case: "1 6\n8 10\n15 18",
      is_public: true,
    },
  ],
  "p-longest-substring": [
    {
      p_id: "p-longest-substring",
      input_case: "abcabcbb",
      output_case: "3",
      is_public: true,
    },
    {
      p_id: "p-longest-substring",
      input_case: "bbbbb",
      output_case: "1",
      is_public: true,
    },
  ],
  "p-course-schedule": [
    {
      p_id: "p-course-schedule",
      input_case: "2 1\n1 0",
      output_case: "true",
      is_public: true,
    },
  ],
  "p-lru-cache": [
    {
      p_id: "p-lru-cache",
      input_case:
        "put 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1\nget 3\nget 4",
      output_case: "1\n-1\n-1\n3\n4",
      is_public: true,
    },
  ],
  "p-word-ladder": [
    {
      p_id: "p-word-ladder",
      input_case: "hit cog\nhot dot dog lot log cog",
      output_case: "5",
      is_public: true,
    },
  ],
};

/* -------------------------------------------------------------------- */
/* Battlegrounds                                                        */
/* -------------------------------------------------------------------- */

export interface MockRoom {
  room_id: string;
  name: string;
  status: "ongoing" | "upcoming" | "completed";
  players: number;
  problems: number;
  /** Present only for `ongoing`. */
  minutesLeft?: number;
  /** Present only for `upcoming`. */
  startsIn?: string;
  /** Present only for `completed`. */
  endedAt?: string;
  /** IDs of problems in the room, drawn from MOCK_PROBLEMS. */
  problemIds: string[];
}

export const MOCK_ROOMS: MockRoom[] = [
  {
    room_id: "weekly-3",
    name: "Weekly · Round 3",
    status: "ongoing",
    minutesLeft: 14,
    players: 24,
    problems: 4,
    problemIds: [
      "p-two-sum",
      "p-longest-substring",
      "p-merge-intervals",
      "p-lru-cache",
    ],
  },
  {
    room_id: "starter",
    name: "Starter room",
    status: "ongoing",
    minutesLeft: 42,
    players: 6,
    problems: 3,
    problemIds: ["p-two-sum", "p-reverse-ll", "p-valid-parens"],
  },
  {
    room_id: "interview-prep",
    name: "Interview prep · FAANG",
    status: "upcoming",
    startsIn: "in 1 h 12 m",
    players: 0,
    problems: 4,
    problemIds: [
      "p-longest-substring",
      "p-course-schedule",
      "p-lru-cache",
      "p-word-ladder",
    ],
  },
  {
    room_id: "friday-night",
    name: "Friday night classic",
    status: "upcoming",
    startsIn: "in 3 d",
    players: 0,
    problems: 3,
    problemIds: ["p-reverse-ll", "p-merge-intervals", "p-course-schedule"],
  },
  {
    room_id: "past-round-2",
    name: "Weekly · Round 2",
    status: "completed",
    endedAt: "3 days ago",
    players: 42,
    problems: 4,
    problemIds: [
      "p-two-sum",
      "p-valid-parens",
      "p-longest-substring",
      "p-lru-cache",
    ],
  },
];

/** Materialize a room's problems as BattleGroundQues (backend shape). */
export function mockProblemsForRoom(roomId: string): BattleGroundQues[] {
  const room = MOCK_ROOMS.find((r) => r.room_id === roomId);
  if (!room) return [];
  return room.problemIds
    .map((pid) => MOCK_PROBLEMS.find((p) => p.p_id === pid))
    .filter((p): p is Problem => Boolean(p))
    .map((p) => ({
      p_id: p.p_id,
      p_title: p.p_title,
      p_content: p.p_content,
      p_author: p.p_author,
      p_difficulty: String(p.p_difficulty),
    }));
}

/* -------------------------------------------------------------------- */
/* Live-feel leaderboard                                                */
/* -------------------------------------------------------------------- */

/**
 * Returns a plausible leaderboard for a room. Deterministic per-room so
 * it doesn't reshuffle on every render.
 */
export function mockLeaderboard(roomId: string): LeaderboardRow[] {
  const players = [
    "sanat_km",
    "priya.i",
    "you",
    "rd_9",
    "b_okafor",
    "sofia.m",
    "j_weiss",
    "alina.r",
    "l_chen",
    "tomo",
  ];
  const seed = roomId
    .split("")
    .reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
  return players
    .map((name, i) => {
      const passed = Math.max(
        0,
        12 - Math.floor(((seed * (i + 3)) % 17) / 1.4),
      );
      return { name, passed };
    })
    .sort((a, b) => b.passed - a.passed)
    .map((row, i) => ({
      rank: i + 1,
      uid_name: row.name,
      total_testcases_passed: row.passed,
    }));
}
