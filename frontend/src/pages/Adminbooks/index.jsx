import { useState, useEffect } from "react";
import { Menu, User, Book, ClipboardList, Settings, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import EditBookDialog from "@/components/EditBookDialog";
import BooksTable from "@/components/books/BooksTable";
import BooksList from "@/components/books/BooksList";
import BookSearchBar from "@/components/books/BookSearchBar";   // ✅ NUEVO SEARCHBAR
import AlertBox from "@/components/ui/AlertBox";
import { fetchBooks, updateBook, deleteBook, createBook } from "@/services/booksService";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  async function handleSaveBook(updatedBook) {
    try {
      await updateBook(updatedBook);
      setBooks(prev => prev.map(b => (b.isbn === updatedBook.isbn ? updatedBook : b)));
      setIsEditOpen(false);
      setAlert({ type: "success", message: "📚 Libro actualizado correctamente." });
    } catch {
      setAlert({ type: "error", message: "❌ No se pudo actualizar el libro." });
    }
  }

  async function handleDeleteBook(isbn) {
    try {
      await deleteBook(isbn);
      setBooks(prev => prev.filter(b => b.isbn !== isbn));
      setAlert({ type: "success", message: "Libro eliminado correctamente ✅" });
    } catch {
      setAlert({ type: "error", message: "No se pudo eliminar el libro ❌" });
    }
  }

  const handleAddBook = async (newBook) => {
    try {
      const data = await createBook(newBook);
      const book = data.book ?? data;
      setBooks(prev => [...prev, book]);
      setIsOpen(false);
      setAlert({ type: "success", message: "📖 Libro añadido correctamente." });
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">

      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80">
          <AlertBox type={alert.type} message={alert.message} />
        </div>
      )}

      {/* Sidebar Desktop */}
      <div className="hidden md:flex">
        <Sidebar links={sidebarLinks} />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">

        <h2 className="text-xl font-semibold mb-4">Panel de administrador</h2>

        {/* ⭐ NUEVA BARRA DE BÚSQUEDA */}
        <BookSearchBar
          search={search}
          setSearch={setSearch}
          onAddBook={() => setIsOpen(true)}   // 👈 Solo abre modal
        />

        {loading && <p className="text-gray-500">Cargando...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <BooksTable
          books={filteredBooks}
          onEdit={(b) => { setSelectedBook(b); setIsEditOpen(true); }}
          onDelete={handleDeleteBook}
        />

        <BooksList
          books={filteredBooks}
          onEdit={(b) => { setSelectedBook(b); setIsEditOpen(true); }}
          onDelete={handleDeleteBook}
        />

        <EditBookDialog
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          book={selectedBook}
          onSave={handleSaveBook}
        />

        <RegisterBook
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleAddBook}
        />

      </div>
    </div>
  );
}
