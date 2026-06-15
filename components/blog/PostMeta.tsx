/**
 * PostMeta — metadane wpisu renderowane serwerowo: data publikacji i (gdy różna)
 * „Ostatnia aktualizacja". Daty w <time dateTime="YYYY-MM-DD"> = sygnał świeżości
 * czytelny dla botów AI i Google, spójny z Article.datePublished/dateModified.
 *
 * Format daty jest deterministyczny (własna mapa miesięcy PL), więc wynik SSG jest
 * identyczny niezależnie od locale środowiska builda. ISO trzymamy w `dateTime`.
 */
const MIESIACE_PL = [
  'stycznia',
  'lutego',
  'marca',
  'kwietnia',
  'maja',
  'czerwca',
  'lipca',
  'sierpnia',
  'września',
  'października',
  'listopada',
  'grudnia',
] as const;

/** Formatuje 'YYYY-MM-DD' -> '15 czerwca 2026'. Przy nietypowym wejściu zwraca surowy ISO. */
export function formatujDatePl(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const rok = m[1];
  const miesiacIdx = Number(m[2]) - 1;
  const dzien = Number(m[3]);
  const nazwaMiesiaca = MIESIACE_PL[miesiacIdx];
  if (!nazwaMiesiaca) return iso;
  return `${dzien} ${nazwaMiesiaca} ${rok}`;
}

export function PostMeta({
  data,
  dataAktualizacji,
  className,
}: {
  data: string;
  dataAktualizacji: string;
  className?: string;
}) {
  const zaktualizowano = dataAktualizacji && dataAktualizacji !== data;

  return (
    <div className={className}>
      <span className="text-caption text-fg-subtle">
        Opublikowano{' '}
        <time dateTime={data} className="text-fg-muted">
          {formatujDatePl(data)}
        </time>
      </span>
      {zaktualizowano && (
        <span className="text-caption text-fg-subtle">
          {' · '}Ostatnia aktualizacja{' '}
          <time dateTime={dataAktualizacji} className="text-fg-muted">
            {formatujDatePl(dataAktualizacji)}
          </time>
        </span>
      )}
    </div>
  );
}
