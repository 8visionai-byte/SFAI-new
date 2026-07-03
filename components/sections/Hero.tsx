import { Section, MagneticButton, Badge, VideoBackground } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { FloatingOrbs } from '@/components/motion/FloatingOrbs';
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
      WARSTWA PREMIUM (czysto dekoracyjna, nie rusza treści/H1/CTA):
       • VideoBackground = tło-film. BRAK mp4 → animowany metaliczny gradient
         (niebieski→fiolet→zielony). scrim="light" GWARANTUJE kontrast AA pod
         CIEMNYM tekstem: rozjaśnia tło-film do jasnej, czystej bazy (życzenie
         Pawła: tła jasne, gotowe pod przyszłe wideo/zdjęcia), przepuszczając
         tylko subtelny ruch koloru metalu. Nie regresować do ciemnego scrimu.
       • Section bez theme="dark" → tokeny jasne (domyślne): tekst ciemny na
         jasnym, a H1 (.text-metal-sheen) to gradient marki + pulsująca poświata.
         Tło Section wymuszone na transparentne, żeby było widać tło-film pod spodem.
       • FloatingOrbs = pływające plamy metalu (CSS, reduced-motion → statyczne);
         scrim je rozjaśnia, więc pozostają subtelne na jasnym tle.
      Treść (Badge/H1/kapsuła/CTA) jest w surowym HTML nad tłem — cytowalna 1:1.
    */
    <VideoBackground
      src="/brand/hero-bg.mp4"
      poster="/brand/hero-bg-poster.jpg"
      scrim="light"
      decoration={<FloatingOrbs />}
    >
      <Section
        tone="base"
        containerWidth="default"
        className="!bg-transparent text-center"
      >
        <Reveal eager>
          <Badge variant="accent" className="mb-5">
            {POSITIONING.subClaim}
          </Badge>
        </Reveal>

        {/* H1 — hasło kategorii (north star #3) pisane LITERA PO LITERZE z wędrującym
            neonowym błyskiem (WritingHeadline). Gradient marki jest ciągły (clip-text),
            stan spoczynku AA-bezpieczny, pełny neon tylko jako przechodzący flash pióra.
            BEZ <Reveal> — pisanie JEST revealem. Tekst H1 zostaje realnym tekstem w DOM
            (boty czytają; aria-label daje czytnikom pełne zdanie jednym ciągiem). */}
        <WritingHeadline text={POSITIONING.claim} className="text-display mx-auto max-w-[18ch]" />

      {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. Analogia w 1. zdaniu. */}
      <Reveal eager delay={0.1}>
        <p className="text-lead mx-auto mt-6 max-w-measure text-fg-muted">
          Chatbot odpowiada na pytania. AI Agent wykonuje pracę: odbiera telefony, odpisuje klientom,
          umawia spotkania i pilnuje faktur. Nie sprzedajemy narzędzi AI. Projektujemy systemy, które
          zdejmują z polskiej firmy powtarzalną robotę, w dni, nie w miesiące. Twoje dane zostają w Unii
          Europejskiej, zaczynasz od małego kroku, płacisz za efekt.
        </p>
      </Reveal>

      {/* Dynamiczny odbiorca (personalizacja językiem, RODO-safe) */}
      <Reveal eager delay={0.15}>
        <div className="card-aura mx-auto mt-7 max-w-narrow rounded-lg border border-border bg-surface px-5 py-4 text-left shadow-xs">
          <p className="text-caption text-fg-subtle">
            Powtarzalna robota wygląda inaczej w każdej branży. Pokaż mi swoją.
          </p>
          <p className="mt-1 text-body text-fg-muted">
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

      {/* CTA główne + mikrokopia */}
      <Reveal eager delay={0.2}>
        <div className="mt-9 flex flex-col items-center gap-3">
          <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
            {HOME_CTA.label}
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

      {/* Linki drugorzędne — NIE konkurują z CTA */}
      <Reveal eager delay={0.3}>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-caption text-fg-subtle">
          <a href="#problem" className="underline decoration-1 underline-offset-2 hover:text-fg">
            Zobacz, jak liczę oszczędność →
          </a>
          <a href="#demo" className="underline decoration-1 underline-offset-2 hover:text-fg">
            Zobacz, jak rozmawia nasz Agent →
          </a>
        </p>
      </Reveal>
      </Section>
    </VideoBackground>
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
