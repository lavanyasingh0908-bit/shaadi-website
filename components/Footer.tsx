import { IMG } from "@/lib/assets";

export default function Footer() {
  return (
    <footer className="safe-bottom relative flex w-full flex-col items-center gap-4 overflow-hidden bg-ivory px-6 py-14 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.floral}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -bottom-10 -left-10 w-36 -scale-x-100 opacity-60 sm:w-52"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.floral}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -bottom-10 -right-10 w-36 opacity-60 sm:w-52"
      />
      <div className="gold-divider w-24" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.lotus} alt="" aria-hidden loading="lazy" width={32} height={24} className="h-6 w-8 object-contain" />
      <p className="relative font-serif-alt text-sm italic text-ink/50">
        Made with love for Sejal &amp; Himanshu
      </p>
    </footer>
  );
}
