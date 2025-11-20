import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { tareasReducer } from "../../store";
import TareaLista from "../TareaLista";

test("muestra tareas existentes", () => {
  const store = configureStore({
    reducer: { tareas: tareasReducer },
    preloadedState: {
      tareas: [{ id: "1", titulo: "Demo", descripcion: "Cliente", estado: "pendiente", prioridad: "media" }],
    },
  });

  render(
    <Provider store={store}>
      <TareaLista />
    </Provider>
  );

  expect(screen.getByText(/Demo/)).toBeInTheDocument();
});
