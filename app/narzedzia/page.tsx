import type { Metadata } from 'next';
import type { ComponentType, CSSProperties } from 'react';
import type { InfDekor } from '@/lib/inf-kategorie';
import { INF_NARZEDZIE, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, itemListSchema, faqSchemaPl } from '@/components/seo/schemas';
import { HOME_CTA } from '@/lib/site';
import { NARZEDZIA } from '@/lib/narzedzia';

import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { KartaStatus } from '@/components/sections/KartaCzesci';
import { PasekMetryk } from '@/components/sections/PasekMetryk';
import { HubFAQ } from '@/components/sections/HubFAQ';

import { KalkulatorOszczednosci } from '@/components/narzedzia/KalkulatorOszczednosci';
import { KalkulatorProcesu } from '@/components/narzedzia/KalkulatorProcesu';
import { TestGotowosciAI } from '@/components/narzedzia/TestGotowosciAI';
import { AudytStronyAI } from '@/components/narzedzia/AudytStronyAI';
import { GeneratorPromptow } from '@/components/narzedzia/GeneratorPromptow';
import { PRZYKLADY } from '@/lib/narzedzia/generator-promptow';

/**
 * HUB /narzedzia — darmowe narzędzia AI, SSG (force-static).
 *
 * KPI #1: opisy answer-first każdego narzędzia (z rejestru lib/narzedzia) są w
 * surowym HTML przy 1. żądaniu (cytowalne). Same narzędzia to wyspy 'use client'
 * (kalkulatory/testy) renderowane WEWNĄTRZ statycznej strony — wzbogacają, nie
 * dostarczają rdzenia treści. Każde narzędzie ma kotwicę #<slug> (link z karty).
 *
 * Źródło prawdy listy = rejestr lib/narzedzia (NARZEDZIA). Flagowiec pierwszy.
 * Zero zmyślania: wzory i disclaimery są w samych wyspach.
 */
export const dynamic = 'force-static';

const PATH = '/narzedzia';

export const metadata: Metadata = buildMetadata({
  title: 'Darmowe narzędzia AI dla firm',
  description:
    'Darmowe narzędzia AI: kalkulator oszczędności, test gotowości firmy na AI i audyt strony pod cytowanie w ChatGPT. Sprawdź sam, bez maila.',
  path: PATH,
});

/* INFINITY v5 (spec §4): lokalna mapa dekoru WYPADŁA — dekorację (kolor +
   jasny odcień + UNIKALNA ikona SVG per slug) niesie single source
   lib/inf-kategorie (INF_NARZEDZIE — ta sama mapa co dropdown "Narzędzia").
   Kolor i ikona to WYŁĄCZNIE dekoracja (aria-hidden / custom property). */

/**
 * TON HUBU = dekor FLAGOWCA, czyli pierwszego wpisu rejestru
 * (INF_NARZEDZIE['kalkulator-oszczednosci'], cyjan #00f0ff). Pięć narzędzi ma
 * pięć różnych tonów, więc hub nie ma „własnego" koloru: bierzemy ten, którym
 * świeci pierwsza karta listy, zamiast dokładać nową mapę kolorów.
 * Sama dekoracja (custom property), zero wpływu na treść.
 */
const DEKOR_FLAGOWCA = INF_NARZEDZIE[NARZEDZIA[0]?.slug ?? ''] ?? INF_KATEGORIA_DEFAULT;
const TON: InfDekor = {
  c: DEKOR_FLAGOWCA.c,
  odcien: DEKOR_FLAGOWCA.odcien ?? DEKOR_FLAGOWCA.c,
  /* INF_NARZEDZIE ma typ InfIkonaDekor (emoji opcjonalne), a PasekMetryk/HubFAQ
     przyjmują InfDekor (emoji wymagane). Pas metryk i FAQ nie renderują emoji
     w ogóle, czytają wyłącznie `c` i `odcien`, więc to pole jest tu tylko po to,
     żeby nie forkować typu ani nie ruszać rejestru dekoracji. */
  emoji: DEKOR_FLAGOWCA.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
  ikona: DEKOR_FLAGOWCA.ikona,
};

/* ─────────────────────────────────────────────────────────────────────
   LICZBY HUBU, POLICZONE Z REJESTRU PRZY BUILDZIE (PLAN-v22 §1.7a:
   „liczba wpisana z palca to zmyślona liczba"). Jedyne pole rejestru, które
   dzieli narzędzia na rodzaje, to `kategoria` (lib/narzedzia/types.ts:11:
   'kalkulator' | 'test' | 'audyt' | 'generator'), więc podział idzie po nim.
   Dopisanie narzędzia do lib/narzedzia przelicza pas metryk i FAQ samo. */
