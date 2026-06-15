/**
 * REJESTR BLOGA — single source of truth dla silnika wpisów.
 *
 * Importuje moduły wpisów (każdy = jeden obiekt `Post`) i eksportuje:
 *  - POSTS: tablica wpisów posortowana malejąco po dacie (najnowszy pierwszy),
 *  - POSTS_SLUGS: lista slugów (do generateStaticParams = SSG dla każdej strony),
 *  - getPostBySlug(slug): getter po slug (zwraca Post | undefined),
 *  - POSTS_WKROTCE: tematy zaplanowane BEZ trasy (render „wkrótce" na liście).
 *
 * Dodanie wpisu = jeden import + jeden wpis w tablicy POSTS. Trasa, sitemap-hook
 * (gdy podłączony) i SSG biorą się z tego rejestru automatycznie. Konwencja slug:
 * małe litery, myślniki, bez polskich znaków, bez końcowego slasha (spójne z lib/site.ts).
 *
 * STATUS: 5 wpisów to STUBY silnika (lead answer-first gotowy, sekcje uzupełnia
 * FAZA 4). Pozostałe 5 tematów żyje jako POSTS_WKROTCE — mają etykietę na liście,
 * ale NIE mają trasy ani URL-a (zero martwych linków w sitemapie).
 */
import type { Post, PostWkrotce } from './types';

import { ileKosztujeWdrozenieAi } from './posts/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026';
import { chatbotCzyAiAgent } from './posts/chatbot-czy-ai-agent-roznice';
import { jakVoicebotOdbieraTelefony } from './posts/jak-voicebot-odbiera-telefony';
import { aiActATwojaFirma } from './posts/ai-act-a-twoja-firma-2026';
import { automatyzacjaProcesowAi } from './posts/automatyzacja-procesow-ai-od-czego-zaczac';

export type { Post, PostWkrotce, Blok, PostFaq, Kategoria } from './types';

/**
 * Surowa lista wpisanych wpisów (kolejność deklaracji nieistotna — i tak sortujemy
 * po dacie). 5 stubów z fazy „silnik". FAZA 4 wypełni ich `tresc`.
 */
const WPISY: readonly Post[] = [
  ileKosztujeWdrozenieAi,
  chatbotCzyAiAgent,
  jakVoicebotOdbieraTelefony,
  aiActATwojaFirma,
  automatyzacjaProcesowAi,
];

/**
 * Wszystkie wpisy, posortowane malejąco po dacie publikacji (najnowszy pierwszy)
 * = kolejność na liście /blog. Sort jest stabilny i deterministyczny (ten sam
 * wynik przy każdym buildzie SSG). Porównanie po stringu ISO YYYY-MM-DD działa
 * leksykograficznie = chronologicznie.
 */
export const POSTS: readonly Post[] = [...WPISY].sort((a, b) =>
  a.data < b.data ? 1 : a.data > b.data ? -1 : 0
);

/**
 * Slugi wszystkich wpisów — wprost do generateStaticParams (SSG każdej strony).
 * Pochodzą z `slug` każdego modułu, więc nie ma rozjazdu rejestr <-> plik.
 */
export const POSTS_SLUGS: readonly string[] = POSTS.map((p) => p.slug);

/** Indeks slug -> Post (O(1) lookup w getterze, budowany raz na moduł). */
const BY_SLUG: ReadonlyMap<string, Post> = new Map(POSTS.map((p) => [p.slug, p]));

/**
 * Getter po slug. Zwraca `undefined`, gdy slug nieznany — trasa woła wtedy
 * notFound() (404), więc do sitemapy nie trafi martwy URL.
 */
export function getPostBySlug(slug: string): Post | undefined {
  return BY_SLUG.get(slug);
}

/**
 * TEMATY „WKRÓTCE" — pozostałe 5 z 10 zaplanowanych tematów long-tail.
 * Świadomie BEZ pełnego `Post` i BEZ trasy: pokazujemy plan redakcyjny i łapiemy
 * frazy, ale nie generujemy pustej strony ani martwego linku. Gdy temat dojrzeje:
 * tworzymy plik w posts/, importujemy do WPISY i usuwamy go stąd — wtedy dostaje URL.
 */
export const POSTS_WKROTCE: readonly PostWkrotce[] = [
  {
    tytul: 'Czy AI zabierze pracę moim ludziom? Prawda o automatyzacji w MŚP',
    kategoria: 'Ludzie i praca',
  },
  {
    tytul: 'Ile realnie oszczędza automatyzacja maili (case: 75% draftów do 1 kliknięcia)',
    kategoria: 'Automatyzacja',
  },
  {
    tytul: 'Wdrożenie chatbota krok po kroku: ile trwa i co przygotować',
    kategoria: 'Chatboty i Agenci',
  },
  {
    tytul: 'Gdzie trafiają dane Twojej firmy przy AI (UE / RODO)',
    kategoria: 'Bezpieczeństwo danych',
  },
  {
    tytul: 'Strona, którą cytuje ChatGPT: czym jest GEO i po co Ci to',
    kategoria: 'SEO i GEO',
  },
];
