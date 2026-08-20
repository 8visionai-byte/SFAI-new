import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, itemListSchema, faqSchemaPl } from '@/components/seo/schemas';
import { REALIZACJE, KATEGORIA_LABEL } from '@/lib/realizacje';
import { INF_KATEGORIA } from '@/lib/inf-kategorie';

import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { RealizacjaCard } from '@/components/realizacje';
import { PasekMetryk } from '@/components/sections/PasekMetryk';
import { TabelaRejestru } from '@/components/sections/TabelaRejestru';
import { HubFAQ } from '@/components/sections/HubFAQ';
import { HOME_CTA } from '@/lib/site';

/**
 * HUB /realizacje — lista case studies, SSG (force-static).
 *
 * KPI #1: pełna treść (kapsuły answer-first, metryki-dowody, anchory linków) jest
 * w HTML przy 1. żądaniu. Kafelki to Server Components; framer-motion (Reveal,
 * MagneticButton) działa wewnątrz wysp klienta i TYLKO wzbogaca.
 *
 * Źródło prawdy listy = rejestr lib/realizacje (REALIZACJE). Każdy kafelek linkuje
 * do /realizacje/<slug> (SSG). Zero zmyślonych realizacji — tylko realne wdrożenia.
 *
 * v22 (PLAN-v22 §2.6): hub dostaje wspólny szkielet hubów treści — pas metryk
 * pod hero, tabelę orientacyjną, FAQ w natywnych `<details>`, akapit linków
 * redakcyjnych domykający sieroty i ItemList + FAQPage w JSON-LD. Wszystkie
 * liczby są LICZONE Z REJESTRU przy buildzie (§1.7a: liczba wpisana z palca to
 * zmyślona liczba), a wiersze tabeli powstają mapowaniem, nie literałami.
 *
 * UWAGA (sitemap): trasa /realizacje ma w ROUTES `live: false`. Strona ISTNIEJE
 * (200 OK, SSG), ale do sitemap.xml wejdzie po świadomym flipie `live: true` w
 * lib/site.ts (gdy treść zaakceptowana). To celowe: "gotowa" vs "ogłoszona botom".
 */
export const dynamic = 'force-static';

const PATH = '/realizacje';

export const metadata: Metadata = buildMetadata({
  title: 'Realizacje: wdrożenia AI dla firm',
  description:
    'Realne wdrożenia AI SimpleFast.ai: auto-email obsługi klienta (75% gotowych maili), generator leadów (1000 rekordów w 40 minut), chatboty i Agenci AI 24/7.',
  path: PATH,
});

/**
 * TON HUBU = zieleń #39ff14 / #29ff77. Ten sam kolor, którym /wiedza maluje
 * kafel „Case studies" (KATEGORIA_DEKOR w app/wiedza/page.tsx), więc wejście
 * z Centrum Wiedzy i sam hub świecą jednym tonem (naczynia połączone).
 * Bierzemy go z ISTNIEJĄCEGO wpisu rejestru dekoracji zamiast zakładać nowy:
 * pod kluczem `automatyzacje` stoi dokładnie ta para hexów, a automatyzacje to
 * zarazem najliczniejsza grupa case'ów w rejestrze. Zero nowej mapy kolorów.
 */
const TON = INF_KATEGORIA.automatyzacje;

/* ─────────────────────────────────────────────────────────────────────
   LICZBY HUBU — WSZYSTKIE POLICZONE Z REJESTRU PRZY BUILDZIE.
   Żadna nie jest wpisana ręcznie, więc nie da się jej rozjechać z listą
   niżej: dopisanie case'a w lib/realizacje automatycznie zmienia kafle,
   tabelę, ItemList i odpowiedzi FAQ. */
const LICZBA_WDROZEN = REALIZACJE.length;
const LICZBA_OBSZAROW = new Set(REALIZACJE.map((r) => r.kategoria)).size;
const LICZBA_BRANZ = new Set(REALIZACJE.map((r) => r.branza)).size;
const LICZBA_METRYK = REALIZACJE.reduce((suma, r) => suma + r.efekt.metryki.length, 0);

