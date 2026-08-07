/**
 * lemniskata — WSPÓLNA matematyka 3D lemniskaty ∞ (spec INFINITY v4 §PARTIA B
 * pkt 1 i 4). JEDNO źródło wzorów dla trzech konsumentów:
 *  - InfinityLoopStatic (server component, liczone RAZ przy buildzie → SVG),
 *  - HeroRibbon (desktop canvas — lazy chunk MotionOrchestratora),
 *  - HeroLoopLite (mobile canvas — dynamic import po load+idle).
 * ZERO dublowania wzorów: konsumenci różnią się TYLKO liczbą kropek i trybem
 * glow (shadowBlur vs „druga kropka") — obie różnice są parametrami tego modułu.
 * Moduł jest czysty (zero DOM na poziomie modułu) — bezpieczny w server i client.
 *
 * MODEL „pływające DNA" (decyzja Pawła, spec v4):
 *  - tor: lemniskata Bernoulliego a=1 → x = cos t/(1+sin²t), y = sin t·cos t/(1+sin²t);
 *  - głębia oplotu: z = 0.55·sin(2t+φ); nitka B dostaje φ+π (przeciwfaza), więc
 *    obie oplatają wspólny tor jak helisa i krzyżują się tam, gdzie sin = 0;
 *  - tilt: obrót całości wokół osi X o stałe 18° (yr = y·cosθ − z·sinθ,
 *    zr = y·sinθ + z·cosθ) — oplot częściowo „kładzie się" w pion i widać głębię;
 *  - projekcja perspektywiczna: s = f/(f − zr), f = 3 → przód s>1, tył s<1;
 *    pozycja mnożona przez s, promień 1.5px (tył) → 6px (przód), alpha .35 → 1.
 *  - SZCZEBLE „drabinki DNA": co 3. para kropek, linia MIĘDZY nitkami w
 *    gradiencie nitek (połówka cyan → połówka magenta, obie alpha .18), gr. 1.2.
 *
 * RUCH (loopPhases): faza toru 14 s/obieg + faza oplotu 6 s (wolny obrót
 * „wstęgi DNA") + oddech skali ±2% w cyklu 8 s.
 *
 * JEDNOSTKI: computeLoopFrame zwraca współrzędne W PIKSELACH płótna w×h o
 * proporcji slotu hero 760/300 (aspect-[760/300]); promień kropek i grubość
 * szczebli skalują się z szerokością — przy pełnych 760px wartości = spec 1:1.
 */

const TAU = Math.PI * 2;

/* ── Kolory fluorescencyjne (spec v4) ─────────────────────────────────────── */
export const LOOP_CYAN = '#22d3ee';
export const LOOP_MAGENTA = '#ff007f';
/** Szczeble: kolory nitek z alpha .18 (spec v4 §B pkt 1). */
export const RUNG_CYAN = 'rgba(34, 211, 238, 0.18)';
export const RUNG_MAGENTA = 'rgba(255, 0, 127, 0.18)';

/* ── Geometria slotu (proporcje aspect-[760/300] z Hero.tsx) ──────────────── */
export const LOOP_VB_W = 760;
export const LOOP_VB_H = 300;

/* ── Rytm ruchu (spec v4 §B pkt 1) ────────────────────────────────────────── */
export const TRACK_MS = 14000; // pełny obieg fazy toru
export const WEAVE_MS = 6000; // pełny obrót fazy oplotu
export const BREATH_MS = 8000; // cykl oddechu skali
export const BREATH_AMP = 0.02; // ±2%

/* ── Szczeble ─────────────────────────────────────────────────────────────── */
export const RUNG_STEP = 3; // co 3. para kropek
export const RUNG_WIDTH = 1.2;

/* ── Stałe modelu 3D ──────────────────────────────────────────────────────── */
const TILT = (18 * Math.PI) / 180; // stały przechył wokół osi X
const COS_TILT = Math.cos(TILT);
const SIN_TILT = Math.sin(TILT);
const Z_AMP = 0.55; // amplituda z-oplotu
const FOCAL = 3; // ogniskowa projekcji: s = f/(f − zr)
/* Normalizacja głębi: |zr| ≤ Z_AMP·cosθ + |y|max·sinθ (|y|max lemniskaty ≈ 0.354). */
const ZR_MAX = Z_AMP * COS_TILT + 0.354 * SIN_TILT;
/* Skale px na jednostkę toru w viewboxie 760×300 — dobrane tak, żeby KROPKI
   (z projekcją s≤~1.21 i oddechem +2%) nie były ścinane krawędzią canvasa;
   poświata (shadowBlur) MOŻE wystawać poza slot (żelazna zasada: zero clippingu
   glow — slot w Hero nie ma overflow-hidden). */
const PX_X = 298;
const PX_Y = 245;
/* Kropka: promień/alpha wg głębi (spec v4: 1.5→6px, .35→1). */
const R_MIN = 1.5;
const R_SPAN = 4.5;
const A_MIN = 0.35;
const A_SPAN = 0.65;

/** Jedna kropka po projekcji: pozycja/promień w px, alpha, strona i głębia 0..1. */
export type LoopDot = {
  x: number;
  y: number;
  r: number;
  a: number;
  /** true = przód (s>1) — tam desktop daje shadowBlur, lite „drugą kropkę". */
  front: boolean;
  /** Głębia 0 (tył) .. 1 (przód) — np. do dozowania blur 12–14. */
  z01: number;
};

