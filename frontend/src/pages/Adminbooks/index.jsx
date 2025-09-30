import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, Menu } from "lucide-react"
import Sidebar from "../../components/Sidebar"
import ActionMenu from "../../components/ActionMenu"
import { User, Book, ClipboardList } from "lucide-react"
import { useNavigate } from "react-router-dom";
import EditBookDialog from "../../components/EditBookDialog"

const API_URL = import.meta.env.VITE_API_URL

export default function Adminbooks() {
  const sidebarLinks = [
    { name: "Usuarios", path: "/admin/users", icon: User },
    { name: "Libros", path: "/admin/books", icon: Book },
    { name: "Préstamos", path: "/admin/loans", icon: ClipboardList },
  ]

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false) // ✨ NUEVO
  const navigate = useNavigate();

  const [selectedBook, setSelectedBook] = useState(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${API_URL}/books`, {
          method: "GET",
          credentials: "include",
        });
        
        if (res.status === 401) {
          navigate("/login", { state: { message: "No estás autorizado, inicia sesión" } });
          return;
        } else if (res.status === 403) {
          navigate("/", { state: { message: "Acceso denegado" } });
          return;
        }

        if (!res.ok) throw new Error("Error al cargar libros");
        
        const data = await res.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener libros", err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, [navigate]);
  
  async function handleSaveBook(updatedBook) {
    try {
      const response = await fetch(`${API_URL}/books/${updatedBook.isbn}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
        credentials: "include",
      })

      if (!response.ok) throw new Error("Error al actualizar el libro")

      // Actualiza la lista en el estado
      setBooks((prev) =>
        prev.map((book) => (book.isbn === updatedBook.isbn ? updatedBook : book))
      )

      setIsEditOpen(false)
      alert("✅ Libro actualizado con éxito")
    } catch (error) {
      console.error(error)
      alert("❌ No se pudo actualizar el libro")
    }
  }

  async function handleDelete(isbn) {
    try {
      const response = await fetch(`${API_URL}/books/${isbn}`, {
        method: "DELETE",
        credentials: "include", 
      });

      if (!response.ok) {
        throw new Error("Error eliminando el libro");
      }

      setBooks((prev) => prev.filter((book) => book.isbn !== isbn));
      alert("Libro eliminado correctamente ✅");
    } catch (error) {
      console.error("Error eliminando libro:", error);
      alert("❌ No se pudo eliminar el libro");
    }
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar links={sidebarLinks} />
      </div>

      {/* Sidebar móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
            <Sidebar links={sidebarLinks} />
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex-1 p-4 md:p-6">
        {/* Botón hamburguesa solo en móvil */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Books Panel</h2>
        </div>

        {/* Desktop título */}
        <h2 className="hidden md:block text-xl font-semibold mb-4">Books Panel</h2>

        {loading && <p className="text-gray-500">Cargando libros...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Barra de búsqueda */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
          <div className="relative w-full sm:max-w-sm">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button variant="outline" className="flex gap-2 w-full sm:w-auto">
            <Filter size={16} /> Filter
          </Button>
          <Button className="bg-purple-600 text-white hover:bg-purple-700 w-full sm:w-auto">
            Add Book
          </Button>
        </div>

        {/* Tabla desktop */}
        <Card className="overflow-x-auto rounded-2xl shadow">
          <CardContent className="p-0">
            <table className="hidden md:table w-full text-left border-collapse">
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
                {filteredBooks.map((book) => (
                  <tr key={book.isbn} className="border-t">
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">{book.publisher}</td>
                    <td className="px-4 py-2">{book.publicationYear}</td>
                    <td className="px-4 py-2">{book.isbn}</td>
                    <td className="px-4 py-2">{book.genre}</td>
                    <td className="px-4 py-2">{book.availableCopies}</td>
                    <td className="px-4 py-2 text-right">
                      <ActionMenu
                        onEdit={() => {
                          setSelectedBook(book)
                          setIsEditOpen(true)
                        }}
                        onDelete={() => handleDelete(book.isbn)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Cards móvil */}
            <div className="md:hidden space-y-4 p-4">
              {filteredBooks.map((book) => (
                <div key={book.isbn} className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="text-sm">Editorial: {book.publisher}</p>
                  <p className="text-sm">Año: {book.publicationYear}</p>
                  <p className="text-sm">ISBN: {book.isbn}</p>
                  <p className="text-sm">Categoría: {book.genre}</p>
                  <p className="text-sm">Copias: {book.availableCopies}</p>
                  <div className="flex justify-end mt-2">
                    <ActionMenu
                      onEdit={() => {
                        setSelectedBook(book)
                        setIsEditOpen(true)
                      }}
                      onDelete={() => handleDelete(book.isbn)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {!loading && filteredBooks.length === 0 && (
              <p className="px-4 py-6 text-center text-gray-500">
                No se encontraron libros
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <EditBookDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        book={selectedBook}
        onSave={handleSaveBook}
      />
    
    </div>
)
}
