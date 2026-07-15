"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  org: string;
}

const items: Testimonial[] = [
  {
    quote:
      "The Battleground is the closest I've felt to a real interview since my ACM-ICPC days. It made my prep actually enjoyable.",
    name: "Alina Reyes",
    role: "Software Engineer",
    org: "Stripe",
  },
  {
    quote:
      "Our whole intern cohort trains on CompileX. We shipped one battleground for onboarding and it replaced two rounds of interviews.",
    name: "Ben Okafor",
    role: "Engineering Manager",
    org: "Meridian",
  },
  {
    quote:
      "It's the first competitive coding site that doesn't feel hostile. Clean UI, honest scoring, no karma farming.",
    name: "Priya Iyer",
    role: "PhD candidate",
    org: "CMU",
  },
  {
    quote:
      "I picked up C++ again after five years just because the Playground is nicer than my IDE.",
    name: "Jonas Weiss",
    role: "Frontend engineer",
    org: "Vercel",
  },
  {
    quote:
      "The leaderboard streaming over the same socket is chef's kiss. Everything just feels alive.",
    name: "Sofía Márquez",
    role: "Staff engineer",
    org: "Kestrel",
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <Section id="coders">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Coders"
            align="left"
            title="Loved by people who ship."
            description="From students to staff engineers, CompileX earns its place quietly."
          />
          <div className="flex items-center gap-2">
            <IconBtn
              disabled={!prevEnabled}
              onClick={() => emblaApi?.scrollPrev()}
              label="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4" />
            </IconBtn>
            <IconBtn
              disabled={!nextEnabled}
              onClick={() => emblaApi?.scrollNext()}
              label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4" />
            </IconBtn>
          </div>
        </div>
      </Container>

      <div className="relative mt-14">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 pl-6 sm:pl-8 lg:pl-[max(1rem,calc((100vw-72rem)/2+2.5rem))]">
            {items.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative min-w-0 shrink-0 basis-[85%] rounded-3xl bg-surface p-8 ring-1 ring-hairline shadow-[var(--shadow-card)] sm:basis-[55%] lg:basis-[38%]"
              >
                <Quote
                  className="absolute right-6 top-6 h-6 w-6 text-hairline-strong"
                  aria-hidden
                />
                <blockquote className="text-[17px] leading-relaxed text-ink text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-inverse text-[12px] font-semibold text-surface-inverse-fg">
                    {t.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </span>
                  <div>
                    <div className="text-[13.5px] font-medium text-ink">
                      {t.name}
                    </div>
                    <div className="text-[12px] text-muted">
                      {t.role} · {t.org}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        <Container className="mt-8 flex items-center justify-center gap-1.5">
          {snaps.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === selected
                  ? "w-6 bg-ink"
                  : "w-1.5 bg-hairline-strong hover:bg-muted",
              )}
            />
          ))}
        </Container>
      </div>
    </Section>
  );
}

function IconBtn({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-10 w-10 place-items-center rounded-full bg-surface text-muted-strong ring-1 ring-hairline transition-colors hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
