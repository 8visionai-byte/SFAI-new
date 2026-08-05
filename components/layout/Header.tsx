'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { NAV_LINKS, HOME_CTA } from '@/lib/site';
import { USLUGI } from '@/lib/uslugi';
import { Logo } from './Logo';
import { ServicesMenu } from './ServicesMenu';

/**
 * Pozostałe linki nawigacji bez "/uslugi" — bo "Usługi" obsługuje ServicesMenu
 * (rozwijana lista 6 realnych stron), a hub /uslugi nie jest jeszcze live.
 */
const NAV_LINKS_REST = NAV_LINKS.filter((l) => l.href !== '/uslugi');

/**
 * Header — sticky nav, mobile-first (spec 02 §6.5).
 * JEDEN przycisk primary = to samo główne CTA strony ("Umów diagnozę" -> #diagnoza).
 * Cień pojawia się po scrollu. Mobile: hamburger -> pełny panel, zamykanie ESC.
 *
 * Nawigacja w HTML (linki widoczne dla botów); klient tylko obsługuje toggle/scroll.
 *
 * ŚWIAT B — CIEMNY PASEK (makieta zrodla/makiety-b/1-hero.png): nad hero pasek
 * jest PRZEZROCZYSTY (kadr kina bez ramki), po scrollu dostaje ciemną taflę
 * z hairline dołem (.sf-header/.is-scrolled w globals.css — mobile SOLIDNY granat
 * bez backdrop-blur ze względu na perf, desktop ≥1024px półprzezroczysta tafla
 * + blur). Logo = wordmark TEKSTOWY (PNG ginął na ciemnym — patrz Logo.tsx).
 * Tokeny semantyczne są ciemne (domyślne), więc nawigacja to jasny tekst — AA:
 *   --fg #eaf0fa (16.35:1) · --fg-muted navy-300 (6.64:1) · --accent cyan-400 (9.71:1).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Aktywna strona w nav desktop: aria-current="page" (semantyka) steruje też
  // podkreśleniem .nav-link (underline-slide w globals.css).
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

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
    <>
    <header
      // Tło/hairline/blur robi .sf-header (globals.css): przezroczysty nad hero,
      // po scrollu granat + hairline; blur wyłącznie desktop (mobile perf).
      className={
        'sf-header sticky top-0 z-nav text-fg ' +
        (scrolled ? 'is-scrolled shadow-md' : '')
      }
    >
      <nav className="mx-auto flex h-16 w-full max-w-container items-center gap-4 px-gutter" aria-label="Główna">
        <Logo priority />

        {/* Desktop nav — "Usługi" = ServicesMenu (6 realnych stron), reszta = linki */}
        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          <ServicesMenu />
          {NAV_LINKS_REST.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="nav-link rounded-sm px-3 py-2 text-ui font-medium text-fg-muted transition-colors duration-fast hover:text-fg"
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
          className="ml-1 inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-sm text-fg lg:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>
      </header>

      {/* Mobile panel — RENDEROWANY POZA <header>, bo header ma backdrop-blur
          (backdrop-filter tworzy containing block dla position:fixed → inset-0
          liczyłby się względem 64px paska, nie viewportu, i dół menu z CTA był
          nieosiągalny). Tutaj fixed inset-0 = pełny viewport.
          Flex-kolumna: stały pasek (logo+zamknij) u góry, niżej JEDEN obszar
          przewijany (lista + CTA), więc na niskich ekranach (320×740 z pełną listą
          usług) całość, łącznie z głównym CTA, jest osiągalna przez scroll.
          Cała sekcja jest lg:hidden, więc desktop nietknięty. */}
      {open && (
        <div
          className="fixed inset-0 z-overlay flex flex-col text-fg lg:hidden"
          // Świat B: SOLIDNE ciemne tło panelu (token --bg = navy-950) — pełne
          // krycie treści pod spodem, spójne z kinem całej strony.
          style={{ background: 'var(--bg)' }}
        >
          <div className="flex h-16 shrink-0 items-center gap-4 px-gutter">
            <Logo priority />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Zamknij menu"
              className="ml-auto inline-flex h-[44px] w-[44px] items-center justify-center rounded-sm text-fg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {/* Obszar przewijany: lista nawigacji + CTA. flex-1 + min-h-0 pozwala
              overflow-y-auto faktycznie zadziałać wewnątrz flex-kolumny. */}
          <div className="sf-scroll-slim flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <ul className="flex flex-col gap-1 px-gutter pt-4">
            {/* Usługi — hub live + parasol wyróżniony + pełna lista usług z rejestru */}
            <li>
              <Link
                href="/uslugi"
                onClick={() => setOpen(false)}
                className="block rounded-sm py-3 text-h3 text-fg active:bg-bg-subtle"
              >
                Usługi
              </Link>

              {/* Wyróżniony wpis: strona-parasol "Architekci Wartości AI". */}
              <Link
                href="/uslugi/architekci-wartosci-ai"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-md bg-accent-soft px-3 py-2 text-body font-semibold text-accent-hover"
              >
                Architekci Wartości AI
                <span className="block text-caption font-normal text-fg-muted">
                  Nie wiesz od czego zacząć? Zacznij tutaj.
                </span>
              </Link>

              <ul className="mt-2 flex flex-col">
                {USLUGI.map((u) => (
                  <li key={u.slug}>
                    <Link
                      href={`/uslugi/${u.slug}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-sm py-2 text-body text-fg-muted hover:text-fg active:bg-bg-subtle"
                    >
                      {u.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {NAV_LINKS_REST.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm py-3 text-h3 text-fg active:bg-bg-subtle"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-gutter pb-2 pt-6">
            <Button variant="primary" size="lg" href={HOME_CTA.href} onClick={() => setOpen(false)} className="w-full">
              Umów diagnozę
            </Button>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
