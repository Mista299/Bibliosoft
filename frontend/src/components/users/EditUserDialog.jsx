import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function EditUserDialog({ open, onClose, user, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user.id, { name, email });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      {/* Fondo oscuro semi-transparente */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="relative bg-white rounded-2xl shadow-lg z-10 w-full max-w-lg p-6 animate-slideUp">
        <h3 className="text-xl font-bold text-black mb-4 text-center">Editar usuario</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block relative">
            <span className="text-sm text-gray-600">Cédula</span>
            <input
              value={user?.id}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </label>

          <label className="block relative">
            <span className="text-sm text-gray-600">Nombre</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </label>

          <label className="block relative">
            <span className="text-sm text-gray-600">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </label>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="ghost"
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition transform hover:scale-105"
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>

      {/* Animaciones */}
      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideUp { animation: slideUp 0.4s ease-out; }
        `}
      </style>
    </div>
  );
}
