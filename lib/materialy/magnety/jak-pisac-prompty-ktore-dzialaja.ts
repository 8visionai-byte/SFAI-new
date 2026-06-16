import type { Material } from '../types';

/**
 * MAGNET 3 — „Jak pisać prompty, które działają — mini poradnik".
 *
 * Realna treść: 6 zasad pisania promptów, każda z przykładem „przed/po" (tabela)
 * i krótkim wyjaśnieniem. Plus szablon dobrego promptu do skopiowania. Treść
 * w całości w HTML = cytowalna i użyteczna bez PDF. Linkuje do Generatora promptów.
 */
export const jakPisacPrompty: Material = {
  slug: 'jak-pisac-prompty-ktore-dzialaja',
  tytul: 'Jak pisać prompty, które działają — mini poradnik dla firm',
  etykieta: 'Poradnik',
  typPliku: 'PDF',
  ctaPobierz: 'Pobierz poradnik (PDF)',
  opis:
    'Mini poradnik pisania promptów: 6 zasad, które zamieniają ogólne polecenie w precyzyjny prompt dający powtarzalny wynik. Każda zasada z przykładem przed i po, na realnych zadaniach z firmy. Po 10 minutach piszesz lepiej.',
  zacheta:
    'AI daje słabe odpowiedzi? Problem jest zwykle w pytaniu. Ten poradnik pokazuje prostą strukturę dobrego promptu, na przykładach z firmy.',
  metaTitle: 'Jak pisać prompty, które działają (mini poradnik)',
  metaDescription:
    'Jak pisać dobre prompty: 6 zasad z przykładami przed i po. Zamień ogólne polecenie w precyzyjny prompt, który daje powtarzalny wynik. Prompt engineering po polsku.',
  data: '2026-06-16',
  dataAktualizacji: '2026-06-16',
  queries: [
    'jak pisać prompty',
    'jak pisać dobre prompty',
    'prompt engineering dla firm po polsku',
    'jak pisać prompty do ChatGPT',
  ],
  tresc: [
    {
      typ: 'akapit',
      tekst:
        'Krótko: jeśli AI daje słabe odpowiedzi, problem prawie zawsze jest w pytaniu. Dobry prompt mówi modelowi cztery rzeczy: kim ma być, co dokładnie ma zrobić, dla kogo i w jakiej formie. Te 6 zasad zamienia ogólne polecenie w precyzyjny prompt, który daje powtarzalny wynik. Każda zasada ma przykład przed i po.',
    },
    {
      typ: 'cytat',
      tekst:
        'AI nie czyta w myślach. Dostaje dokładnie to, co napiszesz. Im więcej kontekstu dasz, tym mniej zgadywania, a więcej trafienia.',
    },

    { typ: 'naglowek', tekst: 'Zasada 1: Nadaj AI rolę' },
    {
      typ: 'akapit',
      tekst:
        'Zacznij od tego, kim AI ma być. Rola ustawia poziom, ton i wiedzę. „Napisz mail" da ogólny tekst. „Wciel się w handlowca z 10-letnim stażem" da tekst, który brzmi jak od kogoś, kto wie, co robi.',
    },
    {
      typ: 'tabela',
      naglowki: ['Przed', 'Po'],
      wiersze: [
        [
          'Napisz mi tekst o naszej usłudze sprzątania.',
          'Wciel się w copywritera, który pisze dla firm usługowych. Napisz tekst o naszej usłudze sprzątania biur dla małych firm.',
        ],
      ],
    },

    { typ: 'naglowek', tekst: 'Zasada 2: Powiedz, dla kogo to jest' },
    {
      typ: 'akapit',
      tekst:
        'Ten sam tekst pisze się inaczej do prezesa, inaczej do mamy szukającej przedszkola. Podaj odbiorcę, a AI dobierze język, długość i argumenty. Bez tego dostajesz tekst „dla wszystkich", czyli dla nikogo.',
    },
    {
      typ: 'tabela',
      naglowki: ['Przed', 'Po'],
      wiersze: [
        [
          'Wyjaśnij, czym jest nasza aplikacja.',
          'Wyjaśnij, czym jest nasza aplikacja, właścicielowi małej firmy, który nie zna się na technologii i ma 30 sekund.',
        ],
      ],
    },

    { typ: 'naglowek', tekst: 'Zasada 3: Bądź konkretny zamiast ogólny' },
    {
      typ: 'akapit',
      tekst:
        'Ogólne słowa dają ogólne wyniki. „Krótko", „profesjonalnie", „dobrze" znaczą dla każdego co innego. Podaj liczby i granice: ile słów, ile punktów, jaki ton. Konkret zamienia zgadywanie w wykonanie.',
    },
    {
      typ: 'tabela',
      naglowki: ['Przed', 'Po'],
      wiersze: [
        [
          'Napisz krótki, profesjonalny opis produktu.',
          'Napisz opis produktu w 3 zdaniach, ton rzeczowy bez przymiotników w stylu „najlepszy", skup się na jednej głównej korzyści dla klienta.',
        ],
      ],
    },

    { typ: 'naglowek', tekst: 'Zasada 4: Pokaż przykład tego, czego chcesz' },
    {
      typ: 'akapit',
      tekst:
        'Jeden przykład mówi więcej niż akapit instrukcji. Jeśli masz wzór, który Ci się podoba, wklej go i napisz „w tym stylu". AI dopasuje rytm, długość i ton do tego, co pokażesz. To najszybszy sposób na powtarzalny wynik.',
    },
    {
      typ: 'tabela',
      naglowki: ['Przed', 'Po'],
      wiersze: [
        [
          'Napisz post na Facebooka o naszej promocji.',
          'Napisz post na Facebooka o naszej promocji w stylu tego, który zadziałał: „[wklej swój udany post]". Ta sama długość i ton, inny temat.',
        ],
      ],
    },

    { typ: 'naglowek', tekst: 'Zasada 5: Określ format wyjścia' },
    {
      typ: 'akapit',
      tekst:
        'Powiedz, jak ma wyglądać odpowiedź: lista, tabela, mail, 3 warianty do wyboru. Bez tego AI sam zgaduje formę, a Ty potem przepisujesz. Z formatem dostajesz gotowiec, który możesz wkleić tam, gdzie go potrzebujesz.',
    },
    {
      typ: 'tabela',
      naglowki: ['Przed', 'Po'],
      wiersze: [
        [
          'Wymyśl pomysły na posty.',
          'Wypisz 10 pomysłów na posty jako listę. Przy każdym jedno zdanie tematu i w nawiasie problem klienta, który rozwiązuje.',
        ],
      ],
    },

    { typ: 'naglowek', tekst: 'Zasada 6: Pozwól AI dopytać, zanim zacznie' },
    {
      typ: 'akapit',
      tekst:
        'Gdy zadanie jest trudne, dopisz na końcu: „Jeśli czegoś Ci brakuje, dopytaj, zanim odpowiesz". AI najpierw zada pytania, a potem zrobi robotę na pełnych danych. To prosty trick, który zamienia ogólną odpowiedź w trafioną.',
    },
    {
      typ: 'tabela',
      naglowki: ['Przed', 'Po'],
      wiersze: [
        [
          'Przygotuj ofertę dla klienta.',
          'Przygotuj ofertę dla klienta. Najpierw zadaj mi pytania o jego potrzeby, budżet i termin, a dopiero potem napisz ofertę.',
        ],
      ],
    },

    { typ: 'naglowek', tekst: 'Szablon dobrego promptu (skopiuj i uzupełnij)' },
    {
      typ: 'akapit',
      tekst:
        'Złóż wszystkie zasady w jeden szablon. Podmień pola w nawiasach na swoje i masz prompt, który prawie zawsze trafia: „Wciel się w [rola]. Napisz [co] dla [dla kogo]. Cel: [cel]. Forma: [format, np. lista / mail / 3 wersje]. Długość: [ile]. Ton: [jaki]. Jeśli czegoś Ci brakuje, dopytaj, zanim odpowiesz".',
    },
    {
      typ: 'lista',
      punkty: [
        'Rola: kim ma być AI (handlowiec, copywriter, księgowy).',
        'Zadanie: co dokładnie ma zrobić (napisać, podsumować, wymyślić).',
        'Odbiorca: dla kogo to jest (klient, zespół, urząd).',
        'Cel: po co to robisz (sprzedać, wyjaśnić, uspokoić).',
        'Format i długość: jak ma wyglądać wynik.',
        'Ton: oficjalny, swobodny, zwięzły, ekspercki.',
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Nie chce Ci się składać promptu ręcznie za każdym razem? Mamy darmowy Generator promptów AI dla firm. Wybierasz branżę, zadanie, cel i styl, a on składa gotowy prompt do skopiowania w 30 sekund. Te 6 zasad ma już w środku.',
    },
  ],
  faq: [
    {
      pytanie: 'Czy muszę znać się na technologii, żeby pisać dobre prompty?',
      odpowiedz:
        'Nie. Prompt to po prostu jasne polecenie po polsku. Jeśli umiesz wytłumaczyć zadanie nowemu pracownikowi, umiesz napisać dobry prompt. Te 6 zasad to dokładnie ta sama logika.',
    },
    {
      pytanie: 'Ile czasu zajmuje nauka pisania promptów?',
      odpowiedz:
        'Podstawy złapiesz w 10 minut, czyli tyle, ile zajmuje przeczytanie tego poradnika. Resztę dorabia praktyka. Po kilku dniach używania piszesz lepsze prompty odruchowo.',
    },
    {
      pytanie: 'Czy te zasady działają w każdym AI?',
      odpowiedz:
        'Tak. Zasady są uniwersalne i działają w ChatGPT, Claude i Gemini. Różnice między modelami są mniejsze niż różnica między dobrym a złym promptem.',
    },
    {
      pytanie: 'Co jeśli nie chce mi się pisać promptów od zera?',
      odpowiedz:
        'Użyj naszego darmowego Generatora promptów AI dla firm. Wybierasz branżę, zadanie, cel i styl z list, a generator składa gotowy prompt do skopiowania. Wszystkie 6 zasad z tego poradnika ma wbudowane.',
    },
  ],
};
