import type { CSSProperties } from 'react';
import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { POSITIONING } from '@/lib/site';
import { dekorUslugi } from '@/lib/inf-kategorie';
import { Breadcrumbs } from './Breadcrumbs';
/* Import z pliku, nie z barrela `@/components/blog`: barrel ciągnie
   BlogBreadcrumbs -> components/uslugi, czyli cykl z tym katalogiem. */
import { formatujDatePl } from '@/components/blog/PostMeta';
import type { Usluga } from '@/lib/uslugi/types';

/**
 * ServiceHero — SEKCJA 1 szablonu usługi (answer-first).
 * Struktura: breadcrumbs + badge (sub-claim kategorii) + H1 (= money query)
 * + kapsuła answer-first (surowy HTML = cytat dla LLM) + tagi-pigułki
 * + główne CTA + kafle statystyk.
 *
 * KPI #1: H1 i kapsuła są w HTML przy 1. żądaniu (Reveal tylko wzbogaca, a przy
 * prefers-reduced-motion pokazuje treść natychmiast).
 *
 * INFINITY v12 (spec-v12 §HERO PODSTRON USŁUG, cytat Pawła: „Każda podstrona
 * wzorca ma SWÓJ kolor przewodni (...) i hero: badge, wielki tytuł z KOLOROWYM
 * drugim słowem, opis, tagi-pigułki, wielki CTA w kolorze, kafle statystyk"):
 * każda podstrona usługi ŻYJE swoim kolorem przewodnim c z lib/inf-kategorie
 * (ten sam, którym świeci karta tej usługi na home — „naczynia połączone").
 * Wartości zdjęte 1:1 z pomiarów wzorca (raporty/pomiary-v12.md §4 HERO
 * AKADEMII, computed z żywych /openai-academy, /agents-academy,
 * /cursor-academy):
 *  - BADGE (.spatial-badge wzorca): pigułka mono 10px/800, letter-spacing 2px
 *    (= 0.2em przy 10px), uppercase, padding 6px 16px, radius 100px, tło biel
 *    3%, obwódka i tekst = PEŁNY kolor przewodni (nie color-mix — spec-v12:
 *    „nasycenie MAKSYMALNE"). Treść 1:1 = dotychczasowy overline
 *    (POSITIONING.subClaim); zmienia się wyłącznie opakowanie. Ubiera ją
 *    klasa .inf-hero-badge z globals (kontrakt partii A) — dokłada shimmer
 *    1:1 badge-shimmer wzorca (czysty CSS ::before, bramka RM, blur tylko
 *    desktop) i gaśnięcie w forced-colors; inline tego nie umiał (stąd
 *    przepięcie po audycie v12).
 *  - H1: treść NIETKNIĘTA (SEO żelazne), drugi człon w <span> z SOLIDNYM
 *    kolorem usługi (klasa .inf-hero-word) (wzorzec: „pełny płaski kolor akademii", NIE wspólny
 *    gradient .inf-grad-text). Gdy fragment z mapy nie jest końcówką h1
 *    z rejestru, render spada na pełny H1 bez spanu (zero ryzyka dla treści).
 *  - TAGI: tekst PEŁNY kolor, obwódka rgba(kolor, 0.15), tło przezroczyste,
 *    11px, padding 6px 14px (wzorzec §4 „Tagi-pigułki"); pigułkę i mono niesie
 *    dalej .inf-chip, wartości wzorca dokłada .inf-chip.inf-hero-tag
 *    (globals, kontrakt partii A). Frazy 1:1 z hero home.
 *  - CTA: pełne tło kolorem przewodnim jak „ESTABLISH ROOT CONNECTION" —
 *    kontrakt `.sf-magnetic .inf-glow-cta` (globals) maluje solid z
 *    var(--accent), więc podajemy --accent = c inline na przycisku; tekst CTA
 *    bez zmian, ciemny (--accent-contrast #05050c: na najsłabszym kolorze
 *    palety v17 #e438ff to 6,07:1, AA także dla tekstu normalnego;
 *    stary #b638ff miał 4,84:1).
 *  - KAFLE STATYSTYK (wzorzec: 17 MODULES / 97 QUESTIONS / 9 LABS): pudełko
 *    niesie .inf-hero-stat z globals (kontrakt partii A) — obwódka
 *    rgba(kolor, 0.15), tło rgba(8,15,25,0.45), radius 16px, padding 24px,
 *    liczba 28px/900 w pełnym kolorze (u nas na żywej .inf-counter-value —
 *    mono + poświata 14px currentColor, jarzeniowo jak liczniki home), label
 *    mono micro-caps (.inf-counter-label, --fg-muted = AA; wzorcowe
 *    rgb(71,85,105) to u nas poziom dekoracyjny, a etykieta jest treścią).
 *    DANE WYŁĄCZNIE Z REJESTRU TEJ USŁUGI (zero zmyślania): cena z
 *    ramaCeny.minPrice (tylko jawne), „24/7" z wiersza tabeli porównawczej,
 *    „0 zł" tylko gdy rejestr mówi o bezpłatnej diagnozie, liczba kroków
 *    z kroki.items, liczba pytań z faq. Zob. kafleStatystyk() niżej.
 * Mobile: kafle w gridzie 2 kolumn wewnątrz kontenera, tagi z flex-wrap,
 * badge z max-w-full — zero poziomego scrolla.
 * Wymiary px ARBITRALNIE (pułapka repo: skala spacingu to własne tokeny,
 * h-9 = 96px!), stąd wartości wzorca wchodzą przez [..px], nie przez tokeny.
 */