/** Klatka: dwie nitki (a = cyan, b = magenta w przeciwfazie oplotu). */
export type LoopFrame = { a: LoopDot[]; b: LoopDot[] };

/** Fazy ruchu z timestampu rAF — wspólny rytm obu canvasów. */
export function loopPhases(now: number): { track: number; weave: number; breath: number } {
  return {
    track: ((now % TRACK_MS) / TRACK_MS) * TAU,
    weave: ((now % WEAVE_MS) / WEAVE_MS) * TAU,
    breath: 1 + BREATH_AMP * Math.sin(((now % BREATH_MS) / BREATH_MS) * TAU),
  };
}

/** Wypełnia jedną nitkę (mutuje bufor `dots` — zero alokacji w pętli rAF). */
function fillStrand(
  dots: LoopDot[],
  count: number,
  w: number,
  h: number,
  track: number,
  weave: number,
  breath: number
): void {
  const kx = w / LOOP_VB_W; // skala px (aspect stały ⇒ kx = h/LOOP_VB_H)
  const ky = h / LOOP_VB_H;
  dots.length = count;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * TAU + track;
    const st = Math.sin(t);
    const ct = Math.cos(t);
    const den = 1 + st * st;
    // Tor 2D lemniskaty + głębia z-oplotu.
    const x0 = ct / den;
    const y0 = (st * ct) / den;
    const z = Z_AMP * Math.sin(2 * t + weave);
    // Tilt 18° wokół osi X.
    const yr = y0 * COS_TILT - z * SIN_TILT;
    const zr = y0 * SIN_TILT + z * COS_TILT;
    // Projekcja perspektywiczna + głębia znormalizowana.
    const s = FOCAL / (FOCAL - zr);
    const d01 = Math.min(1, Math.max(0, (zr / ZR_MAX + 1) / 2));

    const dot = dots[i] ?? (dots[i] = { x: 0, y: 0, r: 0, a: 0, front: false, z01: 0 });
    dot.x = w / 2 + x0 * s * breath * PX_X * kx;
    dot.y = h / 2 + yr * s * breath * PX_Y * ky;
    // Floor 1px: na wąskim mobile tylne kropki nie znikają całkiem.
    dot.r = Math.max(1, (R_MIN + R_SPAN * d01) * kx);
    dot.a = A_MIN + A_SPAN * d01;
    dot.front = s > 1;
    dot.z01 = d01;
  }
}

/**
 * Punkty obu nitek dla zadanej klatki. `out` = bufor wielokrotnego użytku
 * (canvasy podają swój — zero GC w pętli); bez `out` alokuje nowy (build-time SVG).
 */
export function computeLoopFrame(opts: {
  count: number;
  w: number;
  h: number;
  track: number;
  weave: number;
  breath?: number;
  out?: LoopFrame;
}): LoopFrame {
  const { count, w, h, track, weave, breath = 1, out } = opts;
  const frame = out ?? { a: [], b: [] };
  fillStrand(frame.a, count, w, h, track, weave, breath);
  fillStrand(frame.b, count, w, h, track, weave + Math.PI, breath);
  return frame;
}

/** Przebieg jednej nitki w jednej warstwie głębi (tył albo przód). */
function strandPass(
  ctx: CanvasRenderingContext2D,
  dots: readonly LoopDot[],
  color: string,
  front: boolean,
  glow: boolean
): void {
  ctx.fillStyle = color;
  // Desktop: poświata TYLKO na przednich kropkach (spec v4: blur 12–14 wg głębi).
  if (front && glow) ctx.shadowColor = color;
  for (const d of dots) {
    if (d.front !== front) continue;
    if (front && !glow) {
      // Mobile-lite: glow bez shadowBlur — druga, większa kropka alpha .18.
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.18;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * 2.2, 0, TAU);
      ctx.fill();
    }
    ctx.shadowBlur = front && glow ? 12 + 2 * d.z01 : 0;
    ctx.globalAlpha = d.a;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, TAU);
    ctx.fill();
  }
}

/**
 * Rysuje klatkę na canvasie (wspólne dla HeroRibbon i HeroLoopLite; jedyna
 * różnica = `glow`). Kolejność malowania (kontrakt, lustrzana w statycznym SVG):
 * szczeble → tył cyan → tył magenta → przód cyan → przód magenta.
 * NIE czyści płótna — clearRect robi wołający (zna swoje wymiary/DPR).
 */
export function drawLoopFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  frame: LoopFrame,
  glow: boolean
): void {
  // Szczeble „drabinki": co 3. para, dwie połówki w kolorach nitek (gradient).
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.lineWidth = Math.max(1, RUNG_WIDTH * (w / LOOP_VB_W));
  for (let i = 0; i < frame.a.length; i += RUNG_STEP) {
    const a = frame.a[i];
    const b = frame.b[i];
    if (!a || !b) continue;
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    ctx.strokeStyle = RUNG_CYAN;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(mx, my);
    ctx.stroke();
    ctx.strokeStyle = RUNG_MAGENTA;
    ctx.beginPath();
    ctx.moveTo(mx, my);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  // Kropki: dwa przebiegi głębi — nitki realnie się przeplatają.
  strandPass(ctx, frame.a, LOOP_CYAN, false, glow);
  strandPass(ctx, frame.b, LOOP_MAGENTA, false, glow);
  strandPass(ctx, frame.a, LOOP_CYAN, true, glow);
  strandPass(ctx, frame.b, LOOP_MAGENTA, true, glow);
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}
