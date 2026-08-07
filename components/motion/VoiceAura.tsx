'use client';

import { useEffect, useRef } from 'react';
import '@/components/agent/flow-core.css';

/**
 * VoiceAura — FlowCore 1:1 z repo 10K (spec INFINITY v5 §1; decyzja Pawła:
 * „przenieś CAŁĄ strukturę agenta głosowego jeden do jednego... Zamiast tej
 * wizualizacji 3D wrzucasz tutaj naszego bota").
 *
 * PORT z src/components/FlowCore.astro: markup (klasy + data-atrybuty),
 * shader WebGL (vertex + fragment), boot/render/cleanup — 1:1 ze źródłem.
 * Środek sceny to PRZYCISK data-agent-open="voice" (NIE link) — otwiera
 * konsolę agenta (delegacja kliku w agent-console-init.ts). Konsola nadaje
 * blobom klasę .is-voice-open i wysyła zdarzenia 'sfai:voice-energy', na
 * które shader reaguje energią (u_energy) — kontrakt zdarzeń 1:1 z 10K.
 *
 * RÓŻNICE względem źródła (wyłącznie techniczne, spójne z flow-core.css):
 *  1. Boot per-instancja przez ref (React; dwa bloby na stronie = dwa
 *     niezależne konteksty WebGL, jak querySelectorAll w 10K).
 *  2. Środek shadera 0.56 → 0.50 (ADAPTACJA #3 w flow-core.css: blob
 *     centrowany w dedykowanym slocie; --flow-object-x też 50%).
 *  3. Start silnika po window.load + requestIdleCallback (żelazna zasada
 *     perf repo: nic nie konkuruje z LCP maszyny pisania; w 10K skrypt
 *     odpalał się od razu). Bramki reduced-motion / Save-Data są 1:1.
 *  4. Cleanup dodatkowo spięty z unmountem (SPA: zejście ze strony głównej
 *     musi zwolnić kontekst WebGL; w MPA 10K robił to pagehide).
 *  5. PALETA shadera (spec INFINITY v7, partia B): limonka 10K zamieniona na
 *     kolory TEJ strony — spectrum idzie różem #ff007f -> fioletem #8b5cf6,
 *     rdzeń i blask w bieli różowej. Zmieniona jest WYŁĄCZNIE barwa: wszystkie
 *     mnożniki, alfy i progi zostają 1:1 (moc świecenia bez zmian).
 */

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/* Shader 1:1 z FlowCore.astro. */
const vertexSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

/* Fragment 1:1 ze źródła; dwie zmiany: center 0.56 → 0.50 (różnica #2/#3, patrz
   nagłówek i flow-core.css — musi być równe --flow-object-x) oraz barwy bloba
   róż/fiolet zamiast limonki (różnica #5). Reszta matematyki nietknięta. */
const fragmentSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;
  uniform float u_energy;
  uniform float u_progress;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + vec2(4.7, 2.1);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / max(1.0, u_resolution.y);
    vec2 center = vec2(0.50, 0.50) + u_pointer * vec2(0.012, -0.010);
    vec2 p = uv - center;
    p.x *= aspect;

    float time = u_time * (0.58 + u_energy * 0.18);
    float baseRadius = length(p);
    if (baseRadius > .52) {
      gl_FragColor = vec4(0.0);
      return;
    }

    float warpX = noise(p * 2.15 + vec2(time * .055, -time * .032));
    float warpY = noise(p * 2.37 + vec2(-time * .041, time * .047) + 9.7);
    vec2 q = p + (vec2(warpX, warpY) - .5) * (.038 + u_energy * .014);
    float angle = atan(q.y, q.x);
    float radius = length(q);
    float grain = fbm(q * 3.5 + vec2(time * 0.075, -time * 0.052));
    float breath = sin(time * 1.18) * 0.009 + sin(time * 0.43) * 0.006;
    float voiceWave = sin(angle * 3.0 - time * 1.16) * 0.014;
    voiceWave += sin(angle * 6.0 + time * 0.82) * 0.008;
    voiceWave += (grain - 0.5) * (0.016 + u_energy * 0.012);

    float boundary = 0.232 + breath * .82 + voiceWave;
    float outerDistance = abs(radius - boundary);
    float innerDistance = abs(radius - (boundary - 0.043 - sin(angle * 2.0 + time) * 0.007));
    float outerGlow = exp(-outerDistance * (21.0 - u_energy * 2.2));
    float innerGlow = exp(-innerDistance * 35.0);
    float body = 1.0 - smoothstep(boundary - 0.09, boundary + 0.048, radius);
    float veil = body * (0.15 + grain * 0.17);
    float core = exp(-radius * radius * (34.0 - u_energy * 4.0));
    float innerMist = exp(-radius * radius * 14.0) * (0.52 + grain * .42);

    float ribbonPhase = angle * 2.0 + time * 0.75 + grain * 1.8;
    float ribbon = exp(-abs(sin(ribbonPhase) - (radius / max(boundary, .01) - .52)) * 7.0);
    ribbon *= 1.0 - smoothstep(boundary - .08, boundary + .02, radius);

    float signalWave = sin(angle * 7.0 - time * (1.25 + u_energy * .28)) * (.003 + u_energy * .0025);
    float signalRing = exp(-abs(radius - (boundary + .034 + signalWave)) * 62.0);
    signalRing *= 1.0 - smoothstep(boundary + .03, boundary + .12, radius);

    float pulse = 0.75 + sin(time * 1.35 + radius * 18.0) * 0.07 + u_energy * 0.24;
    vec3 deepViolet = vec3(0.14, 0.05, 0.24);
    vec3 softWhite = vec3(1.0, 0.93, 0.98);
    vec3 rose = vec3(1.0, 0.0, 0.50);
    vec3 violet = vec3(0.545, 0.361, 0.965);
    float chroma = sin(angle + time * .31) * .5 + .5;
    vec3 spectrum = mix(rose, violet, chroma);
    vec3 edgeColor = mix(deepViolet, spectrum, .68 + u_energy * .10);
    edgeColor = mix(edgeColor, softWhite, innerGlow * .38 + outerGlow * .13);
    vec3 coreColor = mix(rose, softWhite, .47);

    float halo = exp(-max(0.0, radius - boundary) * 9.0) * (1.0 - smoothstep(boundary - .01, boundary + .22, radius));
    float alpha = (outerGlow * .4 + innerGlow * .2 + veil * .25 + ribbon * .1 + signalRing * .075 + halo * .065 + core * .11) * pulse;
    alpha *= 1.0 - smoothstep(.16, .45, radius);
    alpha *= .88 + u_progress * .08;

    vec3 rgb = edgeColor * (outerGlow * .48 + innerGlow * .29 + veil * .23 + ribbon * .10);
    rgb += coreColor * core * (.24 + u_energy * .1);
    rgb += rose * innerMist * .062;
    rgb += spectrum * (ribbon * .05 + signalRing * .065 + outerGlow * .03);
    rgb += (hash(gl_FragCoord.xy + u_time) - .5) / 255.0;
    alpha = clamp(alpha, 0.0, .82);
    gl_FragColor = vec4(max(rgb, vec3(0.0)) * alpha, alpha);
  }
