'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
/* Style wskaźnika kursora (spec v8 §7). Osobny arkusz, NIE globals.css —
   globals należy do innej partii, a te reguły i tak mają jechać wyłącznie
   w chunku orkiestratora (mobile nie pobiera ich w ogóle). */
import './kursor.css';

/**
 * MotionOrchestrator — warstwa „świeżości" (Lenis + GSAP ScrollTrigger),
 * montowana RAZ w app/layout.tsx. ŻELAZNA gwarancja zero-regresji PageSpeed:
 *
 *  • BRAMKI TWARDE (przed jakimkolwiek importem): desktop ≥1024px
 *    && brak prefers-reduced-motion && brak Save-Data. Nie spełnione → return,
 *    mobile nie ładuje ANI BAJTA lenis/gsap.
 *  • Import DYNAMICZNY dopiero PO window 'load' + requestIdleCallback
 *    (fallback setTimeout 200ms) — biblioteki lądują w osobnych lazy chunkach,
 *    poza krytyczną ścieżką renderu i poza głównym bundlem strony.
 *  • Istniejący system CSS (reveale [data-reveal], .sf-stagger, paralaksa płyt
 *    animation-timeline: view(), maszyna H1) zostaje NIETKNIĘTY — GSAP przejmuje
 *    wyłącznie elementy oznaczone klasą .gsap-owned (globals.css gasi na nich
 *    CSS-owe transition/animation, żeby scrub nie walczył z transition).
 *  • Treść/SEO bez zmian: scrub-tekst dzieli DOM na słowa DOPIERO klientowo po
 *    starcie warstwy, oryginalny string zostaje w aria-label rodzica.
 *
 * Choreografie (funkcje po komponencie): pin „Jak to działa", scrub-tekst
 * soundbite'u, głębia hero. Paralaksa płyt CSS — NIE dublowana (pkt d spec).
 *
 * Orkiestrator jest też JEDYNYM właścicielem delegacji dla całej strony
 * (tanio, bo wszystkie działają za tymi samymi bramkami):
 *  • WSKAŹNIK KURSORA (v8 §7) + reflektor kart — JEDEN pointermove ustawia
 *    pozycję kropki `.inf-kursor` i --mx/--my na hoverowanej .inf-card;
 *    ZERO listenerów per karta (kart jest ~159),
 *  • PAUZA iskier separatorów poza kadrem (jeden IntersectionObserver
 *    przełącza .is-paused na .inf-divider).
 */

/* Typy WYŁĄCZNIE type-level (erasowane w kompilacji — zero kodu w bundlu). */
type LenisType = InstanceType<typeof import('lenis').default>;
type GsapType = typeof import('gsap').gsap;
type ScrollTriggerType = typeof import('gsap/ScrollTrigger').ScrollTrigger;
type GsapContext = ReturnType<GsapType['context']>;

type MotionLayer = {
  lenis: LenisType;
  gsap: GsapType;
  ScrollTrigger: ScrollTriggerType;
};

/** Wysokość sticky headera — offset kotwic (spójny z lądowaniem pod nav). */
const ANCHOR_OFFSET = -96;

/* Dekoracje canvas 2D (INFINITY): particles tła + lemniskata hero. next/dynamic =
   OSOBNE lazy chunki, których pobranie wyzwala DOPIERO render (stan decorOn
   ustawiany w start(), czyli za bramkami + po window.load + idle). Mobile /
   reduced-motion / Save-Data nigdy nie renderuje orkiestratora (MotionGate),
   więc nie pobiera ani bajta tych chunków. Istniejąca choreografia (Lenis,
   pin, scrub-text, hero drift) NIETKNIĘTA. */
const ParticlesField = dynamic(
  () => import('./ParticlesField').then((m) => m.ParticlesField),
  { ssr: false }
);
const HeroRibbon = dynamic(
  () => import('./HeroRibbon').then((m) => m.HeroRibbon),
  { ssr: false }
);

