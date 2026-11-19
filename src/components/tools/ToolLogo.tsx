import type { Tool } from "@/lib/schema";

/**
 * Logotipo oficial quando disponível; caso contrário, um monograma cromado
 * (nunca um logotipo inventado).
 */
export function ToolLogo({ tool, size = 48, className = "" }: { tool: Pick<Tool, "logo" | "monogram" | "name">; size?: number; className?: string }) {
  if (tool.logo) {
    return (
      <img
        src={tool.logo.src}
        width={size}
        height={size}
        alt={tool.logo.alt}
        loading="lazy"
        decoding="async"
        className={`shrink-0 rounded-[28%] ring-1 ring-white/15 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label={`Monograma de ${tool.name}`}
      className={`relative grid shrink-0 place-items-center rounded-[28%] bg-gradient-to-b from-[#2a2a2a] to-[#0c0c0c] ring-1 ring-white/15 ${className}`}
      style={{ width: size, height: size, boxShadow: "inset 0 1px 0 rgba(255,255,255,.18)" }}
    >
      <span className="chrome-text font-display font-semibold" style={{ fontSize: size * 0.5, lineHeight: 1 }}>
        {tool.monogram}
      </span>
    </span>
  );
}
