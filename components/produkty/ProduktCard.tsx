import { Card, Badge } from '@/components/ui';
import { DOJRZALOSC_LABEL } from '@/lib/produkty/types';
import type { Produkt } from '@/lib/produkty/types';

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
 * Karta jest NIEklikalna (variant="base") — uczciwa afordancja: produkt nie ma
 * jeszcze osobnej podstrony, jedyne CTA strony prowadzi do #diagnoza.
 */
export function ProduktCard({ produkt }: { produkt: Produkt }) {
  return (
    <Card as="article" variant="base" className="flex h-full flex-col" id={produkt.slug}>
      <div className="flex items-center justify-between gap-3">
        <Badge variant="neutral">{DOJRZALOSC_LABEL[produkt.dojrzalosc]}</Badge>
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
