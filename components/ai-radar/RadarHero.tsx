import { Section, Badge } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { PostMeta } from '@/components/blog';
import { RadarBreadcrumbs } from './RadarBreadcrumbs';
import { RadarSzablonNotka } from './RadarSzablonNotka';
import type { RadarNews } from '@/lib/ai-radar';

/**
 * RadarHero — nagłówek newsa (answer-first), wzorzec spójny z PostHero bloga.
 * Struktura: breadcrumbs + badge „AI Radar" (+ badge szablonu) + H1 (= tytuł) +
 * HOOK jako wyróżniony lead + meta (data) + disclaimer szablonu (gdy `szablon`).
 *
 * KPI #1: H1 i hook są w HTML przy 1. żądaniu (Reveal tylko wzbogaca). Wąska
 * kolumna = czytelność. Breadcrumb „Centrum Wiedzy" jest tekstem (bez href),
 * dopóki hub /wiedza nie dostanie trasy — zero martwego linku.
 */
export function RadarHero({ news }: { news: RadarNews }) {
  return (
    <Section tone="base" containerWidth="default">
      <div className="mx-auto max-w-narrow">
        <RadarBreadcrumbs
          items={[
            { name: 'Strona główna', href: '/' },
            { name: 'Centrum Wiedzy', href: '/wiedza' },
            { name: 'AI Radar', href: '/ai-radar' },
            { name: news.tytul },
          ]}
        />

        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="accent">AI Radar</Badge>
            {news.szablon && <RadarSzablonNotka variant="card" />}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-display mt-5">{news.tytul}</h1>
        </Reveal>

        {/* HOOK — sekcja 1 formatu. Wyróżniony lead, cytat dla LLM. */}
        <Reveal delay={0.1}>
          <p className="text-lead mt-6 text-fg">{news.hook}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <PostMeta
            data={news.data}
            dataAktualizacji={news.dataAktualizacji}
            className="mt-6 flex flex-wrap items-center gap-x-1 gap-y-1"
          />
        </Reveal>

        {news.szablon && (
          <Reveal delay={0.2}>
            <div className="mt-6">
              <RadarSzablonNotka variant="full" />
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
