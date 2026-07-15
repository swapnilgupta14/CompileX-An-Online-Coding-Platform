"use client";

import { motion } from "motion/react";
import {
  Braces,
  GitBranch,
  Radio,
  Swords,
  Timer,
  Trophy,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { AnimatedGrid } from "@/components/ui/animated-grid";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Braces className="h-4 w-4" />,
    title: "Playground that just runs",
    description:
      "Monaco editor, C++/Python/JS out of the box, stdin, stdout, sub-100ms runs. No sign-in required to warm up.",
  },
  {
    icon: <Swords className="h-4 w-4" />,
    title: "Live 1-v-1 battlegrounds",
    description:
      "Same problems, same starter, same clock. Real-time leaderboard on the same socket you're coding through.",
  },
  {
    icon: <Trophy className="h-4 w-4" />,
    title: "Ranking that means something",
    description:
      "Global percentile, weekly seasons, and honest metrics — no farming, no karma. Only wins that count.",
  },
  {
    icon: <Timer className="h-4 w-4" />,
    title: "Fast, everywhere",
    description:
      "Interactions under 16ms. Instant search. Offline-friendly editor. The interface disappears so the problem can appear.",
  },
  {
    icon: <Radio className="h-4 w-4" />,
    title: "Author your own problems",
    description:
      "Add problems and testcases in a live markdown editor. Run public/hidden testcases. Ship a battleground in five minutes.",
  },
  {
    icon: <GitBranch className="h-4 w-4" />,
    title: "Built on the boring stuff",
    description:
      "Django REST + WebSocket backend. Server components. Signed cookies. The parts you'd have picked yourself, chosen for you.",
  },
];

export function Features() {
  return (
    <Section id="features" className="relative">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything you need. Nothing you don't."
          description="Six primitives, composed with care. No sprawl, no fluff — just the essentials done exceptionally well."
        />

        <AnimatedGrid
          className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {features.map((f) => (
            <Card key={f.title} interactive className="flex flex-col gap-4 p-7">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-surface-inverse text-surface-inverse-fg">
                {f.icon}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">
                  {f.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  {f.description}
                </p>
              </div>
              <div className="mt-2 h-px w-full bg-hairline" />
              <motion.a
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                href="#"
                className="inline-flex items-center gap-1 text-[13px] font-medium text-ink"
              >
                Learn more <span aria-hidden>→</span>
              </motion.a>
            </Card>
          ))}
        </AnimatedGrid>
      </Container>
    </Section>
  );
}