/**
 * KOLOROWY DRUGI CZŁON H1 per slug (spec-v12: „H1 BEZ ZMIAN TREŚCI — ale drugi
 * człon istniejącego H1 w kolorze przewodnim"). Fragment MUSI być dokładną
 * końcówką h1 z rejestru (dzielH1 to sprawdza i przy rozjeździe renderuje
 * pełny H1 bez spanu) — czyli tekst nagłówka nie może się zmienić nawet przy
 * literówce w tej mapie. Podział po naturalnym szwie zdania (dwukropek,
 * przecinek, granica frazy).
 */
const H1_KOLOR: Record<string, string> = {
  /* 2026-09-06: h1 rodzica zmieniony na „Chatbot AI dla firm, który odpowiada
     klientom 24/7" (raport SEO 2026-09-05, jedna odmiana frazy). Fragment
     = dokładna końcówka nowego h1 (dzielH1 to sprawdza). */
  chatboty: 'który odpowiada klientom 24/7',
  voiceboty: 'który odbiera telefon za Ciebie',
  'agent-rekrutacyjny': 'do rekrutacji i pierwszego kontaktu',
  automatyzacje: 'w firmie z AI',
  'dokumenty-faktury': '(OCR, KSeF)',
  'opieka-ai': 'utrzymanie i rozwój automatyzacji',
  'audyt-ai': 'mapa oszczędności czasu',
  rozwiazania: 'aplikacje i wtyczki na zamówienie',
  'strony-www': 'widocznych w Google i w AI',
  optymalizacja: 'bądź cytowany w ChatGPT i Perplexity',
  /* v20 (kontrola, MINOR-2): PODSTRONY voicebotów, klucz = ich slug. Rodzic
     i wszystkie strony usług mają kolorowy człon H1; podstrony świeciły
     w całości szarym, co czytało się jak inna rodzina stron. Fragment musi
     być dokładną końcówką h1 z rejestru (dzielH1 to sprawdza). */
  'odbieranie-telefonow': 'odbiera telefon 24/7',
  windykacja: 'odbiera telefon 24/7',
  'potwierdzanie-wizyt': 'wizyt 24/7',
  /* 2026-08-31: podstrony gałęzi /uslugi/optymalizacja/. Ten sam powód co przy
     voicebotach wyżej: bez wpisu H1 świeci w całości szarym i podstrona czyta
     się jak inna rodzina stron. Każdy fragment sprawdzony jako końcówka h1
     z pliku podstrony (h1.endsWith(fragment) i fragment !== h1). */
  'audyt-widocznosci-w-ai': 'czy ChatGPT poleca Twoją firmę',
  chatgpt: 'ChatGPT polecał Twoją firmę',
  'dostep-botow-ai': 'czy Twoja strona ich wpuszcza?',
  'google-ai-overviews': '(AI Overviews)',
  perplexity: 'jak być źródłem, a nie tłem',
  'monitoring-cytowan-w-ai': 'czy modele Cię polecają',
  'dla-firm-uslugowych': 'warsztat, klinika, gabinet, kancelaria',
  'llms-txt': 'co to jest i czy naprawdę coś daje',
  /* 2026-09-04: podstrony gałęzi /uslugi/chatboty/. Ten sam powód co wyżej:
     bez wpisu H1 świeci w całości szarym i podstrona czyta się jak inna
     rodzina stron. Podział po naturalnym szwie (znak zapytania, dwukropek,
     przecinek, granica frazy). Każdy fragment sprawdzony PROGRAMOWO jako
     końcówka h1 z pliku podstrony (h1.endsWith(fragment) i fragment !== h1),
     nie na oko. */
  cennik: 'Cennik 2026',
  'obsluga-klienta': 'który odpowiada o 22:00',
  'baza-wiedzy': 'firmowa baza wiedzy (RAG)',
  'sklep-internetowy': 'dla sklepu internetowego',
  'generowanie-leadow': 'który zbiera i kwalifikuje leady',
  'whatsapp-messenger': 'na WhatsApp i Messengerze',
  'asystent-wewnetrzny': 'procedury bez pytania kolegi',
  'hotele-pensjonaty': 'dla hotelu i pensjonatu',
};

