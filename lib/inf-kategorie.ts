/**
 * INFINITY v3 — rejestr DEKORACJI kart i dropdownów (single source ikon/kolorów).
 *
 * v3 (spec-infinity-v3 §NAWIGACJA): emoji ZASTĄPIONE unikalnymi ikonami SVG
 * z components/ui/InfIcons.tsx — pole `ikona` = nazwa glifu. Pola `emoji`
 * ZOSTAJĄ RÓWNOLEGLE (deprecated) dla konsumentów partii C (karty listingów
 * blog/poradniki/materialy/produkty/realizacje + huby app/*) do czasu ich
 * przejścia na <InfIcon>; partia A (nawigacja) używa już wyłącznie `ikona`.
 *
 * v5 (spec §2, decyzja Pawła: „nasze ikony słabe, ich emoji zajebiste"):
 * DROPDOWNY NAV wracają na NATYWNE emoji — pola `emoji` znów są źródłem
 * dekoracji kafla 44px w nawigacji (listy 1:1 ze spec v5). Ikony SVG zostają
 * dla kart/sekcji (Oferta, PromoUslugi itd.). Dodatkowo mapy BADGE dropdownów
 * (INF_USLUGA_BADGE / INF_WIEDZA_BADGE) — krótkie mono etykiety POCHODNE
 * ISTNIEJĄCYCH pól (slug/typ), zero nowych treści.
 *
 * F4 (naprawa z audytu, cytat Pawła: „Infinity ma głębsze, mocniejsze kolory,
 * u nas blade, byle jakie"): NASYCENIE CAŁEJ PALETY PODBITE DO 100 PROCENT.
 * Dotąd podbity był wyłącznie token --accent w globals, a ten rejestr — który
 * realnie maluje karty, tagi, liczby i etykiety — stał nietknięty. Praca
 * w HSL: BARWA (H) i JASNOŚĆ (L) zostają, rośnie samo S. Wzorem są neonowe
 * tokeny wzorca z pomiarów §1.3, §2.1 i §5.1 (#00f0ff, #39ff14, #ff00e5) —
 * wszystkie mają S = 100%, i to jest cała różnica między „głęboki" a „blady".
 * Kontrasty policzone na korpusie karty (rgb(5,5,11)) i nad szczytem mgławicy
 * violet 8% (rgb(15,12,28)); najsłabszy w palecie to fiolet bazowy 4,71:1,
 * czyli AA ✓ — pełna tabela stary/nowy hex, HSL i kontrast w raporcie partii.
 *   #22d3ee -> #11e0ff   hsl(188 86% 53%) -> hsl(188 100% 53%)
 *   #8b5cf6 -> #8e5cff   hsl(258 90% 66%) -> hsl(258 100% 68%)  (jedyny wyjątek:
 *       L +1,7 pp, bo przy samym S=100% kontrast spadał do 4,34:1 nad mgławicą)
 *   #a78bfa -> #a586ff   #10b981 -> #00c986   #f59e0b -> #ffa101
 *   #67e8f9 -> #61edff   #f472b6 -> #ff67b7   #4ade80 -> #29ff77
 *   #fbbf24 -> #ffc120   #60a5fa -> #5ba4ff
 *
 * v10 (spec pkt 5, pomiary raporty/pomiary-wzorca-v10.md §2): DWIE poprawki
 * z tabeli pomiaru — reszta palety została tam potwierdzona jako identyczna
 * lub mocniejsza od wzorca („po F4 nasza paleta ma S=100% jak wzorzec"),
 * więc NIE ruszamy jej dalej. Kontrast liczony (nie szacowany) na czterech
 * tłach: --bg #05050c / korpus karty rgb(5,5,11) / szczyt mgławicy violet 8%
 * rgb(15,12,28) / panel dropdownu .92 rgb(10,10,16):
 *   #8e5cff -> #b638ff   hsl(258 100% 68%) -> hsl(278 100% 61%)   (violet)
 *       Wzorzec maluje violet kart #b026ff = hsl(278 100% 57%) — barwa
 *       przesunięta ku magencie względem naszej. Bierzemy H 278 wzorca 1:1,
 *       ale L 61 zamiast 57, bo zmierzony #b026ff ma 4,40:1 na --bg (pomiar
 *       §2 ostrzega o tym wprost; AA tekstu normalnego wymaga 4,5:1).
 *       Kontrast #b638ff: 4,81 / 4,84 / 4,59 / 4,70 — AA na każdym tle,
 *       i LEPIEJ niż stary #8e5cff nad mgławicą (4,70), bo ruch barwy ku
 *       magencie dokłada kanał czerwony do luminancji.
 *   #ff67b7 -> #ff00e5   hsl(328 100% 70%) -> hsl(306 100% 50%)   (magenta)
 *       Zmierzony token wzorca --neon-magenta (pomiar §2: „wzorzec ma czystą
 *       magentę L 50, nasz róż L 70 jest bledszy"). Kontrast: 6,14 / 6,18 /
 *       5,86 / 6,00 — AA ✓. Ten sam hex żyje już w globals jako --ring-2.
 *
 * v17 (spec-v17, pomiary raporty/pomiary-v17.md; cytat Pawła: „jeszcze jest
 * za mało neonu... fioletowy jest blady, «ktoś inny» ma ten mocny
 * różowo-fioletowy odcień"): PALETA RÓWNANA DO KALIBRACJI. Zmierzone piksele
 * liter „ktoś inny" (span .inf-grad-text na home, klon 1:1 wzorca) dają cel
 * H 288-304, S 90-97, L 48-57 — a nasz fiolet #b638ff miał na literach
 * medianę hsl(278 88 58), o 10-26 deg za daleko od magenty (zmierzona
 * przyczyna „bladości"). Pomarańcz #ffa101/#ffc120 NIETYKALNY (referencja:
 * „już wygląda nieźle"). Kontrast liczony w Node na 4 tłach konwencji v10
 * (--bg #05050c / karta rgb(10,11,24) — tło wymogu >=4,8 / mgławica
 * rgb(15,12,28) / dropdown rgb(10,10,16)):
 *   #b638ff -> #e438ff   hsl(278 100 61) -> hsl(292 100 61)   (violet)
 *       H 292 = środek dominant kalibracji, L bez zmian (relacja z odcieniami
 *       zostaje). Karta 5,87 = wymóg >=4,8 z zapasem (stary sufit 4,65).
 *   #a586ff -> #dc7aff   hsl(255 100 76) -> hsl(284 100 74)   (violet jasny)
 *       Różowszy, para z bazą jak cyjan 188/187. Karta 7,70.
 *   #00c986 -> #00e096   hsl(160 100 39) -> hsl(160 100 44)   (green)
 *       H bez zmian, L +5 pp. Karta 11,27 — przeskakuje pomarańcz.
 *   #5ba4ff -> #70b0ff   hsl(213 100 68) -> hsl(213 100 72)   (blue)
 *       H bez zmian. Karta 8,70.
 *   #11e0ff -> #00f0ff   hsl(188 100 53) -> hsl(184 100 50)   (cyan)
 *       Scalenie 1:1 z tokenem neonu wzorca (--accent globals, 18 użyć);
 *       L/S 50/100 jak pomarańcz. Karta 13,88.
 *   Bez zmian: #61edff, #29ff77, #ff00e5 (środkowy stop kalibracji),
 *   #ffa101, #ffc120. Minimum nowej palety: fiolet 5,79 (mgławica) — AA
 *   wszędzie; wyjątki AA fioletu z v16 w globals ZDJĘTE dla overline, sub
 *   i statusu (pełna jarzeniówka 60/30 wraca — pierścień zmierzony
 *   5,03-5,40); pigułka taga trzyma pełny tint 12% i sam ogon 14px/30%
 *   (pierścień 5,10/5,05 — rdzeń 6px dalej zjadał p90 poniżej 4,5).
 *
 * v18 (spec-v18, PRÓBNIK PAWŁA; pomiary raporty/pomiary-v18.md). Paweł ręcznie
 * wypróbkował siedem hexów, które mu się podobają, i nazwał je „namiastką, nie
 * całą paletą". Sonda pierścieniowa (pierścień 1-3px wokół glifów na ŻYWEJ
 * karcie, tło #05050c) przepuściła na TEKŚCIE cztery z siedmiu — i tylko jeden
 * z nich bije to, co już mamy. Stąd v18 to JEDNA podmiana w rejestrze, nie sześć:
 *   #00e096 -> #39ff14   hsl(160 100 44) -> hsl(111 100 54)   (green)
 *       Hex Pawła 1:1 z próbnika. Pierścień 8,33 -> 10,11, karta 11,27 -> 14,42.
 *       Zieleń przechodzi ze szmaragdu w limonkę — H rośnie o 49 stopni, więc
 *       to JEDYNA zmiana barwy w tej rundzie i jedyna, którą widać w kadrze.
 *       Ten sam hex maluje już od v13 drugi stop paska kafla chatbotowego
 *       (Rozwiazanie) i kreskę H2 w Bezpieczenstwie — Paweł wypróbkował kolor,
 *       który częściowo u nas siedział.
 * ODCIEŃ ZIELENI #29ff77 hsl(142 100 58) ZOSTAJE. Po podmianie bazy para
 * baza/odcień to H111/H142, czyli 31 stopni rozjazdu zamiast dotychczasowych 18
 * (160/142). Kafle się nie zleją, ale para czyta się teraz jako limonka + mięta,
 * a nie jako „ten sam kolor dwa razy". Gdyby Paweł chciał parę ciasną jak cyjan
 * 184/187, odcień idzie na #7bff5c hsl(111 100 68) — to decyzja ESTETYCZNA,
 * nie wymóg kontrastu (oba warianty mają zapas rzędu 5 jednostek nad AA).
 * CZEGO v18 NIE ZMIENIŁO I DLACZEGO (wszystko zmierzone tą samą sondą,
 * wartości = MIN p90 pierścienia na tle #05050c):
 *   cyjan    #00f0ff 9,70  bije oba cyjany próbnika (#02c5d3 7,10, #00d3ff 8,15)
 *   pomarańcz #ffa101 7,35 bije #f56601 5,23 — spec v18 sam każe wtedy zostawić
 *   fiolet   #e438ff 4,92  bije OBA fiolety próbnika (#9e22e6 3,19, #8600ff 2,96)
 *       i bije też ich rozjaśnione namiastki policzone w §3 pomiaru
 *       (#c35cff 4,84, #b866ff 4,88). Dodatkowo #9e22e6 ma H278 i S=80, czyli
 *       wraca dokładnie do hue, z którego v17 świadomie uciekło po „fioletowy
 *       jest blady", i łamie regułę nasycenia 100% z tego samego spec.
 *   blue     #70b0ff 6,66  bije #2500ff 2,23 (granat próbnika nie zdaje nawet
 *       jako obwódka wskaźnika, próg 1.4.11 to 3,0)
 * Trzy hexy próbnika z rodziny fiolet-niebieski nie wchodzą więc na tekst.
 * Wchodzą tam, gdzie próg tekstowy nie obowiązuje: #8600ff i #f56601 jako DRUGI
 * STOP paska typu D w Rozwiazanie.tsx, #02c5d3 jako drugi stop kafla zieleni.
 *
 * Kolory kategorii wywodzą się ze spec-infinity-v2 §Dropdown (zmierzone ze
 * wzorca): chatboty cyjan, voiceboty fiolet, automatyzacje zieleń,
 * dokumenty bursztyn, www cyjan, audyt bursztyn, opieka zieleń,
 * rekrutacja fiolet jasny, rozwiazania fiolet, optymalizacja cyjan.
 *
 * ŻELAZNA ZASADA: ikona i kolor to WYŁĄCZNIE dekoracja (kafelek .inf-tile ma
 * aria-hidden, kolor wchodzi przez custom property --tile-c/--card-c).
 * Treść i kontrast tekstu niosą tokeny semantyczne — ten rejestr NIE jest
 * treścią i nie wolno go czytać czytnikom ekranu.
 *
 * UNIKALNOŚĆ (spec v3): w obrębie JEDNEGO dropdownu/siatki żadne dwie pozycje
 * nie dzielą glifu — stąd osobne mapy per rejestr (usługi / produkty /
 * narzędzia / realizacje / działy wiedzy).
 */
