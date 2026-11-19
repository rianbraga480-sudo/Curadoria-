import type { ToolImage } from "@/lib/schema";
import { formatDate } from "@/lib/format";

type Props = {
  image: ToolImage;
  /** carrega antes (imagem acima da dobra) */
  priority?: boolean;
  sizes?: string;
  /** mostra a legenda com a fonte da imagem */
  showCaption?: boolean;
  className?: string;
  /** permite ampliar (lightbox) */
  zoomable?: boolean;
  /** barra de navegador decorativa no topo da moldura */
  chrome?: boolean;
};

/** Captura de tela real em moldura premium, com legenda de procedência. */
export function Screenshot({ image, priority, sizes = "(min-width: 1024px) 50vw, 100vw", showCaption = true, className = "", zoomable = true, chrome = true }: Props) {
  const srcSet = image.srcSmall ? `${image.srcSmall} 800w, ${image.src} ${image.width}w` : undefined;
  const body = (
    <img
      src={image.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className="block h-auto w-full"
    />
  );
  return (
    <figure className={className}>
      <div className="frame">
        <div className="frame-inner">
          {chrome && (
            <div className="frame-bar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          )}
          {zoomable ? (
            <a
              href={image.src}
              className="group relative block"
              data-zoom
              data-w={image.width}
              data-h={image.height}
              data-cap={image.caption ?? image.alt}
              aria-label={`Ampliar: ${image.alt}`}
            >
              {body}
              <span className="mono pointer-events-none absolute right-3 bottom-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[0.65rem] tracking-[0.14em] text-snow uppercase opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                Ampliar
              </span>
            </a>
          ) : (
            body
          )}
        </div>
      </div>
      {showCaption && (image.caption || image.checkedAt) && (
        <figcaption className="mono mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] tracking-[0.06em] text-metal">
          <span>{image.source === "oficial" ? "Tela real · site oficial" : "Ilustração da Curadoria"}</span>
          {image.caption && <span className="text-fog">{image.caption}</span>}
          {image.checkedAt && <span>conferida em {formatDate(image.checkedAt)}</span>}
        </figcaption>
      )}
    </figure>
  );
}
