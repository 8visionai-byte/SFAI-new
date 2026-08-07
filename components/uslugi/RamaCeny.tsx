import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Usluga } from '@/lib/uslugi/types';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * RamaCeny — SEKCJA 6 szablonu (rama ceny value-based). H2 jak pytanie
 * ("Ile kosztuje ...?"). Cena widoczna = bramka GEO, ale ZERO zmyślonej kwoty:
 * dopóki `ramaCeny.minPrice` jest undefined, render mówi prawdę o mechanice
 * wyceny i kieruje na bezpłatną diagnozę (north star #6).
 *
 * Gdy Paweł poda realne "od X zł", faza 3 ustawia `minPrice` w pliku usługi —
 * wtedy pokazujemy kwotę tutaj i (przez schemas) w `offers` Service JSON-LD.
 * Kwota w UI i w schema MUSI być ta sama liczba (spójność).
 *
 * INFINITY v7 „NACZYNIA POŁĄCZONE" (audyt kart, partia H1): karta ramy ceny
 * jechała na fallbackowym akcencie i bez reflektora, więc ta sama .inf-card
 * świeciła inaczej niż na hubie. `slug` w propsach daje ton kategorii TEJ
 * usługi (lib/inf-kategorie — jeden ton na całą podstronę), a .inf-spotlight
 * wchodzi PIERWSZYM dzieckiem karty (wzorzec z app/uslugi).
 */
export function RamaCeny({
  ramaCeny,
  slug,
}: {
  ramaCeny: Usluga['ramaCeny'];
  slug: Usluga['slug'];
}) {
  const maKwote = typeof ramaCeny.minPrice === 'number';
  const dekor = INF_KATEGORIA[slug] ?? INF_KATEGORIA_DEFAULT;

  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{ramaCeny.h2}</h2>
        </Reveal>

        {/* INFINITY v5 (spec §4 — sekcja cennika NA KARTĘ, treść 1:1): rama ceny
            w ciemnej karcie .inf-card (narożniki + sweep z globals) — jak karty
            cennika home. v7: ton karty = kolor kategorii usługi (był domyślny
            akcent) + reflektor jak na hubie. */}
        <Reveal delay={0.05}>
          <div
            className="inf-card mt-8 p-6 md:p-8"
            style={
              {
                '--card-c': dekor.c,
                '--card-c-l': dekor.odcien ?? dekor.c,
              } as CSSProperties
            }
          >
            <div aria-hidden="true" className="inf-spotlight" />

            {maKwote && (
              <p className="font-display text-h2 font-semibold tabular-nums text-brand">
                od {ramaCeny.minPrice!.toLocaleString('pl-PL')} zł
              </p>
            )}

            <p className={`text-lead text-fg-muted ${maKwote ? 'mt-5' : ''}`}>
              {ramaCeny.tresc}
            </p>

            <p className="mt-6 border-t border-border pt-5 text-caption text-fg-subtle">
              To widełki startowe, nie ostateczna faktura. Dokładną cenę poznasz na
              bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
