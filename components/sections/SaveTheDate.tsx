"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { IMG } from "@/lib/assets";

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 0c0 4.5 1 8 3 10s5.5 3 7 3c-1.5 0-5.5 1-7 3s-3 5.5-3 10c0-4.5-1-8-3-10s-5.5-3-7-3c1.5 0 5.5-1 7-3s3-5.5 3-10z" />
    </svg>
  );
}

const stars = [
  { top: "12%", left: "10%", size: 10, delay: 0 },
  { top: "22%", left: "85%", size: 14, delay: 0.6 },
  { top: "70%", left: "8%", size: 8, delay: 1.1 },
  { top: "78%", left: "88%", size: 12, delay: 1.6 },
  { top: "45%", left: "92%", size: 7, delay: 0.3 },
];

export default function SaveTheDate() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-beige px-6 py-24 text-center">
      <FloralBottom />
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-champagne/70"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        >
          <Star className="h-full w-full" />
        </motion.span>
      ))}

      <Reveal mode="scale" duration={1.2}>
        <div className="text-champagne-dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.lotus}
            alt=""
            loading="lazy"
            width={64}
            height={48}
            className="mx-auto h-12 w-16 animate-bloom object-contain"
          />
        </div>
      </Reveal>

      <Reveal mode="fade" delay={0.2}>
        <p className="mt-6 font-detail text-xs uppercase tracking-[0.5em] text-champagne-dark">
          Save The Date
        </p>
      </Reveal>

      <div className="mt-6 flex items-center gap-4 sm:gap-8">
        <FlipCard label="20" />
        <span className="font-display text-4xl text-champagne-dark sm:text-6xl">—</span>
        <FlipCard label="21" />
      </div>

      <Reveal mode="fade-up" delay={0.4}>
        <p className="mt-8 font-display text-3xl italic text-ink sm:text-5xl">November 2026</p>
      </Reveal>

      <Reveal mode="fade" delay={0.6}>
        <p className="mt-4 max-w-md font-serif-alt text-sm text-ink/60 sm:text-base">
          Two days of colour, music and sacred rituals as we begin our forever.
        </p>
      </Reveal>
    </section>
  );
}

function FloralBottom() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.floral}
        alt=""
        aria-hidden
        loading="lazy"
        className="floral-sway pointer-events-none absolute -bottom-6 -right-6 w-40 opacity-70 sm:w-64"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.floral}
        alt=""
        aria-hidden
        loading="lazy"
        className="floral-sway pointer-events-none absolute -bottom-6 -left-6 w-40 -scale-x-100 opacity-70 sm:w-64"
      />
    </>
  );
}

function FlipCard({ label }: { label: string }) {
  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        className="flex h-20 w-16 items-center justify-center rounded-lg border border-champagne/60 bg-pearl font-display text-4xl text-ink shadow-lg shadow-champagne/10 sm:h-28 sm:w-24 sm:text-6xl"
        initial={{ rotateX: 90, opacity: 0 }}
        whileInView={{ rotateX: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {label}
      </motion.div>
    </div>
  );
}
