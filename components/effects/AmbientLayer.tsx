"use client";

import { useEffect, useRef } from "react";
import { scrollState } from "@/lib/experience";

type Petal = {
  x: number;
  y: number;
  size: number;
  color: string;
  rot: number;
  spin: number;
  fall: number;
  sway: number;
  phase: number;
  alpha: number;
};

type Mote = { x: number; y: number; r: number; vx: number; vy: number; phase: number };

const PETAL_COLORS = ["#fffdfc", "#f4dad6", "#f3e6d3", "#fbeee9"];

/**
 * Page-wide ambience, drawn on one canvas for a steady 60fps:
 *  - white / blush / ivory petals that drift in the side margins (never over
 *    the centred text) and react to Lenis scroll speed + direction
 *  - tiny floating dust motes
 * plus two CSS layers: a slowly moving paper texture and an occasional
 * warm light leak.
 */
export default function AmbientLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let petals: Petal[] = [];
    let motes: Mote[] = [];

    // Petals only live in the outer margins so they never sit on top of text.
    const marginX = () => {
      const band = w < 640 ? w * 0.12 : Math.min(w * 0.18, 260);
      return Math.random() < 0.5 ? Math.random() * band : w - Math.random() * band;
    };

    const makePetal = (y = Math.random() * h): Petal => ({
      x: marginX(),
      y,
      size: 6 + Math.random() * 9,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.03,
      fall: 0.35 + Math.random() * 0.55,
      sway: 0.4 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.55 + Math.random() * 0.35,
    });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const petalCount = reduced ? 0 : w < 640 ? 9 : 18;
      const moteCount = reduced ? 10 : w < 640 ? 18 : 34;
      petals = Array.from({ length: petalCount }, () => makePetal());
      motes = Array.from({ length: moteCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const drawPetal = (p: Petal, alpha: number) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, 0.62 + 0.38 * Math.sin(p.phase * 1.7)); // 3D-ish flutter
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.6, p.size * 0.7, p.size * 0.7, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.7, -p.size * 0.9, -p.size * 0.6, 0, -p.size);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "rgba(214,180,122,0.45)";
      ctx.stroke();
      ctx.restore();
    };

    let raf = 0;
    let petalAlpha = 1;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(2.5, (now - last) / 16.667);
      last = now;
      ctx.clearRect(0, 0, w, h);

      // Scroll reaction: petals drift against the scroll and spin faster.
      const v = Math.max(-40, Math.min(40, scrollState.velocity));
      scrollState.velocity *= 0.92;
      petalAlpha += (scrollState.petals - petalAlpha) * 0.04 * dt;

      if (petalAlpha > 0.01) {
        for (const p of petals) {
          p.phase += 0.02 * dt;
          p.y += (p.fall - v * 0.35) * dt;
          p.x += Math.sin(p.phase) * p.sway * 0.4 * dt;
          p.rot += (p.spin + Math.abs(v) * 0.002 * Math.sign(p.spin || 1)) * dt;
          if (p.y > h + 20) Object.assign(p, makePetal(-20));
          else if (p.y < -30) Object.assign(p, makePetal(h + 20));
          drawPetal(p, p.alpha * petalAlpha);
        }
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(214,180,122,0.55)";
      for (const m of motes) {
        m.phase += 0.015 * dt;
        m.x += (m.vx + Math.sin(m.phase) * 0.05) * dt;
        m.y += (m.vy - v * 0.05) * dt;
        if (m.y < -5) m.y = h + 5;
        if (m.y > h + 5) m.y = -5;
        if (m.x < -5) m.x = w + 5;
        if (m.x > w + 5) m.x = -5;
        ctx.globalAlpha = 0.25 + 0.3 * Math.abs(Math.sin(m.phase));
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    raf = requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      <div className="paper-drift absolute -inset-16" />
      <div className="light-leak absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
