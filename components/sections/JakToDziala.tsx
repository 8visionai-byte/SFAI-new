import { Section, Button, SectionImage } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';

/**
 * SEKCJA 6 — JAK TO DZIAŁA (3 kroki) (spec 03 §6). Emocja: spokój + kontrola.
 * Pierwszy krok mały i odwracalny. Kapsuła answer-first + 3 numerowane kroki.
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

export function JakToDziala() {
  return (
    <Section tone="subtle" space="md">
      <div className="mx-auto max-w-narrow">
        <Reveal variant="header">
          <h2 className="text-h2">Jak wygląda wdrożenie AI Agenta krok po kroku?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Wdrożenie ma trzy kroki. Najpierw bezpłatna diagnoza, na której pokazujemy, co u Ciebie da się
            zautomatyzować i ile to oszczędza. Potem stawiamy pierwszego Agenta na jednym, konkretnym procesie.
            Na końcu pilnujemy, żeby działał, i rozwijamy go o kolejne zadania. Pierwszy krok nic nie kosztuje
            i do niczego nie zobowiązuje.
          </p>
        </Reveal>
      </div>

      {/* RIBBON: zdjęcie przestaje być prostokątem 16:9 nad siatką i staje się
          WSTĘGĄ PROCESU przyklejoną do góry kroków — ciemna wstęga i jasny korpus
          czytają się jak jedna maszynowo obrobiona bryła (obudowa + rdzeń).
          KADR: 4:1 z 16:9 pokazuje 44,4% wysokości; focus y 36% -> okno 0,20-0,64,
          czyli wszystkie cztery okręgi procesu i głowa mężczyzny.
          DUOTONE (`brand`): to jedyny bursztynowo-pomarańczowy plik w zestawie,
          czyli jedyny, który łamie paletę marki. mix-blend-mode:color bierze
          barwę z gradientu, a jasność zostawia ze zdjęcia — bursztyn schodzi w
          niebiesko-fiolet, twarz nie robi się sina. */}
      <Reveal delay={0.08} className="mx-auto mt-12 max-w-container md:mt-16">
        <SectionImage
          src="/img/automatyzacja-procesow-krok-po-kroku.webp"
          alt="Etapy automatyzacji procesu w firmie połączone świetlistą linią danych"
          ratio="wide"
          ratioMd="ribbon"
          focus="50% 36%"
          brand
          sizes="(min-width: 1240px) 1200px, 100vw"
          className="md:rounded-b-none"
        />
      </Reveal>

      <Reveal
        as="ol"
        className="sf-stagger mx-auto mt-6 grid max-w-container gap-6 md:mt-0 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border md:overflow-hidden md:rounded-b-xl md:border md:border-t-0 md:border-hairline md:bg-surface"
      >
        {KROKI.map((k) => (
          <li key={k.n} className="md:p-8">
            {/* Numer kroku JEST grafiką sekcji: 52px cyfra w --border-strong.
                Kółko bg-accent-soft pod cyfrą to najbardziej rozpoznawalna
                pigułka landing page'a z szablonu — wypadło. */}
            <span className="block font-display text-[3.25rem] font-bold leading-none text-border-strong">
              {k.n}
            </span>
            <h3 className="text-h3 mt-4">{k.t}</h3>
            <p className="mt-2 text-body-sm text-fg-muted">{k.d}</p>
          </li>
        ))}
      </Reveal>

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
