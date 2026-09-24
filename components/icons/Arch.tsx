export default function Arch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    >
      <path d="M20 230V110C20 60 55 20 100 20s80 40 80 90v120" />
      <path d="M36 230V112c0-42 28-76 64-76s64 34 64 76v118" opacity="0.55" />
      <path d="M4 230h192" />
      <circle cx="100" cy="56" r="5" opacity="0.7" />
      <path d="M70 40c6 10 6 20 0 30" opacity="0.4" />
      <path d="M130 40c-6 10-6 20 0 30" opacity="0.4" />
    </svg>
  );
}
