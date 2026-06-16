import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from '@/components/seo/schemas';
import { SITE } from '@/lib/site';

import { Section, Badge, MagneticButton, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/uslugi/Breadcrumbs';
import {
  DrabinaOfert,
  CzegoNieMusisz,
  ObiekcjeOdpowiedzi,
  TabelaCen,
} from '@/components/oferta';

/**
 * FLAGOWA STRONA-PARASOL „Zewnętrzny Dział AI" (/uslugi/zewnetrzny-dzial-ai).
 *
 * Trasa STATYCZNA OBOK dynamicznej [usluga] — celowo NIE w rejestrze lib/uslugi,
 * bo to strategiczne centrum oferty (drabina niskiego progu, pełny cennik, zespół),
 * a nie pojedyncza usługa z szablonu 8-sekcyjnego. Next routing: ten segment
 * (`zewnetrzny-dzial-ai/page.tsx`) ma pierwszeństwo przed [usluga] dla tego slugu,
 * więc nie koliduje z generateStaticParams w [usluga] (slug i tak nie jest w rejestrze).
 *
 * STRATEGIA NISKIEGO PROGU (kolejność sekcji = od najtańszego/darmowego):
 *  hero (zacznij od jednej automatyzacji) -> problem -> drabina L0..L5 ->
 *  „czego nie musisz" -> obiekcje -> PEŁNY cennik (transparentność) -> zespół
 *  (nie freelancer) -> dla kogo -> FAQ -> finalne CTA. Jedno główne CTA: #diagnoza.
 *
 * KPI #1 (cytowalność = priorytet Pawła): cała treść w surowym HTML przy 1. żądaniu
 * (force-static SSG). JSON-LD Service + FAQPage + BreadcrumbList wstrzyknięty
 * SERWEROWO. Tekst FAQ jest 1:1 z sekcją widoczną (jedno źródło: stała FAQ).
 *
 * SITEMAP/NAV: NIE dotykamy ROUTES ani nawigacji — integrator doda trasę live.
 */
export const dynamic = 'force-static';

const PATH = '/uslugi/zewnetrzny-dzial-ai';
const CANONICAL = `${SITE.url}${PATH}`;

export const metadata: Metadata = buildMetadata({
  title: 'Zewnętrzny Dział AI dla firm: zacznij od jednej automatyzacji',
  description:
    'Nie musisz budować całego działu AI. Sprawdzamy, gdzie tracisz godziny, robimy jeden proces na próbę, decydujesz. Darmowa diagnoza, pełny jawny cennik od 0 zł.',
  path: PATH,
});

/**
 * FAQ — JEDNO źródło prawdy (answer-first). Te same stringi renderujemy w sekcji
 * <details> i wkładamy do FAQPage JSON-LD, więc rozjazd schema<->treść jest
 * niemożliwy (Google/LLM karzą rozjazd). 6 pytań, odpowiedzi w głosie Pawła.
 */
const FAQ: { pytanie: string; odpowiedz: string }[] = [
  {
    pytanie: 'Czym jest Zewnętrzny Dział AI?',
    odpowiedz:
      'To my zamiast etatowego działu AI. Sami sprawdzamy, gdzie tracisz czas, budujemy automatyzacje i je utrzymujemy. Ty dostajesz efekty, a nie kolejne narzędzie do nauki. Zaczynasz od jednej automatyzacji, nie od całego działu.',
  },
  {
    pytanie: 'Ile kosztuje start?',
    odpowiedz:
      'Start kosztuje 0 zł. Pierwszym krokiem jest darmowa diagnoza, czyli Mapa Oszczędności Czasu. Pierwszy płatny krok to Sprint Diagnostyczny za 1490 zł, który i tak odliczamy w całości od wdrożenia, gdy zdecydujesz się na współpracę.',
  },
  {
    pytanie: 'Czy muszę się znać na AI?',
    odpowiedz:
      'Nie. Od strony technicznej robimy wszystko my. Ty mówisz, co Cię uwiera w codziennej robocie, my dobieramy narzędzie i je wpinamy. Nie musisz uczyć się żadnych aplikacji ani zmieniać tego, czego już używasz.',
  },
  {
    pytanie: 'Co jeśli automatyzacja nie zadziała?',
    odpowiedz:
      'Dlatego zaczynamy od jednego procesu na próbę w ramach AI Start za 1990 zł, a nie od wielkiego wdrożenia. Najpierw widzisz realny efekt na swoich danych, dopiero potem decydujesz o kolejnych krokach. To mały, odwracalny krok.',
  },
  {
    pytanie: 'Czy to jest dla małych firm?',
    odpowiedz:
      'Tak, przede wszystkim. Mniejsza firma traci procentowo więcej, bo te same osoby robią wszystko naraz. Pierwszą niszę robimy dla biur rachunkowych, czyli klasycznych MŚP. Działa też dla kancelarii, e-commerce i firm usługowych.',
  },
  {
    pytanie: 'Czy AI zwolni moich ludzi?',
    odpowiedz:
      'Nie. AI nie zastępuje ludzi, AI zastępuje to, co ich zatrzymuje. Twój zespół przestaje przepisywać maile, faktury i raporty, a zaczyna robić to, co naprawdę wymaga człowieka. Mniej powtarzalnej roboty, więcej czasu na klienta.',
  },
];

/** „Dla kogo" — nisze. Pierwsza nisza (biura rachunkowe) wyróżniona. */
const NISZE: { branza: string; opis: string; pierwsza?: boolean }[] = [
  {
    branza: 'Biura rachunkowe',
    opis:
      'Segregacja dokumentów, przypomnienia do klientów o brakujących fakturach, wstępne odpowiedzi na powtarzalne maile. Tu zaczynamy jako pierwsi.',
    pierwsza: true,
  },
  {
    branza: 'Kancelarie',
    opis:
      'Porządkowanie spraw, szablony pism, wyłapywanie terminów i pierwsza obsługa zapytań, zanim trafią do prawnika.',
  },
  {
    branza: 'E-commerce',
    opis:
      'Obsługa pytań „gdzie moja paczka", opisy produktów, sortowanie zgłoszeń reklamacyjnych i odpowiedzi na maile po zakupie.',
  },
  {
    branza: 'Firmy usługowe',
    opis:
      'Generowanie ofert, umawianie terminów, podsumowania rozmów i raporty, które dziś ktoś klepie ręcznie po godzinach.',
  },
];

export default function ZewnetrznyDzialAiPage() {
  return (
    <main id="main">
      {/* ───────────────────────────────────────────────────────────────
          (1) HERO NISKIEGO PROGU — H1 + kapsuła answer-first + jedno CTA.
          10000 NIGDY w hero; prowadzi najtańszy, odwracalny krok. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Usługi', href: '/uslugi' },
              { name: 'Zewnętrzny Dział AI' },
            ]}
          />

          <Reveal>
            <Badge variant="accent" className="mt-6">
              Zewnętrzny Dział AI
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">
              Zacznij od jednej automatyzacji. Najpierw efekt, potem decyzja.
            </h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">
              Nie musisz budować całego działu AI. Sprawdzamy, gdzie tracisz
              godziny, robimy jeden proces na próbę, a Ty decydujesz, czy idziemy
              dalej. Najpierw zobaczysz efekt na swoich danych, dopiero potem
              rozmawiamy o reszcie. Zaczynasz za 0 zł.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 text-body text-fg-muted">
              „Zewnętrzny Dział AI” to poziom docelowy: my prowadzimy całe AI w
              Twojej firmie zamiast etatowego działu. Ale nikt nie każe Ci tam
              zaczynać. Wchodzisz najniższym szczeblem i wspinasz się tylko, jeśli
              poprzedni krok się opłacił.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-start gap-3">
              <MagneticButton variant="primary" size="lg" href="#diagnoza">
                Pokaż mi, gdzie tracę czas
              </MagneticButton>
              <span className="text-caption max-w-[52ch] text-fg-subtle">
                Bezpłatna diagnoza. Najpierw liczby, potem decyzja. Odpowiadam w
                kilka minut.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2) PROBLEM — firmy tracą godziny na powtarzalne. */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Gdzie naprawdę uciekają godziny w firmie?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">
              W powtarzalnej robocie, której nikt nie lubi. Maile, które za każdym
              razem brzmią tak samo. Faktury przepisywane z PDF-a do systemu.
              Oferty składane od zera, choć różnią się jednym akapitem. Raporty
              klepane ręcznie w piątek po południu. To nie jest praca, która buduje
              firmę. To praca, która ją zatrzymuje.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-body text-fg-muted">
              Najgorsze jest to, że te godziny rozkładają się po trochu, więc
              trudno je zauważyć. Pół godziny tu, kwadrans tam. W skali miesiąca to
              kilka pełnych dni roboczych (szac.), które ktoś z Twojego zespołu
              traci na klikanie zamiast na klienta. AI nie zastępuje ludzi. AI
              zastępuje dokładnie to, co ich zatrzymuje.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3) JAK TO DZIAŁA = DRABINA L0..L5 (najtańszy pierwszy). */}
      <DrabinaOfert />

      {/* ───────────────────────────────────────────────────────────────
          (4) CZEGO NIE MUSISZ MIEĆ/WIEDZIEĆ (obniża lęk). */}
      <CzegoNieMusisz />

      {/* ───────────────────────────────────────────────────────────────
          (5) OBIEKCJE -> ODPOWIEDZI (tabela). */}
      <ObiekcjeOdpowiedzi />

      {/* ───────────────────────────────────────────────────────────────
          (6) PEŁNY CENNIK (transparentność, od najtańszego). */}
      <TabelaCen />

      {/* ───────────────────────────────────────────────────────────────
          (7) ZESPÓŁ, NIE FREELANCER — role Paweł/Marcin + realne certy. */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Kto to dla Ciebie zrobi?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">
              Nie jeden freelancer, który zniknie po wdrożeniu. To dwie role, które
              się uzupełniają: ktoś, kto rozumie Twój biznes, i ktoś, kto to
              naprawdę zbuduje i utrzyma.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.05}>
              <Card as="article" className="h-full">
                <h3 className="text-h3">Paweł Pieloch</h3>
                <p className="mt-1 text-body-sm font-semibold text-accent-hover">
                  Strateg, integrator, twarz
                </p>
                <p className="mt-4 text-body-sm text-fg-muted">
                  Prowadzi diagnozę, Sprint i rozmowy. Decyduje, co automatyzować i
                  w jakiej kolejności, żeby najszybciej odzyskać godziny. To z nim
                  ustalasz kierunek.
                </p>
                <p className="mt-4 text-caption text-fg-subtle">
                  Autor: „Sprawdzone modele i strategie monetyzacji AI”, „Pierwsze
                  kroki z AI”, „Architekci wolności”.
                </p>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card as="article" className="h-full">
                <h3 className="text-h3">Marcin Karpeta</h3>
                <p className="mt-1 text-body-sm font-semibold text-accent-hover">
                  Inżynier, wdrożeniowiec
                </p>
                <p className="mt-4 text-body-sm text-fg-muted">
                  Buduje automatyzacje, robi integracje z Twoimi narzędziami i
                  utrzymuje to, co działa. Strona techniczna jest po jego stronie,
                  nie po Twojej.
                </p>
                <p className="mt-4 text-caption text-fg-subtle">
                  Certyfikat: Google „Umiejętności jutra 3.0”.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (8) DLA KOGO — pierwsza nisza biura rachunkowe + inne. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Dla kogo to jest?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">
              Dla firm, w których ludzie toną w powtarzalnej robocie. Zaczynamy od
              biur rachunkowych, bo tam powtarzalność widać najlepiej. Ale ten sam
              schemat działa wszędzie, gdzie ktoś klika to samo w kółko.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-6 sm:grid-cols-2">
            {NISZE.map((n, i) => (
              <Reveal as="li" key={n.branza} delay={Math.min(i * 0.05, 0.2)}>
                <Card
                  as="article"
                  variant={n.pierwsza ? 'highlight' : 'base'}
                  className="h-full"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="text-h3">{n.branza}</h3>
                    {n.pierwsza ? (
                      <Badge variant="accent">Pierwsza nisza</Badge>
                    ) : null}
                  </div>
                  <p className="mt-3 text-body-sm text-fg-muted">{n.opis}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (9) FAQ — answer-first, 1:1 z FAQPage JSON-LD. */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Najczęstsze pytania</h2>
          </Reveal>

          <div className="mt-8 divide-y divide-border border-y border-border">
            {FAQ.map((item, i) => (
              <Reveal key={item.pytanie} delay={Math.min(i * 0.03, 0.15)}>
                <details className="group py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-h3 font-medium text-fg [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring">
                    <span>{item.pytanie}</span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-accent transition-transform duration-base group-open:rotate-45"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </summary>
                  <p className="pb-4 pr-9 text-body-sm text-fg-muted">
                    {item.odpowiedz}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (10) FINALNE CTA — jedno główne, z dowodem (strefa dark). */}
      <Section tone="base" theme="dark" id="diagnoza">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">
              Zacznijmy od jednej rzeczy, która zżera Ci najwięcej czasu.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mx-auto mt-5 max-w-[52ch] text-fg-muted">
              Bez zobowiązań. Krótka diagnoza, konkretna lista do automatyzacji.
              Najpierw liczby, potem decyzja. Odpowiadam w kilka minut.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-col items-center gap-3">
              <MagneticButton variant="primary" size="lg" href="#diagnoza">
                Pokaż mi, gdzie tracę czas
              </MagneticButton>
              <span className="text-caption max-w-[60ch] text-fg-subtle">
                Realne wdrożenia: auto-email obsługi klienta gotowy w 75% i
                generator leadów, który zrobił 1000 rekordów w 40 minut.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        JSON-LD wstrzyknięty SERWEROWO (w HTML przy 1. żądaniu, widoczny dla botów):
         - Service: provider -> #organization (z layoutu) przez @id. BEZ `offers`,
           bo wejściowa cena to 0 zł (darmowa diagnoza) — minPrice 0 jako oferta
           wprowadzałby w błąd; pełny cennik jest jawny w treści. Zero zmyślonych cen.
         - FAQPage: tekst odpowiedzi 1:1 z sekcją FAQ (te same stringi ze stałej FAQ).
         - BreadcrumbList: Strona główna -> Usługi -> Zewnętrzny Dział AI.
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd
        data={serviceSchema({
          serviceType: 'Zewnętrzny Dział AI',
          name: 'Zewnętrzny Dział AI dla firm',
          description:
            'Zewnętrzny dział AI dla MŚP: diagnoza, budowa i utrzymanie automatyzacji. Zaczynasz od jednej automatyzacji na próbę, nie od całego działu.',
          path: PATH,
        })}
      />
      <JsonLd
        data={faqSchema(
          FAQ.map((item) => ({ q: item.pytanie, a: item.odpowiedz })),
          PATH
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Usługi', path: '/uslugi' },
          { name: 'Zewnętrzny Dział AI', path: PATH },
        ])}
      />

      {/* Kanoniczny URL = absolutny (spójność z metadata). */}
      <link rel="canonical" href={CANONICAL} />
    </main>
  );
}
