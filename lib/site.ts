/**
 * SINGLE SOURCE OF TRUTH — dane encji SimpleFast.ai (spec 04 §1.2).
 *
 * Spójność NAP + sameAs = warunek GEO: LLM łączy rozproszone wzmianki w JEDEN byt.
 * Zero hardkodowania nazwy / URL / kontaktu w komponentach — wszystko stąd.
 *
 * UWAGA: pola oznaczone TODO:ZWERYFIKUJ muszą być potwierdzone z Pawłem przed shipem.
 * Żelazna zasada: do schema i meta wchodzą TYLKO prawdziwe, weryfikowalne dane.
 *
 * Firma ma DWÓCH founderów: Paweł Pieloch (Architekt AI / twarz) i Marcin Karpeta
 * (współprowadzący). `founder` (l.poj.) = Paweł jako twarz/autor treści; `founders`
 * (tablica) = pełen skład do schema Organization i bloku „kto za tym stoi".
 */
export const SITE = {
  name: 'SimpleFast.ai',
  legalName: 'SimpleFast.ai', // TODO:ZWERYFIKUJ pełną nazwę prawną, jeśli inna
  /* KANONICZNA DOMENA = www (Vercel robi 308 z apex na www). Wcześniejsze
     'https://simplefast.ai' generowało 48 canonicali wskazujących na redirect
     i 46 redirectów w sitemapie (audyt Ahrefs 2026-08-06, Health Score 37) —
     każdy URL w sitemapie i każdy canonical przechodził przez przekierowanie. */
  url: 'https://www.simplefast.ai',
  locale: 'pl_PL',
  lang: 'pl',
  description:
    'Architekt AI dla polskich MŚP: automatyzacje, chatboty, voiceboty, aplikacje i wtyczki oraz strony www pod SEO/AEO/GEO. Budujemy AI Agentów, którzy wykonują pracę, nie tylko gadają — dane w UE, zgodnie z RODO, płacisz za efekt.',
  /**
   * Founder „twarz" — Paweł prowadzi komunikację i jest autorem treści (E-E-A-T,
   * authors w metadanych, podpis w stopce). Marcin jest w `founders` poniżej.
   */
  founder: {
    name: 'Paweł Pieloch',
    jobTitle: 'Architekt AI full-stack',
    email: 'pawel.pieloch@simplefast.ai',
    phone: '+48 696 674 874',
    sameAs: [
      'https://www.linkedin.com/in/pawel-pieloch', // TODO:ZWERYFIKUJ realny URL
    ],
  },
  /**
   * Pełen skład założycielski (DWÓCH founderów) — źródło dla schema Organization
   * (founder[]) i bloku autorytetu na stronie. Tylko realne osoby i kontakty.
   */
  founders: [
    {
      name: 'Paweł Pieloch',
      jobTitle: 'Architekt AI full-stack',
      email: 'pawel.pieloch@simplefast.ai',
      phone: '+48 696 674 874',
    },
    {
      name: 'Marcin Karpeta',
      jobTitle: 'Współzałożyciel',
      email: 'marcin.karpeta@simplefast.ai',
      phone: '+48 669 863 894',
    },
  ],
  // NAP — IDENTYCZNE wszędzie (strona, Google Business, Clutch, llms.txt, schema)
  contact: {
    email: 'kontakt@simplefast.ai', // realny, główny adres kontaktowy firmy
    /**
     * Guard świadomy weryfikacji: e-mail renderujemy do NAP/mailto/schema TYLKO gdy
     * emailVerified === true. kontakt@simplefast.ai to realny, działający adres
     * firmowy podany przez Pawła — dlatego true.
     */
    emailVerified: true,
    /**
     * Główny publiczny telefon = Paweł (twarz firmy). Format E.164-friendly z
     * `+48` — działa w `tel:` i w schema ContactPoint. Drugi numer (Marcin) jest
     * w `founders` / kontakcie osobowym, nie dublujemy go w głównym NAP.
     */
    phone: '+48 696 674 874',
    hours: 'pon-pt 9-18',
    areaServed: 'PL',
    // Siedziba (realna, podana przez Pawła) — do NAP w stopce i schema (poziom miasta,
    // bez ulicy). NIE ogranicza obszaru usług: pracujemy w całej Polsce, zdalnie i na miejscu.
    city: 'Pisz',
    region: 'warmińsko-mazurskie',
    country: 'PL',
    offices: ['Gubin', 'Strzegom'],
  },
  // Profile społecznościowe (realne). W sameAs = sygnał weryfikowalności encji dla LLM/Google.
  sameAs: [
    'https://www.instagram.com/simplefast.ai/',
    'https://www.tiktok.com/@simple_fast_ai',
    'https://www.facebook.com/people/Simple-Fast-AI/61588806909698/',
    'https://www.linkedin.com/company/simple-fast-ai/',
    'https://www.youtube.com/channel/UCuj5DvHxTZvB6l6IOOMDrTw',
  ],
  ogImageDefault: '/og/default.png',
  // og:image/twitter:image gotowe (public/og/*.png istnieją). OSOBNO od assetsReady,
  // który bramkuje jeszcze favicon/icon/logo (te pliki wciąż nie istnieją).
  ogReady: true,
  /**
   * Flaga assetów graficznych. Dopóki false, NIE emitujemy og:image/twitter:image
   * ani <link rel=icon> — bo pliki (public/og/*.png, favicon.ico, icon.svg, logo.png)
   * jeszcze nie istnieją i wskazywanie na nie = 404 (martwy preview, popsute karty AI/social).
   * INPUT PAWŁA: po dostarczeniu plików (og 1200x630, favicon, icon.svg, logo 512x512)
   * ustawić na true — ścieżki są już poprawne (metadataBase ustawione), zadziałają od razu.
   */
  assetsReady: false,
} as const;

