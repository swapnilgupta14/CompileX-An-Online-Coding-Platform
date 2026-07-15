"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { Difficulty } from "@/lib/api/types";

const schema = z.object({
  p_title: z.string().min(3, "At least 3 characters"),
  p_content: z.string().min(20, "At least 20 characters"),
  p_author: z.string().min(2, "Enter an author"),
  p_difficulty: z.union([z.literal("1"), z.literal("2"), z.literal("3")]),
});

export interface ProblemFormValues {
  p_title: string;
  p_content: string;
  p_author: string;
  p_difficulty: Difficulty;
}

interface Props {
  defaultValues?: Partial<ProblemFormValues>;
  onSubmit: (values: ProblemFormValues) => Promise<void> | void;
  submitLabel?: string;
}

/**
 * Reusable form for creating problems (Arena or Battleground). Includes a
 * live markdown preview of the content field.
 */
export function ProblemForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save problem",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      p_title: defaultValues?.p_title ?? "",
      p_content: defaultValues?.p_content ?? "",
      p_author: defaultValues?.p_author ?? "",
      p_difficulty: (defaultValues?.p_difficulty
        ? (String(defaultValues.p_difficulty) as "1" | "2" | "3")
        : "1"),
    },
  });

  const content = watch("p_content") || "";
  const difficulty = watch("p_difficulty");

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          p_title: values.p_title,
          p_content: values.p_content,
          p_author: values.p_author,
          p_difficulty: Number(values.p_difficulty) as Difficulty,
        });
      })}
      className="flex flex-col gap-4"
    >
      <Field label="Title" error={errors.p_title?.message}>
        <input
          {...register("p_title")}
          placeholder="Two-Sum"
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Author" error={errors.p_author?.message}>
          <input
            {...register("p_author")}
            placeholder="You"
            className={inputClass}
          />
        </Field>
        <Field label="Difficulty">
          <Select
            value={difficulty}
            onChange={(v) => setValue("p_difficulty", v as "1" | "2" | "3")}
            options={[
              { value: "1", label: "Easy" },
              { value: "2", label: "Medium" },
              { value: "3", label: "Hard" },
            ]}
          />
        </Field>
      </div>

      <Field label="Content (markdown)" error={errors.p_content?.message}>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <textarea
            {...register("p_content")}
            rows={12}
            placeholder="Describe the problem, constraints, and examples in Markdown."
            className={`${inputClass} font-mono text-[12.5px]`}
            spellCheck={false}
          />
          <div className="max-h-[300px] overflow-auto rounded-md bg-bg p-3 text-[13px] text-ink ring-1 ring-hairline">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
              Preview
            </div>
            <div className="prose prose-sm mt-2 max-w-none">
              <ReactMarkdown>
                {content || "_Nothing to preview yet._"}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </Field>

      <div>
        <Button type="submit" loading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl bg-surface px-3.5 py-2.5 text-[14px] text-ink outline-none shadow-[inset_0_0_0_1px_var(--hairline)] placeholder:text-muted focus:shadow-[inset_0_0_0_1.5px_var(--ink)]";

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12.5px] font-medium text-ink">{label}</span>
      {children}
      {error ? (
        <span className="text-[12px]" style={{ color: "var(--danger)" }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
