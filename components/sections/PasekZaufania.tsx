import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

/**
 * SEKCJA 2 — MIKRO-PASEK ZAUFANIA (spec 03 §2). Emocja: ulga.
 * Domyka lęk #1 (kontrola/bezpieczeństwo) above the fold, zanim klient scrolluje.
 * Treść w HTML (fakty zgodnościowe = cytowalne dla LLM przy "czy AI jest bezpieczne").
 *
 * INFINITY (partia HERO+NAV): sekcja NIE ma liczb w treści, więc zamiast
 * liczników .inf-counter-value (zakaz placeholderów!) pas dostaje JĘZYK
 * liczników wzorca: tytuły w mono caps w kolorach trasy + pionowe separatory
 * między pozycjami (reguła .inf-counter + .inf-counter fundamentu; na mobile
 * kasowana utilities max-sm — kolumny stoją jedna pod drugą bez kreski).
 * INFINITY v4 (spec §PARTIA C pkt 5): trzy obawy = trzy RÓŻNE fluorescencyjne
 * ODCIENIE palety v4 (jasne stopnie 300/400 z lib/inf-kategorie: blue #70b0ff,
 * violet #dc7aff, green #29ff77) zamiast tokenów metalu — żywsze, każda
 * pozycja inny ton. AA na tle strony #05050c z zapasem (jaśniejsze niż
 * dotychczasowe metal-300/400, kontrast tylko rośnie; v17 na --surface
 * #111127: #70b0ff 8,24:1 / #dc7aff 7,30:1 / #29ff77 13,82:1). Teksty 1:1.
 */
const FILARY = [
  {
    title: 'Twoje dane zostają w UE',
    desc: 'RODO i AI Act. Klient zawsze wie, że rozmawia z AI.',
    kolor: '#70b0ff',
    icon: (
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Zaczynasz od małego kroku',
    desc: 'Najpierw darmowa diagnoza, potem mały projekt. Bez wielkiej decyzji na start.',
    kolor: '#dc7aff',
    icon: (
      <path
        d="M4 18h4v-4H4v4Zm6 0h4V9h-4v9Zm6 0h4V5h-4v13Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Płacisz za efekt',
    // Pełny model gwarancji = osobna sekcja GwarancjaEfektu (+ decyzja Pawła o success-fee).
    desc: 'Umawiamy się na wynik. Rozliczamy się za efekt, nie za obietnice.',
    kolor: '#29ff77',
    icon: (
      <path
        d="M5 12l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
] as const;

export function PasekZaufania() {
  return (
    /* MAPA AKTÓW: sekcja siada w tym samym rozdziale co Hero (tone="base"),
       koniec z pasami ABAB. Rejestr pionowy sm = pasek, nie pełna sekcja. */
    <Section tone="base" space="sm">
      <Reveal>
        {/* Etykieta techniczna (11px, tracking .16) — v4: WYŚRODKOWANA nad
            gridem (wzorzec: nagłówek + opis centralnie nad siatką). Tekst 1:1. */}
        <p className="mb-10 text-center text-overline uppercase tracking-[0.16em] text-fg-subtle">
          Zanim cokolwiek wdrożymy, zdejmujemy z Ciebie trzy największe obawy
        </p>
      </Reveal>
      {/* v11 spec F (zrzut Pawła: „nie ma tutaj ramek, a wszystko musi być
          w ramkach"): trzy kolumny wchodzą NA KARTY wzorca w WARIANCIE W1
          (lewa krawędź stała, .lp-learn-card, mapa sekcja->wariant w
          raporty/taksonomia-ramek-v11.md §A). Język liczników (.inf-counter
          z pionowym separatorem) wypada, bo ramkę rysuje teraz karta.
          Gap 16px klasą-kontraktem .inf-grid-gap-sm (siatki W1 są u wzorca
          najciaśniejsze: .lp-learn-grid 16px). Kaskadę dalej robi .sf-stagger;
          teksty, ikony i kolory 1:1 co do znaku. Klasa .inf-card-edge =
          kontrakt partii A (globals: WARIANTY RAMEK v11). */}
      <Reveal as="ul" className="sf-stagger inf-grid-gap-sm mx-auto grid max-w-wide sm:grid-cols-3">
        {FILARY.map((f) => (
          <li
            key={f.title}
            className="inf-card inf-card-edge p-6"
            style={{ '--card-c': f.kolor } as CSSProperties}
          >
            {/* Reflektor za kursorem (kontrakt kart home; dekoracja aria-hidden). */}
            <div aria-hidden="true" className="inf-spotlight" />
            {/* v14 (pomiary-v14.md par.5, mapa: "symbol luzem -> plytka"):
                glif wchodzi do plytki .inf-tile (anatomia W1/learn wzorca,
                par.1c: SVG 17-20px w plytce, pelny kolor przez currentColor -
                kolor niesie --tile-c). Rozmiar 20px = pomiar par.1a. Karta
                NIEklikalna, bez strzalki; hover pelny od v15 par.A. */}
            <span
              aria-hidden="true"
              className="inf-tile"
              style={{ '--tile-c': f.kolor } as CSSProperties}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {f.icon}
              </svg>
            </span>
            <span
              className="mt-4 block font-mono text-caption font-semibold uppercase tracking-[0.14em]"
              style={{ color: f.kolor }}
            >
              {f.title}
            </span>
            <span className="mt-1 block text-body-sm leading-[1.6] text-fg-muted">{f.desc}</span>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
