// src/services/userService.js
const API_URL = import.meta.env.VITE_API_URL;

// 🔐 Obtiene el perfil del usuario actual desde el token (cookie)
export const fetchUserProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "GET",
      credentials: "include", // importante para enviar cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener perfil: ${response.status}`);
    }

    const data = await response.json();
    return data; // ← debe devolver { name, role }
  } catch (error) {
    console.error("Error en fetchUserProfile:", error);
    throw error;
  }
};
