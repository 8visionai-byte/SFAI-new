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
  url: 'https://simplefast.ai',
  locale: 'pl_PL',
  lang: 'pl',
  description:
    'Architekt AI dla MŚP: automatyzacje, chatboty, voiceboty, aplikacje i wtyczki oraz strony www pozycjonowane pod SEO/AEO/GEO. Budujemy AI Agentów, którzy wykonują pracę, nie tylko gadają.',
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
  },
  sameAs: [
    'https://www.linkedin.com/company/simplefast-ai', // TODO:ZWERYFIKUJ
    'https://www.facebook.com/simplefast.ai', // TODO:ZWERYFIKUJ
  ],
  ogImageDefault: '/og/default.png',
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
 * Pozycjonowanie marki (north star #7). Jedno zdanie-różnicownik kategorii.
 * Używane w hero, meta, schema — utrzymuj spójne brzmienie.
 */
export const POSITIONING = {
  claim: 'Budujemy AI Agentów, nie chatboty.',
  subClaim: 'Agent AI działa, nie tylko gada.',
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
  href: '#diagnoza',
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
export const HOME_LAST_MODIFIED = '2026-06-15';

/**
 * Data publikacji 6 stron uslug (/uslugi/<slug>) — faza 3 wypelnila je trescia.
 * Uzywana przez sitemap (app/sitemap.ts) jako `lastModified` dla URL-i z rejestru
 * lib/uslugi. NIE `new Date()` przy buildzie (falszywa swiezosc traci wartosc GEO).
 */
export const USLUGI_LAST_MODIFIED = '2026-06-15';

/**
 * Data ostatniej realnej rewizji huba /ai-radar (Centrum Wiedzy -> AI Radar).
 * Hub startuje z 2 wpisami-szablonami formatu (data 2026-06-16). Trzymamy literal
 * (lib/site.ts bez zaleznosci od warstwy tresci); pojedyncze wpisy /ai-radar/[slug]
 * biora lastmod z `data` w rejestrze lib/ai-radar.
 */
export const AI_RADAR_LAST_MODIFIED = '2026-06-16';

/**
 * Wszystkie planowane trasy z IA (spec 01 §1). `live` odzwierciedla realny stan
 * repo: na ten moment istnieje tylko strona glowna. Reszta = scaffold pod sitemap,
 * przelaczana na `live: true` przy stawianiu kazdej podstrony.
 */
export const ROUTES: RouteEntry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', live: true, lastModified: HOME_LAST_MODIFIED },

  // Hub /uslugi (rozdroze) — zbudowany (app/uslugi/page.tsx, SSG): rozdroze 3 klastrow
  // + wejscie do strony-parasola. live:true -> wchodzi do sitemapy.
  { path: '/uslugi', priority: 0.9, changeFrequency: 'monthly', live: true, lastModified: USLUGI_LAST_MODIFIED },

  // Strona-parasol "Architekci Wartosci AI" (app/uslugi/architekci-wartosci-ai/page.tsx, SSG).
  // CELOWO poza rejestrem lib/uslugi (to centrum oferty, nie szablonowa usluga), wiec
  // jej URL wpisujemy tu recznie. live:true -> wchodzi do sitemapy.
  { path: '/uslugi/architekci-wartosci-ai', priority: 0.9, changeFrequency: 'monthly', live: true, lastModified: USLUGI_LAST_MODIFIED },

  // 6 stron uslug (/uslugi/<slug>) NIE jest tu wpisanych pojedynczo — zrodlem prawdy
  // ich URL-i jest rejestr lib/uslugi (USLUGI_SLUGS), a sitemap (app/sitemap.ts) dolacza
  // je bezposrednio z rejestru. Dzieki temu slug w trasie SSG, w linkach nawigacji i w
  // sitemapie NIGDY sie nie rozjedzie (zamyka bloker #1: rozjazd slugow ROUTES <-> rejestr).
  // Wczesniej byly tu slugi IA (automatyzacja / strony-seo-geo / agenci-ai / aplikacje-i-wtyczki),
  // ktore NIE pasowaly do realnych tras SSG — celowo usuniete.

  // Huby branz / slownik / narzedzia.
  { path: '/narzedzia', priority: 0.7, changeFrequency: 'monthly', live: true, lastModified: HOME_LAST_MODIFIED },

  // Hub /produkty (gotowe produkty AID) — zbudowany (app/produkty/page.tsx, SSG).
  // live:true -> wchodzi do sitemapy. W menu (NAV_LINKS) jako "Produkty".
  { path: '/produkty', priority: 0.8, changeFrequency: 'monthly', live: true, lastModified: HOME_LAST_MODIFIED },

  // Centrum Wiedzy AI — hub /wiedza organizuje 4 dzialy (Poradniki, AI Radar,
  // Przemyslenia=/blog, Case studies=/realizacje). Hub i Poradniki zbudowane (SSG):
  // app/wiedza/page.tsx i app/poradniki/page.tsx -> live:true (wchodza do sitemapy).
  // Pojedyncze /poradniki/[slug] NIE sa tu wpisane pojedynczo: zrodlem prawdy ich
  // URL-i jest rejestr lib/poradniki (PORADNIKI_SLUGS), a sitemap dolacza je z rejestru
  // (jak lib/blog/lib/uslugi) -> slug w trasie SSG i w sitemapie nigdy sie nie rozjedzie.
  { path: '/wiedza', priority: 0.8, changeFrequency: 'monthly', live: true, lastModified: HOME_LAST_MODIFIED },
  { path: '/poradniki', priority: 0.7, changeFrequency: 'monthly', live: true, lastModified: HOME_LAST_MODIFIED },

  // AI Radar (silnik newsow „AI o 19:00") — hub /ai-radar zbudowany (SSG, 200 OK):
  // app/ai-radar/page.tsx + app/ai-radar/[slug]. Startuje z 2 wpisami-SZABLONAMI
  // formatu (szablon:true, widoczny disclaimer „PRZYKLAD/SZABLON") — realne newsy
  // doda redakcja (Pawel/Make). Tresc jest realna i 200 OK, wiec live:true. Pojedyncze
  // /ai-radar/[slug] dolacza sitemap z rejestru lib/ai-radar (RADAR_SLUGS), jak blog.
  { path: '/ai-radar', priority: 0.6, changeFrequency: 'weekly', live: true, lastModified: AI_RADAR_LAST_MODIFIED },
  // /materialy: hub + 3 magnety z pelna trescia postawione (SSG, 200 OK) -> live:true.
  // lastModified zsynchronizowany z MATERIALY_LAST_MODIFIED w rejestrze lib/materialy
  // (trzymamy literal, bo lib/site.ts pozostaje bez zaleznosci od warstwy tresci).
  { path: '/materialy', priority: 0.6, changeFrequency: 'monthly', live: true, lastModified: '2026-06-16' },

  // Dowod i konwersja.
  { path: '/realizacje', priority: 0.8, changeFrequency: 'weekly', live: true, lastModified: HOME_LAST_MODIFIED },
  { path: '/blog', priority: 0.6, changeFrequency: 'weekly', live: true, lastModified: HOME_LAST_MODIFIED },
  { path: '/o-nas', priority: 0.6, changeFrequency: 'monthly', live: true, lastModified: HOME_LAST_MODIFIED },
  { path: '/dowod', priority: 0.5, changeFrequency: 'monthly', live: false, lastModified: HOME_LAST_MODIFIED },
  { path: '/kontakt', priority: 0.5, changeFrequency: 'yearly', live: false, lastModified: HOME_LAST_MODIFIED },

  // Strony prawne (RODO art. 13). Wymagane PRZED zbieraniem danych w formularzu.
  // INPUT/BUILD: postawić treść stron, potem ustawić live: true (wejdą do sitemapy).
  { path: '/polityka-prywatnosci', priority: 0.3, changeFrequency: 'yearly', live: false, lastModified: HOME_LAST_MODIFIED },
  { path: '/obowiazek-informacyjny', priority: 0.3, changeFrequency: 'yearly', live: false, lastModified: HOME_LAST_MODIFIED },
];

/**
 * Ścieżki stron prawnych — single source dla formularza (link zgody) i Footera.
 * Trasy są w ROUTES (sitemap). Strony do postawienia przez agenta budującego.
 */
export const LEGAL_ROUTES = {
  privacy: '/polityka-prywatnosci',
  infoDuty: '/obowiazek-informacyjny',
} as const;
