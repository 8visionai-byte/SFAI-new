/**
 * REJESTR LEAD MAGNETÓW — single source of truth dla huba /materialy i sitemapy.
 *
 * Wzorzec 1:1 z lib/blog/index.ts: importuje moduły magnetów (każdy = jeden obiekt
 * `Material`) i eksportuje:
 *  - MATERIALY: tablica magnetów posortowana malejąco po dacie (najnowszy pierwszy),
 *  - MATERIALY_SLUGS: lista slugów (do generateStaticParams = SSG każdej strony),
 *  - getMaterialBySlug(slug): getter po slug (Material | undefined),
 *  - MATERIALY_WKROTCE: magnety zaplanowane BEZ trasy (render „wkrótce" na hubie).
 *
 * Dodanie magnetu = jeden import + jeden wpis w tablicy MAGNETY. Trasa, sitemap
 * (gdy podłączona) i SSG biorą się z rejestru automatycznie. Konwencja slug:
 * małe litery, myślniki, bez polskich znaków, bez końcowego slasha (spójne z lib/site.ts).
 *
 * STATUS (część 1 + część 2 buildu): 6 magnetów z PEŁNĄ realną treścią, każdy z
 * trasą SSG (200 OK). Część 2 dopisała pozostałe 3 z briefu (checklista 20 procesów,
 * 10 błędów wdrożenia AI, arkusz kosztu ręcznych zadań) — przeniesione z WKROTCE do
 * MAGNETY, więc dostały URL i wchodzą do sitemapy. MATERIALY_WKROTCE jest teraz puste
 * (wszystkie zaplanowane magnety dojrzały).
 */
import type { Material, MaterialWkrotce } from './types';

import { promptyDlaWlasciciela } from './magnety/50-promptow-ai-dla-wlasciciela-firmy';
import { jakPisacPrompty } from './magnety/jak-pisac-prompty-ktore-dzialaja';
import { promptyBranzowe } from './magnety/prompty-branzowe-kancelaria-ecommerce-budowlanka';
import { checklista20Procesow } from './magnety/checklista-20-procesow-do-automatyzacji-ai';
import { dziesiecBledow } from './magnety/10-bledow-przy-wdrazaniu-ai-w-firmie';
import { arkuszKosztRecznychZadan } from './magnety/arkusz-policz-koszt-recznych-zadan';

export type { Material, MaterialWkrotce, Blok, MaterialFaq, TypPliku } from './types';

/** Data ostatniej realnej rewizji huba /materialy. Do sitemapy. */
export const MATERIALY_LAST_MODIFIED = '2026-06-16';

/**
 * Surowa lista magnetów (kolejność deklaracji nieistotna — sortujemy po dacie).
 * 6 magnetów z pełną treścią (część 1 + część 2 buildu).
 */
const MAGNETY: readonly Material[] = [
  promptyDlaWlasciciela,
  jakPisacPrompty,
  promptyBranzowe,
  checklista20Procesow,
  dziesiecBledow,
  arkuszKosztRecznychZadan,
];

/**
 * Wszystkie magnety, posortowane malejąco po dacie publikacji (najnowszy pierwszy)
 * = kolejność na hubie /materialy. Sort stabilny i deterministyczny (ten sam wynik
 * przy każdym buildzie SSG). Porównanie stringu ISO YYYY-MM-DD = chronologiczne.
 */
export const MATERIALY: readonly Material[] = [...MAGNETY].sort((a, b) =>
  a.data < b.data ? 1 : a.data > b.data ? -1 : 0
);

/**
 * Slugi wszystkich magnetów — wprost do generateStaticParams (SSG każdej strony)
 * i do sitemap (app/sitemap.ts dołącza je z rejestru). Źródło = `slug` każdego
 * modułu, więc trasa SSG, link na hubie i sitemap nigdy się nie rozjadą.
 */
export const MATERIALY_SLUGS: readonly string[] = MATERIALY.map((m) => m.slug);

/** Indeks slug -> Material (O(1) lookup w getterze). */
const BY_SLUG: ReadonlyMap<string, Material> = new Map(
  MATERIALY.map((m) => [m.slug, m])
);

/**
 * Getter po slug. Zwraca `undefined`, gdy slug nieznany — trasa woła wtedy
 * notFound() (404), więc do sitemapy nie trafi martwy URL.
 */
export function getMaterialBySlug(slug: string): Material | undefined {
  return BY_SLUG.get(slug);
}

/**
 * MAGNETY „WKRÓTCE" — pozycje zaplanowane BEZ pełnego `Material` i BEZ trasy
 * (zapowiedź na hubie, zero martwego linku). Wszystkie 6 zaplanowanych magnetów
 * z briefu mają już pełną treść i trasę (są w MAGNETY powyżej), więc lista jest
 * teraz pusta. Gdy pojawi się nowy zaplanowany magnet bez treści: dopisz go tutaj
 * (etykieta na hubie), a po napisaniu treści przenieś do MAGNETY (wtedy dostaje URL).
 */
export const MATERIALY_WKROTCE: readonly MaterialWkrotce[] = [];
