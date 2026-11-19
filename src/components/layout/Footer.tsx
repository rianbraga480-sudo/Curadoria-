import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Instagram } from "@/components/ui/icons";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { getActiveCategories, getTools } from "@/lib/tools";

export function Footer() {
  const tools = getTools();
  const cats = getActiveCategories();
  const col = "mono mb-5 text-[0.68rem] tracking-[0.2em] text-metal uppercase";
  const link = "link-underline text-[0.92rem] text-fog hover:text-snow";
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-obsidian pt-20 pb-10">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-fog">
              Curadoria independente de ferramentas digitais para quem cria conteúdo, empreende e vende pela internet.
              Pesquisamos, analisamos e comparamos para você escolher com informação.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-2 text-sm text-silver hover:text-snow"
              data-ev="instagram_click"
              data-pos="rodape"
            >
              <Instagram size={16} /> {site.instagram.handle}
            </a>
          </div>

          <nav aria-label="Navegação" className="md:col-span-2">
            <h2 className={col}>Navegação</h2>
            <ul className="space-y-3">
              <li><Link className={link} href="/">Início</Link></li>
              <li><Link className={link} href="/ferramentas/">Catálogo</Link></li>
              <li><Link className={link} href="/comparar/">Comparar</Link></li>
              <li><Link className={link} href="/sobre/">Sobre</Link></li>
              <li><Link className={link} href="/sobre/#criterios">Como fazemos a curadoria</Link></li>
              <li><Link className={link} href="/contato/">Contato</Link></li>
            </ul>
          </nav>

          <nav aria-label="Categorias" className="md:col-span-2">
            <h2 className={col}>Categorias</h2>
            <ul className="space-y-3">
              {cats.map((c) => (
                <li key={c.slug}>
                  <Link className={link} href={`/ferramentas/?categoria=${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Ferramentas" className="md:col-span-2">
            <h2 className={col}>Ferramentas</h2>
            <ul className="space-y-3">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link className={link} href={`/ferramentas/${t.slug}/`}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="md:col-span-2">
            <h2 className={col}>Legal</h2>
            <ul className="space-y-3">
              <li><Link className={link} href="/politica-de-privacidade/">Política de privacidade</Link></li>
              <li><Link className={link} href="/termos/">Termos de uso</Link></li>
              <li><Link className={link} href="/sobre/#afiliados">Aviso de afiliados</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 text-[0.82rem] leading-relaxed text-fog md:p-6">
          <strong className="font-medium text-silver">Aviso de afiliados.</strong> Página independente e não oficial, com
          links de afiliado: a Curadoria Digital pode receber comissão pelas compras feitas pelos links, sem custo extra
          para quem compra. {tools.map((t) => t.name).join(" e ")} são marcas de seus respectivos donos; as telas foram
          reproduzidas dos sites oficiais. WhatsApp e YouTube são marcas de seus donos, sem relação com esta página. Não há
          promessa de resultados.
        </div>
      </div>

      <div className="pointer-events-none mt-16 select-none" aria-hidden="true">
        <p className="outline-text text-center font-display text-[19vw] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap">
          CURADORIA
        </p>
      </div>

      <div className="container-x mt-8 flex flex-col gap-2 text-[0.75rem] text-metal md:flex-row md:justify-between">
        <p>© {new Date().getUTCFullYear()} Curadoria Digital. Curadoria independente.</p>
        <p className="mono">Informações atualizadas em {formatDate(site.updatedAt)}</p>
      </div>
    </footer>
  );
}
