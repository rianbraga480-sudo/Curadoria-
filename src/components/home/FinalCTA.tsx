import Link from "next/link";
import { ChromeStage } from "@/components/three/ChromeStage";
import { ArrowRight } from "@/components/ui/icons";

export function FinalCTA() {
  return (
    <section aria-labelledby="final-title" className="relative isolate overflow-hidden border-t border-white/[0.06] py-28 md:py-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]" />
      </div>
      <ChromeStage
        variant="ring"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-square w-[min(120vw,1000px)] -translate-x-1/2 -translate-y-1/2 opacity-70"
      />
      <div className="container-x text-center">
        <p className="eyebrow justify-center" data-reveal="fade">Comece por aqui</p>
        <h2
          id="final-title"
          data-reveal="title"
          className="mx-auto mt-8 max-w-[18ch] text-[clamp(2.4rem,6.2vw,5.8rem)] leading-[0.98] font-medium tracking-[-0.045em]"
        >
          A ferramenta certa pode transformar a <span className="chrome-text">maneira como você trabalha.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-fog" data-reveal="fade">
          Descubra soluções, compare possibilidades e tome decisões com mais segurança.
        </p>
        <div className="mt-10" data-reveal="fade">
          <Link href="/ferramentas/" className="btn btn-chrome" data-ev="cta_click" data-pos="cta-final">
            Explorar catálogo <ArrowRight size={15} className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
