import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Logo — nazwa marki w dwóch postaciach:
 *
 *  1) NAGŁÓWEK / STOPKA  -> `Logo` = CZYSTY WORDMARK (prawdziwy tekst „SimpleFast.ai"
 *     w gradiencie marki, background-clip:text). Przezroczyste tło, ostry na każdym
 *     ekranie, skalowalny, dostępny i CYTOWALNY (boty czytają tekst, nie piksele).
 *     Świeci na ciemnym pasku jak w referencji (niebieski -> fiolet -> zielony).
 *
 *  2) DUŻE KONTEKSTY  -> `LogoImage` = OFICJALNY render 3D (public/brand/*.png).
 *     Render ma CIEMNE, nieprzezroczyste tło, więc nadaje się TYLKO do dużych miejsc
 *     na ciemnym tle (og:image, hero, sekcja symboliki /o-nas), gdzie wygląda
 *     świetnie. W małym nagłówku robił się brzydkim prostokątem — dlatego NIE tam.
 */

const LABEL = 'SimpleFast.ai';

type RenderVariant = 'full' | 'mark' | 'vertical';

// Oficjalny render (DUŻE konteksty). Naturalne proporcje; next/image skaluje przez CSS.
const RENDERS: Record<RenderVariant, { src: string; width: number; height: number }> = {
  full: { src: '/brand/header.png', width: 1800, height: 560 },
  mark: { src: '/brand/favicon-256.png', width: 256, height: 256 },
  vertical: { src: '/brand/logo-vertical.png', width: 1145, height: 1155 },
};

/**
 * LogoImage — sam render 3D (bez linku). Do og/hero/sekcji symboliki na CIEMNYM tle.
 * `decorative` => aria-hidden (etykietę niesie tekst obok); inaczej alt = nazwa marki.
 */
export function LogoImage({
  variant = 'full',
  className,
  decorative = false,
  priority = false,
  sizes,
}: {
  variant?: RenderVariant;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const { src, width, height } = RENDERS[variant];
  return (
    <Image
      src={src}
      alt={decorative ? '' : LABEL}
      aria-hidden={decorative ? true : undefined}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

/**
 * Logo — CZYSTY WORDMARK do nagłówka/stopki. Tekst „SimpleFast.ai" w gradiencie marki.
 * `.text-metal` = gradient #007BFF -> #7A35FF (62%) -> #63F000 z fallbackiem solidnego
 * koloru (AA) gdy clip-text niewspierany. Litera po literze: Simple=niebieski,
 * Fast=fiolet, .ai=zielony (jak w brandbooku).
 */
export function Logo({
  className,
}: {
  className?: string;
  /** Akceptowane dla zgodności wstecznej (wordmark to tekst — nieużywane). */
  priority?: boolean;
  variant?: RenderVariant;
}) {
  return (
    <Link
      href="/"
      aria-label={`${LABEL} — strona główna`}
      className={cn('inline-flex items-center', className)}
    >
      <span className="text-metal font-sans text-[1.3rem] font-extrabold leading-none tracking-[-0.03em] sm:text-[1.5rem]">
        SimpleFast.ai
      </span>
    </Link>
  );
}
