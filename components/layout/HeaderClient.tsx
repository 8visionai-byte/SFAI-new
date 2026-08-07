'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { NAV_LINKS, HOME_CTA } from '@/lib/site';
import { Logo } from './Logo';
import { NavDropdown } from './ServicesMenu';
import type { NavDropdownData } from './nav-data';
import { ScrambleText } from '@/components/motion/ScrambleText';

/**
 * HeaderClient — interaktywna powłoka nagłówka (INFINITY v3, partia A).
 * Wydzielona z Header.tsx: Header jest teraz SERWEROWY (liczy dane dropdownów
 * z rejestrów w nav-data.ts), a tu żyje tylko to, co wymaga klienta: toggle
 * menu mobilnego, aria-current z usePathname i 5 dropdownów NavDropdown.
 *
 * Desktop: KAŻDA pozycja NAV_LINKS z pasującym wpisem w `dropdowns` renderuje
 * NavDropdown (Usługi/Produkty/Realizacje/Narzędzia/Wiedza — spec v3
 * §NAWIGACJA); pozycje bez dropdownu (O nas) to zwykły .inf-nav-link.
 * Kolejność 1:1 z NAV_LINKS (treść nietknięta).
 *
 * v4 (spec §PARTIA A pkt 2): WSPÓLNY stan dropdownów — `openDropdown` trzyma
 * href JEDYNEGO otwartego naraz; NavDropdown jest kontrolowany (open +
 * onOpenChange), więc otwarcie kolejnego (hover-intent/klik) ZAMYKA poprzedni
 * w jednym setState — koniec nachodzących paneli. Escape/focus/hover-intent
 * bez zmian (mechanizmy zostały w NavDropdown).
 *
 * Mobile: bez zmian treści względem v2 — hamburger -> pełny panel (SOLIDNE
 * tło, zero backdrop-blur <1024px), Usługi rozwinięte listą (tytuły 1:1
 * z rejestru — biorą się z danych dropdownu "Usługi", więc jedno źródło),
 * wyróżniony wpis "Architekci Wartości AI", reszta nav zwykłymi linkami,
 * zamykanie ESC. Nawigacja w HTML (linki widoczne dla botów).
 *
 * Pasek = PŁYWAJĄCA PIGUŁKA .inf-pill-nav (globals.css): max-w 1180px,
 * sticky top-3, świecąca obwódka trasy przez ::before (mobile: statyczna,
 * tło solidne). CTA "Umów diagnozę" (tekst 1:1) = pigułka .inf-glow-cta
 * (v5, spec §2: ZIELONA obwódka + litery cyjan; hover = litery BIAŁE ze
 * świeceniem text-shadow, obwódka jaśnieje — reguły w globals, partia B).
 */
export function HeaderClient({ dropdowns }: { dropdowns: NavDropdownData[] }) {
  const [open, setOpen] = useState(false);
  // v4: JEDEN otwarty dropdown naraz — stan wspólny (href aktywnego albo null).
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Aktywna strona w nav desktop: aria-current="page" (semantyka) zapala też
  // stan aktywny .inf-nav-link[aria-current] (biel + cyjanowy glow).
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  // Indeks dropdownów po href huba — dopasowanie do NAV_LINKS bez zmiany
  // kolejności pozycji nav.
  const dropdownByHref = new Map(dropdowns.map((d) => [d.href, d]));
  // Lista usług do menu mobilnego: 1:1 z danych dropdownu "Usługi"
  // (tytuł = u.h1 z rejestru — to samo źródło co desktop).
  const uslugiItems = dropdownByHref.get('/uslugi')?.items ?? [];

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

        {/* Desktop nav — pozycje z rejestrami = NavDropdown, reszta = linki. */}
        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const dd = dropdownByHref.get(link.href);
            if (dd)
              return (
                // v4: dropdown kontrolowany — otwarcie ustawia SWÓJ href
                // (poprzedni gaśnie automatycznie), zamknięcie czyści stan
                // tylko jeśli to on jest aktywny (spóźniony hover-intent
                // timer nie może zgasić świeżo otwartego sąsiada).
                <NavDropdown
                  key={link.href}
                  data={dd}
                  open={openDropdown === dd.href}
                  onOpenChange={(v) =>
                    setOpenDropdown((prev) =>
                      v ? dd.href : prev === dd.href ? null : prev
                    )
                  }
                />
              );
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="inf-nav-link"
                >
                  {/* v4 partia D: etykieta dekoduje się na hover/focus CAŁEGO
                      linku (ScrambleText — bramki pointer:fine + !RM w środku;
                      SSR renderuje pełny tekst, treść 1:1 z NAV_LINKS). */}
                  <ScrambleText>{link.label}</ScrambleText>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto lg:ml-3">
          {/* CTA nagłówka = pigułka .inf-glow-cta (v5: zielona obwódka, litery
              cyjan -> hover białe świecące). Tekst 1:1, cel bez zmian
              (HOME_CTA.href = trasa, więc next/link). */}
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
                {uslugiItems.map((u) => (
                  <li key={u.href}>
                    <Link
                      href={u.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-sm py-2 text-body text-fg-muted hover:text-fg active:bg-bg-subtle"
                    >
                      {u.tytul}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {NAV_LINKS.filter((l) => l.href !== '/uslugi').map((link) => (
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
