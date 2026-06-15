'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * HeroPersonaCycler — jedno słowo/fraza w podtytule hero cykluje co ~2.5 s
 * z subtelnym fade (spec 03 §Hero, personalizacja językiem, NIE behawioralna = RODO-safe).
 *
 * Reduced-motion → statyczny pierwszy wariant (bez ruchu).
 * SSR-safe: pierwsza pozycja renderuje się serwerowo (bot widzi pełne zdanie).
 */
const PERSONAS = [
  'salonu, w którym telefon dzwoni, gdy masz nożyczki w ręku',
  'firmy budowlanej, gdzie wyceny giną w SMS-ach',
  'gabinetu, w którym ktoś musi odbierać i umawiać wizyty',
  'e-commerce, gdzie te same pytania wracają 100 razy dziennie',
  'biura, w którym faktury i maile zjadają pół dnia',
] as const;

const INTERVAL = 2800;

export function HeroPersonaCycler() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PERSONAS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduce]);

  if (reduce) {
    return <span className="text-fg">{PERSONAS[0]}</span>;
  }

  return (
    <span className="relative inline-block align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-block text-fg"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          {PERSONAS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
