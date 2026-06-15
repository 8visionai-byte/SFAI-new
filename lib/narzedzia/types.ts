/**
 * TYPY WSPÓLDZIELONE NARZĘDZI (spec 07).
 *
 * `Narzedzie` = metadane jednego narzędzia w rejestrze (jak `Usluga`): napędza
 * hub /narzedzia, sitemap i breadcrumbs. Treść strony (kapsuła, FAQ, tabela) żyje
 * w samej stronie (page.tsx), bo jest bogata i specyficzna dla narzędzia. Rejestr
 * trzyma to, co wspólne: slug, tytuł karty huba, jednozdaniowy opis, kategoria lejka.
 */

/** Pozycja w lejku — do grupowania/sortowania kart na hubie (opisowo). */
export type KategoriaNarzedzia = 'kalkulator' | 'test' | 'audyt';

export type Narzedzie = {
  /** Slug URL: małe litery, myślniki, bez polskich znaków, bez końcowego slasha. */
  slug: string;
  /** Tytuł karty na hubie (krótki, rzeczowy). */
  tytul: string;
  /** Jednozdaniowy opis answer-first na karcie huba (cytowalny, w HTML). */
  opis: string;
  /** Mikro-etykieta nad tytułem karty (np. "Kalkulator", "Test"). */
  etykieta: string;
  /** Kategoria lejka (do ewentualnego grupowania). */
  kategoria: KategoriaNarzedzia;
  /** Co klient z tego ma — 1 zdanie korzyści pod opisem (na karcie). */
  korzysc: string;
  /** Czy to flagowiec (większa karta na hubie). */
  flagowiec?: boolean;
  /** Data ostatniej realnej zmiany treści (ISO) — do sitemap. */
  lastModified: string;
};

/** Pozycja FAQ — identyczny kształt jak w lib/uslugi (spójność ze schematem). */
export type FaqItem = {
  pytanie: string;
  odpowiedz: string;
};
