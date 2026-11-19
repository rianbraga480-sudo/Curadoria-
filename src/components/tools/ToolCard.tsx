import Link from "next/link";
import type { ToolSummary } from "@/lib/tools";
import { ToolLogo } from "./ToolLogo";
import { ArrowRight, Check } from "@/components/ui/icons";
import { formatDate, formatPrice, formatPriceShort } from "@/lib/format";

/** Card de ferramenta do catálogo. Componente puro: serve em servidor e cliente. */
export function ToolCard({ tool, headingLevel = "h2" }: { tool: ToolSummary; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const img = tool.image;
  return (
    <article className="surface group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.07] bg-obsidian">
        <img
          src={img.srcSmall ?? img.src}
          width={img.srcSmall ? 800 : img.width}
          height={img.srcSmall ? Math.round((800 * img.height) / img.width) : img.height}
          alt={img.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top opacity-80 transition duration-[1200ms] ease-[var(--ease-chrome)] group-hover:scale-[1.04] group-hover:opacity-100"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <span className="mono absolute top-4 left-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[0.62rem] tracking-[0.14em] text-silver uppercase backdrop-blur">
          Tela real
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="-mt-12 flex items-end gap-4">
          <ToolLogo tool={tool} size={56} className="relative shadow-[0_10px_30px_rgba(0,0,0,.8)]" />
          <p className="mono pb-1 text-[0.65rem] tracking-[0.14em] text-metal uppercase">{tool.categories[0]?.name}</p>
        </div>
        <H className="mt-5 text-[1.9rem] font-medium">
          <Link href={`/ferramentas/${tool.slug}/`} className="after:absolute after:inset-0 after:content-['']" data-ev="cta_click" data-prod={tool.slug} data-pos="card-catalogo">
            {tool.name}
          </Link>
        </H>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-fog">{tool.shortDescription}</p>
        <ul className="mt-5 space-y-2">
          {tool.benefits.map((b) => (
            <li key={b} className="flex gap-2.5 text-[0.88rem] text-silver">
              <Check size={16} className="mt-0.5 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Categorias">
          {tool.categories.map((c) => (
            <li key={c.slug} className="tag !text-[0.6rem]">{c.name}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
          <p className="leading-tight">
            <span className="mono block text-[0.6rem] tracking-[0.18em] text-metal uppercase">a partir de</span>
            <span className="font-display text-xl text-snow">{formatPriceShort(tool.startingPrice)}</span>
            <span className="text-sm text-fog">/mês</span>
            {tool.lowestMonthly < tool.startingPrice && (
              <span className="block text-xs text-fog">ou {formatPrice(tool.lowestMonthly)}/mês em período maior</span>
            )}
            <span className="mono mt-1 block text-[0.6rem] text-metal">conferido em {formatDate(tool.pricesCheckedAt)}</span>
          </p>
          <span className="btn btn-ghost btn-sm relative z-10 shrink-0 pointer-events-none">
            Conhecer ferramenta <ArrowRight size={13} className="arrow" />
          </span>
        </div>
      </div>
    </article>
  );
}
