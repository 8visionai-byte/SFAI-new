import Link from 'next/link';

/**
 * BlogBreadcrumbs — wizualna ścieżka okruszków (Strona główna / Blog / [wpis]).
 * Renderowana serwerowo (w HTML od razu), spójna 1:1 z BreadcrumbList JSON-LD
 * (te same nazwy i kolejność). `aria-current="page"` na ostatnim elemencie.
 *
 * Wzorzec 1:1 z components/uslugi/Breadcrumbs — osobny plik, bo blog ma własny
 * barrel i ścieżkę bazową, ale zachowanie i klasy są identyczne (spójność UI).
 */
type Crumb = { name: string; href?: string };

export function BlogBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ścieżka nawigacji" className="text-caption text-fg-subtle">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-x-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="underline decoration-1 underline-offset-2 hover:text-fg"
                >
                  {item.name}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-fg-muted">
                  {item.name}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-fg-subtle">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
