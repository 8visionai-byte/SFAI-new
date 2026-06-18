import type { CSSProperties } from 'react';
import { WritingTrigger } from './WritingTrigger';

/**
 * WritingHeadline — H1 hero pisany LITERA PO LITERZE (efekt długopisu z wędrującym
 * neonowym błyskiem). SERVER component: podział na spany per-znak wykonuje się przy
 * buildzie (SSG) i ląduje do surowego HTML, więc konkatenacja zawartości spanów =
 * dokładnie `text` (boty/LLM czytają normalny tekst, cytowalność #1).
 *
 * KOLOR (nowy model — naprawa buga niewidzialnego H1):
 * Każda litera dostaje WŁASNY, SOLIDNY kolor jako inline `style.color` (hex). Kolor
 * jest interpolowany wzdłuż frazy blue → violet → green (jak wordmark logo):
 * Simple-niebieski → Fast-fiolet → .ai-zielony. Solidny `color` na spanie renderuje
 * się ZAWSZE — bez clip-text, bez text-fill:transparent, bez zależności od malowania
 * przez rodzica. To eliminuje cały bug: background-clip:text na H1 NIE malowało przez
 * inline-block dzieci, więc litery były przezroczyste i napis znikał w spoczynku.
 *
 * Dwa źródła koloru (oba dają ten sam efekt, redundancja = zero ryzyka znikania):
 *   1. inline `color` z hexa policzonego server-side (sRGB lerp) — działa wszędzie,
 *      także bez color-mix; to jest twarda gwarancja widoczności.
 *   2. dodatkowo eksportujemy `--i` (indeks litery) i `--n` (liczba liter) na H1,
 *      z których globals.css może liczyć identyczny kolor przez color-mix(in oklab)
 *      jako progresywne ulepszenie / rytm flasha. inline color jest fallbackiem
 *      i jednocześnie domyślnym renderem.
 *
 * RUCH jest w globals.css (.sf-write*): pisanie = clip-path reveal + stagger, a za
 * czubkiem pióra mocny neon flash (drop-shadow nad już-czytelną, solidną literą).
 * Spacje to osobne spany inline (utrzymują odstępy; zawijanie na granicy słowa na
 * mobile). Indeks --i rośnie TYLKO dla znaków niebiałych, więc pióro nie „przystaje"
 * na spacjach, a interpolacja koloru rozkłada się równo na widoczne litery.
 *
 * DOSTĘPNOŚĆ: aria-label podaje czytnikom pełne zdanie jednym ciągiem; spany są
 * aria-hidden (czytnik nie literuje znak po znaku). Array.from (nie split('')) —
 * bezpieczny nawyk dla glifów wielobajtowych (np. „ó").
 *
 * REVEAL: ten nagłówek NIE jest owijany w <Reveal> — pisanie JEST revealem. Stan
 * spoczynku spanu = pełna, czytelna, KOLOROWA litera (clip-path:inset(0) + solidny
 * color), więc gdy JS/CSS zawiedzie albo przy reduced-motion napis i tak stoi
 * czytelny i kolorowy (zero znikania, zero CLS).
 */

/* Stopy interpolacji = AA-bezpieczne stopnie tekstowe marki na paper #fbfaf8
   (te same wartości co --metal-blue/violet/green w :root):
     blue-700   #1d4ed8  → 6.42:1
     violet-700 #6d28d9  → 6.81:1
     emerald-700#047857  → 5.26:1  (zieleń pogłębiona „pod .ai", zachowuje AA ≥3:1)
   Każdy interpolowany środek (sRGB lerp, dwa segmenty) ma ≥5.26:1 na paper. */
const STOP_BLUE: RGB = [0x1d, 0x4e, 0xd8];
const STOP_VIOLET: RGB = [0x6d, 0x28, 0xd9];
const STOP_GREEN: RGB = [0x04, 0x78, 0x57];

type RGB = readonly [number, number, number];

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
  const chars = Array.from(text);
  // N = liczba znaków niebiałych (liter pisanych). Potrzebne do interpolacji koloru
  // (ułamek pozycji i/(N-1)) ORAZ do CSS color-mix przez --n.
  const n = chars.reduce((acc, ch) => (ch === ' ' ? acc : acc + 1), 0);

  let i = -1; // licznik tylko dla znaków niebiałych (pióro pomija spacje)
  return (
    <h1
      data-writing
      aria-label={text}
      className={`sf-write ${className}`}
      style={{ '--n': n } as CSSProperties}
    >
      {chars.map((ch, idx) => {
        if (ch === ' ') {
          return (
            <span key={idx} aria-hidden="true" className="sf-write-space">
              {' '}
            </span>
          );
        }
        i += 1;
        return (
          <span
            key={idx}
            aria-hidden="true"
            className="sf-write-letter"
            style={
              {
                '--i': i,
                // SOLIDNY kolor litery — twarda gwarancja widoczności (renderuje się
                // zawsze, niezależnie od wsparcia color-mix). globals.css może to
                // nadpisać identycznym color-mix(in oklab) jako progresywne ulepszenie.
                color: letterColor(i, n),
              } as CSSProperties
            }
          >
            {ch}
          </span>
        );
      })}
      <WritingTrigger />
    </h1>
  );
}
