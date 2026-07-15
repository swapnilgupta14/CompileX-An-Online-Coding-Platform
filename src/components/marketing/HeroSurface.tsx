"use client";

import { motion } from "motion/react";
import { Check, Command, Play, Timer, Trophy } from "lucide-react";

/**
 * Stylised product preview — editor + testcases + leaderboard glimpse.
 * The dark code pane is intentionally always-dark so the "code editor"
 * feels like a real editor regardless of the surrounding theme.
 */
export function HeroSurface() {
  return (
    <div className="relative mx-auto w-full max-w-[1080px]">
      <div className="relative overflow-hidden rounded-[24px] bg-surface ring-1 ring-hairline shadow-[0_50px_120px_-40px_rgb(0_0_0/0.22),0_20px_40px_-20px_rgb(0_0_0/0.08)]">
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
            <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
            <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-surface-alt px-3 py-1 text-[11px] text-muted sm:flex">
            <Command className="h-3 w-3" aria-hidden />
            compilex.dev / arena / two-sum
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0">
          <ProblemPane />
          <EditorPane />
        </div>
      </div>

      <FloatingCards />
    </div>
  );
}

function ProblemPane() {
  return (
    <aside className="col-span-5 border-r border-hairline bg-surface-alt p-5 lg:col-span-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted">
          Problem
        </div>
        <span className="rounded-full bg-surface-inverse px-2 py-0.5 text-[10px] font-medium text-surface-inverse-fg">
          Medium
        </span>
      </div>
      <div className="text-[15px] font-semibold tracking-[-0.02em] text-ink">
        Two-Sum, but faster.
      </div>
      <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
        Given an array of integers and a target, return the indices of the
        two numbers that add up to the target — in a single pass.
      </p>

      <div className="mt-4 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
        Public testcases
      </div>
      <ul className="mt-2 flex flex-col gap-1.5">
        {[
          { i: "[2, 7, 11, 15], target = 9", o: "[0, 1]" },
          { i: "[3, 2, 4], target = 6", o: "[1, 2]" },
        ].map((t, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + idx * 0.07 }}
            className="rounded-lg bg-surface p-2.5 ring-1 ring-hairline"
          >
            <div className="text-[11px] text-muted">
              Input <span className="text-ink">{t.i}</span>
            </div>
            <div className="text-[11px] text-muted">
              Output <span className="text-ink">{t.o}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </aside>
  );
}

function EditorPane() {
  const lines = [
    "int twoSum(vector<int>& nums, int target) {",
    "  unordered_map<int, int> seen;",
    "  for (int i = 0; i < nums.size(); i++) {",
    "    int need = target - nums[i];",
    "    if (seen.count(need)) return {seen[need], i};",
    "    seen[nums[i]] = i;",
    "  }",
    "  return {};",
    "}",
  ];

  return (
    <main className="col-span-7 p-4 lg:col-span-8">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-muted">
          <div className="h-1.5 w-1.5 rounded-full bg-ink" />
          solution.cpp
        </div>
        <div className="flex items-center gap-2">
          <button className="h-7 rounded-full bg-surface px-2.5 text-[11px] font-medium text-ink ring-1 ring-hairline">
            C++
          </button>
          <button className="inline-flex h-7 items-center gap-1 rounded-full bg-surface-inverse px-2.5 text-[11px] font-medium text-surface-inverse-fg">
            <Play className="h-3 w-3" /> Run
          </button>
        </div>
      </div>

      {/* Editor is intentionally always-dark — a real editor stays dark. */}
      <div className="rounded-xl bg-neutral-950 p-4 font-mono text-[12px] leading-relaxed text-neutral-300">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
            className="flex gap-4"
          >
            <span className="w-4 text-right text-neutral-600">{i + 1}</span>
            <span>{line}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Case 1", state: "passed" as const },
          { label: "Case 2", state: "passed" as const },
          { label: "Case 3", state: "running" as const },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + i * 0.06 }}
            className="flex items-center gap-2 rounded-lg bg-surface p-2.5 text-[11.5px] ring-1 ring-hairline"
          >
            {c.state === "passed" ? (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-surface-inverse text-surface-inverse-fg">
                <Check className="h-3 w-3" />
              </span>
            ) : (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-surface ring-1 ring-hairline-strong">
                <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
              </span>
            )}
            <div>
              <div className="font-medium text-ink">{c.label}</div>
              <div className="text-[10.5px] text-muted">
                {c.state === "passed" ? "12ms · passed" : "running…"}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

function FloatingCards() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="animate-float pointer-events-none absolute -left-6 top-16 hidden w-[220px] rounded-2xl bg-surface p-3.5 shadow-[var(--shadow-pop)] ring-1 ring-hairline lg:block"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-inverse text-surface-inverse-fg">
            <Trophy className="h-3.5 w-3.5" />
          </span>
          <div className="text-[12px] font-medium text-ink">Rank up</div>
        </div>
        <div className="mt-2 text-[12px] text-muted">
          Priya moved from #14 → #9 in the Weekly.
        </div>
        <div className="mt-2 text-[10.5px] text-faint">2 min ago</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ delay: 1.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="animate-float pointer-events-none absolute -right-8 bottom-16 hidden w-[240px] rounded-2xl bg-surface p-3.5 shadow-[var(--shadow-pop)] ring-1 ring-hairline lg:block"
        style={{ animationDelay: "1.1s" }}
      >
        <div className="flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
          <Timer className="h-3 w-3" /> Cycle time
        </div>
        <div className="mt-1 text-[24px] font-semibold tracking-[-0.02em] text-ink">
          14m 22s
        </div>
        <div className="mt-2 flex items-center gap-1 text-[11.5px] text-muted">
          <span className="text-ink">↓ 18%</span> vs last week
        </div>
      </motion.div>
    </>
  );
}
