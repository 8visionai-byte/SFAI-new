import type { CSSProperties } from 'react';
import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';
import { Breadcrumbs } from './Breadcrumbs';
import { KATEGORIA_LABEL } from '@/lib/realizacje/types';
import type { Realizacja } from '@/lib/realizacje/types';
import {
  INF_KATEGORIA,
  INF_KATEGORIA_DEFAULT,
  INF_REALIZACJA_IKONA,
} from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * RealizacjaHero — SEKCJA 1 case study (answer-first).
 * Struktura: breadcrumbs + badge (kategoria) + meta (klient / branża) + H1
 * + kapsuła answer-first (surowy HTML = cytat dla LLM) + główne CTA + mikrokopia.
 *
 * KPI #1: H1 i kapsuła są w HTML przy 1. żądaniu (Reveal tylko wzbogaca, a przy
 * prefers-reduced-motion pokazuje treść natychmiast). CTA prowadzi do wspólnego
 * flow diagnozy (#diagnoza), tak jak na home i stronach usług.
 *
 * INFINITY v5 (spec §4 — hero w języku inf, treść 1:1): tone="transparent"
 * (globalne tło prześwituje jak home/ServiceHero), badge kategorii → kafelek
 * .inf-tile z ikoną SVG case'a + mono .inf-tag (KATEGORIA_LABEL = istniejące
 * pole), CTA = pigułka z glow (.inf-glow-cta jak home).
 */
export function RealizacjaHero({ realizacja }: { realizacja: Realizacja }) {
  const dekor = INF_KATEGORIA[realizacja.kategoria] ?? INF_KATEGORIA_DEFAULT;
  return (
    <Section tone="transparent" containerWidth="default">
      <div className="mx-auto max-w-narrow">
        <Breadcrumbs
          items={[
            { name: 'Strona główna', href: '/' },
            { name: 'Realizacje', href: '/realizacje' },
            { name: realizacja.h1 },
          ]}
        />

        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Kafelek ikony case'a — dekoracja aria-hidden (jak karty listy). */}
            <span
              aria-hidden="true"
              className="inf-tile"
              style={{ '--tile-c': dekor.c } as CSSProperties}
            >
              <InfIcon
                name={INF_REALIZACJA_IKONA[realizacja.slug] ?? INF_KATEGORIA_DEFAULT.ikona}
              />
            </span>
            <span className="inf-tag" style={{ color: dekor.odcien ?? dekor.c }}>
              {KATEGORIA_LABEL[realizacja.kategoria]}
            </span>
            <span className="text-caption text-fg-subtle">
              {realizacja.klient} · {realizacja.branza}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-display mt-5">{realizacja.h1}</h1>
        </Reveal>

        {/* Kapsuła answer-first — surowy HTML, cytat dla LLM (40–60 słów). */}
        <Reveal delay={0.1}>
          <p className="text-lead mt-6 text-fg-muted">{realizacja.kapsula}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-start gap-3">
            <MagneticButton
              variant="primary"
              size="lg"
              href={HOME_CTA.href}
              className="inf-glow-cta"
            >
              {HOME_CTA.label}
            </MagneticButton>
            <span className="text-caption max-w-[52ch] text-fg-subtle">
              {HOME_CTA.microcopy}
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
