import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { getPodstronyRodzica, getPodstrona } from '@/lib/uslugi/podstrony';
import { getUslugaBySlug } from '@/lib/uslugi';
import type { Usluga } from '@/lib/uslugi/types';
import { LinkiKrzyzowe } from '@/components/poradniki/LinkiKrzyzowe';
import { dekorUslugi } from '@/lib/inf-kategorie';

/**
 * PodstronyPowiazane — lista podstron tematycznych usługi (np. voicebot do
 * windykacji, do potwierdzania wizyt) na stronie macierzystej ORAZ lista
 * siostrzanych podstron na samej podstronie.
 *
 * POWÓD ISTNIENIA (kontrola v18, MAJ-2): podstrony powstały jako SIEROTY —
 * zero linków wchodzących, więc Google traktuje je jako nieistotne, a czytelnik
 * strony macierzystej nie ma jak do nich trafić. Ta sekcja zamyka obieg:
 * rodzic -> podstrona i podstrona -> siostry (+ powrót do rodzica w hero).
 *
 * DWA WARIANTY GĘSTOŚCI (kontrola v20, MAJOR-1). Pierwsza wersja renderowała
 * wszędzie pełne karty z kapsułą (2-3 zdania). Na stronie macierzystej to jest
 * w porządku: tam ta sekcja JEST nawigacją i człowiek wybiera z niej ścieżkę.
 * Na podstronie ta sama forma kosztowała 979-1004 px na ekranie 375 px, czyli
 * więcej, niż dało całe skrócenie tekstów w tej rundzie — strona po „odchudzeniu"
 * wychodziła WYŻSZA niż przed. Dlatego:
 *   'pelny'   (domyślny, strona macierzysta) — tytuł + kapsuła + strzałka,
 *   'kompakt' (podstrona)                    — sam tytuł + strzałka w rzędzie.
 * Zero nowych klas CSS w obu wariantach: ta sama `.inf-card .inf-card-edge`
 * i `.inf-arrow` z globals, tylko mniej treści w środku.
 *
 * `pomin` wycina z listy stronę, na której właśnie jesteśmy (podstrona nie
 * linkuje sama do siebie). Dzięki temu jeden komponent obsługuje oba miejsca
 * i nie ma dwóch rendererów do utrzymania (kontrola v20, MINOR-4).
 *
 * TREŚCI: wyłącznie istniejące pola rejestru podstron (h1 jako tytuł, kapsuła
 * jako opis) — zero nowych zdań marketingowych.
 *
 * v22 (raport `raporty/pomiary-v22-linki.md` §3.2, PLAN-v22 §3): komponent
 * obsługuje teraz DWIE sekcje wychodzące strony usługi, bo jest jedynym miejscem
 * szablonu usług, które zna slug strony i renderuje linki:
 *   1. podstrony tematyczne (jak dotąd),
 *   2. POWIĄZANIA z rejestru (`Usluga.powiazane`): wdrożenia, narzędzia,
 *      poradniki, produkty, siostrzane usługi.
 * Sekcja 2 idzie przez istniejący `LinkiKrzyzowe` (te same kafle, zero nowego
 * CSS). Powód: przed v22 usługa nie linkowała do ŻADNEJ realizacji (0/13),
 * do narzędzia tylko 1/13, a hub /produkty nie miał ani jednego linku
 * redakcyjnego w całym serwisie.
 *
 * Renderuje się TYLKO gdy jest co pokazać (usługa bez podstron i bez powiązań:
 * null, czyli jej strona wygląda dokładnie jak przed zmianą).
 */
