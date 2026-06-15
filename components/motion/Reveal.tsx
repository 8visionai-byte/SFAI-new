'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Reveal — scroll-reveal wejścia treści (spec 02 §5.2, biała lista).
 * fade + translateY(16px->0), `whileInView`, `once:true`, margin -10%.
 * Prowadzi wzrok w dół sekcja po sekcji do CTA.
 *
 * WAŻNE (GEO): to jest TYLKO wzbogacenie. Treść jest w HTML od razu (SSR),
 * a reduced-motion pokazuje ją natychmiast (opacity 1, bez przesunięcia).
 * Bot AI i czytnik widzą pełny tekst niezależnie od JS.
 *
 * `as` ograniczone do 'div' | 'li' (jedyne potrzebne tagi) — motion-komponenty
 * tworzone RAZ na poziomie modułu, nie w renderze (stabilność animacji).
 */
const MOTION = {
  div: motion.div,
  li: motion.li,
} as const;

type RevealProps = {
  as?: keyof typeof MOTION;
  children: ReactNode;
  /** Opóźnienie startu (s) — do staggera kolejnych elementów. */
  delay?: number;
  className?: string;
};

export function Reveal({ as = 'div', children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = MOTION[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
