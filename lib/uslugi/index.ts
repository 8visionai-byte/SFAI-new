/**
 * REJESTR USŁUG — single source of truth dla silnika stron usług.
 *
 * Importuje 6 modułów treści (każdy = jeden obiekt `Usluga`) i eksportuje:
 *  - USLUGI: tablica wszystkich usług (kolejność = kolejność w hubie /uslugi),
 *  - USLUGI_SLUGS: lista slugów (do generateStaticParams = SSG dla 6 stron),
 *  - getUslugaBySlug(slug): getter po slug (zwraca Usluga | undefined).
 *
 * Dodanie usługi = jeden import + jeden wpis w tablicy. Trasa, sitemap-hook i
 * SSG biorą się z tego rejestru automatycznie. Konwencja slug: małe litery,
 * myślniki, bez polskich znaków, bez końcowego slasha (spójne z lib/site.ts).
 *
 * UWAGA (rozjazd slugów — spec 06 §"MAPA USŁUG"): slugi tutaj (z zadania, tech-spec 04)
 * różnią się od ROUTES w lib/site.ts / IA 01 dla 3 usług:
 *   strony-www  ↔ strony-seo-geo
 *   optymalizacja ↔ (brak w ROUTES — do dodania)
 *   rozwiazania ↔ aplikacje-i-wtyczki
 * Ujednolicenie URL = decyzja Pawła + SEO PRZED flipem `live: true` w ROUTES.
 */
import type { Usluga } from './types';
import { automatyzacje } from './automatyzacje';
import { chatboty } from './chatboty';
import { voiceboty } from './voiceboty';
import { stronyWww } from './strony-www';
import { optymalizacja } from './optymalizacja';
import { rozwiazania } from './rozwiazania';

export type { Usluga, FaqItem, TabelaWiersz, Krok, Cta } from './types';

/** Wszystkie usługi, w kolejności prezentacji w hubie /uslugi. */
export const USLUGI: readonly Usluga[] = [
  automatyzacje,
  chatboty,
  voiceboty,
  stronyWww,
  optymalizacja,
  rozwiazania,
] as const;

/**
 * Slugi wszystkich usług — wprost do generateStaticParams (SSG 6 stron).
 * Pochodzą z `slug` każdego modułu, więc nie ma rozjazdu rejestr <-> plik.
 */
export const USLUGI_SLUGS: readonly string[] = USLUGI.map((u) => u.slug);

/** Indeks slug -> Usluga (O(1) lookup w getterze, budowany raz na moduł). */
const BY_SLUG: ReadonlyMap<string, Usluga> = new Map(
  USLUGI.map((u) => [u.slug, u])
);

/**
 * Getter po slug. Zwraca `undefined`, gdy slug nieznany — trasa woła wtedy
 * notFound() (404), więc do sitemapy nie trafi martwy URL.
 */
export function getUslugaBySlug(slug: string): Usluga | undefined {
  return BY_SLUG.get(slug);
}
