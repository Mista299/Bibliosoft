import { useState, useEffect } from "react"
import { Menu, User, Book, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/Sidebar"
import EditBookDialog from "@/components/EditBookDialog"
import BooksTable from "@/components/books/BooksTable"
import BooksList from "@/components/books/BooksList"
import BookSearchBar from "@/components/books/BookSearchBar"
import AlertBox from "@/components/ui/AlertBox";
import { fetchBooks, updateBook, deleteBook } from "@/services/booksService"
import { useNavigate } from "react-router-dom"
import RegisterBook from "@/components/RegisterBook"

export default function AdminBooks() {
  const sidebarLinks = [
    { name: "Usuarios", path: "/admin/users", icon: User },
    { name: "Libros", path: "/admin/books", icon: Book },
    { name: "Préstamos", path: "/admin/loans", icon: ClipboardList },
  ]

  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [alert, setAlert] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  

  const navigate = useNavigate()

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch((err) => {
        setError(err.message)
        navigate("/login") // según el error podrías redirigir
      })
      .finally(() => setLoading(false))
  }, [navigate])

  // 🔔 Auto-cierre de la alerta
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000); // 4 segundos
      return () => clearTimeout(timer);
    }
  }, [alert]);


  async function handleSaveBook(updatedBook) {
    try {
      await updateBook(updatedBook)
      setBooks((prev) => prev.map((b) => (b.isbn === updatedBook.isbn ? updatedBook : b)))
      setIsEditOpen(false)
      setAlert({ type: "success", message: "📚 Libro actualizado correctamente." }) // ✅ alerta de éxito
    } catch (err) {
      setAlert({ type: "error", message: "❌ No se pudo actualizar el libro." }) // ✅ alerta de error
    }
  }


  async function handleDeleteBook(isbn) {
    try {
      await deleteBook(isbn)
      setBooks((prev) => prev.filter((b) => b.isbn !== isbn))
      // 🔔 Mostrar alerta de éxito
      setAlert({ type: "success", message: "Libro eliminado correctamente ✅" });
    } catch (err) {
      setAlert({ type: "error", message: "No se pudo eliminar el libro ❌" });
    }
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddBook = (data) => {
    console.log("Libro añadido:", data);
    // Aquí podrías llamar a tu backend
    setIsOpen(false); // cerrar modal después de guardar
  };



  return (
    <div className="flex">
      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80">
          <AlertBox type={alert.type} message={alert.message} />
        </div>
      )}

      {/* Sidebar desktop */}
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

      {/* Contenido */}
      <div className="flex-1 p-4 md:p-6">
        {/* Header móvil */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Books Panel</h2>
        </div>

        {/* Header desktop */}
        <h2 className="hidden md:block text-xl font-semibold mb-4">Panel de adminsitrador</h2>

        {/* Search */}
        <BookSearchBar 
          search={search} 
          setSearch={setSearch} 
          onAddBook={() => setIsOpen(true)} // 👈 ahora abre el modal
        />


        {loading && <p className="text-gray-500">Cargando...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Table / Cards */}
        <BooksTable books={filteredBooks} onEdit={(b) => { setSelectedBook(b); setIsEditOpen(true) }} onDelete={handleDeleteBook} />
        <BooksList books={filteredBooks} onEdit={(b) => { setSelectedBook(b); setIsEditOpen(true) }} onDelete={handleDeleteBook} />

        {/* Modal */}
        <EditBookDialog open={isEditOpen} onClose={() => setIsEditOpen(false)} book={selectedBook} onSave={handleSaveBook} />

        {/* Modal Book */}
        <RegisterBook 
          open={isOpen} 
          onClose={() => setIsOpen(false)} 
          onSubmit={handleAddBook} 
        />
      </div>
    </div>
  )
}