const METRYKI_HUBU = [
  { wartosc: String(LICZBA_WDROZEN), opis: 'wdrożeń opisanych na tej stronie' },
  { wartosc: String(LICZBA_OBSZAROW), opis: 'obszary, w których wdrażaliśmy' },
  { wartosc: String(LICZBA_BRANZ), opis: 'branż klientów' },
  {
    wartosc: String(LICZBA_METRYK),
    opis: 'liczby-dowody w tych wdrożeniach',
    zrodlo: 'z sekcji „Co to dało?" każdego case’a',
  },
];

/* Tabela orientacyjna: pola, których NIE widać na kafelkach listy
   (obszar nazwany etykietą + główna metryka w jednej kolumnie do porównania).
   Wiersze budowane mapowaniem rejestru — kontrakt danych z §1.7d. */
const WIERSZE_TABELI = REALIZACJE.map((r) => {
  /* Kontrakt typu dopuszcza 1-3 metryki, więc pierwszej nie zakładamy w ciemno.
     Case bez metryki (dziś nie ma takiego) dostałby pustą komórkę zamiast
     wysypać build. */
  const glowna = r.efekt.metryki[0];
  return [
    r.h1,
    KATEGORIA_LABEL[r.kategoria],
    glowna ? `${glowna.wartosc} ${glowna.etykieta}` : '',
  ];
});

/**
 * FAQ HUBU — każda odpowiedź daje się wyprowadzić ze źródła dopuszczonego
 * w §2.6 planu: (a) liczba policzona z rejestru, (b) cena z listy locked,
 * (c) zdanie stojące już na istniejącej stronie usługi lub poradnika,
 * (d) zasada operacyjna zapisana w kontrakcie typu. Przy każdym pytaniu
 * stoi litera źródła, żeby kontrola nie musiała zgadywać.
 */
