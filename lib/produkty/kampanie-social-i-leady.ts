import type { Produkt } from './types';

/**
 * PRODUKT — jedno miejsce na social media, materiały, kampanie i leady
 * (audyt `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §8, pozycja
 * „SFAI Campaigns", etap 3 pkt 12).
 *
 * INSTRUKCJA REDAKCYJNA PAWŁA (audyt §8, obowiązkowa): NIE pisać
 * „zbudowaliśmy dla siebie". Pisać bezosobowo: „mamy w portfolio zbudowane
 * takie narzędzie". Przy każdym podać, jaki problem rozwiązuje i ile kosztuje.
 *
 * BRAK DANEJ (zgłoszone Pawłowi, NIE zmyślać):
 *  - CENA. Audyt §8 każe ją podać, ale sam jej nie zawiera dla żadnego z pięciu
 *    narzędzi portfolio. Do czasu podania kwoty `customNote` mówi prawdę:
 *    zakres i wycena po bezpłatnej diagnozie. Żadnej kwoty z głowy.
 *  - DOJRZAŁOŚĆ. Audyt nie mówi, czy to MVP, czy wersja dojrzała. Biorę
 *    ostrożniejsze 'mvp', żeby nie obiecać więcej, niż mam potwierdzone.
 */
export const kampanieSocialILeady: Produkt = {
  slug: 'kampanie-social-i-leady',
  coRobi: 'Wrzucasz jeden film, a system publikuje go na wszystkich kanałach i prowadzi z tego kampanię',
  nazwaRobocza: 'Campaigns',
  dojrzalosc: 'mvp',

  opisFunkcji:
    'Mamy w portfolio zbudowane narzędzie, które zbiera social media, materiały, kampanie i leady w jednym miejscu. Wrzucasz film raz, a publikuje się na wszystkich podpiętych kanałach. Materiały powstają z prostego polecenia, zamiast z ręcznego składania. Z tego samego miejsca tworzysz i wysyłasz kampanię do leadów, a leady zbierasz z Google bez przechodzenia do osobnego narzędzia.',

  dlaKogo:
    'Dla firm, które prowadzą kilka kanałów naraz i tracą czas na wrzucanie tego samego materiału po kolei w każdym z osobna.',

  coDaje:
    'Jedna publikacja zamiast kilku, materiały z polecenia zamiast składania od zera i kampania wysłana tam, gdzie leady już są. Oszczędność: kilka godzin tygodniowo na samej obsłudze kanałów (szac.).',

  customNote:
    'To punkt wyjścia do customu, nie pudełkowy produkt. Podpinamy Twoje kanały, Twój ton i Twoje reguły publikacji. Cena na zapytanie: zakres i wycenę ustalamy na bezpłatnej diagnozie, bo różnica między dwoma a ośmioma kanałami to różnica w robocie.',

  demoHint:
    'Zrzut albo krótkie demo: jedno wrzucenie filmu i lista kanałów, na których pojawił się automatycznie.',
};
