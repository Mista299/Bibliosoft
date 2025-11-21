import React from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserSearchBar({ search, setSearch, onAdd }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
      {/* Input con colores y estilos personalizados */}
      <div className="relative w-full sm:max-w-sm">
        <input
          type="text"
          placeholder="Buscar por cédula, nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full pl-10 pr-4 py-2 
            border rounded-lg 
            focus:ring-2 focus:ring-purple-500 
            text-sm
            bg-white
          "
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Botón para agregar usuario */}
      <Button
        className="bg-purple-600 text-white hover:bg-purple-700 w-full sm:w-auto"
        onClick={onAdd}
      >
        <Plus size={16} className="mr-2" /> Añadir usuario
      </Button>
    </div>
  );
}
