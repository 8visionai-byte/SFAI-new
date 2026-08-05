import { Section, Button, SectionImage } from '@/components/ui';
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
    <Section tone="base" id="problem" space="md" className="overflow-x-clip">
      {/* Tekst wraca do JEDNEJ kolumny — kadr „przed i po" nie jest ilustracją
          obok akapitu, tylko osobnym aktem pod nim. Teksty i hierarchia
          nagłówków bez zmian. */}
      <div className="mx-auto max-w-narrow">
        <Reveal variant="header">
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

      {/* BLEED: plik to DYPTYK ze świetlistą linią w osi 50% („przed" po lewej,
          „po" po prawej) — kolumna 460px zabijała narrację. 21:9 z 16:9 pokazuje
          76% wysokości; focus y 42% -> okno 0,10-0,86, czyli obie twarze i
          papiery zostają w kadrze. Na mobile wraca 16:9 (21:9 przy 375px to
          pasek 160px). */}
      <Reveal delay={0.1} className="sf-bleed mt-12 md:mt-16">
        <SectionImage
          src="/img/powtarzalna-robota-przed-i-po.webp"
          alt="Przedsiębiorca zasypany papierami nocą i ten sam człowiek pracujący spokojnie z asystentem AI"
          ratio="wide"
          ratioMd="panorama"
          focus="50% 42%"
          hover
          className="rounded-none"
          sizes="100vw"
        />
      </Reveal>

      {/* ŚWIAT B (makieta 2-problem): karta bólów to CELOWO BIAŁA wyspa światła
          na ciemnej stronie, nachodząca na dolną krawędź panoramy (warstwa Z /
          kolaż). data-theme="light" przełącza tokeny semantyczne strefowo, więc
          wnętrze karty (tekst, kreski, tealowe „ , przycisk outline) liczy
          kontrast na bieli — zero ręcznych HEX-ów. Kaskadę wierszy dalej niesie
          .sf-stagger (selektor [data-reveal-shown] .sf-stagger > * z globals).
          Teksty 1:1; mostek do diagnozy wchodzi DO karty (makieta: cytaty +
          przycisk w jednej bryle). */}
      <Reveal className="relative z-raised mx-auto -mt-10 max-w-narrow md:-mt-20">
        <div data-theme="light" className="rounded-lg bg-surface px-6 shadow-lg md:px-8">
          <ul className="sf-stagger divide-y divide-border">
            {BOLE.map((bol, i) => (
              <li key={i} className="flex gap-4 py-5">
                <span
                  aria-hidden="true"
                  className="select-none font-display text-[2.5rem] leading-[0.6] text-accent-decor"
                >
                  „
                </span>
                <p className="text-body-sm text-fg">{bol}</p>
              </li>
            ))}
          </ul>

          {/*
            Mostek do diagnozy (CTA wtórne -> główny flow). UWAGA: przycisk prowadzi do
            formularza diagnozy, NIE do kalkulatora — dlatego mikrokopia nie obiecuje
            "policz sam". Gdyby powstał realny kalkulator (godziny x stawka), wpiąć go
            jako krok 1 flow i wtedy można wrócić do słowa "policz".
          */}
          <div className="border-t border-border py-6">
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
        </div>
      </Reveal>
    </Section>
  );
}
