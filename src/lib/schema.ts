import { z } from "zod";

/**
 * Esquema único de conteúdo da Curadoria Digital.
 *
 * Todo dado de ferramenta passa por aqui no build: se um campo obrigatório
 * faltar, um link de pagamento não for HTTPS ou uma categoria não existir,
 * o build falha com a mensagem do Zod, antes de qualquer publicação.
 *
 * Regra editorial embutida no tipo: o que não foi verificado é `null`
 * (e aparece no site como "a confirmar"), nunca um valor inventado.
 */

export const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD");
export const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug em minúsculas, com hífens");

/** Imagem servida de /public. `source` diferencia captura real de ilustração nossa. */
export const imageSchema = z.object({
  src: z.string().startsWith("/img/"),
  /** variante de 800 px para cartões e celular */
  srcSmall: z.string().startsWith("/img/").optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(8, "Descreva a imagem (alt text)"),
  caption: z.string().optional(),
  source: z.enum(["oficial", "ilustracao"]),
  /** data em que a tela foi conferida no site oficial */
  checkedAt: isoDate.optional(),
});
export type ToolImage = z.infer<typeof imageSchema>;

export const categorySchema = z.object({
  slug,
  name: z.string(),
  description: z.string(),
  /** código curto exibido em mono, ex.: "YT" */
  code: z.string().max(4),
  order: z.number().int(),
});
export type Category = z.infer<typeof categorySchema>;

const availability = z.string().min(2); // ex.: "Todos os planos", "Só no plano Pro"

export const featureSchema = z.object({
  title: z.string(),
  summary: z.string(),
  availability,
  bullets: z.array(z.string()).default([]),
  image: imageSchema.optional(),
  /** recursos com tela ganham destaque; os demais entram em lista compacta */
  highlight: z.boolean().default(false),
});
export type Feature = z.infer<typeof featureSchema>;

export const offerSchema = z.object({
  /** identificador usado no evento de medição `affiliate_click` (ex.: "basic-mensal") */
  trackingId: slug,
  label: z.string(),
  price: z.number().positive(),
  period: z.enum(["mes", "trimestre", "ano"]),
  /** preço por mês pagando à vista, quando o período é maior que um mês */
  monthlyEquivalent: z.number().positive().optional(),
  installments: z.string().optional(),
  /** link de afiliado oficial — nunca substituir por endereço fictício */
  checkoutUrl: z
    .string()
    .url()
    .refine((u) => u.startsWith("https://"), "Link de pagamento precisa ser HTTPS"),
});
export type Offer = z.infer<typeof offerSchema>;

export const planSchema = z.object({
  id: slug,
  name: z.string(),
  description: z.string(),
  /** oferta principal do plano (o botão grande) */
  offer: offerSchema,
  /** outras periodicidades do mesmo plano (ex.: trimestral) */
  alternateOffers: z.array(offerSchema).default([]),
  billingNote: z.string(),
  badge: z.string().optional(),
  savingsNote: z.string().optional(),
  features: z.array(z.string()).min(1),
  excluded: z.array(z.string()).default([]),
});
export type Plan = z.infer<typeof planSchema>;

const comparisonCell = z.union([z.string(), z.boolean()]);

export const pricingSchema = z.object({
  currency: z.literal("BRL"),
  checkedAt: isoDate,
  source: z.string(),
  intro: z.string(),
  plans: z.array(planSchema).min(1),
  /** recursos comuns a todos os planos (quando os planos só mudam de período) */
  included: z.array(z.string()).default([]),
  /** observações comerciais (taxas, parcelas, mudanças de preço) */
  conditions: z.array(z.string()).default([]),
  /** tabela completa entre os planos da própria ferramenta */
  table: z
    .object({
      columns: z.array(z.string()),
      rows: z.array(z.object({ label: z.string(), values: z.array(comparisonCell) })),
    })
    .optional(),
});

export const guaranteeSchema = z.object({
  status: z.enum(["informada", "nao-encontrada", "a-confirmar"]),
  days: z.number().int().positive().optional(),
  summary: z.string(),
  detail: z.string(),
  checkedAt: isoDate.nullable(),
});

const titled = z.object({ title: z.string(), text: z.string() });

export const toolSchema = z.object({
  slug,
  name: z.string(),
  status: z.enum(["publicado", "rascunho"]),
  featured: z.boolean(),
  order: z.number().int(),

  tagline: z.string(),
  /** pergunta do guia "Qual ferramenta é ideal para você?" */
  question: z.string(),
  shortDescription: z.string().max(220),
  description: z.array(z.string()).min(1),
  heroTitle: z.string(),

  categories: z.array(slug).min(1),
  /** ferramentas só são comparadas lado a lado quando compartilham o mesmo grupo */
  compareGroup: slug,

  /** `null` = logotipo oficial ainda não obtido: o site mostra um monograma */
  logo: imageSchema.nullable(),
  monogram: z.string().min(1).max(2),
  /** leve tom de luz no herói do produto, sem quebrar o preto e cromo da marca */
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),

  heroImage: imageSchema,
  gallery: z.array(imageSchema).default([]),

  audience: z.object({
    summary: z.string(),
    profiles: z.array(titled).min(1),
    notFor: z.array(z.string()).min(1),
  }),
  problems: z.object({ intro: z.string(), items: z.array(titled).min(1) }),
  features: z.array(featureSchema).min(1),
  benefits: z.array(titled.extend({ from: z.string() })).min(1),
  limitations: z.array(titled).min(1),
  freeAlternatives: z.object({ items: z.array(titled), note: z.string() }).optional(),

  pricing: pricingSchema,
  payment: z.object({ platform: z.string(), methods: z.string(), fee: z.string() }),
  guarantee: guaranteeSchema,
  support: z.string(),
  subscription: z.string(),
  access: z.string(),
  platform: z.string(),

  /** site oficial do fornecedor. `null` = ainda a confirmar (não inventar) */
  officialUrl: z.string().url().nullable(),

  analysis: z.object({
    basis: z.string(),
    positives: z.array(z.string()).min(1),
    attention: z.array(z.string()).min(1),
    idealProfile: z.string(),
    notes: z.array(z.string()).min(1),
  }),

  faq: z.array(z.object({ q: z.string(), a: z.string() })).min(1),

  checks: z.object({
    featuresCheckedAt: isoDate,
    pricesCheckedAt: isoDate,
    updatedAt: isoDate,
  }),

  seo: z.object({
    title: z.string().max(70),
    description: z.string().min(70).max(170),
    ogImage: z.string().startsWith("/og/").optional(),
  }),
});

export type ToolInput = z.input<typeof toolSchema>;
export type Tool = z.infer<typeof toolSchema>;
