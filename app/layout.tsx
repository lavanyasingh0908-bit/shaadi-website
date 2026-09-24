import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Bodoni_Moda,
  DM_Sans,
  Great_Vibes,
  Noto_Serif_Devanagari,
} from "next/font/google";
import "./globals.css";
import "./cinematic.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const greatVibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: "400",
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sejal Weds Himanshu | 21 November 2026",
  description:
    "A Celebration of Love, Family & Forever — Sejal & Himanshu invite you to their wedding, 20–21 November 2026, Heaven's Feel Farm, Indore.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#faf6f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${bodoni.variable} ${dmSans.variable} ${greatVibes.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="image" href="/images/opt/hero.webp" type="image/webp" fetchPriority="high" />
      </head>
      <body className="min-h-full bg-ivory text-ink font-serif-alt selection:bg-champagne">
        {children}
      </body>
    </html>
  );
}
