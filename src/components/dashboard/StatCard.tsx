"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  label: string;
  value: string;
  delta: string;
  icon: ReactNode;
}

export function StatCard({ label, value, delta, icon }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="rounded-2xl bg-surface p-5 ring-1 ring-hairline transition-shadow hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-surface-inverse text-surface-inverse-fg">
          {icon}
        </span>
        <span className="text-[11.5px] font-medium text-muted">{delta}</span>
      </div>
      <div className="mt-6 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </div>
      <div className="mt-1 text-[28px] font-semibold tracking-[-0.025em] tabular-nums text-ink">
        {value}
      </div>
    </motion.div>
  );
}
