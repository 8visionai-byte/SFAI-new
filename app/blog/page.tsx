import type { Metadata } from 'next';

import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, itemListSchema, faqSchemaPl } from '@/components/seo/schemas';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { BlogBreadcrumbs, PostCard, PostCardWkrotce } from '@/components/blog';
import { POSTS, POSTS_WKROTCE } from '@/lib/blog';
import { INF_TYP } from '@/lib/inf-kategorie';
import { PasekMetryk } from '@/components/sections/PasekMetryk';
import { TabelaRejestru } from '@/components/sections/TabelaRejestru';
import { HubFAQ } from '@/components/sections/HubFAQ';

/**
 * LISTA BLOGA (/blog) — SSG. Hub wpisów: nagłówek + siatka kart opublikowanych
 * wpisów (z rejestru, posortowane po dacie) + sekcja „wkrótce" (tematy zaplanowane
 * bez trasy). Treść w HTML od razu (KPI #1).
 *
 * UWAGA (sitemap): trasa /blog jest w ROUTES `live: false` do czasu, aż blog
 * dojrzeje (faza 4 wypełni treść). Ten plik sprawia, że /blog ISTNIEJE (200 OK,
 * SSG); flip `live: true` w lib/site.ts to świadoma decyzja po uzupełnieniu treści.
 */
export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Blog o AI dla firm: poradniki bez żargonu',
    description:
      'Blog SimpleFast.ai: konkretne poradniki o AI dla małych firm. Koszty wdrożenia, chatboty i Agenci, voiceboty, AI Act, automatyzacja i dane w UE. Bez żargonu.',
    path: '/blog',
  });
}

const PATH = '/blog';

/** TON HUBU = fiolet wpisu z INF_TYP, ten sam, którym świecą karty na liście. */
const TON = INF_TYP.wpis;

/* ─────────────────────────────────────────────────────────────────────
   LICZBY HUBU — POLICZONE Z REJESTRU PRZY BUILDZIE (PLAN-v22 §1.7a).
   UWAGA: `tresc` wpisów wypełnia w tej rundzie inna partia. Liczby są liczone,
   nie wpisane, więc przeliczą się same, cokolwiek tam wejdzie. */
const LICZBA_WPISOW = POSTS.length;
const LICZBA_KATEGORII = new Set(POSTS.map((p) => p.kategoria)).size;
const LICZBA_SEKCJI = POSTS.reduce(
  (suma, p) => suma + p.tresc.filter((b) => b.typ === 'sekcja' || b.typ === 'naglowek').length,
  0
);
const LICZBA_PYTAN = POSTS.reduce((suma, p) => suma + (p.faq?.length ?? 0), 0);
const OSTATNIA_AKTUALIZACJA = POSTS.reduce(
  (max, p) => (p.dataAktualizacji > max ? p.dataAktualizacji : max),
  POSTS[0]?.dataAktualizacji ?? ''
);

const METRYKI_HUBU = [
  { wartosc: String(LICZBA_WPISOW), opis: 'wpisy na blogu' },
  { wartosc: String(LICZBA_KATEGORII), opis: 'obszary tematyczne' },
  { wartosc: String(LICZBA_SEKCJI), opis: 'sekcje z konkretem' },
  {
    wartosc: String(LICZBA_PYTAN),
    opis: 'odpowiedzi na częste pytania',
    zrodlo: 'sekcje FAQ we wpisach',
  },
];

/* Tabela orientacyjna: kategoria i data, czyli pola zestawione obok siebie
   do porównania. Wiersze mapowane z rejestru, nigdy literałami. */
const WIERSZE_TABELI = POSTS.map((p) => [p.tytul, p.kategoria, p.data]);

/**
 * FAQ HUBU — źródła zgodne z §2.6 planu: (a) liczba z rejestru, (b) cena locked,
 * (c) zdanie stojące już na istniejącej stronie, (d) zasada z kontraktu typu.
 */
const FAQ_HUBU = [
  {
    /* (a) rejestr wpisów. */
    pytanie: 'Ile wpisów jest na blogu i o czym?',
    odpowiedz: `Dziś ${LICZBA_WPISOW} wpisów w ${LICZBA_KATEGORII} obszarach: koszty wdrożenia, różnice między chatbotem a agentem, voiceboty, przepisy i AI Act, automatyzacja oraz bezpieczeństwo danych. Wszystkie czytasz w całości, bez logowania.`,
  },
  {
    /* (c) opisy działów z /wiedza: poradnik odpowiada krok po kroku,
       wpis tłumaczy temat i podaje opinię. */
    pytanie: 'Kiedy sięgnąć po wpis, a kiedy po poradnik?',
    odpowiedz:
      'Po wpis, gdy chcesz zrozumieć temat i poznać nasze zdanie: czym różni się chatbot od agenta, co zmienia AI Act, gdzie leżą Twoje dane. Po poradnik, gdy masz decyzję do podjęcia i potrzebujesz konkretu krok po kroku z liczbami. Poradniki mają osobny dział.',
  },
  {
    /* (a) dataAktualizacji z rejestru. */
    pytanie: 'Czy wpisy są aktualizowane?',
    odpowiedz: `Tak. Każdy ma datę publikacji i datę ostatniej realnej aktualizacji treści, a daty publikacji stoją też w tabeli niżej. Najświeższa aktualizacja w tym dziale to ${OSTATNIA_AKTUALIZACJA}. Dat nie podbijamy automatycznie przy wdrożeniu strony, bo fałszywa świeżość nic nie jest warta.`,
  },
  {
    /* (c) zdanie 1:1 ze stron usług: „Twoje dane zostają w Unii Europejskiej". */
    pytanie: 'Gdzie zostają dane, o których piszecie we wpisach?',
    odpowiedz:
      'W Unii Europejskiej. To zasada, którą trzymamy w każdym wdrożeniu i o której piszemy w dziale o bezpieczeństwie danych. Przy wycenie mówimy wprost, jakie narzędzia wchodzą w grę i gdzie fizycznie leżą dane.',
  },
  {
    /* (b) ceny locked, zdania 1:1 ze stron usług i poradnika o automatyzacji. */
    pytanie: 'Ile kosztuje wdrożenie AI w małej firmie?',
    odpowiedz:
      'Chatbot startuje od 990 zł, voicebot od 2500 zł, a automatyzacja procesu kosztuje zwykle od 3000 do 10000 zł. Audyt AI to 1490 zł i odliczamy go od wdrożenia, a pakiet AI Start z pierwszą automatyzacją na próbę to 1990 zł. Dokładna wycena po bezpłatnej diagnozie.',
  },
  {
    /* (c) dwa modele rozliczenia, zdanie 1:1 z /uslugi/chatboty. */
    pytanie: 'Czy po wdrożeniu płacę abonament?',
    odpowiedz:
      'Masz to do wyboru. Przekazujemy Ci całą infrastrukturę i wtedy nie płacisz abonamentu, albo projekt zostaje u nas pod opieką i wtedy jest opłata utrzymaniowa od 99 do 599 zł miesięcznie.',
  },
];