/** Dzieli h1 na część neutralną i kolorową końcówkę; przy braku dopasowania
 * zwraca pełny h1 (treść SEO nigdy nie zależy od mapy dekoracji). */
function dzielH1(slug: string, h1: string): { przed: string; kolor: string | null } {
  const fragment = H1_KOLOR[slug];
  if (!fragment || fragment === h1 || !h1.endsWith(fragment)) {
    return { przed: h1, kolor: null };
  }
  return { przed: h1.slice(0, h1.length - fragment.length), kolor: fragment };
}

/**
 * Etykieta kafla ceny per slug — słowa 1:1 z ramaCeny.tresc danej usługi:
 *  - chatboty: „od 1790 zł netto za próg prosty" (nazwa progu — patrz blok
 *    o ośmiu podstronach niżej: w całej gałęzi brzmi ona tak samo),
 *  - voiceboty: „stworzenie od 2500 zł netto za pakiet startowy",
 *  - audyt-ai: „Sprint Diagnostyczny kosztuje 1490 zł" (cena STAŁA, bez „od"),
 *  - opieka-ai: „10 godzin to 3000 zł miesięcznie" (najniższy ryczałt).
 * Fallback dla przyszłych slugów: etykieta pochodna z ramaCeny.h2
 * („Ile kosztuje X?" -> „X"). Mapa trzyma WYŁĄCZNIE opis: prefiks kwoty
 * („od " albo nic) wynika z ramaCeny.cenaStala, patrz kafleStatystyk.
 */
