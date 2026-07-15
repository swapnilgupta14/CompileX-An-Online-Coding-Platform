"use client";

import { motion } from "motion/react";
import { Check, GitPullRequest, Swords, Sparkles } from "lucide-react";

const items = [
  {
    icon: <Check className="h-3.5 w-3.5" />,
    title: "Two-Sum · Accepted",
    meta: "Arena · 8:00 AM",
  },
  {
    icon: <Swords className="h-3.5 w-3.5" />,
    title: "Weekly Round 3 joined",
    meta: "Battleground · 9:14 AM",
  },
  {
    icon: <GitPullRequest className="h-3.5 w-3.5" />,
    title: "Reversed Linked List submitted",
    meta: "Arena · 10:03 AM",
  },
  {
    icon: <Sparkles className="h-3.5 w-3.5" />,
    title: "New personal best · 42 ms",
    meta: "Playground · 11:41 AM",
  },
];

export function ActivityList() {
  return (
    <ul className="flex flex-col divide-y divide-hairline">
      {items.map((it, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.5 }}
          className="flex items-center gap-3 py-3"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-inverse text-surface-inverse-fg">
            {it.icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-medium text-ink">
              {it.title}
            </div>
            <div className="text-[11.5px] text-muted">{it.meta}</div>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
