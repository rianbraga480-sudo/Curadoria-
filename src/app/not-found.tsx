import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

export const metadata = { title: "Página não encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div className="container-x text-center">
        <span aria-hidden="true" className="chrome-orb mx-auto block w-28 animate-[float-y_6s_ease-in-out_infinite]" />
        <p className="mono mt-10 text-[0.7rem] tracking-[0.2em] text-metal uppercase">Erro 404</p>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,5rem)] font-medium">Esta página <span className="chrome-text">não existe.</span></h1>
        <p className="mx-auto mt-6 max-w-md text-fog">O endereço pode ter mudado. As ferramentas agora ficam em /ferramentas/.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/ferramentas/" className="btn btn-chrome">Explorar ferramentas <ArrowRight size={14} className="arrow" /></Link>
          <Link href="/" className="btn btn-ghost">Página inicial</Link>
        </div>
      </div>
    </section>
  );
}
