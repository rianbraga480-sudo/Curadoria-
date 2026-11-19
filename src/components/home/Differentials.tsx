import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/Section";
import { Columns, Compass, Eye, Layers, Refresh, Shield } from "@/components/ui/icons";

const items: { icon: ReactNode; title: string; text: string; wide?: boolean }[] = [
  {
    icon: <Compass size={22} />,
    title: "Curadoria independente",
    text: "Não somos donos das ferramentas nem da plataforma de pagamento. Mostramos também para quem cada uma não serve e quais alternativas gratuitas existem.",
    wide: true,
  },
  {
    icon: <Layers size={22} />,
    title: "Informações organizadas",
    text: "Cada ferramenta segue o mesmo modelo: público, problema, recursos, benefícios, limitações, planos e dúvidas.",
  },
  {
    icon: <Eye size={22} />,
    title: "Demonstrações visuais",
    text: "Telas reproduzidas dos sites oficiais, com contatos desfocados. Quando é ilustração nossa, a legenda avisa.",
  },
  {
    icon: <Columns size={22} />,
    title: "Comparação de funcionalidades",
    text: "Tabelas de planos e comparação entre ferramentas com o mesmo objetivo, sem forçar comparações que não ajudam.",
  },
  {
    icon: <Shield size={22} />,
    title: "Transparência comercial",
    text: "Links de afiliado declarados perto de cada recomendação, taxas, renovação e garantia ditas com clareza.",
  },
  {
    icon: <Refresh size={22} />,
    title: "Atualização das informações",
    text: "Preços e recursos têm a data da última conferência em cada página. Valores podem mudar: o que vale é a página de pagamento.",
    wide: true,
  },
];

export function Differentials() {
  return (
    <section id="diferenciais" aria-labelledby="diff-title" className="relative border-t border-white/[0.06] py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          id="diff-title"
          index="05"
          eyebrow="Diferenciais"
          align="center"
          title={
            <>
              Feita para ajudar a <span className="chrome-text">escolher melhor.</span>
            </>
          }
        />
        <ul className="mt-16 grid gap-3 md:grid-cols-3" data-reveal="stagger">
          {items.map((it) => (
            <li key={it.title} className={`surface p-7 md:p-9 ${it.wide ? "md:col-span-2" : ""}`}>
              <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-snow">
                {it.icon}
              </span>
              <h3 className="mt-8 text-2xl font-medium">{it.title}</h3>
              <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-fog">{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
