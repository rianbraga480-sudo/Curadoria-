"use client";

import { useEffect, useState } from "react";

/** Barra fixa do celular: aparece depois do herói e some quando os planos estão na tela. */
export function MobileBar({ priceLabel, note, slug }: { priceLabel: string; note: string; slug: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const targets = ["#planos", "#oferta-final", "#hero-produto"]
      .map((s) => document.querySelector(s))
      .filter(Boolean) as Element[];
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
        setShow(seen.size === 0);
      },
      { threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-2xl border border-white/15 bg-ink/90 p-3 pl-5 shadow-[0_20px_60px_rgba(0,0,0,.8)] backdrop-blur-xl transition-transform duration-500 md:hidden ${
        show ? "translate-y-0" : "translate-y-[150%]"
      }`}
      aria-hidden={!show}
    >
      <p className="mr-auto leading-tight">
        <span className="mono block text-[0.6rem] tracking-[0.14em] text-metal uppercase">{note}</span>
        <span className="font-display text-lg text-snow">{priceLabel}</span>
      </p>
      <a
        href="#planos"
        tabIndex={show ? 0 : -1}
        className="btn btn-chrome btn-sm"
        data-ev="cta_click"
        data-prod={slug}
        data-pos="barra-fixa"
      >
        Ver planos
      </a>
    </div>
  );
}
