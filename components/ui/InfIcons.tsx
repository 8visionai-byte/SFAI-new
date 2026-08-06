import type { ReactElement } from 'react';

/**
 * INFINITY v3 — zestaw 24 UNIKALNYCH ikon outline (partia A, FUNDAMENT+NAV).
 *
 * Zastępują natywne emoji w kafelkach .inf-tile (dropdowny nav, karty, sekcje
 * home) wg spec-infinity-v3 §NAWIGACJA: viewBox 0 0 20 20, stroke=currentColor,
 * strokeWidth 1.7, fill none, końcówki round. Kolor nadaje KONTEKST (kafelek
 * .inf-tile ustawia color: var(--tile-c)), ikona sama w sobie jest neutralna.
 *
 * ŻELAZNE ZASADY:
 *  - Ikony to CZYSTA DEKORACJA: <InfIcon> renderuje aria-hidden + focusable
 *    false; etykietę zawsze niesie tekst obok (tytuł wiersza/karty).
 *  - Każda nazwa = jeden unikalny glif (2-4 ścieżki). Mapowanie nazw na
 *    usługi/typy/rejestry żyje w lib/inf-kategorie.ts (single source).
 *  - Zero hooków, zero 'use client' — moduł współdzielony serwer/klient.
 *
 * Kropki (np. w kalkulatorze) to ścieżki `h.01` — strokeLinecap="round"
 * renderuje z nich okrągły punkt (wzorzec ikon lucide/feather).
 */

/**
 * Mapa nazwana { nazwa: JSX } — fragmenty ścieżek jednego glifu.
 * Atrybuty wspólne (stroke, width, caps) nadaje <svg> w <InfIcon>.
 */
