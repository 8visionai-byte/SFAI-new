import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

/**
 * ObiekcjeOdpowiedzi — SEKCJA strony „Architekci Wartości AI" (obiekcje -> odpowiedzi).
 *
 * Prawdziwa, semantyczna <table>: kolumna „Co myślisz" (obiekcja) i „Jak jest"
 * (odpowiedź). Tabele są nadreprezentowane w cytatach AI — to twarda bramka GEO
 * i jednocześnie najszybszy sposób zbicia oporu zakupowego.
 *
 * KPI #1: tabela renderowana serwerowo (th scope, pierwsza kolumna = th scope=row),
 * bot widzi strukturę bez JS. Mobile: poziomy scroll w overflow-x-auto (treść pełna,
 * nic nie ukryte). Odpowiedzi w głosie Pawła: krótkie zdania, konkret, zero żargonu.
 */

type Wiersz = { obiekcja: string; odpowiedz: string };

const WIERSZE: Wiersz[] = [
  {
    obiekcja: 'To drogie.',
    odpowiedz:
      'Zaczynasz od darmowej diagnozy. Pierwszy płatny krok to 1490 zł, który odliczamy od wdrożenia. Liczysz koszt po stronie godzin, które odzyskujesz, a nie po cenniku.',
  },
  {
    obiekcja: 'To dla dużych firm.',
    odpowiedz:
      'Odwrotnie. Mniejsza firma traci procentowo więcej, bo te same osoby robią wszystko. Pierwszą niszę robimy dla biur rachunkowych, czyli klasycznych MŚP.',
  },
  {
    obiekcja: 'Nie mam na to czasu.',
    odpowiedz:
      'Diagnoza to jedna krótka rozmowa. Resztę robimy my. Cały sens jest taki, żebyś miał WIĘCEJ czasu, nie mniej.',
  },
  {
    obiekcja: 'Nie wiem, co automatyzować.',
    odpowiedz:
      'I nie musisz. To zadanie diagnozy. Pokazujemy, gdzie uciekają godziny, i proponujemy, od czego zacząć. Wychodzisz z gotową listą.',
  },
  {
    obiekcja: 'A jak nie zadziała?',
    odpowiedz:
      'Dlatego zaczynamy od jednego procesu na próbę (AI Start, 1990 zł), a nie od wielkiego wdrożenia. Najpierw widzisz efekt, potem decydujesz o reszcie.',
  },
  {
    obiekcja: 'To pewnie zwykły chatbot.',
    odpowiedz:
      'Budujemy AI Agentów, nie chatboty. Agent wykonuje pracę: czyta maila, wystawia ofertę, robi raport. Nie tylko odpowiada na pytania.',
  },
];

export function ObiekcjeOdpowiedzi() {
  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Co Cię powstrzymuje przed pierwszym krokiem?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Najczęstsze obawy, które słyszę, i to, jak jest naprawdę. Bez owijania.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[36rem] border-collapse text-left text-body-sm">
              <caption className="sr-only">
                Najczęstsze obiekcje i odpowiedzi
              </caption>
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th scope="col" className="px-4 py-3 font-semibold text-fg-muted">
                    Co myślisz
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-brand">
                    Jak jest naprawdę
                  </th>
                </tr>
              </thead>
              <tbody>
                {WIERSZE.map((w) => (
                  <tr
                    key={w.obiekcja}
                    className="border-b border-border last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="w-[14rem] px-4 py-3 align-top font-medium text-fg"
                    >
                      „{w.obiekcja}”
                    </th>
                    <td className="px-4 py-3 align-top text-fg-muted">
                      {w.odpowiedz}
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
