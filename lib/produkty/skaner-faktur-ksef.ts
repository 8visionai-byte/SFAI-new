import type { Produkt } from './types';

/**
 * PRODUKT 2 — Skaner i automat faktur do KSeF.
 * Opis przez funkcję: zdjęcie/skan faktury -> dane do arkusza -> program
 * księgowy -> eksport KSeF (automat miesięczny). Oszczędność oznaczona (szac.).
 * Zero zmyślania, głos Pawła, bez em-dash.
 */
export const skanerFakturKsef: Produkt = {
  slug: 'skaner-faktur-ksef',
  coRobi: 'Skaner faktur, który przepisuje je za Ciebie i przygotowuje eksport do KSeF',
  dojrzalosc: 'dziala-u-nas',

  opisFunkcji:
    'Robisz zdjęcie albo skan faktury, a system wyciąga z niej dane i wkłada je do arkusza, a stamtąd do programu księgowego. Raz w miesiącu automat zbiera to wszystko i przygotowuje eksport do KSeF. Nikt nie przepisuje numerów z papieru ręcznie. Ty wrzucasz dokument, reszta dzieje się sama, a Ty tylko sprawdzasz.',

  dlaKogo:
    'Dla małych firm i biur, które co miesiąc przepisują stos faktur ręcznie i boją się literówki w kwocie albo numerze.',

  coDaje:
    'Koniec przepisywania z papieru i koniec szukania błędu w Excelu. Oszczędność: kilka godzin pracy księgowej miesięcznie (szac.) i mniej pomyłek przy przepisywaniu.',

  customNote:
    'Działa u nas, ale to nadal punkt wyjścia do customu. Pod Twój program księgowy i Twój obieg dokumentów składamy to inaczej. To klocek do złożenia, nie pudełko z jednym przyciskiem.',

  demoHint:
    'Zrzut: zdjęcie faktury obok wypełnionego arkusza z wyciągniętymi danymi oraz widok gotowego eksportu KSeF.',
};
