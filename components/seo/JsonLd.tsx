/**
 * JsonLd — uniwersalny injector <script type="application/ld+json">.
 * Renderowany serwerowo (widoczny dla botów AI bez JS).
 *
 * Bezpieczeństwo: dangerouslySetInnerHTML jest tu OK, bo wejście to nasze
 * typowane funkcje + kontrolowany frontmatter. NIGDY nie wstrzykuj tu danych
 * z formularzy / query params bez sanityzacji. To DANE, nie skrypt wykonywalny,
 * więc CSP script-src ich nie blokuje (spec 04 §6.1).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
