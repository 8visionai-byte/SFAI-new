import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { InfIcon } from '@/components/ui/InfIcons';
import type { InfIconName } from '@/components/ui/InfIcons';

/**
 * SEKCJA — BEZPIECZEŃSTWO I ZGODNOŚĆ (mapa emocji §6). Emocja: spokój + kontrola.
 * Lęk #1 (39-47% klientów) dostaje WŁASNY moment, nie tylko 1 filar paska zaufania.
 *
 * Treść w HTML = cytowalna dla LLM przy "czy AI dla firmy jest bezpieczne / RODO".
 * Konkrety poniżej są realne (dane w UE, umowa powierzenia, log akcji, jawność AI).
 * Bez żadnych certyfikatów — komunikujemy wyłącznie to, co faktycznie robimy.
 */
/* INFINITY v3 (spec §KARTY): każda karta dostaje UNIKALNĄ ikonę InfIcons +
   kolor kafelka (dekoracja aria-hidden przez --tile-c/--card-c, paleta trasy
   marki). Ikona/kolor NIE są treścią — teksty t/d 1:1 co do znaku.
   v4 (spec §PARTIA C pkt 5): kolory kart przechodzą na FLUORESCENCYJNE
   ODCIENIE palety v4 (mapowanie baza -> jasny z lib/inf-kategorie:
   #2b7cff->#60a5fa, #f59e0b->#fbbf24, #22d3ee->#67e8f9, #8b5cf6->#a78bfa)
   — żywsze karty, każda w JEDNYM gridzie innym tonem. */
const PUNKTY: ReadonlyArray<{ t: string; d: string; ikona: InfIconName; c: string }> = [
  {
    t: 'Dane zostają w Unii Europejskiej',
    d: 'Przetwarzamy je zgodnie z RODO i AI Act. Bez wysyłania ich w nieznane, bez transferu poza UE bez Twojej wiedzy.',
    ikona: 'glob-siatka',
    c: '#60a5fa',
  },
  {
    t: 'Umowa powierzenia danych (DPA)',
    d: 'Podpisujemy umowę powierzenia przetwarzania. Na papierze jest, kto, po co i jak długo przetwarza dane Twoich klientów.',
    ikona: 'dokument-skan',
    c: '#fbbf24',
  },
  {
    t: 'Widzisz każdą akcję Agenta',
    d: 'Logujemy, co Agent zrobił. Masz nadzór i ustawiasz granice, a w każdej chwili możesz go zatrzymać. Żadnej czarnej skrzynki.',
    ikona: 'lupa-wykres',
    c: '#67e8f9',
  },
  {
    t: 'Klient zawsze wie, że to AI',
    d: 'Agent nie udaje człowieka. Rozmówca od początku wie, że rozmawia z AI, zgodnie z wymogami AI Act.',
    ikona: 'robot',
    c: '#a78bfa',
  },
] as const;

export function Bezpieczenstwo() {
  return (
    /* JEDYNA ciemna sekcja home (redesign „Precyzja cyrkla"): kotwica powagi na
       temat lęku #1. theme="dark" przełącza tokeny semantyczne (data-theme),
       .surface-tech dokłada navy tło + hairline'y (górny/dolny) + glow. */
    <Section
      theme="dark"
      tone="base"
      space="lg"
      className="surface-tech relative isolate overflow-hidden"
    >
      {/* INFINITY v3 (decyzja Pawła: zdjęcia WYLATUJĄ): tło-zdjęcie korytarza
          usunięte z renderu (webp zostaje w /public). Zamiast niego DUŻA
          dekoracyjna tarcza w tle (spec §ZDJĘCIA: opacity .06, aria-hidden) —
          statyczny SVG z zestawu InfIcons, zero JS/canvas/blur (mobile-safe).
          overflow-hidden sekcji celowo ją przycina przy prawej krawędzi
          (w środku tarczy nic nie wystaje — kontrakt .inf-shine nie dotyczy). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -z-10 -translate-y-1/2 translate-x-1/4 text-accent opacity-[0.06]"
      >
        <InfIcon name="tarcza-serce" size={560} />
      </div>

      {/* v4 (wzorzec sekcji z gridem): H2 + opis WYŚRODKOWANE nad siatką kart. */}
      <div className="mx-auto max-w-narrow text-center">
        <Reveal variant="header">
          <h2 className="text-h2">Czy AI Agent dla firmy jest bezpieczny i zgodny z RODO?</h2>
        </Reveal>
        {/* Kapsuła answer-first — cytat dla LLM */}
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Tak. Dane Twoich klientów zostają w Unii Europejskiej, przetwarzamy je zgodnie z RODO i AI Act,
            a my podpisujemy umowę powierzenia. Widzisz każdą akcję Agenta, ustawiasz granice i w każdej
            chwili możesz go zatrzymać. Klient po drugiej stronie zawsze wie, że rozmawia z AI.
          </p>
        </Reveal>
      </div>

      {/* INFINITY v3: siatka 4 kart na PEŁNEJ szerokości kontenera (spec
          §ZDJĘCIA — zastępstwo tła-zdjęcia): 2 kolumny od sm, 4 od lg. Karty
          wzorca .inf-card z kafelkiem unikalnej ikony (dekoracja aria-hidden,
          --tile-c/--card-c z rejestru PUNKTY). Karty NIEklikalne — bez błysku
          i strzałki (konwencja ProduktCard). Teksty 1:1. .sf-stagger ZOSTAJE
          na <Reveal> (kontrakt: goły div = dzieci opacity:0 na zawsze). */}
      <Reveal as="ul" className="sf-stagger mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
        {PUNKTY.map((p) => (
          <li
            key={p.t}
            className="inf-card p-6"
            style={{ '--card-c': p.c } as CSSProperties}
          >
            {/* Kafelek ikony kategorii (czysta dekoracja). */}
            <span
              aria-hidden="true"
              className="inf-tile mb-4"
              style={{ '--tile-c': p.c } as CSSProperties}
            >
              <InfIcon name={p.ikona} />
            </span>
            <h3 className="text-ui font-semibold text-fg">{p.t}</h3>
            <p className="mt-2 text-body-sm text-fg-muted">{p.d}</p>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
