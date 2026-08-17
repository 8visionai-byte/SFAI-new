/**
 * Deklaracja `window.umami` — Umami Cloud (cookieless analytics, RODO bez banera).
 *
 * Skrypt wstrzykujący ten obiekt renderuje się w app/layout.tsx TYLKO gdy ustawione
 * jest NEXT_PUBLIC_UMAMI_WEBSITE_ID, a bloker reklam potrafi go zdjąć nawet wtedy.
 * Dlatego pole jest OPCJONALNE, a każde wywołanie w kodzie idzie przez
 * `window.umami?.track(...)`. Gołe `umami.track(...)` rzuciłoby wyjątkiem i zabiło
 * obsługę zdarzenia (np. wysyłkę formularza), czyli analityka zepsułaby konwersję.
 *
 * Plik istnieje, bo tsconfig ma `strict: true` — bez tej deklaracji `typecheck`
 * pada na TS2339 i kusi do `as any` / `@ts-ignore` w kodzie produkcyjnym.
 * Objęty przez `include: ["**\/*.ts"]` w tsconfig.json.
 */
declare global {
  interface Window {
    umami?: {
      /** `track('nazwa_zdarzenia')` lub `track('nazwa', { pole: wartosc })`. */
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

export {};
