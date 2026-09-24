"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import Petals from "@/components/effects/Petals";
import Mandap from "@/components/icons/Mandap";
import Diya from "@/components/icons/Diya";
import { events } from "@/lib/weddingData";
import { IMG } from "@/lib/assets";
import { useOpened } from "@/lib/experience";

const blooms = [
  { top: "8%", left: "18%", delay: 0.2, size: 24 },
  { top: "4%", left: "50%", delay: 0.5, size: 30 },
  { top: "10%", left: "80%", delay: 0.35, size: 22 },
];

const diyas = [
  { bottom: "18%", left: "10%", delay: 0.3 },
  { bottom: "24%", left: "88%", delay: 0.9 },
  { bottom: "12%", left: "48%", delay: 0.6 },
];

export default function EventWedding() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const opened = useOpened();

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      style={{ background: "linear-gradient(180deg,#FAF6F0 0%,#F4DAD6 65%,#EEDFD5 100%)" }}
    >
      {/* the couple, as a whisper-soft backdrop beneath the section's own palette */}
      <div data-parallax="0.12" className="pointer-events-none absolute inset-x-0 -inset-y-[8%]" aria-hidden>
        <Photo src={IMG.portraitStanding} alt="" className="h-full w-full object-cover object-[45%_30%] opacity-[0.16]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg,rgba(250,246,240,0.55) 0%,rgba(244,218,214,0.35) 65%,rgba(238,223,213,0.7) 100%)" }}
      />

      {/* temple bell ripples */}
      <div className="pointer-events-none absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="bell-ripple absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] rounded-full border border-champagne/40"
            style={{ animationDelay: `${i * 2}s` }}
          />
        ))}
      </div>

      {/* rose petals fall once as the section appears */}
      {opened && inView && <Petals count={28} variant="rose" once />}

      <div className="relative mt-4 h-56 w-full max-w-lg text-champagne-dark sm:h-72">
        <Mandap className="h-full w-full" />
        {blooms.map((b, i) => (
          <motion.span
            key={i}
            className="absolute text-champagne"
            style={{ top: b.top, left: b.left, width: b.size * 1.35, height: b.size }}
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: b.delay + 0.2, ease: "backOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.lotus} alt="" loading="lazy" className="h-full w-full object-contain drop-shadow-[0_2px_4px_rgba(169,127,69,0.25)]" />
          </motion.span>
        ))}
        {diyas.map((d, i) => (
          <motion.span
            key={i}
            className="absolute text-champagne-dark"
            style={{ bottom: d.bottom, left: d.left, width: 26, height: 30 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
          >
            <span className="diya-glow absolute -inset-3 -top-5 rounded-full" aria-hidden />
            <Diya className="relative h-full w-full" />
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mt-6 flex flex-col items-center gap-5">
        <Reveal mode="scale">
          <p className="font-detail text-xs uppercase tracking-[0.5em] text-champagne-dark">
            Event Four
          </p>
        </Reveal>
        <Reveal mode="fade-up" delay={0.15}>
          <h2 className="font-bodoni text-4xl text-ink sm:text-6xl">{events.wedding.title}</h2>
        </Reveal>
        <Reveal mode="fade" delay={0.35}>
          <p className="font-script text-3xl text-champagne-dark sm:text-4xl">
            {events.wedding.line}
          </p>
        </Reveal>
        <Reveal mode="fade-up" delay={0.5}>
          <div className="mt-4 flex flex-col items-center gap-1">
            <p className="font-serif-alt text-lg text-ink/80 sm:text-xl">{events.wedding.date}</p>
            <p className="font-serif-alt text-base text-ink/60">{events.wedding.time}</p>
            <p className="mt-2 font-detail text-sm uppercase tracking-[0.2em] text-ink/50">
              {events.wedding.venue}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
