import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui';
import { Bloki } from '@/components/blog/PostBody';
import { Reveal } from '@/components/motion/Reveal';
import type { Usluga } from '@/lib/uslugi/types';
import { dekorUslugi } from '@/lib/inf-kategorie';

/** Styl frazowego linku w treści — 1:1 z components/sections/Rozwiazanie.tsx. */
const LINK =
  'font-medium text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover';

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
  rodzic,
}: {
  ramaCeny: Usluga['ramaCeny'];
  slug: Usluga['slug'];
  /** Slug usługi macierzystej (podstrony) — ton dziedziczy się z rodziny. */
  rodzic?: string;
}) {
  const maKwote = typeof ramaCeny.minPrice === 'number';
  const dekor = dekorUslugi(slug, rodzic);

  return (
    <Section tone="base">
      {/* v23: oś sekcji na `wide`, sama karta ceny i nagłówek zostają w `narrow`
          (patrz komentarz w ServiceNarrative) — bloki cennika mają dostać pełną
          szerokość na tabelę progów i przełącznik. */}
      <div className="mx-auto max-w-wide">
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
              className="inf-card inf-card-top mt-8 p-6 md:p-8"
              style={
                {
                  '--card-c': dekor.c,
                  '--card-c-l': dekor.odcien ?? dekor.c,
                } as CSSProperties
              }
            >
              <div aria-hidden="true" className="inf-spotlight" />

              {maKwote && (
                /* v8b: liczba na karcie ma świecić W KOLORZE KARTY, nie globalnym
                 brandem (pomiary §3.3: `color: var(--card-accent)` w pełnym
                 kryciu + `text-shadow: 0 0 12px currentColor`). Ton bierze się
                 z kategorii usługi ustawionej wyżej w --card-c-l, więc cennik
                 świeci tym samym kolorem co reszta kart tej usługi.
                 KONTRAST: to tekst DUŻY (text-h2), próg 3:1; najciemniejszy
                 odcień palety na korpusie karty daje 4,55:1 — AA z zapasem.
                 Poświata gaśnie w Windows High Contrast, jak reszta glow-ów. */
                <p className="font-display text-h2 font-semibold tabular-nums text-[color:var(--card-c-l,var(--card-c,var(--accent)))] [text-shadow:0_0_12px_currentColor] forced-colors:[text-shadow:none]">
                  od {ramaCeny.minPrice!.toLocaleString('pl-PL')} zł netto
                </p>
              )}

              {/* SEO 2026-08-17: opcjonalne zdanie z linkiem do poradnika cenowego
                dokleja się do TEGO SAMEGO akapitu (ta sama typografia i kolory,
                wygląd sekcji bez zmian) — `tresc` zostaje czystym tekstem, link
                idzie przez <Link>, nie przez surowy <a> w stringu. */}
              <p className={`text-lead text-fg-muted ${maKwote ? 'mt-5' : ''}`}>
                {ramaCeny.tresc}
                {ramaCeny.linkPoradnik && (
                  <>
                    {' '}
                    {ramaCeny.linkPoradnik.przed}
                    <Link href={ramaCeny.linkPoradnik.href} className={LINK}>
                      {ramaCeny.linkPoradnik.etykieta}
                    </Link>
                    {ramaCeny.linkPoradnik.po}
                  </>
                )}
              </p>

              <p className="mt-6 border-t border-border pt-5 text-caption text-fg-subtle">
                To widełki startowe, nie ostateczna faktura. Dokładną cenę poznasz na bezpłatnej
                diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Runda struktury 2026-08-19 (raport P8/P10): szczegóły cennika schodzą
            z akapitu-ściany do bloków POD kartą — ten sam silnik co poradniki
            (PostBody/Bloki), ten sam ton kategorii, zero nowego CSS. Usługa bez
            `bloki` renderuje się jak dotąd. */}
        {ramaCeny.bloki && ramaCeny.bloki.length > 0 && (
          <div className="mt-8">
            {/* naglowki="h3": blok siedzi POD H2 sekcji cennika — hierarchia bez przeskoków. */}
            <Bloki tresc={ramaCeny.bloki} ton={dekor} naglowki="h3" szerokosc="wide" />
          </div>
        )}
      </div>
    </Section>
  );
}
