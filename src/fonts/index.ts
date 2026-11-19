import localFont from "next/font/local";

/**
 * Fontes auto-hospedadas (subconjunto latino, que cobre todo o português).
 * next/font faz o preload e cria um fallback com métricas ajustadas (sem salto de layout).
 * Licença: SIL Open Font License 1.1 (via Fontsource).
 */
export const spaceGrotesk = localFont({
  src: "./space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-sg",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const inter = localFont({
  src: "./inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const jetbrainsMono = localFont({
  src: "./jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-jb",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});
