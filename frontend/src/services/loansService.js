// src/services/loansService.js
const API_URL = import.meta.env.VITE_API_URL;

// 🟣 Servicio para obtener préstamos del usuario autenticado
export async function fetchUserLoans() {
  const res = await fetch(`${API_URL}/users/borrowBook`, {
    method: "GET",
    credentials: "include", // importante si usas cookies
  });

  if (!res.ok) throw new Error("Error al cargar los préstamos del usuario");

  return res.json();
}

export const extendLoan = async (bookId) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await fetch(`${API_URL}/users/extendLoan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookId }),
    credentials: "include", // ⬅️ importante si el backend usa cookies
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error extendiendo préstamo");
  }

  return res.json();
};

export const returnBook = async (id, isbn) => {
  try {
    const response = await fetch(`${API_URL}/users/returnBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, isbn }),
      credentials: "include",

    });

    if (!response.ok) {
      // Obtener el mensaje de error del backend
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al devolver el libro");
    }

    // Retornar el resultado (mensaje de éxito)
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};