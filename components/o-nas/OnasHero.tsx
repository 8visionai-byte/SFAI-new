import { Section, Badge, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/uslugi';
import { O_NAS } from '@/lib/o-nas/content';

/**
 * OnasHero — SEKCJA 1 strony O nas (answer-first), wzorzec spójny z ServiceHero:
 * breadcrumbs + badge + H1 (= money query „kto stoi za...") + kapsuła answer-first
 * (surowy HTML = cytat dla LLM) + jedno główne CTA + mikrokopia.
 *
 * KPI #1: H1 i kapsuła są w HTML przy 1. żądaniu (Reveal tylko wzbogaca; przy
 * prefers-reduced-motion treść jest natychmiast). Lewostronne wyrównanie (czytelność).
 */
export function OnasHero() {
  return (
    <Section tone="base" containerWidth="default">
      <div className="mx-auto max-w-narrow">
        <Breadcrumbs
          items={[{ name: 'Strona główna', href: '/' }, { name: 'O nas' }]}
        />

        <Reveal>
          <Badge variant="accent" className="mt-6">
            Dwóch founderów
          </Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-display mt-5">{O_NAS.h1}</h1>
        </Reveal>

        {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
        <Reveal delay={0.1}>
          <p className="text-lead mt-6 text-fg-muted">{O_NAS.kapsula}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-start gap-3">
            <MagneticButton variant="primary" size="lg" href={O_NAS.cta.href}>
              {O_NAS.cta.label}
            </MagneticButton>
            <span className="text-caption max-w-[52ch] text-fg-subtle">
              {O_NAS.cta.dowod}
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
