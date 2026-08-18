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
  tytul: 'Jak pisać prompty, które działają. Mini poradnik dla firm',
  etykieta: 'Poradnik',
  typPliku: 'PDF',
  ctaPobierz: 'Pobierz poradnik (PDF)',
  opis:
    'Mini poradnik pisania promptów: 6 zasad, które zamieniają ogólne polecenie w precyzyjny prompt dający powtarzalny wynik. Każda zasada z przykładem przed i po, na realnych zadaniach z firmy. Po 10 minutach piszesz lepiej.',
  zacheta:
    'AI daje słabe odpowiedzi? Problem jest zwykle w pytaniu. Ten poradnik pokazuje prostą strukturę dobrego promptu, na przykładach z firmy.',
  metaTitle: 'Jak pisać prompty, które działają (mini poradnik)',
  metaDescription:
    'Jak pisać dobre prompty: 6 zasad z przykładami przed i po. Zamień ogólne polecenie w prompt, który daje powtarzalny wynik. Prompt engineering po polsku.',
  data: '2026-06-16',
  dataAktualizacji: '2026-08-18',
  queries: [
    'jak pisać prompty',
    'jak pisać dobre prompty',
    'prompt engineering dla firm po polsku',
    'jak pisać prompty do ChatGPT',
  ],
  tresc: [
    {
      typ: 'akapit',
      tekst: 'Krótko: jeśli AI daje słabe odpowiedzi, problem prawie zawsze jest w pytaniu. Dobry prompt mówi modelowi cztery rzeczy: kim ma być, co dokładnie ma zrobić, dla kogo i w jakiej formie. Te 6 zasad zamienia ogólne polecenie w precyzyjny prompt, który daje powtarzalny wynik. Każda zasada ma przykład przed i po.',
    },
    {
      typ: 'cytat',
      tekst: 'AI nie czyta w myślach. Dostaje dokładnie to, co napiszesz. Im więcej kontekstu dasz, tym mniej zgadywania, a więcej trafienia.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Zasada 1: Nadaj AI rolę',
      akapity: [
        'Zacznij od tego, kim AI ma być. Rola ustawia poziom, ton i wiedzę. „Napisz mail" da ogólny tekst. „Wciel się w handlowca z 10-letnim stażem" da tekst, który brzmi jak od kogoś, kto wie, co robi.',
      ],
      wariant: 'top',
    },
    {
      typ: 'tabela',
      naglowki: [
        'Przed',
        'Po',
      ],
      wiersze: [
        [
          'Napisz mi tekst o naszej usłudze sprzątania.',
          'Wciel się w copywritera, który pisze dla firm usługowych. Napisz tekst o naszej usłudze sprzątania biur dla małych firm.',
        ],
      ],
      podpis: 'Zasada 1: rola dla AI, prompt przed i po',
    },
    {
      typ: 'sekcja',
      naglowek: 'Zasada 2: Powiedz, dla kogo to jest',
      akapity: [
        'Ten sam tekst pisze się inaczej do prezesa, inaczej do mamy szukającej przedszkola. Podaj odbiorcę, a AI dobierze język, długość i argumenty. Bez tego dostajesz tekst „dla wszystkich", czyli dla nikogo.',
      ],
      wariant: 'edge',
    },
    {
      typ: 'tabela',
      naglowki: [
        'Przed',
        'Po',
      ],
      wiersze: [
        [
          'Wyjaśnij, czym jest nasza aplikacja.',
          'Wyjaśnij, czym jest nasza aplikacja, właścicielowi małej firmy, który nie zna się na technologii i ma 30 sekund.',
        ],
      ],
      podpis: 'Zasada 2: odbiorca tekstu, prompt przed i po',
    },
    {
      typ: 'sekcja',
      naglowek: 'Zasada 3: Bądź konkretny zamiast ogólny',
      akapity: [
        'Ogólne słowa dają ogólne wyniki. „Krótko", „profesjonalnie", „dobrze" znaczą dla każdego co innego. Podaj liczby i granice: ile słów, ile punktów, jaki ton. Konkret zamienia zgadywanie w wykonanie.',
      ],
      wariant: 'top',
    },
    {
      typ: 'tabela',
      naglowki: [
        'Przed',
        'Po',
      ],
      wiersze: [
        [
          'Napisz krótki, profesjonalny opis produktu.',
          'Napisz opis produktu w 3 zdaniach, ton rzeczowy bez przymiotników w stylu „najlepszy", skup się na jednej głównej korzyści dla klienta.',
        ],
      ],
      podpis: 'Zasada 3: konkret zamiast ogólnika, prompt przed i po',
    },
    {
      typ: 'sekcja',
      naglowek: 'Zasada 4: Pokaż przykład tego, czego chcesz',
      akapity: [
        'Jeden przykład mówi więcej niż akapit instrukcji. Jeśli masz wzór, który Ci się podoba, wklej go i napisz „w tym stylu". AI dopasuje rytm, długość i ton do tego, co pokażesz. To najszybszy sposób na powtarzalny wynik.',
      ],
      wariant: 'edge',
    },
    {
      typ: 'tabela',
      naglowki: [
        'Przed',
        'Po',
      ],
      wiersze: [
        [
          'Napisz post na Facebooka o naszej promocji.',
          'Napisz post na Facebooka o naszej promocji w stylu tego, który zadziałał: „[wklej swój udany post]". Ta sama długość i ton, inny temat.',
        ],
      ],
      podpis: 'Zasada 4: przykład wzoru, prompt przed i po',
    },
    {
      typ: 'sekcja',
      naglowek: 'Zasada 5: Określ format wyjścia',
      akapity: [
        'Powiedz, jak ma wyglądać odpowiedź: lista, tabela, mail, 3 warianty do wyboru. Bez tego AI sam zgaduje formę, a Ty potem przepisujesz. Z formatem dostajesz gotowiec, który możesz wkleić tam, gdzie go potrzebujesz.',
      ],
      wariant: 'top',
    },
    {
      typ: 'tabela',
      naglowki: [
        'Przed',
        'Po',
      ],
      wiersze: [
        [
          'Wymyśl pomysły na posty.',
          'Wypisz 10 pomysłów na posty jako listę. Przy każdym jedno zdanie tematu i w nawiasie problem klienta, który rozwiązuje.',
        ],
      ],
      podpis: 'Zasada 5: format wyjścia, prompt przed i po',
    },
    {
      typ: 'sekcja',
      naglowek: 'Zasada 6: Pozwól AI dopytać, zanim zacznie',
      akapity: [
        'Gdy zadanie jest trudne, dopisz na końcu: „Jeśli czegoś Ci brakuje, dopytaj, zanim odpowiesz". AI najpierw zada pytania, a potem zrobi robotę na pełnych danych. To prosty trick, który zamienia ogólną odpowiedź w trafioną.',
      ],
      wariant: 'edge',
    },
    {
      typ: 'tabela',
      naglowki: [
        'Przed',
        'Po',
      ],
      wiersze: [
        [
          'Przygotuj ofertę dla klienta.',
          'Przygotuj ofertę dla klienta. Najpierw zadaj mi pytania o jego potrzeby, budżet i termin, a dopiero potem napisz ofertę.',
        ],
      ],
      podpis: 'Zasada 6: zgoda na dopytanie, prompt przed i po',
    },
    {
      typ: 'sekcja',
      naglowek: 'Szablon dobrego promptu (skopiuj i uzupełnij)',
      akapity: [
        'Złóż wszystkie zasady w jeden szablon. Podmień pola w nawiasach na swoje i masz prompt, który prawie zawsze trafia: „Wciel się w [rola]. Napisz [co] dla [dla kogo]. Cel: [cel]. Forma: [format, np. lista / mail / 3 wersje]. Długość: [ile]. Ton: [jaki]. Jeśli czegoś Ci brakuje, dopytaj, zanim odpowiesz".',
      ],
      punkty: [
        'Rola: kim ma być AI (handlowiec, copywriter, księgowy).',
        'Zadanie: co dokładnie ma zrobić (napisać, podsumować, wymyślić).',
        'Odbiorca: dla kogo to jest (klient, zespół, urząd).',
        'Cel: po co to robisz (sprzedać, wyjaśnić, uspokoić).',
        'Format i długość: jak ma wyglądać wynik.',
        'Ton: oficjalny, swobodny, zwięzły, ekspercki.',
      ],
      wariant: 'quiet',
    },
    {
      typ: 'akapit',
      tekst: 'Nie chce Ci się składać promptu ręcznie za każdym razem? Mamy darmowy Generator promptów AI dla firm. Wybierasz branżę, zadanie, cel i styl, a on składa gotowy prompt do skopiowania w 30 sekund. Te 6 zasad ma już w środku.',
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

  /**
   * v22 (PLAN-v22 §3 P2 pkt 12): POWIĄZANIA MATERIAŁU. Przed rundą magnet
   * był ślepym zaułkiem: zero wyjść do oferty i do poradnika, który tłumaczy
   * temat głębiej. Obie trasy są realne i stoją w rejestrach.
   */
  powiazaneUslugi: [
    {
      etykieta: 'Chatboty i Agenci AI',
      href: '/uslugi/chatboty',
      opis:
        'Bot uczony na wiedzy Twojej firmy, który odpowiada klientom przez całą dobę.',
    },
  ],
  powiazanePoradniki: [
    {
      etykieta: 'Ile kosztuje chatbot dla firmy w 2026',
      href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
      opis:
        'Od czego zaczynają się ceny chatbotów i co je podnosi.',
    },
  ],
  /* v22: te materialy odsylaja do narzedzi golym tekstem w zdaniu
     (np. „w sekcji /narzedzia"), wiec sciezka byla nieklikalna. Zdania
     zostaja nietkniete, a czytelnik dostaje realny link. */
  powiazaneNarzedzia: [
    {
      etykieta: 'Generator promptów',
      href: '/narzedzia#generator-promptow',
      opis:
        'Ułoży polecenie do AI według zasad z tego materiału, bez składania go ręcznie.',
    },
  ],
};
