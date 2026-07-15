"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

interface Point {
  date: string; // ISO
  count: number;
}

interface Props {
  data: Point[];
  weeks?: number;
}

/**
 * Minimal SVG submission heatmap. Uses semantic tokens so it looks right
 * in both light and dark modes.
 */
export function SubmissionHeatmap({ data, weeks = 30 }: Props) {
  const buckets = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of data) map.set(p.date, p.count);
    const today = new Date();
    today.setDate(today.getDate() - today.getDay());
    const cells: { date: string; count: number }[] = [];
    for (let w = weeks - 1; w >= 0; w--) {
      for (let d = 0; d < 7; d++) {
        const dt = new Date(today);
        dt.setDate(dt.getDate() - w * 7 + d);
        const iso = dt.toISOString().slice(0, 10);
        cells.push({ date: iso, count: map.get(iso) ?? 0 });
      }
    }
    return cells;
  }, [data, weeks]);

  const [hover, setHover] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(null);

  const CELL = 12;
  const GAP = 3;
  const width = weeks * (CELL + GAP);
  const height = 7 * (CELL + GAP);

  const step = (count: number): 0 | 1 | 2 | 3 | 4 => {
    if (count === 0) return 0;
    if (count < 2) return 1;
    if (count < 4) return 2;
    if (count < 6) return 3;
    return 4;
  };

  // Use theme-aware fill via inline style so it flips with .dark.
  const fillFor = (s: 0 | 1 | 2 | 3 | 4) => {
    if (s === 0) return "var(--surface-alt)";
    if (s === 1) return "color-mix(in oklab, var(--ink) 20%, transparent)";
    if (s === 2) return "color-mix(in oklab, var(--ink) 45%, transparent)";
    if (s === 3) return "color-mix(in oklab, var(--ink) 70%, transparent)";
    return "var(--ink)";
  };

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="Submission heatmap"
      >
        {buckets.map((c, i) => {
          const w = Math.floor(i / 7);
          const d = i % 7;
          const x = w * (CELL + GAP);
          const y = d * (CELL + GAP);
          return (
            <rect
              key={c.date}
              x={x}
              y={y}
              width={CELL}
              height={CELL}
              rx={2}
              fill={fillFor(step(c.count))}
              className="transition-colors"
              onMouseEnter={() =>
                setHover({
                  x: x + CELL / 2,
                  y: y,
                  label: `${c.count} on ${c.date}`,
                })
              }
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </svg>
      {hover ? (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md bg-surface-inverse px-2 py-1 text-[11px] font-medium text-surface-inverse-fg"
          style={{
            left: `${(hover.x / width) * 100}%`,
            top: `${(hover.y / height) * 100}%`,
          }}
        >
          {hover.label}
        </div>
      ) : null}
      <div className="mt-2 flex items-center justify-end gap-1.5 text-[10.5px] text-muted">
        Less
        {[0, 1, 2, 3, 4].map((s) => (
          <span
            key={s}
            className={cn("h-2.5 w-2.5 rounded-[2px]")}
            style={{ background: fillFor(s as 0 | 1 | 2 | 3 | 4) }}
          />
        ))}
        More
      </div>
    </div>
  );
}
