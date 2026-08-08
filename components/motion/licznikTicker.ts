/**
 * licznikTicker — JEDNA WSPÓLNA pętla requestAnimationFrame dla liczników.
 *
 * DLACZEGO ISTNIEJE (twardy warunek wydajności v10 §chipy): każdy licznik, który
 * robi sobie własne `requestAnimationFrame`, dokłada osobną pętlę do głównego
 * wątku. W hero stoi już pięć liczników rejestrów (HeroLicznikiCountUp) plus
 * nowy licznik chipa „8,7% firm w Polsce używa AI", a to jest DOKŁADNIE ten
 * fragment strony, w którym pada LCP (maszyna pisania H1). Ten moduł trzyma
 * JEDNĄ pętlę na cały dokument, niezależnie od liczby subskrybentów.
 *
 * KONTRAKT: `dodajKlatke(fn)` zwraca funkcję odpinającą. `fn(teraz)` zwraca
 * `false`, gdy animacja się skończyła — wtedy sama wypada z zestawu. Gdy zestaw
 * jest pusty, pętla NIE JEST wznawiana (zero tykania w tle, zero baterii).
 * Modułu NIE importuje żaden komponent serwerowy — wchodzi do bundla wyłącznie
 * z komponentami 'use client', które go używają.
 *
 * ŚWIADOMIE NIE RUSZAM HeroLicznikiCountUp (5 własnych pętli): to plik z innej
 * partii i element chwalony przez właściciela. Migracja tamtych liczników na
 * ten ticker = zadanie osobne (raport §Follow-ups).
 */
type Klatka = (teraz: number) => boolean;

const klatki = new Set<Klatka>();
let raf = 0;

function petla(teraz: number) {
  raf = 0;
  // Kopia zestawu: klatka może się wypisać w trakcie iteracji.
  for (const klatka of [...klatki]) {
    let zyje = false;
    try {
      zyje = klatka(teraz);
    } catch {
      zyje = false; // wywalona klatka nigdy nie zatrzymuje pozostałych
    }
    if (!zyje) klatki.delete(klatka);
  }
  if (klatki.size > 0) raf = requestAnimationFrame(petla);
}

/** Dopisuje klatkę do wspólnej pętli. Zwraca funkcję odpinającą. */
export function dodajKlatke(klatka: Klatka): () => void {
  klatki.add(klatka);
  if (raf === 0) raf = requestAnimationFrame(petla);
  return () => {
    klatki.delete(klatka);
    if (klatki.size === 0 && raf !== 0) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}
