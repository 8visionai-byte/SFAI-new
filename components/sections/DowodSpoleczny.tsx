import { Section, MagneticButton, Card, Button } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { InfIcon } from '@/components/ui/InfIcons';
import { HOME_CTA, SITE } from '@/lib/site';

/**
 * SEKCJA 8 — DOWÓD SPOŁECZNY (spec 03 §8). Emocja: zaufanie + uczciwa pilność.
 * Opinie z twarzą > logo. Autorytet Pawła (E-E-A-T). Niedobór TYLKO prawdziwy.
 *
 * ZASADA: zero zmyślonych cytatów i zero widocznych [PLACEHOLDER] w treści
 * (LLM cytuje placeholdery jako fakt). Dopóki brak realnych opinii, OPINIE jest
 * puste i renderujemy uczciwy stan — najmocniejszy jest blok autorytetu Pawła
 * (z realnych danych SITE).
 *
 * REALNE opinie (dostarczone przez Pawła, publikacja za zgodą klienta) — render
 * automatycznie je pokazuje. Cytaty zostawiamy DOSŁOWNIE (głos klienta, także z
 * jego myślnikiem — to jego słowa, nie nasza kopia). Widoczny HTML (blockquote +
 * figcaption) => cytowalne przez LLM i Google. `branza` = pogrubiona linia,
 * `podpis` = osoba/rola/firma pod spodem.
 */
type Opinia = { cytat: string; branza: string; podpis: string };

/* INFINITY: tonacja dekoracyjna kart cytatów — lewa krawędź .inf-card w kolorze
   kategorii usługi, o której mówi dana opinia (rejestr kolorów ze spec:
   chatboty blue, automatyzacje green, www cyan, dokumenty amber). Kolejność
   1:1 z tablicą OPINIE. Wyłącznie dekoracja — tekst niosą tokeny. */
const OPINIA_TON = [
  '#f59e0b', // kancelaria: raporty/dokumenty
  '#2b7cff', // turystyka: chatbot
  '#22e06b', // budowlanka: automatyzacja maili
  '#f59e0b', // hotel: faktury/dokumenty
  '#22d3ee', // agencja: narzędzia/www
  '#2b7cff', // edukacja: chatbot
] as const;

