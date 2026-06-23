"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  "/images/hero-studio-nodo.png",
  "/images/hero-studio-nodo 2.png",
  "/images/hero-studio-nodo 3.png",
  "/images/hero-studio-nodo 4.png",
  "/images/hero-studio-nodo 5.png"
];

function Layer({ src, index, total, progress }: { src: string; index: number; total: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const half = 1 / total;
  const center = (index + 0.5) * half;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const opacity = useTransform(
    progress,
    isFirst ? [0, center, center + half] : isLast ? [center - half, center, 1] : [center - half, center, center + half],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 0]
  );
  const scale = useTransform(
    progress,
    [Math.max(0, center - half), Math.min(1, center + half)],
    [1.1, 1]
  );

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={src}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover object-center blur-sm scale-105"
        />
      </motion.div>
    </motion.div>
  );
}

export function HeroBackdrop() {
  const { scrollYProgress } = useScroll();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-nodo-background">
      {images.map((src, index) => (
        <Layer key={src} src={src} index={index} total={images.length} progress={scrollYProgress} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-nodo-background/92 via-nodo-background/88 to-nodo-background/95" />
      <div className="absolute inset-0 bg-nodo-background/40" />
      <div className="noise absolute inset-0 opacity-[0.05]" />
    </div>
  );
}
