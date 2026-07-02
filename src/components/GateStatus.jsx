import { labNotes } from "../data/labNotes.js";

export function GateStatus() {
  return (
    <section className="panel gate-panel">
      <h2>Gate status</h2>
      <p className="status status-danger">OPEN / UNSTABLE</p>
      <p>
        Последняя запись лаборатории повреждена. Некоторые слова выглядят так,
        будто их прочитали с другой стороны.
      </p>
      <ul className="note-list">
        {labNotes.map((note) => (
          <li key={note.id} title={note.operator}>
            <span className="note-id">#{note.id}</span>
            <span>{note.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
