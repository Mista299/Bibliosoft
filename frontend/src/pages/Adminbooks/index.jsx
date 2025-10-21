import { useState, useEffect } from "react";
import { Menu, User, Book, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import EditBookDialog from "@/components/EditBookDialog";
import BooksTable from "@/components/books/BooksTable";
import BooksList from "@/components/books/BooksList";
import BookSearchBar from "@/components/books/BookSearchBar";
import AlertBox from "@/components/ui/AlertBox";
import { fetchBooks, updateBook, deleteBook, createBook } from "@/services/booksService";
import { useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import RegisterBook from "@/components/RegisterBook";

export default function AdminBooks() {
  const sidebarLinks = [
    { name: "Usuarios", path: "/admin/users", icon: User },
    { name: "Libros", path: "/admin/books", icon: Book },
    { name: "Préstamos", path: "/admin/loans", icon: ClipboardList },
    { name: "Devoluciones", path: "/admin/returns", icon: RotateCcw },
  ];

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // 🟣 Obtener libros
  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch((err) => {
        setError(err.message);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // 🔔 Auto-cierre de alertas
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // 🔒 Bloquear scroll cuando el sidebar móvil está abierto
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [sidebarOpen]);

  // ⌨️ Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && sidebarOpen) setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [sidebarOpen]);

  // 📘 Guardar cambios en libro
  async function handleSaveBook(updatedBook) {
    try {
      await updateBook(updatedBook);
      setBooks((prev) => prev.map((b) => (b.isbn === updatedBook.isbn ? updatedBook : b)));
      setIsEditOpen(false);
      setAlert({ type: "success", message: "📚 Libro actualizado correctamente." });
    } catch (err) {
      setAlert({ type: "error", message: "❌ No se pudo actualizar el libro." });
    }
  }

  // 🗑️ Eliminar libro
  async function handleDeleteBook(isbn) {
    try {
      await deleteBook(isbn);
      setBooks((prev) => prev.filter((b) => b.isbn !== isbn));
      setAlert({ type: "success", message: "Libro eliminado correctamente ✅" });
    } catch (err) {
      setAlert({ type: "error", message: "No se pudo eliminar el libro ❌" });
    }
  }

  // ➕ Agregar libro
  const handleAddBook = async (newBook) => {
    try {
      const data = await createBook(newBook);
      const book = data.book ?? data;
      setBooks((prev) => [...prev, book]);
      setIsOpen(false);
      setAlert({ type: "success", message: "📖 Libro añadido correctamente." });
    } catch (err) {
      console.error("createBook error:", err);
      setAlert({ type: "error", message: err.message || "❌ No se pudo crear el libro." });
    }
  };

  // 🔎 Filtro
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      {/* 🔔 Alertas */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80">
          <AlertBox type={alert.type} message={alert.message} />
        </div>
      )}

      {/* 🧭 Sidebar Desktop */}
      <div className="hidden md:flex">
        <Sidebar links={sidebarLinks} />
      </div>

      {/* 📱 Sidebar Móvil con animación */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Fondo oscuro */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Panel deslizable */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar links={sidebarLinks} isMobile={true} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* 📚 Contenido principal */}
      <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">
        {/* Header móvil */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Panel de administrador</h2>
        </div>

        {/* Header desktop */}
        <h2 className="hidden md:block text-xl font-semibold mb-4">Panel de administrador</h2>

        {/* Barra de búsqueda */}
        <BookSearchBar
          search={search}
          setSearch={setSearch}
          onAddBook={() => setIsOpen(true)}
        />

        {/* Estado de carga / error */}
        {loading && <p className="text-gray-500">Cargando...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Tabla / Lista */}
        <BooksTable
          books={filteredBooks}
          onEdit={(b) => {
            setSelectedBook(b);
            setIsEditOpen(true);
          }}
          onDelete={handleDeleteBook}
        />
        <BooksList
          books={filteredBooks}
          onEdit={(b) => {
            setSelectedBook(b);
            setIsEditOpen(true);
          }}
          onDelete={handleDeleteBook}
        />

        {/* Modal Editar */}
        <EditBookDialog
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          book={selectedBook}
          onSave={handleSaveBook}
        />

        {/* Modal Crear */}
        <RegisterBook open={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleAddBook} />
      </div>
    </div>
  );
}
