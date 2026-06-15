'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Button, type ButtonProps } from './Button';

/**
 * MagneticButton — magnetyczny/tilt efekt TYLKO dla jedynego głównego CTA
 * (spec 02 §5.2). Przyciąga się do kursora (max ~6px) + scale 1.02.
 *
 * Wyłączony: na urządzeniach dotykowych (brak hovera) i przy prefers-reduced-motion.
 * W tych przypadkach renderuje zwykły Button — treść/akcja zawsze dostępna.
 */
const MAX_OFFSET = 6; // px — subtelnie, motion służy uwadze nie efektowi

type MagneticButtonProps = ButtonProps & { children: ReactNode };

export function MagneticButton(props: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  // Reduced-motion lub brak hovera (mobile) -> zwykły button bez wrappera ruchu
  if (reduce) {
    return <Button {...props} />;
  }

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== 'mouse') return; // tylko mysz, nie dotyk
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    const clamp = (v: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, v / 3));
    x.set(clamp(relX));
    y.set(clamp(relY));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Button {...props} />
    </motion.span>
  );
}