import type { InfIconName } from '@/components/ui/InfIcons';

export type InfDekor = {
  /** Kolor kategorii (wchodzi w --tile-c/--card-c). */
  c: string;
  /**
   * v4 (spec §PARTIA A pkt 5): JAŚNIEJSZY odcień koloru — fluorescencyjna
   * paleta kart, po podbiciu nasycenia F4, korekcie v10 i palecie neon v17:
   * cyan #61edff, violet #dc7aff, magenta #ff00e5, green #29ff77,
   * amber #ffc120, blue #70b0ff.
   * Konsument (partia C) podaje go
   * w --card-c-l (mono podtytuł .inf-card-sub) i różnicuje nim karty
   * w JEDNYM gridzie. Opcjonalny w TYPIE (lokalne mapy partii C w app/
   * jeszcze go nie mają), ale WYPEŁNIONY w każdej mapie tego rejestru.
   */
  odcien?: string;
  /** v5 (spec §2): NATYWNE emoji — znów pierwszorzędne w dropdownach nav (kafel 44px, emoji 20px); karty/sekcje dalej na `ikona`. */
  emoji: string;
  /** Nazwa glifu z components/ui/InfIcons.tsx (unikalna per pozycja w obrębie dropdownu/siatki). */
  ikona?: InfIconName;
};

