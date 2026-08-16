import type { CSSProperties } from 'react';
import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { POSITIONING } from '@/lib/site';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { Breadcrumbs } from './Breadcrumbs';
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
 *    bez zmian, ciemny (--accent-contrast #06060c: na najsłabszym kolorze
 *    palety #b638ff to 4,84:1, AA także dla tekstu normalnego).
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
  chatboty: 'dla firmy',
  voiceboty: 'który odbiera telefon za Ciebie',
  'agent-rekrutacyjny': 'do rekrutacji i pierwszego kontaktu',
  automatyzacje: 'w firmie z AI',
  'dokumenty-faktury': '(OCR, KSeF)',
  'opieka-ai': 'utrzymanie i rozwój automatyzacji',
  'audyt-ai': 'mapa oszczędności czasu',
  rozwiazania: 'aplikacje i wtyczki na zamówienie',
  'strony-www': 'widocznych w Google i w AI',
  optymalizacja: 'bądź cytowany w ChatGPT i Perplexity',
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
 *  - chatboty/voiceboty: „Pakiet startowy zaczyna się od 990/2500 zł",
 *  - audyt-ai: „Sprint Diagnostyczny kosztuje 1490 zł" (cena STAŁA, bez „od"),
 *  - opieka-ai: „10 godzin to 3000 zł miesięcznie" (najniższy ryczałt).
 * Fallback dla przyszłych slugów: etykieta pochodna z ramaCeny.h2
 * („Ile kosztuje X?" -> „X"), prefiks „od " jak w kontrakcie minPrice.
 */
const KAFEL_CENY: Record<string, { prefiks: '' | 'od '; opis: string }> = {
  chatboty: { prefiks: 'od ', opis: 'pakiet startowy' },
  voiceboty: { prefiks: 'od ', opis: 'pakiet startowy' },
  'audyt-ai': { prefiks: '', opis: 'Sprint Diagnostyczny' },
  'opieka-ai': { prefiks: 'od ', opis: 'ryczałt miesięczny' },
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
      prefiks: 'od ' as const,
      opis: usluga.ramaCeny.h2.replace(/^Ile kosztuje\s*/i, '').replace(/\?$/, ''),
    };
    kafle.push({ id: 'cena', wartosc: `${wpis.prefiks}${cena} zł`, opis: wpis.opis });
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

export function ServiceHero({ usluga }: { usluga: Usluga }) {
  // Kolor przewodni usługi = c z rejestru dekoracji (ten sam, co karta tej
  // usługi na home). To DEKORACJA: kolor nie niesie treści, kontrast tekstu
  // stoi na tokenach/wartościach policzonych w komentarzu nagłówkowym.
  const c = (INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT).c;
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
      <div
        className="mx-auto max-w-narrow text-center"
        style={{ '--hero-c': c } as CSSProperties}
      >
        {/* Breadcrumbs zostają w DOM 1:1 (spójne z BreadcrumbList JSON-LD);
            centrowanie robi wrapper — komponent bez zmian. */}
        <div className="flex justify-center">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Usługi', href: '/uslugi' },
              { name: usluga.h1 },
            ]}
          />
        </div>

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
          <p className="text-lead mx-auto mt-6 max-w-measure-lead text-fg-muted">{usluga.kapsula}</p>
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
              style={{ '--accent': c, '--accent-contrast': '#06060c' } as CSSProperties}
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
