'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';

/**
 * HeroRibbon — ANIMOWANA lemniskata Bernoulliego hero (spec INFINITY v3 §HERO
 * pkt 3; nazwa pliku zostaje — kontrakt importu w MotionOrchestrator).
 * Vanilla canvas 2D, ZERO bibliotek.
 *
 * MONTAŻ: Hero.tsx (partia B) renderuje slot <div data-hero-loop> ze STATYCZNYM
 * SVG lemniskaty (InfinityLoopStatic — pierwszy paint, mobile, reduced-motion).
 * Ten komponent (ładowany przez MotionOrchestrator za bramką MotionGate, długo
 * po load) ZNAJDUJE slot i portaluje do niego canvas absolute inset-0. Canvas
 * wjeżdża opacity 0→1 (1.2s), a SVG równolegle gaśnie 1→0 — OBIE podmiany robimy
 * INLINE w JS (zero zależności od CSS innych partii, zero migniecia: przez cały
 * crossfade coś jest widoczne). Cleanup przywraca SVG (np. nawigacja SPA).
 * Brak slotu (podstrony bez hero) → komponent nic nie robi.
 *
 * MATEMATYKA (1:1 ze statycznym SVG — te same stałe skali 430/940 i 520/420):
 * x = cos t/(1+sin²t), y = sin t·cos t/(1+sin²t); dwie nitki po 110 kropek,
 * fazy przesunięte o π; kolory cyan #22d3ee i magenta #ff007f; pseudo-głębia
 * k=(cos t+1)/2 → promień 2.5–3.5, alpha .5–.9; glow shadowBlur 10 co 3. kropkę;
 * co 6. para kropek połączona linią rgba(255,255,255,.08) („drabinka DNA").
 * RUCH: faza płynie ~16 s/obieg + oddech skali ±2% w cyklu 8 s.
 *
 * KONTRAKT PERF: montowany wyłącznie przez MotionOrchestrator (osobny lazy
 * chunk) za bramką MotionGate; bramki zdublowane niżej (obrona w głąb). DPR cap
 * 1.5, pauza przy document.hidden, dwa przebiegi głębi (tył→przód) — nitki
 * realnie się przeplatają.
 */

const DOT_COUNT = 110; // na nitkę
const CYCLE_MS = 16000; // pełny obieg fazy
const BREATH_MS = 8000; // cykl oddechu skali
const BREATH_AMP = 0.02; // ±2%
const DPR_CAP = 1.5;
const TAU = Math.PI * 2;
const CYAN = '#22d3ee';
const MAGENTA = '#ff007f';
const LINK_STROKE = 'rgba(255, 255, 255, 0.08)';
/* Skale toru 1:1 z InfinityLoopStatic (SVG 940x420: pół-szerokość 430,
   rozciąg pionu 520) — canvas liczy je z bieżących wymiarów slotu. */
const SCALE_X = 430 / 940;
const SCALE_Y = 520 / 420;
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

/* ── Canvas lemniskaty — rysowanie, pętla rAF i crossfade z SVG ─────────────── */

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

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** Pozycja na lemniskacie dla parametru t + strona oplotu (sign ±1).
        OPLOT jak w InfinityLoopStatic: bez niego nitka przesunięta o π pokrywa
        te same punkty toru (środkowa symetria lemniskaty) i nakrywa pierwszą. */
    const pos = (t: number, scale: number, sign: number): { x: number; y: number } => {
      const s = Math.sin(t);
      const c = Math.cos(t);
      const d = 1 + s * s;
      const wobble = sign * (9 / 420) * h * Math.sin(3 * t);
      return {
        x: w / 2 + (c / d) * w * SCALE_X * scale,
        y: h / 2 + ((s * c) / d) * h * SCALE_Y * scale + wobble,
      };
    };

    /** „Drabinka DNA": co 6. para kropek obu nitek połączona cienką linią. */
    const links = (phase: number, scale: number) => {
      ctx.strokeStyle = LINK_STROKE;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      for (let i = 0; i < DOT_COUNT; i += 6) {
        const t = (i / DOT_COUNT) * TAU + phase;
        // Szczebel drabinki: TEN SAM t, przeciwne strony oplotu (jak w SVG).
        const a = pos(t, scale, 1);
        const b = pos(t, scale, -1);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();
    };

    /** Jedna nitka w jednym przebiegu głębi (back: tylko kropki „z tyłu"). */
    const strand = (phase: number, sign: number, color: string, scale: number, back: boolean) => {
      ctx.fillStyle = color;
      for (let i = 0; i < DOT_COUNT; i++) {
        const t = (i / DOT_COUNT) * TAU + phase;
        const depth = Math.cos(t); // -1 tył … +1 przód (pseudo-3D, jak w SVG)
        if (back ? depth >= 0 : depth < 0) continue;
        const k = (depth + 1) / 2; // 0..1
        const p = pos(t, scale, sign);
        ctx.globalAlpha = 0.5 + 0.4 * k; // .5–.9 (1:1 ze statycznym SVG)
        // Poświata co 3. kropkę (spec v3) — shadowBlur jest drogi, dozujemy.
        if (i % 3 === 0) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = color;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 + k, 0, TAU); // promień 2.5–3.5 (1:1 z SVG)
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const phase = ((now % CYCLE_MS) / CYCLE_MS) * TAU;
      // Oddech skali ±2% (8 s) — na transformie matematyki, nie na CSS.
      const scale = 1 + BREATH_AMP * Math.sin(((now % BREATH_MS) / BREATH_MS) * TAU);
      ctx.clearRect(0, 0, w, h);
      // Linie pod kropkami, potem dwa przebiegi głębi: tył obu nitek → przód —
      // nitki realnie się przeplatają zamiast jedna zawsze kryć drugą.
      links(phase, scale);
      strand(phase, 1, CYAN, scale, true);
      strand(phase, -1, MAGENTA, scale, true);
      strand(phase, 1, CYAN, scale, false);
      strand(phase, -1, MAGENTA, scale, false);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
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
