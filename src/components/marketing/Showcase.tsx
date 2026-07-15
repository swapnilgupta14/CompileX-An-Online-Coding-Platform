"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

interface Tab {
  id: string;
  label: string;
  headline: string;
  description: string;
  render: () => React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "playground",
    label: "Playground",
    headline: "A calm editor. A fast runtime.",
    description:
      "Write code the way you like it — pick your language, pick your theme, pipe in custom stdin. Runs stream back over a live socket in milliseconds.",
    render: () => <PlaygroundSurface />,
  },
  {
    id: "arena",
    label: "Arena",
    headline: "Solve, submit, learn.",
    description:
      "Problem on the left, editor on the right. Every submission runs against every testcase — public and hidden — and shows you exactly what failed.",
    render: () => <ArenaSurface />,
  },
  {
    id: "battleground",
    label: "Battleground",
    headline: "Live. Ranked. Yours to lose.",
    description:
      "Time-boxed rooms, up to four problems, a live leaderboard on the same socket you're coding through. Real stakes, real quick.",
    render: () => <BattlegroundSurface />,
  },
];

export function Showcase() {
  const [active, setActive] = useState(tabs[0]!.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0]!;

  return (
    <Section id="product" className="relative">
      <Container>
        <SectionHeading
          eyebrow="Product"
          title="One surface. Three sharp tools."
          description="CompileX is deliberately small. Each tool is well-considered and quietly powerful. Switch between them without losing your place."
        />

        <div
          role="tablist"
          aria-label="Product areas"
          className="mt-12 flex flex-wrap items-center justify-center gap-1.5 rounded-full bg-surface p-1 mx-auto w-max ring-1 ring-hairline"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "relative h-9 rounded-full px-4 text-[13px] font-medium transition-colors",
                  isActive
                    ? "text-surface-inverse-fg"
                    : "text-muted-strong hover:text-ink",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="showcase-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-surface-inverse"
                  />
                ) : null}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
                  {current.headline}
                </h3>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-8">
            <div className="relative rounded-[22px] bg-surface p-2 ring-1 ring-hairline shadow-[var(--shadow-pop)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden rounded-[16px] bg-bg ring-1 ring-hairline"
                >
                  {current.render()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PlaygroundSurface() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 border-r border-hairline bg-neutral-950 p-5 font-mono text-[12px] leading-relaxed text-neutral-300">
        {[
          `#include <bits/stdc++.h>`,
          `using namespace std;`,
          ``,
          `int main() {`,
          `    int n; cin >> n;`,
          `    long long sum = 0;`,
          `    for (int i = 0; i < n; i++) {`,
          `        int x; cin >> x;`,
          `        sum += x;`,
          `    }`,
          `    cout << sum << "\\n";`,
          `}`,
        ].map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="w-4 text-right text-neutral-600">{i + 1}</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
      <div className="col-span-4 flex flex-col">
        <div className="border-b border-hairline p-4">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
            stdin
          </div>
          <div className="mt-1 rounded-md bg-surface p-2.5 text-[11px] text-ink ring-1 ring-hairline">
            5<br />1 2 3 4 5
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
            stdout
          </div>
          <div className="mt-1 rounded-md bg-surface p-2.5 text-[11px] text-ink ring-1 ring-hairline">
            15
          </div>
          <div className="mt-2 text-[10.5px] text-muted">exec 2ms · exit 0</div>
        </div>
      </div>
    </div>
  );
}

function ArenaSurface() {
  const cases = [
    { i: 1, ms: 8, passed: true },
    { i: 2, ms: 11, passed: true },
    { i: 3, ms: 92, passed: false },
    { i: 4, ms: 14, passed: true },
  ];
  return (
    <div className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[12px] font-medium text-ink">Longest Substring</div>
        <div className="text-[11px] text-muted">4 testcases · 3 passed</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cases.map((c) => (
          <div
            key={c.i}
            className={cn(
              "rounded-lg p-3 text-[11.5px] ring-1",
              c.passed
                ? "bg-surface ring-hairline text-ink"
                : "bg-surface-inverse ring-transparent text-surface-inverse-fg",
            )}
          >
            <div className="text-[10px] font-medium uppercase tracking-[0.14em] opacity-60">
              Case {c.i}
            </div>
            <div className="mt-1 font-medium">
              {c.passed ? "Passed" : "Wrong Answer"}
            </div>
            <div className="mt-0.5 opacity-70">{c.ms} ms</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-surface p-4 ring-1 ring-hairline">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
          Case 3 · Diff
        </div>
        <div className="mt-2 grid grid-cols-2 gap-3 text-[11.5px]">
          <div>
            <div className="text-muted">Expected</div>
            <pre className="mt-1 rounded bg-bg p-2 text-ink">
              abcabcbb → 3
            </pre>
          </div>
          <div>
            <div className="text-muted">Yours</div>
            <pre className="mt-1 rounded bg-bg p-2 text-ink">
              abcabcbb → 2
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function BattlegroundSurface() {
  const rows = [
    { rank: 1, name: "sanat_km", passed: 12 },
    { rank: 2, name: "priya.i", passed: 11 },
    { rank: 3, name: "you", passed: 10, self: true },
    { rank: 4, name: "rd_9", passed: 8 },
    { rank: 5, name: "b_okafor", passed: 7 },
  ];
  return (
    <div className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[12px] font-medium text-ink">Weekly · Round 3</div>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live · 14:22 left
        </div>
      </div>
      <ul className="rounded-lg bg-surface ring-1 ring-hairline divide-y divide-hairline">
        {rows.map((r) => (
          <li
            key={r.rank}
            className={cn(
              "flex items-center justify-between px-3 py-2.5 text-[12.5px]",
              r.self
                ? "bg-surface-inverse text-surface-inverse-fg"
                : "text-ink",
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "grid h-6 w-6 place-items-center rounded-full text-[11px] font-medium tabular-nums",
                  r.self
                    ? "bg-surface text-ink"
                    : "bg-surface-alt text-muted-strong",
                )}
              >
                {r.rank}
              </span>
              <span className="font-medium">{r.name}</span>
            </div>
            <span className="tabular-nums opacity-80">{r.passed} / 12</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