const LICZBA_NARZEDZI = NARZEDZIA.length;
const LICZBA_KALKULATOROW = NARZEDZIA.filter((n) => n.kategoria === 'kalkulator').length;
const LICZBA_SAMOOCEN = NARZEDZIA.filter(
  (n) => n.kategoria === 'test' || n.kategoria === 'audyt'
).length;
const LICZBA_GENERATOROW = NARZEDZIA.filter((n) => n.kategoria === 'generator').length;

/**
 * PAS METRYK POD HERO (PLAN-v22 §2.6 pkt 2).
 *
 * Wszystkie cztery liczby liczone wyżej z rejestru i sumujące się do
 * `LICZBA_NARZEDZI` (2 + 2 + 1 = 5), więc pas nie może rozjechać się z listą
 * kotwic pod nim. `zrodlo` mówi wprost, skąd liczba, i nie wnosi nowego faktu:
 * „ZA DARMO" to status, który ta strona renderuje na KAŻDEJ karcie (niżej,
 * KartaStatus w mapowaniu NARZEDZIA), a nazwy kategorii są w rejestrze.
 * Słowo „samoocena" jest wzięte z DISCLAIMER_QUIZ (lib/narzedzia/stale.ts:47:
 * „To szybka samoocena, nie audyt"), nie wymyślone tutaj.
 */
const METRYKI_HUBU = [
  {
    wartosc: String(LICZBA_NARZEDZI),
    opis: 'darmowe narzędzia na tej stronie',
    zrodlo: 'status „ZA DARMO" na każdej karcie',
  },
  {
    wartosc: String(LICZBA_KALKULATOROW),
    opis: 'kalkulatory: oszczędność i zwrot z procesu',
    zrodlo: 'kategoria „kalkulator" w rejestrze',
  },
  {
    wartosc: String(LICZBA_SAMOOCEN),
    opis: 'samooceny: gotowość firmy i strona pod AI',
    zrodlo: 'kategorie „test" i „audyt"',
  },
  {
    wartosc: String(LICZBA_GENERATOROW),
    opis: 'generator gotowych promptów',
    zrodlo: 'kategoria „generator"',
  },
];

/**
 * FAQ HUBU (PLAN-v22 §2.6 pkt 5 + reguła treści (a)-(d)). Każda odpowiedź da
 * się wyprowadzić z liczby policzonej z rejestru (a), ceny z listy locked (b),
 * zdania, które już stoi na stronie w repo (c), albo zasady zapisanej
 * w kontrakcie/komentarzu kodu (d). Źródło stoi przy każdym pytaniu, żeby
 * kontrola nie musiała zgadywać. Ta sama tablica idzie do FAQPage niżej.
 */
