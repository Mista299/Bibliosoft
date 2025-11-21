import React from "react";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, BookOpen } from "lucide-react";

export default function UsersTable({ users, onEdit, onDelete, onOpenBorrowed }) {
  return (
    <div className="w-full mt-4 flex flex-col h-screen">
      {/* Tabla para desktop */}
      <div className="hidden md:flex flex-col flex-1 overflow-hidden rounded-2xl shadow-lg border border-gray-200">
        {/* Encabezado fijo */}
        <table className="w-full border-collapse table-auto flex-shrink-0">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700">Cédula</th>
              <th className="px-4 py-3 text-left text-gray-700">Nombre</th>
              <th className="px-4 py-3 text-left text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-gray-700">Acciones</th>
            </tr>
          </thead>
        </table>

        <div className="overflow-y-auto flex-1">
          <table className="w-full border-collapse table-auto">
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="even:bg-gray-50 hover:bg-gray-100 transition">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 transition transform hover:scale-105 flex items-center gap-1"
                      onClick={() => onEdit(user)}
                    >
                      <Edit3 size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition transform hover:scale-105 flex items-center gap-1"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tarjetas para mobile */}
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
            <div className="flex flex-wrap gap-2 mt-2">
              <Button
                variant="default"
                className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 transition transform hover:scale-105 flex items-center gap-1"
                onClick={() => onEdit(user)}
              >
                <Edit3 size={16} />
              </Button>
              <Button
                variant="destructive"
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition transform hover:scale-105 flex items-center gap-1"
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
