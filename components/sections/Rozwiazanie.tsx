import type { CSSProperties } from 'react';
import Link from 'next/link';
/* Button zszedł z importu razem z CTA sekcji (v8 §3): przycisk mówi teraz
   językiem pigułek .inf-glow-cta, a nie wariantem `secondary` z neutralną
   obwódką --border-control. Żaden inny element tej sekcji go nie używa. */
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
/* v8: <InfIcon> już tu nie renderujemy (karty „co potrafi Agent" są tekstowe,
   więc wzorzec nie daje im ikony) — zostaje sam TYP do rejestru POTRAFI. */
import type { InfIconName } from '@/components/ui/InfIcons';
import { AgentDemo } from './AgentDemo';

/** Styl frazowego linku w treści — sygnał SEO/AEO do podstron usług. */
const LINK =
  'font-medium text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover';

/**
 * SEKCJA 4 — ROZWIĄZANIE: Agent działa, nie gada (spec 03 §4).
 * Sekcja pozycjonująca kategorię. Dark mode strefowo (powaga + kontrast, §7 DS).
 * Tabela porównawcza w surowym HTML (No-Comparisons obniża cytowalność -> tabela obowiązkowa).
 */
const POROWNANIE = [
  ['Co robi', 'Odpowiada na pytania', 'Wykonuje zadania od początku do końca'],
  ['Telefon', 'Nie odbiera', 'Odbiera, rozmawia, umawia i zapisuje termin'],
  ['Dane', 'Często wysyła w świat', 'Zostają w UE, pod Twoją kontrolą'],
  ['Integracje', 'Zwykle żadne', 'Łączy się z kalendarzem, CRM, fakturami'],
  ['Nadzór', '„Czarna skrzynka”', 'Widzisz każdą akcję, ustawiasz granice'],
  ['Efekt', 'Mniej maili', 'Mniej roboty i więcej obsłużonych klientów'],
] as const;

/* INFINITY v7 (spec §PARTIA D pkt 2): „co potrafi Agent" przestaje być listą na
   kreskach i wchodzi na KARTY .inf-card z kafelkiem ikony. Teksty t/d 1:1 co do
   znaku — dochodzi wyłącznie dekoracja: glif InfIcons + odcień kategorii usługi
   (voiceboty violet, chatboty cyan, automatyzacje green, dokumenty amber
   z lib/inf-kategorie), każda karta w siatce innym tonem. */
const POTRAFI = [
  {
    t: 'Odbiera telefon, kiedy Ty nie możesz.',
    d: 'Voicebot rozmawia po polsku, umawia wizyty i przekazuje Ci tylko to, co ważne.',
    ikona: 'sluchawka-fala',
    c: '#a78bfa',
  },
  {
    t: 'Odpisuje klientom w minuty, o każdej porze.',
    d: 'Chatbot na stronie i w komunikatorach odpowiada na pytania i zbiera leady, nawet o 22:00.',
    ikona: 'chat-dymek',
    c: '#67e8f9',
  },
  {
    t: 'Przepisuje dane za Ciebie.',
    d: 'Automatyzacja przenosi informacje między mailem, systemem i fakturą, bez ręcznej roboty.',
    ikona: 'blyskawica',
    c: '#4ade80',
  },
  {
    t: 'Pilnuje, żeby nic nie wypadło.',
    d: 'Przypomnienia, follow-upy, oddzwonienia. Klient nie zostaje bez odpowiedzi.',
    ikona: 'kalendarz-check',
    c: '#fbbf24',
  },
] as const satisfies ReadonlyArray<{ t: string; d: string; ikona: InfIconName; c: string }>;

