import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getTools } from "@/lib/tools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getTools();
  const latest = tools.map((t) => t.checks.updatedAt).sort().at(-1) ?? site.updatedAt;
  const u = (path: string) => `${site.url}${path}`;
  return [
    { url: u("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: u("/ferramentas/"), lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    ...tools.map((t) => ({
      url: u(`/ferramentas/${t.slug}/`),
      lastModified: t.checks.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [u(t.heroImage.src)],
    })),
    { url: u("/comparar/"), lastModified: latest, changeFrequency: "monthly", priority: 0.6 },
    { url: u("/sobre/"), lastModified: site.legal.aboutUpdatedAt, changeFrequency: "monthly", priority: 0.5 },
    { url: u("/contato/"), lastModified: site.updatedAt, changeFrequency: "yearly", priority: 0.4 },
    { url: u("/termos/"), lastModified: site.legal.termsUpdatedAt, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/politica-de-privacidade/"), lastModified: site.legal.privacyUpdatedAt, changeFrequency: "yearly", priority: 0.2 },
  ];
}
