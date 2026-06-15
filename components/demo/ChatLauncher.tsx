'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChatDemo } from './ChatDemo';

/**
 * ChatLauncher — pływający launcher czatu (prawy dolny róg) + wysuwany panel
 * z demem (spec 03 §10, "szewc w butach"). STUB: panel używa ChatDemo (atrapa).
 *
 * A11y: panel ma role="dialog", zamykanie ESC, focus-visible. Launcher jest
 * przyciskiem, nie linkiem. Nie blokuje treści strony.
 */
export function ChatLauncher() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-dropdown print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Demo czatu z Agentem SimpleFast.ai"
            className="mb-3 w-[min(22rem,calc(100vw-2.5rem))]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChatDemo />
          </motion.div>
        )}
      </AnimatePresence>

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
