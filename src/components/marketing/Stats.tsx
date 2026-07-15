"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { useInViewCount } from "@/hooks/use-in-view-count";

interface Stat {
  label: string;
  to: number;
  suffix?: string;
  prefix?: string;
  format?: (v: number) => string;
}

const stats: Stat[] = [
  {
    label: "Coders on CompileX",
    to: 42000,
    format: (v) => `${Math.round(v).toLocaleString()}+`,
  },
  {
    label: "Problems in the Arena",
    to: 1240,
    format: (v) => Math.round(v).toLocaleString(),
  },
  {
    label: "Median run latency",
    to: 42,
    suffix: "ms",
    format: (v) => Math.round(v).toString(),
  },
  {
    label: "Uptime last 12 months",
    to: 99.98,
    suffix: "%",
    format: (v) => v.toFixed(2),
  },
];

export function Stats() {
  return (
    <Section className="!py-16 sm:!py-20">
      <Container>
        <div className="rounded-3xl bg-surface p-8 sm:p-12 ring-1 ring-hairline shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
            {stats.map((s) => (
              <StatBlock key={s.label} {...s} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function StatBlock({ label, to, suffix, prefix, format }: Stat) {
  const { ref, value } = useInViewCount(to);
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="text-[38px] font-semibold leading-none tracking-[-0.035em] tabular-nums sm:text-[52px] text-ink">
        <span ref={ref}>
          {prefix}
          {format ? format(value) : Math.round(value).toLocaleString()}
          {suffix}
        </span>
      </div>
      <div className="text-[13px] text-muted">{label}</div>
    </div>
  );
}
