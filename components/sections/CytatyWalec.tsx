'use client';

import { useEffect, useState, type CSSProperties } from 'react';

/**
 * CytatyWalec — WALEC 3D cytatów bólu (INFINITY v5, spec §3 PARTIA C).
 *
 * Pionowy obracający się „bęben": kontener z CSS perspective, itemy rozłożone
 * rotateX na kole (5 cytatów co 72°), JS przełącza aktywny co ~4 s płynną
 * rotacją całego koła. Pauza na hover (desktop) i focus (kropki). Kropki =
 * nawigacja bezpośrednia. Wysokość zwarta ~260 px (spec: „nie zapełniać całej
 * strony").
 *
 * TRYB LITE (reduced-motion LUB mobile ≤760 px, spójnie z VoiceAura/Scramble):
 * crossfade bez 3D — itemy w stosie, aktywny opacity 1, reszta 0. Auto ~4 s
 * zostaje (spec v5 explicite: „RM i mobile-lite: crossfade bez 3D").
 *
 * CAŁA geometria 3D inline w JSX — globals.css w tej rundzie należy do
 * partii B, a transformy to jednorazowa geometria komponentu, nie tokeny.
 *
 * GEO/A11y: wszystkie cytaty są w DOM zawsze (SSR; przygaszone tylko
 * wizualnie opacity/backface) — bot i czytnik widzą pełną treść bez JS.
 * SSR renderuje wariant 3D statycznie (cytat #1 frontem); lite dogrywa się
 * po mount (bez ruchu do tego czasu, więc bez skoku).
 *
 * TREŚĆ 1:1: cytaty przeniesione co do znaku z dotychczasowej karty bólów
 * sekcji Problem (Problem.tsx, INFINITY v4) — zero nowych stringów treści.
 * Odcienie glifu „ = dotychczasowa paleta CYTAT_ODCIEN (dekoracja aria-hidden).
 */
const CYTATY = [
  'Telefon dzwoni, kiedy jestem u klienta. Połowy połączeń nie odbieram, a to są pieniądze, które uciekają.',
  'Ci sami ludzie pytają o to samo. O godziny, o cennik, o dojazd. Codziennie, od nowa.',
  'Wieczorem przepisuję dane z maila do systemu, z systemu do faktury. Ręcznie.',
  'Klient pisze o 22:00. Odpowiadam rano. Konkurencja czasem odpowiada szybciej.',
  'Wiem, że AI mogłoby pomóc. Tylko nie wiem od czego zacząć i boję się, że znowu przepalę budżet na coś, co nie zadziała.',
] as const;

/* Fluorescencyjne odcienie palety v4 (jak dotychczasowe CYTAT_ODCIEN w
   Problem.tsx) — 5 cytatów = 5 odcieni, zero dubli. Czysta dekoracja. */
const ODCIENIE = ['#67e8f9', '#a78bfa', '#f472b6', '#4ade80', '#fbbf24'] as const;

const N = CYTATY.length; // 5
const KROK = 360 / N; // 72° na cytat
const OKRES_MS = 4000; // auto-przełączenie ~4 s (spec)
const PROMIEN = 130; // px — promień bębna (sąsiedzi wychodzą za kadr 260 px)

/** Aktywny indeks z licznika obrotów (turn rośnie w nieskończoność — zawsze kręcimy do przodu). */
function aktywnyZ(turn: number): number {
  return ((turn % N) + N) % N;
}