export function PodstronyPowiazane({
  slug,
  pomin,
  wariant = 'pelny',
}: {
  /** Slug usługi macierzystej (rodzica), której podstrony listujemy. */
  slug: string;
  /** Slug podstrony do pominięcia (żeby nie linkowała sama do siebie). */
  pomin?: string;
  /** Gęstość: 'pelny' na stronie usługi, 'kompakt' na podstronie. */
  wariant?: 'pelny' | 'kompakt';
}) {
  const podstrony = getPodstronyRodzica(slug).filter((p) => p.slug !== pomin);

  /* v22 (linki §3): źródłem powiązań jest TA strona, na której stoimy.
     Na podstronie komponent dostaje slug RODZICA (buduje z niego listę sióstr)
     i `pomin` = slug samej podstrony, więc podstronę odczytujemy z pary
     (rodzic, pomin) i bierzemy JEJ własne `powiazane`. Bez tego trzy podstrony
     voicebotów renderowałyby linki rodzica zamiast swoich (P1 #4 raportu). */
  const zrodlo = pomin ? getPodstrona(slug, pomin) : getUslugaBySlug(slug);
  const powiazane = zrodlo?.powiazane;

  if (podstrony.length === 0 && !powiazane) return null;

  const dekor = dekorUslugi(slug);
  const kompakt = wariant === 'kompakt';

  return (
    <>
      {podstrony.length > 0 && (
        <Section tone="subtle">
          <div className="mx-auto max-w-narrow">
            <Reveal>
              <h2 className="text-h2">Konkretne zastosowania</h2>
            </Reveal>
            <ul className={`mt-6 grid gap-4 ${kompakt ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {podstrony.map((p, i) => (
                <Reveal key={p.slug} delay={0.05 * i}>
                  <li className="h-full">
                    <Link
                      href={`/uslugi/${p.rodzic}/${p.slug}`}
                      className={`inf-card inf-card-edge block h-full ${kompakt ? 'p-4' : 'p-6'}`}
                      style={{ '--card-c': dekor.c, '--card-c-l': dekor.odcien } as CSSProperties}
                    >
                      <h3 className="text-ui font-extrabold">{p.h1}</h3>
                      {!kompakt && <p className="text-body-sm mt-2 text-fg-muted">{p.kapsula}</p>}
                      <span className={`inf-arrow ${kompakt ? 'mt-3' : 'mt-4'}`} aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* v22 (linki §3, P1 #5-#9): powiązania wychodzące strony usługi. Render
          idzie przez ISTNIEJĄCY `LinkiKrzyzowe` z poradników (te same kafle
          .inf-card, ta sama strzałka, zero nowego CSS i zero drugiego silnika
          linkowania) — zmieniamy wyłącznie nagłówek i wycinamy akapit wstępu,
          bo lead poradnika („Najpierw policz to sam") nie jest prawdą kontekstu
          strony ofertowej. */}
      {powiazane && (
        <LinkiKrzyzowe
          realizacje={powiazane.realizacje}
          narzedzia={powiazane.narzedzia}
          poradniki={powiazane.poradniki}
          produkty={powiazane.produkty}
          uslugi={powiazane.uslugi}
          tytul={tytulPowiazan(powiazane)}
          wstep={null}
        />
      )}
    </>
  );
}

/**
 * Nagłówek sekcji powiązań składany z GRUP, które realnie są na tej stronie
 * („Powiązane wdrożenia, narzędzia i poradniki"). Liczony, a nie wpisany w
 * rejestrze, bo wpisany ręcznie rozjechałby się przy pierwszej zmianie danych
 * i obiecywał botowi grupę, której na stronie nie ma.
 */
function tytulPowiazan(powiazane: NonNullable<Usluga['powiazane']>): string {
  const czlony = [
    powiazane.realizacje?.length ? 'wdrożenia' : null,
    powiazane.narzedzia?.length ? 'narzędzia' : null,
    powiazane.poradniki?.length ? 'poradniki' : null,
    powiazane.produkty?.length ? 'produkty' : null,
    powiazane.uslugi?.length ? 'usługi' : null,
  ].filter((c): c is string => c !== null);

  if (czlony.length === 0) return 'Powiązane strony';
  if (czlony.length === 1) return `Powiązane ${czlony[0]}`;
  return `Powiązane ${czlony.slice(0, -1).join(', ')} i ${czlony[czlony.length - 1]}`;
}
