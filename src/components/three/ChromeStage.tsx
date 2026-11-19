"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ChromeVariant } from "./ChromeScene";

const ChromeScene = dynamic(() => import("./ChromeScene"), { ssr: false });

const IMAGES: Record<ChromeVariant, { src: string; w: number; h: number; box: string }> = {
  // posição da imagem dentro do quadro, igual ao enquadramento da câmera 3D
  sphere: { src: "/img/brand/chrome-sphere.webp", w: 578, h: 578, box: "top-[13%] left-[13%] w-[74%]" },
  ring: { src: "/img/brand/chrome-ring.webp", w: 696, h: 846, box: "top-[8%] left-[21%] w-[58%]" },
};

/**
 * Decide se vale a pena usar WebGL:
 * - não no celular/tablet (toque), em telas estreitas ou com economia de dados;
 * - não quando o navegador renderiza 3D por software (sem GPU), que trava a página.
 * Nesses casos fica a imagem do próprio objeto 3D, com um movimento leve em CSS.
 */
function canUseWebGL() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return false;
  if (window.innerWidth < 900) return false;
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

/**
 * Palco do objeto cromado. Começa com a imagem real do objeto (leve, sem
 * bloquear o carregamento) e, em computadores com GPU, troca pelo WebGL
 * interativo quando o navegador fica ocioso.
 */
export function ChromeStage({ variant = "sphere", className = "" }: { variant?: ChromeVariant; className?: string }) {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const img = IMAGES[variant];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const force = new URLSearchParams(location.search).has("webgl"); // ?webgl força o 3D (testes)
    if (reduce || (!force && !canUseWebGL())) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const start = () => setLoad(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(start, 1200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <img
        src={img.src}
        alt=""
        width={img.w}
        height={img.h}
        decoding="async"
        loading={variant === "sphere" ? "eager" : "lazy"}
        fetchPriority={variant === "sphere" ? "high" : "low"}
        className={`absolute h-auto ${img.box} transition-opacity duration-[1400ms] ${ready ? "opacity-0" : "opacity-100"}`}
        style={{ animation: "sphere-float 9s ease-in-out infinite" }}
      />
      {load && (
        <ChromeScene
          variant={variant}
          onReady={() => setReady(true)}
          onSlow={() => {
            setReady(false);
            window.setTimeout(() => setLoad(false), 1400);
          }}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ${ready ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