/** Dekoracja z ikoną wymaganą — nowe mapy v3; odcień jak w InfDekor.
 * v5 (spec §2): opcjonalne `emoji` = natywne emoji dropdownu nav (lista Pawła). */
export type InfIkonaDekor = { c: string; odcien?: string; ikona: InfIconName; emoji?: string };

/** Kategorie usług (klucz = slug usługi; realizacje używają tych samych slugów).
 * Odcienie v4 (hexy po podbiciu nasycenia F4 i palecie neon v17): mapowanie
 * bazowy -> jasny (cyan->#61edff, violet->#dc7aff, green->#29ff77,
 * amber->#ffc120) + rozróżnienie DUBLI w jednym gridzie paletą spec:
 * strony-www dostają blue #70b0ff (trzeci cyjan w mapie), agent-rekrutacyjny
 * (baza to już jasny violet) idzie w magentę #ff00e5 (v10: neon wzorca). */
export const INF_KATEGORIA: Record<string, InfDekor> = {
  chatboty: { c: '#00f0ff', odcien: '#61edff', emoji: '💬', ikona: 'chat-dymek' },
  voiceboty: { c: '#e438ff', odcien: '#dc7aff', emoji: '🎙️', ikona: 'sluchawka-fala' },
  // v18 (kontrola: podstrony /uslugi/voiceboty/* renderowaly sie DOMYSLNYM cyjanem,
  // czyli kolorem rodziny chatbotow — mylacy sygnal wizualny). Podstrony dziedzicza
  // kolor rodzica: ten sam fiolet co /uslugi/voiceboty.
  windykacja: { c: '#e438ff', odcien: '#dc7aff', emoji: '🎙️', ikona: 'sluchawka-fala' },
  'potwierdzanie-wizyt': { c: '#e438ff', odcien: '#dc7aff', emoji: '🎙️', ikona: 'sluchawka-fala' },
  'agent-rekrutacyjny': { c: '#dc7aff', odcien: '#ff00e5', emoji: '🤝', ikona: 'osoba-check' },
  automatyzacje: { c: '#39ff14', odcien: '#29ff77', emoji: '⚡', ikona: 'blyskawica' },
  'dokumenty-faktury': { c: '#ffa101', odcien: '#ffc120', emoji: '📄', ikona: 'dokument-skan' },
  // v5 (spec §2): emoji opieki 🛡️ -> 🛠️ (lista emoji dropdownu Usługi 1:1 ze spec).
  'opieka-ai': { c: '#39ff14', odcien: '#29ff77', emoji: '🛠️', ikona: 'tarcza-serce' },
  'audyt-ai': { c: '#ffa101', odcien: '#ffc120', emoji: '🔍', ikona: 'lupa-wykres' },
  rozwiazania: { c: '#e438ff', odcien: '#dc7aff', emoji: '🧩', ikona: 'puzzle' },
  'strony-www': { c: '#00f0ff', odcien: '#70b0ff', emoji: '🌐', ikona: 'glob-siatka' },
  optymalizacja: { c: '#00f0ff', odcien: '#61edff', emoji: '📈', ikona: 'wykres-strzalka' },
};

