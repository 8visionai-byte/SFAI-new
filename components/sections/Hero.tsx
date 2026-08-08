import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { WritingHeadline } from '@/components/motion/WritingHeadline';
import { VoiceAura } from '@/components/motion/VoiceAura';
// import { AnimatedMetric } from '@/components/motion/AnimatedMetric'; // wróci z realnymi metrykami
// INFINITY v5 §1: lemniskata zeszła z hero (InfinityLoopStatic / HeroLoopLite /
// HeroRibbon zostają w repo NIEUŻYWANE na hero — bez slotu [data-hero-loop]
// HeroRibbon sam nic nie montuje). NIE kasować plików (decyzja spec).
import { POSITIONING, HOME_CTA } from '@/lib/site';
import { HeroPersonaCycler } from './HeroPersonaCycler';
import { HeroLiczniki } from './HeroLiczniki';
import { HeroDaneRynku } from './HeroDaneRynku';

/**
 * SEKCJA 1 — HERO (spec 06 §"CZĘŚĆ 1", WARIANT A "Działa, nie gada" — REKOMENDOWANY).
 * INFINITY v3 (decyzja Pawła): layout WYŚRODKOWANY, wzorzec 1:1, nasza treść.
 * Kolejność pionowa (spec v3 §HERO) = KOLEJNOŚĆ W DOM, niezmieniona do dziś:
 * slot wielkiej animacji (dziś blob voice agenta) pod paskiem nav → overline
 * mono z liniami → H1 (maszyna pisania NIETYKALNA, tylko wyśrodkowana) → lead →
 * chipy z danymi rynku (v10: były chipy zaufania) → CTA-pigułki → pasek
 * liczników z rejestrów → persona → trasa.
 *
 * INFINITY v7 §PARTIA C pkt 1: od 1024px ta sama kolejność DOM jest złożona
 * w PAS TRÓJDZIELNY — chipy | blob | liczniki w jednym rzędzie gridu, reszta
 * przez całą szerokość. Powód: dwa wielkie puste pola po bokach bloba
 * (czerwone ramki na zrzucie Pawła). Poniżej 1024px grid jest wyłączony, więc
 * mobile zostaje jedną kolumną w dotychczasowej kolejności (zero regresji).
 *
 * TREŚCI 1:1 — zero zmian tekstów (partia B nie ma zgody na treści). Zmiana jest
 * WYŁĄCZNIE w układzie i dekoracji. Liczniki = zliczenia rejestrów (HeroLiczniki).
 *
 * METRYKI i DOWÓD przy CTA są CELOWO wyłączone do czasu realnych danych.
 * Zasada (north star #5, #6): zero zmyślonych liczb — red team rozwali w 30 s.
 * Lepszy pusty slot niż atrapa liczby. INPUT PAWŁA poniżej.
 *
 * Pozostałe 2 warianty hero (B "Pracownik, nie program", C "Schody, nie skok")
 * z 06-copy-hero-uslugi.md zachowane w komentarzu na końcu pliku — do A/B testu.
 */

// METRYKI hero — WYŁĄCZONE: poprzednie wartości (23 / 140 h / 7 dni) były atrapami.
// INPUT PAWŁA: wstawić realne, weryfikowalne liczby z wdrożeń i odkomentować render
// bloku <dl> niżej (oraz import AnimatedMetric, jeśli ma być count-up).
// const METRICS = [
//   { value: '...', label: 'wdrożeń AI postawionych' },
//   { value: '... h', label: 'godzin miesięcznie zdjętych z zespołów' },
//   { value: '... dni', label: 'średni czas od rozmowy do działającego Agenta' },
// ] as const;

