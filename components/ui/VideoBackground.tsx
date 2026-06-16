'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * VideoBackground — dekoracyjna warstwa tła ZA treścią (CWV- i a11y-safe).
 *
 * ZASADY (nienegocjowalne, spec north star):
 *  • Treść (children) ZAWSZE renderuje się w surowym HTML nad tłem i jest
 *    cytowalna dla botów. Wideo/gradient są WYŁĄCZNIE dekoracją — nie niosą treści.
 *  • Kontrast WCAG AA gwarantuje scrim (overlay), nie samo wideo. Domyślnie scrim
 *    włączony. Wyłączasz go tylko gdy children mają własne, pewne tło/kontrast.
 *  • prefers-reduced-motion → wideo się NIE odtwarza (statyczny poster lub
 *    gradient). Animacja gradientu jest gaszona globalną bramką w globals.css.
 *  • MOBILE (< md / 768px) → wideo się NIE montuje (oszczędność baterii i
 *    transferu). Pokazujemy poster (jeśli jest) albo metaliczny gradient.
 *
 * RENDER:
 *  • brak `src` (stan obecny, Paweł dograł mp4 później) → animowany metaliczny
 *    gradient `.bg-metal-sheen` (niebieski → fiolet → zielony + srebrny połysk).
 *  • `src` jest → <video muted loop autoPlay playsInline preload="none" poster>
 *    montowane TYLKO na desktopie bez reduced-motion. Poster działa jako
 *    natychmiastowy, statyczny fallback (LCP-friendly: preload="none").
 *
 * Warstwy (od spodu): tło (gradient | poster | wideo) → scrim → children.
 */
export type VideoBackgroundProps = {
  /** Ścieżka do pętli mp4 (10–15 s). Brak → placeholder gradientu. */
  src?: string;
  /** Klatka-poster: tło zanim wideo ruszy + fallback na mobile / reduced-motion. */
  poster?: string;
  /**
   * Overlay gwarantujący kontrast AA pod tekstem.
   *  • true / 'dark'  → przyciemnienie (jasny tekst na ciemnym tle-filmie) [domyślnie]
   *  • 'light'        → rozjaśnienie (ciemny tekst, gdy wideo jest jasne)
   *  • false          → bez scrim (TYLKO gdy children mają własny pewny kontrast)
   */
  scrim?: boolean | 'dark' | 'light';
  /**
   * Dekoracja kładziona NAD tłem (gradient/wideo), ale POD scrimem — np. pływające
   * orby. Dzięki temu scrim re-przyciemnia dekorację i kontrast AA pod tekstem
   * zostaje gwarantowany (dekoracja nie może go popsuć). aria-hidden zapewnia
   * komponent-dekoracja u źródła.
   */
  decoration?: React.ReactNode;
  /** Treść nad tłem (surowy HTML, SSG). Zawsze czytelna. */
  children: React.ReactNode;
  /** Klasa na zewnętrzny wrapper (pozycjonowanie/min-h sekcji). */
  className?: string;
};

export function VideoBackground({
  src,
  poster,
  scrim = 'dark',
  decoration,
  children,
  className,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // SSG / pierwszy paint: zakładamy "nie-wideo" (mobile-first, bezpieczne dla
  // hydration). Wideo dołącza dopiero po potwierdzeniu desktopa bez reduced-motion.
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    // Brak src → nie ma czego odtwarzać (zostaje gradient).
    if (!src) return;
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;

    const desktop = window.matchMedia('(min-width: 768px)'); // md
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => setPlayVideo(desktop.matches && !reduce.matches);
    sync();

    // Reaguj na rotację / resize / zmianę preferencji ruchu w trakcie.
    desktop.addEventListener('change', sync);
    reduce.addEventListener('change', sync);
    return () => {
      desktop.removeEventListener('change', sync);
      reduce.removeEventListener('change', sync);
    };
  }, [src]);

  // Jawnie pauzuj/wznawiaj — autoPlay nie respektuje reduced-motion samo z siebie.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playVideo) {
      v.play().catch(() => {
        /* autoplay zablokowany (np. oszczędzanie energii) — poster zostaje */
      });
    } else {
      v.pause();
    }
  }, [playVideo]);

  const scrimClass =
    scrim === false
      ? null
      : scrim === 'light'
        ? 'bg-scrim-light'
        : 'bg-scrim-dark'; // true | 'dark'

  // Czy w ogóle pokazać metaliczny gradient w spodzie:
  //  • zawsze gdy brak src (placeholder),
  //  • także jako baza pod poster/wideo, gdy poster jeszcze nie dograny — żeby
  //    nigdy nie błysnęło puste/przezroczyste tło.
  const showGradient = !src;

  return (
    <div className={cn('relative isolate overflow-hidden', className)}>
      {/* ── WARSTWA TŁA (dekoracja, poza drzewem dostępności) ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {showGradient ? (
          // Placeholder: animowany metal (niebieski → fiolet → zielony + połysk).
          <div className="bg-metal-sheen absolute inset-0" />
        ) : (
          <>
            {/* Baza, zanim wideo/poster się pojawi — brak migotania pustki. */}
            <div className="bg-metal-sheen absolute inset-0" />
            {playVideo ? (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={src}
                poster={poster}
                muted
                loop
                autoPlay
                playsInline
                preload="none"
                tabIndex={-1}
                disablePictureInPicture
              />
            ) : poster ? (
              // Mobile / reduced-motion: statyczny poster zamiast wideo.
              // eslint-disable-next-line @next/next/no-img-element -- tło dekoracyjne, nie LCP treści
              <img
                src={poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : null}
          </>
        )}

        {/* ── DEKORACJA (orby itp.) — NAD tłem, POD scrimem (scrim ją re-przyciemnia,
              więc nie może popsuć kontrastu AA pod tekstem). ── */}
        {decoration}

        {/* ── SCRIM / OVERLAY — gwarancja kontrastu AA pod tekstem ── */}
        {scrimClass && <div className={cn('absolute inset-0', scrimClass)} />}
      </div>

      {/* ── TREŚĆ — zawsze nad tłem, surowy HTML, czytelna ── */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
