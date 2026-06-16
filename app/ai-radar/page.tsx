import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { Section, Badge } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { RadarBreadcrumbs, RadarCard } from '@/components/ai-radar';
import { RADAR_NEWS } from '@/lib/ai-radar';

/**
 * LISTA AI RADAR (/ai-radar) — SSG. Hub newsów „AI o 19:00": answer-first „co to
 * jest" + siatka kart wpisów (z rejestru, posortowane po dacie). Treść w HTML od
 * razu (KPI #1 = cytowalność LLM).
 *
 * SITEMAP: hub /ai-radar jest `live: true` w ROUTES (lib/site.ts) — strona istnieje
 * (200 OK, SSG, index), więc wchodzi do sitemapy. Pojedyncze wpisy /ai-radar/[slug]
 * dołącza sitemap z rejestru lib/ai-radar, ale TYLKO te realne (szablon !== true):
 * wpisy-szablony mają robots noindex, więc są świadomie pomijane w sitemapie (zelazna
 * zasada: zaden noindex URL). Realne newsy redakcji (Paweł/Make) wejdą automatycznie.
 *
 * BREADCRUMB: wg IA ścieżka to „Strona główna -> Centrum Wiedzy -> AI Radar". Crumb
 * „Centrum Wiedzy" wskazuje na hub /wiedza (live, 200 OK), spójnie z breadcrumbami
 * poradników w schemas.ts.
 */
export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'AI Radar: newsy AI dla firm. Co się zmieniło i co z tym zrobić',
    description:
      'AI Radar to newsy ze świata AI przefiltrowane przez jedno pytanie: co to znaczy dla Twojej firmy. Co się stało, czemu ważne dla MŚP, nasz filtr i co możesz zrobić. Bez hype.',
    path: '/ai-radar',
  });
}

export default function AiRadarPage() {
  // Schema breadcrumb (IA Centrum Wiedzy): Strona główna -> Centrum Wiedzy -> AI Radar.
  // Spójne z breadcrumbami poradników (schemas.ts) — hub /wiedza budowany równolegle.
  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Centrum Wiedzy', path: '/wiedza' },
    { name: 'AI Radar', path: '/ai-radar' },
  ]);

  return (
    <main id="main">
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <RadarBreadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Centrum Wiedzy', href: '/wiedza' },
              { name: 'AI Radar' },
            ]}
          />

          <Reveal>
            <Badge variant="accent" className="mt-6">
              AI o 19:00
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">
              AI Radar: newsy AI dla firm z filtrem, co to znaczy dla Ciebie
            </h1>
          </Reveal>

          {/* Answer-first „co to jest" — kapsuła do cytowania (HTML od razu). */}
          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">
              AI Radar to newsy ze świata AI przefiltrowane przez jedno pytanie:
              co to znaczy dla Twojej firmy. Każdy wpis mówi, co się stało, czemu
              to ważne dla małej firmy, jaki jest nasz filtr i co konkretnie
              możesz zrobić. Bez szumu, bez hype. Codziennie o 19:00.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Wpisy (z rejestru, posortowane po dacie) */}
      <Section tone="subtle">
        <h2 className="sr-only">Najnowsze newsy AI dla firm</h2>
        {RADAR_NEWS.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {RADAR_NEWS.map((news, i) => (
              <Reveal as="li" key={news.slug} delay={Math.min(i * 0.04, 0.2)}>
                <RadarCard news={news} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="text-body text-fg-muted">
            Pierwsze newsy pojawią się wkrótce. Wracaj o 19:00.
          </p>
        )}
      </Section>

      {/* BreadcrumbList wstrzyknięty serwerowo (Strona główna -> AI Radar) */}
      <JsonLd data={breadcrumb} />
    </main>
  );
}
