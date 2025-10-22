import { useState } from "react";
import { Menu, BookOpen, Clock, RotateCcw, User, Book, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import AlertBox from "@/components/ui/AlertBox";
import { returnBook } from "@/services/loansService";

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

  const handleReturn = async () => {
    if (!id || !isbn) {
      setAlert({ type: "error", message: "Debe ingresar cédula e ISBN" });
      return;
    }

    try {
      setLoading(true);
      const res = await returnBook(id, isbn); 
      setAlert({ type: "success", message: res.message || "Devolución registrada" });
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
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        ></div>
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
        {/* Header móvil */}
        <div className="flex items-center justify-between md:hidden mb-6 w-full">
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </Button>
          <h2 className="text-lg font-semibold text-[#9810FA]">Registrar Devolución</h2>
        </div>

        {/* Header desktop */}
        <h2 className="hidden md:block text-2xl font-semibold mb-6 text-[#9810FA]">
          Registrar Devolución
        </h2>

        {alert && (
          <div className="mb-4 w-full max-w-md">
            <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
          </div>
        )}

        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-1">Cédula del usuario</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Ingrese cédula"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9810FA]"
            />
          </div>

          <div className="mb-6 w-full">
            <label className="block text-gray-700 mb-1">ISBN del libro</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="Ingrese ISBN"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9810FA]"
            />
          </div>

          <Button
            className="w-full bg-[#9810FA] text-white rounded-md hover:opacity-90"
            onClick={handleReturn}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Devolución"}
          </Button>
        </div>
      </div>
    </div>
  );
}
