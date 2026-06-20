'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatedMetric } from '@/components/motion/AnimatedMetric';
import { Radar } from './Radar';
import { CaptureMaila } from './CaptureMaila';
import { WynikCTA } from './WynikCTA';
import { DISCLAIMER_QUIZ } from '@/lib/narzedzia/stale';
import {
  OSIE,
  PYTANIA,
  CTA_WG_WERDYKTU,
  progDla,
  type OsId,
} from '@/lib/narzedzia/test-gotowosci';

/**
 * TestGotowosciAI — SATELITA 2 (spec 07 §3). Quiz 8 pytań -> poziom + radar +
 * 3 rekomendacje z linkami do REALNYCH usług. Wzorzec kafelków + paska postępu
 * z DiagnozaForm (klik = auto-next, aria-pressed). Zero danych osobowych do wyniku.
 *
 * Logika deterministyczna (tablica wag w lib/narzedzia/test-gotowosci.ts) — żaden
 * model AI po stronie klienta. Wynik osi = średnia 2 odpowiedzi (waga 0–10 -> %).
 */
export function TestGotowosciAI() {
  const [krok, setKrok] = useState(0); // 0..7 pytania, 8 = wynik
  const [odp, setOdp] = useState<Record<string, number>>({}); // pytanieId -> waga

  const ukonczone = krok >= PYTANIA.length;

  // Wyniki osi (0–100) + globalny. Liczone gdy komplet odpowiedzi.
  const wynik = useMemo(() => {
    const perOs: Record<OsId, number[]> = { procesy: [], dane: [], ludzie: [], usecase: [] };
    for (const p of PYTANIA) {
      const w = odp[p.id];
      if (typeof w === 'number') perOs[p.os].push(w);
    }
    const osie = OSIE.map((o) => {
      const arr = perOs[o.id];
      const avg = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; // 0–10
      return { ...o, value: Math.round(avg * 10) }; // -> 0–100
    });
    const globalny = Math.round(osie.reduce((a, b) => a + b.value, 0) / osie.length);
    // 3 najsłabsze osie -> rekomendacje (rosnąco po value).
    const najslabsze = [...osie].sort((a, b) => a.value - b.value).slice(0, 3);
    const useCaseOs = osie.find((o) => o.id === 'usecase')!;
    return { osie, globalny, najslabsze, useCaseOs };
  }, [odp]);

  const prog = progDla(wynik.globalny);
  const ctaMikro =
    CTA_WG_WERDYKTU[prog.etykieta] ?? 'Pokażę Ci, od czego konkretnie zacząć. Bezpłatna diagnoza.';

  function odpowiedz(pytanieId: string, waga: number) {
    setOdp((prev) => ({ ...prev, [pytanieId]: waga }));
    setKrok((k) => k + 1);
  }

  function reset() {
    setOdp({});
    setKrok(0);
  }

  // ===== WIDOK QUIZU =====
  if (!ukonczone) {
    const p = PYTANIA[krok];
    const postep = ((krok + 1) / PYTANIA.length) * 100;
    // krok jest zawsze < PYTANIA.length (gate `ukonczone` wyżej); guard dla TS (noUncheckedIndexedAccess)
    if (!p) return null;
    return (
      <div className="card-aura mx-auto max-w-narrow rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-7">
        {/* pasek postępu */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-caption font-semibold uppercase tracking-[0.08em] text-fg-subtle">
              Pytanie {krok + 1} z {PYTANIA.length}
            </span>
            <span className="text-caption text-fg-subtle">
              {krok + 1}/{PYTANIA.length}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border" role="presentation">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-base ease-out"
              style={{ width: `${postep}%` }}
            />
          </div>
        </div>

        <fieldset>
          <legend className="text-h3 mb-4">{p.pytanie}</legend>
          <div className="space-y-3">
            {p.odpowiedzi.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => odpowiedz(p.id, o.waga)}
                className="flex min-h-[60px] w-full items-center rounded-md border-[1.5px] border-border bg-surface-sunken px-4 py-3 text-left text-body-sm font-medium text-fg transition-[border-color,background-color] duration-fast ease-out hover:border-border-strong focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>

        {krok > 0 ? (
          <button
            type="button"
            onClick={() => setKrok((k) => Math.max(0, k - 1))}
            className="mt-5 text-caption text-fg-muted underline decoration-1 underline-offset-2 hover:text-fg focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
          >
            Wstecz
          </button>
        ) : null}
      </div>
    );
  }

  // ===== WIDOK WYNIKU =====
  return (
    <div className="mx-auto max-w-narrow">
      <div className="card-aura rounded-xl border border-border bg-bg-subtle p-6 shadow-sm sm:p-7">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.08em] text-fg-subtle">
              Twój poziom gotowości
            </p>
            <p className="text-h2 font-display font-semibold text-fg">{prog.etykieta}</p>
            <p className="mt-1 text-body-sm text-fg-muted">{prog.sens}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-metric font-display font-semibold tabular-nums text-accent">
              <AnimatedMetric value={`${wynik.globalny}`} />
            </span>
            <span className="block text-caption text-fg-subtle">na 100</span>
          </div>
        </div>

        {/* Radar (dekoracja) + paski tekstowe (dostępny fallback, bez JS także działa) */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Radar osie={wynik.osie.map((o) => ({ label: o.label, value: o.value }))} />
          <ul className="space-y-3 self-center">
            {wynik.osie.map((o) => (
              <li key={o.id}>
                <div className="mb-1 flex items-center justify-between text-caption">
                  <span className="font-medium text-fg">{o.label}</span>
                  <span className="font-semibold tabular-nums text-fg-muted">{o.value}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border" role="presentation">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${o.value}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wskazanie procesu, który najszybciej się zwróci (z osi use-case) */}
      <div className="card-aura mt-4 rounded-xl border-[1.5px] border-border-accent bg-surface p-5 shadow-sm">
        <p className="text-caption font-semibold uppercase tracking-[0.08em] text-accent">
          Pierwszy proces do zdjęcia
        </p>
        <p className="mt-1 text-body-sm text-fg">
          {wynik.useCaseOs.value >= 60
            ? 'Masz jasny pierwszy kandydat. Zacznijmy od tego procesu, który robicie najczęściej, i zdejmijmy go na pilotaż.'
            : 'Najpierw nazwijmy jeden konkretny proces do zdjęcia. Najlepszy na start jest częsty, schematyczny i nie wymaga decyzji człowieka.'}
        </p>
      </div>

      {/* 3 rekomendacje z najsłabszych osi + linki do REALNYCH usług */}
      <div className="card-aura mt-4 rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
        <h3 className="text-h3">Od czego zacząć: 3 rzeczy</h3>
        <ol className="mt-4 space-y-4">
          {wynik.najslabsze.map((o, i) => (
            <li key={o.id} className="flex gap-3">
              <span className="mt-0.5 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-accent-soft text-caption font-semibold text-accent-hover">
                {i + 1}
              </span>
              <div>
                <p className="text-body-sm text-fg">{o.rekomendacja}</p>
                <Link
                  href={o.uslugaHref}
                  className="mt-1 inline-block text-caption font-semibold text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
                >
                  Zobacz, jak to robimy
                </Link>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-caption text-fg-subtle">{DISCLAIMER_QUIZ}</p>
      </div>

      <div className="mt-4">
        <CaptureMaila
          zacheta="Wyślę Ci plan na 30 dni na maila"
          podpis="Dostaniesz swój wynik i 3 kroki w PDF. Bez spamu."
          cta="Wyślij mi plan PDF"
        />
      </div>

      <WynikCTA mikrokopia={ctaMikro} />

      <button
        type="button"
        onClick={reset}
        className="mt-4 text-caption text-fg-muted underline decoration-1 underline-offset-2 hover:text-fg focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
      >
        Zacznij test od nowa
      </button>
    </div>
  );
}
