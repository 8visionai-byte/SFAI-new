import type { Metadata } from 'next';

import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, itemListSchema, faqSchemaPl } from '@/components/seo/schemas';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { PoradnikBreadcrumbs, PoradnikCard } from '@/components/poradniki';
import { PORADNIKI } from '@/lib/poradniki';
import { INF_TYP } from '@/lib/inf-kategorie';
import { PasekMetryk } from '@/components/sections/PasekMetryk';
import { TabelaRejestru } from '@/components/sections/TabelaRejestru';
import { HubFAQ } from '@/components/sections/HubFAQ';

/**
 * LISTA PORADNIKÓW (/poradniki) — SSG (force-static). Dział „Poradniki AI dla
 * firm" w Centrum Wiedzy. Hub poradników: kapsuła answer-first + siatka kart
 * (z rejestru, posortowane po dacie). Treść w HTML od razu (KPI #1 cytowalność).
 *
 * BREADCRUMB: Strona główna -> Centrum Wiedzy -> Poradniki (poradniki to dział
 * huba /wiedza). Kapsuła i nagłówki keyword-rich pod money queries: ile kosztuje,
 * co automatyzować, jak wdrożyć.
 *
 * UWAGA (sitemap): trasy /poradniki i /poradniki/[slug] wchodzą do sitemapy przez
 * rejestr lib/poradniki + flip `live: true` w lib/site.ts (świadoma decyzja
 * integratora po weryfikacji 200 OK).
 */
export const dynamic = 'force-static';

const PATH = '/poradniki';

export const metadata: Metadata = buildMetadata({
  title: 'Poradniki AI dla firm: ile kosztuje, co automatyzować',
  description:
    'Poradniki AI dla firm: ile kosztuje chatbot i agent AI, które procesy zautomatyzować w biurze rachunkowym i jak policzyć zwrot. Answer-first, z liczbami, bez żargonu.',
  path: PATH,
});

/** TON HUBU = cyjan poradnika z INF_TYP, ten sam, którym świecą karty na liście. */
const TON = INF_TYP.poradnik;

/* ─────────────────────────────────────────────────────────────────────
   LICZBY HUBU — POLICZONE Z REJESTRU PRZY BUILDZIE (PLAN-v22 §1.7a). */
const LICZBA_PORADNIKOW = PORADNIKI.length;
const LICZBA_KATEGORII = new Set(PORADNIKI.map((p) => p.kategoria)).size;
const LICZBA_SEKCJI = PORADNIKI.reduce(
  (suma, p) => suma + p.tresc.filter((b) => b.typ === 'sekcja' || b.typ === 'naglowek').length,
  0
);
const LICZBA_PYTAN = PORADNIKI.reduce((suma, p) => suma + (p.faq?.length ?? 0), 0);
const OSTATNIA_AKTUALIZACJA = PORADNIKI.reduce(
  (max, p) => (p.dataAktualizacji > max ? p.dataAktualizacji : max),
  PORADNIKI[0]?.dataAktualizacji ?? ''
);

const METRYKI_HUBU = [
  { wartosc: String(LICZBA_PORADNIKOW), opis: 'poradniki krok po kroku' },
  { wartosc: String(LICZBA_KATEGORII), opis: 'obszary tematyczne' },
  { wartosc: String(LICZBA_SEKCJI), opis: 'sekcje z konkretem' },
  {
    wartosc: String(LICZBA_PYTAN),
    opis: 'odpowiedzi na częste pytania',
    zrodlo: 'sekcje FAQ w poradnikach',
  },
];

/* Tabela orientacyjna: kategoria i data aktualizacji, czyli pola po których
   wybiera się poradnik. Wiersze mapowane z rejestru, nigdy literałami. */
const WIERSZE_TABELI = PORADNIKI.map((p) => [p.tytul, p.kategoria, p.dataAktualizacji]);

/**
 * FAQ HUBU — źródła zgodne z §2.6 planu: (a) liczba z rejestru, (b) cena locked,
 * (c) zdanie stojące już na istniejącej stronie, (d) zasada z kontraktu typu.
 */
const FAQ_HUBU = [
  {
    /* (a) rejestr poradników. */
    pytanie: 'Ile poradników tu jest i o czym?',
    odpowiedz: `Dziś ${LICZBA_PORADNIKOW} poradniki w ${LICZBA_KATEGORII} obszarach, razem ${LICZBA_SEKCJI} sekcji konkretu. Odpowiadają na pytania o koszt chatbota, koszt agenta AI, koszt automatyzacji i o to, które procesy w biurze rachunkowym brać najpierw.`,
  },
  {
    /* (a) dataAktualizacji z rejestru. */
    pytanie: 'Czy poradniki są aktualizowane?',
    odpowiedz: `Tak. Każdy ma widoczną datę publikacji i datę ostatniej realnej aktualizacji treści, a te same daty stoją w tabeli niżej. Najświeższa w tym dziale to ${OSTATNIA_AKTUALIZACJA}. Dat nie podbijamy automatycznie przy wdrożeniu strony.`,
  },
  {
    /* (c) zdanie z kapsuły tej strony: „Każdy poradnik kończy się tym, co zrobić
       dalej: darmowym narzędziem do policzenia i powiązaną usługą". */
    pytanie: 'Czy mogę policzyć to u siebie, zanim się odezwę?',
    odpowiedz:
      'Tak, i o to chodzi. Każdy poradnik kończy się wejściem do darmowego narzędzia: kalkulatora oszczędności, kalkulatora procesu albo testu gotowości AI. Liczysz bez logowania i bez rozmowy z nami. Dopiero z liczbą w ręku warto pytać o wycenę.',
  },
  {
    /* (b) ceny locked, zdania 1:1 ze stron usług i poradnika o automatyzacji. */
    pytanie: 'Ile kosztuje wdrożenie tego, o czym piszecie?',
    odpowiedz:
      'Chatbot startuje od 990 zł, voicebot od 2500 zł, a automatyzacja procesu kosztuje zwykle od 3000 do 10000 zł. Audyt AI to 1490 zł i odliczamy go od wdrożenia, a pakiet AI Start z pierwszą automatyzacją na próbę to 1990 zł. Dokładna wycena po bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
  },
  {
    /* (c) dwa modele rozliczenia, zdanie 1:1 z /uslugi/chatboty. */
    pytanie: 'Czy po wdrożeniu płacę abonament?',
    odpowiedz:
      'Masz to do wyboru. Przekazujemy Ci całą infrastrukturę i wtedy nie płacisz abonamentu, albo projekt zostaje u nas pod opieką i wtedy jest opłata utrzymaniowa od 99 do 599 zł miesięcznie.',
  },
];

