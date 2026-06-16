import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { poradnikSchemas } from '@/components/seo/schemas';
import { PORADNIKI_SLUGS, getPoradnikBySlug } from '@/lib/poradniki';

import { PostBody, PostFAQ } from '@/components/blog';
import { PoradnikHero, LinkiKrzyzowe, PoradnikCTA } from '@/components/poradniki';

/**
 * DYNAMICZNA TRASA PORADNIKÓW — jeden szablon, N poradników, SSG.
 *
 * SILNIK (1 trasa + dane z lib/poradniki + komponenty z components/poradniki + blog):
 *  - generateStaticParams() bierze slugi z rejestru -> Next prerenderuje każdy
 *    poradnik statycznie (KPI #1: pełna treść w HTML przy 1. żądaniu, nie CSR).
 *  - dynamicParams=false: każdy slug spoza rejestru = 404 (sitemap bez martwych URL).
 *  - generateMetadata() buduje title/description/canonical/OG per poradnik.
 *  - render: hero answer-first + treść (bloki, reużyty PostBody) + opcjonalne FAQ
 *    (reużyty PostFAQ) + linki krzyżowe do usług/narzędzi + CTA -> #diagnoza.
 *    JSON-LD Article + BreadcrumbList (Strona główna -> Centrum Wiedzy -> Poradniki
 *    -> [poradnik]) + FAQPage WSTRZYKNIĘTE SERWEROWO (widoczne dla botów bez JS).
 *
 * UWAGA (live w sitemapie): trasy /poradniki i /poradniki/[slug] wchodzą do
 * sitemap.xml przez rejestr lib/poradniki + flip `live: true` w lib/site.ts po
 * weryfikacji 200 OK (świadome rozdzielenie „strona gotowa" vs „ogłoszona botom").
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

type Params = { slug: string };

/** SSG: lista slugów z rejestru = zbiór poradników do prerenderu. */
export function generateStaticParams(): Params[] {
  return PORADNIKI_SLUGS.map((slug) => ({ slug }));
}

/** Metadata per poradnik: title z marką (template w layout), opis, canonical, OG. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const poradnik = getPoradnikBySlug(slug);

  if (!poradnik) {
    return buildMetadata({
      title: 'Nie znaleziono poradnika',
      description:
        'Ten poradnik nie istnieje. Sprawdź listę poradników AI dla firm w Centrum Wiedzy SimpleFast.ai.',
      path: `/poradniki/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: poradnik.metaTitle,
    description: poradnik.metaDescription,
    path: `/poradniki/${poradnik.slug}`,
    // ogImage per poradnik wejdzie, gdy SITE.assetsReady i pliki będą istnieć:
    // ogImage: `/og/poradniki/${poradnik.slug}.png`,
  });
}

export default async function PoradnikPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const poradnik = getPoradnikBySlug(slug);

  if (!poradnik) notFound();

  // Komplet JSON-LD z jednego źródła (poradnik) — tekst FAQ 1:1 z sekcją PostFAQ.
  const { article, breadcrumb, faq } = poradnikSchemas(poradnik);

  return (
    <main id="main">
      {/* Hero answer-first: breadcrumbs (Centrum Wiedzy -> Poradniki) + kategoria + H1 + lead + meta */}
      <PoradnikHero poradnik={poradnik} />

      {/* Treść poradnika — bloki renderowane serwerowo (reużyty PostBody bloga) */}
      <PostBody tresc={poradnik.tresc} />

      {/* Opcjonalne FAQ — 1:1 z FAQPage JSON-LD (reużyty PostFAQ bloga) */}
      {poradnik.faq && poradnik.faq.length > 0 && <PostFAQ faq={poradnik.faq} />}

      {/* Linkowanie krzyżowe do oferty: powiązane usługi + narzędzia (realne trasy) */}
      <LinkiKrzyzowe
        uslugi={poradnik.powiazaneUslugi}
        narzedzia={poradnik.powiazaneNarzedzia}
      />

      {/* CTA domykające — jedno główne, wspólny flow diagnozy (#diagnoza) */}
      <PoradnikCTA />

      {/*
        JSON-LD wstrzyknięty SERWEROWO (w HTML przy 1. żądaniu, widoczny dla botów):
        - Article: author -> Paweł, publisher -> #organization przez @id;
          datePublished/dateModified z realnych dat poradnika.
        - BreadcrumbList: Strona główna -> Centrum Wiedzy -> Poradniki -> [poradnik].
        - FAQPage: tylko gdy poradnik.faq istnieje (tekst 1:1 z sekcją PostFAQ).
      */}
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      {faq && <JsonLd data={faq} />}
    </main>
  );
}
