import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchemaPl } from '@/components/seo/schemas';
import { SITE, LEGAL_ROUTES } from '@/lib/site';
import { USLUGI } from '@/lib/uslugi';
import { REALIZACJE } from '@/lib/realizacje';
import { dekorUslugi } from '@/lib/inf-kategorie';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { DiagnozaForm } from '@/components/forms/DiagnozaForm';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { LinkiKrzyzowe } from '@/components/poradniki';
import { HubFAQ } from '@/components/sections/HubFAQ';

/**
 * STRONA /kontakt — SSG (force-static). Realny cel wszystkich CTA "diagnozy" i
 * link „Kontakt" ze stopki (wcześniej 404). Treść w surowym HTML (KPI #1).
 *
 * Konwersja: ten sam multi-step formularz diagnozy co na home (DiagnozaForm),
 * obok NAP (e-mail, telefon, godziny) dla osób, które wolą napisać/zadzwonić.
 */
export const dynamic = 'force-static';

const PATH = '/kontakt';

export const metadata: Metadata = buildMetadata({
  title: 'Kontakt: umów bezpłatną diagnozę AI',
  description:
    'Umów bezpłatną diagnozę: 30 minut i konkretna lista tego, co da się u Ciebie zautomatyzować. Napisz, zadzwoń albo wypełnij formularz.',
  path: PATH,
});

/* ─────────────────────────────────────────────────────────────────────
   v22 DOGRYWKA (kontrola v22 MAJOR-1, PLAN-v22 §3 P2 #13 i §5.1).

   STAN PRZED: /kontakt miało 5 194 znaki w HTML dla bota, ZERO H2 w <main>
   (próg §5.1: >= 2) i ZERO wychodzących linków redakcyjnych (§5.3). Kroki 2 i 3
   formularza siedzą za stanem Reacta, więc bot ich nie widzi, a DiagnozaForm
   jest współdzielony z HOME i go NIE RUSZAMY (§3 P3 #21). Dlatego treść
   dokładają STATYCZNE sekcje OBOK formularza, nie w nim.

   ŹRÓDŁA (żelazna reguła: zero nowych obietnic, każde zdanie ma plik:linia):
     lib/site.ts:59,71,72 . . . . . . . e-mail, telefon, godziny (NAP)
     lib/site.ts:144  . . . . . . . . . „Bez zobowiązań. Odpowiadamy w minuty."
     components/forms/DiagnozaForm.tsx:87-91,116-157,328,372-380,359-366,395
     app/api/lead/route.ts:5-6,81-92 . . co robi wysyłka
     api/_knowledge.mjs:22,33,36,42,45-47,52,54-58 . . zasady i cennik agenta
     lib/uslugi/chatboty.ts . . . . . . 1790 zł netto + dwa modele rozliczenia
     lib/uslugi/audyt-ai.ts:78  . . . . 1490 zł odliczane od wdrożenia
     app/uslugi/architekci-wartosci-ai/page.tsx:80,90 . . 0 zł startu, 1990 zł
     lib/narzedzia/index.ts:28-32 . . . kalkulator oszczędności
     lib/poradniki/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts:24

   ZERO wymyślonego czasu odpowiedzi: w repo NIE MA „24h" ani żadnego SLA,
   więc na stronie stoi wyłącznie to, co repo mówi naprawdę („w kilka minut"
   + godziny pracy z lib/site.ts). */

/** Ton /kontakt = fiolet #e438ff, DOKŁADNIE ten sam, którym świeci karta
    formularza (components/forms/DiagnozaForm.tsx:179). Bierzemy go przez
    `dekorUslugi` z rejestru dekoracji (wpis `rozwiazania`), zero nowej mapy
    kolorów. Akcesor, a nie surowy odczyt mapy, bo INF_KATEGORIA to
    Record<string, InfDekor>, a `noUncheckedIndexedAccess` jest włączony. */
