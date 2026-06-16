/**
 * REJESTR REALIZACJI — single source of truth dla silnika case studies.
 *
 * Importuje moduły treści (każdy = jeden obiekt `Realizacja`) i eksportuje:
 *  - REALIZACJE: tablica wszystkich case'ów (kolejność = kolejność na liście /realizacje),
 *  - REALIZACJE_SLUGS: lista slugów (do generateStaticParams = SSG dla każdej strony),
 *  - getRealizacjaBySlug(slug): getter po slug (zwraca Realizacja | undefined),
 *  - getRealizacjeByKategoria(kat): case'y danej kategorii (linkowanie z usług).
 *
 * Dodanie case'a = jeden import + jeden wpis w tablicy. Trasa, lista, sitemap-hook
 * i SSG biorą się z tego rejestru automatycznie. Konwencja slug: małe litery,
 * myślniki, bez polskich znaków, bez końcowego slasha (spójne z lib/site.ts).
 *
 * ŹELAZNA ZASADA: w rejestrze są WYŁĄCZNIE realne wdrożenia (case studies od Pawła).
 * Zero zmyślonych realizacji. Klient anonimowy zostaje anonimowy (bez zmyślonej nazwy).
 */
import type { Realizacja, RealizacjaKategoria } from './types';
import { autoEmailBok } from './auto-email-bok';
import { chatbotEdukacyjnyKursy } from './chatbot-edukacyjny-kursy';
import { leadGenerator } from './lead-generator';
import { transkrypcjaRozmow } from './transkrypcja-rozmow';
import { agenciAi247 } from './agenci-ai-24-7';
import { autoPodsumowaniaSpotkan } from './auto-podsumowania-spotkan';
import { automatTresciSocial } from './automat-tresci-social';
import { automatyczneRaporty } from './automatyczne-raporty';

export type {
  Realizacja,
  RealizacjaKategoria,
  FaqItem,
  Metryka,
} from './types';
export { KATEGORIA_LABEL } from './types';

/**
 * Wszystkie realizacje, w kolejności prezentacji na liście /realizacje.
 * Kolejność: najmocniejsze dowody z liczbą najpierw (75%, 1000/40 min), potem reszta.
 */
export const REALIZACJE: readonly Realizacja[] = [
  autoEmailBok,
  leadGenerator,
  autoPodsumowaniaSpotkan,
  automatTresciSocial,
  automatyczneRaporty,
  chatbotEdukacyjnyKursy,
  agenciAi247,
  transkrypcjaRozmow,
] as const;

/**
 * Slugi wszystkich realizacji — wprost do generateStaticParams (SSG).
 * Pochodzą z `slug` każdego modułu, więc nie ma rozjazdu rejestr <-> plik.
 */
export const REALIZACJE_SLUGS: readonly string[] = REALIZACJE.map((r) => r.slug);

/** Indeks slug -> Realizacja (O(1) lookup w getterze, budowany raz na moduł). */
const BY_SLUG: ReadonlyMap<string, Realizacja> = new Map(
  REALIZACJE.map((r) => [r.slug, r])
);

/**
 * Getter po slug. Zwraca `undefined`, gdy slug nieznany — trasa woła wtedy
 * notFound() (404), więc do sitemapy nie trafi martwy URL.
 */
export function getRealizacjaBySlug(slug: string): Realizacja | undefined {
  return BY_SLUG.get(slug);
}

/**
 * Case'y danej kategorii (do linkowania ze stron usług: "Zobacz realizacje").
 * Zachowuje kolejność z REALIZACJE.
 */
export function getRealizacjeByKategoria(
  kategoria: RealizacjaKategoria
): Realizacja[] {
  return REALIZACJE.filter((r) => r.kategoria === kategoria);
}
