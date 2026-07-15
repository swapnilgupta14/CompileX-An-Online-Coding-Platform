import { cn } from "@/lib/cn";
import type { Difficulty } from "@/lib/api/types";

interface Props {
  value: Difficulty;
  className?: string;
}

const CLASSES: Record<Difficulty, { label: string; className: string }> = {
  1: { label: "Easy", className: "bg-surface-alt text-ink" },
  2: {
    label: "Medium",
    className: "bg-transparent text-ink ring-1 ring-hairline-strong",
  },
  3: {
    label: "Hard",
    className: "bg-surface-inverse text-surface-inverse-fg",
  },
};

export function DifficultyBadge({ value, className }: Props) {
  const meta = CLASSES[value];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-medium",
        meta.className,
        className,
      )}
    >
      {meta.label}
    </span>
  );
}
