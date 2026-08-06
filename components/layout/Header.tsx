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
 * Mobile: hamburger -> pełny panel (SOLIDNE tło), zamykanie ESC.
 *
 * Nawigacja w HTML (linki widoczne dla botów); klient tylko obsługuje toggle.
 *
 * INFINITY (spec-infinity, partia HERO+NAV): pasek = PŁYWAJĄCA PIGUŁKA
 * .inf-pill-nav (globals.css, partia FUNDAMENT) — max-w 1180px, mx-auto,
 * sticky top-3, radius 999px, świecąca obwódka trasy przez ::before. Mobile:
 * pigułka na pełną szerokość minus marginesy (px-3 na <header>), tło SOLIDNE
 * (zero backdrop-blur <1024px — robi to media query fundamentu). Poprzedni
 * mechanizm .sf-header/.is-scrolled (przezroczysty nad hero + scroll listener)
 * ZDJĘTY: pigułka niesie własne tło zawsze, więc nasłuch scrolla był martwym JS.
 * CTA "Umów diagnozę" (tekst 1:1) = pigułka .inf-glow-cta (neonowa obwódka).
 * Tokeny semantyczne są ciemne (domyślne), więc nawigacja to jasny tekst — AA:
 *   --fg #eaf0fa (~17.9:1) · --fg-muted navy-300 (~7.2:1) · --accent cyan-400 (~10.4:1).
 */
export function Header() {
  const [open, setOpen] = useState(false);
  // Aktywna strona w nav desktop: aria-current="page" (semantyka) steruje też
  // podkreśleniem .nav-link (underline-slide w globals.css).
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

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
      // Pigułka nie dotyka krawędzi: px-3 = margines mobile (pełna szerokość
      // minus marginesy), top-3 = pływanie nad treścią. Tło/blur/obwódkę trasy
      // robi .inf-pill-nav (fundament); blur wyłącznie desktop (mobile perf).
      className="sticky top-3 z-nav px-3 text-fg sm:px-4"
    >
      <nav
        className="inf-pill-nav mx-auto flex h-16 w-full max-w-[1180px] items-center gap-4 px-4 sm:px-6"
        aria-label="Główna"
      >
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
          {/* CTA nagłówka = pigułka z neonową obwódką (.inf-glow-cta, fundament).
              Tekst 1:1, cel bez zmian (HOME_CTA.href = trasa, więc next/link). */}
          <Link href={HOME_CTA.href} className="inf-glow-cta hidden sm:inline-flex">
            Umów diagnozę
          </Link>
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
