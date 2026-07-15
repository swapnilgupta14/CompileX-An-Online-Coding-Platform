"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

interface QA {
  q: string;
  a: string;
}

const faqs: QA[] = [
  {
    q: "Is CompileX free?",
    a: "The Playground and public Arena problems are free forever. Battlegrounds and Season leaderboards are also free — we may charge for private battlegrounds and organization features later. There's no credit card required to start.",
  },
  {
    q: "What languages are supported?",
    a: "C++, Python, and JavaScript run in the sandbox today. C++ is our reference stack (most competitive-programming testing happens there). More languages arrive when the sandbox can execute them safely.",
  },
  {
    q: "How are Battleground rooms created?",
    a: "Any authenticated user can spin up a room — give it a name, a start and end time, and up to four problems with testcases. Users join via a share link, pick a display name, and get a per-room user id. The leaderboard streams live.",
  },
  {
    q: "How does scoring work?",
    a: "Each testcase you pass adds a point. Rooms tie-break by earliest correct submission. Season standings are computed from your best rounds — one bad Tuesday doesn't sink you.",
  },
  {
    q: "Can I self-host?",
    a: "The frontend is open. The backend is a Django REST + WebSocket service — publishing a self-host guide is on the roadmap. If you need it now, get in touch.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Container size="md">
        <SectionHeading
          eyebrow="Questions"
          title="The most-asked, up front."
          description="Everything else is on the docs and pricing pages."
        />
        <ul className="mt-16 flex flex-col divide-y divide-hairline border-y border-hairline">
          {faqs.map((f, i) => {
            const isOpen = i === open;
            return (
              <li key={f.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[17.5px] font-medium tracking-[-0.015em] text-ink sm:text-[19px]">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 26 }}
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-hairline",
                      isOpen
                        ? "bg-surface-inverse text-surface-inverse-fg"
                        : "bg-surface text-ink",
                    )}
                  >
                    <Plus className="h-4 w-4" aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-12 text-[15px] leading-relaxed text-muted text-pretty">
                        {f.a}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
