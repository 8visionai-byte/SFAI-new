/**
 * DANE GENERATORA PROMPTÓW (spec: narzędzie 5 huba /narzedzia).
 *
 * W pełni DETERMINISTYCZNE szablony stringowe — ZERO API, ZERO modelu AI po stronie
 * klienta. Użytkownik wybiera 4 rzeczy (branża + zadanie + cel + styl), a wyspa
 * skleja gotowy prompt z fragmentów poniżej w stałej kolejności:
 *
 *   ROLA -> KONTEKST BRANŻY -> ZADANIE -> CEL -> STYL -> FORMAT WYJŚCIA -> OGRANICZENIA
 *
 * Te same fragmenty (przykładowe gotowe prompty) są też renderowane w statycznym
 * HTML strony /narzedzia#generator-promptow, więc generator jest cytowalny i daje
 * wartość nawet bez JS (spójność widget <-> treść).
 *
 * Konwencja: każda opcja ma `id` (stabilny, do selecta) i `label` (PL, dla człowieka).
 */

export type Opcja = {
  id: string;
  label: string;
};

/**
 * BRANŻA — ustawia rolę eksperta + kontekst, w jakim AI ma się poruszać.
 * `rola` -> zdanie "Jesteś...". `kontekst` -> realia branży (czego pilnować).
 */
export type Branza = Opcja & {
  /** Zdanie roli ("Jesteś doświadczonym..."). */
  rola: string;
  /** Realia branży, na które AI ma zwracać uwagę. */
  kontekst: string;
};

export const BRANZE: readonly Branza[] = [
  {
    id: 'ogolna',
    label: 'Ogólna (dowolna firma)',
    rola: 'Jesteś doświadczonym asystentem biznesowym małej firmy.',
    kontekst:
      'Piszesz prosto i konkretnie, bez żargonu. Zwracasz uwagę na czas odbiorcy i jasny następny krok.',
  },
  {
    id: 'kancelaria',
    label: 'Kancelaria prawna',
    rola: 'Jesteś asystentem doświadczonego prawnika w kancelarii.',
    kontekst:
      'Piszesz precyzyjnie i ostrożnie. Nie udzielasz porady prawnej jak adwokat, tylko przygotowujesz tekst do weryfikacji przez prawnika. Pilnujesz terminów, powołań na dokumenty i formalnego tonu wobec klienta.',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce / sklep internetowy',
    rola: 'Jesteś specjalistą od sprzedaży i obsługi klienta w sklepie internetowym.',
    kontekst:
      'Znasz realia e-commerce: opisy produktów, koszyk, dostawa, zwroty i reklamacje. Piszesz językiem korzyści dla kupującego i dbasz o to, żeby tekst zachęcał do zakupu, ale nie był nachalny.',
  },
  {
    id: 'budowlanka',
    label: 'Budowlanka / wykończenia',
    rola: 'Jesteś asystentem firmy budowlano-wykończeniowej.',
    kontekst:
      'Znasz realia placu budowy: kosztorysy, zakres prac, terminy, materiały i etapy. Piszesz rzeczowo i zrozumiale dla klienta, który nie zna się na budowlance. Unikasz obietnic, których nie da się dotrzymać.',
  },
  {
    id: 'ksiegowosc',
    label: 'Biuro rachunkowe / księgowość',
    rola: 'Jesteś asystentem biura rachunkowego.',
    kontekst:
      'Znasz realia obsługi księgowej: faktury, terminy, brakujące dokumenty i komunikacja z klientem. Piszesz precyzyjnie i przypominasz o obowiązkach, ale uprzejmie. Nie udzielasz wiążącej porady podatkowej, przygotowujesz tekst do sprawdzenia przez księgową.',
  },
  {
    id: 'gastronomia',
    label: 'Gastronomia / lokal',
    rola: 'Jesteś asystentem właściciela lokalu gastronomicznego.',
    kontekst:
      'Znasz realia gastronomii: menu, rezerwacje, dowóz, opinie gości i social media. Piszesz ciepło i apetycznie, dbasz o dobre wrażenie i zachęcenie gościa do wizyty lub zamówienia.',
  },
] as const;

/**
 * ZADANIE — co AI ma napisać. `polecenie` to rdzeń promptu (czasownik + przedmiot).
 * `format` to domyślny opis oczekiwanego wyjścia (użytkownik nie musi go znać).
 */
export type Zadanie = Opcja & {
  /** Rdzeń polecenia ("Napisz mail do klienta, który..."). */
  polecenie: string;
  /** Domyślny opis formatu wyjścia dla tego zadania. */
  format: string;
};

