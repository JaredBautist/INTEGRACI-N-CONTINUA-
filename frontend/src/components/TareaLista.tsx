import { useAppSelector } from "../hooks";

export default function TareaLista() {
  const tareas = useAppSelector((state) => state.tareas);
  return (
    <section>
      <h2>Tareas</h2>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <strong>{tarea.titulo}</strong> — {tarea.descripcion} ({tarea.estado})
          </li>
        ))}
        {tareas.length === 0 && <li>Sin tareas registradas.</li>}
      </ul>
    </section>
  );
}
