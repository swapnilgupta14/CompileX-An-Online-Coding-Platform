"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

const rise = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <motion.div
          variants={rise}
          custom={0}
          className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted ring-1 ring-hairline"
        >
          <span className="h-1 w-1 rounded-full bg-ink" />
          {eyebrow}
        </motion.div>
      ) : null}
      <motion.h2
        variants={rise}
        custom={1}
        className={cn(
          "text-4xl sm:text-5xl lg:text-[56px] leading-[1.02] font-semibold tracking-[-0.035em] text-balance",
          align === "center" ? "max-w-2xl" : "max-w-3xl",
        )}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={rise}
          custom={2}
          className={cn(
            "text-muted text-lg leading-relaxed text-pretty",
            align === "center" ? "max-w-xl" : "max-w-2xl",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
