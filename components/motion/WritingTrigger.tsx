'use client';

import { useEffect, useRef } from 'react';

/**
 * WritingTrigger — JEDYNY klient efektu pisania H1 (~20 linii, zero renderu
 * wizualnego: pusty aria-hidden span z display:none, nie wstrzykuje treści).
 *
 * Po mount: jeśli user NIE ma prefers-reduced-motion, obserwuje rodzica
 * H1[data-writing] i przy wejściu w widok JEDEN raz dodaje klasę `.is-writing`
 * (to ona uruchamia animacje per-litera w globals.css), po czym odłącza obserwatora.
 * Po zakończeniu pisania zdejmuje `.is-writing` (sprzątanie will-change; stan bazowy
 * clip-path:inset(0) trzyma napis czytelnym niezależnie).
 *
 * Gdy JS się nie wykona (albo reduced-motion) — `.is-writing` nigdy się nie pojawia,
 * a H1 zostaje w spoczynku = pełny, czytelny napis z gradientem marki. Fail-safe.
 */
export function WritingTrigger() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const h1 = ref.current?.closest('[data-writing]') as HTMLElement | null;
    if (!h1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (h1.dataset.written === '1') return;

    const start = () => {
      if (h1.dataset.written === '1') return;
      h1.dataset.written = '1';
      h1.classList.add('is-writing');
      const letters = h1.querySelectorAll('.sf-write-letter').length;
      const total = letters * 42 + 700; // ostatnia litera (delay) + ogon flasha
      window.setTimeout(() => h1.classList.remove('is-writing'), total + 200);
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
    return () => io.disconnect();
  }, []);

  return <span ref={ref} aria-hidden="true" style={{ display: 'none' }} />;
}
