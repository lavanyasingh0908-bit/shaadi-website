export default function Vinyl({ className = "", spinning = true }: { className?: string; spinning?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${spinning ? "animate-spin-slow" : ""}`}
    >
      <circle cx="30" cy="30" r="27" fill="#1a1410" />
      <circle cx="30" cy="30" r="27" stroke="var(--color-champagne)" strokeWidth="0.75" fill="none" opacity="0.6" />
      <circle cx="30" cy="30" r="20" stroke="var(--color-champagne)" strokeWidth="0.5" fill="none" opacity="0.35" />
      <circle cx="30" cy="30" r="14" stroke="var(--color-champagne)" strokeWidth="0.5" fill="none" opacity="0.35" />
      <circle cx="30" cy="30" r="9" fill="var(--color-champagne)" opacity="0.9" />
      <circle cx="30" cy="30" r="2.5" fill="#1a1410" />
    </svg>
  );
}
