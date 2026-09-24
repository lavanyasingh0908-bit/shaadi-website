"use client";

import { motion } from "framer-motion";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import GoldParticles from "@/components/effects/GoldParticles";
import Bokeh from "@/components/effects/Bokeh";
import LightRays from "@/components/effects/LightRays";
import { IMG } from "@/lib/assets";
import { useOpened } from "@/lib/experience";

export default function HeroPhoto() {
  const opened = useOpened();

  return (
    <section className="relative flex h-[100svh] w-full items-end justify-center overflow-hidden bg-charcoal">
      {/* slow Ken Burns zoom, starting the moment the invitation opens */}
      <div data-parallax="0.1" className="absolute inset-x-0 -inset-y-[6%]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.02 }}
          animate={opened ? { scale: 1.16, x: "-1.5%" } : { scale: 1.02 }}
          transition={{ duration: 24, ease: "easeOut" }}
        >
          <Photo
            src={IMG.hero}
            alt="Sejal & Himanshu"
            tone="dark"
            priority
            className="h-full w-full object-cover object-[62%_30%]"
          />
        </motion.div>
      </div>

      {/* golden light leaks */}
      <div
        className="pointer-events-none absolute -left-1/4 -top-1/4 h-2/3 w-2/3 rounded-full opacity-40 mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(214,180,122,0.6), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-2/3 w-2/3 rounded-full opacity-30 mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(244,218,214,0.5), transparent 65%)" }}
      />
      {/* bottom scrim for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />

      <LightRays opacity={0.28} />
      <Bokeh className="mix-blend-screen" />
      <GoldParticles count={26} />

      <div className="relative z-10 flex w-full flex-col items-center gap-8 pb-20 text-center sm:pb-28">
        <Reveal mode="blur" duration={1.4}>
          <p className="max-w-xs font-hindi text-lg leading-relaxed text-pearl/90 sm:max-w-xl sm:text-2xl">
            कुछ रिश्ते किस्मत से मिलते हैं,
            <br />
            और कुछ हमेशा के लिए बन जाते हैं।
          </p>
        </Reveal>

        <motion.div
          className="flex flex-col items-center gap-2 text-pearl/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-detail text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-champagne to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
