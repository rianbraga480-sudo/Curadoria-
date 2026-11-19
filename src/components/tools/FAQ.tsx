import { Plus } from "@/components/ui/icons";

/** Acordeões acessíveis com <details>: funcionam sem JS e são indexáveis. */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {items.map((f) => (
        <details key={f.q} className="faq-item group">
          <summary className="flex items-center justify-between gap-6 py-6 text-left font-display text-lg text-snow transition-colors hover:text-white md:text-xl">
            <span>{f.q}</span>
            <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-silver">
              <Plus size={16} />
            </span>
          </summary>
          <p className="max-w-3xl pb-7 text-[1rem] leading-relaxed text-fog">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
