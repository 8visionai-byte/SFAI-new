import type { Metadata } from 'next';

import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, itemListSchema, faqSchemaPl } from '@/components/seo/schemas';
import { HOME_CTA } from '@/lib/site';
import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/uslugi/Breadcrumbs';
import { MaterialCard, MaterialCardWkrotce } from '@/components/materialy';
import { MATERIALY, MATERIALY_WKROTCE } from '@/lib/materialy';
import { INF_TYP } from '@/lib/inf-kategorie';
import { PasekMetryk } from '@/components/sections/PasekMetryk';
import { TabelaRejestru } from '@/components/sections/TabelaRejestru';
import { HubFAQ } from '@/components/sections/HubFAQ';

/**
 * HUB /materialy — SSG (force-static). Dział „Materiały do pobrania" Centrum Wiedzy AI.
 * Answer-first: kapsuła (co tu jest) + siatka kart magnetów (z rejestru lib/materialy)
 * + sekcja „wkrótce" (magnety zaplanowane bez trasy) + CTA domykające (#diagnoza).
 *
 * KPI #1 (cytowalność): kapsuła i karty w HTML przy 1. żądaniu. Reveal/MagneticButton
 * to wyspy klienta i tylko wzbogacają. Każda karta linkuje do /materialy/<slug> (SSG).
 * Źródło prawdy listy = rejestr lib/materialy -> zero martwych linków.
 *
 * SITEMAP/NAV: trasę /materialy ustawia integrator w lib/site.ts (ROUTES). Pojedyncze
 * /materialy/<slug> wchodzą do sitemapy z rejestru (MATERIALY_SLUGS), jak blog/uslugi.
 * Breadcrumb wiedzie przez hub /wiedza (materiały to dział Centrum Wiedzy).
 */
export const dynamic = 'force-static';

const PATH = '/materialy';

export const metadata: Metadata = buildMetadata({
  title: 'Darmowe materiały AI dla firm: prompty, checklisty',
  description:
    'Darmowe materiały AI: gotowe prompty, checklisty procesów do automatyzacji i arkusze kosztów. Całość na stronie, do pobrania w PDF.',
  path: PATH,
});

/**
 * TON HUBU = bursztyn INF_TYP.material, dokładnie ten sam, którym świecą karty
 * materiałów na listach, kafelek typu w hero podstrony i dział „Materiały"
 * w dropdownie Wiedzy. Naczynia połączone, zero nowej mapy kolorów.
 */
const TON = INF_TYP.material;

/* ─────────────────────────────────────────────────────────────────────
   LICZBY HUBU — POLICZONE Z REJESTRU PRZY BUILDZIE (PLAN-v22 §1.7a).
   Dopisanie magnetu przelicza kafle, tabelę, ItemList i odpowiedzi FAQ. */
const LICZBA_MATERIALOW = MATERIALY.length;
const LICZBA_RODZAJOW = new Set(MATERIALY.map((m) => m.etykieta)).size;
const LICZBA_FORMATOW = new Set(MATERIALY.map((m) => m.typPliku)).size;
/* Sekcje treści = bloki, które renderują się jako <h2> w środku materiału
   (nagłówek albo sekcja w karcie). Mówi wprost, ile konkretu jest w środku. */
const LICZBA_SEKCJI = MATERIALY.reduce(
  (suma, m) => suma + m.tresc.filter((b) => b.typ === 'sekcja' || b.typ === 'naglowek').length,
  0
);
/* Najświeższa data aktualizacji w całym dziale (ISO YYYY-MM-DD porównuje się
   leksykalnie, tak samo jak sortuje rejestr). */
const OSTATNIA_AKTUALIZACJA = MATERIALY.reduce(
  (max, m) => (m.dataAktualizacji > max ? m.dataAktualizacji : max),
  MATERIALY[0]?.dataAktualizacji ?? ''
);

const LICZBA_PYTAN = MATERIALY.reduce((suma, m) => suma + (m.faq?.length ?? 0), 0);