/** Fallback dla slugów spoza map (nowe wpisy rejestrów). */
export const INF_KATEGORIA_DEFAULT: Required<InfDekor> = {
  c: 'var(--accent)',
  // Fallback jedzie na TOKENACH CSS, nie na hexach tego rejestru — podbicie
  // nasycenia F4 go nie dotyczy; --accent-hover zostaje jasnym cyjanem globals.
  odcien: 'var(--accent-hover)',
  emoji: '✨',
  ikona: 'iskry',
};

/** Typy treści Centrum Wiedzy (karty listingów blog/poradniki/materiały). */
export const INF_TYP: Record<'poradnik' | 'wpis' | 'material', InfDekor> = {
  poradnik: { c: '#00f0ff', odcien: '#61edff', emoji: '📚', ikona: 'ksiazka' },
  wpis: { c: '#dc7aff', odcien: '#ff00e5', emoji: '📝', ikona: 'notes-pioro' },
  material: { c: '#ffa101', odcien: '#ffc120', emoji: '🧲', ikona: 'magnes' },
};

/**
 * Produkty (klucz = slug z lib/produkty) — dropdown "Produkty" + karty.
 * Glify unikalne w obrębie mapy; kolory z palety kategorii.
 */
export const INF_PRODUKT: Record<string, InfIkonaDekor> = {
  // v5 (spec §2): emoji dropdownu Produkty 1:1 ze spec: 🧾 🗓️ ✅ 🎛️
  // (kolejność listy spec = kolejność rejestru PRODUKTY).
  'skaner-faktur-ksef': { c: '#ffa101', odcien: '#ffc120', ikona: 'dokument-skan', emoji: '🧾' },
  'app-coachingowa-z-agentami': { c: '#dc7aff', odcien: '#ff00e5', ikona: 'gwiazda-kompas', emoji: '🗓️' },
  'apka-obecnosci-skladek': { c: '#39ff14', odcien: '#29ff77', ikona: 'kalendarz-check', emoji: '✅' },
  'centrum-dowodzenia': { c: '#00f0ff', odcien: '#61edff', ikona: 'radar', emoji: '🎛️' },
};