export default function PoradnikiPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Centrum Wiedzy', path: '/wiedza' },
    { name: 'Poradniki', path: PATH },
  ]);

  return (
    <main id="main">
      {/* INFINITY v2: hero bez solidnego tła (globalny starfield prześwituje);
          badge-eyebrow → mono overline .inf-overline (treść 1:1). */}
      <Section tone="transparent">
        <div className="mx-auto max-w-narrow">
          <PoradnikBreadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Centrum Wiedzy', href: '/wiedza' },
              { name: 'Poradniki' },
            ]}
          />

          <Reveal>
            <p className="inf-overline inf-overline-lines mt-6">
              Konkret krok po kroku
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">Poradniki AI dla firm</h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">
              Poradniki AI dla firm to konkretne odpowiedzi na pytania, które zadaje
              każdy właściciel przed wdrożeniem: ile to kosztuje, które procesy
              zautomatyzować najpierw i jak policzyć zwrot. Bez żargonu, z liczbami,
              krok po kroku.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 text-body text-fg-muted">
              Każdy poradnik kończy się tym, co zrobić dalej: darmowym narzędziem do
              policzenia i powiązaną usługą. AI nie zastępuje ludzi. AI zastępuje to,
              co ich zatrzymuje.
            </p>
          </Reveal>

          {/* v22 (PLAN-v22 §2.6 pkt 2): PAS METRYK pod hero, wszystkie cztery
              liczby policzone z rejestru poradników przy buildzie. */}
          <Reveal delay={0.2}>
            <PasekMetryk kafle={METRYKI_HUBU} ton={TON} className="mt-9" />
          </Reveal>
        </div>
      </Section>

      {/* Opublikowane poradniki (z rejestru, posortowane po dacie) */}
      <Section tone="subtle">
        <h2 className="sr-only">Wszystkie poradniki</h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PORADNIKI.map((poradnik, i) => (
            <Reveal as="li" key={poradnik.slug} delay={Math.min(i * 0.04, 0.2)}>
              <PoradnikCard poradnik={poradnik} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* v22 (§2.6 pkt 4): TABELA ORIENTACYJNA. Przed rundą hub miał 0 tabel.
          Pokazuje kategorię i datę aktualizacji, czyli pola, po których wybiera
          się poradnik, a których siatka kart nie zestawia obok siebie. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Który poradnik odpowiada na Twoje pytanie?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Te same poradniki co wyżej, z obszarem tematycznym i datą ostatniej
              realnej aktualizacji treści.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <TabelaRejestru
                podpis={`Poradniki AI dla firm: obszar i ostatnia aktualizacja (${LICZBA_PORADNIKOW} pozycje)`}
                naglowki={['Poradnik', 'Kategoria', 'Ostatnia aktualizacja']}
                wiersze={WIERSZE_TABELI}
                ton={TON}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* v22 (§2.6 pkt 5): FAQ HUBU w natywnych <details>, ta sama tablica
          idzie do FAQPage niżej (zero rozjazdu treść/schema). */}
      <HubFAQ pytania={FAQ_HUBU} ton={TON} />

      {/* v22 (§2.6 pkt 6 i §3 P2 pkt 15): LINKI REDAKCYJNE domykające sieroty. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Gdzie iść dalej?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Poradniki to jeden z czterech działów{' '}
              <Link href="/wiedza" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                Centrum Wiedzy AI
              </Link>
              . Gotowe prompty, checklisty i arkusze pobierzesz w{' '}
              <Link href="/materialy" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                materiałach
              </Link>
              , dowody z liczbami stoją w{' '}
              <Link href="/realizacje" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                realizacjach
              </Link>
              , a pełny zakres tego, co robimy, znajdziesz na{' '}
              <Link href="/uslugi" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                liście usług
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      {/* BreadcrumbList wstrzyknięty serwerowo (Strona główna -> Centrum Wiedzy -> Poradniki) */}
      <JsonLd data={breadcrumb} />

      {/* v22 (§3 P3 pkt 17): ItemList zbudowany MAPOWANIEM rejestru. */}
      <JsonLd
        data={itemListSchema({
          path: PATH,
          nazwa: 'Poradniki AI dla firm',
          pozycje: PORADNIKI.map((p) => ({ nazwa: p.tytul, path: `${PATH}/${p.slug}` })),
        })}
      />

      {/* v22 (§3 P3 pkt 18): FAQPage z TEJ SAMEJ tablicy, którą renderuje HubFAQ. */}
      <JsonLd data={faqSchemaPl(FAQ_HUBU, PATH)} />

      {/* v22 (§3 P0 pkt 2): ręczny <link rel="canonical"> USUNIĘTY — kanoniczny
          URL wystawia już `buildMetadata` w `metadata` wyżej. */}
    </main>
  );
}
