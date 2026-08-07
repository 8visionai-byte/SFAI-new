/**
 * agent-console-init.ts — PORT MINIMALNY 947-liniowego src/scripts/agent-console.js
 * z repo 10K (spec INFINITY v5 §1). Logika, komunikaty, progi czasowe, choreografia
 * stanów: 1:1 ze źródłem. Różnice WYŁĄCZNIE techniczne (każda skomentowana w miejscu):
 *
 *  1. Całość opakowana w eksportowaną funkcję initAgentConsole() wołaną po mount
 *     (useEffect w AgentConsole.tsx); zwraca cleanup zdejmujący WSZYSTKIE listenery
 *     i gaszący głos (React StrictMode w dev montuje efekt dwukrotnie).
 *  2. Ścieżka czatu: '/api/chat' → '/api/agent-chat' (kolizja: app/api/chat repo
 *     to inny, istniejący endpoint; 10K chat.mjs jedzie jako /api/agent-chat.mjs).
 *  3. SPA zamiast MPA: przyciski [data-agent-open] i bloby [data-flow-core] żyją
 *     w treści stron (React wymienia je przy nawigacji klienta), więc otwieranie
 *     idzie DELEGACJĄ na document, a lista flow-core jest odpytywana na żywo.
 *     Elementy samej konsoli są stabilne (montaż w layout) — listenery wprost, 1:1.
 *  4. Typy TypeScript (strict + noUncheckedIndexedAccess): wąskie guardy/casty,
 *     zero zmian zachowania. Import '@elevenlabs/client' zostaje DYNAMICZNY
 *     (SDK ładuje się dopiero przy starcie rozmowy, nie w bundlu strony).
 */

/* Wynik navigate_to zwracany do LLM (expects_response) — kształt 1:1 ze źródła. */
type NavResult =
  | { ok: true; action: string; target: string; note: string }
  | { ok: false; error: string; known_sections?: string[] };

/* Payload /api/elevenlabs-session (kontrakt serwera — patrz api/elevenlabs-session.mjs). */
type VoiceSessionPayload = {
  provider?: string;
  connection?: Record<string, unknown>;
  /* Nazwa client toola nawigacji ustalona przez serwer (v6) — pod nią
     rejestrujemy handler, patrz NAV_TOOL_NAME w api/_knowledge.mjs. */
  toolName?: string;
  capabilities?: { firstMessageOverride?: boolean; resumeVarInPrompt?: boolean };
  dynamicVariables?: Record<string, string>;
  resumeContextualUpdate?: string;
  overrides?: Record<string, unknown>;
  error?: string;
  code?: string;
};

/* Payload /api/realtime-session (fallback OpenAI). */
type RealtimeTokenPayload = { value?: string; error?: string; code?: string };

/* Zdarzenia data channel OpenAI Realtime / SSE Responses (pola używane w porcie). */
type RealtimeEvent = {
  type?: string;
  delta?: unknown;
  response?: { output?: unknown };
};
type FunctionCallItem = { type?: string; name?: string; call_id?: string; arguments?: string };

/* Kontekst wznowienia z sessionStorage (kształt 1:1 ze źródła). */
type ResumeContext = { docked?: boolean; topic?: string; target?: string; at?: number };

/* Minimalny uchwyt sesji ElevenLabs (strukturalnie zgodny z SDK). */
type ElevenConversationHandle = {
  endSession: () => Promise<void>;
  sendContextualUpdate: (text: string) => void;
};

/* Błędy z kodem domenowym (source: error.code = '...') — TS-owy odpowiednik. */
const withCode = (message: string, code: string): Error => Object.assign(new Error(message), { code });
const errorCode = (error: unknown): string => (
  error && typeof error === 'object' && 'code' in error ? String((error as { code?: unknown }).code ?? '') : ''
);
const errorName = (error: unknown): string => (error instanceof Error ? error.name : '');
const errorMessage = (error: unknown): string => (error instanceof Error ? error.message : '');

