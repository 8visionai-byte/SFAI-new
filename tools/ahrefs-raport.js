/**
 * ahrefs-raport.js — czytnik Ahrefs API v3 (bez zależności npm).
 * Użycie: node tools/ahrefs-raport.js "C:\ścieżka\do\ahrefs-api-key.txt" [domena]
 * Klucz czytany z pliku (nigdy do czatu/repo). Drukuje TYLKO wyniki, nigdy klucza.
 *
 * Zwraca: ocena domeny, backlinki, ruch organiczny, TOP frazy z WOLUMENAMI
 * (tego nie da GSC — GSC pokazuje tylko frazy, na które już się pokazujemy).
 */
const fs = require('fs');

const KEY_PATH = process.argv[2];
if (!KEY_PATH) {
  console.error('Podaj sciezke do pliku z kluczem API Ahrefs.');
  process.exit(1);
}
const key = fs.readFileSync(KEY_PATH, 'utf8').trim().split(/\s+/).pop();
const TARGET = process.argv[3] || 'simplefast.ai';
const BASE = 'https://api.ahrefs.com/v3';

async function call(sciezka, params = {}) {
  const q = new URLSearchParams(params);
  const res = await fetch(`${BASE}/${sciezka}?${q}`, {
    headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
  });
  const txt = await res.text();
  if (!res.ok) {
    // Nie drukujemy klucza nawet w komunikacie bledu.
    return { blad: `HTTP ${res.status}`, tresc: txt.slice(0, 200).replace(key, 'KLUCZ_UKRYTY') };
  }
  try { return JSON.parse(txt); } catch { return { blad: 'zla odpowiedz', tresc: txt.slice(0, 200) }; }
}

const dzis = new Date().toISOString().slice(0, 10);

(async () => {
  console.log(`=== AHREFS: ${TARGET} (${dzis}) ===\n`);

  // 1. Limity konta — od razu widac, czy klucz dziala i ile jednostek zostalo
  const limity = await call('subscription-info/limits-and-usage');
  if (limity.blad) {
    console.log('KLUCZ NIE DZIALA: ' + limity.blad + ' | ' + (limity.tresc || ''));
    console.log('\nNajczestsza przyczyna: plan Ahrefs BEZ dodatku API (API to osobna,');
    console.log('platna usluga), albo klucz innego typu niz API v3.');
    console.log('Sprawdz w Ahrefs: Account settings -> API keys (klucz v3 zaczyna sie od "ah_").');
    return;
  }
  const l = limity.limits_and_usage || limity;
  console.log('1. KONTO: jednostki zuzyte ' + (l.units_spent ?? '?') + ' / limit ' + (l.units_limit ?? '?') +
    ' | reset: ' + (l.reset_at ?? '?'));

  // 2. Ocena domeny i backlinki
  const dr = await call('site-explorer/domain-rating', { target: TARGET, date: dzis });
  console.log('\n2. OCENA DOMENY (DR): ' + (dr.domain_rating?.domain_rating ?? JSON.stringify(dr).slice(0, 120)));

  const bl = await call('site-explorer/backlinks-stats', { target: TARGET, date: dzis, mode: 'domain' });
  const b = bl.metrics || bl;
  console.log('   backlinki: ' + (b.live ?? '?') + ' zywych | domeny odsylajace: ' + (b.live_refdomains ?? '?'));

  // 3. Ruch organiczny i liczba fraz w TOP100
  const om = await call('site-explorer/metrics', { target: TARGET, date: dzis, volume_mode: 'monthly', mode: 'domain' });
  const m = om.metrics || om;
  console.log('\n3. RUCH ORGANICZNY (szac. Ahrefs): ' + (m.org_traffic ?? '?') + '/mies | fraz w TOP100: ' + (m.org_keywords ?? '?'));

  // 4. TOP frazy Z WOLUMENAMI — to jest to, czego GSC nie da
  const kw = await call('site-explorer/organic-keywords', {
    target: TARGET, date: dzis, country: 'pl', mode: 'domain',
    select: 'keyword,best_position,volume,keyword_difficulty,best_position_url',
    order_by: 'volume:desc', limit: '25',
  });
  console.log('\n4. FRAZY W POLSCE (wg wolumenu):');
  const lista = kw.keywords || kw.organic_keywords || [];
  if (!Array.isArray(lista) || lista.length === 0) {
    console.log('   ' + JSON.stringify(kw).slice(0, 200));
  } else {
    lista.forEach((k) => {
      console.log(`   poz ${String(k.best_position ?? '?').padStart(3)} | wol ${String(k.volume ?? '?').padStart(6)} | KD ${String(k.keyword_difficulty ?? '?').padStart(3)} | ${k.keyword}`);
    });
  }
})();
