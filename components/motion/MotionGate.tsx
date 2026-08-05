'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/**
 * MotionGate — mikro-bramka warstwy ruchu (Lenis + GSAP).
 *
 * PO CO OSOBNY PLIK: sam MotionOrchestrator (choreografie, ~kilka KB) siedział
 * w chunku layoutu, więc MOBILE parsowało jego kod mimo że bramki wewnątrz
 * nigdy go nie uruchamiały — pomiar A/B (Lighthouse localhost, 2 przebiegi)
 * pokazał koszt ~2-3 pkt / +70 ms TBT. Ten plik trzyma w layoucie TYLKO bramkę
 * (kilkanaście linii); orkiestrator jest w osobnym lazy chunku (next/dynamic),
 * którego mobile / reduced-motion / Save-Data NIGDY nie pobiera.
 *
 * Bramki celowo ZDUBLOWANE (tu i w orkiestratorze) — obrona w głąb: gdyby ktoś
 * kiedyś zamontował orkiestrator bezpośrednio, sam też odmówi startu.
 */
const MotionOrchestrator = dynamic(
  () => import('./MotionOrchestrator').then((m) => m.MotionOrchestrator),
  { ssr: false }
);

export function MotionGate() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    if (!desktop || reduce || saveData) return;

    // Chunk orkiestratora dopiero PO window.load (nie konkuruje z LCP o pasmo).
    const arm = () => setOn(true);
    if (document.readyState === 'complete') {
      arm();
    } else {
      window.addEventListener('load', arm, { once: true });
      return () => window.removeEventListener('load', arm);
    }
    return undefined;
  }, []);

  return on ? <MotionOrchestrator /> : null;
}
