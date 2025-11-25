import { useState, useEffect } from "react";
import { Menu, User, Book, ClipboardList, Settings, RotateCcw } from "lucide-react";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import AlertBox from "@/components/ui/AlertBox";
import { useNavigate } from "react-router-dom";

import { borrowBook } from "@/services/booksService";
import { formatError } from "@/utils/formatError";


export default function AdminLoanCreate() {
  const sidebarLinks = [
    { name: "Configuración", path: "/admin/settings", icon: Settings },
    { name: "Usuarios", path: "/admin/users", icon: User },
    { name: "Libros", path: "/admin/books", icon: Book },
    { name: "Préstamos", path: "/admin/loans", icon: ClipboardList },
    { name: "Devoluciones", path: "/admin/returns", icon: RotateCcw },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isbn, setIsbn] = useState("");
  const [cedula, setCedula] = useState("");

  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  // Auto-cerrar alertas
  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(null), 3500);
    return () => clearTimeout(t);
  }, [alert]);

  // ==========================================================
  // Enviar solicitud de préstamo
  // ==========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isbn || !cedula) {
      setAlert({
        type: "error",
        message: "Debes ingresar el ISBN y la cédula del usuario.",
      });
      return;
    }

    try {
      const resp = await borrowBook(isbn, cedula);

      setAlert({
        type: "success",
        message: resp.message || "Préstamo registrado correctamente.",
      });

      setIsbn("");
      setCedula("");
    } catch (err) {
      setAlert({
        type: "error",
        message: formatError(err),
      });
    }
  };

  return (
    <div className="flex w-full min-h-screen overflow-x-hidden bg-gray-50">
      {/* ALERTAS */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80">
          <AlertBox type={alert.type} message={alert.message} />
        </div>
      )}

      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:flex">
        <Sidebar links={sidebarLinks} />
      </div>

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            links={sidebarLinks}
            isMobile
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 p-4 md:p-6 flex flex-col max-w-full">
        <div className="flex items-center justify-between md:hidden mb-4">
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Registrar Préstamo</h2>
        </div>

        <h2 className="hidden md:block text-xl font-semibold mb-4">
          Registrar nuevo préstamo
        </h2>

        <div className="bg-white rounded-2xl p-6 shadow-md max-w-xl w-full mx-auto border border-gray-200">

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* ISBN */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">ISBN del libro</label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="978-3-16-148410-0"
                className="border p-3 rounded-xl w-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            {/* CÉDULA */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Cédula del usuario</label>
              <input
                type="number"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="1234567890"
                className="border p-3 rounded-xl w-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            {/* ENVIAR */}
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 text-md"
            >
              Registrar préstamo
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}
