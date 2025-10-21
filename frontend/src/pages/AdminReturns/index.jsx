import { useState, useEffect } from "react";
import { Menu, User, Book, ClipboardList, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import AlertBox from "@/components/ui/AlertBox";
import { useNavigate } from "react-router-dom";
import { fetchAllLoans, returnBook } from "@/services/loansService";

export default function AdminReturns() {
  const sidebarLinks = [
    { name: "Usuarios", path: "/admin/users", icon: User },
    { name: "Libros", path: "/admin/books", icon: Book },
    { name: "Préstamos", path: "/admin/loans", icon: ClipboardList },
    { name: "Devoluciones", path: "/admin/returns", icon: RotateCcw },
  ];

  const [loans, setLoans] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | returned

  const navigate = useNavigate();

  // 🟣 Cargar todos los préstamos
  useEffect(() => {
    fetchAllLoans()
      .then(setLoans)
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

  // 🔁 Registrar devolución
  async function handleReturnBook(userId, isbn) {
    try {
      await returnBook(userId, isbn);
      setLoans((prev) =>
        prev.map((loan) =>
          loan.user.id === userId && loan.book.isbn === isbn
            ? { ...loan, returned: true, returnDate: new Date().toISOString() }
            : loan
        )
      );
      setAlert({ type: "success", message: "✅ Libro devuelto correctamente." });
    } catch (err) {
      console.error("Error al devolver libro:", err);
      setAlert({ type: "error", message: "❌ No se pudo registrar la devolución." });
    }
  }

  // 🔎 Filtro por texto y estado
  const filteredLoans = loans.filter((loan) => {
    const matchText =
      loan.book.title.toLowerCase().includes(search.toLowerCase()) ||
      loan.user.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filter === "all" ||
      (filter === "active" && !loan.returned) ||
      (filter === "returned" && loan.returned);
    return matchText && matchStatus;
  });

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

      {/* 📚 Contenido principal */}
      <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between md:hidden mb-4">
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Devoluciones</h2>
        </div>

        <h2 className="hidden md:block text-xl font-semibold mb-4">Gestión de préstamos</h2>

        {/* 🔍 Barra de búsqueda */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Buscar por usuario o título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full md:w-1/2"
          />

          {/* Filtro de estado */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full md:w-1/4"
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="returned">Devueltos</option>
          </select>
        </div>

        {loading && <p className="text-gray-500">Cargando préstamos...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* 📋 Tabla de préstamos */}
        <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2 px-3">Usuario</th>
                <th className="py-2 px-3">Libro</th>
                <th className="py-2 px-3">ISBN</th>
                <th className="py-2 px-3">Fecha préstamo</th>
                <th className="py-2 px-3">Fecha devolución</th>
                <th className="py-2 px-3">Estado</th>
                <th className="py-2 px-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => (
                  <tr key={`${loan.user.id}-${loan.book.isbn}`} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{loan.user.name}</td>
                    <td className="py-2 px-3">{loan.book.title}</td>
                    <td className="py-2 px-3">{loan.book.isbn}</td>
                    <td className="py-2 px-3">{loan.borrowedDate?.slice(0, 10)}</td>
                    <td className="py-2 px-3">{loan.returnDate?.slice(0, 10) || "—"}</td>
                    <td className="py-2 px-3">
                      {loan.returned ? (
                        <span className="text-green-600 font-semibold">Devuelto</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">Activo</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {!loan.returned && (
                        <Button
                          variant="default"
                          onClick={() => handleReturnBook(loan.user.id, loan.book.isbn)}
                        >
                          Devolver
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No se encontraron préstamos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