export const INF_IKONY = {
  // Dymek czatu z trzema kropkami (chatboty / rozmowa).
  'chat-dymek': (
    <>
      <path d="M3 6.4a2.9 2.9 0 0 1 2.9-2.9h8.2A2.9 2.9 0 0 1 17 6.4v4.2a2.9 2.9 0 0 1-2.9 2.9H9.6L6 16.5v-3h-.1A2.9 2.9 0 0 1 3 10.6z" />
      <path d="M6.8 8.5h.01M10 8.5h.01M13.2 8.5h.01" />
    </>
  ),
  // Słuchawki z pałąkiem i mikrofonem (voiceboty / infolinia).
  'sluchawka-fala': (
    <>
      <path d="M3.5 12.5v-2a6.5 6.5 0 0 1 13 0v2" />
      <rect x="2.8" y="11.6" width="3.4" height="4.9" rx="1.5" />
      <rect x="13.8" y="11.6" width="3.4" height="4.9" rx="1.5" />
      <path d="M13.8 16.9c-1.1.8-2.4 1.2-3.8 1.2" />
    </>
  ),
  // Sylwetka osoby + ptaszek (rekrutacja / weryfikacja kandydata).
  'osoba-check': (
    <>
      <circle cx="8" cy="6.3" r="2.9" />
      <path d="M2.8 16.5c.4-2.9 2.5-4.6 5.2-4.6 1 0 1.9.2 2.7.7" />
      <path d="M12.3 14.6l1.9 1.9 3.3-3.9" />
    </>
  ),
  // Błyskawica (automatyzacje / szybkość).
  blyskawica: (
    <path d="M11.2 2.6 4.8 11h3.6l-1.4 6.4L13.6 9H9.9l1.3-6.4z" />
  ),
  // Dokument z zagiętym rogiem i linią skanu (dokumenty / OCR faktur).
  'dokument-skan': (
    <>
      <path d="M5 2.8h6.2L15 6.6v10.6H5z" />
      <path d="M11.2 2.8v3.8H15" />
      <path d="M2.6 11.4h14.8" />
    </>
  ),
  // Tarcza z sercem (opieka / bezpieczeństwo z ludzką twarzą).
  'tarcza-serce': (
    <>
      <path d="M10 2.6 16.4 5v4.6c0 3.9-2.6 6.5-6.4 7.8-3.8-1.3-6.4-3.9-6.4-7.8V5z" />
      <path d="M10 12.6S7.5 11 7.5 9.3c0-.9.7-1.6 1.5-1.6.4 0 .8.2 1 .5.2-.3.6-.5 1-.5.8 0 1.5.7 1.5 1.6 0 1.7-2.5 3.3-2.5 3.3z" />
    </>
  ),
  // Lupa ze słupkami wykresu (audyt / analiza danych).
  'lupa-wykres': (
    <>
      <circle cx="8.6" cy="8.6" r="5.6" />
      <path d="M12.9 12.9 17.2 17.2" />
      <path d="M6.4 10.6V8.9M8.6 10.6V6.9M10.8 10.6V7.9" />
    </>
  ),
  // Klocek puzzli z dwoma wypustkami (rozwiązania szyte na miarę).
  puzzle: (
    <path d="M3.4 16.6v-8h3.3a2.2 2.2 0 1 1 4.4 0h3.3v3.3a2.2 2.2 0 1 1 0 4.4v.3z" />
  ),
  // Glob z siatką południków (strony www / obecność online).
  'glob-siatka': (
    <>
      <circle cx="10" cy="10" r="7.2" />
      <path d="M2.8 10h14.4" />
      <path d="M10 2.8c2.6 2.2 2.6 12.2 0 14.4-2.6-2.2-2.6-12.2 0-14.4z" />
    </>
  ),
  // Osie i rosnąca łamana ze strzałką (optymalizacja / wzrost).
  'wykres-strzalka': (
    <>
      <path d="M3 3.5v13h14" />
      <path d="M5.8 12.6 9.6 8.8l2.5 2.5 4.3-4.6" />
      <path d="M13.4 6.7h3v3" />
    </>
  ),
  // Rakieta z okienkiem i stateczników (start / wdrożenie).
  rakieta: (
    <>
      <path d="M10 2.6c2.6 1.6 4.1 4.6 4.1 7.5l-2.1 2.2H8L5.9 10.1c0-2.9 1.5-5.9 4.1-7.5z" />
      <circle cx="10" cy="7.6" r="1.5" />
      <path d="M7.9 12.8 6.4 16.2l2.5-1.1h2.2l2.5 1.1-1.5-3.4" />
    </>
  ),
  // Duża i mała iskra (AI / generowanie, też fallback dekoracji).
  iskry: (
    <>
      <path d="M7.8 2.8 9 6.6l3.8 1.2L9 9 7.8 12.8 6.6 9 2.8 7.8 6.6 6.6z" />
      <path d="M14.2 11.2l.9 2.5 2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9z" />
    </>
  ),
  // Sześcian izometryczny (produkt / paczka).
  'pudelko-3d': (
    <>
      <path d="M10 2.9 16.4 6.5v7L10 17.1 3.6 13.5v-7z" />
      <path d="M3.6 6.5 10 10.1l6.4-3.6M10 10.1v7" />
    </>
  ),
  // Kalendarz z ptaszkiem (obecność / umówione terminy).
  'kalendarz-check': (
    <>
      <rect x="3" y="4.4" width="14" height="12.8" rx="2" />
      <path d="M3 8.4h14M7 2.6v3.2M13 2.6v3.2" />
      <path d="M7.4 12.4l1.9 1.9 3.3-3.7" />
    </>
  ),
  // Mikrofon z falami po bokach (dyktowanie / transkrypcja).
  'mikrofon-fale': (
    <>
      <rect x="7.9" y="2.6" width="4.2" height="8" rx="2.1" />
      <path d="M5.4 9a4.6 4.6 0 0 0 9.2 0M10 13.6v3.2" />
      <path d="M2.6 7.4v3.2M17.4 7.4v3.2" />
    </>
  ),
  // Głowa robota z antenką (agenci AI).
  robot: (
    <>
      <rect x="3.8" y="7" width="12.4" height="8.6" rx="2" />
      <path d="M10 4.4V7" />
      <circle cx="10" cy="3.4" r="1.1" />
      <path d="M7.4 10.4v1.8M12.6 10.4v1.8" />
    </>
  ),
  // Folder ze znacznikami kodu (projekty / aplikacje).
  'folder-kod': (
    <>
      <path d="M2.8 5.4a1.6 1.6 0 0 1 1.6-1.6h3.2l1.6 2h6.4a1.6 1.6 0 0 1 1.6 1.6v7.2a1.6 1.6 0 0 1-1.6 1.6H4.4a1.6 1.6 0 0 1-1.6-1.6z" />
      <path d="M8.4 9.9 6.6 11.7l1.8 1.8M11.6 9.9l1.8 1.8-1.8 1.8" />
    </>
  ),
  // Kompas z gwiazdą-igłą (kierunek / gotowość, coaching).
  'gwiazda-kompas': (
    <>
      <circle cx="10" cy="10" r="7.2" />
      <path d="M10 5.4l1.3 3.3 3.3 1.3-3.3 1.3-1.3 3.3-1.3-3.3-3.3-1.3 3.3-1.3z" />
    </>
  ),
  // Otwarta książka (poradniki / kursy).
  ksiazka: (
    <>
      <path d="M10 5.4C8.8 4.2 6.9 3.7 3.2 3.9v11.6c3.7-.2 5.6.3 6.8 1.5 1.2-1.2 3.1-1.7 6.8-1.5V3.9c-3.7-.2-5.6.3-6.8 1.5z" />
      <path d="M10 5.4v11.6" />
    </>
  ),
  // Notes z piórem (wpisy blogowe / treści).
  'notes-pioro': (
    <>
      <path d="M11.4 3.6H5.1a1.5 1.5 0 0 0-1.5 1.5v9.8a1.5 1.5 0 0 0 1.5 1.5h9.8a1.5 1.5 0 0 0 1.5-1.5V8.6" />
      <path d="M15.7 2.8a1.7 1.7 0 0 1 2.4 2.4l-6.8 6.9-3.1.7.7-3.1z" />
    </>
  ),
  // Magnes podkowa (lead magnety / przyciąganie klientów).
  magnes: (
    <>
      <path d="M4 3.4h4v5.8a2 2 0 0 0 4 0V3.4h4v5.8a6 6 0 0 1-12 0z" />
      <path d="M4 6.4h4M12 6.4h4" />
    </>
  ),
  // Kalkulator z klawiszami (kalkulatory oszczędności).
  kalkulator: (
    <>
      <rect x="4.2" y="2.6" width="11.6" height="14.8" rx="2" />
      <path d="M7.2 6h5.6" />
      <path d="M7.4 9.8h.01M10 9.8h.01M12.6 9.8h.01M7.4 13h.01M10 13h.01M12.6 13h.01" />
    </>
  ),
  // Ekran radaru z ramieniem i echem (AI Radar / monitoring).
  radar: (
    <>
      <circle cx="10" cy="10" r="7.2" />
      <path d="M6.6 13.4a4.8 4.8 0 0 1 0-6.8" />
      <path d="M10 10l4.6-4.6" />
      <path d="M12.8 12h.01" />
    </>
  ),
  // Składana mapa (nawigacja po ofercie / plan drogi).
  mapa: (
    <>
      <path d="M3 5.4 7.6 3.4l4.8 2 4.6-2v11.2l-4.6 2-4.8-2-4.6 2z" />
      <path d="M7.6 3.4v11.2M12.4 5.4v11.2" />
    </>
  ),
} satisfies Record<string, ReactElement>;

/** Nazwa ikony — klucz mapy INF_IKONY (unikalny glif per nazwa). */
export type InfIconName = keyof typeof INF_IKONY;

/**
 * <InfIcon name size /> — jeden glif zestawu jako dekoracyjne SVG.
 * currentColor: kolor nadaje kontekst (np. .inf-tile przez --tile-c).
 */
export function InfIcon({
  name,
  size = 20,
  className,
}: {
  name: InfIconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {INF_IKONY[name]}
    </svg>
  );
}
