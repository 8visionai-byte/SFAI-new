import { USLUGI } from '@/lib/uslugi';
import { PRODUKTY } from '@/lib/produkty';
import { REALIZACJE, KATEGORIA_LABEL } from '@/lib/realizacje';
import { NARZEDZIA } from '@/lib/narzedzia';
import {
  INF_KATEGORIA,
  INF_KATEGORIA_DEFAULT,
  INF_PRODUKT,
  INF_NARZEDZIE,
  INF_REALIZACJA_EMOJI,
  INF_USLUGA_BADGE,
  INF_WIEDZA,
  INF_WIEDZA_BADGE,
} from '@/lib/inf-kategorie';

/**
 * INFINITY v3 — DANE dropdownów nawigacji (partia A, FUNDAMENT+NAV).
 *
 * Moduł SERWEROWY (bez 'use client'): Header (server component) woła
 * getNavDropdowns() w buildzie SSG i podaje KLIENTOWI gotowe, płaskie
 * pozycje {href, tytul, opis?, c, ikona}. Dzięki temu pełne rejestry
 * treści (REALIZACJE/PRODUKTY z długimi tekstami case'ów) NIE wchodzą do
 * bundla klienta — HeaderClient dostaje tylko stringi potrzebne w menu.
 *
 * TREŚĆ 1:1 z rejestrów (żelazna zasada: diff treści = 0).
 * v5 (spec §2) — wiersz wzorca: [NATYWNE emoji w kaflu 44px] [tytuł (+ opis
 * muted, gdy rejestr ma krótkie pole)] [BADGE mono po prawej]:
 *  - Usługi: u.h1 + badge pochodny sluga (INF_USLUGA_BADGE), BEZ opisu
 *    (rejestr nie ma krótkiego pola — nie wymyślamy),
 *  - Produkty: p.coRobi + badge p.nazwaRobocza (dawny opis wszedł na badge),
 *    link do kotwicy /produkty#slug (ProduktCard ma id={slug}),
 *  - Realizacje: r.h1 + badge KATEGORIA_LABEL[r.kategoria],
 *  - Narzędzia: n.tytul + badge n.etykieta,
 *  - Wiedza: 4 działy (Blog / Poradniki / Materiały / AI Radar) — nazwy 1:1
 *    z istniejących tras + badge typu (INF_WIEDZA_BADGE).
 * Pierwszy wiersz każdego dropdownu = link hub ("Wszystkie …") w DOM (SEO).
 *
 * v11 (spec §H, wzorzec "Zero to Hero / Absolute Beginner Guide"): wiersze
 * przechodzą na KRÓTKI tytuł + drobny szary podpis pod spodem (.inf-dd-desc,
 * CSS istnieje od v3). Krótkie nazwy i podpisy są DERYWOWANE wyłącznie
 * z istniejących pól rejestrów (h1 / kapsula / coRobi / opis / karty huba
 * /wiedza) — mapy NAV_*_KROTKIE niżej cytują źródło przy każdym wpisie.
 * Zero nowych obietnic, zero em-dash. Badge mono po prawej BEZ ZMIAN.
 * Nowy slug spoza mapy = fallback na długie pole rejestru bez podpisu
 * (zero zmyślania, jak dotąd przy badge'ach).
 */

/** Jedna pozycja dropdownu — płaska i serializowalna (props server->client). */
export type NavDropdownItem = {
  href: string;
  tytul: string;
  /** Krótki opis muted pod tytułem (tylko gdy rejestr ma krótkie pole). */
  opis?: string;
  /** Kolor kafelka (--tile-c). */
  c: string;
  /** v5: JASNY odcień kategorii — kolor badge'a (--badge-c). */
  odcien?: string;
  /** v5: NATYWNE emoji kafla (lista 1:1 ze spec v5 §2; dekoracja aria-hidden). */
  emoji: string;
  /** v5: BADGE mono po prawej — WYŁĄCZNIE istniejące krótkie pole rejestru. */
  badge?: string;
};

