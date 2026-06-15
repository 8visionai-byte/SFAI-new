import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Blok } from '@/lib/blog/types';

/**
 * PostBody — render treści artykułu z tablicy bloków (`Post['tresc']`).
 * To SILNIK treści: faza 4 składa wpis z bloków, a ten komponent zamienia każdy
 * blok na semantyczny HTML renderowany SERWEROWO (w HTML od razu = cytowalny przez LLM).
 *
 * Mapowanie bloków:
 *  - 'naglowek' -> <h2> (nagłówek sekcji; w treści formułujemy go JAK PYTANIE = GEO),
 *  - 'akapit'   -> <p>,
 *  - 'lista'    -> <ul><li> (bez zmyślania liczby pozycji),
 *  - 'tabela'   -> prawdziwa, semantyczna <table> (scope), scroll poziomy na mobile,
 *  - 'cytat'    -> <blockquote> z opcjonalnym <cite>.
 *
 * `noUncheckedIndexedAccess` jest włączony, więc dostęp do komórek tabeli jest
 * bezpieczny (pierwszy wiersz traktujemy jako nagłówkowy, reszta jako dane).
 */
export function PostBody({ tresc }: { tresc: Blok[] }) {
  if (tresc.length === 0) return null;

  return (
    <Section tone="base">
      <div className="mx-auto flex max-w-narrow flex-col gap-6">
        {tresc.map((blok, i) => (
          <Reveal key={i} delay={Math.min(i * 0.03, 0.15)}>
            <BlokRender blok={blok} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
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
      return (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[36rem] border-collapse text-left text-body-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                {(naglowekWiersz ?? []).map((komorka, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-4 py-3 font-semibold text-fg-subtle"
                  >
                    {komorka}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wierszeDanych.map((wiersz, ri) => (
                <tr key={ri} className="border-b border-border last:border-b-0">
                  {wiersz.map((komorka, ci) =>
                    ci === 0 ? (
                      <th
                        key={ci}
                        scope="row"
                        className="px-4 py-3 align-top font-medium text-fg"
                      >
                        {komorka}
                      </th>
                    ) : (
                      <td key={ci} className="px-4 py-3 align-top text-fg-muted">
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
