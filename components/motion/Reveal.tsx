'use client';

import { createElement, useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Reveal — scroll-reveal wejścia treści (spec 02 §5.2, biała lista).
 * fade + translateY(16px->0). Prowadzi wzrok w dół sekcja po sekcji do CTA.
 *
 * WERSJA CSS (bez framer-motion). Dwa tryby:
 *  • domyślny (poniżej folda): IntersectionObserver dokłada `data-reveal-shown`
 *    dopiero gdy element wejdzie w widok. Stan ukryty niesie `[data-reveal]`.
 *  • `eager` (NAD foldem, np. hero): animacja wejścia gra OD RAZU z CSS
 *    (@keyframes sfRevealIn), bez czekania na JS/IO. KLUCZOWE dla LCP — element
 *    jest malowany na starcie animacji (opacity rośnie od 0), więc LCP pada przy
 *    pierwszym malowaniu, a nie po hydracji. Bez tego akapit hero (element LCP)
 *    czekał na JS ~3 s (PageSpeed mobile: render delay 3150 ms).
 *
 * WAŻNE (GEO): to TYLKO wzbogacenie. Treść jest w HTML od razu (SSR), a
 * reduced-motion pokazuje ją natychmiast (override w globals.css). Bot AI / czytnik
 * widzą pełny tekst niezależnie od JS.
 */
type RevealProps = {
  as?: 'div' | 'li';
  children: ReactNode;
  /** Opóźnienie startu (s) — do staggera kolejnych elementów. */
  delay?: number;
  className?: string;
  /** NAD foldem: animacja od razu z CSS (bez IO), nie blokuje LCP. */
  eager?: boolean;
};

export function Reveal({ as = 'div', children, delay = 0, className, eager = false }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (eager) return; // CSS sam odpala wejście; brak IO
    const el = ref.current;
    if (!el) return;
    // reduced-motion: CSS i tak pokazuje od razu; nie obserwujemy.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  if (eager) {
    return createElement(
      as,
      {
        ref,
        'data-reveal-eager': '',
        className,
        style: delay ? { animationDelay: `${delay}s` } : undefined,
      },
      children
    );
  }

  return createElement(
    as,
    {
      ref,
      'data-reveal': '',
      ...(shown ? { 'data-reveal-shown': '' } : {}),
      className,
      style: delay ? { transitionDelay: `${delay}s` } : undefined,
    },
    children
  );
}
