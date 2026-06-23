"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/cn";

/* TiltCard — 3D mouse-tracking tilt with perspective */
export function TiltCard({
  children,
  className,
  intensity = 8
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative [perspective:1200px]", className)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/* SpotlightCard — radial glow that follows the mouse */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(167,183,158,0.12)",
  style
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={cn("group relative overflow-hidden", className)}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: visible ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 50%)`
        }}
      />
      {children}
    </div>
  );
}

/* AnimatedCounter — counts up when scrolled into view */
export function AnimatedCounter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

/* AccordionItem — expandable/collapsible with smooth animation */
export function AccordionItem({
  title,
  children,
  index,
  defaultOpen = false
}: {
  title: string;
  children: ReactNode;
  index: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="group border-t border-white/[0.08] transition-colors duration-300 hover:border-nodo-accent/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-7 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="font-display text-sm font-medium text-nodo-accent/40">
            0{index + 1}
          </span>
          <h3 className="flex items-center gap-3 text-xl font-medium tracking-[-0.035em] text-nodo-text">
            <span className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors duration-300",
              open ? "bg-nodo-accent" : "bg-nodo-accent/40"
            )} />
            {title}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.1] text-nodo-accent"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-8 pr-4 text-base leading-8 text-nodo-muted/75">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* MagneticWrapper — magnetic pull effect for any element */
export function MagneticWrapper({
  children,
  className,
  strength = 0.2
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
