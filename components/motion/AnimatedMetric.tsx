'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * AnimatedMetric — licznik count-up od 0 do wartości docelowej (spec 02 §5.2).
 *
 * BRAMKA GEO/A11y: wartość docelowa (`children`, np. "23" albo "140 h") jest
 * w surowym HTML jako tekst dziecka. JS tylko animuje od 0 po wejściu w viewport.
 * Bot AI / czytnik / brak-JS widzą finalną liczbę, nie "0". Przy reduced-motion
 * licznik w ogóle nie startuje — od razu wartość finalna.
 *
 * Parsuje liczbę z `value` (obsługuje prefiks/suffix jak "−40%", "140 h", "7 dni").
 */
type AnimatedMetricProps = {
  /** Pełny napis widoczny w HTML, np. "140 h" lub "−40%". */
  value: string;
  className?: string;
  /** Czas trwania animacji w ms. */
  durationMs?: number;
};

function parseMetric(value: string) {
  // Wyłuskaj pierwszą liczbę (z opcjonalnym minusem/kropką/przecinkiem)
  const match = value.match(/-?\d+(?:[.,]\d+)?/);
  if (!match) return null;
  const raw = match[0];
  const numeric = parseFloat(raw.replace(',', '.'));
  if (Number.isNaN(numeric)) return null;
  const decimals = raw.includes('.') || raw.includes(',') ? 1 : 0;
  const start = match.index ?? 0;
  return {
    numeric,
    decimals,
    prefix: value.slice(0, start),
    suffix: value.slice(start + raw.length),
  };
}

export function AnimatedMetric({ value, className, durationMs = 1200 }: AnimatedMetricProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const parsed = parseMetric(value);
  const [display, setDisplay] = useState(() => (reduce || !parsed ? value : null));

  useEffect(() => {
    if (reduce || !parsed || !inView) return;
    let raf = 0;
    const startTime = performance.now();
    const { numeric, decimals, prefix, suffix } = parsed;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / durationMs);
      // easeOutExpo dla "premium" wytracenia
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = numeric * eased;
      const formatted = current.toLocaleString('pl-PL', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, parsed, durationMs, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {/* Treść SSR = wartość finalna (widoczna bez JS / dla bota AI). */}
      <span aria-hidden={display !== value}>{display ?? value}</span>
    </span>
  );
}
