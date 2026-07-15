"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

/**
 * Counts from 0 → `to` once the element enters the viewport (fires once).
 * Returns the current interpolated value and a ref to attach to the element.
 */
export function useInViewCount(to: number, duration = 1.8) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v: number) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return { ref, value };
}
