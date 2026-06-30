'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Lekkie zamienniki hooków z framer-motion (czysty React + Web API), żeby usunąć
 * ~42 KiB biblioteki i ~3 s blokady głównego wątku na mobile (PageSpeed). Zachowują
 * tę samą semantykę, której używaliśmy: detekcja reduced-motion i wejścia w widok.
 */

/** prefers-reduced-motion jako reaktywny boolean (false do czasu pomiaru = SSR-safe). */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
}

/**
 * useInView — zamiennik framerowego useInView na IntersectionObserver.
 * `once` = po pierwszym wejściu przestajemy obserwować. `margin` = rootMargin.
 */
export function useInView(
  ref: RefObject<Element | null>,
  { once = false, margin = '0px' }: { once?: boolean; margin?: string } = {}
): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, margin]);
  return inView;
}
