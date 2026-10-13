'use client';

import { useEffect } from 'react';

/**
 * ZrodloWejscia — zapamiętuje, SKĄD i NA KTÓRĄ STRONĘ wszedł odwiedzający,
 * raz na sesję karty. Formularz diagnozy (components/forms/DiagnozaForm.tsx)
 * dosyła to z leadem, a /api/lead przekazuje do Make.
 *
 * PO CO (audyt SEO 2026-10-12): formularz stoi tylko na / i /kontakt, więc pole
 * `strona` w zgłoszeniu zawsze mówiło /kontakt albo strona główna. Nie dało się
 * połączyć leada z frazą i podstroną z Search Console.
 *
 * Co zapisujemy (sessionStorage, klucz KLUCZ_WEJSCIA, bez ciasteczek):
 *  - sciezka: pierwsza ścieżka w sesji (bez query),
 *  - skad: sam host poprzedniej strony (np. www.google.com), bez ścieżki i query,
 *    a pusty, gdy wejście jest bezpośrednie albo wewnątrz serwisu,
 *  - utm: utm_source / utm_medium / utm_campaign, jeśli są w adresie.
 * Zero danych osobowych. Pierwszy zapis wygrywa: nawigacja po serwisie go nie nadpisuje.
 *
 * Każdy dostęp do sessionStorage w try/catch: tryb prywatny i blokady potrafią
 * rzucić wyjątkiem, a pomiar nigdy nie może zepsuć strony.
 *
 * Render: null (czysty efekt uboczny).
 */
export const KLUCZ_WEJSCIA = 'sf_wejscie';

export type Wejscie = { sciezka: string; skad: string; utm: string };

export function ZrodloWejscia() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(KLUCZ_WEJSCIA)) return;

      let skad = '';
      try {
        if (document.referrer) {
          const host = new URL(document.referrer).hostname;
          if (host && host !== window.location.hostname) skad = host;
        }
      } catch {
        skad = '';
      }

      const p = new URLSearchParams(window.location.search);
      const utm = ['utm_source', 'utm_medium', 'utm_campaign']
        .map((k) => p.get(k))
        .filter((v): v is string => Boolean(v))
        .join(' / ')
        .slice(0, 200);

      const wejscie: Wejscie = { sciezka: window.location.pathname.slice(0, 200), skad, utm };
      window.sessionStorage.setItem(KLUCZ_WEJSCIA, JSON.stringify(wejscie));
    } catch {
      /* sessionStorage niedostępne: lead pójdzie bez strony wejścia */
    }
  }, []);

  return null;
}

/** Odczyt dla formularza. Zawsze zwraca obiekt, nigdy nie rzuca. */
export function czytajWejscie(): Wejscie {
  const pusty: Wejscie = { sciezka: '', skad: '', utm: '' };
  try {
    const raw = window.sessionStorage.getItem(KLUCZ_WEJSCIA);
    if (!raw) return pusty;
    const o = JSON.parse(raw) as Partial<Wejscie>;
    return {
      sciezka: typeof o.sciezka === 'string' ? o.sciezka : '',
      skad: typeof o.skad === 'string' ? o.skad : '',
      utm: typeof o.utm === 'string' ? o.utm : '',
    };
  } catch {
    return pusty;
  }
}
