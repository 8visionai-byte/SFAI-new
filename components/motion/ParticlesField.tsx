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
 * V2 (spec INFINITY v2, „Tło pływające + kursor"):
 *  • GLOW KURSORA — radialny blask ~260px (cyan #22d3ee → violet #8b5cf6,
 *    alpha ~.12 w centrum) rysowany na canvasie w pozycji myszy; pozycja glow
 *    płynie za kursorem przez lerp 0.08 („pipek" dogania mysz).
 *  • ROZŚWIETLANIE KROPEK — kropki w promieniu 180px od glow zwiększają
 *    płynnie (smoothstep po odległości) alpha ×do 2.5 (cap 1) i rozmiar ×do 1.6.
 *  • GLOBALNY DRYF POLA — wspólny, wolno obracający się wektor przepływu
 *    dodawany do dryfu własnego kropek (wrażenie płynięcia całej wody).
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

/* V2 — glow kursora + rozświetlanie + dryf globalny (wartości ze spec v2). */
const GLOW_RADIUS = 260; // promień radialnego blasku „pipka"
const GLOW_LERP = 0.08; // glow płynie za kursorem (lerp per klatka)
const LIGHT_RADIUS = 180; // w tym promieniu kropki się rozświetlają
const LIGHT_ALPHA_X = 2.5; // mnożnik alpha tuż przy centrum glow (cap 1)
const LIGHT_SIZE_X = 1.6; // mnożnik promienia kropki tuż przy centrum
const DRIFT_SPEED = 0.005; // px/ms (~5 px/s) — wspólny przepływ pola
const DRIFT_TURN = 0.00006; // rad/ms — kierunek przepływu wolno się obraca

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
    // V2: glow rysujemy dopiero po PIERWSZYM ruchu myszy (snap → potem lerp) —
    // bez tego „pipek" wjeżdżałby z (-1e4,-1e4) przez cały ekran.
    let hasMouse = false;
    let glowX = 0;
    let glowY = 0;
    // V2: globalny dryf pola — wspólny kąt przepływu, wolno obracany w czasie.
    let driftAngle = Math.random() * TAU;

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

      // V2: glow kursora — pozycja dogania mysz lerpem, blask malowany POD
      // kropkami (rozświetlone kropki mają czytelnie „pływać" nad światłem).
      if (hasMouse) {
        glowX += (mouseX - glowX) * GLOW_LERP;
        glowY += (mouseY - glowY) * GLOW_LERP;
        const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, GLOW_RADIUS);
        glow.addColorStop(0, 'rgba(34, 211, 238, 0.12)'); // cyan #22d3ee
        glow.addColorStop(0.45, 'rgba(139, 92, 246, 0.07)'); // violet #8b5cf6
        glow.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(glowX - GLOW_RADIUS, glowY - GLOW_RADIUS, GLOW_RADIUS * 2, GLOW_RADIUS * 2);
      }

      // V2: globalny dryf pola — jeden wektor na klatkę, wspólny dla wszystkich.
      driftAngle += DRIFT_TURN * dt;
      const flowX = Math.cos(driftAngle) * DRIFT_SPEED * dt;
      const flowY = Math.sin(driftAngle) * DRIFT_SPEED * dt;

      for (const p of particles) {
        p.x += p.vx * dt + flowX;
        p.y += p.vy * dt + flowY;
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

        // V2: rozświetlanie kropek w promieniu glow — smoothstep po odległości
        // od (lerpowanego) centrum światła: alpha ×do 2.5 (cap 1), rozmiar ×do 1.6.
        const drawX = p.x + p.ox;
        const drawY = p.y + p.oy;
        let alpha = p.alpha;
        let radius = p.r;
        if (hasMouse) {
          const gdx = drawX - glowX;
          const gdy = drawY - glowY;
          const gd2 = gdx * gdx + gdy * gdy;
          if (gd2 < LIGHT_RADIUS * LIGHT_RADIUS) {
            const t = 1 - Math.sqrt(gd2) / LIGHT_RADIUS;
            const s = t * t * (3 - 2 * t); // smoothstep — zero „skoku" na brzegu
            alpha = Math.min(1, p.alpha * (1 + s * (LIGHT_ALPHA_X - 1)));
            radius = p.r * (1 + s * (LIGHT_SIZE_X - 1));
          }
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMove = performance.now();
      if (!hasMouse) {
        // Pierwszy ruch: snap glow do kursora (dalej już tylko lerp w frame()).
        hasMouse = true;
        glowX = mouseX;
        glowY = mouseY;
      }
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
