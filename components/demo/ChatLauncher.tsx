'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/cn';

/**
 * ChatLauncher — pływający launcher czatu (prawy dolny róg) + wysuwany panel z
 * Agentem (spec 03 §10, "szewc w butach").
 *
 * WYDAJNOŚĆ: ChatAgent ładowany LENIWIE (next/dynamic, ssr:false) — kod czatu trafia
 * do osobnego chunku poza ścieżką krytyczną (nie obciąża pierwszego wczytania).
 * PREFETCH: chunk rozgrzewamy w tle po 1. interakcji użytkownika, więc klik w launcher
 * otwiera panel OD RAZU (bez czekania ~1-2 s na pobranie). Animacja wejścia/wyjścia
 * panelu = czysty CSS (.sf-chat-panel), bez framer-motion.
 *
 * A11y: panel ma role="dialog", zamykanie ESC, focus-visible. Launcher jest
 * przyciskiem, nie linkiem. Nie blokuje treści strony.
 */
const ChatAgent = dynamic(() => import('./ChatAgent').then((m) => m.ChatAgent), {
  ssr: false,
});

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // panel w DOM (dla animacji wyjścia)
  const [visible, setVisible] = useState(false); // klasa enter/exit
  const closeTimer = useRef<number>(0);

  // Zamknięcie klawiszem ESC.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // PREFETCH czatu: rozgrzej chunk ChatAgent w tle po 1. interakcji (lub po chwili),
  // żeby klik otwierał panel OD RAZU zamiast czekać ~1-2 s na pobranie kodu. Nie dotyka
  // ścieżki krytycznej: odpala się po interakcji/idle, nie na starcie, więc wynik
  // PageSpeed zostaje, a UX czatu jest natychmiastowy.
  useEffect(() => {
    const events = ['pointerdown', 'touchstart', 'keydown', 'scroll'] as const;
    let timer = 0;
    const warm = () => {
      events.forEach((e) => window.removeEventListener(e, warm));
      window.clearTimeout(timer);
      void import('./ChatAgent'); // pobiera chunk -> trafia do cache modułu
    };
    events.forEach((e) => window.addEventListener(e, warm, { passive: true }));
    timer = window.setTimeout(warm, 3500);
    return () => {
      events.forEach((e) => window.removeEventListener(e, warm));
      window.clearTimeout(timer);
    };
  }, []);

  // Choreografia mount -> enter / exit -> unmount (zastępuje AnimatePresence).
  useEffect(() => {
    window.clearTimeout(closeTimer.current);
    if (open) {
      setMounted(true);
      const r = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(r);
    }
    setVisible(false);
    closeTimer.current = window.setTimeout(() => setMounted(false), 240);
    return undefined;
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-dropdown print:hidden">
      {mounted && (
        <div
          role="dialog"
          aria-label="Demo czatu z Agentem SimpleFast.ai"
          className={cn(
            'sf-chat-panel mb-3 w-[min(22rem,calc(100vw-2.5rem))]',
            visible && 'is-open'
          )}
        >
          <ChatAgent />
        </div>
      )}

      {/* INFINITY: pigułka „ASK" wzorca — mono caps + zielona kropka statusu
          (pulsacja tylko desktop, bez reduced-motion) + obwódka accent z glow.
          Ikona X w stanie otwartym (czytelny sygnał „zamknij"), etykieta mono
          bez zmian. A11y: aria-label / aria-expanded / focus-visible jak było. */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Zamknij czat' : 'Otwórz czat z Agentem'}
        className="inf-ask ml-auto"
      >
        {open ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <span className="inf-ask-dot" aria-hidden="true" />
        )}
        <span>Zapytaj agenta</span>
      </button>
    </div>
  );
}

/* CSS DO DOPISANIA (partia CHAT+TOOLS): pełne reguły — pigułka „Zapytaj agenta"
   + kropka statusu. Bazowe klasy do @layer components, @media/@keyframes POZA
   @layer (konwencja pliku). color-mix zawsze z pancernym fallbackiem linijkę wyżej.

@layer components {
  .inf-ask {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 48px;
    padding: 0.75rem 1.25rem;
    border-radius: 999px;
    font-family: var(--font-mono), ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg);
    background-color: var(--bg);
    border: 1px solid var(--border-strong);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    box-shadow: 0 0 20px -4px rgba(20, 184, 196, 0.45);
    box-shadow: 0 0 20px -4px color-mix(in srgb, var(--accent) 55%, transparent);
    cursor: pointer;
    transition:
      border-color var(--dur-base) var(--ease-out),
      box-shadow var(--dur-base) var(--ease-out),
      transform var(--dur-fast) var(--ease-out);
  }
  .inf-ask:hover {
    border-color: var(--accent);
    box-shadow: 0 0 28px -2px rgba(20, 184, 196, 0.6);
    box-shadow: 0 0 28px -2px color-mix(in srgb, var(--accent) 70%, transparent);
    transform: translateY(-1px);
  }
  .inf-ask:active {
    transform: translateY(0) scale(0.97);
  }
  .inf-ask-dot {
    width: 8px;
    height: 8px;
    flex: none;
    border-radius: 999px;
    background: #29ff77;
    box-shadow: 0 0 8px rgba(34, 224, 107, 0.8);
  }
}

@media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
  .inf-ask-dot {
    animation: infAskPulse 2.4s var(--ease-in-out) infinite;
  }
}
@keyframes infAskPulse {
  0%,
  100% {
    box-shadow:
      0 0 8px rgba(34, 224, 107, 0.8),
      0 0 0 0 rgba(34, 224, 107, 0.45);
  }
  50% {
    box-shadow:
      0 0 8px rgba(34, 224, 107, 0.8),
      0 0 0 6px rgba(34, 224, 107, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .inf-ask {
    transition: none !important;
  }
  .inf-ask-dot {
    animation: none !important;
  }
}
@media (forced-colors: active) {
  .inf-ask {
    box-shadow: none;
  }
}
*/
