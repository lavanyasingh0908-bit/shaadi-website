/** Soft god-rays that sway slowly from the top of a section. */
export default function LightRays({ className = "", opacity = 0.35 }: { className?: string; opacity?: number }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ opacity }} aria-hidden>
      <div className="light-rays absolute -top-1/4 left-1/2 h-[150%] w-[160%]" />
    </div>
  );
}