const TON = dekorUslugi('rozwiazania');
const STYL_TONU = {
  '--card-c': TON.c,
  '--card-c-l': TON.odcien ?? TON.c,
} as CSSProperties;

/* LINKI POWROTNE (PLAN-v22 §3 P2 #13: 3-4 linki, „NOWA sekcja »Zanim wypełnisz
   formularz« z H2, OBOK formularza"). Render: istniejący LinkiKrzyzowe, te same
   kafle .inf-card co na poradnikach, zero nowego CSS. Liczby w opisach POLICZONE
   Z REJESTRU przy buildzie (USLUGI.length, REALIZACJE.length), nie wpisane. */
const LINKI_NARZEDZIA = [
  {
    /* lib/narzedzia/index.ts:28-32 (slug, tytul, opis). Kotwica #<slug> istnieje:
       app/narzedzia/page.tsx:141 renderuje <Section id={n.slug}>. */
    href: '/narzedzia#kalkulator-oszczednosci',
    etykieta: 'Kalkulator oszczędności z automatyzacji',
    opis:
      'Wpisujesz, ile osób ile godzin tygodniowo traci na powtarzalnej robocie, a kalkulator pokazuje, ile złotych rocznie odzyskasz po automatyzacji. Bez maila, w 10 sekund.',
  },
];

const LINKI_USLUGI = [
  {
    href: '/uslugi',
    etykieta: 'Wszystkie usługi AI',
    /* Liczba z rejestru lib/uslugi (USLUGI.length). Każda usługa ma własną ramę
       ceny i FAQ, bo wymusza to kontrakt typu (lib/uslugi/types.ts:157,181). */
    opis: `Pełna lista tego, co robimy, dziś ${USLUGI.length} usług. Każda ma własną ramę ceny i najczęstsze pytania, więc sprawdzisz zakres, zanim się odezwiesz.`,
  },
];

const LINKI_REALIZACJE = [
  {
    href: '/realizacje',
    etykieta: 'Wdrożenia, które już działają',
    /* Liczba z rejestru lib/realizacje (REALIZACJE.length). Układ „z czym
       przyszedł klient / co zbudowaliśmy / co to dało" jest kontraktem typu
       (lib/realizacje/types.ts: kontekst, rozwiazanie, efekt). */
    opis: `Dziś ${REALIZACJE.length} opisanych wdrożeń: z czym przyszedł klient, co zbudowaliśmy i co to dało. Bez nazw tam, gdzie klient prosił o anonimowość.`,
  },
];

const LINKI_PORADNIKI = [
  {
    /* Najczęściej czytany poradnik wg GSC (.seo-przeglad/raporty/2026-08-17d.md,
       PLAN-v22 §3 P1 #5). Opis 1:1 z leadem poradnika (plik rejestru, linia 24). */
    href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
    etykieta: 'Ile kosztuje wdrożenie AI agenta',
    opis:
      'Od czego zależy koszt agenta, jak policzyć zwrot i po czym poznać, że wdrożenie się spina, zanim wydasz pierwszą złotówkę.',
  },
];

/* KROKI PO WYSŁANIU: opis realnej mechaniki, nie obietnica. Render 1:1 z blokiem
   `kroki` wariant 'plytka' z components/blog/PostBody.tsx:222-253 (.inf-card
   .inf-card-edge + numer w .inf-tile), więc zero nowych reguł CSS. */
