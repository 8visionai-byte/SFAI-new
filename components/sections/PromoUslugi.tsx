import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { getUslugaBySlug } from '@/lib/uslugi';
import type { Usluga } from '@/lib/uslugi';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT, INF_USLUGA_BADGE } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';
import { KartaEtykieta, KartaTagi, tagiUslugi } from '@/components/sections/KartaCzesci';

/**
 * SEKCJA — PROMO GŁÓWNYCH USŁUG (INFINITY v4, spec §PARTIA C pkt 1).
 *
 * NOWA opowieść home (decyzja Pawła): ZARAZ PO HERO kafelki głównych usług
 * wg SEO — układ wzorca (EU-Act-Hub full + dwie połówki):
 *   chatboty        = karta PEŁNEJ szerokości,
 *   voiceboty       = połówka,
 *   audyt-ai        = połówka,
 *   architekci-wartosci-ai = CIENKA karta full pod spodem (usługa do promowania).
 *
 * TREŚĆ 1:1 z rejestru USLUGI (u.h1 + u.metaDescription) — ZERO nowych stringów.
 * Wyjątek konieczny: architekci-wartosci-ai CELOWO nie jest w rejestrze
 * lib/uslugi (strona-parasol, patrz komentarz w jej page.tsx), więc karta
 * bierze 1:1 metaTitle + metaDescription z app/uslugi/architekci-wartosci-ai/
 * page.tsx (stałe niżej, kopiowane co do znaku — przy zmianie tamtej strony
 * zaktualizować TU).
 *
 * INFINITY v8 (spec §8, cytat Pawła o strukturze kart wzorca): karta usługi
 * jedzie w pełnym układzie wzorca — [mono etykieta kategorii w kolorze karty]
 * -> [biały tytuł] -> [szary opis] -> [TAGI na dole]. Etykieta = INF_USLUGA_BADGE
 * (istniejąca mapa krótkich etykiet pochodnych slugów, „CHATBOT"/„VOICE"),
 * a NIE surowy slug: krótka i czytelna, ten sam język co badge w dropdownie nav.
 * TAGI = money queries z rejestru (`usluga.queries`, te same frazy, które lecą
 * do `keywords` w JSON-LD) — realny tekst w HTML dla botów, ZERO nowych słów.
 * Karta usługi to karta KATEGORII (reprezentuje rzecz), więc IKONĘ ZACHOWUJE
 * (pomiary wzorca §3.5: ikonę dostaje karta rzeczy, nie karta tekstowa).
 *
 * DEKORACJA (nie treść): kafelek InfIcon w kolorze bazowym; strzałka
 * .inf-arrow dojeżdża na hover karty (reguła .inf-card .inf-arrow z globals).
 * Rozbłysk sweep robi ::after samej .inf-card (v4) — bez dodatkowych divów.
 * Odcienie kart w JEDNYM gridzie RÓŻNIĄ się (spec §C pkt 5): każda usługa ma
 * inną kategorię, więc różnicowanie niesie rejestr INF_KATEGORIA.
 * Tagi z kapsuły ŚWIADOMIE pominięte: kapsuła to 40-60 słów ciągłej prozy,
 * nie krótkie frazy (spec: „tagi z kapsuły JEŚLI krótkie" — nie są).
 */

/** Slugi trzech usług promowanych kafelkami (kolejność = układ siatki). */
const PROMO_SLUGI = ['chatboty', 'voiceboty', 'audyt-ai'] as const;

/**
 * Architekci Wartości AI — stringi 1:1 z metadata strony-parasola
 * app/uslugi/architekci-wartosci-ai/page.tsx (buildMetadata title/description).
 */
const ARCHITEKCI = {
  href: '/uslugi/architekci-wartosci-ai',
  tytul: 'Architekci Wartości AI: wdrożenie AI rozliczane za efekt',
  opis:
    'Rozliczamy się za przyniesioną wartość, nie za godziny. Sprawdzamy, gdzie tracisz pieniądze, robimy jeden proces na próbę, decydujesz. Darmowa diagnoza, pełny jawny cennik od 0 zł.',
} as const;