/* WSZYSTKIE CZTERY WARTOŚCI SĄ LICZONE Z REJESTRU. Świadomie NIE ma tu kafla
   „0 zł", choć darmowość jest prawdą stojącą w kapsule hero i w FAQ: kryterium
   odbioru §5.6 zakazuje cen spoza listy locked, a automatyczna kontrola nie ma
   jak odróżnić ceny usługi od ceny materiału. Komunikat „za darmo" niesie tekst,
   nie kafel z kwotą. */
const METRYKI_HUBU = [
  { wartosc: String(LICZBA_MATERIALOW), opis: 'materiały gotowe do pobrania' },
  { wartosc: String(LICZBA_RODZAJOW), opis: 'rodzaje materiałów' },
  { wartosc: String(LICZBA_SEKCJI), opis: 'sekcje z konkretami w środku' },
  {
    wartosc: String(LICZBA_PYTAN),
    opis: 'odpowiedzi na częste pytania',
    zrodlo: 'sekcje FAQ w materiałach',
  },
];

/**
 * Tabela orientacyjna materiałów.
 *
 * ODSTĘPSTWO OD §2.6 PLANU, ŚWIADOME: plan proponował kolumny
 * Materiał / Typ pliku / Etykieta, ale `etykieta` stoi już na kafelku listy
 * (MaterialCard renderuje ją przez `KartaEtykieta`), więc byłaby czystym
 * duplikatem. W jej miejsce wchodzi `dataAktualizacji`, czyli pole, którego
 * karty NIE pokazują wcale — a to dokładnie ten przypadek, który plan podaje
 * jako wzorcowy („data aktualizacji" w tabeli poradników). Tabela dokłada więc
 * informację o świeżości, zamiast przepisywać kafelek.
 */
const WIERSZE_TABELI = MATERIALY.map((m) => [m.tytul, m.typPliku, m.dataAktualizacji]);

/**
 * FAQ HUBU — każda odpowiedź wyprowadzona ze źródła dopuszczonego w §2.6 planu:
 * (a) liczba policzona z rejestru, (b) cena z listy locked, (c) zdanie stojące
 * już na stronie, (d) zasada zapisana w kontrakcie typu.
 */
const FAQ_HUBU = [
  {
    /* (d) lib/materialy/types.ts: „PEŁNA treść magnetu jest w HTML przy 1. żądaniu,
       czytasz ją w całości na stronie. PDF to bonus, nie bramka." */
    pytanie: 'Muszę zostawić maila, żeby to przeczytać?',
    odpowiedz:
      'Nie. Każdy materiał czytasz w całości na stronie, za darmo i bez zapisu. Maila zostawiasz tylko wtedy, gdy chcesz dostać wersję do pobrania na potem. PDF to bonus, nie bramka do treści.',
  },
  {
    /* (a) liczby policzone z rejestru. */
    pytanie: 'Ile materiałów tu jest i w jakich formatach?',
    odpowiedz: `Dziś ${LICZBA_MATERIALOW} materiałów w ${LICZBA_RODZAJOW} rodzajach i ${LICZBA_FORMATOW} formatach. Razem to ${LICZBA_SEKCJI} sekcji konkretu: gotowe prompty, checklisty procesów i wzór arkusza do policzenia kosztów.`,
  },
  {
    /* (a) dataAktualizacji z rejestru. */
    pytanie: 'Czy te materiały są aktualne?',
    odpowiedz: `Każdy materiał ma na swojej stronie datę publikacji i datę ostatniej realnej aktualizacji, a te same daty stoją w tabeli niżej. Najświeższa aktualizacja w tym dziale to ${OSTATNIA_AKTUALIZACJA}. Nie podbijamy dat automatycznie przy każdym wdrożeniu strony, bo fałszywa świeżość nic nie jest warta.`,
  },
  {
    /* (d) lib/materialy/types.ts kontra lib/poradniki: magnet ma typPliku
       i ctaPobierz, poradnik to tekst czytany na stronie. */
    pytanie: 'Czym różni się materiał od poradnika?',
    odpowiedz:
      'Materiał to rzecz do wzięcia i użycia od razu: zestaw promptów, checklista albo wzór arkusza, w formacie do pobrania. Poradnik to dłuższy tekst, który tłumaczy temat i odpowiada na pytanie, na przykład ile coś kosztuje i od czego zacząć. Materiały znajdziesz tutaj, poradniki w dziale Poradniki.',
  },
  {
    /* (b) ceny locked, zdania 1:1 z poradnika o koszcie automatyzacji. */
    pytanie: 'Ile kosztuje wdrożenie tego, co opisujecie w materiałach?',
    odpowiedz:
      'Automatyzacja jednego procesu kosztuje zwykle od 3000 do 10000 zł. Pierwszą automatyzację na próbę robimy w pakiecie AI Start za 1990 zł, a mapę opłacalnych procesów daje audyt AI za 1490 zł, odliczany od wdrożenia. Chatbot startuje od 990 zł. Dokładną wycenę podajemy po bezpłatnej diagnozie.',
  },
  {
    /* (c) dwa modele rozliczenia, zdanie 1:1 z /uslugi/chatboty. */
    pytanie: 'Czy po wdrożeniu płacę abonament?',
    odpowiedz:
      'Masz to do wyboru. Przekazujemy Ci całą infrastrukturę i wtedy nie płacisz abonamentu, albo projekt zostaje u nas pod opieką i wtedy jest opłata utrzymaniowa od 99 do 599 zł miesięcznie.',
  },
];

