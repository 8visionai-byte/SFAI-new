import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Usluga } from '@/lib/uslugi/types';

/**
 * PorownanieTabela — SEKCJA 4 szablonu (tabela faktów, obowiązkowa).
 * Tabele są nadreprezentowane w cytatach AI, więc to twarda bramka GEO.
 *
 * Renderowana jako prawdziwa, semantyczna <table> w HTML (scope na nagłówkach,
 * pierwsza kolumna = <th scope="row">), więc bot widzi strukturę bez JS.
 * Na mobile tabela scrolluje się poziomo w kontenerze z `overflow-x-auto`
 * (treść nie jest ukrywana — pełna dla czytnika i bota).
 */
export function PorownanieTabela({
  tabela,
}: {
  tabela: Usluga['tabelaPorownawcza'];
}) {
  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{tabela.h2}</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[36rem] border-collapse text-left text-body-sm">
              <caption className="sr-only">{tabela.h2}</caption>
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th scope="col" className="px-4 py-3 font-semibold text-fg-subtle">
                    <span className="sr-only">Cecha</span>
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-fg-muted">
                    {tabela.naglowekBez}
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-brand">
                    {tabela.naglowekZNami}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabela.wiersze.map((w) => (
                  <tr key={w.cecha} className="border-b border-border last:border-b-0">
                    <th
                      scope="row"
                      className="px-4 py-3 align-top font-medium text-fg"
                    >
                      {w.cecha}
                    </th>
                    <td className="px-4 py-3 align-top text-fg-muted">{w.bez}</td>
                    <td className="px-4 py-3 align-top text-fg">{w.zNami}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
