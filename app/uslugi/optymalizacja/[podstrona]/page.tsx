import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/components/seo/schemas';
import { getPodstrona, getPodstronyRodzica } from '@/lib/uslugi/podstrony';
import { okruszkiPodstrony } from '@/lib/uslugi/podstrony/okruszki';
import { dekorUslugi } from '@/lib/inf-kategorie';

import {
  ServiceHero,
  ServiceNarrative,
  PorownanieTabela,
  KrokiJakToDziala,
  RamaCeny,
  ServiceFAQ,
  ServiceCTA,
  PodstronyPowiazane,
} from '@/components/uslugi';

/**
 * PODSTRONY OPTYMALIZACJI — `/uslugi/optymalizacja/<podstrona>` (SSG).
 *
 * PO CO ISTNIEJĄ: `/uslugi/optymalizacja` sprzedaje cały proces GEO (diagnoza
 * plus naprawa plus pomiar) i odpowiada naraz na kilkanaście intencji. Fraza
 * „audyt widoczności w AI" ma własną intencję i własną decyzję zakupową
 * (jeden płatny krok), więc dostaje własny adres, który odpowiada na nią
 * w pierwszym akapicie.
 *
 * DLACZEGO KATALOG STATYCZNY `optymalizacja/`, A NIE `[usluga]/[podstrona]/`:
 * bliźniaczo jak `app/uslugi/voiceboty/[podstrona]/page.tsx` (patrz komentarz
 * tamże). Katalog rodzica NIE MA własnego `page.tsx`, więc niczego nie
 * przesłania: `/uslugi/optymalizacja` dalej obsługuje trasa `[usluga]`
 * i renderuje treść z rejestru USLUGI.
 * ZMIERZONE, NIE ZAŁOŻONE (build tego repo, Next 15.5.19):
 *   ● /uslugi/[usluga]                  -> /uslugi/optymalizacja, ...
 *   ● /uslugi/optymalizacja/[podstrona] -> /uslugi/optymalizacja/audyt-widocznosci-w-ai
 * plus sprawdzenie w przeglądarce na `next start`: rodzic 200, podstrona 200,
 * podstrony voicebotów bez zmian.
 *
 * SILNIK: te same komponenty co 10 stron usług i 3 podstrony voicebotów
 * (components/uslugi/*), ten sam kontrakt treści (`Usluga` + `rodzic`
 * + `dataAktualizacji`). Zero nowych komponentów, zero zmian CSS.
 *
 * KOLOR: `dekorUslugi(slug, rodzic)` nie zna slugów podstron optymalizacji,
 * więc spada na wpis rodzica i podstrona dziedziczy cyjan kategorii
 * „optymalizacja" (uwaga wdrożeniowa pakietu §4: żadnego nowego koloru dla
 * gałęzi GEO).
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

/** Slug usługi macierzystej = nazwa tego katalogu (jedno miejsce prawdy). */
const RODZIC = 'optymalizacja';

type Params = { podstrona: string };

/** SSG: podstrony przypisane do optymalizacji w rejestrze `lib/uslugi/podstrony`. */
export function generateStaticParams(): Params[] {
  return getPodstronyRodzica(RODZIC).map((p) => ({ podstrona: p.slug }));
}

