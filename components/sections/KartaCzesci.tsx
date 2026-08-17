import type { CSSProperties, ReactNode } from 'react';
import type { Usluga } from '@/lib/uslugi';
import type { Realizacja } from '@/lib/realizacje/types';
import type { Post } from '@/lib/blog/types';

/**
 * CZĘŚCI KARTY WZORCA (INFINITY v8, spec §8 „karty mają mieć strukturę wzorca").
 *
 * Cytat Pawła po obejrzeniu wdrożenia: „zobacz, jak u nich wygląda struktura:
 * jakaś emotka, biały napis, zielony napis na górze, jakiś szary na dole, opis
 * i tagi. My powinniśmy też pod kątem SEO robić takie tagowanie w kartach,
 * które bot jest w stanie przeczytać".
 *
 * STRUKTURA WZORCA (raporty/pomiary-wzorca-v8.md §3.6, karta Neuromantix,
 * kolejność od góry): [status/kategoria mono w kolorze karty] -> [tytuł biały]
 * -> [podtytuł/opis szary] -> [liczby] -> [punkty] -> [TAGI przyklejone do dołu].
 *
 * KONTRAKT Z PARTIĄ CSS (app/globals.css — NIE nasz plik): korzystamy WYŁĄCZNIE
 * z klas, które już istnieją w globals i niosą pomiary wzorca:
 *  - `.inf-overline`  = mono etykieta; wewnątrz `.inf-card` bierze kolor karty
 *                       (reguła `.inf-card .inf-overline` w globals),
 *  - `.inf-counter` / `.inf-counter-value` / `.inf-counter-label` = blok liczby
 *                       (liczba w PEŁNYM kolorze karty z poświatą
 *                       `0 0 12px currentColor`, etykieta mono caps, §3.3),
 *  - `.inf-tag` + `.inf-tag-kolor` / `.inf-tag-plaski` = dwa modele tagu (§3.4).
 * Tu nie ma ANI JEDNEJ nowej klasy CSS i ani jednego koloru na sztywno.
 *
 * F3 (naprawa z audytu) — JEDEN ZESTAW NAZW, KONIEC ROZJAZDU. Ten plik wołał
 * wcześniej `.inf-card-tag`, `.inf-card-stat`, `.inf-card-stat-value`
 * i `.inf-card-stat-label`. ŻADNA z tych czterech klas nie istniała w globals
 * (partia CSS zmapowała je na `.inf-tag-kolor` / `.inf-counter-*` i skasowała
 * martwe reguły), więc pigułka tagu renderowała się szarą bazą `.inf-tag`,
 * a dwa modele tagu ze spec §4 były na stronie nie do odróżnienia. Nazwy
 * `inf-card-*` zniknęły z tego pliku w całości. Zasada na przyszłość: nazwa
 * klasy pojawia się w JSX dopiero wtedy, gdy ma regułę w globals.
 *
 * PUŁAPKA REPO: klasy spacingu Tailwinda to WŁASNE tokeny (space-5 = 24px,
 * space-9 = 96px!). Wymiary zmierzone na wzorcu wpisujemy arbitralnie
 * (`gap-[6px]` = 0.35rem wzorca, `pt-[20px]` = odstęp bloków 1.25rem).
 */

/** Maksymalna długość frazy dopuszczonej na tag (pigułka mono caps w jednym rzędzie). */
const TAG_MAX_ZNAKOW = 33;

/** Który model tagu (spec v8b §4). Przypisanie karta po karcie: patrz raport partii. */
export type WariantTagu = 'pigulka' | 'plaski';

/**
 * WARIANT (a) — PIGUŁKA: obwódka i tło w kolorze karty. Cały wygląd niesie
 * `.inf-tag` (geometria, mono 11px, caps) + `.inf-tag-kolor` (kolor karty,
 * tło 12%, obwódka 32%, waga 700) z globals — pomiar §3.4.
 */
const TAG_PIGULKA = 'inf-tag inf-tag-kolor';

