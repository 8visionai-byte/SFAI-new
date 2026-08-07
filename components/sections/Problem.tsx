import { Section, Button } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { CytatyWalec } from '@/components/sections/CytatyWalec';
import { HOME_CTA } from '@/lib/site';

/**
 * SEKCJA 3 — PROBLEM językiem klienta (spec 03 §3). Emocja: loss aversion ->
 * "ktoś mnie rozumie". Kapsuła answer-first + cytaty bólu + mostek do diagnozy.
 * Zero żargonu (LLM/RAG/NLU). H2 jak pytanie.
 *
 * INFINITY v5 (spec §3 PARTIA C):
 * - SYMETRIA: H2 + lead WYŚRODKOWANE jak pozostałe nagłówki home (text-center).
 * - CYTATY → WALEC 3D: statyczna lista bólów z v4 przeniesiona 1:1 (co do
 *   znaku, razem z paletą odcieni) do components/sections/CytatyWalec.tsx —
 *   obracający się bęben ~260 px z kropkami-nawigacją (RM/mobile: crossfade).
 * - Mostek do diagnozy ZOSTAJE w sekcji (treść 1:1), schodzi POD walec jako
 *   własny, wyśrodkowany blok — walec ma być zwarty, „nie zapełniać strony".
 */
export function Problem() {
  return (
    <Section tone="base" id="problem" space="md">
      {/* INFINITY v3 (decyzja Pawła: zdjęcia WYLATUJĄ z całej strony): panorama
          „przed i po" usunięta z renderu (plik webp zostaje w /public).
          v5: nagłówek + lead wyśrodkowane (symetria z resztą home). */}
      <div className="mx-auto max-w-narrow text-center">
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

      {/* WALEC 3D cytatów (v5): karta .inf-card z bębnem 5 bólów — cytaty,
          odcienie i mechanika opisane w CytatyWalec.tsx (wyspa kliencka;
          treść w HTML od SSR, więc GEO bez zmian). */}
      <Reveal delay={0.1} className="mx-auto mt-12 max-w-narrow md:mt-16">
        <CytatyWalec />
      </Reveal>

      {/*
        Mostek do diagnozy (CTA wtórne -> główny flow) — treść 1:1 z v4, od v5
        pod walcem, wyśrodkowany (symetria sekcji). UWAGA: przycisk prowadzi do
        formularza diagnozy, NIE do kalkulatora — dlatego mikrokopia nie obiecuje
        "policz sam". Gdyby powstał realny kalkulator (godziny x stawka), wpiąć go
        jako krok 1 flow i wtedy można wrócić do słowa "policz".
      */}
      <Reveal delay={0.15} className="mx-auto mt-10 max-w-narrow text-center">
        <p className="text-body text-fg">
          Nie zgaduj. Na bezpłatnej diagnozie pokażę Ci, ile godzin i złotych miesięcznie zjada
          powtarzalna robota w Twojej firmie. Konkretne liczby z Twoich procesów, nie ogólniki.
        </p>
        <div className="mt-4">
          <Button variant="secondary" href={HOME_CTA.href}>
            Pokaż mi, ile tracę
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
