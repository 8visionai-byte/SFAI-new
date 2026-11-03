/**
 * PORADNIK: Co to jest voicebot i jak działa w firmie (fala 2 SEO, 2026-11-03).
 *
 * PO CO: fraza „voicebot" ma 118 wyświetleń w 28 dni na pozycji 25 (GSC
 * 06.10-02.11), „voicebot ai" 27 na 19,5, „voiceboty" 20 na 17,6. Rodzic
 * /uslugi/voiceboty to strona oferty; w Google.pl (03.11) na „co to jest
 * voicebot" stronę 1 zajmują artykuły definicyjne (altar, sovva, ccig, stormit,
 * xomedia), także domeny słabsze od nas. Ten poradnik bierze intencję
 * informacyjną, a ofertę i ceny zostawia rodzicowi i cennikowi (linki niżej),
 * żeby nie konkurować z nimi o te same frazy.
 *
 * ŹRÓDŁA FAKTÓW (zero nowych liczb, wszystko już stoi w serwisie):
 *  - nazwy (bot telefoniczny, agent głosowy, asystent telefoniczny AI), „nie
 *    nagranie ani menu wciśnij jeden": lib/uslugi/voiceboty.ts, faq „Czym jest voicebot?"
 *  - cztery kroki (słyszy, rozumie, działa, odpowiada): voiceboty.ts, sekcja
 *    „Jak działa voicebot w czterech krokach?"
 *  - trudna sprawa: „nie udaje, że wie", kontakt, podsumowanie, oddzwonienie:
 *    voiceboty.ts, faq „Co, jeśli sprawa jest zbyt trudna dla bota?"
 *  - tylko połączenia przychodzące, nie wydzwania: voiceboty.ts faq + cennik
 *  - zapowiedź AI w pierwszym zdaniu, odpowiedź wprost, nagrywanie tylko na
 *    życzenie, administrator / podmiot przetwarzający, prośba o człowieka:
 *    lib/uslugi/podstrony/rodo-ai-act.ts
 *  - przychodnia (nie rozmawia o zdrowiu), kancelaria (nie udziela porady
 *    prawnej): dla-przychodni.ts, dla-kancelarii.ts
 *  - ceny 2500 / 5000-9000 zł netto, 299-1500 zł netto albo 0 zł, zużycie
 *    bezpośrednio u dostawców bez marży, czasy 3-5 / 5-25 dni roboczych:
 *    voiceboty.ts, voiceboty-cennik.ts
 *  - pięć sytuacji „kiedy się nie opłaca": voiceboty-cennik.ts, sekcja
 *    „Kiedy voicebota lepiej nie kupować?"
 *  - Sprint Diagnostyczny 1490 zł netto, 5 dni roboczych, odliczany: audyt-ai.ts
 * Świadomie POMINIĘTE: zdanie o danych w UE (decyzja Pawła w toku, STATUS
 * naprawy 13.10, otwarta decyzja nr 1), daty AI Act, liczby opóźnień.
 */
import type { Poradnik } from '../types';