/** Jeden dropdown nav: label przycisku (1:1 z NAV_LINKS) + hub + pozycje. */
export type NavDropdownData = {
  /** Href huba — klucz dopasowania do NAV_LINKS i baza stanu aktywnego. */
  href: string;
  /** Etykieta przycisku nav, 1:1 z NAV_LINKS.label. */
  label: string;
  /** Tekst pierwszego wiersza-linku do huba ("Wszystkie …"). */
  hubLabel: string;
  items: NavDropdownItem[];
  /** Dodatkowe prefiksy tras zapalające stan aktywny (Wiedza: /blog itd.). */
  activePrefixes?: string[];
};

/** v11 §H: krótka nazwa wiersza + szary podpis pod spodem (oba derywowane). */
type DdKrotki = { tytul: string; opis: string };

/**
 * v11 §H — USŁUGI: krótki tytuł + podpis per slug.
 * Źródła per wpis w komentarzach: h1 / kapsula z lib/uslugi/<slug>.ts.
 * Fakty 1:1 z rejestru, tylko skrócone; zero nowych obietnic.
 */
const NAV_USLUGI_KROTKIE: Record<string, DdKrotki> = {
  // h1 1:1 (już krótkie); podpis: kapsula "odpowiada klientom na stronie
  // i w komunikatorach przez całą dobę".
  chatboty: {
    tytul: 'Chatbot AI dla firmy',
    opis: 'Odpowiada klientom na stronie przez całą dobę',
  },
  // Para wprost ze spec v11 §H; źródła: h1 "Voicebot dla firmy, który odbiera
  // telefon za Ciebie" + kapsula "Działa 24/7".
  voiceboty: {
    tytul: 'Voicebot AI dla firmy',
    opis: 'Odbiera telefon za Ciebie 24/7',
  },
  // Tytuł: początek h1; podpis: kapsula "zbiera CV, robi pierwszy odsiew
  // i scoring, (...) umawia rozmowy".
  'agent-rekrutacyjny': {
    tytul: 'Agent AI do rekrutacji',
    opis: 'Zbiera CV, robi pierwszy odsiew i umawia rozmowy',
  },
  // Tytuł: h1 bez "w firmie"; podpis: kapsula "przejęcie przez system
  // powtarzalnej roboty: przepisywania danych, (...) maili, terminów".
  automatyzacje: {
    tytul: 'Automatyzacja procesów z AI',
    opis: 'Przejmuje powtarzalną robotę: dane, maile, terminy',
  },
  // Tytuł: h1 bez nawiasu "(OCR, KSeF)"; podpis: kapsula "sam odczytuje
  // fakturę (OCR) (...) eksportuje do KSeF".
  'dokumenty-faktury': {
    tytul: 'Automatyzacja dokumentów i faktur',
    opis: 'System sam odczytuje faktury i eksportuje do KSeF',
  },
  // Tytuł: początek h1; podpis: reszta h1 "utrzymanie i rozwój automatyzacji"
  // + kapsula "opieka nad Twoimi agentami i automatyzacjami".
  'opieka-ai': {
    tytul: 'Opieka AI',
    opis: 'Utrzymanie i rozwój Twoich automatyzacji',
  },
  // Tytuł: początek h1; podpis: reszta h1 "mapa oszczędności czasu"
  // + kapsula "rozkładamy Twoje procesy na czynniki".
  'audyt-ai': {
    tytul: 'Audyt AI firmy',
    opis: 'Mapa oszczędności czasu w Twoich procesach',
  },
  // Tytuł i podpis = dwie połówki h1 "Indywidualne rozwiązania AI: aplikacje
  // i wtyczki na zamówienie" (1:1).
  rozwiazania: {
    tytul: 'Indywidualne rozwiązania AI',
    opis: 'Aplikacje i wtyczki na zamówienie',
  },
  // Tytuł i podpis = dwie połówki h1 "Tworzenie stron WWW widocznych
  // w Google i w AI" (1:1).
  'strony-www': {
    tytul: 'Tworzenie stron WWW',
    opis: 'Widoczne w Google i w AI',
  },
  // Etap 3 audytu 2026-08-18. Tytuł: h1 bez słowa "branżowe"; podpis:
  // kapsula "Paczka 1000 rekordów kosztuje 169 zł (...) w 20 do 30 minut".
  'leady-b2b': {
    tytul: 'Leady B2B',
    opis: '1000 rekordów firm od 169 zł',
  },
  // Tytuł: h1 bez słowa "prywatny"; podpis: kapsula "agent (...), który uczy
  // się zachowań jednej konkretnej osoby".
  'asystent-prezesa': {
    tytul: 'Asystent AI dla prezesa',
    opis: 'Uczy się zachowań jednej osoby',
  },
  // Tytuł: kapsula "Pozycjonowanie pod AI (GEO)"; podpis: reszta h1
  // "bądź cytowany w ChatGPT i Perplexity" (1:1).
  optymalizacja: {
    tytul: 'Pozycjonowanie pod AI (GEO)',
    opis: 'Bądź cytowany w ChatGPT i Perplexity',
  },
};

