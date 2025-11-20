import { FormEvent, useState } from "react";
import { crearTarea } from "../api";
import { addTarea } from "../store";
import { useAppDispatch } from "../hooks";

const estados = ["pendiente", "en progreso", "listo"];
const prioridades = ["baja", "media", "alta"];

export default function TareaForm() {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    prioridad: "media",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const nueva = await crearTarea(formState);
      dispatch(addTarea(nueva));
      setFormState({ titulo: "", descripcion: "", estado: "pendiente", prioridad: "media" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva tarea</h2>
      <label>
        Título
        <input
          value={formState.titulo}
          onChange={(e) => setFormState({ ...formState, titulo: e.target.value })}
          required
        />
      </label>
      <label>
        Descripción
        <textarea
          value={formState.descripcion}
          onChange={(e) => setFormState({ ...formState, descripcion: e.target.value })}
          required
        />
      </label>
      <label>
        Estado
        <select value={formState.estado} onChange={(e) => setFormState({ ...formState, estado: e.target.value })}>
          {estados.map((estado) => (
            <option key={estado}>{estado}</option>
          ))}
        </select>
      </label>
      <label>
        Prioridad
        <select
          value={formState.prioridad}
          onChange={(e) => setFormState({ ...formState, prioridad: e.target.value })}
        >
          {prioridades.map((prioridad) => (
            <option key={prioridad}>{prioridad}</option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Crear"}
      </button>
    </form>
  );
}
