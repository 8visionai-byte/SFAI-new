import type { Produkt } from './types';

/**
 * PRODUKT — głosowy agent z wiedzą o całej firmie (audyt
 * `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §8, pozycja „Drugi mózg",
 * etap 3 pkt 12).
 *
 * INSTRUKCJA REDAKCYJNA PAWŁA (audyt §8): bezosobowo, „mamy w portfolio
 * zbudowane takie narzędzie", z problemem i ceną.
 *
 * CZEGO NIE MIESZAĆ:
 *  - to NIE jest voicebot z /uslugi/voiceboty (tamten odbiera telefon od
 *    klientów, ten rozmawia z Tobą i buduje bazę wiedzy firmy),
 *  - to NIE jest „Centrum dowodzenia" z tego samego rejestru (tamto zamienia
 *    dyktowaną myśl w rekord i go przypisuje),
 *  - to NIE jest prywatny asystent prezesa z /uslugi/asystent-prezesa (tamten
 *    ma własny interfejs, uczy się JEDNEJ osoby i ma cenę 4999 zł netto).
 *
 * BRAK DANEJ (zgłoszone Pawłowi): cena i dojrzałość — jak przy pozostałych
 * narzędziach portfolio, audyt §8 ich nie zawiera. Zero kwot z głowy.
 */
export const drugiMozgGlosowy: Produkt = {
  slug: 'drugi-mozg-glosowy',
  coRobi: 'Rozmawiasz głosem z agentem, który zna całą firmę, a każda rozmowa powiększa jego wiedzę',
  /* 2026-08-20: Paweł podał właściwą nazwę usługi: SF AI Team („team Twojej firmy"). */
  nazwaRobocza: 'SF AI Team',
  dojrzalosc: 'mvp',

  opisFunkcji:
    'Mamy w portfolio zbudowanego spersonalizowanego agenta głosowego z wiedzą o całej firmie. Zamiast pisać do przypadkowego czatu, który nic o Tobie nie wie, rozmawiasz głosem. Każda rozmowa jest analizowana i powiększa bazę wiedzy, więc następnym razem agent wie więcej. Można w nim złożyć wirtualny zespół, na przykład od marketingu, researchu i copywritingu: agenci komunikują się ze sobą niezależnie, doradzają w różnych kwestiach i pomagają wyznaczać kierunek rozwoju, a nowych agentów tworzysz dowolnie.',

  dlaKogo:
    'Dla właścicieli i menedżerów, którzy myślą szybciej, niż piszą, i mają dość tłumaczenia kontekstu firmy od nowa przy każdej rozmowie z AI.',

  coDaje:
    'Wiedza o firmie zostaje w jednym miejscu i rośnie sama, zamiast rozpływać się po czatach i notatkach. Oszczędność: kilkadziesiąt minut dziennie na samym odtwarzaniu kontekstu (szac.).',

  customNote:
    'To punkt wyjścia do customu. Bazę wiedzy budujemy na Twoich materiałach, a skład wirtualnego zespołu dobieramy do tego, czym się zajmujesz. Cena na zapytanie: zakres i wycenę ustalamy na bezpłatnej diagnozie.',

  demoHint:
    'Zrzut albo krótkie demo: rozmowa głosowa i to, co po niej dopisało się do bazy wiedzy.',
};
