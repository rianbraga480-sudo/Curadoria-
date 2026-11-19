import Link from "next/link";
import { PageIntro, Prose } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/JsonLd";
import { Instagram } from "@/components/ui/icons";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd, orgJsonLd, pageMetadata } from "@/lib/seo";
import { getTools } from "@/lib/tools";

export const metadata = pageMetadata({
  title: "Sobre a Curadoria Digital: critérios, afiliados e contato",
  description:
    "Quem somos, como escolhemos e conferimos as ferramentas, o que não fazemos e como funcionam os links de afiliado da Curadoria Digital.",
  path: "/sobre/",
});

export default function AboutPage() {
  const tools = getTools();
  return (
    <>
      <JsonLd data={[orgJsonLd, breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Sobre", path: "/sobre/" }])]} />
      <PageIntro
        crumb="Sobre"
        eyebrow="Sobre a Curadoria Digital"
        title={<>Ajudar você a <span className="chrome-text">escolher melhor.</span></>}
        intro="A Curadoria Digital é uma plataforma independente que pesquisa, analisa, organiza e recomenda ferramentas digitais para quem empreende, cria conteúdo, trabalha com marketing digital e vende pela internet."
        updated={formatDate(site.legal.aboutUpdatedAt)}
      />
      <Prose>
        <nav aria-label="Nesta página" className="mono flex flex-wrap gap-2 text-[0.7rem] tracking-[0.1em] uppercase">
          {[["o-que-e", "O que é"], ["criterios", "Como escolhemos"], ["afiliados", "Aviso de afiliados"], ["contato", "Contato"]].map(([id, l]) => (
            <a key={id} href={`#${id}`} className="tag hover:border-white/40">{l}</a>
          ))}
        </nav>

        <section id="o-que-e">
          <h2>O que é</h2>
          <p>
            É um projeto independente e não oficial: não somos donos das ferramentas que apresentamos nem da plataforma de
            pagamento. Cada ferramenta tem a sua própria empresa, que cuida do acesso, do suporte e da cobrança. Não
            processamos pagamentos e não controlamos os serviços oferecidos pelos fornecedores.
          </p>
          <p className="mt-4">
            Hoje apresentamos {tools.length} ferramentas:{" "}
            {tools.map((t, i) => (
              <span key={t.slug}>
                <Link href={`/ferramentas/${t.slug}/`} className="prose-link">{t.name}</Link>
                {` (${t.tagline.toLowerCase()})`}
                {i < tools.length - 2 ? ", " : i === tools.length - 2 ? " e " : "."}
              </span>
            ))}
          </p>
        </section>

        <section id="criterios">
          <h2>Como escolhemos e conferimos</h2>
          <p>Antes de apresentar uma ferramenta, conferimos se:</p>
          <ul>
            <li>ela resolve uma tarefa clara de quem cria conteúdo, empreende ou vende online;</li>
            <li>tem site oficial no ar, com os recursos e as telas mostrados publicamente;</li>
            <li>o pagamento é feito por uma plataforma conhecida (hoje, a Cakto), que mostra o valor final antes de você pagar.</li>
          </ul>
          <p className="mt-4">Em cada página você encontra:</p>
          <ul>
            <li>telas reproduzidas do site oficial, com contatos desfocados (quando uma imagem é ilustração nossa, a legenda avisa);</li>
            <li>os preços de cada plano, conferidos na página de pagamento, com a data da conferência;</li>
            <li>as condições de garantia publicadas, ou o aviso de que não as encontramos;</li>
            <li>para quem a ferramenta faz sentido e para quem não faz;</li>
            <li>os cuidados antes de assinar e as alternativas gratuitas, quando existem.</li>
          </ul>
          <p className="mt-4">
            <strong>O que não fazemos:</strong> não publicamos depoimentos, notas ou estrelas, não prometemos ganhos, não
            usamos contadores ou escassez artificial e não dizemos que testamos uma ferramenta na prática quando a informação
            vem do site oficial. Se algum dia uma informação vier de uso próprio, a página vai dizer.
          </p>
        </section>

        <section id="afiliados">
          <h2>Aviso de afiliados</h2>
          <p>
            Os botões de compra das páginas de ferramenta são links de afiliado da Cakto. Se você comprar por eles, a
            Curadoria Digital recebe uma comissão paga pela plataforma, sem custo extra para você: o preço é o mesmo da
            página de pagamento.
          </p>
          <p className="mt-4">
            Hoje, todas as ferramentas apresentadas aqui têm programa de afiliados, e podemos receber comissão por qualquer
            uma delas. Por isso também mostramos as limitações de cada uma e as alternativas gratuitas, para você comparar.
          </p>
          <p className="mt-4">Um clique no botão não é uma compra: a venda só existe quando o pagamento é aprovado na Cakto.</p>
        </section>

        <section id="contato">
          <h2>Contato</h2>
          <p>
            Fale com a gente pelo Instagram, por mensagem direta. Dúvidas sobre acesso, cobrança, cancelamento ou reembolso
            são com o suporte de cada ferramenta: a Curadoria Digital não tem acesso à sua conta nem ao seu pagamento.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.instagram.dm} target="_blank" rel="noopener" className="btn btn-chrome" data-ev="instagram_click" data-pos="sobre">
              <Instagram size={16} /> Mandar mensagem
            </a>
            <Link href="/ferramentas/" className="btn btn-ghost">Ver as ferramentas</Link>
          </div>
        </section>
      </Prose>
    </>
  );
}
