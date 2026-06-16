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
                  <th key={i} scope="col" className="px-4 py-3 font-semibold text-fg-subtle">
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
                      <th key={ci} scope="row" className="px-4 py-3 align-top font-medium text-fg">
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
