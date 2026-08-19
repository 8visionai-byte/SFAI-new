import type { Usluga } from './types';

/**
 * USŁUGA — LEADY BRANŻOWE B2B (audyt `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md`
 * §4 i §6.9, etap 3 pkt 9). Do 2026-08-19 tej usługi NIE BYŁO na stronie, a jest
 * gotowa i ma najczystszą jednostkę rozliczenia w całej ofercie: cenę za paczkę
 * rekordów, więc klient sam policzy koszt jednego rekordu.
 *
 * CENNIK (audyt §4, kwoty podane przez Pawła):
 *   1 000 rekordów   169 zł   (0,169 zł za rekord)
 *   5 000 rekordów   699 zł   (0,140 zł za rekord)
 *  10 000 rekordów  1 390 zł  (0,139 zł za rekord)
 * Progresja maleje wraz z wielkością paczki („więcej się bardziej opłaca").
 *
 * LICZBY DOWODOWE (audyt §6.9, zatwierdzone do publikacji):
 *  - 20-30 minut na 1 000 rekordów branżowych po naszej stronie,
 *  - około 3 minuty ręcznie na JEDEN rekord (znaleźć, sprawdzić, zapisać do CRM),
 *    czyli około 50 godzin na 1 000 rekordów i około 250 godzin na 5 000.
 *
 * ZAKRES: rekordy pochodzą ze scrapowania Google Maps. USŁUGA WYŁĄCZNIE DLA FIRM
 * B2B — audyt każe napisać to WPROST, żeby odfiltrować złe zapytania. To zdanie
 * ma zostać na stronie, nawet jeśli kiedyś będzie brzmiało zbyt wykluczająco.
 *
 * ETYKIETA NETTO: audyt przy §4 nie zapisuje wprost, czy 169 / 699 / 1390 zł są
 * netto, ale od 2026-08-18 netto jest standardem CAŁEGO cennika (audyt §9 etap 1
 * pkt 4), a components/uslugi/RamaCeny.tsx dokleja to słowo do każdej kwoty
 * z minPrice. Strona jest więc spójna: netto wszędzie. DO POTWIERDZENIA przez
 * Pawła jednym słowem; gdyby kwoty były brutto, poprawka to usunięcie etykiety.
 *
 * BRAK DANEJ (zgłoszone Pawłowi, NIE zmyślać):
 *  - format przekazania paczki (arkusz, CSV, wpięcie do CRM) — stąd zdanie
 *    o ustaleniu formatu na diagnozie zamiast zmyślonego rozszerzenia pliku,
 *  - czas realizacji paczki 5 000 i 10 000 rekordów w liczbach (audyt daje tylko
 *    „kilka godzin" dla 5 000; ta fraza jest cytowana 1:1, bez doprecyzowania).
 */
