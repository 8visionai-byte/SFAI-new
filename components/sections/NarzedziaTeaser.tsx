import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { NARZEDZIA } from '@/lib/narzedzia';
import { INF_NARZEDZIE, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

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
        </Reveal>
      </div>

      {/* Kaskadę wejścia robi .sf-stagger (jeden obserwator na siatce). */}
      <Reveal as="ul" className="sf-stagger mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
        {NARZEDZIA.map((n) => {
          const dekor = INF_NARZEDZIE[n.slug] ?? INF_KATEGORIA_DEFAULT;
          return (
            <li
              key={n.slug}
              className="inf-card"
              style={
                {
                  '--card-c': dekor.c,
                  '--card-c-l': dekor.odcien ?? dekor.c,
                } as CSSProperties
              }
            >
              <Link href={`/narzedzia#${n.slug}`} className="group flex h-full flex-col p-6">
                {/* Mono kolorowy podtytuł wzorca („85K+ monthly searches") =
                    etykieta narzędzia z rejestru; kolor niesie --card-c-l. */}
                <span className="flex items-center gap-2.5">
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
                {/* Miejsce wpięcia ScrambleText (partia D): owinąć treść h3. */}
                <h3 className="mt-3 text-ui font-semibold text-fg">{n.tytul}</h3>
                <p className="mt-2 text-body-sm text-fg-muted">{n.opis}</p>
              </Link>
            </li>
          );
        })}
      </Reveal>
    </Section>
  );
}
