import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Usluga } from '@/lib/uslugi/types';

/**
 * ServiceCTA — SEKCJA 8 szablonu (jedno główne CTA, personalizowane).
 * Strefa "dark" (sekcja domykająca, spec 02 §7) — kolory semantyczne działają
 * automatycznie. Przy CTA zawsze dowód (north star #5): tu uczciwy sygnał oferty
 * z `cta.dowod`, bez zmyślonej liczby. Anchor `#diagnoza` = ten sam flow co home.
 */
export function ServiceCTA({ cta }: { cta: Usluga['cta'] }) {
  return (
    <Section tone="base" theme="dark" id="diagnoza">
      <div className="mx-auto max-w-narrow text-center">
        <Reveal>
          <h2 className="text-h2">Zacznij od bezpłatnej diagnozy</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-lead mx-auto mt-5 max-w-[52ch] text-fg-muted">
            {cta.mikrokopia}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <MagneticButton variant="primary" size="lg" href={cta.href}>
              {cta.label}
            </MagneticButton>
            <span className="text-caption max-w-[60ch] text-fg-subtle">{cta.dowod}</span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
