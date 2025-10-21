import { useState, useEffect } from "react";
import { Menu, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import AlertBox from "@/components/ui/AlertBox";
import { fetchUserLoans } from "@/services/loansService";
import { useNavigate } from "react-router-dom";

export default function UserLoansPanel() {
  const sidebarLinks = [
    { name: "Mis Libros", path: "/user/loans", icon: BookOpen },
    { name: "Historial", path: "/user/history", icon: Clock },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  // 🟣 Cargar préstamos del usuario
  useEffect(() => {
    fetchUserLoans()
      .then((data) => {
        // Aceptar tanto un array directo como { loans: [...] }
        const list = Array.isArray(data) ? data : data?.loans ?? [];
        setLoans(list);
      })
      .catch((err) => {
        const msg = err?.message || String(err);
        setError(msg);
        // Solo redirigir si parece un problema de autenticación
        if (/401|unauthori|unauth/i.test(msg)) {
          navigate("/login");
        }
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

  // 🧮 Separar préstamos actuales e históricos
  const currentLoans = loans.filter((loan) => !loan.returnDate);
  const pastLoans = loans.filter((loan) => loan.returnDate);

  // ⚠️ Función auxiliar para detectar atraso
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    try {
      return new Date(dueDate) < new Date();
    } catch (e) {
      return false;
    }
  };

  const formatDate = (d) => {
    if (!d) return "-";
    try {
      return new Date(d).toLocaleDateString();
    } catch (e) {
      return String(d);
    }
  };

  return (
    <div className="flex">
      {/* 🔔 Alertas */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80">
          <AlertBox
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {/* 🧭 Sidebar Desktop */}
      <div className="hidden md:flex">
        <Sidebar links={sidebarLinks} />
      </div>

      {/* 📱 Sidebar móvil */}
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
          <h2 className="text-lg font-semibold">Mis préstamos</h2>
        </div>

        {/* Header desktop */}
        <h2 className="hidden md:block text-xl font-semibold mb-6">Panel de préstamos</h2>

        {loading && <p className="text-gray-500">Cargando tus préstamos...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* 🟢 Libros actualmente prestados */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Libros actualmente prestados</h3>
          {currentLoans.length === 0 ? (
            <p className="text-gray-500">No tienes préstamos activos.</p>
          ) : (
            <div className="grid gap-4">
              {currentLoans.map((loan) => (
                <div
                  key={loan.id ?? loan._id}
                  className={`p-4 bg-white rounded-2xl shadow-md border ${
                    isOverdue(loan.dueDate) ? "border-red-400" : "border-gray-200"
                  }`}
                >
                  <h4 className="font-medium">{loan.bookTitle}</h4>
                  <p className="text-sm text-gray-600">Autor: {loan.bookAuthor}</p>
                  <p className="text-sm text-gray-600">Fecha de préstamo: {formatDate(loan.loanDate)}</p>
                  <p className="text-sm text-gray-600">Fecha de devolución: {formatDate(loan.dueDate)}</p>
                  {isOverdue(loan.dueDate) && (
                    <span className="text-red-500 font-semibold text-sm">
                      ⚠️ Préstamo atrasado
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 🔵 Historial de préstamos */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Historial de préstamos anteriores</h3>
          {pastLoans.length === 0 ? (
            <p className="text-gray-500">Aún no tienes historial de préstamos.</p>
          ) : (
            <div className="grid gap-4">
              {pastLoans.map((loan) => (
                <div
                  key={loan.id ?? loan._id}
                  className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200"
                >
                  <h4 className="font-medium">{loan.bookTitle}</h4>
                  <p className="text-sm text-gray-600">Autor: {loan.bookAuthor}</p>
                  <p className="text-sm text-gray-600">Fecha de préstamo: {formatDate(loan.loanDate)}</p>
                  <p className="text-sm text-gray-600">
                    Devuelto el: <span className="font-medium">{formatDate(loan.returnDate)}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
