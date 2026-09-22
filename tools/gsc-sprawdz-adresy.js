/**
 * gsc-sprawdz-adresy.js — stan indeksacji WSKAZANYCH adresow przez URL Inspection API.
 *
 * Uzycie:
 *   node tools/gsc-sprawdz-adresy.js "C:\sciezka\do\klucza.json" /uslugi/chatboty /uslugi ...
 * Sciezki wzgledne (od /) albo pelne https://www.simplefast.ai/...
 *
 * PO CO: gsc-indeksacja.js odpytuje cala mape (71 adresow, kilka minut). Tu pytamy
 * tylko o to, co nas interesuje, np. czy Google pobral strone po klikniecu
 * „Popros o zindeksowanie". Dowod = pole lastCrawlTime, nie komunikat w panelu.
 *
 * Klucz NIGDY nie trafia do repo ani czatu — podajemy tylko SCIEZKE.
 * Property: sc-domain:simplefast.ai. Zakres tylko-do-odczytu.
 */
const fs = require('fs');
const crypto = require('crypto');

const KEY_PATH = process.argv[2];
const ADRESY = process.argv.slice(3);
const SITE = 'sc-domain:simplefast.ai';
const HOST = 'https://www.simplefast.ai';

if (!KEY_PATH || !fs.existsSync(KEY_PATH) || !ADRESY.length) {
  console.error('Uzycie: node tools/gsc-sprawdz-adresy.js <klucz.json> <sciezka> [<sciezka> ...]');
  process.exit(1);
}
const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
const b64url = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url({ alg: 'RS256', typ: 'JWT' });
  const body = b64url({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  });
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${head}.${body}`);
  const jwt = `${head}.${body}.${signer.sign(key.private_key, 'base64url')}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  const d = await res.json();
  if (!d.access_token) { console.error('Blad tokenu, status', res.status); process.exit(2); }
  return d.access_token;
}

const STAN_PL = {
  'Submitted and indexed': 'przeslana i ZAINDEKSOWANA',
  'Indexed, not submitted in sitemap': 'ZAINDEKSOWANA (spoza mapy)',
  'Crawled - currently not indexed': 'pobrana, ale NIE zindeksowana',
  'Discovered - currently not indexed': 'wykryta, jeszcze NIE pobrana',
  'URL is unknown to Google': 'nieznana Google',
};

(async () => {
  const token = await accessToken();
  const dzisiaj = new Date().toISOString().slice(0, 10);
  console.log(`Stan wg Google (URL Inspection API), odczyt ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC\n`);
  console.log('sciezka'.padEnd(44) + 'ostatnie pobranie'.padEnd(20) + 'stan');
  for (const a of ADRESY) {
    const url = a.startsWith('http') ? a : HOST + (a.startsWith('/') ? a : '/' + a);
    const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE, languageCode: 'pl' }),
    });
    const d = await res.json();
    const ix = (d.inspectionResult && d.inspectionResult.indexStatusResult) || {};
    const crawl = ix.lastCrawlTime ? ix.lastCrawlTime.slice(0, 16).replace('T', ' ') : 'nigdy';
    const stan = STAN_PL[ix.coverageState] || ix.coverageState || (d.error ? 'BLAD ' + d.error.code : '?');
    const swieze = ix.lastCrawlTime && ix.lastCrawlTime.startsWith(dzisiaj) ? '  <-- POBRANE DZIS' : '';
    console.log(url.replace(HOST, '').padEnd(44) + crawl.padEnd(20) + stan + swieze);
    await new Promise((r) => setTimeout(r, 150));
  }
})().catch((e) => { console.error('Blad:', String(e && e.message ? e.message : e).slice(0, 200)); process.exit(3); });
