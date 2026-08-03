import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * SectionImage — dekoracyjne zdjęcie sekcji (server component, zero JS klienta).
 *
 * - Opisowy `alt` = SEO obrazków (Google Images / AI cytują opis, nie plik).
 * - ZAWSZE loading="lazy" + jawne width/height (anty-CLS). Zdjęcia sekcji nigdy
 *   nie są elementem LCP (to tekst hero), więc prop `priority` jest celowo
 *   zablokowany typem (`never`) — nikt „na szybko" nie zrobi z dekoracji
 *   konkurenta LCP.
 * - Paralaksa `.sf-img-parallax` = scroll-driven (animation-timeline: view()),
 *   czyli ruch sterowany scrollem UŻYTKOWNIKA — zgodny z budżetem ruchu
 *   redesignu („reszta rusza się tylko na hover/scroll"). Starsze przeglądarki:
 *   statyczne zdjęcie (progressive enhancement, bramka @supports w globals.css).
 * - Domyślne wymiary 1400x788 = REALNE wymiary plików w /public/img (16:9);
 *   `h-auto w-full` + zgodny aspect-ratio z atrybutów = zero skoku layoutu.
 */
type SectionImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  /** Klasy na RAMKĘ (np. border-white/10 na ciemnych sekcjach). */
  className?: string;
  /** Celowo zablokowane: zdjęcia sekcji są zawsze lazy (patrz komentarz wyżej). */
  priority?: never;
};

export function SectionImage({
  src,
  alt,
  width = 1400,
  height = 788,
  sizes = '(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw',
  className,
}: SectionImageProps) {
  return (
    <div
      className={cn(
        'sf-img-frame overflow-hidden rounded-xl border border-border shadow-xs',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading="lazy"
        className="sf-img-parallax h-auto w-full object-cover"
      />
    </div>
  );
}
