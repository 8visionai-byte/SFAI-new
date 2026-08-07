'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * VoiceAura — „oddychający" zielony blob głosowy (spec INFINITY v4 §PARTIA D
 * pkt 1). PORT z 10K FlowCore.astro (voice-aura): organiczny blob na canvasie
 * + ambientowa aura + orbitujące obręcze + etykieta „Zapytaj AI / Voice agent"
 * (teksty przycisku i aria-label 1:1 ze źródła).
 *
 * RÓŻNICE względem źródła (świadome, wg spec):
 *  • WebGL shader ze źródła → canvas 2D (ta sama choreografia brzegu: fale
 *    sin(3a)/sin(6a) + oddech dwuczęstotliwościowy 1.18/0.43 — stałe 1:1
 *    z shadera; zero WebGL = mniejszy chunk i pewny fallback).
 *  • Kolory: limonka 10K → zieleń palety (#4ade80 / #10b981 — spec wprost).
 *  • CAŁY blob = <a target=_blank rel=noopener> na żywe demo voicebota
 *    (druga strona Pawła), nie <button data-agent-open>.
 *
 * KONTRAKT PERF (żelazne v4 — mobile dostaje 1 LEKKI canvas):
 *  • start silnika dopiero po window.load + requestIdleCallback (MotionGate-
 *    pattern), desktop (≥1024px): DPR cap 1.35 (jak źródło) + shadowBlur;
 *  • mobile lite: DPR 1, BEZ shadowBlur, ≤48 segmentów, 30 fps (frame-skip);
 *  • pauza gdy poza viewportem (IO, rootMargin 140px) i przy document.hidden;
 *  • reduced-motion / Save-Data: ZERO canvasa — statyczna aura CSS (fallback
 *    span/i/b portowany 1:1 z .voice-aura__fallback, animacje zgaszone przez RM).
 *
 * CSS: samowystarczalny <style> w komponencie (prefiks .sfai-voice — zero
 * kolizji, globals.css należy do partii A i NIE jest tu potrzebny).
 * MONTAŻ: ZyweDemo (prawa kolumna „Wolisz posłuchać?") w slocie o zadanej
 * wysokości — komponent wypełnia rodzica (absolute inset-0).
 */

/* Żywe demo voicebota — cel 1:1 z dotychczasowego CTA sekcji (spec v3 §VOICEBOT). */
const DEMO_URL = 'https://sfai-webseite-10k-look.vercel.app/';

/* Zieleń spec v4 (RGB do składania rgba() w gradientach canvasa). */
const GREEN_A = '74, 222, 128'; // #4ade80
const GREEN_B = '16, 185, 129'; // #10b981
const GREEN_LIGHT = '220, 252, 231'; // rozświetlony środek (biel z zielenią)

const TAU = Math.PI * 2;
/* 30 fps — 1:1 z FlowCore (frameInterval 30 ms w stanie spoczynku). */
const FRAME_MS = 33;

/* ── CSS komponentu (aura ambient + fallback + orbit + label) ─────────────── */
/* Wartości blur/rozmiarów/border-radius portowane z FlowCore.astro,
   kolory przemapowane limonka→zieleń. */
const CSS = `
.sfai-voice { position: absolute; inset: 0; }
.sfai-voice__link {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border-radius: 18px;
  text-decoration: none;
}
.sfai-voice__link:focus-visible {
  outline: 2px solid rgba(${GREEN_A}, .9);
  outline-offset: 4px;
}
.sfai-voice__ambient {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  width: min(88%, 300px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, rgba(${GREEN_LIGHT}, .12), transparent 35%),
    radial-gradient(circle at 40% 64%, rgba(${GREEN_A}, .11), transparent 31%),
    radial-gradient(circle at 68% 35%, rgba(${GREEN_B}, .09), transparent 29%);
  filter: blur(24px);
  opacity: .86;
  pointer-events: none;
  transform: translate(-50%, -50%);
}
.sfai-voice__fallback span,
.sfai-voice__fallback i,
.sfai-voice__fallback b {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  aspect-ratio: 1;
  border-radius: 45% 55% 52% 48% / 52% 43% 57% 48%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 1.2s ease;
}
.sfai-voice__fallback span {
  z-index: 1;
  width: min(72%, 240px);
  background:
    radial-gradient(circle at 35% 32%, rgba(${GREEN_LIGHT}, .40), transparent 17%),
    radial-gradient(circle at 63% 65%, rgba(${GREEN_A}, .20), transparent 30%),
    radial-gradient(circle at 67% 30%, rgba(${GREEN_B}, .18), transparent 28%),
    radial-gradient(circle, rgba(${GREEN_A}, .18), rgba(${GREEN_B}, .07) 48%, transparent 70%);
  box-shadow: 0 0 62px rgba(${GREEN_A}, .12), inset 0 0 44px rgba(${GREEN_LIGHT}, .10);
  filter: blur(1px);
  animation: sfaiVoiceBreathe 7s ease-in-out infinite alternate;
}
.sfai-voice__fallback i {
  z-index: 1;
  width: min(58%, 194px);
  border: 1px solid rgba(${GREEN_A}, .22);
  box-shadow: 0 0 42px rgba(${GREEN_A}, .08);
  opacity: .72;
  animation: sfaiVoiceOrbit 12s linear infinite;
}
.sfai-voice__fallback b {
  z-index: 1;
  width: min(41%, 136px);
  border: 1px solid rgba(${GREEN_A}, .28);
  box-shadow: 0 0 30px rgba(${GREEN_A}, .07);
  opacity: .68;
  animation: sfaiVoiceOrbit 9s linear infinite reverse;
}
/* Silnik żywy: statyczny blob gaśnie (crossfade z canvasem), obręcze zostają. */
.sfai-voice.is-live .sfai-voice__fallback span { opacity: 0; }
.sfai-voice__canvas {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.2s ease;
}
.sfai-voice.is-live .sfai-voice__canvas { opacity: 1; }
.sfai-voice__core {
  position: relative;
  z-index: 3;
  display: grid;
  justify-items: center;
  gap: 2px;
  pointer-events: none;
}
.sfai-voice__label {
  font-weight: 600;
  font-size: 15px;
  letter-spacing: .01em;
  color: #eafff3;
  text-shadow: 0 0 18px rgba(${GREEN_A}, .55);
}
.sfai-voice__caption {
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(${GREEN_A}, .85);
}
.sfai-voice__link:hover .sfai-voice__label { color: #ffffff; }
@keyframes sfaiVoiceBreathe {
  0% { opacity: .78; transform: translate(-50%, -50%) scale(.96) rotate(-4deg); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1.045) rotate(6deg); }
}
@keyframes sfaiVoiceOrbit {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .sfai-voice__fallback span,
  .sfai-voice__fallback i,
  .sfai-voice__fallback b { animation: none; }
}
`;

export function VoiceAura() {
  /* static = pierwszy paint / RM / Save-Data; full = desktop; lite = mobile. */
  const [mode, setMode] = useState<'static' | 'full' | 'lite'>('static');
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    // Bramki jak w źródle (reduced || saveData → statyczna aura CSS).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData === true) return;

    let disposed = false;
    let idleId = 0;
    let usedTimeout = false;

    // MotionGate-pattern: silnik dopiero po window.load + idle (nie konkuruje
    // z LCP; sekcja i tak jest głęboko pod foldem).
    const arm = () => {
      const kick = () => {
        if (disposed) return;
        setMode(window.matchMedia('(min-width: 1024px)').matches ? 'full' : 'lite');
      };
      // typeof zamiast `in`: lib.dom deklaruje requestIdleCallback zawsze,
      // więc `in` zawęża gałąź else do never — a Safari realnie go nie ma.
      const ric = window.requestIdleCallback as typeof window.requestIdleCallback | undefined;
      if (typeof ric === 'function') {
        idleId = ric(kick, { timeout: 1500 });
      } else {
        usedTimeout = true;
        idleId = window.setTimeout(kick, 300);
      }
    };

    if (document.readyState === 'complete') {
      arm();
    } else {
      window.addEventListener('load', arm, { once: true });
    }
    return () => {
      disposed = true;
      window.removeEventListener('load', arm);
      if (idleId) {
        const cic = window.cancelIdleCallback as typeof window.cancelIdleCallback | undefined;
        if (usedTimeout) window.clearTimeout(idleId);
        else if (typeof cic === 'function') cic(idleId);
      }
    };
  }, []);

  return (
    <div className={`sfai-voice${live ? ' is-live' : ''}`}>
      <style>{CSS}</style>

      {/* CAŁY blob klikalny — link do żywego demo voicebota (spec v4 §D pkt 1);
          aria-label 1:1 z przycisku FlowCore. */}
      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Otwórz rozmowę głosową z Agentem SimpleFast.ai"
        className="sfai-voice__link"
      >
        {/* Ambientowa poświata (port .voice-aura__ambient, zieleń). */}
        <span className="sfai-voice__ambient" aria-hidden="true" />

        {/* Statyczna aura (port .voice-aura__fallback): pierwszy paint, RM,
            Save-Data; blob gaśnie w crossfade gdy wystartuje canvas. */}
        <span className="sfai-voice__fallback" aria-hidden="true">
          <span />
          <i />
          <b />
        </span>

        {/* Silnik canvas — montowany dopiero po bramkach (load + idle). */}
        {mode !== 'static' && (
          <AuraCanvas lite={mode === 'lite'} onLive={() => setLive(true)} />
        )}

        {/* Etykieta przycisku 1:1 z FlowCore („Zapytaj AI" / „Voice agent"). */}
        <span className="sfai-voice__core">
          <span className="sfai-voice__label">Zapytaj AI</span>
          <span className="sfai-voice__caption" aria-hidden="true">
            Voice agent
          </span>
        </span>
      </a>
    </div>
  );
}

