import { useEffect, useState } from "react";

function AccessDenied() {
  return (
    <section className="panel error-panel">
      <h2>Lab terminal</h2>
      <p>ACCESS REQUIRED. Панель терминала недоступна.</p>
    </section>
  );
}

export function LabTerminal({ accessGranted }) {
  const [status, setStatus] = useState("loading");

  let operator = "unknown";
  if (accessGranted) {
    const [activeOperator] = useState("MIKE");
    operator = activeOperator;
  }

  useEffect(() => {
    setStatus("online");
  }, []);

  if (!accessGranted) {
    return <AccessDenied />;
  }

  return (
    <section className="panel terminal-panel">
      <h2>Lab terminal</h2>
      <p>Status: {status}</p>
      <p>Operator: {operator}</p>
      <p>Диагностика активна. Проверьте восстановление сигнала ниже.</p>
    </section>
  );
}
