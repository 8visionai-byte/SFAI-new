import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
/* v22 (PLAN-v22 §1.5): typ czytamy z KORZENIA grafu importów treści
   (lib/blog/types), bo od tej rundy powiązania mają też wpisy bloga, materiały
   i realizacje, nie tylko poradniki. `lib/poradniki/types` ma dziś własną,
   identyczną strukturalnie definicję pod tą samą nazwą, więc oba typy są
   wzajemnie przypisywalne i ŻADEN istniejący import nie pęka. */
import type { LinkKrzyzowy } from '@/lib/blog/types';
import { getRealizacjaBySlug } from '@/lib/realizacje';
import {
  INF_KATEGORIA,
  INF_NARZEDZIE,
  INF_PRODUKT,
  INF_TYP,
  INF_KATEGORIA_DEFAULT,
} from '@/lib/inf-kategorie';

/**
 * INFINITY v7 (audyt „naczynia połączone": na stronach poradników 4-7 kart szło
 * bez --card-c, więc cała sekcja linków świeciła jednym fallbackowym cyjanem).
 *
 * Kafel linku krzyżowego dostaje ton CELU, do którego prowadzi — dokładnie ten
 * sam kolor, co karta tej usługi na /uslugi i to narzędzie na /narzedzia.
 * Slug czytamy z `href` (kontrakt rejestru: '/uslugi/<slug>' albo
 * '/narzedzia#<slug>'), więc zero nowych pól w treści. Cel spoza map (np. usługa
 * bez wpisu w rejestrze dekoracji) spada na wspólny fallback akcentu.
 *
 * Zwracamy sam kontrakt koloru (kolor + jasny odcień), bo mapa usług i mapa
 * narzędzi mają różne typy dekoru (ikona/emoji), a kartę interesuje wyłącznie
 * para --card-c / --card-c-l.
 */