export const leadyB2b: Usluga = {
  slug: 'leady-b2b',
  dataAktualizacji: '2026-08-19',
  h1: 'Leady branżowe B2B: gotowa baza firm',

  /* BLOK KRÓTKIEJ ODPOWIEDZI (audyt §9 etap 1 pkt 2): cztery wielkości naraz,
     czyli dolna cena, cena za rekord, czas po naszej stronie i czas ręczny. */
  kapsula:
    'Leady branżowe B2B to gotowa paczka rekordów firm z wybranej branży i okolicy. Paczka 1000 rekordów kosztuje 169 zł netto, czyli 0,169 zł netto za rekord, i zbieramy ją w 20 do 30 minut. Ręcznie to około 3 minuty na jeden rekord, czyli około 50 godzin pracy. Większe paczki są tańsze w przeliczeniu: 5000 rekordów to 699 zł netto, a 10000 rekordów 1390 zł netto. Usługa wyłącznie dla firm B2B.',

  metaTitle: 'Leady branżowe B2B: 1000 rekordów od 169 zł',
  metaDescription:
    'Gotowa baza firm B2B: 1000 rekordów za 169 zł netto w 20 do 30 minut, 5000 za 699 zł, 10000 za 1390 zł. Ręcznie to około 3 minuty na rekord.',

  problem: {
    h2: 'Ile kosztuje Cię zbieranie kontaktów ręcznie?',
    tresc:
      'Pozyskiwanie leadów B2B dla firm zaczyna się zwykle od ręcznego zbierania kontaktów: około 3 minuty na jeden rekord, czyli około 50 godzin przy tysiącu firm. Ten czas handlowiec spędza na przepisywaniu, nie na rozmowach z klientami.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'akapit',
        tekst: 'Tak wygląda ta praca w praktyce: handlowiec siada do Google Maps i przepisuje. Nazwa, telefon, adres, strona, sprawdzenie, czy firma jeszcze działa, wklejenie do arkusza albo do CRM. Około 3 minuty na jeden rekord, jeśli idzie sprawnie.',
      },
      {
        typ: 'kafle',
        kafle: [
          {
            wartosc: 'ok. 3 min',
            opis: 'ręczne zebranie jednego rekordu',
          },
          {
            wartosc: 'ok. 50 godzin',
            opis: '1000 rekordów ręcznie, więcej niż tydzień pracy jednej osoby',
          },
          {
            wartosc: 'ok. 250 godzin',
            opis: '5000 rekordów zebranych ręcznie',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co jeszcze tracisz poza godzinami?',
        wariant: 'quiet',
        akapity: [
          'Ten czas nie idzie na rozmowy z klientami, tylko na przepisywanie danych, które i tak są publicznie dostępne. Do tego dochodzi zmęczenie i błędy, które wychodzą dopiero wtedy, gdy ktoś zaczyna dzwonić.',
        ],
        punkty: [
          'Literówka w numerze telefonu.',
          'Pominięta firma na liście.',
          'Dwa razy ta sama pozycja.',
          'Baza robi się nierówna, zanim ktokolwiek do kogoś zadzwoni.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co dokładnie dostajesz w paczce rekordów?',
    tresc:
      'Leady branżowe B2B to gotowa paczka rekordów firm z wybranej branży i obszaru, zebrana z publicznie dostępnych wizytówek Google Maps. Mówisz, do kogo chcesz dotrzeć, a my zbieramy i przekazujemy Ci gotową bazę firm B2B.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'sekcja',
        naglowek: 'Skąd bierzecie te rekordy?',
        wariant: 'top',
        akapity: [
          'Z publicznie dostępnych wizytówek firm w Google Maps. To te same dane, które Twój handlowiec i tak by przeklikał ręcznie, tylko zebrane maszynowo. Takie zbieranie często nazywa się scrapowaniem Google Maps: maszynowym odczytem publicznych wizytówek.',
          'Dzięki temu dostajesz gotową bazę leadów zamiast godzin spędzonych na przepisywaniu. Rekordy z wybranej branży i obszaru trafiają do Ciebie w jednej paczce.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Jak długo czekam na paczkę?',
        wariant: 'edge',
        akapity: [
          'Tysiąc rekordów zajmuje nam 20 do 30 minut zamiast Twoich 50 godzin. Pięć tysięcy to kilka godzin.',
          'Format przekazania ustalamy na diagnozie, żeby rekordy wpadły prosto tam, gdzie pracujesz, a nie do kolejnego pliku, który trzeba potem przerabiać.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy do tych rekordów potrzebujesz osobnego narzędzia?',
        wariant: 'quiet',
        akapity: [
          'Nie. Równie ważne jak to, co dostajesz, jest to, czego tu nie kupujesz:',
        ],
        punkty: [
          'Nie sprzedajemy Ci narzędzia do obsługiwania paczki. Pracujesz tam, gdzie pracujesz dziś: w swoim arkuszu albo CRM.',
          'Nie ma abonamentu za dostęp do danych.',
          'Kupujesz paczkę, dostajesz paczkę. Dane po przekazaniu są Twoje.',
          'Wpięcie rekordów prosto do Twojego systemu albo automatyczny pierwszy kontakt to osobne wdrożenie automatyzacji, wyceniane oddzielnie.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy zrobicie to dla firmy sprzedającej klientom indywidualnym?',
        wariant: 'quiet',
        chip: 'ZASADA',
        akapity: [
          'Nie, jedno ograniczenie mówimy wprost: tę usługę robimy wyłącznie dla firm, które sprzedają innym firmom, czyli działają w B2B.',
          'Jeśli Twoim klientem jest osoba prywatna, powiemy Ci to od razu na diagnozie i nie weźmiemy zlecenia. Wolimy odmówić, niż sprzedać paczkę, z której nie skorzystasz.',
        ],
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Zbieranie rekordów ręcznie a gotowa paczka',
    naglowekBez: 'Ręcznie, przez handlowca',
    naglowekZNami: 'Paczka od SimpleFast.ai',
    wiersze: [
      { cecha: '1000 rekordów', bez: 'Około 3 minuty na rekord, czyli około 50 godzin', zNami: '20 do 30 minut' },
      { cecha: '5000 rekordów', bez: 'Około 250 godzin', zNami: 'Kilka godzin' },
      { cecha: 'Koszt', bez: 'Czas pracownika', zNami: 'Od 169 zł netto za paczkę' },
      { cecha: 'Koszt jednego rekordu', bez: 'Zależy od stawki godzinowej', zNami: 'Od 0,139 zł netto przy paczce 10000' },
      { cecha: 'Źródło danych', bez: 'Przeklikane ręcznie', zNami: 'Publiczne wizytówki Google Maps' },
      { cecha: 'Rozliczenie', bez: 'Pensja co miesiąc', zNami: 'Jednorazowo za paczkę, bez abonamentu' },
      { cecha: 'Dla kogo', bez: 'Każdy próbuje sam', zNami: 'Wyłącznie firmy sprzedające B2B' },
    ],
  },

  kroki: {
    h2: 'Jak zamawiasz paczkę rekordów krok po kroku?',
    items: [
      {
        tytul: 'Ustalamy branżę i obszar',
        opis:
          'Mówisz, do kogo chcesz dotrzeć i gdzie. Sprawdzamy, czy Twój klient to firma, bo tylko wtedy tę usługę robimy. Dobieramy wielkość paczki do tego, ile realnie przerobisz.',
      },
      {
        tytul: 'Zbieramy rekordy',
        opis:
          'Paczka tysiąca rekordów powstaje w 20 do 30 minut, pięć tysięcy to kilka godzin. Zbieramy dane z publicznych wizytówek Google Maps, bez przepisywania ich ręcznie.',
      },
      {
        tytul: 'Przekazujemy paczkę',
        opis:
          'Dostajesz gotowe rekordy w formacie ustalonym na diagnozie i od razu możesz zacząć dzwonić albo pisać. Płacisz raz za paczkę, dane zostają u Ciebie, nie ma abonamentu za dostęp.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztują leady branżowe B2B?',
    tresc:
      'Paczka 1000 rekordów kosztuje 169 zł netto, czyli 0,169 zł netto za rekord. Płacisz raz za paczkę, nie za dostęp do narzędzia, i nie ma abonamentu.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'tabela',
        naglowki: [
          'Paczka',
          'Cena netto',
          'Cena za rekord',
          'Czas po naszej stronie',
        ],
        wiersze: [
          [
            '1000 rekordów',
            '169 zł netto',
            '0,169 zł netto',
            '20 do 30 minut',
          ],
          [
            '5000 rekordów',
            '699 zł netto',
            '0,140 zł netto',
            'kilka godzin',
          ],
          [
            '10000 rekordów',
            '1390 zł netto',
            '0,139 zł netto',
            'ustalamy na diagnozie',
          ],
        ],
        wKarcie: true,
        podpis: 'Im większa paczka, tym taniej wychodzi jeden rekord. Opłata jednorazowa, bez abonamentu.',
      },
      {
        typ: 'akapit',
        tekst: 'Im większa paczka, tym taniej wychodzi pojedynczy rekord, bo praca po naszej stronie rośnie wolniej niż liczba firm na liście.',
      },
      {
        typ: 'akapit',
        tekst: 'Za leady branżowe B2B płacisz raz. Nie ma abonamentu, nie ma opłaty za utrzymanie i nie ma limitu na to, ile razy z tych danych skorzystasz.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Którą paczkę wybrać na start?',
        wariant: 'top',
        akapity: [
          'Tę, którą realnie przerobisz w miesiącu. Skoro wiesz już, ile kosztuje 1000 leadów B2B, policz drugą stronę: przy stawce, jaką i tak płacisz handlowcowi, samo ręczne zebranie tysiąca rekordów zajmuje około 50 godzin.',
          'Zanim zamówisz, na bezpłatnej diagnozie mówimy wprost, czy Twoja branża ma sens w tym kanale i ile rekordów realnie przerobisz w miesiącu. Chodzi o to, żeby paczka pracowała, a nie przeleżała bez użycia.',
        ],
      },
    ],
    minPrice: 169,
    linkPoradnik: {
      przed: 'Jak liczyć zwrot z automatyzacji powtarzalnej roboty, rozpisaliśmy w ',
      etykieta: 'poradniku o kosztach automatyzacji AI',
      po: '.',
      href: '/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie',
    },
  },

  faq: [
    {
      pytanie: 'Ile kosztuje 1000 leadów B2B?',
      odpowiedz:
        'Paczka 1000 rekordów kosztuje 169 zł netto, czyli 0,169 zł netto za jeden rekord. Paczka 5000 rekordów to 699 zł netto, czyli 0,140 zł netto za rekord, a 10000 rekordów to 1390 zł netto, czyli 0,139 zł netto za rekord. Płacisz raz za paczkę. Nie ma abonamentu ani opłaty za dostęp, a dane po przekazaniu są Twoje.',
    },
    {
      pytanie: 'Skąd bierzecie te rekordy?',
      odpowiedz:
        'Z publicznie dostępnych wizytówek firm w Google Maps. To te same dane, które Twój handlowiec i tak by przeklikał ręcznie, tylko zebrane maszynowo. Dlatego usługa dotyczy wyłącznie firm, a nie osób prywatnych.',
    },
    {
      pytanie: 'Jak długo czekam na paczkę?',
      odpowiedz:
        'Tysiąc rekordów zbieramy w 20 do 30 minut. Pięć tysięcy to kilka godzin. Dla porównania ręcznie jeden rekord zajmuje około 3 minut, czyli tysiąc rekordów to około 50 godzin, a pięć tysięcy około 250 godzin pracy człowieka.',
    },
    {
      pytanie: 'Czy zrobicie to dla firmy sprzedającej klientom indywidualnym?',
      odpowiedz:
        'Nie. Tę usługę robimy wyłącznie dla firm, które sprzedają innym firmom. Mówimy to wprost na starcie, żeby nikt nie zamawiał paczki, z której nie będzie mógł skorzystać. Jeśli Twoim klientem jest osoba prywatna, powiemy to na diagnozie i nie weźmiemy zlecenia.',
    },
    {
      pytanie: 'Czy do tych rekordów potrzebuję osobnego narzędzia?',
      odpowiedz:
        'Nie. Dostajesz gotową paczkę w formacie ustalonym na diagnozie i pracujesz na niej tam, gdzie pracujesz dziś. Jeśli chcesz, żeby rekordy wpadały prosto do Twojego systemu albo żeby pierwszy kontakt szedł automatycznie, to już jest osobne wdrożenie automatyzacji i wyceniamy je oddzielnie.',
    },
    {
      pytanie: 'Którą paczkę wybrać na start?',
      odpowiedz:
        'Tę, którą realnie przerobisz. Na diagnozie pytamy, ile kontaktów Twój zespół obdzwania albo obsługuje w miesiącu, i dobieramy wielkość do tej liczby. Większa paczka jest tańsza w przeliczeniu na rekord, ale paczka, która leży nieużywana, nie zarabia. Zaczynamy zwykle od najmniejszej, żeby sprawdzić jakość na Twojej branży.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Umów bezpłatną diagnozę. Mówimy wprost, czy Twoja branża ma sens w tym kanale, zanim zamówisz paczkę.',
    dowod:
      'Tysiąc rekordów zbieramy w 20 do 30 minut. Ręcznie to około 3 minuty na jeden rekord.',
  },

  queries: [
    'leady branżowe B2B',
    'baza firm B2B',
    'gotowa baza leadów',
    'ile kosztuje 1000 leadów B2B',
    'pozyskiwanie leadów B2B dla firm',
  ],

  powiazane: {
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Wpisujesz godziny tracone na powtarzalnej robocie, a kalkulator pokazuje kwotę roczną do odzyskania.',
      },
    ],
    uslugi: [
      {
        etykieta: 'Automatyzacja procesów w firmie',
        href: '/uslugi/automatyzacje',
        opis:
          'Powtarzalna robota za kulisami przechodzi na automat, a my pilnujemy, żeby działał po zmianach w narzędziach.',
      },
      {
        etykieta: 'Voicebot dla firm',
        href: '/uslugi/voiceboty',
        opis:
          'Voicebot odbiera telefon 24/7. Stworzenie od 2500 zł netto, utrzymanie 299 do 1500 zł netto miesięcznie albo 0 zł po przekazaniu infrastruktury.',
      },
    ],
  },
};
