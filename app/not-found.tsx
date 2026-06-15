import type { Metadata } from 'next';
import { Section, Button } from '@/components/ui';

/**
 * 404 — noindex (strona bledu nie powinna trafic do indeksu wyszukiwarki/AI).
 * Next.js i tak zwraca status 404, ale meta robots noindex jest jawnym sygnalem.
 */
export const metadata: Metadata = {
  title: 'Nie znaleziono strony',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main">
      <Section tone="base" containerWidth="narrow" className="text-center">
        <p className="text-overline uppercase text-accent mb-3">Błąd 404</p>
        <h1 className="text-h1 mb-4">Tej strony nie ma</h1>
        <p className="text-lead text-fg-muted mb-7">
          Strona mogła zmienić adres albo nigdy nie istniała. Wróć na start i
          znajdź to, czego szukasz.
        </p>
        <Button variant="primary" href="/">
          Wróć na stronę główną
        </Button>
      </Section>
    </main>
  );
}
