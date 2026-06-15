import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { SITE } from '@/lib/site';
import { REALIZACJE_SLUGS, getRealizacjaBySlug } from '@/lib/realizacje';

import { RealizacjaHero } from '@/components/realizacje/RealizacjaHero';
import { RealizacjaNarrative } from '@/components/realizacje/RealizacjaNarrative';
import { RealizacjaEfekt } from '@/components/realizacje/RealizacjaEfekt';
import { RealizacjaFAQ } from '@/components/realizacje/RealizacjaFAQ';
import { PowiazanaUsluga } from '@/components/realizacje/PowiazanaUsluga';
import { RealizacjaCTA } from '@/components/realizacje/RealizacjaCTA';

/**
 * DYNAMICZNA TRASA REALIZACJI — jeden szablon, N case studies, SSG.
 *
 * SILNIK (1 trasa + dane z lib/realizacje + komponenty z components/realizacje):
 *  - generateStaticParams() z rejestru REALIZACJE_SLUGS -> każdy case prerenderowany
 *    statycznie (KPI #1: pełna treść + metryka-dowód w HTML przy 1. żądaniu).
 *  - dynamicParams=false: slug spoza rejestru = 404 (zero martwych URL w sitemapie).
 *  - generateMetadata(): title/description/canonical per case.
 *  - JSON-LD BreadcrumbList (+ FAQPage gdy case ma faq) WSTRZYKNIĘTE SERWEROWO.
 *
 * Struktura strony (spec typu Realizacja): hero answer-first -> kontekst -> co
 * wdrożyliśmy -> EFEKT z liczbą -> powiązana usługa -> FAQ (opc.) -> CTA.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return REALIZACJE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getRealizacjaBySlug(slug);

  if (!r) {
    return buildMetadata({
      title: 'Nie znaleziono realizacji',
      description: 'Ta realizacja nie istnieje. Sprawdź listę wdrożeń SimpleFast.ai.',
      path: `/realizacje/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: r.metaTitle,
    description: r.metaDescription,
    path: `/realizacje/${r.slug}`,
  });
}

export default async function RealizacjaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const r = getRealizacjaBySlug(slug);

  if (!r) notFound();

  return (
    <main id="main">
      {/* Hero: breadcrumbs + badge(kategoria) + H1 + kapsuła answer-first + metryka + CTA */}
      <RealizacjaHero realizacja={r} />

      {/* Sekcja 2 — kontekst/problem klienta (H2 jak pytanie) */}
      <RealizacjaNarrative h2={r.kontekst.h2} tresc={r.kontekst.tresc} id="kontekst" />

      {/* Sekcja 3 — co wdrożyliśmy (przeplot tła dla rytmu) */}
      <RealizacjaNarrative
        h2={r.rozwiazanie.h2}
        tresc={r.rozwiazanie.tresc}
        tone="subtle"
        id="rozwiazanie"
      />

      {/* Sekcja 4 — EFEKT z liczbą (twardy dowód, bramka GEO) */}
      <RealizacjaEfekt efekt={r.efekt} />

      {/* Sekcja 5 — link do powiązanej usługi (linkowanie wewnętrzne GEO) */}
      <PowiazanaUsluga kategoria={r.kategoria} />

      {/* Sekcja 7 — FAQ (opcjonalne; tekst 1:1 z FAQPage JSON-LD niżej) */}
      {r.faq && r.faq.length > 0 && <RealizacjaFAQ faq={r.faq} />}

      {/* Sekcja 6 — jedno główne CTA (bezpłatna diagnoza) */}
      <RealizacjaCTA />

      {/* BreadcrumbList JSON-LD (Strona główna -> Realizacje -> case), serwerowo. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Realizacje', path: '/realizacje' },
          { name: r.h1, path: `/realizacje/${r.slug}` },
        ])}
      />

      {/* FAQPage JSON-LD — tylko gdy case ma FAQ (tekst 1:1 z sekcją RealizacjaFAQ). */}
      {r.faq && r.faq.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: r.faq.map((f) => ({
              '@type': 'Question',
              name: f.pytanie,
              acceptedAnswer: { '@type': 'Answer', text: f.odpowiedz },
            })),
          }}
        />
      )}

      <link rel="canonical" href={`${SITE.url}/realizacje/${r.slug}`} />
    </main>
  );
}
