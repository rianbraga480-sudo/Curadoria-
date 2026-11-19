// Captura a esfera cromada (WebGL) do herói com fundo transparente.
// Uso: node scripts/capture-sphere.cjs "http://localhost:4173/?webgl" public/img/brand/chrome-sphere.png
// (?webgl força o 3D mesmo em renderização por software)
const { chromium } = require("playwright");
(async () => {
  const [, , url, out] = process.argv;
  const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const p = await b.newPage({ viewport: { width: 1400, height: 1400 }, deviceScaleFactor: 1 });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForSelector("canvas", { timeout: 20000 });
  await p.waitForTimeout(3500);
  await p.addStyleTag({ content: "html,body{background:transparent!important} body *{visibility:hidden!important} canvas{visibility:visible!important} .grain{display:none}" });
  await p.waitForTimeout(500);
  await p.locator("canvas").first().screenshot({ path: out, omitBackground: true });
  await b.close();
})();
