/**
 * INFINITY v7 (spec §PARTIA D pkt 1) — SEPARATOR SEKCJI, markup 1:1 z pomiarów
 * wzorca infinitytechstack.uk (.lp-divider): dwie cienkie linie gradientowe,
 * między nimi mono etykieta „01 · PROBLEM", a po liniach przebiega iskra
 * (@keyframes inf-divider-shimmer, 4 s infinite; desktop ≥1024px, reduced-motion
 * ją gasi, a poza kadrem stoi — pauza z MotionOrchestrator, patrz nota na końcu).
 *
 * Po co: skarga Pawła po v6 — „przejście z sekcji do sekcji u nich płynne,
 * przechodzi minimalistyczny pasek, dwie-trzy iskry rozdzielają sekcje, dzieje
 * się automatycznie cały czas. U nas podział sekcji za wyraźny". Separator
 * zastępuje twardą krawędź zmiany tonu miękkim przejściem.
 *
 * DEKORACJA: całość aria-hidden. Etykieta powtarza to, co niesie H2 sekcji
 * poniżej, więc czytnik ekranu NIE może czytać jej drugi raz. Zero nowych
 * stringów treści: `etykieta` to wielkie litery ISTNIEJĄCEGO tytułu/id sekcji
 * (mapa w app/page.tsx), `nr` to pozycja sekcji w opowieści.
 *
 * Wygląd niesie CSS z app/globals.css (właściciel: partia A) — kontrakt klas
 * na końcu pliku. Bez tych reguł separator degraduje się do trzech pustych
 * elementów w flow (nic nie psuje, nic nie zasłania).
 */
/**
 * ODSTĘP PIONOWY (fix v7 MINOR 7): `.inf-divider` z globals.css celowo NIE ma
 * marginesu — kontrakt tam mówi wprost „odstęp pionowy dokłada konsument
 * (utility `my-*`)". Bez tego pasek siedział dokładnie w szwie dwóch sekcji
 * i wyglądał na przyklejony do krawędzi tła.
 * Rytm dokładamy TU, nie w 15 miejscach w app/page.tsx — jedno źródło prawdy,
 * więc separatory nie mogą się rozjechać między sobą.
 * Wartości z naszej skali: my-6 = --space-6 = 32px (mobile), md:my-7 =
 * --space-7 = 48px (od 768px). Sekcje mają py-section = clamp(64px, 8vw, 128px),
 * więc pasek dostaje ok. 1/2 do 1/3 oddechu sekcji: odkleja się od szwu,
 * a nie rozpycha strony (15 separatorów × 2 marginesy).
 *
 * DLACZEGO OPAKOWANIE, A NIE `my-*` NA `.inf-divider`: reguła `.inf-divider`
 * w globals.css ustawia SKRÓT `margin: 0 auto` i leży w arkuszu PÓŹNIEJ niż
 * utilities Tailwinda (sprawdzone w zbudowanym CSS: `.my-6` ok. znaku 35 tys.,
 * `.inf-divider` ok. 78 tys., ta sama swoistość) — skrót wyzerowałby
 * margin-top/bottom i odstępu by NIE było. Margines niesie więc zewnętrzny
 * div, a `.inf-divider` dalej sam trzyma szerokość i wyśrodkowanie.
 */
export function SekcjaSeparator({ nr, etykieta }: { nr: string; etykieta: string }) {
  return (
    <div className="my-6 md:my-7" aria-hidden="true">
      <div className="inf-divider">
        <div className="inf-divider-line" />
        <span className="inf-divider-label">
          {nr} · {etykieta}
        </span>
        <div className="inf-divider-line" />
      </div>
    </div>
  );
}

/* GDZIE STOI WYGLĄD (audyt H3 pkt 3): app/globals.css, blok „INFINITY v7 —
   SEPARATOR SEKCJI" (POZA @layer — Tailwind v3 wycina z @layer klasy, których
   nie widzi w treści). To JEDYNE źródło prawdy; ten plik dostarcza wyłącznie
   markup. Wcześniej wisiała tu propozycja „CSS DO DOPISANIA" z etapu projektu —
   usunięta, bo rozjechała się z wdrożeniem i tworzyła drugą wersję prawdy.
   Realny stan reguł, żeby następny czytelnik nie musiał zgadywać:
     • iskra jedzie na `transform: translate3d` (kompozytor), NIE na `left`
       (tamta wersja przeliczała układ strony w każdej klatce),
     • przelot -250% -> 400% WŁASNEJ szerokości pasa (= -100% -> 160% linii),
       2,4 s ruchu + 1,6 s ciszy w cyklu 4 s,
     • animacja startuje dopiero od 1024px i tylko bez reduced-motion (mobile:
       kreska stoi, iskra czeka poza kadrem linii),
     • poza kadrem animacja STOI: MotionOrchestrator przełącza klasę
       `is-paused` na `.inf-divider` jednym IntersectionObserverem
       (`animation-play-state: paused`) — markup tego nie obsługuje, klasa
       przychodzi z zewnątrz,
     • etykieta jest JAŚNIEJSZA niż we wzorcu (color-mix --accent-2 70% z bielą,
       opacity .8, 11px = ~5,0:1) — świadome odstępstwo dla kontrastu AA,
       wzorzec ma tam ~1,5:1.
   Bez tych reguł separator degraduje się do trzech pustych elementów w flow:
   nic nie psuje, nic nie zasłania. */
