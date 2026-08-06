/**
 * InfinityLoopStatic — STATYCZNA lemniskata Bernoulliego (kształt ∞) jako czysty
 * SVG (spec INFINITY v3 §HERO pkt 2). SERVER COMPONENT, zero JS u klienta:
 * wszystkie punkty liczone RAZ przy buildzie (pętle na poziomie modułu), do HTML
 * trafia gotowy <svg> z kropkami.
 *
 * ROLE (spec v3):
 *  - MOBILE (<1024px): jedyna wersja animacji hero (zero canvasów na mobile),
 *  - reduced-motion / Save-Data: jedyna wersja także na desktopie,
 *  - desktop: PIERWSZY PAINT — canvas (HeroRibbon przez MotionGate) montuje się
 *    długo po load i wtedy płynnie nakrywa ten SVG (opacity swap robi HeroRibbon
 *    inline w JS — zero migniecia, zero zależności od CSS innej partii).
 *
 * MATEMATYKA (1:1 z canvasem w HeroRibbon — te same stałe skali):
 *  lemniskata Bernoulliego, a=1: x = cos t / (1+sin²t), y = sin t·cos t / (1+sin²t).
 *  Dwie nitki po 110 kropek, fazy przesunięte o π (przeplatają się). Pseudo-głębia
 *  k = (cos t + 1)/2: promień 2.5–3.5, alpha .5–.9. Kolory wzorca: cyan #22d3ee
 *  i magenta #ff007f. Co 6. para kropek połączona cienką linią rgba(255,255,255,.08)
 *  („drabinka DNA"). viewBox 940x420 (proporcje slotu hero).
 */

const N = 110; // kropek na nitkę
const TAU = Math.PI * 2;
const VB_W = 940;
const VB_H = 420;
/* Skale: |x|max = 1 → 430px (mieści r 3.5 + glow w 470); |y|max ≈ 0.354 → ~184px
   (mieści się w 210). Lekkie „dopasienie" pionu względem naturalnych proporcji
   lemniskaty jest zamierzone (wypełnia slot ~940x420 jak u wzorca). */
const SX = 430;
const SY = 520;
const CYAN = '#22d3ee';
const MAGENTA = '#ff007f';
const LINK_STROKE = 'rgba(255,255,255,0.08)';

type Dot = { x: number; y: number; r: number; a: number };

/* OPLOT: samo przesunięcie fazy o π NIE rozdziela nitek — lemniskata jest
   środkowosymetryczna, więc przy parzystym N zbiór punktów obu nitek to TEN SAM
   zbiór (magenta rysowana druga w 100% nakrywała cyjan — bug pierwszej wersji).
   Jak u wzorca: nitki OPLATAJĄ wspólny tor — offset pionowy ±AMP·sin(3t)
   w przeciwfazie (3 pełne oploty na obieg, węzły tam, gdzie sin=0). */
const WOBBLE_AMP = 9;

/** Nitka kropek lemniskaty: shift fazy + sign strony oplotu (build-time). */
function strand(shift: number, sign: 1 | -1): readonly Dot[] {
  const dots: Dot[] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * TAU + shift;
    const s = Math.sin(t);
    const c = Math.cos(t);
    const d = 1 + s * s;
    // Pseudo-głębia 0..1 z cos(t): większe i jaśniejsze kropki „bliżej".
    const k = (c + 1) / 2;
    dots.push({
      x: Math.round((VB_W / 2 + (c / d) * SX) * 10) / 10,
      y: Math.round((VB_H / 2 + ((s * c) / d) * SY + sign * WOBBLE_AMP * Math.sin(3 * t)) * 10) / 10,
      r: Math.round((2.5 + k) * 10) / 10,
      a: Math.round((0.5 + 0.4 * k) * 100) / 100,
    });
  }
  return dots;
}

const STRAND_A = strand(0, 1); // cyan
const STRAND_B = strand(0, -1); // magenta (przeciwfaza oplotu — przeplot)

type Link = { x1: number; y1: number; x2: number; y2: number };

/* Co 6. para kropek (ten sam indeks obu nitek) — linia łącząca „drabinki". */
const LINKS: readonly Link[] = (() => {
  const out: Link[] = [];
  for (let i = 0; i < N; i += 6) {
    const a = STRAND_A[i];
    const b = STRAND_B[i];
    if (a && b) out.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
  }
  return out;
})();

export function InfinityLoopStatic() {
  return (
    /*
      Dekoracja czysta (aria-hidden dostaje już slot-rodzic w Hero.tsx; tu
      dublujemy — SVG bywa czytany przez AT, gdy trafi do DOM bez rodzica).
      Wymiary niesie slot (aspect-[940/420]); SVG wypełnia go w 100%.
    */
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      className="inf-loop-static block h-full w-full"
    >
      {/* „Drabinka DNA": cienkie linie między nitkami (pod kropkami). */}
      <g stroke={LINK_STROKE} strokeWidth="1">
        {LINKS.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>
      {/* Nitka cyan. */}
      <g fill={CYAN}>
        {STRAND_A.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fillOpacity={d.a} />
        ))}
      </g>
      {/* Nitka magenta (faza +π — przeplot). */}
      <g fill={MAGENTA}>
        {STRAND_B.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fillOpacity={d.a} />
        ))}
      </g>
    </svg>
  );
}
