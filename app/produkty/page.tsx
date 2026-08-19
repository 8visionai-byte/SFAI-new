import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchemaPl } from '@/components/seo/schemas';
import { SITE, HOME_CTA } from '@/lib/site';
import { PRODUKTY, KLOCKI, KLOCKI_DISCLAIMER, DOJRZALOSC_LABEL } from '@/lib/produkty';
import { INF_KATEGORIA } from '@/lib/inf-kategorie';

import { Section, Card, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { ProduktCard, KlocekCard } from '@/components/produkty';
import { PasekMetryk } from '@/components/sections/PasekMetryk';
import { TabelaRejestru } from '@/components/sections/TabelaRejestru';
import { HubFAQ } from '@/components/sections/HubFAQ';

/**
 * STRONA /produkty — SSG (force-static). Cała treść w surowym HTML przy 1. żądaniu
 * (KPI #1: cytowalność). Reveal/MagneticButton to wyspy klienta i tylko wzbogacają;
 * tekst, nagłówki i linki są w HTML niezależnie od JS.
 *
 * STRUKTURA (answer-first, nagłówki jak pytania):
 *  (1) hero — "Co zbudowaliśmy i co z tego możesz mieć u siebie"
 *  (2) 4 WŁASNE PRODUKTY — opis przez funkcję, dla kogo, co daje (szac.), nuta customu
 *  (3) KATALOG KLOCKÓW — "Z czego składamy indywidualne rozwiązania" + WIDOCZNY disclaimer
 *  (4) CTA domykające -> #diagnoza
 *
 * ŹRÓDŁO PRAWDY = rejestr lib/produkty (PRODUKTY, KLOCKI, KLOCKI_DISCLAIMER).
 * BreadcrumbList + ItemList JSON-LD wstrzyknięte SERWEROWO. Canonical absolutny.
 *
 * SITEMAP/NAV: trasę /produkty i wpis w NAV ustawia integrator (lib/site.ts ROUTES).
 * Ta strona ISTNIEJE (200 OK, SSG) niezależnie od tego, czy jest już w sitemapie.
 */
export const dynamic = 'force-static';

const PATH = '/produkty';
const CANONICAL = `${SITE.url}${PATH}`;

export const metadata: Metadata = buildMetadata({
  title: 'Produkty: co zbudowaliśmy i co możesz mieć u siebie',
  description:
    'Cztery własne produkty AI SimpleFast.ai: skaner faktur do KSeF, apka coachingowa z agentami, składki zespołu i centrum dowodzenia głosem.',
  path: PATH,
});

/**
 * TON HUBU = fiolet #e438ff / #dc7aff, ten sam, którym dropdown i karty malują
 * „rozwiązania" (INF_KATEGORIA.rozwiazania). Produkty to dokładnie ta rodzina:
 * disclaimer katalogu klocków odsyła wprost do usługi /uslugi/rozwiazania.
 * Bierzemy istniejący wpis rejestru dekoracji, zero nowej mapy kolorów.
 */
const TON = INF_KATEGORIA.rozwiazania;

/* ─────────────────────────────────────────────────────────────────────
   LICZBY HUBU — POLICZONE Z REJESTRU PRZY BUILDZIE (PLAN-v22 §1.7a:
   liczba wpisana z palca to zmyślona liczba). Dopisanie produktu albo
   klocka w lib/produkty automatycznie przelicza kafle, tabelę i FAQ. */
const LICZBA_PRODUKTOW = PRODUKTY.length;
const LICZBA_KLOCKOW = KLOCKI.length;
const LICZBA_DZIALA_U_NAS = PRODUKTY.filter((p) => p.dojrzalosc === 'dziala-u-nas').length;
const LICZBA_MVP = PRODUKTY.filter((p) => p.dojrzalosc === 'mvp').length;

const METRYKI_HUBU = [
  { wartosc: String(LICZBA_PRODUKTOW), opis: 'własne produkty' },
  {
    wartosc: String(LICZBA_DZIALA_U_NAS),
    opis: 'z nich używamy u siebie na co dzień',
    zrodlo: 'etykieta „Działa u nas" na karcie',
  },
  {
    wartosc: String(LICZBA_MVP),
    opis: 'w wersji MVP, czyli działa rdzeń',
    zrodlo: 'etykieta „MVP (działa rdzeń)" na karcie',
  },
  { wartosc: String(LICZBA_KLOCKOW), opis: 'klocki do złożenia pod Twój proces' },
];

/**
 * Tabela orientacyjna produktów.
 *
 * ODSTĘPSTWO OD §2.6 PLANU, ŚWIADOME: plan proponował cztery kolumny
 * (Produkt / Dla kogo / Co daje / Dojrzałość), ale `coDaje` to na kartach dwa
 * pełne zdania z szacunkiem oszczędności. Wklejone do komórki dałoby tabelę
 * szerszą niż ekran i DOSŁOWNY duplikat karty, czyli dokładnie to, czego zakazuje
 * reguła z tego samego paragrafu („tabela NIE powiela kart"). Zostają trzy
 * kolumny: nazwa funkcji, odbiorca i uczciwa dojrzałość. Wartość tabeli to
 * PORÓWNANIE czterech produktów w jednym rzucie oka, którego siatka kart
 * nie daje, plus pierwsza `<table>` na tej trasie (§5.1).
 * Wiersze budowane mapowaniem rejestru, nigdy literałami.
 */
const WIERSZE_TABELI = PRODUKTY.map((p) => [
  p.coRobi,
  p.dlaKogo,
  DOJRZALOSC_LABEL[p.dojrzalosc],
]);

/**
 * FAQ HUBU — każda odpowiedź wyprowadzona ze źródła dopuszczonego w §2.6 planu:
 * (a) liczba policzona z rejestru, (b) cena z listy locked, (c) zdanie stojące
 * już na istniejącej stronie, (d) zasada zapisana w kontrakcie typu. Litera
 * źródła stoi przy każdym pytaniu, żeby kontrola nie musiała zgadywać.
 */
const FAQ_HUBU = [
  {
    /* (d) lib/produkty/types.ts: „Każdy produkt to PUNKT WYJŚCIA DO CUSTOMU,
       nie pudełkowy produkt z półki" + KLOCKI_DISCLAIMER. */
    pytanie: 'Czy mogę kupić któryś z tych produktów od ręki?',
    odpowiedz:
      'Nie w takiej formie. To nie są pudełkowe produkty z półki, tylko punkt wyjścia do customu. Mechanizm mamy zbudowany i sprawdzony, a pod Twój proces, Twoje programy i Twój obieg dokumentów składamy go inaczej. Dlatego opisujemy je przez funkcję, a nie przez nazwę i cennik.',
  },
  {
    /* (d) lib/produkty/types.ts, definicje Dojrzalosc: 'mvp' = działa rdzeń,
       'dziala-u-nas' = używamy tego u siebie na co dzień. */
    pytanie: 'Co znaczy „MVP" i „Działa u nas" przy produktach?',
    odpowiedz: `To uczciwy sygnał, na jakim etapie jest dane narzędzie, a nie chwyt marketingowy. „Działa u nas" znaczy, że używamy tego u siebie na co dzień i jest sprawdzone w praktyce; takich produktów mamy ${LICZBA_DZIALA_U_NAS}. „MVP (działa rdzeń)" znaczy, że główna funkcja jest gotowa, a reszta w budowie; takich jest ${LICZBA_MVP}.`,
  },
  {
    /* (b) ceny locked, zdania 1:1 z poradnika o koszcie automatyzacji. */
    pytanie: 'Ile kosztuje zbudowanie takiego rozwiązania u mnie?',
    odpowiedz:
      'Wdrożenie własnego rozwiązania kosztuje zwykle od 3000 do 10000 zł, zależnie od liczby integracji i złożoności procesu. Pierwszą automatyzację na próbę robimy w pakiecie AI Start za 1990 zł, a mapę opłacalnych procesów daje audyt AI za 1490 zł, odliczany od wdrożenia. Dokładną kwotę podajemy po bezpłatnej diagnozie.',
  },
  {
    /* (d) lib/produkty/types.ts: „Szacunki oszczędności oznaczamy (szac.)". */
    pytanie: 'Skąd biorą się podane oszczędności czasu?',
    odpowiedz:
      'To szacunki z naszej pracy na tych narzędziach i dlatego są oznaczone skrótem „(szac.)" wprost w opisie. Nie podajemy ich jako twardych, zmierzonych wyników u klienta. Twarde liczby z realnych wdrożeń pokazujemy osobno, w dziale Realizacje.',
  },
  {
    /* (c) dwa modele rozliczenia, zdanie 1:1 z /uslugi/chatboty. */
    pytanie: 'Czy po zbudowaniu takiego narzędzia płacę abonament?',
    odpowiedz:
      'Masz to do wyboru. Przekazujemy Ci całą infrastrukturę i wtedy nie płacisz abonamentu, albo projekt zostaje u nas pod opieką i wtedy jest opłata utrzymaniowa: chatboty i automatyzacje od 99 do 599 zł netto miesięcznie, voiceboty od 299 do 1500 zł netto miesięcznie. Decydujesz na etapie wyceny.',
  },
  {
    /* (a) KLOCKI.length + KLOCKI_DISCLAIMER. */
    pytanie: 'Ile klocków mogę połączyć w jednym rozwiązaniu?',
    odpowiedz: `Katalog ma dziś ${LICZBA_KLOCKOW} klocków i nie ma sztywnego limitu, ile z nich wejdzie w jedno rozwiązanie. To pomysły i klocki, nie finalne wykonanie. Zwykle zaczynamy od jednego procesu, który boli najbardziej, i dokładamy kolejne, gdy pierwszy już działa.`,
  },
];

export default function ProduktyPage() {
  return (
    <main id="main">
      {/* ───────────────────────────────────────────────────────────────
          (1) HERO — answer-first: co zbudowaliśmy i co z tego możesz mieć.
          INFINITY v2: tone="transparent" — globalne tło prześwituje. */}
      <Section tone="transparent">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h1 className="text-display">
              Co zbudowaliśmy i co z tego możesz mieć u siebie
            </h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.05}>
            <p className="text-lead mt-6 text-fg-muted">
              Zbudowaliśmy kilka własnych narzędzi i pokazujemy je wprost: co robią,
              dla kogo są i co dają. Część działa u nas na co dzień, część to MVP, czyli
              działająca wersja minimalna. Żadne z nich nie jest pudełkowym produktem
              z półki. To punkt wyjścia. Ten sam mechanizm składamy indywidualnie pod
              Twój proces.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-body text-fg-muted">
              AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje. Niżej cztery
              produkty opisane przez funkcję, a pod nimi katalog klocków, z których
              składamy rozwiązania na zamówienie.
            </p>
          </Reveal>

          {/* v22 (PLAN-v22 §2.6 pkt 2): PAS METRYK pod hero. Wszystkie cztery
              liczby policzone z rejestru, więc nie da się ich rozjechać z listą
              produktów i katalogiem klocków niżej. */}
          <Reveal delay={0.15}>
            <PasekMetryk kafle={METRYKI_HUBU} ton={TON} className="mt-9" />
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2) 4 WŁASNE PRODUKTY — opis przez funkcję (mobile-first 1 -> 2 kol.). */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Co konkretnie zbudowaliśmy?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Cztery narzędzia, każde rozwiązuje jeden konkretny ból. Opisujemy je
              przez to, co robią, nie przez nazwę. Nazwy są robocze.
            </p>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {PRODUKTY.map((produkt, i) => (
            <Reveal
              as="li"
              key={produkt.slug}
              delay={Math.min(i * 0.05, 0.2)}
              className="h-full"
            >
              <ProduktCard produkt={produkt} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2b) v22 (§2.6 pkt 4): TABELA ORIENTACYJNA. Przed rundą /produkty
          miało 0 tabel. Zestawia cztery produkty w jednym rzucie oka: co robią,
          dla kogo są i na jakim są etapie. Wiersze mapowane z rejestru. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Który produkt jest dla kogo?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Te same cztery narzędzia co wyżej, ustawione obok siebie, żeby dało
              się porównać odbiorcę i etap dojrzałości bez czytania całych kart.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <TabelaRejestru
                podpis={`Własne produkty SimpleFast.ai: dla kogo i na jakim etapie (${LICZBA_PRODUKTOW} pozycje)`}
                naglowki={['Produkt', 'Dla kogo', 'Dojrzałość']}
                wiersze={WIERSZE_TABELI}
                ton={TON}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3) KATALOG KLOCKÓW — "Z czego składamy indywidualne rozwiązania". */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Z czego składamy indywidualne rozwiązania?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              To lista klocków, czyli pojedynczych możliwości z naszych analogii i
              wdrożeń. Każdy z nich robi jedną rzecz. Łączymy je i składamy pod konkretny
              proces, tak jak składaliśmy produkty wyżej.
            </p>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {KLOCKI.map((klocek, i) => (
            <Reveal
              as="li"
              key={klocek.nazwa}
              delay={Math.min(i * 0.04, 0.2)}
              className="h-full"
            >
              {/* INFINITY v7 (audyt --card-c): indeks steruje tonacją karty
                  (paleta kategorii cyklowana po siatce) — sama dekoracja. */}
              <KlocekCard klocek={klocek} indeks={i} />
            </Reveal>
          ))}
        </ul>

        {/* DISCLAIMER — MUSI być widoczny pod katalogiem klocków (uczciwy sygnał). */}
        <div className="mx-auto mt-10 max-w-narrow">
          <Reveal>
            {/* INFINITY v5: wyróżnienie disclaimera zostaje na .sf-rim-gradient
                (mechanizm home) — badge w języku inf (mono .inf-tag na akcencie,
                jak "Najczęściej wybierane" na home). Treść 1:1. */}
            <Card variant="highlight" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inf-tag rounded-full border-transparent bg-accent px-3 py-1 text-accent-contrast">
                  Ważne
                </span>
                <p className="text-body mt-3 text-fg">{KLOCKI_DISCLAIMER}</p>
                <p className="mt-3 text-body-sm text-fg-muted">
                  Chcesz zobaczyć, jak budujemy rozwiązanie z tych klocków na zamówienie?
                  Sprawdź usługę{' '}
                  <Link
                    href="/uslugi/rozwiazania"
                    className="font-semibold text-accent-hover underline-offset-2 hover:underline"
                  >
                    indywidualne rozwiązania AI
                  </Link>
                  .
                </p>
              </div>
              <div className="shrink-0">
                <MagneticButton variant="primary" size="md" href={HOME_CTA.href}>
                  Złóż swoje rozwiązanie
                </MagneticButton>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3b) v22 (§2.6 pkt 5): FAQ HUBU w natywnych <details>. Przed rundą
          /produkty miało zero. Odpowiedzi są w HTML od pierwszego żądania,
          bez JS i bez bramki na klik; ta sama tablica idzie do FAQPage niżej. */}
      <HubFAQ pytania={FAQ_HUBU} ton={TON} />

      {/* ───────────────────────────────────────────────────────────────
          (3c) v22 (§2.6 pkt 6 i §3 P2 pkt 15): LINKI REDAKCYJNE. /uslugi
          i /wiedza były sierotami: miały wejścia wyłącznie z menu, stopki
          i okruszków. Ten akapit daje im wejście z treści. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Gdzie iść dalej?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Twarde liczby z wdrożeń u klientów są w dziale{' '}
              <Link href="/realizacje" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                realizacje
              </Link>
              . Pełny zakres tego, co robimy na zamówienie, znajdziesz na{' '}
              <Link href="/uslugi" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                liście usług
              </Link>
              . A jeśli chcesz najpierw policzyć, czy to się u Ciebie opłaca,
              poradniki i kalkulatory czekają w{' '}
              <Link href="/wiedza" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                Centrum Wiedzy AI
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (4) CTA DOMYKAJĄCE — jedno główne CTA, wspólny flow diagnozy (.surface-aurora). */}
      <Section tone="base" id="diagnoza" className="surface-aurora">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">Który z tych klocków zdjąłby najwięcej z Twojego dnia?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mx-auto mt-5 max-w-[52ch] text-fg-muted">
              {HOME_CTA.microcopy}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-col items-center gap-3">
              <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
                {HOME_CTA.label}
              </MagneticButton>
              <span className="text-caption max-w-[60ch] text-fg-subtle">
                Bezpłatna diagnoza. Najpierw mówimy, czy w ogóle warto budować, potem decyzja.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        BreadcrumbList JSON-LD (Strona główna -> Produkty), serwerowo w HTML.
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Produkty', path: PATH },
        ])}
      />

      {/*
        ItemList JSON-LD — lista 4 produktów (opis przez funkcję). To DANE referencyjne
        (higiena GEO): name = co produkt robi, description = opis funkcji. Każdy string
        prawdziwy. URL pozycji = kotwica #slug na tej stronie (produkt nie ma osobnej
        podstrony), więc link prowadzi do realnego, istniejącego miejsca w dokumencie.
      */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${CANONICAL}/#produkty`,
          name: 'Produkty SimpleFast.ai',
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          numberOfItems: PRODUKTY.length,
          itemListElement: PRODUKTY.map((produkt, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: produkt.coRobi,
            description: produkt.opisFunkcji,
            url: `${CANONICAL}#${produkt.slug}`,
          })),
        }}
      />

      {/* v22 (§3 P3 pkt 18): FAQPage z TEJ SAMEJ tablicy, którą renderuje HubFAQ.
          Jedno źródło = zero rozjazdu treść/schema. */}
      <JsonLd data={faqSchemaPl(FAQ_HUBU, PATH)} />

      {/* v22 (§3 P0 pkt 2): ręczny <link rel="canonical"> USUNIĘTY — kanoniczny
          URL wystawia już `buildMetadata` w `metadata` wyżej, więc ten znacznik
          dawał w <head> DRUGI rel=canonical (kryterium odbioru §5.4: dokładnie
          jeden na trasę). Stała CANONICAL zostaje: używa jej ItemList. */}
    </main>
  );
}
