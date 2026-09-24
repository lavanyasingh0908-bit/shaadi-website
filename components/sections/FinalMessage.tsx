"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { IMG } from "@/lib/assets";
import { scrollState, useOpened } from "@/lib/experience";
import { musicEngine } from "@/lib/musicEngine";

export default function FinalMessage() {
  const ref = useRef<HTMLElement>(null);
  const opened = useOpened();

  // Goodbye: petals drift away and the song settles to 40% volume.
  useEffect(() => {
    const el = ref.current;
    if (!el || !opened) return;
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 60%",
      onEnter: () => {
        scrollState.petals = 0;
        musicEngine.fadeTo(0.4, 4);
      },
      onLeaveBack: () => {
        scrollState.petals = 1;
        musicEngine.fadeTo(1, 2.5);
      },
    });
    return () => st.kill();
  }, [opened]);

  return (
    <section ref={ref} className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-charcoal">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <div data-parallax="0.1" className="absolute inset-x-0 -inset-y-[6%]">
          <Photo src={IMG.portraitClose} alt="Sejal & Himanshu" tone="dark" className="h-full w-full object-cover object-[50%_25%]" />
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-charcoal/55" />
      {/* dissolve into soft ivory */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-ivory/30 to-ivory" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <Reveal mode="blur" duration={1.4}>
          <h2 className="font-display text-5xl text-pearl sm:text-8xl">You Are Invited</h2>
        </Reveal>
        <Reveal mode="fade" delay={0.5}>
          <p className="font-serif-alt text-lg italic text-pearl/80 sm:text-2xl">With Love</p>
        </Reveal>
        <Reveal mode="fade-up" delay={0.7}>
          <p className="font-script text-4xl text-champagne sm:text-5xl">Karchuli&rsquo;s Family</p>
        </Reveal>
      </div>
    </section>
  );
}
