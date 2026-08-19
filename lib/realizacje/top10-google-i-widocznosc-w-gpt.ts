import type { Realizacja } from './types';

/**
 * CASE 10 — PIERWSZA DZIESIĄTKA GOOGLE I WIDOCZNOŚĆ W GPT (Fichtelgebirgshaus.de).
 * Kategoria: optymalizacja → link wewnętrzny do /uslugi/optymalizacja.
 *
 * ŹRÓDŁO DANYCH: `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md`
 *   §6.1 (dowody GEO) + §7 (tabela 11 nazwanych klientów, zgody są, klient DE).
 *   Fakty użyte tutaj i NIGDZIE poza nimi:
 *     - pierwsza dziesiątka Google na frazy umówione z klientem w umowie,
 *     - plus widoczność w GPT,
 *     - zakres wdrożenia: strona WWW (§7),
 *     - klient z rynku niemieckiego (§7: „nieużywana przewaga: działamy na
 *       rynku polskim i niemieckim").
 *
 * CZEGO AUDYT NIE DAJE (i czego dlatego NIE MA w treści): listy fraz z umowy,
 * czasu dojścia do pierwszej dziesiątki, liczby wejść i zapytań. Wzorzec
 * uczciwości z §6.6: brak liczby zapisujemy wprost, zamiast dorabiać.
 * Zero em-dash, zero zmyślonych liczb, głos Pawła, answer-first.
 */
export const top10GoogleIWidocznoscWGpt: Realizacja = {
  slug: 'top10-google-i-widocznosc-w-gpt',
  h1: 'Strona w pierwszej dziesiątce Google i widoczna w GPT',
  kategoria: 'optymalizacja',
  klient: 'Fichtelgebirgshaus.de',
  branza: 'Rynek niemiecki',

  kapsula:
    'Fichtelgebirgshaus.de to nasz klient z rynku niemieckiego. Zbudowaliśmy stronę, która weszła do pierwszej dziesiątki Google na frazy umówione z klientem w umowie, i która jest widoczna także w GPT. Ten sam sposób pracy nad treścią działa nam po polsku i po niemiecku, bo silniki AI czytają jedno i drugie.',

  metaTitle: 'Pierwsza dziesiątka Google i widoczność w GPT',
  metaDescription:
    'Strona dla klienta z Niemiec: pierwsza dziesiątka Google na frazy umówione w umowie plus widoczność w GPT. Case study pozycjonowania pod AI i pod Google.',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Fichtelgebirgshaus.de to klient z Niemiec. Frazy, na których strona ma być widoczna, zostały zapisane w umowie, więc od pierwszego dnia było jasne, po czym poznamy, że robota się udała. To wygodny układ dla obu stron: nie ma miejsca na przesuwanie bramki po fakcie. Rynek niemiecki rządzi się tu tymi samymi prawami co polski. Klient szuka w Google, coraz częściej pyta modelu AI, i wygrywa ten, kogo widać w obu miejscach.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Zbudowaliśmy stronę i prowadziliśmy ją pod dwa cele naraz: pozycję w Google na frazy z umowy i czytelność dla silników AI. Ta sama treść pracuje na jedno i drugie, bo model, który ma odpowiedzieć na pytanie klienta, potrzebuje dokładnie tego, czego potrzebuje wyszukiwarka: konkretu, jasnej struktury i odpowiedzi postawionej wysoko, a nie schowanej na końcu akapitu.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: 'Top 10',
        etykieta:
          'pierwsza dziesiątka Google na frazy umówione z klientem w umowie',
      },
      {
        wartosc: 'GPT',
        etykieta: 'firma jest widoczna także w odpowiedziach GPT',
      },
    ],
    opis:
      'Frazy były zapisane w umowie i strona weszła na nie do pierwszej dziesiątki Google. Do tego jest widoczna w GPT, czyli pracuje w obu kanałach naraz. Samej listy fraz nie publikujemy, bo to ustalenie z klientem. Nie podajemy też, ile tygodni to zajęło, bo akurat tego nie mamy zmierzonego co do daty, a nie dorabiamy liczb.',
  },

  faq: [
    {
      pytanie: 'Na jakich frazach strona weszła do pierwszej dziesiątki?',
      odpowiedz:
        'Na frazach umówionych z klientem w umowie. Samej listy nie publikujemy, bo to ustalenie z klientem. Publikujemy wynik: pierwsza dziesiątka Google na te frazy plus widoczność firmy w GPT.',
    },
    {
      pytanie: 'Pracujecie też poza Polską?',
      odpowiedz:
        'Tak. Fichtelgebirgshaus.de i Trockenhaus to klienci z rynku niemieckiego. Pracujemy po polsku i po niemiecku, a sposób pracy nad treścią jest ten sam, bo silniki AI czytają obydwa języki i w obu szukają tego samego: konkretu i jasnej odpowiedzi.',
    },
  ],

  queries: [
    'pozycjonowanie strony w Google i w AI',
    'pierwsza dziesiątka Google i widoczność w GPT',
    'pozycjonowanie stron na rynek niemiecki',
    'strona widoczna w GPT',
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
        etykieta: 'Z niewidocznej strony do pierwszej trójki w Google',
        href: '/realizacje/z-niewidocznej-strony-do-top3-google',
        opis: 'Drugi klient z rynku niemieckiego, strona plus narzędzie do wycen.',
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
