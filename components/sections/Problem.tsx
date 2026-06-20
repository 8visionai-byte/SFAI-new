import { Section, Button, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';

/**
 * SEKCJA 3 — PROBLEM językiem klienta (spec 03 §3). Emocja: loss aversion ->
 * "ktoś mnie rozumie". Kapsuła answer-first + lista bólu + mostek do diagnozy.
 * Zero żargonu (LLM/RAG/NLU). H2 jak pytanie.
 */
const BOLE = [
  'Telefon dzwoni, kiedy jestem u klienta. Połowy połączeń nie odbieram, a to są pieniądze, które uciekają.',
  'Ci sami ludzie pytają o to samo. O godziny, o cennik, o dojazd. Codziennie, od nowa.',
  'Wieczorem przepisuję dane z maila do systemu, z systemu do faktury. Ręcznie.',
  'Klient pisze o 22:00. Odpowiadam rano. Konkurencja czasem odpowiada szybciej.',
  'Wiem, że AI mogłoby pomóc. Tylko nie wiem od czego zacząć i boję się, że znowu przepalę budżet na coś, co nie zadziała.',
] as const;

export function Problem() {
  return (
    <Section tone="base" id="problem">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Ile czasu w tygodniu zjada Ci robota, którą mógłby robić ktoś inny?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Większość małych firm traci kilkanaście godzin tygodniowo na to samo: odbieranie tych samych
            pytań, przepisywanie danych między systemami, oddzwanianie do klientów, którzy nie dodzwonili
            się za pierwszym razem. To nie jest praca, która rozwija firmę. To praca, która ją tylko utrzymuje
            na powierzchni. I to właśnie ją zdejmuje AI Agent.
          </p>
        </Reveal>
      </div>

      <ul className="mx-auto mt-8 grid max-w-narrow gap-3">
        {BOLE.map((bol, i) => (
          <Reveal as="li" key={i} delay={i * 0.05}>
            <Card className="flex gap-3 py-4">
              <span aria-hidden="true" className="select-none text-h3 leading-none text-accent">
                „
              </span>
              <p className="text-body-sm text-fg">{bol}</p>
            </Card>
          </Reveal>
        ))}
      </ul>

      {/*
        Mostek do diagnozy (CTA wtórne -> główny flow). UWAGA: przycisk prowadzi do
        formularza diagnozy, NIE do kalkulatora — dlatego mikrokopia nie obiecuje
        "policz sam". Gdyby powstał realny kalkulator (godziny x stawka), wpiąć go
        jako krok 1 flow i wtedy można wrócić do słowa "policz".
      */}
      <Reveal delay={0.1}>
        <div className="card-aura mx-auto mt-8 max-w-narrow rounded-lg border border-border bg-bg-subtle p-6">
          <p className="text-body text-fg">
            Nie zgaduj. Na bezpłatnej diagnozie pokażę Ci, ile godzin i złotych miesięcznie zjada
            powtarzalna robota w Twojej firmie. Konkretne liczby z Twoich procesów, nie ogólniki.
          </p>
          <div className="mt-4">
            <Button variant="secondary" href={HOME_CTA.href}>
              Pokaż mi, ile tracę
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