const KROKI_PO_WYSLANIU = [
  {
    /* app/api/lead/route.ts:5-6 („przyjmuje zgłoszenia z formularza diagnozy
       i przekazuje je do webhooka Make"), :81-87 (fetch + timeout 5 s);
       components/forms/DiagnozaForm.tsx:87-91 (POST na /api/lead). */
    tytul: 'Zgłoszenie idzie prosto do nas',
    opis:
      'Formularz wysyła Twoje odpowiedzi na nasz serwer, a ten od razu przekazuje je dalej do nas. Nic nie czeka na ręczne przepisywanie z jednego okna do drugiego.',
  },
  {
    /* components/forms/DiagnozaForm.tsx:116-133 (stan sukcesu „Mam to.") oraz
       :135-157 (stan błędu z prośbą o mail albo telefon). */
    tytul: 'Od razu widzisz, czy dotarło',
    opis:
      'Gdy zgłoszenie dojdzie, formularz pokazuje potwierdzenie na ekranie. Gdy wysyłka się nie uda, zamiast ciszy dostajesz komunikat z prośbą, żeby napisać na nasz adres albo zadzwonić.',
  },
  {
    /* components/forms/DiagnozaForm.tsx:129 („Odezwę się w kilka minut na podany
       kontakt"), :395 („Odpowiadam w kilka minut"), :328 („Zostaw kontakt, na
       który faktycznie odbierzesz"); godziny z lib/site.ts:72 (interpolowane,
       jedno źródło). ZERO obietnicy „24h": takiej deklaracji w repo nie ma. */
    tytul: 'Odzywamy się na podany kontakt',
    opis: `Odzywamy się w kilka minut na ten kontakt, który zostawisz. Pracujemy ${SITE.contact.hours}, więc zgłoszenie wieczorne bierzemy z rana. Zostaw numer albo adres, na który faktycznie odbierzesz.`,
  },
  {
    /* api/_knowledge.mjs:33 („Bezpłatna diagnoza: 0 zł, około 30 minut, kończy
       się konkretną listą rzeczy do automatyzacji"), :45-47 (kroki 1-3 pracy);
       app/uslugi/architekci-wartosci-ai/page.tsx:80 („Start kosztuje 0 zł"). */
    tytul: 'Rozmawiamy, i to jest ta bezpłatna diagnoza',
    opis:
      'Około 30 minut. Mówisz, gdzie ucieka czas, my słuchamy i pytamy, a potem rozkładamy proces na części. Wychodzisz z konkretną listą tego, co da się zautomatyzować, ile to oszczędza i czego nie warto ruszać. Start kosztuje 0 zł.',
  },
  {
    /* components/forms/DiagnozaForm.tsx:372-380 (aktywny link do kalendarza
       w ostatnim kroku formularza, otwierany w nowej karcie). */
    tytul: 'Albo wybierasz termin sam',
    opis:
      'W ostatnim kroku formularza jest link do naszego kalendarza. Otwiera się w nowej karcie i wybierasz godzinę sam, bez czekania na naszą odpowiedź.',
  },
];

/* FAQ /kontakt: natywne <details> w HubFAQ (treść w HTML od pierwszego żądania,
   bez JS i bez bramki na klik) + ta SAMA tablica do FAQPage niżej, więc string
   w schemacie jest dosłownie tym, co widzi człowiek (§5.4). */
