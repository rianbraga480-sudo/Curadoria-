import type { ToolInput } from "@/lib/schema";

/**
 * DARK PLANNER
 * Fontes: site oficial (recursos e telas, conferidos em 20/10/2026) e página de
 * pagamento da Cakto (preços e parcelas, conferidos em 18/11/2026).
 * Links de afiliado preservados exatamente como na versão anterior do site.
 */

const FEATURES_CHECKED = "2026-10-20";

export const darkPlanner: ToolInput = {
  slug: "dark-planner",
  name: "Dark Planner",
  status: "publicado",
  featured: true,
  order: 1,

  tagline: "Para quem cria vídeos no YouTube sem aparecer",
  question: "Você cria ou quer criar vídeos para o YouTube?",
  heroTitle: "Seu canal dark com sistema, não no improviso.",
  shortDescription:
    "Pesquisa de nicho, vídeos em alta, roteiros, narração com IA e gestão de canais numa só plataforma, para quem cria no YouTube sem aparecer.",
  description: [
    "O Dark Planner reúne pesquisa de nicho, vídeos em alta, roteiros, narração com IA e a gestão dos seus canais numa só plataforma, feita para quem cria no YouTube sem aparecer.",
    "Todos os planos têm Gestão de Canais, Extensão para o YouTube e áudio com IA. A diferença entre eles está nos limites diários e nos recursos de pesquisa, que ficam só no plano Pro.",
  ],

  categories: ["youtube", "criacao-de-conteudo", "inteligencia-artificial"],
  compareGroup: "producao-youtube",

  logo: {
    src: "/img/tools/dark-planner/logo.webp",
    width: 144,
    height: 144,
    alt: "Logotipo do Dark Planner",
    source: "oficial",
    checkedAt: FEATURES_CHECKED,
  },
  monogram: "D",
  accent: "#2f7bff",

  heroImage: {
    src: "/img/tools/dark-planner/painel.webp",
    srcSmall: "/img/tools/dark-planner/painel-800.webp",
    width: 1400,
    height: 1342,
    alt: "Tela do Niche Finder do Dark Planner, com nichos em alta organizados em cartões com dados de cada canal",
    caption: "Imagem do site oficial do Dark Planner",
    source: "oficial",
    checkedAt: FEATURES_CHECKED,
  },

  gallery: [
    {
      src: "/img/tools/dark-planner/niche-finder.webp",
      srcSmall: "/img/tools/dark-planner/niche-finder-800.webp",
      width: 1576,
      height: 892,
      alt: "Painel do Niche Finder com nichos mapeados, oportunidades ativas, nichos em alta e cartões de canais",
      caption: "Niche Finder · plano Pro",
      source: "oficial",
      checkedAt: FEATURES_CHECKED,
    },
    {
      src: "/img/tools/dark-planner/videos-virais.webp",
      srcSmall: "/img/tools/dark-planner/videos-virais-800.webp",
      width: 1058,
      height: 892,
      alt: "Busca de vídeos virais por nicho, com filtros de período, visualizações e idioma",
      caption: "Vídeos Virais · plano Pro",
      source: "oficial",
      checkedAt: FEATURES_CHECKED,
    },
    {
      src: "/img/tools/dark-planner/audio-ia.webp",
      srcSmall: "/img/tools/dark-planner/audio-ia-800.webp",
      width: 1300,
      height: 1096,
      alt: "Gerador de áudio com IA, com limites de 50 áudios por dia e 150 mil caracteres por áudio no plano Pro",
      caption: "Gerador de Áudio IA · todos os planos",
      source: "oficial",
      checkedAt: FEATURES_CHECKED,
    },
    {
      src: "/img/tools/dark-planner/extensao-youtube.webp",
      srcSmall: "/img/tools/dark-planner/extensao-youtube-800.webp",
      width: 1270,
      height: 790,
      alt: "Página da extensão do Dark Planner para o YouTube",
      caption: "Extensão para o YouTube · todos os planos",
      source: "oficial",
      checkedAt: FEATURES_CHECKED,
    },
    {
      src: "/img/tools/dark-planner/app-desktop.webp",
      srcSmall: "/img/tools/dark-planner/app-desktop-800.webp",
      width: 1600,
      height: 636,
      alt: "Tela de abertura do App DarkPlanner, disponível para Windows e macOS",
      caption: "App DarkPlanner · plano Pro",
      source: "oficial",
      checkedAt: FEATURES_CHECKED,
    },
  ],

  audience: {
    summary:
      "Para quem tem ou quer abrir um canal dark ou faceless no YouTube e prefere produzir com método, em vez de improvisar.",
    profiles: [
      {
        title: "Canais faceless, novos ou em andamento",
        text: "Quem cria vídeos sem aparecer e precisa de um lugar único para pesquisar, roteirizar e organizar a produção.",
      },
      {
        title: "Quem quer escolher nicho com dados",
        text: "Quem ainda está decidindo o tema do canal e quer ver nichos e vídeos em alta antes de começar (recursos do plano Pro).",
      },
      {
        title: "Quem não quer gravar a própria voz",
        text: "Quem precisa de narração para os vídeos e prefere gerar o áudio com vozes de IA, com legendas sincronizadas.",
      },
    ],
    notFor: [
      "procura um atalho para ter views sem produzir",
      "ainda não decidiu se vai mesmo criar um canal",
      "espera que a ferramenta faça o trabalho criativo sozinha",
    ],
  },

  problems: {
    intro:
      "O problema não é falta de esforço. É falta de sistema. Ideia no bloco de notas, roteiro_final_v3.docx, títulos numa planilha e nicho escolhido no chute.",
    items: [
      {
        title: "Nicho escolhido no chute",
        text: "Sem dados de demanda, o canal começa num tema que talvez ninguém esteja procurando.",
      },
      {
        title: "Produção espalhada",
        text: "Ideias, roteiros, títulos e referências em arquivos e aplicativos diferentes, difíceis de acompanhar.",
      },
      {
        title: "Narração como gargalo",
        text: "Gravar a própria voz, ou depender de outra pessoa, trava o ritmo de quem quer produzir sem aparecer.",
      },
      {
        title: "Pesquisa trocando de aba",
        text: "Analisar canais, vídeos e thumbnails exige ir e voltar entre sites o tempo todo.",
      },
    ],
  },

  features: [
    {
      title: "Niche Finder",
      summary: "Um mapa de oportunidades para escolher nicho com dados, não no chute.",
      availability: "Só no plano Pro",
      highlight: true,
      bullets: [
        "Nichos separados por momento: explodindo, subindo rápido, alta tração e potencial forte",
        "Dados de cada canal: inscritos, visualizações, vídeos e percentual faceless",
        "Feito para encontrar nichos com demanda para canais novos",
      ],
      image: {
        src: "/img/tools/dark-planner/niche-finder.webp",
        srcSmall: "/img/tools/dark-planner/niche-finder-800.webp",
        width: 1576,
        height: 892,
        alt: "Painel do Niche Finder com nichos mapeados, oportunidades ativas, nichos em alta e cartões de canais",
        caption: "Tela do site oficial do Dark Planner",
        source: "oficial",
        checkedAt: FEATURES_CHECKED,
      },
    },
    {
      title: "Vídeos Virais",
      summary: "Veja o que está crescendo agora no seu nicho e use como referência para os próximos vídeos.",
      availability: "Só no plano Pro",
      highlight: true,
      bullets: [
        "Filtros por período, visualizações, idioma e nicho",
        "Busca por tema, como “true crime”",
        "Lista com o crescimento de cada vídeo",
      ],
      image: {
        src: "/img/tools/dark-planner/videos-virais.webp",
        srcSmall: "/img/tools/dark-planner/videos-virais-800.webp",
        width: 1058,
        height: 892,
        alt: "Busca de vídeos virais por nicho, com filtros de período, visualizações e idioma",
        caption: "Tela do site oficial do Dark Planner",
        source: "oficial",
        checkedAt: FEATURES_CHECKED,
      },
    },
    {
      title: "Áudio com IA",
      summary: "Com o roteiro pronto, você gera a narração com vozes de IA. O limite de áudios muda conforme o plano.",
      availability: "Todos os planos",
      highlight: true,
      bullets: [
        "Mais de 550 vozes em vários idiomas",
        "Legendas e arquivo SRT sincronizados",
        "Por dia: Basic 15 áudios, Lite 25 e Pro 50",
      ],
      image: {
        src: "/img/tools/dark-planner/audio-ia.webp",
        srcSmall: "/img/tools/dark-planner/audio-ia-800.webp",
        width: 1300,
        height: 1096,
        alt: "Gerador de áudio com IA, com limites de 50 áudios por dia e 150 mil caracteres por áudio no plano Pro",
        caption: "Tela do site oficial do Dark Planner",
        source: "oficial",
        checkedAt: FEATURES_CHECKED,
      },
    },
    {
      title: "Extensão para o YouTube",
      summary: "A análise acontece na própria aba do YouTube, sem ficar trocando de site.",
      availability: "Todos os planos",
      highlight: true,
      bullets: [
        "Analise canais, vídeos, thumbnails, frames e transcrições",
        "Funciona em qualquer canal, direto na página do YouTube",
        "Instalação grátis pela Chrome Web Store",
      ],
      image: {
        src: "/img/tools/dark-planner/extensao-youtube.webp",
        srcSmall: "/img/tools/dark-planner/extensao-youtube-800.webp",
        width: 1270,
        height: 790,
        alt: "Página da extensão do Dark Planner para o YouTube",
        caption: "Tela do site oficial do Dark Planner",
        source: "oficial",
        checkedAt: FEATURES_CHECKED,
      },
    },
    {
      title: "App DarkPlanner",
      summary:
        "Para quem produz em volume: o app automatiza o VEO Flow, gera em lote e mantém tudo organizado por projeto.",
      availability: "Só no plano Pro",
      highlight: true,
      bullets: [
        "Roda a sua própria conta do Flow no automático",
        "Gera vídeos e imagens em lote e organiza por projeto",
        "Disponível para Windows e macOS",
      ],
      image: {
        src: "/img/tools/dark-planner/app-desktop.webp",
        srcSmall: "/img/tools/dark-planner/app-desktop-800.webp",
        width: 1600,
        height: 636,
        alt: "Tela de abertura do App DarkPlanner, disponível para Windows e macOS",
        caption: "Tela do site oficial do Dark Planner",
        source: "oficial",
        checkedAt: FEATURES_CHECKED,
      },
    },
    {
      title: "Gestão de Canais",
      summary: "Roteiros, títulos, vídeos e referências de cada canal num lugar só.",
      availability: "Todos os planos",
    },
    {
      title: "Similar Channels",
      summary: "Encontre canais parecidos para pesquisar referências.",
      availability: "Planos pagos",
    },
    {
      title: "Comunidade",
      summary: "Acesso à comunidade de usuários do Dark Planner.",
      availability: "Planos pagos",
    },
    {
      title: "Acesso à API",
      summary: "Para conectar a ferramenta a fluxos automatizados.",
      availability: "Só no plano Pro",
    },
  ],

  benefits: [
    {
      title: "Decidir o tema do canal com mais segurança",
      text: "Ver nichos separados por momento e dados de canais ajuda a escolher um tema com demanda antes de investir semanas de produção.",
      from: "Niche Finder · Pro",
    },
    {
      title: "Produzir sem gravar a própria voz",
      text: "A narração por IA com legendas sincronizadas tira a gravação do caminho de quem quer manter o canal sem aparecer.",
      from: "Áudio com IA · todos os planos",
    },
    {
      title: "Menos arquivos espalhados",
      text: "Roteiros, títulos e referências de cada canal num lugar só reduzem o tempo perdido procurando a versão certa.",
      from: "Gestão de Canais · todos os planos",
    },
    {
      title: "Referências do que funciona agora",
      text: "Acompanhar vídeos que estão crescendo no nicho ajuda a planejar os próximos temas com base no que o público está assistindo.",
      from: "Vídeos Virais · Pro",
    },
    {
      title: "Pesquisa sem sair do YouTube",
      text: "Analisar canais, thumbnails e transcrições na própria aba do YouTube encurta o tempo de pesquisa de referência.",
      from: "Extensão · todos os planos",
    },
  ],

  limitations: [
    {
      title: "É uma assinatura",
      text: "A página de pagamento mostra “Renovação mensal” ou “Renovação trimestral”: a cobrança se repete a cada período. Antes de assinar, pergunte ao suporte do Dark Planner como cancelar.",
    },
    {
      title: "Não aparece prazo de garantia",
      text: "A página de pagamento não mostrava prazo de garantia quando conferimos, em 18/11/2026. Se isso pesa para você, confirme com o suporte antes de pagar.",
    },
    {
      title: "Pesquisa de nicho e vídeos em alta só no Pro",
      text: "Niche Finder, Vídeos Virais, o App para Windows e macOS e a API estão só no Pro. O Basic e o Lite servem para organizar os canais e narrar com IA.",
    },
    {
      title: "Há limites por dia",
      text: "São 15 áudios por dia no Basic, 25 no Lite e 50 no Pro, além de um limite diário de créditos. Veja se cabe no seu ritmo de postagem.",
    },
    {
      title: "Taxa da Cakto",
      text: "A página de pagamento soma R$ 0,99 de taxa de serviço ao valor do plano (conferido em 18/11/2026).",
    },
    {
      title: "A ferramenta não faz o canal sozinha",
      text: "Ela ajuda a pesquisar, roteirizar, narrar e organizar. O crescimento depende do seu conteúdo e da sua constância.",
    },
  ],

  freeAlternatives: {
    items: [
      {
        title: "Plano grátis do próprio Dark Planner",
        text: "O site oficial mostra um plano gratuito, sem cartão, com 3 áudios no total (que não renovam), Gestão de Canais e Extensão YouTube (conferido em 20/10/2026).",
      },
      {
        title: "Tendências no YouTube Studio",
        text: "Para quem já tem canal, o YouTube Analytics mostra as principais buscas do seu público e lacunas de conteúdo. É do próprio YouTube, e alguns dados variam por país e idioma.",
      },
      {
        title: "Google Trends",
        text: "Mostra, de graça, como o interesse das pessoas por um tema muda ao longo do tempo.",
      },
    ],
    note: "O Dark Planner faz mais sentido quando você quer pesquisa de nicho, vídeos em alta, narração e organização dos canais num lugar só, em vez de juntar várias ferramentas.",
  },

  pricing: {
    currency: "BRL",
    checkedAt: "2026-11-18",
    source: "página de pagamento da Cakto",
    intro:
      "Todos os planos têm Gestão de Canais, Extensão para o YouTube e áudio com IA. A diferença está nos limites e nos recursos de pesquisa.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        description: "Para organizar o canal e narrar com IA.",
        billingNote: "cobrado mensalmente",
        offer: {
          trackingId: "basic-mensal",
          label: "Quero o Basic",
          price: 49.9,
          period: "mes",
          checkoutUrl: "https://pay.cakto.com.br/35mihzy?affiliate=U3tMZX54",
        },
        alternateOffers: [
          {
            trackingId: "basic-trimestral",
            label: "Trimestral",
            price: 134.97,
            period: "trimestre",
            monthlyEquivalent: 44.99,
            installments: "ou 3x de R$ 50,84 no cartão",
            checkoutUrl: "https://pay.cakto.com.br/acuxy8q?affiliate=U3tMZX54",
          },
        ],
        features: [
          "15 áudios por dia, até 80 mil caracteres cada",
          "1,2 milhão de créditos por dia",
          "Gestão de Canais e Extensão YouTube",
          "Similar Channels e comunidade",
        ],
        excluded: ["Sem Niche Finder, Vídeos Virais, App e API"],
      },
      {
        id: "lite",
        name: "Lite",
        description: "Os mesmos recursos do Basic, com limites maiores.",
        billingNote: "cobrado mensalmente",
        offer: {
          trackingId: "lite-mensal",
          label: "Quero o Lite",
          price: 79.9,
          period: "mes",
          checkoutUrl: "https://pay.cakto.com.br/3cqs7sz?affiliate=U3tMZX54",
        },
        alternateOffers: [
          {
            trackingId: "lite-trimestral",
            label: "Trimestral",
            price: 215.97,
            period: "trimestre",
            monthlyEquivalent: 71.99,
            installments: "ou 3x de R$ 81,35 no cartão",
            checkoutUrl: "https://pay.cakto.com.br/3dkvocr?affiliate=U3tMZX54",
          },
        ],
        features: [
          "25 áudios por dia, até 120 mil caracteres cada",
          "3 milhões de créditos por dia",
          "Gestão de Canais e Extensão YouTube",
          "Similar Channels e comunidade",
        ],
        excluded: ["Sem Niche Finder, Vídeos Virais, App e API"],
      },
      {
        id: "pro",
        name: "Pro",
        description: "Todos os recursos, para pesquisar nicho e vídeos virais.",
        billingNote: "cobrado mensalmente",
        badge: "Mais completo",
        offer: {
          trackingId: "pro-mensal",
          label: "Quero o Pro",
          price: 109.9,
          period: "mes",
          checkoutUrl: "https://pay.cakto.com.br/de8i8di?affiliate=U3tMZX54",
        },
        alternateOffers: [
          {
            trackingId: "pro-trimestral",
            label: "Trimestral",
            price: 299.99,
            period: "trimestre",
            monthlyEquivalent: 100,
            installments: "ou 3x de R$ 112,99 no cartão",
            checkoutUrl: "https://pay.cakto.com.br/3tr7n9k?affiliate=U3tMZX54",
          },
        ],
        features: [
          "50 áudios por dia, até 150 mil caracteres cada",
          "7,5 milhões de créditos por dia",
          "Niche Finder e Vídeos Virais",
          "App DarkPlanner (Windows e macOS) e API",
          "Tudo do Lite: Gestão de Canais, Extensão, Similar Channels e comunidade",
        ],
      },
    ],
    conditions: [
      "Os botões dos planos abrem a página de pagamento da Cakto. Lá aparece o valor final, com a taxa de R$ 0,99, antes de você pagar.",
      "Preços e parcelas conferidos na página de pagamento da Cakto em 18/11/2026, e recursos conferidos no site oficial em 20/10/2026.",
      "Pagando o trimestral à vista, o mês sai mais barato. Parcelando em 3x no cartão há acréscimo, e cada parcela fica um pouco acima do valor do plano mensal.",
      "Preços podem mudar: confirme o valor e as condições antes de pagar.",
    ],
    table: {
      columns: ["Basic", "Lite", "Pro"],
      rows: [
        { label: "Preço mensal", values: ["R$ 49,90", "R$ 79,90", "R$ 109,90"] },
        { label: "Trimestral (a cada 3 meses)", values: ["R$ 134,97", "R$ 215,97", "R$ 299,99"] },
        { label: "Trimestral à vista, por mês", values: ["R$ 44,99", "R$ 71,99", "R$ 100,00"] },
        { label: "Áudios por dia", values: ["15", "25", "50"] },
        { label: "Caracteres por áudio", values: ["80 mil", "120 mil", "150 mil"] },
        { label: "Créditos por dia", values: ["1,2 milhão", "3 milhões", "7,5 milhões"] },
        { label: "Gestão de Canais", values: [true, true, true] },
        { label: "Extensão YouTube", values: [true, true, true] },
        { label: "Similar Channels", values: [true, true, true] },
        { label: "Acesso à comunidade", values: [true, true, true] },
        { label: "Niche Finder", values: [false, false, true] },
        { label: "Vídeos Virais", values: [false, false, true] },
        { label: "App DarkPlanner", values: [false, false, true] },
        { label: "Acesso à API", values: [false, false, true] },
      ],
    },
  },

  payment: {
    platform: "Cakto",
    methods: "Cartão de crédito ou PIX automático",
    fee: "Taxa de serviço de R$ 0,99 somada pela Cakto (conferido em 18/11/2026)",
  },
  guarantee: {
    status: "nao-encontrada",
    summary: "Não aparece na página de pagamento",
    detail:
      "Na página de pagamento do Dark Planner não aparece prazo de garantia (conferido em 18/11/2026). As condições de reembolso são definidas pelo Dark Planner: se isso for importante para você, pergunte ao suporte antes de pagar.",
    checkedAt: "2026-11-18",
  },
  support: "A equipe do próprio Dark Planner, responsável pela ferramenta e pelo acesso.",
  subscription:
    "Renovação mensal ou trimestral, conforme o plano escolhido. A cobrança se repete a cada período.",
  access: "O acesso à plataforma e o suporte ficam com a equipe do próprio Dark Planner.",
  platform: "No navegador, com extensão para o YouTube. App para Windows e macOS no plano Pro.",

  officialUrl: null,

  analysis: {
    basis:
      "Análise feita a partir das informações públicas do site oficial (20/10/2026) e da página de pagamento (18/11/2026). Não fizemos teste prático da ferramenta e não publicamos notas ou avaliações de usuários.",
    positives: [
      "Recursos claramente separados por plano, com limites diários informados",
      "Narração com IA, Gestão de Canais e Extensão já estão no plano mais barato",
      "Plano grátis oficial para conhecer a plataforma antes de pagar",
      "O trimestral à vista reduz o custo por mês em todos os planos",
    ],
    attention: [
      "Pesquisa de nicho e vídeos em alta exigem o plano Pro",
      "Não encontramos prazo de garantia na página de pagamento",
      "É assinatura com renovação automática e limites diários",
      "A Cakto soma R$ 0,99 de taxa ao valor do plano",
    ],
    idealProfile:
      "Quem já decidiu criar (ou já tem) um canal faceless e quer reunir pesquisa, narração e organização num lugar só. Para pesquisar nichos e vídeos em alta, só o Pro atende.",
    notes: [
      "O Dark Planner é mais útil como sistema de produção do que como atalho: ele organiza o caminho entre a ideia e o vídeo publicado, mas não substitui o trabalho criativo.",
      "Para quem ainda está testando se vai mesmo criar um canal, o plano grátis oficial e ferramentas gratuitas como o Google Trends são um bom primeiro passo. Quem já produz com frequência tende a aproveitar melhor os limites do Lite ou do Pro.",
    ],
  },

  faq: [
    {
      q: "Preciso aparecer nos vídeos?",
      a: "Não. O Dark Planner é voltado para canais faceless: ajuda a pesquisar, organizar a produção e gerar a narração com IA.",
    },
    {
      q: "Qual plano devo escolher?",
      a: "Se você quer organizar o canal e narrar com IA, o Basic já atende. O Lite tem os mesmos recursos, com mais áudios por dia. Se você quer pesquisar nicho e vídeos virais, ou usar o App e a API, só o Pro inclui esses recursos.",
    },
    {
      q: "Mensal ou trimestral: qual compensa?",
      a: "Pagando o trimestral à vista, o mês sai mais barato: R$ 44,99 no Basic, R$ 71,99 no Lite e R$ 100,00 no Pro. Parcelando em 3x no cartão há acréscimo, e cada parcela fica um pouco acima do valor do plano mensal.",
    },
    {
      q: "Como é o pagamento?",
      a: "Na página da Cakto, com cartão de crédito ou PIX automático. O valor de cada parcela do plano trimestral aparece junto de cada plano.",
    },
    {
      q: "O Dark Planner tem plano grátis?",
      a: "Sim. O site oficial mostra um plano gratuito, sem cartão de crédito, com 3 áudios no total (que não renovam), Gestão de Canais e Extensão YouTube. Esta página apresenta os planos pagos.",
    },
    {
      q: "Tem garantia ou reembolso?",
      a: "Na página de pagamento do Dark Planner não aparece prazo de garantia (conferido em 18/11/2026). As condições de reembolso são definidas pelo Dark Planner: se isso for importante para você, pergunte ao suporte antes de pagar.",
    },
    {
      q: "Quem dá o suporte?",
      a: "A equipe do próprio Dark Planner, responsável pela ferramenta e pelo acesso.",
    },
    {
      q: "Esta página é do Dark Planner?",
      a: "Não. É uma página não oficial, feita pela Curadoria Digital, com links de afiliado. Se você comprar por aqui, recebemos uma comissão, sem custo extra para você.",
    },
    {
      q: "Os resultados do meu canal são garantidos?",
      a: "Não. O Dark Planner é uma ferramenta: os resultados dependem do seu conteúdo, do nicho e da sua constância.",
    },
  ],

  checks: {
    featuresCheckedAt: FEATURES_CHECKED,
    pricesCheckedAt: "2026-11-18",
    updatedAt: "2026-11-18",
  },

  seo: {
    title: "Dark Planner: recursos, planos e preços conferidos",
    description:
      "Dark Planner por dentro: Niche Finder, vídeos virais, narração com IA e extensão para o YouTube. Compare Basic, Lite e Pro antes de assinar.",
    ogImage: "/og/dark-planner.jpg",
  },
};
