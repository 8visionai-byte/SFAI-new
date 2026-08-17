import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { getPodstronyRodzica } from '@/lib/uslugi/podstrony';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * PodstronyPowiazane — lista podstron tematycznych usługi (np. voicebot do
 * windykacji, do potwierdzania wizyt) na stronie macierzystej.
 *
 * POWÓD (kontrola v18, znalezisko MAJ-2): podstrony powstały jako SIEROTY —
 * zero linków wchodzących, więc Google traktuje je jako nieistotne, a czytelnik
 * strony macierzystej nie ma jak do nich trafić. Ta sekcja zamyka obieg:
 * rodzic -> podstrona (tu) i podstrona -> rodzic (link powrotny w hero).
 *
 * WYGLĄD 1:1 Z SYSTEMEM (żelazne Pawła: „merytoryka nie może rozwalić
 * wyglądu"): karta to ta sama `.inf-card` co wszędzie, wariant `-edge`
 * (lewy pasek, góra czysta — czysty wariant v13, zero łączeń), ton karty =
 * kolor kategorii usługi macierzystej przez `--card-c` (naczynia połączone).
 * Zero nowych klas i zero nowych reguł CSS.
 *
 * TREŚCI: wyłącznie istniejące pola rejestru podstron (h1 jako tytuł,
 * kapsuła jako opis) — zero nowych zdań marketingowych.
 *
 * Renderuje się TYLKO gdy usługa ma podstrony (pozostałe 9 usług: null,
 * czyli ich strony wyglądają dokładnie jak przed zmianą).
 */
export function PodstronyPowiazane({ slug }: { slug: string }) {
  const podstrony = getPodstronyRodzica(slug);
  if (podstrony.length === 0) return null;

  const dekor = INF_KATEGORIA[slug] ?? INF_KATEGORIA_DEFAULT;

  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Konkretne zastosowania</h2>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {podstrony.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 * i}>
              <li className="h-full">
                <Link
                  href={`/uslugi/${p.rodzic}/${p.slug}`}
                  className="inf-card inf-card-edge block h-full p-6"
                  style={{ '--card-c': dekor.c, '--card-c-l': dekor.odcien } as CSSProperties}
                >
                  <h3 className="text-ui font-extrabold">{p.h1}</h3>
                  <p className="text-body-sm mt-2 text-fg-muted">{p.kapsula}</p>
                  <span className="inf-arrow mt-4" aria-hidden="true">
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
