import type { CSSProperties } from 'react';
import { Card } from '@/components/ui';
import { DOJRZALOSC_LABEL } from '@/lib/produkty/types';
import type { Produkt } from '@/lib/produkty/types';
import type { InfDekor } from '@/lib/inf-kategorie';
import { INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * INFINITY v2 — dekoracja kafelka per produkt (emoji + kolor z palety kategorii
 * spec; przypisanie do produktów = decyzja dekoracyjna, aria-hidden). Klucz =
 * slug z rejestru lib/produkty.
 */
const PRODUKT_DEKOR: Record<string, InfDekor> = {
  'skaner-faktur-ksef': { c: '#f59e0b', emoji: '📄' },
  'app-coachingowa-z-agentami': { c: '#a78bfa', emoji: '🤝' },
  'apka-obecnosci-skladek': { c: '#10b981', emoji: '⚡' },
  'centrum-dowodzenia': { c: '#8b5cf6', emoji: '🎙️' },
};

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
 * INFINITY v2 (sama prezentacja, treść 1:1): Card variant="quiet" + .inf-card
 * (ciemna karta wzorca, lewa krawędź --card-c), kafelek emoji aria-hidden,
 * badge dojrzałości → mono .inf-tag. BEZ błysku/strzałki (karta nieinteraktywna).
 */
export function ProduktCard({ produkt }: { produkt: Produkt }) {
  const dekor = PRODUKT_DEKOR[produkt.slug] ?? INF_KATEGORIA_DEFAULT;
  return (
    <Card
      as="article"
      variant="quiet"
      className="inf-card flex h-full flex-col p-6"
      id={produkt.slug}
      style={{ '--card-c': dekor.c } as CSSProperties}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          {/* Kafelek emoji produktu — dekoracja aria-hidden (jak dropdown). */}
          <span
            aria-hidden="true"
            className="inf-tile"
            style={{ '--tile-c': dekor.c } as CSSProperties}
          >
            {dekor.emoji}
          </span>
          <span className="inf-tag">{DOJRZALOSC_LABEL[produkt.dojrzalosc]}</span>
        </span>
        {produkt.nazwaRobocza && (
          <span className="text-caption text-fg-subtle">
            rob. {produkt.nazwaRobocza}
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
