'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollVideoBackground — GLOBALNE tło-film scrubowane scrollem (fixed, za treścią).
 *
 * Model: film NIE odtwarza się sam (nigdy nie wołamy play()). Pozycja klatki jest
 * funkcją postępu scrolla strony: góra = klatka 0, dół = ostatnia klatka. Bez
 * scrolla film stoi. Plik jest ALL-INTRA (każda klatka kluczowa) — seeking przez
 * currentTime jest natychmiastowy, bez czekania na dekodowanie GOP.
 *
 * ZASADY (spójne z VideoBackground.tsx, north star perf tego repo):
 *  • DEKORACJA: aria-hidden, pointer-events:none, -z-10 — poza drzewem
 *    dostępności i zdarzeń. Treść i jej kontrast NIE zależą od filmu:
 *    gdy film jest CIEMNY, prop scrim="light" kładzie nad nim jasny scrim
 *    (.bg-scrim-light) — to gwarancja kontrastu AA ciemnego tekstu strony.
 *  • MOBILE (<768px): <video> NIE montuje się W OGÓLE (zero wideo i zero dużych
 *    obrazów tła na mobile — twarda zasada perf; zostaje bazowy kolor --bg).
 *    SSR-safe: pierwszy render bez wideo, dołącza po potwierdzeniu desktopa.
 *  • prefers-reduced-motion: wideo montujemy (poster = statyczne tło na
 *    desktopie), ale scrub się NIE podpina i film się NIE dogrywa (oszczędność
 *    ~6 MB transferu — poster wystarcza jako statyczny kadr).
 *  • LCP: preload="none" na starcie; pełne dogranie filmu dopiero po window
 *    'load' (nie konkuruje z LCP hero o pasmo).
 *  • CPU: pętla rAF z lerp działa tylko, gdy klatka goni cel; gdy dogoni
 *    (różnica < 1/48 s), pętla gaśnie i wznawia się przy kolejnym scrollu.
 */
export type ScrollVideoBackgroundProps = {
  /** Ścieżka do mp4 ALL-INTRA (każda klatka kluczowa — warunek płynnego scrubu). */
  src: string;
  /** Klatka 0 jako poster: tło zanim film się dogra + statyczny kadr przy reduced-motion. */
  poster: string;
  /**
   * Scrim NAD filmem/posterem: 'light' = jasna zasłona (.bg-scrim-light),
   * gwarancja kontrastu AA ciemnego tekstu strony, gdy film jest ciemny.
   * Default 'none' (film jasny nie potrzebuje zasłony).
   */
  scrim?: 'light' | 'none';
};

export function ScrollVideoBackground({ src, poster, scrim = 'none' }: ScrollVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // SSG / pierwszy paint: zakładamy "nie-wideo" (mobile-first, bezpieczne dla hydration).
  const [mountVideo, setMountVideo] = useState(false);
  // Scrub tylko na desktopie bez reduced-motion (przy reduced-motion poster stoi).
  const [scrubEnabled, setScrubEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;

    const desktop = window.matchMedia('(min-width: 768px)'); // md
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      setMountVideo(desktop.matches);
      setScrubEnabled(desktop.matches && !reduce.matches);
    };
    sync();

    // Reaguj na rotację / resize / zmianę preferencji ruchu w trakcie.
    desktop.addEventListener('change', sync);
    reduce.addEventListener('change', sync);
    return () => {
      desktop.removeEventListener('change', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    // Bez scrubu nie dogrywamy filmu: poster (atrybut <video>) wystarcza jako
    // statyczny kadr, a użytkownik reduced-motion nie płaci ~6 MB za nic.
    if (!scrubEnabled) return;
    const v = videoRef.current;
    if (!v) return;

    // ── ŁADOWANIE bez konkurencji z LCP: pełny plik dopiero po window 'load'. ──
    const startLoad = () => {
      v.preload = 'auto';
      v.load();
    };
    if (document.readyState === 'complete') {
      startLoad();
    } else {
      window.addEventListener('load', startLoad, { once: true });
    }

    // ── SCRUB: pozycja klatki = f(postęp scrolla), wygładzona lerpem w rAF. ──
    let duration = 0; // znane dopiero z loadedmetadata
    let target = 0; // dokąd zmierzamy (sekundy filmu)
    let current = 0; // gdzie "jesteśmy" w lerpie
    let raf = 0;

    const step = () => {
      raf = 0;
      // Lerp = miękkie doganianie celu (scroll skacze, klatka płynie).
      current += (target - current) * 0.14;
      const diff = Math.abs(target - current);
      // Seek tylko, gdy różnica jest widzialna (> ~1 klatka; plik ma 12 fps) —
      // mniej operacji seek = mniej pracy dekodera.
      if (diff > 1 / 12) v.currentTime = current;
      // Cel dogoniony → gaś pętlę (zero kosztu CPU w spoczynku).
      // Kolejny scroll ją wznowi.
      if (diff < 1 / 24) return;
      raf = requestAnimationFrame(step);
    };

    const onScroll = () => {
      if (!duration) return; // metadane jeszcze nie dotarły
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // -0.05 s: nie celuj w sam koniec pliku (seek na duration potrafi czarno mignąć).
      target = progress * Math.max(duration - 0.05, 0);
      if (!raf) raf = requestAnimationFrame(step);
    };

    const onMeta = () => {
      duration = v.duration || 0;
      // Reload w środku strony: od razu USTAW klatkę pod bieżący scroll
      // (bez lerpa od 0 — current startuje z celu, seek natychmiastowy).
      onScroll();
      current = target;
      if (duration > 0) v.currentTime = target;
    };
    v.addEventListener('loadedmetadata', onMeta);
    if (v.readyState >= 1) onMeta(); // metadane mogły już być (cache)

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('load', startLoad);
      window.removeEventListener('scroll', onScroll);
      v.removeEventListener('loadedmetadata', onMeta);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrubEnabled]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {mountVideo ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          playsInline
          preload="none"
          tabIndex={-1}
          disablePictureInPicture
        />
      ) : null}
      {/* Scrim NAD filmem/posterem (naturalna kolejność DOM, bez -z-10 — leży
          wyżej niż <video>): jasna zasłona gwarantująca kontrast AA ciemnego
          tekstu strony, gdy film pod spodem jest ciemny. */}
      {scrim === 'light' ? <div className="absolute inset-0 bg-scrim-light" /> : null}
      {/* Warstwa bazowa POD filmem (zawsze): kolor --bg, żeby nigdy nie błysnęła
          pustka — na mobile to jest całe tło, na desktopie spód pod posterem/filmem. */}
      <div className="absolute inset-0 -z-10 bg-bg" />
    </div>
  );
}
