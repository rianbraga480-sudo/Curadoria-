import type { Category } from "@/lib/schema";

/**
 * Categorias da plataforma. Só aparecem no site as que têm ao menos
 * uma ferramenta publicada (ver `getActiveCategories`).
 */
export const categories: Category[] = [
  {
    slug: "inteligencia-artificial",
    name: "Inteligência Artificial",
    code: "IA",
    description: "Ferramentas que usam IA para gerar, analisar ou acelerar tarefas.",
    order: 1,
  },
  {
    slug: "criacao-de-conteudo",
    name: "Criação de Conteúdo",
    code: "CC",
    description: "Pesquisa, roteiro, narração e organização de produção de conteúdo.",
    order: 2,
  },
  {
    slug: "youtube",
    name: "YouTube",
    code: "YT",
    description: "Pesquisa de nichos, vídeos em alta e gestão de canais.",
    order: 3,
  },
  {
    slug: "automacao",
    name: "Automação",
    code: "AU",
    description: "Tarefas repetitivas que passam a acontecer sozinhas.",
    order: 4,
  },
  {
    slug: "marketing-digital",
    name: "Marketing Digital",
    code: "MK",
    description: "Divulgação, relacionamento e campanhas.",
    order: 5,
  },
  {
    slug: "produtividade",
    name: "Produtividade",
    code: "PR",
    description: "Organização do trabalho e da rotina.",
    order: 6,
  },
  {
    slug: "vendas",
    name: "Vendas",
    code: "VD",
    description: "Acompanhamento de clientes, follow-up e fechamento.",
    order: 7,
  },
  {
    slug: "atendimento",
    name: "Atendimento",
    code: "AT",
    description: "Respostas rápidas e organizadas para quem fala com clientes.",
    order: 8,
  },
];
