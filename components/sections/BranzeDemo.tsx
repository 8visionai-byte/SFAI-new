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

const BRANZE: readonly Branza[] = [
  { label: 'dla biura', action: 'umawiam spotkania i pilnuję kalendarza', ikona: 'kalendarz-check', c: '#2b7cff' },
  { label: 'dla salonu', action: 'odbieram telefon, gdy strzyżesz klienta', ikona: 'sluchawka-fala', c: '#8b5cf6' },
  { label: 'dla budowlanki', action: 'składam wyceny z maila', ikona: 'dokument-skan', c: '#f59e0b' },
  { label: 'dla e-commerce', action: 'odpowiadam na pytania o zamówienia 24/7', ikona: 'chat-dymek', c: '#22d3ee' },
] as const;

/** Pełne zdanie jednej branży (spójne źródło dla typewritera i listy GEO). */
function zdanie(b: Branza): string {
  return `${b.label}: ${b.action}`;
}

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
          <h2 className="text-h2">Powtarzalna robota wygląda inaczej w każdej branży</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Inny telefon odbiera salon, inny mail przepisuje budowlanka, inne pytania wracają w
            e-commerce. Robota jest jednak ta sama: powtarzalna i czasochłonna. Agent SimpleFast
            przejmuje dokładnie tę część, w każdej branży po swojemu.
          </p>
        </Reveal>
      </div>

      {/* OKNO AGENTA — terminal/czat. Sama warstwa wizualna typewritera.
          INFINITY (spec, zadanie 7): ramka terminala w języku wzorca — solidne
          tło --surface (#0d1018), obwódka accent, kropki okna w kolorach trasy
          marki (dekoracja aria-hidden, wzorzec infinitytechstack ma je jawnie),
          pasek i status w mono. Treść pisana i wszystkie stringi 1:1.
          overflow-hidden zostaje (w środku nic nie wystaje poza kadr). */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-8 max-w-narrow overflow-hidden rounded-lg border border-border-accent bg-surface shadow-md">
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
                ? 'inf-card px-5 py-4'
                : undefined
            }
          >
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

      {/* Domknięcie wartości — "co to znaczy dla MŚP", bez obietnic liczbowych. */}
      <Reveal delay={0.15}>
        <p className="mx-auto mt-6 max-w-narrow text-body-sm text-fg-subtle">
          To nie rolka haseł. Każdy z tych przykładów to realne zadanie, które zdejmujemy z
          właściciela i jego zespołu. Twój proces wygląda inaczej? Tym lepiej. Agenta układamy
          pod to, co naprawdę zżera Ci czas.
        </p>
      </Reveal>
    </Section>
  );
}
