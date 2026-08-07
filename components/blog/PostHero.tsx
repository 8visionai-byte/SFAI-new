import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { BlogBreadcrumbs } from './BlogBreadcrumbs';
import { PostMeta } from './PostMeta';
import type { Post } from '@/lib/blog/types';
import { INF_TYP, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * PostHero — nagłówek artykułu (answer-first), wzorzec spójny z ServiceHero usług.
 * Struktura: breadcrumbs + badge (kategoria) + H1 (= tytuł/primary query) +
 * lead answer-first (surowy HTML = cytat dla LLM) + meta (data publikacji/aktualizacji).
 *
 * KPI #1: H1 i lead są w HTML przy 1. żądaniu (Reveal tylko wzbogaca; przy
 * prefers-reduced-motion treść pojawia się natychmiast). Wąska kolumna = czytelność.
 *
 * INFINITY v5 (spec §4 — treść artykułu zostaje typograficzna, HERO/META w języku
 * inf, treść 1:1): tone="transparent" (globalne tło prześwituje), badge kategorii
 * → kafelek .inf-tile z ikoną SVG typu treści + mono .inf-tag (jak karty listy).
 */
export function PostHero({ post }: { post: Post }) {
  const dekor = INF_TYP.wpis;
  return (
    <Section tone="transparent" containerWidth="default">
      <div className="mx-auto max-w-narrow">
        <BlogBreadcrumbs
          items={[
            { name: 'Strona główna', href: '/' },
            { name: 'Blog', href: '/blog' },
            { name: post.tytul },
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
              {post.kategoria}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-display mt-5">{post.tytul}</h1>
        </Reveal>

        {/* Lead answer-first — surowy HTML, cytat dla LLM (2–3 zdania). */}
        <Reveal delay={0.1}>
          <p className="text-lead mt-6 text-fg-muted">{post.lead}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <PostMeta
            data={post.data}
            dataAktualizacji={post.dataAktualizacji}
            className="mt-6 flex flex-wrap items-center gap-x-1 gap-y-1"
          />
        </Reveal>
      </div>
    </Section>
  );
}
