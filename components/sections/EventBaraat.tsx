"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/Reveal";
import Petals from "@/components/effects/Petals";
import Arch from "@/components/icons/Arch";
import { events } from "@/lib/weddingData";
import { IMG } from "@/lib/assets";
import { useOpened } from "@/lib/experience";

/** A decorated ghodi, facing right, with the groom in a turban. */
function Horse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" fill="currentColor" className={className} aria-hidden>
      <path d="M10 22C12 16 20 14 30 15h10c3-3 5-7 8-9l2-3 2 3c3 1 6 4 8 7l-2 2-5-2c-1 3-3 6-5 8l-1 9 2 12h-3l-2-11-3-1-3 12h-3l1-12H22l-3 12h-3l1-11-3-1-2 12H9l1-12c-3-1-4-4-4-6-3 2-4 6-5 9 0-5 2-10 9-11z" />
      {/* saddle cloth */}
      <path d="M22 15h14l-1 9H23z" opacity="0.55" />
      {/* groom with turban */}
      <path d="M26 15l1-7h6l1 7z" />
      <circle cx="30" cy="5" r="2.6" />
      <path d="M27.2 3.4c1-2 4.6-2 5.6 0l.6-1.8-1.4.4L30 0l-1.9 2-1.5-.4z" />
    </svg>
  );
}

/** A small walking figure; `dhol` gives him a drum at the hip. */
function Walker({ dhol = false, className = "" }: { dhol?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 20 40" fill="currentColor" className={className} aria-hidden>
      <circle cx="10" cy="5" r="3.4" />
      <path d="M6 10h8l1 14h-3l-1 15H9L8 24H5z" />
      {dhol && <rect x="12.5" y="15" width="7" height="7" rx="3.5" opacity="0.8" />}
    </svg>
  );
}

/** A royal chhatri held over the procession. */
function Umbrella({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 44" fill="currentColor" className={className} aria-hidden>
      <path d="M1 12C3 5 9 1 15 1s12 4 14 11c-3-2-6-2-7 0-2-2-5-2-7 0-2-2-5-2-7 0-1-2-4-2-7 0z" />
      <rect x="14.2" y="11" width="1.6" height="30" />
      <path d="M11 38h4v3h-4z" opacity="0.7" />
    </svg>
  );
}

function Pin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden>
      <path
        d="M12 0C5.4 0 0 5.2 0 11.7 0 20.4 12 32 12 32s12-11.6 12-20.3C24 5.2 18.6 0 12 0z"
        fill="var(--color-champagne-dark)"
      />
      <circle cx="12" cy="11.5" r="4.5" fill="var(--color-pearl)" />
    </svg>
  );
}

