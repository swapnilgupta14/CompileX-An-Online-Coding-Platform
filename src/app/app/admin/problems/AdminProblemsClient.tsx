"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { problemsApi } from "@/lib/api/problems";
import { toDifficulty } from "@/lib/problems/difficulty";
import { DifficultyBadge } from "@/components/dashboard/DifficultyBadge";
import { ButtonLink } from "@/components/ui/button";

export function AdminProblemsClient() {
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["problems"],
    queryFn: () => problemsApi.list().then((r) => r.responseData.results),
  });

  const remove = useMutation({
    mutationFn: (p_id: string) => problemsApi.remove(p_id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["problems"] }),
  });

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Admin
          </div>
          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] sm:text-[32px]">
            Problems
          </h1>
        </div>
        <ButtonLink
          href="/app/admin/problems/new"
          size="md"
          icon={<Plus className="h-4 w-4" />}
        >
          New problem
        </ButtonLink>
      </header>

      <div className="rounded-2xl bg-surface ring-1 ring-hairline">
        {isLoading ? (
          <ul className="divide-y divide-hairline">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="h-4 w-1/2 animate-pulse rounded bg-surface-alt" />
                <div className="ml-auto h-4 w-24 animate-pulse rounded bg-surface-alt" />
              </li>
            ))}
          </ul>
        ) : isError ? (
          <div className="px-8 py-14 text-center">
            <div className="text-[15px] font-medium">
              Couldn&apos;t load problems.
            </div>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="px-8 py-14 text-center">
            <div className="text-[15px] font-medium">No problems yet.</div>
            <p className="mt-1 text-[13px] text-muted">
              Create the first one to seed the Arena.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-hairline">
            {data.map((p) => (
              <li
                key={p.p_id}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/app/problems/${p.p_id}`}
                      className="truncate text-[14px] font-medium text-ink hover:underline"
                    >
                      {p.p_title}
                    </Link>
                    <DifficultyBadge value={toDifficulty(p.p_difficulty)} />
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-muted">
                    By {p.p_author}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/app/admin/problems/${p.p_id}/testcases`}
                    className="inline-flex h-8 items-center gap-1 rounded-full px-3 text-[12px] font-medium text-muted-strong hover:bg-bg hover:text-ink"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Testcases
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete "${p.p_title}"?`)) remove.mutate(p.p_id);
                    }}
                    className="inline-flex h-8 items-center gap-1 rounded-full px-3 text-[12px] font-medium text-muted hover:bg-[color:var(--danger-bg)] hover:text-[color:var(--danger)]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
