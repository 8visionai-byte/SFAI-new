/**
 * POMIAR v9 PARTIA B — realny Chrome przez CDP, zero nowych zaleznosci.
 * Node 24 ma globalny WebSocket, wiec sterujemy przegladarka bez puppeteera.
 *
 * Uzycie: node pomiar.mjs <etykieta>  (np. "przed" / "po")
 * Wymaga dzialajacego serwera na http://localhost:3000
 */
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ETYKIETA = process.argv[2] ?? 'pomiar';
const OUT = process.argv[3] ?? process.cwd();
mkdirSync(OUT, { recursive: true });

const CHROME = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9333;
const URL_STRONY = 'http://localhost:3000/';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--user-data-dir=' + join(OUT, 'chrome-profil'),
  'about:blank',
]);
let logChrome = '';
chrome.stderr.on('data', (d) => (logChrome += d.toString()));
chrome.stdout.on('data', (d) => (logChrome += d.toString()));

async function czekajNaDevTools() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return await r.json();
    } catch {}
    await sleep(500);
  }
  throw new Error('DevTools nie wstalo. Log Chrome: ' + logChrome.slice(0, 800));
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.oczekujace = new Map();
    this.nasluch = new Map();
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.oczekujace.has(msg.id)) {
        const { res, rej } = this.oczekujace.get(msg.id);
        this.oczekujace.delete(msg.id);
        msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
      } else if (msg.method && this.nasluch.has(msg.method)) {
        for (const cb of this.nasluch.get(msg.method)) cb(msg.params);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((res, rej) => {
      this.oczekujace.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  on(method, cb) {
    if (!this.nasluch.has(method)) this.nasluch.set(method, []);
    this.nasluch.get(method).push(cb);
  }
  async ocen(wyrazenie) {
    const r = await this.send('Runtime.evaluate', {
      expression: wyrazenie,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  }
}

const POMIAR = `(() => {
  const q = (s) => document.querySelector(s);
  const prost = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  };
  const styl = (el, wl) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const o = {};
    for (const w of wl) o[w] = cs[w];
    return o;
  };

  const wynik = {};
  wynik.viewport = { w: innerWidth, h: innerHeight };
  wynik.poziomyScroll = {
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    bodyScrollW: document.body.scrollWidth,
    jestScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  };

  // 1. BLOB
  const flow = q('.flow-core.voice-aura');
  const slot = flow ? flow.parentElement : null;
  wynik.blob = {
    slot: prost(slot),
    slotKlasy: slot ? slot.className : null,
    slotMargines: styl(slot, ['marginTop','marginBottom','marginLeft','marginRight']),
    canvas: prost(q('.voice-aura canvas')),
    ambient: styl(q('.voice-aura__ambient'), ['width','height','opacity','filter']),
    trigger: prost(q('.voice-core-trigger')),
    label: styl(q('.voice-core-label'), ['fontSize','color']),
  };

  // 2. H1 / overline / chipy / liczniki
  wynik.hero = {
    h1: prost(q('h1')),
    overline: prost(q('.inf-overline')),
    chip1: prost(document.querySelectorAll('.inf-chip')[0]),
    chipTekstW: (() => {
      const c = document.querySelectorAll('.inf-chip')[0];
      return c ? Math.round(c.getBoundingClientRect().width) : null;
    })(),
    licznik: prost(q('.inf-counter')),
    sekcjaWys: prost(q('main section')),
  };

  // 3. TERMINAL (okno Agent SimpleFast w sekcji #branze)
  const term = (() => {
    const s = document.getElementById('branze');
    if (!s) return null;
    const spany = [...s.querySelectorAll('span')];
    const tytul = spany.find((e) => e.textContent.trim() === 'Agent SimpleFast');
    if (!tytul) return null;
    return tytul.closest('div').parentElement; // pasek -> okno
  })();
  wynik.terminal = {
    prost: prost(term),
    klasy: term ? term.className : null,
    styl: styl(term, ['backgroundColor','borderColor','boxShadow','opacity','backdropFilter']),
    pasek: styl(term ? term.firstElementChild : null, ['backgroundColor']),
    cialoTekst: (() => {
      const p = term ? term.querySelector('p') : null;
      return p ? { tekst: p.textContent.trim().slice(0, 60), styl: styl(p, ['color']) } : null;
    })(),
  };

  // 4. NIE ZGADUJ
  const nieZgaduj = [...document.querySelectorAll('p')].find((p) => p.textContent.startsWith('Nie zgaduj.'));
  const kartaNZ = nieZgaduj ? nieZgaduj.closest('.inf-card') : null;
  const cta = kartaNZ ? kartaNZ.querySelector('a') : null;
  wynik.nieZgaduj = {
    karta: prost(kartaNZ),
    kartaStyl: styl(kartaNZ, ['textAlign']),
    akapit: prost(nieZgaduj),
    kafelek: prost(kartaNZ ? kartaNZ.querySelector('.inf-tile') : null),
    cta: prost(cta),
    ctaKlasy: cta ? cta.className : null,
    ctaTekst: cta ? cta.textContent.trim() : null,
    ctaStyl: styl(cta, ['backgroundColor','color','borderRadius','borderColor','minHeight']),
    odchylenieCTA: (() => {
      if (!kartaNZ || !cta) return null;
      const k = kartaNZ.getBoundingClientRect(), c = cta.getBoundingClientRect();
      return Math.round((c.x + c.width / 2) - (k.x + k.width / 2));
    })(),
  };

  // 5. FAB + wskaznik kursora
  const fab = q('.agent-fab');
  wynik.fab = {
    prost: prost(fab),
    styl: styl(fab, ['borderRadius','width','height','backgroundColor']),
  };
  const kursor = q('.inf-kursor');
  wynik.kursor = kursor
    ? { klasy: kursor.className, styl: styl(kursor, ['width','height','borderRadius','backgroundColor','borderWidth']) }
    : null;

  return wynik;
})()`;

const main = async () => {
  const wersja = await czekajNaDevTools();
  const ws = new WebSocket(wersja.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  const browser = new CDP(ws);

  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });

  // Sesja: opakowanie wysylajace z sessionId
  const cdp = {
    send: (method, params = {}) => browser.send(method, { ...params, sessionId }),
    ocen: async (w) => {
      const r = await browser.send('Runtime.evaluate', { expression: w, returnByValue: true, awaitPromise: true, sessionId });
      if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
      return r.result.value;
    },
  };
  // Ominiecie: Target.attachToTarget z flatten wymaga wysylki z sessionId w kopercie
  const wyslijSesja = (method, params = {}) => {
    const id = ++browser.id;
    return new Promise((res, rej) => {
      browser.oczekujace.set(id, { res, rej });
      browser.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  };
  cdp.send = wyslijSesja;
  cdp.ocen = async (w) => {
    const r = await wyslijSesja('Runtime.evaluate', { expression: w, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');

  const raport = { etykieta: ETYKIETA, kiedy: new Date().toISOString(), widoki: {} };

  const zmierzWidok = async (nazwa, szerokosc, wysokosc, mobile) => {
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: szerokosc, height: wysokosc, deviceScaleFactor: 1, mobile,
    });
    await cdp.send('Page.navigate', { url: URL_STRONY });
    await sleep(6000); // window.load + idle boot (VoiceAura, orkiestrator)
    const dane = await cdp.ocen(POMIAR);
    raport.widoki[nazwa] = dane;
    return dane;
  };

  await zmierzWidok('desktop-1440', 1440, 900, false);

  // HOVER na FAB (tylko desktop): ruch myszy -> stan :hover + wskaznik kursora
  const fabProst = raport.widoki['desktop-1440'].fab.prost;
  if (fabProst) {
    const x = fabProst.x + fabProst.w / 2;
    const y = fabProst.y + fabProst.h / 2;
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x - 200, y: y - 200, pointerType: 'mouse' });
    await sleep(200);
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, pointerType: 'mouse' });
    await sleep(900);
    raport.hoverFab = await cdp.ocen(`(() => {
      const q = (s) => document.querySelector(s);
      const st = (el, wl) => { if (!el) return null; const cs = getComputedStyle(el); const o = {}; for (const w of wl) o[w] = cs[w]; return o; };
      const fab = q('.agent-fab');
      const r = fab ? fab.getBoundingClientRect() : null;
      const kur = q('.inf-kursor');
      const rk = kur ? kur.getBoundingClientRect() : null;
      return {
        fab: r ? { w: Math.round(r.width), h: Math.round(r.height) } : null,
        fabStyl: st(fab, ['borderRadius','width','height']),
        kursorKlasy: kur ? kur.className : null,
        kursorStyl: st(kur, ['width','height','borderRadius','borderWidth','backgroundColor']),
        kursorProst: rk ? { w: Math.round(rk.width), h: Math.round(rk.height) } : null,
      };
    })()`);
    // Zrzut rogu z FABem w stanie hover
    const zrzut = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 1440 - 320, y: 900 - 160, width: 320, height: 160, scale: 2 },
    });
    writeFileSync(join(OUT, `${ETYKIETA}-fab-hover.png`), Buffer.from(zrzut.data, 'base64'));
  }

  // Zrzuty sekcji (desktop): hero, terminal, nie zgaduj
  /* Zrzut MUSI byc poprzedzony realnym przewinieciem: tresc siedzi w [data-reveal]
     (opacity 0 do wejscia w kadr), wiec captureBeyondViewport dawal czarny obraz. */
  const zrzucSekcje = async (nazwa, selektorJs) => {
    /* Lenis (smooth scroll) co klatke przywraca WLASNA pozycje, wiec
       scrollIntoView/window.scrollTo sa cofane. Jedyne, co Lenis honoruje, to
       REALNE zdarzenie kolka — stad Input.synthesizeScrollGesture. */
    let r = null;
    for (let i = 0; i < 40; i++) {
      r = await cdp.ocen(`(() => { const el = ${selektorJs}; if (!el) return null; const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; })()`);
      if (!r) return null;
      const cel = Math.max(40, Math.round((900 - Math.min(r.h, 780)) / 2));
      const delta = r.y - cel;
      if (Math.abs(delta) < 14) break;
      await cdp.send('Input.synthesizeScrollGesture', {
        x: 720, y: 450,
        yDistance: -Math.max(-900, Math.min(900, delta)),
        speed: 6000,
        gestureSourceType: 'mouse',
      });
      await sleep(350);
    }
    await sleep(1400); // reveal (transition 600ms) + dojazd Lenisa
    /* UWAGA: clip w Page.captureScreenshot jest w wspolrzednych DOKUMENTU,
       nie viewportu — bez dodania scrollX/scrollY wychodzil czarny obraz
       z gory strony (to byla przyczyna pierwszych pustych zrzutow). */
    r = await cdp.ocen(`(() => { const el = ${selektorJs}; const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
               sx: Math.round(scrollX), sy: Math.round(scrollY) }; })()`);
    const zrzut = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: Math.max(0, r.x - 40) + r.sx,
        y: Math.max(0, r.y - 40) + r.sy,
        width: Math.min(1440 - Math.max(0, r.x - 40), r.w + 80),
        height: Math.min(900 - Math.max(0, r.y - 40), r.h + 80),
        scale: 1,
      },
    });
    writeFileSync(join(OUT, `${ETYKIETA}-${nazwa}.png`), Buffer.from(zrzut.data, 'base64'));
    raport.zrzuty = raport.zrzuty || {};
    raport.zrzuty[nazwa] = r;
    return r;
  };

  await zrzucSekcje('hero', `document.querySelector('main section')`);
  await zrzucSekcje('terminal', `(() => { const s = document.getElementById('branze'); if (!s) return null;
     const t = [...s.querySelectorAll('span')].find((e) => e.textContent.trim() === 'Agent SimpleFast');
     return t ? t.closest('div').parentElement : null; })()`);
  await zrzucSekcje('nie-zgaduj', `(() => { const p = [...document.querySelectorAll('p')].find((p) => p.textContent.startsWith('Nie zgaduj.'));
     return p ? p.closest('.inf-card') : null; })()`);

  await zmierzWidok('mobile-375', 375, 812, true);
  await zmierzWidok('mobile-320', 320, 640, true);

  writeFileSync(join(OUT, `${ETYKIETA}-pomiar.json`), JSON.stringify(raport, null, 2), 'utf8');
  console.log(JSON.stringify(raport, null, 2));

  await browser.send('Browser.close').catch(() => {});
  chrome.kill();
};

main().catch((e) => {
  console.error('BLAD:', e);
  chrome.kill();
  process.exit(1);
});
