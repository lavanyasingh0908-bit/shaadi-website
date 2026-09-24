export default function Diya({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="40" cy="62" rx="30" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M10 62c0 8 30 14 30 14s30-6 30-14"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M40 44c-4 6-2 10 0 10s4-4 0-10z"
        fill="currentColor"
        opacity="0.85"
        className="origin-bottom animate-flicker"
      />
      <path
        d="M40 30c-6 8-4 16 0 22 4-6 6-14 0-22z"
        fill="currentColor"
        className="origin-bottom animate-flicker"
      />
    </svg>
  );
}