export function MotionOrchestrator() {
  const pathname = usePathname();
  const layerRef = useRef<MotionLayer | null>(null);
  const ctxRef = useRef<GsapContext | null>(null);
  const firstPathRef = useRef(true);
  // Dekoracje canvas (particles + wstęga) — true dopiero w start(), za bramkami.
  const [decorOn, setDecorOn] = useState(false);

  /* ── Inicjalizacja warstwy (raz, za bramkami) ─────────────────────────── */
  useEffect(() => {
    // BRAMKI TWARDE — którakolwiek nie przejdzie → zero importów, zero pracy.
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;

    /* ══ WSKAŹNIK KURSORA + REFLEKTOR KART — JEDNA delegacja na cały dokument ══
       Spec v8 §7. Pomiary wzorca: raporty/pomiary-wzorca-v8.md §5 (wzorzec ma
       DWA elementy o różnej szybkości: kropkę 1:1 bez wygładzania i poświatę
       z lerpem 0,08 na klatkę). U nas rolę poświaty pełni reflektor karty
       (.inf-spotlight), więc dokładamy brakującą KROPKĘ i przyspieszamy
       reflektor. Siedzimy już ZA twardymi bramkami (desktop ≥1024px, bez
       reduced-motion, bez Save-Data), więc mobile nie płaci za to nic.

       CO SIĘ ZMIENIŁO WOBEC v7 (skarga Pawła „powinien szybciej podążać"):
       reflektor liczył się w requestAnimationFrame, czyli zawsze o klatkę za
       myszą, i do tego robił getBoundingClientRect PO zapisaniu --mx/--my,
       czyli wymuszał przeliczenie układu co klatkę. Teraz pozycja idzie na
       kartę W TYM SAMYM zdarzeniu (zero klatek opóźnienia — dokładnie tak jak
       kropka wzorca), a prostokąt karty jest CACHE'OWANY i odświeżany tylko
       przy zmianie karty, scrollu i resize. Jest więc szybciej ORAZ taniej. */
    const kursor = document.createElement('div');
    kursor.className = 'inf-kursor';
    kursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(kursor);

    /* Reguła „tu punkt rozwija się w ramkę" = reguła wzorca zmierzona na
       9 typach elementów (§5.3): wskaźnik rośnie nad tym, co KLIKALNE
       (link, przycisk i ich potomkowie), nigdy nad zwykłym tekstem.
       KSZTAŁT jest u nas KWADRATOWY, nie okrągły (spec v8b §2, cytat Pawła:
       „nie mamy nigdzie takich owalnych kształtów, bardziej kwadratowe") —
       liczby i przełączanie klasy zostają, zmienia się sam wygląd w kursor.css.
       `.inf-card` stoi w liście osobno, bo część naszych kart nie jest
       linkiem (karty AEO, karty „co potrafi Agent"), a to właśnie kafelek
       jest w cytacie Pawła („gdy myszka najeżdża na kafelek").
       POLA FORMULARZA ŚWIADOMIE POMINIĘTE: wzorzec ich nie ma na liście,
       a 40-pikselowa ramka nad inputem zasłaniałaby miejsce kursora tekstowego. */
    const KLIKALNE = 'a[href], button, summary, [role="button"], .inf-card';

    let kursorWidoczny = false;
    let spotCard: HTMLElement | null = null;
    let spotRect: DOMRect | null = null;
    let rectNieaktualny = true;

    // Scroll/resize unieważniają zapamiętany prostokąt karty (jedyne dwa
    // zdarzenia, które ruszają geometrię bez ruchu myszy).
    const onGeometria = () => {
      rectNieaktualny = true;
    };
    window.addEventListener('scroll', onGeometria, { passive: true });
    window.addEventListener('resize', onGeometria, { passive: true });

    const onPointerMove = (e: PointerEvent) => {
      // Dotyk nie ma wskaźnika (bramka wzorca @media (pointer: coarse)).
      if (e.pointerType === 'touch') return;

      // (a) KROPKA — pozycja pisana wprost z clientX/clientY, bez lerpa i bez
      //     rAF. translate3d = warstwa kompozytora, więc ruch nie kosztuje
      //     ani layoutu, ani repaintu treści pod spodem.
      kursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (!kursorWidoczny) {
        kursorWidoczny = true;
        kursor.classList.add('is-widoczny');
      }

      const target = e.target instanceof Element ? e.target : null;
      kursor.classList.toggle('is-nad', Boolean(target?.closest(KLIKALNE)));

      // (b) REFLEKTOR KARTY — --mx/--my w %, radial maluje CSS fundamentu
      //     (.inf-spotlight w globals; bez JS zostaje środek karty 50%/50%).
      const card = target?.closest<HTMLElement>('.inf-card') ?? null;
      if (card !== spotCard) {
        spotCard = card;
        rectNieaktualny = true;
        /* Barwa ramki przejmuje kolor karty (--card-c). getComputedStyle
           liczymy WYŁĄCZNIE przy zmianie karty, nigdy co zdarzenie. */
        const barwa = card ? getComputedStyle(card).getPropertyValue('--card-c').trim() : '';
        if (barwa) kursor.style.setProperty('--kursor-c', barwa);
        else kursor.style.removeProperty('--kursor-c');
      }
      if (!card) return;
      if (rectNieaktualny || !spotRect) {
        spotRect = card.getBoundingClientRect();
        rectNieaktualny = false;
      }
      if (spotRect.width === 0 || spotRect.height === 0) return;
      const mx = ((e.clientX - spotRect.left) / spotRect.width) * 100;
      const my = ((e.clientY - spotRect.top) / spotRect.height) * 100;
      card.style.setProperty('--mx', `${mx.toFixed(2)}%`);
      card.style.setProperty('--my', `${my.toFixed(2)}%`);
    };
    document.addEventListener('pointermove', onPointerMove, { passive: true });

    /* Wyjazd kursora poza okno: relatedTarget === null oznacza opuszczenie
       dokumentu (przy przejściu między elementami jest tam sąsiad). Kropka
       gaśnie, żeby nie wisiała przyklejona do krawędzi. */
    const onPointerOut = (e: PointerEvent) => {
      if (e.relatedTarget !== null) return;
      kursorWidoczny = false;
      kursor.classList.remove('is-widoczny');
    };
    document.addEventListener('pointerout', onPointerOut, { passive: true });

    let cancelled = false;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let dispose: (() => void) | null = null;

    const start = async () => {
      // Dekoracje canvas: render → dopiero teraz next/dynamic pobiera ich chunki
      // (jesteśmy już PO bramkach, PO window.load i w slocie idle).
      setDecorOn(true);
      // Lazy chunki: lenis + gsap + ScrollTrigger równolegle, poza main bundle.
      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Sygnał dla CSS: od teraz .gsap-owned ma zgaszone transition/animation.
      document.documentElement.classList.add('has-gsap');

      // LENIS — płynny scroll; pętla przez ticker GSAP (jedna pętla rAF).
      const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
      const onTick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      // Wrapper zamiast referencji wprost: ScrollTrigger.update(reset?: boolean)
      // dostawałby instancję Lenis jako truthy argument (TS + semantyka).
      lenis.on('scroll', () => ScrollTrigger.update());

      // KOTWICE: a[href^="#"] przez lenis.scrollTo z offsetem sticky headera.
      const onAnchorClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
        if (!(link instanceof HTMLAnchorElement)) return;
        // Skip-link: fokus MUSI przejść natywnie na #main (A11y) — nie ruszamy.
        if (link.classList.contains('skip-link')) return;
        const hash = link.getAttribute('href') ?? '';
        if (hash.length < 2) return;
        let target: HTMLElement | null = null;
        try {
          target = document.getElementById(decodeURIComponent(hash.slice(1)));
        } catch {
          target = null;
        }
        // Cel nie istnieje → zostawiamy dotychczasowe (natywne) zachowanie.
        if (!target) return;
        e.preventDefault();
        history.pushState(null, '', hash); // jak natywna nawigacja do kotwicy
        lenis.scrollTo(target, { offset: ANCHOR_OFFSET });
      };
      document.addEventListener('click', onAnchorClick);

      layerRef.current = { lenis, gsap, ScrollTrigger };

      // Choreografie w gsap.context → revert() przy zmianie strony sprząta
      // tweeny + ScrollTriggery i przywraca style inline jednym ruchem.
      ctxRef.current = gsap.context(() => {
        initPinJakToDziala(gsap);
        initScrubText(gsap);
        initHeroDepth(gsap);
      });
      ScrollTrigger.refresh();

      dispose = () => {
        document.removeEventListener('click', onAnchorClick);
        ctxRef.current?.revert();
        ctxRef.current = null;
        ScrollTrigger.killAll();
        gsap.ticker.remove(onTick);
        lenis.destroy();
        document.documentElement.classList.remove('has-gsap');
        layerRef.current = null;
      };
    };

    // Start DOPIERO po window 'load', potem w slocie idle (fallback 200ms).
    const whenIdle = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => void start());
      } else {
        timeoutId = setTimeout(() => void start(), 200);
      }
    };
    if (document.readyState === 'complete') {
      whenIdle();
    } else {
      window.addEventListener('load', whenIdle, { once: true });
    }

    return () => {
      cancelled = true;
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('scroll', onGeometria);
      window.removeEventListener('resize', onGeometria);
      kursor.remove();
      window.removeEventListener('load', whenIdle);
      if (idleId !== null) window.cancelIdleCallback(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
      dispose?.();
    };
  }, []);

  /* ── PAUZA ISKIER SEPARATORÓW poza kadrem (audyt H3 pkt 1 / MINOR-5) ───── */
  useEffect(() => {
    /* Na home stoi ~15 separatorów x 2 linie = do 30 nieskończonych pętli.
       Są transform-only (kompozytor), więc nie widać ich w TBT, ale tykają
       też wtedy, gdy pasek jest kilka ekranów poza widokiem — czysta strata
       baterii. JEDEN obserwator na wszystkie separatory przełącza klasę
       `is-paused` na `.inf-divider`, a CSS w globals gasi nią `animation-
       play-state` obu linii. Zero nowych komponentów, zero nowej pętli rAF.

       BRAMKI 1:1 z regułą, która w ogóle uruchamia iskrę (globals.css:
       @media (min-width:1024px) and (prefers-reduced-motion: no-preference)).
       ŚWIADOMIE BEZ bramki Save-Data: dla tych użytkowników MotionGate nie
       montuje orkiestratora, więc iskry biegną bez pauzy jak dotąd (żadnej
       regresji, ale i żadnego zysku — do raportu). */
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    let io: IntersectionObserver | null = null;
    const observed: HTMLElement[] = [];

    // Klatka zwłoki: przy nawigacji SPA template.tsx dopiero montuje nową
    // treść — bez rAF querySelectorAll trafiłby w stary albo pusty DOM.
    const raf = requestAnimationFrame(() => {
      const dividers = document.querySelectorAll<HTMLElement>('.inf-divider');
      if (dividers.length === 0) return; // podstrony bez separatorów: no-op
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            entry.target.classList.toggle('is-paused', !entry.isIntersecting);
          }
        },
        // Margines 200px: iskra rozpędza się tuż PRZED wejściem paska w kadr,
        // więc użytkownik nigdy nie widzi momentu startu animacji.
        { rootMargin: '200px 0px' }
      );
      for (const el of dividers) {
        observed.push(el);
        observer.observe(el);
      }
      io = observer;
    });

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      // Klasa to stan JS: po odpięciu obserwatora separator musi wrócić do
      // domyślnego „animacja gra", inaczej zostałby zamrożony na stałe.
      for (const el of observed) el.classList.remove('is-paused');
    };
  }, [pathname]);

  /* ── Nawigacja SPA: template.tsx re-montuje treść przy każdej ścieżce ──── */
  useEffect(() => {
    if (firstPathRef.current) {
      firstPathRef.current = false;
      return;
    }
    const layer = layerRef.current;
    if (!layer) return;
    const { lenis, gsap, ScrollTrigger } = layer;

    // Stare triggery wskazują zdemontowane węzły (w tym pin-spacer) — sprzątamy
    // PRZED przeliczeniem, inaczej refresh liczyłby martwy layout.
    ctxRef.current?.revert();
    ctxRef.current = null;

    lenis.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => {
      // Efekt odpalił się już PO wmontowaniu nowej treści — budujemy na świeżym DOM.
      ctxRef.current = gsap.context(() => {
        initPinJakToDziala(gsap);
        initScrubText(gsap);
        initHeroDepth(gsap);
      });
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  /* Dekoracje INFINITY: ParticlesField zawsze (desktop, fixed pod treścią);
     HeroRibbon (v3: animowana lemniskata) znajduje slot [data-hero-loop]
     renderowany przez Hero.tsx i portaluje do niego canvas, który płynnie
     nakrywa statyczny SVG (InfinityLoopStatic) — na podstronach bez hero
     nic nie robi. */
  if (!decorOn) return null;
  return (
    <>
      <ParticlesField />
      <HeroRibbon />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CHOREOGRAFIE — każda odporna na brak elementu (podstrony bez danej sekcji).
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * a) PIN „Jak to działa": sekcja przypięta na 140% scrolla; 3 kroki wchodzą
 * kolejno (opacity .3/y 24 → 1/0, każdy ~1/3 scrubu), wstęga-płyta dryfuje -4%.
 * Bez GSAP kroki są czytelne od początku (CSS stagger działa jak dotąd).
 */
function initPinJakToDziala(gsap: GsapType) {
  const section = document.getElementById('jak-to-dziala-pin');
  if (!section) return;
  const steps = Array.from(section.querySelectorAll<HTMLLIElement>('ol.sf-stagger > li'));
  if (steps.length === 0) return;
  const plate = section.querySelector<HTMLElement>('.sf-plate');

  // GSAP przejmuje elementy: klasa gasi CSS-owe transition/animation (globals),
  // a DOPIERO potem gsap.set nadaje stan startowy (inline bije stylesheet).
  for (const li of steps) li.classList.add('gsap-owned');
  plate?.classList.add('gsap-owned');
  gsap.set(steps, { opacity: 0.3, y: 24 });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=140%',
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
    },
  });
  steps.forEach((li, i) => {
    tl.to(li, { opacity: 1, y: 0, duration: 1 }, i); // krok i = i-ta 1/3 scrubu
  });
  if (plate) tl.to(plate, { yPercent: -4, duration: steps.length }, 0);
}

