import Link from "next/link";
import { PageIntro, Prose } from "@/components/layout/PageIntro";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { getTools } from "@/lib/tools";

export const metadata = pageMetadata({
  title: "Termos de uso",
  description:
    "Termos de uso da Curadoria Digital: site informativo e não oficial, preços com data de conferência, compras na Cakto, links de afiliado e uso responsável.",
  path: "/termos/",
});

export default function TermsPage() {
  const names = getTools().map((t) => t.name).join(", ");
  return (
    <>
      <PageIntro crumb="Termos de uso" eyebrow="Legal" title="Termos de uso" updated={formatDate(site.legal.termsUpdatedAt)} />
      <Prose>
        <p>Estes termos valem para o site curadoriadigitalbr.com.br. Ao usar o site, você concorda com eles.</p>
        <section>
          <h2>O que é este site</h2>
          <p>
            Um site informativo e não oficial que apresenta ferramentas digitais de outras empresas. A Curadoria Digital não
            vende as ferramentas diretamente e não é dona delas.
          </p>
        </section>
        <section>
          <h2>Informações e preços</h2>
          <p>
            Conferimos as informações nas fontes indicadas em cada página e mostramos a data da conferência. Elas podem mudar
            sem aviso. Vale sempre o que aparece no site oficial da ferramenta e na página de pagamento no momento da compra.
          </p>
        </section>
        <section>
          <h2>Compras</h2>
          <p>
            A compra é feita na Cakto, com a empresa responsável por cada ferramenta. Acesso, suporte, cobrança, renovação,
            cancelamento e reembolso seguem as regras dessa empresa e da Cakto.
          </p>
        </section>
        <section>
          <h2>Links de afiliado</h2>
          <p>
            Os botões de compra são links de afiliado. Veja como isso funciona no{" "}
            <Link href="/sobre/#afiliados" className="prose-link">Aviso de afiliados</Link>.
          </p>
        </section>
        <section>
          <h2>Sem garantia de resultados</h2>
          <p>
            As ferramentas não garantem audiência, vendas ou ganhos: o resultado depende de como você as usa, do seu conteúdo
            e da sua oferta. O conteúdo deste site é informativo e não é consultoria.
          </p>
        </section>
        <section>
          <h2>Uso responsável</h2>
          <p>
            Use as ferramentas de acordo com as regras das plataformas, como o YouTube e o WhatsApp. Por exemplo, envie
            mensagens só para quem autorizou recebê-las.
          </p>
        </section>
        <section>
          <h2>Marcas e imagens</h2>
          <p>
            {names}, Cakto, WhatsApp e YouTube são marcas de seus donos. As telas mostradas foram reproduzidas dos sites
            oficiais, para apresentar as ferramentas.
          </p>
        </section>
        <section>
          <h2>Privacidade</h2>
          <p>Como tratamos dados está na <Link href="/politica-de-privacidade/" className="prose-link">Política de privacidade</Link>.</p>
        </section>
        <section>
          <h2>Mudanças nestes termos</h2>
          <p>Podemos atualizar estes termos. A data no topo mostra a última atualização.</p>
        </section>
        <section>
          <h2>Contato</h2>
          <p>
            Fale com a gente pelo Instagram{" "}
            <a href={site.instagram.url} target="_blank" rel="noopener" className="prose-link">{site.instagram.handle}</a>.
          </p>
        </section>
      </Prose>
    </>
  );
}
