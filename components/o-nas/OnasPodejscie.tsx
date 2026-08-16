import type { CSSProperties } from 'react';
import { Section, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { O_NAS } from '@/lib/o-nas/content';

/* INFINITY v5: tonacja dekoracyjna kart kroków = trzy stopnie trasy marki
   (jak cennik home i KrokiJakToDziala usług). */
const KROK_TON = ['#2b7cff', '#8b5cf6', '#22e06b'] as const;

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

      {/* INFINITY v5 (spec §4 — kroki NA KARTY, treść 1:1): .inf-card w stopniach
          trasy marki, numer w kafelku .inf-tile (numer to treść) — spójnie
          z KrokiJakToDziala usług.
          v7 (audyt „naczynia połączone"): reflektor .inf-spotlight jako PIERWSZE
          dziecko każdej karty kroku — ta sama reakcja na kursor co na hubach. */}
      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {O_NAS.podejscie.kroki.map((k, i) => (
          <Reveal as="li" key={k.tytul} delay={i * 0.06}>
            <Card
              as="article"
              variant="quiet"
              className="inf-card inf-card-quiet relative h-full p-6"
              style={{ '--card-c': KROK_TON[i] ?? 'var(--accent)' } as CSSProperties}
            >
              <div aria-hidden="true" className="inf-spotlight" />

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
