'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/components/motion/hooks';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { InfIcon } from '@/components/ui/InfIcons';
import type { InfIconName } from '@/components/ui/InfIcons';

/**
 * SEKCJA — BRANŻE / OKNO TYPEWRITER (dodatek do strony głównej).
 *
 * Cel: osobne, przykuwające uwagę okno stylizowane na czat/terminal Agenta, w którym
 * tekst PISZE się znak po znaku i KASUJE, cyklując realne przykłady powtarzalnej roboty
 * w różnych branżach. To "Agent działa", nie "chatbot odpowiada" — każdy przykład w 1.
 * osobie czasownikiem (umawiam, odbieram, składam, odpowiadam).
 *
 * ZASADY:
 * - "use client" + czysty useEffect/useState + setTimeout. Zero zewnętrznych bibliotek
 *   animacji do samego efektu pisania (framer-motion użyty WYŁĄCZNIE do detekcji
 *   prefers-reduced-motion, spójnie z HeroPersonaCycler i Reveal).
 * - prefers-reduced-motion → BEZ animacji: pokazujemy statyczną listę wszystkich
 *   przykładów (ta sama lista, którą i tak trzymamy w HTML dla botów).
 * - GEO (KPI #1): wszystkie przykłady są w statycznym HTML jako <ul> (data-driven),
 *   widoczne przy reduced-motion, a dla pozostałych ukryte wizualnie (sr-only), ale
 *   obecne w DOM. Typewriter to TYLKO warstwa wizualna nad tym samym tekstem.
 * - SSR-safe: okno renderuje pierwszą pełną frazę serwerowo (bot i czytnik widzą
 *   sensowny tekst zanim ruszy JS; brak skoku layoutu — wysokość zarezerwowana).
 */

type Branza = {
  /** Etykieta segmentu (przed dwukropkiem) — np. "dla biura". */
  label: string;
  /** Co Agent robi, w 1. osobie — np. "umawiam spotkania i pilnuję kalendarza". */
  action: string;
  /** INFINITY v3: UNIKALNA ikona InfIcons karty reduced-motion (dekoracja aria-hidden). */
  ikona: InfIconName;
  /** Kolor kafelka --tile-c (paleta trasy marki; wyłącznie dekoracja). */
  c: string;
};

/* INFINITY v4 (spec §PARTIA C pkt 5): kolory kafelków kart (tryb reduced-motion)
   przechodzą na FLUORESCENCYJNE ODCIENIE palety v4 (baza -> jasny:
   #2b7cff->#5ba4ff, #8b5cf6->#a586ff, #ffa101->#ffc120, #22d3ee->#61edff) —
   każda karta w gridzie innym tonem. Wyłącznie dekoracja, teksty 1:1.
   v17 (paleta neon, raporty/pomiary-v17.md §2): #5ba4ff->#70b0ff,
   #a586ff->#dc7aff — jaśniejsze, bliżej magenty; kontrast tylko rośnie. */
const BRANZE: readonly Branza[] = [
  { label: 'dla biura', action: 'umawiam spotkania i pilnuję kalendarza', ikona: 'kalendarz-check', c: '#70b0ff' },
  { label: 'dla salonu', action: 'odbieram telefon, gdy strzyżesz klienta', ikona: 'sluchawka-fala', c: '#dc7aff' },
  { label: 'dla budowlanki', action: 'składam wyceny z maila', ikona: 'dokument-skan', c: '#ffc120' },
  { label: 'dla e-commerce', action: 'odpowiadam na pytania o zamówienia 24/7', ikona: 'chat-dymek', c: '#61edff' },
] as const;

/** Pełne zdanie jednej branży (spójne źródło dla typewritera i listy GEO). */
function zdanie(b: Branza): string {
  return `${b.label}: ${b.action}`;
}

/* INFINITY v7 (spec §PARTIA D pkt 2, zrzut Pawła „Powtarzalna robota wygląda
   inaczej w każdej branży"): akapity spod okna terminala jadą w KAFELKACH.
   Zdania są ISTNIEJĄCE, tylko przeniesione i pocięte: pierwsza karta to
   ostatnie zdanie dawnego leadu, dwie kolejne to rozbity akapit domykający.
   Każda karta ma własny odcień (--card-c) i unikalny glif — sekcja przestaje
   być „nieuzupełniona kolorystyką". */
