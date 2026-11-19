"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "./MotionRoot";

type Shot = { src: string; w: number; h: number; cap: string; alt: string };

/**
 * Ampliação de capturas de tela. Qualquer <a data-zoom> do site abre aqui.
 * Sem JS, o link simplesmente abre a imagem em tamanho real.
 */
export function Lightbox() {
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [shot, setShot] = useState<Shot | null>(null);
  const [fit, setFit] = useState(true);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-zoom]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      opener.current = a;
      const img = a.querySelector("img");
      setShot({
        src: a.getAttribute("href") ?? "",
        w: Number(a.dataset.w) || 1200,
        h: Number(a.dataset.h) || 800,
        cap: a.dataset.cap ?? "",
        alt: img?.alt ?? "",
      });
      setFit(window.innerWidth >= 900);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const d = dlg.current;
    if (!d || !shot) return;
    if (!d.open) d.showModal();
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
  }, [shot]);

  const close = () => dlg.current?.close();

  return (
    <dialog
      ref={dlg}
      aria-label="Tela ampliada"
      onClose={() => {
        getLenis()?.start();
        document.documentElement.style.overflow = "";
        setShot(null);
        opener.current?.focus({ preventScroll: true });
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/90 p-0 text-snow backdrop:bg-black/80 backdrop:backdrop-blur-sm open:flex open:flex-col"
    >
      {shot && (
        <>
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 md:px-6">
            <p className="mono mr-auto line-clamp-1 text-xs tracking-wide text-silver">{shot.cap}</p>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFit((f) => !f)}>
              {fit ? "Tamanho real" : "Ajustar à tela"}
            </button>
            <button type="button" className="btn btn-chrome btn-sm" onClick={close} autoFocus>
              Fechar
            </button>
          </div>
          {!fit && <p className="mono px-4 pt-2 text-[0.65rem] tracking-wider text-fog uppercase md:hidden">Arraste para ver a tela inteira</p>}
          <div
            className={`flex-1 overflow-auto p-4 md:p-8 ${fit ? "grid place-items-center" : ""}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            data-lenis-prevent
          >
            <img
              src={shot.src}
              width={shot.w}
              height={shot.h}
              alt={shot.alt}
              decoding="async"
              className={fit ? "max-h-full w-auto max-w-full rounded-lg object-contain" : "max-w-none rounded-lg"}
              style={fit ? { maxHeight: "calc(100dvh - 8rem)" } : { width: shot.w }}
            />
          </div>
        </>
      )}
    </dialog>
  );
}
