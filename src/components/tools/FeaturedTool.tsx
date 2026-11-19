import Link from "next/link";
import type { Tool } from "@/lib/schema";
import { Screenshot } from "./Screenshot";
import { ToolLogo } from "./ToolLogo";
import { ArrowRight, Check } from "@/components/ui/icons";
import { formatDate, formatPrice, formatPriceShort } from "@/lib/format";
import { getCategory, getLowestMonthlyEquivalent, getStartingPrice } from "@/lib/tools";

/** Vitrine editorial de uma ferramenta em destaque na página inicial. */
export function FeaturedTool({ tool, index, reverse }: { tool: Tool; index: number; reverse?: boolean }) {
  const start = getStartingPrice(tool);
  const lowest = getLowestMonthlyEquivalent(tool);
  const image = tool.gallery[0] ?? tool.heroImage;
  return (
    <article
      aria-labelledby={`ft-${tool.slug}`}
      className="surface grid items-center gap-10 overflow-hidden p-5 md:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14"
      style={{ ["--accent" as string]: tool.accent }}
    >
      <div className={`relative ${reverse ? "lg:order-2" : ""}`}>
        <div
          aria-hidden="true"
          className="absolute -inset-10 -z-10 opacity-40 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${tool.accent}33, transparent)` }}
        />
        <div data-reveal="clip">
          <Screenshot image={image} sizes="(min-width: 1024px) 560px, 92vw" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4" data-reveal="fade">
          <ToolLogo tool={tool} size={52} />
          <div>
            <p className="mono text-[0.68rem] tracking-[0.2em] text-metal uppercase">
              {String(index).padStart(2, "0")} · {tool.tagline}
            </p>
            <h3 id={`ft-${tool.slug}`} className="mt-1 text-4xl font-medium md:text-5xl">
              {tool.name}
            </h3>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Categorias">
          {tool.categories.map((c) => (
            <li key={c} className="tag">
              {getCategory(c)?.name}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[1.05rem] leading-relaxed text-fog" data-reveal="fade">
          {tool.shortDescription}
        </p>

        <h4 className="mono mt-8 text-[0.68rem] tracking-[0.2em] text-metal uppercase">Principais benefícios</h4>
        <ul className="mt-4 space-y-3" data-reveal="stagger">
          {tool.benefits.slice(0, 3).map((b) => (
            <li key={b.title} className="flex gap-3 text-[0.95rem] text-silver">
              <Check size={18} className="mt-0.5 shrink-0 text-snow" />
              <span>
                {b.title}
                <span className="mono ml-2 text-[0.68rem] text-metal">{b.from}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-fog">
          <span className="text-silver">Indicada para:</span> {tool.audience.summary}
        </p>

        <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-2 border-t border-white/[0.07] pt-6">
          <p>
            <span className="mono block text-[0.65rem] tracking-[0.2em] text-metal uppercase">a partir de</span>
            <span className="font-display text-3xl font-medium text-snow">{formatPriceShort(start.price)}</span>
            <span className="text-fog">/mês</span>
          </p>
          {lowest < start.price && (
            <p className="text-sm text-fog">ou {formatPrice(lowest)}/mês em período maior, à vista</p>
          )}
          <p className="mono w-full text-[0.68rem] text-metal">
            + taxa de R$ 0,99 da {tool.payment.platform} · conferido em {formatDate(tool.pricing.checkedAt)}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/ferramentas/${tool.slug}/`}
            className="btn btn-chrome"
            data-ev="cta_click"
            data-prod={tool.slug}
            data-pos="destaque-home"
          >
            Conhecer ferramenta <ArrowRight size={15} className="arrow" />
          </Link>
          <Link
            href={`/ferramentas/${tool.slug}/#planos`}
            className="btn btn-ghost"
            data-ev="cta_click"
            data-prod={tool.slug}
            data-pos="destaque-home-planos"
          >
            Consultar oferta e planos
          </Link>
        </div>
      </div>
    </article>
  );
}
