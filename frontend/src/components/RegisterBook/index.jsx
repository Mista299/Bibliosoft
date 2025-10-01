import React, { useState } from "react";

const RegisterBook = ({ open, onClose, onSubmit }) => {
   const [form, setForm] = useState({
    isbn: "",
    title: "",
    author: "",
    genre: "",
    publisher: "",
    publicationYear: "",
    location: "",
    loanStatus: "",
    summary: "",
    availableCopies: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!open) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

// dentro de RegisterBook.jsx (usa exactamente el resto de tu formulario como lo tienes)
const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError("")

  try {
    // Llamamos al handler que viene del padre (AdminBooks)
    // Asegúrate que AdminBooks devuelve/rechaza la promesa si hay error.
    await onSubmit({
      ...form,
      isbn: String(form.isbn), // modelo espera String
      publicationYear: Number(form.publicationYear),
      availableCopies: Number(form.availableCopies),
    })

    // si todo OK limpiar y cerrar desde el padre (pero limpiamos aquí también)
    setForm({
      isbn: "",
      title: "",
      author: "",
      genre: "",
      publisher: "",
      publicationYear: "",
      location: "",
      loanStatus: "",
      summary: "",
      availableCopies: "",
    })
    // NOTA: el padre (handleAddBook) ya hace setIsOpen(false). Si quieres que el componente también cierre:
    // onClose()
  } catch (err) {
    setError(err.message || "Error al crear el libro")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          ×
        </button>

        {/* Título */}
        <h1 className="text-2xl font-bold text-center mb-2">Añadir Libro</h1>
        <p className="text-gray-600 text-center mb-6">
          Completa los campos para registrar un nuevo libro en la biblioteca.
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Título:
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Autor:
            </label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                Isbn:
              </label>
              <input
                type="number"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                min="1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                Género:
              </label>
              <input
                type="text"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Editorial:
            </label>
            <input
              type="text"
              name="publisher"
              value={form.publisher}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                Ciudad:
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                Disponibilidad:
              </label>
              <select
                name="loanStatus"
                value={form.loanStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="disponible">Disponible</option>
                <option value="no_disponible">No disponible</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                Año de publicación:
              </label>
              <input
                type="number"
                name="publicationYear"
                value={form.publicationYear}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                Número de copias:
              </label>
              <input
                type="number"
                name="availableCopies"
                value={form.availableCopies}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Resumen:
            </label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 resize-y"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 text-white p-3 rounded-lg font-semibold hover:bg-purple-600 transition mt-6 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Añadir"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterBook;
