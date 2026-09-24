const PALETTES: Record<string, [string, string, string]> = {
  ivory: ["#F4E9DC", "#EEDFD5", "#D6B47A"],
  blush: ["#F4DAD6", "#EEDFD5", "#D6B47A"],
  dark: ["#241C16", "#3A2C22", "#B8935A"],
  bw: ["#E8E6E1", "#C9C5BD", "#8A8479"],
};

/**
 * Generates an elegant gradient placeholder (as a data URI) so the site
 * never shows a broken image before real photographs are dropped into
 * /public/images. Replace the matching file (see public/images/README.md)
 * and this is never used.
 */
function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function photoPlaceholder(
  label: string,
  tone: keyof typeof PALETTES = "ivory"
) {
  const [a, b, gold] = PALETTES[tone];
  const safeLabel = escapeXml(label);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${a}"/>
          <stop offset="100%" stop-color="${b}"/>
        </linearGradient>
      </defs>
      <rect width="900" height="1200" fill="url(#g)"/>
      <rect x="40" y="40" width="820" height="1120" fill="none" stroke="${gold}" stroke-width="2" opacity="0.6"/>
      <circle cx="450" cy="560" r="70" fill="none" stroke="${gold}" stroke-width="1.5" opacity="0.7"/>
      <text x="450" y="575" font-family="Georgia, serif" font-size="28" fill="${gold}" text-anchor="middle" opacity="0.9">S &amp; H</text>
      <text x="450" y="660" font-family="Georgia, serif" font-size="20" fill="${gold}" text-anchor="middle" opacity="0.65">${safeLabel}</text>
    </svg>`;
  const encoded = typeof window === "undefined"
    ? Buffer.from(svg).toString("base64")
    : window.btoa(svg);
  return `data:image/svg+xml;base64,${encoded}`;
}
