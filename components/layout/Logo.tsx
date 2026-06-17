import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Logo — OFICJALNY render marki (brandbook Pawła), nie własny rysunek zespołu.
 *
 * DLACZEGO RENDER PNG, A NIE SVG:
 * Wcześniejszy znak był odtworzony przez zespół w SVG (CompassMark) i Paweł go
 * odrzucił. Źródłem prawdy jest teraz OFICJALNY render w public/brand/:
 *   - header.png        1800x560  — znak (cyrkiel/divider „SF") + wordmark „SimpleFast.ai"
 *                                   + tagline. Render na CIEMNYM, NIEprzezroczystym tle
 *                                   (#07090D-family, alpha=255 w całości).
 *   - logo-vertical.png 1145x1155 — znak pionowo nad wordmarkiem (kwadratowy kadr).
 *   - favicon-256.png   256x256   — sam znak w kwadracie (na ciemnym tle).
 *
 * OSADZENIE / „WTOPIENIE": tło renderu jest CIEMNE i opaque, więc pasek, w którym
 * stoi logo, musi być ciemny (Header.tsx = ciemny glass #07090D + backdrop-blur).
 * Wtedy ciemne krawędzie renderu zlewają się z paskiem i nie widać prostokątnej
 * ramki. Na jasnym tle render NIE może stać (widoczny ciemny prostokąt) — dlatego
 * używamy go w nagłówku i stopce, które są ciemne.
 *
 * CYTOWALNOŚĆ (#1 GEO): obraz to dekoracja wizualna, ale etykietę niesie tekst —
 * `alt="SimpleFast.ai"` + `aria-label` linku. Boty czytają nazwę marki z atrybutów,
 * nie zależy ona od pikseli. Wordmark widoczny jest w renderze; w treści stron nazwa
 * marki żyje też jako prawdziwy tekst (H1/akapity), więc cytowalność jest zachowana.
 *
 * Dostępność: link do „/" z aria-label; obraz `priority` (LCP nagłówka), `h-` w CSS,
 * `w-auto` trzyma proporcje. Wariant 'mark' = kwadratowy znak (favicon-256) do wąskich
 * miejsc. Mobile-first: logo nie szersze niż potrzeba (h-[34px] -> sm:h-[40px]).
 */

/**
 * Warianty OFICJALNEGO renderu (public/brand/):
 *  - 'full'     header.png        — poziomy (znak + wordmark + tagline), do paska/stopki.
 *  - 'mark'     favicon-256.png   — sam znak w kwadracie, do wąskich miejsc.
 *  - 'vertical' logo-vertical.png — znak + wordmark pionowo (kwadratowy kadr), np. /o-nas.
 */
type LogoVariant = 'full' | 'mark' | 'vertical';

const LABEL = 'SimpleFast.ai';

// Źródło + naturalne proporcje per wariant (next/image skaluje przez CSS h-/w-auto).
const RENDERS: Record<LogoVariant, { src: string; width: number; height: number }> = {
  full: { src: '/brand/header.png', width: 643, height: 200 }, // 1800:560 = 45:14
  mark: { src: '/brand/favicon-256.png', width: 256, height: 256 }, // 1:1
  vertical: { src: '/brand/logo-vertical.png', width: 1145, height: 1155 }, // ~1:1
};

/**
 * LogoImage — sam render (bez linku), żeby używać go też dekoracyjnie poza nagłówkiem
 * (np. sekcja o symbolice na /o-nas) bez duplikowania ścieżek/proporcji. `decorative`
 * => aria-hidden (treść niesie tekst obok); inaczej alt = nazwa marki.
 */
export function LogoImage({
  variant = 'full',
  className,
  decorative = false,
  priority = false,
  sizes,
}: {
  variant?: LogoVariant;
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
 * Logo — render marki opakowany w link do strony głównej (nagłówek/stopka).
 * Wariant 'mark' (kwadrat) dla bardzo wąskich miejsc; domyślnie 'full' (z wordmarkiem).
 */
export function Logo({
  className,
  variant = 'full',
  priority = false,
}: {
  className?: string;
  variant?: LogoVariant;
  priority?: boolean;
}) {
  if (variant === 'mark') {
    return (
      <Link
        href="/"
        aria-label={`${LABEL} — strona główna`}
        className={cn('inline-flex items-center', className)}
      >
        <LogoImage variant="mark" priority={priority} className="h-[34px] w-[34px] sm:h-[40px] sm:w-[40px]" />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label={`${LABEL} — strona główna`}
      className={cn('inline-flex items-center', className)}
    >
      {/* Pełny render (znak + wordmark + tagline). h-[34px]->sm:h-[40px], w-auto =
          proporcje 45:14, więc na mobile szerokość ~109px, na sm ~129px (nie za szeroki). */}
      <LogoImage variant="full" priority={priority} className="h-[34px] w-auto sm:h-[40px]" />
    </Link>
  );
}
