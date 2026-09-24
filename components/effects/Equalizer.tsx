"use client";

import { useEffect, useRef } from "react";
import { musicEngine } from "@/lib/musicEngine";

const BARS = 9;

/** Slim gold equalizer that subtly follows the song while it plays. */
export default function Equalizer({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    let visible = false;
    const levels = new Array(BARS).fill(0.15);

    const loop = (t: number) => {
      const bands = musicEngine.bands(BARS);
      for (let i = 0; i < BARS; i++) {
        // mirror the spectrum so the middle bars carry the bass
        const band = bands[Math.abs(i - Math.floor(BARS / 2))] ?? 0;
        const idle = 0.12 + 0.06 * Math.sin(t / 700 + i);
        const target = musicEngine.playing ? Math.max(idle, 0.1 + band * 0.9) : idle;
        levels[i] += (target - levels[i]) * 0.18;
        const bar = barRefs.current[i];
        if (bar) bar.style.transform = `scaleY(${levels[i].toFixed(3)})`;
      }
      if (visible) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(root);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className={`pointer-events-none flex h-8 items-end gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: BARS }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            barRefs.current[i] = el;
          }}
          className="block h-full w-[3px] origin-bottom rounded-full bg-gradient-to-t from-champagne-dark to-champagne-light opacity-70"
          style={{ transform: "scaleY(0.15)" }}
        />
      ))}
    </div>
  );
}
