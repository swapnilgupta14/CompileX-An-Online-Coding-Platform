"use client";

import { Container } from "@/components/ui/container";

const schools = [
  "MIT",
  "Stanford",
  "IIT Bombay",
  "Carnegie Mellon",
  "ETH Zürich",
  "Waterloo",
  "IIIT Hyderabad",
  "NTU",
  "Berkeley",
  "Cambridge",
];

export function LogoCloud() {
  return (
    <section aria-labelledby="logo-cloud" className="py-16 sm:py-20">
      <Container>
        <p
          id="logo-cloud"
          className="text-center text-[12px] font-medium uppercase tracking-[0.16em] text-muted"
        >
          Coders come from
        </p>

        <div className="relative mt-8 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent"
          />

          <div className="flex w-max animate-marquee gap-14">
            {[...schools, ...schools].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap font-display text-[22px] font-semibold tracking-[-0.02em] text-faint"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