/**
 * v11 §H — PRODUKTY: pola coRobi to całe zdania; tniemy je na krótką nazwę
 * + podpis. Źródło per wpis: coRobi z lib/produkty/<plik>.ts. Badge
 * (nazwaRobocza) zostaje osobno, więc tytuł nie może go dublować.
 */
const NAV_PRODUKTY_KROTKIE: Record<string, DdKrotki> = {
  // Etap 3 audytu 2026-08-18 §8; tytuł i podpis = głowa i ogon coRobi.
  'ksef-i-bank-rozliczenia': {
    tytul: 'KSeF plus bank',
    opis: 'Pokazuje, które faktury są już opłacone',
  },
  'kampanie-social-i-leady': {
    tytul: 'Kampanie i social media',
    opis: 'Jedno wrzucenie publikuje na wszystkich kanałach',
  },
  'drugi-mozg-glosowy': {
    tytul: 'SF AI Team',
    opis: 'Głosowy agent z wiedzą o całej firmie',
  },
  'kalendarz-fizjoterapeuty': {
    tytul: 'Kalendarz gabinetu',
    opis: 'Wizyty zawodowe i prywatne w jednym miejscu',
  },
  // coRobi "Skaner faktur, który przepisuje je za Ciebie i przygotowuje
  // eksport do KSeF" = głowa + ogon zdania.
  'skaner-faktur-ksef': {
    tytul: 'Skaner faktur',
    opis: 'Przepisuje faktury za Ciebie, eksport do KSeF',
  },
  // coRobi "Aplikacja, w której agent układa Ci plan dnia i rozmawia o tym,
  // co trudne" = głowa + ogon; badge "PapiCoach" bez zmian.
  'app-coachingowa-z-agentami': {
    tytul: 'Aplikacja coachingowa',
    opis: 'Agent układa plan dnia i rozmawia o tym, co trudne',
  },
  // Tytuł ze sluga (apka-obecnosci-skladek); podpis: coRobi "pilnuje, kto
  // jest obecny i kto wpłacił, a kto zalega" (1:1).
  'apka-obecnosci-skladek': {
    tytul: 'Apka obecności i składek',
    opis: 'Pilnuje, kto jest obecny, kto wpłacił, a kto zalega',
  },
  // coRobi "Dyktujesz głosem, co masz w głowie, a agent sam to zapisuje,
  // sortuje i przypisuje" = tytuł z głowy, podpis z ogona; badge "Centrum
  // dowodzenia" zostaje, więc tytułem nie dublujemy nazwy roboczej.
  'centrum-dowodzenia': {
    tytul: 'Notatki dyktowane głosem',
    opis: 'Agent sam je zapisuje, sortuje i przypisuje',
  },
};

/**
 * v11 §H — REALIZACJE: h1 przeważnie już krótkie (zostają 1:1); podpis
 * = fakt z kapsuły case'a (lib/realizacje/<slug>.ts), bez nowych liczb.
 */
