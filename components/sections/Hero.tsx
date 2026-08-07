import type { CSSProperties } from 'react';
import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { WritingHeadline } from '@/components/motion/WritingHeadline';
import { InfinityLoopStatic } from '@/components/motion/InfinityLoopStatic';
import { HeroLoopLite } from '@/components/motion/HeroLoopLite';
// import { AnimatedMetric } from '@/components/motion/AnimatedMetric'; // wróci z realnymi metrykami
import { POSITIONING, HOME_CTA } from '@/lib/site';
import { HeroPersonaCycler } from './HeroPersonaCycler';
import { HeroLiczniki } from './HeroLiczniki';

/**
 * SEKCJA 1 — HERO (spec 06 §"CZĘŚĆ 1", WARIANT A "Działa, nie gada" — REKOMENDOWANY).
 * INFINITY v3 (decyzja Pawła): layout WYŚRODKOWANY, wzorzec 1:1, nasza treść.
 * Kolejność pionowa (spec v3 §HERO): slot WIELKIEJ animacji ∞ pod paskiem nav →
 * overline mono z liniami → H1 (maszyna pisania NIETYKALNA, tylko wyśrodkowana) →
 * lead → chipy zaufania → CTA-pigułki → pasek liczników z rejestrów → persona →
 * trasa. Desktop i mobile symetryczne (jedna oś środka, zero osobnych layoutów).
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
    <Section tone="base" space="lg" containerWidth="default" className="relative isolate text-center">
      {/* SLOT ANIMACJI ∞ (spec v4 §PARTIA B pkt 2) — lemniskata 3D „pływające
          DNA" pod paskiem nav, ŚCIŚNIĘTA: aspect 760/300, ~300px wysokości na
          desktopie (skaluje się w dół z szerokością). W HTML zawsze STATYCZNY
          SVG (reduced-motion + pierwszy paint). Desktop ≥1024px: HeroRibbon
          (przez MotionGate, długo po load) portaluje TU canvas i płynnie
          nakrywa SVG (opacity swap inline w JS — zero migniecia). Mobile
          <1024px i !reduced-motion: gate HeroLoopLite montuje lekki canvas
          (2×48 kropek, DPR 1, 30fps) po load+idle — bramki się wykluczają.
          Czysta dekoracja: aria-hidden, pointer-events-none, BEZ
          overflow-hidden (glow może wystawać). */}
      <div
        id="hero-loop"
        data-hero-loop
        aria-hidden="true"
        className="pointer-events-none relative mx-auto flex aspect-[760/300] w-full max-w-[760px] items-center justify-center"
      >
        <InfinityLoopStatic />
        {/* Gate mobilnego canvasa lite (spec v4 §B pkt 3) — sam decyduje o
            bramkach; na desktopie/RM nie renderuje nic. */}
        <HeroLoopLite />
      </div>

      {/* INFINITY: badge → mono overline z liniami po bokach (.inf-overline
          + .inf-overline-lines, fundament). Treść 1:1 (POSITIONING.subClaim);
          linie gradientowe fundamentu centrują tekst same (flex 1 po bokach). */}
      <Reveal eager>
        <p className="inf-overline inf-overline-lines mx-auto mb-5 mt-6 max-w-[640px]">
          {POSITIONING.subClaim}
        </p>
      </Reveal>

      {/* H1 — hasło kategorii (north star #3): litery kolorowane per-glif gradientem
          marki (WritingHeadline). MECHANIZM MASZYNY DO PISANIA NIETKNIĘTY — zmiana
          v3 to WYŁĄCZNIE oś: text-center (dziedziczone z sekcji) + mx-auto na max-w.
          Tekst H1 zostaje realnym tekstem w DOM (boty czytają; aria-label daje
          czytnikom pełne zdanie jednym ciągiem). Po wejściu H1 stoi NIERUCHOMO. */}
      <WritingHeadline text={POSITIONING.claim} className="text-display mx-auto max-w-[18ch]" />

      {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. Analogia w 1. zdaniu.
          v3: wyśrodkowana, max-w ~640px (spec §HERO pkt 5). */}
      <Reveal eager delay={0.07}>
        <p className="text-lead mx-auto mt-6 max-w-[640px] text-fg-muted">
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
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
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

      {/* CTA-PIGUŁKI OBOK SIEBIE (spec v3 §HERO pkt 7) + mikrokopia pod spodem.
          Primary = istniejący CTA (HOME_CTA.label 1:1) jako .inf-glow-cta na
          MagneticButton (magnetyzm NIETKNIĘTY; kontrakt .sf-magnetic .inf-glow-cta
          scalony w globals). Obok — DWA istniejące linki hero 1:1 jako pigułki
          ghost (teksty i kotwice bez zmian; diff treści = 0, więc oba zostają
          w tym samym rzędzie). Strzałki = dekoracje aria-hidden (.sf-arrow). */}
      <Reveal eager delay={0.14}>
        <div className="mt-9 flex flex-col items-center gap-3">
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

      {/* PASEK LICZNIKÓW (spec v3 §HERO pkt 8) — liczby PRAWDZIWE: zliczenia
          rejestrów przy buildzie (HeroLiczniki, server). Zero zmyślonych liczb. */}
      <HeroLiczniki />

      {/* Dynamiczny odbiorca (personalizacja językiem, RODO-safe) — zostaje
          PONIŻEJ liczników (spec v3 §HERO pkt 9), treść bez zmian; v3 tylko
          centruje blok (mx-auto, text-center dziedziczone z sekcji). */}
      <Reveal eager delay={0.24}>
        <div className="mx-auto mt-9 max-w-[46ch] border-t border-border pt-5">
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

/* CSS DO DOPISANIA (partia B — HERO): gotowe reguły do globals.css (właściciel:
   partia A; konwencja pliku: media poza @layer, sekcja INFINITY).

   1) KONTRAKT JUŻ SCALONY (v2, zostaje bez zmian): .sf-magnetic .inf-glow-cta
      (+ :hover/:focus-visible) — pigułka CTA wewnątrz magnetyzmu. Nie ruszać.

   2) NOWE (v3, slot lemniskaty) — slot #hero-loop jest samowystarczalny na
      utilities (aspect-[940/420], max-w-[940px], relative), a podmianę
      SVG↔canvas HeroRibbon robi INLINE w JS (zero zależności od tych reguł).
      CSS potrzebny wyłącznie dla Windows High Contrast (jak .inf-particles):

@media (forced-colors: active) {
  [data-hero-loop] {
    display: none;
  }
}

   3) SPRZĄTANIE (v3): reguły .inf-ribbon-slot i .inf-ribbon (+ ich wpis w
      forced-colors) są MARTWE — HeroRibbon nie wstrzykuje już własnego slotu
      (portaluje do [data-hero-loop] z tego pliku) i nie używa klasy .inf-ribbon.
      Można je usunąć przy scalaniu.
*/
