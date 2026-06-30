'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/cn';

/**
 * ChatLauncher — pływający launcher czatu (prawy dolny róg) + wysuwany panel z
 * Agentem (spec 03 §10, "szewc w butach").
 *
 * WYDAJNOŚĆ: ChatAgent ładowany LENIWIE (next/dynamic, ssr:false) — kod czatu trafia
 * do osobnego chunku i pobiera się dopiero przy pierwszym otwarciu, nie obciąża
 * pierwszego wczytania strony. Animacja wejścia/wyjścia panelu = czysty CSS
 * (.sf-chat-panel), bez framer-motion.
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

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Zamknij czat' : 'Otwórz czat z Agentem'}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-accent transition-transform duration-fast ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H9l-4 4V5.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
