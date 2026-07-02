import { useState } from "react";

// dGVybWluYWxfcGFzc3dvcmQ6IE1JS0U=

const EXPECTED_HASH = "bff70485135c547322b677792b3900d8b08bcd88960903699a3b0b6e7b6e205a";

async function hashInput(value) {
  const encoded = new TextEncoder().encode(value.trim().toUpperCase());
  const buf = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function AccessPanel({ onAccessGranted }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("Введите ключ доступа, найденный в шуме интерфейса.");

  async function handleSubmit(event) {
    event.preventDefault();
    const hash = await hashInput(code);
    if (hash === EXPECTED_HASH) {
      setMessage("ACCESS GRANTED. Канал диагностики открыт.");
      onAccessGranted();
      return;
    }
    setMessage("ACCESS DENIED. THE GATE REMAINS OPEN.");
  }

  return (
    <section className="panel access-panel">
      <h2>Remote access</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="access-code">Access word</label>
        <input
          id="access-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Введите пароль"
        />
        <button type="submit">Unlock</button>
      </form>
      <p className="terminal-message">{message}</p>
    </section>
  );
}
