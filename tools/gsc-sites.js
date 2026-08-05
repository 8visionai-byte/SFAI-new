/**
 * gsc-sites.js — lista uslug GSC widocznych dla konta uslugi (diagnostyka).
 * Uzycie: node tools/gsc-sites.js "C:\sciezka\do\klucza.json"
 */
const fs = require('fs');
const crypto = require('crypto');

const key = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const b64url = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');

(async () => {
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
  const tok = await (
    await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
    })
  ).json();
  const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { authorization: `Bearer ${tok.access_token}` },
  });
  const data = await res.json();
  console.log('STATUS:', res.status);
  console.log('USLUGI WIDOCZNE DLA KONTA:', JSON.stringify(data, null, 2));
})();