const KAFEL_CENY: Record<string, { opis: string }> = {
  /* Ta sama nazwa progu co na ośmiu podstronach gałęzi (blok niżej): 1790 zł
     netto to „próg prosty", słowo w słowo jak w ramaCeny.tresc i FAQ tej
     usługi (`lib/uslugi/chatboty.ts`). */
  chatboty: { opis: 'próg prosty' },
  /* Voiceboty to INNA gałąź i inna kwota (2500 zł): jej treść nazywa to
     „pakiet startowy" (`lib/uslugi/voiceboty.ts`, podstrony windykacja,
     odbieranie-telefonow, potwierdzanie-wizyt). Nie zrównywać z chatbotami. */
  voiceboty: { opis: 'pakiet startowy' },
  'audyt-ai': { opis: 'Sprint Diagnostyczny' },
  'opieka-ai': { opis: 'ryczałt miesięczny' },
  /* 2026-08-31: audyt widoczności w AI ma tę samą stałą cenę co rodzic
     `audyt-ai`, a etykieta nazywa produkt tak samo. Prefiks nie stoi już tutaj:
     bierze się z ramaCeny.cenaStala (patrz kafleStatystyk niżej). */
  'audyt-widocznosci-w-ai': { opis: 'Sprint Diagnostyczny' },
  /* 2026-08-31: pozostałe podstrony gałęzi `optymalizacja`, które MAJĄ jawne
     ramaCeny.minPrice (1490 = najtańsze wejście, czyli Sprint Diagnostyczny).
     Bez wpisu etykieta liczyłaby się z fallbacku i pod kwotą stanęłoby całe
     pytanie z ramaCeny.h2 („Ile trwa i ile kosztuje pozycjonowanie
     w ChatGPT?"). Tu 1490 zł to próg, nie cena całości, więc `cenaStala`
     zostaje wyłączone i kafel pokazuje „od 1490 zł". Podstrony bez minPrice
     (dostep-botow-ai, monitoring-cytowan-w-ai, llms-txt) nie mają wpisu,
     bo kafel ceny w ogóle im się nie renderuje. */
  chatgpt: { opis: 'Sprint Diagnostyczny' },
  'google-ai-overviews': { opis: 'Sprint Diagnostyczny' },
  perplexity: { opis: 'Sprint Diagnostyczny' },
  'dla-firm-uslugowych': { opis: 'Sprint Diagnostyczny' },
  /* 2026-09-04: WSZYSTKIE OSIEM podstron gałęzi `chatboty` ma jawne
     `ramaCeny.minPrice` (sprawdzone w plikach, nie założone), więc każda
     dostaje etykietę. Bez wpisu pod kwotą stanęłoby całe pytanie z
     ramaCeny.h2 („Ile kosztuje dołożenie WhatsAppa albo Messengera?").

     JEDNA NAZWA JEDNEGO PROGU (poprawka 2026-09-04). Do tej poprawki ta sama
     kwota 1790 zł miała w kaflach osiem różnych nazw („pakiet startowy",
     „chatbot prosty", „wdrożenie bota na stronę", „najniższy próg wdrożenia",
     „bot bez integracji", „próg podstawowy", „próg prosty", „bot na stronie
     obiektu"), więc czytelnik wędrujący po gałęzi widział osiem produktów
     zamiast jednego progu. Obowiązuje nazwa „próg prosty" — ta sama, którą
     niesie treść gałęzi (`lib/uslugi/chatboty.ts` ramaCeny.tresc i FAQ oraz
     podstrony asystent-wewnetrzny, generowanie-leadow, sklep-internetowy,
     cennik). Etykieta MOŻE dopowiedzieć po przecinku, czego ten próg dotyczy
     na TEJ stronie (słowa z pasa metryk albo `ramaCeny.tresc` tej samej
     strony), ale pierwszy człon zostaje niezmienny — kafel jest wąski, więc
     dopowiedzenie ma być trzywyrazowe, nie zdaniem. Nowa podstrona gałęzi
     dostaje ten sam pierwszy człon.
     Żadna z tych podstron nie ustawia `cenaStala` (ceny chatbotów to
     widełki), więc prefiks „od " dokłada kafleStatystyk. */
  cennik: { opis: 'próg prosty' },
  'obsluga-klienta': { opis: 'próg prosty, bot na stronę' },
  /* Dopowiedzenie skrócone z pasa metryk tej strony („najniższy próg
     wdrożenia, baza wiedzy już w środku"). */
  'baza-wiedzy': { opis: 'próg prosty, baza w środku' },
  /* 1790 zł opisuje tu bota BEZ integracji (ramaCeny.tresc: „Bot bez
     integracji zaczyna się od 1790 zł netto"); próg 8000-15000 zł z pasa
     metryk dotyczy wpięcia w bazę produktów i nie jest `minPrice`.
     Zapis kwoty bez spacji — reguła zapisu z `lib/uslugi/chatboty.ts`
     („8000-15000 zł", nie „8000-15 000 zł"). */
  'sklep-internetowy': { opis: 'próg prosty, bez integracji' },
  /* Dopowiedzenie skrócone z pasa metryk tej strony („próg prosty, w nim
     zbieranie leadów"). */
  'generowanie-leadow': { opis: 'próg prosty, w nim leady' },
  /* Jedyna z ósemki z inną kwotą (3000) i JEDYNA, która celowo nazywa próg
     inaczej: ta strona wycenia DOŁOŻENIE kanału do gotowego bota, nie
     wdrożenie od zera. Pakiet `.seo-przeglad/pakiety/chatboty.md` §P6 mówi
     wprost: „Dołożenie kanału do gotowego bota mieści się w progu średnim,
     czyli 3000-6000 zł netto i 3-4 dni robocze". Pełne uzasadnienie z trzema
     cytatami stoi przy `minPrice` w lib/uslugi/podstrony/whatsapp-messenger.ts.
     Nie sprowadzać tego kafla do progu prostego. */
  'whatsapp-messenger': { opis: 'próg średni' },
  'asystent-wewnetrzny': { opis: 'próg prosty' },
  /* Dopowiedzenie skrócone z pasa metryk tej strony („bot na stronie
     obiektu, płatność jednorazowa"). */
  'hotele-pensjonaty': { opis: 'próg prosty, bot dla obiektu' },
};

