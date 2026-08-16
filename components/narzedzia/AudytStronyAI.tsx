'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import { AnimatedMetric } from '@/components/motion/AnimatedMetric';
import { CaptureMaila } from './CaptureMaila';
import { WynikCTA } from './WynikCTA';
import {
  POZYCJE,
  MAX_PUNKTY,
  PRZYKLAD_KAPSULY,
  progAudytu,
} from '@/lib/narzedzia/audyt-strony';
import { INF_NARZEDZIE, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/* INFINITY v7 (audyt --card-c): kolor sekcji tego narzędzia z single source
   lib/inf-kategorie — ten sam, którym świeci jego kafel na liście hubu. Bez
   niego cztery panele wyspy spadały na fallbackowy akcent. Sama dekoracja. */
const DEKOR = INF_NARZEDZIE['audyt-strony-ai'] ?? INF_KATEGORIA_DEFAULT;
const TON = {
  '--card-c': DEKOR.c,
  '--card-c-l': DEKOR.odcien ?? DEKOR.c,
} as CSSProperties;
/* Panel „wszystko spełnione" niesie STATUS, nie kategorię — jego krawędź idzie
   w tokenie sukcesu (spójnie z bg-success-bg, którym już stoi). */
const TON_SUKCES = { '--card-c': 'var(--success)' } as CSSProperties;

/**
 * AudytStronyAI — SATELITA 3 (spec 07 §4). Samoocena checklist, ZERO fetchu cudzej
 * domeny (CORS) i ZERO kluczy. Klient ocenia własną stronę (tak / nie / nie wiem),
 * narzędzie liczy wynik i pokazuje TOP 3 do naprawy wg wagi.
 *
 * "nie wiem" = 0 pkt (jak "nie"), ale w wyniku oznaczone ⚠ (do sprawdzenia), nie ✗.
 * Uczciwe ograniczenie pokazane wprost: nie pobieramy kodu strony.
 */
type Odp = 'tak' | 'nie' | 'nie-wiem';

export function AudytStronyAI() {
  const [odp, setOdp] = useState<Record<string, Odp>>({});
  const [url, setUrl] = useState('');
  const [pokazWynik, setPokazWynik] = useState(false);

  const wszystkieOdp = POZYCJE.every((p) => odp[p.id]);

  const wynik = useMemo(() => {
    let punkty = 0;
    for (const p of POZYCJE) {
      if (odp[p.id] === 'tak') punkty += p.waga;
    }
    const score = Math.round((punkty / MAX_PUNKTY) * 100);
    // TOP 3 do naprawy: nie spełnione (nie / nie-wiem), posortowane wg wagi malejąco.
    const doNaprawy = POZYCJE.filter((p) => odp[p.id] !== 'tak')
      .sort((a, b) => b.waga - a.waga)
      .slice(0, 3);
    return { score, doNaprawy };
  }, [odp]);

  const prog = progAudytu(wynik.score);
  const ctaMikro =
    wynik.score <= 40
      ? 'Twoja strona może być niewidzialna dla ChatGPT. Pokażę Ci, jak to naprawić.'
      : wynik.score <= 70
        ? 'Jesteś w połowie drogi. Pokażę Ci, co domknąć, żeby AI Cię cytowało.'
        : 'Dobra robota. Pokażę Ci ostatnie rzeczy, które dadzą przewagę w AI.';

  function ustaw(id: string, v: Odp) {
    setOdp((prev) => ({ ...prev, [id]: v }));
  }

  const OPCJE: { v: Odp; label: string }[] = [
    { v: 'tak', label: 'Tak' },
    { v: 'nie', label: 'Nie' },
    { v: 'nie-wiem', label: 'Nie wiem' },
  ];

  return (
    <div className="mx-auto max-w-narrow">
      {/* Pole URL — tylko etykieta w raporcie, NIE fetchowane (uczciwie zakomunikowane).
          INFINITY v5 (spec §4): panele wyspy na .inf-card (ciemna karta wzorca
          z narożnikami i sweepem z globals) — pola kontrolne zostają na tokenach.
          INFINITY v8 „naczynia połączone" (audyt kart /narzedzia): KAŻDY panel
          tego narzędzia dostaje reflektor .inf-spotlight jako PIERWSZE dziecko —
          ta sama reakcja na kursor co karty usług i hubu. Reflektor jest
          absolutny (inset:0) i `pointer-events:none`, więc stoi POZA flow: nie
          rusza układu paneli, nie łapie kliknięć pól i przycisków, a fieldsety
          i listy zostają nietknięte (żaden panel nie stoi na space-y/divide-y
          ani na :first-child, więc dodatkowe dziecko niczego nie przesuwa). */}
      <div className="inf-card p-5 shadow-xs sm:p-6" style={TON}>
        <div aria-hidden="true" className="inf-spotlight" />

        <label htmlFor="au-url" className="mb-1 block text-body-sm font-medium text-fg">
          Adres Twojej strony (opcjonalnie)
        </label>
        <input
          id="au-url"
          type="url"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="twojafirma.pl"
          className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border bg-surface-sunken px-4 text-body-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
        />
        <p className="mt-2 text-caption text-fg-subtle">
          Nie pobieramy kodu Twojej strony. Oceniasz ją sam, na podstawie tego, co o niej wiesz.
        </p>
      </div>

      {/* Checklista 10 pozycji — panel .inf-card (spec §4). */}
      <div className="inf-card mt-4 p-5 shadow-xs sm:p-6" style={TON}>
        <div aria-hidden="true" className="inf-spotlight" />

        <h3 className="text-h3">Odpowiedz na 10 pytań o swojej stronie</h3>
        <ul className="mt-5 space-y-5">
          {POZYCJE.map((p, i) => (
            <li key={p.id} className="border-b border-border pb-5 last:border-b-0 last:pb-0">
              <fieldset>
                <legend className="text-body-sm font-medium text-fg">
                  <span className="text-fg-subtle">{i + 1}.</span> {p.pytanie}
                </legend>
                <div role="group" className="mt-3 grid grid-cols-3 gap-2">
                  {OPCJE.map((o) => {
                    const active = odp[p.id] === o.v;
                    return (
                      <button
                        key={o.v}
                        type="button"
                        aria-pressed={active}
                        onClick={() => ustaw(p.id, o.v)}
                        className={
                          'min-h-[44px] rounded-sm border-[1.5px] px-2 py-2 text-caption font-semibold transition-[border-color,background-color] duration-fast ease-out ' +
                          (active
                            ? 'border-accent bg-accent-soft text-fg'
                            : 'border-border bg-surface-sunken text-fg-muted hover:border-border-strong')
                        }
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setPokazWynik(true)}
          disabled={!wszystkieOdp}
          className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-sm bg-accent px-5 font-sans text-ui font-semibold text-accent-contrast shadow-accent transition-[transform,background-color] duration-fast ease-out hover:bg-accent-hover hover:-translate-y-px disabled:cursor-not-allowed disabled:bg-[var(--sf-gray-300)] disabled:text-[var(--sf-gray-500)] disabled:shadow-none sm:w-auto"
        >
          {wszystkieOdp ? 'Pokaż mój wynik' : `Odpowiedz na wszystkie (${Object.keys(odp).length}/10)`}
        </button>
      </div>

      {/* WYNIK */}
      {pokazWynik && wszystkieOdp ? (
        <>
          {/* Panel wyniku — .inf-card (spec §4). */}
          <div className="inf-card inf-card-edge mt-4 p-6 shadow-xs sm:p-7" style={TON}>
            <div aria-hidden="true" className="inf-spotlight" />

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-caption font-semibold uppercase tracking-[0.08em] text-fg-subtle">
                  Gotowość strony pod AI
                </p>
                <p className="text-h2 font-display font-semibold text-fg">{prog.etykieta}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-metric font-display font-semibold tabular-nums text-accent">
                  <AnimatedMetric value={`${wynik.score}`} />
                </span>
                <span className="block text-caption text-fg-subtle">na 100</span>
              </div>
            </div>

            {/* Pełna checklista z ✓ / ✗ / ⚠ */}
            <ul className="mt-6 space-y-3 border-t border-border pt-5">
              {POZYCJE.map((p) => {
                const stan = odp[p.id];
                const ikona = stan === 'tak' ? '✓' : stan === 'nie-wiem' ? '⚠' : '✗';
                const kolor =
                  stan === 'tak'
                    ? 'text-success'
                    : stan === 'nie-wiem'
                      ? 'text-warning'
                      : 'text-error';
                return (
                  <li key={p.id} className="flex gap-3 text-body-sm">
                    <span className={`mt-0.5 shrink-0 font-semibold ${kolor}`} aria-hidden="true">
                      {ikona}
                    </span>
                    <span className="text-fg-muted">
                      <span className="font-medium text-fg">{p.pytanie.replace(/\?.*/, '?')}</span>{' '}
                      {p.dlaczego}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* TOP 3 do naprawy — wyróżniony panel na .inf-card; wyróżnienie
              niesie krawędź karty w kolorze narzędzia (v7: jawne --card-c
              zamiast fallbackowego akcentu). */}
          {wynik.doNaprawy.length > 0 ? (
            <div className="inf-card inf-card-edge mt-4 p-5 shadow-xs sm:p-6" style={TON}>
              <div aria-hidden="true" className="inf-spotlight" />

              <h3 className="text-h3">Napraw to najpierw</h3>
              <p className="mt-1 text-caption text-fg-subtle">
                Posortowane wg wpływu na cytowalność. Góra = największy efekt.
              </p>
              <ol className="mt-4 space-y-3">
                {wynik.doNaprawy.map((p, i) => (
                  <li key={p.id} className="flex gap-3">
                    <span className="mt-0.5 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-accent-soft text-caption font-semibold text-accent-hover">
                      {i + 1}
                    </span>
                    <p className="text-body-sm text-fg">{p.dlaczego}</p>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="inf-card inf-card-edge mt-4 bg-success-bg p-5 text-body-sm text-fg" style={TON_SUKCES}>
              {/* Jedyny panel z gołym tekstem zamiast elementów — reflektor jest
                  absolutny, więc zdanie zostaje na swoim miejscu (tekst nie
                  dostaje żadnego marginesu ani nowej linii). */}
              <div aria-hidden="true" className="inf-spotlight" />
              Twoja strona spełnia wszystkie 10 punktów. Solidna baza pod cytowalność w AI.
            </div>
          )}

          {/* Fragment "tak by to wyglądało poprawione" (pozycja #2) — .inf-card. */}
          <div className="inf-card inf-card-quiet mt-4 p-5 shadow-xs sm:p-6" style={TON}>
            <div aria-hidden="true" className="inf-spotlight" />

            <p className="text-caption font-semibold uppercase tracking-[0.08em] text-fg-subtle">
              Tak wygląda dobra kapsuła odpowiedzi
            </p>
            <blockquote className="mt-2 border-l-2 border-border-accent pl-4 text-body-sm italic text-fg-muted">
              {PRZYKLAD_KAPSULY}
            </blockquote>
            <p className="mt-2 text-caption text-fg-subtle">
              Konkret, liczba, odpowiedź od pierwszego zdania. To jest forma, którą AI cytuje.
            </p>
          </div>

          {/* Uczciwe ograniczenie */}
          <p className="mt-4 text-caption text-fg-subtle">
            Oceniasz swoją stronę sam, na podstawie tego, co o niej wiesz. Nie pobieramy jej kodu.
            Pełny techniczny audyt robimy na bezpłatnej diagnozie.
          </p>

          <div className="mt-4">
            <CaptureMaila
              zacheta="Wyślij sobie ten audyt na maila"
              podpis="Dostaniesz checklistę z wynikiem i 3 priorytety w PDF."
              cta="Wyślij mi audyt PDF"
            />
          </div>

          <WynikCTA mikrokopia={ctaMikro} kolor={DEKOR.c} odcien={DEKOR.odcien} />
        </>
      ) : null}
    </div>
  );
}
