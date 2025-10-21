const API_URL = import.meta.env.VITE_API_URL;



export const fetchAllLoans = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/borrowBookUser`, {
      method: "POST", // Cambiado a POST
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: userId }), // Envías el ID en el body
    });

    if (!response.ok) throw new Error("Error al obtener los préstamos");

    return await response.json();
  } catch (error) {
    console.error("Error en fetchAllLoans:", error);
    throw error;
  }
};



export const returnBook = async (userId, isbn) => {
  try {
    const response = await fetch(`${API_URL}/users/returnBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId, isbn }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Error al devolver el préstamo");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en returnLoan:", error);
    throw error;
  }
};
