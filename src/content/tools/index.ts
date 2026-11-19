import type { ToolInput } from "@/lib/schema";
import { darkPlanner } from "./dark-planner";
import { whatsifyPro } from "./whatsify-pro";

/**
 * Registro de ferramentas.
 * Para adicionar uma nova: crie `src/content/tools/<slug>.ts` copiando um dos
 * arquivos existentes, coloque as imagens em `public/img/tools/<slug>/` e
 * inclua a ferramenta nesta lista. A página /ferramentas/<slug>/, o catálogo,
 * as categorias, o sitemap e a comparação são gerados automaticamente.
 */
export const toolEntries: ToolInput[] = [darkPlanner, whatsifyPro];
