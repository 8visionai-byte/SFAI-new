/**
 * REJESTR PORADNIKÓW — single source of truth dla silnika poradników evergreen.
 *
 * Wzorzec 1:1 z lib/blog/index.ts. Importuje moduły poradników (każdy = jeden
 * obiekt `Poradnik`) i eksportuje:
 *  - PORADNIKI: tablica posortowana malejąco po dacie (najnowszy pierwszy),
 *  - PORADNIKI_SLUGS: lista slugów (do generateStaticParams = SSG każdej strony),
 *  - getPoradnikBySlug(slug): getter po slug (zwraca Poradnik | undefined).
 *
 * Dodanie poradnika = jeden import + jeden wpis w tablicy PORADNIKI_RAW. Trasa,
 * sitemap-hook (gdy podłączony) i SSG biorą się z tego rejestru automatycznie.
 * Konwencja slug: małe litery, myślniki, bez polskich znaków, bez końcowego slasha.
 *
 * STATUS: 3 poradniki evergreen z pełną treścią (faza 1). Tematy bez kanibalizacji
 * z istniejącym blogiem (wpis „ile kosztuje wdrożenie AI w małej firmie" zostaje na
 * blogu; tu są chatbot, biuro rachunkowe i AI agent — węższe money queries).
 */
import type { Poradnik } from './types';

import { ileKosztujeChatbotDlaFirmy } from './poradniki/ile-kosztuje-chatbot-dla-firmy-2026';
import { aiWBiurzeRachunkowym } from './poradniki/ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac';
import { ileKosztujeWdrozenieAiAgenta } from './poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy';

export type {
  Poradnik,
  KategoriaPoradnika,
  LinkKrzyzowy,
  Blok,
  PostFaq,
} from './types';

/**
 * Surowa lista wpisanych poradników (kolejność deklaracji nieistotna — i tak
 * sortujemy po dacie). Dodajesz poradnik = dopisujesz import i wpis tutaj.
 */
const PORADNIKI_RAW: readonly Poradnik[] = [
  ileKosztujeChatbotDlaFirmy,
  aiWBiurzeRachunkowym,
  ileKosztujeWdrozenieAiAgenta,
];

/**
 * Wszystkie poradniki, posortowane malejąco po dacie publikacji (najnowszy
 * pierwszy) = kolejność na liście /poradniki. Sort stabilny i deterministyczny
 * (ten sam wynik przy każdym buildzie). Porównanie stringów ISO YYYY-MM-DD działa
 * leksykograficznie = chronologicznie.
 */
export const PORADNIKI: readonly Poradnik[] = [...PORADNIKI_RAW].sort((a, b) =>
  a.data < b.data ? 1 : a.data > b.data ? -1 : 0
);

/**
 * Slugi wszystkich poradników — wprost do generateStaticParams (SSG każdej strony).
 * Pochodzą z `slug` każdego modułu, więc nie ma rozjazdu rejestr <-> plik <-> trasa.
 */
export const PORADNIKI_SLUGS: readonly string[] = PORADNIKI.map((p) => p.slug);

/** Indeks slug -> Poradnik (O(1) lookup w getterze, budowany raz na moduł). */
const BY_SLUG: ReadonlyMap<string, Poradnik> = new Map(
  PORADNIKI.map((p) => [p.slug, p])
);

/**
 * Getter po slug. Zwraca `undefined`, gdy slug nieznany — trasa woła wtedy
 * notFound() (404), więc do sitemapy nie trafi martwy URL.
 */
export function getPoradnikBySlug(slug: string): Poradnik | undefined {
  return BY_SLUG.get(slug);
}
