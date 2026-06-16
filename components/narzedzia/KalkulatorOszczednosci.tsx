'use client';

import { useMemo, useState } from 'react';
import { AnimatedMetric } from '@/components/motion/AnimatedMetric';
import { PolePrzewodnik } from './PolePrzewodnik';
import { WykresSlupkowy } from './WykresSlupkowy';
import { CaptureMaila } from './CaptureMaila';
import { WynikCTA } from './WynikCTA';
import {
  TYG_NA_MC,
  MIESIACE,
  GODZINY_NA_ETAT,
  PRESETY_AUTO,
  TYPY_ZADANIA,
  DOMYSLNY_PROC_AUTO,
  DISCLAIMER,
  zl,
  godziny,
  liczba,
} from '@/lib/narzedzia/stale';

/**
 * KalkulatorOszczednosci — FLAGOWIEC (spec 07 §1). Wyspa 'use client'.
 *
 * Wzór (jawny, pokazany w <details>):
 *   oszczednosc_zl_rok = osoby × godz_tydz × 4,33 × 12 × stawka × proc_auto
 *   godziny_rok        = osoby × godz_tydz × 4,33 × 12 × proc_auto
 *   etaty              = godziny_rok / 2000
 *   koszt_dzis_rok     = osoby × godz_tydz × 4,33 × 12 × stawka
 *   koszt_po_rok       = koszt_dzis_rok − oszczednosc_zl_rok
 *
 * GEO: domyślne wartości = liczby z kapsuły answer-first strony (5 osób, 6 h, 60 zł,
 * 60%) -> przy 1. renderze widget pokazuje DOKŁADNIE przykład z HTML (spójność).
 * AnimatedMetric trzyma wartość finalną w treści (bot/brak-JS widzi liczbę).
 */
