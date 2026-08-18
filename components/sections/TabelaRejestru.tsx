import type { CSSProperties } from 'react';
import { TabelaRender } from '@/components/blog/TabelaRender';
import type { InfDekor } from '@/lib/inf-kategorie';

/**
 * TabelaRejestru — tabela orientacyjna huba, zbudowana MAPOWANIEM REJESTRU.
 *
 * DLACZEGO POWSTAŁA (PLAN-v22 §1.7d): pomiar GPTBotem pokazał ZERO `<table>`
 * na sześciu hubach treści, a tabela faktów jest nadreprezentowana w cytatach
 * modeli. Wzorzec robi to samo (/vitalis §3.3: cztery prawdziwe `<table>`),
 * i tu akurat wzorzec bywa gorszy od nas: swoje panele porównawcze składa
 * z divów i traci na tym punkty botowe. My zostajemy przy `<table>`.
 *
 * ZYSK PONAD KARTY: tabela huba pokazuje pola, których karty NIE pokazują
 * (data aktualizacji, typ pliku, kategoria, metryka), więc dokłada informację,
 * a nie duplikuje listy kafli.
 *
 * KONTRAKT DANYCH (wiążący, spec v22 „zero zmyślonych faktów"): `wiersze`
 * powstają WYŁĄCZNIE z mapowania rejestru (`PORADNIKI.map(...)`,
 * `REALIZACJE.map(...)`), nigdy z literałów wpisanych w JSX. Literał w tabeli
 * to fakt bez źródła i rozjeżdża się z rejestrem przy pierwszej zmianie danych.
 *
 * RENDER: `TabelaRender` (components/blog), czyli DOKŁADNIE ten sam kod, co
 * tabele w treści wpisów i materiałów — scope na nagłówkach, min-width liczone
 * z liczby kolumn, poziomy scroll w opakowaniu z rolą i nazwą (WCAG 2.1.1),
 * widoczny `<caption>`. Zero nowych reguł CSS.
 */
export function TabelaRejestru({
  podpis,
  naglowki,
  wiersze,
  ton,
  wKarcie = true,
}: {
  /** Widoczny `<caption>` i nazwa regionu ze scrollem. Mówi, czego tabela dotyczy. */
  podpis: string;
  /** Wiersz nagłówkowy. */
  naglowki: string[];
  /** Wiersze danych zmapowane z rejestru (pierwsza komórka = nazwa pozycji). */
  wiersze: string[][];
  /** Ton działu (kolor karty). Bez niego karta świeci akcentem marki. */
  ton?: InfDekor;
  /**
   * Ramka wokół tabeli (`.inf-card .inf-card-top` + kątowniki + reflektor),
   * ten sam język co `wKarcie` w bloku `tabela`. Domyślnie WŁĄCZONA: cel rundy
   * to więcej ramek na podstronach, a tabela huba jest samodzielnym blokiem.
   */
  wKarcie?: boolean;
}) {
  if (wiersze.length === 0) return null;

  const styl = ton
    ? ({ '--card-c': ton.c, '--card-c-l': ton.odcien ?? ton.c } as CSSProperties)
    : undefined;

  const tabela = <TabelaRender naglowki={naglowki} wiersze={wiersze} podpis={podpis} />;

  if (!wKarcie) return tabela;

  return (
    <div className="inf-card inf-card-top p-5 md:p-6" style={styl}>
      <div aria-hidden="true" className="inf-spotlight" />
      {tabela}
    </div>
  );
}
