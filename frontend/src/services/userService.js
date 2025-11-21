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

async function handleResp(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    const err = new Error(text || res.statusText);
    err.status = res.status;
    throw err;
  }
  return res.json().catch(() => ({}));
}

export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`, {
    credentials: "include",
  });
  return handleResp(res);
}


export async function updateUserName(id, body) {
  const res = await fetch(`${API_URL}/${id}/name`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResp(res);
}

export async function updateUserEmail(id, body) {
  const res = await fetch(`${API_URL}/${id}/email`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResp(res);
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResp(res);
}

export async function createUser(body) {
  // registra usuario -> tu backend usa router.post('/register') así que llamamos a /register
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResp(res);
}

export async function getBorrowedBooksByAdmin(id) {
  const res = await fetch(`${API_URL}/borrowBookA/${id}`, {
    credentials: "include",
  });
  return handleResp(res);
}
