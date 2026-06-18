import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';

/**
 * PoradnikCTA — sekcja domykająca poradnik. Jedno główne CTA -> `#diagnoza`
 * (spójne z HOME_CTA, north star #3). Strefa „dark" (sekcja domykająca), kolory
 * semantyczne działają automatycznie. Anchor `#diagnoza` = ten sam flow co home
 * i usługi. Dowód pod CTA bez zmyślonej liczby (realne wdrożenia).
 */
export function PoradnikCTA() {
  return (
    <Section tone="base" id="diagnoza" className="surface-aurora">
      <div className="mx-auto max-w-narrow text-center">
        <Reveal>
          <h2 className="text-h2">
            Policzyłeś. Teraz zobaczmy to na Twoich danych.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-lead mx-auto mt-5 max-w-[52ch] text-fg-muted">
            {HOME_CTA.microcopy}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
              {HOME_CTA.label}
            </MagneticButton>
            <span className="text-caption max-w-[60ch] text-fg-subtle">
              Realne wdrożenia: auto-email obsługi klienta gotowy w 75% i generator
              leadów, który zrobił 1000 rekordów w 40 minut.
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
