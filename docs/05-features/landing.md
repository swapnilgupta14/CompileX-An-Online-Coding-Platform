# Landing page

## Purpose
Marketing homepage. Convince a visitor to sign in and try CompileX.

## Route
`/` (public).

## Sections
1. **Navbar** — sticky, blur-on-scroll, shrink, hover-underline links, mobile drawer. Links: Product, Features, Workflow, Customers, FAQ. CTAs: Sign in, Start free.
2. **Hero** — huge headline, subhead, primary + secondary CTA, animated product surface + two floating cards.
3. **Logo cloud** — animated marquee, edge-fades.
4. **Features** — 6 cards, monochrome icon tiles, hover lift, stagger-in.
5. **Interactive showcase** — 3-tab area with animated pill: Inbox / Automations / Insights (rename to Arena / Battleground / Playground once we're doing the real product; kept generic for the design demo).
6. **Stats** — 4 animated counters in a white card.
7. **Workflow timeline** — 4 steps, scroll-driven progress line, alternating sides.
8. **Testimonials** — Embla carousel, drag-free, dot indicators, arrow buttons.
9. **FAQ** — accordion, spring animation on the `+` icon.
10. **CTA** — full-width dark block, background line pattern, radial mask.
11. **Footer** — 4 columns of links + brand mark + legal row.

## Content voice
Calm, confident, understated. No exclamation marks, no growth-hacky verbs. Sentences favor one clean claim over three hedged ones.

## Rebuild notes
- Motion for section reveals: `initial={{opacity:0,y:24,filter:'blur(6px)'}} whileInView={{...}}` with `once: true, margin: "-80px"`.
- Every section max-width 7xl, generous vertical padding (24 sm:32 lg:40).
- Type scale for headlines: 44px → 80px depending on breakpoint, letter-spacing -0.045em.
- Hero product-surface is pure SVG/DOM (no image) so it's crisp everywhere.
