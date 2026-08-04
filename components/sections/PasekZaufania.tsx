import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

/**
 * SEKCJA 2 — MIKRO-PASEK ZAUFANIA (spec 03 §2). Emocja: ulga.
 * Domyka lęk #1 (kontrola/bezpieczeństwo) above the fold, zanim klient scrolluje.
 * Treść w HTML (fakty zgodnościowe = cytowalne dla LLM przy "czy AI jest bezpieczne").
 */
const FILARY = [
  {
    title: 'Twoje dane zostają w UE',
    desc: 'RODO i AI Act. Klient zawsze wie, że rozmawia z AI.',
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
        {/* Etykieta techniczna (11px, tracking .16), wyrównana do lewej —
            jedna oś wyrównania na całej stronie. Tekst 1:1. */}
        <p className="mb-10 text-overline uppercase tracking-[0.16em] text-fg-subtle">
          Zanim cokolwiek wdrożymy, zdejmujemy z Ciebie trzy największe obawy
        </p>
      </Reveal>
      {/* Kaskadę robi .sf-stagger (JEDEN obserwator na kontenerze) — per-item
          delaye zniknęły. .sf-rail rysuje 2px kreskę nad każdą kolumną
          (język karty katalogowej zamiast ikony w kółku). */}
      <Reveal as="ul" className="sf-stagger sf-rail mx-auto grid max-w-wide gap-8 sm:grid-cols-3 sm:gap-10">
        {FILARY.map((f) => (
          <li key={f.title}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
              {f.icon}
            </svg>
            <span className="mt-5 block text-ui font-semibold text-fg">{f.title}</span>
            <span className="mt-2 block text-body-sm leading-[1.6] text-fg-muted">{f.desc}</span>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
