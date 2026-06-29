'use client';

import { useEffect } from 'react';

/**
 * AuraDesync — robi DWIE rzeczy dla ramek .card-aura:
 *
 *  1) DESYNCHRONIZACJA (życzenie Pawła): każdej ramce ustawia losowe TEMPO
 *     (animation-duration) i FAZĘ (ujemny animation-delay) przez zmienne CSS
 *     (--aura-spin-* / --aura-breathe-*), żeby ramki obok siebie migotały
 *     niezależnie, a nie wszystkie w rytm.
 *
 *  2) WYDAJNOŚĆ (PageSpeed/CWV): pauzuje animacje ramek POZA widokiem przez
 *     IntersectionObserver (klasa .aura-paused → animation-play-state: paused).
 *     Animowany conic-ring (@property angle) re-rasteryzuje się co klatkę — przy
 *     ~44 ramkach to ponad 1 s pracy Style & Layout, które blokuje główny wątek
 *     i dociąga LCP. Animują więc tylko ramki widoczne; reszta zamrożona = 0 kosztu.
 *     rootMargin 200px = ramka rusza chwilę PRZED wejściem w kadr (płynnie, bez popu).
 *
 * Bezpiecznie:
 *  - prefers-reduced-motion -> nic nie robimy (ramki i tak nie animują),
 *  - bez JS / przed hydracją -> fallbacki CSS (5s/6s/0s) = stara, spójna wersja,
 *  - MutationObserver (debounce + filtr na .card-aura) łapie karty dokładane przy
 *    nawigacji klienta, ignorując mutacje niezwiązane z ramkami,
 *  - data-aura-desync = idempotentność (każdą ramkę ruszamy/obserwujemy raz).
 *
 * Render: null (czysty efekt uboczny).
 */
export function AuraDesync() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const rnd = (min: number, max: number) => min + Math.random() * (max - min);

    // Pauza poza widokiem: tańsze niż animowanie wszystkiego naraz.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          (e.target as HTMLElement).classList.toggle('aura-paused', !e.isIntersecting);
        }
      },
      { rootMargin: '200px 0px' }
    );

    const desync = (el: HTMLElement) => {
      el.setAttribute('data-aura-desync', '');
      // Tempo: błysk 5-8.5 s, oddech 4-6.5 s (każda ramka inne).
      el.style.setProperty('--aura-spin-dur', `${rnd(5, 8.5).toFixed(2)}s`);
      el.style.setProperty('--aura-breathe-dur', `${rnd(4, 6.5).toFixed(2)}s`);
      // Faza: ujemny delay w obrębie cyklu = start z innego miejsca.
      el.style.setProperty('--aura-spin-delay', `${(-rnd(0, 6)).toFixed(2)}s`);
      el.style.setProperty('--aura-breathe-delay', `${(-rnd(0, 5)).toFixed(2)}s`);
      // Pierwszy callback IO ustawi .aura-paused wg realnej widoczności.
      io.observe(el);
    };

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>('.card-aura:not([data-aura-desync])')
        .forEach(desync);
    };

    scan();

    // Łap NOWE ramki (nawigacja kliencka). Reaguj TYLKO gdy doszły węzły z .card-aura
    // — pomijamy mutacje niezwiązane z ramkami (np. animacje framer-motion).
    let scheduled = false;
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      window.setTimeout(() => {
        scheduled = false;
        scan();
      }, 300);
    };
    const hasAura = (n: Node) =>
      n instanceof HTMLElement &&
      (n.classList.contains('card-aura') || n.querySelector('.card-aura') !== null);
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        for (const n of r.addedNodes) {
          if (hasAura(n)) {
            schedule();
            return;
          }
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
