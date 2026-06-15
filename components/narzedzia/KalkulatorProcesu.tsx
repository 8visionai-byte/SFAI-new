'use client';

import { useMemo, useState } from 'react';
import { AnimatedMetric } from '@/components/motion/AnimatedMetric';
import { PolePrzewodnik } from './PolePrzewodnik';
import { OsCzasu } from './OsCzasu';
import { CaptureMaila } from './CaptureMaila';
import { WynikCTA } from './WynikCTA';
import { TYG_NA_MC, MIESIACE, DISCLAIMER, zl, godziny, liczba } from '@/lib/narzedzia/stale';

/**
 * KalkulatorProcesu — SATELITA 1 (spec 07 §2). Liczy JEDEN proces + payback.
 *
 * Wzór:
 *   koszt_procesu_rok = razy_tydz × minut/60 × 4,33 × 12 × stawka × osoby
 *   godziny_rok       = razy_tydz × minut/60 × 4,33 × 12 × osoby
 *   oszczednosc_rok   = koszt_procesu_rok × proc_auto
 *   payback (tylko gdy podano koszt wdrożenia):
 *     zysk_netto_mc = oszczednosc_rok/12 − opieka_mc
 *     payback_mc    = koszt_wdrozenia / zysk_netto_mc
 *     zysk_24mc     = zysk_netto_mc × 24 − koszt_wdrozenia
 *
 * ZERO zmyślonych cen po naszej stronie: koszt wdrożenia i opieka pochodzą WYŁĄCZNIE
 * od użytkownika. Puste -> pokazujemy tylko oszczędność/rok i godziny, bez paybacku.
 */
const POWTARZALNOSC = [
  { id: 'wysoka', label: 'Zawsze tak samo, jasne reguły', proc: 0.8 },
  { id: 'srednia', label: 'Przeważnie tak samo, czasem wyjątek', proc: 0.6 },
  { id: 'niska', label: 'Często wymaga decyzji człowieka', proc: 0.4 },
] as const;

