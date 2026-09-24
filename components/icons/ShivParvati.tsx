export default function ShivParvati({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Shiv figure (left) */}
      <path d="M80 24c-6-6-16-6-20 2" />
      <circle cx="72" cy="14" r="4" />
      <path d="M60 40c-16 10-24 28-24 48 0 34 22 60 44 60" />
      <path d="M60 40c10-6 22-6 30 2" />
      <path d="M56 70c-2 14 2 26 12 34" />
      <path d="M44 92c8 6 12 16 10 26" />
      {/* trident */}
      <path d="M28 60V16" />
      <path d="M28 24c-8-10-8-20 0-24" />
      <path d="M28 24c8-10 8-20 0-24" />
      <path d="M28 24V6" />
      {/* Parvati figure (right) */}
      <path d="M180 24c6-6 16-6 20 2" />
      <circle cx="188" cy="14" r="4" />
      <path d="M200 40c16 10 24 28 24 48 0 34-22 60-44 60" />
      <path d="M200 40c-10-6-22-6-30 2" />
      <path d="M204 70c2 14-2 26-12 34" />
      <path d="M216 92c-8 6-12 16-10 26" />
      {/* joined hands centre */}
      <path d="M118 100c8-4 16-4 24 0" />
      <path d="M142 100c8-4 16-4 24 0" />
      {/* lotus base */}
      <path d="M50 190c26-10 50-14 80-14s54 4 80 14" />
      <path d="M70 178c18-6 32-8 60-8s42 2 60 8" />
      {/* halo */}
      <circle cx="130" cy="84" r="46" strokeDasharray="2 6" opacity="0.6" />
    </svg>
  );
}
