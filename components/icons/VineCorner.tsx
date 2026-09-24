"use client";

import { motion } from "framer-motion";

const draw = (delay: number, duration = 2.2) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: {
    pathLength: { duration, delay, ease: [0.45, 0, 0.2, 1] as const },
    opacity: { duration: 0.3, delay },
  },
});

const bud = (delay: number) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, delay, ease: "backOut" as const },
});

/** The FloralCorner ornament, drawn on as a vine growing from the corner. */
export default function VineCorner({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden
    >
      <motion.path d="M10 10c40 4 70 18 90 46" strokeOpacity={0.7} {...draw(delay)} />
      <motion.path d="M10 10c4 40 18 70 46 90" strokeOpacity={0.7} {...draw(delay)} />
      <motion.path d="M70 30c8 6 10 16 4 24" strokeOpacity={0.5} {...draw(delay + 1, 1.2)} />
      <motion.path d="M30 70c6 8 16 10 24 4" strokeOpacity={0.5} {...draw(delay + 1, 1.2)} />
      <motion.path d="M100 20c4 2 6 6 4 10" strokeOpacity={0.35} {...draw(delay + 1.6, 0.8)} />
      <motion.path d="M20 100c2 4 6 6 10 4" strokeOpacity={0.35} {...draw(delay + 1.6, 0.8)} />
      <motion.circle cx="34" cy="34" r="10" strokeOpacity={0.55} {...bud(delay + 0.8)} />
      <motion.circle cx="58" cy="20" r="6" strokeOpacity={0.4} {...bud(delay + 1.3)} />
      <motion.circle cx="20" cy="58" r="6" strokeOpacity={0.4} {...bud(delay + 1.3)} />
      <motion.circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity={0.5} stroke="none" {...bud(delay + 0.2)} />
      <motion.circle cx="90" cy="46" r="2" fill="currentColor" fillOpacity={0.4} stroke="none" {...bud(delay + 2)} />
      <motion.circle cx="46" cy="90" r="2" fill="currentColor" fillOpacity={0.4} stroke="none" {...bud(delay + 2)} />
    </svg>
  );
}
