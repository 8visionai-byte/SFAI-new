import { USLUGI } from '@/lib/uslugi';
import { PRODUKTY } from '@/lib/produkty';
import { REALIZACJE, KATEGORIA_LABEL } from '@/lib/realizacje';
import { NARZEDZIA } from '@/lib/narzedzia';
import {
  INF_KATEGORIA,
  INF_KATEGORIA_DEFAULT,
  INF_PRODUKT,
  INF_NARZEDZIE,
  INF_REALIZACJA_EMOJI,
  INF_USLUGA_BADGE,
  INF_WIEDZA,
  INF_WIEDZA_BADGE,
} from '@/lib/inf-kategorie';

/**
 * INFINITY v3 — DANE dropdownów nawigacji (partia A, FUNDAMENT+NAV).
 *
 * Moduł SERWEROWY (bez 'use client'): Header (server component) woła
 * getNavDropdowns() w buildzie SSG i podaje KLIENTOWI gotowe, płaskie
 * pozycje {href, tytul, opis?, c, ikona}. Dzięki temu pełne rejestry
 * treści (REALIZACJE/PRODUKTY z długimi tekstami case'ów) NIE wchodzą do
 * bundla klienta — HeaderClient dostaje tylko stringi potrzebne w menu.
 *
 * TREŚĆ 1:1 z rejestrów (żelazna zasada: diff treści = 0).
 * v5 (spec §2) — wiersz wzorca: [NATYWNE emoji w kaflu 44px] [tytuł (+ opis
 * muted, gdy rejestr ma krótkie pole)] [BADGE mono po prawej]:
 *  - Usługi: u.h1 + badge pochodny sluga (INF_USLUGA_BADGE), BEZ opisu
 *    (rejestr nie ma krótkiego pola — nie wymyślamy),
 *  - Produkty: p.coRobi + badge p.nazwaRobocza (dawny opis wszedł na badge),
 *    link do kotwicy /produkty#slug (ProduktCard ma id={slug}),
 *  - Realizacje: r.h1 + badge KATEGORIA_LABEL[r.kategoria],
 *  - Narzędzia: n.tytul + badge n.etykieta,
 *  - Wiedza: 4 działy (Blog / Poradniki / Materiały / AI Radar) — nazwy 1:1
 *    z istniejących tras + badge typu (INF_WIEDZA_BADGE).
 * Pierwszy wiersz każdego dropdownu = link hub ("Wszystkie …") w DOM (SEO).
 */

/** Jedna pozycja dropdownu — płaska i serializowalna (props server->client). */
export type NavDropdownItem = {
  href: string;
  tytul: string;
  /** Krótki opis muted pod tytułem (tylko gdy rejestr ma krótkie pole). */
  opis?: string;
  /** Kolor kafelka (--tile-c). */
  c: string;
  /** v5: JASNY odcień kategorii — kolor badge'a (--badge-c). */
  odcien?: string;
  /** v5: NATYWNE emoji kafla (lista 1:1 ze spec v5 §2; dekoracja aria-hidden). */
  emoji: string;
  /** v5: BADGE mono po prawej — WYŁĄCZNIE istniejące krótkie pole rejestru. */
  badge?: string;
};

/** Jeden dropdown nav: label przycisku (1:1 z NAV_LINKS) + hub + pozycje. */
export type NavDropdownData = {
  /** Href huba — klucz dopasowania do NAV_LINKS i baza stanu aktywnego. */
  href: string;
  /** Etykieta przycisku nav, 1:1 z NAV_LINKS.label. */
  label: string;
  /** Tekst pierwszego wiersza-linku do huba ("Wszystkie …"). */
  hubLabel: string;
  items: NavDropdownItem[];
  /** Dodatkowe prefiksy tras zapalające stan aktywny (Wiedza: /blog itd.). */
  activePrefixes?: string[];
};

