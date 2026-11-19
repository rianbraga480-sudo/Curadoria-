import type { NextConfig } from "next";

/**
 * Exportação 100% estática: o build gera a pasta `out/`, publicada na Netlify
 * como o site atual (sem servidor, sem função, sem custo extra).
 * `trailingSlash` mantém o padrão de URLs já indexado (/sobre/, /termos/ ...).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