const NAV_REALIZACJE_KROTKIE: Record<string, DdKrotki> = {
  // h1 1:1; podpis: kapsula "75% maili wymaga już tylko drobnej korekty".
  'auto-email-bok': {
    tytul: 'Auto-email dla biura obsługi klienta',
    opis: '75% maili wymaga tylko drobnej korekty',
  },
  // h1 1:1; podpis: kapsula "1000 rekordów w 40 minut, robotę, która
  // ręcznie zajmowała dwa tygodnie".
  'lead-generator': {
    tytul: 'Błyskawiczny generator leadów',
    opis: '1000 rekordów w 40 minut zamiast dwóch tygodni',
  },
  // h1 1:1; podpis: kapsula "odpowiadają nowym leadom całą dobę, bez
  // nadzoru" (1:1).
  'agenci-ai-24-7': {
    tytul: 'Firmowi Agenci AI 24/7',
    opis: 'Odpowiadają nowym leadom całą dobę, bez nadzoru',
  },
  // h1 1:1; podpis: kapsula "prowadzi kursanta prosto do właściwej lekcji".
  'chatbot-edukacyjny-kursy': {
    tytul: 'Chatbot edukacyjny do kursów online',
    opis: 'Prowadzi kursanta prosto do właściwej lekcji',
  },
  // Tytuł: początek h1; podpis: reszta h1 (Meet, Zoom, Teams) + kapsula
  // "wysyła gotowy raport plus listę zadań".
  'auto-podsumowania-spotkan': {
    tytul: 'Auto-podsumowania spotkań',
    opis: 'Raport i lista zadań po Meet, Zoom i Teams',
  },
  // h1 1:1; podpis: kapsula "sam zbiera najświeższe newsy (...)
  // i przygotowuje gotowy post".
  'automat-tresci-social': {
    tytul: 'Automat treści na social media',
    opis: 'Sam zbiera newsy i przygotowuje gotowy post',
  },
  // Tytuł: początek h1; podpis: reszta h1 "zamiast ręcznych arkuszy"
  // + kapsula "co rano dostarcza gotowy raport".
  'automatyczne-raporty': {
    tytul: 'Automatyczne raporty',
    opis: 'Gotowy raport co rano zamiast ręcznych arkuszy',
  },
  // h1 1:1; podpis: kapsula "sama spisuje rozmowy (...) wyłapuje kluczowe
  // ustalenia".
  'transkrypcja-rozmow': {
    tytul: 'Przechwytywanie i analiza rozmów',
    opis: 'Spisuje rozmowy i wyłapuje kluczowe ustalenia',
  },
};

/**
 * v11 §H — NARZĘDZIA: tytuły kart huba są krótkie (zostają 1:1 lub tracą
 * dopisek); podpis = fragment pola `opis` z lib/narzedzia/index.ts.
 */
const NAV_NARZEDZIA_KROTKIE: Record<string, DdKrotki> = {
  // Tytuł: początek tytułu karty; podpis: opis "ile złotych rocznie
  // odzyskasz po automatyzacji" (1:1).
  'kalkulator-oszczednosci': {
    tytul: 'Kalkulator oszczędności',
    opis: 'Ile złotych rocznie odzyskasz po automatyzacji',
  },
  // Tytuł 1:1; podpis: opis "liczy koszt jednego konkretnego procesu
  // rocznie i to, po ilu miesiącach zwróci się (...) wdrożenie".
  'kalkulator-procesu': {
    tytul: 'Czy warto zautomatyzować ten proces?',
    opis: 'Koszt procesu rocznie i czas zwrotu wdrożenia',
  },
  // Tytuł 1:1; podpis: opis "osiem pytań ocenia (...) procesy, dane, ludzi
  // i pierwszy proces do zdjęcia".
  'test-gotowosci-ai': {
    tytul: 'Test gotowości firmy na AI',
    opis: 'Osiem pytań: procesy, dane, ludzie i pierwszy krok',
  },
  // Tytuł 1:1; podpis: opis "czy ChatGPT i Perplexity mogą ją cytować".
  'audyt-strony-ai': {
    tytul: 'Audyt strony pod AI (GEO)',
    opis: 'Czy ChatGPT i Perplexity mogą cytować Twoją stronę',
  },
  // Tytuł: karta huba bez "dla firm"; podpis: opis "gotowy prompt
  // do skopiowania" + "w 30 sekund".
  'generator-promptow': {
    tytul: 'Generator promptów AI',
    opis: 'Gotowy prompt do skopiowania w 30 sekund',
  },
};

