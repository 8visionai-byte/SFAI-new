import { Section, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Usluga } from '@/lib/uslugi/types';

/**
 * KrokiJakToDziala — SEKCJA 5 szablonu (3 numerowane kroki wdrożenia).
 * Wzorzec spójny z home (JakToDziala): <ol> + numerowane kafelki Card.
 * Pierwszy krok zawsze "Diagnoza (bezpłatna)" = mały, odwracalny krok (north star #4).
 * H2 jak pytanie. Treść w HTML od razu; Reveal tylko wzbogaca.
 */
export function KrokiJakToDziala({ kroki }: { kroki: Usluga['kroki'] }) {
  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{kroki.h2}</h2>
        </Reveal>
      </div>

      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {kroki.items.map((k, i) => (
          <Reveal as="li" key={k.tytul} delay={i * 0.06}>
            <Card as="article" className="h-full">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft font-display text-h3 font-semibold text-accent-hover">
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
