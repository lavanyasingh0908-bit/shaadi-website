"use client";

import { motion, type Transition } from "framer-motion";

export default function LetterReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const transition: Transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

  return (
    <Tag className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: "0.6em", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...transition, delay: delay + i * stagger }}
          aria-hidden
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </Tag>
  );
}
