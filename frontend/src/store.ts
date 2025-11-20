import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
}

const tareasSlice = createSlice({
  name: "tareas",
  initialState: [] as Tarea[],
  reducers: {
    setTareas: (_state, action: PayloadAction<Tarea[]>) => action.payload,
    addTarea: (state, action: PayloadAction<Tarea>) => {
      state.push(action.payload);
    },
  },
});

export const { setTareas, addTarea } = tareasSlice.actions;
export const tareasReducer = tareasSlice.reducer;

export const store = configureStore({
  reducer: {
    tareas: tareasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
