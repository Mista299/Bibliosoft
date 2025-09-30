const API_URL = import.meta.env.VITE_API_URL

export async function fetchBooks() {
  const res = await fetch(`${API_URL}/books`, { method: "GET", credentials: "include" })
  if (!res.ok) throw new Error("Error al cargar libros")
  return res.json()
}

export async function updateBook(book) {
  const res = await fetch(`${API_URL}/books/${book.isbn}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
    credentials: "include",
  })
  if (!res.ok) throw new Error("Error al actualizar libro")
  return res.json()
}

export async function deleteBook(isbn) {
  const res = await fetch(`${API_URL}/books/${isbn}`, { method: "DELETE", credentials: "include" })
  if (!res.ok) throw new Error("Error eliminando libro")
}
