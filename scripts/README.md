# Marketing recorder

Records a cinematic ~10s fly-through of `http://localhost:3000/` with swift
zooms and section-to-section pans. No audio.

## One-time setup

```bash
pnpm record:setup
```

This installs `playwright` + `tsx` and downloads a headless Chromium build.

Optional: install ffmpeg for MP4 output.

```bash
brew install ffmpeg   # macOS
```

## Record

```bash
pnpm dev            # in one terminal
pnpm record         # in another
```

Output lands in `scripts/output/`:

- `marketing.webm` — always produced.
- `marketing.mp4` — produced if ffmpeg is on PATH.

## Tweak the camera

Open `scripts/record-marketing.ts` and edit the `shots` array.

Each shot has:

- `target` — CSS selector to scroll to (or `null` for the top of the page).
- `scale` — 1.0 = flat, 1.05 = subtle zoom, 1.1 = strong zoom.
- `duration` — how long to hold before moving to the next shot.
- `yOffset` — extra px offset so the shot doesn't clip the sticky navbar.

Total runtime is the sum of `duration` values (plus a few hundred ms of
tween overhead). Aim for ~10 000 ms.

## Notes

- The recorder uses `document.documentElement.style.transform = scale(...)`
  for the zoom pulse. Playwright captures the resulting composited pixels,
  so zooms are crisp even after MP4 encoding.
- Recording is done at `deviceScaleFactor: 2` — Retina-crisp source.
- Frame rate: Playwright records at 25fps by default which looks fine for
  a marketing clip. If you want 60fps, wrap the browser in `xvfb-run` on
  Linux and pass `--use-fake-ui-for-media-stream`.
- If the CTA section shot doesn't land right, adjust the `target` selector
  to `main > section:last-child` or add an `id="cta"` on the CTA `<section>`.
