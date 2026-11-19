import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  /** caminho com barra final, ex.: "/ferramentas/" */
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  /** usa o título sem o sufixo " | Curadoria Digital" */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
};

export const DEFAULT_OG = "/og/home.jpg";

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG,
  ogImageAlt = "Curadoria Digital — curadoria independente de ferramentas digitais",
  absoluteTitle,
  type = "website",
  noindex,
}: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type,
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export const orgJsonLd = {
  "@type": "Organization",
  "@id": `${site.url}/#org`,
  name: site.name,
  url: `${site.url}/`,
  logo: `${site.url}/apple-touch-icon.png`,
  sameAs: [site.instagram.url],
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
