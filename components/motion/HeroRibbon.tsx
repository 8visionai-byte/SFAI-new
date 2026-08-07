'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { computeLoopFrame, drawLoopFrame, loopPhases, type LoopFrame } from '@/lib/lemniskata';

/**
 * HeroRibbon — DESKTOPOWA animowana lemniskata 3D „pływające DNA" (spec
 * INFINITY v4 §PARTIA B pkt 1; nazwa pliku zostaje — kontrakt importu w
 * MotionOrchestrator). Vanilla canvas 2D, ZERO bibliotek.
 *
 * MATEMATYKA: w CAŁOŚCI z lib/lemniskata.ts (wspólny moduł: z-oplot
 * 0.55·sin(2t+φ), tilt 18°, projekcja perspektywiczna s=f/(f−zr), promień
 * 1.5→6px, alpha .35→1, fluorescencyjne #22d3ee/#ff007f) — ten plik tylko
 * hostuje canvas i pętlę rAF. Tryb glow=true: shadowBlur 12–14 na PRZEDNICH
 * kropkach (s>1); szczeble co 3. parę w kolorach nitek alpha .18 rysuje
 * drawLoopFrame. Nitki = 2×96 kropek. Ruch: tor 14 s + oplot 6 s + oddech ±2%.
 *
 * MONTAŻ: Hero.tsx renderuje slot <div data-hero-loop> ze STATYCZNYM SVG
 * (InfinityLoopStatic — pierwszy paint, reduced-motion). Ten komponent
 * (ładowany przez MotionOrchestrator za bramką MotionGate, długo po load)
 * ZNAJDUJE slot i portaluje do niego canvas absolute inset-0. Canvas wjeżdża
 * opacity 0→1 (1.2s), a SVG równolegle gaśnie 1→0 — OBIE podmiany INLINE w JS
 * (zero zależności od CSS innych partii, zero migniecia). Cleanup przywraca
 * SVG (np. nawigacja SPA). Brak slotu (podstrony bez hero) → nic nie robi.
 * MOBILE (<1024px) ma własny tor: HeroLoopLite (gate w Hero.tsx) — bramki
 * poniżej się wykluczają, nigdy dwa canvasy w slocie.
 *
 * KONTRAKT PERF: montowany wyłącznie przez MotionOrchestrator (osobny lazy
 * chunk) za bramką MotionGate; bramki zdublowane niżej (obrona w głąb).
 * DPR cap 1.5, pauza przy document.hidden, bufor klatki reużywany (zero GC).
 */

const DOT_COUNT = 96; // na nitkę (spec v4: 2×96)
const DPR_CAP = 1.5;
const FIND_TRIES = 60; // ~1s szukania slotu po re-montażu treści (template.tsx)

function motionAllowed(): boolean {
  if (!window.matchMedia('(min-width: 1024px)').matches) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return nav.connection?.saveData !== true;
}

export function HeroRibbon() {
  const pathname = usePathname();
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  /* ── Szukanie slotu [data-hero-loop] w hero (per ścieżka) ────────────────── */
  useEffect(() => {
    // BRAMKI ZDUBLOWANE (jak w orkiestratorze) — obrona w głąb.
    if (!motionAllowed()) return;

    let raf = 0;
    let tries = 0;

    const attach = () => {
      const el = document.querySelector<HTMLElement>('[data-hero-loop]');
      if (!el) {
        // template.tsx mógł jeszcze nie wmontować nowej treści — krótka pętla prób.
        tries += 1;
        if (tries < FIND_TRIES) raf = requestAnimationFrame(attach);
        return;
      }
      setSlot(el);
    };
    raf = requestAnimationFrame(attach);

    return () => {
      cancelAnimationFrame(raf);
      setSlot(null);
    };
  }, [pathname]);

  return slot ? createPortal(<LoopCanvas slot={slot} />, slot) : null;
}

/* ── Canvas lemniskaty — pętla rAF i crossfade z SVG ────────────────────────── */

function LoopCanvas({ slot }: { slot: HTMLElement }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    // Bufor klatki reużywany między klatkami — zero alokacji w pętli.
    const buf: LoopFrame = { a: [], b: [] };

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // Fazy + punkty + rysunek: wszystko ze wspólnego modułu (glow=true).
      const ph = loopPhases(now);
      computeLoopFrame({
        count: DOT_COUNT,
        w,
        h,
        track: ph.track,
        weave: ph.weave,
        breath: ph.breath,
        out: buf,
      });
      ctx.clearRect(0, 0, w, h);
      drawLoopFrame(ctx, w, buf, true);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (raf === 0) {
        raf = requestAnimationFrame(frame);
      }
    };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    /* CROSSFADE INLINE (zero zależności od CSS partii A): canvas startuje
       przezroczysty (styl w JSX), po pierwszej klatce wjeżdża 0→1 (1.2s),
       a statyczny SVG w slocie równolegle gaśnie — zero migniecia. */
    const svg = slot.querySelector<SVGSVGElement>('svg.inf-loop-static');
    const fadeRaf = requestAnimationFrame(() => {
      canvas.style.opacity = '1';
      if (svg) {
        svg.style.transition = 'opacity 1.2s ease';
        svg.style.opacity = '0';
      }
      slot.classList.add('inf-loop-live');
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fadeRaf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      // Przywróć statyczny SVG (nawigacja SPA / demontaż warstwy ruchu).
      if (svg) {
        svg.style.transition = '';
        svg.style.opacity = '';
      }
      slot.classList.remove('inf-loop-live');
    };
  }, [slot]);

  return (
    /* Overlay nad statycznym SVG w slocie (slot ma relative z Hero.tsx).
       Fade niesie styl inline (transition + opacity 0 → JS podnosi do 1). */
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="inf-loop-canvas absolute inset-0 h-full w-full"
      style={{ opacity: 0, transition: 'opacity 1.2s ease' }}
    />
  );
}
