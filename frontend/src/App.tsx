import { useEffect } from "react";
import Header from "./components/Header";
import Resumen from "./components/Resumen";
import TareaForm from "./components/TareaForm";
import TareaLista from "./components/TareaLista";
import { obtenerTareas } from "./api";
import { setTareas } from "./store";
import { useAppDispatch } from "./hooks";

export default function App() {
  const dispatch = useAppDispatch();

  const load = async () => {
    const data = await obtenerTareas();
    dispatch(setTareas(data));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main>
      <Header onReload={load} />
      <Resumen />
      <TareaForm />
      <TareaLista />
    </main>
  );
}