export const ZADANIA: readonly Zadanie[] = [
  {
    id: 'mail-klient',
    label: 'Mail do klienta',
    polecenie:
      'Napisz mail do klienta. Wstaw w nawiasach kwadratowych miejsca do uzupełnienia, np. [imię klienta], [temat sprawy], [termin].',
    format:
      'Format: temat maila w jednej linii, potem treść maila. Krótkie akapity, na końcu jasny następny krok lub pytanie.',
  },
  {
    id: 'opis-produktu',
    label: 'Opis produktu',
    polecenie:
      'Napisz opis produktu. Dane produktu wstaw jako miejsca do uzupełnienia w nawiasach kwadratowych, np. [nazwa produktu], [najważniejsze cechy], [cena].',
    format:
      'Format: jeden mocny nagłówek, krótki akapit wprowadzający, lista 3 do 5 najważniejszych korzyści, na końcu zdanie zachęcające do zakupu.',
  },
  {
    id: 'oferta',
    label: 'Oferta dla klienta',
    polecenie:
      'Napisz ofertę dla klienta. Szczegóły wstaw jako miejsca do uzupełnienia w nawiasach kwadratowych, np. [zakres usługi], [cena], [termin realizacji].',
    format:
      'Format: krótkie wprowadzenie, czytelnie wypisany zakres i warunki, na końcu jasne wezwanie do kontaktu lub akceptacji oferty.',
  },
  {
    id: 'post-social',
    label: 'Post na social media',
    polecenie:
      'Napisz post na social media (Facebook lub Instagram). Temat wstaw jako miejsce do uzupełnienia w nawiasach kwadratowych, np. [temat posta], [oferta].',
    format:
      'Format: mocne pierwsze zdanie (hook), potem 2 do 4 krótkich zdań, na końcu jedno wezwanie do działania. Dodaj 3 do 5 pasujących hasztagów.',
  },
  {
    id: 'reklamacja',
    label: 'Odpowiedź na reklamację',
    polecenie:
      'Napisz odpowiedź na reklamację klienta. Szczegóły sprawy wstaw jako miejsca do uzupełnienia w nawiasach kwadratowych, np. [czego dotyczy reklamacja], [proponowane rozwiązanie].',
    format:
      'Format: krótkie potwierdzenie zrozumienia problemu, rzeczowe wyjaśnienie, konkretne rozwiązanie i następny krok. Bez zbędnych przeprosin w kółko.',
  },
  {
    id: 'podsumowanie',
    label: 'Podsumowanie spotkania',
    polecenie:
      'Przygotuj podsumowanie spotkania. Treść spotkania wkleję pod tym promptem albo wstaw jako miejsce do uzupełnienia [notatki ze spotkania].',
    format:
      'Format: krótkie podsumowanie w 2 do 3 zdaniach, lista ustaleń, lista zadań do zrobienia z osobą odpowiedzialną i terminem, jeśli są w notatkach.',
  },
] as const;

/**
 * CEL — po co powstaje tekst. Steruje intencją i wezwaniem do działania.
 */
export type Cel = Opcja & {
  /** Zdanie celu dopisywane do promptu ("Celem tekstu jest..."). */
  instrukcja: string;
};

export const CELE: readonly Cel[] = [
  {
    id: 'sprzedaz',
    label: 'Sprzedać / zachęcić do zakupu',
    instrukcja:
      'Celem tekstu jest zachęcić odbiorcę do zakupu lub kontaktu. Podkreśl korzyści dla niego, a nie cechy techniczne. Zakończ wyraźnym wezwaniem do działania.',
  },
  {
    id: 'informacja',
    label: 'Poinformować / wyjaśnić',
    instrukcja:
      'Celem tekstu jest jasno przekazać informację. Pisz prosto, bez owijania. Najważniejsze na początku, szczegóły niżej.',
  },
  {
    id: 'relacja',
    label: 'Zbudować dobrą relację',
    instrukcja:
      'Celem tekstu jest zbudować dobrą relację z odbiorcą. Bądź uprzejmy, ludzki i pomocny. Pokaż, że rozumiesz jego sytuację.',
  },
  {
    id: 'windykacja',
    label: 'Przypomnieć o płatności (miękko)',
    instrukcja:
      'Celem tekstu jest uprzejme przypomnienie o zaległej płatności lub brakującym dokumencie. Ton ma być stanowczy, ale kulturalny, bez gróźb. Zakończ jasnym terminem i prostą drogą załatwienia sprawy.',
  },
] as const;

/**
 * STYL / TON — jak ma brzmieć tekst. Steruje formą wypowiedzi.
 */
export type Styl = Opcja & {
  /** Zdanie stylu dopisywane do promptu ("Pisz w stylu..."). */
  instrukcja: string;
};

