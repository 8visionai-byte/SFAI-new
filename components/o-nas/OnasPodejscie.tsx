import { Section, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { O_NAS } from '@/lib/o-nas/content';

/**
 * OnasPodejscie — SEKCJA 4: jak pracujemy (3 kroki). H2 jak pytanie.
 * Wzorzec numerowanych kafelków spójny z JakToDziala (home) i KrokiJakToDziala
 * (usługi): kapsuła answer-first + <ol> z 3 kartami. Krok 1 = mały, odwracalny
 * (pokaż problem na bezpłatnej diagnozie). Treść w HTML od razu; Reveal wzbogaca.
 */
export function OnasPodejscie() {
  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{O_NAS.podejscie.h2}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">{O_NAS.podejscie.kapsula}</p>
        </Reveal>
      </div>

      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {O_NAS.podejscie.kroki.map((k, i) => (
          <Reveal as="li" key={k.tytul} delay={i * 0.06}>
            <Card as="article" className="h-full">
              <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-accent-soft font-display text-h3 font-semibold text-accent-hover">
                {i + 1}
              </span>
              <h3 className="text-h3 mt-4">{k.tytul}</h3>
              <p className="mt-2 text-body-sm text-fg-muted">{k.opis}</p>
            </Card>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
