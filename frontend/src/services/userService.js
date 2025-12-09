// src/services/userService.js
const API_URL = import.meta.env.VITE_API_URL;

// Helper para respuestas
async function handleResp(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    const err = new Error(text || res.statusText);
    err.status = res.status;
    throw err;
  }
  return res.json().catch(() => ({}));
}

/* ============================================================
   🔐 PERFIL DEL USUARIO AUTENTICADO (CONFIGURACIÓN)
   ============================================================ */

   // Perfil completo basado en los endpoints existentes
export async function fetchUserProfile() {
  const [{ name }, { email }] = await Promise.all([
    getUserName(),    // GET /users/username
    getUserEmail(),   // GET /users/useremail
  ]);

  // El rol lo puedes obtener desde tu cookie/token si lo envías en el login.
  // Si no, lo dejamos null para que el frontend lo ignore.
  return { name, email };
}


// Obtener SOLO el nombre del usuario autenticado
export async function getUserName() {
  const res = await fetch(`${API_URL}/users/username`, {
    method: "GET",
    credentials: "include",
  });
  return handleResp(res); // debe devolver { name }
}

// Obtener SOLO el email del usuario autenticado
export async function getUserEmail() {
  const res = await fetch(`${API_URL}/users/useremail`, {
    method: "GET",
    credentials: "include",
  });
  return handleResp(res); // debe devolver { email }
}

// Actualizar nombre del usuario actual
export async function putUserName(newName) {
  const res = await fetch(`${API_URL}/users/username`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName }),
  });
  return handleResp(res);
}

// Actualizar email del usuario actual
export async function putUserEmail(newEmail) {
  const res = await fetch(`${API_URL}/users/useremail`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: newEmail }),
  });
  return handleResp(res);
}

// Actualizar contraseña SIN verificar la anterior
export async function putUserPassword(newPassword) {
  const res = await fetch(`${API_URL}/users/userpass`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: newPassword }),
  });
  return handleResp(res);
}

// Actualizar contraseña verificando contraseña actual
export async function updatePassword(oldPassword, newPassword) {
  const res = await fetch(`${API_URL}/users/updatePassword`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  return handleResp(res);
}


export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`, {
    credentials: "include",
  });
  return handleResp(res);
}

export async function updateUserName(id, body) {
  const res = await fetch(`${API_URL}/users/${id}/name`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResp(res);
}

export async function updateUserRole(id, body) {
  const res = await fetch(`${API_URL}/users/${id}/role`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResp(res);
}

export async function updateUserEmail(id, body) {
  const res = await fetch(`${API_URL}/users/${id}/email`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResp(res);
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResp(res);
}

export async function createUser(body) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResp(res);
}

export async function getBorrowedBooksByAdmin(id) {
  const res = await fetch(`${API_URL}/users/borrowBookA/${id}`, {
    credentials: "include",
  });
  return handleResp(res);
}
