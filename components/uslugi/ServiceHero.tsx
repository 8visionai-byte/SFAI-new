import type { CSSProperties } from 'react';
import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { POSITIONING } from '@/lib/site';
import { Breadcrumbs } from './Breadcrumbs';
import type { Usluga } from '@/lib/uslugi/types';

/**
 * ServiceHero — SEKCJA 1 szablonu usługi (answer-first).
 * Struktura: breadcrumbs + overline (sub-claim kategorii) + H1 (= money query)
 * + kapsuła answer-first (surowy HTML = cytat dla LLM) + chipy zaufania
 * + główne CTA + mikrokopia.
 *
 * KPI #1: H1 i kapsuła są w HTML przy 1. żądaniu (Reveal tylko wzbogaca, a przy
 * prefers-reduced-motion pokazuje treść natychmiast).
 *
 * INFINITY v3 (spec §ZDJĘCIA + §PODSTRONY — decyzja Pawła: zdjęcia WYLATUJĄ):
 *  - kadr FRAME (mapa USLUGA_OBRAZY) usunięty z renderu na wszystkich 10
 *    podstronach (pliki webp zostają w /public);
 *  - hero WYŚRODKOWANE jak home: jedna kolumna max-w-narrow, text-center,
 *    kolejność elementów i wszystkie treści 1:1;
 *  - tone="transparent": globalne .inf-stars/nebula prześwitują;
 *  - overline mono z liniami (.inf-overline-lines), chipy .inf-chip (frazy 1:1
 *    z hero home), CTA = pigułka z glow (.inf-glow-cta na MagneticButton —
 *    kontrakt `.sf-magnetic .inf-glow-cta` w globals.css).
 */
export function ServiceHero({ usluga }: { usluga: Usluga }) {
  return (
    <Section tone="transparent" containerWidth="default" space="lg">
      <div className="mx-auto max-w-narrow text-center">
        {/* Breadcrumbs zostają w DOM 1:1 (spójne z BreadcrumbList JSON-LD);
            centrowanie robi wrapper — komponent bez zmian. */}
        <div className="flex justify-center">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Usługi', href: '/uslugi' },
              { name: usluga.h1 },
            ]}
          />
        </div>

        <Reveal eager>
          <p className="inf-overline inf-overline-lines mt-6">
            {POSITIONING.subClaim}
          </p>
        </Reveal>

        <Reveal eager delay={0.05}>
          <h1 className="text-display mt-5">{usluga.h1}</h1>
        </Reveal>

        {/* Kapsuła answer-first — surowy HTML, cytat dla LLM (40–60 słów). */}
        <Reveal eager delay={0.1}>
          <p className="text-lead mx-auto mt-6 max-w-measure-lead text-fg-muted">{usluga.kapsula}</p>
        </Reveal>

        {/* Chipy zaufania — frazy 1:1 z hero home (zero nowych treści marki);
            kolor obwódki to czysta dekoracja (--chip-c, trasa marki jak home). */}
        <Reveal eager delay={0.12}>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            <li className="inf-chip" style={{ '--chip-c': '#2B7CFF' } as CSSProperties}>
              Twoje dane zostają w UE
            </li>
            <li className="inf-chip" style={{ '--chip-c': '#7A3CF0' } as CSSProperties}>
              RODO i AI Act
            </li>
            <li className="inf-chip" style={{ '--chip-c': '#22E06B' } as CSSProperties}>
              Płacisz za efekt
            </li>
          </ul>
        </Reveal>

        <Reveal eager delay={0.15}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <MagneticButton
              variant="primary"
              size="lg"
              href={usluga.cta.href}
              className="inf-glow-cta"
            >
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