/**
 * Profile społecznościowe (realne, podane przez Pawła) — źródło ikon w stopce.
 * Te same URL-e są w SITE.sameAs (schema Organization). Otwierane w nowej karcie.
 */
export const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/simplefast.ai/' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@simple_fast_ai' },
  { name: 'Facebook', href: 'https://www.facebook.com/people/Simple-Fast-AI/61588806909698/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/simple-fast-ai/' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCuj5DvHxTZvB6l6IOOMDrTw' },
] as const;

/**
 * Pozycjonowanie marki (north star #7). Jedno zdanie-różnicownik kategorii.
 * Używane w hero, meta, schema — utrzymuj spójne brzmienie.
 */
export const POSITIONING = {
  claim: 'Chatboty, voiceboty i automatyzacje AI',
  subClaim: 'Budujemy Agentów AI, którzy pracują za Ciebie 24/7.',
} as const;

/**
 * Główna nawigacja — single source dla Header i Footer.
 * `cta: true` oznacza JEDYNE główne CTA strony (north star #3).
 */
export const NAV_LINKS = [
  { label: 'Usługi', href: '/uslugi' },
  { label: 'Produkty', href: '/produkty' },
  { label: 'Realizacje', href: '/realizacje' },
  { label: 'Narzędzia', href: '/narzedzia' },
  { label: 'O nas', href: '/o-nas' },
  // „Wiedza" (hub Centrum Wiedzy) zamiast „Blog": blog staje sie dzialem huba,
  // dostepnym z /wiedza i breadcrumbow. Rekomendacja strategow z fazy 1 (jedno
  // wejscie do calej wiedzy: poradniki + AI Radar + przemyslenia + case studies).
  { label: 'Wiedza', href: '/wiedza' },
] as const;

export const PRIMARY_CTA = {
  label: 'Umów rozmowę',
  href: '/kontakt',
  // Mikrokopia pod CTA — część wzorca (spec 02 §6.1)
  microcopy: 'Bez zobowiązań. Odpowiadamy w minuty.',
} as const;

