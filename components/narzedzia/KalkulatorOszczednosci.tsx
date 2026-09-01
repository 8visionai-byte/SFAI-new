'use client';

import { useMemo, useState, type CSSProperties } from 'react';
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
  DISCLAIMER,
  zl,
  godziny,
  liczba,
} from '@/lib/narzedzia/stale';
import { INF_NARZEDZIE, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/* INFINITY v7 (audyt: 10 z 17 kart /narzedzia szło bez --card-c, więc wszystkie
   panele wysp świeciły w hoverze jednym fallbackowym cyjanem). Kolor sekcji =
   ten sam wpis rejestru, z którego kafel tego narzędzia bierze kolor na liście
   hubu — single source lib/inf-kategorie. Sama dekoracja (custom property). */
const DEKOR = INF_NARZEDZIE['kalkulator-oszczednosci'] ?? INF_KATEGORIA_DEFAULT;
const TON = {
  '--card-c': DEKOR.c,
  '--card-c-l': DEKOR.odcien ?? DEKOR.c,
} as CSSProperties;

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
 * ZERO ZMYŚLONYCH LICZB (decyzja właściciela 2026-08-31): kalkulator NIE MA
 * wartości domyślnych. Każde pole startuje PUSTE (`null`), a dopóki brakuje
 * choćby jednej danej, kolumna wyniku nie pokazuje ŻADNEJ kwoty ani liczby, tylko
 * zdanie mówiące, co wpisać. Kwota widoczna na ekranie zawsze pochodzi w 100%
 * z liczb użytkownika. AnimatedMetric dostaje wartość dopiero z kompletu danych.
 */
export function KalkulatorOszczednosci() {
  // null = pole puste. Zero wartości startowych (patrz nagłówek pliku).
  const [osoby, setOsoby] = useState<number | null>(null);
  const [godzTydzien, setGodzTydzien] = useState<number | null>(null);
  const [stawka, setStawka] = useState<number | null>(null);
  const [procAuto, setProcAuto] = useState<number | null>(null);
  const [typId, setTypId] = useState<string>('');

  /**
   * `null` = brak kompletu danych. Wynik liczymy TYLKO z czterech wypełnionych
   * pól i tylko wtedy, gdy każda wyliczona liczba jest skończona (bramka na NaN
   * i Infinity, żeby do interfejsu nie trafiła żadna wartość-śmieć).
   */
  const w = useMemo(() => {
    if (osoby === null || godzTydzien === null || stawka === null || procAuto === null) {
      return null;
    }
    const bazaRok = osoby * godzTydzien * TYG_NA_MC * MIESIACE; // godziny całej roboty/rok
    const kosztDzisRok = bazaRok * stawka;
    const godzinyRok = bazaRok * procAuto;
    const oszczednoscRok = godzinyRok * stawka;
    const kosztPoRok = kosztDzisRok - oszczednoscRok;
    const etaty = godzinyRok / GODZINY_NA_ETAT;
    const oszczednoscMc = oszczednoscRok / 12;
    const godzinyTydzien = godzinyRok / 52;

    const liczby = [
      kosztDzisRok,
      godzinyRok,
      oszczednoscRok,
      kosztPoRok,
      etaty,
      oszczednoscMc,
      godzinyTydzien,
    ];
    if (!liczby.every((n) => Number.isFinite(n))) return null;

    return {
      kosztDzisRok,
      godzinyRok,
      oszczednoscRok,
      kosztPoRok,
      etaty,
      oszczednoscMc,
      godzinyTydzien,
      // Snapshot wejścia dla bloku „Jak to liczę?" (te same liczby co wynik).
      osoby,
      godzTydzien,
      stawka,
      procPct: Math.round(procAuto * 100),
    };
  }, [osoby, godzTydzien, stawka, procAuto]);

  // Personalizacja mikrokopii CTA wg wyniku (spec 07 §1.4). Bez wyniku = wariant
  // ogólny, bo w mikrokopii nie może pojawić się kwota, której nikt nie policzył.
  const mikrokopia =
    w && w.oszczednoscRok >= 50000
      ? `Odzyskaj te ${zl(w.oszczednoscRok)}. Pokażę Ci dokładnie, od czego zacząć.`
      : 'Zobaczmy, gdzie jeszcze możesz odzyskać czas. Bezpłatna diagnoza, konkretna lista.';

  function wybierzTyp(id: string) {
    setTypId(id);
    const t = TYPY_ZADANIA.find((x) => x.id === id);
    if (t) setProcAuto(t.proc);
  }

  // null = użytkownik jeszcze nie wybrał procentu (brak wartości domyślnej).
  const procPct = procAuto === null ? null : Math.round(procAuto * 100);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
      {/* KOLUMNA WEJŚCIA */}
      {/* INFINITY v5 (spec §4): shell wyspy na .inf-card (ciemna karta wzorca
          z narożnikami i sweepem z globals) — kontrolki zostają na tokenach.
          INFINITY v8 „naczynia połączone" (audyt kart /narzedzia): obie karty
          tej wyspy dostają reflektor .inf-spotlight jako PIERWSZE dziecko — ta
          sama poświata za kursorem co na kartach usług. Reflektor jest absolutny
          (inset:0) i `pointer-events:none`: nie wchodzi w flow karty, więc
          suwaki, presety i select działają jak wcześniej, a odstępy niesie
          wewnętrzny `space-y-6`, nie sama karta (dodatkowe dziecko nic nie
          przesuwa). */}
      <div className="inf-card p-6 shadow-xs sm:p-7" style={TON}>
        <div aria-hidden="true" className="inf-spotlight" />

        <h3 className="text-h3">Wpisz swoje liczby</h3>
        <p className="mt-1 text-caption text-fg-subtle">
          Pola są puste, bo liczymy tylko na Twoich danych. Wpisz cztery wartości.
        </p>

        {/* INFINITY (CostForge): każdy suwak ma inny kolor trasy marki
            (blue / violet / green) — kolor kciuka + pigułki wartości. */}
        <div className="mt-6 space-y-6">
          <PolePrzewodnik
            label="Ile osób robi to zadanie"
            opis="Ile osób w zespole dotyka tej roboty."
            value={osoby}
            onChange={setOsoby}
            onClear={() => setOsoby(null)}
            wymagane
            min={1}
            max={100}
            akcent="#2b7cff"
          />
          <PolePrzewodnik
            label="Godziny tygodniowo na osobę"
            opis="Łącznie na tę jedną czynność, na jedną osobę."
            value={godzTydzien}
            onChange={setGodzTydzien}
            onClear={() => setGodzTydzien(null)}
            wymagane
            min={0.5}
            max={40}
            step={0.5}
            suffix="h"
            akcent="#8b5cf6"
          />
          <PolePrzewodnik
            label="Stawka godzinowa"
            opis="Koszt pracodawcy, nie pensja netto."
            value={stawka}
            onChange={setStawka}
            onClear={() => setStawka(null)}
            wymagane
            min={30}
            max={300}
            suffix="zł"
            akcent="#22e06b"
          />

          {/* Presety % + suwak */}
          <div>
            <div className="mb-2 flex items-end justify-between gap-3">
              <span className="text-body-sm font-medium text-fg">Ile da się zautomatyzować</span>
              {/* Bez wyboru NIE pokazujemy procentu (żadnego „0%") — tylko prośba
                  o wybór, w tym samym miejscu i tej samej skórce. */}
              <span className="text-body-sm font-semibold tabular-nums text-accent">
                {procPct === null ? 'wybierz' : `${procPct}%`}
              </span>
            </div>
            <div
              role="group"
              aria-label="Wybierz poziom automatyzacji"
              className="grid grid-cols-3 gap-2"
            >
              {PRESETY_AUTO.map((p) => {
                const active = procAuto !== null && Math.abs(procAuto - p.proc) < 0.001;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setProcAuto(p.proc)}
                    className={
                      'min-h-[44px] rounded-sm border-[1.5px] px-2 py-2 text-caption font-semibold transition-[border-color,background-color] duration-fast ease-out ' +
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
              value={procPct ?? 10}
              min={10}
              max={90}
              step={5}
              aria-label="Procent automatyzacji (precyzyjnie)"
              aria-valuetext={procPct === null ? 'Nie wybrano' : `${procPct}%`}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                if (Number.isFinite(n)) setProcAuto(n / 100);
              }}
              className="sf-range inf-range mt-3 h-[44px] w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none"
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

      {/* KOLUMNA WYNIKU — INFINITY: karta wyniku = .inf-card z ZIELONĄ lewą
          krawędzią (oszczędność = green trasy), wartości pieniężne w mono.
          BEZ overflow-hidden (::before karty siedzi na krawędzi). Formuły i
          teksty 1:1. */}
      <div>
        <div
          className="inf-card inf-card-edge p-6 shadow-xs sm:p-7"
          style={{ '--card-c': '#22e06b' } as CSSProperties}
        >
          {/* Reflektor dziedziczy --card-c karty, więc tu świeci ZIELENIĄ
              oszczędności, a nie kolorem narzędzia. Tak ma być: poświata idzie
              za krawędzią karty. */}
          <div aria-hidden="true" className="inf-spotlight" />

          {/* A11y: stały region live (niewidoczny) mówi czytnikowi, czy wynik
              już jest. Treść zmienia się TYLKO przy przejściu brak wyniku <->
              wynik, więc suwaki go nie zagadują. Komunikat zastępczy niżej jest
              zwykłym tekstem w karcie, nie placeholderem w polu. */}
          <p aria-live="polite" className="sr-only">
            {w === null
              ? 'Brak wyniku. Uzupełnij cztery liczby po stronie wejścia.'
              : 'Wynik jest gotowy.'}
          </p>

          <p className="font-mono text-overline font-bold uppercase tracking-[0.14em] text-fg-subtle">
            Odzyskujesz rocznie
          </p>

          {w === null ? (
            /* BRAK KOMPLETU DANYCH: zero kwot, zero liczb, zero zera. Tylko
               informacja, co wpisać, żeby zobaczyć wynik. */
            <p className="mt-2 text-body-sm text-fg-muted">
              Wpisz cztery liczby: ile osób robi to zadanie, ile godzin w tygodniu na osobę, stawkę
              godzinową i ile da się zautomatyzować. Wynik liczymy wyłącznie z Twoich danych.
            </p>
          ) : (
            <>
              {/* Hero wyniku — wartość finalna w HTML (AnimatedMetric animuje od 0).
                  Mono + zieleń oszczędności (#22e06b na --surface: kontrast ~10:1). */}
              <p
                className="mt-1 font-mono text-metric font-bold tabular-nums"
                style={{ color: '#22e06b' }}
              >
                <AnimatedMetric value={zl(w.oszczednoscRok)} />
              </p>
              <p className="mt-2 text-body-sm text-fg-muted">
                To <strong className="font-semibold text-fg">{godziny(w.godzinyRok)}</strong>{' '}
                rocznie, czyli około{' '}
                <strong className="font-semibold text-fg">{liczba(w.etaty, 1)}</strong> etatu w
                przeliczeniu na pełny etat. Godziny, które wracają do zespołu na pracę, która
                naprawdę wymaga człowieka.
              </p>

              {/* Rozbicie mc / tydz */}
              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5 text-body-sm">
                <div>
                  <dt className="text-caption text-fg-subtle">Miesięcznie</dt>
                  <dd className="font-mono font-bold tabular-nums" style={{ color: '#22e06b' }}>
                    {zl(w.oszczednoscMc)}
                  </dd>
                </div>
                <div>
                  <dt className="text-caption text-fg-subtle">Tygodniowo</dt>
                  <dd className="font-mono font-bold tabular-nums text-fg">
                    {godziny(w.godzinyTydzien)}
                  </dd>
                </div>
              </dl>

              {/* Wykres koszt dziś vs po */}
              <WykresSlupkowy
                opis="Koszt powtarzalnej roboty rocznie: dziś kontra po automatyzacji."
                slupki={[
                  {
                    label: 'Koszt dziś',
                    value: w.kosztDzisRok,
                    display: zl(w.kosztDzisRok),
                    ton: 'bazowy',
                  },
                  {
                    label: 'Koszt po',
                    value: w.kosztPoRok,
                    display: zl(w.kosztPoRok),
                    ton: 'akcent',
                  },
                ]}
              />

              {/* Wzór rozwinięty — sygnał uczciwości */}
              <details className="sf-faq mt-5 rounded-md border border-border bg-surface p-4">
                <summary className="cursor-pointer list-none text-body-sm font-medium text-fg [&::-webkit-details-marker]:hidden">
                  Jak to liczę?
                </summary>
                <p className="mt-3 text-caption leading-relaxed text-fg-muted">
                  {liczba(w.osoby)} os. × {liczba(w.godzTydzien, w.godzTydzien % 1 ? 1 : 0)} h/tydz
                  × 4,33 × 12 mc × {zl(w.stawka)}/h × {w.procPct}% ={' '}
                  <strong className="font-semibold text-fg">{zl(w.oszczednoscRok)}</strong> rocznie.
                </p>
                <p className="mt-2 text-caption leading-relaxed text-fg-subtle">
                  Stała 4,33 to liczba tygodni w miesiącu (52 / 12). Etat liczony jako 2000 godzin
                  pracy w roku.
                </p>
              </details>
            </>
          )}

          {/* Disclaimer uczciwości */}
          <p className="mt-4 text-caption text-fg-subtle">{DISCLAIMER}</p>
        </div>

        {/* Lead magnet (opcjonalny, STUB Make.com) — dopiero przy gotowym wyniku,
            bo bez liczb nie ma czego wysyłać. */}
        {w !== null ? (
          <div className="mt-4">
            <CaptureMaila
              zacheta="Wyślij sobie ten raport na maila"
              podpis="Dostaniesz swoje liczby w PDF. Bez spamu, słowo."
            />
          </div>
        ) : null}

        {/* CTA z dowodem, mikrokopia personalizowana wynikiem */}
        <WynikCTA mikrokopia={mikrokopia} kolor={DEKOR.c} odcien={DEKOR.odcien} />
      </div>
    </div>
  );
}
