"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { HeroSurface } from "./HeroSurface";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: 0.05 + i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-40 lg:pt-44 pb-24 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-lines opacity-40"
      />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-[12px] font-medium text-muted-strong ring-1 ring-hairline"
          >
            <Sparkles className="h-3 w-3" aria-hidden />
            Season 3 is live — 40 fresh problems, 12 new battlegrounds.
            <span className="text-faint">·</span>
            <Link
              href="#"
              className="group inline-flex items-center gap-0.5 text-ink"
            >
              What&apos;s new
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-8 text-[44px] leading-[1.02] sm:text-6xl lg:text-[80px] font-semibold tracking-[-0.045em] text-balance"
          >
            Where code battles
            <br className="hidden sm:block" />{" "}
            <span className="relative inline-block">
              <span className="relative z-10">are won.</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.9,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: "left" }}
                className="absolute inset-x-0 bottom-1 -z-0 block h-3 bg-surface-alt"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted text-pretty"
          >
            CompileX is the calmest way to get sharper. Practice in the
            Arena, warm up in the Playground, then throw down in live
            Battlegrounds with real-time leaderboards.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-9 flex flex-wrap items-center justify-center gap-2.5"
          >
            <ButtonLink
              href="/login"
              size="lg"
              iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              Start free
            </ButtonLink>
            <ButtonLink href="#product" variant="secondary" size="lg">
              See it in motion
            </ButtonLink>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={4}
            className="mt-5 text-[12.5px] text-muted"
          >
            Free forever for individuals · No credit card · Cancel anytime
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 sm:mt-20"
        >
          <HeroSurface />
        </motion.div>
      </Container>
    </section>
  );
}
