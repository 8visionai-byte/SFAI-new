import { Section, Button } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';

/**
 * SEKCJA 6 — JAK TO DZIAŁA (3 kroki) (spec 03 §6). Emocja: spokój + kontrola.
 * Pierwszy krok mały i odwracalny. Kapsuła answer-first + 3 numerowane kroki.
 *
 * ŚWIAT B (makieta 3-proces): nagłówek centralnie, kroki siedzą na POZIOMEJ
 * świetlistej trasie (.sf-route, fundament partii A) z węzłami-kompasami
 * (numer w pierścieniu, dekoracja SVG aria-hidden), pod węzłem etykieta i
 * szklana karta opisu (.sf-glass). Trasę kończy grot cyrkla (dekoracja).
 * Wstęga-zdjęcie WYPADŁA z renderu (makieta jej nie ma — plik obrazka zostaje
 * w /public na wypadek powrotu). Teksty kroków 1:1.
 */
const KROKI = [
  {
    n: '1',
    t: 'Diagnoza (bezpłatna)',
    d: 'Rozmawiamy 30 minut. Ty pokazujesz, gdzie ucieka czas, ja mówię wprost, co da się zautomatyzować, ile to oszczędza i czego się nie opłaca ruszać. Wychodzisz z konkretną listą, nawet jeśli nic u nas nie zamówisz.',
  },
  {
    n: '2',
    t: 'Pierwszy Agent (mały projekt)',
    d: 'Wybieramy jeden proces, który boli najbardziej. Stawiamy Agenta w dni, nie w miesiące. Testujemy na żywo, Ty ustawiasz granice i zasady. Twoje dane przez cały czas zostają w UE.',
  },
  {
    n: '3',
    t: 'Opieka i rozwój',
    d: 'Agent działa, my pilnujemy, żeby działał dobrze. Patrzymy na wyniki, poprawiamy, dokładamy kolejne zadania, kiedy poczujesz, że to się spina. Płacisz za efekt, nie za obietnice.',
  },
] as const;

/* Tonacja węzłów = trzy stopnie gradientu marki „krok po kroku" (jak w makiecie:
   niebieski -> fiolet -> zielony). Tokeny metal-* są theme-aware i zdają AA
   jako tekst na ciemnym tle (globals.css). */
const NODE_TONE = ['text-metal-blue', 'text-metal-violet', 'text-metal-green'] as const;

export function JakToDziala() {
  return (
    /* id = hak choreografii PIN (MotionOrchestrator, desktop ≥1024px po load):
       sekcja przypinana na 140% scrolla, kroki li wchodzą kolejno. Struktura
       ol.sf-stagger > li NIETYKALNA (selektor orkiestratora); zmienił się tylko
       wygląd wnętrza li. Bez GSAP wszystko działa jak dotąd (CSS). */
    <Section tone="subtle" space="md" id="jak-to-dziala-pin" className="overflow-x-clip">
      {/* Nagłówek CENTRALNIE (makieta 3) — teksty i hierarchia bez zmian. */}
      <div className="mx-auto max-w-narrow text-center">
        <Reveal variant="header">
          <h2 className="text-h2">Jak wygląda wdrożenie AI Agenta krok po kroku?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mx-auto mt-5 max-w-measure-lead text-fg-muted">
            Wdrożenie ma trzy kroki. Najpierw bezpłatna diagnoza, na której pokazujemy, co u Ciebie da się
            zautomatyzować i ile to oszczędza. Potem stawiamy pierwszego Agenta na jednym, konkretnym procesie.
            Na końcu pilnujemy, żeby działał, i rozwijamy go o kolejne zadania. Pierwszy krok nic nie kosztuje
            i do niczego nie zobowiązuje.
          </p>
        </Reveal>
      </div>

      {/* TRASA + KROKI. Trasa to dekoracja pełnej szerokości viewportu w osi
          węzłów (desktop; na mobile kroki stoją w pionie i trasa znika).
          Węzeł ma h-14 (56px), więc oś = top-7. Grot cyrkla kończy trasę przy
          prawej krawędzi kontenera. Wszystko aria-hidden — treść niosą li. */}
      <div className="relative mx-auto mt-14 max-w-container md:mt-20">
        <div aria-hidden="true" className="absolute inset-x-0 top-7 hidden md:block">
          <div className="sf-route absolute left-1/2 top-0 h-px w-screen -translate-x-1/2" />
          {/* Grot cyrkla: igła kończąca kreśloną trasę (język marki). */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 text-metal-green"
          >
            <path d="M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 12l-8-4.5v9L22 12Z" fill="currentColor" />
          </svg>
        </div>

        <Reveal
          as="ol"
          className="sf-stagger relative grid gap-12 md:grid-cols-3 md:gap-8"
        >
          {KROKI.map((k, i) => (
            <li key={k.n} className="text-center">
              {/* Węzeł-kompas: realny numer kroku w dekoracyjnym pierścieniu.
                  Tło węzła = tło sekcji (bg-bg-subtle), żeby trasa nie
                  przecinała wnętrza pierścienia. */}
              <span
                className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bg-subtle ${NODE_TONE[i] ?? 'text-accent'}`}
              >
                <CompassRing />
                <span className="relative font-display text-[1.375rem] font-bold leading-none text-fg">
                  {k.n}
                </span>
              </span>

              <h3 className="text-h3 mt-5">{k.t}</h3>

              {/* Szklana karta opisu (fundament .sf-glass, partia A). */}
              <div className="sf-glass mt-4 rounded-lg p-6 text-left">
                <p className="text-body-sm text-fg-muted">{k.d}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-10 max-w-narrow text-body-sm text-fg-muted">
          Cały czas widzisz, co Agent robi, i w każdej chwili możesz go zatrzymać. To Ty jesteś szefem, on tylko
          zdejmuje robotę.
        </p>
      </Reveal>

      {/*
        DOWÓD przy CTA (north star #5 — przy KAŻDYM CTA). Tu uczciwy, weryfikowalny
        sygnał oferty zamiast zmyślonej liczby: pierwszy krok jest bezpłatny i odwracalny.
        INPUT PAWŁA: gdy będzie realna metryka operacyjna (np. liczba diagnoz/mc),
        wstawić ją tu zamiast samej mikrokopii.
      */}
      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-col items-start gap-2">
          <Button variant="primary" href={HOME_CTA.href}>
            Umów bezpłatną diagnozę
          </Button>
          <span className="text-caption text-fg-subtle">
            Pierwszy krok jest bezpłatny i odwracalny. Bez zobowiązań, bez umów, bez ryzyka.
          </span>
        </div>
      </Reveal>
    </Section>
  );
}

/** Pierścień-kompas węzła (czysta dekoracja): podwójny okrąg + groty N/E/S/W
    w currentColor (tonację nadaje rodzic — trzy stopnie gradientu marki). */
function CompassRing() {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <circle cx="28" cy="28" r="17" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
      <circle cx="28" cy="28" r="22.5" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <path d="M28 1.5l3.5 7h-7l3.5-7Z" fill="currentColor" />
      <path d="M28 54.5l3.5-7h-7l3.5 7Z" fill="currentColor" opacity="0.7" />
      <path d="M1.5 28l7-3.5v7l-7-3.5Z" fill="currentColor" opacity="0.7" />
      <path d="M54.5 28l-7-3.5v7l7-3.5Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