/**
 * v11 §H — WIEDZA: tytuły działów już krótkie; podpisy derywowane z opisów
 * kart działów na hubie /wiedza (app/wiedza/page.tsx, tablica KATEGORIE)
 * i leadu sekcji "Narzędzia i materiały do pobrania" (materiały).
 */
const NAV_WIEDZA_PODPISY: Record<'blog' | 'poradniki' | 'materialy' | 'ai-radar', string> = {
  // Karta "Przemyślenia o AI w biznesie": "opinie i eseje o AI w małych
  // firmach, prostym językiem".
  blog: 'Przemyślenia o AI w biznesie, prostym językiem',
  // Karta "Poradniki AI dla firm": "konkret krok po kroku (...) ile kosztuje
  // (...) które procesy zautomatyzować, jak policzyć zwrot".
  poradniki: 'Konkret krok po kroku: ceny, procesy, zwrot',
  // Lead huba /wiedza: "pobierzesz gotowe prompty, checklisty i arkusze AI
  // dla firm, za darmo".
  materialy: 'Prompty, checklisty i arkusze do pobrania',
  // Karta "AI Radar": "newsy ze świata AI przefiltrowane przez jedno
  // pytanie: co to znaczy dla Twojej firmy".
  'ai-radar': 'Newsy AI z filtrem: co to znaczy dla Twojej firmy',
};

