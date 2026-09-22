/**
 * porownaj-migawki.js — roznice miedzy dwiema migawkami SEO.
 *
 * Uzycie:  node tools/porownaj-migawki.js 2026-08-17b 2026-08-17c
 * Wypisuje TYLKO to, co sie zmienilo. Cisza = zero regresji.
 */
const fs = require('fs');
const path = require('path');

const [A, B] = [process.argv[2], process.argv[3]];
const wczytaj = (n) => JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.seo-przeglad', 'migawki', `${n}.json`), 'utf8'));
const stara = wczytaj(A), nowa = wczytaj(B);
let zmian = 0;
const zglos = (s) => { zmian++; console.log(s); };

console.log(`=== ${A}  ->  ${B} ===\n`);

// --- podsumowanie ---
console.log('--- PODSUMOWANIE ---');
for (const k of Object.keys(nowa.podsumowanie)) {
  const s = stara.podsumowanie[k], n = nowa.podsumowanie[k];
  if (JSON.stringify(s) !== JSON.stringify(n)) zglos(`  ZMIANA ${k}: ${JSON.stringify(s)} -> ${JSON.stringify(n)}`);
}

// --- technika (plasko) ---
console.log('--- TECHNIKA ---');
const plasko = (o, pre = '') => Object.entries(o).reduce((a, [k, v]) => {
  if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(a, plasko(v, `${pre}${k}.`));
  else a[`${pre}${k}`] = v;
  return a;
}, {});
const tA = plasko(stara.technika), tB = plasko(nowa.technika);
for (const k of new Set([...Object.keys(tA), ...Object.keys(tB)])) {
  if (JSON.stringify(tA[k]) !== JSON.stringify(tB[k])) zglos(`  ZMIANA ${k}: ${JSON.stringify(tA[k])} -> ${JSON.stringify(tB[k])}`);
}

// --- boty AI / pomiar / konwersja ---
for (const sekcja of ['boty_ai', 'pomiar', 'konwersja']) {
  console.log(`--- ${sekcja.toUpperCase()} ---`);
  const sA = plasko(stara[sekcja] || {}), sB = plasko(nowa[sekcja] || {});
  for (const k of new Set([...Object.keys(sA), ...Object.keys(sB)])) {
    if (JSON.stringify(sA[k]) !== JSON.stringify(sB[k])) zglos(`  ZMIANA ${k}: ${JSON.stringify(sA[k])} -> ${JSON.stringify(sB[k])}`);
  }
}

// --- podstrony ---
console.log('--- PODSTRONY ---');
const mapA = new Map(stara.podstrony.map((p) => [p.u, p]));
const mapB = new Map(nowa.podstrony.map((p) => [p.u, p]));
for (const u of mapA.keys()) if (!mapB.has(u)) zglos(`  ZNIKNELA: ${u}`);
for (const u of mapB.keys()) if (!mapA.has(u)) zglos(`  NOWA: ${u}`);

const POLA = { t: 'tytul', d: 'opis', h1: 'H1', h1n: 'liczba H1', can: 'kanoniczny', idx: 'robots', og: 'og:image' };
for (const [u, b] of mapB) {
  const a = mapA.get(u);
  if (!a) continue;
  for (const [k, nazwa] of Object.entries(POLA)) {
    if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) {
      zglos(`  ${u} | ${nazwa}:\n      BYLO: ${JSON.stringify(a[k])}\n      JEST: ${JSON.stringify(b[k])}`);
    }
  }
  const ldA = JSON.stringify([...(a.ld || [])].sort()), ldB = JSON.stringify([...(b.ld || [])].sort());
  if (ldA !== ldB) zglos(`  ${u} | dane strukturalne: ${ldA} -> ${ldB}`);
  if (a.ldb !== b.ldb) zglos(`  ${u} | bledy JSON-LD: ${a.ldb} -> ${b.ldb}`);
  // istotna zmiana objetosci tresci (>15%)
  if (a.sl && b.sl && Math.abs(b.sl - a.sl) / a.sl > 0.15) {
    zglos(`  ${u} | objetosc tekstu: ${a.sl} -> ${b.sl} znakow (${b.sl > a.sl ? '+' : ''}${(((b.sl - a.sl) / a.sl) * 100).toFixed(0)}%)`);
  }
}

console.log(`\n=== RAZEM ZMIAN: ${zmian} ===`);
if (!zmian) console.log('ZERO ROZNIC — stan SEO identyczny jak w poprzednim przebiegu.');
