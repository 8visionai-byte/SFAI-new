/**
 * TabelaRender — JEDYNY render tabeli treści w całym serwisie.
 *
 * DLACZEGO POWSTAŁ (PLAN-v22 §1.7, uwaga o duplikacji): ten sam kod tabeli
 * stał w TRZECH miejscach — `components/blog/PostBody.tsx`,
 * `components/materialy/MaterialBody.tsx` (fork PostBody) i miał dojść czwarty
 * raz w tabelach hubów. Każda poprawka dostępności musiała być wtedy zrobiona
 * trzy razy, a przy forku materiałów właśnie tak powstał rozjazd wyglądu.
 * Od v22 tabelę renderuje ten jeden komponent, a `PostBody`, `MaterialBody`
 * (przez PostBody) i `TabelaRejestru` są jego konsumentami.
 *
 * SEMANTYKA (bez zmian wobec v21 — to jest przeniesienie, nie przepisanie):
 *  - prawdziwa <table>, pierwszy wiersz to <th scope="col">,
 *  - pierwsza komórka każdego wiersza danych to <th scope="row">,
 *  - opakowanie ze scrollem jest punktem tabulacji, więc ma role="region"
 *    i nazwę (WCAG 2.1.1 + zakaz „pustego zatrzymania" czytnika),
 *  - min-width rośnie z LICZBĄ KOLUMN (INFINITY v7), nie jest sztywne.
 *
 * v22 dokłada JEDNO: widoczny <caption>. Podpis jest realnym tekstem w HTML
 * (bot go czyta, czytnik ogłasza przy wejściu w tabelę) i wtedy on, a nie
 * sklejka nagłówków kolumn, nazywa region ze scrollem.
 */

/**
 * INFINITY v7 (spec §PARTIA E pkt 1 i 3): minimalna szerokość tabeli rośnie
 * z LICZBĄ KOLUMN. Sztywne `min-w-[36rem]` dla każdej tabeli było źródłem
 * rozjazdu: przy 6 kolumnach (arkusz kosztów) na kolumnę zostawało ~96px, więc
 * nagłówki i liczby łamały się po jednym słowie i wiersze traciły wspólną
 * linię; przy 2 kolumnach ta sama wartość wymuszała zbędny scroll na mobile.
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

export type TabelaRenderProps = {
  /** Wiersz nagłówkowy (<th scope="col">). */
  naglowki: string[];
  /** Wiersze danych; pierwsza komórka każdego to <th scope="row">. */
  wiersze: string[][];
  /**
   * v22: widoczny <caption> tabeli. Gdy jest, nazywa też region ze scrollem.
   * Bez niego zachowanie 1:1 jak w v21 (nazwa sklejana z nagłówków kolumn).
   */
  podpis?: string;
};

export function TabelaRender({ naglowki, wiersze, podpis }: TabelaRenderProps) {
  // Liczba kolumn = najszerszy wiersz (nagłówek albo dane) — steruje min-w.
  const kolumny = Math.max(naglowki.length, ...wiersze.map((w) => w.length), 0);

  /* INFINITY v7 (audyt dostępności): opakowanie ze scrollem jest punktem
     tabulacji, więc MUSI mieć rolę i nazwę — inaczej czytnik ekranu ogłasza
     puste zatrzymanie. Wzorzec 1:1 z TabelaCen / ObiekcjeOdpowiedzi /
     PorownanieTabela (tabIndex + role="region" + aria-label).
     v22: gdy autor podał `podpis`, to ON nazywa region (jest konkretniejszy
     i widoczny); bez podpisu zostaje dotychczasowa sklejka nagłówków, więc
     stare tabele mają dokładnie tę samą nazwę co przed rundą. */
  const nazwaTabeli = podpis ?? naglowki.filter(Boolean).join(', ');

  return (
    /* INFINITY v6 (spec §PARTIA D zad. 2): tabela w tym samym języku co tabele
       home i usług — bez pudełka z ramką, nagłówki mono .inf-overline
       (AA: --fg-muted zamiast dekoracyjnego --fg-subtle), kreska rozdziału
       border-strong, wiersze z hoverem. Struktura semantyczna i treść komórek 1:1.
       INFINITY v7 (spec §PARTIA E): min-w liczone z liczby kolumn (wyżej),
       `align-top` na td/th (na <tr> działało tylko dzięki dziedziczeniu
       z arkusza przeglądarki), a poziomy scroll siedzi wyłącznie w opakowaniu
       i da się go przewinąć klawiaturą (WCAG 2.1.1). */
    <div
      className="overflow-x-auto"
      tabIndex={0}
      role={nazwaTabeli ? 'region' : undefined}
      aria-label={nazwaTabeli || undefined}
    >
      <table className={`w-full ${minWTabeli(kolumny)} border-collapse text-left text-body-sm`}>
        {/* v22 (PLAN-v22 §1.4, chwyt /vitalis §3.3): WIDOCZNY podpis tabeli.
            <caption> to natywne, semantyczne powiązanie nazwy z tabelą —
            zysk dla bota (zdanie mówiące, czego tabela dotyczy) i dla czytnika
            ekranu (ogłaszane przy wejściu). Zero nowych reguł CSS: mono
            .inf-overline, ten sam styl co nagłówki kolumn. */}
        {podpis && <caption className="inf-overline pb-3 text-left">{podpis}</caption>}
        <thead>
          <tr className="border-b border-border-strong">
            {naglowki.map((komorka, i) => (
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
          {wiersze.map((wiersz, ri) => (
            <tr
              key={ri}
              className="border-b border-border transition-colors duration-fast last:border-b-0 hover:bg-bg-subtle"
            >
              {wiersz.map((komorka, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row" className="py-4 pr-4 align-top font-semibold text-fg">
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
