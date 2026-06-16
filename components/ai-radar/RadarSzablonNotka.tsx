import { Badge } from '@/components/ui';

/**
 * RadarSzablonNotka — WIDOCZNY disclaimer wpisu-szablonu AI Radar.
 *
 * Brief Pawła (żelazne): wpisy startowe to przykłady FORMATU, nie realne newsy.
 * Nie udajemy realnych wydarzeń. Ten komponent renderuje badge „PRZYKŁAD / SZABLON"
 * + jedno zdanie wyjaśnienia, żeby czytelnik (i bot) od razu wiedział, że to wzorzec.
 *
 * Renderowany SERWEROWO (w HTML od razu), więc disclaimer jest czytelny dla LLM bez JS.
 * Wariant `card` = kompaktowy pasek na karcie listy; `full` = blok nad treścią wpisu.
 */
export function RadarSzablonNotka({ variant = 'full' }: { variant?: 'card' | 'full' }) {
  if (variant === 'card') {
    return (
      <Badge variant="neutral" className="border-border-strong">
        Przykład / szablon
      </Badge>
    );
  }

  return (
    <aside
      role="note"
      className="rounded-lg border border-border-strong bg-bg-subtle px-4 py-3 text-body-sm text-fg-muted"
    >
      <strong className="font-semibold text-fg">Przykład / szablon.</strong>{' '}
      To nie jest realny news. Ten wpis pokazuje format AI Radar na neutralnym
      przykładzie. Realne newsy z nazwami, liczbami i datami dodaje redakcja.
    </aside>
  );
}
