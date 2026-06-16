import { useId } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Logo — znak (cyrkiel/divider architekta tworzący „SF") + wordmark „SimpleFast.ai".
 *
 * HISTORIA ZNAKU (do brandbooka i dla agenta animowanego faviconu):
 * Jesteśmy architektami AI. Kapitan cyrklem (dividerem) odmierza kroki na mapie,
 * krok po kroku do celu. Znak = otwarty CYRKIEL: zawias (pivot) u góry + dwie nogi
 * schodzące w dół (postawa „A"/litera F: pion + ramię), a przez nogi przewija się
 * KRZYWA-S (ścieżka nawigatora, „krok po kroku") — czytana jako litera S.
 * Razem nogi + krzywa = monogram „SF".
 *
 * GEOMETRIA (viewBox 0 0 24 24, ta sama co favicon app/icon.svg):
 *  - pivot (zawias cyrkla): okrąg, środek ~ (12, 4.4), promień ~1.6 — „głowa" dividera.
 *  - noga lewa:  z pivotu (12,5) do stopy (5.5, 20)  — pion litery F / lewe ramię cyrkla.
 *  - noga prawa: z pivotu (12,5) do stopy (18.5,20)  — prawe ramię cyrkla.
 *  - ramię F: pozioma kreska wychodząca w prawo z lewej nogi na wys. ~y=11 (poprzeczka F).
 *  - krzywa S: bezier przeplatający się między nogami (góra→dół), kładziona NA nogach.
 * Metal: linearGradient pionowy niebieski(#3aa0ff) -> fiolet(#8b5cf6) -> zielony(#22c79a).
 * Srebrne krawędzie: cienki jaśniejszy stroke (#cdd6e6) jako „glossy" obrys.
 *
 * Dostępność: role=img + aria-label. Wordmark to PRAWDZIWY tekst (nie outline) =
 * cytowalny, skalowalny, dziedziczy kolor (text-fg) -> czyta się na light i dark.
 * Znak działa w nagłówku (~32–40px) i większy; warianty: 'full' | 'mark'.
 */

type LogoVariant = 'full' | 'mark';

/**
 * CompassMark — sam znak (cyrkiel/divider tworzący „SF"), bez wordmarku i bez linku.
 * Eksportowany, by używać go DEKORACYJNIE poza nagłówkiem (np. sekcja o symbolice na
 * /o-nas) bez duplikowania geometrii SVG. Domyślnie aria-hidden (dekoracja); podaj
 * `title`, gdy znak ma nieść samodzielną etykietę (role=img). Jeden divider = jedna prawda.
 */
export function CompassMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  // Unikalne ID gradientów per instancja — na jednej stronie Logo renderuje się
  // kilka razy (Header, panel mobilny, Footer); collision <defs> psułby wypełnienie.
  const uid = useId().replace(/[:]/g, '');
  const metal = `metal-${uid}`;
  const edge = `edge-${uid}`;
  const gloss = `gloss-${uid}`;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        {/* Metaliczny gradient: niebieski -> fiolet -> zielony (akcent „AI") */}
        <linearGradient id={metal} x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3aa0ff" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22c79a" />
        </linearGradient>
        {/* Srebrna krawędź — jaśniejszy, cienki obrys = „glossy" połysk metalu */}
        <linearGradient id={edge} x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f2f5fb" />
          <stop offset="0.5" stopColor="#aeb9cc" />
          <stop offset="1" stopColor="#e7ecf5" />
        </linearGradient>
        {/* Pasmo połysku na pivocie (statyczny błysk srebra) */}
        <radialGradient id={gloss} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#cdd6e6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#cdd6e6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* SREBRNA KRAWĘDŹ (rysowana pod spodem, lekko grubsza) = glossy obrys */}
      <g
        fill="none"
        stroke={`url(#${edge})`}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      >
        <path d="M12 5 L5.5 20" />
        <path d="M12 5 L18.5 20" />
        <path d="M7.6 11 H13.2" />
      </g>

      {/* NOGI CYRKLA + RAMIĘ F — metaliczny wypełniony obrys */}
      <g
        fill="none"
        stroke={`url(#${metal})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* noga lewa = pion litery F / lewe ramię cyrkla */}
        <path d="M12 5 L5.5 20" />
        {/* noga prawa = prawe ramię cyrkla */}
        <path d="M12 5 L18.5 20" />
        {/* poprzeczka F (ramię w prawo z lewej nogi) */}
        <path d="M7.6 11 H13.2" />
      </g>

      {/* KRZYWA „S" — ścieżka nawigatora przeplatająca nogi (krok po kroku) */}
      <path
        d="M16.6 7.2 C12.4 7.6 11 10.2 12.4 12 C13.8 13.8 12.2 16.6 8.2 16.9"
        fill="none"
        stroke={`url(#${metal})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* srebrny highlight na krzywej S (cienki, dla połysku) */}
      <path
        d="M16.6 7.2 C12.4 7.6 11 10.2 12.4 12 C13.8 13.8 12.2 16.6 8.2 16.9"
        fill="none"
        stroke="#eaf0fb"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* PIVOT (zawias cyrkla) — metal + srebrny obrys + błysk */}
      <circle cx="12" cy="4.4" r="2.4" fill={`url(#${metal})`} stroke={`url(#${edge})`} strokeWidth="0.9" />
      <circle cx="12" cy="4.4" r="2.4" fill={`url(#${gloss})`} />
    </svg>
  );
}

export function Logo({
  className,
  variant = 'full',
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  const label = 'SimpleFast.ai';

  if (variant === 'mark') {
    return (
      <Link
        href="/"
        aria-label={`${label} — strona główna`}
        className={cn('inline-flex items-center', className)}
      >
        <CompassMark title={label} className="h-[36px] w-[36px]" />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label={`${label} — strona główna`}
      className={cn('group inline-flex items-center gap-2', className)}
    >
      {/* Znak — dekoracyjny (aria-hidden), bo etykietę niesie aria-label linku */}
      <CompassMark className="h-[32px] w-[32px] shrink-0 transition-transform duration-base group-hover:rotate-[8deg] motion-reduce:transition-none motion-reduce:group-hover:rotate-0" />
      {/* Wordmark = prawdziwy tekst (cytowalny, dziedziczy text-fg -> light + dark) */}
      <span className="inline-flex items-baseline font-display text-[1.375rem] font-semibold leading-none tracking-[-0.02em] text-fg">
        SimpleFast
        <span className="ml-px font-sans text-[0.95rem] font-semibold text-accent">.ai</span>
      </span>
    </Link>
  );
}
