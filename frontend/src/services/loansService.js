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
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, isbn }),
    });

    const text = await response.text();
    console.log("🔍 Respuesta cruda del backend:", text);

    // Verificamos si es JSON antes de parsear
    if (text.startsWith("<!DOCTYPE")) {
      throw new Error("El servidor devolvió HTML en lugar de JSON. Revisa la ruta o el backend.");
    }

    const data = JSON.parse(text);

    if (!response.ok) {
      throw new Error(data.message || "Error al devolver el libro");
    }

    return data;
  } catch (error) {
    console.error("Error en returnBook:", error);
    throw error;
  }
};

export const fetchBorrowedBooks = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/borrowBookA/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // Validar respuesta del backend
    const data = await response.json();
    console.log("📘 Datos recibidos del backend:", data);

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener los préstamos del usuario");
    }

    return data;
  } catch (error) {
    console.error("Error en fetchBorrowedBooks:", error);
    throw error;
  }
};
