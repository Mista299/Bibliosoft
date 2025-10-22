import { useState } from "react";
import { Menu, User, Book, ClipboardList, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import AlertBox from "@/components/ui/AlertBox";
import { returnBook, fetchBorrowedBooks } from "@/services/loansService";

export default function AdminReturns() {
  const sidebarLinks = [
    { name: "Usuarios", path: "/admin/users", icon: User },
    { name: "Libros", path: "/admin/books", icon: Book },
    { name: "Préstamos", path: "/admin/loans", icon: ClipboardList },
    { name: "Devoluciones", path: "/admin/returns", icon: RotateCcw },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [id, setId] = useState("");
  const [isbn, setIsbn] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const handleReturn = async () => {
    if (!id || !isbn) {
      setAlert({ type: "error", message: "Debe ingresar cédula e ISBN" });
      return;
    }

    try {
      setLoading(true);
      const res = await returnBook(id, isbn);
      setAlert({ type: "success", message: res.message || "Devolución registrada" });

      const userBooks = await fetchBorrowedBooks(id);
      setBorrowedBooks(userBooks.borrowedBooks);
      setId("");
      setIsbn("");
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar desktop */}
      <div className="hidden md:flex">
        <Sidebar links={sidebarLinks} />
      </div>

      {/* Sidebar móvil */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar links={sidebarLinks} isMobile onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen flex flex-col items-center">
        {/* Botón para abrir el menú en móvil */}
        <div className="w-full flex items-center justify-between mb-4 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="border border-gray-300"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold text-[#9810FA]">Panel de Devoluciones</h2>
        </div>

        {/* Título desktop */}
        <h2 className="hidden md:block text-2xl font-semibold mb-6 text-[#9810FA]">
          Registrar Devolución
        </h2>

        {alert && (
          <div className="mb-4 w-full max-w-2xl">
            <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
          </div>
        )}

        {/* Inputs */}
        <div className="max-w-md w-full mb-6">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Cédula del usuario"
            className="w-full px-3 py-2 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9810FA]"
          />
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="ISBN del libro"
            className="w-full px-3 py-2 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9810FA]"
          />
          <Button
            className="w-full bg-[#9810FA] text-white hover:bg-[#7c0dd8]"
            onClick={handleReturn}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Devolución"}
          </Button>
        </div>

        {/* Tabla / Cards */}
        {borrowedBooks.length > 0 && (
          <div className="w-full max-w-5xl">
            {/* Tabla desktop */}
            <div className="hidden sm:block overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full bg-white border border-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                  <tr>
                    <th className="px-4 py-2 border">Título</th>
                    <th className="px-4 py-2 border">ISBN</th>
                    <th className="px-4 py-2 border">Fecha de préstamo</th>
                    <th className="px-4 py-2 border">Fecha de devolución</th>
                    <th className="px-4 py-2 border text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.map((book) => (
                    <tr
                      key={book.bookId}
                      className={`border ${
                        book.status === "activo"
                          ? "bg-green-50 hover:bg-green-100"
                          : "bg-purple-50 hover:bg-purple-100"
                      }`}
                    >
                      <td className="px-4 py-2 border">{book.title}</td>
                      <td className="px-4 py-2 border">{book.isbn}</td>
                      <td className="px-4 py-2 border">
                        {new Date(book.borrowedDate).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border">
                        {book.actualReturnDate
                          ? new Date(book.actualReturnDate).toLocaleString()
                          : new Date(book.returnDate).toLocaleString()}
                      </td>
                      <td
                        className={`px-4 py-2 border font-semibold text-center ${
                          book.status === "activo" ? "text-green-600" : "text-purple-700"
                        }`}
                      >
                        {book.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards móvil */}
            <div className="sm:hidden space-y-4">
              {borrowedBooks.map((book) => (
                <div
                  key={book.bookId}
                  className={`p-4 rounded-xl border shadow-sm ${
                    book.status === "activo"
                      ? "bg-green-50 border-green-200"
                      : "bg-purple-50 border-purple-200"
                  }`}
                >
                  <h3 className="font-semibold text-gray-800 text-base mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600">
                    <strong>ISBN:</strong> {book.isbn}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Préstamo:</strong> {new Date(book.borrowedDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Devolución:</strong> {new Date(book.returnDate).toLocaleDateString()}
                  </p>
                  <p
                    className={`mt-2 text-sm font-semibold ${
                      book.status === "activo" ? "text-green-600" : "text-purple-700"
                    }`}
                  >
                    Estado: {book.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
