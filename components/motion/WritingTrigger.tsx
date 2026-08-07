'use client';

import { useEffect, useRef } from 'react';

/**
 * WritingTrigger — maszyna do pisania H1 (jak w oknie czatu): po wejściu w widok
 * litery pojawiają się kolejno (klasa .typed), a tuż za ostatnią miga pionowy
 * kursor (.sf-caret). Płynnie, bez „kafelków" i bez neonowego flasha.
 *
 * PRZYWRÓCONY decyzją Pawła (2026-08-03) — to sygnatura hero i miała zostać.
 *
 * v6 (spec §PARTIA B pkt 1) — NAPRAWIONY START, mechanizm pisania NIETYKALNY:
 * po v5 blob agenta zepchnął H1 tak, że był częściowo widoczny już przy
 * załadowaniu → stary IO (threshold .25, rootMargin -10%) odpalał pisanie
 * natychmiast po hydration i animacja KOŃCZYŁA SIĘ, zanim użytkownik spojrzał.
 * Nowe bramki startu:
 *  - H1 w viewporcie przy mount => start z opóźnieniem ~700 ms od hydration
 *    (litery ukrywają się dopiero w momencie startu — LCP bez zmian, stan
 *    bazowy HTML to pełny napis),
 *  - H1 poza viewportem => IO threshold .35 BEZ ujemnego rootMargin (start,
 *    gdy H1 realnie wjedzie w widok),
 *  - fallback: passive scroll-listener, gdyby IO nie strzelił (znany przypadek
 *    zamrożonych kart) — przed double-startem chroni data-written.
 *
 * Zero renderu wizualnego (pusty aria-hidden span, display:none). Reduced-motion =>
 * nic nie robi (napis od razu pełny). Gdy JS się nie wykona => napis też pełny i
 * czytelny (stan bazowy bez .is-typing). Fail-safe + GEO (tekst w DOM od początku).
 */
export function WritingTrigger() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const h1 = ref.current?.closest('[data-writing]') as HTMLElement | null;
    if (!h1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (h1.dataset.written === '1') return;

    const SPEED = 48; // ms na literę (premium: spokojne, deliberatne pisanie ~21 zn/s; LCP-neutralne, główny wątek nietknięty)
    let timer = 0;

    const start = () => {
      if (h1.dataset.written === '1') return;
      h1.dataset.written = '1';
      const letters = Array.from(
        h1.querySelectorAll<HTMLElement>('.sf-write-letter')
      );
      if (letters.length === 0) return;

      h1.classList.add('is-typing'); // ukrywa jeszcze-nienapisane litery
      let i = 0;
      const step = () => {
        if (i > 0) letters[i - 1]?.classList.remove('sf-caret');
        if (i < letters.length) {
          const el = letters[i];
          if (el) el.classList.add('typed', 'sf-caret');
          i += 1;
          timer = window.setTimeout(step, SPEED);
        } else {
          // Koniec: kursor miga chwilę na końcu, potem wracamy do spoczynku.
          timer = window.setTimeout(() => {
            letters[letters.length - 1]?.classList.remove('sf-caret');
            h1.classList.remove('is-typing');
          }, 1350);
        }
      };
      step();
    };

    // ── BRAMKI STARTU v6 (mechanizm pisania wyżej — NIETYKALNY) ──────────────
    let delayTimer = 0;
    let io: IntersectionObserver | null = null;
    let onScroll: (() => void) | null = null;
    const removeScroll = () => {
      if (onScroll) {
        window.removeEventListener('scroll', onScroll);
        onScroll = null;
      }
    };

    const isVisible = () => {
      const r = h1.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    /* Czekaj, aż H1 wjedzie w widok, i wtedy pisz. Obserwator (threshold .35,
       bez ujemnego rootMargin) ORAZ zapasowy nasłuch scrolla — obie drogi
       kończą się tym samym start(), a przed podwójnym startem chroni
       data-written. Zapas nie jest ozdobą: IntersectionObserver nie strzela,
       gdy karta przeglądarki nie renderuje klatek (zmierzone w tym repo),
       a wtedy H1 zostałby bez animacji na zawsze. */
    const czekajNaWidocznosc = () => {
      const odpal = () => {
        start();
        io?.disconnect();
        removeScroll();
      };
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              odpal();
              break;
            }
          }
        },
        { threshold: 0.35 }
      );
      io.observe(h1);
      onScroll = () => {
        if (isVisible()) odpal();
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    };

    if (isVisible()) {
      // H1 widoczny już przy załadowaniu (blob agenta go nie chowa w całości):
      // start ~700 ms od hydration — użytkownik zdąży zobaczyć początek pisania.
      // Warunek sprawdzany PONOWNIE w momencie startu: jeśli w tym oknie strona
      // przewinęła się niżej albo układ dopiero się ułożył (fonty, canvas bloba)
      // i H1 zjechał pod zgięcie, pisanie poleciałoby poza ekranem, czyli
      // dokładnie ten bug, który naprawiamy. Wtedy czekamy na widoczność.
      delayTimer = window.setTimeout(() => {
        if (isVisible()) start();
        else czekajNaWidocznosc();
      }, 700);
    } else {
      czekajNaWidocznosc();
    }

    return () => {
      io?.disconnect();
      removeScroll();
      window.clearTimeout(delayTimer);
      window.clearTimeout(timer);
    };
  }, []);

  return <span ref={ref} aria-hidden="true" style={{ display: 'none' }} />;
}
