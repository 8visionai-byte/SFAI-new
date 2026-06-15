'use client';

import { useId } from 'react';

/**
 * PolePrzewodnik — sprzężony suwak + pole numeryczne z opisem-przewodnikiem
 * (spec 07 §1.2). Jeden stan, dwie kontrolki edytujące tę samą liczbę.
 *
 * A11y: <label> spięty z OBOMA inputami (suwak ma własne id, pole własne id, oba
 * opisuje ten sam tekst pod polem przez aria-describedby). Suwak i pole mają
 * min/max/step, więc klawiatura i czytnik dostają pełny kontekst. Cel dotykowy
 * suwaka >=44px (track h-11 z grubym kciukiem). Liczby w tabular-nums.
 *
 * Mobile-first: kciukiem działa suwak, palcem klawiatury pole. Wartość zawsze
 * widoczna jako liczba (nie tylko pozycja kciuka).
 */
type PolePrzewodnikProps = {
  label: string;
  /** Tekst-przewodnik pod polem ("typowe założenie, zmień na swoje"). */
  opis: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Sufiks w polu (np. "zł", "h", "%") — czysto wizualny, wartość to liczba. */
  suffix?: string;
};

export function PolePrzewodnik({
  label,
  opis,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: PolePrzewodnikProps) {
  const sliderId = useId();
  const numberId = useId();
  const opisId = useId();

  // Twarde domknięcie do zakresu (pole numeryczne pozwala wpisać spoza zakresu).
  function clamp(n: number): number {
    if (Number.isNaN(n)) return min;
    return Math.min(max, Math.max(min, n));
  }

  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-3">
        <label htmlFor={sliderId} className="text-body-sm font-medium text-fg">
          {label}
        </label>
        <div className="flex shrink-0 items-center gap-1.5">
          <input
            id={numberId}
            type="number"
            inputMode="decimal"
            value={value}
            min={min}
            max={max}
            step={step}
            aria-label={`${label} (wartość liczbowa)`}
            aria-describedby={opisId}
            onChange={(e) => onChange(clamp(parseFloat(e.target.value)))}
            className="w-20 rounded-sm border-[1.5px] border-border bg-surface px-2.5 py-1.5 text-right text-body-sm font-semibold tabular-nums text-fg focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
          />
          {suffix ? (
            <span className="text-body-sm font-medium text-fg-muted">{suffix}</span>
          ) : null}
        </div>
      </div>

      <input
        id={sliderId}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        aria-describedby={opisId}
        onChange={(e) => onChange(clamp(parseFloat(e.target.value)))}
        className="sf-range h-11 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none"
      />

      <p id={opisId} className="mt-1 text-caption text-fg-subtle">
        {opis}
      </p>
    </div>
  );
}
