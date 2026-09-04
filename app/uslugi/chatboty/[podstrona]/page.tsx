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
 * PODSTRONY CHATBOTÓW — `/uslugi/chatboty/<podstrona>` (SSG).
 *
 * PO CO ISTNIEJĄ: `/uslugi/chatboty` sprzedaje całą kategorię (chatbot na
 * stronie i w komunikatorach, wiedza firmy, zbieranie leadów, cena od 1790 zł
 * do 15000 zł netto) i odpowiada naraz na kilkanaście intencji. Konkretne
 * zapytanie ma własną intencję i własną decyzję zakupową, więc dostaje własny
 * adres, który odpowiada na nią w pierwszym akapicie, zamiast kazać
 * czytelnikowi szukać swojego akapitu na stronie rodzica.
 *
 * DLACZEGO KATALOG STATYCZNY `chatboty/`, A NIE `[usluga]/[podstrona]/`:
 * bliźniaczo jak `app/uslugi/voiceboty/[podstrona]/page.tsx`
 * i `app/uslugi/optymalizacja/[podstrona]/page.tsx` (patrz komentarze tamże).
 * Katalog rodzica NIE MA własnego `page.tsx`, więc niczego nie przesłania:
 * `/uslugi/chatboty` dalej obsługuje trasa `[usluga]` i renderuje treść
 * z rejestru USLUGI.
 * TEN SAM MECHANIZM ZMIERZONY JUŻ TRZY RAZY (build tego repo, Next 15.5.19):
 *   ● /uslugi/[usluga]            -> /uslugi/chatboty, /uslugi/voiceboty, ...
 *   ● /uslugi/voiceboty/[podstrona]    -> /uslugi/voiceboty/windykacja, ...
 *   ● /uslugi/optymalizacja/[podstrona]-> /uslugi/optymalizacja/audyt-..., ...
 * Trzecia gałąź nie dokłada nowego wzorca routingu, tylko trzeci katalog tego
 * samego kształtu. POTWIERDZONE buildem 2026-09-04: `/uslugi/chatboty/[podstrona]`
 * prerenderuje osiem adresów, a `/uslugi/chatboty` dalej wychodzi z trasy
 * `[usluga]`.
 *
 * SILNIK: te same komponenty co 10 stron usług, 3 podstrony voicebotów
 * i 8 podstron optymalizacji (components/uslugi/*), ten sam kontrakt treści
 * (`Usluga` + `rodzic` + `dataAktualizacji`). Zero nowych komponentów, zero
 * zmian CSS.
 *
 * KOLOR: `dekorUslugi(slug, rodzic)` nie zna slugów podstron chatbotów, więc
 * spada na wpis rodzica i podstrona dziedziczy cyjan kategorii „chatboty"
 * (`INF_KATEGORIA.chatboty` w `lib/inf-kategorie.ts`). Żadnego nowego koloru
 * dla tej gałęzi.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

/** Slug usługi macierzystej = nazwa tego katalogu (jedno miejsce prawdy). */
const RODZIC = 'chatboty';

type Params = { podstrona: string };

/** SSG: podstrony przypisane do chatbotów w rejestrze `lib/uslugi/podstrony`. */
export function generateStaticParams(): Params[] {
  return getPodstronyRodzica(RODZIC).map((p) => ({ podstrona: p.slug }));
}

/** Metadata per podstrona: title, opis, canonical `/uslugi/chatboty/<slug>`. */
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { podstrona: slug } = await params;
  const podstrona = getPodstrona(RODZIC, slug);

  if (!podstrona) {
    // Trasa nieznana (i tak dynamicParams=false zwróci 404) — minimalne, noindex.
    return buildMetadata({
      title: 'Nie znaleziono podstrony',
      description: 'Ta podstrona nie istnieje. Sprawdź ofertę chatbotów SimpleFast.ai.',
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

export default async function PodstronaChatbotowPage({ params }: { params: Promise<Params> }) {
  const { podstrona: slug } = await params;
  const podstrona = getPodstrona(RODZIC, slug);

  if (!podstrona) notFound();

  const path = `/uslugi/${RODZIC}/${podstrona.slug}`;

  // JSON-LD składany tu, a nie przez uslugaSchemas(): tamten helper zakłada
  // breadcrumb `Strona główna -> Usługi -> [usługa]` z etykietą „Usługi"
  // przypiętą do `basePath`, więc dla podstrony wskazałby na /uslugi/chatboty
  // pod nazwą „Usługi". Service i FAQPage budujemy tymi samymi funkcjami co
  // reszta serwisu, tylko z pełną ścieżką podstrony.
  const service = serviceSchema({
    serviceType: podstrona.h1,
    name: podstrona.h1,
    description: podstrona.kapsula,
    path,
    minPrice: podstrona.ramaCeny.minPrice,
    /* Flaga „widełki czy cena ostateczna" idzie do schemy z tego samego pola,
       z którego liczy ją karta ceny i kafel w hero (`ramaCeny.cenaStala`).
       Chatboty mają dziś widełki, więc kwota jedzie jako „cena od" — ale
       przekazujemy flagę, żeby podstrona z ceną stałą nie rozjechała się
       z tym, co widzi człowiek. */
    cenaStala: podstrona.ramaCeny.cenaStala,
  });

  const faq = faqSchema(
    podstrona.faq.map((item) => ({ q: item.pytanie, a: item.odpowiedz })),
    path,
  );

  // ŚCIEŻKA OKRUSZKÓW 1:1 Z WIDOCZNĄ: łańcuch liczy `okruszkiPodstrony()`
  // (lib/uslugi/podstrony/okruszki.ts) — jedno źródło dla widoku i markupu,
  // bo BreadcrumbList nie może się rozjechać z tym, co widzi człowiek.
  // Rodzic „chatboty" ma w mapie tamtego modułu etykietę „Chatboty", więc
  // łańcuch ma 4 poziomy (Strona główna / Usługi / Chatboty / H1) — TAK SAMO
  // w widoku i w JSON-LD, bo obie warstwy biorą tę samą tablicę.
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

      {/* (6b) Siedem sióstr z gałęzi chatbotów (siatka „Konkretne zastosowania",
          wariant kompakt, bez tej strony) plus powiązania TEJ podstrony
          (rodzic, dowód, narzędzie). KOLEJNOŚĆ 1:1 z rodzicem
          (app/uslugi/[usluga]/page.tsx: RamaCeny -> PodstronyPowiazane ->
          ServiceFAQ). */}
      <PodstronyPowiazane slug={podstrona.rodzic} pomin={podstrona.slug} wariant="kompakt" />

      {/* (7) FAQ — treść z pola `faq` podstrony, 1:1 z FAQPage JSON-LD */}
      <ServiceFAQ faq={podstrona.faq} slug={podstrona.slug} rodzic={podstrona.rodzic} />

      {/* (8) CTA — jedna decyzja, treść z pola `cta` podstrony */}
      <ServiceCTA cta={podstrona.cta} />

      {/* JSON-LD serwerowo (w HTML przy 1. żądaniu, widoczny dla botów bez JS) */}
      <JsonLd data={service} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumb} />
    </main>
  );
}
