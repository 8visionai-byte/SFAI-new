import { HeaderClient } from './HeaderClient';
import { getNavDropdowns } from './nav-data';

/**
 * Header — INFINITY v3 (partia A): SERWEROWY punkt wejścia nagłówka.
 *
 * Podział serwer/klient (perf, żelazna zasada "najmniej JS"):
 *  - TUTAJ (serwer, SSG): getNavDropdowns() czyta pełne rejestry treści
 *    (USLUGI/PRODUKTY/REALIZACJE/NARZEDZIA + lib/inf-kategorie) i zamienia je
 *    w płaskie pozycje dropdownów {href, tytul, opis?, c, ikona}. Rejestry
 *    z długimi tekstami (case studies!) NIE trafiają do bundla klienta.
 *  - HeaderClient ('use client'): pigułka nav, 5 dropdownów NavDropdown,
 *    menu mobilne, aria-current — dostaje tylko gotowe stringi w props.
 *
 * Eksport `Header` bez zmian (app/layout.tsx renderuje <Header /> jak dotąd).
 * Cała nawigacja (linki hubów + pozycji) jest w HTML przy pierwszym żądaniu:
 * dropdowny są ZAWSZE w DOM (ukrywane CSS-em), więc SEO nie traci.
 */
export function Header() {
  return <HeaderClient dropdowns={getNavDropdowns()} />;
}
