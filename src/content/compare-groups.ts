/**
 * Grupos de comparação: só ferramentas com o mesmo objetivo são comparadas
 * lado a lado. Ao cadastrar uma ferramenta, use um destes slugs em `compareGroup`
 * (ou crie um novo grupo aqui).
 */
export const compareGroups: Record<string, { name: string; description: string }> = {
  "producao-youtube": {
    name: "Produção de canais no YouTube",
    description: "Pesquisa de nicho, roteiro, narração e organização de canais.",
  },
  "atendimento-whatsapp": {
    name: "Atendimento e vendas no WhatsApp",
    description: "Respostas automáticas, CRM e acompanhamento de clientes.",
  },
};
