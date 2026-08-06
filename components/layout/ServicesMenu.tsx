'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { USLUGI } from '@/lib/uslugi';

/**
 * Menu "Usługi" w nagłówku (desktop) — INFINITY v2 (przebudowa wg Pawła):
 * JEDEN przycisk "Usługi" z chevronem W ŚRODKU (bez osobnego linku + ptaszka).
 *
 * Interakcja (spec v2 §Dropdown):
 *  - desktop: otwiera się na MOUSEENTER wrappera, zamyka po mouseleave
 *    z opóźnieniem ~180ms (hover-intent) — tylko pointerType 'mouse',
 *  - klik toggluje (także klawiatura: Enter/Spacja na buttonie),
 *  - Escape zamyka i oddaje fokus przyciskowi,
 *  - focus-within trzyma otwarte (zamknięcie z opóźnienia sprawdza fokus;
 *    blur poza wrapper zamyka od razu).
 *
 * SEO: dropdown jest ZAWSZE w DOM (ukrywany CSS-em .inf-dd, NIE unmountowany),
 * więc linki /uslugi (wiersz "Wszystkie usługi") i /uslugi/<slug> są w HTML
 * dla botów. Pozycja "Architekci Wartości AI" WYPADŁA z dropdownu (decyzja
 * Pawła); jej link wewnętrzny żyje na hubie /uslugi (MagneticButton) i w menu
 * mobilnym Headera — SEO nie traci.
 *
 * Wiersze: kafel 44px (.inf-tile .inf-tile-lg) z NATYWNYM emoji (dekoracja,
 * aria-hidden) w kolorze kategorii + tytuł 1:1 z rejestru (u.h1). Hover
 * wiersza: tło --surface-hover, tytuł cyjan, kafel translateY(-2px) — całość
 * w CSS (.inf-dd-row, globals.css; RM: bez ruchu).
 */

/**
 * STAŁE kolory kategorii (spec-infinity v2 §Dropdown — zmierzone ze wzorca):
 * kolor jest WYŁĄCZNIE dekoracją kafelka (--tile-c: tło/obwódka/poświata) —
 * tekst wiersza jedzie na tokenach semantycznych (AA bez zmian).
 */
const KATEGORIA_KOLOR: Record<string, string> = {
  chatboty: '#22d3ee',
  voiceboty: '#8b5cf6',
  'agent-rekrutacyjny': '#a78bfa',
  automatyzacje: '#10b981',
  'dokumenty-faktury': '#f59e0b',
  'opieka-ai': '#10b981',
  'audyt-ai': '#f59e0b',
  rozwiazania: '#8b5cf6',
  'strony-www': '#22d3ee',
  optymalizacja: '#22d3ee',
};
const KOLOR_POZOSTALE = '#8b5cf6';

/** NATYWNE emoji kategorii (spec v2 — mapa Pawła). Czysta dekoracja: kafelek
 *  ma aria-hidden, etykietę niesie tytuł wiersza. */
const EMOJI: Record<string, string> = {
  chatboty: '💬',
  voiceboty: '🎙️',
  'agent-rekrutacyjny': '🤝',
  automatyzacje: '⚡',
  'dokumenty-faktury': '📄',
  'opieka-ai': '🛡️',
  'audyt-ai': '🔍',
  rozwiazania: '🧩',
  'strony-www': '🌐',
  optymalizacja: '📈',
};
/** Fallback emoji — dla usług spoza mapy (nowe wpisy rejestru). */
const EMOJI_DOMYSLNE = '✨';

/** Kafelek kategorii — .inf-tile 44px (fundament): tło/obwódka/poświata w
 *  --tile-c, w środku natywne emoji 20px. */
function KafelekUslugi({ slug }: { slug: string }) {
  const kolor = KATEGORIA_KOLOR[slug] ?? KOLOR_POZOSTALE;
  return (
    <span
      aria-hidden="true"
      className="inf-tile inf-tile-lg"
      style={{ '--tile-c': kolor } as CSSProperties}
    >
      {EMOJI[slug] ?? EMOJI_DOMYSLNE}
    </span>
  );
}

/** Opóźnienie zamknięcia po mouseleave (hover-intent, spec: ~180ms). */
const CLOSE_DELAY_MS = 180;

export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  // Aktywna sekcja usług (hub i podstrony): aria-current="true" na przycisku
  // (globalny stan ARIA) zapala stan aktywny .inf-nav-link[aria-current].
  const pathname = usePathname();
  const uslugiActive = pathname === '/uslugi' || pathname.startsWith('/uslugi/');

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      // focus-within trzyma otwarte (klawiatura w środku dropdownu).
      if (!ref.current?.contains(document.activeElement)) setOpen(false);
    }, CLOSE_DELAY_MS);
  };

  // Sprzątanie timera przy unmount (nawigacja klientowa).
  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      // Fokus wraca na przycisk — element z fokusem nie może zostać w ukrytej
      // (visibility:hidden) liście.
      buttonRef.current?.focus();
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative flex items-center"
      // Hover-intent tylko dla PRAWDZIWEJ myszy — emulowane zdarzenia dotyku
      // nie otwierają menu (tam działa klik/toggle).
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') {
          cancelClose();
          setOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') scheduleClose();
      }}
      // Blur poza wrapper (Tab wychodzi z menu) zamyka od razu.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      {/* JEDEN przycisk "Usługi" + chevron w środku (spec v2). Tekst 1:1. */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-current={uslugiActive ? 'true' : undefined}
        className="inf-nav-link"
      >
        Usługi
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="inf-nav-chevron"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown ZAWSZE w DOM (SEO) — pokazuje/ukrywa go klasa .is-open. */}
      <ul className={'inf-dd' + (open ? ' is-open' : '')} role="menu">
        {/* Pierwszy wiersz = link do huba /uslugi (nie może zniknąć z DOM).
            Strzałka to dekoracja (aria-hidden), tekst 1:1. */}
        <li role="none">
          <Link
            role="menuitem"
            href="/uslugi"
            onClick={() => setOpen(false)}
            className="inf-dd-row"
          >
            <span className="inf-dd-title">Wszystkie usługi</span>
            <span aria-hidden="true" className="sf-arrow ml-auto text-fg-muted">
              →
            </span>
          </Link>
        </li>

        <li role="separator" className="my-1 border-t border-border" />

        {USLUGI.map((u) => (
          <li key={u.slug} role="none">
            <Link
              role="menuitem"
              href={`/uslugi/${u.slug}`}
              onClick={() => setOpen(false)}
              className="inf-dd-row"
            >
              <KafelekUslugi slug={u.slug} />
              <span className="inf-dd-title">{u.h1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
