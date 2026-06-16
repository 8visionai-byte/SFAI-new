/**
 * FloatingOrbs — pływające, rozmyte plamy metalu (niebieski/fiolet/zielony) jako
 * DEKORACJA tła sekcji. Czysty server component: zero JS, sam markup + CSS
 * (klasy .sf-orb* w globals.css). Ruch gaszony globalną bramką reduced-motion
 * (orby zostają, przestają dryfować) — statyczny, czytelny fallback.
 *
 * ZASADY (north star):
 *  • aria-hidden + pointer-events:none — poza drzewem dostępności i zdarzeń.
 *  • Nie niesie treści. Kontrast tekstu daje scrim/tokeny, nie te plamy.
 *  • Kładziony w kontenerze `relative` (sekcja/hero); sam jest absolutny, z-[-1].
 *
 * Użycie: <div className="relative ..."><FloatingOrbs /> ...treść... </div>
 */
type Orb = {
  className: string;
  style: React.CSSProperties;
};

/** Stałe pozycje/rozmiary — dobrane tak, by plamy nie nachodziły na środek tekstu. */
const ORBS: readonly Orb[] = [
  {
    className: 'sf-orb sf-orb--blue',
    style: { width: '46%', height: '46%', top: '-12%', left: '-8%' },
  },
  {
    className: 'sf-orb sf-orb--violet sf-orb--slow',
    style: { width: '40%', height: '40%', top: '8%', right: '-10%' },
  },
  {
    className: 'sf-orb sf-orb--green sf-orb--rev',
    style: { width: '34%', height: '34%', bottom: '-14%', left: '28%' },
  },
];

export function FloatingOrbs() {
  return (
    <div className="sf-orbs" aria-hidden="true">
      {ORBS.map((orb, i) => (
        <span key={i} className={orb.className} style={orb.style} />
      ))}
    </div>
  );
}
