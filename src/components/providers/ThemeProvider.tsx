"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Wraps next-themes with our house defaults. `class` attribute toggles the
 * `.dark` class on <html>, which our CSS variables key off.
 *
 * - `system` follows the OS preference.
 * - Disable transitions during toggle so nothing "morphs" mid-swap.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={["light", "dark", "system"]}
    >
      {children}
    </NextThemesProvider>
  );
}
