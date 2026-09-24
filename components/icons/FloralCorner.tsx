export default function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <path d="M10 10c40 4 70 18 90 46" opacity="0.7" />
      <path d="M10 10c4 40 18 70 46 90" opacity="0.7" />
      <circle cx="34" cy="34" r="10" opacity="0.55" />
      <circle cx="58" cy="20" r="6" opacity="0.4" />
      <circle cx="20" cy="58" r="6" opacity="0.4" />
      <path d="M70 30c8 6 10 16 4 24" opacity="0.5" />
      <path d="M30 70c6 8 16 10 24 4" opacity="0.5" />
      <path d="M100 20c4 2 6 6 4 10" opacity="0.35" />
      <path d="M20 100c2 4 6 6 10 4" opacity="0.35" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="90" cy="46" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="46" cy="90" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