/**
 * Narzędzia (klucz = slug z lib/narzedzia) — dropdown "Narzędzia" + hub.
 */
export const INF_NARZEDZIE: Record<string, InfIkonaDekor> = {
  // Odcienie v4: 5 narzędzi = 5 RÓŻNYCH tonów (grid teasera na home,
  // partia C) — pełne pokrycie palety bez dubli.
  // v5 (spec §2): emoji dropdownu Narzędzia 1:1 ze spec: 🧮 ⏱️ 🧭 🔎 ✍️
  // (kolejność listy spec = kolejność rejestru NARZEDZIA).
  'kalkulator-oszczednosci': { c: '#00f0ff', odcien: '#61edff', ikona: 'kalkulator', emoji: '🧮' },
  'kalkulator-procesu': { c: '#39ff14', odcien: '#29ff77', ikona: 'wykres-strzalka', emoji: '⏱️' },
  'test-gotowosci-ai': { c: '#e438ff', odcien: '#dc7aff', ikona: 'gwiazda-kompas', emoji: '🧭' },
  'audyt-strony-ai': { c: '#ffa101', odcien: '#ffc120', ikona: 'lupa-wykres', emoji: '🔎' },
  'generator-promptow': { c: '#dc7aff', odcien: '#ff00e5', ikona: 'iskry', emoji: '✍️' },
};

/**
 * Realizacje (klucz = slug z lib/realizacje) — TYLKO glif (unikalny per case
 * w dropdownie "Realizacje"); kolor bierze się z kategorii case'a
 * (INF_KATEGORIA[r.kategoria].c), żeby nie dublować palety.
 */
