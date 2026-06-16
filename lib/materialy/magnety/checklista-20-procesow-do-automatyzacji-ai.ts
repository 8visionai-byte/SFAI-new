import type { Material } from '../types';

/**
 * MAGNET 2 — „Checklista: 20 procesów w firmie do automatyzacji AI".
 *
 * Realna, użyteczna treść (nie zajawka): 20 konkretnych procesów MŚP, przy każdym
 * kryterium „czy to Twój przypadek" + od czego zacząć. Pełna treść w HTML
 * (cytowalna), PDF/plik to bonus, nie bramka. Przycisk pobrania = STUB (TODO Make/PDF).
 */
export const checklista20Procesow: Material = {
  slug: 'checklista-20-procesow-do-automatyzacji-ai',
  tytul: 'Checklista: 20 procesów w firmie, które warto zautomatyzować z AI',
  etykieta: 'Checklista',
  typPliku: 'checklista',
  ctaPobierz: 'Pobierz checklistę (PDF)',
  opis:
    'Checklista 20 procesów, które w MŚP najczęściej zżerają czas i najszybciej zwracają się po automatyzacji, od odpowiadania na maile po raporty. Przy każdym procesie masz, jak poznać, że to Twój przypadek, i od czego zacząć. Czytasz całość na stronie, za darmo.',
  zacheta:
    'Nie widzisz, co da się zautomatyzować? Ta checklista pokazuje 20 powtarzalnych procesów, które AI zdejmuje z Twoich ludzi. Zaznaczasz swoje i wiesz, od czego zacząć.',
  metaTitle: 'Checklista: 20 procesów w firmie do automatyzacji AI',
  metaDescription:
    'Checklista 20 procesów w firmie do automatyzacji AI: od maili i ofert po faktury i raporty. Przy każdym kryterium, czy to Twój przypadek, i pierwszy krok. Za darmo.',
  data: '2026-06-16',
  dataAktualizacji: '2026-06-16',
  queries: [
    'co zautomatyzować w firmie',
    'procesy do automatyzacji ai',
    'checklista automatyzacji firmy',
    'jakie procesy zautomatyzować',
  ],
  tresc: [
    {
      typ: 'akapit',
      tekst:
        'Nie widzisz, co da się zautomatyzować? To normalne. Robisz te procesy codziennie, więc przestajesz je zauważać. Ta checklista pokazuje 20 powtarzalnych rzeczy, które AI najczęściej zdejmuje z ludzi w małej i średniej firmie. Przejdź listę, zaznacz te, które robicie u siebie, i od razu wiesz, od czego zacząć.',
    },
    {
      typ: 'cytat',
      tekst:
        'AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje: przepisywanie, klepanie tych samych maili i ręczne układanie raportów.',
    },
    {
      typ: 'naglowek',
      tekst: 'Jak czytać tę checklistę?',
    },
    {
      typ: 'akapit',
      tekst:
        'Przy każdym procesie masz dwie rzeczy. Kryterium „czy to Twój przypadek", czyli prosty test, po którym poznasz, że to o Tobie. I „od czego zacząć", czyli pierwszy mały krok. Zaznacz każdy proces, przy którym kiwasz głową. Im więcej zaznaczeń, tym więcej czasu odzyskasz po automatyzacji. Dobry kandydat na start jest częsty, schematyczny i nie wymaga decyzji człowieka na każdym kroku.',
    },
    {
      typ: 'naglowek',
      tekst: 'Obsługa klienta i komunikacja',
    },
    {
      typ: 'tabela',
      naglowki: ['#', 'Proces', 'Czy to Twój przypadek?', 'Od czego zacząć'],
      wiersze: [
        [
          '1',
          'Odpowiedzi na powtarzalne maile (oferta, status, te same pytania)',
          'Codziennie piszesz podobne maile od zera.',
          'Wypisz 5 pytań, które dostajesz najczęściej. To pierwszy zestaw dla AI.',
        ],
        [
          '2',
          'Pierwsza linia obsługi na czacie i FAQ na stronie',
          'Klienci pytają w kółko o to samo: ceny, dostawa, godziny.',
          'Zbierz 10 najczęstszych pytań i gotowe odpowiedzi w jednym pliku.',
        ],
        [
          '3',
          'Odbieranie i kwalifikacja telefonów poza godzinami',
          'Tracicie telefony, bo nie ma kto odebrać po godzinach.',
          'Policz, ile połączeń przepada dziennie. To Twój punkt startu.',
        ],
        [
          '4',
          'Przypomnienia do klientów (płatności, terminy, dokumenty)',
          'Ktoś ręcznie pilnuje, kto czego jeszcze nie dosłał.',
          'Zrób listę typów przypomnień, które wysyłacie ręcznie.',
        ],
        [
          '5',
          'Sortowanie i nadawanie priorytetu zgłoszeniom',
          'Skrzynka to chaos, pilne miesza się z błahym.',
          'Ustal 3 kategorie zgłoszeń i co jest naprawdę pilne.',
        ],
      ],
    },
    {
      typ: 'naglowek',
      tekst: 'Sprzedaż i oferty',
    },
    {
      typ: 'tabela',
      naglowki: ['#', 'Proces', 'Czy to Twój przypadek?', 'Od czego zacząć'],
      wiersze: [
        [
          '6',
          'Przygotowywanie ofert i wycen z gotowych elementów',
          'Składasz ofertę ręcznie za każdym razem od nowa.',
          'Zbierz powtarzalne bloki oferty w jeden szablon.',
        ],
        [
          '7',
          'Kwalifikacja leadów (kto wart kontaktu, kto nie)',
          'Handlowiec traci czas na zimne, nietrafione kontakty.',
          'Spisz cechy klienta, który u Was kupuje najczęściej.',
        ],
        [
          '8',
          'Budowanie i porządkowanie list kontaktów',
          'Ktoś ręcznie zbiera dane firm do arkusza.',
          'Wskaż jedno źródło kontaktów, które uzupełniacie ręcznie.',
        ],
        [
          '9',
          'Follow-up po spotkaniu lub ofercie',
          'Zapominacie się odezwać, leady stygną.',
          'Ustal, po ilu dniach powinien iść pierwszy follow-up.',
        ],
        [
          '10',
          'Opisy produktów i kart oferty w sklepie',
          'Masz dziesiątki produktów bez porządnych opisów.',
          'Wybierz 10 produktów, które najlepiej się sprzedają, na start.',
        ],
      ],
    },
    {
      typ: 'naglowek',
      tekst: 'Dokumenty i administracja',
    },
    {
      typ: 'tabela',
      naglowki: ['#', 'Proces', 'Czy to Twój przypadek?', 'Od czego zacząć'],
      wiersze: [
        [
          '11',
          'Odczyt faktur i wpinanie danych do systemu',
          'Ktoś przepisuje faktury z PDF do programu ręcznie.',
          'Policz, ile faktur miesięcznie przepisujecie ręcznie.',
        ],
        [
          '12',
          'Segregacja i opisywanie dokumentów przychodzących',
          'Dokumenty lądują w jednym worku, ktoś je potem rozdziela.',
          'Ustal typy dokumentów, które najczęściej wpadają.',
        ],
        [
          '13',
          'Przypomnienia o brakujących dokumentach od klientów',
          'Co miesiąc gonicie klientów o te same papiery.',
          'Spisz, jakich dokumentów brakuje wam najczęściej.',
        ],
        [
          '14',
          'Wypełnianie powtarzalnych formularzy i pism',
          'Te same pola wpisujecie ręcznie w kółko.',
          'Wybierz jeden formularz, który robicie najczęściej.',
        ],
        [
          '15',
          'Wyszukiwanie informacji w długich dokumentach',
          'Ktoś przeszukuje umowy i PDF-y w poszukiwaniu jednego zapisu.',
          'Wskaż dokumenty, w których najczęściej coś szukacie.',
        ],
      ],
    },
    {
      typ: 'naglowek',
      tekst: 'Treści, raporty i wewnętrzne procesy',
    },
    {
      typ: 'tabela',
      naglowki: ['#', 'Proces', 'Czy to Twój przypadek?', 'Od czego zacząć'],
      wiersze: [
        [
          '16',
          'Układanie raportów i podsumowań z danych, które masz',
          'W piątek ktoś ręcznie składa raport z arkuszy.',
          'Wskaż jeden raport, który robicie regularnie ręcznie.',
        ],
        [
          '17',
          'Podsumowania spotkań i notatki z rozmów',
          'Po spotkaniu nikt nie ma czasu spisać ustaleń.',
          'Zacznij od nagrywania jednego typu spotkań.',
        ],
        [
          '18',
          'Posty i treści na social media z gotowych tematów',
          'Brakuje czasu na regularne posty, więc ich nie ma.',
          'Zbierz listę 10 tematów, o których chcecie pisać.',
        ],
        [
          '19',
          'Tłumaczenia maili i materiałów na inne języki',
          'Ktoś ręcznie tłumaczy korespondencję z zagranicą.',
          'Wskaż, w jakim języku piszecie najczęściej poza polskim.',
        ],
        [
          '20',
          'Onboarding i odpowiedzi na pytania nowych pracowników',
          'Nowi pytają o to samo, co poprzedni, a Ty tłumaczysz w kółko.',
          'Spisz 10 pytań, które słyszysz od każdego nowego.',
        ],
      ],
    },
    {
      typ: 'naglowek',
      tekst: 'Zaznaczyłeś kilka procesów. Co dalej?',
    },
    {
      typ: 'akapit',
      tekst:
        'Nie automatyzuj wszystkiego naraz. To najczęstszy błąd. Wybierz jeden proces z tych, które zaznaczyłeś, najlepiej taki, na który najczęściej narzekasz, że zżera czas. Wdróż go z człowiekiem w pętli: AI przygotowuje wynik, Ty zatwierdzasz przed wysłaniem. Zmierz efekt po kilku tygodniach i dopiero wtedy bierz kolejny proces. Mały, odwracalny pierwszy krok daje szybki dowód, że to działa, i zero ryzyka.',
    },
    {
      typ: 'lista',
      punkty: [
        'Policz koszt jednego zaznaczonego procesu w kalkulatorze oszczędności w sekcji /narzedzia. Zobaczysz w złotówkach, ile zżera dziś.',
        'Zrób test gotowości do automatyzacji w sekcji /narzedzia, jeśli nie wiesz, który proces ruszyć pierwszy.',
        'Wybierz jeden proces, częsty i schematyczny, i wdróż go z kontrolą człowieka przed wysłaniem.',
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Pełna treść tej checklisty jest wyżej na tej stronie. Czytasz ją teraz, za darmo, bez zapisu. Plik do pobrania jest tylko po to, żebyś miał ją pod ręką offline albo żebyś przeszedł listę z zespołem.',
    },
  ],
  faq: [
    {
      pytanie: 'Od którego procesu z checklisty zacząć automatyzację?',
      odpowiedz:
        'Od tego, który robicie najczęściej i który jest schematyczny, czyli nie wymaga decyzji człowieka na każdym kroku. Najczęściej to odpowiedzi na powtarzalne maile, przygotowywanie ofert albo odczyt faktur. Wybierz jeden, wdróż go z człowiekiem w pętli i zmierz efekt, zanim weźmiesz kolejny.',
    },
    {
      pytanie: 'Czy muszę zapisywać maila, żeby przeczytać tę checklistę?',
      odpowiedz:
        'Nie. Pełna treść checklisty, wszystkie 20 procesów z kryteriami i pierwszymi krokami, jest na tej stronie za darmo, bez zapisu. Plik na maila to tylko wygoda, żeby mieć ją offline.',
    },
    {
      pytanie: 'Ile procesów z tej listy warto automatyzować na raz?',
      odpowiedz:
        'Jeden. Automatyzowanie wszystkiego naraz to najczęstszy błąd przy wdrażaniu AI. Wybierz pojedynczy proces, zrób go dobrze, zbierz efekt i dopiero potem bierz następny. Mały, odwracalny pierwszy krok daje szybki dowód i zero ryzyka.',
    },
  ],
};
