import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';

/**
 * RealizacjaCTA — SEKCJA 8 case'a (jedno główne CTA). Strefa "dark" (sekcja
 * domykająca). Przy CTA zawsze uczciwy dowód, bez zmyślonej liczby. Anchor
 * `#diagnoza` = ten sam flow diagnozy co home i strony usług (jedno CTA na stronę,
 * north star #3/#4).
 */
export function RealizacjaCTA() {
  return (
    <Section tone="base" theme="dark" id="diagnoza">
      <div className="mx-auto max-w-narrow text-center">
        <Reveal>
          <h2 className="text-h2">Policzmy, co da się zdjąć u Ciebie</h2>
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
              Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby, potem decyzja.
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
