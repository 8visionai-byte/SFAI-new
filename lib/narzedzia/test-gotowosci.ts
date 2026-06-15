/**
 * DANE TESTU GOTOWOŚCI (spec 07 §3). Deterministyczna tablica wag — ZERO AI po
 * stronie klienta. Trzymane osobno, bo część (osie + progi + rekomendacje) musi
 * być wyrenderowana w statycznym HTML strony 1:1 z logiką wyspy (cytowalność +
 * fallback bez JS).
 *
 * 8 pytań, 4 osie po 2 pytania. Każda odpowiedź ma wagę 0–10. Wynik osi = suma 2
 * odpowiedzi (0–20) znormalizowana do 0–100. Wynik globalny = średnia 4 osi.
 */

export type OsId = 'procesy' | 'dane' | 'ludzie' | 'usecase';

export type Os = {
  id: OsId;
  label: string;
  /** Opis osi do statycznego HTML ("co decyduje o gotowości"). */
  opis: string;
  /** Link do właściwej usługi (REALNY slug z lib/uslugi). */
  uslugaHref: string;
  /** Rekomendacja "od czego zacząć", gdy ta oś jest najsłabsza (answer-first). */
  rekomendacja: string;
};

export type Pytanie = {
  id: string;
  os: OsId;
  pytanie: string;
  /** Odpowiedzi z wagą 0–10 (10 = najlepiej przygotowany). */
  odpowiedzi: { label: string; waga: number }[];
};

export type Prog = {
  min: number;
  max: number;
  etykieta: string;
  sens: string;
};

/** 4 osie. `uslugaHref` używa REALNYCH slugów z rejestru lib/uslugi. */
export const OSIE: readonly Os[] = [
  {
    id: 'procesy',
    label: 'Procesy',
    opis:
      'Czy jest co automatyzować. Powtarzalne, w miarę stałe czynności, które ktoś robi ręcznie co dzień lub co tydzień.',
    uslugaHref: '/uslugi/automatyzacje',
    rekomendacja:
      'Zacznij od spisania jednego procesu, który robicie najczęściej. To kandydat numer jeden do automatyzacji.',
  },
  {
    id: 'dane',
    label: 'Dane i bezpieczeństwo',
    opis:
      'Gdzie trzymacie dane i czy są w jednym miejscu. Im mniej rozproszone, tym łatwiej je bezpiecznie podłączyć.',
    uslugaHref: '/uslugi/rozwiazania',
    rekomendacja:
      'Zbierz dane w jedno miejsce, zanim cokolwiek podłączysz. Rozproszone arkusze i skrzynki to pierwszy hamulec.',
  },
  {
    id: 'ludzie',
    label: 'Ludzie',
    opis:
      'Czy zespół jest przeciążony powtarzalną robotą i otwarty na narzędzia, które ją zdejmą.',
    uslugaHref: '/uslugi/chatboty',
    rekomendacja:
      'Pogadaj z zespołem, co zjada im najwięcej czasu. Oni najlepiej wiedzą, co odciąć najpierw.',
  },
  {
    id: 'usecase',
    label: 'Pierwszy use-case',
    opis:
      'Czy jest jeden jasny proces do zdjęcia na start. Dobry pierwszy projekt jest mały, częsty i schematyczny.',
    uslugaHref: '/uslugi/automatyzacje',
    rekomendacja:
      'Wybierz jeden mały, częsty proces na pilotaż. Mały pierwszy krok daje szybki dowód, że to działa.',
  },
] as const;

