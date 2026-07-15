# Design system

## Principles
- Monochrome, quiet, expensive.
- Whitespace is the primary decoration.
- Motion is intentional — reveals, springs, hover lifts. Never decorative animation.
- No gradients, no neon, no glassmorphism (except optional navbar blur).

## Color tokens (Tailwind v4, `@theme` block)
| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#F8F8F6` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, inputs, elevated blocks |
| `--color-ink` | `#0A0A0A` | Primary text, primary button bg |
| `--color-ink-soft` | `#171717` | Alt primary |
| `--color-muted` | `#525252` | Secondary text |
| `--color-hairline` | `#E5E5E5` | Default borders |
| `--color-hairline-strong` | `#D4D4D4` | Emphasized borders |
| `--color-accent` | `#0A0A0A` | Same as ink; accent is *contrast*, not hue |

## Radii
`--radius-xs 6 · sm 8 · md 12 · lg 18 · xl 24 · 2xl 32`.

## Shadows
- `--shadow-hairline` — 1px ring at 4% black.
- `--shadow-card` — subtle 1–3px drop.
- `--shadow-lift` — 12/24px lift used on card hover and hero surface.

## Typography
- Family: Inter (via `next/font`).
- Feature settings: `cv02, cv03, cv04, cv11, ss01` for tabular numerals + humanist alternates.
- Scale (rough):
  - Body: 15px / 1.55.
  - Small: 12–13px.
  - H3: 22–24px, tracking -0.02em.
  - H2: 40–56px, tracking -0.035em.
  - H1: 44–80px, tracking -0.045em, weight 600.
- Use `text-balance` on hero + section headings; `text-pretty` on body paragraphs.

## Motion
Ease-out expo cubic-bezier `(0.16, 1, 0.3, 1)` is the house curve. Spring: `stiffness 260, damping 22` (cards) or `500, damping 30` (buttons).

Recipes:
- **Fade rise reveal**: `{opacity:0,y:24,filter:'blur(6px)'} → {opacity:1,y:0,filter:'blur(0)'}` with `duration: 0.7`.
- **Stagger children**: `staggerChildren: 0.06–0.1` on a wrapper.
- **Button press**: `whileTap: {scale: 0.97, y: 0}` + `whileHover: {y: -1}`.
- **Card lift**: `whileHover: {y: -4}` with ring/shadow crossfade.
- **Pill tab**: `layoutId` on the active pill for smooth translate.
- **Number counter**: `animate(0, to)` inside a `useInView({once:true})` gate.

## Components (finalized names)
- `ui/container` — max-width wrapper with responsive padding.
- `ui/section` — vertically-spaced section.
- `ui/section-heading` — eyebrow + h2 + description, with reveal.
- `ui/button` — `Button` (motion button) + `ButtonLink` (Next Link with same styling).
- `ui/card` — rounded, hairline, optional interactive lift.
- `ui/animated-grid` — staggered reveal wrapper.
- `ui/wordmark` — brand mark (icon + name).
- `marketing/Navbar` — sticky, blur-on-scroll, drawer.
- `marketing/Hero` + `HeroSurface`.
- `marketing/LogoCloud`, `Features`, `Showcase`, `Stats`, `Timeline`, `Testimonials`, `FAQ`, `CTA`, `Footer`.
- `dashboard/StatCard`, `DashboardChart`, `ActivityList`.

## Accessibility rules
- Every interactive has focus-visible ring (`ring-2 ring-neutral-950 ring-offset-2 offset-canvas`).
- All icons purely-decorative get `aria-hidden`.
- Landmark structure: one `<main>`, `<nav aria-label>`, `<footer>`.
- Contrast: ink on canvas is 14.5:1 — pass AAA. Muted on canvas is 6.9:1 — pass AA large; use for secondary text only.
