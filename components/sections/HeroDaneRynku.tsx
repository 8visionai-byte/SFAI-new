import type { CSSProperties } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { DaneLicznik } from './HeroDaneRynkuLicznik';

/**
 * HeroDaneRynku — LEWE SKRZYDŁO PASA HERO: cztery świecące chipy z liczbami
 * o rynku AI. Zastępują trzy chipy zaufania („Twoje dane zostają w UE",
 * „RODO i AI Act", „Płacisz za efekt"), które z hero ZNIKAJĄ.
 *
 * DECYZJA WŁAŚCICIELA (v10, cytat): „Jakieś CZTERY takie rzeczy, muszą MOCNIEJ
 * ŚWIECIĆ (...) Może taki LICZNIK: firmy używające, wdrażające AI, po lewej
 * stronie, taki licznik, który cały czas bije do góry, ile już firm korzysta
 * procentowo z AI. WARIANT Z LICZBAMI JEST OK." To JEDYNE miejsce na stronie,
 * w którym ta runda pisze nowe treści, i wyłącznie dlatego, że właściciel
 * polecił to wprost, a KAŻDA liczba ma zewnętrzne źródło.
 *
 * ŹRÓDŁA (raporty/plan-dane-problem.md — liczby odczytane z ORYGINALNYCH
 * dokumentów, nie z przedruków w mediach):
 *   8,7%        — GUS, „Społeczeństwo informacyjne w Polsce w 2025 r." (D-4)
 *   6,1% / 42%  — GUS, ten sam raport, wykres 63 (D-5)
 *   8,4% / 20%  — Eurostat, „20% of EU enterprises use AI technologies" (D-1)
 *   77%         — Polski Instytut Ekonomiczny (D-10)
 * ŻELAZNA ZASADA: zero liczb bez źródła, więc instytucja I ROK stoją PRZY
 * liczbie (nie w stopce sekcji) — to jest też wymóg AEO/GEO: model cytujący
 * naszą stronę musi mieć nazwę instytucji obok liczby. Pełne brzmienie skrótu
 * niesie <abbr title>, żeby mikropodpis został mikropodpisem.
 *
 * ŚWIECENIE: liczba jedzie na .inf-counter-value, czyli DOKŁADNIE tej klasie,
 * którą właściciel chwali w pasku liczników po prawej stronie bloba (mono 700,
 * pełne nasycenie koloru + `text-shadow: 0 0 12px currentColor`). Pudełko chipa
 * dokłada obwódkę, tinted tło i halo w tym samym kolorze (.inf-stat-chip
 * w globals.css). Kolory = paleta liczników (cyjan, magenta, zieleń, bursztyn);
 * violet #8b5cf6 świadomie POMINIĘTY: na tle chipa daje 4,27:1, czyli poniżej
 * progu AA dla małego tekstu, a te liczby bywają renderowane w 19px.
 *
 * ANIMACJA: tylko chip 1 (decyzja: „ten licznik bije do góry"). Pętla jest
 * WSPÓLNA (components/motion/licznikTicker), bramki desktop / !reduced-motion /
 * !Save-Data, pauza poza kadrem — patrz HeroDaneRynkuLicznik.
 *
 * KOMPONENT SERWEROWY: do bundla klienta idzie wyłącznie mikro-plik licznika.
 */
type Zrodlo = { skrot: string; pelna: string; rok: string };

const GUS: Zrodlo = { skrot: 'GUS', pelna: 'Główny Urząd Statystyczny', rok: '2025' };
const EUROSTAT: Zrodlo = {
  skrot: 'Eurostat',
  // Oficjalna polska nazwa instytucji. Ten string trafia do atrybutu title,
  // więc czytają go też modele cytujące stronę — błędna nazwa poszłaby dalej.
  pelna: 'Europejski Urząd Statystyczny',
  rok: '2025',
};
const PIE: Zrodlo = { skrot: 'PIE', pelna: 'Polski Instytut Ekonomiczny', rok: '2025' };

const DANE: readonly {
  id: string;
  /** Liczba widoczna w HTML (SSR) — zawsze pełna, nigdy zero. */
  wartosc: string;
  /** Ustawione = ten chip odlicza w górę od zera po wejściu w kadr. */
  licznik?: { wartosc: number; miejsca: number; sufiks: string };
  opis: string;
  zrodlo: Zrodlo;
  kolor: string;
}[] = [
  {
    id: 'uzywa-ai',
    wartosc: '8,7%',
    licznik: { wartosc: 8.7, miejsca: 1, sufiks: '%' },
    opis: 'polskich firm używa AI',
    zrodlo: GUS,
    kolor: 'var(--accent)',
  },
  {
    id: 'male-duze',
    wartosc: '6,1% / 42%',
    // Opis musi mówić, CO mierzy liczba: chip czytany samodzielnie (także przez
    // czytnik ekranu i przez model cytujący) nie może zostawiać samych procentów.
    opis: 'używa AI: małe firmy kontra duże',
    zrodlo: GUS,
    // Magenta paska liczników (nitka lemniskaty) — brak tokenu, hex ze spec v3.
    kolor: '#ff007f',
  },
  {
    id: 'polska-ue',
    wartosc: '8,4% / 20%',
    opis: 'Polska kontra cała Unia Europejska',
    zrodlo: EUROSTAT,
    kolor: 'var(--metal-green)',
  },
  {
    id: 'nie-planuje',
    wartosc: '77%',
    // Warunek „dopóki nie musi" jest sednem tezy PIE: bez niego zdanie brzmi
    // jak trwała odmowa, a badanie mówi o odkładaniu decyzji.
    opis: 'firm bez AI czeka, aż będzie musiało',
    zrodlo: PIE,
    kolor: 'var(--warning)',
  },
] as const;

export function HeroDaneRynku() {
  return (
    /* Jeden Reveal eager na całą listę (nad foldem — bez IO, nie blokuje LCP).
       MOBILE: jedna kolumna pod blobem, od 640px dwie — nigdy poziomy scroll
       (szerokość niesie grid kontenera, chipy nie mają min-width).
       ≥1024px: słupek w lewej kolumnie pasa. Odstępy w px ARBITRALNIE
       (pułapka repo: skala spacingu to własne tokeny, h-9 = 96px!). */
    <Reveal
      as="ul"
      eager
      delay={0.1}
      className="mx-auto mt-6 grid max-w-[420px] grid-cols-1 gap-[8px] sm:max-w-[620px] sm:grid-cols-2 lg:mt-0 lg:max-w-none lg:grid-cols-1"
    >
      {DANE.map((d) => (
        <li key={d.id} className="inf-stat-chip" style={{ '--stat-c': d.kolor } as CSSProperties}>
          {d.licznik ? (
            <DaneLicznik
              wartosc={d.licznik.wartosc}
              miejsca={d.licznik.miejsca}
              sufiks={d.licznik.sufiks}
              className="inf-counter-value"
            />
          ) : (
            <span className="inf-counter-value">{d.wartosc}</span>
          )}
          <span className="inf-stat-chip-opis">{d.opis}</span>
          <span className="inf-counter-label inf-stat-chip-zrodlo">
            <abbr title={d.zrodlo.pelna}>{d.zrodlo.skrot}</abbr> {d.zrodlo.rok}
          </span>
        </li>
      ))}
    </Reveal>
  );
}