/** 8 pytań (po 2 na oś). Kolejność = kolejność w quizie. */
export const PYTANIA: readonly Pytanie[] = [
  {
    id: 'p1',
    os: 'procesy',
    pytanie: 'Ile czynności w firmie powtarza się codziennie lub co tydzień prawie tak samo?',
    odpowiedzi: [
      { label: 'Sporo, robimy je w kółko ręcznie', waga: 10 },
      { label: 'Kilka, ale nie są spisane', waga: 6 },
      { label: 'Mało, każda sprawa jest inna', waga: 2 },
    ],
  },
  {
    id: 'p2',
    os: 'procesy',
    pytanie: 'Czy te powtarzalne czynności są gdzieś opisane krok po kroku?',
    odpowiedzi: [
      { label: 'Tak, mamy procedury', waga: 10 },
      { label: 'Częściowo, w głowach ludzi', waga: 5 },
      { label: 'Nie, każdy robi po swojemu', waga: 1 },
    ],
  },
  {
    id: 'p3',
    os: 'dane',
    pytanie: 'Gdzie trzymacie dane firmy (klienci, zamówienia, dokumenty)?',
    odpowiedzi: [
      { label: 'W jednym systemie, uporządkowane', waga: 10 },
      { label: 'W kilku miejscach, da się połączyć', waga: 6 },
      { label: 'Rozproszone, arkusze i skrzynki', waga: 2 },
    ],
  },
  {
    id: 'p4',
    os: 'dane',
    pytanie: 'Jak podchodzicie do tego, gdzie i jak przetwarzane są wasze dane?',
    odpowiedzi: [
      { label: 'Pilnujemy tego, ważne że w UE i zgodnie z RODO', waga: 10 },
      { label: 'Trochę nas to martwi, chcemy mieć kontrolę', waga: 6 },
      { label: 'Nie wiemy, czego się trzymać', waga: 3 },
    ],
  },
  {
    id: 'p5',
    os: 'ludzie',
    pytanie: 'Czy ktoś w zespole regularnie siedzi po godzinach nad ręczną robotą?',
    odpowiedzi: [
      { label: 'Tak, brakuje nam rąk do powtarzalnych zadań', waga: 10 },
      { label: 'Czasem, w szczytach', waga: 6 },
      { label: 'Raczej nie', waga: 3 },
    ],
  },
  {
    id: 'p6',
    os: 'ludzie',
    pytanie: 'Jak zespół zareaguje na narzędzie, które zdejmie część roboty?',
    odpowiedzi: [
      { label: 'Ucieszą się, mają dość przepisywania', waga: 10 },
      { label: 'Ostrożnie, ale otwarcie', waga: 6 },
      { label: 'Z oporem, boją się zmian', waga: 3 },
    ],
  },
  {
    id: 'p7',
    os: 'usecase',
    pytanie: 'Czy potrafisz wskazać jeden proces, który najbardziej chciałbyś zdjąć z głowy?',
    odpowiedzi: [
      { label: 'Tak, wiem dokładnie który', waga: 10 },
      { label: 'Mam kilka kandydatów', waga: 6 },
      { label: 'Jeszcze nie wiem', waga: 2 },
    ],
  },
  {
    id: 'p8',
    os: 'usecase',
    pytanie: 'Jak często wykonujecie ten najbardziej uciążliwy proces?',
    odpowiedzi: [
      { label: 'Codziennie, wiele razy', waga: 10 },
      { label: 'Kilka razy w tygodniu', waga: 7 },
      { label: 'Rzadko, kilka razy w miesiącu', waga: 3 },
    ],
  },
] as const;

/** Progi werdyktu globalnego (spec 07 §3.1). */
export const PROGI: readonly Prog[] = [
  {
    min: 0,
    max: 40,
    etykieta: 'Najpierw uporządkuj fundament',
    sens: 'Dużo nisko wiszących owoców, ale brakuje jednej lub dwóch rzeczy, najczęściej uporządkowania danych.',
  },
  {
    min: 41,
    max: 65,
    etykieta: 'Prawie gotowy, brakuje 2 rzeczy',
    sens: 'Solidny potencjał. Wskazujemy dwa konkretne braki do nadrobienia przed startem.',
  },
  {
    min: 66,
    max: 85,
    etykieta: 'Gotowy na pierwszy pilotaż',
    sens: 'Można startować od jednego procesu. Fundament jest, czas na pierwszy konkret.',
  },
  {
    min: 86,
    max: 100,
    etykieta: 'Gotowy na skalę',
    sens: 'Zorganizowany. Zostają punktowe usprawnienia i dokładanie kolejnych procesów.',
  },
] as const;

/** Mikrokopia CTA wg etykiety werdyktu (spec 07 §3.4). */
export const CTA_WG_WERDYKTU: Record<string, string> = {
  'Najpierw uporządkuj fundament':
    'Zacznijmy od fundamentu. Pokażę, co najpierw, bez wielkiego wdrożenia.',
  'Prawie gotowy, brakuje 2 rzeczy':
    'Jesteś blisko. Pokażę Ci dokładnie te dwie rzeczy do nadrobienia.',
  'Gotowy na pierwszy pilotaż':
    'Jesteś gotowy. Rozpiszę Ci ten pierwszy krok konkretnie.',
  'Gotowy na skalę': 'Jesteś poukładany. Pokażę, co dołożyć, żeby ruszyć szerzej.',
};

export function progDla(globalny: number): Prog {
  return PROGI.find((p) => globalny >= p.min && globalny <= p.max) ?? PROGI[0]!;
}
