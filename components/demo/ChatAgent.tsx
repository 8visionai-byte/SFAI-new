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
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { USLUGI } from '@/lib/uslugi';
import { NARZEDZIA } from '@/lib/narzedzia';

type Role = 'user' | 'assistant';
type Msg = { role: Role; content: string };

/**
 * INFINITY: karty-odnośniki pod odpowiedzią bota. Mapa ścieżka -> {badge, tytuł,
 * opis, kolor} budowana z rejestrów USLUGI/NARZEDZIA (single source of truth,
 * zero duplikowania treści). Kolory = STAŁE kolory kategorii z palety trasy
 * marki (blue/violet/green + cyan/amber pomocniczo) — per instancja przez
 * custom property --card-c (konwencja utilities .inf-* z globals.css).
 * Rejestry trafiają do LENIWEGO chunku ChatAgent (dynamic, ssr:false) — poza
 * ścieżką krytyczną strony.
 */
type KartaOdnosnik = {
  href: string;
  badge: string;
  tytul: string;
  opis: string;
  kolor: string;
};

const KOLORY_USLUG: Record<string, string> = {
  chatboty: '#2b7cff',
  voiceboty: '#8b5cf6',
  'agent-rekrutacyjny': '#8b5cf6',
  automatyzacje: '#22e06b',
  'dokumenty-faktury': '#f59e0b',
  'opieka-ai': '#22e06b',
  'audyt-ai': '#22d3ee',
  rozwiazania: '#2b7cff',
  'strony-www': '#22d3ee',
  optymalizacja: '#22d3ee',
};

const KOLORY_NARZEDZI: Record<string, string> = {
  'kalkulator-oszczednosci': '#22e06b',
  'kalkulator-procesu': '#22e06b',
  'test-gotowosci-ai': '#8b5cf6',
  'audyt-strony-ai': '#22d3ee',
  'generator-promptow': '#2b7cff',
};

const KARTY: ReadonlyMap<string, KartaOdnosnik> = new Map([
  ...USLUGI.map((u): [string, KartaOdnosnik] => [
    `/uslugi/${u.slug}`,
    {
      href: `/uslugi/${u.slug}`,
      badge: 'Usługa',
      tytul: u.h1,
      opis: u.metaDescription,
      kolor: KOLORY_USLUG[u.slug] ?? '#22d3ee',
    },
  ]),
  ...NARZEDZIA.map((n): [string, KartaOdnosnik] => [
    `/narzedzia/${n.slug}`,
    {
      href: `/narzedzia/${n.slug}`,
      badge: n.etykieta,
      tytul: n.tytul,
      opis: n.opis,
      kolor: KOLORY_NARZEDZI[n.slug] ?? '#22d3ee',
    },
  ]),
]);

/**
 * Dopasowanie kart do odpowiedzi bota: po wystąpieniu ścieżki (/uslugi/...,
 * /narzedzia/...) LUB pełnej frazy tytułu strony w tekście. Max 3 karty,
 * bez duplikatów (mapa iterowana raz).
 */
