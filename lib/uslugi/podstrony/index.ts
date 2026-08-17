/**
 * REJESTR PODSTRON USŁUG — single source of truth dla tras
 * `/uslugi/<rodzic>/<slug>`.
 *
 * ŚWIADOMIE OSOBNY OD `lib/uslugi/index.ts`: tamten rejestr napędza nawigację,
 * dropdown usług, hub `/uslugi` i trasę `/uslugi/[usluga]`. Podstrona to
 * zawężenie intencji istniejącej usługi (jedno zastosowanie, jedna fraza),
 * a nie nowa pozycja oferty, więc NIE wchodzi do `USLUGI` i nie pokazuje się
 * w menu. Widoczność zapewnia jej mapa witryny i link ze strony macierzystej.
 *
 * Eksportuje:
 *  - PODSTRONY: wszystkie podstrony (kolejność = kolejność wdrożenia),
 *  - getPodstronyRodzica(rodzic): podstrony jednej usługi (generateStaticParams),
 *  - getPodstrona(rodzic, slug): getter (zwraca undefined -> trasa woła notFound),
 *  - PODSTRONY_SITEMAP: gotowe pary URL + data dla app/sitemap.ts.
 *
 * Dodanie podstrony = jeden import + jeden wpis w tablicy PODSTRONY. Trasa
 * (SSG) i wpis w mapie witryny biorą się z tego rejestru automatycznie,
 * o ile katalog trasy istnieje dla danego `rodzic`.
 */
import type { PodstronaUslugi } from './types';
import { windykacja } from './windykacja';
import { potwierdzanieWizyt } from './potwierdzanie-wizyt';

export type { PodstronaUslugi } from './types';

/** Wszystkie podstrony usług (dziś: dwie podstrony voicebotów). */
export const PODSTRONY: readonly PodstronaUslugi[] = [
  windykacja,
  potwierdzanieWizyt,
] as const;

/** Indeks `rodzic/slug` -> podstrona (O(1) lookup, budowany raz na moduł). */
const BY_KLUCZ: ReadonlyMap<string, PodstronaUslugi> = new Map(
  PODSTRONY.map((p) => [`${p.rodzic}/${p.slug}`, p])
);

/**
 * Podstrony jednej usługi macierzystej. Używane w `generateStaticParams()`
 * trasy `/uslugi/<rodzic>/[podstrona]` (SSG, dynamicParams=false).
 */
export function getPodstronyRodzica(rodzic: string): readonly PodstronaUslugi[] {
  return PODSTRONY.filter((p) => p.rodzic === rodzic);
}

/**
 * Getter po parze rodzic + slug. `undefined` = trasa woła notFound() (404),
 * więc do mapy witryny nie trafi martwy URL.
 */
export function getPodstrona(
  rodzic: string,
  slug: string
): PodstronaUslugi | undefined {
  return BY_KLUCZ.get(`${rodzic}/${slug}`);
}

/**
 * Gotowe dane do `app/sitemap.ts` (ścieżka + realna data zmiany treści).
 * Sitemap należy do innego zakresu, więc rejestr podaje mu policzone pary
 * zamiast zmuszać go do znajomości struktury podstron.
 */
export const PODSTRONY_SITEMAP: readonly { path: string; dataAktualizacji: string }[] =
  PODSTRONY.map((p) => ({
    path: `/uslugi/${p.rodzic}/${p.slug}`,
    dataAktualizacji: p.dataAktualizacji,
  }));
