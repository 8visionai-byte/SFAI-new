import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/components/seo/schemas';
import { getPodstrona, getPodstronyRodzica } from '@/lib/uslugi/podstrony';
import { okruszkiPodstrony } from '@/lib/uslugi/podstrony/okruszki';
import { dekorUslugi } from '@/lib/inf-kategorie';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

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
 * SILNIK: te same komponenty co 10 stron usług (components/uslugi/*), ten sam
 * kontrakt treści (`Usluga` rozszerzony o `rodzic` i `dataAktualizacji`).
 * Zero nowych stylów, zero zmian CSS.
 *
 * v20: sekcji jest 9, nie 8 — doszła „Konkretne zastosowania" (siostrzane
 * podstrony) dokładnie w tym miejscu kolejności, w którym stoi u rodzica.
 * Powód i pomiar: raporty/pomiary-v20.md §1b, komentarz przy komponencie
 * `SiostrzanePodstrony` niżej.
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

  // ŚCIEŻKA OKRUSZKÓW 1:1 Z WIDOCZNĄ: łańcuch liczy `okruszkiPodstrony()`
  // (lib/uslugi/podstrony/okruszki.ts) — jedno źródło dla widoku i markupu,
  // bo BreadcrumbList nie może się rozjechać z tym, co widzi człowiek.
  // Poziom rodzica („Voiceboty" -> /uslugi/voiceboty) czeka tam za stałą
  // WIDOK_RENDERUJE_POZIOM_RODZICA: włącza się dopiero razem z propem
  // `okruszki` w ServiceHero (components/, cudzy zakres — patch w raporcie
  // SEO 2026-08-17d). Do tego czasu markup = 3 poziomy, tak jak ekran.
  // JEDNO źródło łańcucha dla widoku (ServiceHero) i markupu (JSON-LD).
  const okruszki = okruszkiPodstrony(podstrona);
  // Breadcrumbs (widok) mowi 'href', modul okruszkow 'path' — mapujemy raz,
  // zeby oba wyszly z tej samej tablicy (kontrola v19: linki znikaly).
  const okruszkiWidok = okruszki.map((o) => ({ name: o.name, href: o.path }));
  const breadcrumb = breadcrumbSchema(okruszki);

  return (
    <main id="main">
      {/* (1) Hero answer-first: breadcrumbs + badge + H1 + kapsuła + CTA */}
      <ServiceHero usluga={podstrona} okruszki={okruszkiWidok} />

      {/* (2) Problem (H2 jak pytanie). Runda struktury 2026-08-19: opcjonalne
          bloki sekcji renderują się silnikiem poradników w tonie rodziny. */}
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

      {/* (6) Rama ceny + link powrotny do usługi macierzystej (linkPoradnik) */}
      <RamaCeny ramaCeny={podstrona.ramaCeny} slug={podstrona.slug} rodzic={podstrona.rodzic} />

      {/* (6b) Konkretne zastosowania — siostrzane podstrony. KOLEJNOŚĆ 1:1
          z rodzicem (app/uslugi/[usluga]/page.tsx: RamaCeny -> PodstronyPowiazane
          -> ServiceFAQ), ten sam ton `subtle` i ten sam wariant ramki
          `.inf-card-edge`, którego podstronom brakowało. */}
      <PodstronyPowiazane slug={podstrona.rodzic} pomin={podstrona.slug} wariant="kompakt" />

      {/* (7) FAQ — 6 pytań, 1:1 z FAQPage JSON-LD */}
      <ServiceFAQ faq={podstrona.faq} slug={podstrona.slug} rodzic={podstrona.rodzic} />

      {/* (8) CTA — jedno główne, z dowodem */}
      <ServiceCTA cta={podstrona.cta} />

      {/* JSON-LD serwerowo (w HTML przy 1. żądaniu, widoczny dla botów bez JS) */}
      <JsonLd data={service} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumb} />
    </main>
  );
}