/** Jedna karta usługi: full (pełna szerokość, większy tytuł) lub połówka. */
function PromoKarta({ usluga, full = false }: { usluga: Usluga; full?: boolean }) {
  const kat = INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT;
  const odcien = kat.odcien ?? kat.c;
  /* v7 audyt H3 (MINOR-2): kontrakt w app/globals.css (reguła .inf-card-lg)
     wymienia „promo usług" wprost jako KARTY-BOHATERÓW, a tu stało samo
     .inf-card — hover szedł liczbami lżejszego wariantu (-4px zamiast -5px
     + scale). Modyfikator dostają WSZYSTKIE kafelki tej sekcji, nie tylko
     `full`: siedzą w jednym gridzie, więc różne liczby hoveru czytałyby się
     jako niedoróbka („naczynia połączone"). */
  return (
    /* v11 spec A (mapa sekcja->wariant, raporty/taksonomia-ramek-v11.md §A):
       pas promo pod hero = WARIANT W3 wzorca (.lp-promo-card: gradientowy ring
       od narożnika, błysk przez całą kartę na hover, ramka z każdej strony,
       strzałka w pełnym kolorze). Klasa .inf-card-full-hover = kontrakt
       partii A (globals: WARIANTY RAMEK v11). Modyfikator .inf-card-lg
       SCHODZI z kafli tej sekcji: zasada łączenia partii A mówi wprost
       „-full-hover z -lg NIE (inna gramatyka hoveru)". */
    <li
      className={full ? 'inf-card inf-card-full-hover md:col-span-2' : 'inf-card inf-card-full-hover'}
      style={{ '--card-c': kat.c, '--card-c-l': odcien } as CSSProperties}
    >
      {/* Reflektor za kursorem: pozycję (--mx/--my) ustawia JEDEN delegowany
          pointermove z MotionOrchestrator (desktop). Dekoracja aria-hidden. */}
      <div aria-hidden="true" className="inf-spotlight" />
      <Link
        href={`/uslugi/${usluga.slug}`}
        className={`group flex h-full flex-col ${full ? 'p-6 md:p-8' : 'p-6'}`}
      >
        {/* Wiersz dekoracji: kafelek ikony + mono overline slugu w odcieniu
            + strzałka (widoczna na hover karty; mobile zawsze). */}
        <span className="flex items-center gap-3">
          {/* v5 (spec §3 KAFELKI) — hover ikony robi CSS w globals; kontrakt
              SCALONY (koniec app/globals.css): .inf-card:hover .inf-tile =
              rotate(-15deg) scale(1.15) + brightness(1.35); RM: bez transform. */}
          <span
            aria-hidden="true"
            className="inf-tile"
            style={{ '--tile-c': kat.c } as CSSProperties}
          >
            <InfIcon name={kat.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
          </span>
          {/* v8: mono ETYKIETA KATEGORII (wzorzec: status/kategoria na górze
              karty, w jej kolorze) — krótka etykieta z INF_USLUGA_BADGE zamiast
              surowego sluga. Koloru NIE wpisujemy inline: niesie go reguła
              `.inf-card .inf-overline` z globals (partia B1), a odcien karta
              podaje w --card-c-l (patrz style karty wyżej). */}
          <KartaEtykieta>{INF_USLUGA_BADGE[usluga.slug] ?? usluga.slug}</KartaEtykieta>
          {/* v5 (spec §3 KAFELKI): strzałka hover w KOLORZE karty (--card-c-l)
              — utility arbitralne bije warstwę components (kolor nie wraca do
              accentu/fg-muted z reguł hover globals). */}
          <span
            aria-hidden="true"
            className="inf-arrow ml-auto text-[color:var(--card-c-l,var(--accent))]"
          >
            →
          </span>
        </span>
        {/* Tytuł karty = h1 usługi (money query 1:1); h2 — sekcja nie ma
            własnego nagłówka (kafelki wchodzą od razu po hero, spec v4). */}
        {/* Waga 800: pomiary §3.2 — tytuł wzorca nie ma poświaty, „świeci"
            grubością glifu (900 przy karcie bohatera). H2 bazowo ma 700. */}
        <h2 className={`${full ? 'text-h2' : 'text-h3'} mt-4 font-extrabold text-fg`}>
          {usluga.h1}
        </h2>
        <p className="mt-2 text-body-sm text-fg-muted">{usluga.metaDescription}</p>
        {/* v8: TAGI na dole karty (wzorzec §3.4, margin-top:auto). Treść =
            money queries usługi z rejestru — realny tekst w HTML, który bot
            czyta razem z H2 i opisem. Zero nowych stringów.
            WARIANT (a) PIGUŁKA (spec v8b §4): karta usługi reprezentuje RZECZ
            DO KUPIENIA i ma ikonę — model wzorca dla kart narzędzi. */}
        <KartaTagi
          tagi={tagiUslugi(usluga)}
          wariant="pigulka"
          etykietaListy={`Frazy usługi: ${usluga.h1}`}
        />
      </Link>
    </li>
  );
}

export function PromoUslugi() {
  // Rejestr = źródło prawdy; nieznany slug po prostu nie renderuje karty.
  const uslugi = PROMO_SLUGI
    .map((slug) => getUslugaBySlug(slug))
    .filter((u): u is Usluga => Boolean(u));

  return (
    <Section tone="base" space="md">
      {/* Kaskadę wejścia robi .sf-stagger (jeden obserwator na siatce). */}
      {/* v10 §6: gap kart 32 -> 20px klasą-kontraktem partii A .inf-grid-gap
          (pomiar wzorca §3: .lp-primary-grid 2-kol. 20px). */}
      <Reveal as="ul" className="sf-stagger inf-grid-gap grid md:grid-cols-2">
        {uslugi.map((u, i) => (
          <PromoKarta key={u.slug} usluga={u} full={i === 0} />
        ))}

        {/* CIENKA karta full: Architekci Wartości AI (parasol do promowania).
            Dekor spoza rejestru kategorii -> fallback akcentu (INF_KATEGORIA_DEFAULT).
            v7 audyt H3 (MINOR-2): .inf-card-lg jak reszta kafelków tej sekcji —
            to nadal karta pełnej szerokości w tym samym gridzie. */}
        <li
          className="inf-card inf-card-full-hover md:col-span-2"
          style={
            {
              '--card-c': INF_KATEGORIA_DEFAULT.c,
              '--card-c-l': INF_KATEGORIA_DEFAULT.odcien,
            } as CSSProperties
          }
        >
          <div aria-hidden="true" className="inf-spotlight" />
          <Link
            href={ARCHITEKCI.href}
            className="group flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-5"
          >
            {/* Kafelek ikony (dekoracja aria-hidden). */}
            <span
              aria-hidden="true"
              className="inf-tile shrink-0"
              style={{ '--tile-c': INF_KATEGORIA_DEFAULT.c } as CSSProperties}
            >
              <InfIcon name={INF_KATEGORIA_DEFAULT.ikona} />
            </span>
            <span className="min-w-0 flex-1">
              {/* Ta sama waga co tytuły trzech kafelków wyżej: karty stoją
                  w JEDNYM gridzie, więc lżejszy tytuł czytałby się jak
                  niedoróbka („naczynia połączone"). */}
              <h2 className="text-ui font-extrabold text-fg">{ARCHITEKCI.tytul}</h2>
              <p className="mt-1 text-body-sm text-fg-muted">{ARCHITEKCI.opis}</p>
            </span>
            {/* v5 (spec §3 KAFELKI): strzałka w kolorze karty (--card-c-l). */}
            <span
              aria-hidden="true"
              className="inf-arrow text-[color:var(--card-c-l,var(--accent))] max-sm:hidden"
            >
              →
            </span>
          </Link>
        </li>
      </Reveal>
    </Section>
  );
}