function dekorLinku(href: string): { c: string; odcien?: string } {
  const usluga = href.match(/^\/uslugi\/([^/#?]+)/)?.[1];
  if (usluga) return INF_KATEGORIA[usluga] ?? INF_KATEGORIA_DEFAULT;
  const narzedzie = href.match(/^\/narzedzia#([^/?]+)/)?.[1];
  if (narzedzie) return INF_NARZEDZIE[narzedzie] ?? INF_KATEGORIA_DEFAULT;
  /* SEO 2026-08-17 („Zobacz też"): cel /poradniki/<slug> świeci tonem PORADNIKA
     z INF_TYP — ten sam cyjan co karta poradnika na liście (naczynia połączone). */
  if (/^\/poradniki\//.test(href)) return INF_TYP.poradnik;
  /* v22 (PLAN-v22 §1.5): cel /realizacje/<slug> świeci kolorem KATEGORII tego
     wdrożenia, czyli dokładnie tym samym tonem, co karta case'a na /realizacje
     (naczynia połączone). Kategorię czytamy z rejestru po slugu z href, więc
     etykieta linku nie musi nieść koloru i nie da się go rozjechać ręcznie.
     Slug spoza rejestru (literówka) spada na wspólny fallback akcentu. */
  const realizacja = href.match(/^\/realizacje\/([^/#?]+)/)?.[1];
  if (realizacja) {
    const kategoria = getRealizacjaBySlug(realizacja)?.kategoria;
    return (kategoria ? INF_KATEGORIA[kategoria] : undefined) ?? INF_KATEGORIA_DEFAULT;
  }
  /* v22 (linki §3, P1 #8 i P2 #13): produkty NIE mają własnych tras, tylko
     kotwice na hubie (`ProduktCard` renderuje `id={produkt.slug}`), więc
     kolor bierzemy z kotwicy: '/produkty#<slug>' -> ton tego produktu z
     INF_PRODUKT (ten sam, co karta na /produkty i pozycja w dropdownie).
     Sam hub '/produkty' bez kotwicy leci na wspólny fallback akcentu. */
  const produkt = href.match(/^\/produkty#([^/?]+)/)?.[1];
  if (produkt) return INF_PRODUKT[produkt] ?? INF_KATEGORIA_DEFAULT;
  return INF_KATEGORIA_DEFAULT;
}

/**
 * LinkiKrzyzowe — sekcja krzyżowego linkowania poradnika do OFERTY (usługi) i
 * NARZĘDZI. Zamyka ścieżkę od treści do konwersji: czytelnik poradnika dostaje
 * jasne wejście w usługę, która rozwiązuje jego problem, i w darmowe narzędzie,
 * którym policzy to sam.
 *
 * Renderuje się tylko gdy są jakiekolwiek linki (poradnik bez powiązań -> null).
 * Wszystkie href to realne trasy/anchory (walidowane przy tworzeniu poradnika),
 * więc zero martwych linków. Linki w HTML od razu (SSG).
 *
 * v22: komponent obsługuje już CZTERY typy konsumentów (poradniki, wpisy bloga,
 * materiały, strony usług przez `components/uslugi/PodstronyPowiazane`), dlatego
 * nagłówek (`tytul`) i akapit wstępu (`wstep`) są propsami z domyślnymi
 * wartościami poradnika. Domyślne = stan sprzed v22, więc 4 poradniki renderują
 * się bez żadnej zmiany. Zero nowych klas CSS, zero drugiego renderera kafli.
 */
export function LinkiKrzyzowe({
  uslugi = [],
  narzedzia = [],
  poradniki = [],
  realizacje = [],
  produkty = [],
  tytul = 'Co zrobić z tą wiedzą?',
  wstep = 'Najpierw policz to sam darmowym narzędziem. Potem zobacz usługę, która rozwiązuje ten problem u Ciebie.',
}: {
  uslugi?: LinkKrzyzowy[];
  narzedzia?: LinkKrzyzowy[];
  /* SEO 2026-08-17: siostrzane poradniki (blok „Zobacz też" na dole sekcji). */
  poradniki?: LinkKrzyzowy[];
  /* v22 (PLAN-v22 §1.5): DOWÓD, czyli wdrożenie, na którym to działa.
     Pomiar linków przed rundą: poradnik -> realizacja 0/4, realizacja ->
     poradnik 0/8, czyli treść i dowody stały obok siebie bez ani jednego
     połączenia. Grupa jest opcjonalna, więc strony bez powiązań renderują się
     jak dotąd. */
  realizacje?: LinkKrzyzowy[];
  /* v22 (linki §3, P1 #8 i P2 #13): gotowe produkty. Hub /produkty był JEDYNĄ
     prawdziwą sierotą serwisu (zero linków redakcyjnych z jakiejkolwiek strony,
     żył wyłącznie z menu i stopki). Produkty nie mają własnych tras, więc href
     to hub albo jego kotwica '/produkty#<slug>'. */
  produkty?: LinkKrzyzowy[];
  /* v22: nagłówek sekcji. Domyślnie tekst poradnika (zero zmiany na 4
     poradnikach), ale strony usług potrzebują nagłówka opisującego to, co
     realnie w tej sekcji stoi. */
  tytul?: string;
  /* v22: akapit wprowadzający. `null` = sekcja bez akapitu (strony usług, gdzie
     lead poradnika „Najpierw policz to sam" byłby nieprawdą kontekstu). */
  wstep?: string | null;
}) {
  if (
    uslugi.length === 0 &&
    narzedzia.length === 0 &&
    poradniki.length === 0 &&
    realizacje.length === 0 &&
    produkty.length === 0
  )
    return null;

  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{tytul}</h2>
        </Reveal>
        {wstep && (
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">{wstep}</p>
          </Reveal>
        )}

        {narzedzia.length > 0 && (
          <div className="mt-8">
            <h3 className="text-h3">Policz to sam</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {narzedzia.map((link) => (
                <li key={link.href}>
                  <LinkKafel link={link} cta="Otwórz narzędzie" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {uslugi.length > 0 && (
          <div className="mt-8">
            <h3 className="text-h3">Zobacz powiązaną usługę</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {uslugi.map((link) => (
                <li key={link.href}>
                  <LinkKafel link={link} cta="Zobacz usługę" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* v22: „Zobacz to na wdrożeniu" — twardy dowód pod treścią. Ten sam
            kafel .inf-card, ton = kolor kategorii tego wdrożenia (dekorLinku).
            Zysk botowy: dodatkowy <h3> i 1-4 linki wewnętrzne w <main>. */}
        {realizacje.length > 0 && (
          <div className="mt-8">
            <h3 className="text-h3">Zobacz to na wdrożeniu</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {realizacje.map((link) => (
                <li key={link.href}>
                  <LinkKafel link={link} cta="Zobacz wdrożenie" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* v22: „Gotowe produkty" — zamknięcie sieroty /produkty. Ten sam kafel
            .inf-card, ton = kolor produktu z kotwicy (dekorLinku). */}
        {produkty.length > 0 && (
          <div className="mt-8">
            <h3 className="text-h3">Gotowe produkty</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {produkty.map((link) => (
                <li key={link.href}>
                  <LinkKafel link={link} cta="Zobacz produkt" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SEO 2026-08-17: „Zobacz też" — siostrzane poradniki cenowe na dole
            sekcji (wzorzec konkurencji: artykuły cenowe linkują się nawzajem).
            Ten sam kafel .inf-card co wyżej, ton poradnika z INF_TYP. */}
        {poradniki.length > 0 && (
          <div className="mt-8">
            <h3 className="text-h3">Zobacz też</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {poradniki.map((link) => (
                <li key={link.href}>
                  <LinkKafel link={link} cta="Przeczytaj poradnik" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}

/** Pojedynczy kafel linku krzyżowego — cała powierzchnia klikalna.
    INFINITY v5 (spec §4, treść 1:1): karta .inf-card (narożniki + sweep robi
    karta z globals) + spotlight, strzałka → .inf-arrow (dojeżdża na hover karty
    jak na kartach home).
    v7: ton karty = ton celu linku (dekorLinku wyżej), więc narożniki, lewa
    krawędź, poświata i strzałka świecą kolorem tej usługi/narzędzia, a nie
    jednym cyjanem dla całej sekcji. */
function LinkKafel({ link, cta }: { link: LinkKrzyzowy; cta: string }) {
  const dekor = dekorLinku(link.href);
  return (
    <Card
      as="article"
      variant="quiet"
      className="inf-card inf-card-full-hover relative flex h-full flex-col p-6"
      style={{ '--card-c': dekor.c, '--card-c-l': dekor.odcien ?? dekor.c } as CSSProperties}
    >
      <div aria-hidden="true" className="inf-spotlight" />
      <h4 className="text-h3">
        <Link
          href={link.href}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {link.etykieta}
        </Link>
      </h4>
      <p className="mt-2 text-body-sm text-fg-muted">{link.opis}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-caption font-semibold text-accent">
        {cta}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="inf-arrow text-accent"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Card>
  );
}