type Kafel = { id: string; wartosc: string; opis: string };

/**
 * Kafle statystyk hero — WYŁĄCZNIE istniejące dane rejestru tej usługi
 * (spec-v12: „kafle statystyk Z ISTNIEJĄCYCH DANYCH REJESTRU, zero
 * zmyślania"). Kolejność i bramki:
 *  1. cena — tylko gdy ramaCeny.minPrice jest ustawione (kontrakt typu:
 *     realna kwota spójna z UI),
 *  2. „24/7" — tylko gdy stoi w tabeli porównawczej; etykieta = cecha
 *     tego wiersza (string 1:1 z rejestru),
 *  3. „0 zł" — tylko usługi BEZ ceny jawnej, których rama ceny/mikrokopia
 *     mówi o bezpłatnej diagnozie (audyt-ai celowo wypada: diagnoza jest
 *     tam płatnym produktem),
 *  4. liczba kroków wdrożenia (typ wymusza 3) + liczba pytań FAQ.
 * Maksymalnie 4 kafle (jak wzorzec akademii).
 */
function kafleStatystyk(usluga: Usluga): Kafel[] {
  const kafle: Kafel[] = [];

  const cena = usluga.ramaCeny.minPrice;
  if (typeof cena === 'number') {
    const wpis = KAFEL_CENY[usluga.slug] ?? {
      opis: usluga.ramaCeny.h2.replace(/^Ile kosztuje\s*/i, '').replace(/\?$/, ''),
    };
    /* 2026-08-31: „od " NIE stoi już w mapie wyżej. Widełki kontra cena stała to
       ustalenie o produkcie, więc jedno źródło prawdy: ramaCeny.cenaStala
       (lib/uslugi/types.ts). Ta sama flaga steruje mikrokopią pod kartą ceny,
       więc kafel i sekcja cennika nie mogą się rozjechać przy nowych usługach. */
    const prefiks = usluga.ramaCeny.cenaStala ? '' : 'od ';
    kafle.push({ id: 'cena', wartosc: `${prefiks}${cena} zł`, opis: wpis.opis });
  }

  const wiersz247 = usluga.tabelaPorownawcza.wiersze.find((w) => w.zNami.includes('24/7'));
  if (wiersz247) {
    kafle.push({ id: 'dostepnosc', wartosc: '24/7', opis: wiersz247.cecha });
  }

  if (
    typeof cena !== 'number' &&
    /bezpłatn/i.test(`${usluga.ramaCeny.tresc} ${usluga.cta.mikrokopia}`)
  ) {
    kafle.push({ id: 'diagnoza', wartosc: '0 zł', opis: 'bezpłatna diagnoza' });
  }

  kafle.push({ id: 'kroki', wartosc: String(usluga.kroki.items.length), opis: 'kroki wdrożenia' });
  kafle.push({ id: 'faq', wartosc: String(usluga.faq.length), opis: 'najczęstszych pytań' });

  return kafle.slice(0, 4);
}

