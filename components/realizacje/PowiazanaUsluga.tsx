import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { getUslugaBySlug } from '@/lib/uslugi';
import type { RealizacjaKategoria } from '@/lib/realizacje/types';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT, INF_USLUGA_BADGE } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';
import { KartaEtykieta, KartaTagi, tagiUslugi } from '@/components/sections/KartaCzesci';

/**
 * PowiazanaUsluga — SEKCJA 5 case'a: link wewnętrzny do powiązanej usługi
 * (/uslugi/<kategoria>). Linkowanie wewnętrzne pod GEO (case -> usługa): anchor =
 * H1 usługi = money query, a nie "zobacz więcej". Bot widzi link w HTML (SSG).
 *
 * Źródłem usługi jest rejestr lib/uslugi (single source) — gdy slug kategorii nie
 * ma odpowiednika w rejestrze (np. kategoria bez zbudowanej strony usługi), sekcja
 * nie renderuje się wcale (zero martwych linków, zasada żelazna sitemapy/IA).
 */
export function PowiazanaUsluga({ kategoria }: { kategoria: RealizacjaKategoria }) {
  const usluga = getUslugaBySlug(kategoria);
  if (!usluga) return null;

  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Chcesz to samo u siebie?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            To wdrożenie wyrosło z naszej usługi. Zobacz, jak działa krok po kroku
            i co możemy zbudować dla Twojej firmy.
          </p>
        </Reveal>

        {/* INFINITY v5 (spec §4): link do usługi jako karta .inf-card w kolorze
            kategorii (narożniki + sweep z globals) z kafelkiem ikony kategorii
            i strzałką .inf-arrow — wiersz jak w dropdownie wzorca. Treść 1:1.
            v7 „naczynia połączone": karta miała ton, ale nie miała reflektora —
            .inf-spotlight wchodzi PIERWSZYM dzieckiem (jest absolutny, więc nie
            staje się kolumną tego flexa). */}
        <Reveal delay={0.1}>
          <Link
            href={`/uslugi/${usluga.slug}`}
            /* v8: items-center -> items-start. Kolumna treści urosła o etykietę
               kategorii i rząd tagów, więc wyśrodkowany pionowo kafelek ikony
               odjeżdżał na środek karty zamiast stać przy etykiecie. */
            className="inf-card group mt-6 flex items-start gap-4 p-6 md:gap-5"
            style={
              {
                '--card-c': (INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT).c,
              } as CSSProperties
            }
          >
            <div aria-hidden="true" className="inf-spotlight" />

            {/* Kafelek ikony kategorii — dekoracja aria-hidden. */}
            <span
              aria-hidden="true"
              className="inf-tile shrink-0"
              style={
                {
                  '--tile-c': (INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT).c,
                } as CSSProperties
              }
            >
              <InfIcon
                name={(INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT).ikona ?? INF_KATEGORIA_DEFAULT.ikona}
              />
            </span>
            {/* v8: kolumna treści była <span>, a rząd tagów to <ul> (lista jest
                treścią, nie ozdobą) — <ul> w <span> to nieprawidłowe
                zagnieżdżenie, więc kolumna schodzi na <div>. Wewnątrz <a> to
                poprawne: <a> przyjmuje treść blokową, byle bez zagnieżdżonych
                elementów interaktywnych. */}
            <div className="min-w-0 flex-1">
              {/* v8 (spec §8 — struktura wzorca): mono ETYKIETA KATEGORII
                  w kolorze karty NAD tytułem (INF_USLUGA_BADGE, istniejąca mapa
                  krótkich etykiet pochodnych slugów). */}
              <KartaEtykieta>{INF_USLUGA_BADGE[usluga.slug] ?? usluga.slug}</KartaEtykieta>
              {/* Waga 800 jak na kafelkach usług na home (pomiary §3.2: tytuł
                  wzorca „świeci" grubością glifu, nie poświatą). */}
              <span className="mt-2 block text-body font-extrabold text-fg group-hover:text-brand">
                {usluga.h1}
              </span>
              <span className="mt-2 block text-body-sm text-fg-muted">
                {usluga.metaDescription}
              </span>
              <span className="mt-3 block text-caption text-fg-subtle">
                Zobacz, jak to działa
              </span>
              {/* v8: TAGI = money queries usługi z rejestru (realny tekst
                  w HTML dla botów na każdej stronie case'a). */}
              {/* WARIANT (a) PIGUŁKA (spec v8b §4) — ta sama usługa co kafelki
                  na home, więc ten sam model tagu. Karta jest podłużna, czyli
                  dokładnie ten przypadek z cytatu Pawła („na przykład
                  w podłużnych są po trzy"). */}
              <KartaTagi
                tagi={tagiUslugi(usluga)}
                doDolu={false}
                wariant="pigulka"
                etykietaListy={`Frazy usługi: ${usluga.h1}`}
                className="pt-[12px]"
              />
            </div>
            <span aria-hidden="true" className="inf-arrow text-accent max-sm:hidden">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
