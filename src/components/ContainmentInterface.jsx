import { useState } from "react";
import { unlockFinalFragment } from "../utils/terminalCrypto.js";

export function ContainmentInterface({ accessGranted }) {
  const [returnCode, setReturnCode] = useState("");
  const [message, setMessage] = useState(
    "После физической точки вернитесь сюда и введите код возврата из офлайн-капчи Терминала Изнанки."
  );
  const [completed, setCompleted] = useState(false);

  if (!accessGranted) {
    return null;
  }

  async function handleSubmit(event) {
    localStorage.setItem("terminal_return_code", returnCode);

    const storedReturnCode = localStorage.getItem("shadow_return_code");

    try {
      await unlockFinalFragment(storedReturnCode || "");
      setCompleted(true);
      setMessage("Терминал Изнанки активирован.");
    } catch (error) {
      setCompleted(false);
      setMessage("Код возврата не принят. Проверьте данные с физического терминала.");
    }
  }

  return (
    <section className="panel containment-panel">
      <p className="eyebrow">UPSIDE DOWN TERMINAL</p>
      <h2>Терминал Изнанки</h2>

      {!completed && (
        <form className="return-form" onSubmit={handleSubmit}>
          <label htmlFor="return-code">Код возврата</label>
          <input
            id="return-code"
            value={returnCode}
            placeholder="Введите код из офлайн-капчи"
          />
          <button type="submit">Активировать терминал</button>
        </form>
      )}

      {!completed && <p className="terminal-message">{message}</p>}

      {completed && (
        <div className="mission-complete" data-terminal-state="opened">
          <div className="mc-portal" aria-hidden="true">
            <span className="mc-ring mc-ring-1" />
            <span className="mc-ring mc-ring-2" />
            <span className="mc-ring mc-ring-3" />
            <div className="mc-check">
              <svg viewBox="0 0 52 52">
                <path d="M14 27 l8 8 l16 -18" />
              </svg>
            </div>
          </div>
          <p className="mc-glitch" data-text="ЗАДАНИЕ ВЫПОЛНЕНО">
            ЗАДАНИЕ ВЫПОЛНЕНО
          </p>
          <p className="mc-sub">Сигнал восстановлен. Разлом закрыт.</p>
        </div>
      )}

      <div
        className="diagnostic-cache"
        data-cache="offline-terminal-knows-the-code-frontend-knows-only-the-shadow"
      >
        Диагностический кэш загружен.
      </div>
    </section>
  );
}
