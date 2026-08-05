'use client';

import { useEffect, useState } from 'react';

/**
 * HeroPersonaCycler — jedno słowo/fraza w podtytule hero cykluje co ~5.2 s
 * z subtelnym fade (personalizacja językiem, NIE behawioralna = RODO-safe).
 *
 * WERSJA bez framer-motion: zmiana indeksu remountuje span (key={index}), a wejście
 * gra czysty CSS (@keyframes sfPersonaIn). reduced-motion / przed hydracją => statyczny
 * pierwszy wariant (SSR-safe: bot widzi pełne zdanie).
 */
const PERSONAS = [
  'salonu, w którym telefon dzwoni, gdy masz nożyczki w ręku',
  'firmy budowlanej, gdzie wyceny giną w SMS-ach',
  'gabinetu, w którym ktoś musi odbierać i umawiać wizyty',
  'e-commerce, gdzie te same pytania wracają 100 razy dziennie',
  'biura, w którym faktury i maile zjadają pół dnia',
] as const;

const INTERVAL = 5200;

export function HeroPersonaCycler() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    setAnimate(true);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PERSONAS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  // INLINE, nie inline-block: atomowy inline-block spychał CAŁĄ frazę do nowej
  // linii („…dla" zostawało samo), a kropka po komponencie łamała się do trzeciej
  // (zrzut Pawła 2026-08-05). Zwykły inline płynie ze zdaniem i łamie się po
  // słowach jak tekst. Animacja wejścia zostaje na opacity (transform i tak nie
  // działa na inline — sfPersonaIn degraduje się do czystego fade, to wystarcza).
  return (
    <span className="relative">
      <span key={index} className={animate ? 'sf-persona-swap text-fg' : 'text-fg'}>
        {PERSONAS[index]}
      </span>
    </span>
  );
}
