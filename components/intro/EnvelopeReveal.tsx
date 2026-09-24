"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Lotus from "@/components/icons/Lotus";
import { IMG } from "@/lib/assets";

const PAPER = "linear-gradient(160deg, #fffdfc 0%, #faf6f0 55%, #efe3d3 100%)";

/**
 * Luxury envelope opening (~3.6s):
 * envelope enters → wax seal cracks → flap opens → invitation slides up →
 * backdrop turns into the palace watercolour → fades into the site.
 * A Skip button appears after 2s and fast-forwards the timeline.
 */
export default function EnvelopeReveal({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const done = useRef(onComplete);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    done.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const skipTimer = setTimeout(() => setCanSkip(true), 2000);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ onComplete: () => done.current() });
      tlRef.current = tl;

      tl.from(q(".env-stage"), { y: 160, rotate: -5, opacity: 0, duration: 0.75, ease: "power3.out" })
        .from(q(".env-shadow"), { scaleX: 0.4, opacity: 0, duration: 0.75, ease: "power3.out" }, "<")
        // seal cracks: hairline flashes, halves split and fall away
        .to(q(".seal-crack"), { strokeDashoffset: 0, duration: 0.18, ease: "power1.in" }, "+=0.05")
        .to(q(".seal-left"), { x: -16, y: 18, rotate: -28, opacity: 0, duration: 0.45, ease: "power2.in" }, "+=0.05")
        .to(q(".seal-right"), { x: 16, y: 22, rotate: 32, opacity: 0, duration: 0.45, ease: "power2.in" }, "<")
        .to(q(".seal-crack-wrap"), { opacity: 0, duration: 0.2 }, "<0.1")
        // flap opens; once it passes vertical it tucks behind the card
        .fromTo(q(".env-flap"), { rotateX: 0, transformPerspective: 900 }, { rotateX: 180, transformPerspective: 900, duration: 0.7, ease: "power2.inOut" }, "-=0.15")
        .set(q(".env-flap"), { zIndex: 1 }, "-=0.35")
        // invitation slides up while the palace watercolour blooms in
        .to(q(".env-card"), { yPercent: -58, duration: 1, ease: "power3.out" }, "-=0.1")
        .to(q(".env-palace"), { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "<")
        .to(q(".env-card"), { scale: 1.06, duration: 0.5, ease: "power1.out" }, "-=0.2")
        // hand over to the site
        .to(el, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "+=0.05");
    }, el);

    return () => {
      clearTimeout(skipTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(circle at 50% 40%, #f4dad6 0%, #eedfd5 55%, #e6d2b4 100%)" }}
    >
      {/* palace watercolour backdrop */}
      <div className="env-palace absolute inset-0 opacity-0" style={{ transform: "scale(1.08)" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG.palace})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(250,246,240,0.78) 0%, rgba(250,246,240,0.35) 55%, rgba(250,246,240,0.1) 100%)",
          }}
        />
      </div>

      <div className="relative">
        <div className="env-shadow absolute -bottom-6 left-1/2 h-6 w-[85%] -translate-x-1/2 rounded-[50%] bg-black/15 blur-md" />

        <div className="env-stage relative h-[220px] w-[320px] sm:h-[260px] sm:w-[380px]">
          {/* inside / back of the envelope */}
          <div
            className="absolute inset-0 rounded-md border border-champagne/50"
            style={{
              background: "linear-gradient(180deg,#e9dac6 0%,#f3e8da 60%)",
              boxShadow: "inset 0 10px 24px rgba(120,90,50,0.18)",
              zIndex: 0,
            }}
          />

          {/* the invitation card */}
          <div
            className="env-card absolute inset-x-[6%] bottom-[5%] top-[7%] flex flex-col items-center justify-center gap-2 rounded-sm border border-champagne/60 bg-ivory text-center shadow-[0_8px_24px_rgba(44,36,32,0.15)]"
            style={{ zIndex: 2 }}
          >
            <div className="absolute inset-2 rounded-[2px] border border-champagne/30" />
            <Lotus className="h-6 w-6 text-champagne-dark" />
            <p className="font-script text-2xl text-ink">Sejal &amp; Himanshu</p>
            <p className="font-detail text-[10px] uppercase tracking-[0.3em] text-champagne-dark">
              21 · 11 · 2026
            </p>
          </div>

          {/* front pocket: side and bottom folds */}
          <div className="absolute inset-0 overflow-hidden rounded-md" style={{ zIndex: 3 }}>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg,#f3eadf,#fbf6ef)", clipPath: "polygon(0 0, 52% 56%, 0 100%)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(270deg,#f3eadf,#fbf6ef)", clipPath: "polygon(100% 0, 48% 56%, 100% 100%)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: PAPER,
                clipPath: "polygon(0 100%, 50% 46%, 100% 100%)",
                filter: "drop-shadow(0 -2px 3px rgba(120,90,50,0.12))",
              }}
            />
            <div className="absolute inset-0 rounded-md border border-champagne/60" />
          </div>

          {/* top flap */}
          <div
            className="env-flap absolute inset-x-0 top-0 h-[58%] origin-top"
            style={{ zIndex: 4 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg,#fffdfc 0%,#f7ece2 70%,#f1ddd5 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                filter: "drop-shadow(0 3px 4px rgba(120,90,50,0.18))",
              }}
            />
          </div>

          {/* wax seal (two halves that crack apart) */}
          <div
            className="absolute left-1/2 top-[58%] h-14 w-14 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 5 }}
          >
            {(["left", "right"] as const).map((side) => (
              <div
                key={side}
                className={`seal-${side} absolute inset-0 flex items-center justify-center rounded-full text-pearl`}
                style={{
                  background: "radial-gradient(circle at 35% 30%, #c89a5a 0%, #a97f45 55%, #7d5a2c 100%)",
                  boxShadow: "0 4px 10px rgba(80,50,20,0.35), inset 0 2px 3px rgba(255,240,210,0.35)",
                  clipPath:
                    side === "left"
                      ? "polygon(0 0, 55% 0, 45% 30%, 58% 52%, 44% 75%, 52% 100%, 0 100%)"
                      : "polygon(55% 0, 100% 0, 100% 100%, 52% 100%, 44% 75%, 58% 52%, 45% 30%)",
                }}
              >
                <Lotus className="h-6 w-6" />
              </div>
            ))}
            <svg viewBox="0 0 56 56" className="seal-crack-wrap pointer-events-none absolute inset-0">
              <path
                className="seal-crack"
                d="M30.8 0 L25.2 16.8 L32.5 29 L24.6 42 L29 56"
                stroke="#fff6e3"
                strokeWidth="1.2"
                fill="none"
                strokeDasharray="70"
                strokeDashoffset="70"
              />
            </svg>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {canSkip && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              tlRef.current?.timeScale(5);
              setCanSkip(false);
            }}
            className="safe-bottom absolute bottom-8 right-6 rounded-full border border-champagne/60 bg-pearl/70 px-5 py-2 font-detail text-[10px] uppercase tracking-[0.3em] text-champagne-dark backdrop-blur-sm"
          >
            Skip
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