/**
 * WARIANT (b) — tag PŁASKI: sam tekst mono caps, bez obwódki i bez tła
 * (wzorzec: „AWS BEDROCK ENTERPRISE AI"). Ta sama baza `.inf-tag` co pigułka,
 * a `.inf-tag-plaski` gasi tło i obwódkę oraz zeruje padding poziomy.
 * Metryki: mono / 700 / uppercase / letter-spacing 0,08em (wzorzec §3.4).
 * ROZMIAR: wzorzec ma 8,8px, u nas 0,6875rem (11px) — ta sama decyzja
 * dostępnościowa co przy `.inf-tag` (8,8px to poniżej progu czytelności).
 * KOLOR: `--fg-muted` #7a7a9e — 4,93:1 na korpusie karty nad czystym tłem
 * i 4,69:1 nad szczytem mgławicy violet 8% (AA ✓).
 */
const TAG_PLASKI = 'inf-tag inf-tag-plaski';

/** Porównanie fraz bez rozróżniania wielkości liter i spacji na brzegach. */
function normalizuj(fraza: string): string {
  return fraza.trim().toLowerCase();
}

/**
 * Wybór fraz na tagi z ISTNIEJĄCEGO pola rejestru (`queries` = money queries,
 * te same, które lecą do `keywords` w JSON-LD). ZERO wymyślania nowych słów:
 * bierzemy tylko to, co już jest w rejestrze, odrzucamy duplikaty tytułu
 * i frazy za długie na pigułkę.
 */
export function frazyDoTagow(
  frazy: readonly string[],
  opcje: { limit: number; pomin?: readonly string[]; maxZnakow?: number }
): string[] {
  const { limit, pomin = [], maxZnakow = TAG_MAX_ZNAKOW } = opcje;
  const juz = new Set(pomin.map(normalizuj));
  const wynik: string[] = [];

  for (const fraza of frazy) {
    if (wynik.length >= limit) break;
    const czysta = fraza.trim();
    if (czysta.length === 0 || czysta.length > maxZnakow) continue;
    const klucz = normalizuj(czysta);
    if (juz.has(klucz)) continue;
    juz.add(klucz);
    wynik.push(czysta);
  }

  return wynik;
}

/**
 * Tagi karty USŁUGI = money queries usługi (pole `queries` rejestru lib/uslugi).
 * Kategoria usługi NIE wchodzi do tagów, bo stoi już jako mono etykieta na
 * górze karty (INF_USLUGA_BADGE) — wzorzec nie powtarza statusu w tagach.
 */
export function tagiUslugi(usluga: Usluga, limit = 3): string[] {
  return frazyDoTagow(usluga.queries, { limit, pomin: [usluga.h1] });
}

/**
 * Tagi karty REALIZACJI = branża case'a (istniejące pole `branza`) + money
 * queries case'a. Kategoria (KATEGORIA_LABEL) stoi jako etykieta na górze karty.
 */
export function tagiRealizacji(realizacja: Realizacja, limit = 3): string[] {
  const tagi = [realizacja.branza.trim()];
  return tagi.concat(
    frazyDoTagow(realizacja.queries, {
      limit: Math.max(0, limit - tagi.length),
      pomin: [realizacja.h1, realizacja.branza],
    })
  );
}

/**
 * Tagi karty WPISU BLOGA = pole `tagi` rejestru lib/blog (redakcyjna taksonomia
 * wpisu, ta sama, która opisuje artykuł w rejestrze). Kategoria stoi już jako
 * mono etykieta na górze karty, więc nie powtarzamy jej w tagach.
 * ZERO nowych stringów: gdy wpis nie ma tagów, rząd po prostu nie powstaje.
 */
export function tagiPosta(post: Post, limit = 3): string[] {
  return frazyDoTagow(post.tagi, { limit, pomin: [post.tytul, post.kategoria] });
}

/**
 * ETYKIETA KARTY — mono, wielkie litery, W KOLORZE KARTY, na samej górze
 * (wzorzec: `.lp-primary-status` „• ACTIVE" nad tytułem). To REALNY tekst
 * w HTML (kategoria/status z rejestru), nie dekoracja — bot ma go przeczytać.
 *
 * To zarazem WARIANT (b) tagu ze spec v8b §4 („tagi PŁASKIE, sam tekst mono,
 * bez obwódki"): żadnej ramki, żadnego tła, sam mono caps. `font-bold` = waga
 * 700 zmierzona na statusie wzorca (§3.6); `.inf-overline` ma domyślnie 400,
 * a utility bije warstwę components.
 */
