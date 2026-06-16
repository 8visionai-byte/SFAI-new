/**
 * REJESTR AI RADAR — single source of truth dla silnika newsów „AI o 19:00".
 *
 * Importuje moduły wpisów (każdy = jeden obiekt `RadarNews`) i eksportuje:
 *  - RADAR_NEWS: tablica wpisów posortowana malejąco po dacie (najnowszy pierwszy),
 *  - RADAR_SLUGS: lista slugów (do generateStaticParams = SSG dla każdej strony),
 *  - getNewsBySlug(slug): getter po slug (zwraca RadarNews | undefined).
 *
 * Dodanie newsa = jeden import + jeden wpis w tablicy WPISY. Trasa, sitemap-hook
 * (gdy podłączony) i SSG biorą się z tego rejestru automatycznie. Konwencja slug:
 * małe litery, myślniki, bez polskich znaków, bez końcowego slasha (spójne z lib/site.ts).
 *
 * WZORZEC 1:1 z lib/blog/index.ts. Różnica merytoryczna: AI Radar startuje z 2 wpisami,
 * które są SZABLONAMI formatu (`szablon: true`) — realne newsy doda redakcja (Paweł / Make).
 * ZERO ZMYŚLANIA: nie generujemy fikcyjnych wydarzeń, dat ani nazw modeli.
 */
import type { RadarNews } from './types';

import { tanszyModelAiAutomatyzacjaMaili } from './news/przyklad-szablon-tanszy-model-ai-automatyzacja-maili';
import { zmianaPrzepisowAiUe } from './news/przyklad-szablon-zmiana-przepisow-ai-ue';

export type { RadarNews, RadarZrodlo } from './types';

/**
 * Surowa lista wpisanych newsów (kolejność deklaracji nieistotna — i tak sortujemy
 * po dacie). 2 wpisy startowe = SZABLONY formatu. Realne newsy dochodzą tu jako kolejne
 * moduły (import + wpis), z `szablon` pominiętym lub ustawionym na false.
 */
const WPISY: readonly RadarNews[] = [
  tanszyModelAiAutomatyzacjaMaili,
  zmianaPrzepisowAiUe,
];

/**
 * Wszystkie newsy, posortowane malejąco po dacie publikacji (najnowszy pierwszy)
 * = kolejność na liście /ai-radar. Sort jest stabilny i deterministyczny (ten sam
 * wynik przy każdym buildzie SSG). Porównanie po stringu ISO YYYY-MM-DD działa
 * leksykograficznie = chronologicznie.
 */
export const RADAR_NEWS: readonly RadarNews[] = [...WPISY].sort((a, b) =>
  a.data < b.data ? 1 : a.data > b.data ? -1 : 0
);

/**
 * Slugi wszystkich newsów — wprost do generateStaticParams (SSG każdej strony).
 * Pochodzą z `slug` każdego modułu, więc nie ma rozjazdu rejestr <-> plik.
 */
export const RADAR_SLUGS: readonly string[] = RADAR_NEWS.map((n) => n.slug);

/** Indeks slug -> RadarNews (O(1) lookup w getterze, budowany raz na moduł). */
const BY_SLUG: ReadonlyMap<string, RadarNews> = new Map(
  RADAR_NEWS.map((n) => [n.slug, n])
);

/**
 * Getter po slug. Zwraca `undefined`, gdy slug nieznany — trasa woła wtedy
 * notFound() (404), więc do sitemapy nie trafi martwy URL.
 */
export function getNewsBySlug(slug: string): RadarNews | undefined {
  return BY_SLUG.get(slug);
}
