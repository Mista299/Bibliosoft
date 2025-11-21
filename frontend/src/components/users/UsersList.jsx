import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UsersList({ users = [], onEdit, onDelete, onOpenBorrowed }) {
  return (
    <div className="md:hidden space-y-3">
      {users.map((u) => (
        <div key={u.id} className="bg-white p-3 rounded shadow flex justify-between items-start">
          <div>
            <div className="font-semibold">{u.name} <span className="text-sm text-gray-500">({u.id})</span></div>
            <div className="text-sm text-gray-600">{u.email}</div>
            <div className="text-xs text-gray-500 mt-1">Rol: {u.role} • Préstamos: {(u.borrowedBooks && u.borrowedBooks.length) || 0}</div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="icon" onClick={() => onOpenBorrowed(u)}>
              <Eye size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onEdit(u)}>
              <Edit size={16} />
            </Button>
            <Button variant="destructive" size="icon" onClick={() => onDelete(u.id)}>
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
