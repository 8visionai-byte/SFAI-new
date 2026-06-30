import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Logo — OFICJALNY render Pawła z USUNIĘTYM tłem (przezroczyste PNG).
 *
 * Pliki w public/brand/ powstały z renderów Pawła; białe tło zostało wycięte
 * (flood-fill od krawędzi + erozja anty-halo, skrypt _zespol/key-logo.js), więc
 * logo ma prawdziwą alfę i SIADA CZYSTO na dowolnym tle (zero brzydkiego prostokąta).
 *   - logo-header-t.png 2172x724 — poziomy lockup (znak cyrkla + „SimpleFast.ai").
 *   - mark-t.png        1254x1254 — sam znak (cyrkiel+SF), do faviconu/wąskich miejsc.
 *   - logo-vertical.png 1145x1155 — render pionowy (ciemne tło) do dużych sekcji.
 *
 * CYTOWALNOŚĆ (#1 GEO): obraz to dekoracja; etykietę niesie `alt`/`aria-label`,
 * a nazwa marki żyje też jako prawdziwy tekst w treści. next/image optymalizuje
 * (avif/webp) do realnego rozmiaru w nagłówku, więc źródłowy PNG nie ciąży CWV.
 */

const LABEL = 'SimpleFast.ai';

type RenderVariant = 'full' | 'mark' | 'vertical';

const RENDERS: Record<RenderVariant, { src: string; width: number; height: number }> = {
  full: { src: '/brand/logo-header-t.png', width: 2172, height: 724 },
  mark: { src: '/brand/mark-t.png', width: 1254, height: 1254 },
  vertical: { src: '/brand/logo-vertical.png', width: 1145, height: 1155 },
};

/**
 * LogoImage — sam obraz logo (bez linku). Do użycia dekoracyjnego poza nagłówkiem
 * (np. sekcja symboliki /o-nas). `decorative` => aria-hidden; inaczej alt = marka.
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
      // LCP: logo w nagłówku jest elementem LCP na mobile. `priority` daje preload,
      // ale Next 15.5 nie dokłada fetchpriority=high — dodajemy jawnie, by przeglądarka
      // pobrała logo PRZED resztą (PageSpeed: "preload powinien mieć fetchpriority=high").
      fetchPriority={priority ? 'high' : undefined}
      sizes={sizes}
      className={className}
    />
  );
}

/**
 * Logo — przezroczysty poziomy lockup w linku do strony głównej (nagłówek/stopka).
 * Wariant 'mark' = sam znak (kwadrat) do bardzo wąskich miejsc.
 */
export function Logo({
  className,
  variant = 'full',
  priority = false,
}: {
  className?: string;
  variant?: RenderVariant;
  priority?: boolean;
}) {
  const isMark = variant === 'mark';
  return (
    <Link
      href="/"
      aria-label={`${LABEL} — strona główna`}
      className={cn('inline-flex items-center', className)}
    >
      <LogoImage
        variant={isMark ? 'mark' : 'full'}
        priority={priority}
        // WYDAJNOŚĆ: bez `sizes` next/image serwował logo w 3840px (~55 KiB) na realne
        // ~170px w nagłówku. Podpowiadamy faktyczną szerokość renderu → ~256-384px (~8 KiB).
        sizes={isMark ? '40px' : '(min-width: 640px) 170px, 135px'}
        className={
          isMark
            ? 'h-[34px] w-[34px] sm:h-[40px] sm:w-[40px]'
            : 'h-[44px] w-auto sm:h-[56px]'
        }
      />
    </Link>
  );
}
