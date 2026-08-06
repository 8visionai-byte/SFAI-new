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
 * Logo — link do strony głównej (nagłówek/stopka).
 *
 * INFINITY (spec-infinity §adaptacja, „LOGO WRACA"): Paweł zażądał powrotu
 * OFICJALNEGO ZNAKU graficznego (cyrkiel, public/brand/mark-t.png — kwadrat
 * z prawdziwą alfą) do nagłówka. INFINITY v3 (decyzja Pawła: „logo znak
 * odrobinę większy"): znak 40px (36→40) z MOCNIEJSZYM, dwuwarstwowym drop-shadow (violet #8b5cf6 +
 * cyjan #22d3ee — para akcentów palety) + WORDMARK TEKSTOWY text-lg bold:
 * „SimpleFast" w bieli (--fg) i „.ai" w gradiencie trasy z solidnym
 * fallbackiem AA (.sf-wordmark / .sf-wordmark-ai w globals.css).
 * Znak jest dekoracyjny (alt="" + aria-hidden), etykietę niesie aria-label
 * linku; marka zostaje realnym tekstem w DOM (cytowalność #1). next/image
 * serwuje mark-t.png przeskalowany do 36px (avif/webp), więc waga w nagłówku
 * jest pomijalna; priority/fetchpriority przechodzi jak dotąd.
 * Wariant 'mark' (sam znak, kwadrat) bez zmian — do wąskich miejsc.
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
  if (variant === 'mark') {
    return (
      <Link
        href="/"
        aria-label={`${LABEL} — strona główna`}
        className={cn('inline-flex items-center', className)}
      >
        <LogoImage
          variant="mark"
          priority={priority}
          sizes="40px"
          className="h-[34px] w-[34px] sm:h-[40px] sm:w-[40px]"
        />
      </Link>
    );
  }
  return (
    <Link
      href="/"
      aria-label={`${LABEL} — strona główna`}
      className={cn('inline-flex items-center gap-2', className)}
    >
      {/* Znak cyrkla 40px (spec v3), WYRAZISTY na ciemnym pasku: dwie warstwy
          poświaty (violet + cyjan akcentów INFINITY) — dekoracja, alt="". */}
      <LogoImage
        variant="mark"
        decorative
        priority={priority}
        sizes="40px"
        // h-10 NIE znaczy tu 40px: spacing repo to własne tokeny (--space-9 = 6rem
        // = 96px) i znak rozsadzał pasek. Sztywne 40px arbitralnie.
        className="h-[40px] w-[40px] [filter:drop-shadow(0_2px_12px_rgba(139,92,246,0.65))_drop-shadow(0_0_18px_rgba(34,211,238,0.4))]"
      />
      <span className="sf-wordmark text-lg font-bold leading-none">
        SimpleFast<span className="sf-wordmark-ai">.ai</span>
      </span>
    </Link>
  );
}
