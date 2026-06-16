'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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
 */
export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

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
        className="rounded-sm px-3 py-2 text-ui font-medium text-fg-muted transition-colors duration-fast hover:text-fg"
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
          className="absolute right-0 top-full mt-2 w-[min(92vw,28rem)] rounded-lg border border-border bg-surface p-2 shadow-md"
          role="menu"
        >
          {/* Wyróżniony wpis: strona-parasol "Architekci Wartości AI" (centrum oferty). */}
          <li role="none">
            <Link
              role="menuitem"
              href="/uslugi/architekci-wartosci-ai"
              onClick={() => setOpen(false)}
              className="block rounded-sm bg-accent-soft px-3 py-2 text-body-sm font-semibold text-accent-hover transition-colors hover:bg-accent-soft/80"
            >
              Architekci Wartości AI
              <span className="block text-caption font-normal text-fg-muted">
                Nie wiesz od czego zacząć? Zacznij tutaj.
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
                className="block rounded-sm px-3 py-2 text-body-sm text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
              >
                {u.h1}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