/** Buduje dane 5 dropdownów (Usługi/Produkty/Realizacje/Narzędzia/Wiedza). */
export function getNavDropdowns(): NavDropdownData[] {
  return [
    {
      href: '/uslugi',
      label: 'Usługi',
      hubLabel: 'Wszystkie usługi',
      items: USLUGI.map((u) => {
        const dekor = INF_KATEGORIA[u.slug] ?? INF_KATEGORIA_DEFAULT;
        // v11 §H: krótki tytuł + podpis z mapy; nowy slug spoza mapy
        // = fallback na pełne h1 bez podpisu (zero zmyślania).
        const krotkie = NAV_USLUGI_KROTKIE[u.slug];
        return {
          href: `/uslugi/${u.slug}`,
          tytul: krotkie?.tytul ?? u.h1,
          opis: krotkie?.opis,
          c: dekor.c,
          odcien: dekor.odcien,
          emoji: dekor.emoji,
          // Badge pochodny sluga (spec v5: CHATBOT/VOICE/.../SEO); nowy slug
          // spoza mapy = wiersz bez badge'a (undefined), zero zmyślania.
          badge: INF_USLUGA_BADGE[u.slug],
        };
      }),
    },
    {
      href: '/produkty',
      label: 'Produkty',
      hubLabel: 'Wszystkie produkty',
      items: PRODUKTY.map((p) => {
        const dekor = INF_PRODUKT[p.slug] ?? INF_KATEGORIA_DEFAULT;
        // v11 §H: zdanie coRobi pocięte na krótką nazwę + podpis (mapa wyżej);
        // nowy slug = fallback na pełne coRobi bez podpisu.
        const krotkie = NAV_PRODUKTY_KROTKIE[p.slug];
        return {
          // Strona /produkty to jeden listing z kotwicami (ProduktCard id={slug}).
          href: `/produkty#${p.slug}`,
          tytul: krotkie?.tytul ?? p.coRobi,
          opis: krotkie?.opis,
          c: dekor.c,
          odcien: dekor.odcien,
          emoji: dekor.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          // v5: nazwaRobocza przeszła z opisu na BADGE (istniejące krótkie pole).
          badge: p.nazwaRobocza,
        };
      }),
    },
    {
      href: '/realizacje',
      label: 'Realizacje',
      hubLabel: 'Wszystkie realizacje',
      items: REALIZACJE.map((r) => {
        const kat = INF_KATEGORIA[r.kategoria] ?? INF_KATEGORIA_DEFAULT;
        // v11 §H: tytuł krótki (h1 lub jego głowa) + podpis-fakt z kapsuły;
        // nowy slug = fallback na pełne h1 bez podpisu.
        const krotkie = NAV_REALIZACJE_KROTKIE[r.slug];
        return {
          href: `/realizacje/${r.slug}`,
          tytul: krotkie?.tytul ?? r.h1,
          opis: krotkie?.opis,
          c: kat.c,
          odcien: kat.odcien,
          emoji: INF_REALIZACJA_EMOJI[r.slug] ?? INF_KATEGORIA_DEFAULT.emoji,
          // v5: etykieta kategorii przeszła z opisu na BADGE (istniejące pole).
          badge: KATEGORIA_LABEL[r.kategoria],
        };
      }),
    },
    {
      href: '/narzedzia',
      label: 'Narzędzia',
      hubLabel: 'Wszystkie narzędzia',
      items: NARZEDZIA.map((n) => {
        const dekor = INF_NARZEDZIE[n.slug] ?? INF_KATEGORIA_DEFAULT;
        return {
          // v8b (BLOKER 404): tras /narzedzia/<slug> NIE MA — hub /narzedzia to
          // jeden listing z kotwicami (app/narzedzia/page.tsx renderuje
          // <Section id={n.slug}> dla każdego narzędzia). Dropdown celuje więc
          // w kotwicę, tak jak karta na home (components/sections/NarzedziaTeaser).
          href: `/narzedzia#${n.slug}`,
          // v11 §H: krótki tytuł + podpis z pola `opis` rejestru (mapa wyżej);
          // nowy slug = fallback na pełny tytuł karty bez podpisu.
          tytul: NAV_NARZEDZIA_KROTKIE[n.slug]?.tytul ?? n.tytul,
          opis: NAV_NARZEDZIA_KROTKIE[n.slug]?.opis,
          c: dekor.c,
          odcien: dekor.odcien,
          emoji: dekor.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          // v5: etykieta narzędzia przeszła z opisu na BADGE (istniejące pole).
          badge: n.etykieta,
        };
      }),
    },
    {
      href: '/wiedza',
      label: 'Wiedza',
      hubLabel: 'Całe Centrum Wiedzy',
      // Stan aktywny także na trasach działów spoza /wiedza/*.
      activePrefixes: ['/blog', '/poradniki', '/materialy', '/ai-radar'],
      // v5: emoji 1:1 ze spec (📰 📖 🧲 📡) + badge typu działu (INF_WIEDZA_BADGE).
      // v11 §H: podpisy działów z NAV_WIEDZA_PODPISY (derywacja z kart huba /wiedza).
      items: [
        {
          href: '/blog',
          tytul: 'Blog',
          opis: NAV_WIEDZA_PODPISY.blog,
          c: INF_WIEDZA.blog.c,
          odcien: INF_WIEDZA.blog.odcien,
          emoji: INF_WIEDZA.blog.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          badge: INF_WIEDZA_BADGE.blog,
        },
        {
          href: '/poradniki',
          tytul: 'Poradniki',
          opis: NAV_WIEDZA_PODPISY.poradniki,
          c: INF_WIEDZA.poradniki.c,
          odcien: INF_WIEDZA.poradniki.odcien,
          emoji: INF_WIEDZA.poradniki.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          badge: INF_WIEDZA_BADGE.poradniki,
        },
        {
          href: '/materialy',
          tytul: 'Materiały',
          opis: NAV_WIEDZA_PODPISY.materialy,
          c: INF_WIEDZA.materialy.c,
          odcien: INF_WIEDZA.materialy.odcien,
          emoji: INF_WIEDZA.materialy.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          badge: INF_WIEDZA_BADGE.materialy,
        },
        {
          href: '/ai-radar',
          tytul: 'AI Radar',
          opis: NAV_WIEDZA_PODPISY['ai-radar'],
          c: INF_WIEDZA['ai-radar'].c,
          odcien: INF_WIEDZA['ai-radar'].odcien,
          emoji: INF_WIEDZA['ai-radar'].emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          badge: INF_WIEDZA_BADGE['ai-radar'],
        },
      ],
    },
  ];
}