const FAQ_KONTAKT = [
  {
    /* api/_knowledge.mjs:33 i :45-47; app/uslugi/architekci-wartosci-ai/page.tsx:80;
       zdanie „Jak wyjdzie, że się nie opłaca" stoi już w hero tej strony wyżej. */
    pytanie: 'Co dostaję na bezpłatnej diagnozie?',
    odpowiedz:
      'Około 30 minut rozmowy. Mówisz, gdzie ucieka Ci czas, my słuchamy i pytamy, a potem rozkładamy Twoje procesy na części. Wychodzisz z konkretną listą tego, co da się u Ciebie zautomatyzować, ile to realnie oszczędza i czego nie warto ruszać. Start kosztuje 0 zł i do niczego nie zobowiązuje. Jak wyjdzie, że się nie opłaca, powiemy to wprost.',
  },
  {
    /* Ceny wyłącznie z listy locked: 990 (lib/uslugi/chatboty.ts:78), 2500
       (api/_knowledge.mjs:36), 3000-10000 (api/_knowledge.mjs:42), 1990
       (app/uslugi/architekci-wartosci-ai/page.tsx:90), 1490 odliczane od
       wdrożenia (lib/uslugi/audyt-ai.ts:78). Zero kwot spoza tej listy. */
    pytanie: 'Ile kosztuje wdrożenie, jeśli po diagnozie pójdziemy dalej?',
    odpowiedz:
      'Zależy od tego, co budujemy. Chatbot na stronę startuje od 1790 zł netto i powstaje w 1 do 2 dni roboczych, wdrożenie średnie to 3000 do 6000 zł netto, a duże z integracjami 8000 do 15000 zł netto. Voicebot to 2500 zł netto w wersji prostej i 5000 do 9000 zł netto z integracjami. Automatyzacja procesu kosztuje zwykle od 3000 do 10000 zł, audyt AI to 1490 zł netto i odliczamy go od wdrożenia, a pakiet AI Start z pierwszą automatyzacją na próbę to 1990 zł. Czas wdrożenia liczymy od przekazania kompletu materiałów, nie od podpisania umowy. Dokładną kwotę podajemy po diagnozie, zanim cokolwiek zamówisz.',
  },
  {
    /* Dwa modele rozliczenia, zdanie 1:1 z lib/uslugi/chatboty.ts:78 i
       app/produkty/page.tsx:134. Nie wolno tego skracać do „bez abonamentu". */
    pytanie: 'Czy po wdrożeniu płacę abonament?',
    odpowiedz:
      'Masz to do wyboru. Przekazujemy Ci całą infrastrukturę i wtedy nie płacisz abonamentu, albo projekt zostaje u nas pod opieką i wtedy jest opłata utrzymaniowa: chatboty i automatyzacje od 99 do 599 zł netto miesięcznie, voiceboty od 299 do 1500 zł netto miesięcznie. Decydujesz na etapie wyceny.',
  },
  {
    /* api/_knowledge.mjs:56 (voicebot NIE dzwoni sam, zero kampanii wychodzących)
       i :22 (rozmówca zawsze wie, że rozmawia z asystentem AI). */
    pytanie: 'Czy Wasz voicebot będzie obdzwaniał moich klientów?',
    odpowiedz:
      'Nie. Voicebot obsługuje wyłącznie połączenia przychodzące i nie dzwoni sam z siebie. Nie robimy kampanii wychodzących, obdzwaniania bazy ani cold calli. Gdy sprawa wymaga kontaktu zwrotnego, bot ją zapisuje i wysyła powiadomienie, a rozmowę zaczyna człowiek albo klient, który oddzwania. Rozmówca zawsze słyszy, że rozmawia z asystentem AI.',
  },
  {
    /* api/_knowledge.mjs:54 (zero wymyślonych cen, terminów i procentów), :55
       (zero SLA i certyfikatów spoza zatwierdzonej oferty), :57 (zero porad
       prawnych, medycznych i finansowych). */
    pytanie: 'Czego nie obiecujemy?',
    odpowiedz:
      'Nie podajemy wymyślonych cen, terminów ani procentów oszczędności, a szacunki nazywamy szacunkami. Nie obiecujemy SLA, certyfikatów ani warunków prawnych, które nie wynikają z zatwierdzonej oferty dla konkretnego klienta. Nie udzielamy porad prawnych, medycznych ani finansowych. Kiedy czegoś nie wiemy, mówimy to wprost, zamiast zgadywać.',
  },
  {
    /* api/_knowledge.mjs:52 (dane w UE, RODO i AI Act, umowa powierzenia) i :53
       (ostatnie słowo ma człowiek); components/forms/DiagnozaForm.tsx:359-366
       (administrator, wycofanie zgody, link do polityki) i :395 (dane zostają
       u nas, w UE). Zdanie o zasięgu stoi już w NAP wyżej na tej stronie. */
    pytanie: 'Co się dzieje z moimi danymi ze zgłoszenia?',
    odpowiedz:
      'Dane zostają w Unii Europejskiej, a przetwarzamy je zgodnie z RODO i AI Act. Przy współpracy podpisujemy umowę powierzenia danych. Administratorem danych ze zgłoszenia jest SimpleFast.ai, zgodę możesz wycofać w każdej chwili, a szczegóły stoją w polityce prywatności. Twoich danych nikomu nie sprzedajemy ani nie udostępniamy do celów marketingowych. Zgłoszenie przechodzi wyłącznie przez nasze narzędzie do obsługi zgłoszeń (Make.com, region UE), które działa jako podmiot przetwarzający na umowie powierzenia, i usuwamy je po 90 dniach.',
  },
  {
    /* lib/site.ts:59 (e-mail), :71 (telefon), :72 (godziny, interpolowane);
       api/_knowledge.mjs:15 („pracujemy w całej Polsce, zdalnie i na miejscu").
       Pola formularza (potrzeba, branża, zespół) z DiagnozaForm.tsx:32-50. */
    pytanie: 'Wolę napisać albo zadzwonić zamiast wypełniać formularz. Da się?',
    odpowiedz: `Jasne. E-mail i telefon masz na górze tej strony, pracujemy ${SITE.contact.hours}. Obsługujemy całą Polskę, zdalnie i na miejscu. Formularz jest tylko szybszy dla nas, bo od razu wiemy, czego szukasz, w jakiej branży działasz i ilu Was jest, więc pierwsza rozmowa zaczyna się od konkretów.`,
  },
];

