"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Petal = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
};

const COLORS: Record<string, string[]> = {
  marigold: ["#E8A63C", "#F0B94F", "#D68F2A"],
  rose: ["#E9B7B0", "#F4DAD6", "#DDA39B"],
  gold: ["#D6B47A", "#E8D3AB", "#B8935A"],
};

export default function Petals({
  count = 24,
  variant = "marigold",
  className = "",
  once = false,
}: {
  count?: number;
  variant?: "marigold" | "rose" | "gold";
  className?: string;
  /** Fall a single time (a shower) instead of looping forever. */
  once?: boolean;
}) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 14,
        delay: Math.random() * (once ? 1.6 : 8),
        duration: 7 + Math.random() * 8,
        drift: (Math.random() - 0.5) * 120,
        rotate: Math.random() * 360,
      }))
    );
  }, [count, once]);

  const colors = COLORS[variant];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute block rounded-[60%_40%_60%_40%]"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            width: p.size,
            height: p.size * 0.8,
            background: colors[p.id % colors.length],
            opacity: 0.85,
          }}
          initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "115vh",
            x: [0, p.drift, -p.drift * 0.5, 0],
            rotate: p.rotate,
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: once ? 0 : Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
