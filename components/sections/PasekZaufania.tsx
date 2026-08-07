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
 * ODCIENIE palety v4 (jasne stopnie 300/400 z lib/inf-kategorie: blue #60a5fa,
 * violet #a78bfa, green #4ade80) zamiast tokenów metalu — żywsze, każda
 * pozycja inny ton. AA na tle strony #06060c z zapasem (jaśniejsze niż
 * dotychczasowe metal-300/400, kontrast tylko rośnie; policzone dla --surface
 * w globals przy .inf-card-sub: 6.5:1 / 6.6:1 / 9.9:1). Teksty 1:1.
 */
const FILARY = [
  {
    title: 'Twoje dane zostają w UE',
    desc: 'RODO i AI Act. Klient zawsze wie, że rozmawia z AI.',
    kolor: '#60a5fa',
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
    kolor: '#a78bfa',
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
    kolor: '#4ade80',
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
      {/* Kaskadę robi .sf-stagger (JEDEN obserwator na kontenerze) — per-item
          delaye zniknęły. INFINITY: kolumny jako pozycje pasa .inf-counter
          (fundament) — pionowy separator z lewej dla pozycji 2 i 3 (reguła
          sibling fundamentu; na mobile kasowana przez max-sm:border-l-0/pl-0,
          utilities wygrywają z @layer components). Ikony w kolorze pozycji
          (dekoracja); tytuł = mono caps w kolorze TEKSTOWYM metalu (AA). */}
      <Reveal as="ul" className="sf-stagger mx-auto grid max-w-wide gap-8 sm:grid-cols-3 sm:gap-10">
        {FILARY.map((f) => (
          <li key={f.title} className="inf-counter max-sm:border-l-0 max-sm:pl-0">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ color: f.kolor }}
            >
              {f.icon}
            </svg>
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
