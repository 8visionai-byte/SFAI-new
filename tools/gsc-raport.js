/**
 * gsc-raport.js — czytnik Google Search Console przez konto uslugi (bez zaleznosci npm).
 *
 * Uzycie:  node tools/gsc-raport.js "C:\sciezka\do\klucza.json" [dni]
 * Klucz NIGDY nie trafia do repo ani czatu — podajemy tylko SCIEZKE.
 * Property: sc-domain:simplefast.ai (usluga typu Domena w GSC).
 *
 * Auth: JWT RS256 podpisany kluczem konta uslugi -> token OAuth -> Search Analytics API.
 * Zakres tylko-do-odczytu (webmasters.readonly).
 */
const fs = require('fs');
const crypto = require('crypto');

const KEY_PATH = process.argv[2];
const DNI = parseInt(process.argv[3] || '28', 10);
const SITE = 'sc-domain:simplefast.ai';

if (!KEY_PATH || !fs.existsSync(KEY_PATH)) {
  console.error('Podaj sciezke do klucza JSON konta uslugi jako pierwszy argument.');
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));

function b64url(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64url');
}

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  const jwtBody = `${b64url({ alg: 'RS256', typ: 'JWT' })}.${b64url({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(jwtBody);
  const jwt = `${jwtBody}.${signer.sign(key.private_key, 'base64url')}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  const data = await res.json();
  if (!data.access_token) {
    console.error('Blad tokenu:', JSON.stringify(data));
    process.exit(2);
  }
  return data.access_token;
}

async function query(token, body) {
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    }
  );
  if (res.status === 403) {
    // 403 ma DWIE rozne przyczyny — pokaz prawdziwy powod z API, nie zgaduj:
    //  - SERVICE_DISABLED: API Search Console niewlaczone w projekcie GCP
    //  - insufficientPermissions: konto nie jest uzytkownikiem uslugi w GSC
    const detail = await res.text().catch(() => '');
    if (detail.includes('SERVICE_DISABLED') || detail.includes('accessNotConfigured')) {
      console.error(
        'API SEARCH CONSOLE NIEWLACZONE w projekcie GCP. Wlacz je (przycisk "Wlacz"):\n' +
          'https://console.cloud.google.com/apis/library/searchconsole.googleapis.com'
      );
    } else {
      console.error(
        'BRAK DOSTEPU (403): konto uslugi nie jest uzytkownikiem uslugi w Search Console.\n' +
          `Dodaj ${key.client_email} w: Search Console -> Ustawienia -> Uzytkownicy i uprawnienia.\n` +
          `Szczegol API: ${detail.slice(0, 200)}`
      );
    }
    process.exit(3);
  }
  if (!res.ok) {
    console.error(`Blad API ${res.status}:`, (await res.text()).slice(0, 300));
    process.exit(4);
  }
  return res.json();
}

(async () => {
  const token = await accessToken();
  const end = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10); // GSC ma ~2 dni opoznienia
  const start = new Date(Date.now() - (DNI + 2) * 864e5).toISOString().slice(0, 10);

  const [zapytania, strony, total] = await Promise.all([
    query(token, { startDate: start, endDate: end, dimensions: ['query'], rowLimit: 15 }),
    query(token, { startDate: start, endDate: end, dimensions: ['page'], rowLimit: 10 }),
    query(token, { startDate: start, endDate: end, rowLimit: 1 }),
  ]);

  const t = (total.rows || [])[0] || {};
  console.log(`=== GSC simplefast.ai | ${start} -> ${end} (${DNI} dni) ===`);
  console.log(
    `SUMA: klikniecia ${t.clicks ?? 0} | wyswietlenia ${t.impressions ?? 0} | CTR ${((t.ctr ?? 0) * 100).toFixed(1)}% | srednia pozycja ${(t.position ?? 0).toFixed(1)}`
  );
  console.log('\n--- TOP ZAPYTANIA ---');
  for (const r of zapytania.rows || [])
    console.log(
      `${String(r.clicks).padStart(3)} klik | ${String(r.impressions).padStart(5)} wysw | poz ${r.position.toFixed(1).padStart(5)} | ${r.keys[0]}`
    );
  console.log('\n--- TOP STRONY ---');
  for (const r of strony.rows || [])
    console.log(
      `${String(r.clicks).padStart(3)} klik | ${String(r.impressions).padStart(5)} wysw | ${r.keys[0].replace('https://www.simplefast.ai', '')}`
    );
})();
