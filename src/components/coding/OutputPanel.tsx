"use client";

import { cn } from "@/lib/cn";

export type OutputState = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";

interface Props {
  state: OutputState;
  output?: string | null;
  execTimeMs?: number | null;
}

export function OutputPanel({ state, output, execTimeMs }: Props) {
  return (
    <div className="rounded-xl bg-surface p-3 ring-1 ring-hairline">
      <div className="flex items-center justify-between">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
          stdout
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted">
          {state === "LOADING" ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-muted animate-pulse" />
              running…
            </>
          ) : state === "SUCCESS" ? (
            <>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--success)" }}
              />
              ok{execTimeMs != null ? ` · ${execTimeMs}ms` : ""}
            </>
          ) : state === "ERROR" ? (
            <>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--danger)" }}
              />
              error
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-hairline-strong" />
              idle
            </>
          )}
        </div>
      </div>
      <pre
        className={cn(
          "mt-2 max-h-64 overflow-auto rounded-md p-3 text-[12.5px] leading-relaxed",
          state === "ERROR"
            ? "text-[color:var(--danger)] ring-1 ring-[color:var(--danger-ring)]"
            : "bg-bg text-ink ring-1 ring-hairline",
        )}
        style={
          state === "ERROR" ? { background: "var(--danger-bg)" } : undefined
        }
      >
        {output && output.length > 0
          ? output
          : state === "IDLE"
            ? "Run to see the output."
            : ""}
      </pre>
    </div>
  );
}
