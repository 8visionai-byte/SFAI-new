'use client';

import { useEffect, useRef } from 'react';

/**
 * LicznikValue — liczba paska liczników hero z count-upem (spec INFINITY v3
 * §HERO pkt 8). OSOBNY mikro-plik klientowy, bo HeroLiczniki.tsx MUSI zostać
 * server componentem (importuje pełne rejestry treści — nie mogą trafić do
 * bundla klienta, wzorzec 1:1 z Header/HeaderClient), a jeden moduł nie może
 * być naraz server i client.
 *
 * KONTRAKT SSR (żelazna zasada „zero zmyślonych liczb, pełne liczby w DOM"):
 * render = PEŁNA liczba w HTML (boty/no-JS/czytniki widzą finalną wartość).
 * Count-up to WYŁĄCZNIE progressive enhancement: desktop ≥1024px + brak
 * prefers-reduced-motion + brak Save-Data; trigger przez IntersectionObserver,
 * przebieg 1,2 s (ease-out, rAF). Mobile/RM: liczba stoi statycznie.
 * min-width w ch = szerokość finalnej liczby — zero przesunięć layoutu (CLS 0).
 */
export function LicznikValue({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // BRAMKI jak w MotionGate: mobile / reduced-motion / Save-Data = bez ruchu.
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData === true) return;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1200);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          el.textContent = String(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      // Sprzątanie przywraca pełną liczbę (np. re-montaż przy zmianie ścieżki).
      el.textContent = String(value);
    };
  }, [value]);

  return (
    /* inline-block + minWidth w ch: liczba nie zwęża się w trakcie count-upu. */
    <span ref={ref} className={className} style={{ minWidth: `${String(value).length}ch` }}>
      {value}
    </span>
  );
}
