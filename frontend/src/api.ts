import axios from "axios";
import { Tarea } from "./store";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
});

export async function obtenerTareas() {
  const { data } = await api.get<Tarea[]>("/tareas");
  return data;
}

export async function crearTarea(payload: Omit<Tarea, "id">) {
  const { data } = await api.post<Tarea>("/tareas", payload);
  return data;
}
