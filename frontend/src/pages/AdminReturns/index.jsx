import { useState } from "react";
import { Menu, User, Book, ClipboardList, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import AlertBox from "@/components/ui/AlertBox";
import { returnBook, fetchBorrowedBooks } from "@/services/loansService";

export default function AdminReturns() {
  const sidebarLinks = [
    { name: "Configuración", path: "/admin/settings", icon: User },
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

  // 🔄 Registrar devolución
  const handleReturn = async () => {
    if (!id || !isbn) {
      setAlert({ type: "error", message: "Debe ingresar cédula e ISBN" });
      return;
    }

    try {
      setLoading(true);
      const res = await returnBook(id, isbn);
      setAlert({ type: "success", message: res.message || "Devolución registrada correctamente" });

      // Obtener los préstamos actualizados
      const userBooks = await fetchBorrowedBooks(id);
      setBorrowedBooks(userBooks.borrowedBooks || []);
      setIsbn("");
    } catch (err) {
      setAlert({ type: "error", message: err.message || "Error al registrar la devolución" });
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Colores según el estado del préstamo
  const getRowColor = (status) => {
    switch (status) {
      case "activo":
        return { bg: "bg-green-50 hover:bg-green-100", text: "text-green-600" };
      case "vencido":
        return { bg: "bg-red-50 hover:bg-red-100", text: "text-red-600" };
      case "devuelto":
        return { bg: "bg-purple-50 hover:bg-purple-100", text: "text-purple-700" };
      default:
        return { bg: "bg-gray-50 hover:bg-gray-100", text: "text-gray-600" };
    }
  };

  return (
    <div className="flex">
      {/* 📁 Sidebar desktop */}
      <div className="hidden md:flex">
        <Sidebar links={sidebarLinks} />
      </div>

      {/* 📱 Sidebar móvil */}
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

      {/* 🌐 Contenido principal */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen flex flex-col items-center">
        {/* Botón menú móvil */}
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
            {/* 🖥 Tabla desktop */}
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
                  {borrowedBooks.map((book) => {
                    const { bg, text } = getRowColor(book.status);
                    return (
                      <tr key={book.bookId} className={`border ${bg}`}>
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
                        <td className={`px-4 py-2 border font-semibold text-center ${text}`}>
                          {book.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 📱 Cards móvil */}
            <div className="sm:hidden space-y-4">
              {borrowedBooks.map((book) => {
                const { bg, text } = getRowColor(book.status);
                return (
                  <div key={book.bookId} className={`p-4 rounded-xl border shadow-sm ${bg}`}>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-600">
                      <strong>ISBN:</strong> {book.isbn}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Préstamo:</strong>{" "}
                      {new Date(book.borrowedDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Devolución:</strong>{" "}
                      {new Date(book.returnDate).toLocaleDateString()}
                    </p>
                    <p className={`mt-2 text-sm font-semibold ${text}`}>
                      Estado: {book.status}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
