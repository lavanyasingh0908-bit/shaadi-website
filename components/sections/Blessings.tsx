"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import Diya from "@/components/icons/Diya";
import { IMG } from "@/lib/assets";

const PRAYER = ["मंगलं भगवान विष्णुः। मंगलं गरुड़ध्वजः।", "मंगलं पुण्डरीकाक्षः। मंगलाय तनो हरिः॥"];

export default function Blessings() {
  return (
    <section className="relative flex min-h-[90svh] w-full flex-col items-center justify-center overflow-hidden bg-charcoal-2 px-6 py-24 text-center">
      {/* the couple, full-bleed and softly blurred beneath the shlok */}
      <div data-parallax="0.14" className="pointer-events-none absolute inset-x-0 -inset-y-[8%]" aria-hidden>
        <Photo src={IMG.sv} alt="" tone="dark" className="h-full w-full scale-105 object-cover object-[50%_30%] blur-[3px]" />
      </div>
      {/* dark translucent wash with a warm ivory veil, for readability */}
      <div className="pointer-events-none absolute inset-0 bg-charcoal-2/60" />
      <div className="pointer-events-none absolute inset-0 bg-ivory/[0.06]" />
      <div className="grain-soft pointer-events-none absolute inset-0" />
      <div className="vignette-breathe pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(214,180,122,0.16), transparent 60%)",
        }}
      />

      <Reveal mode="scale" duration={1.3} className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.shivParvati}
          alt="Shiv & Parvati"
          loading="lazy"
          width={228}
          height={128}
          className="divine-glow h-24 w-auto sm:h-32"
        />
      </Reveal>

      <div className="relative mt-8 max-w-md sm:max-w-xl">
        {PRAYER.map((line, i) => (
          <Reveal key={line} mode="blur" delay={0.3 + i * 0.6} duration={1.4}>
            <p className="font-hindi text-lg leading-relaxed text-pearl/90 sm:text-2xl">{line}</p>
          </Reveal>
        ))}
      </div>

      <div className="relative mt-10 flex items-center gap-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="text-champagne"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            <Diya className="h-10 w-10 sm:h-12 sm:w-12" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
