import type { Produkt } from './types';

/**
 * PRODUKT 1 — Aplikacja coachingowa z agentami (rob. PapiCoach, MVP).
 * Opis przez funkcję: logujesz posiłki/cele, agent układa plan dnia, rozmawiasz
 * z agentami o trudnych tematach. Dojrzałość: MVP. Oszczędność oznaczona (szac.).
 * Zero zmyślania, głos Pawła, bez em-dash.
 */
export const appCoachingowa: Produkt = {
  slug: 'app-coachingowa-z-agentami',
  coRobi: 'Aplikacja, w której agent układa Ci plan dnia i rozmawia o tym, co trudne',
  nazwaRobocza: 'PapiCoach',
  dojrzalosc: 'mvp',

  opisFunkcji:
    'Zbudowaliśmy apkę, w której logujesz posiłki i cele, a agent na tej podstawie układa plan dnia. Możesz też po prostu z nim porozmawiać o tym, co trudne, kiedy brakuje Ci motywacji albo nie wiesz, od czego zacząć. To nie jest sztywny tracker z tabelkami. To agent, który zna Twój kontekst i podpowiada następny mały krok.',

  dlaKogo:
    'Dla osób, które próbują zmienić nawyk i odbijają się od aplikacji-tabelek, bo same liczby nie pomagają ruszyć.',

  coDaje:
    'Zamiast samodzielnie planować każdy dzień i szukać motywacji, dostajesz gotowy plan i rozmowę na żądanie. Oszczędność: kilkanaście minut planowania dziennie (szac.) i mniejsza szansa, że odpuścisz po tygodniu.',

  customNote:
    'To MVP i punkt wyjścia do customu, nie pudełkowy produkt. Ten sam silnik (agent plus Twój kontekst plus rozmowa) składamy pod inny temat: zdrowie, finanse, nauka, onboarding pracownika.',

  demoHint:
    'Zrzut ekranu z logowaniem posiłku i wygenerowanym planem dnia oraz fragment rozmowy z agentem.',
};
