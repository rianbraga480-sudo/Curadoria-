import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { FAQ } from "@/components/tools/FAQ";
import { MobileBar } from "@/components/tools/MobileBar";
import { Pricing } from "@/components/tools/Pricing";
import { Screenshot } from "@/components/tools/Screenshot";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolLogo } from "@/components/tools/ToolLogo";
import { AffiliateLink } from "@/components/ui/Button";
import { Alert, ArrowDown, ArrowRight, Check, Info } from "@/components/ui/icons";
import { site } from "@/content/site";
import type { Tool } from "@/lib/schema";
import { formatDate, formatPrice, formatPriceShort, pad, periodLabel } from "@/lib/format";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import {
  allOffers,
  getCategory,
  getComparableTools,
  getLowestMonthlyEquivalent,
  getStartingPrice,
  getTool,
  getTools,
  toSummary,
} from "@/lib/tools";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  return pageMetadata({
    title: tool.seo.title,
    description: tool.seo.description,
    path: `/ferramentas/${tool.slug}/`,
    ogImage: tool.seo.ogImage,
    ogImageAlt: `${tool.name} — análise da Curadoria Digital`,
    type: "article",
  });
}

const SECTIONS = [
  ["para-quem", "Para quem"],
  ["problema", "Problema"],
  ["recursos", "Recursos"],
  ["telas", "Telas"],
  ["beneficios", "Benefícios"],
  ["atencao", "Atenção"],
  ["planos", "Planos"],
  ["analise", "Análise"],
  ["duvidas", "Dúvidas"],
] as const;

function Head({ n, eyebrow, title, intro, id }: { n: number; eyebrow: string; title: React.ReactNode; intro?: React.ReactNode; id: string }) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow" data-reveal="fade">
        <span className="text-silver">{pad(n)}</span> {eyebrow}
      </p>
      <h2 id={id} data-reveal="title" className="mt-6 text-[clamp(2rem,4.6vw,3.8rem)] font-medium">
        {title}
      </h2>
      {intro && (
        <div className="mt-5 text-[1.05rem] leading-relaxed text-fog" data-reveal="fade">
          {intro}
        </div>
      )}
    </header>
  );
}

