"use client";

import { motion } from "framer-motion";

export function PageTransition() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95] bg-nodo-background"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}