const DOMKNIECIE: ReadonlyArray<{ t: string; ikona: InfIconName; c: string }> = [
  {
    t: 'Agent SimpleFast przejmuje dokładnie tę część, w każdej branży po swojemu.',
    ikona: 'robot',
    c: '#dc7aff',
  },
  {
    t: 'To nie rolka haseł. Każdy z tych przykładów to realne zadanie, które zdejmujemy z właściciela i jego zespołu.',
    ikona: 'iskry',
    c: '#61edff',
  },
  {
    t: 'Twój proces wygląda inaczej? Tym lepiej. Agenta układamy pod to, co naprawdę zżera Ci czas.',
    ikona: 'puzzle',
    c: '#29ff77',
  },
] as const;

/**
 * Pełne frazy policzone RAZ na poziomie modułu. Dzięki temu pętla typewritera indeksuje
 * zwykłą tablicę stringów, a `FIRST` jest gwarantowanym, nie-opcjonalnym stringiem (BRANZE
 * jest niepuste) — bez walki z noUncheckedIndexedAccess w gorącej ścieżce.
 */
const FRAZY: readonly string[] = BRANZE.map(zdanie);
const FIRST: string = zdanie(BRANZE[0]!);

/* Tempo (ms) — dobrane tak, by dało się przeczytać, ale nie nudziło. */
const TYPE_MS = 55; // pisanie znaku
const DELETE_MS = 30; // kasowanie znaku (szybciej niż pisanie — naturalne)
const HOLD_FULL_MS = 1600; // pauza na pełnym zdaniu (czas na przeczytanie)
const HOLD_EMPTY_MS = 420; // pauza pustego pola przed kolejną branżą

