import Link from "next/link";
import { CompareClient } from "./CompareClient";
import { ChooseGuide } from "@/components/home/ChooseGuide";
import { JsonLd } from "@/components/JsonLd";
import { compareGroups } from "@/content/compare-groups";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getTools, toCompareEntry } from "@/lib/tools";

export const metadata = pageMetadata({
  title: "Comparar ferramentas digitais",
  description:
    "Compare ferramentas com o mesmo objetivo: finalidade, público, funcionalidades, planos, preços, garantia e limitações, com dados conferidos e datados.",
  path: "/comparar/",
});

export default function ComparePage() {
  const tools = getTools();
  const entries = tools.map((t) => toCompareEntry(t, compareGroups[t.compareGroup]?.name ?? t.compareGroup));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Comparar", path: "/comparar/" }])} />
      <section data-hero className="relative overflow-hidden pt-[calc(var(--header-h)+4rem)] pb-16 md:pt-[calc(var(--header-h)+6rem)]">
        <div className="container-x">
          <nav aria-label="Trilha" className="mono mb-10 text-[0.68rem] tracking-[0.16em] text-metal uppercase">
            <Link href="/" className="hover:text-snow">Início</Link> <span aria-hidden="true">/</span>{" "}
            <span aria-current="page" className="text-silver">Comparar</span>
          </nav>
          <p className="eyebrow" data-reveal="fade">Comparação</p>
          <h1 data-reveal="title" className="mt-6 max-w-[14ch] text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] font-medium tracking-[-0.05em]">
            Compare o que é <span className="chrome-text">comparável.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-fog" data-reveal="fade">
            Colocamos lado a lado apenas ferramentas com o mesmo objetivo: finalidade, público, funcionalidades, planos,
            preços, garantia, limitações e condições comerciais. Ferramentas que resolvem problemas diferentes não entram na
            mesma tabela, porque isso não ajuda ninguém a decidir.
          </p>
        </div>
      </section>

      <section aria-label="Seleção para comparação" className="pb-24">
        <div className="container-x">
          <CompareClient entries={entries} />
        </div>
      </section>

      <section id="qual-escolher" aria-labelledby="choose-title" className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="container-x">
          <p className="eyebrow">Necessidades diferentes</p>
          <h2 id="choose-title" data-reveal="title" className="mt-6 text-[clamp(2rem,4.6vw,3.8rem)] font-medium">
            Qual ferramenta é <span className="chrome-text">ideal para você?</span>
          </h2>
          <p className="mt-5 max-w-2xl text-fog">
            Se a dúvida é entre problemas diferentes, comece pela pergunta certa: onde está o trabalho que você quer
            facilitar? Cada ferramenta tem a sua assinatura, o seu acesso e o seu suporte.
          </p>
          <div className="mt-12">
            <ChooseGuide tools={tools} />
          </div>
        </div>
      </section>
    </>
  );
}
