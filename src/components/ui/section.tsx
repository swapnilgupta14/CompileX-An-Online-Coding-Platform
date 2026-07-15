import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  bleed?: boolean;
}

/**
 * Vertically-spaced section. Skip padding via `bleed` when the section
 * manages its own vertical rhythm.
 */
export function Section({
  className,
  children,
  bleed = false,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn("relative", bleed ? "" : "py-24 sm:py-32 lg:py-40", className)}
      {...rest}
    >
      {children}
    </section>
  );
}
