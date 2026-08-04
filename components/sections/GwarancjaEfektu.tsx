import { Section, MagneticButton, SectionImage } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';

/**
 * SEKCJA — GWARANCJA EFEKTU (risk reversal jako OSOBNY blok). Emocja: odwaga,
 * ryzyko zdjęte (mapa emocji §8). Najtańsza dźwignia na obiekcję "sparzonego klienta".
 *
 * UWAGA: dokładny model gwarancji/success-fee to DECYZJA PAWŁA (był [PLACEHOLDER]
 * w PasekZaufania i FAQ). Ten blok mówi uczciwie o mechanice, którą już stosujemy
 * (diagnoza przed płatnością, mały krok, rozliczenie za efekt) i NIE podaje
 * zmyślonych procentów/kwot zwrotu.
 *
 * INPUT PAWŁA: gdy zapadnie decyzja o modelu (np. konkretny success-fee albo zwrot
 * X% przy niespełnieniu celu), wpisać go w trzeci filar zamiast ogólnej obietnicy.
 */
const FILARY = [
  {
    t: 'Najpierw diagnoza, potem decyzja',
    d: 'Bezpłatna diagnoza i wstępna wycena, zanim wydasz złotówkę. Jak wyjdzie, że się nie opłaca, powiem to wprost.',
  },
  {
    t: 'Mały, odwracalny krok',
    d: 'Zaczynamy od jednego procesu, nie od wielkiej umowy. Testujesz na żywo, Ty ustawiasz granice, w każdej chwili możesz Agenta zatrzymać.',
  },
  {
    t: 'Rozliczenie za efekt',
    d: 'Umawiamy się na konkretny wynik. Dokładne warunki, co dzieje się, gdy Agent go nie dowozi, ustalamy na diagnozie i zapisujemy w umowie.',
  },
] as const;

export function GwarancjaEfektu() {
  return (
    <Section tone="base" space="md">
      {/* CANVAS: to JEDYNE zdjęcie brandowe w zestawie (metalowy cyrkiel z
          pierścieniami w kolorach marki). Pierścienie zaczynają się na x~0,62,
          a lewe 55-60% kadru to zaprojektowana, gładka czerń — ta pustka istnieje
          po to, żeby leżał na niej tekst. Płyta z `children` sama ustawia
          data-theme="dark", więc kontrast robią TOKENY SEMANTYCZNE, bez ani
          jednego ręcznie dobranego HEX-a (H2 15:1, kapsuła 6,6:1 — AA).
          Rola `auto` = wysokość niesie treść, nie sztywna proporcja, więc tekst
          nigdy nie zostanie ucięty, a płyta i tak rezerwuje miejsce (CLS 0).
          Teksty H2 i kapsuły co do znaku bez zmian. */}
      <Reveal>
        <SectionImage
          src="/img/precyzja-cyrkla-marka-simplefast.webp"
          alt="Metalowy cyrkiel kreślarski na ciemnym tle z pierścieniami w kolorach marki SimpleFast"
          ratio="auto"
          ratioMd="auto"
          focus="50% 52%"
          sizes="100vw"
          className="mx-auto max-w-container"
        >
          {/* Kolumna tekstu max 52% szerokości płyty na desktopie — dalej
              zaczynają się pierścienie. */}
          <div className="w-full px-6 py-12 sm:px-10 md:w-[52%] md:py-20 md:pl-14 md:pr-8">
            <h2 className="text-h2 text-fg">Co jeśli nie zadziała? Kto bierze na siebie ryzyko?</h2>
            {/* Kapsuła answer-first — cytowalna dla LLM przy "co jak AI nie zadziała" */}
            <p className="text-lead mt-5 text-fg-muted">
              Ryzyko bierzemy na siebie tam, gdzie to my decydujemy o efekcie. Zaczynasz od bezpłatnej diagnozy
              i małego kroku, płacisz dopiero za działające rozwiązanie, a rozliczamy się za wynik, nie za
              obietnice. Dokładne warunki gwarancji ustalamy na diagnozie i zapisujemy w umowie.
            </p>
          </div>
        </SectionImage>
      </Reveal>

      {/* Trzy karty w równym rzędzie -> lista na kreskach: tytuł i opis stoją
          obok siebie, więc filary czytają się jak karta katalogowa. */}
      <Reveal
        as="ul"
        className="sf-stagger mx-auto mt-12 max-w-wide divide-y divide-border border-y border-border md:mt-16"
      >
        {FILARY.map((f) => (
          <li
            key={f.t}
            className="grid gap-2 py-7 md:grid-cols-[minmax(0,24ch)_minmax(0,1fr)] md:gap-10"
          >
            <h3 className="text-h3">{f.t}</h3>
            <p className="text-body-sm text-fg-muted">{f.d}</p>
          </li>
        ))}
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 flex max-w-narrow flex-col items-start gap-2">
          <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
            {HOME_CTA.label}
          </MagneticButton>
          <span className="text-caption text-fg-subtle">Bez zobowiązań. Najpierw sprawdzamy, czy w ogóle warto.</span>
        </div>
      </Reveal>
    </Section>
  );
}