/** Metadata per podstrona: title, opis, canonical `/uslugi/optymalizacja/<slug>`. */
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { podstrona: slug } = await params;
  const podstrona = getPodstrona(RODZIC, slug);

  if (!podstrona) {
    // Trasa nieznana (i tak dynamicParams=false zwróci 404) — minimalne, noindex.
    return buildMetadata({
      title: 'Nie znaleziono podstrony',
      description: 'Ta podstrona nie istnieje. Sprawdź ofertę pozycjonowania pod AI SimpleFast.ai.',
      path: `/uslugi/${RODZIC}/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: podstrona.metaTitle,
    description: podstrona.metaDescription,
    path: `/uslugi/${RODZIC}/${podstrona.slug}`,
  });
}

export default async function PodstronaOptymalizacjiPage({ params }: { params: Promise<Params> }) {
  const { podstrona: slug } = await params;
  const podstrona = getPodstrona(RODZIC, slug);

  if (!podstrona) notFound();

  const path = `/uslugi/${RODZIC}/${podstrona.slug}`;

  // JSON-LD składany tu, a nie przez uslugaSchemas(): tamten helper zakłada
  // breadcrumb `Strona główna -> Usługi -> [usługa]` z etykietą „Usługi"
  // przypiętą do `basePath`, więc dla podstrony wskazałby na
  // /uslugi/optymalizacja pod nazwą „Usługi". Service i FAQPage budujemy tymi
  // samymi funkcjami co reszta serwisu, tylko z pełną ścieżką podstrony.
  const service = serviceSchema({
    serviceType: podstrona.h1,
    name: podstrona.h1,
    description: podstrona.kapsula,
    path,
    minPrice: podstrona.ramaCeny.minPrice,
    /* 2026-08-31: bez tego audyt widoczności w AI (cena STAŁA 1490 zł netto)
       szedłby do schema jako „cena od", czyli inaczej niż mówi karta ceny. */
    cenaStala: podstrona.ramaCeny.cenaStala,
  });

  const faq = faqSchema(
    podstrona.faq.map((item) => ({ q: item.pytanie, a: item.odpowiedz })),
    path,
  );

  // ŚCIEŻKA OKRUSZKÓW 1:1 Z WIDOCZNĄ: łańcuch liczy `okruszkiPodstrony()`
  // (lib/uslugi/podstrony/okruszki.ts) — jedno źródło dla widoku i markupu,
  // bo BreadcrumbList nie może się rozjechać z tym, co widzi człowiek.
  // Rodzic „optymalizacja" nie ma dziś etykiety w mapie tamtego modułu, więc
  // łańcuch ma 3 poziomy (Strona główna / Usługi / H1) — TAK SAMO w widoku
  // i w JSON-LD, bo obie warstwy biorą tę samą tablicę.
  const okruszki = okruszkiPodstrony(podstrona);
  const okruszkiWidok = okruszki.map((o) => ({ name: o.name, href: o.path }));
  const breadcrumb = breadcrumbSchema(okruszki);

  return (
    <main id="main">
      {/* (1) Hero answer-first: breadcrumbs + badge + H1 + kapsuła + CTA */}
      <ServiceHero usluga={podstrona} okruszki={okruszkiWidok} />

      {/* (2) Problem (H2 jak pytanie) + bloki sekcji w tonie rodziny */}
      <ServiceNarrative
        h2={podstrona.problem.h2}
        tresc={podstrona.problem.tresc}
        tone="subtle"
        bloki={podstrona.problem.bloki}
        ton={dekorUslugi(podstrona.slug, podstrona.rodzic)}
      />

      {/* (3) Rozwiązanie (H2 jak pytanie) */}
      <ServiceNarrative
        h2={podstrona.rozwiazanie.h2}
        tresc={podstrona.rozwiazanie.tresc}
        bloki={podstrona.rozwiazanie.bloki}
        ton={dekorUslugi(podstrona.slug, podstrona.rodzic)}
      />

      {/* (4) Tabela porównawcza (obowiązkowa, surowy HTML) */}
      <PorownanieTabela tabela={podstrona.tabelaPorownawcza} />

      {/* (5) Jak to działa — 3 kroki */}
      <KrokiJakToDziala kroki={podstrona.kroki} />

      {/* (6) Rama ceny + zdanie powrotne do usługi macierzystej (linkPoradnik) */}
      <RamaCeny ramaCeny={podstrona.ramaCeny} slug={podstrona.slug} rodzic={podstrona.rodzic} />

      {/* (6b) Powiązania TEJ podstrony (rodzic, dowód, narzędzie). Sióstr w tej
          gałęzi jeszcze nie ma, więc komponent renderuje sam blok powiązań. */}
      <PodstronyPowiazane slug={podstrona.rodzic} pomin={podstrona.slug} wariant="kompakt" />

      {/* (7) FAQ — 8 pytań, 1:1 z FAQPage JSON-LD */}
      <ServiceFAQ faq={podstrona.faq} slug={podstrona.slug} rodzic={podstrona.rodzic} />

      {/* (8) CTA — jedna decyzja: zamawiam Sprint Diagnostyczny */}
      <ServiceCTA cta={podstrona.cta} />

      {/* JSON-LD serwerowo (w HTML przy 1. żądaniu, widoczny dla botów bez JS) */}
      <JsonLd data={service} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumb} />
    </main>
  );
}
