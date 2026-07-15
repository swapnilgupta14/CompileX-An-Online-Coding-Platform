"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/** Deterministic seeded points so SSR and CSR agree. */
function useData() {
  return useMemo(() => {
    const days = 14;
    const points: { day: string; value: number }[] = [];
    let s = 47;
    for (let i = 0; i < days; i++) {
      s = (s * 9301 + 49297) % 233280;
      const base = 40 + Math.sin(i * 0.6) * 12;
      const jitter = (s / 233280) * 20;
      const d = new Date();
      d.setDate(d.getDate() - (days - i));
      points.push({
        day: d.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
        value: Math.round(base + jitter),
      });
    }
    return points;
  }, []);
}

/**
 * Themed area chart. Colors flip with the app theme via `resolvedTheme`.
 * Recharts can't consume CSS variables directly so we resolve them here.
 */
export function DashboardChart() {
  const data = useData();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const ink = isDark ? "#f5f5f5" : "#0a0a0a";
  const muted = isDark ? "#525252" : "#a3a3a3";
  const grid = isDark ? "#262626" : "#e5e5e5";
  const surface = isDark ? "#131313" : "#ffffff";

  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fill-ink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ink} stopOpacity={0.18} />
              <stop offset="100%" stopColor={ink} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            stroke={muted}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={muted}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: surface,
              border: `1px solid ${grid}`,
              borderRadius: 12,
              fontSize: 12,
              color: ink,
              boxShadow: "0 12px 24px -12px rgba(0,0,0,0.24)",
            }}
            labelStyle={{ color: muted, fontWeight: 500 }}
            cursor={{ stroke: muted, strokeDasharray: "3 3" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={ink}
            strokeWidth={1.75}
            fill="url(#fill-ink)"
            activeDot={{ r: 4, fill: ink }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
