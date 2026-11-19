import type { ReactNode } from "react";

type HeadingProps = {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

/** Cabeçalho de seção editorial: índice mono, eyebrow, título grande e introdução. */
export function SectionHeading({ eyebrow, index, title, intro, align = "left", as = "h2", className = "", id }: HeadingProps) {
  const Tag = as;
  const center = align === "center";
  return (
    <header className={`${center ? "mx-auto text-center" : ""} max-w-4xl ${className}`}>
      {(eyebrow || index) && (
        <p className={`eyebrow mb-6 ${center ? "justify-center" : ""}`} data-reveal="fade">
          {index && <span className="text-silver">{index}</span>}
          {eyebrow}
        </p>
      )}
      <Tag id={id} className="text-[clamp(2.1rem,5.4vw,4.6rem)] font-medium" data-reveal="title">
        {title}
      </Tag>
      {intro && (
        <div
          className={`mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-fog md:text-lg ${center ? "mx-auto" : ""}`}
          data-reveal="fade"
        >
          {intro}
        </div>
      )}
    </header>
  );
}

export function Section({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-24 md:py-36 ${className}`}>
      {children}
    </section>
  );
}
