"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { venue } from "@/lib/weddingData";
import { IMG } from "@/lib/assets";

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

export default function Venue() {
  return (
    <section className="relative w-full overflow-hidden bg-beige py-24">
      {/* floating lotus */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.lotus}
        alt=""
        aria-hidden
        loading="lazy"
        className="animate-float-slow pointer-events-none absolute right-[6%] top-10 w-16 opacity-80 sm:w-24"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.lotus}
        alt=""
        aria-hidden
        loading="lazy"
        className="animate-float-slower pointer-events-none absolute bottom-16 left-[4%] w-12 opacity-60 sm:w-16"
      />

      <div className="px-6 text-center">
        <Reveal mode="fade">
          <p className="font-detail text-xs uppercase tracking-[0.5em] text-champagne-dark">
            Where To Find Us
          </p>
        </Reveal>
        <Reveal mode="fade-up" delay={0.15}>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-5xl">The Venue</h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        {/* Left: cinematic venue image */}
        <Reveal
          mode="scale"
          className="relative w-full overflow-hidden rounded-[32px] border-4 border-pearl shadow-2xl shadow-black/10"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/11] lg:aspect-[4/5]">
            <div data-parallax="0.1" className="absolute inset-x-0 -inset-y-[6%]">
              <Photo
                src={IMG.venue}
                alt={venue.name}
                className="ken-burns h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
        </Reveal>

        {/* Right: details, map card, CTA */}
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <Reveal mode="fade-up" delay={0.1}>
            <p className="font-display text-3xl text-ink sm:text-4xl">{venue.name}</p>
          </Reveal>

          <Reveal mode="fade" delay={0.2}>
            <div className="gold-divider w-24" />
          </Reveal>

          <Reveal mode="fade-up" delay={0.25} className="flex flex-col gap-0.5">
            {venue.addressLines.slice(1).map((line) => (
              <p key={line} className="font-serif-alt text-base text-ink/65 sm:text-lg">
                {line}
              </p>
            ))}
          </Reveal>

          <Reveal mode="scale" delay={0.3} className="w-full max-w-md">
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl border border-champagne/70 bg-pearl shadow-[0_18px_40px_-16px_rgba(44,36,32,0.35)]"
              aria-label={`Open ${venue.name} in Google Maps`}
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <Photo
                  src={IMG.mapPreview}
                  alt={`Map to ${venue.name}`}
                  tone="ivory"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-full">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Pin className="h-9 w-7 drop-shadow-md" />
                </motion.div>
                <span className="pin-pulse absolute left-1/2 top-full h-3 w-6 rounded-[50%] bg-champagne-dark/40" />
              </div>
            </a>
          </Reveal>

          <Reveal mode="fade-up" delay={0.4}>
            <motion.a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="animate-pulse-glow inline-flex items-center gap-2 rounded-full border border-champagne bg-pearl px-7 py-3 font-detail text-xs uppercase tracking-[0.3em] text-champagne-dark shadow-md"
            >
              <span aria-hidden>📍</span> View Location
            </motion.a>
          </Reveal>

          <Reveal mode="fade" delay={0.55}>
            <p className="font-script text-2xl text-champagne-dark/90">
              &ldquo;We can&rsquo;t wait to celebrate with you.&rdquo;
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
