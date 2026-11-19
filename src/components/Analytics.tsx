"use client";

import { useEffect } from "react";
import { site } from "@/content/site";

/**
 * Medição — porta fiel da versão anterior (v19):
 * - Umami (sem cookies) só no domínio de produção;
 * - GA4 e Meta Pixel preparados e DESLIGADOS (IDs vazios em src/content/site.ts);
 *   se forem ativados, só carregam após consentimento (LGPD);
 * - evento `affiliate_click` com produto, plano, posição, página e origem (UTM);
 * - eventos `data-ev` para CTAs internos e Instagram.
 * Clique não é venda: a venda só é confirmada no painel da Cakto.
 */

type W = Window & {
  umami?: { track: (n: string, d?: object) => unknown };
  gtag?: (...a: unknown[]) => void;
  dataLayer?: unknown[];
  fbq?: ((...a: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
};

const CONSENT_KEY = "cd_cookies_v1";

export function Analytics({ offers }: { offers: Record<string, [string, string]> }) {
  useEffect(() => {
    const w = window as W;
    const d = document;
    const { umamiId, ga4Id, metaPixelId, hosts } = site.analytics;
    const live = (hosts as readonly string[]).includes(location.hostname);

    if (umamiId && live && !d.querySelector("script[data-website-id]")) {
      const s = d.createElement("script");
      s.defer = true;
      s.src = "https://cloud.umami.is/script.js";
      s.setAttribute("data-website-id", umamiId);
      s.setAttribute("data-domains", hosts.join(","));
      d.head.appendChild(s);
    }

    const loadAds = () => {
      if (ga4Id && !w.gtag) {
        const g = d.createElement("script");
        g.async = true;
        g.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
        d.head.appendChild(g);
        w.dataLayer = w.dataLayer || [];
        w.gtag = function gtag() {
          // eslint-disable-next-line prefer-rest-params
          w.dataLayer!.push(arguments);
        };
        w.gtag("js", new Date());
        w.gtag("config", ga4Id);
      }
      if (metaPixelId && !w.fbq) {
        // código-base oficial do Meta Pixel, sem alterações de lógica
        /* eslint-disable */
        (function (f: any, b: Document, e: string, v: string) {
          if (f.fbq) return;
          const n: any = (f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          });
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = true;
          n.version = "2.0";
          n.queue = [];
          const t = b.createElement(e) as HTMLScriptElement;
          t.async = true;
          t.src = v;
          const s = b.getElementsByTagName(e)[0]!;
          s.parentNode!.insertBefore(t, s);
        })(w, d, "script", "https://connect.facebook.net/en_US/fbevents.js");
        /* eslint-enable */
        w.fbq!("init", metaPixelId);
        w.fbq!("track", "PageView");
      }
    };
    let bar: HTMLDivElement | null = null;
    if ((ga4Id || metaPixelId) && live) {
      let choice: string | null = null;
      try {
        choice = localStorage.getItem(CONSENT_KEY);
      } catch {}
      if (choice === "sim") loadAds();
      else if (choice !== "nao") {
        bar = d.createElement("div");
        bar.setAttribute("role", "region");
        bar.setAttribute("aria-label", "Aviso de cookies");
        bar.className =
          "fixed inset-x-3 bottom-3 z-[70] flex flex-wrap items-center gap-3 rounded-2xl border border-white/15 bg-ink/95 p-4 text-sm text-silver backdrop-blur md:inset-x-auto md:right-6 md:max-w-md";
        bar.innerHTML =
          '<p class="flex-1">Usamos cookies de medição para entender quais páginas e botões ajudam mais. Você escolhe. <a class="prose-link" href="/politica-de-privacidade/">Política de privacidade</a></p><div class="flex gap-2"><button type="button" class="btn btn-ghost btn-sm" data-c="nao">Recusar</button><button type="button" class="btn btn-chrome btn-sm" data-c="sim">Aceitar</button></div>';
        d.body.appendChild(bar);
        bar.addEventListener("click", (e) => {
          const b = (e.target as Element).closest<HTMLElement>("[data-c]");
          if (!b) return;
          const v = b.dataset.c!;
          try {
            localStorage.setItem(CONSENT_KEY, v);
          } catch {}
          if (v === "sim") loadAds();
          bar?.remove();
        });
      }
    }

    const track = (name: string, data: Record<string, string>) => {
      let sent: unknown = null;
      try {
        if (w.umami?.track) sent = w.umami.track(name, data);
      } catch {}
      try {
        if (w.gtag && ga4Id) w.gtag("event", name, { transport_type: "beacon", ...data });
      } catch {}
      try {
        if (w.fbq && metaPixelId) {
          if (name === "affiliate_click") w.fbq("track", "InitiateCheckout", { content_name: `${data.produto} ${data.plano}` });
          else w.fbq("trackCustom", name, data);
        }
      } catch {}
      return sent;
    };

    // origem da visita (ex.: anúncio). Só nesta aba, não identifica ninguém.
    let origem = "";
    try {
      const q = new URLSearchParams(location.search);
      const us = q.get("utm_source");
      const uc = q.get("utm_content");
      if (us) {
        origem = (us + (uc ? `-${uc}` : "")).replace(/[^\w-]/g, "").slice(0, 40);
        sessionStorage.setItem("cd_origem", origem);
      } else origem = sessionStorage.getItem("cd_origem") || "";
    } catch {
      origem = "";
    }

    const clearBusy = () =>
      d.querySelectorAll("[aria-busy='true']").forEach((a) => a.removeAttribute("aria-busy"));

    const onAffiliate = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="https://pay.cakto.com.br/"]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      a.setAttribute("aria-busy", "true");
      window.setTimeout(clearBusy, 5000);
      const any = !!w.umami?.track || (!!w.gtag && !!ga4Id) || (!!w.fbq && !!metaPixelId);
      if (!any || (a.target && a.target !== "_self")) return;
      const code = a.pathname.replace(/\//g, "");
      const offer = offers[code] ?? ["outro", code];
      const data: Record<string, string> = {
        produto: offer[0],
        plano: offer[1],
        posicao: a.dataset.pos || "botao-do-plano",
        pagina: location.pathname,
      };
      if (origem) data.origem = origem;
      const href = a.href;
      let gone = false;
      const go = () => {
        if (!gone) {
          gone = true;
          location.href = href;
        }
      };
      e.preventDefault();
      try {
        const p = track("affiliate_click", data) as Promise<unknown> | null;
        if (p && typeof p.then === "function") p.then(go, go);
      } catch {
        go();
        return;
      }
      window.setTimeout(go, 150);
    };

    const onEvent = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-ev]");
      if (!el || e.button !== 0) return;
      const data: Record<string, string> = { posicao: el.dataset.pos || "", pagina: location.pathname };
      if (el.dataset.prod) data.produto = el.dataset.prod;
      if (origem) data.origem = origem;
      track(el.dataset.ev!, data);
    };

    d.addEventListener("click", onAffiliate);
    d.addEventListener("click", onEvent);
    window.addEventListener("pageshow", clearBusy);
    return () => {
      d.removeEventListener("click", onAffiliate);
      d.removeEventListener("click", onEvent);
      window.removeEventListener("pageshow", clearBusy);
      bar?.remove();
    };
  }, [offers]);

  return null;
}
