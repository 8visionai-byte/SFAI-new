import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { realizacjaSchemas } from '@/components/seo/schemas';
import { REALIZACJE_SLUGS, getRealizacjaBySlug } from '@/lib/realizacje';

import { RealizacjaHero } from '@/components/realizacje/RealizacjaHero';
import { RealizacjaNarrative } from '@/components/realizacje/RealizacjaNarrative';
import { KartaWdrozenia } from '@/components/realizacje/KartaWdrozenia';
import { RealizacjaEfekt } from '@/components/realizacje/RealizacjaEfekt';
import { RealizacjaFAQ } from '@/components/realizacje/RealizacjaFAQ';
import { PowiazanaUsluga } from '@/components/realizacje/PowiazanaUsluga';
import { RealizacjaCTA } from '@/components/realizacje/RealizacjaCTA';
import { LinkiKrzyzowe } from '@/components/poradniki/LinkiKrzyzowe';

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

  /* v22 (PLAN-v22 §3 P3 pkt 19): KOMPLET JSON-LD z jednego źródła.
     Strona budowała dotąd sam `breadcrumbSchema` i własny FAQPage inline, przez
     co gotowe `creativeWorkSchema` (istniejące w schemas.ts i zwracane przez
     `realizacjaSchemas`) NIGDY nie trafiało do HTML — sonda bota widziała na
     ośmiu realizacjach wyłącznie BreadcrumbList i FAQPage. To potwierdzona
     diagnoza z sekcji NIEZWERYFIKOWANE planu, nie domysł. Przejście na
     `realizacjaSchemas` dokłada CreativeWork i zdejmuje ręczne mapowanie FAQ,
     więc tekst w schemie jest z definicji tym samym stringiem, co na stronie. */
  const { work, breadcrumb, faq } = realizacjaSchemas(r);

  const powiazane = r.powiazane;

  return (
    <main id="main">
      {/* Hero: breadcrumbs + badge(kategoria) + H1 + kapsuła answer-first + tagi + CTA */}
      <RealizacjaHero realizacja={r} />

      {/* Sekcja 2 — kontekst/problem klienta (H2 jak pytanie).
          v22: akapit wchodzi w ramkę (wariant „top", ton kategorii case'a). */}
      <RealizacjaNarrative
        h2={r.kontekst.h2}
        tresc={r.kontekst.tresc}
        id="kontekst"
        wariant="top"
        kategoria={r.kategoria}
      />

      {/* Sekcja 3 — co wdrożyliśmy (przeplot tła dla rytmu).
          v22: ramka w wariancie „edge", żeby dwie sąsiednie karty się różniły. */}
      <RealizacjaNarrative
        h2={r.rozwiazanie.h2}
        tresc={r.rozwiazanie.tresc}
        tone="subtle"
        id="rozwiazanie"
        wariant="edge"
        kategoria={r.kategoria}
      />

      {/* Sekcja 4 (v22, PLAN-v22 §2.4) — KARTA WDROŻENIA: pierwsza prawdziwa
          <table> w tym szablonie (przed rundą 0/8 realizacji miało tabelę).
          Wyłącznie istniejące pola rejestru, zero nowych stringów treści. */}
      <KartaWdrozenia realizacja={r} />

      {/* Sekcja 5 — EFEKT z liczbą (twardy dowód, bramka GEO)
          v7 „naczynia połączone": `kategoria` = ton kart metryk (jak na hubie). */}
      <RealizacjaEfekt efekt={r.efekt} kategoria={r.kategoria} />

      {/* Sekcja 6 — link do powiązanej usługi (linkowanie wewnętrzne GEO) */}
      <PowiazanaUsluga kategoria={r.kategoria} />

      {/* Sekcja 7 — FAQ (opcjonalne; tekst 1:1 z FAQPage JSON-LD niżej) */}
      {r.faq && r.faq.length > 0 && <RealizacjaFAQ faq={r.faq} kategoria={r.kategoria} />}

      {/* Sekcja 8 (v22, PLAN-v22 §3 P2 pkt 11) — LINKI KRZYŻOWE: poradnik
          z teorią, dwa siostrzane wdrożenia i narzędzie do policzenia tego
          u siebie. Ten sam komponent, co pod poradnikami. Usługi celowo nie
          podajemy: wyznacza ją `kategoria` i renderuje `PowiazanaUsluga` wyżej,
          więc drugi link do tej samej strony byłby dublem, nie zyskiem. */}
      {powiazane && (
        <LinkiKrzyzowe
          poradniki={powiazane.poradniki}
          realizacje={powiazane.realizacje}
          narzedzia={powiazane.narzedzia}
        />
      )}

      {/* Sekcja 9 — jedno główne CTA (bezpłatna diagnoza) */}
      <RealizacjaCTA />

      {/* CreativeWork JSON-LD (v22) — case study jako dzieło, creator -> #organization,
          keywords = money queries case'a. Do v22 nie było go w HTML wcale. */}
      <JsonLd data={work} />

      {/* BreadcrumbList JSON-LD (Strona główna -> Realizacje -> case), serwerowo. */}
      <JsonLd data={breadcrumb} />

      {/* FAQPage JSON-LD — tylko gdy case ma FAQ (tekst 1:1 z sekcją RealizacjaFAQ). */}
      {faq && <JsonLd data={faq} />}

      {/* v22 (PLAN-v22 §3 P0 pkt 2): ręczny <link rel="canonical"> USUNIĘTY.
          `buildMetadata` w generateMetadata wystawia już kanoniczny URL tej trasy,
          więc ten znacznik dawał DRUGI rel=canonical w <head> (16 tras miało po
          dwa). Kryterium odbioru §5.4: dokładnie jeden canonical na trasę. */}
    </main>
  );
}