const OPINIE: readonly Opinia[] = [
  {
    cytat:
      'Prowadzę kancelarię dwadzieścia lat. Każde narzędzie które obiecuje oszczędność czasu najpierw ten czas pochłania. Tu było inaczej. Raporty po spotkaniach przestały być problemem. Zespół to poczuł szybciej niż ja.',
    branza: 'Kancelaria Prawno-Finansowa',
    podpis: 'Tomasz, Partner Zarządzający (KNF Team)',
  },
  {
    cytat:
      'Ha! Sezon, słońce, goście pytają o wszystko i nic, a ja biegam z telefonem między pomostem a biurem. W lipcu gość pisze o 23:00 w sprawie rowerów. O 23:00! Chatbot odpowiada, on rezerwuje, ja śpię. Rano patrzę, rezerwacja gotowa. No to się chłopaki śmialiśmy. Teraz goście mówią że obsługa u mnie błyskawiczna. No jest, tylko już nie ja biegam!',
    branza: 'Turystyka, Mazury',
    podpis: 'Jerzy, Właściciel (Przystań Jurgen)',
  },
  {
    cytat:
      'Co nie jest zapisane to nie istnieje, tak mówię swoim ludziom od lat. A sam wieczorami siadałem i odtwarzałem z głowy co gdzie ustalono. Teraz nagrywam w aucie zaraz po robocie. Mail idzie sam, klient dostaje wszystko tego samego dnia. Proste.',
    branza: 'Firma Budowlana',
    podpis: 'Andrzej, Właściciel (Torocken Haus)',
  },
  {
    cytat:
      'Mieliśmy faktury z 6 różnych źródeł, każda inaczej wyglądała. Dwie osoby przez łącznie kilka godzin tygodniowo przepisywały dane ręcznie. I tak raz na jakiś czas coś wpadało nie tam gdzie trzeba. Byłam sceptyczna bo wcześniej próbowaliśmy innych rozwiązań i zawsze coś nie działało z naszym systemem. Tu działało od pierwszego tygodnia. Teraz te same dwie osoby robią coś innego — coś co faktycznie wymaga myślenia. To chyba najlepszy sposób żeby to opisać.',
    branza: 'Hotel i Restauracja',
    podpis: 'Edyta i Rafał, Właścicielka (ONYX)',
  },
  {
    cytat:
      'Przyszliśmy do nich sprzedać nasze usługi. Skończyło się na tym że sami kupiliśmy. A właściwie zamieniliśmy się. Oni dostali nasze kampanie, my dostaliśmy ich narzędzia AI i to był strzał w dziesiątkę dla obu stron. Prowadzę kampanie dla dużych marek, wiem co działa, wiem co to wyniki. I wiem że to co zbudowali dla naszych procesów to nie jest zabawka. To realne narzędzie które działa codziennie.',
    branza: 'Agencja Marketingowa, Social Media',
    podpis: 'Y ADS',
  },
  {
    cytat:
      'Zaczęli u nas jako kursanci. Skończyli jako partnerzy. Mieliśmy 3000 stron transkrypcji z kursów i użytkownicy musieli przekopywać setki filmów żeby znaleźć to czego szukali. Teraz chatbot robi to w sekundy, dokładnie, bez błędów. Do tego asystent mailowy który odpowiada tak jak odpowiedziałby nasz człowiek, uczy się nowych produktów sam i działa autonomicznie w 60% przypadków. Support odetchnął. Szczerze, trochę niesamowite że to zaproponowali nam nasi własni absolwenci.',
    branza: 'Dyrektor, Edukacja AI',
    podpis: 'Instytut Kryptografii',
  },
];

