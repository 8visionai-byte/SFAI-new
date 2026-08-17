import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from '@/components/seo/schemas';
import { SITE } from '@/lib/site';

import type { CSSProperties } from 'react';
import { Section, MagneticButton, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/uslugi/Breadcrumbs';
import {
  DrabinaOfert,
  CzegoNieMusisz,
  ObiekcjeOdpowiedzi,
  TabelaCen,
} from '@/components/oferta';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * FLAGOWA STRONA-PARASOL „Architekci Wartości AI" (/uslugi/architekci-wartosci-ai).
 *
 * RENAME + PRZEPOZYCJONOWANIE strony „Zewnętrzny Dział AI". Sens nowej nazwy:
 * rozliczamy się za PRZYNIESIONĄ WARTOŚĆ (odzyskane godziny i złotówki, ROI),
 * a nie za godziny pracy. Pakiety są skrojone tak, by zwracały się oszczędnością.
 *
 * Trasa STATYCZNA OBOK dynamicznej [usluga] — celowo NIE w rejestrze lib/uslugi,
 * bo to strategiczne centrum oferty (drabina niskiego progu, pełny cennik, zespół),
 * a nie pojedyncza usługa z szablonu 8-sekcyjnego. Next routing: ten segment
 * (`architekci-wartosci-ai/page.tsx`) ma pierwszeństwo przed [usluga] dla tego slugu,
 * więc nie koliduje z generateStaticParams w [usluga] (slug i tak nie jest w rejestrze).
 *
 * STRATEGIA NISKIEGO PROGU (kolejność sekcji = od najtańszego/darmowego):
 *  hero (zacznij od jednej automatyzacji) -> problem -> „rozliczamy się za wartość" ->
 *  drabina L0..L5 -> „czego nie musisz" -> obiekcje -> PEŁNY cennik (transparentność) ->
 *  zespół (nie freelancer) -> dla kogo -> FAQ -> finalne CTA. Jedno główne CTA: #diagnoza.
 *
 * KPI #1 (cytowalność = priorytet Pawła): cała treść w surowym HTML przy 1. żądaniu
 * (force-static SSG). JSON-LD Service + FAQPage + BreadcrumbList wstrzyknięty
 * SERWEROWO. Tekst FAQ jest 1:1 z sekcją widoczną (jedno źródło: stała FAQ).
 *
 * SITEMAP/NAV: NIE dotykamy ROUTES ani nawigacji — integrator podmieni slug
 * (lista miejsc do podmiany jest w manifeście tej zmiany).
 */
export const dynamic = 'force-static';

const PATH = '/uslugi/architekci-wartosci-ai';
const CANONICAL = `${SITE.url}${PATH}`;

export const metadata: Metadata = buildMetadata({
  title: 'Architekci Wartości AI: płacisz za efekt',
  description:
    'Rozliczamy się za przyniesioną wartość, nie za godziny. Jeden proces na próbę, potem decydujesz. Darmowa diagnoza i jawny cennik.',
  path: PATH,
});

/**
 * FAQ — JEDNO źródło prawdy (answer-first). Te same stringi renderujemy w sekcji
 * <details> i wkładamy do FAQPage JSON-LD, więc rozjazd schema<->treść jest
 * niemożliwy (Google/LLM karzą rozjazd). 6 pytań, odpowiedzi w głosie Pawła.
 */
const FAQ: { pytanie: string; odpowiedz: string }[] = [
  {
    pytanie: 'Kim są Architekci Wartości AI?',
    odpowiedz:
      'To my zamiast etatowego działu AI. Sami sprawdzamy, gdzie tracisz czas i pieniądze, budujemy automatyzacje i je utrzymujemy. Rozliczamy się za przyniesioną wartość, czyli za odzyskane godziny i złotówki, a nie za samo klepanie kodu. Zaczynasz od jednej automatyzacji, nie od całego działu.',
  },
  {
    pytanie: 'Co znaczy „rozliczamy się za wartość”?',
    odpowiedz:
      'Najpierw liczymy, ile dany proces Cię kosztuje: ile godzin i złotówek zjada miesięcznie. Potem dobieramy pakiet tak, żeby zwracał się oszczędnością, którą realnie odzyskasz. Patrzysz na koszt po stronie tego, co wraca do firmy, a nie po stronie cennika. Cennik jest jawny, a wartość jest mierzalna.',
  },
  {
    pytanie: 'Ile kosztuje start?',
    odpowiedz:
      'Start kosztuje 0 zł. Pierwszym krokiem jest darmowa diagnoza, czyli Mapa Oszczędności Czasu. Pierwszy płatny krok to Sprint Diagnostyczny za 1490 zł, który i tak odliczamy w całości od wdrożenia, gdy zdecydujesz się na współpracę.',
  },
  {
    pytanie: 'Czy muszę się znać na AI?',
    odpowiedz:
      'Nie. Od strony technicznej robimy wszystko my. Ty mówisz, co Cię uwiera w codziennej robocie, my dobieramy narzędzie i je wpinamy. Nie musisz uczyć się żadnych aplikacji ani zmieniać tego, czego już używasz.',
  },
  {
    pytanie: 'Co jeśli automatyzacja nie zadziała?',
    odpowiedz:
      'Dlatego zaczynamy od jednego procesu na próbę w ramach AI Start za 1990 zł, a nie od wielkiego wdrożenia. Najpierw widzisz realny efekt na swoich danych, dopiero potem decydujesz o kolejnych krokach. To mały, odwracalny krok.',
  },
  {
    pytanie: 'Czy AI zwolni moich ludzi?',
    odpowiedz:
      'Nie. AI nie zastępuje ludzi, AI zastępuje to, co ich zatrzymuje. Twój zespół przestaje przepisywać maile, faktury i raporty, a zaczyna robić to, co naprawdę wymaga człowieka. Mniej powtarzalnej roboty, więcej czasu na klienta.',
  },
];

/**
 * TONY KART TEJ STRONY (INFINITY v7 „NACZYNIA POŁĄCZONE", audyt kart partia H1).
 *
 * Problem z audytu: 6 z 9 kart .inf-card na tej stronie nie miało własnego
 * --card-c, więc spadały na fallbackowy akcent i cała strona świeciła jednym
 * cyjanem, a żadna karta nie miała reflektora, który karty mają na hubie.
 *
 * Strona-parasol CELOWO nie jest w rejestrze lib/uslugi (patrz komentarz na
 * górze pliku), więc nie ma własnej kategorii. Kolory bierzemy WYŁĄCZNIE z
 * lib/inf-kategorie (zero nowych barw) i przypisujemy je po tym, o czym karta
 * mówi w swojej WŁASNEJ treści:
 *  - Paweł „prowadzi diagnozę, Sprint"          -> audyt-ai      (#f59e0b),
 *  - Marcin „buduje automatyzacje, integracje"  -> automatyzacje (#10b981),
 *  - nisza  -> usługa, która w tej branży wchodzi pierwsza (pole `kategoria`).
 * Karty w JEDNYM gridzie mają dzięki temu RÓŻNE tony (zasada spec §C pkt 5),
 * a trzy filary wyżej zostają na stopniach trasy marki (jak cennik home).
 * Karta FAQ (jedna, pełna szerokość) idzie tonem parasola, czyli tym samym
 * INF_KATEGORIA_DEFAULT, którym ta strona świeci na home (PromoUslugi).
 * To DEKORACJA: kolor nie niesie treści i nie trafia do czytników ekranu.
 */
const TON_PAWEL = INF_KATEGORIA['audyt-ai'] ?? INF_KATEGORIA_DEFAULT;
const TON_MARCIN = INF_KATEGORIA['automatyzacje'] ?? INF_KATEGORIA_DEFAULT;

/** Styl tonu karty: --card-c (kolor kategorii) + --card-c-l (jaśniejszy odcień). */
function tonKarty(dekor: { c: string; odcien?: string }): CSSProperties {
  return { '--card-c': dekor.c, '--card-c-l': dekor.odcien ?? dekor.c } as CSSProperties;
}

/** „Dla kogo" — nisze. Pierwsza nisza (biura rachunkowe) wyróżniona.
    `kategoria` = slug z lib/inf-kategorie, czyli ton karty (dekoracja). */
const NISZE: {
  branza: string;
  opis: string;
  pierwsza?: boolean;
  kategoria?: string;
}[] = [
  {
    branza: 'Biura rachunkowe',
    opis:
      'Segregacja dokumentów, przypomnienia do klientów o brakujących fakturach, wstępne odpowiedzi na powtarzalne maile. Tu zaczynamy jako pierwsi.',
    pierwsza: true,
  },
  {
    branza: 'Kancelarie',
    opis:
      'Porządkowanie spraw, szablony pism, wyłapywanie terminów i pierwsza obsługa zapytań, zanim trafią do prawnika.',
    // pisma, terminy, papier -> dokumenty-faktury
    kategoria: 'dokumenty-faktury',
  },
  {
    branza: 'E-commerce',
    opis:
      'Obsługa pytań „gdzie moja paczka", opisy produktów, sortowanie zgłoszeń reklamacyjnych i odpowiedzi na maile po zakupie.',
    // pierwsza linia w sklepie -> chatboty
    kategoria: 'chatboty',
  },
  {
    branza: 'Firmy usługowe',
    opis:
      'Generowanie ofert, umawianie terminów, podsumowania rozmów i raporty, które dziś ktoś klepie ręcznie po godzinach.',
    // umawianie terminów i podsumowania rozmów -> voiceboty
    kategoria: 'voiceboty',
  },
];

export default function ArchitekciWartosciAiPage() {
  return (
    <main id="main">
      {/* ───────────────────────────────────────────────────────────────
          (1) HERO NISKIEGO PROGU — H1 + kapsuła answer-first + jedno CTA.
          10000 NIGDY w hero; prowadzi najtańszy, odwracalny krok.
          Przepozycjonowanie: komunikat o WARTOŚCI/ROI (płacisz za efekt). */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Usługi', href: '/uslugi' },
              { name: 'Architekci Wartości AI' },
            ]}
          />

          {/* INFINITY v12 (spec-v12 §HERO PODSTRON USŁUG): overline przerobiony
              na BADGE-pigułkę wzorca (.spatial-badge, pomiary-v12.md §4: mono
              10px/800, letter-spacing 0.2em, padding 6px 16px, radius 100px,
              tło biel 3%, obwódka i tekst PEŁNYM kolorem przewodnim). Kolor
              przewodni tej strony-parasola = var(--accent), czyli 1:1 z tonem
              jej karty na home (PromoUslugi jedzie na INF_KATEGORIA_DEFAULT).
              Treść 1:1. */}
          <Reveal>
            <p
              className="mt-6 inline-flex max-w-full items-center rounded-full border px-[16px] py-[6px] font-mono text-[10px] font-extrabold uppercase tracking-[0.2em]"
              style={{
                color: 'var(--accent)',
                borderColor: 'var(--accent)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              Architekci Wartości AI
            </p>
          </Reveal>

          {/* v12: treść H1 NIETKNIĘTA (SEO żelazne); drugi człon zdania
              w solidnym kolorze przewodnim (wzorzec: kolorowe drugie słowo
              tytułu akademii, płaski kolor — nie gradient). */}
          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">
              Płacisz za przyniesioną wartość,{' '}
              <span style={{ color: 'var(--accent)' }}>nie za godziny.</span>
            </h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">
              Nie rozliczamy się za czas pracy. Rozliczamy się za to, co realnie
              wraca do Twojej firmy: odzyskane godziny i złotówki. Sprawdzamy,
              gdzie tracisz najwięcej, robimy jeden proces na próbę, a Ty decydujesz,
              czy idziemy dalej. Najpierw zobaczysz efekt na swoich danych, dopiero
              potem rozmawiamy o reszcie. Zaczynasz za 0 zł.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 text-body text-fg-muted">
              „Architekci Wartości AI” to poziom docelowy: my prowadzimy całe AI w
              Twojej firmie zamiast etatowego działu, a pakiety skrojone są tak, by
              zwracały się oszczędnością. Ale nikt nie każe Ci tam zaczynać.
              Wchodzisz najniższym szczeblem i wspinasz się tylko, jeśli poprzedni
              krok się opłacił.
            </p>
          </Reveal>

          {/* v12: CTA hero pełnym kolorem przewodnim jak „ESTABLISH ROOT
              CONNECTION" wzorca — kontrakt .sf-magnetic .inf-glow-cta (globals)
              maluje solid z var(--accent); kolor przewodni tej strony TO
              var(--accent), więc bez lokalnej podmiany tokenu. Tekst CTA
              bez zmian. */}
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-start gap-3">
              <MagneticButton variant="primary" size="lg" href="#diagnoza" className="inf-glow-cta">
                Pokaż mi, gdzie tracę czas
              </MagneticButton>
              <span className="text-caption max-w-[52ch] text-fg-subtle">
                Bezpłatna diagnoza. Najpierw liczby, potem decyzja. Odpowiadam w
                kilka minut.
              </span>
            </div>
          </Reveal>

          {/* v12: KAFLE STATYSTYK hero (wzorzec: 17 MODULES / 97 QUESTIONS /
              9 LABS; pudełko 1:1 z pomiaru §4: obwódka rgba(kolor,0.15), tło
              rgba(8,15,25,0.45), radius 16px, padding 24px; liczba na żywej
              .inf-counter-value = mono + poświata, label .inf-counter-label
              na --fg-muted, bo etykieta to treść, próg AA).
              DANE WYŁĄCZNIE Z ISTNIEJĄCEJ TREŚCI TEJ STRONY (zero zmyślania):
               - „0 zł"    — kapsuła hero „Zaczynasz za 0 zł" + FAQ „Start
                             kosztuje 0 zł. Pierwszym krokiem jest darmowa
                             diagnoza",
               - „1490 zł" — sekcja (3) i FAQ: „Sprint Diagnostyczny za
                             1490 zł" (odliczany od wdrożenia),
               - „1990 zł" — FAQ: „jednego procesu na próbę w ramach AI Start
                             za 1990 zł",
               - „6"       — liczba pytań stałej FAQ (FAQ.length).
              Obwódka kafla: rgba wyliczone z tokenu --accent (#00f0ff, dark),
              bo inline style nie zniesie pary fallback rgba + color-mix. */}
          <Reveal delay={0.25}>
            {/* lg:-mr-[220px]: kolumna max-w-narrow (~660px) nie mieści
                4 kafli w jednym rzędzie (zmierzone: czwarty spadał niżej,
                a wzorzec trzyma kafle w jednej linii). Hero tej strony jest
                wyrównane do lewej, więc rząd rośnie tylko w prawo, w pustkę
                kolumny (strona 1440px ma tam ~390px zapasu). Poniżej lg gra
                flex-wrap — mobile bez zmian i bez poziomego scrolla. */}
            <ul className="mt-9 grid max-w-[560px] grid-cols-2 gap-[10px] sm:flex sm:max-w-none sm:flex-wrap lg:-mr-[220px]">
              {[
                { id: 'start', wartosc: '0 zł', opis: 'start: darmowa diagnoza' },
                { id: 'sprint', wartosc: '1490 zł', opis: 'Sprint Diagnostyczny' },
                { id: 'proba', wartosc: '1990 zł', opis: 'AI Start na próbę' },
                { id: 'faq', wartosc: String(FAQ.length), opis: 'najczęstszych pytań' },
              ].map((kafel) => (
                <li
                  key={kafel.id}
                  className="rounded-[16px] border p-[24px] text-center sm:min-w-[150px]"
                  style={{
                    borderColor: 'rgba(0, 240, 255, 0.15)',
                    backgroundColor: 'rgba(8, 15, 25, 0.45)',
                  }}
                >
                  <span
                    className="inf-counter-value block text-[28px] font-black leading-none"
                    style={{ '--counter-c': 'var(--accent)' } as CSSProperties}
                  >
                    {kafel.wartosc}
                  </span>
                  <span className="inf-counter-label mt-[6px] block">{kafel.opis}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2) PROBLEM — firmy tracą godziny na powtarzalne. */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Gdzie naprawdę uciekają godziny w firmie?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">
              W powtarzalnej robocie, której nikt nie lubi. Maile, które za każdym
              razem brzmią tak samo. Faktury przepisywane z PDF-a do systemu.
              Oferty składane od zera, choć różnią się jednym akapitem. Raporty
              klepane ręcznie w piątek po południu. To nie jest praca, która buduje
              firmę. To praca, która ją zatrzymuje.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-body text-fg-muted">
              Najgorsze jest to, że te godziny rozkładają się po trochu, więc
              trudno je zauważyć. Pół godziny tu, kwadrans tam. W skali miesiąca to
              kilka pełnych dni roboczych (szac.), które ktoś z Twojego zespołu
              traci na klikanie zamiast na klienta. AI nie zastępuje ludzi. AI
              zastępuje dokładnie to, co ich zatrzymuje.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3) ROZLICZAMY SIĘ ZA WARTOŚĆ — nowa sekcja przepozycjonowania.
          Płacisz za efekt: odzyskane godziny i złotówki. Pakiety skrojone tak,
          by zwracały się oszczędnością. Answer-first, surowy HTML, trzy filary. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Za co właściwie płacisz?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">
              Za przyniesioną wartość, nie za godziny pracy. Najpierw liczymy, ile
              dany proces Cię kosztuje miesięcznie. Potem dobieramy pakiet tak, żeby
              zwracał się oszczędnością, którą realnie odzyskasz. Patrzysz na koszt
              po stronie tego, co wraca do firmy, nie po stronie cennika.
            </p>
          </Reveal>

          {/* INFINITY v5 (spec §4): trzy filary na kartach .inf-card (narożniki +
              sweep z globals) w stopniach trasy marki (jak cennik home) — pełna
              spójność mechanizmów z home, treść 1:1. v7: ton zostaje (trasa
              marki), dochodzi reflektor .inf-spotlight jak na kartach huba. */}
          <ul className="mt-9 grid gap-6 sm:grid-cols-3">
            <Reveal as="li" delay={0.05}>
              <Card
                as="article"
                variant="quiet"
                className="inf-card inf-card-top h-full p-6"
                style={{ '--card-c': '#70b0ff' } as CSSProperties}
              >
                <div aria-hidden="true" className="inf-spotlight" />

                <h3 className="text-h3">Najpierw liczymy</h3>
                <p className="mt-3 text-body-sm text-fg-muted">
                  Ile godzin i złotówek zjada dany proces dziś. To jest punkt
                  odniesienia, do którego potem wracamy. Bez liczby nie ma rozmowy o
                  wartości.
                </p>
              </Card>
            </Reveal>
            <Reveal as="li" delay={0.1}>
              <Card
                as="article"
                variant="quiet"
                className="inf-card inf-card-top h-full p-6"
                style={{ '--card-c': '#e438ff' } as CSSProperties}
              >
                <div aria-hidden="true" className="inf-spotlight" />

                <h3 className="text-h3">Płacisz za efekt</h3>
                <p className="mt-3 text-body-sm text-fg-muted">
                  Pakiet dobieramy tak, by zwracał się oszczędnością, którą realnie
                  odzyskasz: mniej klikania, szybsze odpowiedzi, godziny z powrotem
                  w tygodniu.
                </p>
              </Card>
            </Reveal>
            <Reveal as="li" delay={0.15}>
              <Card
                as="article"
                variant="quiet"
                className="inf-card inf-card-top h-full p-6"
                style={{ '--card-c': '#29ff77' } as CSSProperties}
              >
                <div aria-hidden="true" className="inf-spotlight" />

                <h3 className="text-h3">Sprawdzasz na swoich danych</h3>
                <p className="mt-3 text-body-sm text-fg-muted">
                  Zaczynasz od jednego procesu na próbę. Najpierw widzisz efekt,
                  dopiero potem decydujesz o reszcie. Mały, odwracalny krok, nie
                  wielka umowa w ciemno.
                </p>
              </Card>
            </Reveal>
          </ul>

          <Reveal delay={0.2}>
            <p className="mt-8 text-body text-fg-muted">
              Cennik jest jawny w całości (znajdziesz go niżej), a wartość jest
              mierzalna. To dlatego pierwszy płatny krok, Sprint Diagnostyczny za
              1490 zł, odliczamy potem od wdrożenia. Nie chcemy, żebyś płacił dwa
              razy za tę samą decyzję.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (4) JAK TO DZIAŁA = DRABINA L0..L5 (najtańszy pierwszy). */}
      <DrabinaOfert />

      {/* ───────────────────────────────────────────────────────────────
          (5) CZEGO NIE MUSISZ MIEĆ/WIEDZIEĆ (obniża lęk). */}
      <CzegoNieMusisz />

      {/* ───────────────────────────────────────────────────────────────
          (6) OBIEKCJE -> ODPOWIEDZI (tabela). */}
      <ObiekcjeOdpowiedzi />

      {/* ───────────────────────────────────────────────────────────────
          (7) PEŁNY CENNIK (transparentność, od najtańszego). */}
      <TabelaCen />

      {/* ───────────────────────────────────────────────────────────────
          (8) ZESPÓŁ, NIE FREELANCER — role Paweł/Marcin + realne certy. */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Kto to dla Ciebie zrobi?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">
              Nie jeden freelancer, który zniknie po wdrożeniu. To dwie role, które
              się uzupełniają: ktoś, kto rozumie Twój biznes, i ktoś, kto to
              naprawdę zbuduje i utrzyma.
            </p>
          </Reveal>

          {/* INFINITY v5 (spec §4): sylwetki zespołu na kartach .inf-card
              (mechanizmy home), treść 1:1. v7: ton z rejestru kategorii wg roli
              (TON_PAWEL/TON_MARCIN wyżej) zamiast domyślnego akcentu
              + reflektor jak na kartach huba. */}
          <div className="mt-9 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.05}>
              <Card
                as="article"
                variant="quiet"
                className="inf-card inf-card-edge h-full p-6"
                style={tonKarty(TON_PAWEL)}
              >
                <div aria-hidden="true" className="inf-spotlight" />

                <h3 className="text-h3">Paweł Pieloch</h3>
                <p className="mt-1 text-body-sm font-semibold text-accent-hover">
                  Strateg, integrator, twarz
                </p>
                <p className="mt-4 text-body-sm text-fg-muted">
                  Prowadzi diagnozę, Sprint i rozmowy. Decyduje, co automatyzować i
                  w jakiej kolejności, żeby najszybciej odzyskać godziny. To z nim
                  ustalasz kierunek.
                </p>
                <p className="mt-4 text-caption text-fg-subtle">
                  Autor: „Sprawdzone modele i strategie monetyzacji AI”, „Pierwsze
                  kroki z AI”, „Architekci wolności”.
                </p>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card
                as="article"
                variant="quiet"
                className="inf-card inf-card-edge h-full p-6"
                style={tonKarty(TON_MARCIN)}
              >
                <div aria-hidden="true" className="inf-spotlight" />

                <h3 className="text-h3">Marcin Karpeta</h3>
                <p className="mt-1 text-body-sm font-semibold text-accent-hover">
                  Inżynier, wdrożeniowiec
                </p>
                <p className="mt-4 text-body-sm text-fg-muted">
                  Buduje automatyzacje, robi integracje z Twoimi narzędziami i
                  utrzymuje to, co działa. Strona techniczna jest po jego stronie,
                  nie po Twojej.
                </p>
                <p className="mt-4 text-caption text-fg-subtle">
                  Certyfikat: Google „Umiejętności jutra 3.0”.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (9) DLA KOGO — pierwsza nisza biura rachunkowe + inne. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Dla kogo to jest?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">
              Dla firm, w których ludzie toną w powtarzalnej robocie. Zaczynamy od
              biur rachunkowych, bo tam powtarzalność widać najlepiej. Ale ten sam
              schemat działa wszędzie, gdzie ktoś klika to samo w kółko.
            </p>
          </Reveal>

          {/* INFINITY v5 (spec §4): nisze na kartach .inf-card; pierwsza nisza
              ZOSTAJE wyróżniona mechanizmem home (.sf-rim-gradient, jak plan
              cennika) + badge mono na akcencie. Treść 1:1. v7: każda .inf-card
              w tym gridzie ma ton usługi wchodzącej w tej branży (pole
              `kategoria` w NISZE) i reflektor jak karty huba. */}
          <ul className="mt-9 grid gap-6 sm:grid-cols-2">
            {NISZE.map((n, i) => {
              // Ton bierze tylko .inf-card; karta wyróżniona ma własną aurę rim.
              const dekor = n.kategoria
                ? (INF_KATEGORIA[n.kategoria] ?? INF_KATEGORIA_DEFAULT)
                : null;
              return (
                <Reveal as="li" key={n.branza} delay={Math.min(i * 0.05, 0.2)}>
                  <Card
                    as="article"
                    variant={n.pierwsza ? 'highlight' : 'quiet'}
                    className={n.pierwsza ? 'h-full' : 'inf-card inf-card-edge h-full p-6'}
                    style={dekor ? tonKarty(dekor) : undefined}
                  >
                    {dekor ? <div aria-hidden="true" className="inf-spotlight" /> : null}

                    <div className="flex items-center gap-3">
                      <h3 className="text-h3">{n.branza}</h3>
                      {n.pierwsza ? (
                        <span className="inf-tag rounded-full border-transparent bg-accent px-3 py-1 text-accent-contrast">
                          Pierwsza nisza
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-body-sm text-fg-muted">{n.opis}</p>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (10) FAQ — answer-first, 1:1 z FAQPage JSON-LD. */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Najczęstsze pytania</h2>
          </Reveal>

          {/* INFINITY v5 (spec §4): FAQ w ciemnej karcie .inf-card — spójnie
              z ServiceFAQ szablonu usług (mechanizmy home, treść 1:1). v7: ton
              parasola (ten sam INF_KATEGORIA_DEFAULT co karta tej strony na
              home) podany JAWNIE + reflektor; `divide-y` zeszło na wewnętrzny
              wrapper, żeby reflektor nie dokładał kreski nad pierwszym
              pytaniem. */}
          <div className="inf-card inf-card-top mt-8 p-6" style={tonKarty(INF_KATEGORIA_DEFAULT)}>
            <div aria-hidden="true" className="inf-spotlight" />

            <div className="divide-y divide-border">
              {FAQ.map((item, i) => (
                <Reveal key={item.pytanie} delay={Math.min(i * 0.03, 0.15)}>
                  <details className="sf-faq group py-2">
                    <summary className="-mx-2 flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm px-2 py-3 text-h3 font-medium text-fg transition-colors duration-fast hover:bg-bg-subtle [&::-webkit-details-marker]:hidden">
                      <span>{item.pytanie}</span>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="shrink-0 text-accent transition-transform duration-base group-hover:scale-110 group-open:rotate-45"
                      >
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </summary>
                    <p className="pb-4 pr-9 text-body-sm text-fg-muted">
                      {item.odpowiedz}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (11) FINALNE CTA — jedno główne, z dowodem (.surface-aurora). */}
      <Section tone="base" id="diagnoza" className="surface-aurora">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">
              Zacznijmy od jednej rzeczy, która zżera Ci najwięcej czasu.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mx-auto mt-5 max-w-[52ch] text-fg-muted">
              Bez zobowiązań. Krótka diagnoza, konkretna lista do automatyzacji.
              Najpierw liczby, potem decyzja. Odpowiadam w kilka minut.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-col items-center gap-3">
              <MagneticButton variant="primary" size="lg" href="#diagnoza">
                Pokaż mi, gdzie tracę czas
              </MagneticButton>
              <span className="text-caption max-w-[60ch] text-fg-subtle">
                Realne wdrożenia: auto-email obsługi klienta gotowy w 75% i
                generator leadów, który zrobił 1000 rekordów w 40 minut.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        JSON-LD wstrzyknięty SERWEROWO (w HTML przy 1. żądaniu, widoczny dla botów):
         - Service: provider -> #organization (z layoutu) przez @id. BEZ `offers`,
           bo wejściowa cena to 0 zł (darmowa diagnoza) — minPrice 0 jako oferta
           wprowadzałby w błąd; pełny cennik jest jawny w treści. Zero zmyślonych cen.
         - FAQPage: tekst odpowiedzi 1:1 z sekcją FAQ (te same stringi ze stałej FAQ).
         - BreadcrumbList: Strona główna -> Usługi -> Architekci Wartości AI.
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd
        data={serviceSchema({
          serviceType: 'Architekci Wartości AI',
          name: 'Architekci Wartości AI dla firm',
          description:
            'Wdrożenie AI dla MŚP rozliczane za przyniesioną wartość, nie za godziny: diagnoza, budowa i utrzymanie automatyzacji. Pakiety skrojone tak, by zwracały się oszczędnością. Zaczynasz od jednej automatyzacji na próbę, nie od całego działu.',
          path: PATH,
        })}
      />
      <JsonLd
        data={faqSchema(
          FAQ.map((item) => ({ q: item.pytanie, a: item.odpowiedz })),
          PATH
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Usługi', path: '/uslugi' },
          { name: 'Architekci Wartości AI', path: PATH },
        ])}
      />

      {/* Kanoniczny URL = absolutny (spójność z metadata). */}
      <link rel="canonical" href={CANONICAL} />
    </main>
  );
}