export function Hero() {
  return (
    /*
      INFINITY v3 — hero CENTERED: text-center na sekcji = jedna oś dla całej
      kolumny; elementy blokowe centruje mx-auto + max-w. Poprzedni układ
      „dołem-lewo" (świat B) wyleciał na wprost polecenie Pawła („hero
      wyśrodkowane z wielką animacją pod paskiem"). overflow-hidden ZDJĘTY
      (żelazna zasada v3: zero clippingu wokół elementów z poświatą — glow
      lemniskaty i CTA mogą wystawać). Tło robią globalne starfield/particles/
      mgławice (layout) — sekcja nie ma już własnych warstw dekoracyjnych.
    */
    /*
      INFINITY v8 §6 (cytat Pawła: „ile miejsca niezagospodarowanego jest na
      górze, całość trzeba przesunąć do góry"): ODDECH NAD HERO ŚCIĘTY.
      Zmierzone przed zmianą (realny Chrome 1440x900): padding-top sekcji
      151,2px, a nad nim jeszcze pasek nav 64px — czyli 215px pustki, zanim
      cokolwiek się zaczyna. Wzorzec trzyma nad treścią 56px (`.lp
      { padding-top: 56px }` przy pasku fixed 54px), więc schodzimy do tego
      rzędu: 32px mobile / 40px desktop nad blobem.
      py-section-loose zostaje na DOLE sekcji (rytm otwarcia aktu bez zmian) —
      nadpisujemy wyłącznie górę, bo `pt-*` stoi w utilities PO `py-*`.
      Wymiary px ARBITRALNIE (pułapka repo: h-9 = 96px, skala spacingu to
      własne tokeny).
    */
    <Section tone="base" space="lg" containerWidth="default" className="relative isolate pt-[32px] text-center lg:pt-[40px]">
      {/*
        INFINITY v7 §PARTIA C pkt 1 — PAS TRÓJDZIELNY HERO (desktop ≥1024px).
        Skarga Pawła (czerwone ramki na zrzucie): po LEWEJ i po PRAWEJ stronie
        bloba stały dwa wielkie puste pola, a nad overline pas pustki. Fix BEZ
        dokładania treści: jeden grid [1fr | auto (blob) | 1fr], a skrzydła
        dostają ISTNIEJĄCE elementy hero, które dotąd leżały pod spodem —
        chipy zaufania po lewej, pasek liczników po prawej. Blob zostaje na
        środku (spec: „Blob zostaje na środku"), reszta kolumny (overline, H1,
        lead, CTA, persona, trasa) jedzie przez wszystkie trzy kolumny, więc oś
        środka i szerokość H1 są jak dotąd.
        KOLEJNOŚĆ W DOM BEZ ZMIAN: skrzydła stoją na JAWNYCH współrzędnych
        (lg:col-start/lg:row-start), nie na przestawionym markupie. Dzięki temu
        poniżej 1024px (grid nieaktywny) układ pionowy czyta dokładnie jak
        dotąd: blob → overline → H1 → lead → chipy → CTA → liczniki → persona,
        czyli mobile bez regresji, a czytnik ekranu dostaje H1 tak wcześnie
        jak przed zmianą.
      */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-[32px]">
        {/* SLOT BLOBA VOICE AGENTA (spec v5 §1, decyzja Pawła: „zamiast tej
            wizualizacji 3D wrzucasz tutaj naszego bota") — FlowCore 1:1 z 10K
            (VoiceAura): canvas WebGL + statyczna aura fallback + PRZYCISK
            „Zapytaj AI / Voice agent" (data-agent-open="voice" otwiera konsolę
            agenta zamontowaną globalnie w layout). Rozmiar wg spec: ~420px
            desktop / ~300px mobile — wymiary px ARBITRALNIE (pułapka tokenów
            spacingu repo: h-9 = 96px!). BEZ aria-hidden i pointer-events-none
            (w środku jest interaktywny przycisk); BEZ overflow-hidden (glow
            bloba może wystawać — żelazna zasada v3).
            v7: środkowa kolumna pasa (auto = dokładnie szerokość bloba).
            v8 §6 (cytat Pawła: „nasze Zapytaj AI można zrobić zdecydowanie
            trochę większe, zaznaczyłem na screenshocie" — czerwona elipsa
            ~2x obecnego bloba): SLOT URÓSŁ 420 -> clamp(440,44vw,620)px na
            desktopie i 300 -> 420px na mobile.
            ILE REALNIE UROSŁA ANIMACJA: shader rysuje blob o średnicy
            0,464 x WYSOKOŚĆ slotu (boundary 0.232 w VoiceAura, uv liczone
            po wysokości), czyli 195px -> 288px.
            UJEMNE MARGINESY: zewnętrzny pierścień slotu jest fizycznie
            PRZEZROCZYSTY (alpha shadera gaśnie do zera przy ~0,47 promienia),
            więc gdyby slot płacił pełną wysokość w układzie, powiększenie
            bloba zepchnęłoby H1 pod fold. Ujemne marginesy oddają ten pusty
            pierścień układowi: blob wjeżdża wyżej (górny), a overline i H1
            podchodzą pod niego (dolny).

            v9 §6 (cytaty Pawła: „za mały jest tutaj nasz voicebot, powinien
            być troszkę większy", „poświatę dać bardziej różowawą, bardziej
            rażącą, żeby nie był taki blady"): SLOT DESKTOP 620 -> 780px.
            POMIAR PRZED (realny Chrome 1440x900, headless CDP): slot 620x620
            w x 403, chip „Twoje dane zostają w UE" 192px, lewe skrzydło pasa
            218px, H1 na y 634.
            DLACZEGO clamp(560px, 54vw, 780px) I DLACZEGO -mx-[80px]:
            środkowa kolumna pasa jest `auto`, więc szerokość bloba zabiera
            miejsce skrzydłom, a chip ma ZMIERZONE 192px. Same 780px zostawiłyby
            skrzydłom po 148px i pas by się rozjechał. Ujemny margines poziomy
            oddaje kolumnie tylko 780-160 = 620px (czyli dokładnie tyle, ile
            zajmowała przed zmianą), więc skrzydła mają dalej po 218px, a blob
            wystaje w NIEWIDOCZNY sposób: 80px od krawędzi slotu to promień
            ~0,45 wysokości, gdzie alpha shadera jest już przy zerze.
            PION: -mt 56 / -mb 128 (zamiast 40/96) — to ten sam UDZIAŁ pustego
            pierścienia co dotąd, przeliczony na większy slot. Z progu alfy
            shadera (gaśnie przy 0,47 promienia) wychodzi, że pierwszy malowany
            piksel bloba wypada 7px pod pigułką nav przy 1440px i równo pod nią
            przy 1024px, więc świecenie nie wchodzi pod pasek. Odstęp między
            indeksem „Żywa modulacja" a overline: zmierzone 69px po zmianie
            wobec 65px przed nią, czyli rytm bez zmian.
            CENA ZMIANY, ZMIERZONA: H1 startuje na y 736 zamiast 634 (+102px).
            Tyle kosztuje blob większy o 150px wysokości — proporcja pustego
            pierścienia jest stała, więc nie da się tego oddać bez wjechania
            świeceniem pod nav. H1 dalej pada w pierwszym kadrze 1440x900
            (736 < 900), czyli element LCP zostaje ten sam.
            MOBILE BEZ ZMIAN GEOMETRII (h-420, w-full, max-w-420): LCP maszyny
            pisania jest święte, a Paweł prosił o większy blob „tutaj", czyli na
            desktopie. Mobile dostaje wyłącznie mocniejszą poświatę (shader +
            flow-core.css), która nie kosztuje ani piksela układu.
            SZEROKOŚĆ MOBILE: w-full + max-w-[420px], więc przy 375px i 320px
            slot ma szerokość kontenera i NIE MA szans na poziomy scroll
            (zmierzone: scrollWidth == clientWidth na obu).

            v10 §1 — BLOB SKALUJE SIĘ TEŻ DO WYSOKOŚCI OKNA (bloker: H1
            z maszyną pisania, czyli sygnatura marki i element LCP, wypadł poza
            pierwszy ekran). PRZYCZYNA: `clamp(560px,54vw,780px)` pytało
            WYŁĄCZNIE o szerokość okna, więc na niskim i szerokim laptopie blob
            rósł, choć brakowało wysokości.
            ZMIERZONE PRZED (realny Chrome, headless CDP, produkcyjny build):
              1440x900  blob 770  H1 dół 922 = 22px POD krawędzią ekranu
              1366x768  blob 730  H1 dół 882 = 114px POD krawędzią
              1280x800  blob 683  H1 dół 836 = 36px POD krawędzią
            czyli na najpopularniejszym laptopie widać było górne połówki liter.
            FIX: `min(54vw, 75vh, 780px)`. Człon 75vh jest nowy i to on ratuje
            fold; 54vw zostaje bez zmian (te same szerokości co dotąd), 780px
            zostaje sufitem, więc na dużych monitorach blob ma być dalej duży
            (1920x1080 → 780, 1440x1080 → 770, czyli zakres 700-780 z zadania).
            SKĄD 75%: slot płaci układowi (h - 56 - 128), a dolna krawędź H1
            przesuwa się 1:1 za wysokością slotu. Z pomiarów wyszły progi
            728px (900), 596px (768) i 627px (800) dla zapasu 20px; 0,75 daje
            675 / 576 / 600, czyli zapas z rezerwą na każdym z nich.
            PODŁOGA 360px: bardzo niskie okno (np. 1280x400) nie ma zamieniać
            bloba w kropkę. Stary dolny próg 560px MUSIAŁ zniknąć — sam
            unieważniłby zjazd na 768px.
            DLACZEGO vh, A NIE dvh: browserslist repo dopuszcza Chrome 100,
            a dvh wchodzi dopiero w 108. Nieznana jednostka wywala CAŁE min(),
            slot zostałby wtedy na wysokości mobilnej. Na desktopie vh i dvh
            i tak są tożsame.
            MARGINESY BEZ ZMIAN (-56 / -128 / -80): to są ODLEGŁOŚCI, nie
            proporcje — górny trzyma dystans bloba od pigułki nav, dolny odstęp
            do overline, poziomy oddaje kolumnie pasa przezroczysty pierścień.
            Skutek uboczny na plus: mniejszy blob = szersze skrzydła pasa
            (zmierzone 218px → 260px przy 1440x900), a właśnie tam wjeżdżają
            czterolinijkowe chipy z danymi.
            MOBILE NIETKNIĘTE (h-420 + w-full + max-w-420): geometria mobile
            została zatwierdzona przez właściciela w v9, a LCP maszyny pisania
            jest święte. */}
        <div className="relative mx-auto -mb-[64px] -mt-[16px] h-[420px] w-full max-w-[420px] lg:col-start-2 lg:row-start-1 lg:-mx-[80px] lg:-mb-[128px] lg:-mt-[56px] lg:[--blob:clamp(360px,min(54vw,75vh),780px)] lg:h-[var(--blob)] lg:w-[var(--blob)] lg:max-w-none">
          <VoiceAura />
        </div>

        {/* INFINITY: badge → mono overline z liniami po bokach (.inf-overline
            + .inf-overline-lines, fundament). Treść 1:1 (POSITIONING.subClaim);
            linie gradientowe fundamentu centrują tekst same (flex 1 po bokach).
            v7: odstęp NAD overline ścięty (mt-6 → mt-3, mb-5 → mb-4) — to jest
            ten „pas pustki" z czerwonej ramki Pawła. */}
        <Reveal eager className="lg:col-span-3">
          <p className="inf-overline inf-overline-lines mx-auto mb-4 mt-3 max-w-[640px]">
            {POSITIONING.subClaim}
          </p>
        </Reveal>

        {/* H1 — hasło kategorii (north star #3): litery kolorowane per-glif gradientem
            marki (WritingHeadline). MECHANIZM MASZYNY DO PISANIA NIETKNIĘTY — zmiana
            v3 to WYŁĄCZNIE oś: text-center (dziedziczone z sekcji) + mx-auto na max-w;
            v7 dokłada wyłącznie rozpiętość na 3 kolumny pasa (zero zmian w animacji).
            Tekst H1 zostaje realnym tekstem w DOM (boty czytają; aria-label daje
            czytnikom pełne zdanie jednym ciągiem). Po wejściu H1 stoi NIERUCHOMO. */}
        <WritingHeadline text={POSITIONING.claim} className="text-display mx-auto max-w-[18ch] lg:col-span-3" />

        {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. Analogia w 1. zdaniu.
            v3: wyśrodkowana, max-w ~640px (spec §HERO pkt 5). */}
        <Reveal eager delay={0.07} className="lg:col-span-3">
          <p className="text-lead mx-auto mt-6 max-w-[640px] text-fg-muted">
            Chatbot odpowiada na pytania. AI Agent wykonuje pracę: odbiera telefony, odpisuje klientom,
            umawia spotkania i pilnuje faktur. Nie sprzedajemy narzędzi AI. Projektujemy systemy, które
            zdejmują z polskiej firmy powtarzalną robotę, w dni, nie w miesiące. Twoje dane zostają w Unii
            Europejskiej, zaczynasz od małego kroku, płacisz za efekt.
          </p>
        </Reveal>

        {/* LEWE SKRZYDŁO PASA — v10 §2: CZTERY ŚWIECĄCE CHIPY Z LICZBAMI
            (HeroDaneRynku). Trzy mono-chipy zaufania („Twoje dane zostają w UE",
            „RODO i AI Act", „Płacisz za efekt") ZNIKAJĄ stąd na wprost polecenie
            właściciela („z tej głównej strony chcę to wyciągnąć (...) są za
            słabe"). Te frazy NIE giną ze strony: dalej niosą je PasekZaufania
            i ServiceHero — tam nic nie ruszamy.
            Każda nowa liczba ma źródło i rok PRZY sobie (GUS / Eurostat / PIE),
            dane z raporty/plan-dane-problem.md.
            ≥1024px: kolumna 1 pasa, wyśrodkowana pionowo względem bloba
            (self-center). Poniżej 1024px: blok pod leadem, czyli POD blobem,
            jak dotąd — kolejność DOM bez zmian. */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-center">
          <HeroDaneRynku />
        </div>

        {/* CTA-PIGUŁKI OBOK SIEBIE (spec v3 §HERO pkt 7) + mikrokopia pod spodem.
            Primary = istniejący CTA (HOME_CTA.label 1:1) jako .inf-glow-cta na
            MagneticButton (magnetyzm NIETKNIĘTY; kontrakt .sf-magnetic .inf-glow-cta
            scalony w globals). Obok — DWA istniejące linki hero 1:1 jako pigułki
            ghost (teksty i kotwice bez zmian; diff treści = 0, więc oba zostają
            w tym samym rzędzie). Strzałki = dekoracje aria-hidden (.sf-arrow).
            v7: liczniki wyjechały na prawe skrzydło, więc CTA nie potrzebuje już
            96px oddechu pod spodem — mt-9 → mt-7 (48px). */}
        <Reveal eager delay={0.14} className="lg:col-span-3">
          <div className="mt-7 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton variant="primary" href={HOME_CTA.href} className="inf-glow-cta">
                {HOME_CTA.label}{' '}
                <span aria-hidden="true" className="sf-arrow">→</span>
              </MagneticButton>
              <a href="#problem" className="inf-glow-cta inf-glow-cta-ghost">
                Zobacz, jak liczę oszczędność <span aria-hidden="true" className="sf-arrow">→</span>
              </a>
              <a href="#demo" className="inf-glow-cta inf-glow-cta-ghost">
                Zobacz, jak rozmawia nasz Agent <span aria-hidden="true" className="sf-arrow">→</span>
              </a>
            </div>
            <span className="text-caption max-w-[44ch] text-fg-subtle">{HOME_CTA.microcopy}</span>

            {/*
              DOWÓD przy CTA — usunięto zmyśloną referencję "−40%, Anna K." (niefalsyfikowalna,
              łamała north star #5/#13 i miała em-dash). INPUT PAWŁA: wstawić JEDEN realny
              dowód: case z liczbą + imię + firma (za zgodą klienta) ALBO jedną prawdziwą
              liczbę operacyjną (np. "voicebot obsłużył X połączeń w miesiącu").
            */}
          </div>
        </Reveal>

        {/* PRAWE SKRZYDŁO PASA (v7): PASEK LICZNIKÓW (spec v3 §HERO pkt 8) —
            liczby PRAWDZIWE: zliczenia rejestrów przy buildzie (HeroLiczniki,
            server). Zero zmyślonych liczb.
            HeroLiczniki NIE należy do tej partii (zero zmian w tamtym pliku),
            więc przestawienie rzędu na słupek robi opakowanie: wariantami
            arbitralnymi zdejmujemy z listy odstęp górny (mt-9 = 96px) i kładziemy
            ją w kolumnie, a poszczególnym pozycjom zdejmujemy PIONOWY separator
            .inf-counter + .inf-counter (border-left + padding-left z globals) —
            w słupku kreska z lewej nie ma sensu, pozycje rozdziela gap-y listy.
            Warstwa utilities Tailwinda jest emitowana PO @layer components,
            więc przy równej specyficzności te nadpisania wygrywają. */}
        <div className="lg:col-start-3 lg:row-start-1 lg:self-center lg:[&_.inf-counter]:border-l-0 lg:[&_.inf-counter]:pl-0 lg:[&_ul]:mt-0 lg:[&_ul]:flex-col lg:[&_ul]:items-center">
          <HeroLiczniki />
        </div>

        {/* Dynamiczny odbiorca (personalizacja językiem, RODO-safe) — zostaje
            PONIŻEJ liczników (spec v3 §HERO pkt 9), treść bez zmian; v3 tylko
            centruje blok (mx-auto, text-center dziedziczone z sekcji).
            v7: mt-9 → mt-7, bo pas liczników nie stoi już nad tym blokiem. */}
        <Reveal eager delay={0.24} className="lg:col-span-3">
          <div className="mx-auto mt-7 max-w-[46ch] border-t border-border pt-5">
            <p className="text-overline uppercase tracking-[0.14em] text-fg-subtle">
              Powtarzalna robota wygląda inaczej w każdej branży. Pokaż mi swoją.
            </p>
            <p className="mt-2 text-body text-fg-muted">
              …dla <HeroPersonaCycler />.
            </p>
          </div>
        </Reveal>

        {/*
          METRYKI hero — WYŁĄCZONE do czasu realnych liczb (patrz komentarz przy METRICS).
          INPUT PAWŁA: odkomentować blok i wstawić realne, weryfikowalne metryki.
          <Reveal delay={0.2}>
            <dl className="mx-auto mt-9 grid max-w-narrow grid-cols-1 gap-6 sm:grid-cols-3">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <AnimatedMetric value={m.value} className="text-metric block font-display font-semibold tabular-nums text-brand" />
                    <span className="mt-1 block text-caption text-fg-subtle">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        */}

        {/* TRASA GRADIENTOWA (makiety 1/5) — domyka hero: cienka świetlista linia
            brandu ze świecącym punktem końcowym (.sf-route w globals.css). Wejście
            JEDNORAZOWE (dojazd 900ms, bramka reduced-motion); glow punktu jest
            statycznym box-shadow — zero pętli (budżet ruchu). Czysta dekoracja. */}
        <div aria-hidden="true" className="sf-route sf-route-dot sf-route-enter mt-12 w-full lg:col-span-3" />
      </div>
    </Section>
  );
}

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * WARIANTY ALTERNATYWNE HERO (06-copy-hero-uslugi.md §"CZĘŚĆ 1"). Render aktywny
 * = WARIANT A "Działa, nie gada" (rekomendowany). Poniżej B i C do A/B testu —
 * podmieniasz badge / H1 / kapsułę / mikrokopię. CTA i dowód wspólne (HOME_CTA,
 * dowód przy CTA dalej wyłączony do realnej liczby).
 *
 * ── WARIANT B — "Pracownik, nie program" (najcieplejszy, najmniej żargonu) ──
 * Badge:  "Budujemy AI Agentów, nie chatboty"  (= POSITIONING.claim)
 * H1:     "Zatrudnij Agenta AI, który robi robotę, nie tylko o niej rozmawia."
 * Kapsuła:
 *   "Zwykły chatbot tylko odpowiada na pytania. Nasz AI Agent działa jak cichy
 *    pracownik: odbiera telefon, kiedy Ty nie możesz, umawia wizyty, odpisuje
 *    klientom o 22:00 i przepisuje dane za Ciebie. Nie sprzedajemy narzędzi.
 *    Projektujemy systemy, które zdejmują powtarzalną robotę, w dni, nie w
 *    miesiące. Dane zostają w UE, pod Twoją kontrolą, a Ty w każdej chwili
 *    widzisz, co Agent zrobił."
 * Mikrokopia: "Bez zobowiązań i bez umowy na start. Pokażę Ci konkretnie, którą
 *    robotę da się zdjąć z Ciebie najpierw. Odpowiadam w kilka minut."
 *
 * ── WARIANT C — "Schody, nie skok" (najmocniej zdejmuje ryzyko) ──
 * Badge:  "Agent działa, nie tylko gada"  (= POSITIONING.subClaim)
 * H1:     "Budujemy AI Agentów, nie chatboty. I zaczynamy od małego kroku, nie
 *          od wielkiej umowy."
 * Kapsuła:
 *   "Chatbot gada. AI Agent załatwia sprawę: odbiera telefony, umawia spotkania,
 *    pilnuje faktur. Nie sprzedajemy narzędzi AI, tylko efekt: mniej powtarzalnej
 *    roboty w Twojej firmie, w dni, nie w miesiące. Zaczynasz od bezpłatnej
 *    diagnozy i jednego procesu. Twoje dane zostają w UE, a płacisz za wynik,
 *    nie za obietnice."
 * Mikrokopia: "Pierwszy krok nic nie kosztuje i do niczego nie zobowiązuje.
 *    Wychodzisz z konkretną listą, nawet jeśli nic u nas nie zamówisz."
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* CSS DO DOPISANIA (dla partii A — właściciela app/globals.css w tej rundzie):

   1) NIC NIE JEST WYMAGANE do pasa trójdzielnego v7. Cały układ stoi na
      utilities Tailwinda w tym pliku (grid + jawne współrzędne skrzydeł +
      warianty arbitralne zdejmujące mt-9 i separator .inf-counter w słupku).
      Świadomie bez nowej klasy w globals: pas jest jednorazową geometrią
      hero, nie tokenem języka.

   2) KONTRAKT JUŻ SCALONY (v2, zostaje bez zmian): .sf-magnetic .inf-glow-cta
      (+ :hover/:focus-visible) — pigułka CTA wewnątrz magnetyzmu. Nie ruszać.

   3) SPRZĄTANIE (v5): slot [data-hero-loop] ZNIKNĄŁ z hero (blob voice agenta
      go zastąpił — style bloba żyją w components/agent/flow-core.css, poza
      globals). Jeśli w globals są reguły [data-hero-loop] / .inf-ribbon-slot /
      .inf-ribbon (+ wpisy forced-colors), są MARTWE — można usunąć przy scalaniu.

   4) OBSERWACJA DLA PARTII B (nie ruszam, to nie mój plik): w flow-core.css
      `.flow-core canvas` i `.flow-metal-fallback` mają
      mask-image: linear-gradient(90deg, transparent 0, #000 28%, ...) — maska
      z szerokiego hero 10K zjada LEWE 28% bloba. W kwadratowym slocie 420px
      wygląda to jak ścięty bok. Do rozważenia zdjęcie maski w wariancie
      .voice-aura (u nas blob jest centrowany, nie doklejony do krawędzi).
*/
