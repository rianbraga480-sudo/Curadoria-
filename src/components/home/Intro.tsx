import { formatDate } from "@/lib/format";

export function Intro({ toolCount, categoryCount, pricesCheckedAt }: { toolCount: number; categoryCount: number; pricesCheckedAt: string }) {
  const stats = [
    { value: String(toolCount).padStart(2, "0"), label: "ferramentas publicadas, com página própria" },
    { value: String(categoryCount).padStart(2, "0"), label: "categorias com ferramentas analisadas" },
    { value: formatDate(pricesCheckedAt).slice(0, 5), label: `última conferência de preços (${formatDate(pricesCheckedAt)})` },
  ];
  return (
    <section id="curadoria" aria-labelledby="intro-title" className="relative py-28 md:py-44">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow" data-reveal="fade">
            <span className="text-silver">01</span> A curadoria
          </p>
          <div className="mt-10 hidden lg:block" aria-hidden="true">
            <div className="h-40 w-px bg-gradient-to-b from-white/40 to-transparent" data-draw="y" />
          </div>
        </div>
        <div className="lg:col-span-8">
          <h2 id="intro-title" data-reveal="title" className="text-[clamp(2.4rem,6.4vw,6rem)] leading-[0.98] font-medium tracking-[-0.045em]">
            Menos tempo procurando. <span className="chrome-text">Mais clareza para escolher.</span>
          </h2>
          <div className="mt-12 grid gap-8 text-[1.05rem] leading-relaxed text-fog md:grid-cols-2" data-reveal="stagger">
            <p>
              Existem milhares de ferramentas prometendo resolver tudo. A ferramenta errada custa dinheiro, tempo de
              configuração e, às vezes, meses de trabalho num caminho que não servia para você.
            </p>
            <p>
              A Curadoria Digital pesquisa, analisa e organiza ferramentas digitais com telas reais, preços conferidos e
              limitações declaradas, para que você entenda o que cada uma faz <em className="text-silver not-italic">antes</em> de assinar.
            </p>
          </div>
          <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3" data-reveal="stagger">
            {stats.map((s) => (
              <div key={s.label} className="bg-obsidian p-6 md:p-8">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="chrome-text block font-display text-5xl font-medium tracking-tight md:text-6xl">{s.value}</span>
                  <span className="mt-3 block text-sm text-fog">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
