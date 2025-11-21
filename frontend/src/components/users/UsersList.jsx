import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UsersList({ users = [], onEdit, onDelete, onOpenBorrowed }) {
  return (
    <div className="md:hidden space-y-3 w-full">
      {users.map((u) => (
        <div
          key={u.id}
          className="bg-white p-4 rounded-lg shadow flex justify-between gap-4 w-full"
        >
          {/* Información del usuario */}
          <div className="flex-1 min-w-0">
            <div className="font-semibold break-words">
              {u.name}{" "}
              <span className="text-sm text-gray-500">({u.id})</span>
            </div>

            <div className="text-sm text-gray-600 break-all">
              {u.email}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Rol: {u.role} • Préstamos: {u.borrowedBooks?.length ?? 0}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-2 items-center self-start pt-1">
            <Button variant="ghost" size="icon" onClick={() => onOpenBorrowed(u)}>
              <Eye size={18} />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => onEdit(u)}>
              <Edit size={18} />
            </Button>

            <Button variant="destructive" size="icon" onClick={() => onDelete(u.id)}>
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
