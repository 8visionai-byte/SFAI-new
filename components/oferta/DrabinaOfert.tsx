import Link from 'next/link';
import { Section, Card, Badge } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

/**
 * DrabinaOfert — SEKCJA strony „Architekci Wartości AI" (jak to działa = drabina).
 *
 * Drabina niskiego progu L0->L5 jako kroki: najtańszy/darmowy PIERWSZY, każdy
 * kolejny szczebel droższy i głębszy. Każdy szczebel ma: poziom (L0..L5), nazwę,
 * „dla kogo", „co dostajesz" i opcjonalną cenę. Tylko najtańsze szczeble mają
 * własne CTA -> #diagnoza (jedno główne CTA strony, north star #3).
 *
 * KPI #1 (cytowalność): cała treść w surowym HTML przy 1. żądaniu — lista
 * uporządkowana <ol>, każdy szczebel = <article> z jawnym poziomem. Reveal tylko
 * wzbogaca; przy prefers-reduced-motion treść jest natychmiast.
 *
 * ŹRÓDŁO PRAWDY: szczeble są zdefiniowane TU jako stała (nie w rejestrze lib/uslugi,
 * bo to strona statyczna OBOK [usluga]). Ceny 1:1 z TabelaCen i z cennikiem Pawła.
 */

type Szczebel = {
  poziom: string;
  nazwa: string;
  dlaKogo: string;
  coDostajesz: string;
  cena?: string;
  /** Najtańsze/wejściowe szczeble dostają CTA do diagnozy. */
  cta?: { label: string; href: string };
  /** Wyróżnienie wizualne wejściowego, darmowego kroku. */
  highlight?: boolean;
};

export const DRABINA: Szczebel[] = [
  {
    poziom: 'L0',
    nazwa: 'Kalkulator ROI',
    dlaKogo: 'Dla każdego, kto chce sam policzyć, ile traci.',
    coDostajesz:
      'Wpisujesz kilka liczb, dostajesz szacunek (szac.) ile godzin i pieniędzy zjada powtarzalna robota. Bez kontaktu, bez maila. Po prostu liczba na start.',
    cena: 'Za darmo',
    cta: { label: 'Policz na kalkulatorze', href: '/narzedzia' },
    highlight: true,
  },
  {
    poziom: 'L1',
    nazwa: 'Mapa Oszczędności Czasu (diagnoza)',
    dlaKogo: 'Dla firm, które czują, że tracą czas, ale nie wiedzą gdzie.',
    coDostajesz:
      'Krótka rozmowa i przegląd Twoich procesów. Pokazuję, gdzie uciekają godziny i co da się odpiąć od ludzi najszybciej. Wychodzisz z konkretną listą do automatyzacji.',
    cena: 'Za darmo',
    cta: { label: 'Pokaż mi, gdzie tracę czas', href: '#diagnoza' },
    highlight: true,
  },
  {
    poziom: 'L2',
    nazwa: 'Sprint Diagnostyczny',
    dlaKogo: 'Dla firm, które chcą plan działania na papierze, nie ogólniki.',
    coDostajesz:
      'Action Plan: rozpisany krok po kroku co automatyzować, w jakiej kolejności, jakim narzędziem i co to da. Konkret, na którym możesz pracować nawet beze mnie.',
    cena: '1490 zł (odliczane od wdrożenia)',
  },
  {
    poziom: 'L3',
    nazwa: 'AI Start',
    dlaKogo: 'Dla firm, które chcą zobaczyć efekt zanim podejmą większą decyzję.',
    coDostajesz:
      'Budujemy jeden proces na próbę. Jedna automatyzacja, którą realnie odczujesz: mniej klikania, szybsze odpowiedzi, godziny z powrotem w tygodniu. Najpierw efekt, potem rozmowa o reszcie.',
    cena: '1990 zł',
  },
  {
    poziom: 'L4',
    nazwa: 'Opieka AI (ryczałt)',
    dlaKogo:
      'Dla firm, które mają już pierwsze automatyzacje i chcą je rozwijać bez zatrudniania działu.',
    coDostajesz:
      'Stała pula godzin w miesiącu na budowę, integracje i utrzymanie. Kolejne procesy schodzą z ludzi po kolei. Masz inżyniera AI pod telefonem zamiast etatu.',
    cena: '3000 / 5500 / 10000 zł / mc',
  },
  {
    poziom: 'L5',
    nazwa: 'Architekci Wartości AI',
    dlaKogo: 'Dla firm, które chcą, żeby ktoś po prostu „ogarniał AI" na stałe.',
    coDostajesz:
      'Pełny zewnętrzny dział rozliczany za wartość: strategia, budowa, wdrożenia i utrzymanie pod jednym dachem. Paweł prowadzi kierunek, Marcin buduje. Płacisz za efekt, nie za godziny, a pakiet skrojony jest tak, by zwracał się oszczędnością.',
    cena: 'od 10000 zł / mc',
  },
];

export function DrabinaOfert() {
  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Jak zacząć, żeby nie przepłacić na start?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Idziemy drabiną od najtańszego kroku. Zaczynasz od darmowej diagnozy,
            sprawdzasz jeden proces na próbę i dopiero potem decydujesz, jak daleko
            chcesz pójść. Każdy szczebel jest osobnym, odwracalnym krokiem. Nie
            musisz od razu budować całego działu AI.
          </p>
        </Reveal>
      </div>

      <ol className="mx-auto mt-10 grid max-w-narrow gap-5">
        {DRABINA.map((s, i) => (
          <Reveal as="li" key={s.poziom} delay={Math.min(i * 0.05, 0.25)}>
            <Card
              as="article"
              variant={s.highlight ? 'highlight' : 'base'}
              className="h-full"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="flex h-9 min-w-9 items-center justify-center rounded-full bg-accent-soft px-2 font-display text-body-sm font-semibold text-accent-hover"
                  aria-hidden="true"
                >
                  {s.poziom}
                </span>
                <h3 className="text-h3">{s.nazwa}</h3>
                {s.cena ? (
                  <Badge variant={s.highlight ? 'success' : 'neutral'} className="ml-auto">
                    {s.cena}
                  </Badge>
                ) : null}
              </div>

              <dl className="mt-4 grid gap-3 sm:grid-cols-[8rem,1fr]">
                <dt className="text-caption font-semibold uppercase tracking-wide text-fg-subtle">
                  Dla kogo
                </dt>
                <dd className="text-body-sm text-fg-muted">{s.dlaKogo}</dd>
                <dt className="text-caption font-semibold uppercase tracking-wide text-fg-subtle">
                  Co dostajesz
                </dt>
                <dd className="text-body-sm text-fg-muted">{s.coDostajesz}</dd>
              </dl>

              {s.cta ? (
                <Link
                  href={s.cta.href}
                  className="mt-5 inline-flex items-center gap-1 text-body-sm font-semibold text-accent-hover underline decoration-1 underline-offset-2 hover:text-fg"
                >
                  {s.cta.label}
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              ) : null}
            </Card>
          </Reveal>
        ))}
      </ol>

      <p className="mx-auto mt-8 max-w-narrow text-caption text-fg-subtle">
        Każdy wyższy szczebel jest opcją, nie zobowiązaniem. Większość firm zaczyna
        od L1 albo L3 i dokłada kolejne dopiero, gdy pierwszy efekt już działa.
      </p>
    </Section>
  );
}
