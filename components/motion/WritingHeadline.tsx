import { Fragment } from 'react';
import type { CSSProperties } from 'react';
import { WritingTrigger } from './WritingTrigger';

/**
 * WritingHeadline — H1 hero: litery kolorowane per-glif gradientem marki, wejście
 * = MASZYNA DO PISANIA (przywrócona decyzją Pawła 2026-08-03 — sygnatura hero):
 * WritingTrigger (client island) dodaje .is-typing i odsłania litery kolejno
 * (48 ms/znak) z migającym kursorem. Stan bazowy w HTML = PEŁNY kolorowy napis,
 * więc no-JS / boty / reduced-motion widzą całość od razu (LCP-safe, cytowalność #1).
 * Podział na słowa + litery wykonuje się przy buildzie (SSG) i ląduje do surowego
 * HTML — konkatenacja zawartości spanów = dokładnie `text`.
 *
 * ŁAMANIE WIERSZA (naprawa „Agen / tów"): ciąg liter `display:inline-block` łamał się
 * na DOWOLNej literze, bo między atomowymi inline-block boxami jest punkt zawijania.
 * Dlatego litery KAŻDEGO słowa są opakowane w `.sf-write-word` (white-space:nowrap),
 * więc wyraz jest atomowy i nie pęka w środku. Wiersz łamie się TYLKO na spacjach
 * (osobne `.sf-write-space` między słowami). Indeks --i jest GLOBALNY (ciągły przez
 * całą frazę), więc przepływ koloru leci przez całe hasło, nie resetuje się na
 * granicy słowa.
 *
 * KOLOR (naprawa buga niewidzialnego H1): każda litera ma WŁASNY, SOLIDNY kolor jako
 * inline `style.color` (hex), interpolowany wzdłuż frazy blue → violet → green (jak
 * wordmark logo: Simple-niebieski → Fast-fiolet → .ai-zielony). Solidny `color`
 * renderuje się ZAWSZE (bez clip-text, bez text-fill:transparent), więc napis nie ma
 * jak zniknąć. globals.css dokłada identyczny color-mix(in oklab) z --i/--n jako
 * progresywne, gładsze ulepszenie; inline hex jest twardym fallbackiem i domyślnym
 * renderem.
 *
 * RUCH jest w globals.css (.sf-write-word): kaskada słów — każde słowo wjeżdża
 * z lekkim uniesieniem i rozmyciem (delay z indeksu słowa --w). Po wejściu H1 stoi
 * NIERUCHOMO (budżet ruchu redesignu). prefers-reduced-motion → napis od razu pełny.
 *
 * DOSTĘPNOŚĆ: aria-label = pełne zdanie jednym ciągiem; spany aria-hidden (czytnik
 * nie literuje znak po znaku). Array.from (nie split('')) — bezpiecznie dla glifów
 * wielobajtowych (np. „ó"). REVEAL: H1 NIE jest owijany w <Reveal> — kaskada JEST
 * revealem; stan bazowy litery (solidny color) trzyma napis czytelnym i kolorowym
 * nawet gdy JS/CSS zawiedzie albo przy reduced-motion.
 */

type RGB = readonly [number, number, number];

/* Stopy interpolacji: brand-blue #007BFF i brand-violet #7A35FF 1:1 z logo.
   ZIELEŃ POGŁĘBIONA #2FA500 (redesign „Precyzja cyrkla"): tło hero zostało JASNE
   na stałe (film usunięty), a ai-green #63F000 na paperze miał ~1.4:1 — nieczytelny.
   #2FA500 trzyma charakter zieleni marki i kontrast na jasnym tle (własna zasada
   tego pliku: przy jasnym tle pogłębiona zieleń). Ta sama wartość co w badge
   „Najczęściej wybierane" (Oferta) i w color-mix w globals.css — jedno źródło tonu. */
const STOP_BLUE: RGB = [0x00, 0x7b, 0xff];
const STOP_VIOLET: RGB = [0x7a, 0x35, 0xff];
const STOP_GREEN: RGB = [0x2f, 0xa5, 0x00];

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

  let i = -1; // GLOBALNY licznik liter (ciągły przez słowa; kolor pomija spacje)
  return (
    <h1
      aria-label={text}
      data-writing=""
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
          {/* Słowo atomowe — nie łamie się w środku (white-space:nowrap w CSS).
              --w = indeks słowa → delay kaskady wejścia (sfWordIn w globals.css). */}
          <span
            aria-hidden="true"
            className="sf-write-word"
            style={{ '--w': wIdx } as CSSProperties}
          >
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
      {/* Client island maszyny do pisania — zero renderu, tylko dyrygent klas. */}
      <WritingTrigger />
    </h1>
  );
}
