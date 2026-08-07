'use client';

import { useEffect } from 'react';
import { initAgentConsole } from './agent-console-init';
import './agent-console.css';

/**
 * AgentConsole — konsola agenta (czat + głos) przeniesiona 1:1 z repo 10K
 * (src/components/AgentConsole.astro), spec INFINITY v5 §1 (decyzja Pawła:
 * „przenieś CAŁĄ strukturę agenta głosowego jeden do jednego").
 *
 * MARKUP 1:1: te same klasy, te same data-atrybuty, te same teksty (to treści
 * przeniesione z 10K, nie nowe stringi). Zmiany WYŁĄCZNIE techniczne:
 * Astro→JSX (class→className, for→htmlFor, tabindex→tabIndex) oraz link
 * prywatności bez końcowego slasha (Next nie używa trailing slash — bez tego
 * każdy klik przechodziłby przez redirect 308).
 *
 * LOGIKA: components/agent/agent-console-init.ts (port 947-liniowego
 * agent-console.js z 10K), montowana po mount przez useEffect; init zwraca
 * cleanup (React StrictMode-safe). Komponent NIE MA stanu React — wiadomości
 * czatu dopisuje do DOM sam init (1:1 ze źródłem), więc React nigdy nie
 * re-renderuje tego drzewa i nie nadpisuje zmian DOM.
 *
 * BACKEND: vercelowe funkcje /api/*.mjs (działają TYLKO na Vercelu; na
 * `next dev` konsola degraduje się grzecznie — czat przechodzi na wiedzę
 * lokalną, głos pokazuje komunikat błędu — obsługa 1:1 ze źródła).
 * MONTAŻ: globalnie w app/layout.tsx (overlay + FAB jak w 10K).
 */
