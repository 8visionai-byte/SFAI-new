import type { Realizacja } from './types';

/**
 * CASE 11 — Z NIEWIDOCZNEJ STRONY DO PIERWSZEJ TRÓJKI W GOOGLE (Trockenhaus).
 * Kategoria: optymalizacja → link wewnętrzny do /uslugi/optymalizacja.
 *
 * ŹRÓDŁO DANYCH: `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md`
 *   §6.1 (dowody GEO), §6.4 (narzędzie do kosztorysowania), §7 (tabela
 *   11 nazwanych klientów, zgody są, klient DE).
 *   Fakty użyte tutaj i NIGDZIE poza nimi:
 *     - z NIEWIDOCZNEJ w Google do PIERWSZEJ TRÓJKI na frazę „Trockenhaus" (§6.1),
 *     - branża: osuszanie piwnic i remonty, firma jednoosobowa (§6.4),
 *     - oferta: 2-4 godziny ze sprawdzaniem cen → 20 minut (§6.4),
 *     - rachunek: 1 godzina → około 5 minut (§6.4),
 *     - skala: 1-8 ofert i 1-5 rachunków miesięcznie, narzędzie skalowalne (§6.4),
 *     - cenniki wgrane do narzędzia, które samo sprawdza aktualne ceny
 *       w hurtowniach (§6.4),
 *     - zakres wdrożenia: narzędzie do kosztorysowania + strona WWW + chatbot (§7).
 *
 * CZEGO AUDYT NIE DAJE (i czego dlatego NIE MA w treści): czasu dojścia do
 * pierwszej trójki, liczby zapytań ze strony, danych o chatbocie tego klienta.
 * Wzorzec uczciwości z §6.6: brak liczby zapisujemy wprost, zamiast dorabiać.
 * Zero em-dash, zero zmyślonych liczb, głos Pawła, answer-first.
 */
export const zNiewidocznejStronyDoTop3Google: Realizacja = {
  slug: 'z-niewidocznej-strony-do-top3-google',
  h1: 'Z niewidocznej strony do pierwszej trójki w Google',
  kategoria: 'optymalizacja',
  klient: 'Trockenhaus',
  branza: 'Osuszanie i remonty',

  kapsula:
    'Trockenhaus to jednoosobowa firma z rynku niemieckiego, osuszanie piwnic i remonty. Jej strona była w Google niewidoczna. Dziś jest w pierwszej trójce na frazę Trockenhaus. Do tego zbudowaliśmy narzędzie do kosztorysowania: oferta powstaje w 20 minut zamiast 2 do 4 godzin, a rachunek w około 5 minut zamiast godziny.',

  metaTitle: 'Z niewidocznej strony do pierwszej trójki w Google',
  metaDescription:
    'Z niewidocznej w Google do pierwszej trójki na frazę Trockenhaus. Do tego narzędzie do kosztorysowania: oferta w 20 minut zamiast 2 do 4 godzin.',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Trockenhaus to jednoosobowa firma z Niemiec, zajmuje się osuszaniem piwnic i remontami. Bolały dwie rzeczy naraz. W Google strona była niewidoczna, więc klient, który szukał tej firmy albo takiej usługi, po prostu jej nie znajdował. A każda oferta i każdy rachunek powstawały ręcznie: najpierw sprawdzenie aktualnych cen materiałów w hurtowniach, potem liczenie, potem spisywanie. W firmie jednoosobowej ten czas nie ma skąd się wziąć, bo ta sama osoba jeździ do klientów.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Zrobiliśmy dwie rzeczy. Po pierwsze stronę, ułożoną pod widoczność w Google i pod czytanie przez silniki AI. Po drugie narzędzie do kosztorysowania: cenniki są wgrane do środka, a narzędzie samo łączy się z internetem i sprawdza aktualne ceny w hurtowniach, więc wycena nie stoi na cenach sprzed pół roku. Dla tego samego klienta powstał też chatbot. Narzędzie jest skalowalne, więc większy wolumen nie stanowi problemu.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: 'Top 3',
        etykieta:
          'pierwsza trójka w Google na frazę Trockenhaus, ze stanu bez widoczności',
      },
      {
        wartosc: '20 minut',
        etykieta:
          'przygotowanie oferty zamiast 2 do 4 godzin ze sprawdzaniem cen',
      },
      {
        wartosc: '5 minut',
        etykieta: 'około tyle zajmuje wystawienie rachunku zamiast godziny',
      },
    ],
    opis:
      'Strona przeszła z niewidocznej w Google do pierwszej trójki na frazę Trockenhaus. Narzędzie zdjęło z właściciela najbardziej żmudną część roboty papierowej. To mała firma: od 1 do 8 ofert i od 1 do 5 rachunków miesięcznie. Mówimy to wprost, bo pokazuje, że narzędzia szyte na miarę budujemy też dla jednoosobowych działalności, nie tylko dla dużych zespołów. Ile tygodni zajęło samo wejście do pierwszej trójki, nie podajemy, bo tego nie mamy zmierzonego co do daty.',
  },

  faq: [
    {
      pytanie: 'Czy takie narzędzie ma sens przy kilku ofertach miesięcznie?',
      odpowiedz:
        'Tak, i ten case to pokazuje. Trockenhaus wystawia od 1 do 8 ofert i od 1 do 5 rachunków miesięcznie. Przy takiej skali liczy się nie liczba dokumentów, tylko to, że jedna oferta przestaje zjadać pół dnia. Narzędzie jest skalowalne, więc rośnie razem z firmą.',
    },
    {
      pytanie: 'Skąd narzędzie zna aktualne ceny materiałów?',
      odpowiedz:
        'Cenniki są wgrane do narzędzia, a ono samo łączy się z internetem i sprawdza aktualne ceny w hurtowniach. Dzięki temu wycena nie stoi na cenach sprzed pół roku, a właściciel nie musi ich sprawdzać ręcznie przed każdą ofertą.',
    },
  ],

  queries: [
    'z niewidocznej strony do pierwszej trójki w Google',
    'narzędzie do kosztorysowania dla małej firmy',
    'kosztorys w 20 minut',
    'pozycjonowanie strony firmy jednoosobowej',
  ],

  /**
   * POWIĄZANIA CASE'A. Usługę wyznacza `kategoria` (optymalizacja) i renderuje
   * ją `PowiazanaUsluga`. Tu linkujemy dwa siostrzane dowody GEO (audyt §6.1)
   * i narzędzie do sprawdzenia własnej strony. Wszystkie href to realne trasy
   * z rejestrów albo kotwica o potwierdzonym id=.
   */
  powiazane: {
    realizacje: [
      {
        etykieta: 'Strona cytowana przez ChatGPT po trzech tygodniach',
        href: '/realizacje/strona-cytowana-przez-chatgpt',
        opis: 'Około trzy tygodnie od publikacji do wskazania firmy przez ChatGPT.',
      },
      {
        etykieta: 'Strona w pierwszej dziesiątce Google i widoczna w GPT',
        href: '/realizacje/top10-google-i-widocznosc-w-gpt',
        opis: 'Drugi klient z rynku niemieckiego: frazy z umowy plus GPT.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Audyt strony pod AI (GEO)',
        href: '/narzedzia#audyt-strony-ai',
        opis: 'Dziesięć pytań pokazuje, czy ChatGPT może zacytować Twoją stronę.',
      },
    ],
  },
};
