import type { ToolInput } from "@/lib/schema";

/**
 * WHATSIFY PRO
 * Fontes: site oficial (recursos, acesso e garantia, conferidos em 23/10/2026),
 * página de pagamento da Cakto (preços e parcelas, 18/11/2026; ofertas extras, 26/10/2026).
 * Links de afiliado preservados exatamente como na versão anterior do site.
 */

const FEATURES_CHECKED = "2026-10-23";

export const whatsifyPro: ToolInput = {
  slug: "whatsify-pro",
  name: "Whatsify Pro",
  status: "publicado",
  featured: true,
  order: 2,

  tagline: "Para quem vende ou atende clientes pelo WhatsApp",
  question: "Você vende ou atende clientes pelo WhatsApp?",
  heroTitle: "Responda na hora e organize cada cliente no WhatsApp.",
  shortDescription:
    "Extensão para o WhatsApp Web com chatbot por palavras-chave, mensagens programadas, funis de mensagens e um CRM Kanban para acompanhar cada conversa.",
  description: [
    "O Whatsify Pro é uma extensão para o WhatsApp Web com chatbot por palavras-chave, mensagens programadas, funis de mensagens e um CRM Kanban para acompanhar cada conversa, do primeiro contato ao fechamento.",
    "Os recursos são os mesmos nos três planos. Muda só o período da assinatura e o valor por mês.",
  ],

  categories: ["atendimento", "vendas", "automacao"],
  compareGroup: "atendimento-whatsapp",

  logo: null,
  monogram: "W",
  accent: "#22c55e",

  heroImage: {
    src: "/img/tools/whatsify-pro/crm-kanban.webp",
    srcSmall: "/img/tools/whatsify-pro/crm-kanban-800.webp",
    width: 1048,
    height: 566,
    alt: "Quadro Kanban do Whatsify Pro dentro do WhatsApp Web, com contatos organizados em colunas por etapa",
    caption: "Imagem do site oficial · contatos desfocados",
    source: "oficial",
    checkedAt: FEATURES_CHECKED,
  },

  gallery: [
    {
      src: "/img/tools/whatsify-pro/crm-kanban.webp",
      srcSmall: "/img/tools/whatsify-pro/crm-kanban-800.webp",
      width: 1048,
      height: 566,
      alt: "Quadro Kanban do Whatsify Pro com contatos organizados em colunas por etapa",
      caption: "CRM em colunas · contatos desfocados",
      source: "oficial",
      checkedAt: FEATURES_CHECKED,
    },
    {
      src: "/img/tools/whatsify-pro/atendimento-automatico.webp",
      srcSmall: "/img/tools/whatsify-pro/atendimento-automatico-800.webp",
      width: 1048,
      height: 676,
      alt: "WhatsApp Web com o menu de atendimento automático do Whatsify Pro aberto",
      caption: "Atendimento automático · contatos desfocados",
      source: "oficial",
      checkedAt: FEATURES_CHECKED,
    },
    {
      src: "/img/tools/whatsify-pro/mensagens-programadas.webp",
      srcSmall: "/img/tools/whatsify-pro/mensagens-programadas-800.webp",
      width: 1048,
      height: 572,
      alt: "Tela de programação de envios do Whatsify Pro, com calendário e horário",
      caption: "Mensagens programadas · contatos desfocados",
      source: "oficial",
      checkedAt: FEATURES_CHECKED,
    },
  ],

  audience: {
    summary:
      "Para quem vende ou atende clientes pelo WhatsApp Web, no computador, e responde as mesmas perguntas ao longo do dia. Os perfis abaixo são os que o site oficial indica.",
    profiles: [
      {
        title: "Empreendedores e pequenos negócios",
        text: "Lojas, restaurantes, clínicas, escolas e escritórios que respondem as mesmas perguntas o dia todo.",
      },
      {
        title: "Infoprodutores, afiliados e marketing",
        text: "Cursos, mentorias e lançamentos que precisam responder rápido e manter os contatos aquecidos.",
      },
      {
        title: "Vendedores e representantes",
        text: "Autônomos, consultores e revendedores que não podem esquecer um follow-up.",
      },
      {
        title: "Prestadores de serviço e B2B",
        text: "Agências e times comerciais que precisam de organização e velocidade nas respostas.",
      },
    ],
    notFor: [
      "quer mandar mensagem para listas compradas ou para quem nunca falou com você",
      "não usa o WhatsApp no dia a dia do seu negócio",
      "espera que a ferramenta venda sozinha, sem oferta e sem atendimento",
    ],
  },

  problems: {
    intro:
      "“Oi! Qual o valor?” ontem, 21:14. “Ainda tem disponível?” hoje, 09:02. “Deixa, já comprei em outro lugar.” hoje, 11:40, sem resposta.",
    items: [
      {
        title: "Perguntas repetidas o dia todo",
        text: "Valor, prazo, disponibilidade: as mesmas respostas digitadas de novo a cada conversa.",
      },
      {
        title: "Cliente sem resposta",
        text: "Quando a resposta demora, o cliente compra em outro lugar.",
      },
      {
        title: "Orçamento esquecido",
        text: "O follow-up que ficou para depois e nunca foi feito.",
      },
      {
        title: "Conversas sem etapa",
        text: "Sem organização, não dá para saber quem está esperando retorno e quem já comprou.",
      },
    ],
  },

  features: [
    {
      title: "Atendimento automático",
      summary: "Respostas automáticas para as perguntas que mais chegam, sem você precisar digitar tudo de novo.",
      availability: "Todos os planos",
      highlight: true,
      bullets: [
        "Chatbot com palavras-chave, com botões",
        "Responde dúvidas, valores, orçamentos e informações de produtos",
        "Você configura as mensagens uma vez",
      ],
      image: {
        src: "/img/tools/whatsify-pro/atendimento-automatico.webp",
        srcSmall: "/img/tools/whatsify-pro/atendimento-automatico-800.webp",
        width: 1048,
        height: 676,
        alt: "WhatsApp Web com o menu de atendimento automático do Whatsify Pro aberto",
        caption: "Tela do site oficial do Whatsify Pro, com contatos desfocados",
        source: "oficial",
        checkedAt: FEATURES_CHECKED,
      },
    },
    {
      title: "Organizador de contatos (CRM Kanban)",
      summary: "Chega de conversa perdida: cada contato fica numa etapa do atendimento, sem sair do WhatsApp Web.",
      availability: "Todos os planos",
      highlight: true,
      bullets: [
        "Etapas como novos, em negociação, aguardando pagamento e clientes ativos",
        "Arraste e solte para acompanhar cada atendimento",
        "Veja quem está esperando retorno",
      ],
      image: {
        src: "/img/tools/whatsify-pro/crm-kanban.webp",
        srcSmall: "/img/tools/whatsify-pro/crm-kanban-800.webp",
        width: 1048,
        height: 566,
        alt: "Quadro Kanban do Whatsify Pro com contatos organizados em colunas por etapa",
        caption: "Tela do site oficial do Whatsify Pro, com contatos desfocados",
        source: "oficial",
        checkedAt: FEATURES_CHECKED,
      },
    },
    {
      title: "Mensagens programadas",
      summary: "Programe lembretes, avisos e acompanhamentos e envie comunicados para a sua base de contatos.",
      availability: "Todos os planos",
      highlight: true,
      bullets: [
        "Disparos programados ilimitados",
        "Escolha o dia e a hora de cada envio",
        "Use só com contatos que pediram para receber suas mensagens",
      ],
      image: {
        src: "/img/tools/whatsify-pro/mensagens-programadas.webp",
        srcSmall: "/img/tools/whatsify-pro/mensagens-programadas-800.webp",
        width: 1048,
        height: 572,
        alt: "Tela de programação de envios do Whatsify Pro, com calendário e horário",
        caption: "Tela do site oficial do Whatsify Pro, com contatos desfocados",
        source: "oficial",
        checkedAt: FEATURES_CHECKED,
      },
    },
    {
      title: "Sequência automática de vendas",
      summary:
        "Mensagens programadas que acompanham o cliente do primeiro contato até o fechamento: boas-vindas na hora, lembrete de resposta e oferta, no tempo que você configurou.",
      availability: "Todos os planos",
      highlight: true,
      bullets: [
        "Funis de vendas com 1 clique",
        "Textos, áudios, imagens e vídeos, configurados uma única vez",
        "Cada mensagem sai no momento que você definiu",
      ],
    },
    {
      title: "4 dispositivos",
      summary: "Use o mesmo número de WhatsApp em até 4 dispositivos.",
      availability: "Todos os planos",
    },
    {
      title: "Áudios prontos",
      summary: "Envie áudios que chegam como se tivessem sido gravados na hora.",
      availability: "Todos os planos",
    },
    {
      title: "Contatos de grupos",
      summary: "Extraia contatos dos grupos. Só envie mensagens para quem autorizou.",
      availability: "Todos os planos",
    },
    {
      title: "Suporte e aulas",
      summary: "Suporte feito pela equipe do Whatsify Pro, com aulas tutoriais.",
      availability: "Todos os planos",
    },
  ],

  benefits: [
    {
      title: "Responder na hora, mesmo ocupado",
      text: "As perguntas mais comuns recebem resposta imediata, e você entra na conversa quando ela realmente precisa de você.",
      from: "Atendimento automático",
    },
    {
      title: "Nenhum retorno esquecido",
      text: "Lembretes e sequências programadas fazem o acompanhamento acontecer no dia certo, sem depender de memória.",
      from: "Mensagens programadas · Sequências",
    },
    {
      title: "Ver o funil num relance",
      text: "Com cada cliente numa coluna, fica claro quem está negociando, quem falta pagar e quem já comprou.",
      from: "CRM Kanban",
    },
    {
      title: "Menos digitação repetida",
      text: "Mensagens e áudios configurados uma vez liberam tempo para as conversas que pedem atenção pessoal.",
      from: "Chatbot · Áudios prontos",
    },
  ],

  limitations: [
    {
      title: "Funciona no computador",
      text: "As telas do site oficial mostram o Whatsify Pro no WhatsApp Web, pelo navegador do computador, e a instalação é feita pela Chrome Web Store. Se você atende só pelo celular, confirme com o suporte antes.",
    },
    {
      title: "Não é do WhatsApp",
      text: "É uma ferramenta de terceiros, sem vínculo com o WhatsApp. Para automatizar o WhatsApp Web, a extensão funciona dentro dessa aba do navegador: leia as permissões que aparecem na instalação.",
    },
    {
      title: "Cuidado com envios em massa",
      text: "Mande mensagens só para quem autorizou. Envios para quem não pediu geram denúncias e podem levar ao bloqueio do número.",
    },
    {
      title: "É uma assinatura",
      text: "A página de pagamento mostra “Renovação mensal”, “trimestral” ou “anual”: a cobrança se repete a cada período. O site oficial informa que o mensal não tem fidelidade. Antes de assinar, pergunte ao suporte como cancelar.",
    },
    {
      title: "Taxa e ofertas extras",
      text: "A página de pagamento soma R$ 0,99 de taxa de serviço e pode mostrar ofertas extras opcionais, como desconto no mês seguinte. Elas só entram no valor se você marcar (conferido em 26/10/2026).",
    },
  ],

  freeAlternatives: {
    items: [
      {
        title: "WhatsApp Business",
        text: "O app gratuito do WhatsApp para empresas já tem respostas rápidas, etiquetas e mensagens automáticas de saudação e de ausência. Se você só precisa disso, ele pode bastar.",
      },
    ],
    note: "O Whatsify Pro faz mais sentido quando você precisa de chatbot por palavras-chave, sequências de mensagens programadas, envios agendados e um quadro Kanban para acompanhar cada cliente.",
  },

  pricing: {
    currency: "BRL",
    checkedAt: "2026-11-18",
    source: "página de pagamento da Cakto",
    intro: "Os recursos são os mesmos nos três planos. Muda só o período e o valor por mês.",
    plans: [
      {
        id: "mensal",
        name: "Mensal Start",
        description: "Para começar sem compromisso.",
        billingNote: "cobrança mensal · sem fidelidade",
        offer: {
          trackingId: "mensal",
          label: "Assinar o mensal",
          price: 97,
          period: "mes",
          checkoutUrl: "https://pay.cakto.com.br/utncq33?affiliate=8w9XcQiL",
        },
        features: ["Todos os recursos do Whatsify Pro", "Sem fidelidade, segundo o site oficial"],
      },
      {
        id: "trimestral",
        name: "Trimestral Pro",
        description: "Três meses pagando menos por mês.",
        billingNote: "cobrança trimestral",
        savingsNote: "R$ 44 a menos que 3 meses no mensal",
        offer: {
          trackingId: "trimestral",
          label: "Assinar o trimestral",
          price: 247,
          period: "trimestre",
          monthlyEquivalent: 82.33,
          installments: "ou 2x de R$ 134,98 ou 3x de R$ 91,23 no cartão",
          checkoutUrl: "https://pay.cakto.com.br/36mf5oy?affiliate=8w9XcQiL",
        },
        features: ["Todos os recursos do Whatsify Pro", "Equivale a R$ 82,33/mês à vista"],
      },
      {
        id: "anual",
        name: "Anual Turbo",
        description: "Para quem já usa o WhatsApp como canal de vendas.",
        billingNote: "cobrança anual",
        badge: "Menor valor por mês",
        savingsNote: "R$ 567 a menos que 12 meses no mensal",
        offer: {
          trackingId: "anual",
          label: "Assinar o anual",
          price: 597,
          period: "ano",
          monthlyEquivalent: 49.75,
          installments: "ou 12x de R$ 59,78 no cartão",
          checkoutUrl: "https://pay.cakto.com.br/6aih2s8?affiliate=8w9XcQiL",
        },
        features: ["Todos os recursos do Whatsify Pro", "Equivale a R$ 49,75/mês à vista"],
      },
    ],
    included: [
      "4 dispositivos com o mesmo número de WhatsApp",
      "Chatbot com palavras-chave",
      "Funis de vendas com 1 clique",
      "Disparos programados ilimitados",
      "Chatbot e envios em massa",
      "Áudios como se tivessem sido gravados",
      "Extrator de contatos de grupos",
      "Gestão de leads com CRM",
      "Suporte integral",
    ],
    conditions: [
      "Os botões dos planos abrem a página de pagamento da Cakto. Lá aparece o valor final, com a taxa de R$ 0,99, antes de você pagar.",
      "Preços e parcelas conferidos na Cakto em 18/11/2026; recursos, acesso e garantia conferidos no site oficial em 23/10/2026.",
      "A economia é a diferença para o mesmo período no plano mensal, pagando à vista.",
      "Valores e parcelas podem mudar: confirme as condições na página de pagamento antes de pagar.",
    ],
  },

  payment: {
    platform: "Cakto",
    methods: "Cartão, PIX ou PIX automático",
    fee: "Taxa de serviço de R$ 0,99 somada pela Cakto (conferido em 18/11/2026)",
  },
  guarantee: {
    status: "informada",
    days: 7,
    summary: "7 dias, segundo o site oficial",
    detail:
      "O site oficial do Whatsify Pro informa garantia incondicional de 7 dias: dentro desse prazo, você pode pedir o reembolso do valor pago (conferido em 23/10/2026). Guarde o e-mail da compra e confira também as condições na página de pagamento.",
    checkedAt: FEATURES_CHECKED,
  },
  support: "A equipe do próprio Whatsify Pro, responsável pela ferramenta e pelo acesso, com aulas tutoriais.",
  subscription:
    "Renovação mensal, trimestral ou anual, conforme o plano. O site oficial informa que o mensal não tem fidelidade.",
  access:
    "Segundo o site oficial, depois que o pagamento é aprovado chega um e-mail com o link de instalação na Chrome Web Store, o passo a passo, a chave de ativação e o contato do suporte.",
  platform: "Extensão para o WhatsApp Web, no navegador do computador. Não é um produto oficial do WhatsApp.",

  officialUrl: null,

  analysis: {
    basis:
      "Análise feita a partir das informações públicas do site oficial (23/10/2026) e da página de pagamento (18/11/2026). Não fizemos teste prático da ferramenta e não publicamos notas ou avaliações de usuários.",
    positives: [
      "Os três planos têm exatamente os mesmos recursos: a escolha é só de período",
      "Garantia incondicional de 7 dias informada no site oficial",
      "Mensal sem fidelidade, segundo o site oficial",
      "No anual à vista, o custo por mês cai para cerca de metade do mensal",
    ],
    attention: [
      "Funciona no WhatsApp Web, pelo computador",
      "Ferramenta de terceiros, sem vínculo com o WhatsApp",
      "Envios em massa para quem não autorizou podem levar ao bloqueio do número",
      "Assinatura com renovação automática e ofertas extras opcionais no pagamento",
    ],
    idealProfile:
      "Quem atende pelo WhatsApp Web no computador, recebe muitas perguntas repetidas e perde retornos por falta de organização. Para quem só precisa de respostas rápidas e etiquetas, o WhatsApp Business gratuito pode bastar.",
    notes: [
      "O valor do Whatsify Pro está em juntar automação e organização no mesmo lugar onde o atendimento já acontece. Ele é mais útil para quem já tem volume de conversas do que para quem está começando a vender.",
      "Use a automação com responsabilidade: mensagens para quem não pediu prejudicam o seu número e a sua reputação. Comece pelo mensal se quiser testar a rotina antes de escolher um período maior.",
    ],
  },

  faq: [
    {
      q: "O Whatsify Pro é do WhatsApp?",
      a: "Não. É uma ferramenta independente que funciona no WhatsApp Web. WhatsApp é marca da Meta, e o Whatsify Pro não é um produto oficial do WhatsApp.",
    },
    {
      q: "Qual a diferença entre os planos?",
      a: "Nenhuma nos recursos: os três têm tudo. Muda o período e o valor por mês. Pagando à vista, o trimestral sai por R$ 82,33/mês e o anual por R$ 49,75/mês, contra R$ 97 no mensal.",
    },
    {
      q: "Posso ter meu número bloqueado?",
      a: "O WhatsApp pode restringir ou bloquear números que enviam mensagens em massa para quem não pediu ou que recebem muitas denúncias. Use os envios com contatos que autorizaram receber suas mensagens e evite listas compradas. Se tiver dúvida, pergunte ao suporte do Whatsify Pro antes de assinar.",
    },
    {
      q: "Como recebo o acesso?",
      a: "Segundo o site oficial, depois que o pagamento é aprovado você recebe um e-mail com o link de instalação na Chrome Web Store, o passo a passo de configuração, a chave de ativação e os contatos do suporte. Se não achar, confira o spam ou a aba Promoções.",
    },
    {
      q: "Preciso de computador?",
      a: "As telas do site oficial mostram o Whatsify Pro funcionando no WhatsApp Web, pelo navegador do computador. Se tiver dúvida sobre requisitos, fale com o suporte do Whatsify Pro antes de assinar.",
    },
    {
      q: "Tem fidelidade?",
      a: "O site oficial informa que o plano mensal não tem fidelidade. Nos planos trimestral e anual, confira as condições de renovação e cancelamento na página de pagamento.",
    },
    {
      q: "Tem garantia ou reembolso?",
      a: "O site oficial do Whatsify Pro informa garantia incondicional de 7 dias: dentro desse prazo, você pode pedir o reembolso do valor pago (conferido em 23/10/2026). Antes de pagar, confira também as condições na página de pagamento.",
    },
    {
      q: "Quem dá o suporte?",
      a: "A equipe do próprio Whatsify Pro, responsável pela ferramenta e pelo acesso.",
    },
    {
      q: "Esta página é do Whatsify Pro?",
      a: "Não. É uma página não oficial, feita pela Curadoria Digital, com links de afiliado. Se você comprar por aqui, recebemos uma comissão, sem custo extra para você.",
    },
    {
      q: "As vendas são garantidas?",
      a: "Não. O Whatsify Pro é uma ferramenta: os resultados dependem da sua oferta, do seu atendimento e de como você usa os recursos.",
    },
  ],

  checks: {
    featuresCheckedAt: FEATURES_CHECKED,
    pricesCheckedAt: "2026-11-18",
    updatedAt: "2026-11-18",
  },

  seo: {
    title: "Whatsify Pro: recursos, planos e preços conferidos",
    description:
      "Whatsify Pro por dentro: chatbot, mensagens programadas, funis e CRM Kanban no WhatsApp Web. Compare os planos mensal, trimestral e anual.",
    ogImage: "/og/whatsify-pro.jpg",
  },
};
