"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AnimatedGridProps {
  children: ReactNode[];
  className?: string;
  stagger?: number;
}

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Renders children in a stagger-in grid on scroll. Wrapper controls the
 * `staggerChildren` timing; each direct child fades + rises + de-blurs.
 */
export function AnimatedGrid({
  children,
  className,
  stagger = 0.08,
}: AnimatedGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={cn(className)}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
