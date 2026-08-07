import type { CSSProperties } from 'react';
import Link from 'next/link';
import { KATEGORIA_LABEL } from '@/lib/realizacje/types';
import type { Realizacja } from '@/lib/realizacje/types';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { KartaEtykieta, KartaLiczba, KartaTagi, tagiRealizacji } from '@/components/sections/KartaCzesci';

/**
 * RealizacjaCard — kafelek case'a na liście /realizacje (premium, hover preview).
 *
 * Cała karta to jeden <Link> (klikalny obszar = całość, lepsza afordancja i cel
 * dotykowy). INFINITY v2 (spec §PODSTRONY — sama prezentacja, treść 1:1):
 *  - karta = .inf-card (ciemna karta wzorca, lewa krawędź w kolorze kategorii
 *    przez --card-c, hover: lift + poświata z bramką hover w globals.css);
 *  - strzałka „Zobacz realizację" → .inf-arrow
 *    (dojeżdża na hover karty — reguła .inf-card:hover .inf-arrow);
 *  - błysk .inf-shine + spotlight .inf-spotlight jako WEWNĘTRZNE divy aria-hidden
 *    (overflow:hidden tylko w .inf-shine, NIE na karcie — kontrakt fundamentu).
 *
 * INFINITY v8 (spec §8 — struktura karty wzorca, pomiary §3.3/§3.4/§3.5):
 *  - kolejność 1:1 ze wzorcem: [mono kategoria w kolorze karty] -> [biały tytuł]
 *    -> [szary opis] -> [LICZBA-dowód z etykietą] -> [klient] -> [TAGI na dole];
 *  - IKONA WYPADŁA. Wzorzec daje ikonę karcie, która reprezentuje RZECZ
 *    (narzędzie, produkt, kategoria), a NIE karcie WYNIKOWEJ. Karta case'a to
 *    czysty wynik, więc rolę kotwicy wzrokowej przejmuje świecąca liczba
 *    (dokładnie tak działają karty-bohaterowie wzorca: 4 karty z liczbami, 0 ikon);
 *  - TAGI = branża case'a + jego money queries (`queries` z rejestru, te same,
 *    które lecą do `keywords` w CreativeWork JSON-LD). Realny tekst w HTML dla
 *    botów, zero wymyślonych słów.
 *
 * Treść w HTML od razu (SSG): kategoria, H1, kapsuła (preview), metryka-dowód
 * (pierwsza liczba z case'a = bramka GEO), klient i tagi. Anchor = H1 case'a.
 *
 * UWAGA: komponent NIE renderuje własnego <li> — element listy (<li>) dostarcza
 * strona/lista (np. `Reveal as="li"` w /realizacje), żeby nie zagnieżdżać <li> w <li>.
 */
export function RealizacjaCard({ realizacja }: { realizacja: Realizacja }) {
  const metryka = realizacja.efekt.metryki[0];
  const dekor = INF_KATEGORIA[realizacja.kategoria] ?? INF_KATEGORIA_DEFAULT;
  const odcien = dekor.odcien ?? dekor.c;

  return (
    <Link
      href={`/realizacje/${realizacja.slug}`}
      className="inf-card group flex h-full flex-col p-6"
      style={{ '--card-c': dekor.c, '--card-c-l': odcien } as CSSProperties}
    >
      {/* Spotlight — dekoracja malowana przez CSS fundamentu (i JS orchestratora
          dla --mx/--my); pointer-events:none, zero treści. Sweep robi ::after
          samej .inf-card (v4) — bez dodatkowego .inf-shine. */}
      <div aria-hidden="true" className="inf-spotlight" />

      {/* 1. ETYKIETA KATEGORII — mono, w kolorze karty, na samej górze
          (wzorzec §3.6: status/kategoria stoi NAD tytułem). Dotąd siedziała
          w rzędzie z kafelkiem ikony jako .inf-tag. */}
      <KartaEtykieta>{KATEGORIA_LABEL[realizacja.kategoria]}</KartaEtykieta>

      {/* 2. TYTUŁ biały. Kolor niesie kontrakt `.inf-card h3` z globals, a WAGĘ
          dokłada utility: pomiary §3.2 mówią wprost, że tytuł wzorca NIE MA
          poświaty, a wrażenie „świeci" robi bardzo gruby glif (900 przy karcie
          bohatera). Nasz Plus Jakarta Sans jest wczytany do 800 włącznie
          (app/layout.tsx), więc bierzemy maksimum, jakie mamy — h3 bazowo ma 600. */}
      <h3 className="text-h3 mt-3 font-extrabold text-fg group-hover:text-brand">
        {realizacja.h1}
      </h3>

      {/* 3. OPIS szary. */}
      <p className="mt-3 text-body-sm text-fg-muted">{realizacja.kapsula}</p>

      {/* 4. LICZBA-DOWÓD: duża, w kolorze karty, z mono etykietą pod spodem
          (wzorzec §3.3: `133` / `MODULES`). Dotąd liczba stała samotnie
          w prawym górnym rogu, bez informacji, czego dotyczy. */}
      {metryka && (
        <KartaLiczba className="mt-5" wartosc={metryka.wartosc} etykieta={metryka.etykieta} />
      )}

      <div className="mt-auto pt-5">
        {/* Branża zeszła stąd do TAGÓW (żeby nie stała dwa razy na jednej
            karcie) — zostaje klient, czyli twardy podpis pod dowodem. */}
        <span className="block text-caption text-fg-subtle">{realizacja.klient}</span>
        <span className="mt-3 inline-flex items-center gap-1 text-caption font-medium text-accent">
          Zobacz realizację
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="inf-arrow text-accent"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* 6. TAGI na dole karty: branża + money queries case'a (istniejące pola
          rejestru). `doDolu={false}`, bo wolne miejsce zabiera już blok wyżej
          (mt-auto) — dwa marginesy auto podzieliłyby przestrzeń po połowie.
          WARIANT (a) PIGUŁKA (spec v8b §4): karta case'a to karta DOWODU
          (świecąca liczba, bez ikony), a tagi są jej jedynym kolorowym
          zamknięciem na dole. Płaskie tagi zgubiłyby się pod linią „Zobacz
          realizację". */}
      <KartaTagi
        tagi={tagiRealizacji(realizacja)}
        doDolu={false}
        wariant="pigulka"
        etykietaListy={`Tagi realizacji: ${realizacja.h1}`}
      />
    </Link>
  );
}
