'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { USLUGI } from '@/lib/uslugi';

/**
 * Menu "Usługi" w nagłówku (desktop) — rozwijana lista wszystkich realnych stron
 * /uslugi/* + wejście do huba /uslugi i do strony-parasola "Architekci Wartości AI".
 *
 * Hub /uslugi jest live (lib/site.ts ROUTES.live=true), więc top-level "Usługi"
 * prowadzi do rozdroża huba, a strzałka rozwija pełną listę usług. Parasol jest
 * wyróżniony na górze listy (centrum oferty, wejście niskiego progu).
 *
 * Linki = anchor po H1 usługi (= money query) — linkowanie wewnętrzne pod GEO
 * (fix SEO 05 §2.4). Lista z rejestru USLUGI (single source, zero rozjazdu slugów).
 * Linki są w HTML (bot je widzi); JS obsługuje tylko otwieranie/zamykanie.
 *
 * INFINITY (partia HERO+NAV): wiersz wzorca = [.inf-tile 40px z glifem w kolorze
 * KATEGORII] [tytuł bold]. Tytuły 1:1 z rejestru (u.h1); rejestr NIE ma krótkich
 * opisów ani badge'y (kapsula/metaDescription to długie teksty SEO), więc opis
 * muted i mono badge .inf-tag ŚWIADOMIE pominięte — zero wymyślonych treści.
 * Glify = czysto dekoracyjne SVG (aria-hidden), kolory kategorii STAŁE (niżej).
 * Dropdown zostaje SOLIDNY przez tokeny (bg-surface, border biel 10%, shadow-md).
 */

/**
 * STAŁE kolory kategorii (spec-infinity §adaptacja — przypisanie z zadania):
 * chatboty blue, voiceboty violet, automatyzacje green, strony www cyan,
 * dokumenty/OCR amber, pozostałe usługi violet pomocniczy. Kolory są WYŁĄCZNIE
 * dekoracją kafelka (--tile-c: obwódka/tło/glif) — tekst wiersza jedzie na
 * tokenach semantycznych (AA bez zmian).
 */
const KATEGORIA_KOLOR: Record<string, string> = {
  chatboty: '#2B7CFF',
  voiceboty: '#7A3CF0',
  automatyzacje: '#22E06B',
  'strony-www': '#22d3ee',
  'dokumenty-faktury': '#f59e0b',
};
const KOLOR_POZOSTALE = '#8b5cf6';

/** Glify kategorii — dekoracja (aria-hidden), stroke=currentColor (kolor z kafelka). */
const GLIFY: Record<string, ReactNode> = {
  chatboty: (
    <path d="M4 5h16v11H9.5L4 20V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  ),
  voiceboty: (
    <path
      d="M5 4h4l1.5 4L8 10c1 2.5 3.5 5 6 6l2-2.5 4 1.5v4c0 .5-.5 1-1 1C10.5 20 4 13.5 4 5c0-.5.5-1 1-1Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  'agent-rekrutacyjny': (
    <>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20c1-3.5 3.5-5 7-5s6 1.5 7 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  automatyzacje: (
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  ),
  'dokumenty-faktury': (
    <>
      <path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 12h5M10 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  'opieka-ai': (
    <path d="M3 12h4l2-6 4 12 2-6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'audyt-ai': (
    <>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  rozwiazania: (
    <path
      d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm-8 4.5 8 4.5m0 0 8-4.5M12 12v9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  'strony-www': (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  optymalizacja: (
    <path d="m3 17 6-6 4 4 8-8M15 7h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
};
/** Fallback glifu (iskra) — dla usług spoza mapy (nowe wpisy rejestru). */
const GLIF_DOMYSLNY: ReactNode = (
  <path
    d="M12 3l2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />
);

/** Kafelek kategorii — .inf-tile (fundament): tło/obwódka/poświata w --tile-c. */
function KafelekUslugi({ slug }: { slug: string }) {
  const kolor = KATEGORIA_KOLOR[slug] ?? KOLOR_POZOSTALE;
  return (
    <span
      aria-hidden="true"
      className="inf-tile"
      style={{ '--tile-c': kolor, color: kolor } as CSSProperties}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {GLIFY[slug] ?? GLIF_DOMYSLNY}
      </svg>
    </span>
  );
}
export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  // Aktywna sekcja usług (hub i podstrony): aria-current="page" trzyma
  // podkreślenie .nav-link (underline-slide, globals.css).
  const pathname = usePathname();
  const uslugiActive = pathname === '/uslugi' || pathname.startsWith('/uslugi/');

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <li ref={ref} className="relative flex items-center">
      {/* Hub /uslugi jest live — top-level "Usługi" to realny link do rozdroża. */}
      <Link
        href="/uslugi"
        aria-current={uslugiActive ? 'page' : undefined}
        className="nav-link rounded-sm px-3 py-2 text-ui font-medium text-fg-muted transition-colors duration-fast hover:text-fg"
      >
        Usługi
      </Link>

      {/* Strzałka = osobny toggle rozwijanej listy (nie miesza z nawigacją do huba). */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Rozwiń listę usług"
        className="inline-flex items-center rounded-sm px-1 py-2 text-fg-muted transition-colors duration-fast hover:text-fg"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={'transition-transform duration-fast ' + (open ? 'rotate-180' : '')}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          className="sf-menu-pop absolute right-0 top-full mt-2 w-[min(92vw,28rem)] rounded-lg border border-border bg-surface p-2 shadow-md"
          role="menu"
        >
          {/* Wyróżniony wpis: strona-parasol "Architekci Wartości AI" (centrum
              oferty). Teksty 1:1; kafelek = dekoracja w violecie pomocniczym. */}
          <li role="none">
            <Link
              role="menuitem"
              href="/uslugi/architekci-wartosci-ai"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-md bg-accent-soft px-3 py-2 transition-colors hover:bg-accent-soft/80"
            >
              <KafelekUslugi slug="architekci-wartosci-ai" />
              <span className="min-w-0">
                <span className="block text-body-sm font-semibold text-accent-hover">
                  Architekci Wartości AI
                </span>
                <span className="block text-caption font-normal text-fg-muted">
                  Nie wiesz od czego zacząć? Zacznij tutaj.
                </span>
              </span>
            </Link>
          </li>

          {/* Link do całego huba (rozdroże 3 klastrów). */}
          <li role="none">
            <Link
              role="menuitem"
              href="/uslugi"
              onClick={() => setOpen(false)}
              className="block rounded-sm px-3 py-2 text-body-sm text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
            >
              Wszystkie usługi
            </Link>
          </li>

          <li role="separator" className="my-1 border-t border-border" />

          {USLUGI.map((u) => (
            <li key={u.slug} role="none">
              <Link
                role="menuitem"
                href={`/uslugi/${u.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-bg-subtle"
              >
                <KafelekUslugi slug={u.slug} />
                <span className="text-body-sm font-semibold text-fg">{u.h1}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
