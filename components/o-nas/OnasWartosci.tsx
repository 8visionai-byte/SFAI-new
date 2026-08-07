import type { CSSProperties } from 'react';
import { Section, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { O_NAS } from '@/lib/o-nas/content';

/**
 * OnasWartosci — SEKCJA 5: w co wierzymy (głos marki). H2 jak pytanie.
 * Każda wartość = hasło marki (cytat, blockquote) + jedno zdanie „co to znaczy
 * w praktyce". Cytaty to realne zdania głosu marki (north star), nie zmyślone opinie.
 */
export function OnasWartosci() {
  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{O_NAS.wartosci.h2}</h2>
        </Reveal>
      </div>

      {/* INFINITY v5 (spec §4 — wartości NA KARTY, treść 1:1): .inf-card
          w stopniach trasy marki (mechanizmy home).
          v7 (audyt „naczynia połączone"): reflektor .inf-spotlight jako PIERWSZE
          dziecko każdej karty wartości — ta sama reakcja na kursor co na hubach. */}
      <div className="mx-auto mt-8 grid max-w-narrow gap-6 md:grid-cols-3">
        {O_NAS.wartosci.items.map((w, i) => (
          <Reveal key={w.cytat} delay={i * 0.06}>
            <Card
              as="article"
              variant="quiet"
              className="inf-card relative h-full p-6"
              style={
                {
                  '--card-c': ['#2b7cff', '#8b5cf6', '#22e06b'][i] ?? 'var(--accent)',
                } as CSSProperties
              }
            >
              <div aria-hidden="true" className="inf-spotlight" />

              <blockquote className="text-h3 text-fg">„{w.cytat}”</blockquote>
              <p className="mt-3 text-body-sm text-fg-muted">{w.opis}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
