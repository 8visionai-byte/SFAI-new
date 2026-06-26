'use client';

import { useEffect, useRef } from 'react';

/**
 * WritingTrigger — maszyna do pisania H1 (jak w oknie czatu): po wejściu w widok
 * litery pojawiają się kolejno (klasa .typed), a tuż za ostatnią miga pionowy
 * kursor (.sf-caret). Płynnie, bez „kafelków" i bez neonowego flasha.
 *
 * Zero renderu wizualnego (pusty aria-hidden span, display:none). Reduced-motion =>
 * nic nie robi (napis od razu pełny). Gdy JS się nie wykona => napis też pełny i
 * czytelny (stan bazowy bez .is-typing). Fail-safe + GEO (tekst w DOM od początku).
 */
export function WritingTrigger() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const h1 = ref.current?.closest('[data-writing]') as HTMLElement | null;
    if (!h1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (h1.dataset.written === '1') return;

    const SPEED = 30; // ms na literę (szybko, jak szybkie pisanie w czacie)
    let timer = 0;

    const start = () => {
      if (h1.dataset.written === '1') return;
      h1.dataset.written = '1';
      const letters = Array.from(
        h1.querySelectorAll<HTMLElement>('.sf-write-letter')
      );
      if (letters.length === 0) return;

      h1.classList.add('is-typing'); // ukrywa jeszcze-nienapisane litery
      let i = 0;
      const step = () => {
        if (i > 0) letters[i - 1]?.classList.remove('sf-caret');
        if (i < letters.length) {
          const el = letters[i];
          if (el) el.classList.add('typed', 'sf-caret');
          i += 1;
          timer = window.setTimeout(step, SPEED);
        } else {
          // Koniec: kursor miga chwilę na końcu, potem wracamy do spoczynku.
          timer = window.setTimeout(() => {
            letters[letters.length - 1]?.classList.remove('sf-caret');
            h1.classList.remove('is-typing');
          }, 1400);
        }
      };
      step();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            start();
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.25 }
    );
    io.observe(h1);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return <span ref={ref} aria-hidden="true" style={{ display: 'none' }} />;
}