export function BranzeDemo() {
  const reduce = useReducedMotion();

  // SSR + 1. klatka: pełne pierwsze zdanie (bez skoku, sensowny tekst bez JS).
  // setText jest jedynym źródłem re-renderu — indeks branży trzymamy lokalnie w pętli.
  const [text, setText] = useState<string>(FIRST);

  // Trzymamy fazę w refie — nie wymusza re-renderu, a pętla setTimeout ją czyta.
  const phaseRef = useRef<'typing' | 'holding' | 'deleting'>('holding');
  const charRef = useRef<number>(FIRST.length);

  useEffect(() => {
    if (reduce) return;

    let timer: ReturnType<typeof setTimeout>;
    let active = true;
    let i = 0; // lokalny indeks branży (źródło prawdy pętli)

    function tick() {
      if (!active) return;
      const full = FRAZY[i] ?? FIRST;

      if (phaseRef.current === 'typing') {
        charRef.current += 1;
        setText(full.slice(0, charRef.current));
        if (charRef.current >= full.length) {
          phaseRef.current = 'holding';
          timer = setTimeout(tick, HOLD_FULL_MS);
        } else {
          timer = setTimeout(tick, TYPE_MS);
        }
        return;
      }

      if (phaseRef.current === 'holding') {
        phaseRef.current = 'deleting';
        timer = setTimeout(tick, DELETE_MS);
        return;
      }

      // deleting
      charRef.current -= 1;
      setText(full.slice(0, Math.max(0, charRef.current)));
      if (charRef.current <= 0) {
        // następna branża, zaczynamy pisać
        i = (i + 1) % BRANZE.length;
        phaseRef.current = 'typing';
        timer = setTimeout(tick, HOLD_EMPTY_MS);
      } else {
        timer = setTimeout(tick, DELETE_MS);
      }
    }

    // Start: pierwsze zdanie jest już w pełni napisane (SSR) -> trzymamy chwilę i kasujemy.
    phaseRef.current = 'holding';
    charRef.current = FIRST.length;
    setText(FIRST);
    timer = setTimeout(tick, HOLD_FULL_MS);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [reduce]);

  return (
    <Section tone="subtle" space="md" id="branze">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          {/* v10 §3: końcówka H2 w gradiencie wzorca (span .inf-grad-text, partia A). Treść 1:1. */}
          <h2 className="text-h2">Powtarzalna robota wygląda inaczej <span className="inf-grad-text" data-text="w każdej branży">w każdej branży</span></h2>
          {/* v11 spec D: kreska wzorca pod H2 (.inf-h2-line, kontrakt partii A).
              Nagłówek dosunięty do lewej, więc !mx-0 gasi centrowanie klasy
              (klasy A stoją poza @layer ZA utilities, zwykłe mx-0 przegrywa). */}
          <div aria-hidden="true" className="inf-h2-line !mx-0" />
        </Reveal>
        <Reveal delay={0.05}>
          {/* v7: lead skrócony do dwóch zdań — trzecie („Agent SimpleFast
              przejmuje...") zeszło 1:1 do kafelka DOMKNIECIE pod oknem. */}
          <p className="text-lead mt-5 text-fg-muted">
            Inny telefon odbiera salon, inny mail przepisuje budowlanka, inne pytania wracają w
            e-commerce. Robota jest jednak ta sama: powtarzalna i czasochłonna.
          </p>
        </Reveal>
      </div>

      {/* OKNO AGENTA — terminal/czat. Sama warstwa wizualna typewritera.
          INFINITY (spec, zadanie 7): ramka terminala w języku wzorca — solidne
          tło --surface (#0d1018), obwódka accent, kropki okna w kolorach trasy
          marki (dekoracja aria-hidden, wzorzec infinitytechstack ma je jawnie),
          pasek i status w mono. Treść pisana i wszystkie stringi 1:1.
          overflow-hidden zostaje (w środku nic nie wystaje poza kadr).

          v9 §4 (cytat Pawła: „zobacz, jak jest zrobiony. Jest zrobiony tak, że
          on ma tło nieprzezroczyste"). POMIAR PRZED (realny Chrome 1440x900,
          CDP): tło okna liczyło się na rgb(17,17,39) przy KRYCIU 1 i bez
          backdrop-filter, czyli technicznie nic przez nie nie prześwitywało.
          Problem był WIZUALNY i widać go na zrzucie: korpus #111127 stał ledwie
          nad tłem strony #05050c (kontrast korpus/strona 1,09:1), a pasek tytułu
          #0e0e22 był od korpusu praktycznie nieodróżnialny — okno czytało się
          jak przezroczysta szyba na gwiazdach, nie jak terminal.
          ZMIANA: korpus wchodzi na --surface-raised #181840, czyli kontrast
          korpus/strona 1,20:1 (luminancja względna 0,0122 zamiast 0,0067, ponad
          dwa razy dalej od tła). Dla porównania POMIARY WZORCA §3.1: karty
          infinitytechstack.uk trzymają 1,04-1,06:1, więc jesteśmy PO stronie
          mocniejszej separacji, nie słabszej. Pasek tytułu ZOSTAJE na
          --surface-sunken #0e0e22, więc para „ciemny pasek + jaśniejszy korpus"
          wreszcie rysuje okno. Cień md -> lg odkleja je od gwiazd.
          Oba tokeny są NIEPRZEZROCZYSTE (pełne hexy w globals), więc gwiazdy
          i mgławice fizycznie nie mają którędy przejść.
          KONTRAST TEKSTU: --fg #e4e4f0 na #181840 = 13,4:1 (było 16,0:1 na
          #111127) — dalej AAA, zero regresji dostępności. */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-8 max-w-narrow overflow-hidden rounded-lg border border-border-accent bg-surface-raised shadow-lg">
          {/* Pasek okna: kropki + etykieta + status */}
          <div className="flex items-center gap-3 border-b border-hairline bg-surface-sunken px-5 py-3.5">
            {/* Kropki okna terminala — trasa marki zamiast semaforu macOS. */}
            <span aria-hidden="true" className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2b7cff]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#8b5cf6]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#22e06b]" />
            </span>
            <span className="font-mono text-ui font-semibold text-fg">Agent SimpleFast</span>
            <span className="ml-auto inline-flex items-center gap-2 font-mono text-caption text-fg-subtle">
              {/* Statyczny pierścień zamiast animate-pulse: ten sam sygnał „live" przy
                  zerowym koszcie na klatkę. Kontrakt: max 1 pętla ambient na viewport,
                  a tu biegły dwie (kropka + kursor). */}
              <span
                className="inline-block h-2 w-2 rounded-full bg-success ring-2 ring-[color:var(--success-bg)]"
                aria-hidden="true"
              />
              działa
            </span>
          </div>

          {/* Ciało okna: linia "prompt" + pisany tekst. */}
          <div className="px-5 py-12 sm:px-10 sm:py-16">
            {/*
              Wysokość zarezerwowana (min-h) na 2 linie tekstu, żeby kasowanie/pisanie
              nie skakało layoutem na mobile. Tekst typewritera oznaczony aria-hidden —
              pełną treść dla czytników i botów niesie lista poniżej.
            */}
            <p
              className="flex min-h-[3.5em] items-start font-mono text-[clamp(1.0625rem,2.4vw,1.5rem)] leading-[1.5] tracking-[-0.01em] text-fg sm:min-h-[3em]"
              aria-hidden={!reduce}
            >
              <span className="mr-2 select-none text-accent" aria-hidden="true">
                &gt;
              </span>

              {reduce ? (
                // Reduced-motion: bez pisania — pokazujemy pełną listę niżej, tu krótki opis.
                <span className="text-fg-muted">Oto, co robię w różnych branżach:</span>
              ) : (
                <span>
                  {text}
                  {/* Prawdziwy blink kursora (sfCaretBlink, ten sam keyframe co .sf-caret
                      w H1) zamiast animate-pulse, czyli oddychającej kropki. */}
                  <span
                    className="sf-demo-caret ml-0.5 inline-block w-[0.6ch] -translate-y-[1px] text-accent"
                    aria-hidden="true"
                  >
                    ▌
                  </span>
                </span>
              )}
            </p>
          </div>
        </div>
      </Reveal>

      {/*
        GEO + DOSTĘPNOŚĆ + reduced-motion: pełna lista WSZYSTKICH przykładów w statycznym
        HTML. Dla użytkowników z animacją jest ukryta wizualnie (sr-only), ale obecna w
        DOM (boty/czytniki czytają komplet). Przy prefers-reduced-motion robi się
        widoczna i staje się główną treścią sekcji (czytelna lista zamiast ruchu).
      */}
      <ul
        className={
          reduce
            ? 'mx-auto mt-8 grid max-w-narrow gap-3 sm:grid-cols-2'
            : 'sr-only'
        }
      >
        {BRANZE.map((b) => (
          <li
            key={b.label}
            className={
              reduce
                ? 'inf-card inf-card-edge px-5 py-4'
                : undefined
            }
            // v4: odcień karty (lewa krawędź, narożniki [ ]) = odcień kafelka —
            // każda karta w gridzie RM innym tonem (poza RM li jest sr-only,
            // zmienna niczego nie maluje).
            style={{ '--card-c': b.c } as CSSProperties}
          >
            {/* Reflektor za kursorem (--mx/--my z MotionOrchestrator) tylko tam,
                gdzie <li> jest realną kartą — poza RM lista jest sr-only i nie
                ma czego podświetlać. Dekoracja aria-hidden. */}
            {reduce && <div aria-hidden="true" className="inf-spotlight" />}
            {reduce ? (
              // INFINITY v3 (spec §KARTY): karta branży z kafelkiem UNIKALNEJ
              // ikony InfIcons (dekoracja aria-hidden) — treść tekstowa 1:1.
              <span className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="inf-tile"
                  style={{ '--tile-c': b.c } as CSSProperties}
                >
                  <InfIcon name={b.ikona} />
                </span>
                <span className="text-body-sm text-fg">
                  <span className="font-semibold text-accent">{b.label}:</span> {b.action}
                </span>
              </span>
            ) : (
              // W trybie animacji: czysty tekst pełnego zdania dla botów/czytników.
              <>{zdanie(b)}</>
            )}
          </li>
        ))}
      </ul>

      {/* Domknięcie wartości — "co to znaczy dla MŚP", bez obietnic liczbowych.
          v7: trzy kafelki zamiast akapitu pod oknem (treść 1:1, patrz
          DOMKNIECIE). Kaskadę niesie .sf-stagger na <Reveal>. */}
      {/* v10 §6: gap kart 32 -> 20px klasą-kontraktem partii A .inf-grid-gap
          (pomiar wzorca §3: .lp-primary-grid--three 20px). */}
      <Reveal as="ul" delay={0.15} className="sf-stagger inf-grid-gap mx-auto mt-8 grid max-w-wide md:grid-cols-3">
        {/* v11 spec A: sekcja Branże = WARIANT W1 wzorca (.lp-learn-card,
            lewa krawędź stała w kolorze; mapa w raporty/taksonomia-ramek-v11.md
            §A). Klasa .inf-card-edge = kontrakt partii A (globals:
            WARIANTY RAMEK v11). */}
        {DOMKNIECIE.map((d) => (
          <li key={d.ikona} className="inf-card inf-card-edge p-6" style={{ '--card-c': d.c } as CSSProperties}>
            <div aria-hidden="true" className="inf-spotlight" />
            <span
              aria-hidden="true"
              className="inf-tile mb-4"
              style={{ '--tile-c': d.c } as CSSProperties}
            >
              <InfIcon name={d.ikona} />
            </span>
            <p className="text-body-sm text-fg-muted">{d.t}</p>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
