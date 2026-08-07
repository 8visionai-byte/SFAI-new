import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section, Button } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
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

const POTRAFI = [
  {
    t: 'Odbiera telefon, kiedy Ty nie możesz.',
    d: 'Voicebot rozmawia po polsku, umawia wizyty i przekazuje Ci tylko to, co ważne.',
  },
  {
    t: 'Odpisuje klientom w minuty, o każdej porze.',
    d: 'Chatbot na stronie i w komunikatorach odpowiada na pytania i zbiera leady, nawet o 22:00.',
  },
  {
    t: 'Przepisuje dane za Ciebie.',
    d: 'Automatyzacja przenosi informacje między mailem, systemem i fakturą, bez ręcznej roboty.',
  },
  {
    t: 'Pilnuje, żeby nic nie wypadło.',
    d: 'Przypomnienia, follow-upy, oddzwonienia. Klient nie zostaje bez odpowiedzi.',
  },
] as const;

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
              {POROWNANIE.map(([label, chatbot, agent]) => (
                <tr key={label} className="border-b border-border align-top transition-colors duration-fast hover:bg-bg-subtle">
                  <th scope="row" className="py-4 pr-4 font-semibold text-fg">{label}</th>
                  <td className="px-4 py-4 text-fg-subtle">{chatbot}</td>
                  <td className="border-l border-border-accent px-4 py-4 font-medium text-fg">{agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Co potrafi Agent — kreski zamiast czterech pudełek; kaskadę robi .sf-stagger */}
      <Reveal as="ul" className="sf-stagger mx-auto mt-12 grid max-w-wide gap-x-12 gap-y-8 sm:grid-cols-2">
        {POTRAFI.map((item) => (
          <li key={item.t} className="border-t border-border pt-5">
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
      */}
      <Reveal delay={0.15}>
        <div className="mt-7">
          <Button variant="secondary" href="#diagnoza">
            Sprawdź, którego Agenta potrzebujesz
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