export default function MaterialyHubPage() {
  return (
    <main id="main">
      {/* ───────────────────────────────────────────────────────────────
          (1) HERO HUBU — answer-first: co tu znajdziesz, jedna obietnica.
          INFINITY v2: hero bez solidnego tła (globalny starfield prześwituje);
          badge-eyebrow → mono overline .inf-overline (treść 1:1). */}
      <Section tone="transparent">
        <div className="mx-auto max-w-narrow">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Centrum Wiedzy', href: '/wiedza' },
              { name: 'Materiały' },
            ]}
          />

          <Reveal>
            <p className="inf-overline inf-overline-lines mt-6">
              Darmowe do pobrania
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">
              Materiały do pobrania: prompty, checklisty i arkusze AI dla firm
            </h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">
              Gotowe materiały AI dla firm: zestawy promptów, checklisty procesów do
              automatyzacji i arkusze do liczenia kosztów. Każdy materiał czytasz w
              całości na stronie, za darmo i bez zapisu, a pobierasz na maila albo jako
              PDF. Realna, użyteczna treść, nie zajawka.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 text-body text-fg-muted">
              Każdy materiał rozwiązuje jeden konkretny problem właściciela firmy: co
              wpisać do AI, co zautomatyzować najpierw i ile naprawdę kosztuje ręczna
              robota. Bierzesz to, czego potrzebujesz dziś.
            </p>
          </Reveal>

          {/* v22 (PLAN-v22 §2.6 pkt 2): PAS METRYK pod hero. Trzy z czterech
              liczb są policzone z rejestru; czwarta („0 zł") to fakt, który
              stoi w kapsule wyżej, z przypisem mówiącym, skąd się bierze. */}
          <Reveal delay={0.2}>
            <PasekMetryk kafle={METRYKI_HUBU} ton={TON} className="mt-9" />
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2) SIATKA MAGNETÓW — z rejestru, posortowane po dacie. */}
      <Section tone="subtle">
        <div className="mx-auto mb-8 max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Co możesz pobrać już teraz?</h2>
          </Reveal>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MATERIALY.map((material, i) => (
            <Reveal as="li" key={material.slug} delay={Math.min(i * 0.04, 0.2)} className="h-full">
              <MaterialCard material={material} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3) WKRÓTCE — magnety zaplanowane bez trasy (zero martwych linków). */}
      {MATERIALY_WKROTCE.length > 0 && (
        <Section tone="base">
          <div className="mx-auto max-w-narrow">
            <Reveal>
              <h2 className="text-h2">W przygotowaniu</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-lead mt-4 text-fg-muted">
                Kolejne materiały, nad którymi pracujemy. Wracaj, dopisujemy je na bieżąco.
              </p>
            </Reveal>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MATERIALY_WKROTCE.map((temat, i) => (
              <Reveal as="li" key={temat.tytul} delay={Math.min(i * 0.04, 0.2)}>
                <MaterialCardWkrotce temat={temat} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* ───────────────────────────────────────────────────────────────
          (3b) v22 (§2.6 pkt 4): TABELA ORIENTACYJNA. Przed rundą hub miał
          0 tabel. Zestawia format i datę ostatniej aktualizacji, czyli pola,
          po których wybiera się materiał, a których kafelki nie pokazują. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Który materiał jest najświeższy?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Ten sam zbiór co wyżej, z formatem pliku i datą ostatniej realnej
              aktualizacji. Daty nie podbijamy automatycznie, więc pokazują prawdę.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <TabelaRejestru
                podpis={`Materiały do pobrania: format i ostatnia aktualizacja (${LICZBA_MATERIALOW} pozycji)`}
                naglowki={['Materiał', 'Typ pliku', 'Ostatnia aktualizacja']}
                wiersze={WIERSZE_TABELI}
                ton={TON}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3c) v22 (§2.6 pkt 5): FAQ HUBU w natywnych <details>. Przed rundą
          hub miał zero. Ta sama tablica idzie do FAQPage niżej. */}
      <HubFAQ pytania={FAQ_HUBU} ton={TON} />

      {/* ───────────────────────────────────────────────────────────────
          (3d) v22 (§2.6 pkt 6 i §3 P2 pkt 15): LINKI REDAKCYJNE domykające
          sieroty (/uslugi, /wiedza) i prowadzące do dowodów (/realizacje). */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Gdzie iść dalej?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Materiały to jeden z czterech działów{' '}
              <Link href="/wiedza" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                Centrum Wiedzy AI
              </Link>
              , obok poradników, przemyśleń i AI Radaru. Jeśli chcesz zobaczyć,
              jak to wygląda po wdrożeniu u klienta, zajrzyj do{' '}
              <Link href="/realizacje" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                realizacji z liczbami
              </Link>
              . A jeśli szukasz konkretnej pomocy, pełny zakres znajdziesz na{' '}
              <Link href="/uslugi" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                liście usług
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (4) CTA DOMYKAJĄCE — jedno główne, wspólny flow diagnozy (.surface-aurora). */}
      <Section tone="base" id="diagnoza" className="surface-aurora">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">
              Materiał to dobry start. System, który robi to za Ciebie, to coś więcej.
            </h2>
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
                AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* BreadcrumbList JSON-LD (Strona główna -> Centrum Wiedzy -> Materiały), serwerowo. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Centrum Wiedzy', path: '/wiedza' },
          { name: 'Materiały', path: PATH },
        ])}
      />
      {/* v22 (§3 P3 pkt 17): ItemList — lista magnetów zbudowana MAPOWANIEM
          rejestru. Pozycje „wkrótce" do niej nie wchodzą (nie mają trasy),
          więc w schemie nie ma martwego linku. */}
      <JsonLd
        data={itemListSchema({
          path: PATH,
          nazwa: 'Materiały AI do pobrania',
          pozycje: MATERIALY.map((m) => ({ nazwa: m.tytul, path: `${PATH}/${m.slug}` })),
        })}
      />

      {/* v22 (§3 P3 pkt 18): FAQPage z TEJ SAMEJ tablicy, którą renderuje HubFAQ. */}
      <JsonLd data={faqSchemaPl(FAQ_HUBU, PATH)} />

      {/* v22 (§3 P0 pkt 2): ręczny <link rel="canonical"> USUNIĘTY — kanoniczny
          URL wystawia już `buildMetadata` w `metadata` wyżej (kryterium §5.4:
          dokładnie jeden canonical na trasę). */}
    </main>
  );
}
