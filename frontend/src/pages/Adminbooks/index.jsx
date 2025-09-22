// src/components/BooksPanel.jsx
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, MoreVertical } from "lucide-react"
import Sidebar from "../../components/Sidebar";
import { User, Book, ClipboardList } from "lucide-react"; 

export default function Adminbooks() {
  const sidebarLinks = [
    { name: "Usuarios", path: "/admin/users", icon: User },
    { name: "Libros", path: "/admin/books", icon: Book },
    { name: "Préstamos", path: "/admin/loans", icon: ClipboardList },
  ];

  const [books, setBooks] = useState([
    {
      id: 1,
      titulo: "Cien Años de Soledad",
      autor: "Gabriel García Márquez",
      editorial: "Sudamericana",
      anio: 1967,
      isbn: "978-3-16-148410-0",
      categoria: "Novela",
      copias: 5,
    },
    {
      id: 2,
      titulo: "El Quijote",
      autor: "Miguel de Cervantes",
      editorial: "Francisco de Robles",
      anio: 1605,
      isbn: "978-84-376-0494-7",
      categoria: "Clásico",
      copias: 3,
    },
  ])

  return (
    <div className="flex"> 
      {/* Sidebar a la izquierda */}
      <Sidebar links={sidebarLinks} />

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">Books Panel</h2>

        {/* Barra de búsqueda */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button variant="outline" className="flex gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Add Book
          </Button>
        </div>

        {/* Tabla de libros */}
        <Card className="overflow-hidden rounded-2xl shadow">
          <CardContent className="p-0">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Título</th>
                  <th className="px-4 py-2">Autor</th>
                  <th className="px-4 py-2">Editorial</th>
                  <th className="px-4 py-2">Año</th>
                  <th className="px-4 py-2">ISBN</th>
                  <th className="px-4 py-2">Categoría</th>
                  <th className="px-4 py-2">Copias</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-t">
                    <td className="px-4 py-2">{book.titulo}</td>
                    <td className="px-4 py-2">{book.autor}</td>
                    <td className="px-4 py-2">{book.editorial}</td>
                    <td className="px-4 py-2">{book.anio}</td>
                    <td className="px-4 py-2">{book.isbn}</td>
                    <td className="px-4 py-2">{book.categoria}</td>
                    <td className="px-4 py-2">{book.copias}</td>
                    <td className="px-4 py-2 text-right">
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
