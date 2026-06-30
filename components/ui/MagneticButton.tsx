'use client';

import { useRef, type ReactNode } from 'react';
import { Button, type ButtonProps } from './Button';

/**
 * MagneticButton — magnetyczny/tilt efekt TYLKO dla jedynego głównego CTA
 * (spec 02 §5.2). Przyciąga się do kursora (max ~6px) + scale 1.02.
 *
 * WERSJA bez framer-motion: zwykły span + transform ustawiany na pointermove,
 * wygładzony przez `transition: transform` (.sf-magnetic w globals.css) = ten sam
 * „magnetyczny" feel bez biblioteki. Tylko mysz (pointerType === 'mouse'); na
 * dotyku i przy prefers-reduced-motion nie robi nic (treść/akcja zawsze dostępna).
 */
const MAX_OFFSET = 6; // px — subtelnie, motion służy uwadze nie efektowi

type MagneticButtonProps = ButtonProps & { children: ReactNode };

export function MagneticButton(props: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== 'mouse') return; // tylko mysz, nie dotyk
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    const clamp = (v: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, v / 3));
    el.style.transform = `translate(${clamp(relX)}px, ${clamp(relY)}px) scale(1.02)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return (
    <span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="sf-magnetic inline-flex"
    >
      <Button {...props} />
    </span>
  );
}