export function KalkulatorOszczednosci() {
  const [osoby, setOsoby] = useState(5);
  const [godzTydzien, setGodzTydzien] = useState(6);
  const [stawka, setStawka] = useState(60);
  const [procAuto, setProcAuto] = useState(DOMYSLNY_PROC_AUTO);
  const [typId, setTypId] = useState<string>('');

  const w = useMemo(() => {
    const bazaRok = osoby * godzTydzien * TYG_NA_MC * MIESIACE; // godziny całej roboty/rok
    const kosztDzisRok = bazaRok * stawka;
    const godzinyRok = bazaRok * procAuto;
    const oszczednoscRok = godzinyRok * stawka;
    const kosztPoRok = kosztDzisRok - oszczednoscRok;
    const etaty = godzinyRok / GODZINY_NA_ETAT;
    return {
      kosztDzisRok,
      godzinyRok,
      oszczednoscRok,
      kosztPoRok,
      etaty,
      oszczednoscMc: oszczednoscRok / 12,
      godzinyTydzien: godzinyRok / 52,
    };
  }, [osoby, godzTydzien, stawka, procAuto]);

  // Personalizacja mikrokopii CTA wg wyniku (spec 07 §1.4).
  const mikrokopia =
    w.oszczednoscRok >= 50000
      ? `Odzyskaj te ${zl(w.oszczednoscRok)}. Pokażę Ci dokładnie, od czego zacząć.`
      : 'Zobaczmy, gdzie jeszcze możesz odzyskać czas. Bezpłatna diagnoza, konkretna lista.';

  function wybierzTyp(id: string) {
    setTypId(id);
    const t = TYPY_ZADANIA.find((x) => x.id === id);
    if (t) setProcAuto(t.proc);
  }

  const procPct = Math.round(procAuto * 100);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
      {/* KOLUMNA WEJŚCIA */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-7">
        <h3 className="text-h3">Wpisz swoje liczby</h3>
        <p className="mt-1 text-caption text-fg-subtle">
          Domyślne wartości to typowe założenie. Zmień każde na swoje.
        </p>

        <div className="mt-6 space-y-6">
          <PolePrzewodnik
            label="Ile osób robi to zadanie"
            opis="Ile osób w zespole dotyka tej roboty."
            value={osoby}
            onChange={setOsoby}
            min={1}
            max={100}
          />
          <PolePrzewodnik
            label="Godziny tygodniowo na osobę"
            opis="Łącznie na tę jedną czynność, na jedną osobę."
            value={godzTydzien}
            onChange={setGodzTydzien}
            min={0.5}
            max={40}
            step={0.5}
            suffix="h"
          />
          <PolePrzewodnik
            label="Stawka godzinowa"
            opis="Koszt pracodawcy, nie pensja netto."
            value={stawka}
            onChange={setStawka}
            min={30}
            max={300}
            suffix="zł"
          />

          {/* Presety % + suwak */}
          <div>
            <div className="mb-2 flex items-end justify-between gap-3">
              <span className="text-body-sm font-medium text-fg">Ile da się zautomatyzować</span>
              <span className="text-body-sm font-semibold tabular-nums text-accent">{procPct}%</span>
            </div>
            <div
              role="group"
              aria-label="Wybierz poziom automatyzacji"
              className="grid grid-cols-3 gap-2"
            >
              {PRESETY_AUTO.map((p) => {
                const active = Math.abs(procAuto - p.proc) < 0.001;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setProcAuto(p.proc)}
                    className={
                      'min-h-[44px] rounded-sm border-[1.5px] px-2 py-2 text-caption font-semibold transition-[border-color,background-color] duration-fast ease-out focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring ' +
                      (active
                        ? 'border-accent bg-accent-soft text-fg'
                        : 'border-border bg-surface-sunken text-fg-muted hover:border-border-strong')
                    }
                  >
                    {p.label}
                    <span className="block text-overline font-normal text-fg-subtle">{p.opis}</span>
                  </button>
                );
              })}
            </div>
            <input
              type="range"
              value={procPct}
              min={10}
              max={90}
              step={5}
              aria-label="Procent automatyzacji (precyzyjnie)"
              onChange={(e) => setProcAuto(parseInt(e.target.value, 10) / 100)}
              className="sf-range mt-3 h-[44px] w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none"
            />
            <p className="mt-1 text-caption text-fg-subtle">
              Im bardziej schematyczne zadanie, tym wyższy procent.
            </p>
          </div>

          {/* Typ zadania (opcjonalny) */}
          <div>
            <label htmlFor="ko-typ" className="mb-1 block text-body-sm font-medium text-fg">
              Typ zadania (opcjonalnie)
            </label>
            <select
              id="ko-typ"
              value={typId}
              onChange={(e) => wybierzTyp(e.target.value)}
              className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border bg-surface-sunken px-4 text-body-sm text-fg focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
            >
              <option value="">Ustawia rozsądny domyślny procent</option>
              {TYPY_ZADANIA.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KOLUMNA WYNIKU */}
      <div>
        <div className="rounded-xl border border-border bg-bg-subtle p-6 shadow-sm sm:p-7">
          <p className="text-caption font-semibold uppercase tracking-[0.08em] text-fg-subtle">
            Odzyskujesz rocznie
          </p>
          {/* Hero wyniku — wartość finalna w HTML (AnimatedMetric animuje od 0) */}
          <p className="mt-1 text-metric font-display font-semibold tabular-nums text-fg">
            <AnimatedMetric value={zl(w.oszczednoscRok)} />
          </p>
          <p className="mt-2 text-body-sm text-fg-muted">
            To{' '}
            <strong className="font-semibold text-fg">{godziny(w.godzinyRok)}</strong> rocznie, czyli
            około{' '}
            <strong className="font-semibold text-fg">{liczba(w.etaty, 1)}</strong> etatu w
            przeliczeniu na pełny etat. Godziny, które wracają do zespołu na pracę, która naprawdę
            wymaga człowieka.
          </p>

          {/* Rozbicie mc / tydz */}
          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5 text-body-sm">
            <div>
              <dt className="text-caption text-fg-subtle">Miesięcznie</dt>
              <dd className="font-semibold tabular-nums text-fg">{zl(w.oszczednoscMc)}</dd>
            </div>
            <div>
              <dt className="text-caption text-fg-subtle">Tygodniowo</dt>
              <dd className="font-semibold tabular-nums text-fg">{godziny(w.godzinyTydzien)}</dd>
            </div>
          </dl>

          {/* Wykres koszt dziś vs po */}
          <WykresSlupkowy
            opis="Koszt powtarzalnej roboty rocznie: dziś kontra po automatyzacji."
            slupki={[
              { label: 'Koszt dziś', value: w.kosztDzisRok, display: zl(w.kosztDzisRok), ton: 'bazowy' },
              {
                label: 'Koszt po',
                value: w.kosztPoRok,
                display: zl(w.kosztPoRok),
                ton: 'akcent',
              },
            ]}
          />

          {/* Wzór rozwinięty — sygnał uczciwości */}
          <details className="mt-5 rounded-md border border-border bg-surface p-4">
            <summary className="cursor-pointer list-none text-body-sm font-medium text-fg [&::-webkit-details-marker]:hidden">
              Jak to liczę?
            </summary>
            <p className="mt-3 text-caption leading-relaxed text-fg-muted">
              {liczba(osoby)} os. × {liczba(godzTydzien, godzTydzien % 1 ? 1 : 0)} h/tydz × 4,33 × 12
              mc × {zl(stawka)}/h × {procPct}% ={' '}
              <strong className="font-semibold text-fg">{zl(w.oszczednoscRok)}</strong> rocznie.
            </p>
            <p className="mt-2 text-caption leading-relaxed text-fg-subtle">
              Stała 4,33 to liczba tygodni w miesiącu (52 / 12). Etat liczony jako 2000 godzin pracy
              w roku.
            </p>
          </details>

          {/* Disclaimer uczciwości */}
          <p className="mt-4 text-caption text-fg-subtle">{DISCLAIMER}</p>
        </div>

        {/* Lead magnet (opcjonalny, STUB Make.com) */}
        <div className="mt-4">
          <CaptureMaila
            zacheta="Wyślij sobie ten raport na maila"
            podpis="Dostaniesz swoje liczby w PDF. Bez spamu, słowo."
          />
        </div>

        {/* CTA z dowodem, mikrokopia personalizowana wynikiem */}
        <WynikCTA mikrokopia={mikrokopia} />
      </div>
    </div>
  );
}
