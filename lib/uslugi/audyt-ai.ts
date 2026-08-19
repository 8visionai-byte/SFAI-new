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
      'Wszyscy mówią, że trzeba wdrażać AI. Nikt nie mówi gdzie. Kupujesz narzędzie, bo było modne, i po miesiącu nikt go nie używa. Albo automatyzujesz proces, który zdarza się raz na kwartał, a ten codzienny dalej zjada Twój czas. Bez mapy strzelasz na ślepo. Każda zła decyzja to wydane pieniądze i stracony czas, a do tego zniechęcenie, że AI to ściema. Problem nie w tym, że AI nie działa. Problem w tym, że nikt Ci nie pokazał, gdzie zacząć.',
  },

  rozwiazanie: {
    h2: 'Co dokładnie dostajesz w Sprincie Diagnostycznym?',
    tresc:
      'Siadamy do Twoich procesów i patrzymy, na czym naprawdę schodzi czas: maile, oferty, faktury, umawianie, raporty, obsługa pytań. Każdy proces oceniamy pod kątem zysku z automatyzacji i trudności wdrożenia. To, co da dużo małym kosztem, ląduje na górze. To, co jest przepalaniem kasy, mówimy wprost, żeby tego nie ruszać. Efektem jest Action Plan: mapa oszczędności czasu ułożona od najlepszego zwrotu, z konkretami, co i w jakiej kolejności wdrożyć. Plan jest Twój, nawet jeśli wdrażasz to potem sam albo z kimś innym.',
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
      'Sprint Diagnostyczny kosztuje 1490 zł netto i trwa 5 dni roboczych, liczone od przekazania kompletu materiałów, czyli opisów procesów i dostępów. Na koniec dostajesz raport PDF z mapą procesów. To celowo niski próg, żebyś mógł sprawdzić, czy AI w Twojej firmie ma sens, bez wchodzenia od razu w duże wdrożenie. Najważniejsze: te 1490 zł netto odliczamy od kosztu wdrożenia, gdy zdecydujesz się z nami współpracować. W praktyce, jeśli wdrażasz, audyt nic Cię nie kosztuje. Jeśli nie wdrażasz, i tak wychodzisz z gotowym Action Planem, który możesz zrealizować sam. Płatność za audyt jest jednorazowa. Przy samym wdrożeniu masz wybór: przekazujemy Ci całą infrastrukturę i wtedy nie płacisz abonamentu, albo projekt zostaje u nas pod opieką i wtedy dochodzi opłata utrzymaniowa, od 99 zł netto miesięcznie przy chatbotach i od 299 zł netto miesięcznie przy voicebotach.',
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
