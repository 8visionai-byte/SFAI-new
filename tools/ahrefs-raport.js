/**
 * ahrefs-raport.js — porownanie sily domen (Domain Rating) przez publiczne API Ahrefs.
 * Uzycie: node tools/ahrefs-raport.js "C:\sciezka\do\ahrefs-api-key.txt" [domena1 domena2 ...]
 * Klucz czytany z pliku, NIGDY nie drukowany.
 *
 * CO TO DAJE: DR (0-100) to sila profilu linkow. Porownanie z konkurentami mowi,
 * czy realnie mozemy ich wyprzedzic, czy potrzebujemy najpierw linkow.
 *
 * OGRANICZENIE (sprawdzone 2026-08-17): klucz Pawla ma zakres "API v3 for public
 * endpoints" = 4 endpointy ze 129. Dziala domain-rating-free. NIE dziala
 * site-explorer ani keywords-explorer (401) - te wymagaja planu Enterprise.
 * Wolumeny fraz bierzemy z Search Console (prawdziwe dane), nie z Ahrefs (estymacje).
 */
const fs = require('fs');

const KEY_PATH = process.argv[2];
if (!KEY_PATH) {
  console.error('Podaj sciezke do pliku z kluczem API Ahrefs.');
  process.exit(1);
}
const key = fs.readFileSync(KEY_PATH, 'utf8').trim();

// Domeny: z argumentow albo domyslny zestaw (my + konkurenci z researchu SERP).
const domeny = process.argv.length > 3
  ? process.argv.slice(3)
  : ['simplefast.ai', 'gagan.pl', 'mits.pl', 'malinski.ai', 'lessmanual.ai', 'syntalith.ai', 'wasko.pl'];

async function dr(target) {
  try {
    const r = await fetch(`https://api.ahrefs.com/v3/public/domain-rating-free?target=${encodeURIComponent(target)}`, {
      headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
    });
    if (!r.ok) {
      const t = (await r.text()).split(key).join('KLUCZ_UKRYTY');
      return { target, blad: `HTTP ${r.status}`, tresc: t.slice(0, 90) };
    }
    const j = await r.json();
    return { target, dr: j.domain_rating?.domain_rating ?? null };
  } catch (e) {
    return { target, blad: String(e.message).split(key).join('KLUCZ_UKRYTY').slice(0, 80) };
  }
}

(async () => {
  console.log('=== AHREFS: sila domen (Domain Rating 0-100) ===\n');
  const wyniki = [];
  for (const d of domeny) wyniki.push(await dr(d));

  const nasz = wyniki.find((w) => /simplefast/.test(w.target));
  wyniki.sort((a, b) => (b.dr ?? -1) - (a.dr ?? -1));

  wyniki.forEach((w) => {
    const my = /simplefast/.test(w.target) ? '  <-- MY' : '';
    if (w.blad) console.log(`  ${w.target.padEnd(20)} BLAD ${w.blad} ${w.tresc || ''}`);
    else console.log(`  DR ${String(w.dr).padStart(5)}  ${w.target.padEnd(20)}${my}`);
  });

  if (nasz && nasz.dr != null) {
    const slabsi = wyniki.filter((w) => w.dr != null && w.dr < nasz.dr && !/simplefast/.test(w.target));
    const mocniejsi = wyniki.filter((w) => w.dr != null && w.dr > nasz.dr);
    console.log(`\nWNIOSEK: nasz DR = ${nasz.dr}.`);
    if (slabsi.length) {
      console.log(`  Slabsi od nas (mozemy ich wyprzedzic TRESCIA, bez budowania linkow): ${slabsi.map((w) => `${w.target} (${w.dr})`).join(', ')}`);
    }
    if (mocniejsi.length) {
      console.log(`  Mocniejsi (tu potrzebne tez linki, nie tylko tresc): ${mocniejsi.map((w) => `${w.target} (${w.dr})`).join(', ')}`);
    }
  }

  console.log('\nUWAGA: wolumeny fraz i pozycje bierz z Search Console (tools/gsc-raport.js).');
  console.log('Ahrefs w tym planie ich nie udostepnia (site-explorer i keywords-explorer = 401).');
})();
