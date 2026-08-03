/**
 * USLUGA_OBRAZY — mapa slug usługi → zdjęcie hero (src z /public/img + opisowy
 * alt = SEO obrazków). Zdjęcie jest DEKORACJĄ hero (desktop-only w ServiceHero),
 * dlatego mieszka obok danych usług, ale POZA typem `Usluga` (treść nietykalna).
 * Brak wpisu dla sluga = hero renderuje się jak dotychczas, bez zdjęcia.
 * Wszystkie pliki: WebP 1400x788 (realne wymiary — jawne width/height anty-CLS
 * ustawia SectionImage domyślnie).
 */
export const USLUGA_OBRAZY: Record<string, { src: string; alt: string }> = {
  chatboty: {
    src: '/img/chatbot-ai-dla-firmy-rozmowa.webp',
    alt: 'Ekran laptopa z rozmową chatbota AI z klientem w nocnym biurze',
  },
  voiceboty: {
    src: '/img/voicebot-ai-odbiera-telefony.webp',
    alt: 'Mikrofon i laptop w nocnym biurze, voicebot AI odbiera połączenia',
  },
  'agent-rekrutacyjny': {
    src: '/img/agent-ai-do-rekrutacji.webp',
    alt: 'Rekruterka przy laptopie, agent AI porządkuje zgłoszenia kandydatów',
  },
  automatyzacje: {
    src: '/img/automatyzacja-procesow-w-firmie.webp',
    alt: 'Przedsiębiorca przy laptopie, dane płyną automatycznie między systemami',
  },
  'dokumenty-faktury': {
    src: '/img/automatyzacja-dokumentow-i-faktur.webp',
    alt: 'Stos papierowych dokumentów zamieniany w cyfrowe dane na laptopie',
  },
  'opieka-ai': {
    src: '/img/opieka-ai-rozwoj-i-utrzymanie.webp',
    alt: 'Specjalistka rozwija automatyzacje firmy przy panelach z kodem',
  },
  'audyt-ai': {
    src: '/img/audyt-ai-analiza-oszczednosci.webp',
    alt: 'Właściciel firmy analizuje wykresy oszczędności z wdrożenia AI',
  },
  rozwiazania: {
    src: '/img/aplikacje-i-wtyczki-na-zamowienie.webp',
    alt: 'Laptop, tablet i telefon połączone jedną aplikacją na zamówienie',
  },
  'strony-www': {
    src: '/img/strona-www-widoczna-w-google-i-ai.webp',
    alt: 'Jasne biurko z laptopem i projektem nowoczesnej strony internetowej',
  },
  optymalizacja: {
    src: '/img/pozycjonowanie-ai-lejek-widocznosci.webp',
    alt: 'Świetlisty lejek widoczności nad laptopem, pozycjonowanie w wyszukiwarkach AI',
  },
};
