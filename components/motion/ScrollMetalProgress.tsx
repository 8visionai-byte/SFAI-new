'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * ScrollMetalProgress — cienki, metaliczny pasek postępu czytania na samej górze
 * okna. Smaczek „premium": przy scrollu rośnie od 0 do 100% szerokości, w kolorze
 * marki (niebieski → fiolet → zielony). Daje wrażenie „żywej", dopracowanej strony
 * i subtelnie prowadzi wzrok w dół (do CTA #diagnoza).
 *
 * ZASADY (north star, nienegocjowalne):
 *  • DEKORACJA — nie niesie treści. aria-hidden, pointer-events:none, fixed.
 *  • prefers-reduced-motion → komponent NIE renderuje paska (zero ruchu, zero
 *    migotania). Treść strony jest kompletna bez niego.
 *  • Nie dotyka kontrastu tekstu (leży nad układem, nie pod tekstem treści).
 *  • Client island — montuje się po hydratacji; przy SSR/botach po prostu go nie ma
 *    (cytowalność i tak liczy się z treści, nie z paska).
 *
 * scaleX 0→1 ze sprężyną (useSpring) — płynnie, bez „skoków" przy szybkim scrollu.
 */
export function ScrollMetalProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Sprężyna wygładza wartość — pasek „dogania" scroll miękko (premium feel).
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Reduced-motion: brak paska w ogóle (najczystszy, statyczny stan).
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="bg-metal-decor pointer-events-none fixed inset-x-0 top-0 z-toast h-[3px] origin-left"
      style={{ scaleX }}
    />
  );
}
