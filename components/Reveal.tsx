"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useOpened } from "@/lib/experience";

type RevealMode = "fade-up" | "fade" | "blur" | "scale" | "slide-left" | "slide-right" | "mask";

type State = {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
  blur?: number;
  clip?: number;
};

// Every mode now also resolves from a soft blur, for the blur-to-clear feel.
const hidden: Record<RevealMode, State> = {
  "fade-up": { opacity: 0, y: 60, blur: 6 },
  fade: { opacity: 0, blur: 6 },
  blur: { opacity: 0, y: 20, blur: 16 },
  scale: { opacity: 0, scale: 0.85, blur: 6 },
  "slide-left": { opacity: 0, x: 80, blur: 6 },
  "slide-right": { opacity: 0, x: -80, blur: 6 },
  mask: { opacity: 0, clip: 100 },
};

function toStyle(s: State): CSSProperties {
  return {
    opacity: s.opacity,
    transform: `translate3d(${s.x ?? 0}px, ${s.y ?? 0}px, 0) scale(${s.scale ?? 1})`,
    filter: s.blur ? `blur(${s.blur}px)` : undefined,
    clipPath: s.clip !== undefined ? `inset(0 0 ${s.clip}% 0)` : undefined,
  };
}

/**
 * Scroll-triggered reveal driven by GSAP ScrollTrigger (synced with Lenis).
 * The hidden state is rendered on the server so nothing flashes before
 * hydration, and nothing animates until the invitation has been opened.
 */
export default function Reveal({
  children,
  mode = "fade-up",
  delay = 0,
  duration = 1,
  className = "",
  once = true,
  amount = 0.3,
}: {
  children: ReactNode;
  mode?: RevealMode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const opened = useOpened();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !opened) return;
    gsap.registerPlugin(ScrollTrigger);

    const from = hidden[mode];
    const tween = gsap.fromTo(
      el,
      {
        opacity: from.opacity,
        x: from.x ?? 0,
        y: from.y ?? 0,
        scale: from.scale ?? 1,
        filter: `blur(${from.blur ?? 0}px)`,
        clipPath: `inset(0 0 ${from.clip ?? 0}% 0)`,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        clipPath: "inset(0 0 0% 0)",
        duration,
        delay,
        ease: "expo.out",
        clearProps: once ? "filter,clipPath" : undefined,
        scrollTrigger: {
          trigger: el,
          start: `top ${Math.round(100 - amount * 30)}%`,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [opened, mode, delay, duration, once, amount]);

  return (
    <div ref={ref} className={className} style={toStyle(hidden[mode])}>
      {children}
    </div>
  );
}
