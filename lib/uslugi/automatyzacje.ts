import type { Usluga } from './types';

/**
 * USŁUGA 1 — AUTOMATYZACJE (automatyzacja procesów AI).
 * Treść fazy 3: pełny tekst PL z 06-copy-hero-uslugi.md §"USŁUGA 1", 1:1 z FAQPage.
 * Głos Pawła, answer-first, zero em-dash, zero zmyślonych liczb i cen.
 *
 * INPUT PAWŁA (do flipu live / dowód):
 *  - ramaCeny.minPrice: realne "od X zł" za pojedynczy proces (number) → włącza offers
 *    w Service JSON-LD. Dziś brak → undefined, render bez kwoty (mechanika + diagnoza).
 *  - typowy zakres oszczędności zł/mc lub godziny/mc zdjęte u klienta — do tekstu ceny
 *    i jako dowód przy CTA, gdy będzie realny case z liczbą (np. "X h/mc zdjęte u klienta").
 *  - cta.dowod: docelowo jeden realny case z liczbą + imię + firma (za zgodą). Do tego
 *    czasu uczciwe zdanie o diagnozie zamiast atrapy liczby.
 */
export const automatyzacje: Usluga = {
  slug: 'automatyzacje',
  h1: 'Automatyzacja procesów w firmie z AI',

  kapsula:
    'Automatyzacja procesów AI to przejęcie przez system powtarzalnej roboty, którą dziś robi człowiek: przepisywania danych między mailem, arkuszem i fakturą, wysyłania potwierdzeń, pilnowania terminów. Nie sprzedajemy narzędzi. Projektujemy działający proces end-to-end i wdrażamy go w dni, nie w miesiące. Zaczynamy od jednego procesu, który boli najbardziej, a Twoje dane zostają w Unii Europejskiej.',

  metaTitle: 'Automatyzacja procesów AI dla firm',
  metaDescription:
    'Automatyzacja procesów AI: przepisywanie danych, potwierdzenia, przypomnienia przejmuje system. Wdrażamy w dni, nie w miesiące, dane zostają w UE. Zaczynasz od jednego procesu.',

  problem: {
    h2: 'Na czym naprawdę tracisz czas każdego dnia?',
    tresc:
      'Powtarzalna robota nie wygląda jak problem. Wygląda jak „tak się u nas po prostu robi”. Wieczorem przepisujesz dane z maila do systemu, z systemu do faktury. Ręcznie. Ktoś co dzień wpisuje te same rzeczy w dwa różne miejsca. Klient czeka na potwierdzenie, bo nikt nie zdążył go wysłać. To nie jest praca, która rozwija firmę. To praca, która ją tylko utrzymuje na powierzchni i zjada godziny, których nikt nie liczy.',
  },

  rozwiazanie: {
    h2: 'Co dokładnie automatyzujemy?',
    tresc:
      'Bierzemy jeden konkretny proces i układamy go tak, żeby szedł sam: dane przepływają między systemami bez przepisywania, potwierdzenia i przypomnienia wychodzą same, a Ty dostajesz tylko to, co wymaga decyzji. Łączymy Twoje narzędzia (maile, arkusze, CRM, fakturowanie, kalendarz) w jeden ciąg, który działa bez ręcznej roboty. Ty ustawiasz zasady i granice. W każdej chwili widzisz, co system zrobił, i możesz go zatrzymać.',
  },

  tabelaPorownawcza: {
    h2: 'Automatyzacja AI a ręczna obsługa procesu',
    naglowekBez: 'Ręczna robota',
    naglowekZNami: 'Automatyzacja od SimpleFast.ai',
    wiersze: [
      { cecha: 'Kto to robi', bez: 'Człowiek, co dzień od nowa', zNami: 'System, w tle, bez przerwy' },
      { cecha: 'Czas reakcji', bez: 'Gdy ktoś zdąży', zNami: 'Od razu, 24/7' },
      {
        cecha: 'Błędy przepisywania',
        bez: 'Zdarzają się przy każdym wpisie',
        zNami: 'Dane przechodzą raz, bez ręcznego kopiowania',
      },
      { cecha: 'Koszt', bez: 'Godziny pracy zespołu, co miesiąc', zNami: 'Jednorazowe wdrożenie + opieka' },
      { cecha: 'Skalowanie', bez: 'Więcej zleceń = więcej rąk', zNami: 'Więcej zleceń = ten sam proces' },
      { cecha: 'Kontrola', bez: 'W głowach ludzi', zNami: 'Widzisz każdy krok, ustawiasz granice' },
    ],
  },

  kroki: {
    h2: 'Jak wygląda wdrożenie automatyzacji krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Pokazujesz, gdzie ucieka czas. My mówimy wprost, który proces da się zautomatyzować, ile to oszczędza i czego nie opłaca się ruszać. Wychodzisz z konkretną listą.',
      },
      {
        tytul: 'Pierwszy proces',
        opis:
          'Wybieramy jeden, który boli najbardziej. Budujemy i wdrażamy w dni. Testujemy na żywo na Twoich danych, Ty ustawiasz zasady.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Proces działa, my pilnujemy, żeby działał dobrze. Patrzymy na wyniki, poprawiamy, dokładamy kolejne procesy, kiedy poczujesz, że to się spina.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje wdrożenie automatyzacji?',
    tresc:
      'Cenę liczymy od wartości, nie od godzin. Najpierw na bezpłatnej diagnozie liczymy, ile godzin i złotych miesięcznie zjada dany proces. Wdrożenie wyceniamy tak, żeby zwracało się tym, co odzyskujesz. Pojedynczy proces to inna półka niż kilka połączonych. Dokładne widełki podajemy na diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów i bez abonamentu na siłę.',
    // INPUT PAWŁA: realne "od X zł" za pojedynczy proces → ustawić minPrice (number),
    // to włączy offers w Service JSON-LD spójnie z UI. Brak danej → undefined.
  },

  faq: [
    {
      pytanie: 'Czym jest automatyzacja procesów AI?',
      odpowiedz:
        'To przejęcie przez system powtarzalnej roboty, którą dziś wykonuje człowiek: przepisywania danych, wysyłania potwierdzeń, pilnowania terminów. System robi to sam, w tle, a człowiek zajmuje się tym, co wymaga decyzji. Wdrażamy ją na jednym konkretnym procesie, a potem rozwijamy.',
    },
    {
      pytanie: 'Który proces automatyzować najpierw?',
      odpowiedz:
        'Ten, który zabiera najwięcej godzin i najmniej wymaga ludzkiej oceny. Najczęściej to przepisywanie danych między systemami, wysyłka potwierdzeń i przypomnień albo obsługa powtarzalnych zgłoszeń. Na bezpłatnej diagnozie wskazujemy konkretnie, który da największą oszczędność u Ciebie.',
    },
    {
      pytanie: 'Czy automatyzacja zwolni moich ludzi?',
      odpowiedz:
        'Nie. Automatyzacja zdejmuje z zespołu powtarzalną robotę, a nie ludzi. Zespół przestaje przepisywać dane i pilnować terminów, a zajmuje się klientem i trudniejszymi sprawami. W praktyce ma więcej czasu, nie mniej pracy do zwolnień.',
    },
    {
      pytanie: 'Z jakimi narzędziami się to łączy?',
      odpowiedz:
        'Z tymi, których już używasz: pocztą, arkuszami, CRM, systemem do faktur, kalendarzem, komunikatorami. Nie zmuszamy Cię do zmiany całego oprogramowania. Łączymy to, co masz, w jeden proces, który działa sam.',
    },
    {
      pytanie: 'Czy moje dane będą bezpieczne?',
      odpowiedz:
        'Tak. Dane zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act, który w pełni obowiązuje od 2 sierpnia 2026. Podpisujemy umowę powierzenia danych, a Ty widzisz każdy krok procesu i w każdej chwili możesz go zatrzymać.',
    },
    {
      pytanie: 'Ile trwa wdrożenie automatyzacji?',
      odpowiedz:
        'Pierwszy proces stawiamy w dni, nie w miesiące. Prostsze przepływy idą szybciej, te z wieloma integracjami trochę dłużej, bo dochodzi łączenie systemów. Dokładny termin podajemy na bezpłatnej diagnozie, kiedy znamy już zakres.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Policzymy razem, ile godzin miesięcznie zjada Twoja powtarzalna robota. Bez zobowiązań, odpowiadam w kilka minut.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby, potem decyzja.',
  },

  queries: [
    'automatyzacja procesów AI',
    'agencja automatyzacji AI',
    'wdrożenie automatyzacji',
    'automatyzacja procesów w firmie',
  ],
};
