import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { uslugaSchemas } from '@/components/seo/schemas';
import { USLUGI_SLUGS, getUslugaBySlug } from '@/lib/uslugi';

import {
  ServiceHero,
  ServiceNarrative,
  PorownanieTabela,
  KrokiJakToDziala,
  RamaCeny,
  ServiceFAQ,
  ServiceCTA,
} from '@/components/uslugi';

/**
 * DYNAMICZNA TRASA STRON USŁUG — jeden szablon, 6 stron, SSG.
 *
 * SILNIK (1 trasa + dane z lib/uslugi + szablon z components/uslugi):
 *  - generateStaticParams() bierze slugi z rejestru -> Next prerenderuje 6 stron
 *    statycznie (KPI #1: pełna treść w HTML przy 1. żądaniu, nie CSR).
 *  - dynamicParams=false: każdy slug spoza rejestru = 404 (sitemap bez martwych URL).
 *  - generateMetadata() buduje title/description/canonical/OG per usługa.
 *  - render szablonu 8-sekcyjnego (answer-first) + JSON-LD Service+FAQPage+
 *    BreadcrumbList WSTRZYKNIĘTE SERWEROWO (widoczne dla botów bez JS).
 *
 * UWAGA (live w sitemapie): trasy /uslugi/* mają w ROUTES `live: false`. Ten plik
 * sprawia, że URL-e ISTNIEJĄ (200 OK) i są SSG, ale do sitemap.xml wejdą dopiero
 * po świadomym flipie `live: true` w lib/site.ts (po uzupełnieniu treści fazą 3 i
 * weryfikacji 200 OK). To celowe rozdzielenie: "strona gotowa" vs "ogłoszona botom".
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

type Params = { usluga: string };

/** SSG: lista slugów z rejestru = zbiór stron do prerenderu. */
export function generateStaticParams(): Params[] {
  return USLUGI_SLUGS.map((usluga) => ({ usluga }));
}

/** Metadata per usługa (spec 04 §7 / 05 §4C): title z marką, opis, canonical, OG. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { usluga: slug } = await params;
  const usluga = getUslugaBySlug(slug);

  if (!usluga) {
    // Trasa nieznana — minimalne, noindex (i tak dynamicParams=false zwróci 404).
    return buildMetadata({
      title: 'Nie znaleziono usługi',
      description: 'Ta usługa nie istnieje. Sprawdź listę usług SimpleFast.ai.',
      path: `/uslugi/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: usluga.metaTitle,
    description: usluga.metaDescription,
    path: `/uslugi/${usluga.slug}`,
    // ogImage per usługa wejdzie, gdy SITE.assetsReady i pliki będą istnieć:
    // ogImage: `/og/uslugi/${usluga.slug}.png`,
  });
}

export default async function UslugaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { usluga: slug } = await params;
  const usluga = getUslugaBySlug(slug);

  if (!usluga) notFound();

  // Komplet JSON-LD z jednego źródła (usluga) — tekst FAQ 1:1 z sekcją ServiceFAQ.
  const { service, faq, breadcrumb } = uslugaSchemas(usluga);

  return (
    <main id="main">
      {/* (1) Hero answer-first: breadcrumbs + badge + H1 + kapsuła + CTA */}
      <ServiceHero usluga={usluga} />

      {/* (2) Problem (H2 jak pytanie) */}
      <ServiceNarrative h2={usluga.problem.h2} tresc={usluga.problem.tresc} tone="subtle" />

      {/* (3) Rozwiązanie (H2 jak pytanie) */}
      <ServiceNarrative h2={usluga.rozwiazanie.h2} tresc={usluga.rozwiazanie.tresc} />

      {/* (4) Tabela porównawcza (obowiązkowa, surowy HTML) */}
      <PorownanieTabela tabela={usluga.tabelaPorownawcza} />

      {/* (5) Jak to działa — 3 kroki */}
      <KrokiJakToDziala kroki={usluga.kroki} />

      {/* (6) Rama ceny (value-based, bez zmyślonej kwoty) */}
      <RamaCeny ramaCeny={usluga.ramaCeny} />

      {/* (7) FAQ — 5–6 pytań, 1:1 z FAQPage JSON-LD */}
      <ServiceFAQ faq={usluga.faq} />

      {/* (8) CTA — jedno główne, z dowodem */}
      <ServiceCTA cta={usluga.cta} />

      {/*
        JSON-LD wstrzyknięty SERWEROWO (w HTML przy 1. żądaniu, widoczny dla botów):
        - Service: provider -> #organization (z layoutu) przez @id; offers tylko gdy
          realny minPrice (dziś brak -> bez ceny w schema).
        - FAQPage: tekst odpowiedzi 1:1 z sekcją ServiceFAQ (te same stringi usluga.faq).
        - BreadcrumbList: Strona główna -> Usługi -> [usługa].
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd data={service} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumb} />
    </main>
  );
}
