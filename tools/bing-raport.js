/**
 * bing-raport.js — czytnik Bing Webmaster Tools API (bez zaleznosci npm).
 * Uzycie: node tools/bing-raport.js "C:\sciezka\do\klucza.txt"
 * Klucz czytany z pliku (nigdy do czatu/repo). Drukuje TYLKO statystyki.
 */
const fs = require('fs');

const KEY_PATH = process.argv[2];
if (!KEY_PATH || !fs.existsSync(KEY_PATH)) {
  console.error('Podaj sciezke do pliku z kluczem API Bing.');
  process.exit(1);
}
// Plik moze zawierac opis + klucz — bierzemy ostatni "wyraz" (sam klucz).
const key = fs.readFileSync(KEY_PATH, 'utf8').trim().split(/\s+/).pop();
const SITE = 'https://www.simplefast.ai';
const BASE = 'https://ssl.bing.com/webmaster/api.svc/json';

async function call(metoda, params = {}) {
  const q = new URLSearchParams({ apikey: key, siteUrl: SITE, ...params });
  const res = await fetch(`${BASE}/${metoda}?${q}`);
  const txt = await res.text();
  if (!res.ok) throw new Error(`${metoda} -> ${res.status}: ${txt.slice(0, 140)}`);
  return JSON.parse(txt).d;
}

(async () => {
  try {
    const stats = await call('GetRankAndTrafficStats');
    console.log('=== BING simplefast.ai ===');
    const ostatnie = (stats || []).slice(-7);
    for (const s of ostatnie) {
      // Bing zwraca "/Date(1722816000000-0700)/" — bierzemy pierwszy dlugi ciag cyfr.
      const ms = (String(s.Date).match(/\d{10,}/) || [0])[0];
      const data = new Date(parseInt(ms, 10)).toISOString().slice(0, 10);
      console.log(`${data} | wyswietlenia ${s.Impressions} | klikniecia ${s.Clicks}`);
    }
    if (!ostatnie.length) console.log('(brak danych — witryna swiezo dodana do Bing WMT)');
  } catch (e) {
    console.error('BLAD:', e.message);
    process.exit(2);
  }
})();
