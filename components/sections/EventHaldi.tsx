"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Petals from "@/components/effects/Petals";
import GoldParticles from "@/components/effects/GoldParticles";
import { events } from "@/lib/weddingData";

function ClayPot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 70" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 20h32l-6 42a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4L14 20z" />
      <ellipse cx="30" cy="20" rx="16" ry="5" />
      <path d="M22 20c0-6 3-11 8-11s8 5 8 11" opacity="0.6" />
    </svg>
  );
}

export default function EventHaldi() {
  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      style={{ background: "linear-gradient(170deg,#FFF6DE 0%,#FCE9B8 45%,#F4DAD6 100%)" }}
    >
      {/* soft watercolour splashes */}
      <div aria-hidden className="watercolor-splash pointer-events-none absolute -left-[15%] top-[8%] h-[55vw] max-h-[520px] w-[55vw] max-w-[520px]" style={{ background: "radial-gradient(closest-side, rgba(240,185,79,0.35), rgba(240,185,79,0.12) 60%, transparent)" }} />
      <div aria-hidden className="watercolor-splash pointer-events-none absolute -right-[12%] bottom-[6%] h-[50vw] max-h-[480px] w-[50vw] max-w-[480px]" style={{ background: "radial-gradient(closest-side, rgba(233,150,140,0.3), rgba(244,218,214,0.15) 60%, transparent)", animationDelay: "-6s" }} />
      <Petals count={30} variant="marigold" />
      {/* floating turmeric dust */}
      <GoldParticles count={28} tint="232,166,60" />

      <motion.div
        className="absolute left-[8%] bottom-10 text-champagne-dark/70"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ClayPot className="h-16 w-16 sm:h-24 sm:w-24" />
      </motion.div>
      <motion.div
        className="absolute right-[8%] bottom-16 text-champagne-dark/70"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <ClayPot className="h-12 w-12 sm:h-20 sm:w-20" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-5">
        <Reveal mode="scale">
          <p className="font-detail text-xs uppercase tracking-[0.5em] text-champagne-dark">
            Event One
          </p>
        </Reveal>
        <Reveal mode="fade-up" delay={0.15}>
          <h2 className="font-bodoni text-4xl text-ink sm:text-6xl">{events.haldi.title}</h2>
        </Reveal>
        <Reveal mode="fade" delay={0.35}>
          <p className="font-script text-3xl text-champagne-dark sm:text-4xl">
            &ldquo;{events.haldi.line}&rdquo;
          </p>
        </Reveal>
        <Reveal mode="fade-up" delay={0.5}>
          <div className="mt-4 flex flex-col items-center gap-1">
            <p className="font-serif-alt text-lg text-ink/80 sm:text-xl">{events.haldi.date}</p>
            <p className="font-serif-alt text-base text-ink/60">{events.haldi.time}</p>
            <p className="mt-2 font-detail text-sm uppercase tracking-[0.2em] text-ink/50">
              {events.haldi.venue}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
