import type { CSSProperties } from 'react';
import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { CytatyWalec } from '@/components/sections/CytatyWalec';
import { InfIcon } from '@/components/ui/InfIcons';
import type { InfIconName } from '@/components/ui/InfIcons';
import { HOME_CTA } from '@/lib/site';

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

/* Trzy rzeczy, które zjadają tydzień — fragmenty JEDNEGO istniejącego zdania
   leadu. Kolor + glif to WYŁĄCZNIE dekoracja (kafelek aria-hidden), odcienie
   z fluorescencyjnej palety v4, każdy inny w obrębie siatki. */
const ZJADACZE: ReadonlyArray<{ t: string; ikona: InfIconName; c: string }> = [
  { t: 'odbieranie tych samych pytań', ikona: 'chat-dymek', c: '#67e8f9' },
  { t: 'przepisywanie danych między systemami', ikona: 'dokument-skan', c: '#fbbf24' },
  {
    t: 'oddzwanianie do klientów, którzy nie dodzwonili się za pierwszym razem',
    ikona: 'sluchawka-fala',
    c: '#a78bfa',
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
          <h2 className="text-h2">Ile czasu w tygodniu zjada Ci robota, którą mógłby robić ktoś inny?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Większość małych firm traci kilkanaście godzin tygodniowo na to samo:
          </p>
        </Reveal>
      </div>

      {/* Wyliczenie z leadu jako trzy kafelki (v7). Kaskadę niesie .sf-stagger
          na <Reveal> (kontrakt: goły div = dzieci opacity:0 na zawsze). */}
      <Reveal as="ul" className="sf-stagger mx-auto mt-10 grid max-w-wide gap-6 md:grid-cols-3">
        {ZJADACZE.map((z) => (
          <li key={z.t} className="inf-card p-6" style={{ '--card-c': z.c } as CSSProperties}>
            {/* Reflektor za kursorem: pozycję (--mx/--my) ustawia JEDEN
                delegowany pointermove z MotionOrchestrator (desktop).
                Dekoracja aria-hidden. */}
            <div aria-hidden="true" className="inf-spotlight" />
            {/* v8 (spec §8, pomiary wzorca §3.5): trzy „zjadacze tygodnia" to
                KARTY TEKSTOWE (fragmenty jednego zdania), więc bez ikony.
                Ikony w tej sekcji zostają na dwóch kartach pełnej szerokości
                (domknięcie leadu i mostek do diagnozy) — to karty-bohaterowie.
                Pole `ikona` zostaje w rejestrze ZJADACZE, nie renderujemy go. */}
            <p className="text-body text-fg">{z.t}</p>
          </li>
        ))}
      </Reveal>

      {/* Domknięcie leadu — karta pełnej szerokości (ta sama myśl, co wcześniej
          trzy ostatnie zdania akapitu; treść 1:1). */}
      <Reveal delay={0.05} className="mx-auto mt-6 max-w-wide">
        <div
          className="inf-card flex items-start gap-4 p-6 md:p-8"
          style={{ '--card-c': '#4ade80' } as CSSProperties}
        >
          <div aria-hidden="true" className="inf-spotlight" />
          <span
            aria-hidden="true"
            className="inf-tile"
            style={{ '--tile-c': '#4ade80' } as CSSProperties}
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
        <div className="inf-card p-6 text-center md:p-8" style={{ '--card-c': '#60a5fa' } as CSSProperties}>
          <div aria-hidden="true" className="inf-spotlight" />
          <span
            aria-hidden="true"
            className="inf-tile mx-auto mb-4"
            style={{ '--tile-c': '#60a5fa' } as CSSProperties}
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
