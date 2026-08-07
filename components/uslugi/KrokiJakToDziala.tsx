import type { CSSProperties } from 'react';
import { Section, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Usluga } from '@/lib/uslugi/types';

/**
 * KrokiJakToDziala — SEKCJA 5 szablonu (3 numerowane kroki wdrożenia).
 * Wzorzec spójny z home (JakToDziala): <ol> + numerowane kafelki.
 * Pierwszy krok zawsze "Diagnoza (bezpłatna)" = mały, odwracalny krok (north star #4).
 * H2 jak pytanie. Treść w HTML od razu; Reveal tylko wzbogaca.
 *
 * INFINITY v5 (spec §4 — sekcja procesu NA KARTY, treść 1:1): Card
 * variant="quiet" + .inf-card (narożniki [ ] + sweep robi karta z globals),
 * --card-c = trzy stopnie trasy marki (niebieski -> fiolet -> zielony, jak
 * POZIOM_TON cennika home) — numer kroku w kolorze karty.
 */

/* Tonacja dekoracyjna kart kroków = trzy stopnie trasy marki (jak cennik home). */
const KROK_TON = ['#2b7cff', '#8b5cf6', '#22e06b'] as const;

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
            {/* Karta kroku: ciemna .inf-card, numer w kafelku .inf-tile w stopniu
                trasy (numer to treść — bez aria-hidden na numerze). */}
            <Card
              as="article"
              variant="quiet"
              className="inf-card h-full p-6"
              style={{ '--card-c': KROK_TON[i] ?? 'var(--accent)' } as CSSProperties}
            >
              <span
                className="inf-tile font-display text-h3 font-semibold"
                style={{ '--tile-c': KROK_TON[i] ?? 'var(--accent)' } as CSSProperties}
              >
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
