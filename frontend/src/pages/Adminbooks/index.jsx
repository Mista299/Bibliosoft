import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, MoreVertical } from "lucide-react"
import Sidebar from "../../components/Sidebar"
import { User, Book, ClipboardList } from "lucide-react"
import { useNavigate } from "react-router-dom";


export default function Adminbooks() {
  const sidebarLinks = [
    { name: "Usuarios", path: "/admin/users", icon: User },
    { name: "Libros", path: "/admin/books", icon: Book },
    { name: "Préstamos", path: "/admin/loans", icon: ClipboardList },
  ]

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  // 🚀 Obtener libros del backend al montar   el componente
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/books", {
          method: "GET",
          credentials: "include", // 🔑 importante: envía la cookie
        });

        if (res.status === 401) {
          // No autenticado → redirige al login
          navigate("/login", { state: { message: "No estás autorizado, inicia sesión" } });
        } else if (res.status === 403) {
          // Usuario autenticado pero sin permisos
          navigate("/", { state: { message: "Acceso denegado" } });
        }
      } catch (err) {
        console.error("Error al obtener libros", err);
      }
    };

    fetchBooks();
  }, [navigate]);

  return (
    <div className="flex">
      <Sidebar links={sidebarLinks} />

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">Books Panel</h2>

        {/* Estado de carga o error */}
        {loading && <p className="text-gray-500">Cargando libros...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

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

                {!loading && books.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                      No hay libros disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
