import type { Difficulty } from "@/lib/api/types";

interface Meta {
  label: "Easy" | "Medium" | "Hard";
  /** Tailwind classes for the badge (monochrome scale). */
  badge: string;
}

/**
 * Difficulty → label + badge classes. Kept small so it can be inlined
 * anywhere without importing a component.
 */
export const DIFFICULTY: Record<Difficulty, Meta> = {
  1: { label: "Easy", badge: "bg-neutral-100 text-neutral-800" },
  2: { label: "Medium", badge: "ring-1 ring-neutral-400 text-neutral-800" },
  3: { label: "Hard", badge: "bg-neutral-950 text-white" },
};

/** Coerce string|number|unknown from backend into a valid Difficulty. */
export function toDifficulty(v: unknown): Difficulty {
  const n = typeof v === "string" ? Number(v) : (v as number);
  if (n === 1 || n === 2 || n === 3) return n;
  return 1;
}
