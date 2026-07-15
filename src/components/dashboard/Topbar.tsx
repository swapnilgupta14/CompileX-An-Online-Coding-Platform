"use client";

import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/**
 * Sticky topbar for the /app shell. Search is decorative for now — hook up
 * once we have a search endpoint. Theme toggle mirrors the sidebar so
 * mobile users (sidebar hidden) still have access to it.
 */
export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-hairline bg-bg/80 px-5 backdrop-blur-md">
      <div className="relative flex-1 max-w-md">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          placeholder="Search problems, battlegrounds, players…"
          className="h-9 w-full rounded-full bg-surface pl-9 pr-3 text-[13px] text-ink outline-none shadow-[inset_0_0_0_1px_var(--hairline)] placeholder:text-muted focus:shadow-[inset_0_0_0_1.5px_var(--ink)]"
        />
      </div>
      <div className="md:hidden">
        <ThemeToggle variant="compact" />
      </div>
      <button
        type="button"
        aria-label="Notifications"
        className="grid h-9 w-9 place-items-center rounded-full text-muted-strong hover:bg-surface hover:text-ink"
      >
        <Bell className="h-4 w-4" />
      </button>
    </header>
  );
}
