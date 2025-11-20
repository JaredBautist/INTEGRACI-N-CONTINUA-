type Props = {
  onReload: () => void;
};

export default function Header({ onReload }: Props) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h1>Gestor de Tareas</h1>
        <p>Frontend SPA ligero para las diapositivas 3 y 4.</p>
      </div>
      <button onClick={onReload}>Refrescar</button>
    </header>
  );
}
