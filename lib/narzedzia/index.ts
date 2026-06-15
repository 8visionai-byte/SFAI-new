/**
 * REJESTR NARZĘDZI — single source of truth dla huba /narzedzia i sitemapy.
 *
 * Wzorzec 1:1 z lib/uslugi/index.ts: jedna tablica `NARZEDZIA` napędza karty huba,
 * `NARZEDZIA_SLUGS` (sitemap), getter po slug. Dodanie narzędzia = jeden wpis tutaj
 * + jego strona w app/narzedzia/<slug>/page.tsx + wyspa w components/narzedzia/.
 *
 * Konwencja slug: małe litery, myślniki, bez polskich znaków, bez końcowego slasha.
 * Slugi są zgodne z IA (01 §1) i mapą money queries — flagowiec = kalkulator-oszczednosci.
 *
 * UWAGA: w przeciwieństwie do uslug, treść strony narzędzia (kapsuła, FAQ, tabela)
 * NIE jest w rejestrze — żyje w page.tsx, bo każde narzędzie ma inną, bogatą treść
 * SSG. Rejestr trzyma tylko to, co wspólne (karta huba + URL + lastmod).
 */
import type { Narzedzie } from './types';

export type { Narzedzie, FaqItem, KategoriaNarzedzia } from './types';

/** Data publikacji narzędzi (ostatnia realna rewizja treści). Do sitemapy. */
export const NARZEDZIA_LAST_MODIFIED = '2026-06-15';

/**
 * Wszystkie narzędzia, w kolejności prezentacji na hubie /narzedzia.
 * Flagowiec pierwszy (największa karta). Opisy = answer-first, cytowalne w HTML.
 */
export const NARZEDZIA: readonly Narzedzie[] = [
  {
    slug: 'kalkulator-oszczednosci',
    etykieta: 'Kalkulator',
    tytul: 'Kalkulator oszczędności z automatyzacji',
    opis:
      'Wpisujesz, ile osób ile godzin tygodniowo traci na powtarzalnej robocie, a kalkulator pokazuje, ile złotych rocznie odzyskasz po automatyzacji. Bez maila, w 10 sekund.',
    korzysc: 'Zobacz kwotę, której dziś nie liczy nikt.',
    kategoria: 'kalkulator',
    flagowiec: true,
    lastModified: NARZEDZIA_LAST_MODIFIED,
  },
  {
    slug: 'kalkulator-procesu',
    etykieta: 'Kalkulator',
    tytul: 'Czy warto zautomatyzować ten proces?',
    opis:
      'Liczy koszt jednego konkretnego procesu rocznie i to, po ilu miesiącach zwróci się dowolne wdrożenie. Koszt wdrożenia podajesz Ty, więc sprawdzisz nim każdą ofertę.',
    korzysc: 'Sprawdź, czy konkretna automatyzacja się spina.',
    kategoria: 'kalkulator',
    lastModified: NARZEDZIA_LAST_MODIFIED,
  },
  {
    slug: 'test-gotowosci-ai',
    etykieta: 'Test',
    tytul: 'Test gotowości firmy na AI',
    opis:
      'Osiem pytań ocenia cztery rzeczy: procesy, dane, ludzi i pierwszy proces do zdjęcia. Na koniec dostajesz poziom gotowości i trzy konkretne rekomendacje, od czego zacząć.',
    korzysc: 'Sprawdź gotowość, nawet gdy nie znasz swoich liczb.',
    kategoria: 'test',
    lastModified: NARZEDZIA_LAST_MODIFIED,
  },
  {
    slug: 'audyt-strony-ai',
    etykieta: 'Audyt',
    tytul: 'Audyt strony pod AI (GEO)',
    opis:
      'Dziesięć pytań o Twojej stronie pokazuje, czy ChatGPT i Perplexity mogą ją cytować. Liczy wynik i wskazuje trzy rzeczy do naprawy najpierw. Nie pobieramy kodu strony, oceniasz ją sam.',
    korzysc: 'Sprawdź, czy AI widzi Twoją stronę, czy pustkę.',
    kategoria: 'audyt',
    lastModified: NARZEDZIA_LAST_MODIFIED,
  },
] as const;

/**
 * Slugi wszystkich narzędzi — do sitemap (app/sitemap.ts dołącza je z rejestru).
 * Źródło prawdy = `slug` każdego wpisu, więc trasa SSG, link na hubie i sitemap
 * nigdy się nie rozjadą.
 */
export const NARZEDZIA_SLUGS: readonly string[] = NARZEDZIA.map((n) => n.slug);

/** Indeks slug -> Narzedzie (O(1) lookup). */
const BY_SLUG: ReadonlyMap<string, Narzedzie> = new Map(
  NARZEDZIA.map((n) => [n.slug, n])
);

/** Getter po slug. `undefined` gdy nieznany (trasa woła notFound -> 404). */
export function getNarzedzieBySlug(slug: string): Narzedzie | undefined {
  return BY_SLUG.get(slug);
}
