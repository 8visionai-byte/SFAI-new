'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';

/**
 * HeroRibbon — wstęga kropek w hero (wzorzec: .infinity-helix z
 * infinitytechstack.uk). Vanilla canvas 2D, ZERO bibliotek.
 *
 * MONTAŻ (bez dotykania Hero.tsx — nie mój plik): szukamy stabilnego haka
 * `section[data-hero]`, a gdy go nie ma — sekcji zawierającej `h1[data-writing]`
 * (H1 maszyny pisania renderuje ten atrybut; sekcja hero ma relative+isolate).
 * Do sekcji WSTRZYKUJEMY kontener absolute (.inf-ribbon-slot, createElement +
 * appendChild w efekcie, sprzątanie w cleanup) i portalujemy do niego canvas.
 * Wszystko dzieje się klientowo długo po hydratacji (za MotionGate) — zero
 * ryzyka hydration mismatch. Brak haka (podstrony bez hero) → komponent nic
 * nie robi. Zmiana ścieżki (template.tsx re-montuje treść) → re-injekcja.
 *
 * WARSTWA: slot inset-0, z-index:-1 → ZA treścią H1/CTA (sekcja ma isolate),
 * NAD tłem sekcji i siatką .inf-grid (-z-10; HeroContours usunięty z renderu
 * w spec v2). pointer-events:none.
 *
 * KONTRAKT PERF: montowany wyłącznie przez MotionOrchestrator (osobny lazy
 * chunk) za bramką MotionGate; bramki zdublowane niżej. DPR cap 1.5, pauza
 * przy document.hidden, pojawienie opacity 0→1 przez 1.2s (CSS .inf-ribbon).
 *
 * WYGLĄD: dwie przeplatające się sinusoidy kropek (po ~90 kropek, 2-3px,
 * blue #2B7CFF i green #22E06B), głębia 3D-ish z cos fazy (rozmiar+alpha,
 * rysowanie w 2 przebiegach: tył → przód), poświata shadowBlur 8 co 6. kropkę
 * (oszczędnie — shadowBlur jest drogi). Pełny obieg fazy ~14s. Canvas 940x380,
 * na <1280px skaluje się do szerokości kontenera (CSS aspect-ratio).
 */

const DOT_COUNT = 90; // na sinusoidę
const CYCLE_MS = 14000; // pełny obieg fazy
const WAVES = 2; // ile pełnych fal mieści się na szerokości
const DPR_CAP = 1.5;
const TAU = Math.PI * 2;
const BLUE = '#2B7CFF';
const GREEN = '#22E06B';
const FIND_TRIES = 60; // ~1s szukania sekcji po re-montażu treści (template.tsx)

function motionAllowed(): boolean {
  if (!window.matchMedia('(min-width: 1024px)').matches) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return nav.connection?.saveData !== true;
}

export function HeroRibbon() {
  const pathname = usePathname();
  const [slot, setSlot] = useState<HTMLDivElement | null>(null);

  /* ── Injekcja slotu do sekcji hero (per ścieżka) ─────────────────────────── */
  useEffect(() => {
    // BRAMKI ZDUBLOWANE (jak w orkiestratorze) — obrona w głąb.
    if (!motionAllowed()) return;

    let raf = 0;
    let tries = 0;
    let el: HTMLDivElement | null = null;

    const attach = () => {
      const hero =
        document.querySelector<HTMLElement>('section[data-hero]') ??
        document.querySelector<HTMLElement>('h1[data-writing]')?.closest('section') ??
        null;
      if (!hero) {
        // template.tsx mógł jeszcze nie wmontować nowej treści — krótka pętla prób.
        tries += 1;
        if (tries < FIND_TRIES) raf = requestAnimationFrame(attach);
        return;
      }
      el = document.createElement('div');
      el.className = 'inf-ribbon-slot';
      el.setAttribute('aria-hidden', 'true');
      hero.appendChild(el);
      setSlot(el);
    };
    raf = requestAnimationFrame(attach);

    return () => {
      cancelAnimationFrame(raf);
      el?.remove();
      setSlot(null);
    };
  }, [pathname]);

  return slot ? createPortal(<RibbonCanvas />, slot) : null;
}

/* ── Canvas wstęgi — rysowanie i pętla rAF ──────────────────────────────────── */

function RibbonCanvas() {
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

    /** Jedna sinusoida w jednym przebiegu głębi (back: tylko kropki „z tyłu"). */
    const strand = (phase: number, shift: number, color: string, back: boolean) => {
      const mid = h / 2;
      const amp = h * 0.32;
      ctx.fillStyle = color;
      for (let i = 0; i < DOT_COUNT; i++) {
        const t = i / (DOT_COUNT - 1);
        const a = t * TAU * WAVES + phase + shift;
        const depth = Math.cos(a); // -1 tył … +1 przód (pseudo-3D)
        if (back ? depth >= 0 : depth < 0) continue;
        const k = (depth + 1) / 2; // 0..1
        const x = t * w;
        const y = mid + Math.sin(a) * amp;
        const r = 1 + 0.5 * k; // średnica 2-3px
        const edge = Math.min(1, t * 10, (1 - t) * 10); // wygaszenie końcówek
        ctx.globalAlpha = (0.22 + 0.58 * k) * edge;
        // Poświata co 6. kropkę — shadowBlur jest drogi, dozujemy oszczędnie.
        if (i % 6 === 0) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = color;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const phase = ((now % CYCLE_MS) / CYCLE_MS) * TAU;
      ctx.clearRect(0, 0, w, h);
      // Dwa przebiegi: najpierw kropki „z tyłu" obu nitek, potem „z przodu" —
      // nitki realnie się przeplatają zamiast jedna zawsze kryć drugą.
      strand(phase, 0, BLUE, true);
      strand(phase, Math.PI, GREEN, true);
      strand(phase, 0, BLUE, false);
      strand(phase, Math.PI, GREEN, false);
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
    // Łagodne pojawienie 0→1 przez 1.2s (transition w .inf-ribbon).
    const fadeRaf = requestAnimationFrame(() => canvas.classList.add('is-on'));

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fadeRaf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="inf-ribbon" aria-hidden="true" />;
}
