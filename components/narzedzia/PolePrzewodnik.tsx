'use client';

import { useId, type CSSProperties } from 'react';

/**
 * PolePrzewodnik — sprzężony suwak + pole numeryczne z opisem-przewodnikiem
 * (spec 07 §1.2). Jeden stan, dwie kontrolki edytujące tę samą liczbę.
 *
 * INFINITY (język CostForge): suwak dostaje KOLOROWY kciuk (kolor trasy marki
 * per suwak — prop `akcent` ustawia --range-c: accent-color + tło kciuka przez
 * klasę .inf-range), a wartość bieżąca siedzi w MONO PIGUŁCE POD suwakiem
 * (.inf-range-pill). Pigułka to wciąż EDYTOWALNE pole numeryczne (funkcja 1:1,
 * zmieniona tylko skórka i pozycja). Mobile: suwak pełna szerokość, jak był.
 *
 * A11y: <label> spięty z suwakiem; pole numeryczne ma własny aria-label i
 * aria-describedby (ten sam opis). Min/max/step na obu kontrolkach. Cel dotykowy
 * suwaka >=44px. Focus pigułki = focus-within (ring na kontenerze). Liczby w
 * tabular-nums (mono).
 */
type PolePrzewodnikProps = {
  label: string;
  /** Tekst-przewodnik pod polem ("typowe założenie, zmień na swoje"). */
  opis: string;
  /**
   * Wartość pola. `null` = pole PUSTE (użytkownik jeszcze nic nie wpisał).
   * Puste pole renderuje pusty input (nigdy NaN/undefined), a suwak stoi na `min`
   * z aria-valuetext mówiącym czytnikowi, że wartości nie ma.
   */
  value: number | null;
  onChange: (v: number) => void;
  /**
   * Wywoływane, gdy użytkownik wyczyści pole (kasowanie treści, wpisanie znaku
   * nieliczbowego). Brak propa = zachowanie jak dotąd: czyszczenie cofa do `min`.
   */
  onClear?: () => void;
  /** Pole musi być wypełnione, żeby dało się policzyć wynik (a11y: aria-required). */
  wymagane?: boolean;
  min: number;
  max: number;
  step?: number;
  /** Sufiks w polu (np. "zł", "h", "%") — czysto wizualny, wartość to liczba. */
  suffix?: string;
  /**
   * Kolor akcentu suwaka (hex z trasy marki, np. '#2b7cff') — per instancja
   * przez custom property --range-c (konwencja utilities .inf-* z globals.css).
   * Brak = akcent domyślny (cyjan).
   */
  akcent?: string;
};

export function PolePrzewodnik({
  label,
  opis,
  value,
  onChange,
  onClear,
  wymagane,
  min,
  max,
  step = 1,
  suffix,
  akcent,
}: PolePrzewodnikProps) {
  const sliderId = useId();
  const numberId = useId();
  const opisId = useId();

  const akcentStyle = akcent ? ({ '--range-c': akcent } as CSSProperties) : undefined;

  // Twarde domknięcie do zakresu (pole numeryczne pozwala wpisać spoza zakresu).
  function clamp(n: number): number {
    return Math.min(max, Math.max(min, n));
  }

  /**
   * Jedno wejście dla obu kontrolek. Pusty tekst albo wpis nieliczbowy (minus,
   * litery, wykładnik) NIE staje się liczbą: albo czyści pole (gdy rodzic to
   * obsługuje), albo cofa do `min` jak przed zmianą. Dzięki temu NaN nigdy nie
   * wychodzi z tego komponentu.
   */
  function zmien(raw: string) {
    const n = parseFloat(raw);
    if (raw.trim() === '' || !Number.isFinite(n)) {
      if (onClear) onClear();
      else onChange(min);
      return;
    }
    onChange(clamp(n));
  }

  return (
    <div>
      <label htmlFor={sliderId} className="mb-1 block text-body-sm font-medium text-fg">
        {label}
      </label>

      {/* Puste pole: suwak stoi na `min` (HTML nie zna pustego range), ale czytnik
          dostaje aria-valuetext „Nie wpisano", więc nie ogłasza wartości, której
          użytkownik nie podał. aria-required NIE idzie na suwak: rola slider go nie
          obsługuje (ARIA 1.2) — stan „wymagane" niesie pole numeryczne niżej. */}
      <input
        id={sliderId}
        type="range"
        value={value ?? min}
        min={min}
        max={max}
        step={step}
        aria-describedby={opisId}
        aria-valuetext={value === null ? 'Nie wpisano' : undefined}
        onChange={(e) => zmien(e.target.value)}
        style={akcentStyle}
        className="sf-range inf-range h-[44px] w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none"
      />

      {/* Wartość bieżąca — mono pigułka pod suwakiem (edytowalna). */}
      <div className="mt-1 flex items-center justify-between gap-3">
        <span style={akcentStyle} className="inf-range-pill">
          <input
            id={numberId}
            type="number"
            inputMode="decimal"
            value={value ?? ''}
            min={min}
            max={max}
            step={step}
            aria-label={`${label} (wartość liczbowa)`}
            aria-describedby={opisId}
            aria-required={wymagane ? true : undefined}
            onChange={(e) => zmien(e.target.value)}
            className="w-16 border-0 bg-transparent p-0 text-right font-mono text-body-sm font-bold tabular-nums text-fg focus:outline-none"
          />
          {suffix ? <span className="font-mono text-caption text-fg-muted">{suffix}</span> : null}
        </span>

        <p id={opisId} className="text-caption text-fg-subtle">
          {opis}
        </p>
      </div>
    </div>
  );
}

/* CSS DO DOPISANIA (partia CHAT+TOOLS): pełne reguły — kolorowy suwak CostForge
   (.inf-range) + mono pigułka wartości (.inf-range-pill). Kolor per instancja:
   --range-c (fallback = akcent marki). Reguły muszą trafić PO .sf-range w
   kolejności źródła (ta sama specyficzność pseudo-elementów — wygrywa późniejsza);
   focus kciuka zostaje z .sf-range:focus-visible (wyższa specyficzność, bez zmian).
   Bazowe klasy do @layer components; color-mix z pancernym fallbackiem.

@layer components {
  .inf-range {
    --range-c: var(--accent);
    accent-color: var(--range-c);
  }
  .inf-range::-webkit-slider-thumb {
    background: var(--range-c);
    box-shadow: var(--shadow-sm);
    box-shadow:
      var(--shadow-sm),
      0 0 14px -2px color-mix(in srgb, var(--range-c) 60%, transparent);
  }
  .inf-range::-moz-range-thumb {
    background: var(--range-c);
  }
  .inf-range::-moz-range-progress {
    background: var(--range-c);
    background: color-mix(in srgb, var(--range-c) 70%, transparent);
  }

  .inf-range-pill {
    --range-c: var(--accent);
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    min-height: 36px;
    padding: 0.25rem 0.875rem;
    border-radius: 999px;
    border: 1px solid var(--border-strong);
    border-color: color-mix(in srgb, var(--range-c) 45%, transparent);
    background-color: rgba(255, 255, 255, 0.04);
    background-color: color-mix(in srgb, var(--range-c) 10%, transparent);
    transition:
      border-color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);
  }
  .inf-range-pill:focus-within {
    border-color: var(--range-c);
    box-shadow: 0 0 0 3px var(--accent-soft);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--range-c) 25%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .inf-range-pill {
    transition: none !important;
  }
}
*/
