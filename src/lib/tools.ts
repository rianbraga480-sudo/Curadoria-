import { z } from "zod";
import { categories as rawCategories } from "@/content/categories";
import { toolEntries } from "@/content/tools";
import { categorySchema, toolSchema, type Category, type Tool } from "./schema";

/**
 * Camada de acesso aos dados. Valida tudo uma única vez, no build:
 * qualquer erro de conteúdo interrompe a publicação com uma mensagem clara.
 */

function validate(): { tools: Tool[]; categories: Category[] } {
  const categories = z.array(categorySchema).parse(rawCategories);
  const catSlugs = new Set(categories.map((c) => c.slug));

  const tools = toolEntries.map((entry) => {
    const parsed = toolSchema.safeParse(entry);
    if (!parsed.success) {
      throw new Error(
        `Conteúdo inválido em "${(entry as { slug?: string }).slug ?? "?"}":\n` +
          z.prettifyError(parsed.error),
      );
    }
    return parsed.data;
  });

  const seen = new Set<string>();
  const checkoutCodes = new Set<string>();
  for (const t of tools) {
    if (seen.has(t.slug)) throw new Error(`Slug duplicado: ${t.slug}`);
    seen.add(t.slug);
    for (const c of t.categories) {
      if (!catSlugs.has(c)) throw new Error(`${t.slug}: categoria inexistente "${c}"`);
    }
    for (const offer of allOffers(t)) {
      const code = new URL(offer.checkoutUrl).pathname.replace(/\//g, "");
      if (checkoutCodes.has(code)) throw new Error(`${t.slug}: link de pagamento repetido (${code})`);
      checkoutCodes.add(code);
    }
  }
  return { tools, categories };
}

const data = validate();

export function allOffers(tool: Tool) {
  return tool.pricing.plans.flatMap((p) => [p.offer, ...p.alternateOffers]);
}

/** Ferramentas publicadas, em ordem editorial. */
export function getTools(): Tool[] {
  return data.tools.filter((t) => t.status === "publicado").sort((a, b) => a.order - b.order);
}

export function getTool(slug: string): Tool | undefined {
  return getTools().find((t) => t.slug === slug);
}

export function getFeaturedTools(): Tool[] {
  return getTools().filter((t) => t.featured);
}

export function getCategories(): Category[] {
  return [...data.categories].sort((a, b) => a.order - b.order);
}

export function getCategory(slug: string): Category | undefined {
  return data.categories.find((c) => c.slug === slug);
}

/** Categorias com ao menos uma ferramenta publicada (nunca exibimos categorias vazias). */
export function getActiveCategories(): (Category & { count: number; tools: string[] })[] {
  const tools = getTools();
  return getCategories()
    .map((c) => {
      const inCat = tools.filter((t) => t.categories.includes(c.slug));
      return { ...c, count: inCat.length, tools: inCat.map((t) => t.name) };
    })
    .filter((c) => c.count > 0);
}

/** Menor preço mensal efetivo (considerando pagamento à vista em períodos maiores). */
export function getStartingPrice(tool: Tool) {
  const monthly = tool.pricing.plans.map((p) => p.offer).filter((o) => o.period === "mes");
  const pool = monthly.length ? monthly : tool.pricing.plans.map((p) => p.offer);
  return pool.reduce((min, o) => (o.price < min.price ? o : min));
}

export function getLowestMonthlyEquivalent(tool: Tool): number {
  return Math.min(
    ...allOffers(tool).map((o) => (o.period === "mes" ? o.price : o.monthlyEquivalent ?? Infinity)),
  );
}

/** Ferramentas que podem ser comparadas lado a lado com a informada. */
export function getComparableTools(tool: Tool): Tool[] {
  return getTools().filter((t) => t.slug !== tool.slug && t.compareGroup === tool.compareGroup);
}

/** Mapa código-do-checkout → [produto, plano], usado na medição de cliques. */
export function getOfferIndex(): Record<string, [string, string]> {
  const index: Record<string, [string, string]> = {};
  for (const t of getTools()) {
    for (const o of allOffers(t)) {
      index[new URL(o.checkoutUrl).pathname.replace(/\//g, "")] = [t.slug, o.trackingId];
    }
  }
  return index;
}

/** Itens que a curadoria ainda precisa completar (exibidos como "a confirmar"). */
export function getPendingFields(tool: Tool): string[] {
  const pending: string[] = [];
  if (!tool.officialUrl) pending.push("Link do site oficial");
  if (!tool.logo) pending.push("Logotipo oficial");
  if (tool.guarantee.status !== "informada") pending.push("Prazo de garantia");
  return pending;
}

/** Resumo serializável usado por componentes de cliente (catálogo, comparação). */
export type ToolSummary = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  logo: Tool["logo"];
  monogram: string;
  accent: string;
  categories: { slug: string; name: string }[];
  benefits: string[];
  startingPrice: number;
  lowestMonthly: number;
  order: number;
  image: Tool["heroImage"];
  keywords: string;
  pricesCheckedAt: string;
};

export function toSummary(t: Tool): ToolSummary {
  return {
    slug: t.slug,
    name: t.name,
    tagline: t.tagline,
    shortDescription: t.shortDescription,
    logo: t.logo,
    monogram: t.monogram,
    accent: t.accent,
    categories: t.categories.map((c) => ({ slug: c, name: getCategory(c)?.name ?? c })),
    benefits: t.benefits.slice(0, 3).map((b) => b.title),
    startingPrice: getStartingPrice(t).price,
    lowestMonthly: getLowestMonthlyEquivalent(t),
    order: t.order,
    image: t.gallery[0] ?? t.heroImage,
    keywords: [t.name, t.tagline, t.shortDescription, ...t.features.map((f) => f.title), ...t.categories.map((c) => getCategory(c)?.name ?? c)].join(" "),
    pricesCheckedAt: t.pricing.checkedAt,
  };
}
