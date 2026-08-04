import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * SectionImage — PŁYTA ze zdjęciem (server component, zero JS klienta).
 *
 * Ciemne zdjęcie NIGDY nie dostaje jasnej kreski wokół: 1px kredowej ramki i
 * cień o kryciu 6% wokół prawie czarnego kadru to placeholder wideo z szablonu.
 * Kadr leży teraz na PŁYCIE (navy-950, krawędź światła od wewnątrz, dwuwarstwowy
 * cień granatowy) i rozpływa się w niej — patrz .sf-plate w globals.css.
 *
 * - Opisowy `alt` = SEO obrazków (Google Images / AI cytują opis, nie plik).
 *   Kopiować 1:1 z miejsca wywołania, nigdy nie przepisywać.
 * - ZAWSZE loading="lazy" + jawne width/height (anty-CLS). Zdjęcia sekcji nigdy
 *   nie są elementem LCP (to tekst hero), więc prop `priority` jest celowo
 *   zablokowany typem (`never`) — nikt „na szybko" nie zrobi z dekoracji
 *   konkurenta LCP. To zabezpieczenie, nie ozdoba.
 * - Zero CLS: aspect-ratio roli (albo min-height przy roli `auto`) rezerwuje
 *   pudełko, ZANIM plik się pobierze.
 * - Paralaksa `.sf-img-parallax` siedzi na WRAPPERZE mediów, hover na <img>.
 *   Dopóki oba leżały na <img>, animacja CSS biła zwykłą deklarację i hover po
 *   cichu nie działał (zero ostrzeżeń w konsoli).
 * - `children` = treść NA zdjęciu: włącza scrim i data-theme="dark", więc
 *   kontrast gwarantują TOKENY SEMANTYCZNE, a nie ręcznie dobrane kolory.
 * - Domyślne wymiary 1400x788 = REALNE wymiary plików w /public/img (16:9).
 */
type Ratio = 'auto' | 'wide' | 'panorama' | 'cinema' | 'ribbon' | 'square' | 'portrait';

const RATIO: Record<Ratio, string> = {
  auto: 'min-h-[26rem]',
  wide: 'aspect-[16/9]',
  panorama: 'aspect-[21/9]',
  cinema: 'aspect-[12/5]',
  ribbon: 'aspect-[4/1]',
  square: 'aspect-[1/1]',
  portrait: 'aspect-[4/5]',
};

const RATIO_MD: Record<Ratio, string> = {
  auto: 'md:min-h-[30rem] md:aspect-auto',
  wide: 'md:aspect-[16/9]',
  panorama: 'md:aspect-[21/9]',
  cinema: 'md:aspect-[12/5]',
  ribbon: 'md:aspect-[4/1]',
  square: 'md:aspect-[1/1]',
  portrait: 'md:aspect-[4/5]',
};

type SectionImageProps = {
  src: string;
  /** SEO obrazków — kopiować 1:1, nigdy nie przepisywać. */
  alt: string;
  /** Rola kadru na mobile. */
  ratio?: Ratio;
  /** Rola kadru od 768px. */
  ratioMd?: Ratio;
  /** object-position, np. '76% 50%' — środek uwagi kadru. */
  focus?: string;
  /** `light` TYLKO dla pliku, który sam jest niemal biały. */
  tone?: 'dark' | 'light';
  /** Duotone marki — TYLKO bursztynowy plik (naprawa palety, nie ozdoba). */
  brand?: boolean;
  hover?: boolean;
  /** Treść NA zdjęciu -> włącza scrim + data-theme="dark". */
  children?: React.ReactNode;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  /** Celowo zablokowane: zdjęcia sekcji są zawsze lazy (patrz komentarz wyżej). */
  priority?: never;
};

export function SectionImage({
  src,
  alt,
  ratio = 'wide',
  ratioMd,
  focus,
  tone = 'dark',
  brand = false,
  hover = false,
  children,
  sizes = '(min-width: 1240px) 1200px, 100vw',
  className,
  width = 1400,
  height = 788,
}: SectionImageProps) {
  return (
    <div
      data-theme={children ? 'dark' : undefined}
      className={cn(
        'sf-plate',
        RATIO[ratio],
        ratioMd && RATIO_MD[ratioMd],
        tone === 'light' && 'sf-plate-light',
        brand && 'sf-plate-brand',
        hover && 'sf-plate-hover',
        children ? 'sf-plate-scrim' : undefined,
        className
      )}
    >
      <div className="sf-plate-media sf-img-parallax">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading="lazy"
          style={focus ? { objectPosition: focus } : undefined}
        />
      </div>
      {children ? <div className="sf-plate-content">{children}</div> : null}
    </div>
  );
}
