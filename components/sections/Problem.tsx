import type { CSSProperties } from 'react';
import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { CytatyWalec } from '@/components/sections/CytatyWalec';
import { InfIcon } from '@/components/ui/InfIcons';
import type { InfIconName } from '@/components/ui/InfIcons';
import { HOME_CTA } from '@/lib/site';
import { getUslugaBySlug } from '@/lib/uslugi';
import { INF_USLUGA_BADGE } from '@/lib/inf-kategorie';
import { KartaEtykieta, KartaTagi, tagiUslugi } from '@/components/sections/KartaCzesci';

/**
 * SEKCJA 3 — PROBLEM językiem klienta (spec 03 §3). Emocja: loss aversion ->
 * "ktoś mnie rozumie". Kapsuła answer-first + cytaty bólu + mostek do diagnozy.
 * Zero żargonu (LLM/RAG/NLU). H2 jak pytanie.
 *
 * INFINITY v5 (spec §3 PARTIA C):
 * - SYMETRIA: H2 + lead WYŚRODKOWANE jak pozostałe nagłówki home (text-center).
 * - CYTATY → WALEC 3D: statyczna lista bólów z v4 przeniesiona 1:1 (co do
 *   znaku, razem z paletą odcieni) do components/sections/CytatyWalec.tsx —
 *   obracający się bęben ~260 px z kropkami-nawigacją (RM/mobile: crossfade).
 * - Mostek do diagnozy ZOSTAJE w sekcji (treść 1:1), schodzi POD walec jako
 *   własny, wyśrodkowany blok — walec ma być zwarty, „nie zapełniać strony".
 *
 * INFINITY v7 (spec §PARTIA D pkt 2, zrzuty Pawła „Ile czasu w tygodniu zjada
 * Ci robota" + blok „Nie zgaduj"): ŚCIANA AKAPITÓW ROZBITA NA KAFELKI.
 * - GŁÓWNE ZDANIE zostaje dużym nagłówkiem (H2 bez zmian).
 * - Lead urywa się na dwukropku, a jego wyliczenie („odbieranie tych samych
 *   pytań / przepisywanie danych / oddzwanianie do klientów") jedzie w TRZECH
 *   kartach .inf-card z kafelkiem ikony. Zdania POCIĘTE, nie napisane od nowa:
 *   treść co do znaku ta sama, zmienia się wyłącznie opakowanie.
 * - Domknięcie leadu („To nie jest praca, która rozwija firmę...") = karta
 *   pełnej szerokości; mostek do diagnozy („Nie zgaduj...") = karta z CTA.
 * - Każda karta ma własny odcień (--card-c) — sekcja przestaje być bezbarwna.
 */

/* Trzy rzeczy, które zjadają tydzień. Tytuły kart = fragmenty JEDNEGO
   istniejącego zdania leadu (1:1, jak w v7).
   v11 spec E (cytat Pawła: „to powinna być ramka z WIĘCEJ treści. Zobacz
   strukturę u nich: kolorowy kicker, biały tytuł, opis, tagi"): karta dostaje
   pełną anatomię wariantu W2 wzorca. KAŻDE zdanie pola opis to PRZEREDAGOWANA
   kapsuła usługi z lib/uslugi (chatboty / automatyzacje / voiceboty; źródło
   zdanie po zdaniu w raporcie partii B v11), zero nowych faktów, zero cen,
   zero em-dash. Pole slug wiąże kartę z rejestrem: z niego idą kicker
   (INF_USLUGA_BADGE) i tagi (money queries przez tagiUslugi).
   Kolor karty = odcień KATEGORII usługi z lib/inf-kategorie, więc
   automatyzacje schodzą z bursztynu na zieleń kategorii (bursztyn przejmuje
   karta domknięcia niżej, w sekcji zostaje 5 różnych tonów bez duplikatu).
   Pole ikona zostaje w rejestrze (nie renderujemy go, konwencja v8). */
const ZJADACZE: ReadonlyArray<{
  t: string;
  slug: string;
  opis: string;
  ikona: InfIconName;
  c: string;
}> = [
  {
    t: 'odbieranie tych samych pytań',
    slug: 'chatboty',
    opis:
      'Chatbot AI odpowiada na nie za Ciebie na stronie i w komunikatorach przez całą dobę: tłumaczy ofertę, podaje ceny i godziny, zbiera leady, nawet o 22:00. Uczymy go na Twojej wiedzy, a dane zostają w Unii Europejskiej.',
    ikona: 'chat-dymek',
    c: '#61edff',
  },
  {
    t: 'przepisywanie danych między systemami',
    slug: 'automatyzacje',
    opis:
      'Automatyzacja przejmuje przepisywanie danych między mailem, arkuszem i fakturą, wysyłanie potwierdzeń i pilnowanie terminów. Zaczynamy od jednego procesu, który boli najbardziej.',
    ikona: 'dokument-skan',
    c: '#29ff77',
  },
  {
    t: 'oddzwanianie do klientów, którzy nie dodzwonili się za pierwszym razem',
    slug: 'voiceboty',
    opis:
      'Voicebot odbiera telefon, rozmawia po polsku i umawia wizytę albo przyjmuje zgłoszenie. Sprawy dla człowieka zapisuje i wysyła Ci powiadomienie, żebyś oddzwonił przygotowany.',
    ikona: 'sluchawka-fala',
    c: '#a586ff',
  },
] as const;

