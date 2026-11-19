import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Featured } from "@/components/home/Featured";
import { Categories } from "@/components/home/Categories";
import { Process } from "@/components/home/Process";
import { Differentials } from "@/components/home/Differentials";
import { ChooseGuide } from "@/components/home/ChooseGuide";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FAQ } from "@/components/tools/FAQ";
import { SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/JsonLd";
import { Instagram } from "@/components/ui/icons";
import { site } from "@/content/site";
import { absoluteUrl, faqJsonLd, orgJsonLd, pageMetadata } from "@/lib/seo";
import { getActiveCategories, getFeaturedTools, getTools } from "@/lib/tools";

export const metadata = pageMetadata({
  title: "Curadoria Digital: ferramentas digitais analisadas e comparadas",
  description:
    "Curadoria independente de ferramentas para quem cria conteúdo, empreende e vende pela internet. Telas reais, recursos, limitações e preços conferidos antes de você assinar.",
  path: "/",
  absoluteTitle: true,
});

const homeFaq = [
  {
    q: "O que é a Curadoria Digital?",
    a: "Uma plataforma independente que pesquisa, analisa e apresenta ferramentas digitais para quem cria conteúdo, empreende e vende pela internet. Cada ferramenta tem uma página com telas reais, recursos, limitações e preços conferidos.",
  },
  {
    q: "Qual ferramenta é para mim?",
    a: "Se você cria ou quer criar canais no YouTube sem aparecer, veja o Dark Planner. Se você vende ou atende clientes pelo WhatsApp, veja o Whatsify Pro. A página Comparar resume as diferenças.",
  },
  {
    q: "Vocês são donos das ferramentas apresentadas?",
    a: "Não. Cada ferramenta pertence à sua empresa, que cuida do acesso, do suporte e da cobrança. A Curadoria Digital só apresenta as ferramentas.",
  },
  {
    q: "Comprar por aqui custa mais caro?",
    a: "Não. Os links são de afiliado: se você comprar por eles, a Curadoria Digital recebe uma comissão, sem custo extra para você.",
  },
  {
    q: "Onde eu pago? É seguro?",
    a: "O pagamento é feito na Cakto, a plataforma usada pelas ferramentas apresentadas hoje. O valor final, com a taxa de serviço de R$ 0,99, aparece na tela antes de você pagar. Este site não tem formulário e não recebe os dados do seu pagamento.",
  },
  {
    q: "Os preços podem mudar?",
    a: "Podem. Cada página mostra a data em que os preços foram conferidos. Antes de pagar, confirme o valor e as condições na página de pagamento.",
  },
  {
    q: "Os resultados são garantidos?",
    a: "Não. São ferramentas: o resultado depende do seu conteúdo, da sua oferta e da sua constância.",
  },
  {
    q: "Quem dá o suporte depois da compra?",
    a: "A equipe de cada ferramenta. Para dúvidas de acesso ou de cobrança, fale com o suporte da ferramenta que você assinou.",
  },
];

export default function HomePage() {
  const tools = getTools();
  const featured = getFeaturedTools();
  const categories = getActiveCategories();
  const pricesCheckedAt = tools.map((t) => t.pricing.checkedAt).sort().at(-1) ?? site.updatedAt;

  return (
    <>
      <JsonLd
        data={[
          orgJsonLd,
          {
            "@type": "WebSite",
            "@id": `${site.url}/#site`,
            url: `${site.url}/`,
            name: site.name,
            inLanguage: "pt-BR",
            publisher: { "@id": `${site.url}/#org` },
          },
          {
            "@type": "ItemList",
            name: "Ferramentas apresentadas pela Curadoria Digital",
            itemListElement: tools.map((t, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: t.name,
              url: absoluteUrl(`/ferramentas/${t.slug}/`),
            })),
          },
          faqJsonLd(homeFaq),
        ]}
      />
      <Hero pricesCheckedAt={pricesCheckedAt} toolCount={tools.length} />
      <Intro toolCount={tools.length} categoryCount={categories.length} pricesCheckedAt={pricesCheckedAt} />
      <Featured tools={featured} />

      <section id="qual-escolher" aria-labelledby="choose-title" className="relative py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            id="choose-title"
            eyebrow="Por onde começar"
            title={
              <>
                Qual ferramenta é <span className="chrome-text">ideal para você?</span>
              </>
            }
            intro="Responda a uma pergunta: onde está o trabalho que você quer facilitar? São ferramentas independentes, com assinaturas separadas."
          />
          <div className="mt-12">
            <ChooseGuide tools={tools} />
          </div>
          <p className="mt-6 text-sm text-fog">
            Quer ver as informações lado a lado?{" "}
            <Link href="/comparar/" className="prose-link">Abrir a página de comparação</Link>
          </p>
        </div>
      </section>

      <Categories categories={categories} />
      <Process />
      <Differentials />

      <section id="duvidas" aria-labelledby="faq-title" className="relative border-t border-white/[0.06] py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-title" index="06" eyebrow="Dúvidas" title="Perguntas frequentes" />
            <p className="mt-6 text-fog" data-reveal="fade">
              Não achou a sua resposta?{" "}
              <a href={site.instagram.dm} className="prose-link" target="_blank" rel="noopener" data-ev="instagram_click" data-pos="faq">
                Mande uma mensagem no Instagram
              </a>
              .
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost btn-sm mt-6"
              data-ev="instagram_click"
              data-pos="faq-seguir"
            >
              <Instagram size={15} /> {site.instagram.handle}
            </a>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={homeFaq} />
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
