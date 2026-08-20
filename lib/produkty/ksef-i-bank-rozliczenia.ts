import type { Produkt } from './types';

/**
 * PRODUKT — zestawienie KSeF z bankiem (audyt
 * `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §8, pozycja „Automatyzacja
 * KSeF plus bank", etap 3 pkt 12).
 *
 * INSTRUKCJA REDAKCYJNA PAWŁA (audyt §8): bezosobowo, „mamy w portfolio
 * zbudowane takie narzędzie", z problemem i ceną.
 *
 * TO NIE JEST TO SAMO CO `skaner-faktur-ksef` z tego rejestru. Tamten odczytuje
 * fakturę (OCR) i przygotowuje eksport do KSeF, czyli pracuje na dokumencie
 * WCHODZĄCYM. Ten pobiera dane z KSeF i z banku i sprawdza, KTÓRE faktury
 * zostały opłacone i czy w ogóle są nasze. To rozliczenie, nie przepisywanie.
 * Oba zostają osobno, bo mieszanie ich w jednej karcie zaciera, co dokładnie
 * dostaje klient.
 *
 * DLACZEGO TO JEST NA STRONIE (audyt §8): przy KSeF Paweł deklaruje mocne
 * zaawansowanie, a w top10 na frazy fakturowe stoi learn.microsoft.com i firmy
 * z 20-30 letnim stażem. Nisza „KSeF dla małej firmy" jest w zasięgu.
 *
 * BRAK DANEJ (zgłoszone Pawłowi): cena i dojrzałość — audyt §8 ich nie zawiera.
 */
export const ksefIBankRozliczenia: Produkt = {
  slug: 'ksef-i-bank-rozliczenia',
  coRobi: 'Zestawia faktury z KSeF z wyciągiem z banku i pokazuje, które są już opłacone',
  nazwaRobocza: 'KSeF plus bank',
  dojrzalosc: 'mvp',

  opisFunkcji:
    'Mamy w portfolio zbudowane narzędzie, które pobiera dane z KSeF i z banku, a potem samo sprawdza, które faktury zostały opłacone i czy dana wpłata w ogóle dotyczy naszej faktury. Interfejs jest celowo prosty: widzisz listę i stan, a nie kolejny system do nauczenia się. Zamiast przeklikiwać wyciąg i odhaczać pozycje ręcznie, patrzysz na gotowe zestawienie.',

  dlaKogo:
    'Dla małych firm i biur, w których ktoś co miesiąc porównuje wyciąg bankowy z listą faktur i odhacza pozycję po pozycji.',

  coDaje:
    'Wiadomo od ręki, kto zapłacił, a kto nie, bez ręcznego przeklikiwania wyciągu. Mniej pomyłek przy wpłatach o podobnych kwotach. Oszczędność: kilka godzin miesięcznie na samym uzgadnianiu płatności (szac.).',

  customNote:
    'To punkt wyjścia do customu. Podpięcie konkretnego banku, reguły dopasowania wpłat i zakres raportu ustawiamy pod Twoją firmę. Cena na zapytanie: zakres i wycenę ustalamy na bezpłatnej diagnozie.',

  demoHint:
    'Zrzut albo krótkie demo: lista faktur z KSeF ze statusem opłacenia dociągniętym z wyciągu bankowego.',
};
