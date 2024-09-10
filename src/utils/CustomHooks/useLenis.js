import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      });

      lenisRef.current = lenis;
      const animate = (time) => {
        lenis.raf(time);
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
      return () => {
        lenis.destroy();
      };
    }
  }, []);

  return lenisRef.current; 
};

export default useLenis;