`;

const compileShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Shader unavailable');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Shader compilation failed';
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
};

/* Boot silnika dla JEDNEJ instancji (1:1 z bootVoiceAura, bez querySelectorAll —
   różnica #1). Zwraca cleanup albo undefined (tryb statyczny). */
const bootVoiceAura = (container: HTMLElement): (() => void) | undefined => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = container.querySelector('[data-voice-aura-canvas]');
  const stateLabel = container.querySelector('[data-aura-state]');
  if (!(canvas instanceof HTMLCanvasElement) || canvas.dataset.ready) return undefined;
  canvas.dataset.ready = 'true';

  const compactQuery = window.matchMedia('(max-width: 760px)');
  let mobile = compactQuery.matches;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    mozConnection?: { saveData?: boolean };
    webkitConnection?: { saveData?: boolean };
  };
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  const saveData = Boolean(connection?.saveData);

  if (reduced || saveData) {
    container.classList.remove('is-booting');
    container.classList.add('is-static', 'is-ready');
    return undefined;
  }

  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    powerPreference: 'high-performance',
  });

  if (!gl) {
    container.classList.remove('is-booting');
    container.classList.add('is-static', 'is-fallback', 'is-ready');
    return undefined;
  }

  try {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (!program) throw new Error('Program unavailable');
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Program link failed');
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      pointer: gl.getUniformLocation(program, 'u_pointer'),
      time: gl.getUniformLocation(program, 'u_time'),
      energy: gl.getUniformLocation(program, 'u_energy'),
      progress: gl.getUniformLocation(program, 'u_progress'),
    };

    let width = 1;
    let height = 1;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetProgress = mobile ? .48 : 0;
    let progress = targetProgress;
    let energy = .26;
    let targetVoiceEnergy = 0;
    let voiceEnergy = 0;
    let visible = false;
    let running = false;
    let frame = 0;
    let disposed = false;
    let lastFrame = 0;
    let activeTime = 0;
    let cachedRect = container.getBoundingClientRect();
    const hero = container.closest('[data-hero]');
    const stateNames = ['Słucha / 01', 'Rozumie / 02', 'Działa / 03', 'Dowozi / 04'];

    const setProgress = (value: number) => {
      targetProgress = mobile ? .48 : clamp(value, 0, 1);
      container.style.setProperty('--metal-progress', String(targetProgress));
      if (stateLabel) stateLabel.textContent = stateNames[Math.min(3, Math.floor(targetProgress * 4))] ?? '';
    };

    const onHeroProgress = (event: Event) => {
      if (event instanceof CustomEvent && typeof (event as CustomEvent<{ progress?: unknown }>).detail?.progress === 'number') {
        setProgress((event as CustomEvent<{ progress: number }>).detail.progress);
      }
    };
    hero?.addEventListener('sfai:hero-progress', onHeroProgress);

    const onPointerMove = (event: PointerEvent) => {
      if (mobile || !visible || event.pointerType === 'touch') return;
      const rect = cachedRect;
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      targetPointerX = inside ? clamp(((event.clientX - rect.left) / rect.width - .5) * 2, -1, 1) : 0;
      targetPointerY = inside ? clamp(((event.clientY - rect.top) / rect.height - .5) * 2, -1, 1) : 0;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onVoiceEnergy = (event: Event) => {
      if (!(event instanceof CustomEvent) || typeof (event as CustomEvent<{ energy?: unknown }>).detail?.energy !== 'number') return;
      targetVoiceEnergy = clamp((event as CustomEvent<{ energy: number }>).detail.energy, 0, 1);
    };
    document.addEventListener('sfai:voice-energy', onVoiceEnergy);

    const resize = () => {
      mobile = compactQuery.matches;
      cachedRect = container.getBoundingClientRect();
      const rect = cachedRect;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.35);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const render = (time: number) => {
      if (!running || disposed) return;
      frame = requestAnimationFrame(render);
      const voiceOpen = container.classList.contains('is-voice-open');
      const activeVoice = voiceOpen || targetVoiceEnergy > .08;
      const frameInterval = activeVoice ? (mobile ? 22 : 15) : 30;
      if (time - lastFrame < frameInterval) return;
      const delta = Math.min(.05, Math.max(.001, lastFrame ? (time - lastFrame) * .001 : .016));
      lastFrame = time;
      if (document.hidden || document.body.classList.contains('menu-open')) return;

      activeTime += delta;
      const pointerBlend = 1 - Math.exp(-4.8 * delta);
      const motionBlend = 1 - Math.exp(-3.4 * delta);
      const voiceBlend = 1 - Math.exp(-(targetVoiceEnergy > voiceEnergy ? 12 : 3.8) * delta);
      pointerX += (targetPointerX - pointerX) * pointerBlend;
      pointerY += (targetPointerY - pointerY) * pointerBlend;
      progress += (targetProgress - progress) * motionBlend;
      voiceEnergy += (targetVoiceEnergy - voiceEnergy) * voiceBlend;
      const targetEnergy = Math.max(voiceOpen ? .58 : .26, .26 + voiceEnergy * .74);
      energy += (targetEnergy - energy) * motionBlend;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uniforms.resolution, width, height);
      gl.uniform2f(uniforms.pointer, pointerX, pointerY);
      gl.uniform1f(uniforms.time, activeTime);
      gl.uniform1f(uniforms.energy, energy);
      gl.uniform1f(uniforms.progress, progress);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const start = () => {
      if (running || disposed || !visible) return;
      running = true;
      frame = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) start();
      else stop();
    }, { rootMargin: '140px' });
    observer.observe(container);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    const onContextLost = () => {
      stop();
      container.classList.remove('is-rendered');
      container.classList.add('is-fallback');
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    const cleanup = () => {
      disposed = true;
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('sfai:voice-energy', onVoiceEnergy);
      hero?.removeEventListener('sfai:hero-progress', onHeroProgress);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      // Różnica #4: flaga boot-guard zdjęta, żeby remount (SPA/StrictMode)
      // mógł zbudować silnik na nowo — w MPA 10K strona i tak ginęła.
      delete canvas.dataset.ready;
    };
    const onPageHide = (event: PageTransitionEvent) => {
      if (event.persisted) {
        stop();
        return;
      }
      cleanup();
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted || disposed) return;
      resize();
      start();
    };
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onPageShow);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uniforms.resolution, width, height);
    gl.uniform2f(uniforms.pointer, 0, 0);
    gl.uniform1f(uniforms.time, 0);
    gl.uniform1f(uniforms.energy, energy);
    gl.uniform1f(uniforms.progress, progress);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(() => {
      container.classList.remove('is-booting');
      container.classList.add('is-ready', 'is-rendered');
    });

    return cleanup;
  } catch (error) {
    console.warn('Voice Aura fallback:', error);
    container.classList.remove('is-booting', 'is-rendered');
    container.classList.add('is-static', 'is-fallback', 'is-ready');
    return undefined;
  }
};

export function VoiceAura() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = rootRef.current;
    if (!container) return undefined;

    let engineCleanup: (() => void) | undefined;
    let disposed = false;
    let idleId = 0;
    let usedTimeout = false;

    // Różnica #3: silnik startuje po window.load + idle (wzorzec MotionGate
    // repo — LCP maszyny pisania jest święte). Do tego czasu widać statyczną
    // aurę CSS (.voice-aura__fallback przez .is-booting nie jest jeszcze
    // widoczna — jak w 10K przed startem skryptu; ambient działa od razu).
    const arm = () => {
      const kick = () => {
        if (disposed) return;
        engineCleanup = bootVoiceAura(container);
      };
      // typeof zamiast `in`: lib.dom deklaruje requestIdleCallback zawsze,
      // a Safari realnie go nie ma.
      const ric = window.requestIdleCallback as typeof window.requestIdleCallback | undefined;
      if (typeof ric === 'function') {
        idleId = ric(kick, { timeout: 1500 });
      } else {
        usedTimeout = true;
        idleId = window.setTimeout(kick, 300);
      }
    };

    if (document.readyState === 'complete') {
      arm();
    } else {
      window.addEventListener('load', arm, { once: true });
    }
    return () => {
      disposed = true;
      window.removeEventListener('load', arm);
      if (idleId) {
        const cic = window.cancelIdleCallback as typeof window.cancelIdleCallback | undefined;
        if (usedTimeout) window.clearTimeout(idleId);
        else if (typeof cic === 'function') cic(idleId);
      }
      engineCleanup?.();
    };
  }, []);

  /* Markup 1:1 z FlowCore.astro (te same klasy i data-atrybuty). */
  return (
    <div ref={rootRef} className="flow-core voice-aura is-booting" data-flow-core>
      {/* Ambientowa poświata pod blobem (czysty CSS, działa od pierwszego paintu) */}
      <div className="voice-aura__ambient" aria-hidden="true"></div>

      {/* Statyczna aura fallback (reduced-motion / Save-Data / brak WebGL) */}
      <div className="flow-metal-fallback voice-aura__fallback" data-flow-fallback aria-hidden="true">
        <span></span><i></i><b></b>
      </div>

      {/* Canvas shadera WebGL (blob „żywej modulacji" 1:1 z 10K) */}
      <canvas data-voice-aura-canvas aria-hidden="true"></canvas>

      {/* HUD stanu agenta (mono, znika na mobile przez CSS) */}
      <div className="flow-metal-hud" aria-hidden="true">
        <span>[ Agent głosowy / realtime ]</span>
        <span data-aura-state>Słucha / 01</span>
      </div>

      {/* PRZYCISK otwierający konsolę głosową (NIE link — spec v5 §1);
          klik łapie delegacja w agent-console-init.ts */}
      <button
        className="voice-core-trigger"
        type="button"
        data-agent-open="voice"
        aria-label="Otwórz rozmowę głosową z Agentem SimpleFast.ai"
      >
        <span className="voice-core-orbit" aria-hidden="true"><i></i><b></b></span>
        <span className="voice-core-label">Zapytaj AI</span>
        <span className="voice-core-caption" aria-hidden="true">Voice agent</span>
      </button>

      {/* Indeks postępu (mono; pasek skaluje --metal-progress) */}
      <div className="flow-metal-index" aria-hidden="true"><i></i><span>Żywa modulacja</span><b>SF / AI</b></div>
    </div>
  );
}
