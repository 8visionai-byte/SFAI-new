'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui';
import { LEGAL_ROUTES } from '@/lib/site';

/**
 * CaptureMaila — opcjonalny lead magnet "wyślij sobie raport PDF na maila"
 * (spec 07 §0.5). To JEDYNY element narzędzi wymagający backendu — świadomie
 * zostawiony jako STUB. Sama kalkulacja/wynik działa w 100% bez tego pola.
 *
 * STATUS: UI bez backendu. Wysyłka + generowanie PDF = TODO: Make.com (webhook,
 * klucze po stronie serwera). Tu tylko symulujemy sukces, żeby pokazać mikrokopię.
 *
 * RODO (art. 13): zbieramy e-mail (dana osobowa) => WYMAGANA zgoda z linkiem do
 * polityki. Submit zablokowany bez zgody. Zgodę + timestamp trzeba wysłać do
 * Make.com jako dowód zgody (TODO przy podłączaniu webhooka).
 *
 * ANTY-SPAM (egzekwować PO STRONIE SERWERA): honeypot (pole `firma_www`),
 * time-trap (odrzuć submit < ~2s), walidacja formatu e-mail. Client-side niżej
 * to TYLKO UX, nigdy jedyna bariera.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type CaptureMailaProps = {
  /** Zachęta nad polem, dopasowana do narzędzia (np. "Wyślij sobie ten raport PDF"). */
  zacheta: string;
  /** Krótki opis, co przyjdzie (np. "Twoje liczby + plan na 30 dni"). */
  podpis?: string;
  /** Etykieta przycisku. */
  cta?: string;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

export function CaptureMaila({
  zacheta,
  podpis = 'Bez spamu. Zapis tylko po to, żeby wysłać raport.',
  cta = 'Wyślij mi raport PDF',
}: CaptureMailaProps) {
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
    // TODO: Make.com — webhook (po stronie SERWERA). Wysłać: email, zgoda: true,
    //   zgodaTimestamp: new Date().toISOString(), payload wyniku do PDF; honeypot +
    //   time-trap walidować ponownie na serwerze. Tu symulacja sukcesu.
    setStatus('sending');
    setTimeout(() => setStatus('success'), 600);
  }

  if (status === 'success') {
    return (
      <div className="card-aura rounded-lg border border-border bg-success-bg p-5 text-center">
        <p className="text-body-sm font-medium text-fg">Raport jedzie na maila.</p>
        <p className="mt-1 text-caption text-fg-muted">
          Sprawdź skrzynkę za chwilę. Gdyby nie dotarł, zajrzyj do spamu.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-aura rounded-lg border border-dashed border-border-strong bg-bg-subtle p-5"
    >
      <p className="text-body-sm font-medium text-fg">{zacheta}</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="cm-email" className="sr-only">
            Adres e-mail
          </label>
          <input
            id="cm-email"
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
            aria-describedby={blad ? 'cm-email-blad' : 'cm-podpis'}
            className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border bg-surface px-4 text-body-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
          />
        </div>
        <Button type="submit" variant="primary" disabled={status === 'sending' || !zgoda}>
          {status === 'sending' ? 'Wysyłam…' : cta}
        </Button>
      </div>

      {blad ? (
        <p id="cm-email-blad" role="alert" className="mt-2 text-caption text-error">
          {blad}
        </p>
      ) : null}

      {/* Honeypot — ukryte pole anty-bot, poza tab-orderem. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cm-firma-www">Nie wypełniaj tego pola</label>
        <input
          id="cm-firma-www"
          name="firma_www"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Zgoda RODO — wymagana, blokuje submit. */}
      <label htmlFor="cm-zgoda" className="mt-3 flex cursor-pointer items-start gap-2.5 text-caption text-fg-muted">
        <input
          id="cm-zgoda"
          type="checkbox"
          checked={zgoda}
          onChange={(e) => setZgoda(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded-xs border-[1.5px] border-border-strong accent-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
        />
        <span>
          Zgadzam się na otrzymanie raportu na podany e-mail i przetwarzanie danych zgodnie z{' '}
          <a
            href={LEGAL_ROUTES.privacy}
            className="underline decoration-1 underline-offset-2 hover:text-fg"
          >
            polityką prywatności
          </a>
          . Administratorem jest SimpleFast.ai. Zgodę możesz wycofać w każdej chwili.
        </span>
      </label>

      <p id="cm-podpis" className="mt-2 text-caption text-fg-subtle">
        {podpis}
      </p>
    </form>
  );
}
