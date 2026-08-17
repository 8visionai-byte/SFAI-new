import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { NARZEDZIA } from '@/lib/narzedzia';
import { INF_NARZEDZIE, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';
import { KartaStatus } from '@/components/sections/KartaCzesci';

/**
 * SEKCJA — TEASER NARZĘDZI na home (INFINITY v4, spec §PARTIA C pkt 2).
 * Miejsce w opowieści: po Ofercie, przed GwarancjaEfektu (app/page.tsx).
 *
 * TREŚĆ 1:1 z rejestru NARZEDZIA (lib/narzedzia): tytuł, etykieta, opis —
 * ZERO nowych stringów. Nagłówek H2 = istniejąca etykieta nav „Narzędzia"
 * (components/layout/nav-data.ts, NavDropdownData.label — 1:1 co do znaku).
 * Hub /narzedzia NIE trzyma swojego opisu w lib (żyje w page.tsx), więc
 * zgodnie ze spec sekcja idzie BEZ opisu: H2 wyśrodkowane + grid (wzorzec).
 *
 * KARTY tools-style wzorca: .inf-card-sub = mono KOLOROWY podtytuł (etykieta
 * z rejestru; kolor = pole `odcien` z INF_NARZEDZIE przez --card-c-l, partia A)
 * + tytuł + opis + link (cała karta klikalna, strzałka na hover). 5 narzędzi
 * = 5 RÓŻNYCH odcieni (rejestr, spec §C pkt 5). Rozbłysk sweep robi ::after
 * samej .inf-card (v4) — bez dodatkowych divów. Link celuje w kotwicę
 * /narzedzia#<slug> (sekcje hubu mają id={slug}).
 *
 * TAGI (spec v8 §8): karta narzędzia ich NIE dostaje. Rejestr lib/narzedzia
 * nie ma pola z frazami (`queries` mają usługi i realizacje, narzędzia nie),
 * a jedyne krótkie pole `kategoria` powtarza co do słowa etykietę stojącą już
 * na górze karty („Kalkulator"). Zasada Pawła jest twarda: tagi budujemy
 * WYŁĄCZNIE z istniejących pól, więc zamiast wymyślać słowa zostawiamy kartę
 * bez tagów. Odblokowanie: dopisać `queries` do typu `Narzedzie` (rejestr).
 *
 * KOORDYNACJA z partią D (ScrambleText): tytuł karty w <h3> niżej to
 * umówione miejsce owinięcia w <ScrambleText> (komponent partii D jest
 * samowystarczalny; tu tylko wrap, żadnych stanów).
 */
export function NarzedziaTeaser() {
  return (
    <Section tone="subtle" space="md" id="narzedzia-teaser">
      {/* H2 wyśrodkowane nad gridem (język wzorca). Tekst = etykieta nav 1:1. */}
      <div className="mx-auto max-w-narrow text-center">
        <Reveal variant="header">
          <h2 className="text-h2">Narzędzia</h2>
          {/* v11 spec D: kreska wzorca pod H2 (.inf-h2-line, kontrakt partii A)
              w parze INDIGO wzorca: tak wzorzec koloruje kreskę sekcji tools
              (#6366f1 -> #a855f7, pomiar taksonomia §D). */}
          <div
            aria-hidden="true"
            className="inf-h2-line"
            style={{ '--h2-line-a': '#6366f1', '--h2-line-b': '#a855f7' } as CSSProperties}
          />
        </Reveal>
      </div>

      {/* Kaskadę wejścia robi .sf-stagger (jeden obserwator na siatce). */}
      {/* v10 §6: gap kart 32 -> 20px klasą-kontraktem partii A .inf-grid-gap
          (pomiar wzorca §3: .lp-primary-grid--three 20px). */}
      <Reveal as="ul" className="sf-stagger inf-grid-gap mt-10 grid sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
        {NARZEDZIA.map((n) => {
          const dekor = INF_NARZEDZIE[n.slug] ?? INF_KATEGORIA_DEFAULT;
          return (
            <li
              key={n.slug}
              /* v11 spec A: narzędzia = WARIANT W2 (wzorzec składa sekcję
                 "Free Developer Tools" z .lp-primary-card, zmierzone; mapa w
                 raporty/taksonomia-ramek-v11.md §A). Klasa .inf-card-top =
                 kontrakt partii A (globals: WARIANTY RAMEK v11). */
              className="inf-card inf-card-top"
              style={
                {
                  '--card-c': dekor.c,
                  '--card-c-l': dekor.odcien ?? dekor.c,
                } as CSSProperties
              }
            >
              {/* Reflektor za kursorem: pozycję (--mx/--my) ustawia JEDEN
                  delegowany pointermove z MotionOrchestrator (desktop).
                  Dekoracja aria-hidden. */}
              <div aria-hidden="true" className="inf-spotlight" />
              <Link href={`/narzedzia#${n.slug}`} className="group flex h-full flex-col p-6">
                {/* v12 (spec: „Migający FREE u góry karty — nasze narzędzia:
                    dodać że są darmowe"): status ● ZA DARMO na SAMEJ GÓRZE
                    karty, jak `.lp-primary-status` wzorca (pomiary-v12 §3).
                    FAKT z istniejącej treści: hub /narzedzia to „Darmowe
                    narzędzia AI" („bez maila, bez zobowiązań") — zero
                    zmyślonego statusu. Kolor napisu = kolor karty (inline
                    w KartaStatus), kropka pulsuje klasą partii A. Margines
                    arbitralny mb-[6px] = zmierzone .4rem wzorca (PUŁAPKA
                    tokenów spacingu repo: mb-3 to 12px); jeśli .inf-status
                    partii A niesie własny margines, wygra kolejnością
                    w arkuszu (reguły za warstwą utilities). */}
                <KartaStatus className="mb-[6px]">ZA DARMO</KartaStatus>
                {/* v8 (spec §8 pkt „nie wszystkie kafelki mają mieć emoji",
                    pomiary wzorca §3.5): karta NARZĘDZIA reprezentuje RZECZ,
                    a takie karty we wzorcu mają ikonę (20 z 35 kart). Dotąd
                    ikony tu nie było, a miały ją karty czysto tekstowe —
                    v8 odwraca to na regułę wzorca. Dekoracja aria-hidden. */}
                <span
                  aria-hidden="true"
                  className="inf-tile mb-4"
                  style={{ '--tile-c': dekor.c } as CSSProperties}
                >
                  <InfIcon name={dekor.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
                </span>
                {/* Miejsce wpięcia ScrambleText (partia D): owinąć treść h3. */}
                {/* F2: `font-bold` zamiast `font-semibold` — reguła wagi
                    tytułu karty w globals zeszła na :where() (0,1,0), więc
                    utility wagi zawsze wygrywa i semibold zdjąłby te tytuły
                    z 700 na 600. Bez mt: odstęp od płytki niesie jej mb-4. */}
                <h3 className="text-ui font-bold text-fg">{n.tytul}</h3>
                {/* v15 §G — TAGLINE POD TYTUŁEM (pomiary-v15.md §1a i §6 pkt 9,
                    szablon wzorca: status NAD tytułem, wielki tytuł, KOLOROWY
                    tagline mono POD tytułem, opis): mono etykieta narzędzia
                    (.inf-card-sub, istniejące pole rejestru — zero nowych
                    treści) schodzi ZNAD tytułu pod niego. Kropka i strzałka
                    hover jadą razem z wierszem (v5, bez zmian). */}
                <span className="mt-2 flex items-center gap-2.5">
                  {/* v5 (spec §3 KAFELKI): pulsująca kropka statusu PRZED
                      .inf-card-sub, kolor odcienia karty (--card-c-l).
                      Kontrakt SCALONY (koniec app/globals.css): .inf-sub-dot =
                      kropka 8px w kolorze karty + glow + puls infAskPulse;
                      RM: bez animacji. */}
                  <span aria-hidden="true" className="inf-sub-dot" />
                  <span className="inf-card-sub">{n.etykieta}</span>
                  {/* v5 (spec §3 KAFELKI): strzałka hover w KOLORZE karty —
                      utility arbitralne (bije warstwę components, więc kolor
                      nie wraca do accentu/fg-muted z reguł hover globals). */}
                  <span
                    aria-hidden="true"
                    className="inf-arrow ml-auto text-[color:var(--card-c-l,var(--accent))]"
                  >
                    →
                  </span>
                </span>
                <p className="mt-2 text-body-sm text-fg-muted">{n.opis}</p>
              </Link>
            </li>
          );
        })}
      </Reveal>
    </Section>
  );
}
