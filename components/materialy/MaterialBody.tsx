import { PostBody } from '@/components/blog';
import { INF_TYP } from '@/lib/inf-kategorie';
import type { Blok } from '@/lib/materialy/types';

/**
 * MaterialBody — render PEŁNEJ treści lead magnetu z tablicy bloków
 * (`Material['tresc']`).
 *
 * DO v21 TO BYŁ FORK `PostBody`: 217 linii własnej kopii tego samego renderu,
 * która CELOWO degradowała bloki `sekcja`, `kafle` i `kroki` do gołego
 * <section>/<ul>/<ol> bez kart. Skutek zmierzony przed v22: sześć materiałów
 * miało po JEDNEJ karcie na całą stronę i do 11 306 znaków treści na tę jedną
 * kartę, czyli dokładnie „ścianę tekstu" ze skargi właściciela, mimo że silnik
 * v21 miał już wszystko, czego trzeba.
 *
 * OD v22 (PLAN-v22 §1.8) to cienkie opakowanie `PostBody` z tonem materiału
 * (bursztyn z `INF_TYP.material`, ten sam kolor co karta materiału na hubie —
 * „naczynia połączone"). Zyski:
 *  - jeden render treści w całym serwisie zamiast dwóch kopii, więc każda
 *    poprawka semantyki i dostępności działa wszędzie naraz,
 *  - sześć stron materiałów dostaje cały język v21 jednym ruchem,
 *  - znika źródło rozjazdu wyglądu między materiałem a poradnikiem.
 *
 * SYGNATURA PUBLICZNA BEZ ZMIAN: `app/materialy/[slug]/page.tsx` woła
 * `<MaterialBody tresc={material.tresc} />` i pozostaje nietknięty.
 * SEMANTYKA BEZ ZMIAN: dalej h2 / p / ul / ol / table renderowane serwerowo,
 * czyli treść w HTML przy pierwszym żądaniu (KPI #1: cytowalność LLM).
 *
 * `Blok` z `lib/materialy/types` to re-eksport `Blok` z `lib/blog/types`,
 * czyli dokładnie ten typ, którego oczekuje `PostBody` (jedno źródło prawdy).
 */
export function MaterialBody({ tresc }: { tresc: Blok[] }) {
  if (tresc.length === 0) return null;

  return <PostBody tresc={tresc} ton={INF_TYP.material} />;
}
