'use client';

import { useEffect, useRef, useState } from 'react';
import type { LoopFrame } from '@/lib/lemniskata';

/**
 * HeroLoopLite — MOBILNA animowana lemniskata 3D (spec INFINITY v4 §PARTIA B
 * pkt 3; nowy budżet ŻELAZNYCH v4: mobile ma prawo do 2 LEKKICH canvasów).
 * Renderowany przez Hero.tsx BEZPOŚREDNIO w slocie [data-hero-loop] (obok
 * statycznego SVG) — zero portalu, zero szukania slotu.
 *
 * BUDŻET LITE (kontrakt ŻELAZNYCH v4, każdy punkt niżej w kodzie):
 *  - bramka: TYLKO <1024px && !prefers-reduced-motion (+ Save-Data z szacunku
 *    dla transferu — konwencja repo, MotionGate ma tę samą bramkę),
 *  - start po window.load + requestIdleCallback (nie konkuruje z LCP),
 *  - matematyka+rysunek DYNAMICZNYM importem z lib/lemniskata.ts → osobny
 *    lazy chunk; w bundlu hero siedzi tylko ta mikrobramka,
 *  - 2×48 kropek, DPR 1, BEZ shadowBlur (glow = druga większa kropka alpha .18
 *    — tryb glow=false w drawLoopFrame), 30 fps przez frame-skip,
 *  - PAUZA: slot poza viewportem (IntersectionObserver) i document.hidden.
 * Desktop (≥1024px) ma własny tor: HeroRibbon przez MotionOrchestrator —
 * bramki się wykluczają, nigdy dwa canvasy w slocie.
 * Reduced-motion / desktop: komponent nie montuje NIC — zostaje statyczny SVG.
 */

const DOT_COUNT = 48; // na nitkę (spec v4 lite: 2×48)
const FRAME_MIN_MS = 31; // frame-skip → ~30 fps na ekranach 60 Hz

function liteAllowed(): boolean {
  if (window.matchMedia('(min-width: 1024px)').matches) return false; // desktop = HeroRibbon
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return nav.connection?.saveData !== true;
}

export function HeroLoopLite() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!('matchMedia' in window) || !liteAllowed()) return;

    let cancelled = false;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    // Start DOPIERO po window.load, potem w slocie idle (fallback 200ms) —
    // wzorzec 1:1 z MotionOrchestrator; chunk matematyki nie dotyka LCP.
    const whenIdle = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => {
          if (!cancelled) setOn(true);
        });
      } else {
        timeoutId = setTimeout(() => {
          if (!cancelled) setOn(true);
        }, 200);
      }
    };
    if (document.readyState === 'complete') {
      whenIdle();
    } else {
      window.addEventListener('load', whenIdle, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', whenIdle);
      if (idleId !== null) window.cancelIdleCallback(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, []);

  return on ? <LiteCanvas /> : null;
}

/* ── Lekki canvas: 30 fps, DPR 1, pauza IO/hidden, crossfade z SVG ──────────── */

function LiteCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let disposed = false;
    let raf = 0;
    let w = 0;
    let h = 0;
    let inView = true;
    let last = 0;
    let faded = false;
    let svg: SVGSVGElement | null = null;
    // Moduł matematyki po dynamic imporcie; bufor klatki reużywany (zero GC).
    let mod: typeof import('@/lib/lemniskata') | null = null;
    const buf: LoopFrame = { a: [], b: [] };

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      // DPR 1 (kontrakt lite) — backing store = wymiary CSS.
      canvas.width = Math.max(1, Math.round(w));
      canvas.height = Math.max(1, Math.round(h));
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // Frame-skip do ~30 fps: rysujemy najwcześniej co 31 ms.
      if (now - last < FRAME_MIN_MS) return;
      last = now;
      const m = mod;
      if (!m) return;
      const ph = m.loopPhases(now);
      m.computeLoopFrame({
        count: DOT_COUNT,
        w,
        h,
        track: ph.track,
        weave: ph.weave,
        breath: ph.breath,
        out: buf,
      });
      ctx.clearRect(0, 0, w, h);
      m.drawLoopFrame(ctx, w, buf, false); // glow=false: bez shadowBlur
      // Crossfade DOPIERO po pierwszej narysowanej klatce (zero migniecia):
      // canvas 0→1, statyczny SVG gaśnie — inline, bez CSS innych partii.
      if (!faded) {
        faded = true;
        canvas.style.opacity = '1';
        svg = canvas.parentElement?.querySelector<SVGSVGElement>('svg.inf-loop-static') ?? null;
        if (svg) {
          svg.style.transition = 'opacity 1.2s ease';
          svg.style.opacity = '0';
        }
      }
    };

    const play = () => {
      if (raf === 0 && inView && !document.hidden && mod !== null) {
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    // PAUZA: karta w tle…
    const onVisibility = () => (document.hidden ? stop() : play());
    document.addEventListener('visibilitychange', onVisibility);
    // …oraz slot poza viewportem (hero przewinięte w górę = zero pracy CPU).
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      inView = entry.isIntersecting;
      if (inView) play();
      else stop();
    });
    io.observe(canvas);

    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);

    // Matematyka w osobnym chunku — pobierana już PO load+idle (bramka wyżej).
    void import('@/lib/lemniskata').then((m) => {
      if (disposed) return;
      mod = m;
      play();
    });

    return () => {
      disposed = true;
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      // Przywróć statyczny SVG (nawigacja SPA / demontaż).
      if (svg) {
        svg.style.transition = '';
        svg.style.opacity = '';
      }
    };
  }, []);

  return (
    /* Overlay nad statycznym SVG w slocie (slot ma relative + aria-hidden
       z Hero.tsx). Fade inline: transition + opacity 0 → JS podnosi do 1. */
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0, transition: 'opacity 1.2s ease' }}
    />
  );
}
