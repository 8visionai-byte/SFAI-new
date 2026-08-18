import type { Post } from '../types';

/**
 * WPIS 3: Jak voicebot odbiera telefony, gdy pracujesz, i czy klienci to akceptują
 *
 * Treść (FAZA 4): answer-first, sekcje H2 jak pytania, tabela scenariuszy,
 * speed-to-lead, dane w UE. Głos Pawła: prosto, konkretnie, zero sygnałów AI.
 * Lead/meta/daty/kategoria/tagi/queries bez zmian (PRAWDZIWE ze stuba).
 */
export const jakVoicebotOdbieraTelefony: Post = {
  slug: 'jak-voicebot-odbiera-telefony',
  tytul: 'Jak voicebot odbiera telefony, gdy pracujesz, i czy klienci to akceptują',

  lead:
    'Voicebot odbiera połączenia, gdy nie możesz: przedstawia się jako asystent, odpowiada na proste pytania, zapisuje, kto dzwonił i w jakiej sprawie, a trudniejsze tematy przekazuje do Ciebie. Klienci akceptują go, gdy jest jawny, mówi naturalnie po polsku i szybko łączy z człowiekiem tam, gdzie to potrzebne. Najważniejsze, że nieodebrany telefon przestaje być utraconym klientem.',

  metaTitle: 'Jak voicebot odbiera telefony, gdy pracujesz',
  metaDescription:
    'Jak voicebot odbiera telefony, gdy pracujesz, i czy klienci to akceptują. Kiedy łączy z człowiekiem i co zrobić, żeby brzmiał naturalnie po polsku.',

  data: '2026-06-15',
  dataAktualizacji: '2026-06-15',
  kategoria: 'Voiceboty',
  tagi: ['voicebot', 'odbieranie telefonów', 'asystent głosowy', 'obsługa połączeń'],

  /* v22 (PLAN-v22 §2.2): ta sama treść, inne OPAKOWANIE. Wpis szedł dotąd jako
     ciąg <h2> i <p> bez ani jednej ramki. Teraz sekcje jadą w kartach
     `.inf-card` z tonem wpisu, tabela scenariuszy wjeżdża w kartę i dostaje
     widoczny <caption>, a cztery jednolinijkowe korzyści ze speed-to-lead
     siadają w STOPCE karty (dwie kolumny pod kreską, v22 §1.3) zamiast kolejnej
     luźnej listy pod akapitem.
     ŻELAZNE: ZERO zmian słów, kolejność merytoryczna 1:1, wszystkie H2 zostają
     H2, lista w stopce to nadal <ul><li>. Jedyny nowy widoczny napis to podpis
     tabeli, skopiowany znak w znak z nagłówka H2 tej strony. */
  tresc: [
    {
      typ: 'sekcja',
      naglowek: 'Co robi voicebot, gdy dzwoni klient, a Ty pracujesz?',
      akapity: [
        'Voicebot odbiera telefon zamiast poczty głosowej. Przedstawia się, pyta o sprawę, odpowiada na proste pytania i zapisuje, kto dzwonił i po co. Jeśli temat jest trudny albo klient chce człowieka, łączy z Tobą lub umawia kontakt. Dla klienta to różnica między czymś a niczym. Zamiast sygnału zajętości albo automatu z poczty słyszy konkretną odpowiedź.',
        'To jest sedno tego, jak my to widzimy. Chatbot odpowiada. Agent działa. Voicebot nie kończy na zdaniu „dziękujemy za telefon". On zapisuje lead, wysyła Ci powiadomienie i pcha sprawę dalej, żebyś po skończonej robocie miał gotową listę, a nie domysły, kto próbował się dodzwonić.',
      ],
    },

    {
      typ: 'sekcja',
      naglowek: 'Jak to działa technicznie i po ludzku?',
      wariant: 'edge',
      akapity: [
        'Po ludzku: ustawiasz przekierowanie z firmowego numeru na voicebota. Sam decydujesz kiedy. Po godzinach, w weekend, albo dopiero po piątym sygnale, gdy akurat nie podnosisz. Reszta dzieje się sama.',
        'Technicznie pod spodem są trzy klocki. Mowa zamieniana na tekst, model językowy, który rozumie sprawę i odpowiada po polsku, oraz głos, który czyta odpowiedź na głos. Do tego wpinamy Twoje dane: cennik, godziny otwarcia, kalendarz, najczęstsze pytania. Dzięki temu voicebot nie zmyśla, tylko mówi to, co naprawdę u Ciebie obowiązuje.',
      ],
      punkty: [
        'Odbiera połączenie i wita się Twoją formułką, jawnie jako asystent.',
        'Rozpoznaje, w jakiej sprawie dzwoni klient, i prowadzi rozmowę.',
        'Odpowiada na proste pytania z Twojej wiedzy: godziny, dojazd, zakres usług, ceny jeśli je podajesz.',
        'Zapisuje kontakt i notatkę ze sprawy, wysyła Ci powiadomienie.',
        'Umawia termin w kalendarzu albo przekazuje Ci sprawę do oddzwonienia.',
        'Gdy trzeba, łączy z żywym człowiekiem od razu.',
      ],
    },

    {
      typ: 'sekcja',
      naglowek: 'Czy klienci akceptują rozmowę z voicebotem?',
      akapity: [
        'Akceptują, jeśli spełnisz trzy warunki. Po pierwsze jawność: klient od początku wie, że rozmawia z asystentem, a nie z podstawioną osobą. Po drugie język: naturalny polski, bez sztywnego automatu i bez „wciśnij jeden". Po trzecie wyjście do człowieka: w każdej chwili można poprosić o połączenie i to działa. Brak choćby jednego z tych trzech to moment, w którym ludzie się rozłączają.',
        'Nie ma sensu udawać, że bot to recepcjonistka. To się zawsze wykłada i kosztuje zaufanie. Zdanie typu „dodzwoniłeś się do asystenta firmy, pomogę albo przełączę do zespołu" działa lepiej niż próba oszukania klienta. Ludzie nie mają problemu z botem. Mają problem z botem, który ich blokuje.',
      ],
    },
    {
      typ: 'cytat',
      tekst:
        'AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje. Voicebot nie jest po to, żeby Cię podmienić, tylko po to, żeby telefon przestał dzwonić w próżnię, gdy robisz swoje.',
    },

    {
      typ: 'sekcja',
      naglowek: 'Jakie scenariusze obsługuje voicebot?',
      akapity: [
        'Trzy sytuacje wracają najczęściej u małych firm. Voicebot odbiera, gdy jesteś zajęty. Umawia termin. Kwalifikuje, czy to w ogóle Twój klient. Tak to wygląda w skrócie.',
      ],
    },
    {
      typ: 'tabela',
      wKarcie: true,
      /* Podpis = nagłówek H2 sekcji nad tabelą, znak w znak. */
      podpis: 'Jakie scenariusze obsługuje voicebot?',
      naglowki: ['Scenariusz', 'Co robi voicebot', 'Co masz z tego Ty'],
      wiersze: [
        [
          'Odbiera, gdy nie podnosisz',
          'Wita się, słucha sprawy, zapisuje kontakt i notatkę',
          'Zero przegapionych telefonów, gotowa lista do oddzwonienia',
        ],
        [
          'Umawia spotkanie',
          'Sprawdza wolny termin w kalendarzu i rezerwuje go',
          'Kalendarz wypełnia się sam, bez przekładania słuchawki',
        ],
        [
          'Kwalifikuje zapytanie',
          'Pyta o zakres, lokalizację, budżet, termin',
          'Wiesz od razu, czy to gorący lead, czy zapytanie nie dla Ciebie',
        ],
        [
          'Odpowiada na proste pytania',
          'Podaje godziny, dojazd, zakres usług z Twojej wiedzy',
          'Mniej powtarzalnych telefonów o to samo',
        ],
      ],
    },

    {
      typ: 'sekcja',
      naglowek: 'Co to znaczy dla małej firmy: speed-to-lead',
      wariant: 'edge',
      akapity: [
        'Speed-to-lead to po prostu czas, w którym odpowiadasz na zapytanie. Im szybciej, tym większa szansa, że klient jest Twój. Kto dodzwonił się do Ciebie, ten zwykle dzwonił też do konkurencji. Wygrywa ten, kto odbierze pierwszy.',
        'Tu voicebot robi różnicę najmocniej. Pracujesz na budowie, u klienta, w gabinecie. Nie odbierzesz. Bot odbiera w sekundę, zapisuje sprawę i daje Ci znać. Ty oddzwaniasz, gdy masz chwilę, ale do osoby, która już dostała sensowną odpowiedź, a nie sygnał zajętości. Widzieliśmy podobny efekt przy lead generatorze, gdzie zebranie tysiąca rekordów zajęło czterdzieści minut zamiast dwóch tygodni. Zasada jest ta sama: maszyna robi rzecz natychmiast, człowiek wchodzi tam, gdzie liczy się decyzja.',
      ],
      /* Cztery jednolinijkowe korzyści idą w STOPKĘ karty (v22 §1.3): kreska
         rozdziału i dwie kolumny zamiast piątej z rzędu listy pod akapitem.
         To dalej <ul><li>, więc bot czyta je tak samo. Zdania 1:1. */
      stopka: [
        'Nieodebrany telefon przestaje znikać bez śladu.',
        'Każde połączenie zostawia kontakt i notatkę w jednym miejscu.',
        'Oddzwaniasz z kontekstem, a nie na ślepo.',
        'Konkurencja, która ma tylko pocztę głosową, traci tych klientów.',
      ],
    },

    {
      typ: 'sekcja',
      naglowek: 'Gdzie są przechowywane dane z rozmów?',
      wariant: 'quiet',
      akapity: [
        'Przy telefonach to nie jest temat poboczny. Dzwoniący podają nazwiska, adresy, czasem sprawy wrażliwe. Dlatego stawiamy na rozwiązania z przetwarzaniem danych w Unii Europejskiej i umowę powierzenia, zgodną z RODO. Klient ma prawo wiedzieć, że rozmawia z asystentem, a Ty masz prawo wiedzieć, gdzie te nagrania i transkrypcje lądują.',
        'W praktyce ustalamy, co bot zapisuje, jak długo to trzyma i kto ma do tego dostęp. Bez tego nawet najlepszy voicebot jest ryzykiem, a nie pomocą. To akurat jest do ułożenia raz, na starcie, i potem masz spokój.',
      ],
    },

    {
      typ: 'sekcja',
      naglowek: 'Ile to kosztuje i kiedy się opłaca?',
      akapity: [
        'Naszych stawek nie podajemy z cennika, bo wyceniamy od wartości, jaką to daje konkretnej firmie. Inaczej liczy się to dla jednoosobowej działalności, inaczej dla gabinetu z trzema telefonami naraz. Dla ram rynkowych: w 2026 uruchomienie voicebota mieści się orientacyjnie w przedziale około 500 do 5000 dolarów, a bieżąca opieka około 200 do 1000 dolarów miesięcznie. To kontekst rynkowy, nie nasza oferta.',
        'Liczbę, która naprawdę przesądza, masz u siebie. Policz, ile zapytań tracisz w tygodniu na nieodebranych telefonach i ile wart jest jeden klient. Jeśli przegapiony lead to dla Ciebie realne pieniądze, voicebot zwraca się szybko. Jeśli telefon dzwoni raz na ruski rok, daruj sobie. Tu nie chodzi o modę na AI, tylko o to, żeby przestać tracić ludzi, którzy już chcieli u Ciebie kupić.',
      ],
    },
  ],

  faq: [
    {
      pytanie: 'Czy klient pozna, że rozmawia z voicebotem?',
      odpowiedz:
        'Tak i tak ma być. Voicebot przedstawia się jako asystent na samym początku rozmowy. Jawność buduje zaufanie, a ukrywanie bota zawsze się wykłada. Klient w każdej chwili może poprosić o połączenie z człowiekiem.',
    },
    {
      pytanie: 'Co się dzieje, gdy sprawa jest zbyt trudna dla bota?',
      odpowiedz:
        'Voicebot łączy z żywym człowiekiem albo zapisuje kontakt i notatkę, żebyś oddzwonił. Nie zostawia klienta bez odpowiedzi. Ty dostajesz powiadomienie ze sprawą i oddzwaniasz z pełnym kontekstem, a nie na ślepo.',
    },
    {
      pytanie: 'Czy voicebot sam dzwoni do klientów?',
      odpowiedz:
        'Nie. Voicebot odbiera połączenia przychodzące i na tym się skupia. Nie robimy botów, które same wydzwaniają do ludzi. Gdy sprawa wymaga kontaktu zwrotnego, bot ją zapisuje i wysyła powiadomienie, można też ustawić SMS z numerem firmy. Rozmowę zaczyna człowiek albo klient, który oddzwania.',
    },
    {
      pytanie: 'Gdzie trafiają nagrania i dane z rozmów?',
      odpowiedz:
        'Stawiamy na przetwarzanie danych w Unii Europejskiej i umowę powierzenia zgodną z RODO. Na starcie ustalamy, co bot zapisuje, jak długo to trzyma i kto ma dostęp. Dzięki temu obsługa telefonu nie staje się ryzykiem dla danych Twoich klientów.',
    },
  ],

  queries: [
    'jak voicebot odbiera telefony',
    'voicebot dla firmy',
    'czy klienci akceptują voicebota',
    'asystent głosowy AI telefon',
  ],

  /* v22 (PLAN-v22 §2.2 pkt 4 i §3 P2 #10): koniec ślepego zaułka. Wpis wprost
     każe policzyć „ile zapytań tracisz w tygodniu na nieodebranych telefonach"
     i powołuje się na lead generator, a nie było do czego kliknąć.
     ŹRÓDŁA NAPISÓW (znak w znak z rejestrów): usługi = `h1` +
     `metaDescription` z lib/uslugi, narzędzia = `tytul` + `korzysc`
     z lib/narzedzia, poradniki = etykieta i opis z pól `powiazanePoradniki`
     rejestru poradników, realizacje = `h1` + `metaDescription`
     z lib/realizacje. */
  powiazaneUslugi: [
    {
      etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
      href: '/uslugi/voiceboty',
      opis: 'Voicebot dla firm od 2500 zł jednorazowo za wdrożenie, opieka od 99 zł/mies. Bot telefoniczny odbiera po polsku 24/7 i umawia wizyty. Bezpłatna diagnoza.',
    },
    {
      /* Podstrona voicebotów 1:1 z tematem wpisu (odbieranie połączeń).
         Etykieta = `h1`, opis = `metaDescription` z
         lib/uslugi/podstrony/odbieranie-telefonow.ts. */
      etykieta: 'Bot telefoniczny, który odbiera telefon 24/7',
      href: '/uslugi/voiceboty/odbieranie-telefonow',
      opis: 'Bot telefoniczny odbiera połączenia 24/7 po polsku, odpowiada na powtarzalne pytania i spisuje sprawę. Po rozmowie masz podsumowanie. Od 2500 zł za wdrożenie.',
    },
  ],

  powiazaneNarzedzia: [
    {
      etykieta: 'Czy warto zautomatyzować ten proces?',
      href: '/narzedzia#kalkulator-procesu',
      opis: 'Sprawdź, czy konkretna automatyzacja się spina.',
    },
  ],

  powiazanePoradniki: [
    {
      etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
      opis: 'Widełki 2026 dla agenta AI, od czego zależy cena i jak policzyć zwrot.',
    },
  ],

  powiazaneRealizacje: [
    {
      etykieta: 'Przechwytywanie i analiza rozmów',
      href: '/realizacje/transkrypcja-rozmow',
      opis: 'Transkrypcja rozmów AI: aplikacja spisuje i kategoryzuje rozmowy oraz wyłapuje kluczowe ustalenia bez ręcznego odsłuchiwania. Case study wdrożenia.',
    },
    {
      etykieta: 'Błyskawiczny generator leadów',
      href: '/realizacje/lead-generator',
      opis: 'Automat do pozyskiwania leadów: 1000 rekordów potencjalnych klientów w 40 minut zamiast 2 tygodni ręcznej pracy. Case study, gotowa lista dla sprzedaży.',
    },
  ],
};
