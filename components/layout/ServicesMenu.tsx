'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { USLUGI } from '@/lib/uslugi';

/**
 * Menu "Usługi" w nagłówku (desktop) — rozwijana lista 6 realnych stron /uslugi/*.
 *
 * Dlaczego disclosure, a nie link: hub /uslugi nie jest jeszcze live (lib/site.ts
 * ROUTES.live=false). Top-level "Usługi" nie może prowadzić do martwego URL-a, więc
 * jest wyzwalaczem listy, a klikalne są tylko 6 stron-liści (200 OK, SSG).
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
    <li ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 rounded-sm px-3 py-2 text-ui font-medium text-fg-muted transition-colors duration-fast hover:text-fg"
      >
        Usługi
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
