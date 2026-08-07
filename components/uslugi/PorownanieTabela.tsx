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

        {/* INFINITY v5 (spec §4): tabela 1:1 w stylu home (Rozwiazanie) —
            katalogowa, bez pudełka z ramką: nagłówki kolumn w mono .inf-overline,
            wygraną kolumnę trzyma 1px kreska akcentowa (border-border-accent)
            i font-medium, wiersze z hoverem bg-bg-subtle. Mobile: overflow-x-auto
            na min-w-[36rem]; desktop table-fixed 18/38/44% (colgroup jak home).
            Treść komórek 1:1. */}
        {/* INFINITY v7 (spec §PARTIA E pkt 1-3): opakowanie tabeli to JEDYNE
            miejsce z poziomym scrollem (body nigdy), a scroll jest dostępny
            z klawiatury (tabIndex + role="region" z nazwą z istniejącego H2 —
            WCAG 2.1.1). `align-top` wróciło z <tr> na td/th: na <tr> działało
            tylko przez `vertical-align: inherit` z arkusza przeglądarki, więc
            komórki o różnej wysokości rozjeżdżały się przy pierwszym resecie. */}
        <Reveal delay={0.05}>
          <div
            className="mt-8 overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label={tabela.h2}
          >
            <table className="w-full min-w-[36rem] border-collapse text-left text-body-sm md:table-fixed">
              <caption className="sr-only">{tabela.h2}</caption>
              <colgroup>
                <col className="md:w-[18%]" />
                <col className="md:w-[38%]" />
                <col className="md:w-[44%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border-strong">
                  <th scope="col" className="py-3 pr-4 align-bottom">
                    <span className="sr-only">Cecha</span>
                  </th>
                  <th scope="col" className="inf-overline px-4 py-3 align-bottom">
                    {tabela.naglowekBez}
                  </th>
                  <th scope="col" className="inf-overline border-l border-border-accent px-4 py-3 align-bottom text-accent">
                    {tabela.naglowekZNami}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabela.wiersze.map((w) => (
                  <tr
                    key={w.cecha}
                    className="border-b border-border transition-colors duration-fast hover:bg-bg-subtle"
                  >
                    <th scope="row" className="py-4 pr-4 align-top font-semibold text-fg">
                      {w.cecha}
                    </th>
                    <td className="px-4 py-4 align-top text-fg-subtle">{w.bez}</td>
                    <td className="border-l border-border-accent px-4 py-4 align-top font-medium text-fg">
                      {w.zNami}
                    </td>
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
