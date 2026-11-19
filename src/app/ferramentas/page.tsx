import { Suspense } from "react";
import { CatalogClient } from "./CatalogClient";
import { ToolCard } from "@/components/tools/ToolCard";
import { JsonLd } from "@/components/JsonLd";
import { Info } from "@/components/ui/icons";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getActiveCategories, getTools, toSummary } from "@/lib/tools";

export const metadata = pageMetadata({
  title: "Catálogo de ferramentas digitais",
  description:
    "Pesquise e filtre ferramentas digitais por categoria: YouTube, IA, criação de conteúdo, atendimento, vendas e automação. Telas reais e preços conferidos.",
  path: "/ferramentas/",
});

export default function CatalogPage() {
  const tools = getTools().map(toSummary);
  const categories = getActiveCategories().map((c) => ({ slug: c.slug, name: c.name, count: c.count }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Ferramentas", path: "/ferramentas/" },
          ]),
          {
            "@type": "CollectionPage",
            name: "Catálogo de ferramentas digitais",
            url: absoluteUrl("/ferramentas/"),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: tools.map((t, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: t.name,
                url: absoluteUrl(`/ferramentas/${t.slug}/`),
              })),
            },
          },
        ]}
      />
      <section data-hero className="relative overflow-hidden pt-[calc(var(--header-h)+4rem)] pb-14 md:pt-[calc(var(--header-h)+6rem)]">
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-[60vh] w-[90vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]" />
        <div className="container-x relative">
          <nav aria-label="Trilha" className="mono mb-10 text-[0.68rem] tracking-[0.16em] text-metal uppercase">
            <Link href="/" className="hover:text-snow">Início</Link> <span aria-hidden="true">/</span>{" "}
            <span aria-current="page" className="text-silver">Ferramentas</span>
          </nav>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow" data-reveal="fade">Catálogo</p>
              <h1 data-reveal="title" className="mt-6 text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] font-medium tracking-[-0.05em]">
                Ferramentas <span className="chrome-text">analisadas.</span>
              </h1>
            </div>
            <p className="text-[1.05rem] leading-relaxed text-fog lg:col-span-4" data-reveal="fade">
              Um diretório de ferramentas digitais com telas reais, recursos por plano, limitações e preços conferidos.
              Pesquise pelo nome ou filtre pela sua necessidade.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Lista de ferramentas" className="pb-28">
        <div className="container-x">
          <Suspense
            fallback={
              <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tools.map((t) => (
                  <li key={t.slug} className="min-w-0">
                    <ToolCard tool={t} />
                  </li>
                ))}
              </ul>
            }
          >
            <CatalogClient tools={tools} categories={categories} />
          </Suspense>

          <p className="mt-12 flex items-start gap-3 text-sm text-fog">
            <Info size={18} className="mt-0.5 shrink-0" />
            <span>
              As páginas de ferramenta têm links de afiliado: se você assinar por eles, a Curadoria Digital recebe uma
              comissão, sem custo extra para você. <Link href="/sobre/#afiliados" className="prose-link">Aviso de afiliados</Link>
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