/* ── Silnik: organiczny blob 2D (choreografia brzegu 1:1 z shadera 10K) ────── */

function AuraCanvas({ lite, onLive }: { lite: boolean; onLive: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onLiveRef = useRef(onLive);
  onLiveRef.current = onLive;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* Mobile lite: ≤48 segmentów (żelazne v4: ≤50 elementów), desktop 88. */
    const SEG = lite ? 48 : 88;
    let raf = 0;
    let running = false;
    let visible = false;
    let w = 0;
    let h = 0;
    let last = 0;
    let t = 0;

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      // DPR: lite = 1 (żelazne v4), desktop cap 1.35 (1:1 z FlowCore).
      const dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* Promień brzegu dla kąta a — fale kątowe i tempa 1:1 z shadera
       (voiceWave: sin(3a−1.16t) + sin(6a+0.82t); breath: 1.18t/0.43t). */
    const boundary = (a: number, base: number): number => {
      const breath = Math.sin(t * 1.18) * 0.018 + Math.sin(t * 0.43) * 0.012;
      const wave =
        Math.sin(a * 3 - t * 1.16) * 0.045 +
        Math.sin(a * 6 + t * 0.82) * 0.026 +
        Math.sin(a * 2 + t * 0.55) * 0.02;
      return base * (1 + breath + wave);
    };

    const blobPath = (cx: number, cy: number, base: number) => {
      ctx.beginPath();
      for (let i = 0; i <= SEG; i++) {
        const a = (i / SEG) * TAU;
        const r = boundary(a, base);
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      // 30 fps przez frame-skip (żelazne v4 dla mobile; desktop 1:1 ze źródłem).
      if (now - last < FRAME_MS) return;
      const dt = Math.min(0.05, last ? (now - last) * 0.001 : 0.016);
      last = now;
      if (document.hidden) return;
      t += dt * 0.58; // globalne tempo 1:1 (u_time * 0.58 w shaderze)

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.3;

      // Miękka poświata pod blobem (odpowiednik halo/outerGlow shadera).
      const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.9);
      glow.addColorStop(0, `rgba(${GREEN_A}, 0.16)`);
      glow.addColorStop(0.55, `rgba(${GREEN_B}, 0.08)`);
      glow.addColorStop(1, `rgba(${GREEN_B}, 0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Ciało bloba: wypełnienie gradientem (veil/core/innerMist w jednym).
      blobPath(cx, cy, R);
      const body = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * 0.1, cx, cy, R * 1.15);
      body.addColorStop(0, `rgba(${GREEN_LIGHT}, 0.26)`);
      body.addColorStop(0.45, `rgba(${GREEN_A}, 0.15)`);
      body.addColorStop(1, `rgba(${GREEN_B}, 0.02)`);
      ctx.fillStyle = body;
      ctx.fill();

      // Brzeg z poświatą (outerGlow) — shadowBlur TYLKO desktop (żelazne v4).
      if (!lite) {
        ctx.shadowBlur = 16;
        ctx.shadowColor = `rgba(${GREEN_A}, 0.8)`;
      }
      ctx.strokeStyle = `rgba(${GREEN_A}, 0.55)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Wewnętrzna obwódka (innerGlow shadera) — 82% promienia.
      blobPath(cx, cy, R * 0.82);
      ctx.strokeStyle = `rgba(${GREEN_LIGHT}, 0.3)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pierścień sygnału na zewnątrz (signalRing: sin(7a−1.25t)).
      ctx.beginPath();
      for (let i = 0; i <= SEG; i++) {
        const a = (i / SEG) * TAU;
        const r = R * 1.14 + Math.sin(a * 7 - t * 1.25) * R * 0.014;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${GREEN_A}, 0.16)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pauza poza viewportem — 1:1 z FlowCore (rootMargin 140px).
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible) start();
        else stop();
      },
      { rootMargin: '140px' }
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    size();

    // Crossfade: pierwszy narysowany kadr → rodzic dostaje .is-live
    // (canvas wjeżdża 0→1, statyczny blob gaśnie — przez cały czas coś widać).
    const liveRaf = requestAnimationFrame(() => onLiveRef.current());

    return () => {
      stop();
      cancelAnimationFrame(liveRaf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [lite]);

  return <canvas ref={canvasRef} className="sfai-voice__canvas" aria-hidden="true" />;
}
