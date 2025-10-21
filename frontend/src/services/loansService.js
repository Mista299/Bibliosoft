// src/services/loansService.js
const API_URL = import.meta.env.VITE_API_URL;

// 🟣 Servicio para obtener préstamos del usuario autenticado
export async function fetchUserLoans() {
  const res = await fetch(`${API_URL}/loans/user`, {
    method: "GET",
    credentials: "include", // importante si usas cookies
  });

  if (!res.ok) throw new Error("Error al cargar los préstamos del usuario");

  return res.json();
}
