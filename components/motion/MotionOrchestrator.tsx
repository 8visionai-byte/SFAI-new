'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

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

/* Dekoracje canvas 2D (INFINITY): particles tła + wstęga hero. next/dynamic =
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
      window.removeEventListener('load', whenIdle);
      if (idleId !== null) window.cancelIdleCallback(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
      dispose?.();
    };
  }, []);

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
     HeroRibbon sam znajduje sekcję hero (h1[data-writing]) i portaluje do niej
     canvas — na podstronach bez hero nic nie robi. */
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
