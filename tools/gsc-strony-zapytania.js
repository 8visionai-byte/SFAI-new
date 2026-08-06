/**
 * gsc-strony-zapytania.js — zapytania per strona (do raportu SEO).
 * Uzycie: node tools/gsc-strony-zapytania.js "C:\sciezka\klucz.json" [dni]
 * Klucz TYLKO ze sciezki (zero sekretow w repo/czacie).
 */
const fs = require('fs');
const crypto = require('crypto');

const KEY_PATH = process.argv[2];
const DNI = parseInt(process.argv[3] || '28', 10);
const SITE = 'sc-domain:simplefast.ai';
const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
const b64url = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');

async function token() {
  const now = Math.floor(Date.now() / 1000);
  const body = `${b64url({ alg: 'RS256', typ: 'JWT' })}.${b64url({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const s = crypto.createSign('RSA-SHA256');
  s.update(body);
  const jwt = `${body}.${s.sign(key.private_key, 'base64url')}`;
  const r = await (
    await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
    })
  ).json();
  return r.access_token;
}

async function query(tok, body) {
  const r = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${tok}` }, body: JSON.stringify(body) }
  );
  if (!r.ok) { console.error('Blad', r.status, (await r.text()).slice(0, 200)); process.exit(1); }
  return r.json();
}

(async () => {
  const tok = await token();
  const end = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10);
  const start = new Date(Date.now() - (DNI + 2) * 864e5).toISOString().slice(0, 10);
  const strony = ['/uslugi/chatboty', '/uslugi/voiceboty', '/', '/narzedzia'];
  for (const p of strony) {
    const d = await query(tok, {
      startDate: start,
      endDate: end,
      dimensions: ['query'],
      rowLimit: 8,
      dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'contains', expression: p === '/' ? 'simplefast.ai/' : p }] }],
    });
    console.log(`\n=== ${p} ===`);
    for (const r of d.rows || [])
      console.log(`${String(r.clicks).padStart(3)} klik | ${String(r.impressions).padStart(5)} wysw | poz ${r.position.toFixed(1).padStart(5)} | ${r.keys[0]}`);
  }
})();
