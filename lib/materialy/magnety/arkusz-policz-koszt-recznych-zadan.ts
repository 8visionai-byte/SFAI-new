import type { Material } from '../types';

/**
 * MAGNET 5 — „Arkusz: policz, ile kosztują Cię ręczne zadania w firmie".
 *
 * Realna, użyteczna treść: instrukcja krok po kroku + tabela-wzór do wypełnienia
 * własnymi liczbami + przykład poglądowy (jawnie oznaczony jako przykład).
 * ZERO zmyślonych danych firmy: kolumny wzoru są puste (to Ty wpisujesz dane),
 * a przykład jest jawnie opisany jako poglądowy. Pełna treść w HTML (cytowalna),
 * arkusz/PDF to bonus, nie bramka. Przycisk pobrania = STUB (TODO Make/PDF).
 * Linkuje do interaktywnej wersji: /narzedzia#kalkulator-oszczednosci.
 */
export const arkuszKosztRecznychZadan: Material = {
  slug: 'arkusz-policz-koszt-recznych-zadan',
  tytul: 'Arkusz: policz, ile naprawdę kosztują Cię ręczne zadania',
  etykieta: 'Arkusz',
  typPliku: 'arkusz',
  ctaPobierz: 'Pobierz arkusz',
  opis:
    'Arkusz, w którym wpisujesz zadanie, czas tygodniowo i koszt godziny, a on liczy, ile Cię rocznie kosztuje ręczna robota i ile odzyskasz po automatyzacji. Gotowy wzór, wpisujesz tylko swoje liczby. Cały wzór i instrukcję masz na tej stronie, za darmo.',
  zacheta:
    'Czujesz, że tracisz czas, ale nie wiesz ile? Wpisujesz zadania i godziny, arkusz liczy koszt w pieniądzu. Zobaczysz czarno na białym, co najbardziej opłaca się zautomatyzować.',
  metaTitle: 'Arkusz: ile kosztują Cię ręczne zadania',
  metaDescription:
    'Arkusz do policzenia kosztu ręcznych zadań w firmie: wpisujesz czas i koszt godziny, liczysz roczny koszt i oszczędność po automatyzacji. Wzór i przykład.',
  data: '2026-06-16',
  dataAktualizacji: '2026-08-18',
  queries: [
    'ile kosztują ręczne zadania',
    'koszt ręcznej pracy w firmie',
    'kalkulator kosztu zadań',
    'jak policzyć koszt ręcznej roboty',
  ],
  tresc: [
    {
      typ: 'akapit',
      tekst: 'Czujesz, że tracisz czas na ręczną robotę, ale nie wiesz, ile to realnie kosztuje? Ten arkusz zamienia przeczucie w konkretną kwotę. Wpisujesz zadanie, ile godzin tygodniowo zżera i ile kosztuje godzina pracy. Arkusz liczy resztę. Zobaczysz czarno na białym, co najbardziej opłaca się zautomatyzować najpierw.',
    },
    {
      typ: 'cytat',
      tekst: 'To, czego nie liczysz, wygląda na darmowe. Ręczna robota nie jest darmowa. Jest po prostu niepoliczona.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Jak działa ten arkusz?',
      akapity: [
        'Arkusz opiera się na jednym prostym rachunku. Bierzesz czas, który zadanie zżera tygodniowo, mnożysz przez liczbę tygodni w roku i przez koszt godziny pracy. Wychodzi roczny koszt ręcznej roboty. Potem szacujesz, jaką część tego czasu zdejmie automatyzacja, i widzisz, ile odzyskasz rocznie.',
      ],
      wariant: 'top',
    },
    {
      typ: 'tabela',
      naglowki: [
        'Krok',
        'Co liczysz',
        'Wzór',
      ],
      wiersze: [
        [
          '1',
          'Roczny czas na zadanie (godziny)',
          'godziny tygodniowo razy 50 tygodni pracujących',
        ],
        [
          '2',
          'Roczny koszt zadania (złotówki)',
          'roczny czas razy koszt jednej godziny pracy',
        ],
        [
          '3',
          'Roczna oszczędność po automatyzacji',
          'roczny koszt razy procent czasu, który zdejmie automatyzacja',
        ],
      ],
      wKarcie: true,
      podpis: 'Rachunek kosztu ręcznego zadania w trzech krokach',
    },
    {
      typ: 'akapit',
      tekst: 'Liczbę 50 tygodni bierzemy jako rok roboczy po odjęciu urlopu i świąt. Jeśli wolisz, podstaw swoją. Koszt godziny pracy policz brutto z narzutami, czyli ile realnie kosztuje Cię godzina pracownika, a nie sama stawka netto.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Wzór arkusza do wypełnienia',
      akapity: [
        'Skopiuj ten wzór do swojego arkusza w Excelu albo Arkuszach Google i wpisz własne liczby w pustych kolumnach. Wiersze to przykładowe zadania z MŚP, możesz je zostawić albo wymienić na swoje. Kwoty zostawiamy puste, bo to Ty wpisujesz swoje dane. Zero zmyślonych liczb.',
      ],
      wariant: 'edge',
    },
    {
      typ: 'tabela',
      naglowki: [
        'Zadanie',
        'Godziny tygodniowo',
        'Koszt godziny (zł)',
        'Roczny koszt (zł)',
        'Procent do zdjęcia',
        'Roczna oszczędność (zł)',
      ],
      wiersze: [
        [
          'Odpowiedzi na powtarzalne maile',
          '',
          '',
          '',
          '',
          '',
        ],
        [
          'Przygotowywanie ofert i wycen',
          '',
          '',
          '',
          '',
          '',
        ],
        [
          'Przepisywanie faktur do systemu',
          '',
          '',
          '',
          '',
          '',
        ],
        [
          'Układanie raportów i podsumowań',
          '',
          '',
          '',
          '',
          '',
        ],
        [
          'Umawianie i potwierdzanie terminów',
          '',
          '',
          '',
          '',
          '',
        ],
        [
          'Twoje zadanie',
          '',
          '',
          '',
          '',
          '',
        ],
        [
          'RAZEM',
          '',
          '',
          '',
          '',
          '',
        ],
      ],
      wKarcie: true,
      podpis: 'Wzór arkusza do skopiowania: kolumny i wiersz RAZEM',
    },
    {
      typ: 'naglowek',
      tekst: 'Jak wypełnić wzór, krok po kroku',
    },
    {
      typ: 'kroki',
      wariant: 'kolo',
      kroki: [
        {
          tytul: 'Kolumna „Godziny tygodniowo":',
          opis: 'wpisz, ile godzin w tygodniu zadanie zżera łącznie wszystkim osobom, które je robią.',
        },
        {
          tytul: 'Kolumna „Koszt godziny":',
          opis: 'wpisz realny koszt godziny pracy brutto z narzutami.',
        },
        {
          tytul: 'Kolumna „Roczny koszt":',
          opis: 'pomnóż godziny tygodniowo razy 50 razy koszt godziny.',
        },
        {
          tytul: 'Kolumna „Procent do zdjęcia":',
          opis: 'oszacuj, jaką część tej roboty zdejmie automatyzacja. Ostrożnie zacznij od 50 do 70 procent, rzadko od razu 100.',
        },
        {
          tytul: 'Kolumna „Roczna oszczędność":',
          opis: 'pomnóż roczny koszt razy procent do zdjęcia.',
        },
        {
          tytul: 'Wiersz „RAZEM":',
          opis: 'zsumuj kolumny rocznego kosztu i rocznej oszczędności. Tu zobaczysz pełny obraz.',
        },
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Przykład poglądowy: jak czytać wynik',
      akapity: [
        'Poniżej przykład poglądowy z okrągłymi, wymyślonymi na potrzeby instrukcji liczbami. To NIE są realne dane Twojej firmy ani żadnej innej. Służy tylko pokazaniu, jak działa rachunek. Swoje liczby wpisujesz wyżej.',
      ],
      wariant: 'top',
    },
    {
      typ: 'tabela',
      naglowki: [
        'Zadanie (przykład)',
        'Godziny tygodniowo',
        'Koszt godziny (zł)',
        'Roczny koszt (zł)',
        'Procent do zdjęcia',
        'Roczna oszczędność (zł)',
      ],
      wiersze: [
        [
          'Odpowiedzi na powtarzalne maile',
          '10',
          '60',
          '30 000',
          '70%',
          '21 000',
        ],
        [
          'Przepisywanie faktur do systemu',
          '5',
          '60',
          '15 000',
          '80%',
          '12 000',
        ],
        [
          'RAZEM (przykład)',
          '15',
          '—',
          '45 000',
          '—',
          '33 000',
        ],
      ],
      wKarcie: true,
      podpis: 'Przykład poglądowy wypełnionego arkusza (liczby wymyślone na potrzeby instrukcji)',
    },
    {
      typ: 'akapit',
      tekst: 'Jak czytać ten przykład: 10 godzin tygodniowo razy 50 tygodni razy 60 złotych daje 30 000 złotych rocznego kosztu samego odpisywania na maile. Przy założeniu, że automatyzacja zdejmie 70 procent tej roboty, odzyskujesz 21 000 złotych rocznie. To wartość, której dziś nie liczy nikt. Podstaw swoje liczby, a zobaczysz własny obraz.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Wolisz policzyć to bez Excela?',
      akapity: [
        'Jeśli nie chcesz składać arkusza ręcznie, ten sam rachunek zrobi za Ciebie interaktywny kalkulator oszczędności w sekcji /narzedzia#kalkulator-oszczednosci. Wpisujesz, ile osób ile godzin tygodniowo traci na powtarzalnej robocie, a kalkulator od razu pokazuje, ile złotych rocznie odzyskasz. Bez maila, w kilka sekund. Arkusz tutaj jest dla tych, którzy wolą mieć liczby u siebie i rozpisać wiele zadań naraz.',
      ],
      wariant: 'quiet',
    },
    {
      typ: 'akapit',
      tekst: 'Pełna instrukcja i wzór są wyżej na tej stronie. Czytasz je teraz, za darmo, bez zapisu. Wersja do pobrania to gotowy arkusz, w którym wpisujesz tylko swoje liczby.',
    },
  ],
  faq: [
    {
      pytanie: 'Jak policzyć, ile kosztują mnie ręczne zadania w firmie?',
      odpowiedz:
        'Weź czas, który zadanie zżera tygodniowo, pomnóż przez 50 tygodni pracujących i przez realny koszt godziny pracy brutto. Wychodzi roczny koszt ręcznej roboty. Potem oszacuj, jaką część tego czasu zdejmie automatyzacja, i pomnóż przez ten procent, żeby zobaczyć roczną oszczędność. Gotowy wzór i przykład masz w tym arkuszu.',
    },
    {
      pytanie: 'Jaki procent czasu realnie zdejmuje automatyzacja?',
      odpowiedz:
        'Zależy od procesu, ale ostrożnie zacznij od 50 do 70 procent, rzadko od razu 100. Przy procesach z człowiekiem w pętli AI przygotowuje wynik, a człowiek tylko zatwierdza, więc nawet drobna korekta zostawia większość czasu zaoszczędzoną. Lepiej założyć ostrożnie i pozytywnie się zdziwić niż przeszacować.',
    },
    {
      pytanie: 'Czym ten arkusz różni się od kalkulatora oszczędności?',
      odpowiedz:
        'Arkusz to wzór, który wypełniasz u siebie w Excelu albo Arkuszach Google i w którym rozpiszesz wiele zadań naraz, z sumą na końcu. Kalkulator oszczędności w sekcji /narzedzia liczy to samo interaktywnie w kilka sekund, bez składania arkusza. Wybierz to, co wolisz: arkusz dla pełnej rozpiski, kalkulator dla szybkiego wyniku.',
    },
  ],

  /**
   * v22 (PLAN-v22 §3 P2 pkt 12): POWIĄZANIA MATERIAŁU. Przed rundą magnet
   * był ślepym zaułkiem: zero wyjść do oferty i do poradnika, który tłumaczy
   * temat głębiej. Obie trasy są realne i stoją w rejestrach.
   */
  powiazaneUslugi: [
    {
      etykieta: 'Automatyzacje procesów AI',
      href: '/uslugi/automatyzacje',
      opis:
        'Przejmujemy powtarzalną robotę, którą dziś klika u Ciebie człowiek.',
    },
  ],
  powiazanePoradniki: [
    {
      etykieta: 'Ile kosztuje automatyzacja AI w firmie',
      href: '/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie',
      opis:
        'Widełki cenowe, od czego zależy koszt i jak policzyć zwrot.',
    },
  ],
  /* v22: te materialy odsylaja do narzedzi golym tekstem w zdaniu
     (np. „w sekcji /narzedzia"), wiec sciezka byla nieklikalna. Zdania
     zostaja nietkniete, a czytelnik dostaje realny link. */
  powiazaneNarzedzia: [
    {
      etykieta: 'Kalkulator oszczędności',
      href: '/narzedzia#kalkulator-oszczednosci',
      opis:
        'Policz w złotówkach, ile zżera Cię dziś jeden ręczny proces.',
    },
  ],
};
