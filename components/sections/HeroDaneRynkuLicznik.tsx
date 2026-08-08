'use client';

import { useEffect, useRef } from 'react';
import { dodajKlatke } from '@/components/motion/licznikTicker';

/**
 * DaneLicznik — animowana liczba chipa danych rynku (v10 §chipy, cytat Pawła:
 * „taki licznik, który cały czas bije do góry, ile już firm korzysta procentowo
 * z AI"). Odlicza od zera do wartości docelowej po wejściu chipa w kadr.
 *
 * OSOBNY MIKRO-PLIK KLIENTOWY, bo HeroDaneRynku.tsx zostaje komponentem
 * serwerowym (wzorzec 1:1 z HeroLiczniki + HeroLicznikiCountUp).
 *
 * KONTRAKT SSR (żelazna zasada „zero liczb bez pokrycia"): render = PEŁNA
 * wartość w HTML („8,7%”), więc bot AI, czytnik ekranu i użytkownik bez JS
 * widzą liczbę finalną, nigdy zera. Animacja to WYŁĄCZNIE wzbogacenie.
 *
 * BRAMKI 1:1 z MotionGate/HeroLicznikiCountUp: desktop ≥1024px, brak
 * prefers-reduced-motion, brak Save-Data. Mobile i RM: liczba stoi.
 *
 * PĘTLA: WSPÓLNY ticker (components/motion/licznikTicker) — zero własnego rAF
 * na chip. Pętla żyje wyłącznie w trakcie przebiegu i wyłącznie, gdy chip jest
 * w kadrze: IntersectionObserver bez `once` odpina klatkę przy wyjściu z kadru
 * (pauza poza kadrem) i puszcza przebieg od nowa przy powrocie.
 *
 * CLS 0: `.inf-counter-value` ma tabular-nums, a formatowanie trzyma stałą
 * liczbę miejsc po przecinku, więc „0,0%” i „8,7%” mają identyczną szerokość.
 */
const CZAS_MS = 1600;

export function DaneLicznik({
  wartosc,
  miejsca = 1,
  sufiks = '',
  className,
}: {
  /** Wartość docelowa jako liczba (np. 8.7). */
  wartosc: number;
  /** Miejsca po przecinku — stałe, żeby szerokość się nie zmieniała. */
  miejsca?: number;
  /** Doklejka za liczbą (np. „%”). */
  sufiks?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const finalny = `${wartosc.toLocaleString('pl-PL', {
    minimumFractionDigits: miejsca,
    maximumFractionDigits: miejsca,
  })}${sufiks}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData === true) return;

    const pelna = el.textContent ?? '';
    let odepnij: (() => void) | null = null;

    const pisz = (n: number) =>
      (el.textContent = `${n.toLocaleString('pl-PL', {
        minimumFractionDigits: miejsca,
        maximumFractionDigits: miejsca,
      })}${sufiks}`);

    const start = () => {
      odepnij?.();
      let t0 = 0;
      odepnij = dodajKlatke((teraz) => {
        if (t0 === 0) t0 = teraz;
        const p = Math.min(1, (teraz - t0) / CZAS_MS);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic (jak w pasku liczników)
        pisz(wartosc * eased);
        if (p < 1) return true;
        el.textContent = pelna; // finał = dokładny string z SSR
        odepnij = null;
        return false;
      });
    };

    const io = new IntersectionObserver(
      (wpisy) => {
        for (const wpis of wpisy) {
          if (wpis.isIntersecting) start();
          else {
            // Poza kadrem: klatka wypada ze wspólnej pętli, liczba wraca na finał.
            odepnij?.();
            odepnij = null;
            el.textContent = pelna;
          }
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      odepnij?.();
      el.textContent = pelna;
    };
  }, [wartosc, miejsca, sufiks]);

  return (
    <span ref={ref} className={className}>
      {finalny}
    </span>
  );
}