export function DowodSpoleczny() {
  return (
    <Section tone="subtle" space="lg">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Komu już postawiliśmy AI Agentów?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          {/*
            Realne branże z opinii poniżej (kancelaria, turystyka, budowlanka,
            hotel/gastro, agencja, edukacja). Bez zmyślonych liczb wdrożeń/godzin —
            uczciwie zapowiadamy głosy klientów, których cytujemy dosłownie.
          */}
          <p className="text-lead mt-5 text-fg-muted">
            Kancelarie, turystyka, budowlanka, hotele, agencje i edukacja. Poniżej prawdziwe głosy właścicieli,
            którzy już pracują z naszymi Agentami. Cytujemy dosłownie, publikujemy za zgodą klienta.
          </p>
        </Reveal>
      </div>

      {/* Opinie — renderujemy TYLKO realne. Brak realnych = uczciwy stan (else).
          ŚCIANA CYTATÓW w kolumnach CSS: nierówna długość jest tu ZALETĄ, a nie
          dziurą pustki (h-full rozciągało wszystkie karty do najwyższej, więc przy
          cytacie 90 słów obok 40 słów w połowie kart siedziało 100-150px pustki).
          `gap-10` to column-gap; odstęp pionowy niesie `mb-10` na elemencie.
          Przy `columns` dzieci nie są w flow siatki, więc .sf-stagger nie zadziała —
          tu ZOSTAJE per-item delay z sufitem 4 kroków. */}
      {OPINIE.length > 0 ? (
        <div className="mx-auto mt-12 max-w-wide columns-1 gap-10 md:mt-16 md:columns-2 lg:columns-3">
          {OPINIE.map((o, i) => (
            <Reveal key={i} delay={Math.min(i, 4) * 0.06} className="mb-10 break-inside-avoid">
              {/* INFINITY: cytat na karcie wzorca (.inf-card) z lewą krawędzią
                  w kolorze kategorii (OPINIA_TON). Treść cytatu i podpisów 1:1. */}
              <figure
                className="inf-card p-6"
                style={{ '--card-c': OPINIA_TON[i] ?? 'var(--accent-decor)' } as React.CSSProperties}
              >
                {/* Reflektor za kursorem: pozycję (--mx/--my) ustawia JEDEN
                    delegowany pointermove z MotionOrchestrator (desktop).
                    Dekoracja aria-hidden. */}
                <div aria-hidden="true" className="inf-spotlight" />
                <blockquote className="text-body-sm leading-[1.7] text-fg">„{o.cytat}”</blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <span className="block text-ui font-semibold text-fg">{o.branza}</span>
                  <span className="mt-1 block text-caption text-fg-subtle">{o.podpis}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <Card as="article" className="mt-8">
            <p className="text-body-sm text-fg-muted">
              Opinie z nazwiskami i firmami publikujemy, gdy tylko klient da zielone światło. Nie wstawiamy
              zmyślonych cytatów. Chcesz porozmawiać z kimś, komu już postawiliśmy Agenta? Poproś na diagnozie.
            </p>
          </Card>
        </Reveal>
      )}

      {/* Kto za tym stoi — autorytet dwóch founderów (E-E-A-T).
          v7 (spec §PARTIA D pkt 2): blok schodzi z luźnego akapitu na kresce
          na KARTĘ .inf-card z kafelkiem ikony i odcieniem violet. Treść 1:1. */}
      <Reveal delay={0.1}>
        <div
          className="inf-card mx-auto mt-12 max-w-wide p-6 md:p-8"
          style={{ '--card-c': '#a78bfa' } as React.CSSProperties}
        >
          <div aria-hidden="true" className="inf-spotlight" />
          <span
            aria-hidden="true"
            className="inf-tile mb-4"
            style={{ '--tile-c': '#a78bfa' } as React.CSSProperties}
          >
            <InfIcon name="osoba-check" />
          </span>
          <h3 className="text-h3">Kto stawia te Agenty?</h3>
          <p className="mt-3 text-body-sm text-fg-muted">
            Dwóch founderów. {SITE.founders[0].name}, {SITE.founders[0].jobTitle}, prowadzi budowę: strony,
            automatyzacje, chatboty, voiceboty i apki. {SITE.founders[1].name} prowadzi firmę razem z nim.
            Nie sprzedajemy narzędzi. Sprzedajemy efekt, który widać na rachunku za czas zespołu.
          </p>
          <div className="mt-4">
            <Button variant="link" href="/o-nas">
              Poznaj założycieli <span aria-hidden="true" className="sf-arrow">→</span>
            </Button>
          </div>
        </div>
      </Reveal>

      {/*
        Niedobór — TYLKO prawdziwy, etyczny. INPUT PAWŁA: jeśli jest realny limit
        (konkretna liczba wdrożeń/mc), wpisać ją. Do tego czasu bez zmyślonej liczby.
      */}
      <Reveal delay={0.12}>
        {/* Jedyny kolorowy moment sekcji, ale jako cytat marginesowy, nie prostokąt
            zalany cyjanem — wtedy naprawdę wybija (cyjan przestał znaczyć „akcja",
            bo pracował w sześciu rolach naraz). */}
        <div className="mx-auto mt-8 max-w-narrow border-l-2 border-border-accent bg-transparent py-2 pl-6">
          <p className="text-body text-fg">
            Bierzemy tylko tyle wdrożeń naraz, ile jesteśmy w stanie zrobić dobrze. Po to, żeby każde
            dopilnować, a nie po to, żeby naciskać. Jak jest komplet, mówimy wprost i umawiamy na kolejny
            miesiąc.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mx-auto mt-12 flex max-w-narrow flex-col items-start gap-2 md:mt-16">
          <MagneticButton variant="primary" size="lg" trailing href={HOME_CTA.href}>
            {HOME_CTA.label}
          </MagneticButton>
          <span className="text-caption text-fg-subtle">Bez zobowiązań. Sprawdzimy, czy w ogóle warto.</span>
        </div>
      </Reveal>
    </Section>
  );
}
