import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Blok } from '@/lib/materialy/types';

/**
 * MaterialBody — render PEŁNEJ treści lead magnetu z tablicy bloków (`Material['tresc']`).
 * Wzorzec 1:1 z components/blog/PostBody: każdy blok -> semantyczny HTML renderowany
 * SERWEROWO (w HTML od razu = cytowalny przez LLM, użyteczny bez JS i bez PDF).
 *
 * Mapowanie bloków (typ `Blok` współdzielony z lib/blog/types):
 *  - 'naglowek' -> <h2> (nagłówek sekcji, w treści jak pytanie/problem = GEO),
 *  - 'akapit'   -> <p>,
 *  - 'lista'    -> <ul><li> (tu: gotowe prompty, zasady, checklisty),
 *  - 'tabela'   -> prawdziwa <table> (scope), scroll poziomy na mobile (np. przed/po),
 *  - 'cytat'    -> <blockquote> z opcjonalnym <cite>.
 */
export function MaterialBody({ tresc }: { tresc: Blok[] }) {
  if (tresc.length === 0) return null;

  return (
    <Section tone="base">
      <div className="mx-auto flex max-w-narrow flex-col gap-6">
        {tresc.map((blok, i) => (
          <Reveal key={i} delay={Math.min(i * 0.02, 0.12)}>
            <BlokRender blok={blok} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/**
 * INFINITY v7 (spec §PARTIA E pkt 1 i 3): minimalna szerokość tabeli rośnie
 * z LICZBĄ KOLUMN (wzorzec 1:1 z components/blog/PostBody). W materiałach to
 * najbardziej bolało: arkusz kosztów ma 6 kolumn, a sztywne `min-w-[36rem]`
 * zostawiało ~96px na kolumnę, więc nagłówki i liczby łamały się po jednym
 * słowie. Przy 2 kolumnach (przed/po) ta sama wartość wymuszała zbędny scroll.
 * Klasy MUSZĄ być literałami — Tailwind skanuje pliki, nie liczy w locie.
 */
const MIN_W_TABELI: Record<number, string> = {
  2: 'min-w-[28rem]',
  3: 'min-w-[36rem]',
  4: 'min-w-[46rem]',
  5: 'min-w-[54rem]',
};
/** 6 kolumn i więcej — jeden wspólny sufit (scroll w opakowaniu, nie w body). */
const MIN_W_TABELI_SZEROKA = 'min-w-[62rem]';

function minWTabeli(kolumny: number): string {
  // 0-1 kolumn (dane awaryjne) — żadnego wymuszonego scrolla.
  if (kolumny <= 1) return 'min-w-0';
  return MIN_W_TABELI[kolumny] ?? MIN_W_TABELI_SZEROKA;
}

function BlokRender({ blok }: { blok: Blok }) {
  switch (blok.typ) {
    case 'naglowek':
      return <h2 className="text-h2 mt-4">{blok.tekst}</h2>;

    case 'akapit':
      return <p className="text-body text-fg-muted">{blok.tekst}</p>;

    case 'lista':
      return (
        <ul className="ml-5 list-disc space-y-2 text-body text-fg-muted marker:text-accent">
          {blok.punkty.map((punkt, i) => (
            <li key={i}>{punkt}</li>
          ))}
        </ul>
      );

    case 'tabela': {
      const [naglowekWiersz, ...wierszeDanych] = [blok.naglowki, ...blok.wiersze];
      // Liczba kolumn = najszerszy wiersz (nagłówek albo dane) — steruje min-w.
      const kolumny = Math.max(
        naglowekWiersz?.length ?? 0,
        ...wierszeDanych.map((w) => w.length)
      );
      /* INFINITY v7 (audyt dostępności): opakowanie ze scrollem jest punktem
         tabulacji, więc MUSI mieć rolę i nazwę — inaczej czytnik ekranu ogłasza
         puste zatrzymanie. Wzorzec 1:1 z TabelaCen / ObiekcjeOdpowiedzi /
         PorownanieTabela (tabIndex + role="region" + aria-label). Nazwa
         POCHODZI z wiersza nagłówkowego TEJ tabeli (materiał może mieć ich
         kilka), więc rozróżnia tabele i nie wnosi nowej treści. */
      const nazwaTabeli = (naglowekWiersz ?? []).filter(Boolean).join(', ');
      return (
        /* INFINITY v6 (spec §PARTIA D zad. 2): tabela materiału w tym samym
           języku co tabele home i usług — bez pudełka z ramką, nagłówki mono
           .inf-overline (AA: --fg-muted zamiast dekoracyjnego --fg-subtle),
           kreska rozdziału border-strong, wiersze z hoverem. Struktura
           semantyczna i treść komórek 1:1 (wzorzec: components/blog/PostBody).
           INFINITY v7 (spec §PARTIA E): min-w liczone z liczby kolumn (wyżej),
           `align-top` z powrotem na td/th (na <tr> działało tylko dzięki
           dziedziczeniu z arkusza przeglądarki), a poziomy scroll siedzi
           wyłącznie w opakowaniu i da się go przewinąć klawiaturą (WCAG 2.1.1). */
        <div
          className="overflow-x-auto"
          tabIndex={0}
          role={nazwaTabeli ? 'region' : undefined}
          aria-label={nazwaTabeli || undefined}
        >
          <table
            className={`w-full ${minWTabeli(kolumny)} border-collapse text-left text-body-sm`}
          >
            <thead>
              <tr className="border-b border-border-strong">
                {(naglowekWiersz ?? []).map((komorka, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={
                      i === 0
                        ? 'inf-overline py-3 pr-4 align-bottom'
                        : 'inf-overline px-4 py-3 align-bottom'
                    }
                  >
                    {komorka}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wierszeDanych.map((wiersz, ri) => (
                <tr
                  key={ri}
                  className="border-b border-border transition-colors duration-fast last:border-b-0 hover:bg-bg-subtle"
                >
                  {wiersz.map((komorka, ci) =>
                    ci === 0 ? (
                      <th
                        key={ci}
                        scope="row"
                        className="py-4 pr-4 align-top font-semibold text-fg"
                      >
                        {komorka}
                      </th>
                    ) : (
                      <td key={ci} className="px-4 py-4 align-top text-fg-muted">
                        {komorka}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case 'cytat':
      return (
        <blockquote className="border-l-2 border-border-accent pl-5 text-lead text-fg">
          <p>{blok.tekst}</p>
          {blok.zrodlo && (
            <cite className="text-caption not-italic text-fg-subtle">{blok.zrodlo}</cite>
          )}
        </blockquote>
      );

    default: {
      // Wyczerpujący switch — gdy dojdzie nowy wariant Blok, TS zgłosi błąd tutaj.
      const _exhaustive: never = blok;
      return _exhaustive;
    }
  }
}
