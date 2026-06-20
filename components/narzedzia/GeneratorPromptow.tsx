'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { WynikCTA } from './WynikCTA';
import {
  BRANZE,
  ZADANIA,
  CELE,
  STYLE,
  DOMYSLNE,
  zlozPrompt,
  getBranza,
  getZadanie,
  getCel,
  getStyl,
  type Opcja,
} from '@/lib/narzedzia/generator-promptow';

/**
 * GeneratorPromptow — 5. narzędzie huba /narzedzia. Wyspa 'use client'.
 *
 * Mechanika W PEŁNI DETERMINISTYCZNA (bez API): użytkownik wybiera 4 rzeczy
 * (branża + zadanie + cel + styl), a `zlozPrompt` (lib/narzedzia/generator-promptow)
 * skleja gotowy prompt z fragmentów stringowych w stałej kolejności. Zero modelu AI
 * po stronie klienta, zero logowania, zero czekania.
 *
 * Prompt liczy się od pierwszego renderu (DOMYSLNE) -> użytkownik od razu widzi
 * gotowy efekt. Przycisk "Kopiuj prompt" używa navigator.clipboard z fallbackiem
 * na zaznaczenie tekstu (gdy clipboard niedostępny). Statyczne przykłady i opis
 * (cytowalne) żyją w HTML strony obok wyspy.
 */
export function GeneratorPromptow() {
  const [branzaId, setBranzaId] = useState<string>(DOMYSLNE.branza);
  const [zadanieId, setZadanieId] = useState<string>(DOMYSLNE.zadanie);
  const [celId, setCelId] = useState<string>(DOMYSLNE.cel);
  const [stylId, setStylId] = useState<string>(DOMYSLNE.styl);
  const [skopiowano, setSkopiowano] = useState(false);

  const prompt = useMemo(
    () =>
      zlozPrompt({
        branza: getBranza(branzaId),
        zadanie: getZadanie(zadanieId),
        cel: getCel(celId),
        styl: getStyl(stylId),
      }),
    [branzaId, zadanieId, celId, stylId]
  );

  async function kopiuj() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(prompt);
      } else {
        // Fallback bez Clipboard API — zaznacz pole, użytkownik kopiuje ręcznie.
        const el = document.getElementById('gp-output') as HTMLTextAreaElement | null;
        el?.select();
        document.execCommand?.('copy');
      }
      setSkopiowano(true);
      window.setTimeout(() => setSkopiowano(false), 2200);
    } catch {
      setSkopiowano(false);
    }
  }

  function reset() {
    setBranzaId(DOMYSLNE.branza);
    setZadanieId(DOMYSLNE.zadanie);
    setCelId(DOMYSLNE.cel);
    setStylId(DOMYSLNE.styl);
    setSkopiowano(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
      {/* KOLUMNA WYBORÓW */}
      <div className="card-aura rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-7">
        <h3 className="text-h3">Złóż swój prompt</h3>
        <p className="mt-1 text-caption text-fg-subtle">
          Wybierz cztery rzeczy. Prompt złoży się sam, na bieżąco.
        </p>

        <div className="mt-6 space-y-5">
          <SelectPole
            id="gp-branza"
            label="Wybierz branżę"
            opis="Ustawia rolę i kontekst, w jakim AI ma się poruszać."
            value={branzaId}
            onChange={setBranzaId}
            opcje={BRANZE}
          />
          <SelectPole
            id="gp-zadanie"
            label="Co chcesz zrobić?"
            opis="Rodzaj tekstu, który AI ma napisać."
            value={zadanieId}
            onChange={setZadanieId}
            opcje={ZADANIA}
          />
          <SelectPole
            id="gp-cel"
            label="Jaki masz cel?"
            opis="Po co powstaje tekst. Steruje wezwaniem do działania."
            value={celId}
            onChange={setCelId}
            opcje={CELE}
          />
          <SelectPole
            id="gp-styl"
            label="W jakim stylu?"
            opis="Jak ma brzmieć tekst."
            value={stylId}
            onChange={setStylId}
            opcje={STYLE}
          />
        </div>

        <button
          type="button"
          onClick={reset}
          className="mt-6 text-caption text-fg-muted underline decoration-1 underline-offset-2 hover:text-fg focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
        >
          Zacznij od nowa
        </button>
      </div>

      {/* KOLUMNA WYNIKU */}
      <div>
        <div className="card-aura rounded-xl border border-border bg-bg-subtle p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="text-caption font-semibold uppercase tracking-[0.08em] text-fg-subtle">
              Twój gotowy prompt
            </p>
            <button
              type="button"
              onClick={kopiuj}
              aria-live="polite"
              className="inline-flex min-h-[40px] items-center rounded-sm border-[1.5px] border-accent bg-accent-soft px-4 text-caption font-semibold text-accent-hover transition-colors duration-fast hover:bg-accent hover:text-bg focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
            >
              {skopiowano ? 'Skopiowano. Wklej do AI.' : 'Kopiuj prompt'}
            </button>
          </div>

          {/* Wynik w textarea (read-only) — kopiowalny i widoczny, działa bez clipboard */}
          <textarea
            id="gp-output"
            readOnly
            value={prompt}
            rows={14}
            aria-label="Wygenerowany prompt do skopiowania"
            className="mt-4 w-full resize-none rounded-md border border-border bg-surface p-4 font-mono text-caption leading-relaxed text-fg focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
          />

          <p className="mt-3 text-caption text-fg-subtle">
            Skopiuj i wklej do ChatGPT, Claude albo Gemini. Miejsca w nawiasach
            kwadratowych, np. [imię klienta], uzupełnij swoimi danymi.
          </p>
        </div>

        {/* Bridge do magnetów (realna wartość) */}
        <div className="card-aura mt-4 rounded-xl border border-border bg-surface p-5 shadow-sm">
          <p className="text-body-sm text-fg">
            Chcesz więcej gotowców? Mamy zestawy promptów do skopiowania.
          </p>
          <div className="mt-2 flex flex-col gap-1">
            <Link
              href="/materialy/50-promptow-ai-dla-wlasciciela-firmy"
              className="text-caption font-semibold text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
            >
              50 promptów AI dla właściciela firmy
            </Link>
            <Link
              href="/materialy/jak-pisac-prompty-ktore-dzialaja-mini-poradnik"
              className="text-caption font-semibold text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
            >
              Jak pisać prompty, które działają
            </Link>
          </div>
        </div>

        <WynikCTA mikrokopia="Gotowy prompt to dobry start. Gotowy system, który robi to za Ciebie codziennie, to coś więcej. Pokażę Ci, gdzie tracisz czas." />
      </div>
    </div>
  );
}

/** Pojedyncze pole select z etykietą i opisem. Spójne ze stylem pól w narzędziach. */
function SelectPole({
  id,
  label,
  opis,
  value,
  onChange,
  opcje,
}: {
  id: string;
  label: string;
  opis: string;
  value: string;
  onChange: (v: string) => void;
  opcje: readonly Opcja[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-body-sm font-medium text-fg">
        {label}
      </label>
      <p className="mt-0.5 text-caption text-fg-subtle">{opis}</p>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 min-h-[48px] w-full rounded-sm border-[1.5px] border-border bg-surface-sunken px-4 text-body-sm text-fg focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
      >
        {opcje.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
