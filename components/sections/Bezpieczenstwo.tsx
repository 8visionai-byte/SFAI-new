import Image from 'next/image';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

/**
 * SEKCJA — BEZPIECZEŃSTWO I ZGODNOŚĆ (mapa emocji §6). Emocja: spokój + kontrola.
 * Lęk #1 (39-47% klientów) dostaje WŁASNY moment, nie tylko 1 filar paska zaufania.
 *
 * Treść w HTML = cytowalna dla LLM przy "czy AI dla firmy jest bezpieczne / RODO".
 * Konkrety poniżej są realne (dane w UE, umowa powierzenia, log akcji, jawność AI).
 * Bez żadnych certyfikatów — komunikujemy wyłącznie to, co faktycznie robimy.
 */
const PUNKTY = [
  {
    t: 'Dane zostają w Unii Europejskiej',
    d: 'Przetwarzamy je zgodnie z RODO i AI Act. Bez wysyłania ich w nieznane, bez transferu poza UE bez Twojej wiedzy.',
  },
  {
    t: 'Umowa powierzenia danych (DPA)',
    d: 'Podpisujemy umowę powierzenia przetwarzania. Na papierze jest, kto, po co i jak długo przetwarza dane Twoich klientów.',
  },
  {
    t: 'Widzisz każdą akcję Agenta',
    d: 'Logujemy, co Agent zrobił. Masz nadzór i ustawiasz granice, a w każdej chwili możesz go zatrzymać. Żadnej czarnej skrzynki.',
  },
  {
    t: 'Klient zawsze wie, że to AI',
    d: 'Agent nie udaje człowieka. Rozmówca od początku wie, że rozmawia z AI, zgodnie z wymogami AI Act.',
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
      {/* WNĘTRZE ZAMIAST KAFELKA: szklany korytarz biura nocą jest gotowym
          POKOJEM, więc zdjęcie przestaje być wklejką obok tekstu i staje się
          tłem całej sekcji. Warstwa dekoracyjna (aria-hidden przez rodzica
          pointer-events-none + alt niesie SEO obrazków, treść jest w tekście).
          KONTRAST: krycie .34 nad navy-950 + .bg-scrim-dark (.62-.78) + boczny
          gradient .86->.10 daje w pasie tekstu lum ~0,020; --fg-muted (navy-300)
          = 5,2:1 (AA), nagłówek #eaf0fa > 15:1. Warunek: żaden akapit nie sięga
          dalej niż 62% szerokości sekcji (max-w-narrow w kontenerze 1200px =
          63%), bo świecące panele leżą w pasie 60-90% kadru. */}
      {/* INFINITY (bugfix „rozmazane zdjęcia"): źródło ma 1400px szerokości, a
          pełny bleed sekcji na viewportach >1400px wymuszał upscale i rozmycie.
          Warstwa tła jest teraz centrowana i ograniczona do max-w-[1400px];
          od 2xl (1536px) dostaje rogi i cienką obwódkę w języku kart wzorca
          (overflow-hidden dopiero tu — wewnątrz tylko zdjęcie i scrimy, nic nie
          wystaje). sizes odzwierciedla realny sufit renderu. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-full max-w-[1400px] -translate-x-1/2 2xl:overflow-hidden 2xl:rounded-xl 2xl:border 2xl:border-border">
        <Image
          src="/img/bezpieczenstwo-danych-nowoczesna-firma.webp"
          alt="Nowoczesne szklane biuro nocą, kontrola dostępu i bezpieczeństwo danych"
          width={1400}
          height={788}
          sizes="(min-width: 1400px) 1400px, 100vw"
          loading="lazy"
          className="h-full w-full object-cover object-[58%_46%] opacity-[0.34]"
        />
        <div className="bg-scrim-dark absolute inset-0" />
        {/* Mobile: scrim pionowy jest jednolicie ciężki, boczny gradient zbędny. */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(8,12,22,.86)_0%,rgba(8,12,22,.66)_46%,rgba(8,12,22,.10)_78%)] md:block" />
      </div>

      <div className="max-w-narrow">
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

      {/* INFINITY: pary punktów przechodzą z kresek-włosów na karty wzorca
          (.inf-card): solidne tło --surface kotwiczy tekst nad zdjęciem, lewa
          krawędź w akcencie marki. Teksty 1:1. .sf-stagger ZOSTAJE na <Reveal>
          (kontrakt: goły div = dzieci opacity:0 na zawsze). */}
      <Reveal as="ul" className="sf-stagger mt-12 grid max-w-wide gap-6 sm:grid-cols-2 md:mt-16">
        {PUNKTY.map((p) => (
          <li key={p.t} className="inf-card p-6">
            <h3 className="text-ui font-semibold text-fg">{p.t}</h3>
            <p className="mt-2 text-body-sm text-fg-muted">{p.d}</p>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
