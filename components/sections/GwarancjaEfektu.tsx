import type { CSSProperties } from 'react';
import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { InfIcon } from '@/components/ui/InfIcons';
import type { InfIconName } from '@/components/ui/InfIcons';
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
/* INFINITY v7 (spec §PARTIA D pkt 2): trzy filary przestają być listą na
   kreskach i wchodzą na KARTY .inf-card z kafelkiem ikony, każda w innym
   odcieniu (fluorescencyjna paleta v4). Teksty t/d 1:1 co do znaku. */
const FILARY = [
  {
    t: 'Najpierw diagnoza, potem decyzja',
    d: 'Bezpłatna diagnoza i wstępna wycena, zanim wydasz złotówkę. Jak wyjdzie, że się nie opłaca, powiem to wprost.',
    ikona: 'lupa-wykres',
    c: '#61edff',
  },
  {
    t: 'Mały, odwracalny krok',
    d: 'Zaczynamy od jednego procesu, nie od wielkiej umowy. Testujesz na żywo, Ty ustawiasz granice, w każdej chwili możesz Agenta zatrzymać.',
    ikona: 'puzzle',
    c: '#a586ff',
  },
  {
    t: 'Rozliczenie za efekt',
    d: 'Umawiamy się na konkretny wynik. Dokładne warunki, co dzieje się, gdy Agent go nie dowozi, ustalamy na diagnozie i zapisujemy w umowie.',
    ikona: 'wykres-strzalka',
    c: '#ffc120',
  },
] as const satisfies ReadonlyArray<{ t: string; d: string; ikona: InfIconName; c: string }>;

export function GwarancjaEfektu() {
  return (
    <Section tone="base" space="md">
      {/* INFINITY v3 (decyzja Pawła: zdjęcia WYLATUJĄ): płyta z cyrklem usunięta
          z renderu (webp zostaje w /public). Nagłówek + kapsuła answer-first
          jadą na karcie wzorca (.inf-card) pełnej szerokości kontenera — spec
          §ZDJĘCIA: „karta z treścią". Teksty H2 i kapsuły co do znaku bez
          zmian; kontrast robią tokeny semantyczne na --surface. Karta
          NIEklikalna — bez błysku/strzałki (konwencja ProduktCard). */}
      {/* v7 (spec §PARTIA D pkt 3): karta nagłówka dostaje własny odcień
          (--card-c) i kafelek ikony — hover przestaje być bezbarwny.
          v7 audyt: karta-bohater bierze modyfikator .inf-card-lg (mocniejszy
          hover wzorca: -5px + scale, obwódka 65%) — kontrakt z globals. */}
      <Reveal>
        {/* v11 spec A: szeroka karta-obietnica = WARIANT W3 wzorca
            (.lp-promo-card: błysk + ramka z każdej strony na hover; mapa w
            raporty/taksonomia-ramek-v11.md §A; klasa .inf-card-full-hover =
            kontrakt partii A). Modyfikator -lg schodzi: zasada łączenia A
            mówi „-full-hover z -lg NIE (inna gramatyka hoveru)". Trzy filary
            niżej zostają na bazowej .inf-card (detale obietnicy nie konkurują
            z bohaterem). */}
        <div
          className="inf-card inf-card-full-hover inf-card-static mx-auto max-w-wide p-6 md:p-10"
          style={{ '--card-c': '#29ff77' } as CSSProperties}
        >
          {/* Reflektor za kursorem: pozycję (--mx/--my) ustawia JEDEN delegowany
              pointermove z MotionOrchestrator (desktop). Dekoracja aria-hidden. */}
          <div aria-hidden="true" className="inf-spotlight" />
          <span
            aria-hidden="true"
            className="inf-tile mb-4"
            style={{ '--tile-c': '#29ff77' } as CSSProperties}
          >
            <InfIcon name="tarcza-serce" />
          </span>
          {/* v10 §3: jedno kluczowe słowo w gradiencie (jak „Answered" wzorca). Treść 1:1. */}
          <h2 className="text-h2 text-fg">Co jeśli nie zadziała? Kto bierze na siebie <span className="inf-grad-text" data-text="ryzyko?">ryzyko?</span></h2>
          {/* v11 spec D: kreska wzorca pod H2 (.inf-h2-line, kontrakt partii A);
              nagłówek przy lewej, więc !mx-0 gasi centrowanie klasy. */}
          <div aria-hidden="true" className="inf-h2-line !mx-0" />
          {/* Kapsuła answer-first — cytowalna dla LLM przy "co jak AI nie zadziała" */}
          <p className="text-lead mt-5 max-w-measure-lead text-fg-muted">
            Ryzyko bierzemy na siebie tam, gdzie to my decydujemy o efekcie. Zaczynasz od bezpłatnej diagnozy
            i małego kroku, płacisz dopiero za działające rozwiązanie, a rozliczamy się za wynik, nie za
            obietnice. Dokładne warunki gwarancji ustalamy na diagnozie i zapisujemy w umowie.
          </p>
        </div>
      </Reveal>

      {/* v7: filary wracają na KARTY wzorca (kafelek ikony + odcień), zamiast
          listy na kreskach — „szczegóły rozbić na kafelki". Kaskadę niesie
          .sf-stagger na <Reveal>. */}
      {/* v10 §6: gap kart 32 -> 20px klasą-kontraktem partii A .inf-grid-gap
          (pomiar wzorca §3: .lp-primary-grid--three 20px). */}
      <Reveal as="ul" className="sf-stagger inf-grid-gap mx-auto mt-12 grid max-w-wide md:mt-16 md:grid-cols-3">
        {FILARY.map((f) => (
          <li key={f.t} className="inf-card inf-card-static p-6" style={{ '--card-c': f.c } as CSSProperties}>
            <div aria-hidden="true" className="inf-spotlight" />
            {/* v8 zdjelo ikone filarow; v14 JA PRZYWRACA: spec v14 par.1
                ("kafelek w kafelku" na kazdej karcie adekwatnie do typu)
                i pomiary-v14.md par.1b - filar to rodzina primary/W2, a plytke
                ma 19/24 kart primary wzorca. Glif = istniejace pole `ikona`
                rejestru FILARY (dekoracja aria-hidden). Karta NIEklikalna ->
                .inf-card-static (cisza par.2), bez strzalki. */}
            <span
              aria-hidden="true"
              className="inf-tile mb-4"
              style={{ '--tile-c': f.c } as CSSProperties}
            >
              <InfIcon name={f.ikona} />
            </span>
            <h3 className="text-h3">{f.t}</h3>
            <p className="mt-2 text-body-sm text-fg-muted">{f.d}</p>
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
