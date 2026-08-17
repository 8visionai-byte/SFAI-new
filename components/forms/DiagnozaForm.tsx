'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui';
import { SITE, LEGAL_ROUTES } from '@/lib/site';

/**
 * DiagnozaForm — multi-step formularz diagnozy (spec 03 §11).
 *
 * Krok 1 łatwy (kafelki "czego potrzebujesz") = wyższa konwersja (multi-step
 * ~13,9% vs single ~4,5%). Krok 2 kontekst, krok 3 dane + termin (Cal.com stub).
 *
 * STATUS: wysyłka leada to TODO Make.com (webhook na Vercelu). Wybór terminu =
 * AKTYWNY link do kalendarza Cal.com. Walidacja podstawowa client-side.
 *
 * RODO (art. 13): krok 3 zbiera dane osobowe (imię + kontakt), więc WYMAGA zgody
 * z linkiem do polityki prywatności. Submit zablokowany bez zaznaczenia. Zgodę +
 * timestamp trzeba wysłać do Make.com jako dowód zgody (TODO przy podłączaniu webhooka).
 *
 * ANTY-SPAM (do egzekwowania PO STRONIE SERWERA przy podłączeniu webhooka):
 * walidacja formatu e-mail/telefon, honeypot (pole `firma_www`), time-trap
 * (odrzuć submit < ~2s od montażu), opcjonalnie Cloudflare Turnstile. Client-side
 * walidacja niżej to TYLKO UX — NIGDY jedyna bariera.
 */
// Lekka walidacja formatu (UX). Twarda walidacja = serwer (patrz nagłówek).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+?48)?[\s-]?(\d[\s-]?){9}$/; // PL: 9 cyfr, opcjonalny +48
function isValidKontakt(v: string): boolean {
  const t = v.trim();
  return EMAIL_RE.test(t) || PHONE_RE.test(t);
}
const POTRZEBY = [
  { id: 'automatyzacja', label: 'Automatyzacja powtarzalnej roboty' },
  { id: 'chatbot', label: 'Chatbot dla klientów' },
  { id: 'voicebot', label: 'Voicebot na telefon' },
  { id: 'strona', label: 'Strona / SEO pod AI' },
  { id: 'nie-wiem', label: 'Jeszcze nie wiem, doradźcie' },
] as const;

const BRANZE = [
  'Usługi lokalne (salon, warsztat, serwis)',
  'Gabinet / zdrowie',
  'E-commerce / sklep',
  'Budownictwo / instalacje',
  'Kancelaria / księgowość',
  'Produkcja',
  'Inna',
] as const;

const ZESPOLY = ['1 osoba', '2–5 osób', '6–15 osób', '16–50 osób', '50+ osób'] as const;

type Status = 'idle' | 'sending' | 'success' | 'error';

