import { USLUGI } from '@/lib/uslugi';
import { PRODUKTY } from '@/lib/produkty';
import { REALIZACJE, KATEGORIA_LABEL } from '@/lib/realizacje';
import { NARZEDZIA } from '@/lib/narzedzia';
import {
  INF_KATEGORIA,
  INF_KATEGORIA_DEFAULT,
  INF_PRODUKT,
  INF_NARZEDZIE,
  INF_REALIZACJA_IKONA,
  INF_WIEDZA,
} from '@/lib/inf-kategorie';
import type { InfIconName } from '@/components/ui/InfIcons';

/**
 * INFINITY v3 — DANE dropdownów nawigacji (partia A, FUNDAMENT+NAV).
 *
 * Moduł SERWEROWY (bez 'use client'): Header (server component) woła
 * getNavDropdowns() w buildzie SSG i podaje KLIENTOWI gotowe, płaskie
 * pozycje {href, tytul, opis?, c, ikona}. Dzięki temu pełne rejestry
 * treści (REALIZACJE/PRODUKTY z długimi tekstami case'ów) NIE wchodzą do
 * bundla klienta — HeaderClient dostaje tylko stringi potrzebne w menu.
 *
 * TREŚĆ 1:1 z rejestrów (żelazna zasada: diff treści = 0):
 *  - Usługi: u.h1 (jak dotychczasowy ServicesMenu),
 *  - Produkty: p.coRobi + nazwaRobocza (muted), link do kotwicy /produkty#slug
 *    (ProduktCard ma id={slug}),
 *  - Realizacje: r.h1 + etykieta kategorii (KATEGORIA_LABEL, muted),
 *  - Narzędzia: n.tytul + n.etykieta (muted),
 *  - Wiedza: 4 działy (Blog / Poradniki / Materiały / AI Radar) — nazwy 1:1
 *    z istniejących tras; bez listy wpisów (spec v3 §NAWIGACJA).
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
  /** Unikalny glif z InfIcons (w obrębie jednego dropdownu bez powtórek). */
  ikona: InfIconName;
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
          ikona: dekor.ikona ?? INF_KATEGORIA_DEFAULT.ikona,
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
          opis: p.nazwaRobocza,
          c: dekor.c,
          ikona: dekor.ikona,
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
          opis: KATEGORIA_LABEL[r.kategoria],
          c: kat.c,
          ikona: INF_REALIZACJA_IKONA[r.slug] ?? INF_KATEGORIA_DEFAULT.ikona,
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
          href: `/narzedzia/${n.slug}`,
          tytul: n.tytul,
          opis: n.etykieta,
          c: dekor.c,
          ikona: dekor.ikona,
        };
      }),
    },
    {
      href: '/wiedza',
      label: 'Wiedza',
      hubLabel: 'Całe Centrum Wiedzy',
      // Stan aktywny także na trasach działów spoza /wiedza/*.
      activePrefixes: ['/blog', '/poradniki', '/materialy', '/ai-radar'],
      items: [
        { href: '/blog', tytul: 'Blog', c: INF_WIEDZA.blog.c, ikona: INF_WIEDZA.blog.ikona },
        {
          href: '/poradniki',
          tytul: 'Poradniki',
          c: INF_WIEDZA.poradniki.c,
          ikona: INF_WIEDZA.poradniki.ikona,
        },
        {
          href: '/materialy',
          tytul: 'Materiały',
          c: INF_WIEDZA.materialy.c,
          ikona: INF_WIEDZA.materialy.ikona,
        },
        {
          href: '/ai-radar',
          tytul: 'AI Radar',
          c: INF_WIEDZA['ai-radar'].c,
          ikona: INF_WIEDZA['ai-radar'].ikona,
        },
      ],
    },
  ];
}
