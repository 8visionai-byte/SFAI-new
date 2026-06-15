import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { Section, Badge } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { BlogBreadcrumbs, PostCard, PostCardWkrotce } from '@/components/blog';
import { POSTS, POSTS_WKROTCE } from '@/lib/blog';

/**
 * LISTA BLOGA (/blog) — SSG. Hub wpisów: nagłówek + siatka kart opublikowanych
 * wpisów (z rejestru, posortowane po dacie) + sekcja „wkrótce" (tematy zaplanowane
 * bez trasy). Treść w HTML od razu (KPI #1).
 *
 * UWAGA (sitemap): trasa /blog jest w ROUTES `live: false` do czasu, aż blog
 * dojrzeje (faza 4 wypełni treść). Ten plik sprawia, że /blog ISTNIEJE (200 OK,
 * SSG); flip `live: true` w lib/site.ts to świadoma decyzja po uzupełnieniu treści.
 */
export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Blog o AI dla firm: poradniki bez żargonu',
    description:
      'Blog SimpleFast.ai: konkretne poradniki o AI dla małych firm. Koszty wdrożenia, chatboty i Agenci, voiceboty, AI Act, automatyzacja i dane w UE. Bez żargonu.',
    path: '/blog',
  });
}

export default function BlogPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]);

  return (
    <main id="main">
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <BlogBreadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Blog' },
            ]}
          />

          <Reveal>
            <Badge variant="accent" className="mt-6">
              Wiedza bez żargonu
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">Blog o AI dla firm</h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">
              Konkretne poradniki o AI dla małych firm. Tłumaczymy koszty, różnice
              między chatbotem a Agentem, voiceboty, przepisy i bezpieczeństwo danych.
              Prostym językiem, z liczbami, bez owijania w bawełnę.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Opublikowane wpisy (z rejestru, posortowane po dacie) */}
      <Section tone="subtle">
        <h2 className="sr-only">Najnowsze wpisy</h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={Math.min(i * 0.04, 0.2)}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Tematy w przygotowaniu (bez trasy — zero martwych linków) */}
      {POSTS_WKROTCE.length > 0 && (
        <Section tone="base">
          <div className="mx-auto max-w-narrow">
            <Reveal>
              <h2 className="text-h2">W przygotowaniu</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-lead mt-4 text-fg-muted">
                Tematy, nad którymi pracujemy. Wracaj, dopisujemy je na bieżąco.
              </p>
            </Reveal>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTS_WKROTCE.map((temat, i) => (
              <Reveal as="li" key={temat.tytul} delay={Math.min(i * 0.04, 0.2)}>
                <PostCardWkrotce temat={temat} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* BreadcrumbList wstrzyknięty serwerowo (Strona główna -> Blog) */}
      <JsonLd data={breadcrumb} />
    </main>
  );
}
