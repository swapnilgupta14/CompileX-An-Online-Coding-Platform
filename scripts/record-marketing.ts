/**
 * Records a ~10s cinematic fly-through of the landing page at
 * http://localhost:3000 and writes marketing.webm (and .mp4 if ffmpeg is
 * on PATH) into ./scripts/output/.
 *
 * Usage:
 *   1. Make sure the app is running: `pnpm dev`
 *   2. Install once: `pnpm add -D playwright && npx playwright install chromium`
 *   3. Run: `pnpm tsx scripts/record-marketing.ts`
 *
 * Camera anatomy — a queue of "shots". Each shot moves the viewport
 * (scroll + CSS scale), holds for `duration`, then hands off to the next
 * one. Playwright records the *browser* at 60fps into WebM; we optionally
 * ffmpeg-convert to H.264 MP4 for handoff.
 *
 * Total runtime ≈ sum of shot durations + tiny ease overhead. Aim for ~10s.
 */

import { chromium, type Page } from "playwright";
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const URL = process.env.URL ?? "http://localhost:3000/";
const OUT_DIR = resolve(process.cwd(), "scripts/output");
const VIEWPORT = { width: 1440, height: 900 };

/** A "shot" targets a section by CSS selector, scales into it, holds. */
interface Shot {
  label: string;
  /** CSS selector to scroll to. `null` = page top. */
  target: string | null;
  /** How far the shot zooms in on top of the base. 1.0 = no zoom. */
  scale: number;
  /** Milliseconds the shot lingers at its end pose. */
  duration: number;
  /** Optional Y-offset added after scrolling target into view (px). */
  yOffset?: number;
}

const shots: Shot[] = [
  { label: "hero-wide",   target: null,        scale: 1.0,  duration: 900,  yOffset: 0 },
  { label: "hero-zoom",   target: null,        scale: 1.08, duration: 700,  yOffset: 120 },
  { label: "logos",       target: "#logo-cloud", scale: 1.0, duration: 700 },
  { label: "features",    target: "#features",  scale: 1.02, duration: 1100 },
  { label: "showcase",    target: "#product",   scale: 1.04, duration: 1300 },
  { label: "stats",       target: 'section[id=""] .rounded-3xl, .rounded-3xl', scale: 1.02, duration: 900 },
  { label: "workflow",    target: "#workflow",  scale: 1.0,  duration: 1000 },
  { label: "coders",      target: "#coders",    scale: 1.02, duration: 900 },
  { label: "faq",         target: "#faq",       scale: 1.0,  duration: 800 },
  { label: "cta",         target: 'section [class*="rounded-\\[32px\\]"]', scale: 1.06, duration: 1200 },
];

async function runShot(page: Page, shot: Shot): Promise<void> {
  const targetY = shot.target
    ? await page.evaluate(
        ({ sel, offset }: { sel: string; offset: number }) => {
          const el = document.querySelector(sel) as HTMLElement | null;
          if (!el) return 0;
          const r = el.getBoundingClientRect();
          return window.scrollY + r.top - offset;
        },
        { sel: shot.target, offset: 80 + (shot.yOffset ?? 0) },
      )
    : (shot.yOffset ?? 0);

  // Smooth scroll (native), then apply a subtle CSS scale for the "zoom"
  await page.evaluate(
    ({ y, scale }) => {
      window.scrollTo({ top: y, behavior: "smooth" });
      const root = document.documentElement;
      root.style.transition = "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)";
      root.style.transformOrigin = "50% 40%";
      root.style.transform = `scale(${scale})`;
    },
    { y: targetY, scale: shot.scale },
  );

  await page.waitForTimeout(shot.duration);

  // Reset scale so the next shot's scroll doesn't fight the transform.
  await page.evaluate(() => {
    const root = document.documentElement;
    root.style.transform = "scale(1)";
  });
  // Tiny settle before the next scroll begins.
  await page.waitForTimeout(120);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: "light",
    recordVideo: { dir: OUT_DIR, size: VIEWPORT },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();

  await page.goto(URL, { waitUntil: "networkidle" });

  // Wait for hero fade-ins to finish (avoid recording blur/opacity animations
  // at frame 0).
  await page.waitForTimeout(1400);

  for (const shot of shots) {
    console.log(`▶ shot: ${shot.label}`);
    await runShot(page, shot);
  }

  await context.close();
  await browser.close();

  // Rename the auto-generated .webm to something predictable.
  const files = readdirSync(OUT_DIR).filter((f) => f.endsWith(".webm"));
  const latest = files.map((f) => ({ f, m: Date.now() })).sort((a, b) => b.m - a.m)[0];
  if (!latest) throw new Error("No .webm produced");
  const webmOut = join(OUT_DIR, "marketing.webm");
  renameSync(join(OUT_DIR, latest.f), webmOut);
  console.log(`✔ wrote ${webmOut}`);

  // Convert to mp4 if ffmpeg is available (nicer for social / Twitter).
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    const mp4Out = join(OUT_DIR, "marketing.mp4");
    execSync(
      `ffmpeg -y -i "${webmOut}" -c:v libx264 -pix_fmt yuv420p -preset veryslow -crf 20 -movflags +faststart -an "${mp4Out}"`,
      { stdio: "inherit" },
    );
    console.log(`✔ wrote ${mp4Out}`);
  } catch {
    console.log("ℹ ffmpeg not found — skipping MP4 conversion.");
  }

  if (!existsSync(webmOut)) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
