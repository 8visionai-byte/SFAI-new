'use client';

import { useEffect } from 'react';

/**
 * FaviconPulse — pulsujący favicon w KARCIE przeglądarki (efekt jak Perplexity).
 *
 * Życzenie Pawła: ikona w zakładce ma „żyć" (przesuwający się błysk lewo<->prawo),
 * sygnalizując, że coś się dzieje. To favicon ma pulsować, NIE strona.
 *
 * Mechanika: rysujemy JASNY zaokrąglony kafelek (favicon widoczny też na CIEMNYCH
 * paskach kart i w ciemnych aplikacjach), na nim oficjalny znak (/brand/mark-t.png)
 * na canvas 64x64, i co klatkę nakładamy przesuwający się pas światła w kolorach marki
 * (cyan -> fiolet -> zielony; tryb 'lighter' rozświetla ciemny znak neonem, a jasny
 * kafelek zostaje jasny). Podmieniamy <link rel="icon"> przez canvas.toDataURL.
 * ~12 fps (spokojnie, nie miga), pełny przelot ~2.8 s.
 *
 * Bezpiecznie:
 *  - prefers-reduced-motion -> NIE animujemy (statyczny /icon.png zostaje),
 *  - pauza gdy karta nieaktywna (document.hidden) — zero marnowania CPU,
 *  - obraz nie wczytany / błąd -> static favicon (bez animacji),
 *  - sprzątanie (raf + nasz <link>) przy unmount.
 *
 * Render: null (czysty efekt uboczny, nie zajmuje miejsca, nie blokuje treści).
 */
export function FaviconPulse() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (reduce?.matches) return; // szanujemy redukcję ruchu — statyczny favicon

    const SIZE = 64;
    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dedykowany <link rel="icon"> dla animacji (dokładany na końcu <head> — w
    // większości przeglądarek ostatni wygrywa; gdy nie, zostaje statyczny favicon).
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.setAttribute('data-favicon-pulse', '');
    document.head.appendChild(link);

    const img = new Image();
    let ready = false;
    img.onload = () => {
      ready = true;
    };
    img.onerror = () => {
      ready = false;
    };
    img.src = '/brand/mark-t.png';

    const PERIOD = 2800; // ms na pełny przelot błysku
    const MIN_FRAME = 1000 / 12; // ~12 fps
    const COLORS = ['#00D8FF', '#7A35FF', '#63F000']; // markowe: cyan, fiolet, zielony

    const TILE = '#fbfaf8'; // jasny kafelek (brand paper) — widoczny na ciemnym tle
    const R = SIZE * 0.22; // zaokrąglenie rogów (look „app icon")
    const PAD = SIZE * 0.12; // wcięcie znaku od krawędzi kafelka

    // Ścieżka zaokrąglonego kwadratu (do tła i przycięcia). roundRect jest w nowych
    // przeglądarkach; fallback do prostokąta, gdy brak.
    const roundedPath = () => {
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') ctx.roundRect(0, 0, SIZE, SIZE, R);
      else ctx.rect(0, 0, SIZE, SIZE);
    };

    let raf = 0;
    let start = 0;
    let last = -Infinity;

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!ready || document.hidden) return;
      if (!start) start = t;
      if (t - last < MIN_FRAME) return;
      last = t;

      const p = ((t - start) % PERIOD) / PERIOD; // 0..1 faza cyklu

      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.save();
      roundedPath();
      ctx.clip(); // kafelek + znak + błysk w zaokrąglonym kwadracie (rogi przezroczyste)

      // Jasny kafelek (baza widoczna na ciemnych paskach kart).
      ctx.fillStyle = TILE;
      ctx.fillRect(0, 0, SIZE, SIZE);
      // Znak (ciemny metaliczny cyrkiel) wcięty na kafelku.
      ctx.drawImage(img, PAD, PAD, SIZE - PAD * 2, SIZE - PAD * 2);

      // Pas światła lewo->prawo. 'lighter' rozświetla CIEMNY znak neonem; na jasnym
      // kafelku pozostaje jasny (nie psuje tła).
      const cx = -SIZE * 0.4 + p * SIZE * 1.8;
      const grad = ctx.createLinearGradient(cx - SIZE * 0.55, 0, cx + SIZE * 0.55, SIZE);
      const c = COLORS[Math.floor(p * COLORS.length) % COLORS.length] ?? '#7DEBFF';
      grad.addColorStop(0, c + '00');
      grad.addColorStop(0.46, c + '00');
      grad.addColorStop(0.5, c);
      grad.addColorStop(0.54, c + '00');
      grad.addColorStop(1, c + '00');

      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.restore();

      try {
        link.href = canvas.toDataURL('image/png');
      } catch {
        // np. ograniczenia bezpieczeństwa canvas — przerywamy cicho (static favicon).
        cancelAnimationFrame(raf);
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      link.remove();
    };
  }, []);

  return null;
}