/**
 * CTA strony głównej (spec 03 §zasada 2). JEDNO główne CTA dla całego home,
 * wszystkie wystąpienia prowadzą do tego samego flow diagnozy (#diagnoza).
 * Słowa stałe: "Pokaż mi, gdzie tracę czas". W nagłówku skrót: "Umów diagnozę".
 */
export const HOME_CTA = {
  label: 'Pokaż mi, gdzie tracę czas',
  href: '/kontakt',
  microcopy:
    'Bez zobowiązań. Krótka diagnoza, konkretna lista do automatyzacji. Odpowiadam w kilka minut.',
} as const;

export type NavLink = (typeof NAV_LINKS)[number];

/**
 * REJESTR TRAS — single source of truth dla sitemap.xml (spec 04 §10, 01 §7.2).
 *
 * Zasada zelazna sitemapy: TYLKO URL-e ktore zwracaja 200 OK i sa `index`.
 * Wpisanie do sitemapy URL-a, ktory nie istnieje (404), to wyslanie botom AI
 * martwego linku = strata crawl-budzetu i sygnal niespojnosci. Dlatego kazda
 * trasa ma flage `live`: sitemap emituje wylacznie trasy `live: true`.
 *
 * Gdy agent budujacy postawi dana podstrone (np. /uslugi/chatboty), ustawia
 * `live: true` — i URL automatycznie wchodzi do sitemapy. Konwencja URL: male
 * litery, myslniki, bez koncowego slasha, bez polskich znakow (spec 01 §1).
 *
 * `lastmod`: data ostatniej REALNEJ zmiany tresci (frontmatter dla blog/realizacje).
 * Dla stron statycznych uzywamy daty ostatniej rewizji tresci, NIE `new Date()`
 * przy kazdym buildzie (fałszywy sygnal swiezosci traci wartosc — spec §10).
 */
export type RouteEntry = {
  path: string;
  priority: number;
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  /** Czy strona realnie istnieje (200 OK). Tylko `live` trafiaja do sitemapy. */
  live: boolean;
  /** ISO data ostatniej realnej zmiany tresci. Dla home = data publikacji home. */
  lastModified: string;
};

/** Data publikacji strony glownej (ostatnia realna rewizja tresci home). */
export const HOME_LAST_MODIFIED = '2026-08-16';

/**
 * Data publikacji 6 stron uslug (/uslugi/<slug>) — faza 3 wypelnila je trescia.
 * Uzywana przez sitemap (app/sitemap.ts) jako `lastModified` dla URL-i z rejestru
 * lib/uslugi. NIE `new Date()` przy buildzie (falszywa swiezosc traci wartosc GEO).
 */
export const USLUGI_LAST_MODIFIED = '2026-06-15';

/**
 * Data ostatniej realnej zmiany huba /poradniki i strony
 * /uslugi/architekci-wartosci-ai (kontrola v18: obie raportowaly czerwiec,
 * mimo ze git log pokazuje 2026-08-17 — poradniki dostaly kwoty i bloki
 * „Zobacz tez", architekci przeszli na palete v18). Stala, nie new Date().
 */
export const TRESC_SIERPIEN_2026 = '2026-08-17';

