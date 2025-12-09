// src/components/ui/PasswordInput.jsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ value, onChange, name, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nuevo nombre
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ingresa nuevo nombre"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 
          focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nuevo correo
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Ingresa nuevo correo"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 
          focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      {/* Password con icono */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nueva contraseña
        </label>
        <PasswordInput
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Nueva contraseña"
        />
      </div>

      {/* Confirmación */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar contraseña
        </label>
        <PasswordInput
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Repite la contraseña"
        />
      </div>

    </div>
  );
}
