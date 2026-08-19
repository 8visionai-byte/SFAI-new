import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchemaPl } from '@/components/seo/schemas';
import { SITE } from '@/lib/site';
import { getUslugaBySlug, USLUGI } from '@/lib/uslugi';
import { PODSTRONY } from '@/lib/uslugi/podstrony';
import type { Usluga } from '@/lib/uslugi/types';
import { INF_USLUGA_BADGE } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

import { Section, Card, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/uslugi/Breadcrumbs';
import { PasekMetryk } from '@/components/sections/PasekMetryk';
import { TabelaRejestru } from '@/components/sections/TabelaRejestru';
import { HubFAQ } from '@/components/sections/HubFAQ';
import { HOME_CTA } from '@/lib/site';

/**
 * HUB /uslugi (rozdroze) — SSG (force-static). Cala tresc w surowym HTML przy
 * 1. zadaniu (KPI #1: cytowalnosc). Reveal/MagneticButton to wyspy klienta i
 * tylko wzbogacaja; tekst, naglowki i linki sa w HTML niezaleznie od JS.
 *
 * STRUKTURA (answer-first):
 *  hero (co tu jest, 2-3 zdania) -> wyrozniony blok parasola "Architekci Wartosci AI"
 *  -> 3 KLASTRY uslug (Obsluga 24/7 · Back-office i procesy · Budowa i strategia)
 *  -> CTA domykajace (#diagnoza).
 *
 * ZRODLO PRAWDY listy = rejestr lib/uslugi (getUslugaBySlug po slugu). Klastry
 * skladamy z realnych slugow -> zero martwych linkow. Kazdy kafel linkuje do
 * /uslugi/<slug> (SSG, 200 OK). Parasol linkuje do /uslugi/architekci-wartosci-ai.
 *
 * SITEMAP/NAV: trase /uslugi i /uslugi/architekci-wartosci-ai ustawia integrator w
 * lib/site.ts (ROUTES live:true). 10 uslug wchodzi do sitemapy przez rejestr.
 */
export const dynamic = 'force-static';

const PATH = '/uslugi';
const CANONICAL = `${SITE.url}${PATH}`;

export const metadata: Metadata = buildMetadata({
  title: 'Usługi AI dla firm: automatyzacje, agenci, strony',
  description:
    'Usługi AI dla MŚP: chatboty i voiceboty 24/7, automatyzacja faktur i procesów, audyt AI, strony pod SEO i AI. Zacznij od jednej automatyzacji.',
  path: PATH,
});

/**
 * 3 KLASTRY intencji. Kazdy klaster = naglowek-pytanie + lista slugow z rejestru.
 * Slugi MUSZA istniec w lib/uslugi (inaczej kafel sie nie wyrenderuje) -> brak 404.
 */
type Klaster = {
  id: string;
  /** H2 jak pytanie (north star: naglowki jak pytania). */
  h2: string;
  /**
   * v22: nazwa grupy prostym jezykiem, do kolumny "Grupa" w tabeli orientacyjnej.
   * ZERO nowej tresci: te trzy nazwy stoja juz w kapsule hero tej strony
   * ("trzy grupach: obsluga 24/7, back-office i procesy, budowa i strategia").
   * H2 klastra jest PYTANIEM, wiec do komorki tabeli sie nie nadaje.
   */
  etykieta: string;
  /** Zdanie answer-first pod naglowkiem klastra. */
  intro: string;
  slugs: string[];
};

const KLASTRY: Klaster[] = [
  {
    id: 'obsluga',
    etykieta: 'Obsługa 24/7',
    h2: 'Kto odbierze klienta, telefon i kandydata 24/7?',
    intro:
      'Pierwsza linia, która odpowiada od razu, też wieczorem i w weekend. Agent zbiera leady, umawia, odpowiada na powtarzalne pytania. Człowiek decyduje, agent robi resztę.',
    slugs: ['chatboty', 'voiceboty', 'agent-rekrutacyjny'],
  },
  {
    id: 'back-office',
    etykieta: 'Back-office i procesy',
    h2: 'Co zdejmie z zespołu powtarzalną robotę za kulisami?',
    intro:
      'Przepisywanie danych, faktury, potwierdzenia, terminy. To, co zjada godziny i nie buduje firmy. Automat robi to po cichu, a my pilnujemy, żeby działał.',
    slugs: ['automatyzacje', 'dokumenty-faktury', 'opieka-ai'],
  },
  {
    id: 'budowa',
    etykieta: 'Budowa i strategia',
    h2: 'Od czego zacząć i co zbudować, żeby nie przepalić kasy?',
    intro:
      'Najpierw mapa, gdzie AI da zysk. Potem to, czego nie ma na półce: aplikacje, wtyczki, strony cytowalne przez AI. Najpierw plan, potem wydatek.',
    slugs: ['audyt-ai', 'rozwiazania', 'strony-www', 'optymalizacja'],
  },
];

/**
 * TON HUBU = fallback dekoracji rejestru (INF_KATEGORIA_DEFAULT, czyli akcent
 * marki na tokenach CSS). /uslugi to ROZDROZE: kazda z dziesieciu uslug ma tu
 * swoj wlasny kolor na kaflu, wiec pas metryk, tabela i FAQ nie moga przejac
 * zadnego z nich, bo faworyzowalyby jedna rodzine. Zero nowej mapy kolorow.
 */
const TON = INF_KATEGORIA_DEFAULT;

/* ─────────────────────────────────────────────────────────────────────
   LICZBY HUBU: POLICZONE Z REJESTRU PRZY BUILDZIE (PLAN-v22 §1.7a:
   liczba wpisana z palca to zmyslona liczba). Dopisanie uslugi w
   lib/uslugi albo podstrony w lib/uslugi/podstrony automatycznie
   przelicza pas metryk, tabele i odpowiedzi FAQ. */

/** 10 uslug: lib/uslugi/index.ts USLUGI (chatboty ... optymalizacja). */
const LICZBA_USLUG = USLUGI.length;

/** 3 podstrony voicebotow: lib/uslugi/podstrony/index.ts PODSTRONY. */
const LICZBA_PODSTRON = PODSTRONY.length;

/** Strony z pelnym opisem uslugi = 10 uslug + 3 podstrony (wszystkie SSG, 200 OK). */
const LICZBA_STRON = LICZBA_USLUG + LICZBA_PODSTRON;

/** Uslugi z kwota podana wprost = ramaCeny.minPrice ustawione w rejestrze. */
const LICZBA_Z_CENA = USLUGI.filter((u) => typeof u.ramaCeny.minPrice === 'number').length;

/** Suma pozycji FAQ ze WSZYSTKICH stron uslug: 10 uslug + podstrony.
 *  v22b (kontrola: MINOR-2): liczylo tylko USLUGI, wiec metryka mowila 61,
 *  gdy sasiednia metryka chwalila sie 13 stronami — trzy podstrony voicebotow
 *  maja po 6 pytan i wypadaly z licznika. Teraz obie liczby opisuja ten sam
 *  zbior stron. */
const LICZBA_PYTAN =
  USLUGI.reduce((suma, u) => suma + u.faq.length, 0) +
  PODSTRONY.reduce((suma, p) => suma + p.faq.length, 0);

const METRYKI_HUBU = [
  { wartosc: String(LICZBA_USLUG), opis: 'usługi AI w ofercie' },
  {
    wartosc: String(LICZBA_STRON),
    opis: 'strony z pełnym opisem usługi',
    zrodlo: `${LICZBA_USLUG} usług i ${LICZBA_PODSTRON} podstrony voicebotów`,
  },
  {
    wartosc: String(LICZBA_Z_CENA),
    opis: 'usługi z ceną podaną wprost',
    zrodlo: 'kwota „od" w ramie ceny',
  },
  {
    wartosc: String(LICZBA_PYTAN),
    opis: 'pytania z odpowiedziami',
    zrodlo: 'sekcje FAQ na stronach usług',
  },
];

/**
 * Kwota w kolumnie „Cena": WYLACZNIE z pola `ramaCeny.minPrice` rejestru.
 *
 * Sam `minPrice` to goly number, a rejestr niesie DWA rozne rodzaje kwoty:
 * jednorazowa (pakiet startowy chatbota i voicebota), stala (Sprint
 * Diagnostyczny) i miesieczna (ryczalt Opieki AI). Wyswietlenie wszystkich
 * jako „od X zl" zrobiloby z ryczaltu 3000 zl miesiecznie jednorazowa oplate,
 * czyli falszywy fakt. Rozroznienie kopiujemy 1:1 z ISTNIEJACEJ konwencji
 * `KAFEL_CENY` (components/uslugi/ServiceHero.tsx:108-113), ktora maluje kafel
 * ceny w hero kazdej z tych uslug. Zero nowych slow.
 */
const CENA_FORMAT: Record<string, { prefiks: '' | 'od '; sufiks: string }> = {
  chatboty: { prefiks: 'od ', sufiks: '' }, // pakiet startowy
  voiceboty: { prefiks: 'od ', sufiks: '' }, // pakiet startowy
  'audyt-ai': { prefiks: '', sufiks: '' }, // Sprint Diagnostyczny: cena stala
  'opieka-ai': { prefiks: 'od ', sufiks: ' miesięcznie' }, // ryczalt miesieczny
};

/** Grupa (klaster) po slugu: z tej samej tablicy KLASTRY, ktora rysuje sekcje. */
const GRUPA_PO_SLUGU = new Map<string, string>(
  KLASTRY.flatMap((k) => k.slugs.map((slug) => [slug, k.etykieta] as [string, string]))
);

function cenaZRejestru(usluga: Usluga): string {
  const kwota = usluga.ramaCeny.minPrice;
  // Brak kwoty w rejestrze = brak kwoty na stronie. Zdanie 1:1 z mechaniki
  // opisanej w ramaCeny.tresc tych uslug („dokladne widelki podajemy na
  // bezplatnej diagnozie"), zero zmyslonej liczby.
  if (typeof kwota !== 'number') return 'wycena po bezpłatnej diagnozie';
  const format = CENA_FORMAT[usluga.slug] ?? { prefiks: 'od ' as const, sufiks: '' };
  return `${format.prefiks}${kwota.toLocaleString('pl-PL')} zł${format.sufiks}`;
}

/**
 * Tabela orientacyjna uslug (PLAN-v22 §2.6 pkt 4). Wiersze budowane MAPOWANIEM
 * REJESTRU `USLUGI`, nigdy literalami, wiec dopisanie uslugi dopisuje wiersz.
 *
 * KOLUMNY, KTORYCH NIE MA I DLACZEGO: plan sugerowal „dla kogo" i „czas
 * wdrozenia". ZADNE z tych pol nie istnieje w typie `Usluga`
 * (lib/uslugi/types.ts), a wyciagniecie ich z prozy `problem.tresc` albo
 * `kroki` byloby zgadywaniem. Kolumny wypadaja, brak zglaszamy kontroli.
 *
 * TABELA NIE POWIELA KART: kafel pokazuje h1 + problem.h2 + badge, tabela
 * pokazuje h1 + grupe + KWOTE, ktorej na kaflach nie ma w ogole.
 */
const WIERSZE_TABELI: string[][] = USLUGI.map((u) => [
  u.h1,
  GRUPA_PO_SLUGU.get(u.slug) ?? 'poza grupami',
  cenaZRejestru(u),
]);

/**
 * FAQ HUBU (PLAN-v22 §2.6 pkt 5): kazda odpowiedz wyprowadzona ze zrodla
 * dopuszczonego regula (a)-(d): (a) liczba policzona z rejestru, (b) cena
 * z listy locked, (c) zdanie stojace juz na istniejacej stronie, (d) zasada
 * zapisana w kontrakcie typu albo w bazie wiedzy agenta. Zrodlo z numerem
 * linii stoi przy kazdym pytaniu, zeby kontrola nie musiala zgadywac.
 * Ta sama tablica idzie do renderu i do FAQPage, wiec rozjazd jest niemozliwy.
 */
const FAQ_HUBU = [
  {
    /* (b)+(c) lib/uslugi/audyt-ai.ts:78 (ramaCeny.tresc: „Sprint Diagnostyczny
       kosztuje 1490 zl [...] odliczamy od kosztu wdrozenia"); api/_knowledge.mjs:37
       (AI Start 1990 zl, pierwsza automatyzacja na probe); kapsula hero tej
       strony („Zaczynasz od jednej rzeczy, ktora zzera najwiecej czasu"). */
    pytanie: 'Od czego zacząć, jeśli nie wiem, która usługa jest dla mnie?',
    odpowiedz:
      'Od bezpłatnej diagnozy. Mówimy wprost, czy w ogóle warto budować, i pokazujemy jedną rzecz, która zżera Ci najwięcej czasu. Jeśli chcesz mapę całej firmy, robimy audyt AI za 1490 zł, a tę kwotę odliczamy od kosztu wdrożenia, gdy ruszamy dalej. Jeśli wolisz zobaczyć efekt na jednym procesie, zaczynamy od pierwszej automatyzacji na próbę w pakiecie AI Start za 1990 zł. Nie musisz wybierać wszystkiego dziś.',
  },
  {
    /* (c) lib/uslugi/chatboty.ts:22 (kapsula: chatbot tekstowy na stronie
       i w komunikatorach, pierwszy krok do Agenta); lib/uslugi/voiceboty.ts:21
       (kapsula: bot glosowy odbiera telefon, umawia wizyte); kapsula hero tej
       strony („Agent wykonuje prace pod nadzorem czlowieka"). */
    pytanie: 'Czym różni się chatbot od voicebota i od agenta AI?',
    odpowiedz:
      'Chatbot jest tekstowy: odpowiada klientom na stronie i w komunikatorach, tłumaczy ofertę, zbiera leady. Voicebot jest głosowy: odbiera telefon, rozmawia po polsku, umawia wizytę i zapisuje ją w kalendarzu. Agent AI to kolejny poziom obu: nie tylko odpowiada, ale wykonuje pracę pod nadzorem człowieka, czyli umawia, zapisuje i przekazuje sprawę dalej. Chatbot i voicebot to zwykle pierwszy krok do Agenta.',
  },
  {
    /* (a) LICZBA_Z_CENA policzone z rejestru; (b) ceny z audytu 2026-08-18:
       chatboty.ts minPrice 1790, voiceboty.ts minPrice 2500, audyt-ai.ts 1490,
       opieka-ai.ts:84 minPrice 3000; api/_knowledge.mjs:37 (AI Start 1990)
       i api/_knowledge.mjs:42 (automatyzacja 3000-10000 zl). */
    pytanie: 'Ile kosztuje wdrożenie AI w małej firmie?',
    odpowiedz: `${LICZBA_Z_CENA} usługi mają kwotę podaną wprost. Chatbot na stronę startuje od 1790 zł netto i powstaje w 1 do 2 dni roboczych, wdrożenie średnie to 3000 do 6000 zł netto, a duże z integracjami 8000 do 15000 zł netto. Voicebot to 2500 zł netto w wersji prostej i 5000 do 9000 zł netto z integracjami. Audyt AI kosztuje 1490 zł netto, a Opieka AI od 3000 zł miesięcznie za ryczałt 10 godzin. Pierwsza automatyzacja na próbę w pakiecie AI Start to 1990 zł, a większe wdrożenie automatyzacji kosztuje zwykle od 3000 do 10000 zł, zależnie od liczby integracji. Czas wdrożenia liczymy od przekazania kompletu materiałów. Resztę wyceniamy po bezpłatnej diagnozie, zanim cokolwiek zamówisz.`,
  },
  {
    /* (d) api/_knowledge.mjs:336 (dwa modele rozliczenia) i api/_knowledge.mjs:38
       (opieka 99-599 zl); (c) lib/uslugi/audyt-ai.ts:78, zdanie 1:1:
       „przekazujemy Ci cala infrastrukture i wtedy nie placisz abonamentu";
       lib/uslugi/opieka-ai.ts:83 (ryczalt 10 h = 3000 zl miesiecznie). */
    pytanie: 'Czy po wdrożeniu płacę abonament?',
    odpowiedz:
      'Masz wybór. Przekazujemy Ci całą infrastrukturę i wtedy nie płacisz abonamentu, albo projekt zostaje u nas pod opieką i wtedy jest opłata utrzymaniowa: chatboty i automatyzacje od 99 do 599 zł netto miesięcznie, voiceboty od 299 do 1500 zł netto miesięcznie. Decydujesz na etapie wyceny, nie po fakcie. Czym innym jest Opieka AI jako osobna usługa: to ryczałt godzin miesięcznie na utrzymanie i rozwój, od 3000 zł za 10 godzin.',
  },
  {
    /* (c) lib/uslugi/voiceboty.ts:100 (FAQ „Czy voicebot dzwoni sam do
       klientow?": obsluguje polaczenia przychodzace, nie wydzwaniamy);
       lib/uslugi/voiceboty.ts:39 („Klient zawsze slyszy, ze rozmawia
       z asystentem AI"); api/_knowledge.mjs:23. */
    pytanie: 'Czy voicebot będzie sam wydzwaniał do moich klientów?',
    odpowiedz:
      'Nie. Nasze voiceboty obsługują wyłącznie połączenia przychodzące: bot odbiera telefon i prowadzi rozmowę. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy. Gdy sprawa wymaga kontaktu zwrotnego, bot ją zapisuje i wysyła powiadomienie, a rozmowę zaczyna człowiek albo klient, który oddzwania. Klient na starcie słyszy, że rozmawia z asystentem AI.',
  },
];

/** Kafel usługi — link po H1 (= money query), kapsuła skrócona do dowodu wartości.
    INFINITY v5 (spec §4 — pełna spójność z home, treść 1:1): .inf-card na Card
    variant="quiet" (narożniki + sweep robi sama karta), kafelek kategorii z
    UNIKALNĄ ikoną SVG (jak PromoUslugi na home — v5: emoji tylko w dropdownach
    nav), --card-c-l = odcień kategorii, badge mono po prawej = pochodna sluga
    (INF_USLUGA_BADGE — istniejące pole rejestru, jak w dropdownie), strzałka
    .inf-arrow, spotlight .inf-spotlight jako wewnętrzny div aria-hidden. */
function UslugaKafel({ usluga }: { usluga: Usluga }) {
  const dekor = INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT;
  const odcien = dekor.odcien ?? dekor.c;
  return (
    <Card
      as="article"
      variant="quiet"
      className="inf-card inf-card-full-hover h-full"
      style={{ '--card-c': dekor.c, '--card-c-l': odcien } as CSSProperties}
    >
      <div aria-hidden="true" className="inf-spotlight" />
      <Link
        href={`/uslugi/${usluga.slug}`}
        className="flex h-full flex-col rounded-lg p-6"
      >
        {/* Wiersz dekoracji jak w dropdownie wzorca: kafelek ikony + badge mono
            kategorii po prawej (pochodna sluga, dekoracja w odcieniu karty). */}
        <span className="flex items-center justify-between gap-3">
          <span
            aria-hidden="true"
            className="inf-tile"
            style={{ '--tile-c': dekor.c } as CSSProperties}
          >
            <InfIcon name={dekor.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
          </span>
          {INF_USLUGA_BADGE[usluga.slug] && (
            <span className="inf-tag" style={{ color: odcien }}>
              {INF_USLUGA_BADGE[usluga.slug]}
            </span>
          )}
        </span>
        <h3 className="text-h3 mt-4 text-fg">{usluga.h1}</h3>
        <p className="mt-3 text-body-sm text-fg-muted">{usluga.problem.h2}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-body-sm font-semibold text-accent-hover">
          Zobacz usługę
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="inf-arrow text-accent-hover">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </Card>
  );
}

export default function UslugiHubPage() {
  return (
    <main id="main">
      {/* ───────────────────────────────────────────────────────────────
          (1) HERO HUBU — answer-first: co tu znajdziesz, jedno zdanie różnicy.
          INFINITY v2: tone="transparent" — globalne tło (starfield/particles)
          prześwituje, hero bez solidnego bg. */}
      <Section tone="transparent">
        <div className="mx-auto max-w-narrow">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Usługi' },
            ]}
          />

          <Reveal>
            <h1 className="text-display mt-6">Usługi AI dla firm</h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.05}>
            <p className="text-lead mt-6 text-fg-muted">
              Budujemy chatboty, voiceboty i automatyzacje, które łączymy w Agentów AI.
              Agent wykonuje pracę pod nadzorem
              człowieka: odbiera telefon, umawia, pilnuje faktur, odsiewa CV. Poniżej
              dziesięć usług w trzech grupach: obsługa 24/7, back-office i procesy,
              budowa i strategia. Nie musisz wybierać dziś. Zaczynasz od jednej rzeczy,
              która zżera najwięcej czasu.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-body text-fg-muted">
              AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje. Twoje dane
              zostają w Unii Europejskiej, a pierwszy krok jest mały i odwracalny.
            </p>
          </Reveal>

          {/* v22 (PLAN-v22 §2.6 pkt 2): PAS METRYK pod hero. Wszystkie cztery
              liczby policzone z rejestru przy buildzie, wiec nie da sie ich
              rozjechac z lista kafli nizej ani z sekcjami FAQ na podstronach. */}
          <Reveal delay={0.15}>
            <PasekMetryk kafle={METRYKI_HUBU} ton={TON} className="mt-9" />
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2) WYRÓŻNIONY BLOK PARASOLA — wejście do "Architekci Wartości AI". */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            {/* INFINITY v5: wyróżnienie parasola zostaje na .sf-rim-gradient
                (mechanizm home: wyróżniony plan cennika) — badge w języku inf
                (mono .inf-tag na akcencie jak "Najczęściej wybierane" na home). */}
            <Card variant="highlight" className="overflow-hidden">
              <span className="inf-tag rounded-full border-transparent bg-accent px-3 py-1 text-accent-contrast">
                Zacznij tutaj
              </span>
              <h2 className="text-h2 mt-4">Nie wiesz, którą usługę wybrać?</h2>
              <p className="text-lead mt-4 text-fg-muted">
                Architekci Wartości AI to my zamiast etatowego działu AI. Sami sprawdzamy,
                gdzie tracisz godziny, budujemy jedną automatyzację na próbę i ją
                utrzymujemy. Ty decydujesz, czy idziemy dalej. Zaczynasz za 0 zł.
              </p>
              <div className="mt-7">
                <MagneticButton variant="primary" size="lg" href="/uslugi/architekci-wartosci-ai">
                  Zobacz, jak to działa
                </MagneticButton>
              </div>
              <p className="mt-4 text-caption text-fg-subtle">
                Pełny jawny cennik od 0 zł. Najpierw efekt na Twoich danych, potem decyzja.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3) 3 KLASTRY USŁUG — naglowki jak pytania, kafelki = realne strony. */}
      {KLASTRY.map((klaster, ki) => {
        // Skladamy kafelki z realnych uslug w rejestrze (slug nieznany -> pomijamy).
        const uslugi = klaster.slugs
          .map((slug) => getUslugaBySlug(slug))
          .filter((u): u is Usluga => Boolean(u));

        if (uslugi.length === 0) return null;

        return (
          <Section key={klaster.id} tone={ki % 2 === 0 ? 'base' : 'subtle'}>
            <div className="mx-auto max-w-narrow">
              {/* Overline mono klastra = ISTNIEJĄCY identyfikator (klaster.id),
                  język techniczny wzorca jak slug w PromoUslugi — zero nowych
                  stringów treści (dekoracja pochodna pola rejestru). */}
              <Reveal>
                <p className="inf-overline">{klaster.id}</p>
                <h2 className="text-h2 mt-2">{klaster.h2}</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="text-lead mt-4 text-fg-muted">{klaster.intro}</p>
              </Reveal>
            </div>

            <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {uslugi.map((usluga, i) => (
                <Reveal as="li" key={usluga.slug} delay={Math.min(i * 0.05, 0.2)} className="h-full">
                  <UslugaKafel usluga={usluga} />
                </Reveal>
              ))}
            </ul>
          </Section>
        );
      })}

      {/* ───────────────────────────────────────────────────────────────
          (3b) v22 (§2.6 pkt 4): TABELA ORIENTACYJNA. Przed ta runda /uslugi
          bylo jedynym hubem bez ani jednej <table>. Zestawia dziesiec uslug
          w jednym rzucie oka i dokłada kolumne, ktorej NIE MA na kaflach:
          kwote z rejestru. Wiersze mapowane z USLUGI, nigdy literalami. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Która usługa ile kosztuje?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Wszystkie {LICZBA_USLUG} usług z tej strony, ustawione obok siebie. Tam,
              gdzie mamy jawną kwotę, stoi ona wprost. Tam, gdzie cena zależy od liczby
              integracji i wielkości procesu, mówimy to otwarcie zamiast wpisywać
              liczbę z sufitu.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <TabelaRejestru
                podpis={`Usługi AI SimpleFast.ai: grupa i cena wyjściowa (${LICZBA_USLUG} pozycji)`}
                naglowki={['Usługa', 'Grupa', 'Cena']}
                wiersze={WIERSZE_TABELI}
                ton={TON}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3c) v22 (§2.6 pkt 5): FAQ HUBU w natywnych <details>. Przed ta runda
          /uslugi mialo zero. Odpowiedzi sa w HTML od pierwszego zadania, bez JS
          i bez bramki na klik; ta sama tablica idzie do FAQPage nizej. */}
      <HubFAQ pytania={FAQ_HUBU} ton={TON} />

      {/* ───────────────────────────────────────────────────────────────
          (4) CTA DOMYKAJĄCE — jedno główne, wspólny flow diagnozy (.surface-aurora). */}
      <Section tone="base" id="diagnoza" className="surface-aurora">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">Zacznijmy od jednej rzeczy, która zżera Ci najwięcej czasu.</h2>
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
                Realne wdrożenia: auto-email obsługi klienta gotowy w 75% i generator
                leadów, który zrobił 1000 rekordów w 40 minut.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        BreadcrumbList JSON-LD (Strona główna -> Usługi), serwerowo w HTML.
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Usługi', path: PATH },
        ])}
      />

      {/*
        v22 (§2.6 pkt 8 i §3 P3 pkt 17): ItemList JSON-LD: lista dziesieciu uslug
        wprost z rejestru `USLUGI`. `name` = h1 strony docelowej, `description` =
        jej metaDescription, `url` = realna trasa /uslugi/<slug> (SSG, 200 OK),
        wiec kazdy string jest prawdziwy i kazdy link istnieje. Kolejnosc
        pozycji = kolejnosc rejestru = kolejnosc kafli w trzech klastrach wyzej.
      */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${CANONICAL}/#lista`,
          name: 'Usługi AI SimpleFast.ai',
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          numberOfItems: USLUGI.length,
          itemListElement: USLUGI.map((usluga, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: usluga.h1,
            description: usluga.metaDescription,
            url: `${SITE.url}${PATH}/${usluga.slug}`,
          })),
        }}
      />

      {/* v22 (§3 P3 pkt 18): FAQPage z TEJ SAMEJ tablicy, ktora renderuje HubFAQ.
          Jedno zrodlo = zero rozjazdu tresc/schema. */}
      <JsonLd data={faqSchemaPl(FAQ_HUBU, PATH)} />

      {/* v22 (§3 P0 pkt 2, kryterium odbioru §5.4): reczny <link rel="canonical">
          USUNIETY. Kanoniczny URL wystawia juz `buildMetadata` w `metadata`
          wyzej (alternates.canonical), wiec ten znacznik dawal w <head> DRUGI
          rel=canonical. Stala CANONICAL zostaje: uzywa jej @id ItemListy. */}
    </main>
  );
}