/**
 * DATA RUNDY v22 (dogrywka, kontrola v22 MAJOR-4: „sitemap lastmod sprzeczny").
 *
 * JEDNA POLITYKA `lastmod` dla całego serwisu, obowiązująca od tej rundy:
 *   lastmod trasy = data ostatniego commita, który realnie zmienił TREŚĆ tej
 *   trasy (plik strony albo jej wpis w rejestrze). Nigdy `new Date()`,
 *   nigdy data „na wyrost", nigdy wspólna stała dla stron zmienianych osobno.
 *   Weryfikacja: `git log -1 --date=short --format=%ad -- <plik rejestru>`.
 *
 * DLACZEGO TA WARTOŚĆ: runda v22 to commit 2b2c1b4 (autor 2026-08-19 00:30,
 * czyli sesja robocza z 2026-08-18, domknięta po północy). Ten sam commit
 * ustawił `dataAktualizacji: '2026-08-18'` w 13 rejestrach usług
 * (lib/uslugi/*.ts + lib/uslugi/podstrony/*.ts), więc data rundy jest już
 * zapisana w repo i tu ją tylko powtarzamy. Dwie daty dla jednej rundy byłyby
 * dokładnie tym rozjazdem, który MAJOR-4 zgłasza.
 *
 * KTO JĄ DOSTAJE: wyłącznie trasy PRZEBUDOWANE w v22 (są w `git show --stat
 * 2b2c1b4`) plus /kontakt, przebudowany w dogrywce tej samej rundy. Trasy,
 * których v22 nie tknęła (`/`, /uslugi, /narzedzia, /o-nas, /ai-radar,
 * /polityka-prywatnosci), zostają na swoich datach. Awans daty strony, która
 * się nie zmieniła, to fałszywa świeżość i traci wartość GEO tak samo jak
 * `new Date()`.
 */
export const V22_LAST_MODIFIED = '2026-08-18';

/**
 * Runda SEO z audytu 2026-08-18 (etapy 1-3, wdrożona 2026-08-19): nowy cennik
 * chatbotów, oznaczenie netto, rozdzielenie dwóch modeli opieki, pytania FAQ
 * jako nagłówki H3, dwie nowe usługi i cztery nowe karty narzędzi portfolio.
 * Dotyczy tras STATYCZNYCH — strony usług i wpisy treści mają własne
 * `dataAktualizacji` w rejestrach.
 */
export const SEO_ETAPY_1_3 = '2026-08-19';

/**
 * Data ostatniej realnej rewizji huba /ai-radar (Centrum Wiedzy -> AI Radar).
 * Hub startuje z 2 wpisami-szablonami formatu (data 2026-06-16). Trzymamy literal
 * (lib/site.ts bez zaleznosci od warstwy tresci); pojedyncze wpisy /ai-radar/[slug]
 * biora lastmod z `data` w rejestrze lib/ai-radar.
 */
export const AI_RADAR_LAST_MODIFIED = '2026-08-16';

/**
 * Wszystkie planowane trasy z IA (spec 01 §1). `live` odzwierciedla realny stan
 * repo: na ten moment istnieje tylko strona glowna. Reszta = scaffold pod sitemap,
 * przelaczana na `live: true` przy stawianiu kazdej podstrony.
 */
