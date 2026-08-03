import { Section, Badge, MagneticButton, SectionImage } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { POSITIONING } from '@/lib/site';
import { Breadcrumbs } from './Breadcrumbs';
import type { Usluga } from '@/lib/uslugi/types';
import { USLUGA_OBRAZY } from '@/lib/uslugi/obrazy';

/**
 * ServiceHero â€” SEKCJA 1 szablonu usĹ‚ugi (answer-first).
 * Struktura: breadcrumbs + badge (sub-claim kategorii) + H1 (= money query)
 * + kapsuĹ‚a answer-first (surowy HTML = cytat dla LLM) + gĹ‚Ăłwne CTA + mikrokopia.
 *
 * KPI #1: H1 i kapsuĹ‚a sÄ… w HTML przy 1. ĹĽÄ…daniu (Reveal tylko wzbogaca, a przy
 * prefers-reduced-motion pokazuje treĹ›Ä‡ natychmiast). Lewostronne wyrĂłwnanie
 * (czytelnoĹ›Ä‡ dĹ‚ugiej kapsuĹ‚y), spĂłjne z rytmem strony.
 *
 * ZDJÄCIE HERO (opcjonalne, mapa USLUGA_OBRAZY): desktop = druga kolumna po
 * prawej; mobile = BRAK zdjÄ™cia i ZERO transferu (wrapper hidden + loading lazy:
 * przeglÄ…darka nie pobiera lazy-obrazka w kontenerze display:none). Struktura
 * breadcrumbs/H1/kapsuĹ‚y/CTA pozostaje NIETKNIÄTA â€” tylko owiniÄ™ta gridem.
 */
export function ServiceHero({ usluga }: { usluga: Usluga }) {
  const obraz = USLUGA_OBRAZY[usluga.slug];

  const tresc = (
    <div className="mx-auto max-w-narrow">
      <Breadcrumbs
        items={[
          { name: 'Strona gĹ‚Ăłwna', href: '/' },
          { name: 'UsĹ‚ugi', href: '/uslugi' },
          { name: usluga.h1 },
        ]}
      />

      <Reveal eager>
        <Badge variant="accent" className="mt-6">
          {POSITIONING.subClaim}
        </Badge>
      </Reveal>

      <Reveal eager delay={0.05}>
        <h1 className="text-display mt-5">{usluga.h1}</h1>
      </Reveal>

      {/* KapsuĹ‚a answer-first â€” surowy HTML, cytat dla LLM (40â€“60 sĹ‚Ăłw). */}
      <Reveal eager delay={0.1}>
        <p className="text-lead mt-6 text-fg-muted">{usluga.kapsula}</p>
      </Reveal>

      <Reveal eager delay={0.15}>
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
  );

  if (!obraz) {
    return (
      <Section tone="base" containerWidth="default">
        {tresc}
      </Section>
    );
  }

  return (
    <Section tone="base" containerWidth="default">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {tresc}
        {/* Desktop-only: hidden + loading="lazy" = mobile nie pobiera pliku. */}
        <div className="hidden md:block">
          <Reveal eager delay={0.2}>
            <SectionImage
              src={obraz.src}
              alt={obraz.alt}
              sizes="(min-width: 768px) 45vw, 0px"
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
