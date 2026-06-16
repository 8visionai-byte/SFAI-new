import { Section, Badge } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

/**
 * TabelaCen — SEKCJA strony „Architekci Wartości AI" (pełny, jawny cennik).
 *
 * Zasada Pawła: jawność WSZYSTKICH cen = zaufanie. Pełny cennik „w dół" strony
 * jest dowodem uczciwości (10000 NIGDY w hero, najtańszy krok prowadzi). Kolejność
 * = od najtańszego/wejściowego do najdroższego. Stawka bazowa i ryczałty rozpisane,
 * notka o odliczeniu Sprintu od wdrożenia.
 *
 * KPI #1: prawdziwa <table> (th scope, pierwsza kolumna = th scope=row), bot widzi
 * strukturę i każdą cenę bez JS. Mobile: overflow-x-auto (treść pełna). Ceny 1:1 z
 * cennikiem realnym i z DrabinaOfert — jedno źródło prawdy liczb.
 */

type Pozycja = {
  nazwa: string;
  cena: string;
  cofazwiera: string;
  /** „Najtańszy krok", „Na próbę" itp. — semantyczny znacznik. */
  tag?: string;
};

const POZYCJE: Pozycja[] = [
  {
    nazwa: 'Mapa Oszczędności Czasu (diagnoza)',
    cena: '0 zł',
    cofazwiera:
      'Krótka rozmowa i lista procesów do automatyzacji. Bez zobowiązań.',
    tag: 'Start za darmo',
  },
  {
    nazwa: 'Sprint Diagnostyczny',
    cena: '1490 zł',
    cofazwiera:
      'Action Plan: co automatyzować, w jakiej kolejności i czym. Cała kwota odliczana od wdrożenia, gdy wejdzie współpraca.',
    tag: 'Odliczane od wdrożenia',
  },
  {
    nazwa: 'AI Start',
    cena: '1990 zł',
    cofazwiera:
      'Pierwsza automatyzacja na próbę. Jeden proces zdjęty z ludzi, żebyś zobaczył efekt przed większą decyzją.',
    tag: 'Jeden proces na próbę',
  },
  {
    nazwa: 'Stawka bazowa',
    cena: '350 zł / h',
    cofazwiera:
      'Praca poza ryczałtem (pojedyncze zlecenia, rozbudowy). W ryczałcie godzina jest tańsza.',
  },
  {
    nazwa: 'Opieka AI 10h',
    cena: '3000 zł / mc',
    cofazwiera: '300 zł/h. Pula godzin na budowę i utrzymanie automatyzacji.',
  },
  {
    nazwa: 'Opieka AI 20h',
    cena: '5500 zł / mc',
    cofazwiera: '275 zł/h. Dla firm, które rozwijają kilka procesów naraz.',
  },
  {
    nazwa: 'Opieka AI 40h',
    cena: '10000 zł / mc',
    cofazwiera: '250 zł/h. Najniższa stawka godzinowa, stałe tempo wdrożeń.',
  },
  {
    nazwa: 'Architekci Wartości AI',
    cena: 'od 10000 zł / mc',
    cofazwiera:
      'Pełny zewnętrzny dział rozliczany za wartość: strategia, budowa, wdrożenia i utrzymanie pod jednym dachem.',
    tag: 'Poziom docelowy',
  },
];

export function TabelaCen() {
  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Ile to kosztuje? Cały cennik, bez gwiazdek.</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Pokazujemy wszystkie ceny od razu, od darmowej diagnozy po pełny dział.
            Nie ukrywamy najwyższej kwoty i nie zaczynamy od niej. Zaczynasz tam,
            gdzie Ci wygodnie, i idziesz dalej tylko, jeśli pierwszy krok się opłacił.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[36rem] border-collapse text-left text-body-sm">
              <caption className="sr-only">
                Pełny cennik usług, od najtańszej do najdroższej
              </caption>
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th scope="col" className="px-4 py-3 font-semibold text-fg-muted">
                    Krok
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-brand">
                    Cena
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-fg-muted">
                    Co zawiera
                  </th>
                </tr>
              </thead>
              <tbody>
                {POZYCJE.map((p) => (
                  <tr
                    key={p.nazwa}
                    className="border-b border-border last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 align-top font-medium text-fg"
                    >
                      <span className="block">{p.nazwa}</span>
                      {p.tag ? (
                        <Badge variant="neutral" className="mt-2">
                          {p.tag}
                        </Badge>
                      ) : null}
                    </th>
                    <td className="whitespace-nowrap px-4 py-3 align-top font-semibold tabular-nums text-fg">
                      {p.cena}
                    </td>
                    <td className="px-4 py-3 align-top text-fg-muted">
                      {p.cofazwiera}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-caption text-fg-subtle">
            Sprint Diagnostyczny (1490 zł) odliczamy w całości od pierwszego
            wdrożenia, gdy zdecydujesz się na współpracę. W praktyce diagnoza, na
            której budujemy, nic Cię wtedy nie kosztuje. Ceny netto.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
