import { Section, Button } from '@/components/ui';
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

/* INFINITY v4 (spec §PARTIA C pkt 3+5): dekoracyjne „ cytatów w RÓŻNYCH
   fluorescencyjnych odcieniach (paleta `odcien` z lib/inf-kategorie, partia A)
   — 5 cytatów = 5 odcieni, zero dubli. Czysta dekoracja (aria-hidden). */
const CYTAT_ODCIEN = ['#67e8f9', '#a78bfa', '#f472b6', '#4ade80', '#fbbf24'] as const;

export function Problem() {
  return (
    <Section tone="base" id="problem" space="md">
      {/* INFINITY v3 (decyzja Pawła: zdjęcia WYLATUJĄ z całej strony): panorama
          „przed i po" usunięta z renderu (plik webp zostaje w /public). Sekcja
          to nagłówek + karta cytatów solo — od v4 CIEMNA .inf-card (biała
          wyspa OUT). Teksty i hierarchia nagłówków bez zmian. */}
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

      {/* INFINITY v4 (decyzja Pawła: BIAŁA karta cytatów = porażka): karta
          bólów przechodzi na CIEMNĄ .inf-card wzorca (obwódka, lewa krawędź
          akcentowa, narożniki [ ], sweep na hover — wszystko z globals partii A).
          data-theme="light" ZNIKA z home — wnętrze liczy kontrast na ciemnych
          tokenach semantycznych (te same klasy text-fg/divide-border). Kolorowe
          „ w akcentach z palety odcieni (CYTAT_ODCIEN wyżej, każda linia inny
          odcień). Kaskadę wierszy dalej niesie .sf-stagger (selektor
          [data-reveal-shown] .sf-stagger > * z globals). Teksty 1:1; mostek
          do diagnozy zostaje W karcie (cytaty + przycisk w jednej bryle). */}
      <Reveal delay={0.1} className="mx-auto mt-12 max-w-narrow md:mt-16">
        <div className="inf-card px-6 md:px-8">
          <ul className="sf-stagger divide-y divide-border">
            {BOLE.map((bol, i) => (
              <li key={i} className="flex gap-4 py-5">
                <span
                  aria-hidden="true"
                  className="select-none font-display text-[2.5rem] leading-[0.6]"
                  style={{ color: CYTAT_ODCIEN[i % CYTAT_ODCIEN.length] }}
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