function softwareJsonLd(tool: Tool) {
  const offers = allOffers(tool);
  return {
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.shortDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: tool.platform,
    image: absoluteUrl(tool.heroImage.src),
    url: absoluteUrl(`/ferramentas/${tool.slug}/`),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: tool.pricing.currency,
      lowPrice: Math.min(...offers.map((o) => o.price)).toFixed(2),
      highPrice: Math.max(...offers.map((o) => o.price)).toFixed(2),
      offerCount: offers.length,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();

  const start = getStartingPrice(tool);
  const lowest = getLowestMonthlyEquivalent(tool);
  const entry = tool.pricing.plans[0]!;
  const highlighted = tool.features.filter((f) => f.highlight);
  const compact = tool.features.filter((f) => !f.highlight);
  const others = getTools().filter((t) => t.slug !== tool.slug);
  const comparable = getComparableTools(tool);
  const path = `/ferramentas/${tool.slug}/`;

  const facts = [
    { k: "A partir de", v: `${formatPriceShort(start.price)}/mês`, note: lowest < start.price ? `ou ${formatPrice(lowest)}/mês em período maior` : `+ R$ 0,99 de taxa` },
    { k: "Garantia", v: tool.guarantee.summary, note: tool.guarantee.checkedAt ? `conferido em ${formatDate(tool.guarantee.checkedAt)}` : "a confirmar" },
    { k: "Pagamento", v: tool.payment.platform, note: tool.payment.methods },
    { k: "Onde funciona", v: tool.platform.split(".")[0] ?? tool.platform, note: tool.platform.split(".").slice(1).join(".").trim() || " " },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Ferramentas", path: "/ferramentas/" },
            { name: tool.name, path },
          ]),
          softwareJsonLd(tool),
          faqJsonLd(tool.faq),
        ]}
      />

      {/* 01 — HERÓI */}
      <section
        id="hero-produto"
        data-hero
        aria-labelledby="tool-title"
        className="relative isolate overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-16 md:pt-[calc(var(--header-h)+4.5rem)] md:pb-24"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute top-[-10%] right-[-10%] h-[80vh] w-[70vw] rounded-[50%] opacity-60 blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${tool.accent}26, transparent)` }}
          />
          <div className="absolute top-0 left-[-10%] h-[60vh] w-[60vw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)]" />
        </div>
        <div className="container-x">
          <nav aria-label="Trilha" className="mono mb-10 text-[0.68rem] tracking-[0.16em] text-metal uppercase">
            <Link href="/" className="hover:text-snow">Início</Link> <span aria-hidden="true">/</span>{" "}
            <Link href="/ferramentas/" className="hover:text-snow">Ferramentas</Link> <span aria-hidden="true">/</span>{" "}
            <span aria-current="page" className="text-silver">{tool.name}</span>
          </nav>

          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-4" data-reveal="fade">
                <ToolLogo tool={tool} size={64} />
                <div>
                  <p className="font-display text-2xl font-medium text-snow">{tool.name}</p>
                  <p className="mono text-[0.68rem] tracking-[0.16em] text-metal uppercase">{tool.tagline}</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Categorias">
                {tool.categories.map((c) => (
                  <li key={c}>
                    <Link href={`/ferramentas/?categoria=${c}`} className="tag hover:border-white/40">
                      {getCategory(c)?.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <h1
                id="tool-title"
                data-reveal="title"
                className="mt-8 text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.98] font-medium tracking-[-0.045em]"
              >
                {tool.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-fog md:text-lg" data-reveal="fade">
                {tool.description[0]}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-reveal="fade">
                <a href="#planos" className="btn btn-chrome" data-ev="cta_click" data-prod={tool.slug} data-pos="hero-planos">
                  Ver planos e acessar oferta <ArrowDown size={15} />
                </a>
                <a href="#recursos" className="btn btn-ghost" data-ev="cta_click" data-prod={tool.slug} data-pos="hero-recursos">
                  Conhecer os recursos
                </a>
              </div>
              <p className="mt-5 flex items-start gap-2 text-[0.8rem] text-metal">
                <Info size={15} className="mt-0.5 shrink-0" />
                Página não oficial, feita pela Curadoria Digital, com links de afiliado.
              </p>
            </div>

            <div className="relative lg:col-span-6" data-reveal="clip">
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[3rem] opacity-70 blur-3xl"
                style={{ background: `radial-gradient(closest-side, ${tool.accent}30, transparent)` }}
              />
              <Screenshot image={tool.heroImage} priority sizes="(min-width: 1024px) 600px, 92vw" />
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4" data-reveal="stagger">
            {facts.map((f) => (
              <div key={f.k} className="bg-obsidian p-5 md:p-6">
                <dt className="mono text-[0.62rem] tracking-[0.18em] text-metal uppercase">{f.k}</dt>
                <dd className="mt-2 font-display text-lg leading-tight text-snow md:text-xl">{f.v}</dd>
                <dd className="mt-1 text-xs text-fog">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Navegação interna */}
      <nav
        aria-label={`Seções sobre ${tool.name}`}
        className="sticky top-0 z-30 border-y border-white/[0.07] bg-obsidian/80 backdrop-blur-xl"
      >
        <div className="container-x">
          <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
            {SECTIONS.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`} className="mono flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[0.66rem] tracking-[0.12em] whitespace-nowrap text-fog uppercase transition-colors hover:bg-white/[0.06] hover:text-snow">
                  <span className="text-metal">{pad(i + 2)}</span> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 02 — PARA QUEM */}
      <section id="para-quem" aria-labelledby="h-para-quem" className="py-24 md:py-32">
        <div className="container-x">
          <Head n={2} id="h-para-quem" eyebrow="Para quem é indicada" title={<>Para quem o {tool.name} <span className="chrome-text">faz sentido.</span></>} intro={tool.audience.summary} />
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            <ul className={`grid gap-4 sm:grid-cols-2 lg:col-span-2 ${tool.audience.profiles.length === 3 ? "lg:grid-cols-3" : ""}`} data-reveal="stagger">
              {tool.audience.profiles.map((p, i) => (
                <li key={p.title} className="surface p-7">
                  <span className="mono text-[0.68rem] text-metal">{pad(i + 1)}</span>
                  <h3 className="mt-5 text-xl font-medium">{p.title}</h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-fog">{p.text}</p>
                </li>
              ))}
            </ul>
            <div className="rounded-3xl border border-dashed border-white/15 p-7" data-reveal="fade">
              <h3 className="flex items-center gap-2 text-xl font-medium">
                <Alert size={18} /> Talvez ainda não seja para você se
              </h3>
              <ul className="mt-5 space-y-3 text-[0.94rem] text-fog">
                {tool.audience.notFor.map((n) => (
                  <li key={n} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-metal" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — PROBLEMA */}
      <section id="problema" aria-labelledby="h-problema" className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Head n={3} id="h-problema" eyebrow="Qual problema resolve" title={<>O que trava o trabalho <span className="chrome-text">hoje.</span></>} />
            <blockquote className="mono mt-10 border-l border-white/20 pl-5 text-[0.85rem] leading-relaxed text-silver" data-reveal="fade">
              {tool.problems.intro}
            </blockquote>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:col-span-7" data-reveal="stagger">
            {tool.problems.items.map((p, i) => (
              <li key={p.title} className="bg-obsidian p-7 md:p-9">
                <span className="chrome-text font-display text-5xl font-semibold">{pad(i + 1)}</span>
                <h3 className="mt-6 text-xl font-medium">{p.title}</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-fog">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — FUNCIONALIDADES */}
      <section id="recursos" aria-labelledby="h-recursos" className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="container-x">
          <Head
            n={4}
            id="h-recursos"
            eyebrow="Funcionalidades"
            title={<>O que tem dentro do <span className="chrome-text">{tool.name}.</span></>}
            intro={`Funcionalidades confirmadas no site oficial em ${formatDate(tool.checks.featuresCheckedAt)}. Em cada uma, o plano em que ela está incluída.`}
          />
          <div className="mt-16 space-y-6">
            {highlighted.map((f, i) => (
              <article key={f.title} className="surface grid items-center gap-10 overflow-hidden p-6 md:p-10 lg:grid-cols-2 lg:gap-14">
                <div className={i % 2 === 1 && f.image ? "lg:order-2" : ""}>
                  <span className="tag">{f.availability}</span>
                  <h3 className="mt-6 text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium">{f.title}</h3>
                  <p className="mt-4 text-[1.02rem] leading-relaxed text-fog">{f.summary}</p>
                  <ul className={`mt-6 space-y-3 ${f.image ? "" : "hidden"}`}>
                    {f.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[0.95rem] text-silver">
                        <Check size={17} className="mt-0.5 shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                {f.image ? (
                  <div data-reveal="clip">
                    <Screenshot image={f.image} sizes="(min-width: 1024px) 560px, 92vw" />
                  </div>
                ) : (
                  <ol className="space-y-3" aria-label={`Como funciona: ${f.title}`}>
                    {f.bullets.map((b, j) => (
                      <li key={b} className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                        <span className="chrome-text font-display text-3xl font-semibold">{pad(j + 1)}</span>
                        <span className="text-sm text-silver">{b}</span>
                      </li>
                    ))}
                    <li className="mono text-[0.65rem] text-metal">Resumo do fluxo descrito no site oficial (não é uma tela real).</li>
                  </ol>
                )}
              </article>
            ))}
          </div>
          {compact.length > 0 && (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
              {compact.map((f) => (
                <li key={f.title} className="surface p-6">
                  <h3 className="text-lg font-medium">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{f.summary}</p>
                  <p className="mono mt-4 text-[0.62rem] tracking-[0.14em] text-metal uppercase">{f.availability}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 05 — DEMONSTRAÇÕES */}
      <section id="telas" aria-labelledby="h-telas" className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="container-x">
          <Head
            n={5}
            id="h-telas"
            eyebrow="Demonstrações"
            title={<>Telas reais, <span className="chrome-text">sem montagem.</span></>}
            intro="Imagens reproduzidas do site oficial. Toque em uma tela para ampliar e ler cada detalhe."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {tool.gallery.map((img, i) => (
              <li key={img.src} className={i === 0 && tool.gallery.length % 2 === 1 ? "md:col-span-2" : ""} data-reveal="fade">
                <Screenshot image={img} sizes={i === 0 ? "(min-width: 768px) 1200px, 92vw" : "(min-width: 768px) 600px, 92vw"} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — BENEFÍCIOS */}
      <section id="beneficios" aria-labelledby="h-beneficios" className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="container-x">
          <Head
            n={6}
            id="h-beneficios"
            eyebrow="Benefícios"
            title={<>O que muda <span className="chrome-text">no seu trabalho.</span></>}
            intro="Funcionalidade é o que a ferramenta faz. Benefício é o que isso pode mudar na sua rotina. Cada benefício abaixo aponta o recurso de onde ele vem."
          />
          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {tool.benefits.map((b) => (
              <li key={b.title} className="surface flex flex-col p-7">
                <h3 className="text-xl font-medium">{b.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-fog">{b.text}</p>
                <p className="mono mt-auto pt-6 text-[0.62rem] tracking-[0.14em] text-metal uppercase">
                  Vem de: <span className="text-silver">{b.from}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 — LIMITAÇÕES */}
      <section id="atencao" aria-labelledby="h-atencao" className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="container-x">
          <Head
            n={7}
            id="h-atencao"
            eyebrow="Limitações e pontos de atenção"
            title={<>Antes de assinar, <span className="chrome-text">confira.</span></>}
            intro="O que vale saber para não ter surpresa depois do pagamento."
          />
          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {tool.limitations.map((l) => (
              <li key={l.title} className="rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.03] to-transparent p-7">
                <Alert size={20} className="text-silver" />
                <h3 className="mt-5 text-lg font-medium">{l.title}</h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-fog">{l.text}</p>
              </li>
            ))}
          </ul>
          {tool.freeAlternatives && (
            <div className="surface mt-6 p-7 md:p-10">
              <h3 className="text-2xl font-medium">Dá para começar de graça?</h3>
              <ul className="mt-6 grid gap-6 md:grid-cols-3">
                {tool.freeAlternatives.items.map((a) => (
                  <li key={a.title}>
                    <h4 className="font-sans text-base font-medium tracking-normal text-snow">{a.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-fog">{a.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/[0.08] pt-6 text-[0.95rem] text-silver">{tool.freeAlternatives.note}</p>
            </div>
          )}
        </div>
      </section>

      {/* 08 — PLANOS E PREÇOS */}
      <section id="planos" aria-labelledby="h-planos" className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="container-x">
          <Head
            n={8}
            id="h-planos"
            eyebrow="Planos e preços"
            title={<>Escolha o plano <span className="chrome-text">com clareza.</span></>}
            intro={`${tool.pricing.intro} Preços conferidos em ${formatDate(tool.pricing.checkedAt)}.`}
          />
          <div className="mt-20 md:mt-28">
            <Pricing tool={tool} />
          </div>

          <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Garantia", tool.guarantee.detail],
              ["Assinatura", tool.subscription],
              ["Pagamento", `${tool.payment.methods}, na ${tool.payment.platform}. ${tool.payment.fee}.`],
              ["Acesso e suporte", `${tool.access} Suporte: ${tool.support}`],
            ].map(([k, v]) => (
              <div key={k} className="bg-obsidian p-6">
                <dt className="mono text-[0.62rem] tracking-[0.18em] text-metal uppercase">{k}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-fog">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 09 — NOSSA ANÁLISE */}
      <section id="analise" aria-labelledby="h-analise" className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="container-x">
          <Head n={9} id="h-analise" eyebrow="Nossa análise" title={<>A visão da <span className="chrome-text">curadoria.</span></>} />
          <p className="mono mt-8 max-w-3xl rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-[0.75rem] leading-relaxed text-fog">
            {tool.analysis.basis}
          </p>
          <div className="mt-10 grid gap-4 lg:grid-cols-2" data-reveal="stagger">
            <div className="surface p-7 md:p-9">
              <h3 className="text-2xl font-medium">Pontos positivos</h3>
              <ul className="mt-6 space-y-3">
                {tool.analysis.positives.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.95rem] text-silver">
                    <Check size={17} className="mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface p-7 md:p-9">
              <h3 className="text-2xl font-medium">Pontos de atenção</h3>
              <ul className="mt-6 space-y-3">
                {tool.analysis.attention.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.95rem] text-silver">
                    <Alert size={16} className="mt-1 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/[0.08] to-transparent p-7 md:p-9 lg:col-span-5">
              <h3 className="mono text-[0.68rem] tracking-[0.18em] text-metal uppercase">Perfil indicado</h3>
              <p className="mt-4 font-display text-xl leading-snug text-snow md:text-2xl">{tool.analysis.idealProfile}</p>
            </div>
            <div className="p-2 md:p-6 lg:col-span-7">
              <h3 className="mono text-[0.68rem] tracking-[0.18em] text-metal uppercase">Considerações da curadoria</h3>
              {tool.analysis.notes.map((n) => (
                <p key={n} className="mt-4 text-[1.02rem] leading-relaxed text-fog">{n}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section id="duvidas" aria-labelledby="h-duvidas" className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Head n={10} id="h-duvidas" eyebrow="Perguntas frequentes" title="Dúvidas sobre o produto" />
            <p className="mt-6 text-fog">
              Não achou a sua resposta? Fale com a gente no{" "}
              <a href={site.instagram.dm} className="prose-link" target="_blank" rel="noopener" data-ev="instagram_click" data-pos="faq-produto">
                Instagram
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={tool.faq} />
          </div>
        </div>
      </section>

      {/* 11 — CTA FINAL */}
      <section id="oferta-final" aria-labelledby="h-final" className="relative isolate overflow-hidden border-t border-white/[0.06] py-28 md:py-36">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/2 left-1/2 h-[70vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
            style={{ background: `radial-gradient(closest-side, ${tool.accent}1f, transparent)` }}
          />
        </div>
        <div className="container-x text-center">
          <ToolLogo tool={tool} size={72} className="mx-auto" />
          <h2 id="h-final" data-reveal="title" className="mx-auto mt-8 max-w-[18ch] text-[clamp(2.2rem,5.4vw,4.6rem)] font-medium">
            Pronto para conhecer o <span className="chrome-text">{tool.name}?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-fog">
            O plano {entry.name} começa em {formatPriceShort(entry.offer.price)}/{periodLabel[entry.offer.period]}. Compare os
            demais planos acima antes de decidir.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AffiliateLink href={entry.offer.checkoutUrl} pos="cta-final">
              Acessar oferta oficial
            </AffiliateLink>
            <a href="#planos" className="btn btn-ghost" data-ev="cta_click" data-prod={tool.slug} data-pos="cta-final-planos">
              Comparar planos
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-metal">
            “Acessar oferta oficial” abre a página de pagamento da {tool.payment.platform} (site externo) no plano{" "}
            {entry.name}, com o valor final antes de você pagar. Link de afiliado: a Curadoria Digital pode receber comissão,
            sem custo extra para você.
          </p>
        </div>
      </section>

      {/* Conheça também */}
      {others.length > 0 && (
        <section aria-labelledby="h-outras" className="border-t border-white/[0.06] py-24">
          <div className="container-x">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Continue explorando</p>
                <h2 id="h-outras" className="mt-5 text-[clamp(1.8rem,3.6vw,3rem)] font-medium">Conheça também</h2>
              </div>
              <Link href={comparable.length ? `/comparar/?ferramentas=${[tool.slug, ...comparable.map((c) => c.slug)].join(",")}` : "/comparar/"} className="btn btn-ghost btn-sm self-start">
                {comparable.length ? "Comparar ferramentas" : "Qual escolher?"} <ArrowRight size={13} className="arrow" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {others.slice(0, 3).map((t) => (
                <li key={t.slug} className="min-w-0">
                  <ToolCard tool={toSummary(t)} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <p className="container-x pb-10 text-center text-xs text-metal">
        Informações atualizadas em {formatDate(tool.checks.updatedAt)} · recursos conferidos em {formatDate(tool.checks.featuresCheckedAt)} ·
        preços conferidos em {formatDate(tool.checks.pricesCheckedAt)}
        {!tool.officialUrl && " · link do site oficial: a confirmar"}
      </p>

      <MobileBar
        slug={tool.slug}
        note="Planos a partir de"
        priceLabel={`${formatPriceShort(start.price)}/mês`}
      />
    </>
  );
}
