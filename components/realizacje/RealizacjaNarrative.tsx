import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Realizacja } from '@/lib/realizacje/types';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * RealizacjaNarrative — uniwersalny blok tekstowy z nagłówkiem-pytaniem (H2) i
 * akapitem. Używany dla SEKCJI 2 (Kontekst/problem) i 3 (Co wdrożyliśmy) case'a.
 * H2 sformułowany jak pytanie (answer-first, GEO).
 *
 * `tone` przeplata tło sekcji (rytm strony). Treść w HTML od razu.
 *
 * v22 (PLAN-v22 §2.4 pkt 2-3; skarga Pawła: „musimy te ramki zrobić [też na
 * podstronach]"): OBA AKAPITY WCHODZĄ W RAMKĘ. Dotąd rdzeń case'a — problem
 * klienta i opis rozwiązania — leciał jako goły `<p>` na tle sekcji, podczas gdy
 * ta sama treść na home i na stronach usług stoi w kartach z kolorem, kątownikami
 * i reflektorem. Pomiar §5.2 planu: realizacje miały 4 karty w `<main>`, wszystkie
 * poza treścią (kafle metryk, FAQ, CTA).
 *
 * SEMANTYKA BEZ ZMIAN, i to jest warunek wejścia tej zmiany: `<h2>` zostaje
 * `<h2>`, `<p>` zostaje `<p>`, w tej samej kolejności i w tym samym miejscu
 * drzewa. Zmienia się wyłącznie `<div>` wokół, więc licznik znaków, nagłówków
 * i akapitów u bota nie drgnie (kryterium §5.1).
 *
 * TON: `kategoria` maluje `--card-c` tym samym kolorem, co karta tego case'a na
 * hubie /realizacje, kafle metryk i kafelek hero (v7 „naczynia połączone").
 * Bez `kategoria` karta spada na akcent marki, a bez `wariant` render jest
 * dokładnie taki jak przed v22 (goły akapit) — dzięki temu żaden istniejący
 * konsument nie zmienia się przypadkiem.
 */
export function RealizacjaNarrative({
  h2,
  tresc,
  tone = 'base',
  id,
  wariant,
  kategoria,
}: {
  h2: string;
  tresc: string;
  tone?: 'base' | 'subtle';
  id?: string;
  /**
   * Ramka wokół akapitu. `undefined` = stan sprzed v22 (bez karty).
   *  - 'top'  : górna linia w kolorze (wariant v13), dla sekcji „z czym przyszedł klient",
   *  - 'edge' : lewa krawędź w kolorze, dla sekcji „co zbudowaliśmy".
   * Dwa różne warianty dają stronie rytm, zamiast dwóch identycznych pudełek.
   */
  wariant?: 'top' | 'edge';
  /** Kategoria case'a = ton karty (ten sam klucz, co RealizacjaCard i RealizacjaEfekt). */
  kategoria?: Realizacja['kategoria'];
}) {
  const dekor = kategoria
    ? (INF_KATEGORIA[kategoria] ?? INF_KATEGORIA_DEFAULT)
    : undefined;

  const akapit = <p className="text-lead text-fg-muted">{tresc}</p>;

  return (
    <Section tone={tone} id={id}>
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{h2}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          {wariant ? (
            <div
              className={`inf-card ${wariant === 'edge' ? 'inf-card-edge' : 'inf-card-top'} mt-5 p-6 md:p-7`}
              style={
                dekor
                  ? ({
                      '--card-c': dekor.c,
                      '--card-c-l': dekor.odcien ?? dekor.c,
                    } as CSSProperties)
                  : undefined
              }
            >
              <div aria-hidden="true" className="inf-spotlight" />
              {akapit}
            </div>
          ) : (
            <p className="text-lead mt-5 text-fg-muted">{tresc}</p>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
