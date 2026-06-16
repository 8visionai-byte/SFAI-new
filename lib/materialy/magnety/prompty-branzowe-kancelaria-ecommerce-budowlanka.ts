import type { Material } from '../types';

/**
 * MAGNET 6 — „Prompty branżowe: kancelaria, e-commerce, budowlanka".
 *
 * Realna treść: 3 sekcje branżowe, w każdej po kilka gotowych promptów pod realne
 * zadania danej branży. Pola w [nawiasach] user podmienia na swoje dane. Treść
 * w całości w HTML = cytowalna. Linkuje do Generatora promptów (te branże są w selektach).
 *
 * WAŻNE (prawo): prompty dla kancelarii pomagają z pierwszym szkicem/strukturą,
 * NIE zastępują prawnika. Disclaimer jest w treści — zero udawania porady prawnej.
 */
export const promptyBranzowe: Material = {
  slug: 'prompty-branzowe-kancelaria-ecommerce-budowlanka',
  tytul: 'Prompty branżowe AI: kancelaria, e-commerce, budowlanka',
  etykieta: 'Prompty',
  typPliku: 'PDF',
  ctaPobierz: 'Pobierz prompty branżowe (PDF)',
  opis:
    'Zestaw gotowych promptów dopasowanych do trzech branż: kancelaria prawna, e-commerce i budowlanka. Każdy prompt rozwiązuje realne zadanie z danej branży, od pisma i opisu produktu po kosztorys ofertowy. Kopiujesz, podmieniasz dane i używasz.',
  zacheta:
    'Ogólne prompty nie pasują do Twojej branży? Tu masz gotowe zestawy pod kancelarię, e-commerce i budowlankę. Konkretne zadania, konkretny język branży.',
  metaTitle: 'Prompty branżowe AI: kancelaria, e-commerce, budowlanka',
  metaDescription:
    'Gotowe prompty AI dla trzech branż: kancelaria, e-commerce i budowlanka. Pismo, opis produktu, kosztorys i więcej. Kopiujesz, podmieniasz dane i wklejasz do ChatGPT.',
  data: '2026-06-16',
  dataAktualizacji: '2026-06-16',
  queries: [
    'prompty dla kancelarii',
    'prompty AI dla e-commerce',
    'prompty AI dla branży budowlanej',
    'prompty branżowe AI',
  ],
  tresc: [
    {
      typ: 'akapit',
      tekst:
        'Ogólne prompty dają ogólne wyniki. Te są dopasowane do trzech branż: kancelaria prawna, e-commerce i budowlanka. Każdy rozwiązuje realne zadanie z danej branży. Skopiuj prompt, podmień to, co jest w [nawiasach], na swoje dane i wklej do ChatGPT, Claude albo Gemini.',
    },
    {
      typ: 'cytat',
      tekst:
        'Im bliżej Twojej branży jest prompt, tym mniej poprawiasz po AI. Branżowy kontekst robi połowę roboty.',
    },

    { typ: 'naglowek', tekst: 'Prompty dla kancelarii prawnej' },
    {
      typ: 'akapit',
      tekst:
        'Te prompty pomagają z pierwszym szkicem, strukturą pisma i tłumaczeniem prawniczego języka na ludzki. Ważne: AI nie zastępuje prawnika i nie udziela porady prawnej. To narzędzie do przyspieszenia pracy, którą i tak sprawdza człowiek z uprawnieniami. Każdy dokument przed wysłaniem weryfikuje prawnik.',
    },
    {
      typ: 'lista',
      punkty: [
        'Wciel się w doświadczonego prawnika. Przygotuj strukturę (sam szkielet z nagłówkami) pisma typu [rodzaj pisma, np. wezwanie do zapłaty]. Wypisz, jakie elementy musi zawierać i o jakie dane mam Cię uzupełnić.',
        'Wyjaśnij prostym językiem, co oznacza ten zapis umowy dla mojego klienta, który nie jest prawnikiem: „[wklej zapis]". Wskaż, na co powinien szczególnie uważać.',
        'Przygotuj listę pytań, które powinienem zadać klientowi na pierwszym spotkaniu w sprawie [rodzaj sprawy], żeby zebrać komplet informacji do dalszej pracy.',
        'Streść ten długi dokument do jednej strony kluczowych punktów dla klienta: „[wklej tekst]". Zachowaj to, co ma znaczenie prawne, odrzuć balast.',
        'Napisz uprzejmy, profesjonalny mail do klienta z prośbą o brakujące dokumenty do sprawy [sygnatura lub nazwa]. Wypisz dokumenty jako czytelną listę z terminem.',
        'Porównaj te dwie wersje zapisu i wypisz różnice w prostych słowach: „[wersja A]" oraz „[wersja B]". Wskaż, która jest korzystniejsza dla mojego klienta i dlaczego.',
      ],
    },

    { typ: 'naglowek', tekst: 'Prompty dla e-commerce' },
    {
      typ: 'akapit',
      tekst:
        'Te prompty zdejmują z Ciebie najnudniejszą część prowadzenia sklepu: opisy produktów, odpowiedzi na pytania, treści na karty i kampanie. Im więcej szczegółów o produkcie podasz, tym lepszy opis dostaniesz.',
    },
    {
      typ: 'lista',
      punkty: [
        'Wciel się w copywritera e-commerce. Napisz opis produktu [nazwa produktu]. Cechy: [wypisz cechy]. Dla kogo: [klient]. Struktura: chwytliwy nagłówek, 3 zdania o korzyściach, lista cech, jedno zdanie domykające. Ton: [oficjalny / swobodny].',
        'Napisz 5 wariantów tytułu produktu [nazwa] pod wyszukiwarkę sklepu i Google. Każdy do 60 znaków, z najważniejszą frazą, której szukają klienci.',
        'Klient zadał pytanie pod produktem: „[pytanie]". Napisz pomocną, konkretną odpowiedź, która rozwieje wątpliwość i delikatnie zachęci do zakupu.',
        'Napisz tekst do sekcji „najczęstsze pytania" dla produktu [nazwa]: 6 pytań, które klienci realnie zadają przy zakupie, z krótkimi odpowiedziami.',
        'Zamień tę suchą specyfikację w opis, który sprzedaje: „[wklej specyfikację]". Mów o tym, co klient zyska, nie tylko o parametrach.',
        'Napisz mail do klienta po zakupie produktu [nazwa]: podziękuj, podaj, czego się spodziewać, i zaproponuj jeden pasujący produkt dodatkowy. Bez nachalności.',
        'Przygotuj opis kategorii [nazwa kategorii] w sklepie: 2 akapity, które pomagają klientowi wybrać i naturalnie wplatają frazy, których ludzie szukają.',
      ],
    },

    { typ: 'naglowek', tekst: 'Prompty dla branży budowlanej' },
    {
      typ: 'akapit',
      tekst:
        'Te prompty pomagają z tym, co w budowlance zjada wieczory: oferty, kosztorysy w słowach, maile do klientów i opisy realizacji. AI nie liczy cen materiałów za Ciebie, ale układa Twoje liczby w czytelną, profesjonalną ofertę.',
    },
    {
      typ: 'lista',
      punkty: [
        'Wciel się w doświadczonego wykonawcę. Napisz profesjonalną ofertę na [rodzaj prac, np. remont łazienki] dla klienta [typ klienta]. Zakres prac: [wypisz prace]. Ułóż to w czytelną strukturę: zakres, etapy, co wlicza cena, co nie.',
        'Zamień moje notatki z wyceny w przejrzysty kosztorys w formie tabeli: „[wklej notatki: prace i kwoty]". Kolumny: pozycja, opis, ilość, cena. Dodaj podsumowanie.',
        'Napisz mail do klienta z wyjaśnieniem, dlaczego termin [czego dotyczy] się przesuwa o [ile]. Bądź szczery, podaj powód i nowy realny termin. Ton spokojny i pewny.',
        'Przygotuj listę pytań, które powinienem zadać klientowi przed wyceną [rodzaj prac], żeby nie pominąć niczego, co później wywoła spór o cenę.',
        'Napisz opis zakończonej realizacji [rodzaj prac] na moją stronę i social media. Co robiliśmy, jaki był efekt, czemu klient był zadowolony. Bez przechwałek, konkretnie.',
        'Klient marudzi, że cena za [prace] jest za wysoka. Napisz spokojną odpowiedź, która tłumaczy, za co płaci, bez obniżania wartości mojej pracy.',
        'Stwórz prostą umowę-zlecenie (szkielet) na drobne prace budowlane: jakie punkty musi zawierać, żeby chronić obie strony. Zaznacz, że finalną wersję sprawdza prawnik.',
      ],
    },

    { typ: 'naglowek', tekst: 'Twojej branży nie ma na liście?' },
    {
      typ: 'akapit',
      tekst:
        'Logika jest ta sama dla każdej branży: nadaj AI rolę specjalisty z Twojej dziedziny, podaj realne dane i poproś o konkretny format. Najszybciej zrobisz to naszym darmowym Generatorem promptów AI dla firm. Wybierasz branżę, zadanie, cel i styl, a on składa gotowy prompt w 30 sekund. Kancelaria, e-commerce i budowlanka są tam w selektach, obok kilku innych.',
    },
  ],
  faq: [
    {
      pytanie: 'Czy prompty dla kancelarii zastępują prawnika?',
      odpowiedz:
        'Nie. Pomagają z pierwszym szkicem, strukturą pisma i tłumaczeniem języka prawniczego na prosty. To narzędzie do przyspieszenia pracy. Każdy dokument przed użyciem sprawdza prawnik z uprawnieniami. AI nie udziela porady prawnej.',
    },
    {
      pytanie: 'Czy mogę używać tych promptów do swoich produktów w sklepie?',
      odpowiedz:
        'Tak. Prompty e-commerce są zbudowane pod realne zadania sklepu: opisy produktów, odpowiedzi na pytania, treści kategorii. Podmieniasz dane w nawiasach na swoje produkty i używasz.',
    },
    {
      pytanie: 'Czy AI policzy mi kosztorys budowlany?',
      odpowiedz:
        'AI nie zna cen Twoich materiałów ani stawek robocizny. Ale gdy podasz swoje liczby, ułoży je w czytelny, profesjonalny kosztorys i ofertę. Liczby są Twoje, forma i porządek od AI.',
    },
    {
      pytanie: 'Mam inną branżę, te prompty mi nie pomogą?',
      odpowiedz:
        'Logika działa wszędzie: rola specjalisty, Twoje dane, konkretny format. Najprościej zbudować prompt pod swoją branżę w naszym darmowym Generatorze promptów AI dla firm, który składa gotowy prompt z czterech wyborów.',
    },
  ],
};
