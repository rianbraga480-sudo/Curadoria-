"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight, Cross, Instagram, Menu } from "@/components/ui/icons";
import { getLenis } from "@/components/motion/MotionRoot";
import { site } from "@/content/site";

export const NAV = [
  { href: "/", label: "Início" },
  { href: "/ferramentas/", label: "Ferramentas" },
  { href: "/#categorias", label: "Categorias" },
  { href: "/sobre/", label: "Sobre" },
] as const;

const MENU_EXTRA = [
  { href: "/comparar/", label: "Comparar" },
  { href: "/contato/", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 16);
      // esconde ao descer, mostra ao subir
      setHidden(y > 480 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      getLenis()?.stop();
      root.style.overflow = "hidden";
      panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    } else {
      getLenis()?.start();
      root.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <a
        href="#conteudo"
        className="btn btn-chrome btn-sm fixed top-3 left-3 z-[80] -translate-y-24 focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-700 ease-[var(--ease-chrome)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid || open ? "border-b border-white/[0.07] bg-obsidian/70 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center gap-6">
          <Link href="/" className="relative z-10 mr-auto">
            <Logo />
            <span className="sr-only"> — página inicial</span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1 backdrop-blur">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 text-[0.82rem] transition-colors duration-300 ${
                      isActive(item.href) ? "bg-white/[0.08] text-snow" : "text-fog hover:text-snow"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/ferramentas/" className="btn btn-chrome btn-sm hidden md:inline-flex" data-ev="cta_click" data-pos="topo">
            Explorar ferramentas
            <ArrowRight size={14} className="arrow" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 grid size-11 place-items-center rounded-full border border-white/15 text-snow lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Cross size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-obsidian/95 pt-[calc(var(--header-h)+1.5rem)] backdrop-blur-2xl lg:hidden"
      >
        <nav aria-label="Menu do celular" className="container-x flex h-full flex-col pb-10">
          <ul className="flex flex-col">
            {[...NAV, ...MENU_EXTRA].map((item, i) => (
              <li key={item.href} className="border-b border-white/[0.07]">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-display text-[2rem] font-medium tracking-tight text-snow"
                >
                  <span className="mono text-xs text-metal">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3">
            <Link href="/ferramentas/" onClick={() => setOpen(false)} className="btn btn-chrome" data-ev="cta_click" data-pos="menu">
              Explorar ferramentas
              <ArrowRight size={14} className="arrow" />
            </Link>
            <a href={site.instagram.url} className="btn btn-ghost" rel="noopener" target="_blank" data-ev="instagram_click" data-pos="menu">
              <Instagram size={16} /> {site.instagram.handle}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
