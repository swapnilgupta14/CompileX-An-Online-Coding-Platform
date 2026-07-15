"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { problemsApi } from "@/lib/api/problems";
import { ProblemForm } from "@/components/forms/ProblemForm";

export function NewProblemClient() {
  const router = useRouter();
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: problemsApi.create,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["problems"] });
      router.push("/app/admin/problems");
    },
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link
        href="/app/admin/problems"
        className="inline-flex items-center gap-1 text-[12px] font-medium text-muted hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All problems
      </Link>
      <header className="flex flex-col gap-1.5">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          Admin
        </div>
        <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.03em]">
          New problem
        </h1>
        <p className="max-w-lg text-[13px] text-muted">
          Write the statement in Markdown — the preview updates as you type.
          Add testcases in the next step.
        </p>
      </header>

      <div className="rounded-2xl bg-surface p-6 ring-1 ring-hairline">
        <ProblemForm
          onSubmit={async (values) => {
            await create.mutateAsync(values);
          }}
          submitLabel="Create problem"
        />
        {create.isError ? (
          <p className="mt-4 text-[12.5px] text-[color:var(--danger)]">
            Couldn&apos;t save. Check the backend is up.
          </p>
        ) : null}
      </div>
    </div>
  );
}
