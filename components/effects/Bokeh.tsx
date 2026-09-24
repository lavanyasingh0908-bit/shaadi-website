// Fixed layout so server and client render identically (no hydration drift).
const LIGHTS = [
  { l: 8, t: 18, s: 70, d: 0, dur: 16, o: 0.35 },
  { l: 22, t: 64, s: 44, d: 3, dur: 19, o: 0.3 },
  { l: 38, t: 12, s: 28, d: 6, dur: 14, o: 0.4 },
  { l: 55, t: 78, s: 90, d: 1, dur: 22, o: 0.22 },
  { l: 68, t: 30, s: 36, d: 4, dur: 17, o: 0.35 },
  { l: 82, t: 58, s: 60, d: 2, dur: 20, o: 0.28 },
  { l: 90, t: 14, s: 24, d: 7, dur: 15, o: 0.45 },
  { l: 14, t: 86, s: 32, d: 5, dur: 18, o: 0.3 },
  { l: 47, t: 42, s: 18, d: 8, dur: 13, o: 0.4 },
  { l: 74, t: 88, s: 26, d: 9, dur: 16, o: 0.35 },
];

/** Soft, out-of-focus floating lights. Pure CSS animation (compositor only). */
export default function Bokeh({ className = "", tint = "214,180,122" }: { className?: string; tint?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {LIGHTS.map((b, i) => (
        <span
          key={i}
          className="bokeh-light absolute rounded-full"
          style={{
            left: `${b.l}%`,
            top: `${b.t}%`,
            width: b.s,
            height: b.s,
            opacity: b.o,
            background: `radial-gradient(circle, rgba(${tint},0.9) 0%, rgba(${tint},0.35) 45%, transparent 70%)`,
            animationDelay: `-${b.d}s`,
            animationDuration: `${b.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
