import { SectionHeading } from "@/components/ui/Section";

const steps = [
  {
    n: "01",
    title: "Pesquisa",
    text: "Mapeamos ferramentas que resolvem uma tarefa clara de quem cria conteúdo, empreende ou vende online, com site oficial no ar e recursos mostrados publicamente.",
    meta: "site oficial · telas públicas",
  },
  {
    n: "02",
    title: "Análise",
    text: "Registramos o que cada recurso faz, em qual plano ele está, para quem a ferramenta serve e para quem não serve, com as limitações e os cuidados antes de assinar.",
    meta: "recursos · limitações · público",
  },
  {
    n: "03",
    title: "Comparação",
    text: "Conferimos preços, periodicidade, taxas, garantia e forma de pagamento na página de pagamento, sempre com a data da conferência. Comparamos apenas o que é comparável.",
    meta: "preços datados · condições",
  },
  {
    n: "04",
    title: "Recomendação",
    text: "Indicamos o perfil de quem aproveita cada ferramenta e apontamos alternativas gratuitas quando existem. Sem notas inventadas, sem promessa de resultado.",
    meta: "perfil indicado · alternativas",
  },
];

export function Process() {
  return (
    <section id="processo" aria-labelledby="process-title" className="relative border-t border-white/[0.06] py-24 md:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="process-title"
              index="04"
              eyebrow="Nosso processo"
              title={
                <>
                  Quatro etapas antes de <span className="chrome-text">qualquer recomendação.</span>
                </>
              }
              intro="Cada página de ferramenta passa pelo mesmo método. Quando uma informação vem do site oficial, dizemos. Quando não encontramos, também."
            />
          </div>
        </div>
        <ol className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-[1.15rem] w-px bg-white/[0.08] md:left-[1.6rem]" />
          <span aria-hidden="true" data-draw="y" className="absolute top-0 bottom-0 left-[1.15rem] w-px bg-gradient-to-b from-white via-white/60 to-transparent md:left-[1.6rem]" />
          {steps.map((s) => (
            <li key={s.n} className="relative grid grid-cols-[2.3rem_1fr] gap-6 pb-16 last:pb-0 md:grid-cols-[3.2rem_1fr] md:gap-10">
              <span aria-hidden="true" className="relative z-10 mt-2 grid size-[2.3rem] place-items-center rounded-full border border-white/25 bg-obsidian md:size-[3.2rem]">
                <span className="size-1.5 rounded-full bg-snow shadow-[0_0_12px_#fff]" />
              </span>
              <div data-reveal="fade">
                <span className="chrome-text block font-display text-[clamp(4.5rem,11vw,9rem)] leading-[0.8] font-semibold tracking-[-0.06em]">
                  {s.n}
                </span>
                <h3 className="mt-4 text-3xl font-medium md:text-4xl">{s.title}</h3>
                <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-fog">{s.text}</p>
                <p className="mono mt-5 text-[0.68rem] tracking-[0.18em] text-metal uppercase">{s.meta}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