/** Buduje dane 5 dropdownów (Usługi/Produkty/Realizacje/Narzędzia/Wiedza). */
export function getNavDropdowns(): NavDropdownData[] {
  return [
    {
      href: '/uslugi',
      label: 'Usługi',
      hubLabel: 'Wszystkie usługi',
      items: USLUGI.map((u) => {
        const dekor = INF_KATEGORIA[u.slug] ?? INF_KATEGORIA_DEFAULT;
        return {
          href: `/uslugi/${u.slug}`,
          tytul: u.h1,
          c: dekor.c,
          odcien: dekor.odcien,
          emoji: dekor.emoji,
          // Badge pochodny sluga (spec v5: CHATBOT/VOICE/.../SEO); nowy slug
          // spoza mapy = wiersz bez badge'a (undefined), zero zmyślania.
          badge: INF_USLUGA_BADGE[u.slug],
        };
      }),
    },
    {
      href: '/produkty',
      label: 'Produkty',
      hubLabel: 'Wszystkie produkty',
      items: PRODUKTY.map((p) => {
        const dekor = INF_PRODUKT[p.slug] ?? INF_KATEGORIA_DEFAULT;
        return {
          // Strona /produkty to jeden listing z kotwicami (ProduktCard id={slug}).
          href: `/produkty#${p.slug}`,
          tytul: p.coRobi,
          c: dekor.c,
          odcien: dekor.odcien,
          emoji: dekor.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          // v5: nazwaRobocza przeszła z opisu na BADGE (istniejące krótkie pole).
          badge: p.nazwaRobocza,
        };
      }),
    },
    {
      href: '/realizacje',
      label: 'Realizacje',
      hubLabel: 'Wszystkie realizacje',
      items: REALIZACJE.map((r) => {
        const kat = INF_KATEGORIA[r.kategoria] ?? INF_KATEGORIA_DEFAULT;
        return {
          href: `/realizacje/${r.slug}`,
          tytul: r.h1,
          c: kat.c,
          odcien: kat.odcien,
          emoji: INF_REALIZACJA_EMOJI[r.slug] ?? INF_KATEGORIA_DEFAULT.emoji,
          // v5: etykieta kategorii przeszła z opisu na BADGE (istniejące pole).
          badge: KATEGORIA_LABEL[r.kategoria],
        };
      }),
    },
    {
      href: '/narzedzia',
      label: 'Narzędzia',
      hubLabel: 'Wszystkie narzędzia',
      items: NARZEDZIA.map((n) => {
        const dekor = INF_NARZEDZIE[n.slug] ?? INF_KATEGORIA_DEFAULT;
        return {
          // v8b (BLOKER 404): tras /narzedzia/<slug> NIE MA — hub /narzedzia to
          // jeden listing z kotwicami (app/narzedzia/page.tsx renderuje
          // <Section id={n.slug}> dla każdego narzędzia). Dropdown celuje więc
          // w kotwicę, tak jak karta na home (components/sections/NarzedziaTeaser).
          href: `/narzedzia#${n.slug}`,
          tytul: n.tytul,
          c: dekor.c,
          odcien: dekor.odcien,
          emoji: dekor.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          // v5: etykieta narzędzia przeszła z opisu na BADGE (istniejące pole).
          badge: n.etykieta,
        };
      }),
    },
    {
      href: '/wiedza',
      label: 'Wiedza',
      hubLabel: 'Całe Centrum Wiedzy',
      // Stan aktywny także na trasach działów spoza /wiedza/*.
      activePrefixes: ['/blog', '/poradniki', '/materialy', '/ai-radar'],
      // v5: emoji 1:1 ze spec (📰 📖 🧲 📡) + badge typu działu (INF_WIEDZA_BADGE).
      items: [
        {
          href: '/blog',
          tytul: 'Blog',
          c: INF_WIEDZA.blog.c,
          odcien: INF_WIEDZA.blog.odcien,
          emoji: INF_WIEDZA.blog.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          badge: INF_WIEDZA_BADGE.blog,
        },
        {
          href: '/poradniki',
          tytul: 'Poradniki',
          c: INF_WIEDZA.poradniki.c,
          odcien: INF_WIEDZA.poradniki.odcien,
          emoji: INF_WIEDZA.poradniki.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          badge: INF_WIEDZA_BADGE.poradniki,
        },
        {
          href: '/materialy',
          tytul: 'Materiały',
          c: INF_WIEDZA.materialy.c,
          odcien: INF_WIEDZA.materialy.odcien,
          emoji: INF_WIEDZA.materialy.emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          badge: INF_WIEDZA_BADGE.materialy,
        },
        {
          href: '/ai-radar',
          tytul: 'AI Radar',
          c: INF_WIEDZA['ai-radar'].c,
          odcien: INF_WIEDZA['ai-radar'].odcien,
          emoji: INF_WIEDZA['ai-radar'].emoji ?? INF_KATEGORIA_DEFAULT.emoji,
          badge: INF_WIEDZA_BADGE['ai-radar'],
        },
      ],
    },
  ];
}
