import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { Lightbox } from "@/components/motion/Lightbox";
import { Analytics } from "@/components/Analytics";
import { site } from "@/content/site";
import { getOfferIndex } from "@/lib/tools";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Antes da primeira pintura: liga o modo de animação só quando o visitante
 * aceita movimento. Se o JS de animação não iniciar em 2,5 s, tudo aparece.
 */
const motionBoot = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js-motion')},2500)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <link rel="dns-prefetch" href="https://pay.cakto.com.br" />
      </head>
      <body>
        <Header />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <div className="grain" aria-hidden="true" />
        <MotionRoot />
        <Lightbox />
        <Analytics offers={getOfferIndex()} />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={JSON.stringify({ token: site.analytics.cloudflareToken })}
        />
      </body>
    </html>
  );
}