/** Visual-only dhol beat: soft rings that pulse outward in a steady rhythm. */
function DholBeat({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/40 sm:h-56 sm:w-56"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1.2], opacity: [0.55, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/** Visual-only shehnai melody: a gold line gently undulating. */
function ShehnaiWave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 40"
      className={`pointer-events-none absolute text-champagne ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      aria-hidden
    >
      {[0, 1].map((i) => (
        <motion.path
          key={i}
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.5 - i * 0.2}
          animate={{
            d: [
              "M0 20 Q 25 8 50 20 T 100 20 T 150 20 T 200 20",
              "M0 20 Q 25 32 50 20 T 100 20 T 150 20 T 200 20",
              "M0 20 Q 25 8 50 20 T 100 20 T 150 20 T 200 20",
            ],
          }}
          transition={{ duration: 3.2 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}
    </svg>
  );
}

const ROUTE = "M40 70 C 110 10, 170 110, 240 50 S 330 30, 360 40";

export default function EventBaraat() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const opened = useOpened();
  const b = events.baraat;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-40 pt-24 text-center"
      style={{ background: "linear-gradient(180deg,#FFFDFC 0%,#FAF6F0 45%,#EFE2C9 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 28%, rgba(214,180,122,0.20), transparent 55%)",
        }}
      />

      {/* subtle horse silhouette watermark */}
      <Horse className="pointer-events-none absolute left-1/2 top-1/2 h-[48vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2 text-champagne opacity-[0.05]" />

      {/* dhol & shehnai, visual only */}
      <DholBeat className="left-[8%] top-[22%]" />
      <DholBeat className="right-[8%] top-[62%]" />
      <ShehnaiWave className="left-0 top-[14%] w-40 sm:w-72" />
      <ShehnaiWave className="right-0 top-[48%] w-40 sm:w-72" flip />

      {opened && <Petals count={16} variant="gold" />}

      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* traditional floral arch */}
        <div className="relative h-32 w-28 text-champagne-dark sm:h-40 sm:w-36">
          <Arch className="h-full w-full" />
          {[
            { top: "-6%", left: "36%", size: 34, delay: 0.2 },
            { top: "18%", left: "-10%", size: 24, delay: 0.45 },
            { top: "18%", left: "76%", size: 24, delay: 0.6 },
          ].map((f, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={{ top: f.top, left: f.left, width: f.size * 1.35, height: f.size }}
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: f.delay, ease: "backOut" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.lotus} alt="" loading="lazy" className="h-full w-full object-contain drop-shadow-[0_2px_4px_rgba(169,127,69,0.25)]" />
            </motion.span>
          ))}
        </div>

        <Reveal mode="scale">
          <p className="font-detail text-xs uppercase tracking-[0.5em] text-champagne-dark">Event Three</p>
        </Reveal>

        <Reveal mode="blur" duration={1.2} delay={0.1}>
          <h2 className="gold-shimmer-text animate-shimmer font-hindi text-5xl font-semibold leading-tight sm:text-7xl">
            {b.title}
          </h2>
        </Reveal>
        <Reveal mode="fade" delay={0.3}>
          <p className="font-hindi text-lg text-ink/80 sm:text-xl">{b.date}</p>
        </Reveal>

        <Reveal mode="fade-up" delay={0.45}>
          <div className="flex items-center gap-6 sm:gap-10">
            <div>
              <p className="font-hindi text-sm font-semibold text-champagne-dark">प्रस्थान</p>
              <p className="font-serif-alt text-lg text-ink/80 sm:text-xl">{b.departure}</p>
            </div>
            <div className="h-10 w-px bg-champagne/50" />
            <div>
              <p className="font-hindi text-sm font-semibold text-champagne-dark">आगमन</p>
              <p className="font-serif-alt text-lg text-ink/80 sm:text-xl">{b.arrival}</p>
            </div>
          </div>
        </Reveal>

        {/* route: Fun O Farm → Heaven's Feel Farm */}
        <Reveal mode="fade-up" delay={0.6} className="w-full max-w-md">
          <p className="font-hindi text-sm font-semibold text-champagne-dark">स्थान</p>
          <div className="relative mt-2 w-full">
            <svg viewBox="0 0 400 100" className="h-auto w-full text-champagne" fill="none" aria-hidden>
              <path d={ROUTE} stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" opacity="0.35" />
              <motion.path
                d={ROUTE}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : undefined}
                transition={{ duration: 2.6, delay: 0.9, ease: "easeInOut" }}
              />
            </svg>
            {[
              { left: "10%", top: "70%", delay: 0.8 },
              { left: "90%", top: "40%", delay: 3.4 },
            ].map((p, i) => (
              <motion.span
                key={i}
                className="absolute h-8 w-6 -translate-x-1/2 -translate-y-full"
                style={{ left: p.left, top: p.top }}
                initial={{ opacity: 0, y: -12 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: p.delay, ease: "backOut" }}
              >
                <span className="pin-pulse absolute left-1/2 top-full h-4 w-4 rounded-full bg-champagne/60" />
                <Pin className="relative h-full w-full" />
              </motion.span>
            ))}
          </div>
          <div className="mt-1 flex items-center justify-between gap-4">
            <p className="font-display text-xl text-ink sm:text-2xl">{b.from}</p>
            <p className="font-hindi text-sm text-ink/60">से</p>
            <p className="font-display text-xl text-ink sm:text-2xl">{b.to}</p>
          </div>
          <p className="mt-3 font-detail text-xs uppercase tracking-[0.2em] text-ink/50">{b.address}</p>
        </Reveal>
      </div>

      {/* horse procession strolling across the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 h-20 overflow-hidden sm:h-24" aria-hidden>
        <div className="gold-divider absolute inset-x-0 bottom-1" />
        <div className="baraat-procession absolute bottom-1 flex items-end gap-3 text-champagne-dark/60">
          <Walker dhol className="h-9 w-5 sm:h-11 sm:w-6" />
          <Walker className="h-9 w-5 sm:h-11 sm:w-6" />
          <Umbrella className="h-12 w-8 sm:h-14 sm:w-10" />
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <Horse className="h-14 w-20 sm:h-[4.5rem] sm:w-24" />
          </motion.div>
          <Walker dhol className="h-9 w-5 sm:h-11 sm:w-6" />
        </div>
      </div>
    </section>
  );
}
