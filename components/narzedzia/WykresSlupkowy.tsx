'use client';

import { useReducedMotion } from '@/components/motion/hooks';

/**
 * WykresSlupkowy — porównanie dwóch wartości (np. "koszt dziś" vs "koszt po")
 * czystym SVG/CSS, bez bibliotek (lekkość CWV — spec 07 §0.7, §1.3).
 *
 * A11y: SVG ma role="img" + <title>/<desc> (czytnik dostaje opis), a pod spodem
 * jest tekstowa legenda z liczbami (wartości NIE są tylko w grafice). Reduced-motion
 * = słupki od razu na pełnej wysokości (bez animacji wzrostu).
 *
 * Wysokość słupka skalowana do max z dwóch wartości. Różnica (oszczędność) zaznaczona
 * akcentem na drugim słupku.
 */
type Slupek = {
  label: string;
  value: number;
  /** Sformatowana etykieta wartości (np. "93 600 zł"). */
  display: string;
  /** Wariant koloru: 'bazowy' (granat, koszt dziś) lub 'akcent' (oszczędność). */
  ton: 'bazowy' | 'akcent';
};

type WykresSlupkowyProps = {
  slupki: [Slupek, Slupek];
  /** Opis dla czytnika (np. "Koszt roczny dziś vs po automatyzacji"). */
  opis: string;
};

export function WykresSlupkowy({ slupki, opis }: WykresSlupkowyProps) {
  const reduce = useReducedMotion();
  const max = Math.max(slupki[0].value, slupki[1].value, 1);

  // Geometria SVG (viewBox 0..100 w obu osiach, responsywne przez width=100%).
  const W = 320;
  const H = 200;
  const padBottom = 36;
  const padTop = 16;
  const usable = H - padBottom - padTop;
  const barW = 84;
  const gap = 64;
  const groupW = barW * 2 + gap;
  const startX = (W - groupW) / 2;

  return (
    <figure className="mt-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={opis}
        className="h-auto w-full max-w-[420px]"
      >
        <title>{opis}</title>
        <desc>
          {slupki[0].label}: {slupki[0].display}. {slupki[1].label}: {slupki[1].display}.
        </desc>

        {/* Linia bazowa */}
        <line
          x1={0}
          y1={H - padBottom}
          x2={W}
          y2={H - padBottom}
          stroke="var(--border)"
          strokeWidth={1}
        />

        {slupki.map((s, i) => {
          const h = (s.value / max) * usable;
          const x = startX + i * (barW + gap);
          const y = H - padBottom - h;
          const fill = s.ton === 'akcent' ? 'var(--accent)' : 'var(--brand)';
          return (
            <g key={s.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                rx={6}
                fill={fill}
                style={
                  reduce
                    ? undefined
                    : {
                        transformBox: 'fill-box',
                        transformOrigin: 'bottom',
                        animation: `sfBarGrow var(--dur-slow) var(--ease-out) both`,
                        animationDelay: `${i * 90}ms`,
                      }
                }
              />
              {/* Wartość nad słupkiem */}
              <text
                x={x + barW / 2}
                y={y - 6}
                textAnchor="middle"
                className="tabular-nums"
                fontSize={13}
                fontWeight={600}
                fill="var(--fg)"
              >
                {s.display}
              </text>
              {/* Etykieta pod osią */}
              <text
                x={x + barW / 2}
                y={H - padBottom + 18}
                textAnchor="middle"
                fontSize={11}
                fill="var(--fg-muted)"
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
