import type { RadarNews } from '../types';

/**
 * WPIS AI RADAR 2 — SZABLON FORMATU (nie realna wytyczna prawna).
 *
 * `szablon: true` -> render dokłada widoczny badge „PRZYKŁAD / SZABLON" i disclaimer,
 * a metadane dostają noindex. Pokazuje, jak AI Radar tłumaczy ZMIANĘ PRAWNĄ na konkret
 * dla MŚP: kogo dotyczy, od kiedy, co zrobić. ZERO ZMYŚLANIA: nie podajemy fałszywych
 * dat wejścia w życie, numerów artykułów ani wytycznych. To NIE jest porada prawna.
 *
 * Powiązany poradnik = istniejący wpis bloga „AI Act a Twoja firma (2026)" — realny URL,
 * zero martwego linku.
 */
export const zmianaPrzepisowAiUe: RadarNews = {
  slug: 'przyklad-szablon-zmiana-przepisow-ai-ue',
  tytul: 'Zmiana w przepisach o AI w UE: czy dotyczy Twojej firmy',

  metaTitle: 'AI Radar: zmiana przepisów o AI w UE a Twoja firma (szablon)',
  metaDescription:
    'Przykładowy wpis AI Radar: jak tłumaczymy zmianę w unijnych przepisach o AI na konkret dla małej firmy. Kogo dotyczy, od kiedy, co zrobić. Treść to szablon formatu, nie porada prawna.',

  data: '2026-06-16',
  dataAktualizacji: '2026-06-16',

  hook: 'Przepisy o AI w UE znów się zmieniły. Czy to Twój problem?',

  coSieStalo:
    'Pojawiła się zmiana albo doprecyzowanie w unijnych przepisach o sztucznej inteligencji. Dotyczy tego, jak firmy mają używać i oznaczać systemy AI. To wpis przykładowy, więc konkretną zmianę, numery przepisów i daty wejścia w życie wpisuje redakcja. Pokazujemy tu sam sposób, w jaki rozkładamy taką informację, nie samą treść wytycznej.',

  czemuWazne: {
    tekst:
      'Większość zmian w przepisach o AI brzmi groźnie, a dotyczy garstki firm. Dla typowego MŚP, które ma chatbota na stronie albo automatyzację maili, najczęściej liczą się dwie rzeczy: jawność, że klient rozmawia z AI, i porządek w danych. Dobry news mówi wprost, czy nowa zmiana to zmienia, czy nie.',
    punkty: [
      'Kogo dotyczy: czy to firmy budujące modele, czy każdy, kto używa AI w obsłudze klienta.',
      'Od kiedy: czy obowiązuje już teraz, czy ma okres przejściowy.',
      'Co trzeba zmienić: konkretne działanie, a nie ogólny niepokój.',
    ],
  },

  naszFiltr:
    'Naszą rolą jest odsiać panikę od konkretu. Większość firm po nowej zmianie w prawie AI nie musi robić nic poza tym, co i tak jest zwykłą uczciwością wobec klienta. Informuj, że to AI. Wiedz, gdzie trafiają dane. Zostaw człowieka przy trudnych sprawach. To nie jest porada prawna, a przy wysokim ryzyku albo wrażliwych danych warto pytać prawnika. Ale spokojnie: AI nie zastępuje ludzi, AI zastępuje to, co ich zatrzymuje, i robi to w zgodzie z przepisami, gdy wdrożysz je z głową.',

  coMozeFirma: [
    'Sprawdź, czy Twoje AI rozmawia z klientem albo generuje treści, które do niego idą.',
    'Upewnij się, że klient widzi jasną informację, że to AI, a nie pracownik.',
    'Zweryfikuj, gdzie przetwarzane są dane Twoich klientów. Najlepiej w Unii Europejskiej.',
    'Przy wysokim ryzyku albo wrażliwych danych skonsultuj konkretny przypadek z prawnikiem.',
  ],

  powiazanyPoradnik: 'ai-act-a-twoja-firma-2026',
  link: '/blog/ai-act-a-twoja-firma-2026',
  linkTytul: 'AI Act a Twoja firma: co musisz wiedzieć przed wdrożeniem (2026)',

  zrodla: [],

  queries: [
    'zmiana przepisów ai ue',
    'ai act zmiany dla firm',
    'news ai dla firm prawo',
  ],

  szablon: true,
};