export function DiagnozaForm() {
  const [step, setStep] = useState(1);
  const [potrzeba, setPotrzeba] = useState<string | null>(null);
  const [branza, setBranza] = useState('');
  const [zespol, setZespol] = useState('');
  const [imie, setImie] = useState('');
  const [kontakt, setKontakt] = useState('');
  const [zgoda, setZgoda] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // anty-bot: ludzie tego nie wypełnią
  const [mountedAt] = useState(() => Date.now()); // time-trap
  const [bladKontakt, setBladKontakt] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  function next() {
    setStep((s) => Math.min(3, s + 1));
  }
  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Anty-spam (lokalnie — i tak MUSI być powtórzone na serwerze):
    if (honeypot) return; // bot wypełnił ukryte pole
    if (Date.now() - mountedAt < 2000) return; // submit zbyt szybki = bot
    if (!imie.trim()) return;
    if (!isValidKontakt(kontakt)) {
      setBladKontakt('Podaj poprawny e-mail albo numer telefonu (PL).');
      return;
    }
    if (!zgoda) return; // RODO: bez zgody nie wysyłamy
    setBladKontakt(null);
    setStatus('sending');
    // POST JSON do naszego /api/lead (Vercel) → stamtąd webhook Make → arkusz + mail.
    // UWAGA: poprzednia wersja wysyłała w protokole Netlify Forms na "/", co na
    // Vercelu zwracało 405 i KAŻDE zgłoszenie ginęło. Zgodę RODO wysyłamy jako pole
    // (dowód zgody); honeypot/time-trap są walidowane tu ORAZ na serwerze.
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zrodlo: 'formularz-kontakt',
        potrzeba: potrzeba ?? '',
        branza,
        zespol,
        imie: imie.trim(),
        kontakt: kontakt.trim(),
        zgoda: 'tak',
        firma_www: honeypot,
      }),
    })
      .then((res) => setStatus(res.ok ? 'success' : 'error'))
      .catch(() => setStatus('error'));
  }

  if (status === 'success') {
    return (
      /* INFINITY v5: stan sukcesu w karcie .inf-card (zielona krawędź statusu
         przez --card-c; tło sukcesu zostaje tokenem semantycznym). */
      <div
        className="inf-card bg-success-bg p-7 text-center"
        style={{ '--card-c': '#22e06b' } as React.CSSProperties}
      >
        {/* Reflektor za kursorem: pozycję (--mx/--my) ustawia JEDEN delegowany
            pointermove z MotionOrchestrator (desktop). Dekoracja aria-hidden. */}
        <div aria-hidden="true" className="inf-spotlight" />
        <h3 className="text-h3 mb-2">Mam to.</h3>
        <p className="text-body text-fg-muted">
          Dziękuję, zgłoszenie do mnie dotarło. Odezwę się w kilka minut na podany kontakt.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      /* INFINITY v5: stan błędu w karcie .inf-card — krawędź statusu w kolorze
         błędu (token semantyczny przez --card-c), tło błędu zostaje. */
      <div
        className="inf-card border-error bg-error-bg p-7 text-center"
        style={{ '--card-c': 'var(--error)' } as React.CSSProperties}
      >
        <div aria-hidden="true" className="inf-spotlight" />
        <h3 className="text-h3 mb-2">Coś nie zadziałało z wysyłką.</h3>
        <p className="text-body text-fg-muted">
          Najszybciej złap mnie wprost: napisz na{' '}
          <a
            href={`mailto:${SITE.contact.email}`}
            className="font-semibold text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
          >
            {SITE.contact.email}
          </a>{' '}
          albo zadzwoń pod {SITE.contact.phone}. Odezwę się od razu.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* REGUŁA PROMIENIA: interakcja 8px, kontener 16px, element wewnątrz kontenera
          8px, pill = full. Cień: na home to JEDYNY formularz z shadow-md (fizyczny
          cel konwersji, nie kolejne pudełko).
          INFINITY v5 (spec §4 — formularz w CIEMNEJ karcie inf): .inf-card daje
          powierzchnię/obwódkę/promień + narożniki [ ] i sweep z globals (zamiast
          gołego border+bg-surface). Pola zostają na ciemnych tokenach kontrolek
          (surface-sunken + text-fg = czytelność AA). Honeypot jest h-0 w-0, więc
          overflow:hidden karty niczego nie ucina (kontrakt v4).
          v7 audyt: karta formularza dostaje WŁASNY odcień (--card-c) — bez
          niego hover świecił domyślnym cyjanem akcentu. Violet #8b5cf6 z
          lib/inf-kategorie (ton „rozwiązań"), świadomie NIE kolor statusu:
          zielony i czerwony są zarezerwowane dla stanu sukcesu i błędu niżej,
          a amber czytałby się jak ostrzeżenie na polu do wypełnienia.
          v14 (pomiary-v14.md par.2): formularz to PANEL, nie karta-link ->
          .inf-card-static (cisza: bez sweepa i mocnego glow, delikatny obrys
          na hover; sweep wzorzec trzyma tylko na kartach-linkach). */}
      <form
        onSubmit={handleSubmit}
        className="inf-card inf-card-static p-6 shadow-md sm:p-7"
        style={{ '--card-c': '#8b5cf6' } as React.CSSProperties}
      >
      {/* Reflektor za kursorem: pozycję (--mx/--my) ustawia JEDEN delegowany
          pointermove z MotionOrchestrator (desktop). Dekoracja aria-hidden. */}
      <div aria-hidden="true" className="inf-spotlight" />

      {/* Pasek postępu */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-caption font-semibold uppercase tracking-[0.08em] text-fg-subtle">
            {step === 1 && 'Krok 1 z 3'}
            {step === 2 && 'Krok 2 z 3, już prawie'}
            {step === 3 && 'Ostatni krok. Zaraz masz to z głowy'}
          </span>
          <span className="text-caption text-fg-subtle">{step}/3</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border" role="presentation">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-base ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* KROK 1 — kafelki (najłatwiejszy wybór) */}
      {step === 1 && (
        <fieldset>
          <legend className="text-h3 mb-4">Czego najbardziej potrzebujesz?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {POTRZEBY.map((p) => {
              const selected = potrzeba === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPotrzeba(p.id);
                    next();
                  }}
                  aria-pressed={selected}
                  className={
                    'sf-press flex min-h-[64px] items-center rounded-sm border-[1.5px] px-4 py-3 text-left text-body-sm font-medium transition-[border-color,background-color,transform] duration-fast ease-out active:scale-[0.98] ' +
                    (selected
                      ? 'border-accent bg-accent-soft text-fg'
                      : 'border-border-control bg-surface-sunken text-fg hover:border-brand')
                  }
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* KROK 2 — kontekst */}
      {step === 2 && (
        <fieldset className="space-y-4">
          <legend className="text-h3 mb-2">W jakiej branży działasz i ilu macie ludzi?</legend>
          <div>
            <label htmlFor="df-branza" className="mb-1 block text-caption font-medium text-fg-muted">
              Branża
            </label>
            <select
              id="df-branza"
              value={branza}
              onChange={(e) => setBranza(e.target.value)}
              className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border-control bg-surface-sunken px-4 text-body-sm text-fg focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
            >
              <option value="">Wybierz branżę</option>
              {BRANZE.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="df-zespol" className="mb-1 block text-caption font-medium text-fg-muted">
              Wielkość zespołu
            </label>
            <select
              id="df-zespol"
              value={zespol}
              onChange={(e) => setZespol(e.target.value)}
              className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border-control bg-surface-sunken px-4 text-body-sm text-fg focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
            >
              <option value="">Wybierz wielkość</option>
              {ZESPOLY.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={back}>
              Wstecz
            </Button>
            <Button type="button" variant="primary" onClick={next}>
              Dalej
            </Button>
          </div>
        </fieldset>
      )}

      {/* KROK 3 — dane + termin (Cal.com stub) */}
      {step === 3 && (
        <fieldset className="space-y-4">
          <legend className="text-h3 mb-2">Gdzie i kiedy mam się odezwać?</legend>
          <div>
            <label htmlFor="df-imie" className="mb-1 block text-caption font-medium text-fg-muted">
              Imię
            </label>
            <input
              id="df-imie"
              value={imie}
              onChange={(e) => setImie(e.target.value)}
              required
              autoComplete="given-name"
              className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border-control bg-surface-sunken px-4 text-body-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
              placeholder="Jak się do Ciebie zwracać?"
            />
          </div>
          <div>
            <label htmlFor="df-kontakt" className="mb-1 block text-caption font-medium text-fg-muted">
              Telefon lub e-mail
            </label>
            <input
              id="df-kontakt"
              type="text"
              inputMode="email"
              value={kontakt}
              onChange={(e) => {
                setKontakt(e.target.value);
                if (bladKontakt) setBladKontakt(null);
              }}
              required
              aria-invalid={bladKontakt ? true : undefined}
              aria-describedby={bladKontakt ? 'df-kontakt-blad' : undefined}
              className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border-control bg-surface-sunken px-4 text-body-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
              placeholder="Na to faktycznie odbierzesz"
            />
            {bladKontakt ? (
              <p id="df-kontakt-blad" role="alert" className="mt-1 text-caption text-error">
                {bladKontakt}
              </p>
            ) : (
              <p className="mt-1 text-caption text-fg-subtle">
                Zostaw kontakt, na który faktycznie odbierzesz. Bez spamu, słowo.
              </p>
            )}
          </div>

          {/* Honeypot — ukryte pole anty-bot. Niewidoczne i poza tab-orderem. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="df-firma-www">Nie wypełniaj tego pola</label>
            <input
              id="df-firma-www"
              name="firma_www"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* Zgoda RODO (art. 13) — WYMAGANA, blokuje submit. Link do polityki. */}
          <div>
            <label htmlFor="df-zgoda" className="flex cursor-pointer items-start gap-3 text-caption text-fg-muted">
              <input
                id="df-zgoda"
                type="checkbox"
                required
                checked={zgoda}
                onChange={(e) => setZgoda(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-xs border-[1.5px] border-border-control accent-accent"
              />
              <span>
                Zgadzam się na kontakt i przetwarzanie moich danych w celu obsługi zgłoszenia, zgodnie z{' '}
                <a
                  href={LEGAL_ROUTES.privacy}
                  className="underline decoration-1 underline-offset-2 hover:text-fg"
                >
                  polityką prywatności
                </a>
                . Administratorem danych jest SimpleFast.ai. Zgodę możesz wycofać w każdej chwili.
              </span>
            </label>
          </div>

          {/* Wybór terminu w kalendarzu Cal.com (aktywny link, otwiera się w nowej karcie). */}
          <a
            href="https://cal.com/simple-fast-ai/spotkanie-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="sf-press flex min-h-[48px] items-center justify-center gap-2 rounded-sm border-[1.5px] border-accent bg-accent-soft px-4 text-center text-body-sm font-semibold text-accent-hover transition-[background-color,color,transform] duration-fast ease-out hover:bg-accent hover:text-accent-contrast active:scale-[0.98]"
          >
            Wolisz od razu wybrać termin? Otwórz kalendarz
            <span aria-hidden="true" className="sf-arrow">→</span>
          </a>

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={back}>
              Wstecz
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'sending' || !zgoda || !imie.trim() || !kontakt.trim()}
            >
              {status === 'sending' ? 'Zapisuję Twoje zgłoszenie…' : 'Umów moją bezpłatną diagnozę'}
            </Button>
          </div>
          <p className="text-caption text-fg-subtle">
            Bez zobowiązań. Odpowiadam w kilka minut. Twoje dane zostają u nas, w UE, i nie trafiają do nikogo.
          </p>
        </fieldset>
      )}
      </form>
    </>
  );
}
