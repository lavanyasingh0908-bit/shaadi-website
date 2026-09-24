"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; vx: number; vy: number; born: number; size: number; rot: number };

const LIFE = 1000;

/** Tiny champagne sparkles that trail the cursor. Desktop (fine pointer) only. */
export default function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const sparks: Spark[] = [];
    let raf = 0;
    let lastSpawn = 0;

    const star = (s: Spark, k: number) => {
      const r = s.size * (1 - k * 0.6);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.globalAlpha = 1 - k;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        ctx.quadraticCurveTo(0, 0, Math.cos(a) * r, Math.sin(a) * r);
        ctx.quadraticCurveTo(0, 0, Math.cos(a + Math.PI / 4) * r * 0.25, Math.sin(a + Math.PI / 4) * r * 0.25);
      }
      ctx.fillStyle = k < 0.3 ? "#fff6e3" : "#e8d3ab";
      ctx.shadowColor = "rgba(214,180,122,0.9)";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    };

    const frame = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const k = (now - s.born) / LIFE;
        if (k >= 1) {
          sparks.splice(i, 1);
          continue;
        }
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02;
        s.rot += 0.04;
        star(s, k);
      }
      raf = sparks.length ? requestAnimationFrame(frame) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawn < 28) return;
      lastSpawn = now;
      sparks.push({
        x: e.clientX + (Math.random() - 0.5) * 8,
        y: e.clientY + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.2 - Math.random() * 0.4,
        born: now,
        size: 3 + Math.random() * 4,
        rot: Math.random() * Math.PI,
      });
      if (sparks.length > 60) sparks.shift();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden />;
}
