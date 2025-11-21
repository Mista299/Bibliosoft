import React, { useState } from "react";

export default function RegisterUser({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    vpassword: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.id || !form.name || !form.email || !form.password || !form.vpassword || !form.role) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (form.password !== form.vpassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      await onSubmit(form);

      // limpiar formulario
      setForm({
        id: "",
        name: "",
        email: "",
        password: "",
        vpassword: "",
        role: "",
      });

      // cerrar modal
      onClose();
    } catch (err) {
      setError(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">

        {/* Botón cerrar (igual que RegisterBook) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          ×
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2">Registrar Usuario</h1>
        <p className="text-gray-600 text-center mb-6">
          Completa los campos para crear un nuevo usuario.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {error && (
            <div className="text-red-500 text-center mb-3 font-medium">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Cédula:
            </label>
            <input
              type="number"
              name="id"
              value={form.id}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                Contraseña:
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                Repetir contraseña:
              </label>
              <input
                type="password"
                name="vpassword"
                value={form.vpassword}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Rol:
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 text-white p-3 rounded-lg font-semibold hover:bg-purple-600 transition mt-6 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Crear usuario"}
          </button>
        </form>
      </div>
    </div>
  );
}
