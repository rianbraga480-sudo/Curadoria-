// Gera as imagens Open Graph (1200×630) e os ícones a partir de HTML, com Playwright.
// Uso: npm run og   (requer Playwright instalado globalmente ou no projeto)
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require(resolve(execSync("npm root -g").toString().trim(), "playwright")));
}

const root = resolve(import.meta.dirname, "..");
const b64 = (p) => readFileSync(resolve(root, p)).toString("base64");
const font = (_pkg, file) => `data:font/woff2;base64,${b64(`src/fonts/${file}`)}`;
const sphere = `data:image/webp;base64,${b64("public/img/brand/chrome-sphere.webp")}`;

const css = `
@font-face{font-family:SG;src:url(${font("space-grotesk", "space-grotesk-latin-wght-normal.woff2")})}
@font-face{font-family:IN;src:url(${font("inter", "inter-latin-wght-normal.woff2")})}
@font-face{font-family:JB;src:url(${font("jetbrains-mono", "jetbrains-mono-latin-wght-normal.woff2")})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#050505;color:#f5f5f5;font-family:IN;overflow:hidden;position:relative}
.glow{position:absolute;inset:0;background:radial-gradient(600px 400px at 85% 40%,rgba(255,255,255,.10),transparent),radial-gradient(500px 300px at 10% 0%,rgba(255,255,255,.06),transparent)}
.grid{position:absolute;left:-20%;right:-20%;bottom:-40%;height:70%;background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.10) 0 1px,transparent 1px 48px),repeating-linear-gradient(0deg,rgba(255,255,255,.06) 0 1px,transparent 1px 48px);transform:perspective(400px) rotateX(70deg);transform-origin:50% 0;-webkit-mask:linear-gradient(transparent,#000 40%)}
.wrap{position:absolute;inset:64px 72px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-family:SG;font-weight:600;letter-spacing:.18em;font-size:20px}
.brand small{display:block;font-family:JB;font-weight:400;font-size:11px;letter-spacing:.42em;color:#9a9a9a;margin-top:4px}
.mark{width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 35% 28%,#fff,#bdbdbd 35%,#3a3a3a 70%,#0b0b0b)}
.eyebrow{font-family:JB;font-size:15px;letter-spacing:.2em;text-transform:uppercase;color:#9a9a9a;margin-top:auto}
h1{font-family:SG;font-weight:500;font-size:72px;line-height:.98;letter-spacing:-.045em;margin-top:18px;max-width:760px}
.chrome{background:linear-gradient(180deg,#fff 0%,#e9e9e9 22%,#a9a9a9 44%,#f4f4f4 52%,#8d8d8d 70%,#d8d8d8 100%);-webkit-background-clip:text;color:transparent}
.foot{display:flex;gap:28px;margin-top:28px;font-family:JB;font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:#c5c5c5}
.foot span::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#777;margin-right:10px;vertical-align:middle}
.sphere{position:absolute;right:-90px;top:50%;width:560px;transform:translateY(-50%);filter:drop-shadow(0 40px 60px #000)}
.shot{position:absolute;right:56px;top:96px;width:560px;border-radius:18px;padding:7px;background:linear-gradient(160deg,rgba(255,255,255,.3),rgba(255,255,255,.04) 30%,rgba(255,255,255,.14));box-shadow:0 50px 100px -30px #000}
.shot img{display:block;width:100%;border-radius:12px}
.mini{position:absolute;right:20px;bottom:30px;width:190px;filter:drop-shadow(0 20px 30px #000)}
`;

const pages = [
  {
    out: "public/og/home.jpg",
    body: `<img class="sphere" src="${sphere}"><div class="wrap"><div class="brand"><div class="mark"></div><div>CURADORIA<small>DIGITAL</small></div></div>
      <p class="eyebrow">Curadoria independente de ferramentas digitais</p>
      <h1>Encontre as <span class="chrome">ferramentas certas</span> para evoluir no digital.</h1>
      <div class="foot"><span>Telas reais</span><span>Preços conferidos</span><span>Sem promessas</span></div></div>`,
  },
  ...[
    ["dark-planner", "Dark Planner", "Pesquisa de nicho, narração com IA e gestão de canais", "public/img/tools/dark-planner/niche-finder-800.webp"],
    ["whatsify-pro", "Whatsify Pro", "Chatbot, mensagens programadas e CRM no WhatsApp Web", "public/img/tools/whatsify-pro/atendimento-automatico-800.webp"],
  ].map(([slug, name, sub, img]) => ({
    out: `public/og/${slug}.jpg`,
    body: `<div class="shot"><img src="data:image/webp;base64,${b64(img)}"></div><img class="mini" src="${sphere}">
      <div class="wrap"><div class="brand"><div class="mark"></div><div>CURADORIA<small>DIGITAL</small></div></div>
      <p class="eyebrow">Análise · recursos · planos e preços</p>
      <h1 style="max-width:520px"><span class="chrome">${name}</span> por dentro.</h1>
      <p style="margin-top:18px;max-width:470px;font-size:21px;line-height:1.4;color:#9a9a9a">${sub}</p></div>`,
  })),
];

const icon = (size) => `<!doctype html><style>*{margin:0}body{width:${size}px;height:${size}px;background:#050505;display:grid;place-items:center}img{width:${Math.round(size * 0.82)}px}</style><img src="${sphere}">`;

mkdirSync(resolve(root, "public/og"), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of pages) {
  await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body><div class="glow"></div><div class="grid"></div>${p.body}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: resolve(root, p.out), type: "jpeg", quality: 86 });
  console.log("ok", p.out);
}
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(icon(180));
await page.waitForTimeout(150);
await page.screenshot({ path: resolve(root, "public/apple-touch-icon.png") });
console.log("ok public/apple-touch-icon.png");
await browser.close();
