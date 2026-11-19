import Link from "next/link";
import { PageIntro, Prose } from "@/components/layout/PageIntro";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { getTools } from "@/lib/tools";

export const metadata = pageMetadata({
  title: "Política de privacidade",
  description:
    "Como a Curadoria Digital trata dados: sem formulários e sem cookies próprios, medição de visitas com Umami e Cloudflare, hospedagem na Netlify e links de afiliado.",
  path: "/politica-de-privacidade/",
});

export default function PrivacyPage() {
  const ig = (
    <a href={site.instagram.url} target="_blank" rel="noopener" className="prose-link">
      {site.instagram.handle}
    </a>
  );
  const names = getTools().map((t) => t.name).join(" e ");
  return (
    <>
      <PageIntro crumb="Política de privacidade" eyebrow="Legal" title="Política de privacidade" updated={formatDate(site.legal.privacyUpdatedAt)} />
      <Prose>
        <section>
          <h2>Quem somos</h2>
          <p>
            Este site é mantido pela Curadoria Digital, um projeto não oficial que apresenta ferramentas para quem cria
            conteúdo e vende online. Não somos donos das ferramentas apresentadas, como o {names}, nem da Cakto. O contato é
            pelo Instagram {ig}.
          </p>
        </section>
        <section>
          <h2>O que coletamos</h2>
          <p>
            Nenhum dado pessoal. Este site não tem formulários, não pede cadastro e não usa cookies próprios nem pixel de
            anúncios. As fontes, as imagens e os scripts de animação ficam no próprio site.
          </p>
        </section>
        <section>
          <h2>Medição de visitas</h2>
          <p>
            Usamos o Cloudflare Web Analytics para contar visitas e entender quais páginas são mais vistas. Ele não usa
            cookies, não guarda o seu endereço IP para identificar você e não acompanha você em outros sites. Os números
            chegam para nós apenas somados, como quantidade de visitas e de páginas vistas. Esses dados seguem a política de
            privacidade da Cloudflare.
          </p>
          <p className="mt-4">
            Também usamos o Umami para contar visitas e cliques nos botões de compra. Segundo o próprio Umami, o rastreador
            não usa cookies. Ele registra a página visitada, o site de onde você veio, o navegador, o sistema, o tipo de
            aparelho e a localização aproximada. Quando você clica em um botão de compra, registra também o produto, o
            plano, a posição do botão e, se você chegou por um anúncio, o nome da campanha (por exemplo,
            “tiktok-narracao”). Esse nome vem do próprio link do anúncio e fica guardado só nesta aba do navegador, até você
            fechá-la. Ele não identifica você. Não registramos nome, e-mail, telefone nem dados de pagamento. No plano que
            usamos, esses dados ficam guardados por 6 meses e seguem a política de privacidade do Umami.
          </p>
        </section>
        <section>
          <h2>Hospedagem</h2>
          <p>
            O site é hospedado na Netlify. Como qualquer servidor, ela pode registrar dados técnicos de acesso, como endereço
            IP, data, hora e tipo de navegador, para entregar a página e proteger o serviço. Esses registros seguem a
            política de privacidade da própria Netlify.
          </p>
        </section>
        <section>
          <h2>Links de afiliado e pagamento</h2>
          <p>
            Os botões dos planos levam à página de pagamento da Cakto com um código de afiliado da Curadoria Digital. Esse
            código mostra que a compra veio deste site e gera a nossa comissão, e a Cakto pode usar cookies próprios para
            registrar essa indicação.
          </p>
          <p className="mt-4">
            Os dados que você informa no pagamento, como nome, e-mail e dados do cartão, são tratados pela Cakto e pela
            empresa responsável por cada ferramenta, conforme as políticas delas. A Curadoria Digital não tem acesso aos
            dados do seu cartão.
          </p>
        </section>
        <section>
          <h2>Links para outros sites</h2>
          <p>Este site também tem link para o nosso Instagram. Ao abrir sites de terceiros, valem as regras de privacidade de cada um.</p>
        </section>
        <section>
          <h2>Mudanças nesta política</h2>
          <p>Se passarmos a usar outra ferramenta de medição, como um pixel de anúncios, esta página será atualizada para informar.</p>
        </section>
        <section>
          <h2>Dúvidas</h2>
          <p>Fale com a gente pelo Instagram {ig}. Veja também os <Link href="/termos/" className="prose-link">termos de uso</Link>.</p>
        </section>
      </Prose>
    </>
  );
}
