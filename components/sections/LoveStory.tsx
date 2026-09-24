"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { loveStoryMoments } from "@/lib/weddingData";
import { useOpened } from "@/lib/experience";

type Moment = (typeof loveStoryMoments)[number];

/** Black & white film still with a slow zoom tied to scroll position. */
function StoryCard({ moment, index: i }: { moment: Moment; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const zoom = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <motion.figure
      ref={ref}
      className={`group relative flex w-[78vw] flex-none snap-center flex-col items-center gap-4 sm:w-[38vw] lg:w-[22vw] ${
        i % 2 === 1 ? "lg:mt-16" : ""
      }`}
      initial={{ opacity: 0, filter: "blur(14px)", scale: 0.92 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full overflow-hidden rounded-[1.4rem] border-4 border-pearl bg-ivory shadow-xl shadow-black/10 transition-[border-color,box-shadow] duration-700 group-hover:border-champagne-light group-hover:shadow-[0_18px_50px_-12px_rgba(169,127,69,0.45)]">
        <div
          className={`story-film grain-hover relative w-full overflow-hidden ${
            moment.tall ? "aspect-[3/4]" : "aspect-[4/4.4]"
          }`}
        >
          <motion.div className="h-full w-full" style={{ scale: zoom }}>
            <div className="h-full w-full transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]">
              <Photo
                src={moment.image}
                alt={moment.caption}
                tone="bw"
                className="story-bw h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <figcaption className="font-script text-3xl text-champagne-dark">{moment.caption}</figcaption>
    </motion.figure>
  );
}

/**
 * Cinematic story gallery.
 *  - Desktop: the section pins and scrolling glides the photos sideways, in a
 *    staggered Pinterest-style masonry rhythm.
 *  - Mobile: native swipe carousel with snap points.
 */
export default function LoveStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const opened = useOpened();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || !opened) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, [opened]);

  return (
    <section
      ref={sectionRef}
      data-no-lift
      className="relative w-full overflow-hidden bg-blush py-24 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="px-6 text-center">
        <Reveal mode="fade">
          <p className="font-detail text-xs uppercase tracking-[0.5em] text-champagne-dark">
            Our Story
          </p>
        </Reveal>
        <Reveal mode="fade-up" delay={0.15}>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-5xl">A Love Story</h2>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 sm:gap-10 sm:px-[10vw] lg:mt-10 lg:w-max lg:snap-none lg:items-start lg:overflow-visible lg:pb-0"
      >
        {loveStoryMoments.map((moment, i) => (
          <StoryCard key={moment.caption} moment={moment} index={i} />
        ))}
      </div>

      <p className="mt-2 text-center font-detail text-[10px] uppercase tracking-[0.3em] text-ink/40 lg:hidden">
        Swipe to explore →
      </p>
    </section>
  );
}
