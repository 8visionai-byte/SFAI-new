import { Section, Badge, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { POSITIONING } from '@/lib/site';
import { Breadcrumbs } from './Breadcrumbs';
import type { Usluga } from '@/lib/uslugi/types';

/**
 * ServiceHero — SEKCJA 1 szablonu usługi (answer-first).
 * Struktura: breadcrumbs + badge (sub-claim kategorii) + H1 (= money query)
 * + kapsuła answer-first (surowy HTML = cytat dla LLM) + główne CTA + mikrokopia.
 *
 * KPI #1: H1 i kapsuła są w HTML przy 1. żądaniu (Reveal tylko wzbogaca, a przy
 * prefers-reduced-motion pokazuje treść natychmiast). Lewostronne wyrównanie
 * (czytelność długiej kapsuły), spójne z rytmem strony.
 */
export function ServiceHero({ usluga }: { usluga: Usluga }) {
  return (
    <Section tone="base" containerWidth="default">
      <div className="mx-auto max-w-narrow">
        <Breadcrumbs
          items={[
            { name: 'Strona główna', href: '/' },
            { name: 'Usługi', href: '/uslugi' },
            { name: usluga.h1 },
          ]}
        />

        <Reveal>
          <Badge variant="accent" className="mt-6">
            {POSITIONING.subClaim}
          </Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-display mt-5">{usluga.h1}</h1>
        </Reveal>

        {/* Kapsuła answer-first — surowy HTML, cytat dla LLM (40–60 słów). */}
        <Reveal delay={0.1}>
          <p className="text-lead mt-6 text-fg-muted">{usluga.kapsula}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-start gap-3">
            <MagneticButton variant="primary" size="lg" href={usluga.cta.href}>
              {usluga.cta.label}
            </MagneticButton>
            <span className="text-caption max-w-[52ch] text-fg-subtle">
              {usluga.cta.mikrokopia}
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
