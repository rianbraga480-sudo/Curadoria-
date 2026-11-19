"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ChromeVariant } from "./ChromeScene";

const ChromeScene = dynamic(() => import("./ChromeScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Palco do objeto 3D. Mostra primeiro uma versão em CSS (leve, sem bloquear
 * o carregamento) e troca pelo WebGL quando o navegador estiver ocioso.
 * Sem WebGL, a versão em CSS permanece.
 */
export function ChromeStage({ variant = "sphere", className = "" }: { variant?: ChromeVariant; className?: string }) {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasWebGL()) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const start = () => setLoad(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 1800 });
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(start, 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {variant === "sphere" ? (
        <div
          className={`chrome-orb absolute inset-[9%] transition-opacity duration-[1400ms] ${ready ? "opacity-0" : "opacity-100"}`}
        />
      ) : (
        <div
          className={`absolute inset-[16%] rounded-full border-[6px] border-white/25 shadow-[0_0_60px_rgba(255,255,255,.15)] transition-opacity duration-1000 [transform:rotateX(64deg)] ${ready ? "opacity-0" : "opacity-100"}`}
        />
      )}
      {load && (
        <ChromeScene
          variant={variant}
          onReady={() => setReady(true)}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ${ready ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