const FAQ_HUBU = [
  {
    /* (a) NARZEDZIA.length. (c) H1 tej strony „Darmowe narzędzia AI" + lead
       „Bez maila, bez zobowiązań" + istniejąca odpowiedź w sekcji generatora
       („Tak. Bez logowania, bez limitu, bez maila."). (d) GeneratorPromptow.tsx:36
       „zero logowania, zero czekania". */
    pytanie: 'Czy te narzędzia są naprawdę darmowe?',
    odpowiedz: `Tak, wszystkie ${LICZBA_NARZEDZI}. Bez logowania, bez limitu, bez maila. Wchodzisz, liczysz, przepisujesz albo kopiujesz wynik i wychodzisz. Każde z nich działa w pełnej wersji od razu, nic nie jest schowane za kontem ani za opłatą.`,
  },
  {
    /* (d) CaptureMaila.tsx:8-10: „opcjonalny lead magnet (...) Sama
       kalkulacja/wynik działa w 100% bez tego pola". (d) TestGotowosciAI.tsx:32
       „Zero danych osobowych do wyniku". (d) AudytStronyAI.tsx:29 „ZERO fetchu
       cudzej domeny (CORS) i ZERO kluczy"; w całym components/narzedzia nie ma
       ani jednego wywołania fetch, więc liczby nie opuszczają przeglądarki.
       (c) lead tej strony: „Bez maila, bez zobowiązań, w kilka minut". */
    pytanie: 'Muszę zostawić maila, żeby zobaczyć wynik?',
    odpowiedz:
      'Nie. Wynik liczy się w Twojej przeglądarce i pokazuje od razu, bez maila, bez konta i bez czekania. Twoje liczby nigdzie nie wychodzą, bo narzędzia niczego nie wysyłają na serwer. Pod gotowym wynikiem stoi jeszcze opcjonalne pole na adres e-mail, ale możesz je spokojnie pominąć: całą ścieżkę przechodzisz do końca, nie podając o sobie niczego.',
  },
  {
    /* (a) liczby z rejestru. (c) opisy answer-first 1:1 z lib/narzedzia/index.ts
       (kalkulator oszczędności :32, kalkulator procesu :43, test gotowości :53,
       audyt strony :63, generator :73) oraz korzyść testu :54 („nawet gdy nie
       znasz swoich liczb"). */
    pytanie: 'Czym różni się kalkulator od testu i audytu?',
    odpowiedz: `Kalkulatory (${LICZBA_KALKULATOROW}) pracują na Twoich liczbach: pierwszy pokazuje, ile złotych rocznie odzyskasz po automatyzacji powtarzalnej roboty, drugi liczy jeden konkretny proces i to, po ilu miesiącach zwróci się wdrożenie, którego koszt podajesz Ty. Test gotowości i audyt strony (${LICZBA_SAMOOCEN}) nie potrzebują żadnych liczb, tylko odpowiedzi: test to osiem pytań o procesy, dane, ludzi i pierwszy proces do zdjęcia, a audyt to dziesięć pytań o Twojej stronie i o to, czy ChatGPT oraz Perplexity mogą ją cytować. Generator promptów niczego nie liczy: składa gotowe polecenie do skopiowania.`,
  },
  {
    /* (c) opisy rejestru jak wyżej. (d) KalkulatorOszczednosci.tsx:277-289:
       rozwijany blok „Jak to liczę?" z jawnym wzorem i wykres kosztu dziś kontra
       po (:243-249). (d) KalkulatorProcesu.tsx:34: „koszt wdrożenia i opieka
       pochodzą WYŁĄCZNIE od użytkownika". (c) DISCLAIMER pod każdym wynikiem,
       lib/narzedzia/stale.ts:43-44, cytowany tu 1:1. */
    pytanie: 'Co dostaję po wypełnieniu narzędzia?',
    odpowiedz:
      'Konkretny wynik na ekranie, od razu. Kalkulator oszczędności pokazuje kwotę roczną i miesięczną, odzyskane godziny oraz wykres kosztu dziś kontra po automatyzacji, a pod nim rozwijany wzór „Jak to liczę?", żebyś mógł sprawdzić rachunek co do liczby. Kalkulator procesu podaje koszt procesu rocznie i moment zwrotu wdrożenia. Test gotowości daje poziom gotowości i trzy konkretne rekomendacje, audyt strony wynik punktowy i trzy rzeczy do naprawy najpierw, a generator gotowy prompt do wklejenia. Pod wynikiem kalkulatorów stoi to samo zastrzeżenie: to Twoje liczby, nie nasza obietnica, więc służą do rozmowy, a nie jako gwarancja.',
  },
  {
    /* (c) nagłówek i podpis CTA tej strony: „Liczby się zgadzają? Pogadajmy
       o konkretach." + „Bezpłatna diagnoza. Najpierw liczby, potem decyzja."
       (c) AudytStronyAI.tsx:251-253: „Pełny techniczny audyt robimy na
       bezpłatnej diagnozie." (b)+(c) dwa modele rozliczenia, zdanie 1:1
       z lib/uslugi/chatboty.ts:78 i lib/uslugi/audyt-ai.ts:78. */
    pytanie: 'Policzyłem i mam wynik. Co dalej?',
    odpowiedz:
      'Wynik zostaje u Ciebie i możesz z nim zrobić, co chcesz: pokazać księgowej, wrzucić do własnej analizy albo odłożyć na później. Nic nie dzieje się automatycznie, bo narzędzia niczego o Tobie nie zapisują. Jeśli liczby się zgadzają, następny krok to bezpłatna diagnoza: przechodzimy Twój proces i mówimy, czy warto go automatyzować, zanim cokolwiek zamówisz. Przy samym wdrożeniu masz wybór, jak je rozliczyć: przekazujemy Ci całą infrastrukturę i wtedy nie płacisz abonamentu, albo projekt zostaje u nas pod opieką i wtedy dochodzi opłata utrzymaniowa od 99 do 599 zł miesięcznie.',
  },
];