/**
 * b) SCRUB-TEKST: [data-scrub-text] dzielony klientowo na słowa (span.word,
 * aria-hidden) — pełny oryginał ląduje w aria-label rodzica (SEO/A11y 1:1,
 * prerender nietknięty). Słowa wypełniają się (opacity .18 → 1) w rytm scrolla.
 */
function initScrubText(gsap: GsapType) {
  document.querySelectorAll<HTMLElement>('[data-scrub-text]').forEach((el) => {
    if (el.dataset.scrubSplit === 'done') return;
    const original = (el.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (!original) return;

    el.setAttribute('aria-label', original);
    el.dataset.scrubSplit = 'done';

    const frag = document.createDocumentFragment();
    original.split(' ').forEach((word, i) => {
      if (i > 0) frag.appendChild(document.createTextNode(' '));
      const span = document.createElement('span');
      span.className = 'word';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = word;
      frag.appendChild(span);
    });
    el.replaceChildren(frag);

    const words = el.querySelectorAll<HTMLElement>('.word');
    gsap.set(words, { opacity: 0.18 });
    gsap.to(words, {
      opacity: 1,
      ease: 'none',
      duration: 0.6,
      stagger: 0.25, // lekki overlap — słowa „doganiają się" zamiast tykać
      scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 45%', scrub: true },
    });
  });
}

/**
 * c) HERO głębia: tło warstwic ([data-hero-field], aria-hidden) odpływa w górę
 * wolniej niż treść — y 0 → -60px między 'top top' a 'bottom top' sekcji hero.
 * UWAGA (spec v2): HeroContours wyleciał z renderu Hero.tsx, więc selektor nic
 * nie znajduje i funkcja jest bezpiecznym no-opem; zostaje jako hak, gdyby
 * [data-hero-field] wrócił na innej warstwie.
 */
function initHeroDepth(gsap: GsapType) {
  const field = document.querySelector<HTMLElement>('[data-hero-field]');
  if (!field) return;
  const trigger = field.closest('section') ?? field;
  field.classList.add('gsap-owned');
  gsap.to(field, {
    y: -60,
    ease: 'none',
    scrollTrigger: { trigger, start: 'top top', end: 'bottom top', scrub: true },
  });
}