const FAQ_HUBU = [
  {
    /* (a) REALIZACJE.length */
    pytanie: 'Ile wdrożeń pokazujecie na tej stronie?',
    odpowiedz: `Na tej stronie opisujemy ${LICZBA_WDROZEN} wdrożeń, w ${LICZBA_OBSZAROW} obszarach i dla klientów z ${LICZBA_BRANZ} branż. Tyle mamy dziś opisanych z pełnym efektem. Każde ma osobną stronę z kontekstem, rozwiązaniem i liczbą.`,
  },
  {
    /* (d) kontrakt lib/realizacje/types.ts: „Klient anonimowy = NIE wymyślamy
       nazwy". 2026-08-20: Paweł przypisał wszystkie dotychczas anonimowe
       case do KNF Team albo wdrożeń własnych, więc odpowiedź mówi o zasadzie,
       nie o „części wdrożeń bez nazwy" (dziś takich nie ma). */
    pytanie: 'Skąd wiem, że te wdrożenia są prawdziwe?',
    odpowiedz:
      'Każde wdrożenie podpisujemy: nazwą klienta, gdy mamy jego zgodę, albo wprost „wdrożenie własne", gdy zbudowaliśmy coś dla siebie i używamy tego na co dzień. Nie wymyślamy nazw firm ani logotypów po to, żeby case wyglądał lepiej, a gdyby klient nie zgodził się na nazwę, napisalibyśmy to wprost.',
  },
  {
    /* (a) suma efekt.metryki po rejestrze */
    pytanie: 'Czy każde wdrożenie ma policzony efekt?',
    odpowiedz: `Tak. Każde ma sekcję „Co to dało?" z twardą liczbą, a od tej wersji także kartę wdrożenia w formie tabeli, gdzie te same liczby stoją obok klienta, branży i obszaru. Razem daje to ${LICZBA_METRYK} liczb-dowodów.`,
  },
  {
    /* (b) ceny locked, zdania 1:1 z /uslugi/chatboty, /uslugi/voiceboty i poradnika o automatyzacji */
    pytanie: 'Ile kosztuje podobne wdrożenie u mnie?',
    odpowiedz:
      'Zależy od obszaru. Chatbot na stronę startuje od 1790 zł netto i powstaje w 1 do 2 dni roboczych, wdrożenie średnie to 3000 do 6000 zł netto, a duże z integracjami 8000 do 15000 zł netto. Voicebot to 2500 zł netto w wersji prostej, gotowy w 3 do 5 dni roboczych, albo 5000 do 9000 zł netto z integracjami, wtedy 5 do 25 dni roboczych. Automatyzacja procesu kosztuje zwykle od 3000 do 10000 zł, audyt AI to 1490 zł netto i odliczamy go od wdrożenia, a pakiet AI Start z pierwszą automatyzacją na próbę to 1990 zł. Czas wdrożenia liczymy od przekazania kompletu materiałów, nie od podpisania umowy. Dokładną wycenę podajemy po bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
  },
  {
    /* (c) dwa modele rozliczenia, zdanie 1:1 z /uslugi/chatboty */
    pytanie: 'Czy po takim wdrożeniu płacę abonament?',
    odpowiedz:
      'Masz to do wyboru. Przekazujemy Ci całą infrastrukturę i wtedy nie płacisz abonamentu, albo projekt zostaje u nas pod opieką i wtedy jest opłata utrzymaniowa: chatboty i automatyzacje od 99 do 599 zł netto miesięcznie, voiceboty od 299 do 1500 zł netto miesięcznie. Decydujesz na etapie wyceny, nie po fakcie.',
  },
  {
    /* (d) HOME_CTA z lib/site.ts */
    pytanie: 'Od czego zaczyna się taka współpraca?',
    odpowiedz:
      'Od bezpłatnej diagnozy. Bez zobowiązań: krótka rozmowa i konkretna lista procesów, które u Ciebie da się zautomatyzować. Dopiero potem rozmawiamy o zakresie i cenie.',
  },
];

