"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

type MagneticButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function MagneticButton({ children, className, variant = "primary", ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18 });
  const springY = useSpring(y, { stiffness: 240, damping: 18 });

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const distanceX = event.clientX - (rect.left + rect.width / 2);
    const distanceY = event.clientY - (rect.top + rect.height / 2);

    x.set(distanceX * 0.18);
    y.set(distanceY * 0.22);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      data-cursor="magnetic"
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ease-luxury focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nodo-accent sm:min-h-14 sm:px-8",
        variant === "primary" && "bg-nodo-accent text-nodo-ink shadow-glow hover:shadow-[0_0_80px_rgba(167,183,158,0.22)]",
        variant === "secondary" && "border border-nodo-muted/20 bg-white/[0.035] text-nodo-text backdrop-blur-2xl hover:border-nodo-accent/50 hover:bg-white/[0.075]",
        variant === "ghost" && "text-nodo-muted hover:text-nodo-text",
        className
      )}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span className="absolute inset-0 translate-y-full bg-nodo-text/20 transition-transform duration-500 ease-luxury group-hover:translate-y-0" />
    </motion.a>
  );
}
