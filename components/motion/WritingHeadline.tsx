import type { CSSProperties } from 'react';
import { WritingTrigger } from './WritingTrigger';

/**
 * WritingHeadline — H1 hero pisany LITERA PO LITERZE (efekt długopisu z wędrującym
 * neonowym błyskiem). SERVER component: podział na spany per-znak wykonuje się przy
 * buildzie (SSG) i ląduje do surowego HTML, więc konkatenacja zawartości spanów =
 * dokładnie `text` (boty/LLM czytają normalny tekst, cytowalność #1).
 *
 * KOLOR i RUCH są w globals.css (.sf-write*): gradient marki jest CIĄGŁY na całym
 * H1 (clip-text na rodzicu), a spany dziedziczą przezroczysty fill i animują tylko
 * własne wejście (clip-reveal) + błysk. Spacje to osobne spany (utrzymują odstępy;
 * są zwykłym inline, więc wiersz zawija się naturalnie na granicy słowa — ważne na
 * mobile). Indeks --i rośnie TYLKO dla znaków niebiałych, więc pióro nie „przystaje"
 * na spacjach i wędrujący flash ma równy rytm.
 *
 * DOSTĘPNOŚĆ: aria-label podaje czytnikom pełne zdanie jednym ciągiem; spany są
 * aria-hidden (czytnik nie literuje znak po znaku). Array.from (nie split('')) —
 * bezpieczny nawyk dla glifów wielobajtowych (np. „ó").
 *
 * REVEAL: ten nagłówek NIE jest owijany w <Reveal> — pisanie JEST revealem. Stan
 * spoczynku spanu = pełna, czytelna litera (clip-path:inset(0)), więc gdy JS/CSS
 * zawiedzie albo przy reduced-motion napis i tak stoi czytelny (zero znikania).
 */
export function WritingHeadline({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  let i = -1; // licznik tylko dla znaków niebiałych (pióro pomija spacje)
  return (
    <h1 data-writing aria-label={text} className={`sf-write ${className}`}>
      {Array.from(text).map((ch, idx) => {
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
            style={{ '--i': i } as CSSProperties}
          >
            {ch}
          </span>
        );
      })}
      <WritingTrigger />
    </h1>
  );
}
