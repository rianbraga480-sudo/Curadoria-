const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** R$ 49,90 · usa espaço não separável entre símbolo e valor */
export function formatPrice(value: number): string {
  return brl.format(value).replace(/\s/, " ");
}

/** Preços inteiros sem centavos: R$ 97 */
export function formatPriceShort(value: number): string {
  return Number.isInteger(value) ? `R$ ${value}` : formatPrice(value);
}

export const periodLabel = { mes: "mês", trimestre: "trimestre", ano: "ano" } as const;

/** 2026-11-18 → 18/11/2026 */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** 2026-11-18 → 18 de novembro de 2026 */
export function formatDateLong(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y!, m! - 1, d!)),
  );
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
