"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

/**
 * Dark CTA block. Uses the "inverse" surface so it flips correctly in
 * dark mode (dark on light becomes light on dark).
 */
export function CTA() {
  return (
    <Section className="!pb-24 sm:!pb-32">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[32px] bg-surface-inverse px-8 py-16 text-surface-inverse-fg sm:px-16 sm:py-24"
        >
          <BackgroundLines />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.035em] text-surface-inverse-fg sm:text-[56px] text-balance">
              Get sharper. Starting now.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16.5px] leading-relaxed text-surface-inverse-fg/70 text-pretty">
              Open the Playground, pick your language, hit Run. Then move on
              to the Arena. Then throw down in a Battleground. That&apos;s a
              good day.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
              <ButtonLink
                href="/login"
                size="lg"
                variant="secondary"
                className="!bg-surface !text-ink hover:!bg-surface-alt"
                iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}
              >
                Start free
              </ButtonLink>
              <ButtonLink
                href="#faq"
                size="lg"
                variant="ghost"
                className="!text-surface-inverse-fg/80 hover:!text-surface-inverse-fg hover:!bg-white/10"
              >
                Read the FAQ
              </ButtonLink>
            </div>
            <p className="mt-5 text-[12.5px] text-surface-inverse-fg/60">
              Free forever for individuals · No credit card required
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

function BackgroundLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 500"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="cta-lines"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </pattern>
        <radialGradient id="cta-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="cta-mask">
          <rect width="1200" height="500" fill="url(#cta-fade)" />
        </mask>
      </defs>
      <rect
        width="1200"
        height="500"
        fill="url(#cta-lines)"
        mask="url(#cta-mask)"
      />
    </svg>
  );
}
