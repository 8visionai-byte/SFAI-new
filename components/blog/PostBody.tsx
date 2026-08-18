import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Blok } from '@/lib/blog/types';
import type { InfDekor } from '@/lib/inf-kategorie';

/**
 * PostBody — render treści artykułu z tablicy bloków (`Post['tresc']`).
 * To SILNIK treści: faza 4 składa wpis z bloków, a ten komponent zamienia każdy
 * blok na semantyczny HTML renderowany SERWEROWO (w HTML od razu = cytowalny przez LLM).
 *
 * Mapowanie bloków:
 *  - 'naglowek' -> <h2> (nagłówek sekcji; w treści formułujemy go JAK PYTANIE = GEO),
 *  - 'akapit'   -> <p>,
 *  - 'lista'    -> <ul><li> (bez zmyślania liczby pozycji),
 *  - 'tabela'   -> prawdziwa, semantyczna <table> (scope), scroll poziomy na mobile,
 *  - 'cytat'    -> <blockquote> z opcjonalnym <cite>.
 *
 * `noUncheckedIndexedAccess` jest włączony, więc dostęp do komórek tabeli jest
 * bezpieczny (pierwszy wiersz traktujemy jako nagłówkowy, reszta jako dane).
 */
export function PostBody({ tresc, ton }: { tresc: Blok[]; ton?: InfDekor }) {
  if (tresc.length === 0) return null;

  /* v21: ton strony (kolor kategorii/typu) wchodzi jako custom property na
     wspólnym wrapperze, więc każda karta w treści świeci tym samym kolorem co
     reszta serwisu („naczynia połączone"). Bez propa `ton` render jest 1:1
     jak dotąd — blog i pozostałe poradniki wyglądają identycznie. */
  const styl = ton
    ? ({ '--card-c': ton.c, '--card-c-l': ton.odcien ?? ton.c } as CSSProperties)
    : undefined;

  return (
    <Section tone="base">
      <div className="mx-auto flex max-w-narrow flex-col gap-6" style={styl}>
        {tresc.map((blok, i) => (
          <Reveal key={i} delay={Math.min(i * 0.03, 0.15)}>
            <BlokRender blok={blok} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/**
 * INFINITY v7 (spec §PARTIA E pkt 1 i 3): minimalna szerokość tabeli rośnie
 * z LICZBĄ KOLUMN. Sztywne `min-w-[36rem]` dla każdej tabeli było źródłem
 * rozjazdu: przy 6 kolumnach (arkusz kosztów) na kolumnę zostawało ~96px, więc
 * nagłówki i liczby łamały się po jednym słowie i wiersze traciły wspólną
 * linię; przy 2 kolumnach ta sama wartość wymuszała zbędny scroll na mobile.
 * Klasy MUSZĄ być literałami — Tailwind skanuje pliki, nie liczy w locie.
 */
const MIN_W_TABELI: Record<number, string> = {
  2: 'min-w-[28rem]',
  3: 'min-w-[36rem]',
  4: 'min-w-[46rem]',
  5: 'min-w-[54rem]',
};
/** 6 kolumn i więcej — jeden wspólny sufit (scroll w opakowaniu, nie w body). */
const MIN_W_TABELI_SZEROKA = 'min-w-[62rem]';

function minWTabeli(kolumny: number): string {
  // 0-1 kolumn (dane awaryjne) — żadnego wymuszonego scrolla.
  if (kolumny <= 1) return 'min-w-0';
  return MIN_W_TABELI[kolumny] ?? MIN_W_TABELI_SZEROKA;
}

function BlokRender({ blok }: { blok: Blok }) {
  switch (blok.typ) {
    case 'naglowek':
      return <h2 className="text-h2 mt-4">{blok.tekst}</h2>;

    case 'akapit':
      return <p className="text-body text-fg-muted">{blok.tekst}</p>;

    case 'lista':
      return (
        <ul className="ml-5 list-disc space-y-2 text-body text-fg-muted marker:text-accent">
          {blok.punkty.map((punkt, i) => (
            <li key={i}>{punkt}</li>
          ))}
        </ul>
      );

    /* v21 — SEKCJA W KARCIE: nagłówek + akapity (+ lista) w `.inf-card`
       z wariantem ramki i tonem strony. Zero nowych reguł CSS: te same klasy,
       co karty na home i stronach usług (kątowniki, hover, sweep, reflektor
       wchodzą z globals). Semantyka bez zmian: h2 + p + ul. */
    case 'sekcja': {
      const wariant =
        blok.wariant === 'edge'
          ? 'inf-card-edge'
          : blok.wariant === 'quiet'
            ? 'inf-card-quiet'
            : 'inf-card-top';
      return (
        <section className={`inf-card ${wariant} p-6 md:p-8`}>
          <div aria-hidden="true" className="inf-spotlight" />
          <h2 className="text-h2">{blok.naglowek}</h2>
          {blok.akapity.map((tekst, i) => (
            <p key={i} className={`text-body text-fg-muted ${i === 0 ? 'mt-4' : 'mt-3'}`}>
              {tekst}
            </p>
          ))}
          {blok.punkty && blok.punkty.length > 0 && (
            <ul className="mt-4 ml-5 list-disc space-y-2 text-body text-fg-muted marker:text-[color:var(--card-c,var(--accent))]">
              {blok.punkty.map((punkt, i) => (
                <li key={i}>{punkt}</li>
              ))}
            </ul>
          )}
        </section>
      );
    }

    /* v21 — KAFLE LICZB: pudełka `.inf-hero-stat` (jak hero usług), liczba na
       żywej `.inf-counter-value` (mono, pełny kolor, poświata), label na
       `.inf-counter-label`. Lista <ul>, żeby bot czytał to jako zbiór faktów. */
    case 'kafle':
      return (
        <ul className="grid grid-cols-2 gap-[10px] sm:grid-cols-4">
          {blok.kafle.map((kafel, i) => (
            <li key={i} className="inf-hero-stat text-center">
              <span className="inf-counter-value block text-[24px] font-black leading-none">
                {kafel.wartosc}
              </span>
              <span className="inf-counter-label mt-[6px] block">{kafel.opis}</span>
            </li>
          ))}
        </ul>
      );

    /* v21 — KROKI: numer w płytce `.inf-tile` + tytuł i opis, wzorzec
       KrokiJakToDziala. <ol> zachowuje kolejność dla czytnika i bota. */
    case 'kroki':
      return (
        <ol className="flex flex-col gap-4">
          {blok.kroki.map((krok, i) => (
            <li key={i} className="inf-card inf-card-edge flex gap-4 p-5">
              <span
                aria-hidden="true"
                className="inf-tile flex h-[40px] w-[40px] flex-none items-center justify-center font-mono text-[15px] font-extrabold"
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="text-ui block font-extrabold">{krok.tytul}</span>
                {krok.opis && (
                  <span className="text-body-sm mt-1 block text-fg-muted">{krok.opis}</span>
                )}
              </span>
            </li>
          ))}
        </ol>
      );

    case 'tabela': {
      const [naglowekWiersz, ...wierszeDanych] = [blok.naglowki, ...blok.wiersze];
      // Liczba kolumn = najszerszy wiersz (nagłówek albo dane) — steruje min-w.
      const kolumny = Math.max(
        naglowekWiersz?.length ?? 0,
        ...wierszeDanych.map((w) => w.length)
      );
      /* INFINITY v7 (audyt dostępności): opakowanie ze scrollem jest punktem
         tabulacji, więc MUSI mieć rolę i nazwę — inaczej czytnik ekranu ogłasza
         puste zatrzymanie. Wzorzec 1:1 z TabelaCen / ObiekcjeOdpowiedzi /
         PorownanieTabela (tabIndex + role="region" + aria-label). Nazwa
         POCHODZI z wiersza nagłówkowego TEJ tabeli (wpis może mieć ich kilka),
         więc rozróżnia tabele i nie wnosi ani jednego nowego stringa treści. */
      const nazwaTabeli = (naglowekWiersz ?? []).filter(Boolean).join(', ');
      /* v21: `wKarcie` owija tabelę w `.inf-card` z tonem strony — ten sam
         język, co PorownanieTabela na stronach usług. Tabela pozostaje
         PRAWDZIWĄ <table> ze scope (bot czyta ją tak samo), karta dokłada
         wyłącznie ramkę, kątowniki i reflektor. Stare tabele (bez pola)
         renderują się dokładnie jak dotąd — zero regresji na blogu. */
      const tabelaEl = (
        /* INFINITY v6 (spec §PARTIA D zad. 2): tabela wpisu w tym samym języku
           co tabele home i usług — bez pudełka z ramką, nagłówki mono
           .inf-overline (AA: --fg-muted zamiast dekoracyjnego --fg-subtle),
           kreska rozdziału border-strong, wiersze z hoverem. Struktura
           semantyczna i treść komórek 1:1.
           INFINITY v7 (spec §PARTIA E): min-w liczone z liczby kolumn (wyżej),
           `align-top` z powrotem na td/th (na <tr> działało tylko dzięki
           dziedziczeniu z arkusza przeglądarki), a poziomy scroll siedzi
           wyłącznie w opakowaniu i da się go przewinąć klawiaturą (WCAG 2.1.1). */
        <div
          className="overflow-x-auto"
          tabIndex={0}
          role={nazwaTabeli ? 'region' : undefined}
          aria-label={nazwaTabeli || undefined}
        >
          <table
            className={`w-full ${minWTabeli(kolumny)} border-collapse text-left text-body-sm`}
          >
            <thead>
              <tr className="border-b border-border-strong">
                {(naglowekWiersz ?? []).map((komorka, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={
                      i === 0
                        ? 'inf-overline py-3 pr-4 align-bottom'
                        : 'inf-overline px-4 py-3 align-bottom'
                    }
                  >
                    {komorka}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wierszeDanych.map((wiersz, ri) => (
                <tr
                  key={ri}
                  className="border-b border-border transition-colors duration-fast last:border-b-0 hover:bg-bg-subtle"
                >
                  {wiersz.map((komorka, ci) =>
                    ci === 0 ? (
                      <th
                        key={ci}
                        scope="row"
                        className="py-4 pr-4 align-top font-semibold text-fg"
                      >
                        {komorka}
                      </th>
                    ) : (
                      <td key={ci} className="px-4 py-4 align-top text-fg-muted">
                        {komorka}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      if (!blok.wKarcie) return tabelaEl;
      return (
        <div className="inf-card inf-card-top p-5 md:p-6">
          <div aria-hidden="true" className="inf-spotlight" />
          {tabelaEl}
        </div>
      );
    }

    case 'cytat':
      return (
        <blockquote className="border-l-2 border-border-accent pl-5 text-lead text-fg">
          <p>{blok.tekst}</p>
          {blok.zrodlo && (
            <cite className="text-caption not-italic text-fg-subtle">{blok.zrodlo}</cite>
          )}
        </blockquote>
      );

    default: {
      // Wyczerpujący switch — gdy dojdzie nowy wariant Blok, TS zgłosi błąd tutaj.
      const _exhaustive: never = blok;
      return _exhaustive;
    }
  }
}
