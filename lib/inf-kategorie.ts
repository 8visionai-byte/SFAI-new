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
 * tłach: --bg #06060c / korpus karty rgb(5,5,11) / szczyt mgławicy violet 8%
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
   * paleta kart, po podbiciu nasycenia F4 i korekcie v10: cyan #61edff,
   * violet #a586ff, magenta #ff00e5, green #29ff77, amber #ffc120,
   * blue #5ba4ff.
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
 * Odcienie v4 (hexy po podbiciu nasycenia F4): mapowanie bazowy -> jasny
 * (cyan->#61edff, violet->#a586ff, green->#29ff77, amber->#ffc120)
 * + rozróżnienie DUBLI w jednym gridzie paletą spec: strony-www dostają
 * blue #5ba4ff (trzeci cyjan w mapie), agent-rekrutacyjny (baza to już jasny
 * violet) idzie w magentę #ff00e5 (v10: neon wzorca zamiast różu). */
export const INF_KATEGORIA: Record<string, InfDekor> = {
  chatboty: { c: '#11e0ff', odcien: '#61edff', emoji: '💬', ikona: 'chat-dymek' },
  voiceboty: { c: '#b638ff', odcien: '#a586ff', emoji: '🎙️', ikona: 'sluchawka-fala' },
  'agent-rekrutacyjny': { c: '#a586ff', odcien: '#ff00e5', emoji: '🤝', ikona: 'osoba-check' },
  automatyzacje: { c: '#00c986', odcien: '#29ff77', emoji: '⚡', ikona: 'blyskawica' },
  'dokumenty-faktury': { c: '#ffa101', odcien: '#ffc120', emoji: '📄', ikona: 'dokument-skan' },
  // v5 (spec §2): emoji opieki 🛡️ -> 🛠️ (lista emoji dropdownu Usługi 1:1 ze spec).
  'opieka-ai': { c: '#00c986', odcien: '#29ff77', emoji: '🛠️', ikona: 'tarcza-serce' },
  'audyt-ai': { c: '#ffa101', odcien: '#ffc120', emoji: '🔍', ikona: 'lupa-wykres' },
  rozwiazania: { c: '#b638ff', odcien: '#a586ff', emoji: '🧩', ikona: 'puzzle' },
  'strony-www': { c: '#11e0ff', odcien: '#5ba4ff', emoji: '🌐', ikona: 'glob-siatka' },
  optymalizacja: { c: '#11e0ff', odcien: '#61edff', emoji: '📈', ikona: 'wykres-strzalka' },
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
  poradnik: { c: '#11e0ff', odcien: '#61edff', emoji: '📚', ikona: 'ksiazka' },
  wpis: { c: '#a586ff', odcien: '#ff00e5', emoji: '📝', ikona: 'notes-pioro' },
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
  'app-coachingowa-z-agentami': { c: '#a586ff', odcien: '#ff00e5', ikona: 'gwiazda-kompas', emoji: '🗓️' },
  'apka-obecnosci-skladek': { c: '#00c986', odcien: '#29ff77', ikona: 'kalendarz-check', emoji: '✅' },
  'centrum-dowodzenia': { c: '#11e0ff', odcien: '#61edff', ikona: 'radar', emoji: '🎛️' },
};

/**
 * Narzędzia (klucz = slug z lib/narzedzia) — dropdown "Narzędzia" + hub.
 */
export const INF_NARZEDZIE: Record<string, InfIkonaDekor> = {
  // Odcienie v4: 5 narzędzi = 5 RÓŻNYCH tonów (grid teasera na home,
  // partia C) — pełne pokrycie palety bez dubli.
  // v5 (spec §2): emoji dropdownu Narzędzia 1:1 ze spec: 🧮 ⏱️ 🧭 🔎 ✍️
  // (kolejność listy spec = kolejność rejestru NARZEDZIA).
  'kalkulator-oszczednosci': { c: '#11e0ff', odcien: '#61edff', ikona: 'kalkulator', emoji: '🧮' },
  'kalkulator-procesu': { c: '#00c986', odcien: '#29ff77', ikona: 'wykres-strzalka', emoji: '⏱️' },
  'test-gotowosci-ai': { c: '#b638ff', odcien: '#a586ff', ikona: 'gwiazda-kompas', emoji: '🧭' },
  'audyt-strony-ai': { c: '#ffa101', odcien: '#ffc120', ikona: 'lupa-wykres', emoji: '🔎' },
  'generator-promptow': { c: '#a586ff', odcien: '#ff00e5', ikona: 'iskry', emoji: '✍️' },
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
  blog: { c: '#a586ff', odcien: '#ff00e5', ikona: 'notes-pioro', emoji: '📰' },
  poradniki: { c: '#11e0ff', odcien: '#61edff', ikona: 'ksiazka', emoji: '📖' },
  materialy: { c: '#ffa101', odcien: '#ffc120', ikona: 'magnes', emoji: '🧲' },
  'ai-radar': { c: '#b638ff', odcien: '#a586ff', ikona: 'radar', emoji: '📡' },
};
