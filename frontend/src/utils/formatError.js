// utils/formatError.js

export function formatError(error) {
  if (!error) return "Ocurrió un error desconocido.";

  // Si viene con response JSON del backend
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // Si viene de fetch
  if (error.message) {
    return error.message.replace("fetch failed", "No se pudo conectar con el servidor");
  }

  // Si el backend manda texto en vez de JSON
  if (typeof error === "string") return error;

  return "Algo salió mal. Intenta de nuevo.";
}