export default function BlogPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]);

  return (
    <main id="main">
      {/* INFINITY v2: hero bez solidnego tła (globalny starfield prześwituje);
          badge-eyebrow → mono overline .inf-overline (treść 1:1). */}
      <Section tone="transparent">
        <div className="mx-auto max-w-narrow">
          <BlogBreadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Blog' },
            ]}
          />

          <Reveal>
            <p className="inf-overline inf-overline-lines mt-6">
              Wiedza bez żargonu
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">Blog o AI dla firm</h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">
              Konkretne poradniki o AI dla małych firm. Tłumaczymy koszty, różnice
              między chatbotem a Agentem, voiceboty, przepisy i bezpieczeństwo danych.
              Prostym językiem, z liczbami, bez owijania w bawełnę.
            </p>
          </Reveal>

          {/* v22 (PLAN-v22 §2.6 pkt 2): PAS METRYK pod hero, wszystkie cztery
              liczby policzone z rejestru wpisów przy buildzie. */}
          <Reveal delay={0.15}>
            <PasekMetryk kafle={METRYKI_HUBU} ton={TON} className="mt-9" />
          </Reveal>
        </div>
      </Section>

      {/* Opublikowane wpisy (z rejestru, posortowane po dacie) */}
      <Section tone="subtle">
        <h2 className="sr-only">Najnowsze wpisy</h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={Math.min(i * 0.04, 0.2)}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Tematy w przygotowaniu (bez trasy — zero martwych linków) */}
      {POSTS_WKROTCE.length > 0 && (
        <Section tone="base">
          <div className="mx-auto max-w-narrow">
            <Reveal>
              <h2 className="text-h2">W przygotowaniu</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-lead mt-4 text-fg-muted">
                Tematy, nad którymi pracujemy. Wracaj, dopisujemy je na bieżąco.
              </p>
            </Reveal>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTS_WKROTCE.map((temat, i) => (
              <Reveal as="li" key={temat.tytul} delay={Math.min(i * 0.04, 0.2)}>
                <PostCardWkrotce temat={temat} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* v22 (§2.6 pkt 4): TABELA ORIENTACYJNA. Przed rundą hub miał 0 tabel.
          Zestawia obszar i datę wszystkich wpisów w jednym rzucie oka. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Wszystkie wpisy w jednej tabeli</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Ten sam zbiór co wyżej, z obszarem tematycznym i datą publikacji,
              żeby dało się wybrać bez przewijania kafelków.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <TabelaRejestru
                podpis={`Wpisy na blogu o AI dla firm: obszar i data publikacji (${LICZBA_WPISOW} pozycji)`}
                naglowki={['Wpis', 'Kategoria', 'Data']}
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
              Blog to jeden z czterech działów{' '}
              <Link href="/wiedza" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                Centrum Wiedzy AI
              </Link>
              . Gdy potrzebujesz konkretu krok po kroku, zajrzyj do{' '}
              <Link href="/poradniki" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                poradników
              </Link>
              . Dowody z liczbami stoją w{' '}
              <Link href="/realizacje" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                realizacjach
              </Link>
              , a pełny zakres tego, co robimy, na{' '}
              <Link href="/uslugi" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                liście usług
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      {/* BreadcrumbList wstrzyknięty serwerowo (Strona główna -> Blog) */}
      <JsonLd data={breadcrumb} />

      {/* v22 (§3 P3 pkt 17): ItemList zbudowany MAPOWANIEM rejestru. Zapowiedzi
          „wkrótce" do niego nie wchodzą, bo nie mają własnej trasy. */}
      <JsonLd
        data={itemListSchema({
          path: PATH,
          nazwa: 'Wpisy na blogu o AI dla firm',
          pozycje: POSTS.map((p) => ({ nazwa: p.tytul, path: `${PATH}/${p.slug}` })),
        })}
      />

      {/* v22 (§3 P3 pkt 18): FAQPage z TEJ SAMEJ tablicy, którą renderuje HubFAQ. */}
      <JsonLd data={faqSchemaPl(FAQ_HUBU, PATH)} />
    </main>
  );
}
