'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui';

/**
 * ChatDemo — STUB żywego demo czatu (spec 03 §10).
 *
 * STATUS: zaślepka funkcjonalna. Brak backendu / kluczy API (to security layer).
 * UI w pełni działa: input, wiadomość powitalna, atrapowa odpowiedź. Backend
 * podłączyć przez serwerowy endpoint (TODO: /api/chat -> klucze po stronie serwera).
 *
 * Treść rdzeniowa sekcji (kapsuła, opis) jest w HTML w ZyweDemo.tsx — ten widget
 * tylko wzbogaca i NIE blokuje indeksacji.
 */
type Msg = { from: 'agent' | 'user'; text: string };

const WELCOME: Msg = {
  from: 'agent',
  text: 'Cześć, jestem Agentem SimpleFast.ai. Zapytaj mnie o ofertę, ceny albo o to, co da się zautomatyzować u Ciebie. Odpowiem konkretnie.',
};

// Atrapa odpowiedzi — czytelnie oznaczona jako demo (zero fałszywych claimów).
const STUB_REPLY: Msg = {
  from: 'agent',
  text: 'To wersja demo, więc na żywo jeszcze nie liczę. Najszybciej odpowiem przez formularz — zostaw kontakt, odzywam się w kilka minut.',
};

export function ChatDemo() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { from: 'user', text: trimmed }, STUB_REPLY]);
    setValue('');
  }

  return (
    <div className="card-aura flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full bg-accent"
          aria-hidden="true"
        />
        <span className="text-ui font-semibold text-fg">Zapytaj naszego Agenta</span>
        <span className="ml-auto text-caption text-fg-subtle">demo</span>
      </div>

      <div
        className="flex max-h-80 min-h-[16rem] flex-col gap-3 overflow-y-auto px-5 py-5"
        aria-live="polite"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.from === 'agent'
                ? 'max-w-[85%] self-start rounded-lg rounded-bl-xs bg-bg-subtle px-4 py-3 text-body-sm text-fg'
                : 'max-w-[85%] self-end rounded-lg rounded-br-xs bg-accent px-4 py-3 text-body-sm text-accent-contrast'
            }
          >
            {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-3">
        <label htmlFor="chat-demo-input" className="sr-only">
          Napisz pytanie do Agenta
        </label>
        <input
          id="chat-demo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Napisz pytanie, np. ile kosztuje voicebot dla salonu"
          className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border bg-surface-sunken px-4 text-body-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft"
          autoComplete="off"
        />
        <Button type="submit" variant="primary" size="md" aria-label="Wyślij pytanie">
          Wyślij
        </Button>
      </form>
    </div>
  );
}
