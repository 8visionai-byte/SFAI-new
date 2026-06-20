'use client';

/**
 * components/demo/ChatAgent.tsx
 *
 * Realny czat z Agentem SimpleFast.ai (zastepuje atrape ChatDemo).
 * - Stan wiadomosci + POST do /api/chat (same-origin, CSP connect-src 'self' OK).
 * - Wskaznik pisania (animowane kropki).
 * - Render odpowiedzi z klikalnymi linkami (markdown-lite: [tekst](/sciezka),
 *   gole sciezki /uslugi/... oraz **pogrubienie**).
 * - A11y: aria-live na liscie, labelki, focus-visible, Enter wysyla, obsluga bledu.
 *
 * Lekko: to wyspa klienta osadzona w ChatLauncher. Reszta strony zostaje SSG.
 * Anti-XSS: linkujemy WYLACZNIE sciezki wewnetrzne zaczynajace sie od '/'.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

type Role = 'user' | 'assistant';
type Msg = { role: Role; content: string };

const WELCOME: Msg = {
  role: 'assistant',
  content:
    'Czesc, jestem Agentem SimpleFast.ai. Zapytaj o uslugi, ceny, narzedzia albo o to, co da sie zautomatyzowac u Ciebie. Odpowiem krotko i wskaze wlasciwa zakladke.',
};

// Szybkie podpowiedzi (klik = wyslij). Tylko realne tematy z mapy firmy.
const SUGGESTIONS = [
  'Co to agenci AI?',
  'Ile kosztuje chatbot?',
  'Jakie macie darmowe narzedzia?',
] as const;

export function ChatAgent() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll na dol przy kazdej zmianie listy / stanu pisania.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      const nextMessages: Msg[] = [
        ...messages,
        { role: 'user', content: trimmed },
      ];
      setMessages(nextMessages);
      setValue('');
      setLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            // Wysylamy historie bez wiadomosci powitalnej (jest tylko UI-owa).
            messages: nextMessages
              .filter((m) => m !== WELCOME)
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        const data = (await res.json().catch(() => ({}))) as {
          reply?: string;
          error?: string;
        };

        if (!res.ok || !data.reply) {
          setError(
            data.error ??
              'Cos poszlo nie tak. Sprobuj jeszcze raz albo napisz przez /kontakt.'
          );
          return;
        }

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply! },
        ]);
      } catch {
        setError(
          'Brak polaczenia. Sprawdz internet i sprobuj ponownie, albo napisz przez /kontakt.'
        );
      } finally {
        setLoading(false);
        // Wroc fokus do pola po odpowiedzi.
        inputRef.current?.focus();
      }
    },
    [messages, loading]
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void send(value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send(value);
    }
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      {/* Naglowek */}
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full bg-accent"
          aria-hidden="true"
        />
        <span className="text-ui font-semibold text-fg">
          Agent SimpleFast.ai
        </span>
        <span className="ml-auto text-caption text-fg-subtle">
          odpowiada o firmie
        </span>
      </div>

      {/* Lista wiadomosci */}
      <div
        ref={scrollRef}
        className="flex max-h-80 min-h-[16rem] flex-col gap-3 overflow-y-auto px-5 py-5"
        aria-live="polite"
        aria-busy={loading}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === 'assistant'
                ? 'max-w-[88%] self-start rounded-lg rounded-bl-xs bg-bg-subtle px-4 py-3 text-body-sm text-fg'
                : 'max-w-[88%] self-end rounded-lg rounded-br-xs bg-accent px-4 py-3 text-body-sm text-accent-contrast'
            }
          >
            {m.role === 'assistant' ? <RichText text={m.content} /> : m.content}
          </div>
        ))}

        {/* Wskaznik pisania */}
        {loading && (
          <div className="max-w-[88%] self-start rounded-lg rounded-bl-xs bg-bg-subtle px-4 py-3">
            <span className="sr-only">Agent pisze odpowiedz</span>
            <span className="flex items-center gap-1" aria-hidden="true">
              <Dot delay="0ms" />
              <Dot delay="160ms" />
              <Dot delay="320ms" />
            </span>
          </div>
        )}

        {/* Blad */}
        {error && (
          <div
            role="alert"
            className="max-w-[88%] self-start rounded-lg border border-border bg-surface-sunken px-4 py-3 text-body-sm text-fg-muted"
          >
            {error}
          </div>
        )}

        {/* Podpowiedzi (tylko na starcie rozmowy) */}
        {messages.length === 1 && !loading && (
          <div className="mt-1 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-caption text-fg-muted transition-colors hover:border-accent hover:text-fg focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-soft"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Formularz */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-border p-3"
      >
        <label htmlFor="chat-agent-input" className="sr-only">
          Napisz pytanie do Agenta
        </label>
        <input
          id="chat-agent-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Napisz pytanie, np. ile kosztuje voicebot"
          className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border bg-surface-sunken px-4 text-body-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft disabled:opacity-60"
          autoComplete="off"
          maxLength={2000}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={loading || value.trim().length === 0}
          aria-label="Wyslij pytanie"
        >
          Wyslij
        </Button>
      </form>
    </div>
  );
}

// --- Pomocnicze ------------------------------------------------------------

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-fg-subtle"
      style={{ animationDelay: delay }}
    />
  );
}

/**
 * RichText, bezpieczny render markdown-lite: **pogrubienie**, [tekst](/sciezka)
 * oraz gole wewnetrzne sciezki (/uslugi/..). Zero dangerouslySetInnerHTML.
 * Linkujemy WYLACZNIE sciezki wewnetrzne zaczynajace sie od '/' (anti-XSS,
 * zaden javascript:/http: nie przejdzie). Wewnetrzne -> next/link.
 */
function RichText({ text }: { text: string }) {
  return <>{parseRich(text)}</>;
}

function parseRich(text: string): ReactNode[] {
  // 1. Markdown link [label](/path)  2. **bold**  3. gola sciezka /seg/seg(#kotwica)
  const pattern =
    /\[([^\]]+)\]\((\/[^\s)]*)\)|\*\*([^*]+)\*\*|(\/[a-z0-9\-]+(?:\/[a-z0-9\-]+)*(?:#[a-z0-9\-]+)?)/gi;

  const out: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      out.push(text.slice(lastIndex, match.index));
    }

    const [, mdLabel, mdHref, boldText, barePath] = match;

    if (mdHref) {
      out.push(
        <Link
          key={`l${key++}`}
          href={mdHref}
          className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
        >
          {mdLabel}
        </Link>
      );
    } else if (boldText) {
      out.push(
        <strong key={`b${key++}`} className="font-semibold">
          {boldText}
        </strong>
      );
    } else if (barePath) {
      out.push(
        <Link
          key={`p${key++}`}
          href={barePath}
          className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
        >
          {barePath}
        </Link>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) out.push(text.slice(lastIndex));
  return out;
}