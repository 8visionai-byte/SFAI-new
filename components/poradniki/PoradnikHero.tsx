import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { PostMeta } from '@/components/blog';
import { PoradnikBreadcrumbs } from './PoradnikBreadcrumbs';
import type { Poradnik } from '@/lib/poradniki/types';
import { INF_TYP, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * PoradnikHero — nagłówek poradnika (answer-first), wzorzec spójny z PostHero bloga.
 * Struktura: breadcrumbs (przez Centrum Wiedzy -> Poradniki) + badge (kategoria) +
 * H1 (= tytuł/primary money query) + lead answer-first (surowy HTML = cytat dla LLM)
 * + meta (data publikacji/aktualizacji, reużyta z components/blog/PostMeta).
 *
 * KPI #1: H1 i lead są w HTML przy 1. żądaniu (Reveal tylko wzbogaca). Wąska
 * kolumna = czytelność. Breadcrumbs 1:1 z BreadcrumbList JSON-LD (poradnikSchemas).
 */
export function PoradnikHero({ poradnik }: { poradnik: Poradnik }) {
  // INFINITY v5 (spec §4 — treść artykułu zostaje typograficzna, HERO/META
  // w języku inf, treść 1:1): tone="transparent", badge kategorii → kafelek
  // .inf-tile z ikoną SVG typu treści + mono .inf-tag (jak karty listy).
  const dekor = INF_TYP.poradnik;
  return (
    <Section tone="transparent" containerWidth="default">
      <div className="mx-auto max-w-narrow">
        <PoradnikBreadcrumbs
          items={[
            { name: 'Strona główna', href: '/' },
            { name: 'Centrum Wiedzy', href: '/wiedza' },
            { name: 'Poradniki', href: '/poradniki' },
            { name: poradnik.tytul },
          ]}
        />

        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Kafelek ikony typu treści — dekoracja aria-hidden (jak karty). */}
            <span
              aria-hidden="true"
              className="inf-tile"
              style={{ '--tile-c': dekor.c } as CSSProperties}
            >
              <InfIcon name={dekor.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
            </span>
            <span className="inf-tag" style={{ color: dekor.odcien ?? dekor.c }}>
              {poradnik.kategoria}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-display mt-5">{poradnik.tytul}</h1>
        </Reveal>

        {/* Lead answer-first — surowy HTML, cytat dla LLM (2–4 zdania). */}
        <Reveal delay={0.1}>
          <p className="text-lead mt-6 text-fg-muted">{poradnik.lead}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <PostMeta
            data={poradnik.data}
            dataAktualizacji={poradnik.dataAktualizacji}
            className="mt-6 flex flex-wrap items-center gap-x-1 gap-y-1"
          />
        </Reveal>
      </div>
    </Section>
  );
}
