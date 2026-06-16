import type { Produkt } from './types';

/**
 * PRODUKT 3 — Apka obecności i składek zespołu (rob. dla drużyny).
 * Opis przez funkcję: kto obecny, kto wpłacił/zalega. Oszczędność (szac.).
 * Zero zmyślania, głos Pawła, bez em-dash.
 */
export const apkaObecnosciSkladek: Produkt = {
  slug: 'apka-obecnosci-skladek',
  coRobi: 'Apka, która pilnuje, kto jest obecny i kto wpłacił, a kto zalega',
  nazwaRobocza: 'dla drużyny',
  dojrzalosc: 'dziala-u-nas',

  opisFunkcji:
    'Zbudowaliśmy prostą apkę, która trzyma w jednym miejscu dwie rzeczy: kto był obecny i kto ma opłaconą składkę. Widzisz od razu, kto zalega, bez przeklikiwania zeszytu czy grupy na komunikatorze. Zamiast pytać każdego z osobna, masz jeden ekran z aktualnym stanem drużyny albo zespołu.',

  dlaKogo:
    'Dla trenerów, kół, klubów i małych zespołów, które dziś liczą obecność w zeszycie, a składki w głowie.',

  coDaje:
    'Jedno miejsce zamiast zeszytu, czatu i pamięci. Oszczędność: kilkadziesiąt minut tygodniowo na zbieranie i przypominanie (szac.) oraz mniej zaległych wpłat, bo widać je od razu.',

  customNote:
    'To punkt wyjścia do customu, nie pudełkowy produkt. Ten sam szkielet (obecność plus rozliczenia plus widok zaległości) składamy pod klub, szkółkę, wspólnotę albo mały zespół projektowy.',

  demoHint:
    'Zrzut z listą osób, statusem obecności i kolorowym oznaczeniem, kto opłacił, a kto zalega.',
};
