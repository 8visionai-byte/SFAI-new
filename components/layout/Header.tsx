'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { NAV_LINKS, HOME_CTA } from '@/lib/site';
import { Logo } from './Logo';

/**
 * Header — sticky nav, mobile-first (spec 02 §6.5).
 * JEDEN przycisk primary = to samo główne CTA strony ("Umów diagnozę" -> #diagnoza).
 * Cień pojawia się po scrollu. Mobile: hamburger -> pełny panel, zamykanie ESC.
 *
 * Nawigacja w HTML (linki widoczne dla botów); klient tylko obsługuje toggle/scroll.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={
        'sticky top-0 z-nav border-b border-border backdrop-blur-md transition-shadow duration-base ' +
        (scrolled ? 'shadow-sm' : '')
      }
      style={{ background: 'color-mix(in srgb, var(--bg) 82%, transparent)' }}
    >
      <nav className="mx-auto flex h-16 w-full max-w-container items-center gap-4 px-gutter" aria-label="Główna">
        <Logo />

        {/* Desktop nav */}
        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-sm px-3 py-2 text-ui font-medium text-fg-muted transition-colors duration-fast hover:text-fg"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto lg:ml-3">
          <Button variant="primary" size="sm" href={HOME_CTA.href} className="hidden sm:inline-flex">
            Umów diagnozę
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Otwórz menu"
          aria-expanded={open}
          className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-sm text-fg lg:hidden focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="fixed inset-0 z-overlay bg-bg lg:hidden">
          <div className="flex h-16 items-center gap-4 px-gutter">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Zamknij menu"
              className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-sm text-fg focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col gap-1 px-gutter pt-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm py-3 text-h3 text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-gutter pt-6">
            <Button variant="primary" size="lg" href={HOME_CTA.href} onClick={() => setOpen(false)} className="w-full">
              Umów diagnozę
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
