"use client";

import { Play } from "lucide-react";
import { LANGUAGES, type Lang } from "@/lib/problems/starters";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { EditorTheme } from "@/components/coding/CodeEditor";

interface Props {
  language: Lang;
  onLanguage: (lang: Lang) => void;
  theme: EditorTheme;
  onTheme: (theme: EditorTheme) => void;
  fontSize: number;
  onFontSize: (n: number) => void;
  onRun: () => void;
  running?: boolean;
  runLabel?: string;
}

const THEMES: { value: EditorTheme; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "vs-dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "hc-black", label: "High contrast" },
];

const FONT_SIZES = [12, 13, 14, 15, 16, 18, 20, 22];

export function EditorToolbar({
  language,
  onLanguage,
  theme,
  onTheme,
  fontSize,
  onFontSize,
  onRun,
  running,
  runLabel = "Run",
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface p-2 ring-1 ring-hairline">
      <div className="flex flex-wrap items-center gap-2">
        <Select
          label="Language"
          value={language}
          onChange={(v) => onLanguage(v as Lang)}
          options={LANGUAGES.map((l) => ({ value: l.value, label: l.label }))}
        />
        <Select
          label="Theme"
          value={theme}
          onChange={(v) => onTheme(v as EditorTheme)}
          options={THEMES.map((t) => ({ value: t.value, label: t.label }))}
        />
        <Select
          label="Size"
          value={String(fontSize)}
          onChange={(v) => onFontSize(Number(v))}
          options={FONT_SIZES.map((s) => ({
            value: String(s),
            label: `${s}px`,
          }))}
        />
      </div>
      <Button
        onClick={onRun}
        size="sm"
        loading={running}
        icon={!running ? <Play className="h-3.5 w-3.5" /> : undefined}
      >
        {running ? "Running" : runLabel}
      </Button>
    </div>
  );
}
