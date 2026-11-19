import { useId } from "react";

/**
 * Marca BLACK CHROME: esfera cromada atravessada por três sulcos
 * (eco do objeto 3D do herói) + logotipo tipográfico espaçado.
 */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}b`} cx="35%" cy="28%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#bdbdbd" />
          <stop offset="0.7" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#0b0b0b" />
        </radialGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#050505" />
          <stop offset="1" stopColor="#1a1a1a" />
        </linearGradient>
        <clipPath id={`${id}c`}>
          <circle cx="32" cy="32" r="28" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="28" fill={`url(#${id}b)`} />
      <g clipPath={`url(#${id}c)`} fill="none" strokeLinecap="round">
        <path d="M-2 26c14-10 34-14 70-4" stroke={`url(#${id}s)`} strokeWidth="4.2" />
        <path d="M-2 38c18-10 40-12 70-2" stroke={`url(#${id}s)`} strokeWidth="4.2" />
        <path d="M-2 50c20-8 42-8 70 0" stroke={`url(#${id}s)`} strokeWidth="4.2" />
        <path d="M-2 24c14-10 34-14 70-4" stroke="rgba(255,255,255,.55)" strokeWidth="0.8" />
        <path d="M-2 36c18-10 40-12 70-2" stroke="rgba(255,255,255,.45)" strokeWidth="0.8" />
      </g>
      <circle cx="32" cy="32" r="27.5" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark size={30} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-semibold tracking-[0.18em] text-snow">CURADORIA</span>{" "}
          <span className="mono mt-1 text-[0.58rem] tracking-[0.42em] text-fog">DIGITAL</span>
        </span>
      )}
    </span>
  );
}
