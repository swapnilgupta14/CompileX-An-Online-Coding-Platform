"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

/**
 * Native <select> in a design-system shell. Cheap, accessible, keyboard-native.
 */
export function Select({ label, value, onChange, options, className }: Props) {
  return (
    <label
      className={cn(
        "group inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[12px] font-medium text-muted-strong ring-1 ring-hairline focus-within:ring-hairline-strong hover:text-ink",
        className,
      )}
    >
      {label ? <span className="text-[11px] text-muted">{label}</span> : null}
      <span className="relative flex items-center gap-1.5">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="cursor-pointer appearance-none bg-transparent pr-4 text-[12.5px] font-medium text-ink focus:outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-surface text-ink">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-muted"
        />
      </span>
    </label>
  );
}
