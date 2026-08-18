import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { getPodstronyRodzica } from '@/lib/uslugi/podstrony';
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
 * Renderuje się TYLKO gdy jest co pokazać (pozostałe 9 usług: null, czyli ich
 * strony wyglądają dokładnie jak przed zmianą).
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
  if (podstrony.length === 0) return null;

  const dekor = dekorUslugi(slug);
  const kompakt = wariant === 'kompakt';

  return (
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
  );
}
