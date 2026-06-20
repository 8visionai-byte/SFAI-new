'use client';

import { useEffect } from 'react';

/**
 * AuraDesync — różnicuje TEMPO i FAZĘ „oddychających" ramek (.card-aura), żeby
 * ramki OBOK SIEBIE nie błyskały zsynchronizowane (życzenie Pawła: niech migoczą
 * niezależnie, nie wszystkie naraz).
 *
 * Mechanika: każdej ramce ustawia losowe `animation-duration` (tempo) i ujemny
 * `animation-delay` (faza) przez zmienne CSS (--aura-spin-* / --aura-breathe-*),
 * które czytają reguły .card-aura i .card-aura::before w globals.css. Ujemny delay
 * = animacja startuje od innego momentu cyklu, więc od razu są rozjechane.
 *
 * Bezpiecznie:
 *  - prefers-reduced-motion -> nic nie robimy (ramki i tak nie animują),
 *  - bez JS / przed hydracją -> fallbacki (5s/6s/0s) = stara, spójna wersja,
 *  - MutationObserver (z debounce) łapie karty dokładane przy nawigacji klienta,
 *  - znacznik data-aura-desync = idempotentność (każdą ramkę ruszamy raz).
 *
 * Render: null (czysty efekt uboczny).
 */
export function AuraDesync() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const rnd = (min: number, max: number) => min + Math.random() * (max - min);

    const apply = () => {
      const nodes = document.querySelectorAll<HTMLElement>(
        '.card-aura:not([data-aura-desync])'
      );
      nodes.forEach((el) => {
        el.setAttribute('data-aura-desync', '');
        // Tempo: błysk 5-8.5 s, oddech 4-6.5 s (każda ramka inne).
        el.style.setProperty('--aura-spin-dur', `${rnd(5, 8.5).toFixed(2)}s`);
        el.style.setProperty('--aura-breathe-dur', `${rnd(4, 6.5).toFixed(2)}s`);
        // Faza: ujemny delay w obrębie cyklu = start z innego miejsca.
        el.style.setProperty('--aura-spin-delay', `${(-rnd(0, 6)).toFixed(2)}s`);
        el.style.setProperty('--aura-breathe-delay', `${(-rnd(0, 5)).toFixed(2)}s`);
      });
    };

    apply();

    // Debounce: przy nawigacji/typewriterze DOM zmienia się często; coalesce.
    let scheduled = false;
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      window.setTimeout(() => {
        scheduled = false;
        apply();
      }, 250);
    };

    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  return null;
}
