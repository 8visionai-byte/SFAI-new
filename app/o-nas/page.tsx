import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { aboutSchemas } from '@/components/seo/about-schemas';
import { O_NAS, FOUNDER_PHOTOS } from '@/lib/o-nas/content';

import {
  OnasHero,
  OnasHistoria,
  OnasSymbolika,
  OnasFounderzy,
  OnasPodejscie,
  OnasWartosci,
  OnasCTA,
} from '@/components/o-nas';

/**
 * STRONA /o-nas — E-E-A-T (kto stoi za firmą), SSG (wzorzec jak app/uslugi).
 *
 * SILNIK (1 strona statyczna + dane z lib/o-nas + sekcje z components/o-nas):
 *  - force-static: pełna treść w HTML przy 1. żądaniu (KPI #1: cytowalność LLM,
 *    nie CSR). H1 + kapsuła answer-first widoczne dla botów bez JS.
 *  - generateMetadata(): title/description/canonical/OG z buildMetadata.
 *  - JSON-LD WSTRZYKNIĘTY SERWEROWO: AboutPage + Person × 2 (founders, worksFor ->
 *    #organization) + BreadcrumbList. Organization + WebSite są globalne (layout.tsx),
 *    więc ich NIE dublujemy — Person-y linkują się do nich po @id (jeden graf encji).
 *
 * Zdjęcia founderów: INPUT PAWŁA. Do schematu Person.image wchodzą tylko gdy
 * SITE.assetsReady (inaczej martwy 404 psułby encję) — sterowane w aboutSchemas.
 */
export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: O_NAS.metaTitle,
    description: O_NAS.metaDescription,
    path: '/o-nas',
    // ogImage wejdzie, gdy SITE.assetsReady i plik /og/o-nas.png będzie istnieć.
  });
}

export default function ONasPage() {
  // Słownik imię -> ścieżka zdjęcia (dla Person.image; użyty tylko gdy assetsReady).
  const photoByName = Object.fromEntries(
    FOUNDER_PHOTOS.map((p) => [p.name, p.src])
  );
  const { about, persons, breadcrumb } = aboutSchemas('/o-nas', { photoByName });

  return (
    <main id="main">
      {/* (1) Hero answer-first: breadcrumbs + badge + H1 + kapsuła + CTA */}
      <OnasHero />

      {/* (2) Historia — prawdziwa (poznali się na szkoleniu, Paweł założył, Marcin dołącza) */}
      <OnasHistoria />

      {/* (3) Symbolika — cyrkiel/znak „SF": architekci, którzy łączą kroki krok po kroku */}
      <OnasSymbolika />

      {/* (4) Founderzy — dwie sylwetki (Paweł = Architekt AI/twarz; Marcin = współprowadzący) */}
      <OnasFounderzy />

      {/* (5) Podejście — jak pracujemy: pokaż problem -> mapujemy wąskie gardła -> wdrażamy */}
      <OnasPodejscie />

      {/* (6) Wartości — głos marki („AI nie zastępuje ludzi...") */}
      <OnasWartosci />

      {/* (7) CTA — jedno główne (umów bezpłatny audyt), z dowodem */}
      <OnasCTA />

      {/*
        JSON-LD serwerowo (w HTML przy 1. żądaniu, widoczny dla botów):
        - AboutPage: mainEntity -> #organization (strona opisuje firmę).
        - Person × 2: founders (worksFor -> #organization), stabilne @id #person-<slug>.
          E-mail tylko gdy zweryfikowany, image tylko gdy assetsReady (zero 404).
        - BreadcrumbList: Strona główna -> O nas (1:1 z widocznym Breadcrumbs w Hero).
      */}
      <JsonLd data={about} />
      {persons.map((p) => (
        <JsonLd key={String((p as { '@id': string })['@id'])} data={p} />
      ))}
      <JsonLd data={breadcrumb} />
    </main>
  );
}
