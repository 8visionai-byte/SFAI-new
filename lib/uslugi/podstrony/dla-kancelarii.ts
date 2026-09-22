import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA VOICEBOTÓW 4 — KANCELARIA PRAWNA
 * (`/uslugi/voiceboty/dla-kancelarii`).
 * Fraza primary: „voicebot dla kancelarii prawnej" (pakiet
 * `.seo-przeglad/pakiety/voiceboty.md` PODSTRONA 5, treść zatwierdzona przed
 * redakcją: kapsuła wchodzi DOSŁOWNIE, sekcje 1-9 wg listy z pakietu).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica i trzech sióstr z tej samej gałęzi):
 *  - RODZIC `/uslugi/voiceboty` sprzedaje CAŁĄ usługę: czym jest voicebot,
 *    co robi w dowolnej firmie, trzy pozycje kosztu, wdrożenie.
 *  - `/windykacja`: telefon PRZYCHODZĄCY w sprawie zaległych płatności.
 *  - `/potwierdzanie-wizyt`: umawianie, odwoływanie i przekładanie terminów
 *    jako funkcja w dowolnej branży.
 *  - `/odbieranie-telefonow`: sam odbiór połączenia i los nieodebranej sprawy.
 *  - TA STRONA: PIERWSZY telefon od osoby z nowym problemem prawnym. Punkt
 *    ciężkości to wstępna kwalifikacja sprawy według scenariusza kancelarii,
 *    granica „czego bot w kancelarii robić nie powinien" i tajemnica zawodowa.
 *    Kończy się jedną decyzją: bezpłatna rozmowa o zakresie.
 *  - NIE MA TU I BYĆ NIE MOŻE: rozwijania cennika (od tego jest
 *    `/uslugi/voiceboty/cennik`, link stoi w ramie ceny) ani rozwijania RODO
 *    i AI Act (od tego jest `/uslugi/voiceboty/rodo-ai-act`: tu JEDEN akapit
 *    i link w „Powiązane", nie druga strona prawna).
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła: pakiet, PODSTRONA 5, blok „KAPSUŁA (gotowa)", przeniesiona
 *    DOSŁOWNIE, co do znaku (treść zatwierdzona, nie wolno jej przepisywać),
 *  - lista sekcji 1-9 (problem, granice bota, kwalifikacja i konsultacja,
 *    tajemnica zawodowa, wdrożenie, cena, powiązane, FAQ, CTA): pakiet,
 *    PODSTRONA 5, blok „Sekcje",
 *  - odbieranie WYŁĄCZNIE połączeń przychodzących 24/7 po polsku, zapowiedź
 *    „jestem asystentem AI" (AI Act), odpowiedzi tylko ze scenariusza, notatka
 *    i podsumowanie po rozmowie, przekazywanie spraw trudnych człowiekowi,
 *    granice ustawia klient, zapis wizyty w kalendarzu jeszcze W TRAKCIE
 *    rozmowy, dane w Unii Europejskiej, umowa powierzenia, decyzja klienta
 *    o zakresie nagrywania i przechowywania: `lib/uslugi/voiceboty.ts`
 *    (kapsula, rozwiazanie, tabelaPorownawcza, faq),
 *  - trzy pozycje kosztu, czasy wdrożenia i dwie rundy poprawek:
 *    `lib/uslugi/voiceboty.ts` (kapsula, ramaCeny, faq „Ile rund poprawek jest
 *    w cenie wdrożenia?"), zgodne co do złotówki z trzema siostrami,
 *  - „nagrania i transkrypcje stoją na Twoich kontach u dostawców przy
 *    wariancie z infrastrukturą po Twojej stronie": `lib/uslugi/voiceboty.ts`
 *    (ramaCeny, POZYCJA 2: „przekazujemy Ci całą infrastrukturę") plus pakiet,
 *    PODSTRONA 6, kapsuła oraz sekcja 11, pytanie o własność nagrań.
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  2500 zł netto, 5000 do 9000 zł netto, 299 do 1500 zł netto miesięcznie,
 *  0 zł, 350 zł netto za godzinę, 3 do 5 dni roboczych, 5 do 25 dni roboczych,
 *  dwie rundy poprawek, 24/7, trzy pozycje kosztu. Każda kwota NASZA zawsze
 *  z dopiskiem netto, przy „0 zł" netto NIE dopisujemy.
 *  BRAK DANEJ, KTÓREJ NIE ZMYŚLAMY: pakiet nie podaje ani jednej liczby
 *  branżowej dla kancelarii (ile telefonów dziennie, jaki procent dzwoniących
 *  nie wraca, ile trwa pierwsza konsultacja, jaka jest jej cena) ani żadnego
 *  odniesienia czasowego w stylu „pół roku temu". Wszystkie zdania o stracie
 *  pierwszego telefonu są napisane tak, żeby były prawdziwe BEZ liczby.
 *  Nie ma tu też ceny konsultacji prawnej, bo ustala ją kancelaria, nie my.
 *
 * ZAKAZANE NA TEJ STRONIE:
 *  - jakakolwiek sugestia, że bot dzwoni sam albo obdzwania kogokolwiek
 *    (kontrakt powtórzony w ośmiu miejscach kodu; wolno WYŁĄCZNIE
 *    w zaprzeczeniu, i tak jest tu użyty: w kapsule, w tabeli, w sekcji
 *    „ZASADA" i w FAQ),
 *  - fraza „wirtualna recepcjonistka" w każdej odmianie,
 *  - obietnica porady prawnej, oceny szans sprawy, terminów i podstaw prawnych
 *    albo wyceny prowadzenia sprawy przez bota,
 *  - obietnica pomiaru, audytu, raportu albo „listy rzeczy do zrobienia" na
 *    bezpłatnej rozmowie (ustalenie właściciela 2026-08-31: bezpłatna rozmowa
 *    to WYŁĄCZNIE badanie potrzeb; wolno „obejrzymy", „ustalimy zakres",
 *    „policzymy na Twoich liczbach"),
 *  - kwoty poza sekcją ceny, kapsułą i metadanymi. Dlatego FAQ o cenie
 *    wymienia trzy pozycje kosztu BEZ kwot i odsyła do ramy ceny i cennika,
 *    inaczej niż trzy starsze siostry, które kwoty w FAQ mają.
 *  - `ramaCeny.cenaStala`: NIE ustawiamy. Ceny voicebota to widełki
 *    (2500 zł netto albo 5000 do 9000 zł netto), więc kafel ceny w hero ma
 *    zostać z prefiksem „od".
 *
 * LINKI WYCHODZĄCE, KTÓRE MUSI DOMKNĄĆ INTEGRATOR: `/uslugi/voiceboty/cennik`
 * (rama ceny) i `/uslugi/voiceboty/rodo-ai-act` (Powiązane) to trasy z TEGO
 * SAMEGO pakietu, jeszcze nieobecne w `lib/uslugi/podstrony/index.ts`. Obie są
 * wymagane przez pakiet (PODSTRONA 5, sekcje 6 i 7 oraz uwaga wdrożeniowa §7),
 * ale dopóki tamte dwa pliki nie wejdą do rejestru, są to linki do 404.
 * Wpis tej podstrony do rejestru i tamtych dwóch to jedna paczka.
 *
 * KOLOR I FORMA: podstrona dziedziczy ton kategorii „voiceboty" po rodzicu
 * (uwaga wdrożeniowa §5: żadnego nowego koloru dla podstron branżowych),
 * renderuje się TYMI SAMYMI komponentami co rodzic i trzy siostry. Zero nowych
 * typów bloków, zero nowego CSS, zero zmian w components/ i app/.
 */
export const dlaKancelarii: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'dla-kancelarii',
  dataAktualizacji: '2026-09-22',

  // H1 1:1 z pakietu (PODSTRONA 5). Krótki, więc nie łamie się na więcej niż
  // dwie linie nawet na 320 px, i niesie całą frazę główną.
  h1: 'Voicebot dla kancelarii prawnej',

  /* KAPSUŁA. Treść z pakietu („KAPSUŁA (gotowa)"), ŚCIŚNIĘTA 2026-09-22 z 82 słów do
     przedziału z kontraktu `Usluga.kapsula` (lib/uslugi/types.ts: 40-60 słów). Kapsuła
     jest blokiem, który modele cytują jako całą odpowiedź, więc ma być gęsta, nie długa.
     ANI JEDNA LICZBA NIE WYPADŁA: oba progi stworzenia stoją dalej, tak samo zapowiedź
     AI w pierwszym zdaniu, decyzja klienta o zakresie zapisu i czasie przechowywania
     oraz zakaz dzwonienia. Wypadła obietnica „nie pozwala jej odejść do kancelarii obok",
     czyli claim bez liczby; ten sam sens niesie `problem.tresc` i cała sekcja problemu. */
  kapsula:
    'Voicebot dla kancelarii prawnej odbiera pierwszy telefon od osoby z nowym problemem prawnym. Spisuje zgłoszenie, wstępnie kwalifikuje sprawę według Twojego scenariusza i umawia konsultację w kalendarzu. Mówi w pierwszym zdaniu, że jest asystentem AI. Zakres zapisu i czas przechowywania ustalasz Ty. Nie dzwoni sam do nikogo. Stworzenie: 2500 zł netto albo 5000 do 9000 zł netto z integracją do kalendarza.',

  /* metaTitle: pakiet dawał 31 znaków, konwencja repo (types.ts) i decyzja
     właściciela mówią 50-60. Fraza główna zostaje NA POCZĄTKU i bez zmian,
     wyróżnik to wyłącznie fakty z TEJ strony: cena startowa (kapsuła i rama
     ceny) oraz 24/7 (tabela porównawcza i FAQ). Długość 55 znaków.
     Layout dokleja sufiks marki, więc w SERP wychodzi
     „Voicebot dla kancelarii prawnej: od 2500 zł netto, 24/7 · SimpleFast.ai". */
  metaTitle: 'Voicebot dla kancelarii prawnej: od 2500 zł netto, 24/7',
  /* metaDescription: 150 znaków. Konkret z kapsuły plus granica produktu
     („nie dzwoni sam"), bo ta granica filtruje złe zapytania już w SERP. */
  metaDescription:
    'Voicebot dla kancelarii prawnej odbiera pierwszy telefon 24/7, spisuje zgłoszenie i umawia konsultację w kalendarzu. Nie dzwoni sam. Od 2500 zł netto.',

  problem: {
    /* Sekcja 1 z pakietu („Kancelaria traci sprawę, gdy nikt nie odbiera przy
       pierwszym telefonie"), przełożona na pytanie, jak wymaga kontrakt typu. */
    h2: 'Dlaczego kancelaria traci sprawę już przy pierwszym telefonie?',
    /* KONTROLA 2026-09-22: z leadu wypadło odniesienie czasowe „tego samego
       dnia" (pakiet nie podaje ani jednej liczby ani ramy czasowej dla
       kancelarii), a zdanie o oddzwonieniu dostało „często", bo bez tego
       twierdziło jako pewnik coś, czego nikt u nas nie zmierzył. Rodzic hedguje
       tak samo („Klient, który nie dodzwonił się raz, CZĘSTO nie dzwoni drugi"). */
    tresc:
      'Osoba z nowym problemem prawnym dzwoni do kilku kancelarii i zostaje w tej, która odebrała i wysłuchała. Telefon oddzwoniony później trafia często na klienta, który ma już swojego prawnika.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co robi osoba, która nie dodzwoniła się do kancelarii?',
        ikona: 'sluchawka-fala',
        chip: 'KANCELARIA',
        /* KONTROLA 2026-09-22: „JEDNO POPOŁUDNIE" to była rama czasowa bez
           źródła. „JEDNA SZANSA" stoi na fakcie z rodzica („Drugiej szansy
           zwykle nie ma") i na sekcji o pierwszym telefonie niżej. */
        overline: 'PIERWSZY TELEFON · JEDNA SPRAWA, JEDNA SZANSA',
      },
      {
        typ: 'akapit',
        tekst:
          'Dzwoni dalej. Numer kancelarii, która nie odebrała, znika z jej listy, bo sprawa jest pilna dla niej, a nie dla Twojego grafiku. Nie ma tu drugiego podejścia, bo nie ma powodu, żeby czekała.',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Prawnik jest na sali rozpraw',
            akapity: [
              'Rozprawa, spotkanie z klientem i czytanie akt to godziny, w których nikt nie sięga po telefon. Zgłoszenie przychodzi dokładnie wtedy.',
            ],
          },
          {
            naglowek: 'Sekretariat nie zna zakresu spraw',
            akapity: [
              'Osoba przy telefonie nie zawsze wie, czy kancelaria prowadzi taką sprawę, więc prosi o oddzwonienie i temat rozmowy nie zostaje nigdzie zapisany.',
            ],
          },
          {
            naglowek: 'Część dzwoniących nie nagra się na automat',
            akapity: [
              'Sprawa bywa prywatna i nieprzyjemna. Poczta głosowa to dla takiej osoby ostatnie miejsce, w którym chce ją opowiedzieć.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Pierwszy telefon to jedyny moment, w którym sprawa jest jeszcze wolna',
        akapity: [
          'Przy kolejnym telefonie dzwoniący ma już umówione spotkanie gdzie indziej i opowiada sprawę drugi raz tylko z uprzejmości. Nieodebrane połączenie w kancelarii kosztuje więc nie kilka minut pracy, tylko całą sprawę.',
          /* KONTROLA 2026-09-22: było „jest u WIĘKSZOŚCI kancelarii droższe".
             To twierdzenie ilościowe o branży, a pakiet nie daje dla kancelarii
             ani jednej liczby. „Bywa" mówi to samo i jest prawdziwe bez danych. */
          'Dokładanie etatu w sekretariacie po to, żeby ktoś siedział przy telefonie po godzinach i w sobotę, bywa droższe niż problem, który ma rozwiązać.',
        ],
        wariant: 'quiet',
      },
    ],
  },

  rozwiazanie: {
    /* Sekcja 3 z pakietu („Wstępna kwalifikacja sprawy i umówienie
       konsultacji") jako H2 sekcji, bo to jest oś tej podstrony. Sekcja 2
       z pakietu („Co bot może zrobić, a czego w kancelarii robić nie powinien")
       i sekcja 4 („Tajemnica zawodowa") schodzą niżej, jako bloki. */
    h2: 'Jak voicebot kwalifikuje sprawę i umawia konsultację?',
    tresc:
      'Bot odbiera połączenie przychodzące, przedstawia się jako asystent AI i zadaje pytania, które sam mu wpiszesz. Gdy sprawa mieści się w zakresie kancelarii, proponuje wolny termin konsultacji i zapisuje go w kalendarzu jeszcze w trakcie rozmowy.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co voicebot ustala w pierwszej rozmowie?',
        ikona: 'notes-pioro',
        chip: 'ZGŁOSZENIE',
        overline: 'TRZY RZECZY Z PIERWSZEGO TELEFONU',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Czego dotyczy sprawa',
            akapity: [
              'Bot pyta o rodzaj sprawy z listy, którą mu podasz, i zapisuje odpowiedź własnymi słowami dzwoniącego.',
            ],
            punkty: [
              'Kolejność pytań ustalasz Ty, nie model.',
              'Odpowiedź trafia do zgłoszenia, nie do rozmowy o zdrowiu sprawy.',
            ],
          },
          {
            naglowek: 'Czy to sprawa dla Twojej kancelarii',
            akapity: [
              'Gdy temat jest spoza listy, bot mówi to wprost i nie umawia konsultacji. Termin zostaje wolny dla sprawy, którą naprawdę prowadzisz.',
            ],
            punkty: [
              'Zgłoszenie i tak zostaje zapisane, więc widzisz, z czym do Ciebie dzwonią.',
              'Listę spraw, których nie prowadzisz, spisujemy przy wdrożeniu.',
            ],
          },
          {
            naglowek: 'Kiedy konsultacja',
            akapity: [
              'Termin bot bierze z Twojego grafiku, a nie z własnej propozycji. Wolną godzinę czyta w kalendarzu i wpisuje w nim konsultację, zanim dzwoniący się rozłączy.',
            ],
            punkty: [
              'Potwierdzenie idzie do dzwoniącego tekstem, bez Twojego udziału.',
              'Nic nie trzeba przepisywać z kartki po zakończonej rozmowie.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        /* Sekcja 2 z pakietu. To jest najważniejszy blok tej podstrony:
           w kancelarii granica produktu sprzedaje mocniej niż lista funkcji. */
        naglowek: 'Czego voicebot w kancelarii robić nie powinien',
        akapity: [
          'Bot mówi wyłącznie to, co sam zatwierdzisz w scenariuszu, i nie korzysta z ogólnej wiedzy modelu o świecie. Na pytanie spoza scenariusza odpowiada, że tego nie wie, i przekazuje sprawę dalej.',
        ],
        punkty: [
          'Nie ocenia sprawy i nie mówi, jak się skończy.',
          'Nie udziela porady prawnej, nie podaje podstaw prawnych ani terminów.',
          'Nie wycenia prowadzenia sprawy. Kwotę podaje prawnik na konsultacji.',
          'Nie sprawdza konfliktu interesów. To zostaje po stronie kancelarii.',
          'Nie dopytuje o szczegóły, o które nie kazałeś mu pytać.',
        ],
        wariant: 'edge',
        chip: 'GRANICE',
        stopka: [
          'Listę „tego bot nie mówi nigdy" spisujemy przed uruchomieniem numeru.',
          'Każdą rozmowę czytasz w transkrypcji, więc zmianę zgłaszasz tego samego dnia.',
        ],
      },
      {
        typ: 'sekcja',
        /* Sekcja 4 z pakietu. UWAGA REDAKCYJNA: to ma być JEDEN akapit
           odesłania do `/uslugi/voiceboty/rodo-ai-act`, a nie druga strona
           prawna. Link klikalny niesie karta w „Powiązane" na dole strony. */
        naglowek: 'Tajemnica zawodowa: co z rozmowy zostaje, a czego bot nie dotyka',
        akapity: [
          'Zakres tego, co z rozmowy zostaje zapisane, ustalasz Ty, i to samo dotyczy czasu przechowywania. Jeśli nie chcesz, żeby w zgłoszeniu lądował opis sprawy, bot zapisuje sam temat i kontakt, a resztę zostawia rozmowie z prawnikiem.',
          'Dane z rozmów zostają w Unii Europejskiej, a my podpisujemy umowę powierzenia. Przy wariancie z infrastrukturą po Twojej stronie nagrania i transkrypcje stoją na Twoich kontach u dostawców, nie na naszych.',
          'Pełne zasady przetwarzania, zgodę na nagrywanie, retencję nagrań i komunikat informacyjny na starcie rozmowy rozpisaliśmy osobno, na stronie o voicebocie a RODO i AI Act. Link znajdziesz niżej, w powiązanych.',
        ],
        wariant: 'top',
        chip: 'TAJEMNICA',
      },
      {
        typ: 'sekcja',
        /* Kontrakt całego serwisu, powtórzony świadomie: zdanie „nie robimy
           botów, które same wydzwaniają do ludzi" stoi w ośmiu miejscach kodu
           i jest tu w ZAPRZECZENIU, jedynej dozwolonej formie. */
        naglowek: 'Voicebot kancelarii nie dzwoni do nikogo',
        akapity: [
          'Bot obsługuje wyłącznie połączenia przychodzące. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy, a w kancelarii psuje je podwójnie.',
          'Sprawę do kontaktu zwrotnego bot zapisuje i oznacza, a Ty masz ją w zgłoszeniach. Telefon w drugą stronę wykonuje człowiek z kancelarii, chyba że klient oddzwoni pierwszy.',
        ],
        wariant: 'quiet',
        chip: 'ZASADA',
      },
    ],
  },

  /* Komórki krótkie (konwencja v20 podstron: cecha ~12 znaków, kolumny ~30),
     żeby wiersze nie łamały się na dwie linie na wąskich ekranach.
     Wiersz 1 MUSI zawierać „24/7" w kolumnie `zNami`: to bramka czwartego
     kafla statystyk w hero (ServiceHero.kafleStatystyk). */
  tabelaPorownawcza: {
    h2: 'Pierwszy telefon do kancelarii: sekretariat a voicebot',
    naglowekBez: 'Telefon w sekretariacie',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Godziny',
        bez: 'Gdy ktoś jest w sekretariacie',
        zNami: '24/7, także po godzinach pracy',
      },
      {
        cecha: 'Pierwszy telefon',
        bez: 'Sygnał, gdy trwa rozprawa',
        zNami: 'Odebrany, zgłoszenie spisane',
      },
      {
        cecha: 'Zakres sprawy',
        bez: 'Ustalany dopiero przy oddzwonieniu',
        zNami: 'Pytania z Twojego scenariusza',
      },
      {
        cecha: 'Termin konsultacji',
        bez: 'Ustalany w drugiej rozmowie',
        zNami: 'Zapisany w trakcie pierwszej',
      },
      {
        cecha: 'Zakres zapisu',
        bez: 'Co zdąży zanotować sekretariat',
        zNami: 'Tyle, ile ustalisz w scenariuszu',
      },
      {
        cecha: 'Sprawa nie dla Ciebie',
        bez: 'Konsultacja i tak zajmuje termin',
        zNami: 'Bot mówi to w rozmowie',
      },
      {
        cecha: 'Telefon do klienta',
        bez: 'Ręcznie, przez prawnika',
        zNami: 'Też ręcznie, bot nie dzwoni sam',
      },
    ],
  },

  /* Sekcja 5 z pakietu („Wdrożenie w kancelarii, krok po kroku"). Kontrakt typu
     wymusza dokładnie trzy kroki. Krok 1 opisuje bezpłatną rozmowę zgodnie
     z ustaleniem właściciela z 2026-08-31: badanie potrzeb, zero obietnicy
     raportu, audytu ani listy rzeczy do zrobienia. */
  kroki: {
    h2: 'Jak wdrażamy voicebota w kancelarii?',
    items: [
      {
        tytul: 'Rozmowa o zakresie (bezpłatna)',
        opis:
          'Obejrzymy, z jakimi sprawami do Ciebie dzwonią, i ustalimy, czego bot ma nie dotykać. Policzymy na Twoich liczbach, czy to się opłaca, i mówimy wprost, gdy nie.',
      },
      /* KONTROLA 2026-09-22 (ta sama wada, którą zdjęto z `dla-stomatologa`
         i `dla-przychodni`): krok mówił „Podłączamy numer i kalendarz", czyli
         obiecywał kalendarz w KAŻDYM wdrożeniu. Rama ceny na tej samej stronie
         mówi co innego: wersja prosta za 2500 zł netto kalendarza nie dotyka,
         a integracja to dopiero próg 5000 do 9000 zł netto. Warunek dopisany,
         żadnego nowego faktu. */
      {
        tytul: 'Scenariusz i tajemnica zawodowa',
        opis:
          'Spisujemy pytania kwalifikujące, listę spraw spoza zakresu i to, co ma zostać w zgłoszeniu. Numer kancelarii kierujemy na bota, a kalendarz konsultacji podłączamy w wersji z integracją. Próbne rozmowy prowadzimy razem z Tobą.',
      },
      {
        tytul: 'Odsłuch i poprawki',
        opis:
          'Czytasz transkrypcje pierwszych rozmów i mówisz, co ma brzmieć inaczej. Dwie rundy poprawek są w cenie wdrożenia, potem odbiór.',
      },
    ],
  },

  ramaCeny: {
    /* Sekcja 6 z pakietu: „widełki plus link do cennika". Ta strona NIE rozwija
       cennika (od tego jest `/uslugi/voiceboty/cennik`), więc zostają widełki,
       trzy pozycje kosztu i czas wdrożenia. Zero minut rozmowy, zero kosztu
       pierwszego roku, zero cen konkurencji.

       KONTROLA 2026-09-22, ZDUBLOWANY NAGŁÓWEK: h2 tej sekcji brzmiał
       DOKŁADNIE tak samo jak pytanie FAQ o cenę („Ile kosztuje voicebot dla
       kancelarii prawnej?"), czyli ten sam string stał na stronie dwa razy jako
       nagłówek. To ta sama wada, którą rodzic naprawił 2026-09-22 (trzy
       scalenia w `lib/uslugi/voiceboty.ts`) i którą rodzic rozwiązuje
       wariantem frazy: `ramaCeny.h2` „Ile kosztuje voicebot dla firmy?" wobec
       FAQ „Ile kosztuje voicebot?". Pytanie ZOSTAJE w FAQ, bo tylko stamtąd
       idzie do FAQPage JSON-LD; sekcja bierze krótszy wariant frazy, który i
       tak stoi w `queries` tej strony („voicebot dla kancelarii"). */
    h2: 'Ile kosztuje voicebot dla kancelarii?',
    tresc:
      'Stworzenie to 2500 zł netto jednorazowo za wersję prostą albo 5000 do 9000 zł netto za wersję z integracją do kalendarza kancelarii. Do tego dochodzi utrzymanie: 299 do 1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy przekazujemy ją Tobie. Trzecia pozycja to zużycie: minuty rozmów i tokeny według realnego użycia, po Twojej stronie.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '2500 zł netto',
            opis: 'stworzenie wersji prostej, płatne raz',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '5000 do 9000 zł netto',
            opis: 'wersja z integracją do kalendarza kancelarii',
            zrodlo: 'kapsuła na górze strony',
            ton: 'violet',
          },
          {
            wartosc: '3 do 5 dni roboczych',
            opis: 'tyle powstaje bot prosty, licząc od kompletu materiałów',
            zrodlo: 'sekcja o czasie wdrożenia niżej',
            ton: 'green',
          },
          {
            wartosc: '0 zł',
            opis: 'utrzymanie miesięczne po przekazaniu Ci infrastruktury',
            zrodlo: 'wiersz Utrzymanie w tabeli niżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Co płacisz raz, co miesięcznie, a co według użycia?',
        ikona: 'wykres-strzalka',
        chip: 'CENNIK',
        overline: 'TRZY OSOBNE POZYCJE, NIE JEDEN RYCZAŁT',
      },
      {
        typ: 'tabela',
        naglowki: ['Pozycja', 'Ile płacisz', 'Kiedy'],
        wiersze: [
          [
            'Stworzenie bota',
            '2500 zł netto za wersję prostą albo 5000 do 9000 zł netto z integracją do kalendarza',
            'raz, przy wdrożeniu',
          ],
          [
            'Utrzymanie',
            '299 do 1500 zł netto miesięcznie przy infrastrukturze u nas albo 0 zł po przekazaniu jej Tobie (poprawki wtedy 350 zł netto za godzinę)',
            'co miesiąc albo wcale',
          ],
          [
            'Zużycie',
            'minuty rozmów i tokeny według realnego użycia',
            'po Twojej stronie, wg użycia',
          ],
        ],
        wKarcie: true,
        podpis: 'Rachunek za voicebota kancelarii rozbity na trzy pozycje. Każda nasza kwota netto.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Od czego liczymy czas wdrożenia w kancelarii?',
        akapity: [
          'Od przekazania kompletu materiałów, nie od podpisania umowy. Bot prosty powstaje w 3 do 5 dni roboczych, wersja z integracją do kalendarza w 5 do 25 dni roboczych.',
        ],
        punkty: [
          'Lista spraw, które prowadzisz, i tych, których nie prowadzisz.',
          'Pytania kwalifikujące, które bot ma zadać, i ich kolejność.',
          'Zakres zgłoszenia: co z rozmowy ma zostać zapisane, a co nie.',
          'Dostęp do kalendarza, w którym mają stawać konsultacje.',
          'W cenie wdrożenia są dwie rundy poprawek, dopiero po nich odbiór.',
        ],
        wariant: 'edge',
        chip: 'CENNIK',
      },
    ],
    minPrice: 2500,
    /* CENA STAŁA: pole `cenaStala` celowo NIEUSTAWIONE. Voicebot to widełki
       (2500 zł netto albo 5000 do 9000 zł netto), więc kafel ceny w hero ma
       zostać z prefiksem „od", a mikrokopia pod kartą ceny bez zmian. */
    linkPoradnik: {
      przed: 'Całą arytmetykę, progi i koszt pierwszego roku rozpisaliśmy w ',
      etykieta: 'cenniku voicebota',
      po: '.',
      href: '/uslugi/voiceboty/cennik',
    },
  },

  /* Sekcja 8 z pakietu („FAQ kancelarii"). Pakiet nie podaje dla tej podstrony
     gotowych pytań (inaczej niż dla przychodni), więc pytania są nasze, ale
     każda odpowiedź stoi na fakcie z rodzica albo z kapsuły tej strony.
     KWOTY: świadomie ich tu NIE MA. Kwoty wolno stawiać tylko w sekcji ceny,
     w kapsule i w metadanych, więc pytanie o cenę wymienia trzy pozycje
     i odsyła wyżej oraz do cennika. */
  faq: [
    {
      pytanie: 'Czy voicebot udziela porady prawnej?',
      odpowiedz:
        'Nie. Bot nie ocenia sprawy, nie podaje podstaw prawnych ani terminów i nie mówi, jak sprawa się skończy. Zadaje pytania z Twojego scenariusza, spisuje zgłoszenie i umawia konsultację. Poradą zajmuje się prawnik.',
    },
    {
      pytanie: 'Co z tajemnicą zawodową, gdy telefon odbiera bot?',
      odpowiedz:
        'Zakres tego, co z rozmowy zostaje zapisane, ustalasz Ty, i to samo dotyczy czasu przechowywania. Bot pyta tylko o to, co jest w scenariuszu, i nie schodzi głębiej. Dane z rozmów zostają w Unii Europejskiej, a my podpisujemy umowę powierzenia.',
    },
    {
      pytanie: 'Czy dzwoniący wie, że rozmawia z asystentem AI?',
      odpowiedz:
        'Tak. Bot mówi to w pierwszym zdaniu, zanim padnie cokolwiek o sprawie. Tego wymaga AI Act. Rozmawia po polsku i brzmi naturalnie, ale nikogo nie udaje, więc nikt nie opowiada sprawy człowiekowi, którego po drugiej stronie nie ma.',
    },
    {
      pytanie: 'Czy voicebot dzwoni do klientów kancelarii?',
      odpowiedz:
        'Nie. Obsługuje wyłącznie połączenia przychodzące. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy. Sprawę do kontaktu zwrotnego bot zapisuje i oznacza, a telefon w drugą stronę wykonuje człowiek z kancelarii.',
    },
    {
      pytanie: 'Co bot robi ze sprawą spoza zakresu kancelarii?',
      odpowiedz:
        'Mówi to w rozmowie i nie umawia konsultacji, żeby nie zajmować Ci terminu. Listę spraw, których nie prowadzisz, spisujemy przy wdrożeniu. Zgłoszenie i tak zostaje zapisane, więc widzisz, z czym do Ciebie dzwonią.',
    },
    {
      pytanie: 'Ile kosztuje voicebot dla kancelarii prawnej?',
      odpowiedz:
        'Koszt dzieli się na trzy osobne pozycje, a nie na jeden abonament: stworzenie bota płatne raz, utrzymanie miesięczne albo brak abonamentu, gdy przekazujemy Ci infrastrukturę, oraz zużycie według realnego użycia po Twojej stronie. Widełki masz w sekcji o cenie na tej stronie, a pełną tabelę progów w cenniku voicebota.',
    },
  ],

  /* Sekcja 9 z pakietu. Jedna decyzja domykająca stronę: bezpłatna rozmowa
     o zakresie. Mikrokopia trzyma się ustalenia właściciela z 2026-08-31:
     obejrzymy i ustalimy zakres, żadnej obietnicy raportu ani audytu. */
  cta: {
    /* KONTROLA 2026-09-22: etykieta brzmiała „Policz moje nieodebrane
       zgłoszenia", czyli przycisk do bezpłatnej rozmowy zamawiał POMIAR ruchu
       w kancelarii. Ustalenie właściciela z 2026-08-31 mówi, że bezpłatna
       rozmowa to wyłącznie badanie potrzeb, bez pomiaru, audytu i raportu
       (wolno „obejrzymy", „ustalimy zakres", „policzymy na Twoich liczbach").
       Druga wada: „nieodebrane zgłoszenia" nie istnieją przed wdrożeniem, bo
       zgłoszenie spisuje dopiero bot. Etykieta wraca do wzorca głównego CTA
       serwisu („Pokaż mi, gdzie tracę czas"), zawężonego do tej strony. */
    label: 'Pokaż mi, gdzie tracę sprawy',
    href: '#diagnoza',
    mikrokopia:
      'Obejrzymy, z czym dzwonią do Twojej kancelarii, i ustalimy, czego bot ma nie dotykać. Bez zobowiązań.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej rozmowy o zakresie. Najpierw granice, potem scenariusz.',
  },

  queries: [
    'voicebot dla kancelarii prawnej',
    'voicebot dla kancelarii',
    'bot telefoniczny dla kancelarii',
    'voicebot dla adwokata',
    'voicebot dla radcy prawnego',
    'kto odbiera telefon w kancelarii podczas rozprawy',
  ],

  /* POWIĄZANIA (pakiet, PODSTRONA 5, sekcja 7: windykacja oraz RODO i AI Act,
     plus uwaga wdrożeniowa §7: każda nowa podstrona linkuje w górę do rodzica).
     Etykieta = h1 strony docelowej, opis = fakt, który stoi na tamtej stronie.
     ZERO KWOT w tych kartach (uwaga wdrożeniowa: kwoty wyłącznie w sekcji ceny,
     w kapsule i w metadanych). */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis:
          'Strona główna voicebotów: co bot załatwia sam w dowolnej firmie, jak wygląda wdrożenie i gdzie kończy się bot, a zaczyna człowiek.',
      },
      {
        etykieta: 'Voicebot a RODO i AI Act: co musi być spełnione',
        href: '/uslugi/voiceboty/rodo-ai-act',
        opis:
          'Pełny blok o danych: informowanie rozmówcy, zgoda na nagrywanie, umowa powierzenia i retencja nagrań, rozpisane w jednym miejscu.',
      },
      {
        etykieta: 'Voicebot do windykacji, który odbiera telefon 24/7',
        href: '/uslugi/voiceboty/windykacja',
        opis:
          'Druga strona telefonu w kancelarii: przychodzące rozmowy w sprawie zaległych płatności, ze spisanymi ustaleniami i sprawami spornymi u człowieka.',
      },
    ],
    poradniki: [
      {
        etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
        href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
        opis: 'Widełki 2026, od czego zależy cena i jak policzyć zwrot z wdrożenia.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Policz, ile rocznie kosztuje Cię obsługa pierwszych telefonów i ręczne wpisywanie konsultacji do grafiku.',
      },
    ],
  },
};