export function Rozwiazanie() {
  return (
    /*
      Sekcja pozycjonująca, otwiera AKT II. Rysowana kreska rozdziału (seam) zamiast
      pasa tła — .surface-aurora zeszła stąd do FinalneCTA (budżet gradientu marki:
      4 miejsca, ostatnie należy do jedynego celu konwersji). H2 granatowe
      (jeden system nagłówków redesignu). Kontrast treści bez zmian.
    */
    <Section tone="base" space="lg" seam>
      {/* INFINITY v5 (spec §3 PARTIA C): oba cytowalne bloki AEO — definicja
          „Co to jest AI Agent dla firmy?" i różnica „Czym różni się AI Agent
          od zwykłego chatbota?" — jako DWIE karty .inf-card OBOK SIEBIE
          (md:grid-cols-2). Teksty i H2 co do znaku 1:1 z v4 (answer-first dla
          LLM bez zmian; zmienia się tylko opakowanie wizualne). Overline mono
          = dekoracyjna numeracja wzorca „// 01/02" (aria-hidden, zero słów —
          zero nowych stringów treści). Kolory kart z rejestru INF_KATEGORIA:
          definicja w cyjanie chatbotów, różnica w violecie voicebotów (dwie
          karty w jednym gridzie = dwa odcienie, konwencja v4). Kaskadę wejścia
          niesie .sf-stagger na Reveal (kontrakt: goły div = dzieci opacity:0). */}
      <Reveal className="sf-stagger mx-auto grid max-w-wide gap-6 md:grid-cols-2">
        {(
          [
            {
              nr: '// 01',
              kat: INF_KATEGORIA['chatboty'] ?? INF_KATEGORIA_DEFAULT,
              h2: 'Co to jest AI Agent dla firmy?',
            },
            {
              nr: '// 02',
              kat: INF_KATEGORIA['voiceboty'] ?? INF_KATEGORIA_DEFAULT,
              h2: 'Czym różni się AI Agent od zwykłego chatbota?',
            },
          ] as const
        ).map((karta, i) => (
          <article
            key={karta.nr}
            className="inf-card flex h-full flex-col p-6 md:p-8"
            style={
              {
                '--card-c': karta.kat.c,
                '--card-c-l': karta.kat.odcien ?? karta.kat.c,
              } as CSSProperties
            }
          >
            {/* Reflektor za kursorem: pozycję (--mx/--my) ustawia JEDEN
                delegowany pointermove z MotionOrchestrator (desktop).
                Dekoracja aria-hidden. */}
            <div aria-hidden="true" className="inf-spotlight" />
            {/* Overline mono wzorca — numeracja dekoracyjna w odcieniu karty. */}
            <span aria-hidden="true" className="inf-overline" style={{ color: 'var(--card-c-l)' }}>
              {karta.nr}
            </span>
            {/* H2 zostaje H2 (kotwice AEO/SEO); w połówce grida rozmiar text-h3. */}
            <h2 className="text-h3 mt-4">{karta.h2}</h2>
            {i === 0 ? (
              <>
                <p className="mt-3 text-body text-fg-muted">
                  AI Agent dla firmy to system, który samodzielnie wykonuje powtarzalne zadania:
                  odbiera telefony, odpowiada klientom, umawia wizyty i przenosi dane między systemami.
                  Działa według Twoich zasad, ma dostęp do kalendarza, CRM i narzędzi, z których już
                  korzystasz. W odróżnieniu od chatbota nie tylko odpowiada na pytania, ale wykonuje
                  konkretne czynności od początku do końca.
                </p>
                <p className="mt-3 text-body-sm text-fg-muted">
                  W SimpleFast.ai budujemy takich Agentów dla polskich małych i średnich firm.
                  Pracujemy zdalnie dla firm z całej Polski, od jednoosobowych działalności z mniejszych
                  miast po zespoły z Warszawy, Krakowa czy Wrocławia. Najczęściej są to{' '}
                  <Link href="/uslugi/chatboty" className={LINK}>chatboty AI dla firmy</Link>,{' '}
                  <Link href="/uslugi/voiceboty" className={LINK}>voiceboty odbierające telefony po polsku</Link>{' '}
                  oraz <Link href="/uslugi/automatyzacje" className={LINK}>automatyzacja procesów w firmie</Link>.
                  Dane zostają w UE, zgodnie z RODO, a płacisz za efekt.
                </p>
              </>
            ) : (
              <p className="mt-3 text-body text-fg-muted">
                Chatbot odpowiada na pytania. AI Agent wykonuje zadania. Chatbot powie klientowi, jakie masz
                godziny otwarcia. Agent sprawdzi Twój kalendarz, zaproponuje wolny termin, zapisze wizytę i wyśle
                potwierdzenie. Robi to pod Twoją kontrolą i według Twoich zasad, a Ty w każdej chwili widzisz, co
                zrobił. To różnica między systemem, który gada, a pracownikiem, który działa.
              </p>
            )}
          </article>
        ))}
      </Reveal>

      {/* Interaktywne demo „pokaż, nie mów": chatbot vs Agent — NAD cytowalną tabelą.
          Tabela ZOSTAJE (obowiązkowa dla cytowalności LLM); demo to wizualna ilustracja. */}
      <Reveal delay={0.08}>
        <AgentDemo />
      </Reveal>

      {/* Tabela porównawcza (HTML) — karta katalogowa, nie arkusz zaznaczony
          zakreślaczem: wygraną kolumnę trzyma 1px kreska akcentowa i font-medium,
          nie plama bg-accent-soft. Treść komórek 1:1.
          INFINITY (bugfix „rozjechana tabela"): mobile jedzie w overflow-x-auto
          na min-w-[36rem]; desktop (md+) przechodzi na table-fixed z twardymi
          szerokościami kolumn 18/38/44% (colgroup), więc nagłówki nie nachodzą
          na siebie w paśmie 768-1280px. Nagłówki kolumn w mono .inf-overline
          (utility koloru bije warstwę components — akcent zostaje akcentem). */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-wide overflow-x-auto md:mt-16">
          <table className="w-full min-w-[36rem] border-collapse text-left text-body-sm md:table-fixed">
            <colgroup>
              <col className="md:w-[18%]" />
              <col className="md:w-[38%]" />
              <col className="md:w-[44%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border-strong">
                <th scope="col" className="py-3 pr-4"> </th>
                <th scope="col" className="inf-overline px-4 py-3 align-bottom">Zwykły chatbot</th>
                <th scope="col" className="inf-overline border-l border-border-accent px-4 py-3 align-bottom text-accent">AI Agent od SimpleFast.ai</th>
              </tr>
            </thead>
            <tbody>
              {/* v7 (kontrakt partii E, „tabele bez rozjazdu"): align-top wraca
                  z <tr> na KOMÓRKI — na wierszu działało tylko dzięki
                  dziedziczeniu z UA stylesheet i przy komórkach o różnej
                  wysokości potrafiło się rozjechać. */}
              {POROWNANIE.map(([label, chatbot, agent]) => (
                <tr key={label} className="border-b border-border transition-colors duration-fast hover:bg-bg-subtle">
                  <th scope="row" className="py-4 pr-4 align-top font-semibold text-fg">{label}</th>
                  <td className="px-4 py-4 align-top text-fg-subtle">{chatbot}</td>
                  <td className="border-l border-border-accent px-4 py-4 align-top font-medium text-fg">{agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Co potrafi Agent — v7: KARTY wzorca zamiast listy na kreskach (spec
          §PARTIA D pkt 2: „szczegóły rozbić na kafelki"). Kaskadę robi
          .sf-stagger; karty NIEklikalne, więc bez strzałki (konwencja
          ProduktCard). Treść 1:1. */}
      <Reveal as="ul" className="sf-stagger mx-auto mt-12 grid max-w-wide gap-6 sm:grid-cols-2">
        {POTRAFI.map((item) => (
          <li key={item.t} className="inf-card p-6" style={{ '--card-c': item.c } as CSSProperties}>
            <div aria-hidden="true" className="inf-spotlight" />
            {/* v8 (spec §8, pomiary wzorca §3.5): „co potrafi Agent" to KARTY
                TEKSTOWE (zdania o możliwościach), a takie we wzorcu ikony nie
                mają. Kafelek stąd wypadł, ton karty (--card-c) zostaje. Pole
                `ikona` zostaje w rejestrze POTRAFI, nie renderujemy go. */}
            <span className="block text-ui font-semibold text-fg">{item.t}</span>
            <span className="mt-2 block text-body-sm text-fg-muted">{item.d}</span>
          </li>
        ))}
      </Reveal>

      {/* Fraza cytowalna — celowy soundbite dla LLM i DRUGI moment display na
          stronie (jedyne miejsce poza hero, gdzie strona podnosi głos).
          Tekst 1:1, ginie wyłącznie kolorowa krawędź boczna.
          data-scrub-text = hak MotionOrchestratora (desktop ≥1024px po load):
          tekst dzielony na słowa DOPIERO klientowo, oryginał w aria-label —
          prerender/SEO/A11y bez zmian; słowa wypełniają się scrollem. */}
      <Reveal delay={0.1}>
        <blockquote
          data-scrub-text
          className="mx-auto mt-16 max-w-[24ch] text-balance text-center font-display font-semibold tracking-[-0.028em] text-fg"
          style={{ fontSize: 'clamp(1.875rem, 4.2vw, 3.25rem)', lineHeight: 1.08 }}
        >
          „AI Agent to nie program, który rozmawia. To program, który załatwia sprawę.”
        </blockquote>
      </Reveal>

      {/*
        CTA tej sekcji prowadzi do JEDYNEGO flow konwersji home (#diagnoza, north star #4).
        Wcześniej linkowała do /uslugi/agenci-ai — slug spoza rejestru lib/uslugi,
        a przy dynamicParams=false to twarde 404 (strona nie była prerenderowana).
        Intencja przycisku ("którego Agenta potrzebujesz") = dokładnie to, co robi diagnoza.

        INFINITY v8 §3 — dwie skargi Pawła, dwie poprawki, ZERO zmian w treści:

        1) „nie jest symetrycznie, nie jest na środku". Cytat wyżej jest
           wyśrodkowany (mx-auto + text-center), ale przycisk leżał w gołym
           <div>, czyli dosuwał się do LEWEJ krawędzi kontenera 1200px —
           blok czytał się krzywo. Teraz cytat i CTA siedzą we WSPÓLNYM,
           wyśrodkowanym bloku (flex + justify-center, max-w-wide mx-auto),
           więc obie linie mają jedną oś.

        2) „kolor ramki z dupy, kolor CTA z dupy". Przycisk był
           <Button variant="secondary">, a ten wariant maluje obwódkę
           --border-control (biel 55%) i tekst --brand (biel) — czyli
           NEUTRALNĄ szarość spoza palety marki, obcą wobec reszty CTA.
           Wchodzi dokładnie ten sam język, co drugorzędne CTA hero:
           pigułka .inf-glow-cta + .inf-glow-cta-ghost (obwódka i litery
           w akcencie --accent, glow akcentu, strzałka .sf-arrow jako
           dekoracja aria-hidden). Zero nowego CSS, zero nowych tokenów —
           obie klasy już żyją w globals i są używane w hero.

        MIEJSCE NA REALNY WYBÓR AGENTA (decyzja D5 Pawła: quiz/selektor
        prowadzący do właściwej usługi) — to osobne, większe zadanie. Ten
        wrapper jest gotowym slotem: selektor wejdzie MIĘDZY cytat a CTA,
        w tej samej osi i bez ruszania układu sekcji.
      */}
      <Reveal delay={0.15}>
        <div className="mx-auto mt-7 flex max-w-wide flex-col items-center gap-3 text-center">
          <a href="#diagnoza" className="inf-glow-cta inf-glow-cta-ghost">
            Sprawdź, którego Agenta potrzebujesz{' '}
            <span aria-hidden="true" className="sf-arrow">→</span>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
