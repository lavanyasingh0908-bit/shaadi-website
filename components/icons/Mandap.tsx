export default function Mandap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* pillars */}
      <path d="M40 60v190" />
      <path d="M120 40v210" />
      <path d="M280 40v210" />
      <path d="M360 60v190" />
      {/* canopy drapes */}
      <path d="M40 60q80 40 80-20" opacity="0.7" />
      <path d="M120 40q80 30 160 0" opacity="0.7" />
      <path d="M280 40q40 60 80 20" opacity="0.7" />
      <path d="M60 70q60 26 120-4" opacity="0.4" />
      <path d="M220 66q60 30 120 4" opacity="0.4" />
      {/* dome top ornament */}
      <path d="M170 26q30-30 60 0" />
      <circle cx="200" cy="14" r="5" opacity="0.7" />
      {/* hanging florals */}
      <path d="M80 60v18" opacity="0.5" />
      <circle cx="80" cy="82" r="5" opacity="0.5" />
      <path d="M200 46v22" opacity="0.5" />
      <circle cx="200" cy="72" r="6" opacity="0.5" />
      <path d="M320 60v18" opacity="0.5" />
      <circle cx="320" cy="82" r="5" opacity="0.5" />
      {/* base florals */}
      <path d="M20 250c40-14 60-14 100 0" opacity="0.5" />
      <path d="M280 250c40-14 60-14 100 0" opacity="0.5" />
    </svg>
  );
}
