"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  interactive?: boolean;
}

export function Card({
  className,
  children,
  interactive = false,
  ...rest
}: CardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "relative rounded-[var(--radius-lg)] bg-surface",
        "shadow-[var(--shadow-card)]",
        "ring-1 ring-hairline",
        interactive &&
          "transition-shadow duration-300 hover:ring-hairline-strong hover:shadow-[var(--shadow-lift)]",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
