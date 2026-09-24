"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VineCorner from "@/components/icons/VineCorner";
import GoldParticles from "@/components/effects/GoldParticles";
import Bokeh from "@/components/effects/Bokeh";
import LightRays from "@/components/effects/LightRays";
import { IMG } from "@/lib/assets";
import LetterReveal from "@/components/LetterReveal";
import { couple } from "@/lib/weddingData";

export default function HeroGate({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<"shlok" | "names">("shlok");

  useEffect(() => {
    const t = setTimeout(() => setPhase("names"), 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ivory px-6 text-center">
      {/* textured ivory background */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(214,180,122,0.18), transparent 55%), radial-gradient(circle at 80% 75%, rgba(244,218,214,0.35), transparent 55%)",
        }}
      />
      <LightRays opacity={0.5} />
      <Bokeh />
      <GoldParticles count={22} />

      <VineCorner className="pointer-events-none absolute -left-4 -top-4 h-28 w-28 text-champagne/70 sm:h-40 sm:w-40" delay={0.2} />
      <VineCorner className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rotate-90 text-champagne/70 sm:h-40 sm:w-40" delay={0.5} />
      <VineCorner className="pointer-events-none absolute -bottom-4 -left-4 h-28 w-28 -rotate-90 text-champagne/70 sm:h-40 sm:w-40" delay={0.8} />
      <VineCorner className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 rotate-180 text-champagne/70 sm:h-40 sm:w-40" delay={1.1} />

      <AnimatePresence mode="wait">
        {phase === "shlok" ? (
          <motion.div
            key="shlok"
            className="relative z-10 flex max-w-md flex-col items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8 } }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-champagne-dark"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG.ganesh}
                alt="Shri Ganesh"
                width={96}
                height={96}
                decoding="async"
                fetchPriority="high"
                className="h-20 w-20 object-contain drop-shadow-[0_0_14px_rgba(214,180,122,0.45)] sm:h-24 sm:w-24"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-hindi text-lg text-champagne-dark sm:text-xl"
            >
              ।। श्री गणेशाय नमः ।।
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.1 }}
              className="font-hindi text-sm leading-relaxed text-ink/80 sm:text-base"
            >
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
              <br />
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="names"
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="font-detail text-[11px] uppercase tracking-[0.4em] text-champagne-dark/80">
              Together with our families
            </p>

            <div className="relative flex flex-col items-center gap-1">
              {/* gold shimmer glowing behind the names */}
              <motion.span
                aria-hidden
                className="names-shimmer pointer-events-none absolute -inset-x-16 -inset-y-6 -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
              />
              <LetterReveal
                as="h1"
                text={couple.bride}
                className="font-script text-6xl text-ink sm:text-7xl"
                stagger={0.08}
              />
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="font-display text-2xl text-champagne-dark sm:text-3xl"
              >
                &amp;
              </motion.span>
              <LetterReveal
                as="h1"
                text={couple.groom}
                className="font-script text-6xl text-ink sm:text-7xl"
                delay={0.9}
                stagger={0.08}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.9 }}
              className="mt-3 flex flex-col items-center gap-3"
            >
              <div className="gold-divider w-24" />
              <p className="font-serif-alt text-lg tracking-wide text-ink/80 sm:text-xl">
                {couple.weddingDate}
              </p>
              <p className="max-w-xs font-serif-alt text-sm italic text-ink/60 sm:text-base">
                &ldquo;{couple.tagline}&rdquo;
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={onOpen}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              whileTap={{ scale: 0.96 }}
              className="animate-pulse-glow group relative mt-6 overflow-hidden rounded-full border border-champagne px-8 py-3.5 font-detail text-xs uppercase tracking-[0.3em] text-champagne-dark"
            >
              <span
                className="absolute inset-0 -z-10 animate-shimmer opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, transparent 30%, rgba(214,180,122,0.6) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
              />
              Tap To Open Invitation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
