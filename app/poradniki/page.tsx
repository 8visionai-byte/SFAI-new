import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { SITE } from '@/lib/site';
import { Section, Badge } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { PoradnikBreadcrumbs, PoradnikCard } from '@/components/poradniki';
import { PORADNIKI } from '@/lib/poradniki';

/**
 * LISTA PORADNIKÓW (/poradniki) — SSG (force-static). Dział „Poradniki AI dla
 * firm" w Centrum Wiedzy. Hub poradników: kapsuła answer-first + siatka kart
 * (z rejestru, posortowane po dacie). Treść w HTML od razu (KPI #1 cytowalność).
 *
 * BREADCRUMB: Strona główna -> Centrum Wiedzy -> Poradniki (poradniki to dział
 * huba /wiedza). Kapsuła i nagłówki keyword-rich pod money queries: ile kosztuje,
 * co automatyzować, jak wdrożyć.
 *
 * UWAGA (sitemap): trasy /poradniki i /poradniki/[slug] wchodzą do sitemapy przez
 * rejestr lib/poradniki + flip `live: true` w lib/site.ts (świadoma decyzja
 * integratora po weryfikacji 200 OK).
 */
export const dynamic = 'force-static';

const PATH = '/poradniki';
const CANONICAL = `${SITE.url}${PATH}`;

export const metadata: Metadata = buildMetadata({
  title: 'Poradniki AI dla firm: ile kosztuje, co automatyzować',
  description:
    'Poradniki AI dla firm: ile kosztuje chatbot i agent AI, które procesy zautomatyzować w biurze rachunkowym i jak policzyć zwrot. Answer-first, z liczbami, bez żargonu.',
  path: PATH,
});

export default function PoradnikiPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Centrum Wiedzy', path: '/wiedza' },
    { name: 'Poradniki', path: PATH },
  ]);

  return (
    <main id="main">
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <PoradnikBreadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Centrum Wiedzy', href: '/wiedza' },
              { name: 'Poradniki' },
            ]}
          />

          <Reveal>
            <Badge variant="accent" className="mt-6">
              Konkret krok po kroku
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">Poradniki AI dla firm</h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">
              Poradniki AI dla firm to konkretne odpowiedzi na pytania, które zadaje
              każdy właściciel przed wdrożeniem: ile to kosztuje, które procesy
              zautomatyzować najpierw i jak policzyć zwrot. Bez żargonu, z liczbami,
              krok po kroku.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 text-body text-fg-muted">
              Każdy poradnik kończy się tym, co zrobić dalej: darmowym narzędziem do
              policzenia i powiązaną usługą. AI nie zastępuje ludzi. AI zastępuje to,
              co ich zatrzymuje.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Opublikowane poradniki (z rejestru, posortowane po dacie) */}
      <Section tone="subtle">
        <h2 className="sr-only">Wszystkie poradniki</h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PORADNIKI.map((poradnik, i) => (
            <Reveal as="li" key={poradnik.slug} delay={Math.min(i * 0.04, 0.2)}>
              <PoradnikCard poradnik={poradnik} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* BreadcrumbList wstrzyknięty serwerowo (Strona główna -> Centrum Wiedzy -> Poradniki) */}
      <JsonLd data={breadcrumb} />
      <link rel="canonical" href={CANONICAL} />
    </main>
  );
}
