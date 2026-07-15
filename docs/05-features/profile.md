# Profile

## Purpose
Public-ish profile page: identity, rank, submission stats, achievements.

## Route
`/app/profile/[username]` (was `/Profile/[username]`).

## Current state
- Page renders 100% mock data (name Swapnil Gupta, PSIT, etc.).
- Uses `react-calendar-heatmap` for a submission heatmap (365-day grid).

## Sections (target)
1. **Identity card** — avatar, name, role, org, location.
2. **Stats row** — rank, global percentile, total points, contests played, contests won.
3. **Submission heatmap** — replace `react-calendar-heatmap` with a lightweight custom SVG so we don't need to install it.
4. **Difficulty breakdown** — Easy / Medium / Hard counts + stacked bar.
5. **Recent submissions** — table: problem, status, language, runtime, when, `View` action.
6. **Achievements timeline** — dated events, animated on scroll.

## Data (needed from backend, currently absent)
```ts
interface UserProfile {
  username: string;
  name: string;
  avatarUrl?: string;
  role?: string;
  org?: string;
  location?: string;
  rank: number;
  globalPercentile: number; // 0..100
  totalPoints: number;
  contestsPlayed: number;
  contestsWon: number;
  submissions: {
    total: number;
    successRate: number; // 0..1
    byDifficulty: { easy: number; medium: number; hard: number };
    heatmap: Array<{ date: string; count: number }>; // ISO date
    recent: Array<{
      id: string;
      problemId: string;
      title: string;
      status: "Accepted" | "Wrong Answer" | "Runtime Error" | "TLE";
      language: string;
      runtimeMs?: number;
      when: string; // ISO
    }>;
  };
  achievements: Array<{ date: string; event: string }>;
}
```

## Rebuild notes
- Custom heatmap (~60 lines of SVG) sized by container; hover shows date + count in a small floating tooltip.
- All numbers use `tabular-nums`.
- Empty state for every section is first-class.
- Keep it monochrome — no colored status tags. Use dots + labels.
