import { Fragment } from 'react';
import type { CSSProperties } from 'react';
import { WritingTrigger } from './WritingTrigger';

/**
 * WritingHeadline — H1 hero pisany LITERA PO LITERZE (efekt długopisu z wędrującym
 * neonowym błyskiem). SERVER component: podział na słowa + litery wykonuje się przy
 * buildzie (SSG) i ląduje do surowego HTML, więc konkatenacja zawartości spanów =
 * dokładnie `text` (boty/LLM czytają normalny tekst, cytowalność #1).
 *
 * ŁAMANIE WIERSZA (naprawa „Agen / tów"): ciąg liter `display:inline-block` łamał się
 * na DOWOLNej literze, bo między atomowymi inline-block boxami jest punkt zawijania.
 * Dlatego litery KAŻDEGO słowa są opakowane w `.sf-write-word` (white-space:nowrap),
 * więc wyraz jest atomowy i nie pęka w środku. Wiersz łamie się TYLKO na spacjach
 * (osobne `.sf-write-space` między słowami). Indeks --i jest GLOBALNY (ciągły przez
 * całą frazę), więc stagger pisania i przepływ koloru lecą przez całe hasło, nie
 * resetują się na granicy słowa.
 *
 * KOLOR (naprawa buga niewidzialnego H1): każda litera ma WŁASNY, SOLIDNY kolor jako
 * inline `style.color` (hex), interpolowany wzdłuż frazy blue → violet → green (jak
 * wordmark logo: Simple-niebieski → Fast-fiolet → .ai-zielony). Solidny `color`
 * renderuje się ZAWSZE (bez clip-text, bez text-fill:transparent), więc napis nie ma
 * jak zniknąć. globals.css dokłada identyczny color-mix(in oklab) z --i/--n jako
 * progresywne, gładsze ulepszenie; inline hex jest twardym fallbackiem i domyślnym
 * renderem.
 *
 * RUCH jest w globals.css (.sf-write*): pisanie = clip-path reveal + stagger (--i), a
 * za czubkiem pióra mocny neon flash (drop-shadow nad już-czytelną, solidną literą).
 *
 * DOSTĘPNOŚĆ: aria-label = pełne zdanie jednym ciągiem; spany aria-hidden (czytnik
 * nie literuje znak po znaku). Array.from (nie split('')) — bezpiecznie dla glifów
 * wielobajtowych (np. „ó"). REVEAL: H1 NIE jest owijany w <Reveal> — pisanie JEST
 * revealem; stan spoczynku litery (clip-path:inset(0) + solidny color) trzyma napis
 * czytelnym i kolorowym nawet gdy JS/CSS zawiedzie albo przy reduced-motion.
 */

type RGB = readonly [number, number, number];

/* Stopy interpolacji = AA-bezpieczne stopnie tekstowe marki na paper #fbfaf8
   (te same wartości co --metal-blue/violet/green w :root):
     blue-700   #1d4ed8  → 6.42:1
     violet-700 #6d28d9  → 6.81:1
     emerald-700#047857  → 5.26:1  (zieleń pogłębiona „pod .ai", zachowuje AA ≥3:1)
   Każdy interpolowany środek (sRGB lerp, dwa segmenty) ma ≥5.26:1 na paper. */
const STOP_BLUE: RGB = [0x1d, 0x4e, 0xd8];
const STOP_VIOLET: RGB = [0x6d, 0x28, 0xd9];
const STOP_GREEN: RGB = [0x04, 0x78, 0x57];

function mix(a: RGB, b: RGB, t: number): string {
  const ch = (i: 0 | 1 | 2) => Math.round(a[i] + (b[i] - a[i]) * t);
  const hex = (v: number) => v.toString(16).padStart(2, '0');
  return `#${hex(ch(0))}${hex(ch(1))}${hex(ch(2))}`;
}

/** Kolor litery o pozycji i (0..n-1): dwusegmentowy lerp blue→violet→green.
 *  Pierwsza połowa frazy blue→violet, druga violet→green. n=1 → fiolet (środek). */
function letterColor(i: number, n: number): string {
  if (n <= 1) return mix(STOP_BLUE, STOP_GREEN, 0.5); // degeneracja: środek brandu
  const t = i / (n - 1); // 0..1 wzdłuż frazy
  return t <= 0.5
    ? mix(STOP_BLUE, STOP_VIOLET, t / 0.5)
    : mix(STOP_VIOLET, STOP_GREEN, (t - 0.5) / 0.5);
}

export function WritingHeadline({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  // Słowa rozdzielone pojedynczą spacją (hasło hero nie ma podwójnych spacji).
  const words = text.split(' ');
  // N = liczba wszystkich znaków niebiałych (liter pisanych) w całej frazie. Potrzebne
  // do interpolacji koloru (ułamek i/(N-1)) ORAZ do CSS color-mix przez --n.
  const n = words.reduce((acc, w) => acc + Array.from(w).length, 0);

  let i = -1; // GLOBALNY licznik liter (ciągły przez słowa; pióro pomija spacje)
  return (
    <h1
      data-writing
      aria-label={text}
      className={`sf-write ${className}`}
      style={{ '--n': n } as CSSProperties}
    >
      {words.map((word, wIdx) => (
        <Fragment key={wIdx}>
          {/* Spacja-punkt-zawijania między słowami (nie przed pierwszym). */}
          {wIdx > 0 && (
            <span aria-hidden="true" className="sf-write-space">
              {' '}
            </span>
          )}
          {/* Słowo atomowe — nie łamie się w środku (white-space:nowrap w CSS). */}
          <span aria-hidden="true" className="sf-write-word">
            {Array.from(word).map((ch, cIdx) => {
              i += 1;
              return (
                <span
                  key={cIdx}
                  aria-hidden="true"
                  className="sf-write-letter"
                  style={
                    {
                      '--i': i,
                      // SOLIDNY kolor litery — twarda gwarancja widoczności.
                      color: letterColor(i, n),
                    } as CSSProperties
                  }
                >
                  {ch}
                </span>
              );
            })}
          </span>
        </Fragment>
      ))}
      <WritingTrigger />
    </h1>
  );
}
