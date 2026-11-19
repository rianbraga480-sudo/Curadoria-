"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CompareEntry } from "@/lib/tools";
import { ToolLogo } from "@/components/tools/ToolLogo";
import { Alert, ArrowRight, Check, Columns } from "@/components/ui/icons";

const MAX = 3;

/**
 * Seleção para comparação. Regra editorial: só ferramentas do mesmo grupo de
 * objetivo entram lado a lado; as demais ficam desativadas, com o motivo.
 */
export function CompareClient({ entries }: { entries: CompareEntry[] }) {
  // A seleção vem da URL (?ferramentas=a,b). Lida após a hidratação, para que o
  // HTML estático já traga o seletor completo (sem salto de layout).
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    const read = () =>
      setSelected(
        (new URLSearchParams(location.search).get("ferramentas") ?? "")
          .split(",")
          .filter((s) => entries.some((e) => e.slug === s))
          .slice(0, MAX),
      );
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [entries]);

  const chosen = selected.map((s) => entries.find((e) => e.slug === s)!).filter(Boolean);
  const group = chosen[0]?.group;

  // descarta seleções de grupos diferentes vindas da URL
  const valid = chosen.filter((c) => c.group === group);

  const update = (next: string[]) => {
    setSelected(next);
    const qs = next.length ? `?ferramentas=${next.join(",")}` : "";
    window.history.replaceState(window.history.state, "", `${location.pathname}${qs}`);
  };

  const toggle = (slug: string) => {
    if (selected.includes(slug)) update(selected.filter((s) => s !== slug));
    else if (valid.length < MAX) update([...valid.map((v) => v.slug), slug]);
  };

  const groups = useMemo(() => {
    const map = new Map<string, CompareEntry[]>();
    entries.forEach((e) => map.set(e.group, [...(map.get(e.group) ?? []), e]));
    return [...map.entries()];
  }, [entries]);

  const labels = valid[0]?.rows.map((r) => r.label) ?? [];

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map(([g, list]) => {
          const disabledGroup = !!group && g !== group;
          return (
            <fieldset key={g} className={`surface p-6 md:p-8 transition-opacity ${disabledGroup ? "opacity-45" : ""}`}>
              <legend className="sr-only">{list[0]!.groupName}</legend>
              <p className="mono text-[0.65rem] tracking-[0.18em] text-metal uppercase">Objetivo</p>
              <h2 className="mt-2 text-xl font-medium">{list[0]!.groupName}</h2>
              <p className="mono mt-1 text-[0.68rem] text-fog">
                {list.length} {list.length === 1 ? "ferramenta analisada" : "ferramentas analisadas"}
              </p>
              <ul className="mt-6 space-y-2">
                {list.map((e) => {
                  const on = selected.includes(e.slug);
                  return (
                    <li key={e.slug}>
                      <button
                        type="button"
                        aria-pressed={on}
                        disabled={disabledGroup}
                        onClick={() => toggle(e.slug)}
                        className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-colors ${
                          on ? "border-white/60 bg-white/[0.07]" : "border-white/10 hover:border-white/30"
                        } disabled:cursor-not-allowed`}
                      >
                        <ToolLogo tool={e} size={40} />
                        <span className="mr-auto font-display text-lg text-snow">{e.name}</span>
                        <span className={`grid size-6 place-items-center rounded-full border ${on ? "border-snow bg-snow text-obsidian" : "border-white/25"}`}>
                          {on && <Check size={13} />}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {disabledGroup && (
                <p className="mt-4 flex items-start gap-2 text-xs text-fog">
                  <Alert size={14} className="mt-0.5 shrink-0" /> Objetivo diferente da seleção atual: não comparamos ferramentas
                  que resolvem problemas diferentes.
                </p>
              )}
            </fieldset>
          );
        })}
      </div>

      <div className="mt-10" aria-live="polite">
        {valid.length === 0 && (
          <p className="flex items-center gap-3 text-fog">
            <Columns size={18} /> Selecione uma ferramenta acima para começar a comparação.
          </p>
        )}

        {valid.length === 1 && (
          <div className="surface p-7 md:p-10">
            <h2 className="text-2xl font-medium">Ainda não há outra ferramenta com o mesmo objetivo</h2>
            <p className="mt-3 max-w-2xl text-fog">
              O {valid[0]!.name} é, por enquanto, a única ferramenta analisada no grupo “{valid[0]!.groupName}”. Assim que
              outra ferramenta comparável for publicada, ela aparece aqui lado a lado. Enquanto isso, veja a ficha completa
              e a comparação entre os planos.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/ferramentas/${valid[0]!.slug}/`} className="btn btn-chrome btn-sm">
                Ver a ficha do {valid[0]!.name} <ArrowRight size={13} className="arrow" />
              </Link>
              <Link href={`/ferramentas/${valid[0]!.slug}/#planos`} className="btn btn-ghost btn-sm">
                Comparar os planos
              </Link>
            </div>
          </div>
        )}

        {valid.length >= 2 && (
          <div className="surface table-scroll p-3 md:p-6" data-lenis-prevent>
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">Comparação entre {valid.map((v) => v.name).join(", ")}</caption>
              <thead>
                <tr className="border-b border-white/15">
                  <th scope="col" className="w-48 py-4 pr-4 align-bottom">
                    <span className="mono text-[0.62rem] font-normal tracking-[0.16em] text-metal uppercase">Critério</span>
                  </th>
                  {valid.map((v) => (
                    <th key={v.slug} scope="col" className="py-4 pr-4 align-bottom">
                      <div className="flex items-center gap-3">
                        <ToolLogo tool={v} size={36} />
                        <span className="font-display text-lg font-medium text-snow">{v.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {labels.map((label, i) => (
                  <tr key={label} className="border-b border-white/[0.06] align-top">
                    <th scope="row" className="py-4 pr-4 font-normal text-fog">{label}</th>
                    {valid.map((v) => {
                      const val = v.rows[i]!.value;
                      return (
                        <td key={v.slug} className="py-4 pr-4 text-silver">
                          {Array.isArray(val) ? (
                            <ul className="space-y-1">
                              {val.map((x) => <li key={x}>{x}</li>)}
                            </ul>
                          ) : (
                            val
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td />
                  {valid.map((v) => (
                    <td key={v.slug} className="py-5 pr-4">
                      <Link href={`/ferramentas/${v.slug}/`} className="btn btn-ghost btn-sm">Ver ficha completa</Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
