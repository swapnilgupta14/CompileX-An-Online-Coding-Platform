"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Plus, Eye, EyeOff } from "lucide-react";
import { problemsApi } from "@/lib/api/problems";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { Testcase } from "@/lib/api/types";

interface Props {
  problemId: string;
}

interface Draft {
  input: string;
  output: string;
  isPublic: boolean;
}

const EMPTY: Draft = { input: "", output: "", isPublic: true };

export function TestcaseEditorClient({ problemId }: Props) {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft>(EMPTY);

  const list = useQuery({
    queryKey: ["problem-testcases", problemId],
    queryFn: () =>
      problemsApi
        .testcases(problemId)
        .then((r) => r.responseData ?? [])
        .catch(() => [] as Testcase[]),
  });

  const add = useMutation({
    mutationFn: () =>
      problemsApi.addTestcase({
        p_id: problemId,
        input_case: draft.input,
        output_case: draft.output,
        is_public: draft.isPublic,
      }),
    onSuccess: async () => {
      setDraft(EMPTY);
      await qc.invalidateQueries({ queryKey: ["problem-testcases", problemId] });
    },
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link
        href="/app/admin/problems"
        className="inline-flex items-center gap-1 text-[12px] font-medium text-muted hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Problems
      </Link>
      <header className="flex flex-col gap-1.5">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          Testcases
        </div>
        <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.03em]">
          Problem {problemId}
        </h1>
        <p className="max-w-lg text-[13px] text-muted">
          Public cases are shown to solvers; hidden ones are only used for
          judging.
        </p>
      </header>

      <div className="rounded-2xl bg-surface p-6 ring-1 ring-hairline">
        <div className="text-[12.5px] font-medium text-ink">
          New testcase
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-medium text-ink">
              Input
            </span>
            <textarea
              rows={5}
              value={draft.input}
              onChange={(e) =>
                setDraft((d) => ({ ...d, input: e.target.value }))
              }
              placeholder="stdin lines"
              className="rounded-md bg-bg p-2.5 text-[12.5px] font-mono text-ink outline-none ring-1 ring-hairline focus:ring-focus"
              spellCheck={false}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-medium text-ink">
              Expected output
            </span>
            <textarea
              rows={5}
              value={draft.output}
              onChange={(e) =>
                setDraft((d) => ({ ...d, output: e.target.value }))
              }
              placeholder="stdout lines"
              className="rounded-md bg-bg p-2.5 text-[12.5px] font-mono text-ink outline-none ring-1 ring-hairline focus:ring-focus"
              spellCheck={false}
            />
          </label>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <label className="inline-flex items-center gap-2 text-[12.5px] font-medium text-ink">
            <input
              type="checkbox"
              checked={draft.isPublic}
              onChange={(e) =>
                setDraft((d) => ({ ...d, isPublic: e.target.checked }))
              }
              className="h-4 w-4 accent-[color:var(--ink)]"
            />
            Visible to solvers
          </label>
          <Button
            onClick={() => add.mutate()}
            loading={add.isPending}
            icon={<Plus className="h-3.5 w-3.5" />}
          >
            Add testcase
          </Button>
        </div>
        {add.isError ? (
          <p className="mt-3 text-[12.5px] text-[color:var(--danger)]">
            Couldn&apos;t save. Try again.
          </p>
        ) : null}
      </div>

      <div className="rounded-2xl bg-surface ring-1 ring-hairline">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
          <div className="text-[12.5px] font-medium text-ink">
            Existing testcases
          </div>
          <div className="text-[11.5px] text-muted">
            {list.data?.length ?? 0}
          </div>
        </div>
        {list.isLoading ? (
          <div className="p-6 text-[12.5px] text-muted">Loading…</div>
        ) : !list.data || list.data.length === 0 ? (
          <div className="p-6 text-[12.5px] text-muted">
            No testcases yet. Add the first one above.
          </div>
        ) : (
          <ul className="divide-y divide-hairline">
            {list.data.map((t, i) => (
              <li key={i} className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
                      Input · Case {i + 1}
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-medium",
                        t.is_public
                          ? "bg-surface-alt text-ink"
                          : "bg-surface-inverse text-surface-inverse-fg",
                      )}
                    >
                      {t.is_public ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                      {t.is_public ? "Public" : "Hidden"}
                    </span>
                  </div>
                  <pre className="mt-2 whitespace-pre-wrap rounded bg-bg p-2.5 text-[12px] font-mono text-ink">
                    {t.input_case || "—"}
                  </pre>
                </div>
                <div>
                  <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
                    Expected output
                  </div>
                  <pre className="mt-2 whitespace-pre-wrap rounded bg-bg p-2.5 text-[12px] font-mono text-ink">
                    {t.output_case || "—"}
                  </pre>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
