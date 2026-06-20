import { Section, Button } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

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
      Sekcja pozycjonująca — .surface-aurora daje subtelną kolorową zorzę marki w
      rogach + metaliczny hairline u góry (DEKORACJA pod treścią) na JASNYM tle
      (życzenie Pawła: tła jasne, kolor na napisach). Tokeny zostają jasne, więc
      tekst jest ciemny na jasnym (WCAG AA), a nagłówek .text-metal niesie kolor i
      pulsującą poświatę. Kontrast treści bez zmian.
    */
    <Section tone="base" className="surface-aurora">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          {/* .text-metal = metaliczny gradient na nagłówku. Solidny fallback
              --metal-fg (na dark = jasny fiolet, 10.14:1 na navy = AA) gwarantuje
              czytelność, gdy clip-text nie działa. Dekoracja, nie treść. */}
          <h2 className="text-h2 text-metal">Czym różni się AI Agent od zwykłego chatbota?</h2>
          {/* Metaliczna linia-akcent (dekoracja, aria-hidden) — „krok po kroku". */}
          <div className="sf-accent-line mt-4 max-w-[8rem]" aria-hidden="true" />
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

      {/* Tabela porównawcza (HTML) */}
      <Reveal delay={0.1}>
        <div className="mt-8 overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-left text-body-sm">
            <thead>
              <tr className="bg-bg-subtle">
                <th scope="col" className="px-4 py-3 font-semibold text-fg-subtle"> </th>
                <th scope="col" className="px-4 py-3 font-semibold text-fg">Zwykły chatbot</th>
                <th scope="col" className="px-4 py-3 font-semibold text-accent">AI Agent od SimpleFast.ai</th>
              </tr>
            </thead>
            <tbody>
              {POROWNANIE.map(([label, chatbot, agent]) => (
                <tr key={label} className="border-t border-border align-top">
                  <th scope="row" className="px-4 py-3 font-semibold text-fg">{label}</th>
                  <td className="px-4 py-3 text-fg-muted">{chatbot}</td>
                  <td className="bg-accent-soft px-4 py-3 text-fg">{agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Co potrafi Agent */}
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {POTRAFI.map((item, i) => (
          <Reveal as="li" key={item.t} delay={i * 0.05} className="card-aura rounded-lg border border-border bg-surface p-5">
            <span className="block text-ui font-semibold text-fg">{item.t}</span>
            <span className="mt-1 block text-body-sm text-fg-muted">{item.d}</span>
          </Reveal>
        ))}
      </ul>

      {/* Fraza cytowalna — celowy soundbite dla LLM */}
      <Reveal delay={0.1}>
        <blockquote className="mx-auto mt-9 max-w-narrow border-l-2 border-border-accent pl-5 text-h3 font-display text-fg">
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
