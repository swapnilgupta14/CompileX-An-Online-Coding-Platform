"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { problemsApi } from "@/lib/api/problems";
import { DIFFICULTY, toDifficulty } from "@/lib/problems/difficulty";
import { DifficultyBadge } from "@/components/dashboard/DifficultyBadge";
import { cn } from "@/lib/cn";
import type { Difficulty, Problem } from "@/lib/api/types";

/**
 * Arena problems list. React Query fetch of GET /arena/get_problem/,
 * client-side search + difficulty filter (backend has no filter params).
 */
export function ProblemsListClient() {
  const [q, setQ] = useState("");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["problems"],
    queryFn: () => problemsApi.list().then((r) => r.responseData.results),
  });

  const filtered = useMemo(() => {
    const list = data ?? [];
    return list.filter((p) => {
      if (difficulty !== "all" && toDifficulty(p.p_difficulty) !== difficulty)
        return false;
      if (q && !p.p_title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [data, q, difficulty]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          Arena
        </div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] sm:text-[32px]">
          Problems
        </h1>
        <p className="max-w-lg text-[14px] text-muted">
          Pick a problem, ship a solution. Public testcases show you the
          basics — hidden ones catch the edge cases.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search problems by title…"
            className="h-9 w-full rounded-full bg-surface pl-9 pr-3 text-[13px] shadow-[inset_0_0_0_1px_var(--hairline)] outline-none placeholder:text-muted focus:shadow-[inset_0_0_0_1.5px_var(--ink)]"
          />
        </div>
        <div className="flex items-center gap-1 rounded-full bg-surface p-1 ring-1 ring-hairline">
          {(["all", 1, 2, 3] as const).map((d) => {
            const active = difficulty === d;
            const label =
              d === "all" ? "All" : DIFFICULTY[d as Difficulty].label;
            return (
              <button
                key={String(d)}
                type="button"
                onClick={() => setDifficulty(d)}
                className={cn(
                  "h-7 rounded-full px-3 text-[12px] font-medium transition-colors",
                  active
                    ? "bg-surface-inverse text-surface-inverse-fg"
                    : "text-muted-strong hover:text-ink",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-surface ring-1 ring-hairline">
        {isLoading ? (
          <ListSkeleton />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="divide-y divide-hairline">
            {filtered.map((p) => (
              <ProblemRow key={p.p_id} problem={p} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ProblemRow({ problem }: { problem: Problem }) {
  const d = toDifficulty(problem.p_difficulty);
  return (
    <li>
      <Link
        href={`/app/problems/${problem.p_id}`}
        className="group flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-surface-alt"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-[14px] font-medium text-ink">
              {problem.p_title}
            </span>
            <DifficultyBadge value={d} />
          </div>
          <div className="mt-0.5 text-[11.5px] text-muted">
            By {problem.p_author}
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </li>
  );
}

function ListSkeleton() {
  return (
    <ul className="divide-y divide-hairline">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="flex items-center gap-4 px-5 py-4">
          <div className="h-4 w-3/5 animate-pulse rounded bg-surface-alt" />
          <div className="ml-auto h-4 w-16 animate-pulse rounded bg-surface-alt" />
        </li>
      ))}
    </ul>
  );
}

function EmptyState() {
  return (
    <div className="px-8 py-14 text-center">
      <div className="text-[15px] font-medium text-ink">
        No problems match.
      </div>
      <p className="mt-1 text-[13px] text-muted">
        Adjust the filter or clear the search to see everything.
      </p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="px-8 py-14 text-center">
      <div className="text-[15px] font-medium text-ink">
        Couldn&apos;t load problems.
      </div>
      <p className="mt-1 text-[13px] text-muted">
        The Arena service is unreachable. Try again in a moment.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex h-8 items-center rounded-full bg-surface-inverse px-3 text-[12px] font-medium text-white"
      >
        Retry
      </button>
    </div>
  );
}
