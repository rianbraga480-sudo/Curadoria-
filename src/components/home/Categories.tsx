import Link from "next/link";
import type { Category } from "@/lib/schema";
import { SectionHeading } from "@/components/ui/Section";
import { ArrowUpRight } from "@/components/ui/icons";

type Cat = Category & { count: number; tools: string[] };

export function Categories({ categories }: { categories: Cat[] }) {
  return (
    <section id="categorias" aria-labelledby="cat-title" className="relative border-t border-white/[0.06] py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          id="cat-title"
          index="03"
          eyebrow="Categorias"
          title={
            <>
              Descubra por <span className="chrome-text">necessidade.</span>
            </>
          }
          intro="As categorias são geradas a partir das ferramentas publicadas. Só aparecem aqui as que já têm ferramentas analisadas."
        />
        <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {categories.map((c, i) => (
            <li key={c.slug}>
              <Link
                href={`/ferramentas/?categoria=${c.slug}`}
                className="surface group flex h-full min-h-56 flex-col p-7"
                data-ev="categoria_click"
                data-pos={c.slug}
              >
                <div className="flex items-start justify-between">
                  <span className="mono text-[0.7rem] tracking-[0.2em] text-metal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="grid size-10 place-items-center rounded-full border border-white/10 text-silver transition duration-500 group-hover:rotate-45 group-hover:border-white/40 group-hover:text-snow">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <span aria-hidden="true" className="chrome-text mt-4 font-display text-6xl font-semibold tracking-tight opacity-90">
                  {c.code}
                </span>
                <h3 className="mt-auto pt-6 text-2xl font-medium">{c.name}</h3>
                <p className="mt-2 text-sm text-fog">{c.description}</p>
                <p className="mono mt-4 text-[0.68rem] tracking-[0.12em] text-metal uppercase">
                  {c.count} {c.count === 1 ? "ferramenta" : "ferramentas"} · {c.tools.join(", ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
