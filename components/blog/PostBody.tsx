import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { TabelaRender } from './TabelaRender';
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
 *  - 'cytat'    -> <blockquote> z opcjonalnym <cite>,
 *  - 'sekcja'   -> <section> w karcie: <h2> + <p> (+ <ul>),
 *  - 'kafle'    -> <ul> pudełek z liczbą,
 *  - 'kroki'    -> <ol> (kolejność czytelna dla bota).
 *
 * v22 (PLAN-v22 §1.1-§1.4): bloki `kafle`, `kroki`, `sekcja` i `tabela` dostają
 * POLA OPCJONALNE (źródło liczby, wariant kroków, chip/meta/stopka karty, podpis
 * tabeli). Wszystkie są opcjonalne, a `kroki.wariant` domyślnie 'plytka', więc
 * strony, których dane się nie zmieniły, renderują się bit w bit jak w v21.
 * ŻELAZNE: żadne z nowych pól nie chowa treści za kliknięciem ani hoverem —
 * każde dokłada tekst do HTML pierwszego żądania.
 *
 * `noUncheckedIndexedAccess` jest włączony, więc dostęp do komórek tabeli jest
 * bezpieczny (render tabeli siedzi w `TabelaRender` — jedno źródło dla całego
 * serwisu, patrz komentarz w tamtym pliku).
 */
export function PostBody({ tresc, ton }: { tresc: Blok[]; ton?: InfDekor }) {
  if (tresc.length === 0) return null;

  return (
    <Section tone="base">
      <Bloki tresc={tresc} ton={ton} />
    </Section>
  );
}

/**
 * Bloki — kolumna bloków BEZ własnej sekcji (runda struktury 2026-08-19).
 * Wyodrębnione z PostBody, żeby sekcje stron usług (ServiceNarrative, RamaCeny)
 * mogły renderować te same bloki WEWNĄTRZ własnych sekcji — jeden silnik
 * treści w całym serwisie, zero drugiego renderu (lekcja forka MaterialBody).
 * DOM PostBody bez zmian: Section > ta sama kolumna co dotąd.
 */
export function Bloki({
  tresc,
  ton,
  naglowki = 'h2',
}: {
  tresc: Blok[];
  ton?: InfDekor;
  /**
   * Poziom nagłówków bloków 'naglowek' i 'sekcja'. Domyślnie 'h2' (artykuły:
   * poradniki, blog, materiały — bez zmian). Sekcje stron usług podają 'h3',
   * bo blok siedzi POD istniejącym H2 sekcji — hierarchia nagłówków dla botów
   * zostaje czysta (h1 > h2 > h3, zero przeskoków).
   */
  naglowki?: 'h2' | 'h3';
}) {
  /* v21: ton strony (kolor kategorii/typu) wchodzi jako custom property na
     wspólnym wrapperze, więc każda karta w treści świeci tym samym kolorem co
     reszta serwisu („naczynia połączone"). Bez propa `ton` render jest 1:1
     jak dotąd — blog i pozostałe poradniki wyglądają identycznie. */
  const styl = ton
    ? ({ '--card-c': ton.c, '--card-c-l': ton.odcien ?? ton.c } as CSSProperties)
    : undefined;

  return (
    <div className="mx-auto flex max-w-narrow flex-col gap-6" style={styl}>
      {tresc.map((blok, i) => (
        <Reveal key={i} delay={Math.min(i * 0.03, 0.15)}>
          <BlokRender blok={blok} naglowki={naglowki} />
        </Reveal>
      ))}
    </div>
  );
}

