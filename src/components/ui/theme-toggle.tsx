"use client";

import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface Props {
  /** Compact = icon-only single button. Segmented = 3-way pill. */
  variant?: "segmented" | "compact";
  className?: string;
}

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

/**
 * Theme picker backed by next-themes. Renders as either a 3-way segmented
 * pill (system / light / dark) or a compact toggle that cycles.
 *
 * `resolvedTheme` is used to guard against hydration mismatch — the button
 * only renders its state after mount.
 */
export function ThemeToggle({ variant = "segmented", className }: Props) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (variant === "compact") {
    const isDark = mounted && (resolvedTheme ?? theme) === "dark";
    const next = isDark ? "light" : "dark";
    return (
      <button
        type="button"
        aria-label={`Switch to ${next} mode`}
        onClick={() => setTheme(next)}
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink",
          className,
        )}
      >
        {mounted ? (
          isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )
        ) : (
          <Monitor className="h-4 w-4 opacity-60" />
        )}
      </button>
    );
  }

  const active = mounted ? (theme ?? "system") : "system";

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "relative inline-flex items-center gap-0.5 rounded-full bg-surface p-0.5 ring-1 ring-hairline",
        className,
      )}
    >
      {OPTIONS.map((opt) => {
        const selected = active === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={selected}
            aria-label={opt.label}
            title={opt.label}
            type="button"
            onClick={() => setTheme(opt.value)}
            className={cn(
              "relative grid h-7 w-7 place-items-center rounded-full transition-colors",
              selected ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            {selected && mounted ? (
              <motion.span
                layoutId="theme-pill"
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="absolute inset-0 rounded-full bg-surface-alt ring-1 ring-hairline-strong"
              />
            ) : null}
            <opt.Icon className="relative z-10 h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
