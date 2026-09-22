/**
 * gsc-indeksacja.js — sprawdza REALNY stan indeksacji kazdej podstrony z mapy witryny
 * przez Google Search Console URL Inspection API.
 *
 * PO CO: Search Analytics API (gsc-raport.js) pokazuje TYLKO strony, ktore juz maja
 * wyswietlenia. Nie odpowiada na pytanie "ktore strony NIE sa zaindeksowane".
 * URL Inspection API odpowiada wprost: verdict, coverageState, powod wykluczenia.
 *
 * Auth: JWT RS256 kluczem konta uslugi -> token OAuth (ten sam wzorzec co gsc-raport.js).
 * Limity Google: 2000 zapytan/dzien, 600/minute. Przy 55 adresach jestesmy daleko
 * ponizej progu, ale i tak robimy przerwe 120 ms miedzy zapytaniami.
 *
 * Uzycie:
 *   node tools/gsc-indeksacja.js <sciezka-do-klucza.json> [siteUrl]
 * Domyslny siteUrl: https://www.simplefast.ai/
 */
const fs = require('fs');
const crypto = require('crypto');

const KEY_PATH = process.argv[2];
/** siteUrl w rozumieniu GSC: albo prefiks URL, albo wlasciwosc domenowa `sc-domain:...`.
 *  DOMYSLNIE wlasciwosc domenowa: konto uslugi ma dostep do `sc-domain:simplefast.ai`,
 *  a prefiks URL dawal HTTP 403 „You do not own this site" (sprawdzone 2026-09-06). */
const SITE = process.argv[3] || 'sc-domain:simplefast.ai';
/** Adres, spod ktorego pobieramy mape witryny. Wlasciwosc domenowa nie jest URL-em,
 *  wiec przy `sc-domain:` trzeba podac realny adres serwisu osobno. */
const BASE = process.argv[4] || (SITE.startsWith('sc-domain:')
  ? `https://www.${SITE.slice('sc-domain:'.length)}/`
  : SITE);

if (!KEY_PATH) {
  console.error('Podaj sciezke do klucza konta uslugi.');
  process.exit(1);
}

const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');

async function token(key) {
  const iat = Math.floor(Date.now() / 1000);
  const jwtBody = `${b64url({ alg: 'RS256', typ: 'JWT' })}.${b64url({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat,
    exp: iat + 3600,
  })}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(jwtBody);
  const jwt = `${jwtBody}.${signer.sign(key.private_key, 'base64url')}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:
      `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}` +
      `&assertion=${jwt}`,
  });
  const j = await res.json();
  if (!j.access_token) throw new Error('Brak tokenu: ' + JSON.stringify(j).slice(0, 300));
  return j.access_token;
}

async function sitemapUrls(base) {
  const res = await fetch(new URL('/sitemap.xml', base).href, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function inspect(tok, url, siteUrl) {
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inspectionUrl: url, siteUrl, languageCode: 'pl' }),
  });
  if (!res.ok) {
    const t = await res.text();
    return { blad: `HTTP ${res.status}`, tresc: t.slice(0, 200) };
  }
  const j = await res.json();
  return j.inspectionResult || {};
}

const pauza = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
  const tok = await token(key);
  const urls = await sitemapUrls(BASE);
  console.log(`=== INDEKSACJA: ${urls.length} adresow z mapy witryny (wlasciwosc: ${SITE}) ===\n`);

  const wynik = [];
  for (const u of urls) {
    const r = await inspect(tok, u, SITE);
    if (r.blad) {
      wynik.push({ url: u, verdict: 'BLAD', stan: r.blad, szczegol: r.tresc });
      console.log(`BLAD  ${u} -> ${r.blad} ${String(r.tresc).slice(0, 120)}`);
      if (String(r.blad).includes('403') || String(r.blad).includes('401')) break;
    } else {
      const i = r.indexStatusResult || {};
      wynik.push({
        url: u,
        verdict: i.verdict || '?',
        stan: i.coverageState || '?',
        robots: i.robotsTxtState,
        indexing: i.indexingState,
        canonicalGoogle: i.googleCanonical,
        canonicalNasz: i.userCanonical,
        ostatniCrawl: i.lastCrawlTime,
        pobranie: i.pageFetchState,
      });
    }
    await pauza(120);
  }

  const ok = wynik.filter((w) => w.verdict === 'PASS');
  const zle = wynik.filter((w) => w.verdict !== 'PASS');

  console.log(`\n=== PODSUMOWANIE ===`);
  console.log(`  zaindeksowane (PASS): ${ok.length}`);
  console.log(`  NIEzaindeksowane:     ${zle.length}`);

  if (zle.length) {
    console.log(`\n=== STRONY POZA INDEKSEM ===`);
    for (const z of zle) {
      console.log(`\n  ${z.url.replace(SITE.replace(/\/$/, ''), '')}`);
      console.log(`     verdict: ${z.verdict} | stan: ${z.stan}`);
      if (z.pobranie) console.log(`     pobranie: ${z.pobranie}`);
      if (z.canonicalGoogle && z.canonicalGoogle !== z.url)
        console.log(`     Google widzi kanoniczny: ${z.canonicalGoogle}`);
      if (z.ostatniCrawl) console.log(`     ostatni crawl: ${z.ostatniCrawl}`);
      if (z.szczegol) console.log(`     szczegol: ${z.szczegol}`);
    }
  }

  const grupy = {};
  for (const w of wynik) grupy[w.stan] = (grupy[w.stan] || 0) + 1;
  console.log(`\n=== STANY POKRYCIA (zbiorczo) ===`);
  for (const [k, v] of Object.entries(grupy).sort((a, b) => b[1] - a[1]))
    console.log(`  ${String(v).padStart(3)}  ${k}`);

  const out = `.seo-przeglad/dane/indeksacja-${new Date(Date.now()).toISOString().slice(0, 10)}.json`;
  fs.writeFileSync(out, JSON.stringify(wynik, null, 1));
  console.log(`\nZAPISANO: ${out}`);
})().catch((e) => {
  console.error('BLAD:', e.message);
  process.exit(1);
});
