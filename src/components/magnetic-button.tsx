"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

type MagneticButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> & {
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
        variant === "primary" && "text-nodo-ink shadow-glow hover:shadow-[0_0_80px_rgba(167,183,158,0.28)]",
        variant === "secondary" && "text-nodo-text backdrop-blur-2xl",
        variant === "ghost" && "text-nodo-muted hover:text-nodo-text",
        className
      )}
      style={{
        x: springX,
        y: springY,
        ...(variant === "primary" && { background: "linear-gradient(135deg, rgba(167,183,158,0.95), rgba(213,209,200,0.9))" }),
        ...(variant === "secondary" && { background: "linear-gradient(135deg, rgba(30,34,41,0.7), rgba(37,42,51,0.5))" })
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Secondary: gradient border */}
      {variant === "secondary" && (
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/40 via-transparent to-rose-400/40 opacity-60 transition-opacity duration-500 group-hover:opacity-100" style={{ padding: "1px", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor" }} />
      )}

      {/* Shimmer sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-luxury group-hover:translate-x-full" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </motion.a>
  );
}