function znajdzKarty(text: string): KartaOdnosnik[] {
  const lower = text.toLowerCase();
  const out: KartaOdnosnik[] = [];
  for (const [sciezka, karta] of KARTY) {
    if (lower.includes(sciezka) || lower.includes(karta.tytul.toLowerCase())) {
      out.push(karta);
      if (out.length >= 3) break;
    }
  }
  return out;
}

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
  // Identyfikator sesji czatu — grupuje wiadomosci jednej rozmowy w arkuszu (przez webhook).
  // Klient-only (ChatAgent ladowany dynamicznie ssr:false), wiec brak ryzyka niespojnosci SSR.
  const [sessionId] = useState(() =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Ref do OSTATNIEJ wiadomosci usera - kotwica przewijania po odpowiedzi bota.
  const lastUserRef = useRef<HTMLDivElement>(null);

  // Przewijanie czatu:
  //  - gdy user wysyla / bot pisze -> na sam dol (widac wlasna wiadomosc + kropki),
  //  - gdy przychodzi ODPOWIEDZ bota -> ustaw ostatnia wiadomosc usera na GORZE widoku,
  //    zeby dluga odpowiedz czytac OD POCZATKU (a nie ladowac na jej koncu).
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const last = messages[messages.length - 1];

    if (loading || last?.role === 'user') {
      container.scrollTop = container.scrollHeight;
      return;
    }

    // Odpowiedz bota: dosun gore ostatniej wiadomosci usera do gory kontenera.
    const userEl = lastUserRef.current;
    if (userEl) {
      const delta =
        userEl.getBoundingClientRect().top - container.getBoundingClientRect().top;
      container.scrollTop += delta - 8; // 8px oddechu nad wiadomoscia usera
    } else {
      container.scrollTop = container.scrollHeight;
    }
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
            sessionId,
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
    [messages, loading, sessionId]
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

  // Indeks ostatniej wiadomosci usera (kotwica przewijania po odpowiedzi bota).
  const lastUserIndex = messages.reduce(
    (acc, m, i) => (m.role === 'user' ? i : acc),
    -1
  );

  return (
    /* SWIAT B: panel czatu = ciemne szklo (.sf-glass) na wlosie (hairline).
       Panel plywa NAD trescia strony (ChatLauncher), wiec dostaje bg-bg jako
       podklad pod polprzezroczyste szklo — czytelnosc niezalezna od tego, co
       jest pod spodem. */
    <div className="sf-glass flex flex-col overflow-hidden rounded-lg border border-hairline bg-bg shadow-md">
      {/* Naglowek — INFINITY: mono caps + zielona kropka statusu (.inf-ask-dot,
          pulsacja tylko desktop przez CSS). Teksty 1:1, zmiana czysto wizualna. */}
      <div className="flex items-center gap-2.5 border-b border-hairline px-5 py-4">
        <span className="inf-ask-dot" aria-hidden="true" />
        <span className="font-mono text-caption font-bold uppercase tracking-[0.12em] text-fg">
          Agent SimpleFast.ai
        </span>
        <span className="ml-auto font-mono text-overline uppercase tracking-[0.14em] text-fg-subtle">
          odpowiada o firmie
        </span>
      </div>

      {/* Lista wiadomosci */}
      <div
        ref={scrollRef}
        className="sf-scroll-slim flex max-h-80 min-h-[16rem] flex-col gap-3 overflow-y-auto px-5 py-5"
        aria-live="polite"
        aria-busy={loading}
      >
        {messages.map((m, i) => {
          // INFINITY: karty-odnośniki pod odpowiedzią bota (z rejestrów).
          const karty = m.role === 'assistant' ? znajdzKarty(m.content) : [];
          return (
            <Fragment key={i}>
              <div
                ref={i === lastUserIndex ? lastUserRef : undefined}
                className={
                  m.role === 'assistant'
                    ? 'max-w-[88%] self-start rounded-lg rounded-bl-xs bg-bg-subtle px-4 py-3 text-body-sm text-fg'
                    : 'max-w-[88%] self-end rounded-lg rounded-br-xs bg-accent px-4 py-3 text-body-sm text-accent-contrast'
                }
              >
                {m.role === 'assistant' ? <RichText text={m.content} /> : m.content}
              </div>
              {karty.length > 0 && (
                <div className="flex w-full max-w-[88%] flex-col gap-2 self-start">
                  {karty.map((k) => (
                    <Link
                      key={k.href}
                      href={k.href}
                      className="inf-card block p-3 pl-4"
                      style={{ '--card-c': k.kolor } as CSSProperties}
                    >
                      {/* Reflektor jak w pozostałych kartach; te karty powstają
                          dopiero w odpowiedzi agenta, więc nie widać ich
                          w prerenderze i przy przeglądzie łatwo je pominąć. */}
                      <span aria-hidden="true" className="inf-spotlight" />
                      <span className="inf-ref-badge">{k.badge}</span>
                      <span className="mt-0.5 block text-body-sm font-semibold leading-snug text-fg">
                        {k.tytul}
                      </span>
                      <span className="mt-0.5 block truncate text-caption text-fg-subtle">
                        {k.opis}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </Fragment>
          );
        })}

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
          placeholder="Napisz pytanie albo zostaw imię i e-mail"
          className="min-h-[48px] w-full rounded-sm border-[1.5px] border-border-control bg-surface-sunken px-4 text-body-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:bg-surface focus:outline-none focus:ring-[3px] focus:ring-accent-soft disabled:opacity-60"
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

      {/* Podpowiedzi (tylko na starcie rozmowy) — INFINITY: mono chipy POD
          inputem (wzorzec ASK). Teksty sugestii 1:1, zmiana pozycji + skórki. */}
      {messages.length === 1 && !loading && (
        <div className="flex flex-wrap gap-2 px-3 pb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => void send(s)}
              className="inf-chip cursor-pointer transition-colors duration-fast ease-out hover:border-accent hover:text-fg"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Nota RODO — widoczna od startu rozmowy (art. 13). Link do pełnej polityki. */}
      <p className="px-3 pb-3 text-[0.68rem] leading-snug text-fg-subtle">
        Rozmowę możemy zapisywać, aby ulepszać obsługę i odpowiedzieć na zapytanie; dane usuwamy po
        90 dniach.{' '}
        <Link
          href="/polityka-prywatnosci"
          className="underline underline-offset-2 hover:text-fg"
        >
          Polityka prywatności
        </Link>
        .
      </p>
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

/* CSS DO DOPISANIA (partia CHAT+TOOLS): pełne reguły — badge kategorii na
   karcie-odnośniku czatu. Dziedziczy --card-c z rodzica .inf-card; kolor tekstu
   ROZJAŚNIONY color-mix-em z bielą, żeby 11px mono zdawało AA na --surface
   (czysty #8b5cf6 miał ~4.4:1 — za mało na drobny tekst). Pancerny fallback
   (var(--accent)) linijkę wyżej — stare silniki zostają na cyjanie AA.
   Do @layer components (konwencja pliku).

@layer components {
  .inf-ref-badge {
    display: inline-block;
    font-family: var(--font-mono), ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    color: color-mix(in srgb, var(--card-c, var(--accent)) 72%, white);
  }
}
*/