'use client';

/**
 * OsCzasu — pozioma oś break-even dla paybacku (spec 07 §2.3). Czysty SVG, bez
 * bibliotek. Pokazuje: start (inwestujesz) -> punkt zera (miesiąc paybacku) ->
 * czysty plus (24 mc). A11y: role="img" + <title>/<desc>, a liczby (payback,
 * zysk 24 mc) są też w tekście pod osią w komponencie-rodzicu (nie tylko grafika).
 *
 * `paybackMc` zaokrąglany do skali 0..24. Gdy > 24, marker zera dosuwa się do końca.
 */
type OsCzasuProps = {
  paybackMc: number;
  /** Sformatowany payback do <desc> (np. "4 miesiące"). */
  paybackLabel: string;
  /** Sformatowany zysk po 24 mc (np. "120 000 zł"). */
  zysk24Label: string;
};

export function OsCzasu({ paybackMc, paybackLabel, zysk24Label }: OsCzasuProps) {
  const W = 320;
  const H = 96;
  const padX = 20;
  const axisY = 52;
  const maxMc = 24;
  const clampedPb = Math.max(0, Math.min(maxMc, paybackMc));
  const zeroX = padX + (clampedPb / maxMc) * (W - padX * 2);

  return (
    <figure className="mt-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`Oś zwrotu inwestycji. Zwrot po ${paybackLabel}, zysk po 24 miesiącach ${zysk24Label}.`}
        className="h-auto w-full max-w-[440px]"
      >
        <title>Oś zwrotu inwestycji</title>
        <desc>
          Inwestujesz na starcie, wychodzisz na zero po {paybackLabel}, po 24 miesiącach zysk{' '}
          {zysk24Label}.
        </desc>

        {/* część "pod kreską" (inwestycja) */}
        <rect x={padX} y={axisY} width={zeroX - padX} height={6} rx={3} fill="var(--border-strong)" />
        {/* część "na plusie" */}
        <rect
          x={zeroX}
          y={axisY}
          width={W - padX - zeroX}
          height={6}
          rx={3}
          fill="var(--accent)"
        />

        {/* marker startu */}
        <circle cx={padX} cy={axisY + 3} r={4} fill="var(--brand)" />
        <text x={padX} y={axisY - 8} textAnchor="start" fontSize={10} fill="var(--fg-muted)">
          Start
        </text>

        {/* marker zera (break-even) */}
        <line
          x1={zeroX}
          y1={axisY - 6}
          x2={zeroX}
          y2={axisY + 14}
          stroke="var(--accent)"
          strokeWidth={2}
        />
        <text
          x={zeroX}
          y={axisY - 12}
          textAnchor="middle"
          fontSize={10}
          fontWeight={600}
          fill="var(--accent)"
        >
          Zwrot: {paybackLabel}
        </text>

        {/* koniec (24 mc) */}
        <text
          x={W - padX}
          y={axisY + 24}
          textAnchor="end"
          fontSize={10}
          fill="var(--fg-muted)"
        >
          24 mc
        </text>
        <text
          x={W - padX}
          y={axisY - 8}
          textAnchor="end"
          fontSize={10}
          fontWeight={600}
          className="tabular-nums"
          fill="var(--fg)"
        >
          +{zysk24Label}
        </text>
      </svg>
    </figure>
  );
}
