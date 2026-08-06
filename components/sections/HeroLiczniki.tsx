import type { CSSProperties } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { USLUGI } from '@/lib/uslugi';
import { PRODUKTY } from '@/lib/produkty';
import { REALIZACJE } from '@/lib/realizacje';
import { NARZEDZIA } from '@/lib/narzedzia';
import { POSTS } from '@/lib/blog';
import { PORADNIKI } from '@/lib/poradniki';
import { MATERIALY } from '@/lib/materialy';
import { LicznikValue } from './HeroLicznikiCountUp';

/**
 * HeroLiczniki — pasek liczników hero (spec INFINITY v3 §HERO pkt 8, wzorzec
 * „11/1/190+/500+/360K+"). SERVER COMPONENT: importuje rejestry treści i liczy
 * WYŁĄCZNIE .length — ŻELAZNA zasada „zero zmyślonych liczb": każda wartość to
 * zliczenie realnych elementów strony przy buildzie. Dochodzi nowa usługa =
 * licznik rośnie sam. Rejestry NIE trafiają do bundla klienta (klientowy jest
 * tylko mikro-plik LicznikValue z count-upem — dostaje gotowe number w props).
 *
 * ETYKIETY = nazewnictwo nav 1:1 (HeaderClient: Usługi/Produkty/Realizacje/
 * Narzędzia/Wiedza) — micro-caps mono z fundamentu (.inf-counter-label).
 * „Wiedza" = wpisy blog + poradniki + materiały (bez ai-radar — spec v3).
 *
 * KOLORY: każda liczba w INNYM neonie (spec). Tokeny tam, gdzie istnieją:
 * cyan --accent, violet --accent-2, green --metal-green, amber --warning;
 * magenta #ff007f nie ma własnego tokenu (żyje tylko w --ring-gradient) —
 * hex 1:1 ze spec/wzorca, spójny z nitką lemniskaty. Liczby są DUŻE (22-28px,
 * bold 700) — próg AA dużego tekstu 3:1 spełniony na navy-950; opis pod liczbą
 * niesie czytelny --fg-muted (fundament).
 */
const LICZNIKI: readonly {
  value: number;
  label: string;
  kolor: string;
}[] = [
  { value: USLUGI.length, label: 'Usługi', kolor: 'var(--accent)' },
  { value: PRODUKTY.length, label: 'Produkty', kolor: 'var(--accent-2)' },
  // Magenta wzorca (jak nitka lemniskaty) — brak tokenu, hex ze spec v3.
  { value: REALIZACJE.length, label: 'Realizacje', kolor: '#ff007f' },
  { value: NARZEDZIA.length, label: 'Narzędzia', kolor: 'var(--metal-green)' },
  {
    value: POSTS.length + PORADNIKI.length + MATERIALY.length,
    label: 'Wiedza',
    kolor: 'var(--warning)',
  },
] as const;

export function HeroLiczniki() {
  return (
    /* Jeden Reveal eager na cały pasek (nad foldem — bez IO, nie blokuje LCP).
       Separatory pionowe robi fundament (.inf-counter + .inf-counter); gap
       arbitralny w px (pułapka repo: skala spacing to własne tokeny). */
    <Reveal
      as="ul"
      eager
      delay={0.18}
      className="mx-auto mt-9 flex max-w-[820px] flex-wrap items-start justify-center gap-x-[20px] gap-y-[16px]"
    >
      {LICZNIKI.map((l) => (
        <li
          key={l.label}
          className="inf-counter items-center text-center"
          style={{ '--counter-c': l.kolor } as CSSProperties}
        >
          <LicznikValue value={l.value} className="inf-counter-value inline-block" />
          <span className="inf-counter-label">{l.label}</span>
        </li>
      ))}
    </Reveal>
  );
}
