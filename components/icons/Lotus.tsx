export default function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M50 60c0-22-10-34-10-34s2 20 10 34z" />
      <path d="M50 60c0-22 10-34 10-34s-2 20-10 34z" />
      <path d="M50 60c-14-14-30-16-30-16s10 16 30 16z" />
      <path d="M50 60c14-14 30-16 30-16s-10 16-30 16z" />
      <path d="M50 60c-8-20-24-28-24-28s6 22 24 28z" opacity="0.7" />
      <path d="M50 60c8-20 24-28 24-28s-6 22-24 28z" opacity="0.7" />
      <path d="M14 66c14-6 22-6 36-6s22 0 36 6" />
    </svg>
  );
}