export function initAgentConsole(): (() => void) | undefined {
  const consoleRoot = document.querySelector('[data-agent-console]');

  if (!(consoleRoot instanceof HTMLElement)) return undefined;

  /* Sprzątanie (port-only): każdy listener rejestrowany przez on() ma disposer. */
  const disposers: Array<() => void> = [];
  const on = (target: EventTarget, type: string, handler: EventListener, options?: AddEventListenerOptions): void => {
    target.addEventListener(type, handler, options);
    disposers.push(() => target.removeEventListener(type, handler, options));
  };

  const panel = consoleRoot.querySelector('[data-agent-panel]');
  const fab = document.querySelector('[data-agent-fab]');
  const closeButtons = consoleRoot.querySelectorAll('[data-agent-close]');
  const modeButtons = [...consoleRoot.querySelectorAll('[data-agent-mode]')];
  const chatPanel = consoleRoot.querySelector('[data-agent-chat-panel]');
  const voicePanel = consoleRoot.querySelector('[data-agent-voice-panel]');
  const messageList = consoleRoot.querySelector('[data-agent-messages]');
  const form = consoleRoot.querySelector('[data-agent-form]');
  const input = consoleRoot.querySelector('[data-agent-input]');
  const sendButton = consoleRoot.querySelector('[data-agent-send]');
  const suggestions = consoleRoot.querySelector('[data-agent-suggestions]');
  const connectionStatus = consoleRoot.querySelector('[data-agent-connection-status]');
  const voiceStart = consoleRoot.querySelector('[data-agent-voice-start]');
  const voiceStage = consoleRoot.querySelector('[data-agent-voice-stage]');
  const transcript = consoleRoot.querySelector('[data-agent-transcript]');
  // SPA (różnica #3): bloby FlowCore żyją w treści stron — lista odpytywana na żywo,
  // nie snapshotem z chwili init jak w MPA 10K.
  const flowCores = () => [...document.querySelectorAll('[data-flow-core]')];

  let previousFocus: Element | null = null;
  let currentMode = 'chat';
  const conversation: Array<{ role: 'user' | 'assistant'; content: string }> = [];
  let voicePeer: RTCPeerConnection | null = null;
  let voiceStream: MediaStream | null = null;
  let voiceAudio: HTMLAudioElement | null = null;
  let voiceChannel: RTCDataChannel | null = null;
  let voiceMeterContext: AudioContext | null = null;
  let voiceMeterSource: MediaStreamAudioSourceNode | null = null;
  let voiceMeterAnalyser: AnalyserNode | null = null;
  let voiceMeterData: Uint8Array<ArrayBuffer> | null = null;
  let voiceMeterFrame = 0;
  let voiceStateFloor = 0;
  let voiceSessionGeneration = 0;
  let voiceTokenController: AbortController | null = null;
  let voiceStartInFlight = false;
  let voiceDisconnectTimer = 0;
  // Ścieżka główna głosu: ElevenLabs Agents (SDK @elevenlabs/client, import dynamiczny).
  // Istniejąca ścieżka OpenAI Realtime zostaje jako automatyczny fallback.
  let elConversation: ElevenConversationHandle | null = null; // aktywna sesja ElevenLabs
  let elAgentMode = '';      // 'speaking' | 'listening' wg onModeChange SDK
  let pendingCrossNav: { path: string; sawSpeech: boolean; startedAt: number; timer: number } | null = null; // odroczone przejście na podstronę (czeka na koniec wypowiedzi agenta)

  // Pomocnik portu: transkrypt jest w markupie zawsze, ale TS nie przenosi
  // narrowingu do domknięć — jeden guard zamiast castów przy każdym użyciu.
  const setTranscript = (text: string): void => {
    if (transcript instanceof HTMLElement) transcript.textContent = text;
  };

  const isVoiceSessionActive = (generation: number) => (
    generation === voiceSessionGeneration
    && !consoleRoot.hidden
    && currentMode === 'voice'
  );

  const emitVoiceEnergy = (energy = 0, state = '') => {
    const value = Math.min(1, Math.max(0, Number.isFinite(energy) ? energy : 0));
    if (voiceStage instanceof HTMLElement) {
      voiceStage.style.setProperty('--voice-energy', value.toFixed(3));
      if (state) voiceStage.dataset.voiceState = state;
    }
    document.dispatchEvent(new CustomEvent('sfai:voice-energy', { detail: { energy: value, state } }));
  };

  const stopVoiceMeter = () => {
    cancelAnimationFrame(voiceMeterFrame);
    voiceMeterFrame = 0;
    try { voiceMeterSource?.disconnect(); } catch {}
    try { voiceMeterAnalyser?.disconnect(); } catch {}
    const meterContext = voiceMeterContext;
    voiceMeterContext = null;
    voiceMeterSource = null;
    voiceMeterAnalyser = null;
    voiceMeterData = null;
    voiceStateFloor = 0;
    try { meterContext?.close().catch(() => {}); } catch {}
    emitVoiceEnergy(0, 'idle');
  };

  const startVoiceMeter = (stream: MediaStream, generation: number) => {
    const AudioContextClass = window.AudioContext
      || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass || !(stream instanceof MediaStream)) return;
    void (async () => {
      let meterContext: AudioContext | null = null;
      let meterAnalyser: AnalyserNode | null = null;
      let meterSource: MediaStreamAudioSourceNode | null = null;
      try {
        meterContext = new AudioContextClass();
        if (meterContext.state === 'suspended') await meterContext.resume();
        if (!isVoiceSessionActive(generation) || voiceStream !== stream) return;

        meterAnalyser = meterContext.createAnalyser();
        meterAnalyser.fftSize = 256;
        meterAnalyser.smoothingTimeConstant = .76;
        const meterData = new Uint8Array(meterAnalyser.fftSize);
        meterSource = meterContext.createMediaStreamSource(stream);
        meterSource.connect(meterAnalyser);

        if (!isVoiceSessionActive(generation) || voiceStream !== stream) return;
        voiceMeterContext = meterContext;
        voiceMeterAnalyser = meterAnalyser;
        voiceMeterData = meterData;
        voiceMeterSource = meterSource;

        let smoothEnergy = 0;
        const measure = () => {
          if (!voiceMeterAnalyser || !voiceMeterData || !isVoiceSessionActive(generation)) return;
          try {
            voiceMeterAnalyser.getByteTimeDomainData(voiceMeterData);
            let sum = 0;
            for (const sample of voiceMeterData) {
              const normalized = (sample - 128) / 128;
              sum += normalized * normalized;
            }
            const rms = Math.sqrt(sum / voiceMeterData.length);
            const target = Math.min(1, Math.max(voiceStateFloor, rms * 5.2));
            const blend = target > smoothEnergy ? .38 : .1;
            smoothEnergy += (target - smoothEnergy) * blend;
            emitVoiceEnergy(smoothEnergy);
            voiceMeterFrame = requestAnimationFrame(measure);
          } catch {
            stopVoiceMeter();
          }
        };
        measure();
        meterContext = null;
        meterAnalyser = null;
        meterSource = null;
      } catch {
        // Metering is enhancement-only. WebRTC must continue without it.
      } finally {
        try { meterSource?.disconnect(); } catch {}
        try { meterAnalyser?.disconnect(); } catch {}
        try { meterContext?.close().catch(() => {}); } catch {}
      }
    })();
  };

  const setConnectionStatus = (label: string, state = '') => {
    if (!(connectionStatus instanceof HTMLElement)) return;
    connectionStatus.classList.toggle('is-working', state === 'working');
    connectionStatus.classList.toggle('is-local', state === 'local');
    const text = connectionStatus.querySelector('span');
    if (text) text.textContent = label;
  };

  const switchMode = (mode: string | null) => {
    const nextMode = mode === 'voice' ? 'voice' : 'chat';
    if (nextMode !== 'voice') stopVoice();
    currentMode = nextMode;
    flowCores().forEach((core) => core.classList.toggle('is-voice-open', currentMode === 'voice' && !consoleRoot.hidden));
    modeButtons.forEach((button) => {
      const active = button.getAttribute('data-agent-mode') === currentMode;
      button.setAttribute('aria-selected', String(active));
      if (button instanceof HTMLElement) button.tabIndex = active ? 0 : -1;
    });
    if (chatPanel instanceof HTMLElement) chatPanel.hidden = currentMode !== 'chat';
    if (voicePanel instanceof HTMLElement) voicePanel.hidden = currentMode !== 'voice';
  };

  // Tryb docked: panel przypięty do prawej krawędzi, strona widoczna i przewijalna,
  // rozmowa głosowa trwa dalej. Body dostaje 'agent-console-docked' zamiast
  // 'agent-console-open', bo site.js zatrzymuje Lenisa na 'agent-console-open'
  // (MutationObserver) — w docku scroll strony MUSI działać.
  let isDocked = false;
  let closeTimer = 0; // wiszące sprzątanie animowanego zamknięcia (patrz closeConsole/openConsole)
  const setDocked = (docked: boolean) => {
    isDocked = Boolean(docked) && !consoleRoot.hidden;
    consoleRoot.classList.toggle('is-docked', isDocked);
    if (panel instanceof HTMLElement) panel.setAttribute('aria-modal', String(!isDocked));
    document.body.classList.toggle('agent-console-docked', isDocked);
    document.body.classList.toggle('agent-console-open', !consoleRoot.hidden && !isDocked);
  };

  const openConsole = (mode = 'chat', docked = false) => {
    // Otwarcie w oknie animacji zamykania (300ms): anuluj wiszące sprzątanie
    // i zdejmij is-closing — inaczej zawieszony timeout ubiłby świeżo otwartą
    // konsolę (hidden=true + wyrwany focus) wbrew intencji użytkownika.
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = 0;
    }
    consoleRoot.classList.remove('is-closing');
    previousFocus = document.activeElement;
    consoleRoot.hidden = false;
    setDocked(docked);
    if (fab instanceof HTMLElement) {
      fab.setAttribute('aria-hidden', 'true');
      fab.setAttribute('tabindex', '-1');
    }
    switchMode(mode);
    window.setTimeout(() => {
      const target = currentMode === 'voice' ? voiceStart : input;
      if (target instanceof HTMLElement) target.focus();
    }, 70);
  };

  const stopVoice = () => {
    voiceSessionGeneration += 1;
    voiceStartInFlight = false;
    window.clearTimeout(voiceDisconnectTimer);
    voiceDisconnectTimer = 0;
    voiceTokenController?.abort();
    voiceTokenController = null;
    stopVoiceMeter();
    if (pendingCrossNav) {
      window.clearTimeout(pendingCrossNav.timer);
      pendingCrossNav = null;
      // Użytkownik świadomie przerwał rozmowę przed odroczonym przejściem —
      // flaga wznowienia nie może odpalić mikrofonu na następnej stronie.
      try { sessionStorage.removeItem(RESUME_KEY); } catch {}
    }
    if (elConversation) {
      const conversationToEnd = elConversation;
      elConversation = null;
      conversationToEnd.endSession().catch(() => {});
    }
    elAgentMode = '';
    voiceChannel?.close();
    voicePeer?.close();
    voiceStream?.getTracks().forEach((track) => track.stop());
    if (voiceAudio) {
      voiceAudio.pause();
      voiceAudio.srcObject = null;
      voiceAudio.remove();
    }
    voiceChannel = null;
    voicePeer = null;
    voiceStream = null;
    voiceAudio = null;
    if (voiceStart instanceof HTMLButtonElement) {
      voiceStart.disabled = false;
      voiceStart.setAttribute('aria-pressed', 'false');
      const label = voiceStart.querySelector('span');
      if (label) label.textContent = 'Rozpocznij rozmowę';
    }
    voiceStage?.classList.remove('is-live');
  };

  const closeConsole = () => {
    // Animowane zamknięcie (lustro wejścia, CSS .is-closing): głos gaśnie od razu,
    // reszta sprzątania po 300ms (0 przy reduced-motion). Guard chroni przed podwójnym
    // wywołaniem (Escape + klik) w trakcie animacji.
    if (consoleRoot.hidden || consoleRoot.classList.contains('is-closing')) return;
    stopVoice();
    consoleRoot.classList.add('is-closing');
    const closeDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300;
    closeTimer = window.setTimeout(() => {
      closeTimer = 0;
      consoleRoot.classList.remove('is-closing');
      consoleRoot.hidden = true;
      setDocked(false); // czyści 'agent-console-open' i 'agent-console-docked' na body
      flowCores().forEach((core) => core.classList.remove('is-voice-open'));
      if (fab instanceof HTMLElement) {
        fab.removeAttribute('aria-hidden');
        fab.removeAttribute('tabindex');
      }
      setConnectionStatus('gotowy');
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    }, closeDelay);
  };

  // FAB: od razu agent głosowy w trybie docked (panel z prawej, strona widoczna),
  // sesja startuje automatycznie (przeglądarka zapyta o mikrofon). Czat pozostaje
  // dostępny jako druga zakładka. Ewentualny klik przy otwartym docku = pełne okno.
  if (fab) {
    on(fab, 'click', () => {
      // W trakcie animacji zamykania hidden jest jeszcze false — klik FAB ma
      // wtedy otwierać na nowo, nie tylko przełączać dock.
      if (!consoleRoot.hidden && !consoleRoot.classList.contains('is-closing')) {
        setDocked(false);
        return;
      }
      openConsole('voice', true);
      startVoice();
    });
  }
  // SPA (różnica #3): delegacja zamiast listenerów per przycisk — przyciski
  // [data-agent-open] (blob w hero, CTA w ZyweDemo) React wymienia przy
  // nawigacji klienta, a delegacja na document łapie też te przyszłe.
  on(document, 'click', (event) => {
    const origin = event.target instanceof Element ? event.target.closest('[data-agent-open]') : null;
    if (!origin) return;
    openConsole(origin.getAttribute('data-agent-open') || 'chat');
  });
  closeButtons.forEach((button) => on(button, 'click', closeConsole));
  consoleRoot.querySelectorAll('[data-agent-undock]').forEach((button) => {
    on(button, 'click', () => setDocked(false));
  });
  modeButtons.forEach((button) => on(button, 'click', () => switchMode(button.getAttribute('data-agent-mode'))));

  on(consoleRoot, 'keydown', (event) => {
    if (!(event instanceof KeyboardEvent)) return;
    if (event.key === 'Escape') {
      closeConsole();
      return;
    }
    if (event.key !== 'Tab' || !(panel instanceof HTMLElement)) return;
    const focusable = [...panel.querySelectorAll('button:not([disabled]), textarea:not([disabled]), a[href]')]
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const resizeInput = () => {
    if (!(input instanceof HTMLTextAreaElement)) return;
    input.style.height = 'auto';
    input.style.height = `${Math.min(130, input.scrollHeight)}px`;
    input.style.overflowY = input.scrollHeight > 130 ? 'auto' : 'hidden';
  };
  if (input) on(input, 'input', resizeInput);
  if (input) {
    on(input, 'keydown', (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      if (event.key !== 'Enter' || event.shiftKey) return;
      event.preventDefault();
      if (form instanceof HTMLFormElement) form.requestSubmit();
    });
  }

  const appendMessage = (role: 'user' | 'assistant', content = '', streaming = false) => {
    if (!(messageList instanceof HTMLElement)) return null;
    const article = document.createElement('article');
    article.className = `agent-message agent-message--${role}`;
    if (streaming) article.classList.add('is-streaming');
    const meta = document.createElement('span');
    meta.className = 'agent-message__meta';
    meta.textContent = role === 'user' ? 'Ty' : 'S/F · AI';
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    article.append(meta, paragraph);
    messageList.append(article);
    messageList.scrollTop = messageList.scrollHeight;
    return { article, paragraph };
  };

  const fallbackAnswer = (question: string) => {
    const normalized = question.toLocaleLowerCase('pl-PL');
    if (/cen|koszt|budżet|wycen/.test(normalized)) {
      // Kwoty WYŁĄCZNIE publiczne ze strony (lib/uslugi/audyt-ai, opieka-ai):
      // Sprint 1490 zł odliczany od wdrożenia; reszta wyceny po diagnozie.
      return 'Cenę liczymy od wartości, nie od godzin. Najczęściej zaczynamy od Sprintu Diagnostycznego za 1490 zł, który odliczamy od wdrożenia, gdy ruszamy ze współpracą. Dokładne widełki podajemy na bezpłatnej diagnozie: /kontakt';
    }
    if (/voice|telefon|połącze|rozmow/.test(normalized)) {
      return 'Voicebot AI może odbierać połączenia po polsku, umawiać lub zmieniać terminy, potwierdzać wizyty i przekazywać człowiekowi tylko sprawy wymagające decyzji. Projekt zaczyna się od konkretnego call flow i wyjątków.';
    }
    if (/chatbot|czat|baza wiedzy/.test(normalized)) {
      return 'Chatbot SimpleFast.ai odpowiada na podstawie zatwierdzonej wiedzy firmy, może kwalifikować leady i przekazywać trudne sprawy człowiekowi. Agent AI idzie krok dalej: wykonuje działania w innych systemach, zamiast kończyć na odpowiedzi.';
    }
    if (/seo|geo|stron|google|chatgpt|perplexity|widocz/.test(normalized)) {
      // Trasa i treść z NASZEGO rejestru (lib/uslugi/strony-www): trasa 10K
      // /uslugi/strony-www-seo-ai/ na tej stronie dawała 404.
      return 'Budujemy strony widoczne nie tylko w Google, ale i w ChatGPT, Claude, Gemini oraz Perplexity: cała treść w kodzie od razu, ułożona pod cytowanie, szybka. Więcej: /uslugi/strony-www';
    }
    if (/opie|monitor|utrzym|rozw/.test(normalized)) {
      return 'Opieka AI to stały monitoring jakości agentów i automatyzacji, aktualizowanie wiedzy, poprawa wyjątków oraz rozwój integracji. Dzięki temu system po wdrożeniu nie zostaje bez właściciela.';
    }
    if (/agent|automatyz|proces|od czego|zaczą/.test(normalized)) {
      return 'Najlepszy start to nie wybór narzędzia, tylko jednego powtarzalnego procesu. SimpleFast.ai najpierw liczy koszt obecnej pracy i ryzyko, potem buduje najmniejszy działający system, testuje go na żywo i dopiero wtedy skaluje.';
    }
    return 'Mogę pomóc dobrać usługę, wyjaśnić sposób wdrożenia albo uporządkować pierwszy proces do automatyzacji. Napisz proszę: jaka to branża i która powtarzalna czynność zabiera najwięcej czasu?';
  };

  const parseEventBlock = (block: string): RealtimeEvent | null => {
    const data = block.split('\n').filter((line) => line.startsWith('data:')).map((line) => line.slice(5).trim()).join('\n');
    if (!data || data === '[DONE]') return null;
    try { return JSON.parse(data) as RealtimeEvent; } catch { return null; }
  };

  const streamResponse = async (response: Response, paragraph: HTMLParagraphElement) => {
    if (!response.body) return '';
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let answer = '';

    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value || new Uint8Array(), { stream: !done }).replace(/\r\n/g, '\n');
      let boundary = buffer.indexOf('\n\n');
      while (boundary >= 0) {
        const block = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const event = parseEventBlock(block);
        if (event?.type === 'response.output_text.delta' && typeof event.delta === 'string') {
          answer += event.delta;
          paragraph.textContent = answer;
          if (messageList instanceof HTMLElement) messageList.scrollTop = messageList.scrollHeight;
        }
        boundary = buffer.indexOf('\n\n');
      }
      if (done) break;
    }
    return answer.trim();
  };

  const askAgent = async (question: string) => {
    appendMessage('user', question);
    conversation.push({ role: 'user', content: question });
    suggestions?.setAttribute('hidden', '');
    const pending = appendMessage('assistant', '', true);
    if (!pending) return;
    setConnectionStatus('myśli', 'working');

    try {
      // Różnica #2 portu: 10K chat.mjs jedzie w tym repo jako /api/agent-chat
      // (nasz app/api/chat to osobny, istniejący endpoint Route Handlera).
      const response = await fetch('/api/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation.slice(-14) }),
      });
      if (!response.ok) throw new Error('Agent API unavailable');
      const answer = await streamResponse(response, pending.paragraph);
      if (!answer) throw new Error('Empty response');
      conversation.push({ role: 'assistant', content: answer });
      setConnectionStatus('online');
    } catch {
      const answer = fallbackAnswer(question);
      pending.paragraph.textContent = answer;
      conversation.push({ role: 'assistant', content: answer });
      setConnectionStatus('wiedza lokalna', 'local');
    } finally {
      pending.article.classList.remove('is-streaming');
      if (sendButton instanceof HTMLButtonElement) sendButton.disabled = false;
      if (input instanceof HTMLTextAreaElement) {
        input.disabled = false;
        input.focus();
      }
    }
  };

  suggestions?.querySelectorAll('[data-agent-prompt]').forEach((button) => {
    on(button, 'click', () => {
      const prompt = button.getAttribute('data-agent-prompt');
      if (prompt) askAgent(prompt);
    });
  });

  if (form) {
    on(form, 'submit', (event) => {
      event.preventDefault();
      if (!(input instanceof HTMLTextAreaElement)) return;
      const question = input.value.trim();
      if (!question) return;
      input.value = '';
      resizeInput();
      input.disabled = true;
      if (sendButton instanceof HTMLButtonElement) sendButton.disabled = true;
      askAgent(question);
    });
  }

  // WSPÓLNA STAŁA nawigacji po stronie klienta (jedno źródło w tym bundlu).
  // Klucze (id) 1:1 i W TEJ SAMEJ KOLEJNOŚCI co NAV_MAP/NAV_SECTIONS w
  // api/_knowledge.mjs (enum narzędzia navigate_to u obu dostawców głosu).
  // Spec INFINITY v6 PARTIA C: trasy TEJ strony (rejestr lib/uslugi + app/),
  // ścieżki bez końcowego slasha (konwencja repo). `anchor` = realne id
  // elementu w DOM, gdy różni się od klucza (dziś: wszystkie id = kotwice).
  const NAV_CLIENT: Array<{ id: string; path: string; label: string; anchor?: string }> = [
    { id: 'start', path: '/', label: 'strona główna' },
    { id: 'uslugi', path: '/uslugi', label: 'lista usług' },
    { id: 'chatboty', path: '/uslugi/chatboty', label: 'usługa Chatboty AI' },
    { id: 'voiceboty', path: '/uslugi/voiceboty', label: 'usługa Voiceboty AI' },
    { id: 'audyt-ai', path: '/uslugi/audyt-ai', label: 'usługa Audyt AI (Sprint Diagnostyczny)' },
    { id: 'automatyzacje', path: '/uslugi/automatyzacje', label: 'usługa Automatyzacja procesów' },
    { id: 'agent-rekrutacyjny', path: '/uslugi/agent-rekrutacyjny', label: 'usługa Agent rekrutacyjny AI' },
    { id: 'dokumenty-faktury', path: '/uslugi/dokumenty-faktury', label: 'usługa Automatyzacja dokumentów i faktur (OCR, KSeF)' },
    { id: 'rozwiazania', path: '/uslugi/rozwiazania', label: 'usługa Indywidualne rozwiązania AI (aplikacje i wtyczki)' },
    { id: 'opieka-ai', path: '/uslugi/opieka-ai', label: 'usługa Opieka AI' },
    { id: 'optymalizacja', path: '/uslugi/optymalizacja', label: 'usługa Pozycjonowanie pod AI (GEO)' },
    { id: 'strony-www', path: '/uslugi/strony-www', label: 'usługa Strony WWW pod Google i AI' },
    { id: 'architekci-wartosci-ai', path: '/uslugi/architekci-wartosci-ai', label: 'model Architekci Wartości AI' },
    { id: 'produkty', path: '/produkty', label: 'gotowe produkty' },
    { id: 'realizacje', path: '/realizacje', label: 'realizacje' },
    { id: 'narzedzia', path: '/narzedzia', label: 'bezpłatne narzędzia' },
    { id: 'wiedza', path: '/wiedza', label: 'Centrum Wiedzy' },
    { id: 'o-nas', path: '/o-nas', label: 'zespół SimpleFast.ai' },
    { id: 'kontakt', path: '/kontakt', label: 'kontakt i diagnoza' },
    // Sekcje strony głównej (mode 'show'; realne id w components/sections:
    // Problem #problem, ZyweDemo #demo, BranzeDemo #branze,
    // NarzedziaTeaser #narzedzia-teaser, FinalneCTA #diagnoza).
    { id: 'problem', path: '/#problem', label: 'sekcja Problem (gdzie ucieka czas)' },
    { id: 'demo', path: '/#demo', label: 'sekcja Żywe demo agenta' },
    { id: 'branze', path: '/#branze', label: 'sekcja Branże (powtarzalna robota per branża)' },
    { id: 'narzedzia-teaser', path: '/#narzedzia-teaser', label: 'sekcja Narzędzia (zajawka na stronie głównej)' },
    { id: 'diagnoza', path: '/#diagnoza', label: 'sekcja finalnego CTA z formularzem diagnozy' },
  ];
  // Mapy pochodne (kontrakt jak dotąd: klucz -> ścieżka / etykieta / kotwica DOM).
  const NAV_TARGETS: Record<string, string> = Object.fromEntries(NAV_CLIENT.map((entry) => [entry.id, entry.path]));
  const NAV_LABELS: Record<string, string> = Object.fromEntries(NAV_CLIENT.map((entry) => [entry.id, entry.label]));
  const NAV_ANCHORS: Record<string, string> = Object.fromEntries(NAV_CLIENT.map((entry) => [entry.id, entry.anchor || entry.id]));
  const RESUME_KEY = 'sfai-voice-resume';
  // Fallback OpenAI nie ma zdarzenia „koniec wypowiedzi agenta", więc zdanie
  // zapowiedzi (wymuszone promptem) dostaje stały bufor przed przeładowaniem.
  const CROSS_PAGE_DELAY_MS = 3_500;
  let navTimer = 0;
  let resumeContext: ResumeContext | null = null; // ustawiane przy automatycznym wznowieniu po przejściu na podstronę

  // ElevenLabs, mode "open": przeładowanie czeka, aż agent DOKOŃCZY zdanie
  // zapowiedzi (przejście speaking -> listening w onModeChange). Bezpieczniki:
  // brak mowy po wywołaniu narzędzia = 3,5 s; twardy limit łączny = 9 s.
  const EL_CROSS_NAV_SILENT_MS = 3_500;
  const EL_CROSS_NAV_MAX_MS = 9_000;
  const executePendingCrossNav = () => {
    if (!pendingCrossNav) return;
    const { path, timer } = pendingCrossNav;
    window.clearTimeout(timer);
    pendingCrossNav = null;
    window.location.href = path;
  };
  const scheduleElevenCrossNav = (path: string) => {
    if (pendingCrossNav) window.clearTimeout(pendingCrossNav.timer);
    const speaking = elAgentMode === 'speaking';
    pendingCrossNav = {
      path,
      sawSpeech: speaking,
      startedAt: Date.now(),
      timer: window.setTimeout(executePendingCrossNav, speaking ? EL_CROSS_NAV_MAX_MS : EL_CROSS_NAV_SILENT_MS),
    };
  };

  // Znajdź cel scrolla na BIEŻĄCEJ stronie: element po kotwicy DOM z NAV_ANCHORS
  // (realne id sekcji strony głównej) albo karta usługi po linku wewnątrz #main.
  // UWAGA (sprostowanie v6): wszystkie nasze kotwice, w tym #diagnoza (sekcja
  // FinalneCTA), żyją WYŁĄCZNIE na stronie głównej — poprzedni opis mówił, że
  // #diagnoza jest w stopce każdej strony, co u nas nieprawda. Na podstronie
  // lookup nie znajdzie celu i nawigacja zejdzie na przejście cross-page, czyli
  // zachowanie poprawne (tam sekcji po prostu nie ma).
  // Lookup po linku działa TYLKO na stronie głównej (karty usług z opisami);
  // na podstronach link do celu to zwykle przycisk CTA, a nie treść — wtedy
  // lepsze jest przejście na podstronę.
  const findLocalTarget = (section: string, path: string): { element: Element; block: ScrollLogicalPosition } | null => {
    const byId = document.getElementById(NAV_ANCHORS[section] || section);
    if (byId) return { element: byId, block: 'start' };
    const onHomepage = (window.location.pathname.replace(/\/+$/, '') || '/') === '/';
    if (onHomepage && path && path !== '/') {
      const anchor = document.querySelector(`#main a[href="${path}"]`);
      if (anchor) return { element: anchor.closest('article, li') || anchor, block: 'center' };
    }
    return null;
  };

  const performNavigation = (sectionRaw: unknown, modeRaw: unknown, options: { deferCrossPage?: boolean } = {}): NavResult => {
    const section = String(sectionRaw || '').trim();
    const mode = modeRaw === 'open' ? 'open' : 'show';
    const path = NAV_TARGETS[section];
    if (!path) {
      return { ok: false, error: 'unknown_section', known_sections: Object.keys(NAV_TARGETS) };
    }
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    // Porównujemy SAME ścieżki (bez '#kotwicy'): cel '/#proces' na stronie
    // głównej to ta sama strona (scroll), nigdy przeładowanie przez hash.
    const targetPath = ((path.split('#')[0] ?? '').replace(/\/+$/, '') || '/');
    const samePage = currentPath === targetPath;
    const local = section === 'start' && samePage ? null : findLocalTarget(section, path);

    // Priorytet: pokazać na bieżącej stronie. Panel dokuje się po prawej,
    // strona przewija się obok, rozmowa trwa BEZ przerwy i bez przeładowania.
    if (samePage || (mode !== 'open' && local)) {
      setDocked(true);
      window.clearTimeout(navTimer);
      // Świeższe „pokaż tutaj" anuluje wcześniejsze odroczone przejście na
      // podstronę (inaczej strona przeładowałaby się mimo obietnicy „rozmowa trwa").
      if (pendingCrossNav) {
        window.clearTimeout(pendingCrossNav.timer);
        pendingCrossNav = null;
        try { sessionStorage.removeItem(RESUME_KEY); } catch {}
      }
      navTimer = window.setTimeout(() => {
        if (local?.element) local.element.scrollIntoView({ behavior: 'smooth', block: local.block });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 350); // chwila na przełożenie layoutu w tryb docked
      return {
        ok: true,
        action: 'shown_on_current_page',
        target: path,
        note: 'Sekcja jest teraz widoczna obok panelu rozmowy. Rozmowa trwa, opowiadaj dalej.',
      };
    }

    // Przejście na podstronę = pełne przeładowanie (strona statyczna), sesji audio
    // nie da się utrzymać. Zapisujemy kontekst i wznawiamy rozmowę automatycznie.
    try {
      sessionStorage.setItem(RESUME_KEY, JSON.stringify({
        docked: true,
        topic: NAV_LABELS[section] || section,
        target: path,
        at: Date.now(),
      }));
    } catch {}
    window.clearTimeout(navTimer);
    if (options.deferCrossPage) {
      // ElevenLabs: przeładowanie po dokończeniu wypowiedzi agenta (patrz scheduleElevenCrossNav).
      scheduleElevenCrossNav(path);
      return {
        ok: true,
        action: 'open_page',
        target: path,
        note: 'Strona przeładuje się automatycznie zaraz po tym, jak dokończysz bieżącą wypowiedź, a rozmowa zostanie wznowiona na nowej podstronie. Dokończ tylko zdanie zapowiedzi, nie żegnaj się.',
      };
    }
    navTimer = window.setTimeout(() => { window.location.href = path; }, CROSS_PAGE_DELAY_MS);
    return {
      ok: true,
      action: 'open_page',
      target: path,
      note: 'Strona zaraz się otworzy, a rozmowa zostanie automatycznie wznowiona po przejściu. Dokończ tylko bieżące zdanie, nie żegnaj się.',
    };
  };

  const handleFunctionCalls = (data: RealtimeEvent) => {
    const output = data?.response?.output;
    if (!Array.isArray(output) || !voiceChannel) return;
    for (const rawItem of output) {
      const item = rawItem as FunctionCallItem;
      /* Nazwa funkcji nawigacji jest zawężona dla tej strony i konfigurowalna
         po stronie serwera (NAV_TOOL_NAME), a fallback OpenAI definiuje ją per
         sesja — dlatego dopasowanie po prefiksie, nie po pełnej nazwie. */
      if (item?.type !== 'function_call' || !String(item.name || '').startsWith('navigate_to') || !item.call_id) continue;
      let args: { section?: unknown; mode?: unknown } = {};
      try { args = JSON.parse(item.arguments || '{}') as { section?: unknown; mode?: unknown }; } catch {}
      const result = performNavigation(args.section, args.mode);
      voiceChannel.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: item.call_id,
          output: JSON.stringify(result),
        },
      }));
      // Przy przejściu na podstronę nie prosimy o nową wypowiedź: strona zaraz się
      // przeładuje, a kontynuację zapewnia automatyczne wznowienie z kontekstem.
      if (result.ok !== true || result.action !== 'open_page') {
        voiceChannel.send(JSON.stringify({ type: 'response.create' }));
      }
    }
  };

  // Wspólny stan UI po udanym zestawieniu sesji głosowej (oba silniki).
  const setVoiceLiveUi = () => {
    if (!(voiceStart instanceof HTMLButtonElement) || !(transcript instanceof HTMLElement)) return;
    transcript.textContent = 'Słucham. Zacznij mówić.';
    setConnectionStatus('słucha', 'working');
    voiceStart.disabled = false;
    voiceStart.setAttribute('aria-pressed', 'true');
    const label = voiceStart.querySelector('span');
    if (label) label.textContent = 'Zakończ rozmowę';
    voiceStage?.classList.add('is-live');
  };

  // Zmiany trybu agenta ElevenLabs: energia wizualizacji, status pill oraz
  // spust odroczonego przejścia na podstronę (koniec zdania zapowiedzi).
  const handleElevenModeChange = (mode: string) => {
    elAgentMode = mode;
    if (mode === 'speaking') {
      voiceStateFloor = .76;
      emitVoiceEnergy(.9, 'speaking');
      setConnectionStatus('mówi', 'working');
      if (pendingCrossNav && !pendingCrossNav.sawSpeech) {
        pendingCrossNav.sawSpeech = true;
        window.clearTimeout(pendingCrossNav.timer);
        const remaining = Math.max(1_000, EL_CROSS_NAV_MAX_MS - (Date.now() - pendingCrossNav.startedAt));
        pendingCrossNav.timer = window.setTimeout(executePendingCrossNav, remaining);
      }
      return;
    }
    voiceStateFloor = .14;
    emitVoiceEnergy(.2, 'listening');
    setConnectionStatus('słucha', 'working');
    if (pendingCrossNav?.sawSpeech) {
      // Zapowiedź wybrzmiała: krótka chwila na końcówkę audio i przeładowanie.
      window.clearTimeout(pendingCrossNav.timer);
      pendingCrossNav.timer = window.setTimeout(executePendingCrossNav, 250);
    }
  };

  // Client tool navigate_to (ElevenLabs SDK). Zwracany obiekt trafia do LLM
  // (expects_response: true), więc note steruje dalszą wypowiedzią agenta.
  const handleElevenNavigate = (parameters: { section?: unknown; mode?: unknown } | undefined, generation: number): NavResult => {
    if (!isVoiceSessionActive(generation)) return { ok: false, error: 'session_inactive' };
    return performNavigation(parameters?.section, parameters?.mode, { deferCrossPage: true });
  };

  // Ścieżka główna: ElevenLabs Agents. Zwraca false, gdy trzeba użyć fallbacku
  // OpenAI (brak klucza na serwerze, awaria provisioningu, padnięty start SDK).
  // Rzuca przy błędach terminalnych (odmowa mikrofonu, limit prób) — wtedy
  // fallback nie ma sensu i użytkownik dostaje właściwy komunikat.
  const startVoiceEleven = async (generation: number, controller: AbortController, resume: ResumeContext | null): Promise<boolean> => {
    let sessionResponse: Response;
    try {
      sessionResponse = await fetch('/api/elevenlabs-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: resume ? { target: resume.target } : null }),
        signal: controller.signal,
      });
    } catch (error) {
      if (controller.signal.aborted) throw error;
      return false;
    }
    const session = await sessionResponse.json().catch(() => null) as VoiceSessionPayload | null;
    if (sessionResponse.status === 429) {
      throw withCode(session?.error || 'Limit prób uruchomienia rozmowy został osiągnięty. Spróbuj ponownie za kilka minut.', 'voice_rate_limited');
    }
    if (!sessionResponse.ok || !session?.connection) return false;
    if (!isVoiceSessionActive(generation)) return true;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (!isVoiceSessionActive(generation)) {
      stream.getTracks().forEach((track) => track.stop());
      return true;
    }
    voiceStream = stream;
    startVoiceMeter(stream, generation);

    try {
      // Import dynamiczny: SDK (z warstwą WebRTC) ładuje się dopiero przy starcie
      // rozmowy, nie w głównym bundlu każdej strony.
      const { Conversation } = await import('@elevenlabs/client');
      if (!isVoiceSessionActive(generation)) return true;
      // Jeden handler nawigacji pod obiema nazwami narzędzia (patrz clientTools).
      const navigateClientTool = async (parameters: { section?: unknown; mode?: unknown }) =>
        handleElevenNavigate(parameters, generation);
      // Opcje sesji budowane 1:1 ze źródłem; JEDEN cast na typ SDK, bo
      // session.connection przychodzi z JSON-a (runtime-owo: conversationToken
      // dla WebRTC albo signedUrl dla WebSocket — dokładnie jak w 10K).
      const sessionOptions = {
        ...session.connection, // { conversationToken } (WebRTC) lub { signedUrl } (WebSocket)
        // Overrides tylko, gdy serwer je przysłał (agent zarządzany ręcznie w
        // dashboardzie może nie mieć nadanych zezwoleń na nadpisania).
        ...(session.overrides ? { overrides: session.overrides } : {}),
        // Kontekst wznowienia po przejściu na podstronę: dynamic variable
        // {{resume_note}} w promptcie agenta (endpoint nie wysyła już pełnego
        // promptu per sesja — dieta promptu pod niskie TTFT).
        ...(session.dynamicVariables ? { dynamicVariables: session.dynamicVariables } : {}),
        /* Client tool nawigacji rejestrowany POD NAZWĄ Z SERWERA (v6): nazwa
           narzędzia jest zawężona dla tej strony, bo narzędzia ElevenLabs są
           globalne dla workspace'u i kolidowały z drugim serwisem (patrz
           NAV_TOOL_NAME w api/_knowledge.mjs). Klucz „navigate_to" zostaje jako
           alias — agent utworzony przed tą zmianą dalej trafia w handler. */
        clientTools: {
          navigate_to: navigateClientTool,
          ...(session.toolName && session.toolName !== 'navigate_to'
            ? { [session.toolName]: navigateClientTool }
            : {}),
        },
        onModeChange: ({ mode }: { mode: string }) => {
          if (isVoiceSessionActive(generation)) handleElevenModeChange(mode);
        },
        onStatusChange: ({ status }: { status: string }) => {
          if (!isVoiceSessionActive(generation)) return;
          if (status === 'connecting') setConnectionStatus('łączy', 'working');
        },
        onDisconnect: () => {
          if (!isVoiceSessionActive(generation)) return;
          stopVoice();
          setTranscript('Połączenie zostało zakończone. Uruchom rozmowę ponownie.');
          setConnectionStatus('rozłączony', 'local');
        },
        onError: () => {
          if (!isVoiceSessionActive(generation)) return;
          voiceStateFloor = 0;
          emitVoiceEnergy(0, 'error');
          setTranscript('Połączenie zostało przerwane. Spróbuj ponownie.');
          setConnectionStatus('błąd', 'local');
        },
      };
      const conversationSession = await Conversation.startSession(
        sessionOptions as unknown as Parameters<typeof Conversation.startSession>[0],
      );
      if (!isVoiceSessionActive(generation)) {
        conversationSession.endSession().catch(() => {});
        return true;
      }
      elConversation = conversationSession as unknown as ElevenConversationHandle;
      elAgentMode = 'speaking'; // agent zaczyna od first message
      // Kontekst wznowienia NIEZALEŻNY od promptu w dashboardzie: serwer przy
      // wznowieniu przysyła gotową notkę (resumeContextualUpdate), a klient
      // wysyła ją metodą sendContextualUpdate SDK tuż po udanym starcie sesji.
      // Działa nawet, gdy prompt agenta nie ma placeholdera {{resume_note}}.
      if (typeof session.resumeContextualUpdate === 'string' && session.resumeContextualUpdate) {
        try { elConversation.sendContextualUpdate(session.resumeContextualUpdate); } catch {}
      }
      voiceStateFloor = .14;
      emitVoiceEnergy(.14, 'listening');
      setVoiceLiveUi();
      return true;
    } catch {
      // Start SDK nie wyszedł: sprzątamy mikrofon i schodzimy na fallback OpenAI.
      if (isVoiceSessionActive(generation)) {
        stream.getTracks().forEach((track) => track.stop());
        if (voiceStream === stream) voiceStream = null;
        stopVoiceMeter();
      }
      return false;
    }
  };

  const startVoice = async () => {
    if (!(voiceStart instanceof HTMLButtonElement) || !(transcript instanceof HTMLElement)) return;
    if (consoleRoot.hidden || currentMode !== 'voice') return;
    if (voicePeer || elConversation) {
      stopVoice();
      setTranscript('Rozmowa zakończona. Możesz uruchomić ją ponownie.');
      setConnectionStatus('gotowy');
      return;
    }
    if (voiceStartInFlight) return;

    voiceStart.disabled = true;
    voiceStartInFlight = true;
    setTranscript('Przygotowuję bezpieczne połączenie…');
    setConnectionStatus('łączy', 'working');

    const generation = ++voiceSessionGeneration;
    const controller = new AbortController();
    voiceTokenController?.abort();
    voiceTokenController = controller;
    const resume = resumeContext; // kontekst jednorazowy, konsumowany przez obie ścieżki
    resumeContext = null;

    try {
      const startedEleven = await startVoiceEleven(generation, controller, resume);
      if (!startedEleven && isVoiceSessionActive(generation)) {
        await startVoiceOpenAI(generation, controller, resume);
      }
    } catch (error) {
      if (!isVoiceSessionActive(generation)) return;
      stopVoice();
      if (errorName(error) === 'NotAllowedError') {
        setTranscript('Dostęp do mikrofonu nie został udzielony.');
        setConnectionStatus('brak mikrofonu', 'local');
      } else if (errorCode(error) === 'voice_rate_limited') {
        setTranscript(errorMessage(error));
        setConnectionStatus('limit rozmów', 'local');
      } else if (errorCode(error) === 'agent_not_configured') {
        setTranscript('Interfejs jest gotowy. Do rozmowy potrzebny jest bezpieczny klucz API ustawiony na hostingu.');
        setConnectionStatus('oczekuje na klucz', 'local');
      } else {
        setTranscript('Nie udało się uruchomić rozmowy. Spróbuj ponownie lub użyj czatu tekstowego.');
        setConnectionStatus('głos nieaktywny', 'local');
      }
    } finally {
      if (voiceTokenController === controller) voiceTokenController = null;
      if (generation === voiceSessionGeneration) voiceStartInFlight = false;
    }
  };

  // Fallback: dotychczasowa ścieżka OpenAI Realtime (WebRTC + data channel).
  const startVoiceOpenAI = async (generation: number, controller: AbortController, resume: ResumeContext | null) => {
      const tokenResponse = await fetch('/api/realtime-session', { method: 'POST', signal: controller.signal });
      const token = await tokenResponse.json() as RealtimeTokenPayload;
      if (!tokenResponse.ok || !token?.value) {
        throw withCode(token?.error || 'Brak tokenu sesji.', token?.code || 'voice_session_error');
      }
      if (!isVoiceSessionActive(generation)) return;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!isVoiceSessionActive(generation)) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      voiceStream = stream;
      startVoiceMeter(stream, generation);
      const peer = new RTCPeerConnection();
      voicePeer = peer;
      voiceAudio = document.createElement('audio');
      voiceAudio.autoplay = true;
      voiceAudio.hidden = true;
      consoleRoot.append(voiceAudio);
      peer.ontrack = (event) => {
        if (isVoiceSessionActive(generation) && voiceAudio) voiceAudio.srcObject = event.streams[0] ?? null;
      };
      peer.addEventListener('connectionstatechange', () => {
        if (!isVoiceSessionActive(generation) || voicePeer !== peer) return;
        window.clearTimeout(voiceDisconnectTimer);
        voiceDisconnectTimer = 0;

        if (peer.connectionState === 'connected') {
          setConnectionStatus('słucha', 'working');
          return;
        }

        if (peer.connectionState === 'disconnected') {
          setTranscript('Przywracam połączenie…');
          setConnectionStatus('ponawia', 'working');
          voiceDisconnectTimer = window.setTimeout(() => {
            if (!isVoiceSessionActive(generation) || peer.connectionState !== 'disconnected') return;
            stopVoice();
            setTranscript('Połączenie zostało przerwane. Uruchom rozmowę ponownie.');
            setConnectionStatus('rozłączony', 'local');
          }, 4_000);
          return;
        }

        if (peer.connectionState === 'failed') {
          stopVoice();
          setTranscript('Nie udało się utrzymać połączenia. Uruchom rozmowę ponownie.');
          setConnectionStatus('błąd połączenia', 'local');
        }
      });
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));

      const channel = peer.createDataChannel('oai-events');
      voiceChannel = channel;
      channel.addEventListener('open', () => {
        if (!isVoiceSessionActive(generation)) return;
        voiceStateFloor = .14;
        emitVoiceEnergy(.14, 'listening');
        setVoiceLiveUi();
        // Po przejściu na podstronę w trakcie rozmowy: kontynuacja tematu zamiast
        // powitania od zera (kontekst z sessionStorage, patrz performNavigation).
        const greeting = resume
          ? `Użytkownik w trakcie rozmowy głosowej przeszedł właśnie na podstronę ${resume.target} serwisu (temat rozmowy: ${resume.topic}). Nawiąż jednym krótkim, w pełni dokończonym zdaniem do tematu i płynnie kontynuuj rozmowę naturalną, rodzimą polszczyzną. Nie przedstawiaj się od nowa, nie witaj się od zera i pod żadnym pozorem nie mów, że rozmowa została przerwana lub zakończona.`
          : 'Przywitaj użytkownika naturalną, rodzimą polszczyzną z neutralnym, ogólnopolskim akcentem, jednym krótkim i w pełni dokończonym zdaniem, a potem zapytaj, w czym możesz pomóc jego firmie.';
        voiceChannel?.send(JSON.stringify({
          type: 'response.create',
          response: {
            output_modalities: ['audio'],
            instructions: greeting,
          },
        }));
      });
      channel.addEventListener('message', (event) => {
        if (!isVoiceSessionActive(generation)) return;
        let data: RealtimeEvent;
        try { data = JSON.parse((event as MessageEvent).data as string) as RealtimeEvent; } catch { return; }
        if (data.type === 'input_audio_buffer.speech_started') {
          voiceStateFloor = .28;
          emitVoiceEnergy(.42, 'listening');
          setTranscript('Słucham…');
          setConnectionStatus('słucha', 'working');
        } else if (data.type === 'input_audio_buffer.speech_stopped') {
          voiceStateFloor = .12;
          emitVoiceEnergy(.18, 'thinking');
        } else if (data.type === 'response.created') {
          voiceStateFloor = .76;
          emitVoiceEnergy(.9, 'speaking');
          setConnectionStatus('mówi', 'working');
        } else if (data.type === 'response.done') {
          handleFunctionCalls(data);
          voiceStateFloor = .14;
          emitVoiceEnergy(.2, 'listening');
          setConnectionStatus('słucha', 'working');
        } else if (data.type === 'error') {
          voiceStateFloor = 0;
          emitVoiceEnergy(0, 'error');
          setTranscript('Połączenie zostało przerwane. Spróbuj ponownie.');
          setConnectionStatus('błąd', 'local');
        }
      });

      const offer = await peer.createOffer();
      if (!isVoiceSessionActive(generation)) return;
      await peer.setLocalDescription(offer);
      if (!isVoiceSessionActive(generation)) return;
      const sdpResponse = await fetch('https://api.openai.com/v1/realtime/calls', {
        method: 'POST',
        body: offer.sdp,
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/sdp',
        },
      });
      if (!sdpResponse.ok) throw new Error('Nie udało się zestawić połączenia.');
      const answerSdp = await sdpResponse.text();
      if (!isVoiceSessionActive(generation)) return;
      await peer.setRemoteDescription({ type: 'answer', sdp: answerSdp });
  };

  if (voiceStart) on(voiceStart, 'click', startVoice);
  on(window, 'pagehide', stopVoice);

  // Automatyczne wznowienie rozmowy po przejściu na podstronę przez navigate_to:
  // konsola otwiera się od razu w trybie docked i startuje nowa sesja głosowa
  // z kontekstem tematu (flaga ważna 30 s, jednorazowa).
  try {
    const rawResume = sessionStorage.getItem(RESUME_KEY);
    if (rawResume) {
      sessionStorage.removeItem(RESUME_KEY);
      const data = JSON.parse(rawResume) as ResumeContext;
      if (data?.docked && Date.now() - (data.at || 0) < 30_000) {
        resumeContext = data;
        openConsole('voice', true);
        startVoice();
      }
    }
  } catch {}

  // Cleanup portu (różnica #1): zdejmij listenery, ugaś głos i timery,
  // przywróć body/konsolę do stanu wyjściowego (StrictMode-safe).
  return () => {
    stopVoice();
    window.clearTimeout(closeTimer);
    closeTimer = 0;
    window.clearTimeout(navTimer);
    disposers.forEach((dispose) => dispose());
    consoleRoot.classList.remove('is-closing', 'is-docked');
    consoleRoot.hidden = true;
    document.body.classList.remove('agent-console-open', 'agent-console-docked');
    flowCores().forEach((core) => core.classList.remove('is-voice-open'));
    if (fab instanceof HTMLElement) {
      fab.removeAttribute('aria-hidden');
      fab.removeAttribute('tabindex');
    }
  };
}
