import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

type Variant = "chrome" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  /** evento de medição (Umami), ex.: "cta_click" */
  ev?: string;
  prod?: string;
  pos?: string;
  icon?: "arrow" | "none";
};

/** Botão de navegação interna. */
export function ButtonLink({ href, children, variant = "chrome", size = "md", className = "", ev, prod, pos, icon = "arrow" }: Props) {
  return (
    <Link
      href={href}
      className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`}
      data-ev={ev}
      data-prod={prod}
      data-pos={pos}
    >
      <span>{children}</span>
      {icon === "arrow" && <ArrowRight size={15} className="arrow" />}
    </Link>
  );
}

type AffiliateProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  /** texto lido por leitores de tela para avisar do site externo */
  destination?: string;
  pos?: string;
};

/**
 * Link de afiliado oficial.
 * - rel="sponsored": declara a relação comercial aos buscadores.
 * - abre na mesma aba (como na versão anterior) e avisa, visualmente e para
 *   leitores de tela, que o destino é a página de pagamento externa.
 * - o clique é medido pelo componente <Analytics /> (evento affiliate_click).
 */
export function AffiliateLink({
  href,
  children,
  variant = "chrome",
  size = "md",
  className = "",
  destination = "página de pagamento da Cakto, site externo",
  pos = "botao-do-plano",
}: AffiliateProps) {
  return (
    <a
      href={href}
      rel="sponsored noopener"
      className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`}
      data-pos={pos}
    >
      <span>{children}</span>
      <ArrowUpRight size={15} className="arrow" />
      <span className="sr-only"> (abre a {destination})</span>
    </a>
  );
}
