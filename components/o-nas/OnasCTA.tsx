import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { O_NAS } from '@/lib/o-nas/content';

/**
 * OnasCTA — SEKCJA 6 (domykająca): JEDNO główne CTA strony (north star #3).
 * Strefa „dark" jak ServiceCTA (kolory semantyczne działają automatycznie).
 * Przy CTA zawsze dowód (north star #5): uczciwy sygnał (rozmowa z founderem,
 * pierwszy krok bezpłatny), bez zmyślonej liczby. Cel = /kontakt (formularz).
 */
export function OnasCTA() {
  return (
    <Section tone="base" theme="dark">
      <div className="mx-auto max-w-narrow text-center">
        <Reveal>
          <h2 className="text-h2">{O_NAS.cta.h2}</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-lead mx-auto mt-5 max-w-[52ch] text-fg-muted">
            {O_NAS.cta.tresc}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <MagneticButton variant="primary" size="lg" href={O_NAS.cta.href}>
              {O_NAS.cta.label}
            </MagneticButton>
            <span className="text-caption max-w-[60ch] text-fg-subtle">
              {O_NAS.cta.dowod}
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
