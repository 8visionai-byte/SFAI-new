'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * ScrambleText — „rozpadające się napisy" (spec INFINITY v4 §PARTIA D pkt 2).
 * PORT ZASAD 1:1 z 10K site.js (~150-215): dekodowanie glifami na hover/focus,
 * retrigger dopiero PO zakończeniu bieżącego przebiegu (WeakMap timerów),
 * zamrożenie layoutu na czas przebiegu (inline height + overflow:clip +
 * min-width — losowe glify mają różne szerokości, bez blokady strona „skakała").
 *
 * BRAMKI 1:1 (dyktando Pawła w site.js): scramble WYŁĄCZNIE gdy
 * !reduced-motion && !(max-width:760px / pointer:coarse) && pointer:fine.
 * Dotyk/mobile = napis statyczny (zero skakania, zero kosztu).
 *
 * UŻYCIE: <ScrambleText>Etykieta</ScrambleText> — samowystarczalny wrap
 * (partie A/C tylko owijają istniejące stringi; komponent NIE tworzy treści).
 * SSR renderuje pełny tekst w DOM (boty/czytniki widzą treść bez JS).
 * Trigger = najbliższy przodek <a>/<button> (sam napis to za mały cel dla
 * myszy — zasada z site.js), fallback: sam span.
 *
 * CZAS: ~500 ms na pełne dekodowanie NIEZALEŻNIE od długości (spec v4;
 * w 10K dłuższe teksty też składały się szybciej na znak — ta sama idea,
 * inna stała). Krok rAF z akumulatorem ~56 ms jak w źródle (bez dryfu).
 */

/* Glify 1:1 z site.js. */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+-<>[]';
/* Tempo kroku 1:1 z site.js (~56 ms); całość ~500 ms (spec v4). */
const STEP_MS = 56;
const TOTAL_MS = 500;

/* WeakMap timerów 1:1 ze źródła — jeden przebieg na element naraz,
   wpisy znikają same z elementem (zero wycieków przy nawigacji SPA). */
const timers = new WeakMap<HTMLElement, number>();

/* Bramka globalna 1:1 z site.js (liczona leniwie przy triggerze — matchMedia
   jest tanie, a wynik zawsze świeży np. po obrocie ekranu). */
function scrambleAllowed(): boolean {
  if (typeof window === 'undefined' || !('matchMedia' in window)) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(max-width: 760px), (pointer: coarse)').matches) return false;
  return window.matchMedia('(pointer: fine)').matches;
}

/* Przebieg dekodowania — port runScramble z site.js (struktura zachowana). */
function runScramble(element: HTMLElement): void {
  if (!scrambleAllowed()) return;
  // Retrigger dozwolony dopiero PO zakończeniu bieżącego przebiegu.
  if (timers.has(element)) return;
  const original = element.dataset.scrambleOriginal ?? element.textContent?.trim() ?? '';
  if (!original) return;
  element.dataset.scrambleOriginal = original;
  element.setAttribute('aria-label', original);
  element.setAttribute('aria-live', 'off');
  if (!element.style.minWidth) {
    element.style.minWidth = `${Math.ceil(element.getBoundingClientRect().width)}px`;
  }
  // Zamrożenie layoutu (patrz nagłówek pliku) — schodzi po przebiegu.
  element.style.height = `${element.offsetHeight}px`;
  element.style.overflow = 'clip';
  // Znaki „składane" na krok tak, by całość trwała ~TOTAL_MS.
  const steps = Math.max(1, Math.round(TOTAL_MS / STEP_MS));
  const rate = original.length / steps;
  let start: number | null = null;
  let lastFrame = -1;
  const stepFn = (time: number) => {
    if (start === null) start = time;
    const frame = Math.floor((time - start) / STEP_MS);
    if (frame === lastFrame) {
      timers.set(element, window.requestAnimationFrame(stepFn));
      return;
    }
    lastFrame = frame;
    const resolved = Math.floor(frame * rate);
    element.textContent = [...original]
      .map((character, index) => {
        if (/\s/.test(character) || index < resolved) return character;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? character;
      })
      .join('');
    if (resolved >= original.length) {
      element.textContent = original;
      timers.delete(element);
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      return;
    }
    timers.set(element, window.requestAnimationFrame(stepFn));
  };
  timers.set(element, window.requestAnimationFrame(stepFn));
}

type ScrambleTextProps = {
  /** Tekst do dekodowania — ISTNIEJĄCY string (komponent nie tworzy treści). */
  children: ReactNode;
  className?: string;
};

export function ScrambleText({ children, className }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Trigger = cały link/przycisk (zasada z site.js: element.closest('a, button')).
    const trigger = (el.closest('a, button') ?? el) as HTMLElement;
    const onEnter = () => runScramble(el);
    trigger.addEventListener('pointerenter', onEnter);
    trigger.addEventListener('focus', onEnter);
    return () => {
      trigger.removeEventListener('pointerenter', onEnter);
      trigger.removeEventListener('focus', onEnter);
      // Demontaż w trakcie przebiegu: zatrzymaj rAF i przywróć oryginał
      // (React nie wie o naszych mutacjach textContent).
      const id = timers.get(el);
      if (id !== undefined) {
        window.cancelAnimationFrame(id);
        timers.delete(el);
        el.style.removeProperty('height');
        el.style.removeProperty('overflow');
        const original = el.dataset.scrambleOriginal;
        if (original) el.textContent = original;
      }
    };
  }, []);

  return (
    // inline-block: żeby inline height/min-width (zamrożenie layoutu) działały.
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {children}
    </span>
  );
}
