import type { CSSProperties } from 'react';
import type { InfDekor } from '@/lib/inf-kategorie';

/**
 * PasekMetryk — pas kafli z liczbami pod hero huba.
 *
 * CHWYT WZORCA (PLAN-v22 §1.7a): pas metryk jest na WSZYSTKICH pięciu
 * mierzonych podstronach wzorca (praxis 5 kafli, axiom 3, void 3, freedom 3+6).
 * To pierwszy element pod nagłówkiem i to on daje stronie „twarz" zamiast
 * gołego akapitu. U nas sześć hubów treści nie ma go w ogóle.
 *
 * RENDER 1:1 z blokiem `kafle` z `components/blog/PostBody.tsx`: `<ul>` pudełek
 * `.inf-hero-stat`, liczba na `.inf-counter-value` (mono, pełny kolor, poświata),
 * etykieta na `.inf-counter-label`, opcjonalny przypis na `.inf-stat-chip-zrodlo`.
 * Zero nowych reguł CSS.
 *
 * ŻELAZNA REGUŁA DANYCH (spec v22: zero zmyślonych liczb): `wartosc` na hubie
 * MUSI być POLICZONA PRZY BUILDZIE z rejestru (`PORADNIKI.length`,
 * `REALIZACJE.length`, `MATERIALY.length`, `NARZEDZIA.length`) albo być ceną
 * z listy locked. Liczba wpisana z palca to zmyślona liczba w rozumieniu spec,
 * nawet jeśli dziś przypadkiem się zgadza. Konsument odpowiada za źródło.
 *
 * SEMANTYKA: `<ul>`/`<li>` — bot czyta to jako ZBIÓR FAKTÓW, a nie jako grafikę.
 * Cały tekst jest w HTML pierwszego żądania, nic nie siedzi za hoverem ani
 * w obrazku.
 */
export function PasekMetryk({
  kafle,
  ton,
  className,
}: {
  /** Kafle w kolejności wyświetlania. `zrodlo` to mikro-przypis „skąd ta liczba". */
  kafle: { wartosc: string; opis: string; zrodlo?: string }[];
  /**
   * Ton strony (kolor z INF_TYP / INF_KATEGORIA). Maluje obwódkę pudełka
   * (`--hero-c`) i samą liczbę (`--counter-c` wywodzi się z `--card-c`),
   * czyli „naczynia połączone": pas metryk świeci tym samym kolorem, co karty
   * tego działu. Bez tonu wszystko spada na akcent marki, jak dotąd.
   */
  ton?: InfDekor;
  /** Klasy pozycjonowania od konsumenta (odstęp od hero, szerokość kolumny). */
  className?: string;
}) {
  if (kafle.length === 0) return null;

  const styl = {
    ...(ton ? { '--card-c': ton.c, '--card-c-l': ton.odcien ?? ton.c } : {}),
    '--hero-c': 'var(--card-c, var(--accent))',
  } as CSSProperties;

  return (
    <ul
      className={`grid grid-cols-2 gap-[10px] sm:grid-cols-4${className ? ` ${className}` : ''}`}
      style={styl}
    >
      {kafle.map((kafel, i) => (
        <li key={i} className="inf-hero-stat text-center">
          <span className="inf-counter-value block text-[24px] font-black leading-none">
            {kafel.wartosc}
          </span>
          <span className="inf-counter-label mt-[6px] block">{kafel.opis}</span>
          {kafel.zrodlo && (
            <span className="inf-stat-chip-zrodlo mt-[6px] block">{kafel.zrodlo}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
