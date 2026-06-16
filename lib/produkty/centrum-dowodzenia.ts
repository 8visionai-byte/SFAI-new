import type { Produkt } from './types';

/**
 * PRODUKT 4 — "Centrum dowodzenia".
 * Opis przez funkcję: dyktujesz przemyślenia/zadania głosem, agent tworzy rekord
 * i sam sortuje/przypisuje. Oszczędność (szac.). Zero zmyślania, głos Pawła, bez em-dash.
 */
export const centrumDowodzenia: Produkt = {
  slug: 'centrum-dowodzenia',
  coRobi: 'Dyktujesz głosem, co masz w głowie, a agent sam to zapisuje, sortuje i przypisuje',
  nazwaRobocza: 'Centrum dowodzenia',
  dojrzalosc: 'mvp',

  opisFunkcji:
    'Mówisz na głos, co Ci przyszło do głowy: zadanie, pomysł, notatkę. Agent tworzy z tego rekord, a potem sam decyduje, gdzie to trafia, do kogo i z jakim priorytetem. Nie musisz otwierać pięciu narzędzi i klikać w formularze. Wyrzucasz myśl głosem, a porządek robi się za Ciebie.',

  dlaKogo:
    'Dla osób zalewanych zadaniami i pomysłami, które giną w notatkach, czacie i głowie, zanim ktoś je zapisze.',

  coDaje:
    'Myśl nie ucieka, bo zapisuje się od razu, i nie musisz jej ręcznie segregować. Oszczędność: kilkanaście minut dziennie na ogarnianie zadań (szac.) i mniej rzeczy, które przepadają.',

  customNote:
    'To MVP i punkt wyjścia do customu. Pod Twój zespół spinamy to z narzędziami, których już używasz, i z Twoimi regułami przypisywania. To klocek, nie zamknięte pudełko.',

  demoHint:
    'Zrzut albo krótkie demo: nagranie głosowe zamienia się w rekord z nadanym priorytetem i przypisaniem.',
};