export function KalkulatorProcesu() {
  const [nazwa, setNazwa] = useState('');
  const [razyTydzien, setRazyTydzien] = useState(20);
  const [minut, setMinut] = useState(10);
  const [osoby, setOsoby] = useState(1);
  const [stawka, setStawka] = useState(60);
  const [proc, setProc] = useState(0.6);
  // Opcjonalne — puste string = brak danej (nie 0).
  const [kosztWdrozenia, setKosztWdrozenia] = useState('');
  const [opiekaMc, setOpiekaMc] = useState('');

  const w = useMemo(() => {
    const godzinyRok = (razyTydzien * minut) / 60 * TYG_NA_MC * MIESIACE * osoby;
    const kosztRok = godzinyRok * stawka;
    const oszczednoscRok = kosztRok * proc;
    const oszczednoscMc = oszczednoscRok / 12;

    const wdr = parseFloat(kosztWdrozenia);
    const op = parseFloat(opiekaMc);
    const maKoszt = !Number.isNaN(wdr) && wdr > 0;
    const opieka = !Number.isNaN(op) && op > 0 ? op : 0;
    const zyskNettoMc = oszczednoscMc - opieka;
    const paybackMc = maKoszt && zyskNettoMc > 0 ? wdr / zyskNettoMc : null;
    const zysk24 = maKoszt ? zyskNettoMc * 24 - wdr : null;

    return {
      godzinyRok,
      kosztRok,
      oszczednoscRok,
      oszczednoscMc,
      maKoszt,
      zyskNettoMc,
      paybackMc,
      zysk24,
    };
  }, [razyTydzien, minut, osoby, stawka, proc, kosztWdrozenia, opiekaMc]);

  // Werdykt (spec 07 §2.3) — z paybacku gdy jest, inaczej z oszczędności.
  const werdykt = useMemo(() => {
    if (w.paybackMc !== null) {
      if (w.paybackMc < 6)
        return {
          etykieta: 'Warto',
          ton: 'sukces' as const,
          zdanie: 'Zwrot poniżej 6 miesięcy to bardzo dobra inwestycja.',
          cta: 'Ten proces się spina. Pokażę Ci, jak go zdjąć.',
        };
      if (w.paybackMc <= 18)
        return {
          etykieta: 'Na granicy',
          ton: 'uwaga' as const,
          zdanie: 'Zwraca się, ale policz, czy to teraz priorytet.',
          cta: 'Sprawdźmy, czy to najlepszy proces na start. Bezpłatna diagnoza.',
        };
      return {
        etykieta: 'Jeszcze nie',
        ton: 'neutralny' as const,
        zdanie: 'Ten proces zwraca się wolno. Może jest ważniejszy do zdjęcia.',
        cta: 'Sprawdźmy, który proces zdejmie najwięcej. Bezpłatna diagnoza.',
      };
    }
    // Bez kosztu wdrożenia — werdykt z samej oszczędności rocznej.
    if (w.oszczednoscRok >= 5000)
      return {
        etykieta: 'Warto policzyć zwrot',
        ton: 'sukces' as const,
        zdanie: 'Ten proces zjada realne pieniądze. Dorzuć koszt wdrożenia, policzę zwrot.',
        cta: 'Policzmy razem zwrot dla Twojej wyceny. Bezpłatna diagnoza.',
      };
    return {
      etykieta: 'Mały proces',
      ton: 'neutralny' as const,
      zdanie: 'Ten konkretny proces kosztuje niewiele. Może jest ważniejszy do zdjęcia.',
      cta: 'Sprawdźmy, który proces zdejmie najwięcej. Bezpłatna diagnoza.',
    };
  }, [w.paybackMc, w.oszczednoscRok]);

  const tonClass: Record<typeof werdykt.ton, string> = {
    sukces: 'border-success bg-success-bg text-success',
    uwaga: 'border-warning bg-warning-bg text-warning',
    neutralny: 'border-border-strong bg-bg-subtle text-fg',
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
      {/* WEJŚCIE */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-7">
        <h3 className="text-h3">Opisz ten proces</h3>
        <p className="mt-1 text-caption text-fg-subtle">
          Koszt wdrożenia i opiekę podajesz Ty. My nie zgadujemy cen.
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <label htmlFor="kp-nazwa" className="mb-1 block text-body-sm font-medium text-fg">
              Nazwa procesu (opcjonalnie)
            </label>
            <input
              id="kp-nazwa"
              type="text"
              value={nazwa}
              onChange={(e) => setNazwa(e.target.value)}
              placeholder="np. przepisywanie zamówień z maila do systemu"
              className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border bg-surface-sunken px-4 text-body-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
            />
          </div>

          <PolePrzewodnik
            label="Ile razy w tygodniu"
            opis="Łącznie w całej firmie."
            value={razyTydzien}
            onChange={setRazyTydzien}
            min={1}
            max={500}
          />
          <PolePrzewodnik
            label="Ile minut za jednym razem"
            opis="Średni czas jednego wykonania."
            value={minut}
            onChange={setMinut}
            min={1}
            max={240}
            suffix="min"
          />
          <PolePrzewodnik
            label="Ile osób to robi"
            opis="Ile osób dzieli tę robotę."
            value={osoby}
            onChange={setOsoby}
            min={1}
            max={50}
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

          {/* Powtarzalność -> proc_auto */}
          <fieldset>
            <legend className="mb-2 text-body-sm font-medium text-fg">Jak bardzo schematyczne?</legend>
            <div className="space-y-2">
              {POWTARZALNOSC.map((p) => {
                const active = Math.abs(proc - p.proc) < 0.001;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setProc(p.proc)}
                    className={
                      'flex min-h-[48px] w-full items-center justify-between gap-3 rounded-sm border-[1.5px] px-4 py-2.5 text-left text-body-sm transition-[border-color,background-color] duration-fast ease-out focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring ' +
                      (active
                        ? 'border-accent bg-accent-soft text-fg'
                        : 'border-border bg-surface-sunken text-fg-muted hover:border-border-strong')
                    }
                  >
                    <span>{p.label}</span>
                    <span className="shrink-0 text-caption font-semibold tabular-nums text-fg-subtle">
                      {Math.round(p.proc * 100)}%
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Opcjonalne: koszt wdrożenia + opieka */}
          <div className="grid gap-4 rounded-md border border-dashed border-border-strong bg-bg-subtle p-4 sm:grid-cols-2">
            <div>
              <label htmlFor="kp-wdr" className="mb-1 block text-caption font-medium text-fg-muted">
                Koszt wdrożenia (opcjonalnie)
              </label>
              <input
                id="kp-wdr"
                type="number"
                inputMode="numeric"
                min={0}
                value={kosztWdrozenia}
                onChange={(e) => setKosztWdrozenia(e.target.value)}
                placeholder="np. 12000"
                className="min-h-[44px] w-full rounded-sm border-[1.5px] border-border bg-surface px-3 text-body-sm tabular-nums text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
              />
            </div>
            <div>
              <label htmlFor="kp-op" className="mb-1 block text-caption font-medium text-fg-muted">
                Opieka miesięczna (opcjonalnie)
              </label>
              <input
                id="kp-op"
                type="number"
                inputMode="numeric"
                min={0}
                value={opiekaMc}
                onChange={(e) => setOpiekaMc(e.target.value)}
                placeholder="np. 400"
                className="min-h-[44px] w-full rounded-sm border-[1.5px] border-border bg-surface px-3 text-body-sm tabular-nums text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
              />
            </div>
            <p className="text-caption text-fg-subtle sm:col-span-2">
              Masz wycenę? Wrzuć dowolną kwotę, a sprawdzimy, czy się spina.
            </p>
          </div>
        </div>
      </div>

      {/* WYNIK */}
      <div>
        <div className="rounded-xl border border-border bg-bg-subtle p-6 shadow-sm sm:p-7">
          {/* Werdykt */}
          <div className={`rounded-lg border-[1.5px] px-4 py-3 ${tonClass[werdykt.ton]}`}>
            <p className="text-caption font-semibold uppercase tracking-[0.08em] opacity-80">Werdykt</p>
            <p className="text-h3 font-display font-semibold">{werdykt.etykieta}</p>
          </div>
          <p className="mt-3 text-body-sm text-fg-muted">{werdykt.zdanie}</p>

          {/* Liczby */}
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border pt-5">
            <div className="col-span-2">
              <dt className="text-caption text-fg-subtle">Ten proces oddaje rocznie</dt>
              <dd className="text-metric font-display font-semibold tabular-nums text-fg">
                <AnimatedMetric value={zl(w.oszczednoscRok)} />
              </dd>
            </div>
            <div>
              <dt className="text-caption text-fg-subtle">Kosztuje dziś</dt>
              <dd className="font-semibold tabular-nums text-fg">{zl(w.kosztRok)}/rok</dd>
            </div>
            <div>
              <dt className="text-caption text-fg-subtle">Czas zajęty</dt>
              <dd className="font-semibold tabular-nums text-fg">{godziny(w.godzinyRok)}/rok</dd>
            </div>
            <div>
              <dt className="text-caption text-fg-subtle">Oszczędność</dt>
              <dd className="font-semibold tabular-nums text-fg">{zl(w.oszczednoscMc)}/mc</dd>
            </div>
            {w.paybackMc !== null ? (
              <div>
                <dt className="text-caption text-fg-subtle">Zwrot po</dt>
                <dd className="font-semibold tabular-nums text-fg">
                  {liczba(w.paybackMc, 1)} mc
                </dd>
              </div>
            ) : null}
          </dl>

          {/* Oś czasu paybacku — tylko gdy podano koszt i zwrot dodatni */}
          {w.paybackMc !== null && w.zysk24 !== null ? (
            <OsCzasu
              paybackMc={w.paybackMc}
              paybackLabel={`${liczba(w.paybackMc, 1)} mc`}
              zysk24Label={zl(Math.max(0, w.zysk24))}
            />
          ) : (
            <p className="mt-5 rounded-md border border-border bg-surface p-4 text-caption text-fg-muted">
              Dorzuć koszt wdrożenia powyżej, a policzę, po ilu miesiącach się zwróci i ile zostanie
              na plusie po 2 latach.
            </p>
          )}

          {/* Disclaimer */}
          <p className="mt-4 text-caption text-fg-subtle">{DISCLAIMER}</p>
        </div>

        <div className="mt-4">
          <CaptureMaila
            zacheta="Wyślij sobie ten rachunek na maila"
            podpis="Dostaniesz wynik dla tego procesu w PDF. Bez spamu."
          />
        </div>

        <WynikCTA mikrokopia={werdykt.cta} />
      </div>
    </div>
  );
}
