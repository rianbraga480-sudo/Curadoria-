# Curadoria Digital — BLACK CHROME

Plataforma independente de descoberta, análise e comparação de ferramentas digitais.
Site: <https://curadoriadigitalbr.com.br>

Next.js (App Router) + TypeScript, exportado como **site 100% estático** (`out/`) e publicado na Netlify,
como a versão anterior: sem servidor, sem banco de dados e sem custo extra.

---

## Rodar localmente

Requer Node 20.9+ (recomendado 22, ver `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:3000 com recarregamento
npm run build        # gera o site estático em out/ (valida todo o conteúdo)
npm start            # serve out/ em http://localhost:3000
npm run typecheck
```

## Publicar na Netlify

`netlify.toml` já está configurado (`npm run build` → pasta `out`).

1. Na Netlify, abra o site atual → **Site configuration → Build & deploy → Link repository** e conecte este repositório
   (branch de produção à sua escolha).
2. Confirme: build command `npm run build`, publish directory `out`.
3. Cada push na branch de produção publica automaticamente.

Os redirecionamentos 301 das URLs antigas estão em `public/_redirects`
(`/dark-planner/` → `/ferramentas/dark-planner/`, `/whatsify-pro/` → `/ferramentas/whatsify-pro/`,
`/privacidade.html` → `/politica-de-privacidade/`). Parâmetros UTM são preservados.
Cabeçalhos de cache e segurança: `public/_headers`.

---

## Arquitetura

```
src/
  app/                         rotas (App Router, exportação estática)
    page.tsx                   /
    ferramentas/page.tsx       /ferramentas/            catálogo (busca, filtros, ordenação)
    ferramentas/[slug]/        /ferramentas/<slug>/     template único de ferramenta
    comparar/                  /comparar/               comparação por objetivo
    sobre/ contato/ termos/ politica-de-privacidade/
    sitemap.ts robots.ts not-found.tsx
  content/                     ← CONTEÚDO EDITÁVEL
    tools/dark-planner.ts
    tools/whatsify-pro.ts
    tools/index.ts             registro de ferramentas
    categories.ts              categorias (só aparecem se tiverem ferramentas)
    compare-groups.ts          grupos de comparação (objetivos)
    site.ts                    dados institucionais e IDs de medição
  lib/
    schema.ts                  esquema Zod + tipos TypeScript de todo o conteúdo
    tools.ts                   validação no build + consultas (categorias ativas, preços, comparação…)
    seo.ts format.ts
  components/
    layout/ home/ tools/ ui/   componentes de interface
    motion/                    GSAP + ScrollTrigger + Lenis (atributos data-reveal, data-parallax…)
    three/                     objetos cromados (Three.js / React Three Fiber, shader GLSL)
    Analytics.tsx              Umami + medição de cliques de afiliado (porta da versão anterior)
  fonts/                       Space Grotesk, Inter, JetBrains Mono (auto-hospedadas, OFL)
public/
  img/tools/<slug>/            capturas de tela reais (webp + variante 800px)
  img/brand/                   esfera e anel cromados renderizados (fallback do 3D)
  og/                          imagens Open Graph
scripts/
  og.mjs                       gera imagens OG e apple-touch-icon
  capture-sphere.cjs / capture-ring.cjs   recaptura os objetos 3D como imagem
  qa.cjs                       teste de ponta a ponta (rotas, links, busca, filtros, comparação…)
```

### Como adicionar uma ferramenta

1. Copie `src/content/tools/whatsify-pro.ts` para `src/content/tools/<slug>.ts` e preencha os campos.
   O tipo `ToolInput` (de `src/lib/schema.ts`) guia cada campo no editor.
2. Coloque as imagens reais em `public/img/tools/<slug>/` (de preferência `.webp`, mais uma versão de 800 px de largura).
3. Registre a ferramenta em `src/content/tools/index.ts`.
4. `npm run build`. Se algo estiver errado (link não HTTPS, categoria inexistente, alt text faltando,
   link de checkout repetido, descrição de SEO fora do tamanho), o build falha com a mensagem do campo.

A página `/ferramentas/<slug>/`, o card no catálogo, as categorias, o sitemap, os dados estruturados,
o rodapé e a comparação são gerados automaticamente. Use `status: "rascunho"` para esconder uma ferramenta.

**Regras editoriais embutidas no esquema**

- O que não foi verificado fica `null` (ex.: `officialUrl`, `logo`) e o site mostra "a confirmar" ou um monograma, nunca um valor inventado.
- `guarantee.status`: `informada` | `nao-encontrada` | `a-confirmar`.
- Toda imagem tem `source: "oficial" | "ilustracao"` e data de conferência, exibidas na legenda.
- Preços têm `checkedAt`. Atualize a data sempre que conferir na página de pagamento.
- `compareGroup`: só ferramentas do mesmo grupo aparecem lado a lado em `/comparar/`.

### Migração futura para CMS

Toda a interface consome `getTools()` / `getTool()` de `src/lib/tools.ts`. Para usar um CMS ou banco,
basta trocar a origem de `toolEntries` por uma busca no build, mantendo o mesmo esquema Zod.

---

## Identidade BLACK CHROME

Tokens em `src/app/globals.css` (`@theme`): obsidian `#050505`, ink `#101010`, graphite `#1A1A1A`,
metal, silver `#C5C5C5`, platinum `#E5E5E5`, snow `#F5F5F5`. O cinza metálico `#777777` (`titanium`)
foi clareado para `#8C8C8C` no token de texto `metal`, para cumprir o contraste AA em textos pequenos.

Classes de marca: `.chrome-text`, `.chrome-sheen`, `.outline-text`, `.surface` (luz que segue o cursor),
`.frame` (moldura de capturas), `.btn-chrome`, `.btn-ghost`, `.eyebrow`, `.tag`.

### Movimento e 3D

- Animações declaradas por atributo: `data-reveal="title|fade|stagger|clip"`, `data-parallax`, `data-draw`, `data-sheen`.
- Conteúdo acima da dobra (`data-hero`) anima só em CSS e é visível desde a primeira pintura (bom para o LCP).
  GSAP, ScrollTrigger e Lenis são carregados depois.
- A esfera cromada usa sulcos procedurais por pixel (shader GLSL) e um estúdio de luz gerado em tempo real (PMREM), sem baixar HDR.
- O WebGL só roda em computadores com GPU. No celular, em renderização por software, com economia de dados ou abaixo de
  25 fps, aparece a imagem do próprio objeto 3D com um movimento leve em CSS. `?webgl` na URL força o 3D (para testes).
- `prefers-reduced-motion` desliga todas as animações sem esconder conteúdo.

## Medição (preservada da versão anterior)

- **Umami** (sem cookies), mesmo Website ID, só no domínio de produção. Evento `affiliate_click` com
  `produto`, `plano`, `posicao`, `pagina` e `origem` (UTM), além de `cta_click`, `instagram_click` e `categoria_click`.
- **Cloudflare Web Analytics**, mesmo token.
- **GA4 e Meta Pixel**: preparados e desligados (`src/content/site.ts`). Se ativar, só carregam após consentimento; atualize a política de privacidade.

## QA

```bash
npm run build && npm start      # em outro terminal:
npm run qa                      # requer Playwright (npm i -D playwright && npx playwright install chromium)
```

Verifica, entre outros: status 200 de todas as rotas e links internos, title/description/canonical/OG,
um H1 por página, alt em todas as imagens, imagens quebradas, JSON-LD válido, os 9 links de afiliado
originais com `rel="sponsored noopener"`, busca (com acentos), filtros, ordenação, estado vazio,
sincronização com a URL, comparação, FAQ, lightbox, menu mobile, prefers-reduced-motion e erros de console.