function BlokRender({ blok, naglowki = 'h2' }: { blok: Blok; naglowki?: 'h2' | 'h3' }) {
  /* Dynamiczny poziom nagłówka (patrz komentarz przy `Bloki.naglowki`).
     Klasa idzie za poziomem: text-h2 dla artykułów, text-h3 w sekcjach usług
     (ta sama skala co tytuły kart; .inf-card i tak wymusza wagę 800 w karcie). */
  const Naglowek = naglowki;
  const klasaNaglowka = naglowki === 'h2' ? 'text-h2' : 'text-h3';
  switch (blok.typ) {
    case 'naglowek':
      return <Naglowek className={`${klasaNaglowka} mt-4`}>{blok.tekst}</Naglowek>;

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
       wchodzą z globals). Semantyka bez zmian: h2 + p + ul.
       v22 (PLAN-v22 §1.3, chwyt /void §4.2 `.vd-neon-card`): karta może nieść
       CZTERY WARSTWY informacji zamiast jednej ściany akapitów — chip kategorii
       i meta nad nagłówkiem, treść, i stopka z krótkimi punktami pod kreską.
       Wzorzec trzyma nagłówek biały, a kolor oddaje chipowi, więc H2 nie
       zmienia ani koloru, ani wagi. Wszystkie trzy pola opcjonalne. */
    case 'sekcja': {
      const wariant =
        blok.wariant === 'edge'
          ? 'inf-card-edge'
          : blok.wariant === 'quiet'
            ? 'inf-card-quiet'
            : 'inf-card-top';
      const maNaglowekKarty = Boolean(blok.chip || blok.meta);
      return (
        <section className={`inf-card ${wariant} p-6 md:p-8`}>
          <div aria-hidden="true" className="inf-spotlight" />

          {/* Pasek chipa i mety. `--chip-c` bierze kolor karty, więc pigułka
              świeci tonem strony (kontrakt `.inf-chip[style*='--chip-c']`
              z globals: tekst 72% koloru + biel = AA, poświata 55%).
              To REALNY TEKST w HTML, nie dekoracja — bot go czyta. */}
          {maNaglowekKarty && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              {blok.chip && (
                <span className="inf-chip" style={{ '--chip-c': 'var(--card-c)' } as CSSProperties}>
                  {blok.chip}
                </span>
              )}
              {blok.meta && <span className="inf-tag">{blok.meta}</span>}
            </div>
          )}

          <Naglowek className={klasaNaglowka}>{blok.naglowek}</Naglowek>
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

          {/* Stopka karty: kreska rozdziału (istniejący token --border) i
              siatka dwóch kolumn. Zwykłe <li>, więc rośnie licznik pozycji
              listy u bota i liczba znaków w <main>. */}
          {blok.stopka && blok.stopka.length > 0 && (
            <ul className="mt-6 ml-5 grid list-disc gap-2 border-t border-border pt-5 text-body-sm text-fg-muted marker:text-[color:var(--card-c,var(--accent))] sm:grid-cols-2">
              {blok.stopka.map((punkt, i) => (
                <li key={i}>{punkt}</li>
              ))}
            </ul>
          )}
        </section>
      );
    }

    /* v21 — KAFLE LICZB: pudełka `.inf-hero-stat` (jak hero usług), liczba na
       żywej `.inf-counter-value` (mono, pełny kolor, poświata), label na
       `.inf-counter-label`. Lista <ul>, żeby bot czytał to jako zbiór faktów.
       v22 (PLAN-v22 §1.1, chwyt /freedom §5.3): trzeci wiersz = MIKRO-PRZYPIS
       pod liczbą, czyli skąd ta liczba. Klasa `.inf-stat-chip-zrodlo` istniała
       już w globals (kontrast ok. 7:1, LEPIEJ niż wzorcowe 50% alfy) — v22
       tylko dopisuje ją do listy selektorów, żeby działała też w tym pudełku.
       `--hero-c` = kolor strony: obwódka pudełka szła dotąd stałym cyjanem,
       podczas gdy liczba w środku brała już `--card-c` (`--counter-c`
       w globals). To była jedyna niespójność „naczyń połączonych" w tym bloku
       i kosztuje zero nowych reguł CSS. */
    case 'kafle':
      return (
        <ul
          className="grid grid-cols-2 gap-[10px] sm:grid-cols-4"
          style={{ '--hero-c': 'var(--card-c, var(--accent))' } as CSSProperties}
        >
          {blok.kafle.map((kafel, i) => (
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

    /* v21 — KROKI: numer w płytce `.inf-tile` + tytuł i opis, wzorzec
       KrokiJakToDziala. <ol> zachowuje kolejność dla czytnika i bota.
       v22 (PLAN-v22 §1.2): trzy warianty PREZENTACJI tej samej struktury.
       Semantyka we wszystkich identyczna (<ol><li>), więc bot czyta kolejność
       tak samo — zmienia się wyłącznie forma numeru i układ wiersza. */
    case 'kroki': {
      /* Oś pionowa (chwyt /axiom §2.2 i /vitalis sec-pipeline): kropka statusu,
         tytuł, opis, i strzałka w dół jako dekoracja. Linia łącząca jest
         UDAWANA strzałką, nie pseudoelementem, czyli zero nowego CSS.
         Kropka MUSI siedzieć w `.inf-status` — to tam globals definiuje
         `--status-c: var(--card-c, var(--accent))`, a bez tej zmiennej
         `background: var(--status-c)` jest nieprawidłowe przy obliczaniu
         wartości i kropka byłaby NIEWIDOCZNA. Kontrakt 1:1 z notą v12
         w globals. */
      if (blok.wariant === 'os') {
        return (
          <ol className="flex flex-col">
            {blok.kroki.map((krok, i) => (
              <li key={i}>
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="inf-status mt-[7px]">
                    <span className="inf-status-dot" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-ui font-extrabold">{krok.tytul}</span>
                      {krok.meta && <span className="inf-tag">{krok.meta}</span>}
                    </div>
                    {krok.opis && (
                      <p className="text-body-sm mt-1 text-fg-muted">{krok.opis}</p>
                    )}
                  </div>
                </div>
                {i < blok.kroki.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="my-2 block pl-[2px] text-body-sm leading-none text-fg-subtle"
                  >
                    &darr;
                  </span>
                )}
              </li>
            ))}
          </ol>
        );
      }

      /* 'plytka' (domyślny, stan v21) i 'kolo' (chwyt /freedom §5.3: ten sam
         numer w kółku). Różnica to JEDNA deklaracja CSS (border-radius 50%),
         reszta pudełka, koloru i światła bez zmian. */
      const klasaNumeru =
        blok.wariant === 'kolo' ? 'inf-tile inf-tile-round' : 'inf-tile';
      return (
        <ol className="flex flex-col gap-4">
          {blok.kroki.map((krok, i) => (
            <li key={i} className="inf-card inf-card-edge flex gap-4 p-5">
              <span
                aria-hidden="true"
                className={`${klasaNumeru} flex h-[40px] w-[40px] flex-none items-center justify-center font-mono text-[15px] font-extrabold`}
              >
                {i + 1}
              </span>
              {/* Bez `meta` markup wiersza zostaje DOKŁADNIE taki jak w v21
                  (`min-w-0` bez `flex-1`, tytuł w jednym <span class="block">).
                  Zmierzone: przy tym warunku render czterech poradników jest
                  po v22 IDENTYCZNY ZNAK W ZNAK z produkcyjnym (sonda
                  v22-a3-rejestry). `flex-1` wchodzi tylko z metą, bo dopiero
                  wtedy wiersz musi rozepchnąć się na pełną szerokość, żeby
                  pigułka mety usiadła przy prawej krawędzi. */}
              <span className={krok.meta ? 'min-w-0 flex-1' : 'min-w-0'}>
                {krok.meta ? (
                  <span className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-ui font-extrabold">{krok.tytul}</span>
                    <span className="inf-tag">{krok.meta}</span>
                  </span>
                ) : (
                  <span className="text-ui block font-extrabold">{krok.tytul}</span>
                )}
                {krok.opis && (
                  <span className="text-body-sm mt-1 block text-fg-muted">{krok.opis}</span>
                )}
              </span>
            </li>
          ))}
        </ol>
      );
    }

    case 'tabela': {
      /* v22: render tabeli przeniesiony do `TabelaRender` — jedno źródło dla
         PostBody, MaterialBody (przez PostBody) i tabel hubów. Zachowanie,
         klasy i semantyka 1:1 jak w v21; nowość to opcjonalny <caption>. */
      const tabelaEl = (
        <TabelaRender
          naglowki={blok.naglowki}
          wiersze={blok.wiersze}
          podpis={blok.podpis}
        />
      );
      /* v21: `wKarcie` owija tabelę w `.inf-card` z tonem strony — ten sam
         język, co PorownanieTabela na stronach usług. Tabela pozostaje
         PRAWDZIWĄ <table> ze scope (bot czyta ją tak samo), karta dokłada
         wyłącznie ramkę, kątowniki i reflektor. Stare tabele (bez pola)
         renderują się dokładnie jak dotąd — zero regresji na blogu. */
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
