import type { CSSProperties } from 'react';
import { Card } from '@/components/ui';
import { DOJRZALOSC_LABEL } from '@/lib/produkty/types';
import type { Produkt } from '@/lib/produkty/types';
import { INF_PRODUKT, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * ProduktCard — karta JEDNEGO własnego produktu (opis przez funkcję).
 *
 * KPI #1: cała treść w surowym HTML przy 1. żądaniu (cytowalność dla LLM).
 * To Server Component (statyczna treść), bez własnego <li> — element listy (<li>)
 * dostarcza strona (np. `Reveal as="li"`), żeby nie zagnieżdżać <li> w <li>.
 *
 * Struktura (answer-first): badge(dojrzałość) + H3(co to robi) + nazwa robocza +
 * opis funkcji -> "Dla kogo" -> "Co daje" (oszczędność szac.) -> nuta customu ->
 * slot poglądowy na zrzut/demo (INPUT PAWŁA, NIGDY atrapa obrazka 404).
 *
 * Karta jest NIEklikalna — uczciwa afordancja: produkt nie ma jeszcze osobnej
 * podstrony, jedyne CTA strony prowadzi do #diagnoza.
 * INFINITY v5 (spec §4 — pełna spójność z home, treść 1:1): Card variant="quiet"
 * + .inf-card (narożniki + sweep robi karta z globals), dekorację niesie single
 * source INF_PRODUKT z lib/inf-kategorie (kafelek .inf-tile z UNIKALNĄ ikoną SVG
 * — v5: emoji tylko w dropdownach nav), --card-c-l = jasny odcień, badge mono
 * po prawej = ISTNIEJĄCE pole `nazwaRobocza` (jak w dropdownie Produkty, spec §2),
 * badge dojrzałości → mono .inf-tag. BEZ strzałki (karta nieinteraktywna).
 */
export function ProduktCard({ produkt }: { produkt: Produkt }) {
  const dekor = INF_PRODUKT[produkt.slug] ?? INF_KATEGORIA_DEFAULT;
  const odcien = dekor.odcien ?? dekor.c;
  return (
    <Card
      as="article"
      variant="quiet"
      className="inf-card flex h-full flex-col p-6"
      id={produkt.slug}
      style={{ '--card-c': dekor.c, '--card-c-l': odcien } as CSSProperties}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          {/* Kafelek ikony produktu — dekoracja aria-hidden (jak dropdown). */}
          <span
            aria-hidden="true"
            className="inf-tile"
            style={{ '--tile-c': dekor.c } as CSSProperties}
          >
            <InfIcon name={dekor.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
          </span>
          <span className="inf-tag">{DOJRZALOSC_LABEL[produkt.dojrzalosc]}</span>
        </span>
        {/* Badge mono nazwy roboczej w odcieniu karty (istniejące pole rejestru). */}
        {produkt.nazwaRobocza && (
          <span className="inf-tag" style={{ color: odcien }}>
            {produkt.nazwaRobocza}
          </span>
        )}
      </div>

      <h3 className="text-h3 mt-4 text-fg">{produkt.coRobi}</h3>

      <p className="mt-3 text-body-sm text-fg-muted">{produkt.opisFunkcji}</p>

      {/* Dla kogo / Co daje — etykiety pytań, treść answer-first (cytowalne). */}
      <dl className="mt-5 space-y-3">
        <div>
          <dt className="text-caption font-semibold uppercase tracking-wide text-fg-subtle">
            Dla kogo
          </dt>
          <dd className="mt-1 text-body-sm text-fg-muted">{produkt.dlaKogo}</dd>
        </div>
        <div>
          <dt className="text-caption font-semibold uppercase tracking-wide text-fg-subtle">
            Co daje
          </dt>
          <dd className="mt-1 text-body-sm text-fg-muted">{produkt.coDaje}</dd>
        </div>
      </dl>

      {/* Nuta "punkt wyjścia do customu" — uczciwy sygnał, nie pudełkowy produkt. */}
      <p className="mt-5 border-l-2 border-border-accent pl-4 text-body-sm text-fg-muted">
        {produkt.customNote}
      </p>

      {/* Slot poglądowy na zrzut/demo (INPUT PAWŁA). Uczciwy placeholder tekstowy,
          NIGDY <img> wskazujący na nieistniejący plik (404 psuje preview). */}
      <div className="mt-auto pt-6">
        <div className="rounded-md border border-dashed border-border bg-bg-subtle px-4 py-3">
          <span className="text-caption font-medium text-fg-subtle">
            [INPUT PAWŁA: zrzut/demo]
          </span>
          <p className="mt-1 text-caption text-fg-subtle">{produkt.demoHint}</p>
        </div>
      </div>
    </Card>
  );
}
