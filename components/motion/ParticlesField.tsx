'use client';

import { useEffect, useRef } from 'react';

/**
 * ParticlesField — pełnoekranowe interaktywne tło (wzorzec: .lp-interactive-particles
 * z infinitytechstack.uk). Vanilla canvas 2D, ZERO bibliotek.
 *
 * KONTRAKT PERF (spec INFINITY):
 *  • Montowany WYŁĄCZNIE przez MotionOrchestrator (osobny lazy chunk next/dynamic),
 *    czyli za bramką MotionGate: ≥1024px, po window.load, bez reduced-motion /
 *    Save-Data. Mobile nie pobiera ani bajta. Bramki ZDUBLOWANE niżej (obrona w głąb).
 *  • DPR cap 1.5, pauza przy document.hidden (visibilitychange), a przy braku
 *    ruchu myszy >2s rAF renderuje ~24fps (skip frames — fizyka liczona z realnym dt).
 *
 * WYGLĄD: ~140 kropek 1-2px (biel 60%, blue 20%, violet 12%, green 8%,
 * opacity .2-.5) z wolnym dryfem (zawijanie na krawędziach). Mysz odpycha kropki
 * w promieniu ~140px; przemieszczenie dochodzi/wraca przez lerp — efekt „po wodzie".
 *
 * WARSTWA: canvas fixed inset-0, z-index:-1, pointer-events:none (.inf-particles);
 * w DOM ląduje PO .inf-stars (MotionGate montowany na końcu body), więc maluje się
 * NAD starfieldem, a POD sekcjami z własnym tłem — jak w spec („nad tłem body").
 */

type Particle = {
  x: number;
  y: number;
  vx: number; // px/ms
  vy: number; // px/ms
  r: number; // promień (0.5-1 = średnica 1-2px)
  color: string;
  alpha: number;
  ox: number; // aktualne odchylenie od myszy (lerpowane)
  oy: number;
};

const COUNT = 140;
const MOUSE_RADIUS = 140;
const MOUSE_PUSH = 46; // maks. przemieszczenie kropki tuż przy kursorze (px)
const LERP = 0.06; // „po wodzie": wolne dochodzenie/powrót odchylenia
const DPR_CAP = 1.5;
const IDLE_AFTER_MS = 2000;
const IDLE_FRAME_MS = 1000 / 24;
const TAU = Math.PI * 2;

function pickColor(): string {
  const roll = Math.random();
  if (roll < 0.6) return '#EAF0FA'; // biel (ton starfielda z globals)
  if (roll < 0.8) return '#2B7CFF'; // blue marki
  if (roll < 0.92) return '#8B5CF6'; // violet marki
  return '#22E06B'; // green marki
}

export function ParticlesField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // BRAMKI ZDUBLOWANE (jak w orkiestratorze) — gdyby ktoś zamontował wprost.
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    // Start „daleko" — bez ruchu myszy pole tylko dryfuje (i to w trybie 24fps).
    let mouseX = -1e4;
    let mouseY = -1e4;
    let lastMove = -1e9;
    let lastFrame = 0;

    const seed = () => {
      particles = [];
      for (let k = 0; k < COUNT; k++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.014, // ~±7 px/s — wolny dryf
          vy: (Math.random() - 0.5) * 0.014,
          r: 0.5 + Math.random() * 0.5,
          color: pickColor(),
          alpha: 0.2 + Math.random() * 0.3,
          ox: 0,
          oy: 0,
        });
      }
    };

    const size = () => {
      const pw = window.innerWidth;
      const ph = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      if (particles.length > 0 && w > 0 && h > 0) {
        // Resize: pozycje skalowane proporcjonalnie — zero „teleportacji" pola.
        const rx = pw / w;
        const ry = ph / h;
        for (const p of particles) {
          p.x *= rx;
          p.y *= ry;
        }
      }
      w = pw;
      h = ph;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) seed();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const idle = now - lastMove > IDLE_AFTER_MS;
      // Skip-frames w bezruchu: rAF dalej tyka, render ~24fps (oszczędność CPU).
      if (idle && now - lastFrame < IDLE_FRAME_MS) return;
      const dt = lastFrame === 0 ? 16.7 : Math.min(64, now - lastFrame);
      lastFrame = now;

      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        // Zawijanie na krawędziach (margines 4px — kropka znika zanim skoczy).
        if (p.x < -4) p.x = w + 4;
        else if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        else if (p.y > h + 4) p.y = -4;

        // Odpychanie od kursora w promieniu MOUSE_RADIUS, dojście przez lerp.
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const d2 = dx * dx + dy * dy;
        let tx = 0;
        let ty = 0;
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const force = (1 - d / MOUSE_RADIUS) * MOUSE_PUSH;
          tx = (dx / d) * force;
          ty = (dy / d) * force;
        }
        p.ox += (tx - p.ox) * LERP;
        p.oy += (ty - p.oy) * LERP;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x + p.ox, p.y + p.oy, p.r, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMove = performance.now();
    };
    const onResize = () => size();
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (raf === 0) {
        lastFrame = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    size();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);
    // Łagodne pojawienie (transition w .inf-particles) — bez „pyknięcia" po load.
    const fadeRaf = requestAnimationFrame(() => canvas.classList.add('is-on'));

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fadeRaf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="inf-particles" aria-hidden="true" />;
}
