import type { Usluga } from './types';

/**
 * USŁUGA — AUDYT AI (Sprint Diagnostyczny).
 * Top-funnel, niski próg wejścia. Płatny audyt 1490 zł ODLICZANY od wdrożenia,
 * gdy wejdzie współpraca. Deliverable: Action Plan (mapa oszczędności czasu).
 * Pozycjonowanie: nie sprzedajemy wdrożenia na ślepo. Najpierw mapa, gdzie AI
 * da zysk, a gdzie to przepalanie kasy. Answer-first, głos Pawła, zero em-dash,
 * zero zmyślonych liczb. Realna cena 1490 zł jest podana (Paweł ją potwierdził).
 *
 * CENNIK OBOWIĄZUJĄCY (audyt `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §3,
 * kwota NETTO): 1490 zł netto, 5 dni roboczych, raport PDF z mapą procesów,
 * kwota odliczana od wdrożenia. Audyt §3: obaj konkurenci z top10 (agisona.pl,
 * multi-future.pl) NIE podają ani ceny, ani terminu, więc jawna cena z terminem
 * i nazwanym dokumentem jest tu przewagą, która świetnie się cytuje.
 * Czas liczymy OD PRZEKAZANIA KOMPLETU MATERIAŁÓW przez klienta (audyt §1),
 * nie od podpisania umowy.
 *
 * INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane):
 *  - cta.dowod: realna liczba z audytu (np. ile godzin/mc znaleziono u klienta)
 *    ALBO case z liczbą + zgodą. Do tego czasu uczciwe zdanie o Sprincie.
 *  - ewentualny przykład procesu z konkretną oszczędnością (szac.) do sekcji problem.
 */
