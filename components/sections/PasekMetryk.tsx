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
  klasaKafla,
}: {
  /**
   * Kafle w kolejności wyświetlania. `zrodlo` to mikro-przypis „skąd ta liczba".
   * v24 (Paweł 2026-08-21: „startowe kolory tutaj w ogóle nie istnieją"):
   * opcjonalny `ton` PER KAFEL, hex z palety neonowej (PALETA-NEON.md).
   * Wzorzec /void stawia w jednym pasie cztery liczby w czterech barwach;
   * dotąd cały pas mógł mieć tylko jeden kolor albo spadał na akcent marki
   * i wychodził szary. Bez tego pola render jest 1:1 jak dotąd.
   */
  kafle: { wartosc: string; opis: string; zrodlo?: string; ton?: string }[];
  /**
   * Ton strony (kolor z INF_TYP / INF_KATEGORIA). Maluje obwódkę pudełka
   * (`--hero-c`) i samą liczbę (`--counter-c` wywodzi się z `--card-c`),
   * czyli „naczynia połączone": pas metryk świeci tym samym kolorem, co karty
   * tego działu. Bez tonu wszystko spada na akcent marki, jak dotąd.
   */
  ton?: InfDekor;
  /** Klasy pozycjonowania od konsumenta (odstęp od hero, szerokość kolumny). */
  className?: string;
  /**
   * v24b: dodatkowe klasy KAŻDEGO kafla. Sekcja /produkty podaje tu
   * `inf-hero-stat-neon inf-blysk`, żeby pas metryk dostał kolor w spoczynku
   * i ten sam błysk co karty. Pasy na pozostałych hubach renderują się bez
   * zmian, bo bez tego pola nic się nie dokłada.
   */
  klasaKafla?: string;
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
        <li
          key={i}
          className={`inf-hero-stat text-center${klasaKafla ? ` ${klasaKafla}` : ''}`}
          /* Ton kafla nadpisuje --card-c LOKALNIE, więc obwódka pudełka
             (--hero-c) i liczba (--counter-c) idą za nim razem. */
          style={
            kafel.ton
              ? ({ '--card-c': kafel.ton, '--card-c-l': kafel.ton } as CSSProperties)
              : undefined
          }
        >
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
