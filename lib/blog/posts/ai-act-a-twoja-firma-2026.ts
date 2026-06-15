import type { Post } from '../types';

/**
 * WPIS 4 — AI Act a Twoja firma: co musisz wiedzieć przed wdrożeniem (2026)
 *
 * STUB (silnik): lead answer-first PRAWDZIWY i ostrożny (zero porady prawnej
 * podanej jak pewnik). Sekcje wypełnia FAZA 4.
 *
 * INPUT PAWŁA (faza 4 — do treści, traktować jako informację, nie poradę prawną):
 *  - krótkie wyjaśnienie kategorii ryzyka AI Act w języku właściciela MŚP,
 *  - obowiązki praktyczne dla typowego wdrożenia (jawność AI, informowanie ludzi),
 *  - co my robimy po stronie zgodności (jawność, że to AI; dane w UE) zamiast obietnic.
 */
export const aiActATwojaFirma: Post = {
  slug: 'ai-act-a-twoja-firma-2026',
  tytul: 'AI Act a Twoja firma: co musisz wiedzieć przed wdrożeniem (2026)',

  lead:
    'AI Act to unijne przepisy, które dzielą systemy AI według ryzyka i nakładają obowiązki głównie na te bardziej ryzykowne. Dla typowej małej firmy korzystającej z chatbota czy automatyzacji najważniejsze jest dziś, by jasno informować, że klient rozmawia z AI, i wiedzieć, gdzie trafiają dane. To wpis informacyjny, a nie porada prawna, więc przy wątpliwościach skonsultuj swój przypadek z prawnikiem.',

  metaTitle: 'AI Act a Twoja firma: co wiedzieć (2026)',
  metaDescription:
    'AI Act a Twoja firma w 2026: co realnie oznaczają kategorie ryzyka, jakie obowiązki dotyczą wdrożeń w MŚP i o co zadbać, zanim wdrożysz chatbota lub automatyzację.',

  data: '2026-06-15',
  dataAktualizacji: '2026-06-15',
  kategoria: 'Prawo i AI Act',
  tagi: ['AI Act', 'zgodność AI', 'prawo AI 2026', 'wdrożenie AI a przepisy'],

  // FAZA 4: sekcje (kategorie ryzyka, obowiązki dla MŚP, jawność AI, dane, checklista przed wdrożeniem).
  tresc: [
    {
      typ: 'akapit',
      tekst:
        'Tłumaczymy AI Act tak, jak potrzebuje tego właściciel małej firmy: co zmienia w praktyce, na co zwrócić uwagę przed wdrożeniem i czego wymaga jawność wobec klientów. Pełne sekcje uzupełniamy wkrótce.',
    },
  ],

  queries: [
    'ai act a firma',
    'ai act 2026 obowiązki',
    'ai act dla małych firm',
    'co to jest ai act',
  ],
};