export const coToJestVoicebot: Poradnik = {
  slug: 'co-to-jest-voicebot',
  tytul: 'Co to jest voicebot i jak działa w firmie',

  lead:
    'Voicebot to program, który odbiera telefon i rozmawia z dzwoniącym po polsku zwykłymi zdaniami. Rozumie pytanie, odpowiada głosem i załatwia sprawę: zapisuje wizytę w kalendarzu albo spisuje zgłoszenie dla człowieka. Od menu „wciśnij jeden" różni się tym, że nie każe wciskać klawiszy, a od chatbota tym, że mówi, a nie pisze.',

  /* 42 znaki + sufiks marki z layoutu (" · SimpleFast.ai") = 58. */
  metaTitle: 'Co to jest voicebot i jak działa w firmie?',
  metaDescription:
    'Co to jest voicebot, jak działa krok po kroku, czym różni się od chatbota i IVR, jak rozpoznać rozmowę z botem i kiedy voicebot się nie opłaca.',

  data: '2026-11-03',
  dataAktualizacji: '2026-11-04',
  kategoria: 'Automatyzacja',
  tagi: ['voicebot', 'co to jest voicebot', 'bot telefoniczny', 'asystent telefoniczny AI'],

  tresc: [
    {
      typ: 'naglowek',
      tekst: 'Co to jest voicebot?',
    },
    {
      typ: 'akapit',
      tekst:
        'Voicebot to bot głosowy, który odbiera połączenie i prowadzi rozmowę jak asystent: odpowiada na pytania, umawia wizyty i przyjmuje zgłoszenia. Spotkasz go pod kilkoma nazwami: bot telefoniczny, bot głosowy, agent głosowy albo asystent telefoniczny AI. Chodzi o to samo: program, który słucha, rozumie i odpowiada głosem.',
    },
    {
      typ: 'akapit',
      tekst:
        'Voicebot to nie nagranie, które odtwarza ten sam komunikat. To też nie menu „wciśnij jeden, żeby…" i nie automatyczna sekretarka, która tylko zbiera wiadomości. Rozmówca mówi własnymi słowami, a bot odpowiada na to, o co naprawdę zapytał.',
    },

    {
      typ: 'naglowek',
      tekst: 'Jak działa voicebot krok po kroku?',
    },
    {
      typ: 'akapit',
      tekst:
        'Rozmówca mówi zwykłym zdaniem, jak do człowieka. W tym czasie bot przechodzi przez cztery kroki, a cała pętla powtarza się przy każdym zdaniu rozmowy.',
    },
    {
      typ: 'kroki',
      wariant: 'os',
      kroki: [
        {
          tytul: 'Słyszy',
          opis: 'Zamienia mowę rozmówcy na tekst.',
        },
        {
          tytul: 'Rozumie',
          opis: 'Model językowy czyta pytanie i szuka odpowiedzi w bazie wiedzy o firmie, którą wcześniej zatwierdza właściciel.',
        },
        {
          tytul: 'Działa',
          opis: 'Zapisuje wizytę w kalendarzu, spisuje sprawę albo przekazuje ją człowiekowi.',
        },
        {
          tytul: 'Odpowiada',
          opis: 'Mówi naturalnym głosem po polsku i prowadzi rozmowę dalej.',
        },
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Co robi voicebot, gdy nie zna odpowiedzi?',
      akapity: [
        'Dobrze ustawiony voicebot nie udaje, że wie. Bierze kontakt, zapisuje, czego dotyczy sprawa, i mówi rozmówcy, że ktoś oddzwoni. Właściciel dostaje podsumowanie rozmowy i oddzwania przygotowany.',
        'Dlatego najważniejszą częścią wdrożenia nie jest głos, tylko baza wiedzy: im lepiej spisane godziny, cennik i zasady firmy, tym mniej spraw trafia do oddzwonienia.',
      ],
      wariant: 'quiet',
      chip: 'ZASADA',
    },

    {
      typ: 'naglowek',
      tekst: 'Voicebot, chatbot i IVR: czym się różnią?',
    },
    {
      typ: 'tabela',
      naglowki: ['', 'IVR (menu tonowe)', 'Chatbot', 'Voicebot'],
      wiersze: [
        ['Jak rozmawia', 'Każe wciskać klawisze', 'Pisze na stronie i w komunikatorach', 'Mówi i słucha przez telefon'],
        ['Pytanie spoza scenariusza', 'Nie zrozumie', 'Odpowie z bazy wiedzy firmy', 'Odpowie z bazy wiedzy firmy'],
        ['Trudna sprawa', 'Kolejka do konsultanta', 'Przekazanie człowiekowi', 'Notatka i oddzwonienie przez człowieka'],
        ['Kanał', 'Telefon', 'Strona WWW, WhatsApp, Messenger, Instagram, Telegram', 'Telefon'],
      ],
      wKarcie: true,
      podpis: 'Voicebot, chatbot i IVR: czym się różnią?',
    },
    {
      typ: 'akapit',
      tekst:
        'W skrócie: IVR rozdziela połączenia, chatbot odpowiada na piśmie, a voicebot rozmawia przez telefon. Wiele firm zaczyna od chatbota na stronie, a voicebota dokłada wtedy, gdy telefon dzwoni częściej, niż ktoś może go odebrać.',
    },

    {
      typ: 'naglowek',
      tekst: 'Do czego firmy używają voicebota?',
    },
    {
      typ: 'lista',
      punkty: [
        'Odbieranie telefonów po godzinach, w weekend i wtedy, gdy wszyscy są zajęci.',
        'Umawianie i potwierdzanie wizyt, z zapisem prosto do kalendarza.',
        'Telefony w sprawie płatności: bot odbiera, spisuje ustalenia, a sprawy sporne oddaje człowiekowi.',
        'Rejestracja przychodni, czyli voicebot medyczny: zapisuje na wolny termin, ale o zdrowiu nie rozmawia.',
        'Gabinet stomatologiczny, kancelaria prawna, salon i serwis samochodowy: każda branża ma swój scenariusz rozmowy.',
      ],
    },

    {
      typ: 'sekcja',
      naglowek: 'Czego voicebot nie zrobi?',
      akapity: [
        'Voicebot przejmuje powtarzalne rozmowy, a nie całą komunikację firmy. Granice ustala się na starcie i trzeba je znać, zanim się go kupi.',
      ],
      punkty: [
        'Nie poprowadzi negocjacji ani rozmowy pełnej emocji. Przekaże ją człowiekowi.',
        'W przychodni nie rozmawia o zdrowiu: sprawy wyników i objawów przekazuje rejestracji.',
        'W kancelarii nie udziela porady prawnej i nie ocenia sprawy, tylko spisuje zgłoszenie i umawia konsultację.',
        'Nasze voiceboty nie wydzwaniają do ludzi. Obsługują wyłącznie połączenia przychodzące.',
      ],
      wariant: 'quiet',
      chip: 'GRANICE',
    },

    {
      typ: 'naglowek',
      tekst: 'Dlaczego dzwonią do Ciebie boty i jak rozpoznać rozmowę z AI?',
    },
    {
      typ: 'akapit',
      tekst:
        'Boty, które dzwonią same, to zwykle kampanie, ankiety albo przypomnienia wysyłane przez firmy. To połączenia wychodzące. Voicebot, o którym mówi ten poradnik, robi coś odwrotnego: odbiera, kiedy to Ty dzwonisz do firmy.',
    },
    {
      typ: 'akapit',
      tekst:
        'Rozmowę z AI najłatwiej rozpoznać, pytając wprost: „czy rozmawiam z człowiekiem?". Uczciwie ustawiony bot odpowiada na takie pytanie wprost. Nasze voiceboty mówią to same, w pierwszym zdaniu, zanim padnie pytanie o sprawę, i nie podają ludzkiego imienia bez zaznaczenia, że są asystentem głosowym.',
    },
    {
      typ: 'akapit',
      tekst:
        'Zawsze możesz też poprosić o człowieka. W dobrze wdrożonym voicebocie taka prośba działa od razu: w godzinach pracy bot przełącza rozmowę, a poza nimi spisuje sprawę i kontakt, żeby zespół oddzwonił.',
    },

    {
      typ: 'sekcja',
      naglowek: 'Czy voicebot jest legalny?',
      akapity: [
        'Tak, pod warunkiem że jest dobrze ustawiony. Administratorem danych z rozmów zostaje firma, która wdraża bota, a wykonawca przetwarza je na jej polecenie, na podstawie umowy powierzenia.',
        'Bot mówi na początku rozmowy, że jest systemem AI. Nagrywanie to osobna decyzja: można je wyłączyć, a rozmówca, który nie zgadza się na nagranie, i tak załatwi sprawę. Szczegóły opisaliśmy na stronie o voicebocie, RODO i AI Act.',
      ],
      wariant: 'quiet',
      chip: 'PRAWO',
    },

    {
      typ: 'naglowek',
      tekst: 'Ile kosztuje voicebot?',
    },
    {
      typ: 'akapit',
      tekst:
        'U nas voicebot to trzy osobne pozycje. Budowa jest płatna raz: 2500 zł netto za bota prostego albo 5000-9000 zł netto za bota z integracjami, na przykład z kalendarzem. Utrzymanie to 299-1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy ją przekazujemy. Minuty rozmów i tokeny płacisz bezpośrednio dostawcom, bez naszej marży. Pełne zestawienie, razem z kosztem pierwszego roku, jest w cenniku voicebota.',
    },

    {
      typ: 'sekcja',
      naglowek: 'Kiedy voicebot się nie opłaca?',
      akapity: [
        'Wolimy stracić zlecenie niż wziąć pieniądze za bota, którego ktoś wyłączy po trzech miesiącach. Voicebot nie ma sensu, gdy:',
      ],
      punkty: [
        'dostajesz kilka telefonów dziennie: przekierowanie na komórkę i chatbot na stronie załatwią to taniej,',
        'Twoje rozmowy to głównie negocjacje i emocje: bot przekaże sprawę człowiekowi, ale jej nie poprowadzi,',
        'nie masz kalendarza ani systemu, do którego bot miałby cokolwiek zapisać,',
        'Twoje procesy zmieniają się co tydzień: bot to spisana instrukcja, więc płaciłbyś głównie za jej przepisywanie,',
        'szukasz bota, który sam wydzwania do klientów: takich nie budujemy.',
      ],
      wariant: 'quiet',
      chip: 'UCZCIWIE',
    },

    {
      typ: 'naglowek',
      tekst: 'Jak zacząć z voicebotem?',
    },
    {
      typ: 'akapit',
      tekst:
        'Pierwsza rozmowa jest bezpłatna i służy zbadaniu potrzeb: jak dziś działa Twój telefon i co bot miałby załatwiać sam. Gdy chcesz mieć wszystko rozpisane przed decyzją, robimy Sprint Diagnostyczny: 1490 zł netto, 5 dni roboczych i raport PDF, a kwotę odliczamy od wdrożenia. Sama budowa trwa 3-5 dni roboczych przy bocie prostym albo 5-25 dni roboczych przy bocie z integracjami, licząc od przekazania kompletu materiałów.',
    },
  ],

  faq: [
    {
      pytanie: 'Jak sprawdzić, czy rozmawiam z botem?',
      odpowiedz:
        'Zapytaj wprost, czy rozmawiasz z człowiekiem. Uczciwie ustawiony voicebot odpowiada na to pytanie wprost, a dobry mówi to sam w pierwszym zdaniu rozmowy. Nasze voiceboty zapowiadają, że są asystentem AI, zanim padnie pytanie o sprawę.',
    },
    {
      pytanie: 'Po co dzwonią do mnie boty?',
      odpowiedz:
        'Boty, które dzwonią same, to zwykle kampanie, ankiety i przypomnienia wysyłane przez firmy, czyli połączenia wychodzące. Voicebot do obsługi klienta działa odwrotnie: odbiera, gdy to Ty dzwonisz do firmy. My budujemy wyłącznie takie, które odbierają.',
    },
    {
      pytanie: 'Czy mogę poprosić o rozmowę z człowiekiem?',
      odpowiedz:
        'Tak, i w dobrze wdrożonym voicebocie ta prośba działa zawsze. W godzinach pracy bot przełącza rozmowę od razu, bez pętli pytań kontrolnych. Poza godzinami spisuje sprawę i kontakt, a zespół firmy oddzwania.',
    },
    {
      pytanie: 'Jak rozmawiać z voicebotem, żeby szybko załatwić sprawę?',
      odpowiedz:
        'Mów normalnie, pełnym zdaniem, i od razu powiedz, w jakiej sprawie dzwonisz, na przykład „chcę umówić wizytę w czwartek po południu". Bot nie potrzebuje słów-kluczy ani klawiszy. Gdy sprawa jest nietypowa, poproś o przekazanie jej człowiekowi.',
    },
    {
      pytanie: 'Czy voicebot rozmawia po polsku?',
      odpowiedz:
        'Tak. Nasze voiceboty rozmawiają po polsku naturalnym głosem i rozumieją zwykłe zdania, a nie tylko gotowe komendy. Odpowiadają na podstawie bazy wiedzy o Twojej firmie, którą przed startem zatwierdzasz.',
    },
    {
      pytanie: 'Czy voicebot zastąpi recepcję?',
      odpowiedz:
        'Nie całą. Przejmuje powtarzalne telefony: pytania o godziny, umawianie wizyt, przyjmowanie zgłoszeń i odbieranie po godzinach. Sprawy trudne, sporne i pełne emocji przekazuje człowiekowi z notatką, więc recepcja ma mniej telefonów, a nie mniej pracy przy ważnych sprawach.',
    },
  ],

  queries: [
    'co to jest voicebot',
    'voicebot co to',
    'jak działa voicebot',
    'voicebot a chatbot',
    'jak rozpoznać bota w telefonie',
    'voicebot',
  ],

  powiazaneUslugi: [
    {
      etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
      href: '/uslugi/voiceboty',
      opis: 'Voicebot dla firm: co załatwia w rozmowie, jak go wdrażamy i ile to trwa.',
    },
    {
      etykieta: 'Ile kosztuje voicebot w Polsce w 2026 roku',
      href: '/uslugi/voiceboty/cennik',
      opis: 'Budowa 2500 zł netto albo 5000-9000 zł netto, utrzymanie 299-1500 zł netto miesięcznie albo 0 zł, zużycie osobno.',
    },
    {
      etykieta: 'Bot telefoniczny, który odbiera telefon 24/7',
      href: '/uslugi/voiceboty/odbieranie-telefonow',
      opis: 'Voicebot do odbierania telefonów po godzinach, w weekend i przy pełnym obłożeniu.',
    },
    {
      etykieta: 'Voicebot a RODO i AI Act: co musi być spełnione',
      href: '/uslugi/voiceboty/rodo-ai-act',
      opis: 'Zapowiedź AI na starcie rozmowy, nagrywanie, administrator danych i umowa powierzenia.',
    },
    {
      etykieta: 'Voicebot dla przychodni, który zawsze odbiera telefon',
      href: '/uslugi/voiceboty/dla-przychodni',
      opis: 'Voicebot medyczny w rejestracji: zapisuje na wolny termin, o zdrowiu nie rozmawia.',
    },
  ],

  powiazanePoradniki: [
    {
      etykieta: 'Co to jest chatbot AI i jak działa w firmie',
      href: '/poradniki/co-to-jest-chatbot',
      opis: 'Bot, który odpowiada na piśmie: rodzaje, jak działa i czym różni się od voicebota.',
    },
    {
      etykieta: 'Ile kosztuje agent AI dla firmy? Cennik wdrożenia 2026',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
      opis: 'Voicebot to jeden z agentów AI. Tu porównanie cen agentów na czacie, w telefonie i w procesach.',
    },
  ],
};