export function ServiceHero({
  usluga,
  okruszki,
}: {
  usluga: Usluga;
  /**
   * Łańcuch okruszków podany z zewnątrz (podstrony usług: 4 poziomy
   * z ogniwem rodzica). Gdy pominięty, hero składa domyślne 3 poziomy
   * jak dotąd — strony usług wyglądają identycznie jak przed zmianą.
   * Kontrakt: TA SAMA tablica zasila BreadcrumbList JSON-LD strony,
   * więc widok i markup nie mogą się rozjechać (kontrola v19, MAJOR-1).
   */
  okruszki?: { name: string; href?: string }[];
}) {
  // Kolor przewodni usługi = c z rejestru dekoracji (ten sam, co karta tej
  // usługi na home). To DEKORACJA: kolor nie niesie treści, kontrast tekstu
  // stoi na tokenach/wartościach policzonych w komentarzu nagłówkowym.
  // Podstrona (ma pole `rodzic`) dziedziczy kolor rodziny — patrz dekorUslugi.
  const c = dekorUslugi(usluga.slug, (usluga as { rodzic?: string }).rodzic).c;
  const h1 = dzielH1(usluga.slug, usluga.h1);
  const kafle = kafleStatystyk(usluga);

  // Tag-pigułka: pudełko i pełny kolor niesie .inf-chip.inf-hero-tag
  // (globals, kontrakt partii A); --chip-c zostaje dla poświaty liter
  // (jarzenie z .inf-chip[style*='--chip-c']).
  const stylTagu = { '--chip-c': c } as CSSProperties;

  return (
    <Section tone="transparent" containerWidth="default" space="lg">
      {/* --hero-c na wrapperze = kontrakt partii A: badge/word/tag/stat
          dziedziczą kolor przewodni usługi z jednego miejsca. */}
      <div className="mx-auto max-w-narrow text-center" style={{ '--hero-c': c } as CSSProperties}>
        {/* Breadcrumbs zostają w DOM 1:1 (spójne z BreadcrumbList JSON-LD);
            centrowanie robi wrapper — komponent bez zmian. */}
        <div className="flex justify-center">
          <Breadcrumbs
            items={
              okruszki ?? [
                { name: 'Strona główna', href: '/' },
                { name: 'Usługi', href: '/uslugi' },
                { name: usluga.h1 },
              ]
            }
          />
        </div>

        {/* „Ostatnia aktualizacja" (raport SEO 2026-09-05 §8 krok 3): data
            z pola `dataAktualizacji` TEJ usługi, czyli tego samego, które
            zasila sitemap lastmod i WebPage.dateModified w JSON-LD strony.
            Jedna cicha linia w stylu okruszków wyżej (te same klasy: mono,
            caption, subtle; wartość w fg-muted jak w PostMeta bloga), zero
            nowych stylów. Format PL deterministyczny (formatujDatePl), ISO
            w dateTime dla botów. */}
        <p className="mt-2 font-mono text-caption text-fg-subtle">
          Ostatnia aktualizacja:{' '}
          <time dateTime={usluga.dataAktualizacji} className="text-fg-muted">
            {formatujDatePl(usluga.dataAktualizacji)}
          </time>
        </p>

        {/* Badge mono w kolorze przewodnim (dawny overline; treść 1:1).
            Wartości .spatial-badge wzorca — patrz komentarz nagłówkowy. */}
        <Reveal eager>
          <p className="inf-hero-badge mt-6 max-w-full">{POSITIONING.subClaim}</p>
        </Reveal>

        {/* H1 = money query, treść NIETKNIĘTA; drugi człon w solidnym kolorze
            usługi (wzorzec: kolorowe drugie słowo tytułu akademii). */}
        <Reveal eager delay={0.05}>
          <h1 className="text-display mt-5">
            {h1.kolor ? (
              <>
                {h1.przed}
                <span className="inf-hero-word">{h1.kolor}</span>
              </>
            ) : (
              usluga.h1
            )}
          </h1>
        </Reveal>

        {/* Kapsuła answer-first — surowy HTML, cytat dla LLM (40–60 słów). */}
        <Reveal eager delay={0.1}>
          <p className="text-lead mx-auto mt-6 max-w-measure-lead text-fg-muted">
            {usluga.kapsula}
          </p>
        </Reveal>

        {/* Tagi-pigułki — frazy 1:1 z hero home (zero nowych treści marki);
            v12: wszystkie w kolorze przewodnim usługi zamiast trasy marki. */}
        <Reveal eager delay={0.12}>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            <li className="inf-chip inf-hero-tag" style={stylTagu}>
              Twoje dane zostają w UE
            </li>
            <li className="inf-chip inf-hero-tag" style={stylTagu}>
              RODO i AI Act
            </li>
            <li className="inf-chip inf-hero-tag" style={stylTagu}>
              Płacisz za efekt
            </li>
          </ul>
        </Reveal>

        {/* CTA pełnym kolorem przewodnim (tekst i cel bez zmian): kontrakt
            .sf-magnetic .inf-glow-cta maluje solid z var(--accent), więc
            podmieniamy token lokalnie na przycisku. */}
        <Reveal eager delay={0.15}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <MagneticButton
              variant="primary"
              size="lg"
              href={usluga.cta.href}
              className="inf-glow-cta"
              style={{ '--accent': c, '--accent-contrast': '#05050c' } as CSSProperties}
            >
              {usluga.cta.label}
            </MagneticButton>
            <span className="text-caption max-w-[52ch] text-fg-subtle">
              {usluga.cta.mikrokopia}
            </span>
          </div>
        </Reveal>

        {/* Kafle statystyk z rejestru usługi (wzorzec: 17 MODULES / 97
            QUESTIONS / 9 LABS) — pudełko 1:1 z pomiaru §4, liczba jarzy się
            jak liczniki home (.inf-counter-value + --counter-c). */}
        {kafle.length > 0 ? (
          <Reveal eager delay={0.18}>
            {/* lg:-mx-[60px]: kolumna hero (max-w-narrow ~660px) jest za wąska
                na 4 kafle w jednym rzędzie (zmierzone: czwarty spadał do
                drugiego rzędu); ujemny margines oddaje rzędowi symetrycznie
                po 60px, jak wzorzec trzymający kafle w jednej linii. Poniżej
                lg gra flex-wrap, więc mobile bez zmian i bez poziomego
                scrolla. */}
            <ul className="mx-auto mt-9 grid max-w-[560px] grid-cols-2 gap-[10px] sm:flex sm:max-w-none sm:flex-wrap sm:justify-center lg:-mx-[60px]">
              {kafle.map((kafel) => (
                <li key={kafel.id} className="inf-hero-stat text-center sm:min-w-[150px]">
                  <span
                    className="inf-counter-value block text-[28px] font-black leading-none"
                    style={{ '--counter-c': c } as CSSProperties}
                  >
                    {kafel.wartosc}
                  </span>
                  <span className="inf-counter-label mt-[6px] block">{kafel.opis}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