export function AgentConsole() {
  // Cała logika konsoli (taby, czat SSE, głos ElevenLabs/OpenAI, nawigacja
  // navigate_to, dock, wznowienia) — port 1:1; init zwraca funkcję sprzątającą.
  useEffect(() => initAgentConsole(), []);

  return (
    <>
      {/* FAB „Zapytaj AI" (1:1 z 10K): klik = konsola w trybie docked + start głosu */}
      <button className="agent-fab" type="button" data-agent-fab aria-label="Otwórz Agenta SimpleFast.ai">
        <span className="agent-fab__signal" aria-hidden="true"></span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5.75h14v9.5H9.1L5 18.7V5.75Z"></path>
          <path d="M8 9h8M8 12h5"></path>
        </svg>
        <span className="agent-fab__label">Zapytaj AI</span>
      </button>

      {/* Konsola (overlay): hidden do czasu otwarcia; data-lenis-prevent 1:1
          (Lenis nie przewija strony, gdy kursor jest nad panelem) */}
      <div className="agent-console" data-agent-console data-lenis-prevent hidden>
        {/* Backdrop = przycisk zamykający (1:1) */}
        <button className="agent-console__backdrop" type="button" data-agent-close tabIndex={-1} aria-label="Zamknij Agenta"></button>

        {/* Panel dialogu (aria-modal przełącza init przy dokowaniu) */}
        <section className="agent-console__panel" data-agent-panel role="dialog" aria-modal="true" aria-labelledby="agent-console-title">
          <header className="agent-console__header">
            <div className="agent-console__identity">
              <span className="agent-console__mark" aria-hidden="true"><i></i></span>
              <div>
                <p className="agent-console__kicker">SimpleFast / living interface</p>
                <h2 id="agent-console-title">Agent wiedzy firmy</h2>
              </div>
            </div>
            {/* Pigułka statusu połączenia (tekst podmienia init) */}
            <div className="agent-console__status" data-agent-connection-status aria-live="polite"><i></i><span>gotowy</span></div>
            {/* Powrót z docka do pełnego okna (widoczny tylko w .is-docked) */}
            <button className="agent-console__undock" type="button" data-agent-undock aria-label="Przywróć pełne okno rozmowy">Pełne okno</button>
            <button className="agent-console__close" type="button" data-agent-close aria-label="Zamknij Agenta">
              <span></span><span></span>
            </button>
          </header>

          <div className="agent-console__workspace">
            {/* Lewa szyna: zakres wiedzy agenta (desktop) */}
            <aside className="agent-console__rail" aria-label="Zakres wiedzy Agenta">
              <p className="agent-console__rail-label">/ 01—07</p>
              <p className="agent-console__rail-title">Zna ofertę.<br />Rozumie proces.<br />Nie zgaduje.</p>
              <ol className="agent-console__scope">
                <li><span>01</span>Usługi i dobór rozwiązania</li>
                <li><span>02</span>Sposób wdrożenia</li>
                <li><span>03</span>Bezpieczeństwo i kontrola</li>
                <li><span>04</span>Następny sensowny krok</li>
              </ol>
              <p className="agent-console__rail-note">Ceny i terminy zależą od procesu. Agent nie wymyśla liczb — pomaga przygotować diagnozę.</p>
            </aside>

            <div className="agent-console__main">
              {/* Taby trybów: czat / głos */}
              <div className="agent-console__tabs" role="tablist" aria-label="Tryb rozmowy">
                <button type="button" role="tab" aria-selected="true" aria-controls="agent-chat-panel" id="agent-chat-tab" data-agent-mode="chat">
                  <span>01</span> Czat
                </button>
                <button type="button" role="tab" aria-selected="false" aria-controls="agent-voice-panel" id="agent-voice-tab" data-agent-mode="voice">
                  <span>02</span> Głos
                </button>
              </div>

              {/* Panel czatu (wiadomości dopisuje init bezpośrednio do DOM) */}
              <div className="agent-console__mode" id="agent-chat-panel" role="tabpanel" aria-labelledby="agent-chat-tab" data-agent-chat-panel>
                <div className="agent-console__messages" data-agent-messages aria-live="polite" aria-label="Rozmowa z Agentem">
                  <article className="agent-message agent-message--assistant">
                    <span className="agent-message__meta">S/F · AI</span>
                    <p>Cześć. Znam usługi i sposób pracy SimpleFast.ai. Opisz proces, który zabiera czas, albo zapytaj o konkretne rozwiązanie.</p>
                  </article>
                </div>

                {/* Podpowiedzi startowe (znikają po pierwszym pytaniu) */}
                <div className="agent-console__suggestions" data-agent-suggestions>
                  <button type="button" data-agent-prompt="Od czego zacząć wdrożenie AI w mojej firmie?">Od czego zacząć?</button>
                  <button type="button" data-agent-prompt="Czym różni się agent AI od chatbota?">Agent czy chatbot?</button>
                  <button type="button" data-agent-prompt="Jak wygląda opieka AI po wdrożeniu?">Jak działa opieka AI?</button>
                </div>

                {/* Formularz pytania (Enter wysyła, Shift+Enter = nowa linia) */}
                <form className="agent-console__form" data-agent-form>
                  <label className="sr-only" htmlFor="agent-console-input">Napisz pytanie do Agenta SimpleFast.ai</label>
                  <textarea id="agent-console-input" data-agent-input rows={1} maxLength={4000} placeholder="Zapytaj o usługę albo opisz powtarzalny proces…" required></textarea>
                  <button type="submit" data-agent-send aria-label="Wyślij pytanie">
                    <span>Wyślij</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14-7-4.2 14-3.1-5.1L5 12Zm6.7 1.9L19 5"></path></svg>
                  </button>
                </form>
              </div>

              {/* Panel głosu: scena z blobem stanów + przycisk start/stop */}
              <div className="agent-console__mode agent-console__mode--voice" id="agent-voice-panel" role="tabpanel" aria-labelledby="agent-voice-tab" data-agent-voice-panel hidden>
                <div className="voice-agent-stage" data-agent-voice-stage data-voice-state="idle">
                  <div className="voice-agent-stage__field" aria-hidden="true">
                    <span></span><span></span><span></span>
                    <i></i><b></b>
                  </div>
                  <p className="voice-agent-stage__eyebrow"><i aria-hidden="true"></i> / agent głosowy / live</p>
                  <h3>Powiedz, czego<br />chcesz się dowiedzieć.</h3>
                  <div className="voice-agent-stage__states" aria-hidden="true">
                    <span data-voice-state-label="listening"><i></i>Słucha</span>
                    <span data-voice-state-label="thinking"><i></i>Rozumie</span>
                    <span data-voice-state-label="speaking"><i></i>Odpowiada</span>
                  </div>
                  <p className="voice-agent-stage__transcript" data-agent-transcript aria-live="polite">Po kliknięciu uruchomimy mikrofon. Rozmowę możesz przerwać w każdej chwili.</p>
                  <button className="voice-agent-stage__button" type="button" data-agent-voice-start aria-pressed="false">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"></path><path d="M6.5 11.5v.5a5.5 5.5 0 0 0 11 0v-.5M12 17.5V21M9 21h6"></path></svg>
                    <span>Rozpocznij rozmowę</span>
                  </button>
                  <p className="voice-agent-stage__note"><span aria-hidden="true">●</span> Kanał aktywuje się wyłącznie na Twoje polecenie.</p>
                </div>
              </div>

              {/* Stopka konsoli (link prywatności — ścieżka repo, bez trailing slash) */}
              <footer className="agent-console__footer">
                <span>AI może się pomylić. Ważne ustalenia potwierdzi człowiek.</span>
                <a href="/polityka-prywatnosci">Prywatność ↗</a>
              </footer>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