export function Problem() {
  return (
    <Section tone="base" id="problem" space="md">
      {/* INFINITY v3 (decyzja Pawła: zdjęcia WYLATUJĄ z całej strony): panorama
          „przed i po" usunięta z renderu (plik webp zostaje w /public).
          v5: nagłówek + lead wyśrodkowane (symetria z resztą home). */}
      <div className="mx-auto max-w-narrow text-center">
        <Reveal variant="header">
          {/* v10 §3: końcówka H2 w gradiencie wzorca (span .inf-grad-text,
              klasa partii A; data-text pod shimmer ::after). Treść 1:1. */}
          <h2 className="text-h2">Ile czasu w tygodniu zjada Ci robota, którą mógłby robić <span className="inf-grad-text" data-text="ktoś inny?">ktoś inny?</span></h2>
          {/* v11 spec D: kreska wzorca pod H2 (50x2px, gradient + poświata, statyczna
              jak zmierzono na wzorcu). Klasa .inf-h2-line = kontrakt partii A. */}
          <div aria-hidden="true" className="inf-h2-line" />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Większość małych firm traci kilkanaście godzin tygodniowo na to samo:
          </p>
        </Reveal>
      </div>

      {/* Wyliczenie z leadu jako trzy kafelki (v7). Kaskadę niesie .sf-stagger
          na <Reveal> (kontrakt: goły div = dzieci opacity:0 na zawsze). */}
      {/* v10 §6: gap kart 32 -> 20px klasą-kontraktem partii A .inf-grid-gap
          (pomiar wzorca §3: .lp-primary-grid--three 20px). */}
      {/* v11 spec A: sekcja Problem = WARIANT W2 wzorca (.lp-primary-card:
          neon-top w spoczynku, hover podświetla CAŁĄ ramkę), mapa
          sekcja->wariant w raporty/taksonomia-ramek-v11.md §A. Klasa
          .inf-card-top = kontrakt partii A (globals: WARIANTY RAMEK v11).
          Struktura treści karty = spec E (anatomia W2). */}
      <Reveal as="ul" className="sf-stagger inf-grid-gap mx-auto mt-10 grid max-w-wide md:grid-cols-3">
        {ZJADACZE.map((z) => {
          const usluga = getUslugaBySlug(z.slug);
          return (
            <li
              key={z.t}
              className="inf-card inf-card-top flex flex-col p-6"
              style={{ '--card-c': z.c } as CSSProperties}
            >
              {/* Reflektor za kursorem: pozycję (--mx/--my) ustawia JEDEN
                  delegowany pointermove z MotionOrchestrator (desktop).
                  Dekoracja aria-hidden. */}
              <div aria-hidden="true" className="inf-spotlight" />
              {/* Mono kicker w kolorze karty (wzorzec: status nad tytułem).
                  Etykieta = INF_USLUGA_BADGE, ta sama co na kaflach PromoUslugi
                  i w dropdownie nav, jeden język etykiet na stronie. */}
              <KartaEtykieta>{INF_USLUGA_BADGE[z.slug] ?? z.slug}</KartaEtykieta>
              {/* Tytuł karty = dotychczasowe zdanie-zjadacz 1:1 (fragment leadu). */}
              <h3 className="mt-3 text-ui font-bold text-fg">{z.t}</h3>
              {/* Opis = przeredagowana kapsuła usługi (rejestr ZJADACZE wyżej). */}
              <p className="mt-2 text-body-sm text-fg-muted">{z.opis}</p>
              {/* Tagi = money queries usługi z rejestru (mechanizm KartaCzesci,
                  zero nowych fraz); usługa spoza rejestru = brak tagów. */}
              {usluga && (
                <KartaTagi tagi={tagiUslugi(usluga)} etykietaListy={`Frazy usługi: ${usluga.h1}`} />
              )}
            </li>
          );
        })}
      </Reveal>

      {/* Domknięcie leadu — karta pełnej szerokości (ta sama myśl, co wcześniej
          trzy ostatnie zdania akapitu; treść 1:1). */}
      <Reveal delay={0.05} className="mx-auto mt-6 max-w-wide">
        {/* v11: karta w wariancie sekcji (W2). Bursztyn przejęty po zjadaczu
            automatyzacji (ten zszedł na zieleń kategorii), w sekcji dalej
            5 różnych tonów bez duplikatu. */}
        <div
          className="inf-card inf-card-top flex items-start gap-4 p-6 md:p-8"
          style={{ '--card-c': '#ffc120' } as CSSProperties}
        >
          <div aria-hidden="true" className="inf-spotlight" />
          <span
            aria-hidden="true"
            className="inf-tile"
            style={{ '--tile-c': '#ffc120' } as CSSProperties}
          >
            <InfIcon name="robot" />
          </span>
          <p className="text-body text-fg-muted">
            To nie jest praca, która rozwija firmę. To praca, która ją tylko utrzymuje na powierzchni.
            I to właśnie ją zdejmuje AI Agent.
          </p>
        </div>
      </Reveal>

      {/* WALEC 3D cytatów (v5): karta .inf-card z bębnem 5 bólów — cytaty,
          odcienie i mechanika opisane w CytatyWalec.tsx (wyspa kliencka;
          treść w HTML od SSR, więc GEO bez zmian). */}
      <Reveal delay={0.1} className="mx-auto mt-12 max-w-narrow md:mt-16">
        <CytatyWalec />
      </Reveal>

      {/*
        Mostek do diagnozy (CTA wtórne -> główny flow) — treść 1:1 z v4, od v7
        na KARCIE z kafelkiem ikony (zrzut Pawła: ten blok był luźnym tekstem
        na środku sekcji). UWAGA: przycisk prowadzi do formularza diagnozy, NIE
        do kalkulatora — dlatego mikrokopia nie obiecuje "policz sam". Gdyby
        powstał realny kalkulator (godziny x stawka), wpiąć go jako krok 1 flow
        i wtedy można wrócić do słowa "policz".
      */}
      {/*
        v9 §3, cytaty Pawła: „zamiast na środku, to jest gdzieś tutaj, trzeba
        wszystko przyrównać" oraz „przycisk Pokaż mi, ile tracę to jest call to
        action, powinien być w podobnym tonie co wszystkie przyciski".

        POMIAR PRZED (realny Chrome 1440x900, CDP): karta 980px szerokości,
        text-align: start, a środek przycisku wypadał 334px NA LEWO od środka
        karty. Ikona, tekst i CTA stały w jednej kolumnie przy lewej krawędzi
        980-pikselowej karty, czyli dokładnie to, co widać na zrzucie.
        UKŁAD PO: text-center na karcie (jedna oś dla wszystkiego), kafelek
        ikony centrowany mx-auto, akapit dostaje max-w-[60ch] mx-auto — bez tego
        wyśrodkowany tekst rozjeżdżałby się na 850px linii i czytałby się gorzej
        niż przed zmianą. CTA w kontenerze flex justify-center (odchylenie 0px).

        PRZYCISK: dotąd <Button variant="secondary"> = przezroczyste tło, biała
        obwódka 55 procent i biały tekst, czyli neutralna szarość SPOZA palety
        CTA (zmierzone: borderColor rgba(255,255,255,.55)). Wchodzi dokładnie
        ten sam zestaw, co główne CTA sekcji na całej stronie (Dowod,
        GwarancjaEfektu, Oferta, DowodSpoleczny, FinalneCTA):
        <MagneticButton variant="primary" size="lg"> — magnetyzm + .sf-cta
        + tło --accent. ETYKIETA 1:1 („Pokaż mi, ile tracę"), adres 1:1
        (HOME_CTA.href), zero nowych stringów i zero nowego CSS.
      */}
      <Reveal delay={0.15} className="mx-auto mt-10 max-w-wide">
        <div className="inf-card inf-card-top p-6 text-center md:p-8" style={{ '--card-c': '#5ba4ff' } as CSSProperties}>
          <div aria-hidden="true" className="inf-spotlight" />
          <span
            aria-hidden="true"
            className="inf-tile mx-auto mb-4"
            style={{ '--tile-c': '#5ba4ff' } as CSSProperties}
          >
            <InfIcon name="lupa-wykres" />
          </span>
          <p className="mx-auto max-w-[60ch] text-body text-fg">
            Nie zgaduj. Na bezpłatnej diagnozie pokażę Ci, ile godzin i złotych miesięcznie zjada
            powtarzalna robota w Twojej firmie. Konkretne liczby z Twoich procesów, nie ogólniki.
          </p>
          <div className="mt-5 flex justify-center">
            <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
              Pokaż mi, ile tracę
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
