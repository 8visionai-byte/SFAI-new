import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Usluga } from '@/lib/uslugi/types';

/**
 * ServiceCTA — SEKCJA 8 szablonu (jedno główne CTA, personalizowane).
 * Jasna sekcja domykająca (.surface-aurora): subtelna zorza marki na jasnym tle,
 * kolory semantyczne działają automatycznie. Przy CTA zawsze dowód (north star #5): tu uczciwy sygnał oferty
 * z `cta.dowod`, bez zmyślonej liczby. Anchor `#diagnoza` = ten sam flow co home.
 */
export function ServiceCTA({ cta }: { cta: Usluga['cta'] }) {
  return (
    <Section tone="base" id="diagnoza" className="surface-aurora">
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
            {/* data-umami-event: Umami sam liczy kliknięcia (adres strony dokłada
                automatycznie), bez JavaScriptu po naszej stronie. Audyt 2026-10-12. */}
            <MagneticButton variant="primary" size="lg" href="/kontakt" data-umami-event="klik_cta_dol">
              {cta.label}
            </MagneticButton>
            <span className="text-caption max-w-[60ch] text-fg-subtle">{cta.dowod}</span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
