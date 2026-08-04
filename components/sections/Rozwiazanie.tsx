import Link from 'next/link';
import { Section, Button } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
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
      {/* BLOK DEFINICYJNY (answer-first) — kanoniczny, cytowalny fragment dla LLM na
          zapytanie „co to jest AI Agent dla firmy". Zwięzła definicja encyklopedyczna,
          potem wyróżnik + kontekst ogólnopolski + linki wewnętrzne do usług (sygnał
          SEO i AEO). Prowadzi czytelnika: CO to jest -> CZYM się różni -> demo -> tabela. */}
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Co to jest AI Agent dla firmy?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            AI Agent dla firmy to system, który samodzielnie wykonuje powtarzalne zadania:
            odbiera telefony, odpowiada klientom, umawia wizyty i przenosi dane między systemami.
            Działa według Twoich zasad, ma dostęp do kalendarza, CRM i narzędzi, z których już
            korzystasz. W odróżnieniu od chatbota nie tylko odpowiada na pytania, ale wykonuje
            konkretne czynności od początku do końca.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-body text-fg-muted">
            W SimpleFast.ai budujemy takich Agentów dla polskich małych i średnich firm.
            Pracujemy zdalnie dla firm z całej Polski, od jednoosobowych działalności z mniejszych
            miast po zespoły z Warszawy, Krakowa czy Wrocławia. Najczęściej są to{' '}
            <Link href="/uslugi/chatboty" className={LINK}>chatboty AI dla firmy</Link>,{' '}
            <Link href="/uslugi/voiceboty" className={LINK}>voiceboty odbierające telefony po polsku</Link>{' '}
            oraz <Link href="/uslugi/automatyzacje" className={LINK}>automatyzacja procesów w firmie</Link>.
            Dane zostają w UE, zgodnie z RODO, a płacisz za efekt.
          </p>
        </Reveal>
      </div>

      {/* RÓŻNICA Agent vs chatbot — drugi cytowalny blok (na zapytanie „czym się różni"). */}
      <div className="mx-auto mt-14 max-w-narrow">
        <Reveal>
          {/* Jeden system H2 (redesign): granatowy text-h2 bez gradientu i bez
              linii akcentowej — gradient marki ma twardy budżet 4 miejsc. */}
          <h2 className="text-h2">Czym różni się AI Agent od zwykłego chatbota?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Chatbot odpowiada na pytania. AI Agent wykonuje zadania. Chatbot powie klientowi, jakie masz
            godziny otwarcia. Agent sprawdzi Twój kalendarz, zaproponuje wolny termin, zapisze wizytę i wyśle
            potwierdzenie. Robi to pod Twoją kontrolą i według Twoich zasad, a Ty w każdej chwili widzisz, co
            zrobił. To różnica między systemem, który gada, a pracownikiem, który działa.
          </p>
        </Reveal>
      </div>

      {/* Interaktywne demo „pokaż, nie mów": chatbot vs Agent — NAD cytowalną tabelą.
          Tabela ZOSTAJE (obowiązkowa dla cytowalności LLM); demo to wizualna ilustracja. */}
      <Reveal delay={0.08}>
        <AgentDemo />
      </Reveal>

      {/* Tabela porównawcza (HTML) — karta katalogowa, nie arkusz zaznaczony
          zakreślaczem: wygraną kolumnę trzyma 1px kreska akcentowa i font-medium,
          nie plama bg-accent-soft. Treść komórek 1:1. */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-wide overflow-x-auto md:mt-16">
          <table className="w-full min-w-[36rem] border-collapse text-left text-body-sm">
            <thead>
              <tr className="border-b border-border-strong">
                <th scope="col" className="py-3 pr-4"> </th>
                <th scope="col" className="px-4 py-3 text-overline font-semibold uppercase tracking-[0.12em] text-fg-subtle">Zwykły chatbot</th>
                <th scope="col" className="border-l border-border-accent px-4 py-3 text-overline font-semibold uppercase tracking-[0.12em] text-accent">AI Agent od SimpleFast.ai</th>
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
          Tekst 1:1, ginie wyłącznie kolorowa krawędź boczna. */}
      <Reveal delay={0.1}>
        <blockquote
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