export function KartaEtykieta({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`inf-overline block font-bold ${className}`}>{children}</span>;
}

/**
 * BADGE KARTY — WARIANT (a) tagu ze spec v8b §4 pojedynczo: pigułka z obwódką
 * i tłem w kolorze karty. Używany na GÓRZE karty dla krótkiego statusu, który
 * ma się odciąć od etykiety płaskiej obok (typ pliku, „Wkrótce").
 * Wygląd 1:1 z pomiarem §3.4 niesie `.inf-tag-kolor` z globals.
 */
export function KartaBadge({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`${TAG_PIGULKA} ${className}`}>{children}</span>;
}

/**
 * STATUS KARTY — pulsująca kropka + mono napis W KOLORZE KARTY (INFINITY v12,
 * spec: „Migający FREE / Open source świeci, kropeczka PULSUJE"). Anatomia 1:1
 * ze zmierzonego wzorca `.lp-primary-status` + `.lp-status-dot`
 * (raporty/pomiary-v12.md §3): kropka to OSOBNY span PRZED tekstem (znak ● nie
 * siedzi w treści), puls = czysty CSS (keyframes opacity, bramka RM po stronie
 * arkusza), napis mono caps.
 *
 * KONTRAKT Z PARTIĄ A (app/globals.css — NIE nasz plik): klasy `.inf-status`
 * (typografia mono + gap + margines) i `.inf-status-dot` (kropka, glow,
 * animacja pulsu z bramką reduced-motion) — nazwy wg konwencji repo
 * lp-* -> inf-* (jak .inf-card/.inf-tag). Kolor napisu podajemy tu INLINE
 * łańcuchem zmiennych karty — od v15 PEŁNY kolor NAJPIERW (--card-c ->
 * --card-c-l -> accent): pomiary-v15.md §1b zmierzyły u nas tekst statusu
 * w PASTELU #61edff przy kropce w pełnym #00f0ff, a wzorzec świeci status
 * PEŁNYM neonem (tekst i kropka w jednym tonie) — pastel to dokładnie
 * „u nas jest blade" z cytatu Pawła. Kropka .inf-status-dot bierze pełny
 * ton z --status-c po stronie arkusza.
 *
 * ZASADA TREŚCI (spec v12): status WYŁĄCZNIE z istniejącego faktu
 * („ZA DARMO" — narzędzia są darmowe, „WDROŻONE" — realizacja wdrożona).
 * Tam, gdzie faktu brak, karta statusu NIE dostaje. To realny tekst w HTML
 * (bot go czyta), nie dekoracja — dlatego bez aria-hidden na napisie.
 */
