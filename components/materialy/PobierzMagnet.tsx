'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui';
import { LEGAL_ROUTES } from '@/lib/site';

/**
 * PobierzMagnet — przycisk „Pobierz PDF / wyślij na maila" pod lead magnetem.
 * Wzorzec 1:1 z components/narzedzia/CaptureMaila.tsx (ten sam UX i RODO/anty-spam).
 *
 * STATUS: UI bez backendu = świadomy STUB. PEŁNA treść magnetu jest WYŻEJ na stronie
 * (renderowana w HTML, cytowalna, za darmo bez zapisu). PDF/mail to bonus, nie bramka.
 * Wysyłka maila + generowanie PDF = TODO: Make.com (webhook, klucze po stronie serwera).
 * Tu tylko symulujemy sukces, żeby pokazać mikrokopię.
 *
 * TODO Make/PDF (przy podłączaniu webhooka):
 *  - POST na webhook Make z polami: email, materialSlug, zgoda: true,
 *    zgodaTimestamp: new Date().toISOString().
 *  - Make generuje/wysyła PDF danego magnetu na podany adres.
 *  - Honeypot (firma_www) + time-trap (< 2s) WALIDOWAĆ PONOWNIE po stronie serwera.
 *
 * RODO (art. 13): zbieramy e-mail (dana osobowa) => WYMAGANA zgoda z linkiem do
 * polityki. Submit zablokowany bez zgody. Zgodę + timestamp wysłać do Make jako dowód.
 *
 * ANTY-SPAM (egzekwować PO STRONIE SERWERA): honeypot (`firma_www`), time-trap
 * (odrzuć submit < ~2s), walidacja formatu e-mail. Client-side niżej to TYLKO UX.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type PobierzMagnetProps = {
  /** Slug magnetu — do payloadu webhooka (który PDF wysłać). */
  materialSlug: string;
  /** Tytuł magnetu — do mikrokopii i payloadu (np. „50 promptów AI..."). */
  tytul: string;
  /** Etykieta przycisku pobrania (z rejestru: `Material.ctaPobierz`). */
  cta: string;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

export function PobierzMagnet({ materialSlug, tytul, cta }: PobierzMagnetProps) {
  const [email, setEmail] = useState('');
  const [zgoda, setZgoda] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [mountedAt] = useState(() => Date.now());
  const [blad, setBlad] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot) return; // bot wypełnił ukryte pole
    if (Date.now() - mountedAt < 2000) return; // submit zbyt szybki = bot
    if (!EMAIL_RE.test(email.trim())) {
      setBlad('Podaj poprawny adres e-mail.');
      return;
    }
    if (!zgoda) return;
    setBlad(null);
    // TODO: Make.com — webhook (po stronie SERWERA). Wysłać: email, materialSlug,
    //   zgoda: true, zgodaTimestamp: new Date().toISOString(); honeypot + time-trap
    //   walidować ponownie na serwerze. Tu symulacja sukcesu.
    void materialSlug;
    setStatus('sending');
    setTimeout(() => setStatus('success'), 600);
  }

  if (status === 'success') {
    return (
      <div className="card-aura rounded-lg border border-border bg-success-bg p-5 text-center">
        <p className="text-body-sm font-medium text-fg">PDF jedzie na maila.</p>
        <p className="mt-1 text-caption text-fg-muted">
          Sprawdź skrzynkę za chwilę. Gdyby nie dotarł, zajrzyj do spamu. Całą treść
          masz i tak wyżej na tej stronie.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-aura rounded-lg border border-dashed border-border-strong bg-bg-subtle p-5"
    >
      <p className="text-body-sm font-medium text-fg">
        Chcesz mieć {`„${tytul}"`} w PDF? Wpisz maila, wyślemy go na skrzynkę.
      </p>
      <p className="mt-1 text-caption text-fg-subtle">
        Pełną treść czytasz wyżej na tej stronie, za darmo i bez zapisu. PDF to wygoda,
        żebyś miał to pod ręką.
      </p>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={`pm-email-${materialSlug}`} className="sr-only">
            Adres e-mail
          </label>
          <input
            id={`pm-email-${materialSlug}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (blad) setBlad(null);
            }}
            placeholder="twoj@email.pl"
            aria-invalid={blad ? true : undefined}
            aria-describedby={blad ? `pm-blad-${materialSlug}` : `pm-podpis-${materialSlug}`}
            className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border bg-surface px-4 text-body-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
          />
        </div>
        <Button type="submit" variant="primary" disabled={status === 'sending' || !zgoda}>
          {status === 'sending' ? 'Wysyłam…' : cta}
        </Button>
      </div>

      {blad ? (
        <p id={`pm-blad-${materialSlug}`} role="alert" className="mt-2 text-caption text-error">
          {blad}
        </p>
      ) : null}

      {/* Honeypot — ukryte pole anty-bot, poza tab-orderem. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`pm-firma-www-${materialSlug}`}>Nie wypełniaj tego pola</label>
        <input
          id={`pm-firma-www-${materialSlug}`}
          name="firma_www"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Zgoda RODO — wymagana, blokuje submit. */}
      <label
        htmlFor={`pm-zgoda-${materialSlug}`}
        className="mt-3 flex cursor-pointer items-start gap-2.5 text-caption text-fg-muted"
      >
        <input
          id={`pm-zgoda-${materialSlug}`}
          type="checkbox"
          checked={zgoda}
          onChange={(e) => setZgoda(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded-xs border-[1.5px] border-border-strong accent-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
        />
        <span>
          Zgadzam się na otrzymanie materiału na podany e-mail i przetwarzanie danych
          zgodnie z{' '}
          <a
            href={LEGAL_ROUTES.privacy}
            className="underline decoration-1 underline-offset-2 hover:text-fg"
          >
            polityką prywatności
          </a>
          . Administratorem jest SimpleFast.ai. Zgodę możesz wycofać w każdej chwili.
        </span>
      </label>

      <p id={`pm-podpis-${materialSlug}`} className="mt-2 text-caption text-fg-subtle">
        Bez spamu. Zapis tylko po to, żeby wysłać materiał.
      </p>
    </form>
  );
}
