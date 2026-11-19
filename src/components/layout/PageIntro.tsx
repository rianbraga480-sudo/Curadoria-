import Link from "next/link";
import type { ReactNode } from "react";

/** Abertura editorial das páginas institucionais. */
export function PageIntro({ crumb, eyebrow, title, intro, updated }: { crumb: string; eyebrow: string; title: ReactNode; intro?: ReactNode; updated?: string }) {
  return (
    <section data-hero className="relative overflow-hidden pt-[calc(var(--header-h)+4rem)] pb-14 md:pt-[calc(var(--header-h)+6rem)]">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-[60vh] w-[90vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)]" />
      <div className="container-x relative">
        <nav aria-label="Trilha" className="mono mb-10 text-[0.68rem] tracking-[0.16em] text-metal uppercase">
          <Link href="/" className="hover:text-snow">Início</Link> <span aria-hidden="true">/</span>{" "}
          <span aria-current="page" className="text-silver">{crumb}</span>
        </nav>
        <p className="eyebrow" data-reveal="fade">{eyebrow}</p>
        <h1 data-reveal="title" className="mt-6 max-w-[16ch] text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.05em]">
          {title}
        </h1>
        {intro && <div className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-fog" data-reveal="fade">{intro}</div>}
        {updated && <p className="mono mt-6 text-[0.7rem] tracking-[0.12em] text-metal uppercase">Última atualização: {updated}</p>}
      </div>
    </section>
  );
}

/** Corpo de texto longo (legal/institucional) com tipografia confortável. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="container-x pb-28">
      <div className="mx-auto max-w-3xl space-y-12 text-[1.02rem] leading-relaxed text-fog [&_h2]:mb-4 [&_h2]:text-[1.7rem] [&_h2]:font-medium [&_li]:mt-2 [&_strong]:font-medium [&_strong]:text-silver [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-metal">
        {children}
      </div>
    </div>
  );
}
