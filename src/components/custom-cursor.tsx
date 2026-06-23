"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const [active, setActive] = useState(false);

  const springCursorX = useSpring(cursorX, { stiffness: 650, damping: 42 });
  const springCursorY = useSpring(cursorY, { stiffness: 650, damping: 42 });
  const springRingX = useSpring(ringX, { stiffness: 180, damping: 24 });
  const springRingY = useSpring(ringY, { stiffness: 180, damping: 24 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX - 18);
      cursorY.set(event.clientY - 18);
      ringX.set(event.clientX - 22);
      ringY.set(event.clientY - 22);
    };

    const enter = () => setActive(true);
    const leave = () => setActive(false);
    const targets = document.querySelectorAll("a, button, [data-cursor='magnetic']");

    window.addEventListener("mousemove", move);
    targets.forEach((target) => {
      target.addEventListener("mouseenter", enter);
      target.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", enter);
        target.removeEventListener("mouseleave", leave);
      });
    };
  }, [cursorX, cursorY, ringX, ringY]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 md:block"
        style={{ x: springCursorX, y: springCursorY, scale: active ? 0.65 : 1 }}
      >
        <Image
          src="/images/studio-nodo-simbolo.png"
          alt=""
          width={36}
          height={36}
          className="h-full w-full rounded-full"
          priority
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-11 w-11 rounded-full border border-nodo-accent/40 md:block"
        style={{ x: springRingX, y: springRingY, scale: active ? 1.8 : 1, opacity: active ? 0.5 : 0.7 }}
      />
    </>
  );
}
