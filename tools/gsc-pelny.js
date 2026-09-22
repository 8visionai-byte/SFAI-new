/**
 * gsc-pelny.js — pelny odczyt Google Search Console z porownaniem dwoch okresow.
 *
 * Uzycie:  node tools/gsc-pelny.js "C:\sciezka\do\klucza.json" [dni]
 * Domyslnie 28 dni vs poprzednie 28 dni.
 *
 * Klucz NIGDY nie trafia do repo ani czatu — podajemy tylko SCIEZKE.
 * Property: sc-domain:simplefast.ai. Zakres tylko-do-odczytu.
 *
 * Rozne od gsc-raport.js: dwa okresy obok siebie, pelna tabela stron z CTR,
 * zapytania bez klikniec, urzadzenia, kraje, oraz zapytania per strona
 * (z prawidlowym filtrem po stronie).
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
  if (!d.access_token) { console.error('Blad tokenu:', JSON.stringify(d)); process.exit(2); }
  return d.access_token;
}

async function query(token, body) {
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` }, body: JSON.stringify(body) }
  );
  const d = await res.json();
  if (d.error) { console.error('Blad zapytania:', JSON.stringify(d.error).slice(0, 300)); return { rows: [] }; }
  return d;
}

const dzien = (przesun) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - przesun);
  return d.toISOString().slice(0, 10);
};

// GSC ma ok. 2-3 dni opoznienia — zaczynamy 3 dni wstecz.
const OPOZ = 3;
const A_END = dzien(OPOZ), A_START = dzien(OPOZ + DNI - 1);
const B_END = dzien(OPOZ + DNI), B_START = dzien(OPOZ + 2 * DNI - 1);

const sumuj = (rows) => rows.reduce(
  (a, r) => ({ c: a.c + r.clicks, i: a.i + r.impressions, p: a.p + r.position * r.impressions }),
  { c: 0, i: 0, p: 0 }
);
const proc = (teraz, przed) => {
  if (!przed) return teraz ? '  nowe' : '     0';
  const z = ((teraz - przed) / przed) * 100;
  return `${z >= 0 ? '+' : ''}${z.toFixed(0)}%`.padStart(6);
};
const pad = (s, n) => String(s).padStart(n);

(async () => {
  const t = await accessToken();

  console.log(`=== GSC simplefast.ai ===`);
  console.log(`OKRES A (teraz):    ${A_START} -> ${A_END}  (${DNI} dni)`);
  console.log(`OKRES B (poprzedni): ${B_START} -> ${B_END}  (${DNI} dni)`);

  // --- 1. Suma okresow ---
  const [sa, sb] = await Promise.all([
    query(t, { startDate: A_START, endDate: A_END, dimensions: ['date'], rowLimit: 500 }),
    query(t, { startDate: B_START, endDate: B_END, dimensions: ['date'], rowLimit: 500 }),
  ]);
  const a = sumuj(sa.rows || []), b = sumuj(sb.rows || []);
  const ctrA = a.i ? (a.c / a.i) * 100 : 0, ctrB = b.i ? (b.c / b.i) * 100 : 0;
  const pozA = a.i ? a.p / a.i : 0, pozB = b.i ? b.p / b.i : 0;

  console.log(`\n--- 1. CZY ROSNIEMY ---`);
  console.log(`miara            |  okres A |  okres B | zmiana`);
  console.log(`wyswietlenia     | ${pad(a.i, 8)} | ${pad(b.i, 8)} | ${proc(a.i, b.i)}`);
  console.log(`klikniecia       | ${pad(a.c, 8)} | ${pad(b.c, 8)} | ${proc(a.c, b.c)}`);
  console.log(`CTR              | ${pad(ctrA.toFixed(2) + '%', 8)} | ${pad(ctrB.toFixed(2) + '%', 8)} | ${proc(ctrA, ctrB)}`);
  console.log(`srednia pozycja  | ${pad(pozA.toFixed(1), 8)} | ${pad(pozB.toFixed(1), 8)} | ${pozA < pozB ? 'lepiej' : 'gorzej'}`);

  // --- 2. Strony: pelna tabela z porownaniem ---
  const [pa, pb] = await Promise.all([
    query(t, { startDate: A_START, endDate: A_END, dimensions: ['page'], rowLimit: 200 }),
    query(t, { startDate: B_START, endDate: B_END, dimensions: ['page'], rowLimit: 200 }),
  ]);
  const mapB = new Map((pb.rows || []).map((r) => [r.keys[0], r]));
  console.log(`\n--- 2. STRONY (posortowane po wyswietleniach) ---`);
  console.log(`wysw |  klik |   CTR | poz  | wysw B | strona`);
  for (const r of (pa.rows || []).sort((x, y) => y.impressions - x.impressions)) {
    const u = r.keys[0].replace(/^https?:\/\/(www\.)?simplefast\.ai/, '') || '/';
    const prev = mapB.get(r.keys[0]);
    console.log(
      `${pad(r.impressions, 4)} | ${pad(r.clicks, 5)} | ${pad(((r.ctr || 0) * 100).toFixed(1) + '%', 5)} | ${pad(r.position.toFixed(1), 4)} | ${pad(prev ? prev.impressions : 0, 6)} | ${u}`
    );
  }

  // --- 3. Zapytania: pelna lista ---
  const [qa, qb] = await Promise.all([
    query(t, { startDate: A_START, endDate: A_END, dimensions: ['query'], rowLimit: 300 }),
    query(t, { startDate: B_START, endDate: B_END, dimensions: ['query'], rowLimit: 300 }),
  ]);
  const qmapB = new Map((qb.rows || []).map((r) => [r.keys[0], r]));
  const qrows = (qa.rows || []).sort((x, y) => y.impressions - x.impressions);
  console.log(`\n--- 3. ZAPYTANIA (${qrows.length} sztuk, top 80 po wyswietleniach) ---`);
  console.log(`wysw | klik |   CTR | poz  | wysw B | zapytanie`);
  for (const r of qrows.slice(0, 80)) {
    const prev = qmapB.get(r.keys[0]);
    console.log(
      `${pad(r.impressions, 4)} | ${pad(r.clicks, 4)} | ${pad(((r.ctr || 0) * 100).toFixed(1) + '%', 5)} | ${pad(r.position.toFixed(1), 4)} | ${pad(prev ? prev.impressions : 0, 6)} | ${r.keys[0]}`
    );
  }

  // --- 4. Zapytania bez klikniec, ale z ruchem ---
  const bezKlik = qrows.filter((r) => r.clicks === 0 && r.impressions >= 5);
  console.log(`\n--- 4. ZAPYTANIA BEZ ANI JEDNEGO KLIKNIECIA (>=5 wyswietlen): ${bezKlik.length} ---`);
  console.log(`SUMA STRACONYCH WYSWIETLEN: ${bezKlik.reduce((s, r) => s + r.impressions, 0)}`);
  for (const r of bezKlik.slice(0, 40)) {
    console.log(`${pad(r.impressions, 4)} wysw | poz ${pad(r.position.toFixed(1), 5)} | ${r.keys[0]}`);
  }

  // --- 5. Urzadzenia i kraje ---
  const [dev, cty] = await Promise.all([
    query(t, { startDate: A_START, endDate: A_END, dimensions: ['device'], rowLimit: 10 }),
    query(t, { startDate: A_START, endDate: A_END, dimensions: ['country'], rowLimit: 10 }),
  ]);
  console.log(`\n--- 5. URZADZENIA ---`);
  for (const r of dev.rows || []) console.log(`${pad(r.impressions, 5)} wysw | ${pad(r.clicks, 3)} klik | CTR ${((r.ctr || 0) * 100).toFixed(1)}% | poz ${r.position.toFixed(1)} | ${r.keys[0]}`);
  console.log(`--- KRAJE (top 6) ---`);
  for (const r of (cty.rows || []).slice(0, 6)) console.log(`${pad(r.impressions, 5)} wysw | ${pad(r.clicks, 3)} klik | ${r.keys[0]}`);

  // --- 6. Zapytania per strona (poprawny filtr) ---
  const topStrony = (pa.rows || []).sort((x, y) => y.impressions - x.impressions).slice(0, 8);
  console.log(`\n--- 6. ZAPYTANIA PER STRONA (filtr po adresie) ---`);
  for (const s of topStrony) {
    const u = s.keys[0].replace(/^https?:\/\/(www\.)?simplefast\.ai/, '') || '/';
    const d = await query(t, {
      startDate: A_START, endDate: A_END, dimensions: ['query'], rowLimit: 12,
      dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'equals', expression: s.keys[0] }] }],
    });
    console.log(`\n### ${u}  (${s.impressions} wysw, ${s.clicks} klik, poz ${s.position.toFixed(1)})`);
    for (const r of d.rows || []) {
      console.log(`   ${pad(r.impressions, 4)} wysw | ${pad(r.clicks, 3)} klik | poz ${pad(r.position.toFixed(1), 5)} | ${r.keys[0]}`);
    }
  }
})();
