"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import type { Lang } from "@/lib/problems/starters";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((m) => m.default),
  { ssr: false, loading: () => <EditorFallback /> },
);

export type EditorTheme = "auto" | "vs-dark" | "light" | "hc-black";

interface Props {
  value: string;
  language: Lang;
  /** `auto` follows the app's light/dark preference. */
  theme?: EditorTheme;
  fontSize: number;
  onChange: (value: string) => void;
  height?: string | number;
}

/**
 * Monaco wrapper. `theme="auto"` follows the app's resolved light/dark
 * mode; explicit choices override.
 */
export function CodeEditor({
  value,
  language,
  theme = "auto",
  fontSize,
  onChange,
  height = "100%",
}: Props) {
  const { resolvedTheme } = useTheme();
  const monacoTheme =
    theme === "auto" ? (resolvedTheme === "dark" ? "vs-dark" : "light") : theme;

  return (
    <div className="h-full w-full overflow-hidden rounded-xl ring-1 ring-hairline"
      style={{ background: monacoTheme === "light" ? "#ffffff" : "#0a0a0a" }}
    >
      <MonacoEditor
        height={height}
        theme={monacoTheme}
        language={language}
        value={value}
        onChange={(next) => onChange(next ?? "")}
        options={{
          fontSize,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: "none",
          scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
          fontLigatures: true,
          wordWrap: "on",
        }}
      />
    </div>
  );
}

function EditorFallback() {
  return (
    <div className="grid h-full place-items-center bg-surface text-[12px] text-muted">
      Loading editor…
    </div>
  );
}