/** Mapa slug -> wyspa narzędzia. Slug zgodny z rejestrem lib/narzedzia. */
const WYSPY: Record<string, ComponentType> = {
  'kalkulator-oszczednosci': KalkulatorOszczednosci,
  'kalkulator-procesu': KalkulatorProcesu,
  'test-gotowosci-ai': TestGotowosciAI,
  'audyt-strony-ai': AudytStronyAI,
  'generator-promptow': GeneratorPromptow,
};

export default function NarzedziaPage() {
  return (
    <main id="main">
      {/* Hero hubu — answer-first: co tu jest i po co.
          INFINITY v2: tone="transparent" — globalne tło prześwituje. */}
      <Section tone="transparent">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h1 className="text-display">Darmowe narzędzia AI</h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-6 text-fg-muted">
              Zanim z kimkolwiek porozmawiasz, policz i sprawdź sam. Te narzędzia
              pokazują, ile pieniędzy zżera Ci powtarzalna robota, czy konkretna
              automatyzacja się spina i czy AI w ogóle widzi Twoją stronę. Bez maila,
              bez zobowiązań, w kilka minut.
            </p>
          </Reveal>

          {/* v22 (PLAN-v22 §2.6 pkt 2): PAS METRYK pod hero. Cztery liczby
              policzone z rejestru po polu `kategoria`, sumujące się do liczby
              kotwic w spisie niżej, więc nie da się ich rozjechać z listą. */}
          <Reveal delay={0.08}>
            <PasekMetryk kafle={METRYKI_HUBU} ton={TON} className="mt-9" />
          </Reveal>

          {/* Spis narzędzi — kotwice w HTML (linki dla botów i ludzi).
              INFINITY v5 (spec §4, treść 1:1): kafle na .inf-card (narożniki +
              sweep robi karta z globals) z kafelkiem .inf-tile z UNIKALNĄ ikoną
              SVG (single source INF_NARZEDZIE; v5: emoji tylko w dropdownach
              nav), badge mono po prawej = ISTNIEJĄCE pole `etykieta` (jak
              w dropdownie Narzędzia, spec §2) w jasnym odcieniu, --card-c-l,
              strzałka .inf-arrow + spotlight. */}
          <Reveal delay={0.1}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {NARZEDZIA.map((n) => {
                const dekor = INF_NARZEDZIE[n.slug] ?? INF_KATEGORIA_DEFAULT;
                const odcien = dekor.odcien ?? dekor.c;
                return (
                  <li key={n.slug}>
                    <a
                      href={`#${n.slug}`}
                      className="inf-card inf-card-top group flex h-full flex-col p-4"
                      style={{ '--card-c': dekor.c, '--card-c-l': odcien } as CSSProperties}
                    >
                      <div aria-hidden="true" className="inf-spotlight" />
                      {/* v12 (spec: „u góry karty FREE i migające"): status
                          ● ZA DARMO na samej górze kafla — FAKT z tej strony
                          (H1 „Darmowe narzędzia AI", lead „bez maila, bez
                          zobowiązań"). Anatomia .lp-primary-status wzorca
                          (pomiary-v12 §3): kropka pulsuje (klasa partii A),
                          napis mono w kolorze karty. Margines arbitralny
                          6px = .4rem wzorca (tokeny spacingu repo!). */}
                      <KartaStatus className="mb-[6px]">ZA DARMO</KartaStatus>
                      <span className="flex items-center gap-3">
                        {/* Kafelek ikony narzędzia — dekoracja aria-hidden. */}
                        <span
                          aria-hidden="true"
                          className="inf-tile"
                          style={{ '--tile-c': dekor.c } as CSSProperties}
                        >
                          <InfIcon name={dekor.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
                        </span>
                        <span className="inf-tag" style={{ color: odcien }}>
                          {n.etykieta}
                        </span>
                        <span aria-hidden="true" className="inf-arrow ml-auto text-accent">
                          →
                        </span>
                      </span>
                      <span className="mt-3 text-body font-semibold text-fg group-hover:text-accent">
                        {n.tytul}
                      </span>
                      <span className="mt-1 text-caption text-fg-subtle">{n.korzysc}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Sekcje narzędzi — każda: answer-first opis (HTML) + wyspa interaktywna */}
      {NARZEDZIA.map((n) => {
        const Wyspa = WYSPY[n.slug];
        return (
          <Section key={n.slug} id={n.slug} tone="base">
            <div className="mx-auto max-w-narrow">
              <Reveal>
                {/* INFINITY v2: etykieta sekcji → mono .inf-overline (treść 1:1). */}
                <span className="inf-overline text-accent">
                  {n.etykieta}
                  {n.flagowiec ? ' · flagowe' : ''}
                </span>
                <h2 className="text-h2 mt-2">{n.tytul}</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="text-lead mt-4 text-fg-muted">{n.opis}</p>
              </Reveal>
            </div>

            {Wyspa ? (
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <Wyspa />
                </div>
              </Reveal>
            ) : null}

            {/* Treść opisowa generatora — w surowym HTML (cytowalna, działa bez JS) */}
            {n.slug === 'generator-promptow' ? (
              <Reveal delay={0.15}>
                <div className="mx-auto mt-12 max-w-narrow">
                  <h3 className="text-h3">
                    Czym jest prompt i czemu sposób pytania zmienia odpowiedź AI?
                  </h3>
                  <p className="mt-3 text-body text-fg-muted">
                    Prompt to polecenie, które wpisujesz do AI. To, jak je sformułujesz,
                    decyduje o jakości odpowiedzi bardziej niż sam model. Dobry prompt mówi
                    AI cztery rzeczy: kim ma być, co ma zrobić, po co i w jakim stylu. Ogólne
                    pytanie daje ogólną odpowiedź. Konkretny prompt daje gotowy do użycia
                    tekst.
                  </p>

                  <h3 className="text-h3 mt-10">Jak działa generator promptów AI dla firm?</h3>
                  <p className="mt-3 text-body text-fg-muted">
                    Wybierasz cztery rzeczy z list: branżę, zadanie, cel i styl. Generator
                    skleja z nich gotowy prompt według sprawdzonego wzoru: rola eksperta,
                    kontekst Twojej branży, konkretne zadanie, cel tekstu, styl i format
                    wyjścia. Na końcu dokłada zasady, które pilnują jakości, na przykład żeby
                    AI nie zmyślało danych, tylko pytało o brakujące informacje. Kopiujesz
                    prompt i wklejasz do swojego AI.
                  </p>

                  {/* Tabela: zły prompt vs gotowy prompt.
                      INFINITY v5 (spec §4): tabela porównania w stylu home
                      (Rozwiazanie) — nagłówki kolumn mono .inf-overline, wygraną
                      kolumnę trzyma 1px kreska akcentowa i font-medium, wiersze
                      z hoverem. Treść komórek 1:1.
                      INFINITY v7 (spec §PARTIA E pkt 1-3): `align-top` wróciło
                      z <tr> na td (na wierszu trzymało się tylko dziedziczenia
                      z arkusza przeglądarki, a kolumny mają skrajnie różne
                      wysokości: jedno zdanie vs trzy), colgroup daje kolumnom
                      stałe proporcje 38/62 zamiast losowych z auto-layoutu,
                      a scroll siedzi w opakowaniu i idzie z klawiatury.
                      INFINITY v7 (audyt dostępności): sam tabIndex robił z tego
                      opakowania punkt tabulacji, który czytnik ekranu ogłaszał
                      jako nic. Rola + nazwa wyrównują je do TabelaCen /
                      ObiekcjeOdpowiedzi / PorownanieTabela, a nazwę składamy
                      przez aria-labelledby z ISTNIEJĄCYCH nagłówków kolumn —
                      zero powtórzonej i zero nowej treści. */}
                  <div
                    className="mt-8 overflow-x-auto"
                    tabIndex={0}
                    role="region"
                    aria-labelledby="gp-tabela-zly gp-tabela-dobry"
                  >
                    <table className="w-full min-w-[28rem] border-collapse text-left text-body-sm">
                      <colgroup>
                        <col className="md:w-[38%]" />
                        <col className="md:w-[62%]" />
                      </colgroup>
                      <thead>
                        <tr className="border-b border-border-strong">
                          <th id="gp-tabela-zly" scope="col" className="inf-overline py-3 pr-4 align-bottom">
                            Zły prompt
                          </th>
                          <th id="gp-tabela-dobry" scope="col" className="inf-overline border-l border-border-accent px-4 py-3 align-bottom text-accent">
                            Gotowy prompt z generatora
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border transition-colors duration-fast hover:bg-bg-subtle">
                          <td className="py-4 pr-4 align-top text-fg-subtle">
                            „Napisz mail do klienta.”
                          </td>
                          <td className="border-l border-border-accent px-4 py-4 align-top font-medium text-fg">
                            Rola, kontekst branży, konkretne zadanie, cel, styl i format. AI
                            wie, kim być i co dokładnie napisać.
                          </td>
                        </tr>
                        <tr className="border-b border-border transition-colors duration-fast hover:bg-bg-subtle">
                          <td className="py-4 pr-4 align-top text-fg-subtle">
                            Efekt: ogólny, bez tonu, trzeba poprawiać.
                          </td>
                          <td className="border-l border-border-accent px-4 py-4 align-top font-medium text-fg">
                            Efekt: tekst w Twoim stylu, gotowy po uzupełnieniu danych w
                            nawiasach.
                          </td>
                        </tr>
                        <tr className="border-b border-border transition-colors duration-fast hover:bg-bg-subtle">
                          <td className="py-4 pr-4 align-top text-fg-subtle">
                            AI zmyśla brakujące dane.
                          </td>
                          <td className="border-l border-border-accent px-4 py-4 align-top font-medium text-fg">
                            AI najpierw pyta o brakujące informacje, dopiero potem pisze.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Gotowe przykłady promptów — wydrukowane w HTML (cytowalne) */}
                  <h3 className="text-h3 mt-10">Przykładowe gotowe prompty</h3>
                  <p className="mt-3 text-body text-fg-muted">
                    Tak wygląda prompt złożony przez generator. Możesz skopiować dowolny i
                    użyć od razu.
                  </p>
                  <div className="mt-5 space-y-5">
                    {PRZYKLADY.map((p) => (
                      <figure key={p.tytul}>
                        <figcaption className="text-caption font-semibold text-fg">
                          {p.tytul}
                        </figcaption>
                        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-md border border-border bg-bg-subtle p-4 font-mono text-caption leading-relaxed text-fg-muted">
                          {p.prompt}
                        </pre>
                      </figure>
                    ))}
                  </div>

                  <h3 className="text-h3 mt-10">Czy ten generator promptów jest darmowy?</h3>
                  <p className="mt-3 text-body text-fg-muted">
                    Tak. Bez logowania, bez limitu, bez maila. Składasz prompt, kopiujesz,
                    używasz.
                  </p>
                </div>
              </Reveal>
            ) : null}
          </Section>
        );
      })}

      {/* v22 (§2.6 pkt 5): FAQ HUBU w natywnych <details>. Przed rundą cała
          trasa miała JEDEN element rozwijany (wzór „Jak to liczę?" w kalkulatorze
          oszczędności), przy progu odbioru >= 4. Odpowiedzi są w surowym HTML od
          pierwszego żądania, bez JS i bez bramki na klik; ta sama tablica idzie
          do FAQPage niżej, więc treść i schema nie mogą się rozjechać. */}
      <HubFAQ pytania={FAQ_HUBU} ton={TON} />

      {/* CTA domykające (jasna sekcja premium .surface-aurora), wspólny flow diagnozy */}
      <Section tone="base" id="diagnoza" className="surface-aurora">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">Liczby się zgadzają? Pogadajmy o konkretach.</h2>
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

      {/* BreadcrumbList JSON-LD (Strona główna -> Narzędzia), serwerowo w HTML. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Narzędzia', path: PATH },
        ])}
      />

      {/* v22 (§3 P3 pkt 17): ItemList, czyli lista narzędzi zbudowana MAPOWANIEM
          rejestru, więc `numberOfItems` jest z definicji prawdziwe. URL pozycji
          to kotwica #slug na tej stronie (narzędzie nie ma osobnej trasy), czyli
          realnie istniejące miejsce w dokumencie, do którego prowadzi też kafel
          w spisie pod hero. */}
      <JsonLd
        data={itemListSchema({
          path: PATH,
          nazwa: 'Darmowe narzędzia AI SimpleFast.ai',
          pozycje: NARZEDZIA.map((n) => ({ nazwa: n.tytul, path: `${PATH}#${n.slug}` })),
        })}
      />

      {/* v22 (§3 P3 pkt 18): FAQPage z TEJ SAMEJ tablicy, którą renderuje HubFAQ.
          Jedno źródło = zero rozjazdu treść/schema. */}
      <JsonLd data={faqSchemaPl(FAQ_HUBU, PATH)} />

      {/* v22 (§3 P0 pkt 2, ta trasa była wymieniona wprost): ręczny
          <link rel="canonical"> USUNIĘTY. Kanoniczny URL wystawia już
          `buildMetadata` przez `alternates.canonical` (lib/metadata.ts:38),
          więc ten znacznik dawał w <head> DRUGI rel=canonical, wbrew kryterium
          odbioru §5.4 („dokładnie jeden na trasę"). */}
    </main>
  );
}
