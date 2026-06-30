'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollMetalProgress — cienki, metaliczny pasek postępu czytania na samej górze
 * okna. Przy scrollu rośnie od 0 do 100% szerokości, w kolorze marki. Subtelnie
 * prowadzi wzrok w dół (do CTA #diagnoza).
 *
 * WERSJA bez framer-motion: pasywny listener scrolla + jeden rAF (coalesced) ustawia
 * scaleX; wygładzenie „sprężyny" robi `transition: transform` (.sf-scroll-progress).
 * Brak wiecznej pętli rAF = znikomy koszt na mobile.
 *
 * ZASADY: DEKORACJA (aria-hidden, pointer-events:none, fixed). reduced-motion =>
 * pasek się nie renderuje. Client island — przy SSR/botach po prostu go nie ma.
 */
export function ScrollMetalProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setEnabled(false);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="bg-metal-decor pointer-events-none fixed inset-x-0 top-0 z-toast h-[3px] origin-left sf-scroll-progress"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
