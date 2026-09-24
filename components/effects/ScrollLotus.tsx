"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lotus from "@/components/icons/Lotus";
import { scrollState } from "@/lib/experience";

/** Vertical gold lotus progress indicator that replaces the native scrollbar. */
export default function ScrollLotus({ visible }: { visible: boolean }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const budRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    let shown = -1;
    const loop = () => {
      const p = scrollState.progress;
      if (Math.abs(p - shown) > 0.0005) {
        shown = p;
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
        if (budRef.current) {
          budRef.current.style.top = `${p * 100}%`;
          budRef.current.style.transform = `translate(-50%, -50%) rotate(${p * 360}deg)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="scroll-lotus pointer-events-none fixed top-1/2 z-40 h-40 w-4 -translate-y-1/2 sm:h-52"
      aria-hidden
    >
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-champagne/25" />
      <div
        ref={fillRef}
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-champagne-light via-champagne to-champagne-dark"
        style={{ transform: "scaleY(0)" }}
      />
      <div
        ref={budRef}
        className="absolute left-1/2 top-0 text-champagne-dark drop-shadow-[0_0_6px_rgba(214,180,122,0.7)]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <Lotus className="h-4 w-4" />
      </div>
    </motion.div>
  );
}
