'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * BlyskKierunkowy — nadaje kartom wewnątrz siebie KIERUNEK błysku zależny od
 * tego, którą krawędzią wjechał i wyjechał kursor.
 *
 * Zamówienie Pawła 2026-08-21: „jeżeli wchodzimy myszką z prawej strony, no to
 * rozbłysk idzie z prawej do lewej i wraca. Jeżeli wchodzimy z dołu, no to
 * rozbłysk idzie z dołu do góry."
 *
 * DLACZEGO TO WYMAGA JS: sam CSS nie zna pozycji kursora w chwili wejścia, więc
 * nie umie wybrać krawędzi startu. Ten komponent robi JEDNĄ rzecz — liczy, która
 * krawędź karty była najbliżej kursora, i zapisuje ją w `data-blysk`. Całą
 * animację (cztery zestawy keyframes) niesie CSS w globals.
 *
 * KOSZT: zero bibliotek, zero pętli animacji, zero pracy przy renderze. Dwa
 * nasłuchy na kartę, każdy tylko ustawia atrybut. Skrypt nie rusza się na
 * urządzeniach dotykowych ani przy `prefers-reduced-motion: reduce` (wtedy
 * karty zostają ze statycznym kolorem, który i tak jest widoczny w spoczynku).
 * Nie dotyka LCP: efekt jest czysto dekoracyjny i wchodzi po hydratacji.
 */
export function BlyskKierunkowy({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const korzen = ref.current;
    if (!korzen) return;
    /* Dotyk nie ma pojęcia „wjechał krawędzią", a reduced-motion to prośba
       użytkownika o spokój. W obu przypadkach nie podpinamy niczego. */
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const karty = Array.from(korzen.querySelectorAll<HTMLElement>('.inf-blysk'));
    if (karty.length === 0) return;

    /** Krawędź najbliższa kursorowi: L = lewa, P = prawa, G = górna, D = dolna. */
    const krawedz = (el: HTMLElement, x: number, y: number) => {
      const r = el.getBoundingClientRect();
      const dystanse: [string, number][] = [
        ['L', x - r.left],
        ['P', r.right - x],
        ['G', y - r.top],
        ['D', r.bottom - y],
      ];
      return dystanse.reduce((a, b) => (b[1] < a[1] ? b : a))[0];
    };

    /* Restart animacji: przeglądarka odpala keyframes tylko przy ZMIANIE stanu,
       więc przy szybkim wjeździe i wyjeździe trzeba ją zdjąć i wymusić reflow.
       `void el.offsetWidth` to najtańszy sposób na wymuszenie przeliczenia. */
    const odpal = (el: HTMLElement, kier: string, faza: 'we' | 'wy') => {
      delete el.dataset.faza;
      void el.offsetWidth;
      el.dataset.blysk = kier;
      el.dataset.faza = faza;
    };

    const sprzatacze: (() => void)[] = [];
    for (const karta of karty) {
      const we = (e: MouseEvent) => odpal(karta, krawedz(karta, e.clientX, e.clientY), 'we');
      const wy = (e: MouseEvent) => odpal(karta, krawedz(karta, e.clientX, e.clientY), 'wy');
      const koniec = () => delete karta.dataset.faza;
      karta.addEventListener('mouseenter', we);
      karta.addEventListener('mouseleave', wy);
      karta.addEventListener('animationend', koniec);
      sprzatacze.push(() => {
        karta.removeEventListener('mouseenter', we);
        karta.removeEventListener('mouseleave', wy);
        karta.removeEventListener('animationend', koniec);
      });
    }
    return () => sprzatacze.forEach((f) => f());
  }, []);

  return <div ref={ref}>{children}</div>;
}
