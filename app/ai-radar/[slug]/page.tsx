import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/components/seo/schemas';
import { RADAR_SLUGS, getNewsBySlug } from '@/lib/ai-radar';

import { RadarHero, RadarBody, RadarCTA } from '@/components/ai-radar';

/**
 * DYNAMICZNA TRASA WPISÓW AI RADAR — jeden szablon, N newsów, SSG.
 *
 * SILNIK (1 trasa + dane z lib/ai-radar + komponenty z components/ai-radar):
 *  - generateStaticParams() bierze slugi z rejestru -> Next prerenderuje każdy news
 *    statycznie (KPI #1: pełna treść w HTML przy 1. żądaniu, nie CSR).
 *  - dynamicParams=false: każdy slug spoza rejestru = 404 (sitemap bez martwych URL).
 *  - generateMetadata() buduje title/description/canonical per news. Wpisy-SZABLONY
 *    (`szablon: true`) dostają robots noindex — nie chcemy, by przykład formatu rankował
 *    jako twierdzenie o realnym wydarzeniu (zero zmyślania faktów).
 *  - render: hero (hook answer-first + ew. disclaimer szablonu) -> body (5 sekcji
 *    formatu z nagłówkami-pytaniami) -> CTA (powiązany poradnik + #diagnoza). JSON-LD
 *    Article + BreadcrumbList WSTRZYKNIĘTE SERWEROWO (widoczne dla botów bez JS).
 *
 * UWAGA (live w sitemapie): trasa /ai-radar jest w ROUTES `live:false`. Ten plik sprawia,
 * że URL-e newsów ISTNIEJĄ (200 OK) i są SSG, ale do sitemap.xml wejdą po świadomym
 * podłączeniu rejestru ai-radar w app/sitemap.ts i flipie `live:true` (po dodaniu
 * realnych newsów przez redakcję). To celowe rozdzielenie: „strona gotowa" vs „ogłoszona".
 *
 * UWAGA (schema): budujemy Article + BreadcrumbList tutaj z prymitywów articleSchema/
 * breadcrumbSchema (a nie z osobnego radarSchemas) — `schemas.ts` jest współdzielony i
 * modyfikowany równolegle (poradniki), więc nie dokładamy tam helpera. Logika mapowania
 * jest minimalna i lokalna. Article.description = hook (kapsuła do cytowania).
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

type Params = { slug: string };

/** SSG: lista slugów z rejestru = zbiór newsów do prerenderu. */
export function generateStaticParams(): Params[] {
  return RADAR_SLUGS.map((slug) => ({ slug }));
}

/** Metadata per news: title z marką (template w layout), opis, canonical. Szablon = noindex. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    return buildMetadata({
      title: 'Nie znaleziono newsa',
      description:
        'Ten news nie istnieje. Sprawdź listę newsów w AI Radar SimpleFast.ai.',
      path: `/ai-radar/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: news.metaTitle,
    description: news.metaDescription,
    path: `/ai-radar/${news.slug}`,
    // Wpisy-szablony: noindex (przykład formatu, nie realny news).
    noindex: news.szablon === true,
  });
}

export default async function RadarNewsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) notFound();

  const path = `/ai-radar/${news.slug}`;

  // Article — opis = hook (kapsuła answer-first). Sekcja „AI Radar" porządkuje encję.
  const article = articleSchema({
    headline: news.tytul,
    description: news.hook,
    path,
    datePublished: news.data,
    dateModified: news.dataAktualizacji,
    section: 'AI Radar',
    keywords: news.queries,
  });

  // BreadcrumbList (IA Centrum Wiedzy): Strona główna -> Centrum Wiedzy -> AI Radar -> [news].
  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Centrum Wiedzy', path: '/wiedza' },
    { name: 'AI Radar', path: '/ai-radar' },
    { name: news.tytul, path },
  ]);

  return (
    <main id="main">
      {/* SEKCJA 1 (HOOK) + meta + disclaimer szablonu */}
      <RadarHero news={news} />

      {/* SEKCJE 2–5 formatu (nagłówki jak pytania) + ew. źródła */}
      <RadarBody news={news} />

      {/* SEKCJA 6 (stała): powiązany poradnik + jedno CTA -> #diagnoza */}
      <RadarCTA news={news} />

      {/*
        JSON-LD wstrzyknięty SERWEROWO (w HTML przy 1. żądaniu, widoczny dla botów):
        - Article: author -> Paweł, publisher -> #organization (po @id); daty realne z newsa.
        - BreadcrumbList: Strona główna -> Centrum Wiedzy -> AI Radar -> [news].
        Wpisy-szablony są noindex (metadata), więc Article nie jest traktowany jako fakt.
      */}
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
    </main>
  );
}
