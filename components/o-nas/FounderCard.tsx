import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui';
import { SITE } from '@/lib/site';
import { FOUNDER_PHOTOS, type FounderProfil } from '@/lib/o-nas/content';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * FounderCard — sylwetka jednego foundera (E-E-A-T). Twarde dane (imię, rola,
 * mail, telefon) czytane z SITE.founders po `founderIndex` (spójność NAP), narracja
 * z FounderProfil (lib/o-nas). Renderowana serwerowo — pełna treść w HTML dla botów.
 *
 * ZDJĘCIE: INPUT PAWŁA. Dopóki SITE.assetsReady === false (brak plików), pokazujemy
 * inicjały w kółku akcentowym — uczciwy placeholder bez stocku i bez twarzy z AI.
 * Po dostarczeniu zdjęć (public/team/*) i przełączeniu assetsReady = true render
 * automatycznie podmienia inicjały na <Image> (ścieżka/alt z FOUNDER_PHOTOS).
 *
 * Kontakt: mailto/tel renderujemy tylko gdy realne (mail tylko gdy zweryfikowany
 * globalnie). Zero zmyślonych danych kontaktowych.
 */
const AVATAR = 72; // px — wspólny rozmiar zdjęcia i placeholdera inicjałów

/**
 * INFINITY v7 (audyt: obie karty founderów szły bez --card-c i spadały na
 * fallbackowy akcent, więc siatka 2 sylwetek świeciła jednym cyjanem).
 * Sylwetka nie ma kategorii w rejestrze, więc bierzemy dwa sąsiadujące tony
 * palety kategorii (cyjan / fiolet z lib/inf-kategorie) i rozdajemy je po
 * `founderIndex` — te same dwa kolory otwierają trasę marki w krokach sekcji
 * niżej. Kolor to WYŁĄCZNIE dekoracja karty, nie treść.
 */
const FOUNDER_TON = ['chatboty', 'voiceboty'].map(
  (slug) => INF_KATEGORIA[slug] ?? INF_KATEGORIA_DEFAULT
);

export function FounderCard({ profil }: { profil: FounderProfil }) {
  const f = SITE.founders[profil.founderIndex];
  const photo = FOUNDER_PHOTOS.find((p) => p.name === f.name);
  const showPhoto = SITE.assetsReady && Boolean(photo);
  const dekor =
    FOUNDER_TON[profil.founderIndex % FOUNDER_TON.length] ?? INF_KATEGORIA_DEFAULT;

  return (
    /* INFINITY v5 (spec §4): sylwetka foundera na karcie .inf-card (narożniki +
       sweep robi karta z globals) — mechanizmy home, treść 1:1.
       v7 (audyt „naczynia połączone"): reflektor .inf-spotlight jako PIERWSZE
       dziecko — ta sama reakcja na kursor co karty na hubach. */
    <Card
      as="article"
      variant="quiet"
      className="inf-card inf-card-edge relative h-full p-6"
      style={{ '--card-c': dekor.c, '--card-c-l': dekor.odcien ?? dekor.c } as CSSProperties}
    >
      <div aria-hidden="true" className="inf-spotlight" />

      <div className="flex items-center gap-4">
        {showPhoto && photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={AVATAR}
            height={AVATAR}
            className="shrink-0 rounded-full object-cover"
          />
        ) : (
          // Placeholder inicjałów — gdy brak zdjęcia. aria-hidden, bo nazwisko jest tuż obok.
          <span
            aria-hidden="true"
            className="flex shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-h3 font-semibold text-accent-hover"
            style={{ height: AVATAR, width: AVATAR }}
          >
            {profil.inicjaly}
          </span>
        )}

        <div>
          <h3 className="text-h3">{f.name}</h3>
          <p className="mt-1 text-body-sm text-fg-muted">{profil.rolaOpis}</p>
        </div>
      </div>

      <p className="mt-5 text-body-sm text-fg-muted">{profil.bio}</p>

      {/* Kontakt bezpośredni — tylko realne dane (mail gdy zweryfikowany). */}
      <div className="mt-5 flex flex-col gap-1 text-caption text-fg-subtle">
        {SITE.contact.emailVerified && f.email ? (
          <a
            href={`mailto:${f.email}`}
            className="underline decoration-1 underline-offset-2 hover:text-fg"
          >
            {f.email}
          </a>
        ) : null}
        {f.phone ? (
          <a
            href={`tel:${f.phone.replace(/\s+/g, '')}`}
            className="underline decoration-1 underline-offset-2 hover:text-fg"
          >
            {f.phone}
          </a>
        ) : null}
      </div>
    </Card>
  );
}
