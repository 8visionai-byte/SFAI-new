/**
 * gsc-mapy-witryn.js — lista i sprzatanie map witryn w Google Search Console.
 *
 * Uzycie:
 *   node tools/gsc-mapy-witryn.js "C:\sciezka\do\klucza.json"          (tylko lista)
 *   node tools/gsc-mapy-witryn.js "C:\sciezka\do\klucza.json" usun     (lista, kasowanie BLEDNYCH, lista)
 *
 * PO CO: 2026-09-06 siedem adresow stron uslug zostalo omylkowo dodanych jako
 * "mapy witryn" (typ Nieznany, 1 blad, 0 stron). To strony HTML, nie pliki XML,
 * wiec nigdy nie zadzialaja i tylko zasmiecaja panel. Jedyna prawdziwa mapa to
 * /sitemap.xml i ta ZOSTAJE.
 *
 * BEZPIECZNIK: kasuje WYLACZNIE wpisy z twardej listy BLEDNE ponizej. Nic innego,
 * nawet jesli ma blad. Zanim skasuje, wypisuje, co widzi; po skasowaniu wypisuje
 * ponownie, zeby bylo widac stan koncowy.
 *
 * Klucz NIGDY nie trafia do repo ani czatu — podajemy tylko SCIEZKE.
 * Property: sc-domain:simplefast.ai. Zakres: webmasters (pelny, bo DELETE).
 */
const fs = require('fs');
const crypto = require('crypto');

const KEY_PATH = process.argv[2];
const TRYB = process.argv[3] || 'lista';
const SITE = 'sc-domain:simplefast.ai';

/* Jedyne wpisy, ktore wolno skasowac: strony HTML dodane omylkowo 2026-09-06. */
const BLEDNE = [
  'https://www.simplefast.ai/uslugi',
  'https://www.simplefast.ai/uslugi/strony-www',
  'https://www.simplefast.ai/uslugi/rozwiazania',
  'https://www.simplefast.ai/uslugi/dokumenty-faktury',
  'https://www.simplefast.ai/uslugi/automatyzacje',
  'https://www.simplefast.ai/uslugi/optymalizacja',
  'https://www.simplefast.ai/uslugi/chatboty',
];
const PRAWDZIWA = 'https://www.simplefast.ai/sitemap.xml';

if (!KEY_PATH || !fs.existsSync(KEY_PATH)) {
  console.error('Podaj sciezke do klucza JSON konta uslugi jako pierwszy argument.');
  process.exit(1);
}
const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
const b64url = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url({ alg: 'RS256', typ: 'JWT' });
  const body = b64url({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters',
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
  if (!d.access_token) {
    console.error('Blad tokenu (bez szczegolow, zeby nic nie wyciekło): status', res.status);
    process.exit(2);
  }
  return d.access_token;
}

const BASE = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps`;

async function lista(token) {
  const res = await fetch(BASE, { headers: { authorization: `Bearer ${token}` } });
  const d = await res.json();
  const wpisy = d.sitemap || [];
  console.log(`\nMapy witryn w Search Console: ${wpisy.length}`);
  for (const s of wpisy) {
    const strony = (s.contents || []).reduce((a, c) => a + Number(c.submitted || 0), 0);
    const bledy = Number(s.errors || 0);
    const znak = s.path === PRAWDZIWA ? 'PRAWDZIWA' : BLEDNE.includes(s.path) ? 'BLEDNA (strona HTML)' : 'inna';
    console.log(
      `  ${s.path.padEnd(52)} bledy:${String(bledy).padStart(2)} stron:${String(strony).padStart(3)}  ostatni odczyt:${(s.lastDownloaded || '-').slice(0, 10)}  ${znak}`,
    );
  }
  return wpisy;
}

async function usun(token, path) {
  const res = await fetch(`${BASE}/${encodeURIComponent(path)}`, {
    method: 'DELETE',
    headers: { authorization: `Bearer ${token}` },
  });
  return res.status;
}

/* Ponowne zgloszenie TEJ SAMEJ mapy (PUT jest idempotentny): hint dla Google,
   zeby odczytal ja wczesniej, np. po deployu, ktory dolozyl adresy. */
async function zglos(token, path) {
  const res = await fetch(`${BASE}/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: { authorization: `Bearer ${token}` },
  });
  return res.status;
}

(async () => {
  const token = await accessToken();
  const przed = await lista(token);
  if (TRYB === 'zglos') {
    const st = await zglos(token, PRAWDZIWA);
    console.log(`\nPonowne zgloszenie ${PRAWDZIWA}: HTTP ${st} ${st === 204 || st === 200 ? 'OK' : 'BLAD'}`);
    await lista(token);
    return;
  }
  if (TRYB !== 'usun') {
    console.log('\nTryb: tylko lista. Argumenty: "usun" (kasuje bledne z twardej listy) albo "zglos" (ponownie zglasza /sitemap.xml).');
    return;
  }
  const doSkasowania = przed.map((s) => s.path).filter((p) => BLEDNE.includes(p));
  if (!doSkasowania.length) {
    console.log('\nNie ma zadnego wpisu z listy BLEDNE. Nic nie kasuje.');
    return;
  }
  console.log(`\nKasuje ${doSkasowania.length} blednych wpisow (tylko z twardej listy):`);
  for (const p of doSkasowania) {
    const st = await usun(token, p);
    console.log(`  ${st === 204 || st === 200 ? 'OK ' : 'BLAD ' + st}  ${p}`);
  }
  await lista(token);
  console.log('\nGotowe. Prawdziwa mapa /sitemap.xml zostala nietknieta.');
})().catch((e) => {
  console.error('Blad:', String(e && e.message ? e.message : e).slice(0, 200));
  process.exit(3);
});
