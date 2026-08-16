/**
 * bing-diagnoza.js — diagnoza widocznosci w Bing Webmaster Tools.
 * Uzycie: node tools/bing-diagnoza.js "C:\sciezka\do\klucza.txt"
 * Klucz czytany z pliku (nigdy do czatu/repo). Drukuje TYLKO wyniki, nigdy klucza.
 *
 * Odpowiada na pytanie: dlaczego strona ma prawie zero wyswietlen?
 * Sprawdza po kolei: czy witryna jest w koncie, ile adresow zaindeksowano,
 * czy sa bledy indeksowania, czy mapa witryny zostala przyjeta, ile zapytan generuje ruch.
 */
const fs = require('fs');

const KEY_PATH = process.argv[2];
if (!KEY_PATH) {
  console.error('Podaj sciezke do pliku z kluczem API Bing.');
  process.exit(1);
}
const key = fs.readFileSync(KEY_PATH, 'utf8').trim().split(/\s+/).pop();
const SITE = 'https://www.simplefast.ai';
const BASE = 'https://ssl.bing.com/webmaster/api.svc/json';

async function call(metoda, params = {}) {
  const q = new URLSearchParams({ apikey: key, siteUrl: SITE, ...params });
  const res = await fetch(`${BASE}/${metoda}?${q}`);
  const txt = await res.text();
  if (!res.ok) return { blad: `HTTP ${res.status}`, tresc: txt.slice(0, 160) };
  try { return JSON.parse(txt).d; } catch { return { blad: 'zla odpowiedz', tresc: txt.slice(0, 160) }; }
}

const licz = (x) => Array.isArray(x) ? x.length : (x == null ? 'brak' : x);

(async () => {
  console.log('=== DIAGNOZA BING: ' + SITE + ' ===\n');

  // 1. Czy witryna jest w ogole w koncie
  const sites = await call('GetUserSites');
  if (Array.isArray(sites)) {
    console.log('1. WITRYNY W KONCIE: ' + sites.map(s => s.Url).join(', '));
    console.log('   nasza obecna: ' + (sites.some(s => (s.Url || '').includes('simplefast')) ? 'TAK' : 'NIE — to jest przyczyna zera'));
  } else console.log('1. WITRYNY: ' + JSON.stringify(sites).slice(0, 200));

  // 2. Ile adresow Bing faktycznie zaindeksowal
  const idx = await call('GetUrlCounts');
  console.log('\n2. LICZNIKI ADRESOW (crawled/indexed wg dni):');
  if (Array.isArray(idx) && idx.length) {
    const o = idx[idx.length - 1];
    console.log('   ostatni wpis: ' + JSON.stringify(o).slice(0, 300));
  } else console.log('   ' + JSON.stringify(idx).slice(0, 300));

  // 3. Bledy indeksowania
  const issues = await call('GetCrawlIssues');
  console.log('\n3. PROBLEMY INDEKSOWANIA: ' + licz(issues));
  if (Array.isArray(issues) && issues.length) {
    issues.slice(0, 8).forEach(i => console.log('   - ' + (i.Url || '') + ' | kod ' + (i.HttpCode ?? '?') + ' | ' + (i.Issues ?? '')));
  }

  // 4. Mapy witryny
  const feeds = await call('GetFeeds');
  console.log('\n4. MAPY WITRYNY W BING: ' + licz(feeds));
  if (Array.isArray(feeds)) feeds.forEach(f => console.log('   - ' + f.Url + ' | status ' + f.Status + ' | adresow ' + (f.UrlCount ?? '?') + ' | ostatnio pobrana ' + (f.LastCrawled || 'nigdy')));

  // 5. Limit zglaszania adresow (pokazuje, czy konto jest aktywne)
  const quota = await call('GetUrlSubmissionQuota');
  console.log('\n5. LIMIT ZGLASZANIA ADRESOW: ' + JSON.stringify(quota).slice(0, 200));

  // 6. Na jakie zapytania w ogole sie pokazujemy
  const kw = await call('GetQueryStats');
  console.log('\n6. ZAPYTANIA GENERUJACE WYSWIETLENIA: ' + licz(kw));
  if (Array.isArray(kw) && kw.length) {
    kw.sort((a, b) => (b.Impressions || 0) - (a.Impressions || 0)).slice(0, 15)
      .forEach(k => console.log('   - "' + k.Query + '" | wyswietlen ' + k.Impressions + ' | klikniec ' + k.Clicks + ' | srednia pozycja ' + (k.AvgImpressionPosition ?? '?')));
  }

  // 7. Ktore nasze strony sie pokazuja
  const pages = await call('GetPageStats');
  console.log('\n7. STRONY Z WYSWIETLENIAMI: ' + licz(pages));
  if (Array.isArray(pages) && pages.length) {
    pages.sort((a, b) => (b.Impressions || 0) - (a.Impressions || 0)).slice(0, 10)
      .forEach(p => console.log('   - ' + p.Query + ' | wyswietlen ' + p.Impressions + ' | klikniec ' + p.Clicks));
  }
})();
