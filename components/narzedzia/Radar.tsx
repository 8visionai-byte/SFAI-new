'use client';

/**
 * Radar — wykres radarowy 4 osi (spec 07 §3.3). Czysty SVG, bez bibliotek.
 *
 * A11y / GEO: SVG jest dekoracją (aria-hidden), bo OBOK w komponencie-rodzicu są
 * 4 paski tekstowe z procentami (oś + %) — to one są dostępną i bezJS-ową wersją
 * danych (fallback wymagany przez spec §3.3). Radar tylko wzbogaca wizualnie.
 *
 * `osie` = dokładnie 4 wartości 0–100, w stałej kolejności (Procesy, Dane, Ludzie,
 * Use-case). Rysujemy siatkę (2 pierścienie) + wypełniony wielokąt wyniku.
 */
type RadarProps = {
  osie: { label: string; value: number }[];
};

export function Radar({ osie }: RadarProps) {
  const size = 220;
  const c = size / 2;
  const r = size / 2 - 28; // promień zewnętrzny (zostaw miejsce na etykiety)
  const n = osie.length;

  // Wierzchołek osi i (0 = góra), wartość 0..100 -> promień.
  function point(i: number, value: number) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const rr = (value / 100) * r;
    return [c + rr * Math.cos(angle), c + rr * Math.sin(angle)] as const;
  }

  const ring = (frac: number) =>
    osie
      .map((_, i) => {
        const [x, y] = point(i, frac * 100);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

  const shape = osie.map((o, i) => point(i, o.value));
  const shapePoints = shape.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      aria-hidden="true"
      className="mx-auto h-auto w-full max-w-[260px]"
    >
      {/* siatka */}
      <polygon points={ring(1)} fill="none" stroke="var(--border)" strokeWidth={1} />
      <polygon points={ring(0.5)} fill="none" stroke="var(--border)" strokeWidth={1} />
      {/* promienie + etykiety */}
      {osie.map((o, i) => {
        const [x, y] = point(i, 100);
        const [lx, ly] = point(i, 122);
        return (
          <g key={o.label}>
            <line x1={c} y1={c} x2={x} y2={y} stroke="var(--border)" strokeWidth={1} />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fontWeight={600}
              fill="var(--fg-muted)"
            >
              {o.label}
            </text>
          </g>
        );
      })}
      {/* wynik */}
      <polygon
        points={shapePoints}
        fill="var(--accent)"
        fillOpacity={0.18}
        stroke="var(--accent)"
        strokeWidth={2}
      />
      {shape.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill="var(--accent)" />
      ))}
    </svg>
  );
}
