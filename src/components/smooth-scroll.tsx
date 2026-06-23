"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const HEADER_OFFSET = 84;

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    const handleAnchorClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;

      if (!anchor) {
        return;
      }

      const hash = anchor.getAttribute("href");

      if (!hash || hash === "#") {
        return;
      }

      const destination = document.querySelector(hash);

      if (!destination) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(destination as HTMLElement, {
        offset: -HEADER_OFFSET,
        duration: 1.3
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
