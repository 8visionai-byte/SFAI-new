import type { PodstronaUslugi } from './types';

/**
 * OKRUSZKI PODSTRON USŁUG — JEDNO źródło łańcucha nawigacji dla trasy
 * `/uslugi/<rodzic>/<slug>`.
 *
 * PO CO OSOBNY PLIK: łańcuch okruszków żyje w DWÓCH miejscach naraz —
 * w widoku (nav w hero) i w `BreadcrumbList` JSON-LD. Google porównuje jedno
 * z drugim: markup, który pokazuje inną ścieżkę niż widzi człowiek, jest
 * ignorowany albo raportowany jako niezgodność. Dlatego łańcuch liczy się
 * TUTAJ raz, a oba renderery biorą gotową tablicę.
 *
 * DOCELOWY ŁAŃCUCH (4 poziomy, decyzja SEO 2026-08-17):
 *   Strona główna / Usługi / <krótka nazwa usługi macierzystej> / <H1 podstrony>
 * Bez poziomu rodzica podstrona wisi w hierarchii tuż pod hubem `/uslugi`,
 * chociaż jej URL i treść siedzą pod konkretną usługą.
 */

/** Jeden poziom okruszków: nazwa + ścieżka wewnętrzna (kontrakt `breadcrumbSchema`). */
export type Okruszek = { name: string; path: string };

/**
 * Krótka nazwa usługi macierzystej na poziom okruszka. CELOWO nie `h1` usługi
 * („Voicebot dla firmy, który odbiera telefon za Ciebie"): okruszek ma być
 * etykietą, nie zdaniem, a Google i tak ucina długie poziomy.
 *
 * Wartość 1:1 z etykietą, którą serwis już stosuje dla tej kategorii
 * (`lib/realizacje/types.ts` i `lib/blog/types.ts`: 'Voiceboty'), zgodna
 * z segmentem URL `/uslugi/voiceboty`. Zero nowego stringu marki.
 *
 * Slug spoza mapy = brak poziomu rodzica (łańcuch 3-poziomowy jak dziś),
 * zamiast zmyślonej nazwy.
 */
const ETYKIETA_RODZICA: Record<string, string> = {
  voiceboty: 'Voiceboty',
};

/**
 * Czy WIDOK (breadcrumbs w hero podstrony) renderuje już poziom rodzica.
 *
 * Od 2026-08-18 `true`: `components/uslugi/ServiceHero.tsx` przyjmuje
 * opcjonalny prop `okruszki`, a `app/uslugi/voiceboty/[podstrona]/page.tsx`
 * podaje mu DOKŁADNIE tę samą tablicę, która zasila BreadcrumbList JSON-LD.
 * Widok i markup wychodzą z jednej funkcji, więc rozjazd (4 poziomy w markupie
 * przy 3 na ekranie) przestał być możliwy — to była jedyna przyczyna, dla
 * której flaga stała na `false`.
 *
 * Typ `boolean` (nie literał) świadomie: warunek ma zostać czytelny dla
 * człowieka, a nie zniknąć w zwężeniu typu.
 */
const WIDOK_RENDERUJE_POZIOM_RODZICA: boolean = true;

/**
 * Łańcuch okruszków jednej podstrony. Ta sama tablica zasila widok
 * i `breadcrumbSchema()` w `app/uslugi/<rodzic>/[podstrona]/page.tsx`.
 */
export function okruszkiPodstrony(podstrona: PodstronaUslugi): Okruszek[] {
  const sciezkaRodzica = `/uslugi/${podstrona.rodzic}`;
  const etykietaRodzica = ETYKIETA_RODZICA[podstrona.rodzic];

  const poziomRodzica: Okruszek[] =
    WIDOK_RENDERUJE_POZIOM_RODZICA && etykietaRodzica
      ? [{ name: etykietaRodzica, path: sciezkaRodzica }]
      : [];

  return [
    { name: 'Strona główna', path: '/' },
    { name: 'Usługi', path: '/uslugi' },
    ...poziomRodzica,
    { name: podstrona.h1, path: `${sciezkaRodzica}/${podstrona.slug}` },
  ];
}
