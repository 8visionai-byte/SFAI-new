import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/components/seo/schemas';
import { getPodstrona, getPodstronyRodzica } from '@/lib/uslugi/podstrony';

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
 * PODSTRONY VOICEBOTÓW — `/uslugi/voiceboty/<podstrona>` (SSG).
 *
 * PO CO ISTNIEJĄ: `/uslugi/voiceboty` rankuje na kilkanaście intencji naraz
 * (windykacja, potwierdzanie wizyt, obsługa klienta, cena...) i na żadną
 * z nich nie odpowiada wprost, więc siedzi w trzeciej dziesiątce wyników.
 * Podstrona bierze JEDNĄ intencję i odpowiada na nią w pierwszym akapicie.
 *
 * DLACZEGO KATALOG STATYCZNY `voiceboty/`, A NIE `[usluga]/[podstrona]/`:
 * ZMIERZONE, nie założone. Testowy build Next 15.5.19 (ta sama wersja co
 * w repo) z `app/uslugi/[usluga]/page.tsx` + `app/uslugi/voiceboty/[podstrona]/page.tsx`
 * obok siebie wyprodukował KOMPLET tras bez konfliktu i bez ostrzeżeń:
 *   ● /uslugi/[usluga]            -> /uslugi/chatboty, /uslugi/voiceboty, ...
 *   ● /uslugi/voiceboty/[podstrona] -> /uslugi/voiceboty/windykacja, ...
 * a `/uslugi/voiceboty.html` dalej ma treść z rejestru USLUGI (katalog bez
 * `page.tsx` nie tworzy trasy, więc niczego nie przesłania). Wariant
 * zagnieżdżony wymagałby zamiast tego składania parametrów z rodzica
 * (generateStaticParams dziecka dostaje `params` rodzica) i dotykał katalogu
 * `[usluga]/`, w którym równolegle pracuje inny zakres.
 *
 * SILNIK: te same komponenty co 10 stron usług (components/uslugi/*), te same
 * 8 sekcji, ten sam kontrakt treści (`Usluga` rozszerzony o `rodzic`
 * i `dataAktualizacji`). Zero nowych stylów, zero zmian CSS.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

/** Slug usługi macierzystej = nazwa tego katalogu (jedno miejsce prawdy). */
const RODZIC = 'voiceboty';

type Params = { podstrona: string };

/** SSG: podstrony przypisane do voicebotów w rejestrze `lib/uslugi/podstrony`. */
export function generateStaticParams(): Params[] {
  return getPodstronyRodzica(RODZIC).map((p) => ({ podstrona: p.slug }));
}

/** Metadata per podstrona: title, opis, canonical `/uslugi/voiceboty/<slug>`. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { podstrona: slug } = await params;
  const podstrona = getPodstrona(RODZIC, slug);

  if (!podstrona) {
    // Trasa nieznana (i tak dynamicParams=false zwróci 404) — minimalne, noindex.
    return buildMetadata({
      title: 'Nie znaleziono podstrony',
      description: 'Ta podstrona nie istnieje. Sprawdź ofertę voicebotów SimpleFast.ai.',
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

export default async function PodstronaUslugiPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { podstrona: slug } = await params;
  const podstrona = getPodstrona(RODZIC, slug);

  if (!podstrona) notFound();

  const path = `/uslugi/${RODZIC}/${podstrona.slug}`;

  // JSON-LD składany tu, a nie przez uslugaSchemas(): tamten helper zakłada
  // breadcrumb `Strona główna -> Usługi -> [usługa]` z etykietą „Usługi"
  // przypiętą do `basePath`, więc dla podstrony wskazałby na /uslugi/voiceboty
  // pod nazwą „Usługi". Service i FAQPage budujemy tymi samymi funkcjami, co
  // reszta serwisu, tylko z pełną ścieżką podstrony.
  const service = serviceSchema({
    serviceType: podstrona.h1,
    name: podstrona.h1,
    description: podstrona.kapsula,
    path,
    minPrice: podstrona.ramaCeny.minPrice,
  });

  const faq = faqSchema(
    podstrona.faq.map((item) => ({ q: item.pytanie, a: item.odpowiedz })),
    path
  );

  // ŚCIEŻKA OKRUSZKÓW 1:1 Z WIDOCZNĄ: ServiceHero renderuje
  // „Strona główna / Usługi / [H1]" (ServiceHero.tsx), a repo trzyma zasadę,
  // że BreadcrumbList nie może się rozjechać z tym, co widzi człowiek.
  // Czwarty poziom (Voiceboty) wymaga propa w ServiceHero, czyli zmiany
  // w cudzym zakresie — zgłoszone w raporcie do dopięcia.
  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Usługi', path: '/uslugi' },
    { name: podstrona.h1, path },
  ]);

  return (
    <main id="main">
      {/* (1) Hero answer-first: breadcrumbs + badge + H1 + kapsuła + CTA */}
      <ServiceHero usluga={podstrona} />

      {/* (2) Problem (H2 jak pytanie) */}
      <ServiceNarrative h2={podstrona.problem.h2} tresc={podstrona.problem.tresc} tone="subtle" />

      {/* (3) Rozwiązanie (H2 jak pytanie) */}
      <ServiceNarrative h2={podstrona.rozwiazanie.h2} tresc={podstrona.rozwiazanie.tresc} />

      {/* (4) Tabela porównawcza (obowiązkowa, surowy HTML) */}
      <PorownanieTabela tabela={podstrona.tabelaPorownawcza} />

      {/* (5) Jak to działa — 3 kroki */}
      <KrokiJakToDziala kroki={podstrona.kroki} />

      {/* (6) Rama ceny + link powrotny do usługi macierzystej (linkPoradnik) */}
      <RamaCeny ramaCeny={podstrona.ramaCeny} slug={podstrona.slug} />

      {/* (7) FAQ — 6 pytań, 1:1 z FAQPage JSON-LD */}
      <ServiceFAQ faq={podstrona.faq} slug={podstrona.slug} />

      {/* (8) CTA — jedno główne, z dowodem */}
      <ServiceCTA cta={podstrona.cta} />

      {/* JSON-LD serwerowo (w HTML przy 1. żądaniu, widoczny dla botów bez JS) */}
      <JsonLd data={service} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumb} />
    </main>
  );
}
