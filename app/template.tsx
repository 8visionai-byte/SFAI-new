'use client';

/**
 * Template — w odróżnieniu od layoutu re-montuje się przy KAŻDEJ nawigacji,
 * więc klasa .sf-page-enter (globals.css) odpala krótkie wejście treści (280ms)
 * → płynne przejście między zakładkami bez żadnej biblioteki animacji.
 * prefers-reduced-motion gasi animację (jawna bramka w globals.css), a treść
 * jest w HTML od razu (SSG) — boty i czytniki widzą pełną stronę bez JS.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="sf-page-enter">{children}</div>;
}
