import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/JsonLd";
import { ArrowUpRight, Instagram } from "@/components/ui/icons";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getTools } from "@/lib/tools";

export const metadata = pageMetadata({
  title: "Contato",
  description:
    "Fale com a Curadoria Digital pelo Instagram para tirar dúvidas antes de escolher uma ferramenta. Suporte, acesso e cobrança são com cada ferramenta.",
  path: "/contato/",
});

export default function ContactPage() {
  const tools = getTools();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Contato", path: "/contato/" }])} />
      <PageIntro
        crumb="Contato"
        eyebrow="Contato"
        title={<>Ficou em dúvida <span className="chrome-text">antes de assinar?</span></>}
        intro="Mande uma mensagem direta no Instagram contando o que você precisa. A gente ajuda a ver qual ferramenta e qual plano fazem sentido para o seu caso, sem compromisso."
      />
      <section className="pb-28">
        <div className="container-x grid gap-4 lg:grid-cols-2">
          <a
            href={site.instagram.dm}
            target="_blank"
            rel="noopener"
            className="surface group flex min-h-72 flex-col p-8 md:p-10"
            data-ev="instagram_click"
            data-pos="contato"
          >
            <span className="flex items-start justify-between">
              <Instagram size={28} className="text-snow" />
              <ArrowUpRight size={22} className="text-fog transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <span className="mt-auto pt-10">
              <span className="mono block text-[0.68rem] tracking-[0.18em] text-metal uppercase">Mensagem direta</span>
              <span className="mt-2 block font-display text-[clamp(1.8rem,4vw,3rem)] text-snow">{site.instagram.handle}</span>
              <span className="mt-2 block text-sm text-fog">Abre o Instagram em uma nova aba.</span>
            </span>
          </a>
          <div className="rounded-3xl border border-white/[0.1] p-8 md:p-10">
            <h2 className="text-2xl font-medium">Suporte das ferramentas</h2>
            <p className="mt-4 text-fog">
              Dúvidas sobre acesso, cobrança, cancelamento ou reembolso são com o suporte de cada ferramenta. A Curadoria
              Digital não tem acesso à sua conta nem ao seu pagamento.
            </p>
            <ul className="mt-6 space-y-3">
              {tools.map((t) => (
                <li key={t.slug} className="border-t border-white/[0.08] pt-3 text-sm">
                  <Link href={`/ferramentas/${t.slug}/#duvidas`} className="font-display text-lg text-snow hover:underline">{t.name}</Link>
                  <p className="text-fog">{t.support}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-metal">
              Este site não tem formulários e não coleta dados pessoais. Veja a{" "}
              <Link href="/politica-de-privacidade/" className="prose-link">política de privacidade</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
