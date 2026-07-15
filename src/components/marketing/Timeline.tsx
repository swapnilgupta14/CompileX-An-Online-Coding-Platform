"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

interface Step {
  step: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    step: "01",
    title: "Warm up in the Playground",
    description:
      "Open the editor, pick a language, hit Run. Custom stdin, stdout, sub-100ms turnaround. No pressure, no scoring.",
  },
  {
    step: "02",
    title: "Sharpen in the Arena",
    description:
      "Pick a problem. Read the statement. Ship the code. See exactly which testcases passed, which didn't, and how long you took.",
  },
  {
    step: "03",
    title: "Enter the Battleground",
    description:
      "Live rooms, up to four problems, timer running. Every submission moves the leaderboard — you see your rank the moment it changes.",
  },
  {
    step: "04",
    title: "Climb the season",
    description:
      "Points compound across the season. Track your global percentile, your best subject, your worst. Aim higher next round.",
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 40%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="workflow">
      <Container size="lg">
        <SectionHeading
          eyebrow="Workflow"
          title="From warm-up to podium in one afternoon."
          description="A day with CompileX looks less like heroic effort and more like a quiet, capable system doing its job."
        />

        <div ref={containerRef} className="relative mt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[15px] top-1 bottom-1 w-px bg-hairline sm:left-1/2"
          />
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="pointer-events-none absolute left-[15px] top-1 w-px bg-ink sm:left-1/2"
          />

          <ol className="flex flex-col gap-16 sm:gap-24">
            {steps.map((s, i) => {
              const rightSide = i % 2 === 1;
              return (
                <motion.li
                  key={s.step}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid grid-cols-1 items-center gap-4 sm:grid-cols-2 sm:gap-16"
                >
                  <span
                    aria-hidden
                    className="absolute left-[10px] top-3 z-10 h-3 w-3 rounded-full bg-ink ring-4 ring-bg sm:left-1/2 sm:-translate-x-1/2"
                  />

                  <div
                    className={
                      rightSide
                        ? "sm:order-2 sm:pl-8"
                        : "pl-10 sm:pl-0 sm:pr-8 sm:text-right"
                    }
                  >
                    <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                      Step {s.step}
                    </div>
                    <h3 className="mt-2 text-[24px] font-semibold leading-tight tracking-[-0.02em] text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                      {s.description}
                    </p>
                  </div>

                  <div
                    className={
                      "hidden sm:block " + (rightSide ? "sm:order-1" : "")
                    }
                    aria-hidden
                  />
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
