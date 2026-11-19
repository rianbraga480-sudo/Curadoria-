import type { Plan, Tool } from "@/lib/schema";
import { AffiliateLink } from "@/components/ui/Button";
import { ArrowUpRight, Check, Cross, Info } from "@/components/ui/icons";
import { formatDate, formatPrice, formatPriceShort, periodLabel } from "@/lib/format";
import Link from "next/link";

function PlanCard({ plan, featured }: { plan: Plan; featured: boolean }) {
  const o = plan.offer;
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={`surface relative flex h-full flex-col p-7 backdrop-blur-xl md:p-8 ${
        featured ? "!border-white/30 shadow-[0_40px_120px_-40px_rgba(255,255,255,.25)]" : ""
      }`}
      style={{ background: featured ? "linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.02) 50%), rgba(16,16,16,.85)" : undefined }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 id={`plan-${plan.id}`} className="font-sans text-lg font-medium tracking-normal text-silver">
          {plan.name}
        </h3>
        {plan.badge && <span className="tag !border-white/40 !text-snow">{plan.badge}</span>}
      </div>
      <p className="mt-2 text-sm text-fog">{plan.description}</p>

      <p className="mt-7 flex items-baseline gap-1.5">
        <span className="chrome-text font-display text-[3.2rem] leading-none font-medium tracking-tight">
          {formatPriceShort(o.price)}
        </span>
        <span className="text-fog">/{periodLabel[o.period]}</span>
      </p>
      <p className="mono mt-2 text-[0.7rem] tracking-[0.06em] text-metal">{plan.billingNote}</p>
      {o.monthlyEquivalent && (
        <p className="mt-3 text-sm text-silver">
          equivale a {formatPrice(o.monthlyEquivalent)}/mês à vista
          {o.installments && <span className="block text-fog">{o.installments}</span>}
        </p>
      )}
      {plan.savingsNote && <p className="mono mt-3 text-[0.72rem] text-snow">{plan.savingsNote}</p>}

      <div className="hairline my-7" />

      <ul className="space-y-3 text-[0.92rem]">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-silver">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10">
              <Check size={12} />
            </span>
            {f}
          </li>
        ))}
        {plan.excluded.map((f) => (
          <li key={f} className="flex gap-3 text-metal">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-white/10">
              <Cross size={11} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <AffiliateLink href={o.checkoutUrl} variant={featured ? "chrome" : "ghost"} className="w-full">
          {o.label}
        </AffiliateLink>
        {plan.alternateOffers.map((alt) => (
          <a
            key={alt.trackingId}
            href={alt.checkoutUrl}
            rel="sponsored noopener"
            data-pos="link-trimestral"
            className="group mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-left transition-colors hover:border-white/30"
          >
            <span>
              <span className="block text-sm text-snow">
                {alt.label}: {formatPrice(alt.price)} a cada {alt.period === "trimestre" ? "3 meses" : periodLabel[alt.period]}
              </span>
              <span className="block text-xs text-fog">
                {alt.monthlyEquivalent && `equivale a ${formatPrice(alt.monthlyEquivalent)}/mês à vista`}
                {alt.installments && ` · ${alt.installments}`}
              </span>
            </span>
            <ArrowUpRight size={15} className="shrink-0 text-fog transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only"> (abre a página de pagamento da Cakto, site externo)</span>
          </a>
        ))}
      </div>
    </article>
  );
}

export function Pricing({ tool }: { tool: Tool }) {
  const p = tool.pricing;
  const featuredIdx = Math.max(0, p.plans.findIndex((pl) => pl.badge));
  return (
    <div>
      <div className="relative">
        <p
          aria-hidden="true"
          className="outline-text pointer-events-none absolute -top-[0.42em] left-1/2 -translate-x-1/2 font-display text-[clamp(6rem,22vw,20rem)] leading-none font-semibold tracking-[-0.06em] select-none"
        >
          Planos
        </p>
        <ul className={`relative grid gap-4 ${p.plans.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`} data-reveal="stagger">
          {p.plans.map((plan, i) => (
            <li key={plan.id}>
              <PlanCard plan={plan} featured={i === featuredIdx && !!plan.badge} />
            </li>
          ))}
        </ul>
      </div>

      {p.included.length > 0 && (
        <div className="surface mt-4 p-7 md:p-8">
          <h3 className="mono text-[0.7rem] tracking-[0.18em] text-metal uppercase">Incluído em todos os planos</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {p.included.map((f) => (
              <li key={f} className="flex gap-3 text-[0.92rem] text-silver">
                <Check size={16} className="mt-0.5 shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-sm leading-relaxed text-fog md:p-6">
        <p className="flex items-start gap-3">
          <Info size={18} className="mt-0.5 shrink-0 text-silver" />
          <span>
            <strong className="font-medium text-silver">Links de afiliado.</strong> Se você comprar por esta página, a
            Curadoria Digital recebe uma comissão, sem custo extra para você.{" "}
            <Link href="/sobre/#afiliados" className="prose-link">Saiba mais</Link>
          </span>
        </p>
        <ul className="mt-4 space-y-2 pl-8">
          {p.conditions.map((c) => (
            <li key={c} className="list-disc marker:text-metal">{c}</li>
          ))}
        </ul>
        <p className="mono mt-4 pl-8 text-[0.68rem] tracking-[0.08em] text-metal uppercase">
          Preços conferidos na {p.source} em {formatDate(p.checkedAt)} · moeda: real (BRL)
        </p>
      </div>

      {p.table && (
        <details className="faq-item surface mt-4 !rounded-2xl">
          <summary className="flex items-center justify-between gap-4 p-6 font-display text-xl text-snow">
            Comparação completa entre os planos
            <span className="faq-icon mono text-2xl text-fog" aria-hidden="true">+</span>
          </summary>
          <div className="table-scroll px-3 pb-6 md:px-6" data-lenis-prevent>
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">Comparação entre os planos do {tool.name}</caption>
              <thead>
                <tr className="border-b border-white/15">
                  <th scope="col" className="mono py-3 pr-4 text-[0.68rem] font-normal tracking-[0.14em] text-metal uppercase">Recurso</th>
                  {p.table.columns.map((c) => (
                    <th key={c} scope="col" className="py-3 pr-4 font-display text-base font-medium text-snow">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.table.rows.map((r) => (
                  <tr key={r.label} className="border-b border-white/[0.06]">
                    <th scope="row" className="py-3 pr-4 font-normal text-fog">{r.label}</th>
                    {r.values.map((v, i) => (
                      <td key={i} className="py-3 pr-4 text-silver">
                        {typeof v === "boolean" ? (
                          v ? (
                            <span className="inline-flex items-center gap-1.5 text-snow"><Check size={15} /> <span className="sr-only">Sim</span></span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-metal"><Cross size={14} /> <span className="sr-only">Não</span></span>
                          )
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mono mt-3 text-[0.65rem] text-metal md:hidden">Deslize a tabela para o lado para ver todos os planos</p>
          </div>
        </details>
      )}
    </div>
  );
}
