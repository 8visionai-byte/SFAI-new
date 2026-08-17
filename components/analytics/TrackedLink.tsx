'use client';

import type { ReactNode } from 'react';

/**
 * TrackedLink — zwykły <a>, który przy kliknięciu zgłasza zdarzenie do Umami.
 *
 * PO CO OSOBNY KOMPONENT: Footer i /kontakt są komponentami SERWEROWYMI (SSG).
 * `onClick` wymaga komponentu klienckiego, a dopisanie 'use client' do stopki albo
 * do strony kontaktu wciągnęłoby całą tę gałąź do bundla JS. Ten wrapper jest
 * najmniejszym możliwym kawałkiem klienta: podmieniamy DWA linki, reszta zostaje SSG.
 *
 * WYGLĄD: renderuje dokładnie ten sam <a> z tym samym `className` co wcześniej,
 * zero własnych stylów, zero opakowań w DOM. Wygląd i układ bez zmian.
 *
 * `window.umami?.track` — zawsze przez `?.` (bloker reklam albo brak env = obiektu
 * nie ma). Klik działa niezależnie od tego, czy analityka doleciała: nie ma tu
 * preventDefault, więc `tel:` / `mailto:` odpalają się normalnie.
 */
type TrackedLinkProps = {
  /** Docelowy href, np. `mailto:...` albo `tel:...`. */
  href: string;
  /** Nazwa zdarzenia w Umami, np. 'klik_telefon'. */
  event: string;
  /** Klasy 1:1 z linkiem, który zastępujemy (zero zmian wizualnych). */
  className?: string;
  children: ReactNode;
};

export function TrackedLink({ href, event, className, children }: TrackedLinkProps) {
  return (
    <a href={href} className={className} onClick={() => window.umami?.track(event)}>
      {children}
    </a>
  );
}