export const ROUTES: RouteEntry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', live: true, lastModified: SEO_ETAPY_1_3 },

  // Hub /uslugi (rozdroze) — zbudowany (app/uslugi/page.tsx, SSG): rozdroze 3 klastrow
  // + wejscie do strony-parasola. live:true -> wchodzi do sitemapy.
  // v22 dogrywka (MAJOR-4): hub /uslugi przebudowywany w TEJ rundzie (ItemList,
  // FAQ w <details>, tabela rejestru: `git diff --numstat app/uslugi/page.tsx`
  // pokazuje +248 linii w drzewie roboczym). Stała USLUGI_LAST_MODIFIED zostaje
  // wyeksportowana, bo opisuje datę POSTAWIENIA 6 stron usług i nie jest już
  // datą tego huba. GDYBY przebudowa /uslugi nie weszła do commita, ta jedna
  // linia wraca na USLUGI_LAST_MODIFIED.
  { path: '/uslugi', priority: 0.9, changeFrequency: 'monthly', live: true, lastModified: SEO_ETAPY_1_3 },

  // Strona-parasol "Architekci Wartosci AI" (app/uslugi/architekci-wartosci-ai/page.tsx, SSG).
  // CELOWO poza rejestrem lib/uslugi (to centrum oferty, nie szablonowa usluga), wiec
  // jej URL wpisujemy tu recznie. live:true -> wchodzi do sitemapy.
  { path: '/uslugi/architekci-wartosci-ai', priority: 0.9, changeFrequency: 'monthly', live: true, lastModified: SEO_ETAPY_1_3 },

  // 6 stron uslug (/uslugi/<slug>) NIE jest tu wpisanych pojedynczo — zrodlem prawdy
  // ich URL-i jest rejestr lib/uslugi (USLUGI_SLUGS), a sitemap (app/sitemap.ts) dolacza
  // je bezposrednio z rejestru. Dzieki temu slug w trasie SSG, w linkach nawigacji i w
  // sitemapie NIGDY sie nie rozjedzie (zamyka bloker #1: rozjazd slugow ROUTES <-> rejestr).
  // Wczesniej byly tu slugi IA (automatyzacja / strony-seo-geo / agenci-ai / aplikacje-i-wtyczki),
  // ktore NIE pasowaly do realnych tras SSG — celowo usuniete.

  // Huby branz / slownik / narzedzia.
  // v22 dogrywka (MAJOR-4): /narzedzia zmieniane dwa razy w tej rundzie. Raz
  // w commicie 2b2c1b4 (components/narzedzia/GeneratorPromptow.tsx, naprawa
  // martwego linku P0 #1), raz teraz (`git diff --numstat app/narzedzia/page.tsx`
  // = +169 linii w drzewie roboczym). Trasa raportowała czerwiec, mimo że sam
  // plik strony git log datuje na 2026-08-17. GDYBY ta przebudowa nie weszła do
  // commita, linia wraca na HOME_LAST_MODIFIED.
  { path: '/narzedzia', priority: 0.7, changeFrequency: 'monthly', live: true, lastModified: SEO_ETAPY_1_3 },

  // Hub /produkty (gotowe produkty AID) — zbudowany (app/produkty/page.tsx, SSG).
  // live:true -> wchodzi do sitemapy. W menu (NAV_LINKS) jako "Produkty".
  // v22 dogrywka (MAJOR-4): hub /produkty PRZEBUDOWANY w commicie 2b2c1b4
  // (app/produkty/page.tsx +185 linii: pas metryk, tabela rejestru, FAQ, ItemList),
  // a raportował czerwiec. Data rundy, nie `new Date()`.
  { path: '/produkty', priority: 0.8, changeFrequency: 'monthly', live: true, lastModified: SEO_ETAPY_1_3 },

  // Centrum Wiedzy AI — hub /wiedza organizuje 4 dzialy (Poradniki, AI Radar,
  // Przemyslenia=/blog, Case studies=/realizacje). Hub i Poradniki zbudowane (SSG):
  // app/wiedza/page.tsx i app/poradniki/page.tsx -> live:true (wchodza do sitemapy).
  // Pojedyncze /poradniki/[slug] NIE sa tu wpisane pojedynczo: zrodlem prawdy ich
  // URL-i jest rejestr lib/poradniki (PORADNIKI_SLUGS), a sitemap dolacza je z rejestru
  // (jak lib/blog/lib/uslugi) -> slug w trasie SSG i w sitemapie nigdy sie nie rozjedzie.
  // v22 dogrywka (MAJOR-4): oba huby PRZEBUDOWANE w commicie 2b2c1b4
  // (app/wiedza/page.tsx +201, app/poradniki/page.tsx +161). /poradniki stało
  // na 2026-08-17, czyli na dacie POPRZEDNIEJ rundy, mimo pełnej przebudowy.
  { path: '/wiedza', priority: 0.8, changeFrequency: 'monthly', live: true, lastModified: SEO_ETAPY_1_3 },
  { path: '/poradniki', priority: 0.7, changeFrequency: 'monthly', live: true, lastModified: SEO_ETAPY_1_3 },

  // AI Radar (silnik newsow „AI o 19:00") — hub /ai-radar zbudowany (SSG, 200 OK):
  // app/ai-radar/page.tsx + app/ai-radar/[slug]. Startuje z 2 wpisami-SZABLONAMI
  // formatu (szablon:true, widoczny disclaimer „PRZYKLAD/SZABLON") — realne newsy
  // doda redakcja (Pawel/Make). Tresc jest realna i 200 OK, wiec live:true. Pojedyncze
  // /ai-radar/[slug] dolacza sitemap z rejestru lib/ai-radar (RADAR_SLUGS), jak blog.
  { path: '/ai-radar', priority: 0.6, changeFrequency: 'weekly', live: true, lastModified: AI_RADAR_LAST_MODIFIED },
  // /materialy: hub + 3 magnety z pelna trescia postawione (SSG, 200 OK) -> live:true.
  // lastModified zsynchronizowany z MATERIALY_LAST_MODIFIED w rejestrze lib/materialy
  // (trzymamy literal, bo lib/site.ts pozostaje bez zaleznosci od warstwy tresci).
  // v22 dogrywka (MAJOR-4): hub PRZEBUDOWANY w commicie 2b2c1b4
  // (app/materialy/page.tsx +199 linii). Literał '2026-06-16' był datą
  // postawienia huba i po przebudowie mówił botom „bez zmian".
  { path: '/materialy', priority: 0.6, changeFrequency: 'monthly', live: true, lastModified: SEO_ETAPY_1_3 },

  // Dowod i konwersja.
  // v22 dogrywka (MAJOR-4): oba huby PRZEBUDOWANE w commicie 2b2c1b4
  // (app/realizacje/page.tsx +211, app/blog/page.tsx +165).
  { path: '/realizacje', priority: 0.8, changeFrequency: 'weekly', live: true, lastModified: SEO_ETAPY_1_3 },
  { path: '/blog', priority: 0.6, changeFrequency: 'weekly', live: true, lastModified: SEO_ETAPY_1_3 },
  // /o-nas i /dowod: v22 ich NIE tknęła, więc daty zostają (patrz polityka wyżej).
  { path: '/o-nas', priority: 0.6, changeFrequency: 'monthly', live: true, lastModified: '2026-06-16' },
  { path: '/dowod', priority: 0.5, changeFrequency: 'monthly', live: false, lastModified: HOME_LAST_MODIFIED },
  // v22 dogrywka: /kontakt przebudowany w tej rundzie (sekcja „Zanim wypełnisz
  // formularz", kroki po wysłaniu, FAQ w <details> + FAQPage). Literał
  // '2026-06-19' był datą postawienia strony.
  { path: '/kontakt', priority: 0.6, changeFrequency: 'monthly', live: true, lastModified: SEO_ETAPY_1_3 },

  // Strony prawne (RODO art. 13). Wymagane PRZED zbieraniem danych w formularzu.
  // INPUT/BUILD: postawić treść stron, potem ustawić live: true (wejdą do sitemapy).
  { path: '/polityka-prywatnosci', priority: 0.3, changeFrequency: 'yearly', live: true, lastModified: '2026-08-16' },
  { path: '/obowiazek-informacyjny', priority: 0.3, changeFrequency: 'yearly', live: false, lastModified: HOME_LAST_MODIFIED },
];

/**
 * Ścieżki stron prawnych — single source dla formularza (link zgody) i Footera.
 * Trasy są w ROUTES (sitemap). Strony do postawienia przez agenta budującego.
 *
 * v22 (raport `raporty/pomiary-v22-linki.md` §2, PLAN-v22 §3 P0 #3): pole
 * `infoDuty: '/obowiazek-informacyjny'` USUNIĘTE. Wskazywało na trasę, która
 * zwraca 404 (`live: false` w ROUTES, strona nigdy nie powstała). Dziś nie było
 * użyte w żadnym JSX, ale pierwsze użycie zrobiłoby z niego martwy link w
 * zgodzie RODO, czyli w najgorszym możliwym miejscu. Wraca w tej samej linijce,
 * gdy strona realnie stanie i dostanie `live: true` w ROUTES.
 */
export const LEGAL_ROUTES = {
  privacy: '/polityka-prywatnosci',
} as const;
