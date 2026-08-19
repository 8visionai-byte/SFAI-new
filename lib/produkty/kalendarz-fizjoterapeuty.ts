import type { Produkt } from './types';

/**
 * PRODUKT — kalendarz łączący wizyty zawodowe i prywatne (audyt
 * `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §8, pozycja „Kalendarz dla
 * fizjoterapeutów", etap 3 pkt 12).
 *
 * INSTRUKCJA REDAKCYJNA PAWŁA (audyt §8): bezosobowo, „mamy w portfolio
 * zbudowane takie narzędzie", z problemem i ceną.
 *
 * ŹRÓDŁO TREŚCI 1:1 (audyt §8): „wizyty zawodowe i prywatne w jednym miejscu,
 * z podpięciem rodziny, która widzi dostępność, przy zachowaniu rozgraniczenia
 * i zabezpieczenia danych". Rozgraniczenie i zabezpieczenie danych to CECHA
 * PODANA PRZEZ PAWŁA, nie moja obietnica prawna — dlatego opisana jako to, co
 * narzędzie robi (rodzina widzi dostępność, nie widzi treści wizyt), bez
 * żadnych deklaracji o zgodności z konkretnymi przepisami.
 *
 * BRAK DANEJ (zgłoszone Pawłowi): cena i dojrzałość — audyt §8 ich nie zawiera.
 */
export const kalendarzFizjoterapeuty: Produkt = {
  slug: 'kalendarz-fizjoterapeuty',
  coRobi: 'Trzyma wizyty zawodowe i prywatne w jednym kalendarzu, a rodzina widzi tylko dostępność',
  nazwaRobocza: 'Kalendarz gabinetu',
  dojrzalosc: 'mvp',

  opisFunkcji:
    'Mamy w portfolio zbudowany kalendarz dla gabinetu, który trzyma wizyty zawodowe i prywatne w jednym miejscu, zamiast w dwóch aplikacjach, między którymi trzeba przeskakiwać. Do kalendarza da się podpiąć rodzinę: widzi dostępność, żeby planować wspólne sprawy, ale bez wglądu w to, kto i po co przychodzi. Rozdzielenie tych dwóch widoków jest wbudowane, nie zależy od pamięci właściciela.',

  dlaKogo:
    'Dla fizjoterapeutów i innych gabinetów jednoosobowych, u których grafik pracy i grafik domowy nachodzą na siebie każdego tygodnia.',

  coDaje:
    'Koniec dwóch kalendarzy i podwójnych rezerwacji na ten sam termin. Rodzina planuje wokół realnej dostępności, a dane pacjentów zostają po stronie gabinetu. Oszczędność: kilkanaście minut dziennie na samym pilnowaniu terminów (szac.).',

  customNote:
    'To punkt wyjścia do customu. Reguły widoczności, zakres danych i to, kto co widzi, ustawiamy pod Twój gabinet. Zakres i wycenę ustalamy na bezpłatnej diagnozie.',

  demoHint:
    'Zrzut albo krótkie demo: ten sam tydzień w dwóch widokach, gabinetowym i rodzinnym, z widoczną różnicą w szczegółach.',
};
