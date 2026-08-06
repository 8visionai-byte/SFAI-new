import type { CSSProperties } from 'react';
import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HeroContours } from '@/components/motion/HeroContours';
import { WritingHeadline } from '@/components/motion/WritingHeadline';
// import { AnimatedMetric } from '@/components/motion/AnimatedMetric'; // wróci z realnymi metrykami
import { POSITIONING, HOME_CTA } from '@/lib/site';
import { HeroPersonaCycler } from './HeroPersonaCycler';

/**
 * SEKCJA 1 — HERO (spec 06 §"CZĘŚĆ 1", WARIANT A "Działa, nie gada" — REKOMENDOWANY).
 * Emocja: ulga + kompetencja. Pozycjonowanie kategorii prowadzi H1 (north star #3):
 * "Budujemy AI Agentów, nie chatboty". Analogia "chatbot odpowiada / Agent działa"
 * jest w PIERWSZYM zdaniu kapsuły — to jest cytat, który zabierze LLM.
 * Jeden H1, jedna kapsuła answer-first w surowym HTML, jedno CTA (magnetyczne).
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
      ŚWIAT B — CIEMNA PRACOWNIA (wzorzec = zrodla/makiety-b/1-hero.png):
      pełnoekranowy ciemny kadr (navy-950 z tokenów), treść osadzona DOŁEM-LEWO
      (na lg: min-h ekranu minus pasek 64px + flex justify-end; na mobile normalny
      przepływ — zero ryzyka dla LCP). KOLEJNOŚĆ i TREŚĆ sekcji NIETKNIĘTE:
      badge → H1 (maszyna do pisania) → kapsuła → persona → CTA → linki → trasa.
      Caption „Dane w UE · RODO · AI Act" z makiety POMINIĘTY świadomie: ten zapis
      (z kropkami środkowymi) nie istnieje w treściach repo, a treści są nietykalne.

      WARSTWA PREMIUM (czysto dekoracyjna, nie rusza treści/H1/CTA):
      HeroContours = sygnaturowe tło hero (cyrkiel kreśli warstwice, inline SVG,
      zero JS; świat B: krycie x3 + mix-blend screen — linie świecą na ciemnym)
      w absolutnej warstwie -z-10 pod treścią (aria-hidden u źródła i tu).
    */
    <Section
      tone="base"
      space="lg"
      containerWidth="default"
      className="relative isolate overflow-hidden lg:flex lg:min-h-[calc(100svh-4rem)] lg:flex-col lg:justify-end"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* INFINITY: subtelna siatka hero (.inf-grid, fundament) POD konturami —
            maska rozpływa ją ku dołowi, zero twardego szwu. Czysta dekoracja. */}
        <div className="inf-grid" />
        <HeroContours />
      </div>
      <Reveal eager>
          {/* INFINITY: badge → mono overline z liniami po bokach (.inf-overline
              + .inf-overline-lines, fundament). Treść 1:1 (POSITIONING.subClaim). */}
          <p className="inf-overline inf-overline-lines mb-5">
            {POSITIONING.subClaim}
          </p>
        </Reveal>

        {/* H1 — hasło kategorii (north star #3): litery kolorowane per-glif gradientem
            marki (WritingHeadline; świat B: stopy brand 1:1 z jaskrawą zielenią —
            na ciemnym świecą). MECHANIZM MASZYNY DO PISANIA NIETKNIĘTY. Tekst H1
            zostaje realnym tekstem w DOM (boty czytają; aria-label daje czytnikom
            pełne zdanie jednym ciągiem). Po wejściu H1 stoi NIERUCHOMO. */}
        <WritingHeadline text={POSITIONING.claim} className="text-display max-w-[18ch]" />

      {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. Analogia w 1. zdaniu. */}
      <Reveal eager delay={0.07}>
        <p className="text-lead mt-6 max-w-measure-lead text-fg-muted">
          Chatbot odpowiada na pytania. AI Agent wykonuje pracę: odbiera telefony, odpisuje klientom,
          umawia spotkania i pilnuje faktur. Nie sprzedajemy narzędzi AI. Projektujemy systemy, które
          zdejmują z polskiej firmy powtarzalną robotę, w dni, nie w miesiące. Twoje dane zostają w Unii
          Europejskiej, zaczynasz od małego kroku, płacisz za efekt.
        </p>
      </Reveal>

      {/* INFINITY: rząd mono-chipów zaufania (.inf-chip, fundament) pod leadem.
          Frazy 1:1 z sekcji PasekZaufania (tytuł filaru 1, fragment opisu filaru 1,
          tytuł filaru 3) — ZERO nowych treści. Kolory obwódek = trasa marki
          (dekoracja przez --chip-c; tekst chipa = --fg-muted, AA bez zmian). */}
      <Reveal eager delay={0.1}>
        <ul className="mt-6 flex flex-wrap gap-2">
          <li className="inf-chip" style={{ '--chip-c': '#2B7CFF' } as CSSProperties}>
            Twoje dane zostają w UE
          </li>
          <li className="inf-chip" style={{ '--chip-c': '#7A3CF0' } as CSSProperties}>
            RODO i AI Act
          </li>
          <li className="inf-chip" style={{ '--chip-c': '#22E06B' } as CSSProperties}>
            Płacisz za efekt
          </li>
        </ul>
      </Reveal>

      {/* Dynamiczny odbiorca (personalizacja językiem, RODO-safe).
          Świat B: blok jedzie na lewą oś razem z resztą hero (makieta 1 —
          kolumna dołem-lewo). `Reveal eager` ZOSTAJE (LCP: maluje się na
          starcie animacji CSS). */}
      <Reveal eager delay={0.14}>
        <div className="mt-9 max-w-[46ch] border-t border-border pt-5">
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

      {/* CTA główne + mikrokopia. INFINITY: CTA hero = pigułka z neonową obwódką
          i glow (.inf-glow-cta, fundament) na wariancie primary Buttona.
          MagneticButton ZOSTAJE (magnetyzm nietknięty), etykieta = HOME_CTA.label
          — zero nowych treści. Utilities Buttona (font-sans/rounded-sm/
          shadow-accent) wygrywałyby z @layer components, stąd kontrakt CSS
          `.sf-magnetic .inf-glow-cta` (koniec pliku — do globals.css).
          Strzałka = dekoracja aria-hidden (.sf-arrow, mikro-przesuw na hover). */}
      <Reveal eager delay={0.21}>
        <div className="mt-9 flex flex-col items-start gap-3">
          <MagneticButton variant="primary" href={HOME_CTA.href} className="inf-glow-cta">
            {HOME_CTA.label}{' '}
            <span aria-hidden="true" className="sf-arrow">→</span>
          </MagneticButton>
          <span className="text-caption max-w-[44ch] text-fg-subtle">{HOME_CTA.microcopy}</span>

          {/*
            DOWÓD przy CTA — usunięto zmyśloną referencję "−40%, Anna K." (niefalsyfikowalna,
            łamała north star #5/#13 i miała em-dash). INPUT PAWŁA: wstawić JEDEN realny
            dowód: case z liczbą + imię + firma (za zgodą klienta) ALBO jedną prawdziwą
            liczbę operacyjną (np. "voicebot obsłużył X połączeń w miesiącu").
          */}
        </div>
      </Reveal>

      {/* Linki drugorzędne — NIE konkurują z CTA. INFINITY: przestylizowane na
          pigułki GHOST (.inf-glow-cta-ghost, fundament) — outline w akcencie,
          teksty i cele kotwic 1:1, strzałki-dekoracje zostają. */}
      <Reveal eager delay={0.28}>
        <p className="mt-6 flex flex-wrap items-center justify-start gap-3">
          <a href="#problem" className="inf-glow-cta inf-glow-cta-ghost">
            Zobacz, jak liczę oszczędność <span aria-hidden="true" className="sf-arrow">→</span>
          </a>
          <a href="#demo" className="inf-glow-cta inf-glow-cta-ghost">
            Zobacz, jak rozmawia nasz Agent <span aria-hidden="true" className="sf-arrow">→</span>
          </a>
        </p>
      </Reveal>

      {/* TRASA GRADIENTOWA (makiety 1/5) — domyka hero: cienka świetlista linia
          brandu ze świecącym punktem końcowym (.sf-route w globals.css). Wejście
          JEDNORAZOWE (dojazd 900ms, bramka reduced-motion); glow punktu jest
          statycznym box-shadow — zero pętli (budżet ruchu). Czysta dekoracja. */}
      <div aria-hidden="true" className="sf-route sf-route-dot sf-route-enter mt-12 w-full" />
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

