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
    <Section tone="subtle" tight>
      <Reveal>
        <p className="mb-6 text-center text-caption uppercase tracking-[0.08em] text-fg-subtle">
          Zanim cokolwiek wdrożymy, zdejmujemy z Ciebie trzy największe obawy
        </p>
      </Reveal>
      <ul className="grid gap-6 sm:grid-cols-3">
        {FILARY.map((f, i) => (
          <Reveal as="li" key={f.title} delay={i * 0.06} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-hover">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {f.icon}
              </svg>
            </span>
            <span>
              <span className="block text-ui font-semibold text-fg">{f.title}</span>
              <span className="mt-0.5 block text-body-sm text-fg-muted">{f.desc}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
