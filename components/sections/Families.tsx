"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Arch from "@/components/icons/Arch";
import { families } from "@/lib/weddingData";
import { IMG } from "@/lib/assets";

function Heart({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.3 4 6.2 4 8.6 4 10.6 5.3 12 7.2 13.4 5.3 15.4 4 17.8 4c3.9 0 5.8 4.1 4.2 7.7C19.5 16.4 12 21 12 21z" />
    </motion.svg>
  );
}

function FamilyColumn({
  title,
  members,
  align,
}: {
  title: string;
  members: { name: string; note: string }[];
  align: "left" | "right";
}) {
  return (
    <Reveal mode={align === "left" ? "slide-right" : "slide-left"} className="flex-1">
      <div className={`flex flex-col gap-5 ${align === "left" ? "items-end text-right" : "items-start text-left"}`}>
        <p className="font-detail text-[11px] uppercase tracking-[0.4em] text-champagne-dark">{title}</p>
        <div className="gold-divider w-16" />
        {members.map((m) => (
          <div key={m.name}>
            <p className="font-hindi text-lg font-semibold leading-snug text-ink sm:text-2xl">{m.name}</p>
            {m.note && (
              <p className="mt-1 font-hindi text-sm font-light text-champagne-dark">({m.note})</p>
            )}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export default function Families() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ivory px-6 py-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.floral}
        alt=""
        aria-hidden
        loading="lazy"
        className="floral-sway pointer-events-none absolute -bottom-8 -right-8 w-44 opacity-60 sm:w-72"
      />
      <Reveal mode="fade">
        <p className="text-center font-detail text-xs uppercase tracking-[0.5em] text-champagne-dark">
          With The Blessings Of Our Families
        </p>
      </Reveal>
      <Reveal mode="fade-up" delay={0.15}>
        <h2 className="mt-3 text-center font-display text-3xl text-ink sm:text-5xl">
          Together With Our Families
        </h2>
      </Reveal>

      <div className="relative mt-14 flex w-full max-w-4xl items-center justify-center gap-6 sm:gap-14">
        <FamilyColumn title={families.bride.title} members={families.bride.parents} align="left" />

        <div className="flex flex-col items-center gap-3 text-champagne">
          <Arch className="h-28 w-20 sm:h-40 sm:w-28" />
          <Heart className="h-6 w-6 text-blush sm:h-7 sm:w-7" />
        </div>

        <FamilyColumn title={families.groom.title} members={families.groom.parents} align="right" />
      </div>
    </section>
  );
}
