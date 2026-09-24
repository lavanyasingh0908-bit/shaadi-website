"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/experience";

/**
 * Lenis smooth scrolling driven by GSAP's ticker (one rAF loop for
 * everything), plus the two page-wide scroll effects:
 *
 *  - [data-parallax="0.12"]  depth parallax on any layer
 *  - storybook "page lift"   each section lifts in like an album page
 */
export default function SmoothScroll({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  useEffect(() => {
    if (!enabled) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    scrollState.lenis = lenis;

    lenis.on("scroll", (l: Lenis) => {
      scrollState.velocity = l.velocity;
      scrollState.progress = l.progress;
      ScrollTrigger.update();
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.12");
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("main > section").forEach((section, i) => {
        if (i === 0 || section.hasAttribute("data-no-lift")) return;
        section.classList.add("storybook-page");
        gsap.fromTo(
          section,
          { "--page-lift": 1 },
          {
            "--page-lift": 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 30%",
              scrub: 0.6,
            },
          }
        );
      });
    });

    // Refresh measurements once layout and lazy images settle.
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", onLoad);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      scrollState.lenis = null;
    };
  }, [enabled]);

  return <>{children}</>;
}
