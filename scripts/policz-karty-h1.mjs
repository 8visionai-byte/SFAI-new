/**
 * POLICZ KARTY .inf-card — audyt „naczyń połączonych" dla PARTII H1.
 *
 * Skanuje prerenderowany HTML z .next/server/app i dla każdej karty .inf-card
 * sprawdza dwie rzeczy z zadania:
 *   (a) czy karta ma własny ton, czyli custom property --card-c w atrybucie style,
 *   (b) czy pierwszym dzieckiem karty jest reflektor <div class="inf-spotlight">.
 *
 * Skrypt jest NARZĘDZIEM WERYFIKACJI (dowód przed/po), nie częścią buildu.
 * Node, bo maszyna jest windowsowa (zasada globalna: skrypty w Node).
 *
 * Użycie: node scripts/policz-karty-h1.mjs [wzorzec-sciezki ...]
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const KORZEN = join(process.cwd(), '.next', 'server', 'app');

/** Rekurencyjnie zbiera pliki .html z prerenderu. */
function zbierzHtml(katalog) {
  const out = [];
  for (const wpis of readdirSync(katalog)) {
    const sciezka = join(katalog, wpis);
    if (statSync(sciezka).isDirectory()) out.push(...zbierzHtml(sciezka));
    else if (wpis.endsWith('.html')) out.push(sciezka);
  }
  return out;
}

/** Wszystkie tagi otwierające z klasą inf-card (bez inf-card-sub/-lg). */
const TAG_KARTY = /<[a-z][^>]*class="[^"]*(?<![\w-])inf-card(?![\w-])[^"]*"[^>]*>/gi;

function policzPlik(sciezka) {
  const html = readFileSync(sciezka, 'utf8');
  let karty = 0;
  let bezTonu = 0;
  let bezReflektora = 0;

  for (const m of html.matchAll(TAG_KARTY)) {
    karty += 1;
    const tag = m[0];
    if (!/--card-c\s*:/.test(tag)) bezTonu += 1;
    // Reflektor musi być PIERWSZYM dzieckiem — patrzymy tuż za tagiem otwierającym.
    const zaTagiem = html.slice(m.index + tag.length, m.index + tag.length + 120);
    if (!/^\s*<div[^>]*class="inf-spotlight"/.test(zaTagiem)) bezReflektora += 1;
  }

  return { karty, bezTonu, bezReflektora };
}

const filtry = process.argv.slice(2);
const pliki = zbierzHtml(KORZEN)
  .map((p) => ({ p, rel: relative(KORZEN, p).replace(/\\/g, '/') }))
  .filter(({ rel }) => filtry.length === 0 || filtry.some((f) => rel.includes(f)));

let sumaKart = 0;
let sumaBezTonu = 0;
let sumaBezReflektora = 0;

for (const { p, rel } of pliki.sort((a, b) => a.rel.localeCompare(b.rel))) {
  const w = policzPlik(p);
  if (w.karty === 0) continue;
  sumaKart += w.karty;
  sumaBezTonu += w.bezTonu;
  sumaBezReflektora += w.bezReflektora;
  console.log(
    `${rel.padEnd(52)} kart: ${String(w.karty).padStart(3)}  bez tonu: ${String(w.bezTonu).padStart(3)}  bez reflektora: ${String(w.bezReflektora).padStart(3)}`
  );
}

console.log('-'.repeat(96));
console.log(
  `RAZEM${' '.repeat(47)} kart: ${String(sumaKart).padStart(3)}  bez tonu: ${String(sumaBezTonu).padStart(3)}  bez reflektora: ${String(sumaBezReflektora).padStart(3)}`
);
