/**
 * REJESTR PRODUKTÓW — single source of truth dla strony /produkty.
 *
 * Importuje moduły treści (każdy = jeden obiekt `Produkt`) i eksportuje:
 *  - PRODUKTY: tablica własnych produktów (kolejność = kolejność na stronie),
 *  - getProduktBySlug(slug): getter po slug (zwraca Produkt | undefined),
 *  - KLOCKI: katalog klocków-możliwości (sekcja pod produktami),
 *  - KLOCKI_DISCLAIMER: jawny disclaimer pod katalogiem klocków.
 *
 * Dodanie produktu = jeden import + jeden wpis w tablicy. Karty i ItemList JSON-LD
 * biorą się z tego rejestru. Konwencja slug: małe litery, myślniki, bez polskich
 * znaków, bez końcowego slasha (spójne z resztą repo).
 *
 * ŻELAZNA ZASADA: produkty opisujemy PRZEZ FUNKCJĘ, z uczciwą dojrzałością
 * (MVP / działa u nas). Zero obietnic pudełkowego produktu. Zero zmyślonych liczb.
 */
import type { Produkt } from './types';
import { appCoachingowa } from './app-coachingowa';
import { skanerFakturKsef } from './skaner-faktur-ksef';
import { apkaObecnosciSkladek } from './apka-obecnosci-skladek';
import { centrumDowodzenia } from './centrum-dowodzenia';
/* Etap 3 audytu 2026-08-18 §8: cztery narzędzia z portfolio, opisane bezosobowo
   („mamy w portfolio zbudowane takie narzędzie"), każde z problemem, który
   rozwiązuje. Piąte z listy audytu, apka dla klubów sportowych, stoi już wyżej
   jako apka-obecnosci-skladek. */
import { kampanieSocialILeady } from './kampanie-social-i-leady';
import { drugiMozgGlosowy } from './drugi-mozg-glosowy';
import { ksefIBankRozliczenia } from './ksef-i-bank-rozliczenia';
import { kalendarzFizjoterapeuty } from './kalendarz-fizjoterapeuty';

export type { Produkt, Dojrzalosc } from './types';
export { DOJRZALOSC_LABEL } from './types';

/**
 * Własne produkty, w kolejności prezentacji na /produkty.
 * Kolejność: najpierw te z twardym efektem operacyjnym (faktury i rozliczenia),
 * potem narzędzia do sprzedaży i wiedzy, na końcu apki dla mniejszych zespołów.
 */
export const PRODUKTY: readonly Produkt[] = [
  skanerFakturKsef,
  ksefIBankRozliczenia,
  kampanieSocialILeady,
  drugiMozgGlosowy,
  appCoachingowa,
  apkaObecnosciSkladek,
  kalendarzFizjoterapeuty,
  centrumDowodzenia,
] as const;

/** Indeks slug -> Produkt (O(1) lookup; budowany raz na moduł). */
const BY_SLUG: ReadonlyMap<string, Produkt> = new Map(
  PRODUKTY.map((p) => [p.slug, p])
);

/** Getter po slug. Zwraca `undefined`, gdy slug nieznany. */
export function getProduktBySlug(slug: string): Produkt | undefined {
  return BY_SLUG.get(slug);
}

/**
 * KLOCEK — jedna możliwość-cegiełka w katalogu "Z czego składamy indywidualne
 * rozwiązania". To POMYSŁY i klocki, nie finalne wykonanie (patrz disclaimer).
 */
export type Klocek = {
  /** Nazwa klocka (co potrafi), prosto i konkretnie. */
  nazwa: string;
  /** Jedno zdanie: co robi i komu zdejmuje robotę. */
  opis: string;
};

/**
 * Katalog klocków-możliwości (z 10 analogii i wdrożeń). Lista, nie obietnica.
 * Każdy klocek można rozwinąć, połączyć i złożyć indywidualnie pod proces klienta.
 */
export const KLOCKI: readonly Klocek[] = [
  {
    nazwa: 'Agent obsługi 24/7',
    opis: 'Pierwsza linia, która odpowiada na powtarzalne pytania o każdej porze, też wieczorem i w weekend.',
  },
  {
    nazwa: 'Agent rekrutacyjny',
    opis: 'Odsiewa i porządkuje napływające CV, żeby człowiek czytał tylko sensowne zgłoszenia.',
  },
  {
    nazwa: 'OCR i faktury',
    opis: 'Wyciąga dane ze skanu albo zdjęcia dokumentu i wkłada je tam, gdzie mają trafić.',
  },
  {
    nazwa: 'Monitoring procesów',
    opis: 'Pilnuje, czy coś nie utknęło, i daje znać, zanim termin albo zlecenie przepadnie.',
  },
  {
    nazwa: 'Wirtualny pracownik (mail i kalendarz)',
    opis: 'Ogarnia skrzynkę i kalendarz: sortuje, proponuje odpowiedzi, umawia spotkania.',
  },
  {
    nazwa: 'Porządkowanie danych i maili',
    opis: 'Składa bałagan w jedno miejsce: taguje, grupuje i opisuje, żeby dało się to znaleźć.',
  },
  {
    nazwa: 'RAG-chatbot bazy wiedzy',
    opis: 'Odpowiada na pytania na podstawie Twoich dokumentów, a nie zmyśla z internetu.',
  },
  {
    nazwa: 'Automat treści i social',
    opis: 'Przygotowuje wersje robocze postów i tekstów, które człowiek tylko sprawdza i wysyła.',
  },
  {
    nazwa: 'Podsumowania spotkań',
    opis: 'Z nagrania robi krótkie streszczenie z ustaleniami i listą zadań do zrobienia.',
  },
  {
    nazwa: 'Transkrypcja rozmów',
    opis: 'Zamienia rozmowy i nagrania na tekst, który da się przeszukać i wykorzystać dalej.',
  },
] as const;

/**
 * DISCLAIMER katalogu klocków — MUSI być widoczny pod listą. Uczciwy sygnał:
 * to pomysły i klocki, nie finalne wykonanie. Tekst 1:1 z briefu Pawła.
 */
export const KLOCKI_DISCLAIMER =
  'To pomysły i klocki, nie finalne wykonanie. Każdy można rozwinąć, połączyć i złożyć indywidualnie pod Twój proces.';