export function KartaStatus({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inf-status ${className}`}
      style={{ color: 'var(--card-c, var(--card-c-l, var(--accent)))' } as CSSProperties}
    >
      <span aria-hidden="true" className="inf-status-dot" />
      {children}
    </span>
  );
}

/**
 * BLOK LICZBY — duża liczba w kolorze karty + mono etykieta pod spodem
 * (wzorzec: `133` / `MODULES`, pomiary §3.3: liczba w PEŁNYM kolorze akcentu
 * karty z poświatą `0 0 12px currentColor`, etykieta mono caps w szarości).
 * To jest odpowiedź na skargę „nasze karty dalej nie świecą": we wzorcu
 * poświatę ma LICZBA, nie tytuł (§3.2 — tytuł wzorca ma `text-shadow: none`).
 *
 * Kolor liczby bierzemy z odcienia karty (`--card-c-l`, dalej `--card-c`),
 * więc karta w jednym gridzie świeci swoim tonem, nie globalnym akcentem;
 * podajemy go przez `--counter-c`, które czyta `.inf-counter-value`.
 *
 * WIELKIE LITERY tylko dla KRÓTKIEJ etykiety. Metryki naszych case'ów bywają
 * całym zdaniem („maili wymaga już tylko drobnej korekty przed wysłaniem") —
 * zdania nie krzyczymy caps-lockiem. Dlatego przy długiej etykiecie dokładamy
 * utility `normal-case`: `.inf-counter-label` (0,1,0) i utility (0,1,0) mają
 * równą specyficzność, a utilities stoją w arkuszu za components, więc caps
 * ustępuje. Mono i pozycja pod liczbą zostają w obu przypadkach.
 *
 * F3: z tego bloku zniknęły nazwy `.inf-card-stat`, `.inf-card-stat-value`
 * i `.inf-card-stat-label` — miały po 8 wystąpień w HTML i ZERO reguł w CSS,
 * czyli nie robiły nic. Wygląd niosły i niosą klasy `.inf-counter-*`.
 */
export function KartaLiczba({
  wartosc,
  etykieta,
  className = '',
}: {
  wartosc: string;
  etykieta: string;
  className?: string;
}) {
  const dluga = etykieta.length > 28;
  return (
    <div
      className={`inf-counter ${className}`}
      style={
        { '--counter-c': 'var(--card-c-l, var(--card-c, var(--accent)))' } as CSSProperties
      }
    >
      <span className="inf-counter-value">{wartosc}</span>
      <span
        className={dluga ? 'inf-counter-label normal-case tracking-[0.04em]' : 'inf-counter-label'}
      >
        {etykieta}
      </span>
    </div>
  );
}

/**
 * RZĄD TAGÓW NA DOLE KARTY (wzorzec §3.4: `margin-top: auto`, `gap .35rem`).
 * Tagi to zwykły `<ul>` z tekstem — czytelny dla botów i czytników ekranu,
 * ZERO obrazków i pseudo-elementów.
 *
 * DWA WARIANTY, spec v8b §4 (cytat Pawła: „na niektórych są po trzy, ale są
 * w ramkach i mają kolory. Zobacz różnicę"):
 *  - `pigulka` (a) = `.inf-tag .inf-tag-kolor`: mono caps w PIGUŁCE z obwódką
 *    i tłem w kolorze karty. Wzorzec §3.4 mierzy tło 8% i obwódkę 20%, ale na
 *    korpusie JAŚNIEJSZYM od strony; u nas karta jest przeświecająca, więc
 *    globals podnosi to do 12% i 32% (to samo wrażenie, inna liczba). Dostają
 *    go karty, które reprezentują RZECZ DO KUPIENIA albo DOWÓD: usługa,
 *    produkt, case;
 *  - `plaski` (b) = `.inf-tag .inf-tag-plaski`: sam tekst mono caps w szarości,
 *    BEZ ramki i tła (wzorzec: „AWS BEDROCK ENTERPRISE AI"). Dostają go karty
 *    TREŚCI (wpis bloga), gdzie kolorowy rząd pigułek biłby się z kolorową
 *    etykietą kategorii na górze i z linkiem „Czytaj".
 * Karty bez pola-źródła w rejestrze nie dostają ŻADNYCH tagów — pełne
 * przypisanie karta po karcie jest w raporcie partii.
 *
 * `doDolu` = przyklejenie do dołu karty (działa, gdy rodzic jest kolumną flex);
 * w kartach, gdzie na dole stoi już inny blok, podajemy `doDolu={false}`.
 */
export function KartaTagi({
  tagi,
  etykietaListy,
  doDolu = true,
  wariant = 'pigulka',
  className = '',
}: {
  tagi: readonly string[];
  /** Opis listy dla czytnika ekranu (np. „Tagi usługi: Chatbot AI dla firmy"). */
  etykietaListy: string;
  doDolu?: boolean;
  wariant?: WariantTagu;
  className?: string;
}) {
  if (tagi.length === 0) return null;
  const plaski = wariant === 'plaski';
  return (
    <ul
      aria-label={etykietaListy}
      className={`flex flex-wrap pt-[20px] ${plaski ? 'gap-x-[12px] gap-y-[4px]' : 'gap-[6px]'} ${
        doDolu ? 'mt-auto' : ''
      } ${className}`}
    >
      {tagi.map((tag) => (
        <li key={tag} className={plaski ? TAG_PLASKI : TAG_PIGULKA}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
