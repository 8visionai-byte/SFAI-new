'use client';

import { useEffect, useRef } from 'react';
import { dodajKlatke } from '@/components/motion/licznikTicker';

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
 * przebieg 1,2 s (ease-out). Mobile/RM: liczba stoi statycznie.
 * min-width w ch = szerokość finalnej liczby — zero przesunięć layoutu (CLS 0).
 *
 * v10 §7 („liczby animowane cały czas", interpretacja ostrożna ze spec):
 * 1. PĘTLA: koniec z pięcioma własnymi rAF — klatki jadą przez WSPÓLNY
 *    licznikTicker (components/motion), czyli jedną pętlę na cały dokument,
 *    tę samą, którą bije licznik chipa 8,7% (HeroDaneRynkuLicznik). Zero
 *    nowych pętli rAF na stronie.
 * 2. RESTART: IntersectionObserver bez `disconnect` po pierwszym przebiegu —
 *    KAŻDE wejście paska w kadr puszcza odliczanie od zera (wzorzec 1:1
 *    z licznikiem chipa; sam wzorzec infinitytechstack odlicza raz, restart to
 *    świadome „ponad wzorzec" z decyzji właściciela w spec v10 §7).
 * 3. PAUZA: wyjście z kadru odpina klatkę ze wspólnej pętli i przywraca
 *    finalną liczbę — poza kadrem nic nie tyka (bateria, TBT).
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

    let odepnij: (() => void) | null = null;

    // Przebieg 1,2 s na wspólnym tickerze; t0 z pierwszej klatki (spójne
    // z DaneLicznik — performance.now() sprzed klatki zawyżałby pierwszy krok).
    const start = () => {
      odepnij?.();
      let t0 = 0;
      odepnij = dodajKlatke((teraz) => {
        if (t0 === 0) t0 = teraz;
        const p = Math.min(1, (teraz - t0) / 1200);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        el.textContent = String(Math.round(value * eased));
        if (p < 1) return true;
        el.textContent = String(value); // finał = dokładna liczba z SSR
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
            el.textContent = String(value);
          }
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      odepnij?.();
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
