import { useAppSelector } from "../hooks";

export default function Resumen() {
  const tareas = useAppSelector((state) => state.tareas);
  const total = tareas.length;
  const completadas = tareas.filter((t) => t.estado === "listo").length;
  const pendientes = total - completadas;

  return (
    <section>
      <h2>Resumen</h2>
      <p>Total: <strong>{total}</strong></p>
      <p>Completadas: <strong>{completadas}</strong></p>
      <p>Pendientes: <strong>{pendientes}</strong></p>
    </section>
  );
}
