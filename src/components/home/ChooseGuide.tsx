import Link from "next/link";
import type { Tool } from "@/lib/schema";
import { ToolLogo } from "@/components/tools/ToolLogo";
import { ArrowRight } from "@/components/ui/icons";

/** "Qual ferramenta é ideal para você?" — guia por necessidade, não uma tabela forçada. */
export function ChooseGuide({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2" data-reveal="stagger">
      {tools.map((t) => (
        <article key={t.slug} className="surface flex flex-col p-7 md:p-10">
          <p className="mono text-[0.7rem] tracking-[0.16em] text-metal uppercase">{t.question}</p>
          <div className="mt-6 flex items-center gap-4">
            <ToolLogo tool={t} size={44} />
            <h3 className="text-3xl font-medium">{t.name}</h3>
          </div>
          <ul className="mt-6 space-y-2 text-[0.95rem] text-fog">
            {t.audience.profiles.slice(0, 3).map((p) => (
              <li key={p.title} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-silver" />
                {p.title}
              </li>
            ))}
          </ul>
          <Link
            href={`/ferramentas/${t.slug}/`}
            className="btn btn-ghost mt-8 self-start"
            data-ev="cta_click"
            data-prod={t.slug}
            data-pos="qual-escolher"
          >
            Conhecer o {t.name} <ArrowRight size={14} className="arrow" />
          </Link>
        </article>
      ))}
    </div>
  );
}
