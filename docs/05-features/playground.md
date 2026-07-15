# Playground

## Purpose
Free-form code editor. No problem, no testcases — just write, run against custom stdin, see stdout.

## Route
`/app/playground` (was `/Editor`).

## UI regions
- **Header** — back arrow, filename input (default `main.cpp`), theme dropdown, language dropdown, font-size dropdown.
- **Editor** — Monaco, full height, `ssr: false`.
- **Right rail** — custom input textarea + output panel (tabs: `output`, `customInput`).
- **Actions** — `Run` triggers WebSocket `/pg/code_execute`.

## Language options
Currently: C++, Python, JavaScript. Only C++ actually runs on backend (verify). Keep dropdown to preserve UX; disable others with a "coming soon" tag until backend supports them.

## Theme options
`vs-dark`, `light`, `hc-black`, `vs` (Visual Studio).

## Font sizes
14, 16, 18, 20, 22, 24 px.

## Starter code
Currently hard-coded C++ boilerplate. Move to `src/lib/starters/{lang}.ts`:
```ts
export const starters: Record<Lang, string> = {
  cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
  python: `def main():\n    pass\n\nif __name__ == "__main__":\n    main()`,
  javascript: `function main() {}\n\nmain();`,
};
```

## Output states
`INITIAL` | `LOADING` | `SUCCESS` | `ERROR`.

## Rebuild notes
- Split into `PlaygroundHeader`, `PlaygroundEditor`, `OutputPanel`, `LanguageSelect`, `ThemeSelect`.
- Persist last-used language + theme + font size in cookie (server) or `localStorage` (non-auth data is fine there).
- Add `⌘ + Enter` shortcut for Run.
- Add sensible resize with `react-resizable-panels` (if we install it; the spec doesn't allow, so stack vertically on mobile).
