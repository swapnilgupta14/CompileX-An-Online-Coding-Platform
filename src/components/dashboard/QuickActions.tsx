"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Braces, LayoutGrid, Swords } from "lucide-react";

const actions = [
  {
    label: "Playground",
    href: "/app/playground",
    icon: Braces,
    desc: "Write, run, iterate. Custom stdin / stdout.",
  },
  {
    label: "Arena",
    href: "/app/problems",
    icon: LayoutGrid,
    desc: "Practice against public + hidden testcases.",
  },
  {
    label: "Battleground",
    href: "/app/battlegrounds",
    icon: Swords,
    desc: "Live rooms with real-time leaderboards.",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {actions.map((a, i) => {
        const Icon = a.icon;
        return (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={a.href}
              className="group relative flex h-full flex-col justify-between rounded-2xl bg-surface p-5 ring-1 ring-hairline transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-inverse text-surface-inverse-fg">
                  <Icon className="h-4 w-4" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-8">
                <div className="text-[17px] font-semibold tracking-[-0.015em] text-ink">
                  {a.label}
                </div>
                <div className="mt-1 text-[13px] text-muted">{a.desc}</div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
