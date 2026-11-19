// QA de ponta a ponta sobre o build estático (out/). Uso:
//   npx serve out -l 4173  (ou python3 -m http.server 4173 --directory out)
//   node scripts/qa.cjs http://localhost:4173
const { chromium, devices } = require("playwright");
const BASE = process.argv[2] || "http://localhost:4173";
const ROUTES = ["/", "/ferramentas/", "/ferramentas/dark-planner/", "/ferramentas/whatsify-pro/", "/comparar/", "/sobre/", "/contato/", "/termos/", "/politica-de-privacidade/"];
const EXPECTED_AFFILIATES = [
  "https://pay.cakto.com.br/35mihzy?affiliate=U3tMZX54", "https://pay.cakto.com.br/acuxy8q?affiliate=U3tMZX54",
  "https://pay.cakto.com.br/3cqs7sz?affiliate=U3tMZX54", "https://pay.cakto.com.br/3dkvocr?affiliate=U3tMZX54",
  "https://pay.cakto.com.br/de8i8di?affiliate=U3tMZX54", "https://pay.cakto.com.br/3tr7n9k?affiliate=U3tMZX54",
  "https://pay.cakto.com.br/utncq33?affiliate=8w9XcQiL", "https://pay.cakto.com.br/36mf5oy?affiliate=8w9XcQiL",
  "https://pay.cakto.com.br/6aih2s8?affiliate=8w9XcQiL",
];
let fails = 0;
const ok = (c, m) => { console.log(`${c ? "PASS" : "FAIL"}  ${m}`); if (!c) fails++; };

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("console", (m) => { if (m.type() === "error" && !/cloudflareinsights|TUNNEL|umami/.test(m.text() + m.location().url)) errors.push(m.text()); });
  const found = new Set();
  const internal = new Set();

  for (const r of ROUTES) {
    const res = await p.goto(BASE + r, { waitUntil: "networkidle" });
    ok(res.status() === 200, `${r} responde 200`);
    const info = await p.evaluate(() => ({
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content || "",
      canonical: document.querySelector('link[rel="canonical"]')?.href || "",
      og: document.querySelector('meta[property="og:image"]')?.content || "",
      h1: document.querySelectorAll("h1").length,
      imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
      broken: [...document.querySelectorAll("img")].filter((i) => i.complete && i.loading !== "lazy" && i.naturalWidth === 0 && i.getAttribute("src")).map((i) => i.src),
      aff: [...document.querySelectorAll('a[href^="https://pay.cakto.com.br/"]')].map((a) => ({ href: a.href, rel: a.rel })),
      links: [...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href").split("#")[0].split("?")[0]),
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].every((s) => { try { JSON.parse(s.textContent); return true; } catch { return false; } }),
    }));
    ok(info.title.length > 10 && info.desc.length > 70, `${r} title e description (${info.title})`);
    ok(info.canonical === "https://curadoriadigitalbr.com.br" + r, `${r} canonical ${info.canonical}`);
    ok(info.og.startsWith("https://curadoriadigitalbr.com.br/og/"), `${r} og:image`);
    ok(info.h1 === 1, `${r} exatamente um H1 (${info.h1})`);
    ok(info.imgsNoAlt === 0, `${r} todas as imagens com alt`);
    ok(info.broken.length === 0, `${r} sem imagens quebradas ${info.broken.join(",")}`);
    ok(info.jsonld, `${r} JSON-LD válido`);
    info.aff.forEach((a) => { found.add(a.href); ok(a.rel.includes("sponsored") && a.rel.includes("noopener"), `${r} rel sponsored noopener em ${a.href.slice(25, 33)}`); });
    info.links.forEach((l) => internal.add(l));
  }
  ok(EXPECTED_AFFILIATES.every((u) => found.has(u)) && found.size === EXPECTED_AFFILIATES.length, `9 links de afiliado preservados (${found.size} encontrados)`);

  // links internos e arquivos públicos
  for (const l of [...internal, "/sitemap.xml", "/robots.txt", "/favicon.svg", "/apple-touch-icon.png", "/og/home.jpg"]) {
    const res = await p.request.get(BASE + l);
    ok(res.status() === 200, `link interno ${l}`);
  }
  const sm = await (await p.request.get(BASE + "/sitemap.xml")).text();
  ok(ROUTES.every((r) => sm.includes(`https://curadoriadigitalbr.com.br${r}<`)), "sitemap contém todas as rotas");

  // imagens lazy: rola as páginas de ferramenta e confere carregamento
  for (const r of ["/ferramentas/dark-planner/", "/ferramentas/whatsify-pro/"]) {
    await p.goto(BASE + r, { waitUntil: "networkidle" });
    const H = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += 700) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(60); }
    await p.waitForLoadState("networkidle");
    const bad = await p.evaluate(() => [...document.querySelectorAll("img")].filter((i) => i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
    ok(bad.length === 0, `${r} todas as imagens carregadas após rolagem ${bad.join(",")}`);
  }

  // catálogo: pesquisa, filtro, ordenação, estado vazio e URL
  await p.goto(BASE + "/ferramentas/", { waitUntil: "networkidle" });
  const count = () => p.locator("main ul.grid > li").count();
  ok((await count()) === 2, "catálogo lista 2 ferramentas");
  await p.fill('input[type="search"]', "kanban");
  await p.waitForTimeout(400);
  ok((await count()) === 1 && (await p.locator("main ul.grid h2").first().innerText()) === "Whatsify Pro", "pesquisa 'kanban' → Whatsify Pro");
  ok(p.url().includes("q=kanban"), "pesquisa sincronizada na URL");
  await p.fill('input[type="search"]', "narração");
  await p.waitForTimeout(400);
  ok((await count()) === 1 && (await p.locator("main ul.grid h2").first().innerText()) === "Dark Planner", "pesquisa com acento 'narração' → Dark Planner");
  await p.fill('input[type="search"]', "xyz inexistente");
  await p.waitForTimeout(400);
  ok(await p.getByText("Nenhuma ferramenta encontrada").isVisible(), "estado vazio aparece");
  await p.getByRole("button", { name: "Limpar filtros" }).click();
  await p.waitForTimeout(400);
  ok((await count()) === 2, "limpar filtros restaura lista");
  await p.getByRole("button", { name: /^YouTube/ }).click();
  await p.waitForTimeout(400);
  ok((await count()) === 1 && p.url().includes("categoria=youtube"), "filtro YouTube → 1 ferramenta e URL");
  await p.getByRole("button", { name: /^Todas/ }).click();
  await p.selectOption("select", "preco");
  await p.waitForTimeout(400);
  ok((await p.locator("main ul.grid h2").first().innerText()) === "Dark Planner" && p.url().includes("ordem=preco"), "ordenar por menor preço mensal (R$ 44,99 vs R$ 49,75) → Dark Planner primeiro");
  await p.goto(BASE + "/ferramentas/?categoria=atendimento", { waitUntil: "networkidle" });
  ok((await count()) === 1, "link direto ?categoria=atendimento filtra");
  const cats = await p.locator('[aria-label="Filtrar por categoria"] button').allInnerTexts();
  ok(!cats.some((c) => /Marketing|Produtividade/.test(c)), "categorias vazias não aparecem");

  // comparação
  await p.goto(BASE + "/comparar/", { waitUntil: "networkidle" });
  await p.getByRole("button", { name: /Dark Planner/ }).first().click();
  await p.waitForTimeout(300);
  ok(await p.getByText("Ainda não há outra ferramenta com o mesmo objetivo").isVisible(), "comparação: 1 selecionada mostra aviso honesto");
  ok(await p.getByRole("button", { name: /Whatsify Pro/ }).first().isDisabled(), "comparação: ferramenta de objetivo diferente fica desativada");
  ok(p.url().includes("ferramentas=dark-planner"), "comparação sincronizada na URL");

  // página de produto: FAQ, lightbox, tabela, âncora
  await p.goto(BASE + "/ferramentas/dark-planner/", { waitUntil: "networkidle" });
  const faq = p.locator("details.faq-item").first();
  await faq.locator("summary").click();
  ok(await faq.evaluate((d) => d.open), "FAQ abre");
  await p.locator("a[data-zoom]").first().click();
  await p.waitForTimeout(300);
  ok(await p.locator("dialog[open]").isVisible(), "lightbox abre a tela ampliada");
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);
  ok((await p.locator("dialog[open]").count()) === 0, "lightbox fecha com Esc");
  await p.getByText("Comparação completa entre os planos").click();
  ok(await p.locator("table").first().isVisible(), "tabela completa de planos abre");

  // mobile: menu
  const m = await b.newPage({ ...devices["iPhone 13"] });
  await m.goto(BASE + "/", { waitUntil: "networkidle" });
  await m.getByRole("button", { name: "Abrir menu" }).click();
  ok(await m.locator("#menu-mobile").isVisible(), "menu mobile abre");
  await m.locator("#menu-mobile").getByRole("link", { name: /Ferramentas/ }).first().click();
  await m.waitForURL("**/ferramentas/");
  ok(!(await m.locator("#menu-mobile").isVisible()), "menu mobile fecha ao navegar");

  // prefers-reduced-motion: conteúdo visível sem animação
  const rm = await b.newPage({ reducedMotion: "reduce" });
  await rm.goto(BASE + "/", { waitUntil: "networkidle" });
  const hidden = await rm.evaluate(() => [...document.querySelectorAll("[data-reveal]")].filter((e) => getComputedStyle(e).opacity === "0").length);
  ok(hidden === 0, "reduced motion: nenhum conteúdo escondido");

  ok(errors.length === 0, `sem erros de console/JS ${errors.join(" | ")}`);
  console.log(`\n${fails ? fails + " FALHA(S)" : "TUDO OK"}`);
  await b.close();
  process.exit(fails ? 1 : 0);
})();
