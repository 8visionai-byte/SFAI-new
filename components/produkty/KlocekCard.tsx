import type { CSSProperties } from 'react';
import Link from 'next/link';
import type { Klocek } from '@/lib/produkty';
import { KLOCEK_TON, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * KlocekCard — kafel JEDNEGO klocka-możliwości.
 *
 * v24 (Paweł 2026-08-21) — TRZY ZMIANY, wszystkie z jego uwag do zrzutów:
 *
 * 1. „startowe kolory tutaj w ogóle nie istnieją" oraz „nic się na nich nie
 *    dzieje". PRZYCZYNA ZNALEZIONA W NASZYM CSS: wariant `.inf-card-quiet` ma
 *    w komentarzu wprost „to jedyny wariant, gdzie kolor wchodzi dopiero
 *    hoverem", a ramka stoi na bieli 4%. Karta wyglądała więc na martwą, póki
 *    kursor na nią nie wjechał. Teraz `.inf-card-neon`: kolor z palety widoczny
 *    W SPOCZYNKU, a hover go PODBIJA i przepuszcza szybki błysk w obie strony.
 *
 * 2. „to powinny być linki, że klikam agent obsługi i bach, wchodzę do tego
 *    agenta obsługi i on jest tam opisany" — karta jest teraz <a> prowadzącym
 *    do miejsca, gdzie ten klocek jest realnie opisany (pole `href` rejestru).
 *    Klocek bez `href` renderuje się jak dotąd, jako zwykły <article>.
 *
 * 3. Ikona z palety klocka (dotąd kafel szedł bez żadnego glifu).
 *
 * Kolor to WYŁĄCZNIE dekoracja (custom property), nie treść. Hexy siedzą
 * w rejestrze `lib/inf-kategorie` (KLOCEK_TON) — reguła z PALETA-NEON.md.
 *
 * Server Component, bez własnego <li> — element listy dostarcza strona
 * (`Reveal as="li"`). `indeks` = pozycja w katalogu, steruje wyłącznie tonacją.
 */
export function KlocekCard({ klocek, indeks = 0 }: { klocek: Klocek; indeks?: number }) {
  const dekor = KLOCEK_TON[indeks % KLOCEK_TON.length] ?? INF_KATEGORIA_DEFAULT;
  const styl = { '--card-c': dekor.c, '--card-c-l': dekor.odcien ?? dekor.c } as CSSProperties;
  /* Karta klikalna dostaje `.inf-card-full-hover` (ring + strzałka w prawo),
     bo dopiero wtedy wygląd niesie afordancję „to jest link". */
  const klasy = `inf-card inf-card-neon relative h-full p-6${klocek.href ? ' inf-card-full-hover' : ''}`;

  const srodek = (
    <>
      <div aria-hidden="true" className="inf-spotlight" />
      <span className="flex items-center gap-3">
        <span aria-hidden="true" className="inf-tile" style={{ '--tile-c': dekor.c } as CSSProperties}>
          <InfIcon name={dekor.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
        </span>
        {klocek.href && (
          <span aria-hidden="true" className="inf-arrow ml-auto text-[color:var(--card-c-l,var(--card-c))]">
            →
          </span>
        )}
      </span>
      {/* F2: `font-bold`, nie `font-semibold`. Reguła wagi tytułu karty
          w globals zeszła z :is() (0,1,1) na :where() (0,1,0), żeby markup
          realnie decydował — od tej chwili KAŻDE utility wagi wygrywa. */}
      <h3 className="text-body mt-3 font-bold text-fg">{klocek.nazwa}</h3>
      <p className="mt-2 text-body-sm text-fg-muted">{klocek.opis}</p>
    </>
  );

  if (klocek.href) {
    return (
      <Link href={klocek.href} className={`${klasy} flex flex-col`} style={styl}>
        {srodek}
      </Link>
    );
  }
  return (
    <article className={klasy} style={styl}>
      {srodek}
    </article>
  );
}
