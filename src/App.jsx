import { useEffect, useState } from "react";
import { LabTerminal } from "./components/LabTerminal.jsx";
import { GateStatus } from "./components/GateStatus.jsx";
import { AccessPanel } from "./components/AccessPanel.jsx";
import { ContainmentInterface } from "./components/ContainmentInterface.jsx";

import CorruptedSignal from "./components/CorruptedSignal.jsx";

export default function App() {
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    localStorage.setItem("hawkins_signal_hint", "reverse_then_base64");
    localStorage.setItem("field_access_hint", "password_is_hidden_in_comment");
    localStorage.setItem("react_warning", "hooks_must_not_be_conditional");
    localStorage.setItem("terminal_form_hint", "controlled_input_submit_storage");
    localStorage.setItem("return_code_hint", "offline_captcha_frontend_knows_only_the_shadow");
  }, []);

  return (
    <main className="lab-shell">
      <header className="hero-panel">
        <p className="eyebrow">HAWKINS LAB SYSTEM</p>
        <h1>Терминал Изнанки</h1>
        <p>
          Веб-интерфейс лаборатории заражён. Сигнал есть, но он повреждён.
          Восстановите панель, найдите клетку на карте, дойдите до физической точки,
          извлеките код возврата из капчи и вернитесь в интерфейс, чтобы активировать терминал.
        </p>
      </header>

      <section className="grid">
        <GateStatus />
        <AccessPanel onAccessGranted={() => setAccessGranted(true)} />
      </section>

      <LabTerminal accessGranted={accessGranted} />
      <CorruptedSignal accessGranted={accessGranted} />
      <ContainmentInterface accessGranted={accessGranted} />
    </main>
  );
}
