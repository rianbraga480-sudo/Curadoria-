"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ToolSummary } from "@/lib/tools";
import { ToolCard } from "@/components/tools/ToolCard";
import { Search, Cross } from "@/components/ui/icons";

type Cat = { slug: string; name: string; count: number };
type Sort = "curadoria" | "nome" | "preco";

const SORTS: { value: Sort; label: string }[] = [
  { value: "curadoria", label: "Seleção da curadoria" },
  { value: "nome", label: "Nome (A–Z)" },
  { value: "preco", label: "Menor preço mensal" },
];

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

/** Catálogo com pesquisa, filtro por categoria e ordenação, sincronizados com a URL. */
export function CatalogClient({ tools, categories }: { tools: ToolSummary[]; categories: Cat[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const validCat = (c: string | null) => (c && categories.some((x) => x.slug === c) ? c : "");
  const validSort = (s: string | null): Sort => (SORTS.some((x) => x.value === s) ? (s as Sort) : "curadoria");

  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const [cat, setCat] = useState(() => validCat(params.get("categoria")));
  const [sort, setSort] = useState<Sort>(() => validSort(params.get("ordem")));
  const live = useRef<HTMLParagraphElement>(null);

  // links externos (ex.: categoria no rodapé) atualizam os filtros
  useEffect(() => {
    setCat(validCat(params.get("categoria")));
    setQuery(params.get("q") ?? "");
    setSort(validSort(params.get("ordem")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // mantém a URL compartilhável, sem recarregar nem rolar a página
  useEffect(() => {
    const t = window.setTimeout(() => {
      const next = new URLSearchParams();
      if (query.trim()) next.set("q", query.trim());
      if (cat) next.set("categoria", cat);
      if (sort !== "curadoria") next.set("ordem", sort);
      const qs = next.toString();
      if (qs !== params.toString()) router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    }, 250);
    return () => window.clearTimeout(t);
  }, [query, cat, sort, pathname, router, params]);

  const results = useMemo(() => {
    const q = norm(query);
    const terms = q.split(/\s+/).filter(Boolean);
    const list = tools.filter((t) => {
      if (cat && !t.categories.some((c) => c.slug === cat)) return false;
      if (!terms.length) return true;
      const hay = norm(t.keywords);
      return terms.every((term) => hay.includes(term));
    });
    return list.sort((a, b) => {
      if (sort === "nome") return a.name.localeCompare(b.name, "pt-BR");
      if (sort === "preco") return a.lowestMonthly - b.lowestMonthly;
      return a.order - b.order;
    });
  }, [tools, query, cat, sort]);

  const activeCat = categories.find((c) => c.slug === cat);
  const reset = () => {
    setQuery("");
    setCat("");
    setSort("curadoria");
  };

  return (
    <div>
      <div className="surface sticky top-[calc(var(--header-h)+0.75rem)] z-30 !rounded-2xl p-3 backdrop-blur-xl md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Pesquisar ferramenta</span>
            <Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-fog" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar por nome, recurso ou categoria"
              className="h-12 w-full rounded-xl border border-white/10 bg-obsidian/70 pr-10 pl-11 text-[0.95rem] text-snow placeholder:text-metal focus:border-white/40 focus:outline-none"
              autoComplete="off"
              enterKeyHint="search"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-fog hover:text-snow"
                aria-label="Limpar pesquisa"
              >
                <Cross size={14} />
              </button>
            )}
          </label>
          <label className="flex items-center gap-3">
            <span className="mono shrink-0 text-[0.65rem] tracking-[0.16em] text-metal uppercase">Ordenar</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-12 w-full rounded-xl border border-white/10 bg-obsidian/70 px-4 text-[0.9rem] text-snow focus:border-white/40 focus:outline-none md:w-auto"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filtrar por categoria">
          {[{ slug: "", name: "Todas", count: tools.length }, ...categories].map((c) => {
            const on = cat === c.slug;
            return (
              <button
                key={c.slug || "todas"}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(c.slug)}
                className={`mono shrink-0 rounded-full border px-4 py-2 text-[0.68rem] tracking-[0.1em] uppercase transition-colors duration-300 ${
                  on ? "border-white/70 bg-snow text-obsidian" : "border-white/12 text-silver hover:border-white/35 hover:text-snow"
                }`}
              >
                {c.name} <span className={on ? "text-obsidian/60" : "text-metal"}>{c.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p ref={live} className="mono mt-8 text-[0.72rem] tracking-[0.14em] text-fog uppercase" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? "ferramenta encontrada" : "ferramentas encontradas"}
        {activeCat ? ` em ${activeCat.name}` : ""}
        {query.trim() ? ` para “${query.trim()}”` : ""}
      </p>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((t) => (
            <li key={t.slug} className="min-w-0">
              <ToolCard tool={t} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="surface mt-6 flex flex-col items-center px-6 py-20 text-center">
          <span aria-hidden="true" className="chrome-orb mb-8 w-20 opacity-80" />
          <h2 className="text-3xl font-medium">Nenhuma ferramenta encontrada</h2>
          <p className="mt-4 max-w-md text-fog">
            Ainda não analisamos uma ferramenta com esses critérios. Tente outro termo ou veja todas as categorias.
          </p>
          <button type="button" onClick={reset} className="btn btn-chrome mt-8">
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
