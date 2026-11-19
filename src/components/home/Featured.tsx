import Link from "next/link";
import type { Tool } from "@/lib/schema";
import { FeaturedTool } from "@/components/tools/FeaturedTool";
import { SectionHeading } from "@/components/ui/Section";
import { Info } from "@/components/ui/icons";

export function Featured({ tools }: { tools: Tool[] }) {
  return (
    <section id="ferramentas" aria-labelledby="featured-title" className="relative py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-10 overflow-hidden select-none">
        <p className="outline-text text-center font-display text-[22vw] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap" data-parallax="0.3">
          Seleção
        </p>
      </div>
      <div className="container-x relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="featured-title"
            index="02"
            eyebrow="Ferramentas em destaque"
            title={
              <>
                Selecionadas, conferidas <span className="chrome-text">e explicadas.</span>
              </>
            }
            intro="Cada ferramenta resolve um problema diferente. Veja telas reais, benefícios e preços, e descubra qual combina com o seu trabalho."
          />
          <Link href="/ferramentas/" className="btn btn-ghost shrink-0" data-ev="cta_click" data-pos="destaque-ver-todas">
            Ver catálogo completo
          </Link>
        </div>

        <div className="mt-16 space-y-8 md:mt-24 md:space-y-12">
          {tools.map((t, i) => (
            <FeaturedTool key={t.slug} tool={t} index={i + 1} reverse={i % 2 === 1} />
          ))}
        </div>

        <p className="mt-8 flex items-start gap-3 text-sm text-fog">
          <Info size={18} className="mt-0.5 shrink-0" />
          <span>
            Os botões de compra das páginas de ferramenta são links de afiliado: se você assinar por eles, a Curadoria
            Digital recebe uma comissão, sem custo extra para você.{" "}
            <Link href="/sobre/#afiliados" className="prose-link">Como isso funciona</Link>
          </span>
        </p>
      </div>
    </section>
  );
}
