import Link from "next/link";
import { ChromeStage } from "@/components/three/ChromeStage";
import { ArrowDown, ArrowRight } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";

const facts = (pricesCheckedAt: string) => [
  "Telas reais dos sites oficiais",
  `Preços conferidos em ${formatDate(pricesCheckedAt)}`,
  "Links de afiliado declarados",
  "Limitações sempre visíveis",
  "Sem promessa de ganhos",
  "Sem avaliações inventadas",
];

export function Hero({ pricesCheckedAt, toolCount }: { pricesCheckedAt: string; toolCount: number }) {
  const items = facts(pricesCheckedAt);
  return (
    <section
      data-hero
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[calc(var(--header-h)+2.25rem)]"
    >
      {/* iluminação de cena */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.09),transparent)]" />
        <div className="absolute bottom-[8%] left-1/2 h-[40vh] w-[60vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]" />
        {[12, 24, 76, 88].map((left, i) => (
          <span
            key={left}
            className="absolute top-[18%] h-28 w-px origin-top bg-gradient-to-b from-transparent via-white/50 to-transparent"
            style={{ left: `${left}%`, animation: `pulse-line ${5 + i}s ease-in-out ${i * 0.8}s infinite` }}
          />
        ))}
        <div className="horizon" />
      </div>

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <p className="tag mb-8 max-w-full !whitespace-normal text-center" data-reveal="fade">
          <span className="size-1.5 rounded-full bg-snow shadow-[0_0_10px_#fff]" />
          Curadoria independente de ferramentas digitais
        </p>

        <h1
          id="hero-title"
          data-reveal="title"
          className="max-w-[16ch] text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.045em]"
        >
          Encontre as <span className="chrome-sheen is-lit">ferramentas certas</span> para evoluir no digital.
        </h1>

        <p data-reveal="fade" className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-fog md:text-lg">
          Uma curadoria independente de soluções digitais para quem cria, empreende e vende pela internet. Explore,
          compare e escolha com informação.
        </p>

        <div data-reveal="fade" className="mt-10 flex w-full flex-col items-stretch gap-3 xs:w-auto xs:flex-row xs:items-center">
          <Link href="/ferramentas/" className="btn btn-chrome" data-ev="cta_click" data-pos="hero">
            Explorar ferramentas
            <ArrowRight size={15} className="arrow" />
          </Link>
          <Link href="/#curadoria" className="btn btn-ghost" data-ev="cta_click" data-pos="hero-secundario">
            Conhecer nossa curadoria
          </Link>
        </div>
      </div>

      {/* objeto cromado central */}
      <div className="relative z-0 mx-auto mt-10 w-[min(94vw,760px)] md:mt-14" data-parallax="0.12">
        <ChromeStage variant="sphere" className="relative aspect-square w-full" />
        <div
          aria-hidden="true"
          className="absolute inset-x-[18%] bottom-[2%] h-10 rounded-[50%] bg-white/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 mt-auto border-t border-white/[0.07] bg-obsidian/80">
        <div className="container-x flex items-center gap-6 py-4">
          <span className="mono hidden shrink-0 text-[0.68rem] tracking-[0.2em] text-metal uppercase md:block">
            {String(toolCount).padStart(2, "0")} ferramentas publicadas
          </span>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="flex w-max animate-[marquee_38s_linear_infinite] gap-10 will-change-transform">
              {[...items, ...items].map((f, i) => (
                <li
                  key={i}
                  aria-hidden={i >= items.length ? true : undefined}
                  className="mono flex items-center gap-10 text-[0.7rem] tracking-[0.18em] whitespace-nowrap text-silver uppercase"
                >
                  {f}
                  <span className="size-1 rounded-full bg-metal" />
                </li>
              ))}
            </ul>
          </div>
          <a href="#curadoria" aria-label="Rolar para a próxima seção" className="hidden size-10 shrink-0 place-items-center rounded-full border border-white/15 text-silver hover:text-snow md:grid">
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
