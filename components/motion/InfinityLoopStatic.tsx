import {
  LOOP_VB_W,
  LOOP_VB_H,
  LOOP_CYAN,
  LOOP_MAGENTA,
  RUNG_CYAN,
  RUNG_MAGENTA,
  RUNG_STEP,
  RUNG_WIDTH,
  computeLoopFrame,
  type LoopDot,
} from '@/lib/lemniskata';

/**
 * InfinityLoopStatic — STATYCZNA lemniskata 3D „pływające DNA" jako czysty SVG
 * (spec INFINITY v4 §PARTIA B pkt 4). SERVER COMPONENT, zero JS u klienta:
 * punkty liczone RAZ przy buildzie z WSPÓLNEGO modułu lib/lemniskata.ts —
 * TE SAME wzory 3D co canvasy (zero dublowania), zamrożona jedna klatka.
 *
 * ROLE (v4):
 *  - reduced-motion (każdy viewport): jedyna wersja,
 *  - PIERWSZY PAINT wszędzie: canvas (desktop HeroRibbon przez MotionGate,
 *    mobile HeroLoopLite po load+idle) montuje się długo po load i płynnie
 *    nakrywa ten SVG (opacity swap inline w JS — zero migniecia, zero
 *    zależności od CSS innych partii),
 *  - forced-colors: cały slot [data-hero-loop] gasi CSS fundamentu.
 *
 * RYSUNEK: viewBox 760×300 (proporcje slotu aspect-[760/300], „ściśnięte").
 * Kolejność malowania LUSTRZANA z drawLoopFrame (kontrakt): szczeble → tył
 * cyan → tył magenta → przód cyan → przód magenta.
 */

const N = 96; // kropek na nitkę — 1:1 z desktopowym canvasem
/* Zamrożona faza oplotu (estetyka): przy 0 kropki obu nitek pokrywałyby się
   dokładnie na wierzchołkach ∞ (z obu nitek = 0 w t=0) — 0.7 rad rozsuwa je. */
const STATIC_WEAVE = 0.7;

const FRAME = computeLoopFrame({
  count: N,
  w: LOOP_VB_W,
  h: LOOP_VB_H,
  track: 0,
  weave: STATIC_WEAVE,
});

/** Zaokrąglenie do 0.1 px — mniejszy HTML bez widocznej straty. */
const r1 = (v: number) => Math.round(v * 10) / 10;

type SvgDot = { x: number; y: number; r: number; a: number };

function layer(dots: readonly LoopDot[], front: boolean): readonly SvgDot[] {
  return dots
    .filter((d) => d.front === front)
    .map((d) => ({ x: r1(d.x), y: r1(d.y), r: r1(d.r), a: Math.round(d.a * 100) / 100 }));
}

const CYAN_BACK = layer(FRAME.a, false);
const MAGENTA_BACK = layer(FRAME.b, false);
const CYAN_FRONT = layer(FRAME.a, true);
const MAGENTA_FRONT = layer(FRAME.b, true);

type Half = { x1: number; y1: number; x2: number; y2: number };

/* Szczeble co 3. parę: „gradient nitki" jak w canvasie = dwie połówki
   (cyan A→środek, magenta środek→B), obie alpha .18 w kolorze stałej. */
const RUNGS: readonly { c: Half; m: Half }[] = (() => {
  const out: { c: Half; m: Half }[] = [];
  for (let i = 0; i < N; i += RUNG_STEP) {
    const a = FRAME.a[i];
    const b = FRAME.b[i];
    if (!a || !b) continue;
    const mx = r1((a.x + b.x) / 2);
    const my = r1((a.y + b.y) / 2);
    out.push({
      c: { x1: r1(a.x), y1: r1(a.y), x2: mx, y2: my },
      m: { x1: mx, y1: my, x2: r1(b.x), y2: r1(b.y) },
    });
  }
  return out;
})();

export function InfinityLoopStatic() {
  return (
    /*
      Dekoracja czysta (aria-hidden dostaje już slot-rodzic w Hero.tsx; tu
      dublujemy — SVG bywa czytany przez AT, gdy trafi do DOM bez rodzica).
      Wymiary niesie slot (aspect-[760/300]); SVG wypełnia go w 100%.
      Klasa .inf-loop-static = KONTRAKT crossfade'u (HeroRibbon i HeroLoopLite
      szukają jej, żeby zgasić SVG po starcie canvasa) — nie zmieniać.
    */
    <svg
      viewBox={`0 0 ${LOOP_VB_W} ${LOOP_VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      className="inf-loop-static block h-full w-full"
    >
      {/* Szczeble „drabinki DNA" — pod kropkami, dwie połówki na szczebel. */}
      <g strokeWidth={RUNG_WIDTH}>
        {RUNGS.map((rung, i) => (
          <g key={i}>
            <line stroke={RUNG_CYAN} x1={rung.c.x1} y1={rung.c.y1} x2={rung.c.x2} y2={rung.c.y2} />
            <line stroke={RUNG_MAGENTA} x1={rung.m.x1} y1={rung.m.y1} x2={rung.m.x2} y2={rung.m.y2} />
          </g>
        ))}
      </g>
      {/* Tył (s<1): mniejsze, bledsze kropki. */}
      <g fill={LOOP_CYAN}>
        {CYAN_BACK.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fillOpacity={d.a} />
        ))}
      </g>
      <g fill={LOOP_MAGENTA}>
        {MAGENTA_BACK.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fillOpacity={d.a} />
        ))}
      </g>
      {/* Przód (s>1): większe, jaśniejsze — malowane NAD tyłem (przeplot). */}
      <g fill={LOOP_CYAN}>
        {CYAN_FRONT.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fillOpacity={d.a} />
        ))}
      </g>
      <g fill={LOOP_MAGENTA}>
        {MAGENTA_FRONT.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fillOpacity={d.a} />
        ))}
      </g>
    </svg>
  );
}
