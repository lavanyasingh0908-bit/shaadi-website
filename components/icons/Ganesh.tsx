export default function Ganesh({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* crown */}
      <path d="M70 34c6-14 20-22 30-22s24 8 30 22" />
      <circle cx="100" cy="16" r="5" />
      <path d="M78 34c2-8 8-13 22-13s20 5 22 13" />
      {/* ears */}
      <path d="M58 70c-18 4-26 22-18 38 6 12 20 16 30 10" />
      <path d="M142 70c18 4 26 22 18 38-6 12-20 16-30 10" />
      {/* head outline */}
      <path d="M70 40c-14 8-22 24-22 42 0 30 24 52 52 52s52-22 52-52c0-18-8-34-22-42" />
      {/* trunk */}
      <path d="M96 96c-4 10-10 16-10 28 0 10 8 16 16 14 6-2 8-8 6-14" />
      {/* eyes */}
      <path d="M86 92c3-3 9-3 12 0" />
      <path d="M104 92c3-3 9-3 12 0" />
      {/* tusk */}
      <path d="M118 108c6 2 10 8 8 14" />
      {/* belly / seated form */}
      <path d="M76 138c-10 10-14 24-10 38 6 20 26 32 34 32s28-12 34-32c4-14 0-28-10-38" />
      <path d="M90 176c4 6 16 6 20 0" />
      {/* lotus seat */}
      <path d="M52 202c14-10 30-14 48-14s34 4 48 14" />
      <path d="M40 210c20-6 40-8 60-8s40 2 60 8" />
    </svg>
  );
}