export const STYLE: readonly Styl[] = [
  {
    id: 'oficjalny',
    label: 'Oficjalny / profesjonalny',
    instrukcja:
      'Pisz w stylu oficjalnym i profesjonalnym. Forma grzecznościowa (Pan/Pani), pełne zdania, bez skrótów myślowych i emotikonów.',
  },
  {
    id: 'swobodny',
    label: 'Swobodny / bezpośredni',
    instrukcja:
      'Pisz w stylu swobodnym i bezpośrednim, ale kulturalnym. Możesz zwracać się na Ty, jeśli pasuje do relacji. Naturalny, ludzki język.',
  },
  {
    id: 'zwiezly',
    label: 'Zwięzły / konkretny',
    instrukcja:
      'Pisz maksymalnie zwięźle. Krótkie zdania, zero lania wody. Tylko to, co potrzebne, żeby odbiorca wiedział, o co chodzi i co ma zrobić.',
  },
  {
    id: 'ekspercki',
    label: 'Ekspercki / merytoryczny',
    instrukcja:
      'Pisz w tonie eksperckim i merytorycznym, ale zrozumiałym. Pokaż znajomość tematu, używaj konkretów. Unikaj pustych ogólników i marketingowego nadęcia.',
  },
] as const;

/**
 * STAŁE OGRANICZENIA — zawsze dopisywane na końcu promptu. Wymuszają jakość:
 * język polski, brak zmyślania, pytanie o brakujące dane zamiast wymyślania.
 */
export const OGRANICZENIA = [
  'Pisz po polsku.',
  'Nie zmyślaj faktów, cen ani danych. Jeśli czegoś brakuje, zostaw miejsce w nawiasach kwadratowych do uzupełnienia.',
  'Jeśli do dobrego tekstu brakuje Ci kluczowej informacji, najpierw zadaj mi maksymalnie 3 krótkie pytania, a dopiero potem pisz.',
] as const;

/** Domyślne wybory — generator pokazuje sensowny prompt od pierwszego renderu. */
export const DOMYSLNE = {
  branza: 'ogolna',
  zadanie: 'mail-klient',
  cel: 'sprzedaz',
  styl: 'swobodny',
} as const;

/**
 * Składa GOTOWY PROMPT z 4 wyborów. Czysta funkcja, deterministyczna — te same
 * wejścia zawsze dają ten sam string. Używana przez wyspę i przez statyczne
 * przykłady w HTML (cytowalność).
 */
export function zlozPrompt(input: {
  branza: Branza;
  zadanie: Zadanie;
  cel: Cel;
  styl: Styl;
}): string {
  const { branza, zadanie, cel, styl } = input;
  const ograniczenia = OGRANICZENIA.map((o) => `- ${o}`).join('\n');

  return [
    branza.rola,
    branza.kontekst,
    '',
    `Zadanie: ${zadanie.polecenie}`,
    `Cel: ${cel.instrukcja}`,
    `Styl: ${styl.instrukcja}`,
    '',
    zadanie.format,
    '',
    'Zasady, których pilnuj:',
    ograniczenia,
  ].join('\n');
}

/** Getter opcji po id (z fallbackiem na pierwszą — guard dla TS). */
function byId<T extends Opcja>(arr: readonly T[], id: string): T {
  return arr.find((x) => x.id === id) ?? arr[0]!;
}

export const getBranza = (id: string) => byId(BRANZE, id);
export const getZadanie = (id: string) => byId(ZADANIA, id);
export const getCel = (id: string) => byId(CELE, id);
export const getStyl = (id: string) => byId(STYLE, id);

/**
 * PRZYKŁADY do statycznego HTML strony (cytowalne, działają bez JS). Trzy gotowe
 * prompty wydrukowane na stronie — pokazują wartość generatora botom i ludziom.
 * Składane tą samą funkcją `zlozPrompt`, więc nigdy nie rozjadą się z widgetem.
 */
export const PRZYKLADY: readonly { tytul: string; prompt: string }[] = [
  {
    tytul: 'E-commerce + opis produktu + sprzedaż + zwięzły',
    prompt: zlozPrompt({
      branza: getBranza('ecommerce'),
      zadanie: getZadanie('opis-produktu'),
      cel: getCel('sprzedaz'),
      styl: getStyl('zwiezly'),
    }),
  },
  {
    tytul: 'Kancelaria + mail do klienta + informacja + oficjalny',
    prompt: zlozPrompt({
      branza: getBranza('kancelaria'),
      zadanie: getZadanie('mail-klient'),
      cel: getCel('informacja'),
      styl: getStyl('oficjalny'),
    }),
  },
  {
    tytul: 'Biuro rachunkowe + mail + przypomnienie o płatności + swobodny',
    prompt: zlozPrompt({
      branza: getBranza('ksiegowosc'),
      zadanie: getZadanie('mail-klient'),
      cel: getCel('windykacja'),
      styl: getStyl('swobodny'),
    }),
  },
] as const;