export const audytAi: Usluga = {
  slug: 'audyt-ai',
  dataAktualizacji: '2026-08-19',
  h1: 'Audyt AI firmy: mapa oszczędności czasu',

  /* BLOK KRÓTKIEJ ODPOWIEDZI (audyt §9 etap 1 pkt 2): kapsuła miała 1 z 4
     wielkości (samą cenę). Dochodzi termin w dniach roboczych i nazwany
     dokument wyjściowy, czyli dokładnie to, czego nie podaje żaden konkurent
     w tym obszarze. */
  kapsula:
    'Audyt AI firmy to płatny Sprint Diagnostyczny za 1490 zł netto, który trwa 5 dni roboczych i kończy się raportem PDF z mapą procesów. Rozkładamy Twoje procesy na czynniki i pokazujemy, gdzie AI da realny zysk, a gdzie to przepalanie kasy. Dostajesz Action Plan: miejsca do automatyzacji ułożone od największego zwrotu. Kwotę 1490 zł netto odliczamy od wdrożenia, gdy ruszamy z robotą. Najpierw mapa, potem decyzja, dopiero potem wydatek.',

  metaTitle: 'Audyt AI firmy: co zautomatyzować i za ile',
  metaDescription:
    'Audyt AI za 1490 zł netto, 5 dni roboczych, raport PDF z mapą procesów. Mówimy, gdzie AI się opłaci, a gdzie nie. Cena odlicza się od wdrożenia.',

  problem: {
    h2: 'Skąd wiesz, gdzie wdrożyć AI, żeby nie przepalić kasy?',
    tresc:
      'Bez mapy procesów nie wiesz, gdzie wdrożyć AI w firmie, więc strzelasz na ślepo. Każda zła decyzja to wydane pieniądze, stracony czas i zniechęcenie, że AI to ściema.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Gdzie firmy przepalają budżet na AI?',
      },
      {
        typ: 'lista',
        punkty: [
          'Kupujesz narzędzie, bo było modne i wszyscy o nim mówili. Po miesiącu nikt w firmie go nie używa, a Ty dalej płacisz za coś, co niczego nie zmienia w codziennej pracy.',
          'Automatyzujesz proces, który zdarza się raz na kwartał, bo akurat rzucił Ci się w oczy. Ten codzienny, który naprawdę zjada Twój czas, dalej robisz ręcznie.',
          'Wszyscy mówią, że trzeba wdrażać AI, ale nikt nie mówi gdzie. Więc decyzje zapadają na ślepo: pod wpływem reklamy, mody albo presji, a nie Twoich realnych procesów.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Problem nie w tym, że AI nie działa. Problem w tym, że nikt Ci nie pokazał, gdzie zacząć. Do tego służy mapa oszczędności czasu: zanim cokolwiek zamówisz, widzisz czarno na białym, gdzie AI da zysk, a gdzie nie.',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co dokładnie dostajesz w Sprincie Diagnostycznym?',
    tresc:
      'Dostajesz Action Plan, czyli raport PDF z mapą procesów ułożoną od największego zwrotu z automatyzacji. Plan jest Twój, nawet jeśli wdrażasz go potem sam albo z kimś innym.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'akapit',
        tekst: 'Siadamy do Twoich procesów i patrzymy, na czym naprawdę schodzi czas: maile, oferty, faktury, umawianie, raporty, obsługa pytań. Nie zaczynamy od narzędzi, zaczynamy od Twojej codziennej roboty.',
      },
      {
        typ: 'naglowek',
        tekst: 'Po czym układamy kolejność wdrożeń?',
      },
      {
        typ: 'akapit',
        tekst: 'Po dwóch ocenach: zysku z automatyzacji i trudności wdrożenia. Wygrywa to, co da najwięcej najmniejszym kosztem. W Action Planie znajdziesz:',
      },
      {
        typ: 'lista',
        punkty: [
          'Każdy proces oceniony pod kątem zysku z automatyzacji i trudności wdrożenia: ile zżera czasu i ile realnie odda jego automatyzacja.',
          'Kolejność wdrożeń: to, co da dużo małym kosztem, ląduje na górze listy. Wiesz, od czego zacząć, żeby pierwszy krok dał szybki zwrot.',
          'Lista rzeczy, których nie ruszać. Jeśli coś jest przepalaniem kasy, mówimy to wprost, zamiast dopisywać do oferty.',
          'Konkretne kroki: co i w jakiej kolejności wdrożyć, żeby dało się zrealizować plan bez zgadywania.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy po audycie muszę u Was wdrażać?',
        wariant: 'quiet',
        chip: 'ZASADA',
        akapity: [
          'Nie. Plan jest Twój i realizujesz go sam, z nami albo z kimkolwiek zechcesz. Nie sprzedajemy wdrożenia na siłę ani na ślepo.',
          'Jeśli z planu wyjdzie, że coś jest przepalaniem kasy albo najtaniej zrobisz to samemu, powiemy to wprost. Taka jest umowa: najpierw mapa, potem Twoja decyzja.',
        ],
        stopka: [
          'Gdy wdrażasz z nami, 1490 zł netto za audyt odliczamy od kosztu wdrożenia.',
        ],
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Wdrażanie AI na czuja a Sprint Diagnostyczny',
    naglowekBez: 'Wdrażanie na czuja',
    naglowekZNami: 'Sprint Diagnostyczny od SimpleFast.ai',
    wiersze: [
      { cecha: 'Punkt startu', bez: 'Modne narzędzie z reklamy', zNami: 'Twoje realne procesy' },
      { cecha: 'Wybór procesu', bez: 'Zgadywanie, co automatyzować', zNami: 'Mapa od największego zwrotu' },
      { cecha: 'Ryzyko', bez: 'Płacisz, zanim wiesz, czy działa', zNami: 'Najpierw wiedza, potem wydatek' },
      { cecha: 'Efekt', bez: 'Narzędzie, którego nikt nie używa', zNami: 'Action Plan z priorytetami' },
      /* 2026-08-19: kwota oznaczona jako netto (audyt §9 etap 1 pkt 4). Treść
         wiersza poza tym bez zmian. */
      { cecha: 'Koszt audytu', bez: 'Stracony czas na próby', zNami: '1490 zł netto, odliczane od wdrożenia' },
      { cecha: 'Decyzja', bez: 'Pod presją sprzedawcy', zNami: 'Po Twojej stronie, na spokojnie' },
      /* 2026-08-19 (audyt §3): DOŁOŻONY wiersz z terminem w dniach roboczych.
         Konkurenci z top10 piszą „wycena indywidualna po bezpłatnej
         konsultacji" i nie podają żadnego terminu. */
      { cecha: 'Termin', bez: 'Nie wiadomo, kiedy koniec', zNami: '5 dni roboczych, raport PDF' },
    ],
  },

  kroki: {
    h2: 'Jak wygląda audyt AI krok po kroku?',
    items: [
      {
        tytul: 'Rozmowa i zebranie procesów',
        opis:
          'Pytamy, jak działa firma i na czym schodzi czas. Spisujemy procesy, które się powtarzają. Nie musisz nic przygotowywać, prowadzimy Cię pytaniami.',
      },
      {
        tytul: 'Analiza i priorytety',
        opis:
          'Każdy proces oceniamy: ile zżera czasu, jaki da zysk z automatyzacji i jak trudno to wdrożyć. Układamy od najlepszego zwrotu do najgorszego.',
      },
      {
        tytul: 'Action Plan',
        opis:
          'Po 5 dniach roboczych dostajesz raport PDF z mapą procesów: co wdrożyć, w jakiej kolejności i co odpuścić. Plan jest Twój. Gdy ruszamy z wdrożeniem, 1490 zł netto odliczamy od jego kosztu.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje audyt AI firmy?',
    tresc:
      'Audyt AI firmy, czyli Sprint Diagnostyczny, kosztuje 1490 zł netto, trwa 5 dni roboczych i kończy się raportem PDF z mapą procesów. Całą kwotę odliczamy od kosztu wdrożenia, gdy zdecydujesz się z nami współpracować.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'kafle',
        kafle: [
          {
            wartosc: '1490 zł netto',
            opis: 'cena audytu, płatność jednorazowa',
          },
          {
            wartosc: '5 dni roboczych',
            opis: 'od przekazania kompletu materiałów (opisy procesów i dostępy), nie od podpisania umowy',
          },
          {
            wartosc: '1 raport PDF',
            opis: 'Action Plan: mapa procesów od największego zwrotu',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy audyt AI się opłaca?',
        wariant: 'top',
        chip: 'CENNIK',
        akapity: [
          'To celowo niski próg wejścia. Sprawdzasz, czy AI w Twojej firmie ma sens, bez wchodzenia od razu w duże wdrożenie i bez zamrażania dużego budżetu.',
          'Jeśli wdrażasz z nami, 1490 zł netto odliczamy w całości od kosztu wdrożenia. W praktyce audyt nic Cię wtedy nie kosztuje.',
          'Jeśli nie wdrażasz, i tak wychodzisz z gotowym Action Planem, który możesz zrealizować sam albo z kimkolwiek zechcesz.',
        ],
      },
      {
        typ: 'tabela',
        naglowki: [
          'Model po wdrożeniu',
          'Opłata miesięczna',
        ],
        wiersze: [
          [
            'Przekazanie infrastruktury Tobie',
            '0 zł abonamentu',
          ],
          [
            'Projekt zostaje u nas pod opieką: chatboty',
            'od 99 zł netto/mies.',
          ],
          [
            'Projekt zostaje u nas pod opieką: voiceboty',
            'od 299 zł netto/mies.',
          ],
        ],
        wKarcie: true,
        podpis: 'Dwa modele rozliczenia po wdrożeniu. Sam audyt to płatność jednorazowa 1490 zł netto.',
      },
    ],
    minPrice: 1490,
    /* SEO 2026-08-17: linkowanie wewnętrzne do poradnika cenowego (zdanie 1:1
       z brief-seo-2026-08-17; render w RamaCeny.tsx w tym samym akapicie). */
    linkPoradnik: {
      przed: 'Jak liczyć zwrot z wdrożenia AI, opisaliśmy w ',
      etykieta: 'poradniku o kosztach agenta AI',
      po: '.',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
    },
  },

  faq: [
    {
      pytanie: 'Ile kosztuje audyt AI firmy?',
      odpowiedz:
        'Audyt, czyli Sprint Diagnostyczny, kosztuje 1490 zł netto, trwa 5 dni roboczych i kończy się raportem PDF z mapą procesów. Tę kwotę odliczamy od kosztu wdrożenia, jeśli zdecydujesz się z nami współpracować. Czyli jeśli wdrażasz, audyt w praktyce nic Cię nie kosztuje. A jeśli nie wdrażasz, zostaje Ci gotowy Action Plan, który możesz zrealizować sam.',
    },
    {
      pytanie: 'Co dokładnie dostaję po audycie?',
      odpowiedz:
        'Dostajesz Action Plan, czyli mapę oszczędności czasu. Jest w nim lista Twoich procesów oceniona pod kątem zysku z automatyzacji, ułożona od największego zwrotu do najmniejszego. Wiesz, co wdrożyć, w jakiej kolejności i czego nie ruszać, bo to przepalanie kasy. Plan jest Twój, nawet jeśli wdrażasz go potem sam.',
    },
    {
      pytanie: 'Po co płacić za audyt, skoro mogę od razu wdrażać?',
      odpowiedz:
        'Bo wdrażanie na ślepo kosztuje więcej niż audyt. Kupujesz narzędzie, którego nikt nie używa, albo automatyzujesz proces, który zdarza się raz na kwartał. Audyt za 1490 zł netto pokazuje, gdzie AI da realny zysk, zanim wydasz duże pieniądze. A że odliczamy go od wdrożenia, ryzyko jest po naszej stronie, nie Twojej.',
    },
    {
      pytanie: 'Czy po audycie muszę u Was wdrażać?',
      odpowiedz:
        'Nie. Action Plan jest Twój i możesz go zrealizować sam albo z kimkolwiek zechcesz. Nie sprzedajemy wdrożenia na siłę. Jeśli z planu wyjdzie, że dla Ciebie najtaniej zrobić coś samemu, powiemy to wprost. Jeśli zdecydujesz się wdrażać z nami, 1490 zł netto odliczamy od kosztu.',
    },
    {
      pytanie: 'Ile trwa audyt AI?',
      odpowiedz:
        'Pięć dni roboczych. Czas liczymy od przekazania kompletu materiałów, czyli opisów procesów i dostępów, a nie od podpisania umowy. Po rozmowie i analizie procesów dostajesz raport PDF z mapą procesów, czyli Action Plan. Nie musisz nic przygotowywać, prowadzimy Cię pytaniami.',
    },
    {
      pytanie: 'Czy audyt ma sens przy małej firmie?',
      odpowiedz:
        'Ma, często nawet większy. Im mniejsza firma, tym bardziej boli każda zła decyzja i każda godzina zmarnowana na rzeczy, które AI może zdjąć. Audyt pokazuje, gdzie zacząć przy małym budżecie, żeby jeden dobrze dobrany proces dał szybki zwrot, zamiast rozdrabniać się na wszystko naraz.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Umów Sprint Diagnostyczny. Po 5 dniach roboczych masz raport PDF, a 1490 zł netto odliczamy od wdrożenia, gdy ruszamy z robotą.',
    dowod:
      'Każdy audyt kończy się Action Planem, który zostaje u Ciebie. Najpierw mapa, potem decyzja.',
  },

  queries: [
    'audyt AI firmy',
    'mapa oszczędności czasu',
    'gdzie wdrożyć AI',
    'audyt AI dla firmy',
    'gdzie wdrożyć AI w firmie',
  ],

  /* v22 (linki §3, P2 #15): usługa -> narzędzie było 1/13 w całym serwisie.
     Audyt to płatna wersja tego, co test i kalkulator pokazują za darmo, więc
     to najbliższa para w rejestrze narzędzi. */
  powiazane: {
    narzedzia: [
      {
        etykieta: 'Test gotowości firmy na AI',
        href: '/narzedzia#test-gotowosci-ai',
        opis:
          'Osiem pytań o procesy, dane i ludzi. Na koniec poziom gotowości i trzy rekomendacje, od czego zacząć.',
      },
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Wpisujesz godziny tracone na powtarzalnej robocie, a kalkulator pokazuje kwotę roczną do odzyskania.',
      },
    ],
  },
};
