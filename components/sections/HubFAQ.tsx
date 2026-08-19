import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { PostFaq } from '@/lib/blog/types';
import type { InfDekor } from '@/lib/inf-kategorie';

/**
 * HubFAQ — sekcja FAQ dla stron, które nie są wpisem ani poradnikiem: hubów
 * (/wiedza, /blog, /poradniki, /materialy, /realizacje, /produkty, /narzedzia,
 * /uslugi) i /kontakt.
 *
 * DLACZEGO POWSTAŁ (PLAN-v22 §1.7b): akordeon `<details>` stoi na KAŻDEJ
 * z pięciu mierzonych podstron wzorca (od 4 do 11 sztuk), a sześć naszych hubów
 * ma dziś ZERO. To największy pojedynczy zysk botowy tej rundy: odpowiedzi
 * w HTML od pierwszego żądania, bez JS, bez bramki na klik.
 * `PostFAQ` (components/blog) zostaje tam, gdzie jest: jest przywiązany do
 * `INF_TYP.wpis` / `INF_TYP.poradnik` i do nagłówka „Najczęstsze pytania".
 * HubFAQ przyjmuje dowolny ton i dowolny tytuł, więc nie trzeba forkować.
 *
 * STRUKTURA 1:1 z `PostFAQ`: `.inf-card .inf-card-top` + `.inf-spotlight`
 * jako pierwsze dziecko + `divide-y` na osobnym dziecku (reflektor przed listą
 * dorysowałby kreskę nad pierwszym pytaniem) + natywne `<details class="sf-faq">`.
 * Zero nowych reguł CSS, zero JavaScriptu, akordeon działa bez skryptów.
 *
 * ZAKAZ ROZJAZDU SCHEMA <-> TREŚĆ: ta sama tablica `pytania` MUSI iść do
 * `faqSchemaPl(pytania, path)` z components/seo/schemas.ts. Wtedy tekst
 * w JSON-LD jest dosłownie tym samym stringiem co tekst na stronie (wzorzec
 * z `PostFAQ` i `postSchemas`), a Google nie ma czego ukarać.
 *
 * TREŚĆ ODPOWIEDZI (reguła wiążąca z planu §2.6): dopuszczalne źródła to
 * liczba policzona z rejestru, cena z listy locked, zdanie, które już stoi na
 * stronie, albo zasada z lib/site.ts. Odpowiedź bez źródła nie wchodzi.
 */
export function HubFAQ({
  pytania,
  tytul = 'Najczęstsze pytania',
  ton,
  id,
}: {
  /** Pary pytanie + odpowiedź (answer-first). Ten sam obiekt idzie do FAQPage. */
  pytania: PostFaq[];
  /** Nagłówek sekcji (H2). Domyślnie jak w `PostFAQ`. */
  tytul?: string;
  /** Ton strony (kolor działu). Bez niego karta świeci akcentem marki. */
  ton?: InfDekor;
  /** Opcjonalna kotwica, gdy strona linkuje do swojego FAQ. */
  id?: string;
}) {
  if (pytania.length === 0) return null;

  const styl = ton
    ? ({ '--card-c': ton.c, '--card-c-l': ton.odcien ?? ton.c } as CSSProperties)
    : undefined;

  return (
    <Section tone="subtle" id={id}>
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{tytul}</h2>
        </Reveal>

        <div className="inf-card inf-card-top mt-8 p-6" style={styl}>
          <div aria-hidden="true" className="inf-spotlight" />

          <div className="divide-y divide-border">
            {pytania.map((item, i) => (
              <Reveal key={item.pytanie} delay={Math.min(i * 0.03, 0.15)}>
                <details className="sf-faq group py-2">
                  <summary className="-mx-2 flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm px-2 py-4 text-body font-semibold text-fg transition-colors duration-fast hover:bg-bg-subtle [&::-webkit-details-marker]:hidden">
                    <h3 className="font-sans !font-semibold !text-fg [text-wrap:wrap] group-open:!text-accent">{item.pytanie}</h3>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-fg-subtle transition-transform duration-base ease-out group-hover:scale-105 group-open:rotate-45 group-open:text-accent"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </summary>
                  <p className="pb-4 pr-9 text-body-sm text-fg-muted">{item.odpowiedz}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
