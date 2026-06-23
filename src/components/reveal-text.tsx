"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import { cn } from "@/lib/cn";

type RevealTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export function RevealText({
  text,
  className,
  wordClassName,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.055,
  once = true
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn(className)} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block align-bottom"
          style={{ paddingBottom: "0.25em", lineHeight: 1.25 }}
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            initial={{ opacity: 0, y: "0.5em" }}
            whileInView={{ opacity: 1, y: "0%" }}
            viewport={{ once, margin: "-70px" }}
            transition={{ duration: 0.92, delay: delay + index * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
