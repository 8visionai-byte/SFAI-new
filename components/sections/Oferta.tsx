import Link from 'next/link';
import { Section, MagneticButton, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';
import { USLUGI } from '@/lib/uslugi';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * SEKCJA 7 — OFERTA + ramy cen (spec 03 §7). Emocja: pewność, brak ukrytych kosztów.
 * Cena widoczna = bramka GEO.
 *
 * ZASADA (jak w faqData): ŻADNYCH literalnych [PLACEHOLDER] w renderowanej treści —
 * widoczna "cena od [PLACEHOLDER]" zostałaby zacytowana przez LLM jako fakt i odrzucona
 * przez Google. Dopóki Paweł nie poda realnych widełek, kolumna ceny kieruje na diagnozę,
 * a nie pokazuje zmyślonej kwoty. INPUT PAWŁA: realne "od X zł", oszczędność/mc, dni.
 */
/* INFINITY v3: lokalna mapa emoji WYPADŁA — dekorację (kolor + UNIKALNA ikona
   SVG per slug) niesie single source lib/inf-kategorie (INF_KATEGORIA,
   fundament partii A). Kolor i ikona są WYŁĄCZNIE dekoracją (aria-hidden /
   custom property --tile-c, --card-c) — treść i kontrast tekstu niosą tokeny. */

/* Tonacja dekoracyjna kart cennika = trzy stopnie trasy marki (krok po kroku). */
const POZIOM_TON = ['#2b7cff', '#8b5cf6', '#22e06b'] as const;

/* FALLBACK DLA SILNIKÓW BEZ SUBGRID (starsze niż Chrome 117 / Safari 16;
   browserslist repo schodzi do chrome 100). Tam `grid-template-rows: subgrid`
   jest nieznane, deklaracja odpada i karta układa wiersze po swojemu — wtedy
   równanie trzymają minimalne wysokości dobrane pod NAJDŁUŻSZY tekst danego
   wiersza. Wartości w `em`, więc jadą razem z płynną typografią (clamp).
   W silnikach z subgridem warunek @supports not (...) jest FAŁSZEM, więc te
   klasy nic nie robią i nie dokładają pustego miejsca. */
const BEZ_SUBGRID = {
  dlaKogo: 'md:supports-[not_(grid-template-rows:subgrid)]:min-h-[3.2em]',
  cena: 'md:supports-[not_(grid-template-rows:subgrid)]:min-h-[2.5em]',
  coDostajesz: 'md:supports-[not_(grid-template-rows:subgrid)]:min-h-[5.6em]',
  jednaLinia: 'md:supports-[not_(grid-template-rows:subgrid)]:min-h-[2.6em]',
} as const;

const POZIOMY = [
  {
    name: 'Start',
    highlight: false,
    forWho: 'Chcesz spróbować AI bez dużej decyzji',
    get: 'Jeden gotowy Agent (np. chatbot albo prosta automatyzacja)',
    price: 'wycena na diagnozie',
    saves: 'liczymy na diagnozie',
    time: 'najszybciej z całej oferty',
  },
  {
    name: 'Agent',
    highlight: true,
    forWho: 'Chcesz zdjąć z zespołu konkretny, powtarzalny proces',
    get: 'Agent obsługujący telefon lub czat + integracja z kalendarzem/CRM',
    price: 'wycena na diagnozie',
    saves: 'liczymy na diagnozie',
    time: 'dni, nie miesiące',
  },
  {
    name: 'Na miarę',
    highlight: false,
    forWho: 'Masz złożony przypadek lub kilka procesów naraz',
    get: 'Indywidualne rozwiązanie, apka, wtyczka, kilka połączonych Agentów',
    price: 'wycena po diagnozie',
    saves: 'liczymy na diagnozie',
    time: 'ustalamy wspólnie',
  },
] as const;

export function Oferta() {
  return (
    /* AKT III otwiera się rysowaną kreską rozdziału (seam), nie pasem tła.
       overflow-x-clip: poświata .sf-rim-gradient::before (inset -34px w poziomie)
       wystaje poza kartę i na 375px rozpychała dokument o 14px (poziomy scroll). */
    <Section tone="base" space="lg" seam className="overflow-x-clip">
      {/* ŚWIAT B (makieta 4-oferta): lewa trzecia = nagłówek + sub, prawe 2/3 =
          trzy SZKLANE karty (.sf-glass, fundament partii A). Środkowa karta
          dostaje gradientowy rim (.sf-rim-gradient) + badge + JEDYNY przycisk
          w rzędzie kart. INFINITY v7: karta wyróżniona NIE jest już fizycznie
          wyższa (md:-my-5 md:py-11 usunięte) — wysokość i wiersze wszystkich
          trzech kart są wspólne (subgrid, patrz komentarz przy kontenerze).
          Poniżej 1024px nagłówek wraca nad karty (jedna kolumna). Teksty 1:1. */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
        <div className="max-w-narrow">
          <Reveal>
            {/* v10 §3: kluczowe słowa H2 w gradiencie wzorca (span w środku zdania,
                jak brandy w H2 „Master Gemini, OpenAI..." wzorca). Treść 1:1. */}
            <h2 className="text-h2">Ile kosztuje <span className="inf-grad-text" data-text="wdrożenie AI Agenta">wdrożenie AI Agenta</span> dla firmy?</h2>
            {/* v11 spec D: kreska wzorca pod H2 (.inf-h2-line, kontrakt partii A);
              nagłówek przy lewej, więc !mx-0 gasi centrowanie klasy. */}
            <div aria-hidden="true" className="inf-h2-line !mx-0" />
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">
              Koszt wdrożenia AI Agenta zależy od zakresu. Inaczej wycenia się pojedynczy, gotowy proces (na
              przykład chatbot odpowiadający na pytania klientów), inaczej pełnego Agenta obsługującego telefon
              i kalendarz, a inaczej rozwiązanie szyte na miarę. Dokładne widełki podajemy na bezpłatnej diagnozie,
              kiedy znamy już Twój proces. Diagnoza i wstępna wycena nic nie kosztują.
            </p>
          </Reveal>
        </div>

        {/* INFINITY v7 §PARTIA C pkt 2 — CENNIK JAK TABELA (SUBGRID).
            Zrzut Pawła: „CO DOSTAJESZ / OSZCZĘDZA / CZAS WDROŻENIA" stały
            w każdej karcie na innej wysokości, a tekst środkowej wychodził
            ponad kartę. PRZYCZYNA (v6): `grid items-center` centrowało karty
            pionowo, a środkowa miała jeszcze `md:-my-5 md:py-11` (pułapka
            tokenów: py-11 = var(--space-11) = 160px!), więc nic nie mogło się
            wyrównać. FIX: items-stretch + SIEDEM wierszy `auto` na kontenerze,
            a każda karta to subgrid wpięty w te same tory — nazwa, dla kogo,
            cena, trzy pozycje <dl> i slot przycisku stoją w JEDNEJ linii we
            wszystkich trzech kartach. Wyróżnienie środkowej zostaje na tym, co
            niosło je w makiecie 4 (gradientowy rim + aura + badge + jedyny
            przycisk), BEZ ujemnych marginesów i bez innego paddingu — własny
            padding subgridu przesuwa jego pierwszy i ostatni tor, czyli wróciłby
            dokładnie ten rozjazd.
            md:gap-y-0: gap kontenera jest w gridzie odstępem MIĘDZY WIERSZAMI
            kart, więc na desktopie schodzi do zera, a rytm w karcie niosą jak
            dotąd marginesy (identyczne w każdej karcie = wyrównanie zostaje).
            Kaskadę robi .sf-stagger na dzieciach — dlatego opakowanie <div>
            zostaje (transform kaskady nie może wylądować na karcie, bo karta ma
            własny transform na hover) i samo jest subgridem przelotowym.
            UWAGA: żaden kontener wokół kart nie może mieć overflow:hidden
            (utnie badge na -top-3) — kontrakt obowiązuje też .sf-glass. */}
        {/* v10 §6: gap kart 32 -> 20px (pomiar wzorca §3: .lp-primary-grid--three
            20px). CELOWO utility gap-[20px], NIE klasa-kontrakt .inf-grid-gap:
            kontrakt stoi POZA @layer (wygrywa z utilities kolejnością źródła),
            więc jego shorthand gap skasowałby md:gap-y-0 — a zerowy row-gap
            na desktopie to warunek subgridu cennika (wiersze niosą marginesy). */}
        <Reveal className="sf-stagger grid items-stretch gap-[20px] md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto_auto_auto_auto] md:gap-y-0">
          {POZIOMY.map((p, i) => (
            <div key={p.name} className="md:grid md:row-[span_7] md:grid-rows-subgrid">
              {/* Aura .card-aura zeszła z cennika (język świata B: rim zamiast
                  neonowej pętli) — jedyna aura home zostaje na AgentDemo.
                  INFINITY: karty boczne przechodzą na .inf-card (ciemna karta
                  wzorca z lewą krawędzią w stopniu trasy marki). Wyróżniony plan
                  ZOSTAJE na .sf-rim-gradient (obrys trasą + aura, makieta 4) —
                  NIE łączyć z .inf-card: obie klasy zajmują ::before.
                  v7 audyt: karty cennika to karty-bohaterowie, więc obok
                  .inf-card idzie modyfikator .inf-card-lg (hover wzorca -5px
                  + scale, obwódka 65%). Wyróżniony plan go NIE dostaje — jego
                  wyróżnienie niesie rim i aura, nie mocniejszy lift. */}
              <Card
                variant="quiet"
                as="article"
                className={
                  p.highlight
                    ? 'sf-glass sf-rim-gradient relative flex h-full flex-col rounded-lg p-6 shadow-md md:grid md:row-[span_7] md:grid-rows-subgrid'
                    : /* v11 spec A: cennik = WARIANT W2 (.inf-card-top, kontrakt
                         partii A; zasada łączenia A dopuszcza -top z -lg, hover
                         ma te same liczby). Wyróżniony plan zostaje na
                         .sf-rim-gradient (jego język, nie .inf-card). */
                      'inf-card inf-card-lg inf-card-top relative flex h-full flex-col p-6 md:grid md:row-[span_7] md:grid-rows-subgrid'
                }
                style={
                  p.highlight
                    ? undefined
                    : ({ '--card-c': POZIOM_TON[i] ?? 'var(--accent-decor)' } as React.CSSProperties)
                }
              >
                {/* Reflektor za kursorem: pozycję (--mx/--my) ustawia JEDEN
                    delegowany pointermove z MotionOrchestrator (desktop).
                    Dekoracja aria-hidden; `position:absolute` z .inf-spotlight
                    trzyma go POZA flow, więc subgrid kart nie traci toru
                    (kontrakt z komentarza na końcu pliku). Wyróżniony plan
                    nie jest .inf-card, więc reflektora nie dostaje. */}
                {!p.highlight && <div aria-hidden="true" className="inf-spotlight" />}
                {/* Badge planu — mono .inf-tag na tle akcentu (utilities biją
                    warstwę components: bg/tekst/border z utility). Rodzice NIE
                    mają overflow:hidden — badge na -top-3 nie może być ucięty. */}
                {p.highlight && (
                  <span className="inf-tag absolute -top-3 left-6 rounded-full border-transparent bg-accent px-3 py-1 text-accent-contrast shadow-sm">
                    Najczęściej wybierane
                  </span>
                )}
                {/* WIERSZ 1 tabeli */}
                <h3 className="text-h3">{p.name}</h3>
                {/* WIERSZ 2 */}
                <p className={`mt-1 text-body-sm text-fg-muted ${BEZ_SUBGRID.dlaKogo}`}>{p.forWho}</p>

                {/* WIERSZ 3 — SLOT CENY: gdy Paweł poda realne widełki „od X zł", wróć do
                    text-h2 font-semibold tabular-nums text-brand — ten slot jest
                    zaprojektowany pod LICZBĘ. Dopóki stoi tu fraza, liczbowa skala
                    i tabular-nums (bez ani jednej cyfry) tylko psują typografię. */}
                <p className={`mt-6 max-w-[16ch] font-display text-h3 font-medium leading-[1.25] text-fg ${BEZ_SUBGRID.cena}`}>
                  {p.price}
                </p>

                {/* WIERSZE 4-6 — etykiety <dt> 1:1 co do znaku; INFINITY: mono
                    micro-caps .inf-overline (język etykiet wzorca; transform to
                    prezentacja, string w DOM bez zmian).
                    v7: <dl> jest ZAGNIEŻDŻONYM subgridem (span 3), więc każda
                    pozycja siada na wspólnym torze kontenera — „CO DOSTAJESZ",
                    „OSZCZĘDZA" i „CZAS WDROŻENIA" stoją w jednej linii we
                    wszystkich kartach. Odstępy dalej niosą marginesy
                    (mt-5 + space-y-3), identyczne w każdej karcie. */}
                <dl className="mt-5 space-y-3 border-t border-border pt-5 text-body-sm md:grid md:row-[span_3] md:grid-rows-subgrid">
                  <div className={BEZ_SUBGRID.coDostajesz}>
                    <dt className="inf-overline">Co dostajesz</dt>
                    <dd className="text-fg">{p.get}</dd>
                  </div>
                  <div className={BEZ_SUBGRID.jednaLinia}>
                    <dt className="inf-overline">Oszczędza</dt>
                    <dd className="text-fg">{p.saves}</dd>
                  </div>
                  <div className={BEZ_SUBGRID.jednaLinia}>
                    <dt className="inf-overline">Czas wdrożenia</dt>
                    <dd className="text-fg">{p.time}</dd>
                  </div>
                </dl>

                {/* WIERSZ 7 — TYLKO środkowa karta ma przycisk (makieta 4).
                    Etykieta = istniejący string CTA diagnozy (bez nowej kopii).
                    Tor 7 istnieje we wszystkich kartach (stąd row-span 7, nie 6):
                    dzięki temu przycisk nie jest doklejany do wiersza „czas
                    wdrożenia" i dolne krawędzie kart zostają równe. */}
                {p.highlight && (
                  <div className="mt-7">
                    <MagneticButton variant="primary" href={HOME_CTA.href}>
                      Umów bezpłatną diagnozę
                    </MagneticButton>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-6 max-w-narrow text-caption text-fg-subtle">
          To są widełki startowe, nie ostateczne faktury. Dokładną cenę poznasz na bezpłatnej diagnozie, zanim
          cokolwiek zamówisz. Bez ukrytych kosztów, a po wdrożeniu opieka w abonamencie od 99 zł miesięcznie.
        </p>
      </Reveal>

      {/*
        Linkowanie wewnętrzne pod GEO (fix SEO 05 §2.4): home -> każda z 6 stron /uslugi.
        Anchor = H1 usługi = money query (NIE "zobacz więcej"). Lista z rejestru USLUGI
        (single source) — slug i fraza nigdy się nie rozjadą. Treść w HTML (SSG), bot widzi linki.
      */}
      <Reveal delay={0.12}>
        <nav aria-label="Nasze usługi" className="mx-auto mt-16 max-w-container md:mt-20">
          <h3 className="text-h3">Co konkretnie wdrażamy?</h3>
          {/* Lista katalogowa zamiast sześciu identycznych pudełek pod trzema
              identycznymi pudełkami cennika. Anchor = H1 usługi (SEO 1:1).
              Mikrokopia „Zobacz, jak to działa" nie ginie z treści — schodzi do
              sr-only, glif → to dekoracja aria-hidden.
              INFINITY v3: wiersz jak w dropdownie wzorca — kafelek .inf-tile w
              kolorze kategorii z UNIKALNĄ ikoną SVG (rejestr INF_KATEGORIA,
              zero emoji) + tytuł bold + opis muted + strzałka .inf-arrow
              dojeżdżająca na hover wiersza. Teksty 1:1. */}
          <ul className="mx-auto mt-8 max-w-wide divide-y divide-border border-y border-border">
            {USLUGI.map((u) => {
              const kat = INF_KATEGORIA[u.slug] ?? INF_KATEGORIA_DEFAULT;
              return (
                <li key={u.slug}>
                  <Link
                    href={`/uslugi/${u.slug}`}
                    className="group flex items-center gap-4 py-4 transition-colors duration-fast hover:bg-bg-subtle md:gap-5 md:px-3"
                  >
                    {/* Kafelek ikony kategorii (dekoracja aria-hidden). */}
                    <span
                      aria-hidden="true"
                      className="inf-tile"
                      style={{ '--tile-c': kat.c } as React.CSSProperties}
                    >
                      <InfIcon name={kat.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-body font-semibold text-fg transition-colors duration-fast group-hover:text-accent">
                        {u.h1}
                      </span>
                      <span className="mt-0.5 block text-body-sm text-fg-muted">{u.metaDescription}</span>
                    </span>
                    <span aria-hidden="true" className="inf-arrow hidden text-accent group-hover:translate-x-1 md:inline-block">→</span>
                    <span className="sr-only">Zobacz, jak to działa</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Reveal>

      {/* Wariant z dotacją 2026 */}
      <Reveal delay={0.12}>
        <div className="mx-auto mt-10 max-w-narrow border-t border-border pt-6">
          <h3 className="text-h3">Można to sfinansować z dotacji?</h3>
          {/* INPUT PAWŁA: gdy będzie konkretny program dofinansowania, dopisać jego nazwę. */}
          <p className="mt-2 text-body-sm text-fg-muted">
            W 2026 roku część wdrożeń AI dla MŚP da się pokryć z dofinansowań. Na diagnozie sprawdzimy, czy Twój
            projekt łapie się na dostępne programy, i pomożemy ułożyć wniosek.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mx-auto mt-12 flex max-w-narrow flex-col items-start gap-3 md:mt-16">
          <MagneticButton variant="primary" size="lg" trailing href={HOME_CTA.href}>
            {HOME_CTA.label}
          </MagneticButton>
          {/*
            DOWÓD przy CTA — INPUT PAWŁA: realna opinia o stosunku ceny do efektu
            (z imieniem i firmą, za zgodą klienta). Do czasu zebrania: uczciwa mikrokopia
            zamiast widocznego [PLACEHOLDER], który zacytowałby LLM.
          */}
          <p className="text-body-sm text-fg-muted">
            Najpierw bezpłatna diagnoza i wycena. Płacisz dopiero, gdy wiesz, za co i ile.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* CSS DO DOPISANIA (dla partii A — właściciela app/globals.css):
   NIC NIE JEST WYMAGANE. Wyrównanie cennika stoi w całości na utilities
   Tailwinda w tym pliku (grid 7 torów + `grid-rows-subgrid` na karcie i na
   <dl> + fallback min-h w @supports not). Świadomie bez nowej klasy w globals:
   to układ JEDNEJ sekcji, nie token języka.

   KONTRAKT DLA PARTII A (do wiedzy, nic do dopisania): karty cennika są od v7
   kontenerami `display:grid`. Wszystkie pseudo-elementy używane na tych
   kartach MUSZĄ zostać `position:absolute` (.inf-card::before/::after,
   .sf-rim-gradient::before — dziś są). Pseudo-element BEZ position:absolute
   stałby się elementem gridu i zająłby jeden tor, rozjeżdżając tabelę.
   To samo dotyczy .inf-spotlight (od v7 stoi w kartach bocznych jako pierwsze
   dziecko): globals dają mu `position:absolute; inset:0` — i tak ma zostać.
*/
