'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrambleText } from '@/components/motion/ScrambleText';
import type { NavDropdownData, NavDropdownItem } from './nav-data';

/**
 * NavDropdown — WSPÓLNY dropdown nawigacji desktop (INFINITY v3, partia A).
 * Przemianowany wewnętrznie z ServicesMenu (v2 obsługiwał tylko "Usługi");
 * teraz JEDEN komponent renderuje każdy z 5 dropdownów (Usługi / Produkty /
 * Realizacje / Narzędzia / Wiedza) z danych `NavDropdownData` liczonych
 * SERWEROWO w nav-data.ts (rejestry treści nie wchodzą do bundla klienta).
 *
 * v4 (spec §PARTIA A pkt 2): stan otwarcia WYNIESIONY do HeaderClient —
 * komponent jest KONTROLOWANY (props `open` + `onOpenChange`). Rodzic trzyma
 * JEDEN aktywny dropdown naraz, więc otwarcie kolejnego (hover/klik) zamyka
 * poprzedni — koniec nachodzących na siebie paneli. Hover-intent, Escape
 * i focus działają jak dotąd (mechanizmy niżej, tylko piszą przez callback).
 *
 * Interakcja (mechanizm 1:1 z v2 — spec: hover-intent 180ms + klik toggle):
 *  - desktop: otwiera się na MOUSEENTER wrappera, zamyka po mouseleave
 *    z opóźnieniem ~180ms (hover-intent) — tylko pointerType 'mouse',
 *  - klik toggluje (także klawiatura: Enter/Spacja na buttonie),
 *  - Escape zamyka i oddaje fokus przyciskowi,
 *  - focus-within trzyma otwarte (zamknięcie z opóźnienia sprawdza fokus;
 *    blur poza wrapper zamyka od razu),
 *  - chevron w przycisku obraca się 180° przy otwartym (CSS .inf-nav-chevron).
 *
 * SEO: dropdown jest ZAWSZE w DOM (ukrywany CSS-em .inf-dd, NIE unmountowany),
 * więc link huba ("Wszystkie …" — pierwszy wiersz) i linki pozycji są w HTML
 * dla botów przy pierwszym żądaniu.
 *
 * Wiersze v5 (spec §2, wzorzec 1:1): [kafel 44px z NATYWNYM emoji 20px —
 * dekoracja aria-hidden, etykietę niesie tytuł] [tytuł 1:1 z rejestru
 * (+ opis muted .inf-dd-desc, gdy rejestr ma krótkie pole)] [BADGE mono
 * .inf-dd-badge po prawej w jasnym odcieniu kategorii — treść z istniejących
 * pól rejestrów, dekoracyjna pigułka]. Panel desktop PRZEZROCZYSTY
 * (rgba(10,10,16,.72) + blur 24px — CSS w globals, partia B). Hover wiersza:
 * tło --surface-hover, kafelek translateY(-2px) (RM: bez transformów).
 */

/** Kafelek 44px z natywnym emoji kategorii (czysta dekoracja). */
function KafelekIkony({ item }: { item: NavDropdownItem }) {
  return (
    <span
      aria-hidden="true"
      className="inf-tile inf-tile-lg"
      style={{ '--tile-c': item.c } as CSSProperties}
    >
      {item.emoji}
    </span>
  );
}

/** Opóźnienie zamknięcia po mouseleave (hover-intent, spec: ~180ms). */
const CLOSE_DELAY_MS = 180;

export function NavDropdown({
  data,
  open,
  onOpenChange,
}: {
  data: NavDropdownData;
  /** v4: stan otwarcia trzyma HeaderClient (jeden aktywny dropdown naraz). */
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  // Stan aktywny przycisku: hub, jego podstrony oraz dodatkowe prefiksy
  // (Wiedza: /blog, /poradniki, /materialy, /ai-radar). aria-current="true"
  // (globalny stan ARIA) zapala też stan .inf-nav-link[aria-current].
  const pathname = usePathname();
  const prefixes = [data.href, ...(data.activePrefixes ?? [])];
  const active = prefixes.some((p) => pathname === p || pathname.startsWith(p + '/'));

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
      if (!ref.current?.contains(document.activeElement)) onOpenChange(false);
    }, CLOSE_DELAY_MS);
  };

  // Sprzątanie timera przy unmount (nawigacja klientowa).
  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onOpenChange(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      onOpenChange(false);
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
  }, [open, onOpenChange]);

  return (
    <li
      ref={ref}
      className="relative flex items-center"
      // Hover-intent tylko dla PRAWDZIWEJ myszy — emulowane zdarzenia dotyku
      // nie otwierają menu (tam działa klik/toggle).
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') {
          cancelClose();
          // v4: rodzic (HeaderClient) trzyma JEDEN aktywny dropdown — to
          // otwarcie zamyka poprzedni w tym samym setState.
          onOpenChange(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') scheduleClose();
      }}
      // Blur poza wrapper (Tab wychodzi z menu) zamyka od razu.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onOpenChange(false);
      }}
    >
      {/* JEDEN przycisk kategorii + chevron w środku. Etykieta 1:1 z NAV_LINKS. */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-current={active ? 'true' : undefined}
        className="inf-nav-link"
      >
        {/* v6 (spec §PARTIA B pkt 2): etykieta dekoduje się jak zwykłe linki
            nav (HeaderClient) — trigger to CAŁY przycisk (closest('a, button')
            w ScrambleText), chevron zostaje POZA spanem. */}
        <ScrambleText>{data.label}</ScrambleText>
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
        {/* Pierwszy wiersz = link do huba (nie może zniknąć z DOM).
            Strzałka to dekoracja (aria-hidden). */}
        <li role="none">
          <Link
            role="menuitem"
            href={data.href}
            onClick={() => onOpenChange(false)}
            className="inf-dd-row"
          >
            <span className="inf-dd-title">{data.hubLabel}</span>
            <span aria-hidden="true" className="sf-arrow ml-auto text-fg-muted">
              →
            </span>
          </Link>
        </li>

        <li role="separator" className="my-1 border-t border-border" />

        {data.items.map((item) => (
          <li key={item.href} role="none">
            <Link
              role="menuitem"
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="inf-dd-row"
            >
              <KafelekIkony item={item} />
              <span className="min-w-0 flex-1">
                <span className="inf-dd-title">{item.tytul}</span>
                {item.opis ? <span className="inf-dd-desc">{item.opis}</span> : null}
              </span>
              {/* v5: BADGE mono po prawej (pigułka w jasnym odcieniu kategorii;
                  treść 1:1 z istniejącego pola rejestru, uppercase robi CSS). */}
              {item.badge ? (
                <span
                  className="inf-dd-badge"
                  style={{ '--badge-c': item.odcien ?? item.c } as CSSProperties}
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
