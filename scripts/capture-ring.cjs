// Captura o anel cromado (WebGL) do CTA final com fundo transparente.
// Uso: node scripts/capture-ring.cjs "http://localhost:4173/?webgl" public/img/brand/ring.png
const { chromium } = require("playwright");
(async () => {
  const [, , url, out] = process.argv;
  const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const p = await b.newPage({ viewport: { width: 1200, height: 1000 } });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelector("#final-title")?.scrollIntoView({ block: "center" }));
  await p.waitForTimeout(5000);
  await p.addStyleTag({ content: "html,body{background:transparent!important} body *{visibility:hidden!important} canvas{visibility:visible!important} .grain{display:none}" });
  await p.waitForTimeout(400);
  const canvases = p.locator("canvas");
  await canvases.nth((await canvases.count()) - 1).screenshot({ path: out, omitBackground: true });
  await b.close();
})();
