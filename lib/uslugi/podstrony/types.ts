import type { Usluga } from '../types';

/**
 * TYP `PodstronaUslugi` — kontrakt treści JEDNEJ podstrony usługi
 * (`/uslugi/<rodzic>/<slug>`, np. `/uslugi/voiceboty/windykacja`).
 *
 * DLACZEGO OSOBNY REJESTR, A NIE WPIS DO `USLUGI`:
 *  Dopisanie obiektu do `lib/uslugi/index.ts` dałoby PŁASKI slug
 *  (`/uslugi/windykacja`) i wrzuciło pozycję do nawigacji, dropdownu usług
 *  i huba `/uslugi` — czego nikt nie zamawiał. Podstrona to zawężenie
 *  intencji istniejącej usługi, nie nowa usługa w ofercie.
 *
 * REUŻYWA CAŁY KONTRAKT `Usluga` (te same 8 sekcji, te same żelazne zasady:
 * każdy string musi być prawdziwy, zero zmyślonych liczb i cen, zero
 * em-dash), więc podstrona renderuje się TYMI SAMYMI komponentami
 * (components/uslugi/*) co 10 stron usług. Zero nowych stylów.
 *
 * DOKŁADA DWA POLA:
 *  - `rodzic`  — slug usługi macierzystej; buduje ścieżkę i powrót do niej,
 *  - `dataAktualizacji` — ISO data ostatniej REALNEJ zmiany treści
 *    (sitemap lastmod). Zadeklarowana TUTAJ celowo, niezależnie od tego, czy
 *    to samo pole stoi już w typie `Usluga` (dziś stoi, dołożone razem
 *    z poprawką dat w mapie witryny): przecięcie typów jest zgodne
 *    (string & string), więc podstrony mają realną datę w obu wariantach
 *    i żaden z nich nie wywraca typecheck.
 */
export type PodstronaUslugi = Usluga & {
  /**
   * Slug usługi macierzystej (np. 'voiceboty'). MUSI istnieć w rejestrze
   * `USLUGI` — pełna ścieżka podstrony to `/uslugi/${rodzic}/${slug}`.
   */
  rodzic: string;

  /**
   * ISO data ostatniej REALNEJ zmiany treści (YYYY-MM-DD) = sitemap lastmod.
   * NIE `new Date()` przy buildzie (fałszywa świeżość = sygnał śmieciowy).
   */
  dataAktualizacji: string;
};
