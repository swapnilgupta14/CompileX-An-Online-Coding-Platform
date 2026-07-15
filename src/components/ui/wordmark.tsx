import { cn } from "@/lib/cn";

interface WordmarkProps {
  className?: string;
}

/**
 * CompileX brand mark — mono square with a "code battle" glyph, plus the name.
 */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-[15px] font-semibold tracking-[-0.02em] text-ink",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid h-6 w-6 place-items-center rounded-[7px] bg-surface-inverse text-surface-inverse-fg"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
          <path
            d="M7 5 3 10l4 5M13 5l4 5-4 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      CompileX
    </span>
  );
}