export default function RealizacjePage() {
  return (
    <main id="main">
      {/* Hero hubu — answer-first, co tu znajdziesz.
          INFINITY v2: tone="transparent" — globalne tło prześwituje (karty .inf-card
          mają własne solidne powierzchnie, więc lista zostaje czytelna). */}
      <Section tone="transparent">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h1 className="text-display">Realizacje</h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-6 text-fg-muted">
              Tu pokazujemy, co realnie zbudowaliśmy i co to dało. Każde wdrożenie
              to konkretny problem firmy, konkretne rozwiązanie i efekt z liczbą.
              Bez okrągłych słów. Najpierw wynik, potem rozmowa.
            </p>
          </Reveal>

          {/* v22 (§2.6 pkt 2): PAS METRYK pod hero. Chwyt obecny na wszystkich
              pięciu mierzonych podstronach wzorca. Wszystkie cztery liczby są
              policzone z rejestru wyżej, więc nie mogą się rozjechać z listą. */}
          <Reveal delay={0.1}>
            <PasekMetryk kafle={METRYKI_HUBU} ton={TON} className="mt-9" />
          </Reveal>
        </div>

        {/* Siatka kafelków z hover preview (mobile-first: 1 -> 2 -> 3 kolumny).
            Zostaje w TEJ SAMEJ sekcji co hero (jak przed v22) — pas metryk
            wchodzi między lead a siatkę, bez dokładania nowej sekcji i nowego
            pionowego oddechu. */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REALIZACJE.map((r, i) => (
            <Reveal as="li" key={r.slug} delay={Math.min(i * 0.05, 0.2)} className="h-full min-w-0">
              {/* RealizacjaCard renderuje własne <li>? Nie — tu owijamy w Reveal-li,
                  więc używamy wariantu bez zewnętrznego <li>. */}
              <RealizacjaCard realizacja={r} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* v22 (§2.6 pkt 4): TABELA ORIENTACYJNA. Przed rundą hub miał 0 tabel,
          a tabela faktów jest nadreprezentowana w cytatach modeli. Nie powiela
          kafelków: zestawia obszar i GŁÓWNĄ METRYKĘ wszystkich wdrożeń w jednej
          kolumnie, czyli daje porównanie, którego siatka kart nie daje. */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Wszystkie wdrożenia w jednej tabeli</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Ten sam zbiór co wyżej, ustawiony tak, żeby dało się porównać obszar
              i główny efekt bez wchodzenia w każdą stronę osobno.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <TabelaRejestru
                podpis={`Wdrożenia AI SimpleFast.ai: obszar i główny efekt (${LICZBA_WDROZEN} pozycji)`}
                naglowki={['Wdrożenie', 'Obszar', 'Główny efekt']}
                wiersze={WIERSZE_TABELI}
                ton={TON}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* v22 (§2.6 pkt 5): FAQ HUBU w natywnych <details>. Przed rundą hub miał
          zero. Odpowiedzi są w HTML od pierwszego żądania, bez JS i bez bramki
          na klik, a ta sama tablica idzie do FAQPage niżej. */}
      <HubFAQ pytania={FAQ_HUBU} ton={TON} />

      {/* v22 (§2.6 pkt 6 i §3 P2 pkt 14-15): LINKI REDAKCYJNE domykające sieroty.
          Pomiar linków przed rundą: /produkty, /uslugi i /wiedza nie miały ani
          jednego linku redakcyjnego spoza menu, stopki i okruszków. Ten akapit
          jest ich realnym wejściem z treści. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Gdzie iść dalej?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Jeśli szukasz wdrożenia w konkretnym obszarze, zacznij od{' '}
              <Link href="/uslugi" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                pełnej listy usług
              </Link>
              . Jeśli chcesz zobaczyć, co zbudowaliśmy dla siebie i co da się z tego
              złożyć u Ciebie, zajrzyj do{' '}
              <Link href="/produkty" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                naszych produktów
              </Link>
              . A jeśli wolisz najpierw poczytać, jak to liczymy i wdrażamy, cały
              zbiór materiałów jest w{' '}
              <Link href="/wiedza" className="font-semibold text-accent-hover underline-offset-2 hover:underline">
                Centrum Wiedzy AI
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      {/* CTA domykające (jasna sekcja premium .surface-aurora), wspólny flow diagnozy */}
      <Section tone="base" id="diagnoza" className="surface-aurora">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">Chcesz podobny efekt u siebie?</h2>
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
                Bezpłatna diagnoza. Najpierw liczby, potem decyzja.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        BreadcrumbList JSON-LD (Strona główna -> Realizacje), serwerowo w HTML.
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Realizacje', path: PATH },
        ])}
      />

      {/* v22 (§3 P3 pkt 17): ItemList — lista wdrożeń zbudowana MAPOWANIEM
          rejestru, więc numberOfItems jest z definicji prawdziwe, a każdy URL
          prowadzi do realnej trasy SSG. */}
      <JsonLd
        data={itemListSchema({
          path: PATH,
          nazwa: 'Realizacje AI SimpleFast.ai',
          pozycje: REALIZACJE.map((r) => ({
            nazwa: r.h1,
            path: `${PATH}/${r.slug}`,
          })),
        })}
      />

      {/* v22 (§3 P3 pkt 18): FAQPage z TEJ SAMEJ tablicy, którą renderuje HubFAQ.
          Jedno źródło = zero rozjazdu treść/schema. */}
      <JsonLd data={faqSchemaPl(FAQ_HUBU, PATH)} />

      {/* v22 (§3 P0 pkt 2): ręczny <link rel="canonical"> USUNIĘTY — kanoniczny
          URL wystawia już `buildMetadata` w `metadata` wyżej. */}
    </main>
  );
}
