import { SubmissionHeatmap } from "@/components/dashboard/SubmissionHeatmap";
import { cn } from "@/lib/cn";

interface Props {
  params: Promise<{ username: string }>;
}

interface Submission {
  id: string;
  problemId: string;
  title: string;
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "TLE";
  language: string;
  runtimeMs?: number;
  when: string;
}

/**
 * Profile is mocked until the backend exposes a real profile endpoint.
 * Everything is derived from the URL slug so different names look different.
 */
export default async function ProfilePage({ params }: Props) {
  const { username } = await params;

  const profile = mockProfileFor(username);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-surface p-6 ring-1 ring-hairline sm:flex-row sm:items-center sm:gap-6">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-surface-inverse text-[22px] font-semibold text-surface-inverse-fg">
          {profile.name
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            @{username}
          </div>
          <div className="mt-0.5 text-[22px] font-semibold tracking-[-0.02em]">
            {profile.name}
          </div>
          <div className="text-[13px] text-muted">
            {profile.role} · {profile.org} · {profile.location}
          </div>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Rank" value={`#${profile.rank}`} sub="global" />
        <Metric
          label="Percentile"
          value={`${profile.globalPercentile}%`}
          sub="top"
        />
        <Metric
          label="Points"
          value={profile.totalPoints.toLocaleString()}
          sub="season"
        />
        <Metric
          label="Wins"
          value={`${profile.contestsWon}/${profile.contestsPlayed}`}
          sub="battlegrounds"
        />
      </section>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="rounded-2xl bg-surface p-5 ring-1 ring-hairline lg:col-span-2">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <div className="text-[12px] font-medium text-muted">
                Submissions
              </div>
              <div className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">
                Last {profile.submissions.total} runs
              </div>
            </div>
            <div className="text-[12.5px] text-muted">
              {Math.round(profile.submissions.successRate * 100)}% accepted
            </div>
          </div>
          <SubmissionHeatmap data={profile.submissions.heatmap} />
        </div>

        <div className="rounded-2xl bg-surface p-5 ring-1 ring-hairline">
          <div className="text-[12px] font-medium text-muted">
            By difficulty
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {[
              {
                label: "Easy",
                v: profile.submissions.byDifficulty.easy,
                style: { background: "color-mix(in oklab, var(--ink) 25%, transparent)" },
              },
              {
                label: "Medium",
                v: profile.submissions.byDifficulty.medium,
                style: { background: "color-mix(in oklab, var(--ink) 55%, transparent)" },
              },
              {
                label: "Hard",
                v: profile.submissions.byDifficulty.hard,
                style: { background: "var(--ink)" },
              },
            ].map((row) => {
              const total =
                profile.submissions.byDifficulty.easy +
                profile.submissions.byDifficulty.medium +
                profile.submissions.byDifficulty.hard;
              const pct = total > 0 ? Math.round((row.v / total) * 100) : 0;
              return (
                <li key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-[12.5px]">
                    <span className="font-medium">{row.label}</span>
                    <span className="tabular-nums text-muted">
                      {row.v} · {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, ...row.style }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl bg-surface p-5 ring-1 ring-hairline">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <div className="text-[12px] font-medium text-muted">
              Recent submissions
            </div>
            <div className="mt-1 text-[18px] font-semibold tracking-[-0.02em]">
              Last {profile.submissions.recent.length} runs
            </div>
          </div>
        </div>
        <ul className="divide-y divide-hairline">
          {profile.submissions.recent.map((s: Submission) => (
            <li
              key={s.id}
              className="flex items-center justify-between gap-4 py-3 text-[13px]"
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    s.status === "Accepted"
                      ? "bg-surface-inverse"
                      : "bg-hairline-strong",
                  )}
                />
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-[11.5px] text-muted">
                    {s.status} · {s.language}
                    {s.runtimeMs != null ? ` · ${s.runtimeMs} ms` : ""}
                  </div>
                </div>
              </div>
              <span className="text-[11.5px] text-muted">{s.when}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-surface p-5 ring-1 ring-hairline">
        <div className="text-[12px] font-medium text-muted">
          Achievements
        </div>
        <ol className="mt-4 flex flex-col gap-4">
          {profile.achievements.map((a) => (
            <li key={a.date} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-surface-inverse" />
              <div>
                <div className="text-[13px] font-medium">{a.event}</div>
                <div className="text-[11.5px] text-muted">
                  {new Date(a.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl bg-surface p-5 ring-1 ring-hairline">
      <div className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </div>
      <div className="mt-1 text-[24px] font-semibold tracking-[-0.025em] tabular-nums">
        {value}
      </div>
      <div className="text-[11px] text-muted">{sub}</div>
    </div>
  );
}

function mockProfileFor(username: string) {
  // Deterministic mock so different usernames render different numbers.
  let seed = 0;
  for (let i = 0; i < username.length; i++) seed += username.charCodeAt(i);
  const rnd = (n: number) => ((seed * (n + 3) * 9301 + 49297) % 233280) / 233280;

  const heatmap: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = 0; i < 210; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    heatmap.push({
      date: d.toISOString().slice(0, 10),
      count: Math.floor(rnd(i) * 7),
    });
  }

  return {
    name: username
      .split(/[._-]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    role: "Software Engineer",
    org: "CompileX",
    location: "Kanpur, India",
    rank: 800 + Math.floor(rnd(1) * 400),
    globalPercentile: 1 + Math.floor(rnd(2) * 5),
    totalPoints: 1000 + Math.floor(rnd(3) * 2000),
    contestsPlayed: 10 + Math.floor(rnd(4) * 20),
    contestsWon: 2 + Math.floor(rnd(5) * 8),
    submissions: {
      total: 400 + Math.floor(rnd(6) * 300),
      successRate: 0.3 + rnd(7) * 0.4,
      byDifficulty: {
        easy: 80 + Math.floor(rnd(8) * 40),
        medium: 40 + Math.floor(rnd(9) * 30),
        hard: 10 + Math.floor(rnd(10) * 20),
      },
      heatmap,
      recent: [
        {
          id: "s1",
          problemId: "p1",
          title: "Two-Sum",
          status: "Accepted" as const,
          language: "C++",
          runtimeMs: 12,
          when: "2 h ago",
        },
        {
          id: "s2",
          problemId: "p2",
          title: "Reverse Linked List",
          status: "Wrong Answer" as const,
          language: "Python",
          when: "yesterday",
        },
        {
          id: "s3",
          problemId: "p3",
          title: "LRU Cache",
          status: "Accepted" as const,
          language: "C++",
          runtimeMs: 88,
          when: "2 days ago",
        },
        {
          id: "s4",
          problemId: "p4",
          title: "Word Ladder",
          status: "TLE" as const,
          language: "JavaScript",
          when: "4 days ago",
        },
      ],
    },
    achievements: [
      { date: "2026-06-01", event: "Reached Top 1% globally" },
      { date: "2026-05-11", event: "Won Weekly · Round 2" },
      { date: "2025-11-05", event: "First Battleground finish" },
      { date: "2024-09-20", event: "Joined CompileX" },
    ],
  };
}