export function CytatyWalec() {
  // Licznik obrotów (kumulatywny): rotacja koła = -turn * KROK, więc przejście
  // 5 -> 1 NIE cofa bębna, tylko kręci dalej w tę samą stronę.
  const [turn, setTurn] = useState(0);
  const [paused, setPaused] = useState(false);
  // lite: reduced-motion LUB mobile (breakpoint 760 px jak VoiceAura) — crossfade bez 3D.
  const [lite, setLite] = useState(false);

  const aktywny = aktywnyZ(turn);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px)');
    const apply = () => setLite(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Auto ~4 s. setTimeout zależny od `turn`: każdy klik kropki / auto-krok
  // resetuje odliczanie (użytkownik dostaje pełne 4 s na czytanie).
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setTurn((v) => v + 1), OKRES_MS);
    return () => window.clearTimeout(t);
  }, [paused, turn]);

  /** Skok do cytatu `cel` najkrótszą drogą DO PRZODU (bęben nigdy nie cofa). */
  function goTo(cel: number) {
    setTurn((t) => t + ((((cel - aktywnyZ(t)) % N) + N) % N));
  }

  return (
    /*
      Karta wzorca .inf-card (ciemna, obwódka, narożniki [ ], sweep z globals
      partii B/A). Pauza: hover myszy (desktop; na dotyku mouseenter potrafi
      „przykleić" pauzę po tapnięciu — stąd tylko gdy !lite) + focus w środku
      (kropki). overflow:hidden karty jest tu CELOWY: przycina sąsiednie
      cytaty bębna na krawędzi kadru (nic dekoracyjnego nie ma wystawać).
    */
    <div
      className="inf-card px-6 md:px-8"
      onMouseEnter={lite ? undefined : () => setPaused(true)}
      onMouseLeave={lite ? undefined : () => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      {/* Kadr bębna: zwarta wysokość ~260 px (px ARBITRALNIE — spacing repo to
          własne tokeny, h-9 = 96 px, pułapka!). perspective tylko w trybie 3D. */}
      <div
        className="relative h-[260px]"
        style={lite ? undefined : { perspective: '900px' }}
      >
        {lite ? (
          /* LITE: crossfade w stosie — aktywny opacity 1, reszta 0 (wszystkie
             w DOM dla botów/czytników; fade to jedyny dozwolony ruch w RM wg
             spec v5 §3). */
          <div className="absolute inset-0">
            {CYTATY.map((cytat, k) => (
              <blockquote
                key={k}
                className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 gap-4"
                style={{
                  opacity: k === aktywny ? 1 : 0,
                  transition: 'opacity 0.5s var(--ease-out)',
                }}
              >
                {/* Dekoracyjny glif „ w odcieniu cytatu (paleta jak dotąd). */}
                <span
                  aria-hidden="true"
                  className="select-none font-display text-[2.5rem] leading-[0.6]"
                  style={{ color: ODCIENIE[k % ODCIENIE.length] ?? 'var(--accent)' }}
                >
                  „
                </span>
                <p className="text-body-sm text-fg">{cytat}</p>
              </blockquote>
            ))}
          </div>
        ) : (
          /* 3D: koło preserve-3d obraca się rotateX o -turn*KROK; item k stoi
             na kole pod kątem k*KROK i translateZ(PROMIEN). Suma kątów = 0 dla
             aktywnego -> front. backface-visibility chowa cytaty „za bębnem",
             sąsiedzi (±72°) zostają przygaszeni i przycięci kadrem. */
          <div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${-turn * KROK}deg)`,
              transition: 'transform 0.7s var(--ease-out)',
            }}
          >
            {CYTATY.map((cytat, k) => (
              <blockquote
                key={k}
                className="absolute inset-x-0 top-1/2 flex gap-4"
                style={{
                  transform: `translateY(-50%) rotateX(${k * KROK}deg) translateZ(${PROMIEN}px)`,
                  backfaceVisibility: 'hidden',
                  opacity: k === aktywny ? 1 : 0.25,
                  transition: 'opacity 0.7s var(--ease-out)',
                }}
              >
                {/* Dekoracyjny glif „ w odcieniu cytatu (paleta jak dotąd). */}
                <span
                  aria-hidden="true"
                  className="select-none font-display text-[2.5rem] leading-[0.6]"
                  style={{ color: ODCIENIE[k % ODCIENIE.length] ?? 'var(--accent)' }}
                >
                  „
                </span>
                <p className="text-body-sm text-fg">{cytat}</p>
              </blockquote>
            ))}
          </div>
        )}
      </div>

      {/* Kropki-nawigacja (spec): przycisk = cel dotykowy 32 px, wizualna
          kropka 8 px w odcieniu swojego cytatu (aktywna: pełny kolor + glow;
          reszta: border-strong). Focus ring robi globalny :focus-visible.
          aria-label to instrumentacja a11y (nazwa kontrolki), nie treść marki. */}
      <div
        role="group"
        aria-label="Wybór cytatu"
        className="flex items-center justify-center gap-1 border-t border-border py-3"
      >
        {CYTATY.map((_, k) => {
          const odcien = ODCIENIE[k % ODCIENIE.length] ?? 'var(--accent)';
          const on = k === aktywny;
          return (
            <button
              key={k}
              type="button"
              onClick={() => goTo(k)}
              aria-label={`Cytat ${k + 1} z ${N}`}
              aria-current={on || undefined}
              className="flex h-8 w-8 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={
                  {
                    backgroundColor: on ? odcien : 'var(--border-strong)',
                    boxShadow: on ? `0 0 8px ${odcien}` : undefined,
                    transition: 'background-color 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out)',
                  } as CSSProperties
                }
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
