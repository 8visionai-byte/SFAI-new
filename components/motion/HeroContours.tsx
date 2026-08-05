/**
 * HeroContours — sygnaturowe tło hero: cyrkiel z loga „kreśli" warstwice wokół
 * punktu igły za H1. Czysty SERVER component: inline SVG, zero JS.
 *
 * Ruch (CSS w globals.css, klasy .sf-hero-* / .sf-contour / .sf-tickring):
 *  • kontury rysują się RAZ na wejściu (stroke-dashoffset, pathLength=1),
 *  • pierścień miarki obraca się 120 s — JEDYNA pętla ambient hero (budżet ruchu),
 *  • igła cyrkla jest STATYCZNA (bez oddechu — budżet ruchu).
 *
 * Gradient marki przez CAŁY kadr (userSpaceOnUse), nie per kształt — to jedno
 * z 4 legalnych miejsc gradientu na home (kontrakt BUDŻET KOLORU w globals.css).
 * DEKORACJA: aria-hidden, pointer-events:none; prefers-reduced-motion → kontury
 * od razu narysowane, pierścień stoi. Maska rozpływa tło przed szwem sekcji.
 */

/** Warstwice: (rx, ry, rotate, strokeOpacity) — środek 720,340 (za H1).
 *  Krycie podniesione o ~60% (0,16-0,06 -> 0,26-0,10): na ciepłym paperze
 *  poprzednie wartości były praktycznie niewidoczne, więc sygnaturowe tło hero
 *  nie istniało. To dekoracja (aria-hidden) — kontrast tekstu bez zmian. */
const CONTOURS = [
  { rx: 180, ry: 96, rotate: -8, opacity: 0.26 },
  { rx: 260, ry: 142, rotate: 5, opacity: 0.21 },
  { rx: 350, ry: 196, rotate: -4, opacity: 0.16 },
  { rx: 450, ry: 258, rotate: 7, opacity: 0.13 },
  { rx: 560, ry: 330, rotate: -2, opacity: 0.1 },
] as const;

export function HeroContours() {
  return (
    /* data-hero-field = hak scrub-paralaksy MotionOrchestratora (desktop po
       load): pole odpływa y 0 → -60px przy scrollu hero. Dekoracja bez zmian. */
    <div className="sf-hero-field" data-hero-field aria-hidden="true">
      <svg
        className="sf-hero-svg"
        viewBox="0 0 1440 810"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Gradient przez cały kadr — kolory łagodzone pod jasny paper. */}
          <linearGradient
            id="sfHeroGrad"
            gradientUnits="userSpaceOnUse"
            x1="140"
            y1="120"
            x2="1300"
            y2="690"
          >
            <stop offset="0%" stopColor="#2B7CFF" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#22E06B" />
          </linearGradient>
        </defs>

        {/* Warstwice — rysowane kolejno (stagger w CSS przez nth-of-type). */}
        {CONTOURS.map((c) => (
          <ellipse
            key={c.rx}
            className="sf-contour"
            cx={720}
            cy={340}
            rx={c.rx}
            ry={c.ry}
            transform={`rotate(${c.rotate} 720 340)`}
            pathLength={1}
            stroke="url(#sfHeroGrad)"
            strokeWidth={1}
            strokeOpacity={c.opacity}
          />
        ))}

        {/* Pierścień miarki — jedyna pętla ambient hero (120 s; mobile: ukryty). */}
        <g className="sf-tickring" style={{ transformOrigin: '720px 340px' }}>
          <circle
            cx={720}
            cy={340}
            r={470}
            stroke="url(#sfHeroGrad)"
            strokeWidth={1}
            strokeOpacity={0.1}
            strokeDasharray="2 44"
          />
        </g>

        {/* Igła cyrkla — STATYCZNA (budżet ruchu). */}
        <circle cx={720} cy={340} r={3} fill="#8B5CF6" fillOpacity={0.35} />
        <circle cx={720} cy={340} r={9} stroke="#8B5CF6" strokeOpacity={0.18} />
      </svg>
    </div>
  );
}