export default function KontaktPage() {
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Kontakt', path: PATH },
        ])}
      />

      {/* INFINITY v2: hero bez solidnego tła (globalny starfield prześwituje);
          eyebrow → mono .inf-overline (treść 1:1). */}
      <Section tone="transparent">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2">
          {/* Lewa: zaproszenie + NAP */}
          <div>
            <Reveal>
              <p className="inf-overline text-accent">Kontakt</p>
              <h1 className="text-h1 mt-2">Zacznijmy od bezpłatnej diagnozy</h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-lead mt-5 text-fg-muted">
                30 minut rozmowy i wychodzisz z konkretną listą tego, co da się u Ciebie zautomatyzować,
                oraz ile to realnie oszczędza. Bez zobowiązań i bez sprzedażowego ciśnienia. Jak wyjdzie,
                że się nie opłaca, powiem to wprost.
              </p>
            </Reveal>

            {/* INFINITY v5 (spec §4): etykiety NAP w mono .inf-overline (język
                etykiet wzorca jak <dt> cennika home); treść 1:1. */}
            <Reveal delay={0.1}>
              <dl className="mt-8 space-y-4">
                {SITE.contact.emailVerified && SITE.contact.email && (
                  <div>
                    <dt className="inf-overline">E-mail</dt>
                    <dd className="mt-1 text-body text-fg">
                      <TrackedLink
                        href={`mailto:${SITE.contact.email}`}
                        event="klik_email"
                        className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
                      >
                        {SITE.contact.email}
                      </TrackedLink>
                    </dd>
                  </div>
                )}
                {SITE.contact.phone && (
                  <div>
                    <dt className="inf-overline">Telefon</dt>
                    <dd className="mt-1 text-body text-fg">
                      <TrackedLink
                        href={`tel:${SITE.contact.phone}`}
                        event="klik_telefon"
                        className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
                      >
                        {SITE.contact.phone}
                      </TrackedLink>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="inf-overline">Godziny</dt>
                  <dd className="mt-1 text-body text-fg">{SITE.contact.hours}</dd>
                </div>
                <div>
                  <dt className="inf-overline">Zasięg</dt>
                  <dd className="mt-1 text-body text-fg">Obsługujemy całą Polskę. Twoje dane zostają w UE.</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Prawa: multi-step formularz diagnozy */}
          <Reveal delay={0.05}>
            <DiagnozaForm />
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2) v22 dogrywka, PLAN-v22 §3 P2 #13: NOWA sekcja „Zanim wypełnisz
          formularz" z H2, OBOK formularza (nie w nim). Zamyka §5.3: /kontakt
          było jedyną trasą z ZEREM wychodzących linków redakcyjnych.
          Render: istniejący LinkiKrzyzowe (kafle .inf-card), zero nowego CSS,
          zero JS. Cztery cele: narzędzie, usługi, wdrożenia, poradnik. */}
      <LinkiKrzyzowe
        tytul="Zanim wypełnisz formularz"
        wstep="Nie musisz wiedzieć, czego dokładnie potrzebujesz, od tego jest diagnoza. Ale jeśli wolisz najpierw rozejrzeć się sam, tu są cztery miejsca, od których zwykle się zaczyna."
        narzedzia={LINKI_NARZEDZIA}
        uslugi={LINKI_USLUGI}
        realizacje={LINKI_REALIZACJE}
        poradniki={LINKI_PORADNIKI}
      />

      {/* ───────────────────────────────────────────────────────────────
          (3) v22 dogrywka, kontrola MAJOR-1: CO SIĘ DZIEJE PO WYSŁANIU.
          Kroki 2 i 3 DiagnozaForm siedzą za stanem Reacta, więc bot widział
          tylko krok 1. Ta sekcja opisuje tę samą mechanikę STATYCZNIE, w HTML
          pierwszego żądania. Markup 1:1 z blokiem `kroki` wariant 'plytka'
          (components/blog/PostBody.tsx:222-253): .inf-card .inf-card-edge
          + numer w .inf-tile. Zero nowych klas, zero nowych pętli JS. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow" style={STYL_TONU}>
          <Reveal>
            <h2 className="text-h2">Co się dzieje, gdy wyślesz formularz?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Żadnej czarnej skrzynki. Niżej stoi dokładnie to, co robi ten formularz
              i co dzieje się dalej po naszej stronie.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="mt-8 flex flex-col gap-4">
              {KROKI_PO_WYSLANIU.map((krok, i) => (
                <li key={krok.tytul} className="inf-card inf-card-edge flex gap-4 p-5">
                  <span
                    aria-hidden="true"
                    className="inf-tile flex h-[40px] w-[40px] flex-none items-center justify-center font-mono text-[15px] font-extrabold"
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="text-ui block font-extrabold">{krok.tytul}</span>
                    <span className="text-body-sm mt-1 block text-fg-muted">{krok.opis}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* RODO w treści, nie tylko w checkboxie formularza. Zdania z
              components/forms/DiagnozaForm.tsx:359-366 i :395. Link do polityki
              idzie przez LEGAL_ROUTES (lib/site.ts:335), więc nie da się go
              rozjechać ze stopką ani ze zgodą w formularzu. */}
          <Reveal delay={0.15}>
            <p className="mt-6 text-body-sm text-fg-muted">
              Formularz prosi o zgodę na kontakt i przetwarzanie danych w celu obsługi
              zgłoszenia. Administratorem danych jest SimpleFast.ai, zgodę możesz wycofać
              w każdej chwili, a szczegóły opisuje{' '}
              <Link
                href={LEGAL_ROUTES.privacy}
                className="font-semibold text-accent-hover underline-offset-2 hover:underline"
              >
                polityka prywatności
              </Link>
              . Twoje dane zostają w UE i nie sprzedajemy ich nikomu.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (4) v22 dogrywka, §5.4 i priorytet „boty i Google": FAQ w natywnych
          <details>. Odpowiedzi są w HTML od pierwszego żądania, bez JS i bez
          bramki na klik. Ta sama tablica idzie do FAQPage na dole strony. */}
      <HubFAQ pytania={FAQ_KONTAKT} tytul="Najczęstsze pytania przed diagnozą" ton={TON} />

      {/* FAQPage JSON-LD z TEJ SAMEJ tablicy, którą renderuje HubFAQ wyżej:
          string w schemacie jest dosłownie tym, co widzi człowiek (§5.4). */}
      <JsonLd data={faqSchemaPl(FAQ_KONTAKT, PATH)} />
    </main>
  );
}