/* CSS DO DOPISANIA (partia HERO+NAV) — do przeniesienia do globals.css przez
   fundament/scalającego, POZA @layer (na końcu pliku, sekcja INFINITY):

   DLACZEGO: CTA hero to Button variant="primary" wewnątrz .sf-magnetic
   (magnetyzm nietykalny). Bazowe utilities Buttona (font-sans, rounded-sm,
   shadow-accent) leżą w warstwie utilities, która nadpisuje @layer components
   z .inf-glow-cta. Selektor 2-klasowy (specyficzność 0,2,0) bije utility
   (0,1,0) niezależnie od kolejności w arkuszu — pigułka odzyskuje mono,
   radius 999px i neonowy glow. Focus robi istniejący .sf-cta:focus-visible
   (podwójny pierścień — bez zmian). Reduced-motion: brak nowych animacji.

.sf-magnetic .inf-glow-cta {
  border-radius: 999px;
  font-family: var(--font-mono), ui-monospace, 'JetBrains Mono', monospace;
  letter-spacing: 0.04em;
  box-shadow: 0 0 24px -4px rgba(20, 184, 196, 0.45);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent),
    0 0 24px -4px color-mix(in srgb, var(--accent) 65%, transparent);
}
.sf-magnetic .inf-glow-cta:hover {
  box-shadow: 0 0 32px -2px rgba(20, 184, 196, 0.6);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--accent) 70%, transparent),
    0 0 32px -2px color-mix(in srgb, var(--accent) 80%, transparent);
}
.sf-magnetic .inf-glow-cta:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--bg),
    0 0 0 5px var(--ring);
}
*/
