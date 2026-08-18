import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { TabelaRender } from '@/components/blog/TabelaRender';
import { KATEGORIA_LABEL } from '@/lib/realizacje/types';
import type { Realizacja } from '@/lib/realizacje/types';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * KartaWdrozenia — metryczka case'a jako PRAWDZIWA `<table>` (PLAN-v22 §1.7c).
 *
 * DLACZEGO POWSTAŁA. Pomiar GPTBotem przed rundą: osiem stron realizacji miało
 * 0 tabel i 0 `<h3>`. Tymczasem tabela faktów jest nadreprezentowana w cytatach
 * modeli, a case study to gatunek, który z natury jest zbiorem par
 * klucz-wartość (kto, z jakiej branży, w jakim obszarze, z jakim wynikiem).
 * Dotąd te fakty leżały rozsypane: klient i branża w mikrotekście hero, obszar
 * w badge'u, liczby w kaflach efektu. Tabela zbiera je w jedno miejsce, które
 * bot potrafi zacytować jednym kęsem.
 *
 * ŻELAZNE: ANI JEDNEGO NOWEGO STRINGA TREŚCI. Wszystkie wiersze to istniejące
 * pola rejestru:
 *   Klient  -> `klient`            (anonim zostaje anonimem, zero zmyślonych nazw)
 *   Branża  -> `branza`
 *   Obszar  -> `KATEGORIA_LABEL[kategoria]` (ta sama etykieta co badge w hero)
 *   ...     -> po jednym wierszu na `efekt.metryki[i]` (etykieta -> wartość)
 * Nagłówki kolumn i `<caption>` to jedyne słowa dopisane przez ten komponent,
 * i są opisem tabeli, nie faktem o wdrożeniu.
 *
 * DUBLOWANIE LICZB JEST CELOWE. Metryki stoją też w `RealizacjaEfekt` jako
 * kafle-bohaterowie. Tu wracają w formie, którą czyta maszyna: wiersz tabeli
 * z jawnym powiązaniem etykieta-wartość. Ten sam fakt w dwóch formach nie jest
 * powtórką treści, tylko drugą ścieżką odczytu (człowiek patrzy na kafel, bot
 * parsuje `<th scope="row">`).
 *
 * RENDER: `TabelaRender` (components/blog), czyli DOKŁADNIE ten sam kod, co
 * tabele w treści wpisów i materiałów — `scope` na nagłówkach, min-width liczone
 * z liczby kolumn, poziomy scroll w opakowaniu z rolą i nazwą regionu (WCAG
 * 2.1.1), widoczny `<caption>`. Zero nowych reguł CSS.
 */
export function KartaWdrozenia({ realizacja }: { realizacja: Realizacja }) {
  const dekor = INF_KATEGORIA[realizacja.kategoria] ?? INF_KATEGORIA_DEFAULT;

  /* Wiersze WYŁĄCZNIE z pól rejestru. Kolejność: najpierw kto i gdzie,
     potem obszar, na końcu twarde liczby efektu (tak samo czyta się case). */
  const wiersze: string[][] = [
    ['Klient', realizacja.klient],
    ['Branża', realizacja.branza],
    ['Obszar', KATEGORIA_LABEL[realizacja.kategoria]],
    ...realizacja.efekt.metryki.map((m) => [m.etykieta, m.wartosc]),
  ];

  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          {/* H3, nie H2: karta jest metryczką sekcji „co to dało", a nie nowym
              rozdziałem case'a. Zysk botowy §5.2 planu: 8 szablonów realizacji
              wchodzi w rundę z zerem <h3> w <main>. */}
          <h3 className="text-h3">Karta wdrożenia w skrócie</h3>
        </Reveal>

        <Reveal delay={0.05}>
          <div
            className="inf-card inf-card-top mt-5 p-5 md:p-6"
            style={
              {
                '--card-c': dekor.c,
                '--card-c-l': dekor.odcien ?? dekor.c,
              } as CSSProperties
            }
          >
            <div aria-hidden="true" className="inf-spotlight" />
            <TabelaRender
              naglowki={['Co', 'Wartość']}
              wiersze={wiersze}
              podpis={`Karta wdrożenia: ${realizacja.h1}`}
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
