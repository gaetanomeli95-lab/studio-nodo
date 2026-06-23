"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[90] h-px w-full origin-left bg-nodo-accent shadow-glow"
      style={{ scaleX }}
    />
  );
}
