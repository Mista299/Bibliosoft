import React from "react";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, BookOpen } from "lucide-react";

// Componente Badge para roles
function RoleBadge({ role }) {
  const normalized = role?.toLowerCase();

  const styles = {
    admin: "bg-red-100 text-red-700",
    user: "bg-blue-100 text-blue-700",
  };

  const selected = styles[normalized] || "bg-gray-200 text-gray-700";

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${selected}`}>
      {role}
    </span>
  );
}

export default function UsersTable({ users, onEdit, onDelete, onOpenBorrowed }) {
  return (
    <div className="w-full mt-4 flex flex-col h-screen">

      {/* ============================
          TABLA DESKTOP (ALINEADA)
      ============================= */}
      <div className="hidden md:block flex-1 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

        {/* Contenedor scrollable */}
        <div className="overflow-y-auto h-full">

          <table className="w-full border-collapse table-auto">

            {/* === ENCABEZADO STICKY === */}
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 w-32">Cédula</th>
                <th className="px-4 py-3 text-left text-gray-700 w-48">Nombre</th>
                <th className="px-4 py-3 text-left text-gray-700 w-60">Email</th>
                <th className="px-4 py-3 text-left text-gray-700 w-28">Rol</th>

                {/* ⭐ NUEVA COLUMNA ⭐ */}
                <th className="px-4 py-3 text-left text-gray-700 w-24">Préstamos</th>

                <th className="px-4 py-3 text-left text-gray-700 w-40">Acciones</th>
              </tr>
            </thead>

            {/* === CUERPO === */}
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <RoleBadge role={user.role} />
                  </td>

                  {/* ⭐ NUEVA CELDA: cantidad de préstamos ⭐ */}
                  <td className="px-4 py-2 font-semibold text-gray-700">
                    {user.borrowedBooks?.length ?? 0}
                  </td>

                  <td className="px-4 py-2 flex gap-2 items-center">
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(user.id)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenBorrowed(user)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition"
                    >
                      <BookOpen className="h-4 w-4 text-gray-700" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* TARJETAS MOBILE - Igual que antes */}
      <div className="block md:hidden flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition bg-white flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Cédula</p>
                <p className="font-medium">{user.id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Rol</p>
              <RoleBadge role={user.role} />
            </div>

            {/* Ya se muestra en versión móvil desde tu UsersList */}

            <div className="flex flex-wrap gap-2 mt-2">
              <Button
                variant="default"
                className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 transition flex items-center gap-1"
                onClick={() => onEdit(user)}
              >
                <Edit3 size={16} />
              </Button>

              <Button
                variant="destructive"
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition flex items-center gap-1"
                onClick={() => onDelete(user.id)}
              >
                <Trash2 size={16} />
              </Button>

              <Button
                variant="outline"
                className="px-3 py-1 rounded-md hover:bg-gray-200 transition flex items-center gap-1"
                onClick={() => onOpenBorrowed(user)}
              >
                <BookOpen size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