export const INF_REALIZACJA_IKONA: Record<string, InfIconName> = {
  'auto-email-bok': 'chat-dymek',
  'lead-generator': 'magnes',
  'auto-podsumowania-spotkan': 'kalendarz-check',
  'automat-tresci-social': 'notes-pioro',
  'automatyczne-raporty': 'wykres-strzalka',
  'chatbot-edukacyjny-kursy': 'ksiazka',
  'agenci-ai-24-7': 'robot',
  'transkrypcja-rozmow': 'mikrofon-fale',
};

/**
 * v5 (spec §2): NATYWNE emoji dropdownu "Realizacje" — zestaw 1:1 ze spec
 * (✉️ 🧲 📝 📊 🤖 📚 🎧 📣), przypisany per case semantycznie 1:1 z glifami
 * INF_REALIZACJA_IKONA wyżej (chat-dymek/e-mail -> ✉️, magnes -> 🧲,
 * kalendarz-check/podsumowania -> 📝, notes-pioro/social -> 📣,
 * wykres/raporty -> 📊, ksiazka -> 📚, robot -> 🤖, mikrofon -> 🎧).
 */
export const INF_REALIZACJA_EMOJI: Record<string, string> = {
  'auto-email-bok': '✉️',
  'lead-generator': '🧲',
  'auto-podsumowania-spotkan': '📝',
  'automat-tresci-social': '📣',
  'automatyczne-raporty': '📊',
  'chatbot-edukacyjny-kursy': '📚',
  'agenci-ai-24-7': '🤖',
  'transkrypcja-rozmow': '🎧',
};

/**
 * v5 (spec §2): BADGE dropdownu "Usługi" — krótkie mono etykiety POCHODNE
 * SLUGÓW usług (lista 1:1 ze spec: CHATBOT/VOICE/REKRUTACJA/AUTO/OCR/OPIEKA/
 * AUDYT/APKI/WWW/SEO). To dekoracyjne pigułki, NIE nowa treść — usługi nie
 * mają w rejestrze krótkiej etykiety, więc spec dopuszcza pochodną sluga.
 */
export const INF_USLUGA_BADGE: Record<string, string> = {
  chatboty: 'CHATBOT',
  voiceboty: 'VOICE',
  'agent-rekrutacyjny': 'REKRUTACJA',
  automatyzacje: 'AUTO',
  'dokumenty-faktury': 'OCR',
  'opieka-ai': 'OPIEKA',
  'audyt-ai': 'AUDYT',
  rozwiazania: 'APKI',
  'strony-www': 'WWW',
  optymalizacja: 'SEO',
};

/**
 * v5 (spec §2): BADGE dropdownu "Wiedza" = TYP treści działu — pochodna
 * ISTNIEJĄCYCH kluczy typów (INF_TYP: wpis/poradnik/material); AI Radar nie
 * ma typu w INF_TYP, więc badge to pochodna sluga 'ai-radar' (jak w usługach).
 */
export const INF_WIEDZA_BADGE: Record<'blog' | 'poradniki' | 'materialy' | 'ai-radar', string> = {
  blog: 'WPIS',
  poradniki: 'PORADNIK',
  materialy: 'MATERIAŁ',
  'ai-radar': 'RADAR',
};

/**
 * Działy Centrum Wiedzy (dropdown "Wiedza": Blog / Poradniki / Materiały /
 * AI Radar). Kolory spójne z dekorem huba /wiedza (poradniki cyjan,
 * ai-radar violet, blog/przemyślenia #a78bfa, materiały amber jak INF_TYP).
 */
export const INF_WIEDZA: Record<'blog' | 'poradniki' | 'materialy' | 'ai-radar', InfIkonaDekor> = {
  // v5 (spec §2): emoji dropdownu Wiedza 1:1 ze spec: 📰 📖 🧲 📡.
  blog: { c: '#dc7aff', odcien: '#ff00e5', ikona: 'notes-pioro', emoji: '📰' },
  poradniki: { c: '#00f0ff', odcien: '#61edff', ikona: 'ksiazka', emoji: '📖' },
  materialy: { c: '#ffa101', odcien: '#ffc120', ikona: 'magnes', emoji: '🧲' },
  'ai-radar': { c: '#e438ff', odcien: '#dc7aff', ikona: 'radar', emoji: '📡' },
};
