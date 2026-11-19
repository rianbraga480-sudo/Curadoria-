"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Linguagem de movimento da Curadoria Digital.
 *
 * Tudo é declarado no HTML por atributos, então os componentes continuam
 * sendo renderizados no servidor e o conteúdo existe sem JavaScript:
 *   data-reveal="title"   título revelado palavra a palavra por máscara
 *   data-reveal="fade"    surge de baixo com fade
 *   data-reveal="stagger" filhos entram em sequência
 *   data-reveal="clip"    imagem revelada por máscara (clip-path)
 *   data-parallax="0.15"  deslocamento proporcional à rolagem
 *   data-draw             linha que se desenha conforme a rolagem
 *   data-sheen            reflexo cromado que percorre o título uma vez
 *
 * Com prefers-reduced-motion, nada se move e nada fica escondido.
 */

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

function splitTitle(el: HTMLElement) {
  if (el.dataset.split === "1") return;
  el.dataset.split = "1";
  const wrapWord = (content: Node) => {
    const outer = document.createElement("span");
    outer.className = "reveal-line";
    outer.style.display = "inline-block";
    outer.style.verticalAlign = "top";
    const inner = document.createElement("span");
    inner.appendChild(content);
    outer.appendChild(inner);
    return outer;
  };
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(" "));
          else frag.appendChild(wrapWord(document.createTextNode(p)));
        });
        child.parentNode?.replaceChild(frag, child);
      } else if (child instanceof HTMLElement) {
        if (child.tagName === "BR") return;
        // gradientes com background-clip:text são animados como um bloco único
        if (/chrome-|outline-text/.test(child.className) || child.dataset.atomic !== undefined) {
          const placeholder = document.createComment("w");
          child.parentNode?.replaceChild(placeholder, child);
          placeholder.parentNode?.replaceChild(wrapWord(child), placeholder);
        } else {
          walk(child);
        }
      }
    });
  };
  walk(el);
}

export function MotionRoot() {
  const pathname = usePathname();

  // Lenis + ScrollTrigger: uma vez por sessão
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    lenis = new Lenis({ duration: 1.1, anchors: { offset: -88 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Luz que acompanha o cursor nas superfícies grafite
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".surface");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Animações declarativas: refeitas a cada troca de rota
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lenis?.scrollTo(0, { immediate: true });

    if (reduce) {
      root.classList.remove("js-motion");
      document.querySelectorAll<HTMLElement>("[data-sheen]").forEach((el) => el.classList.add("is-lit"));
      return;
    }

    const ctx = gsap.context(() => {
      const vh = window.innerHeight;
      const inView = (el: Element) => el.getBoundingClientRect().top < vh * 0.92;

      gsap.utils.toArray<HTMLElement>('[data-reveal="title"]').forEach((el) => {
        splitTitle(el);
        const words = el.querySelectorAll(".reveal-line > span");
        gsap.set(el, { opacity: 1 });
        gsap.from(words, {
          yPercent: 110,
          rotate: 2,
          duration: 1.15,
          ease: "expo.out",
          stagger: 0.045,
          delay: inView(el) ? 0.15 : 0,
          scrollTrigger: inView(el) ? undefined : { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: inView(el) ? 0.35 : 0,
            scrollTrigger: inView(el) ? undefined : { trigger: el, start: "top 90%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
        gsap.set(el, { opacity: 1 });
        gsap.fromTo(
          el.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
            delay: inView(el) ? 0.3 : 0,
            scrollTrigger: inView(el) ? undefined : { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="clip"]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 1, clipPath: "inset(18% 12% 18% 12% round 24px)", scale: 1.04 },
          {
            clipPath: "inset(0% 0% 0% 0% round 18px)",
            scale: 1,
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: inView(el) ? undefined : { trigger: el, start: "top 85%", once: true },
            clearProps: "clipPath,transform",
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "0.15");
        gsap.fromTo(
          el,
          { yPercent: -amount * 50 },
          {
            yPercent: amount * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
        const vertical = el.dataset.draw === "y";
        gsap.fromTo(
          el,
          vertical ? { scaleY: 0 } : { scaleX: 0 },
          {
            ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
            transformOrigin: vertical ? "top center" : "left center",
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-sheen]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => el.classList.add("is-lit"),
        });
      });
    });

    root.classList.add("motion-ready");
    // imagens que carregam depois mudam a altura da página
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
