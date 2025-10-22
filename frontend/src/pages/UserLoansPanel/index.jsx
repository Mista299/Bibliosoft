import { useState, useEffect } from "react";
import { Menu, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import AlertBox from "@/components/ui/AlertBox";
import { fetchUserLoans, extendLoan } from "@/services/loansService";
import { useNavigate } from "react-router-dom";

export default function UserLoansPanel() {
  const sidebarLinks = [
    { name: "Mis Libros", path: "/user/books", icon: BookOpen },
    { name: "Historial", path: "/user/history", icon: Clock },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const loadLoans = async () => {
    try {
      const data = await fetchUserLoans();
      setLoans(data?.books ?? []);
    } catch (err) {
      const msg = err?.message || String(err);
      setError(msg);
      if (/401|unauthori|unauth/i.test(msg)) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLoans();
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [sidebarOpen]);

  const isOverdue = (returnDate) => returnDate && new Date(returnDate) < new Date();
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "-");

  const activeLoans = loans.filter((loan) => loan.status === "activo");
  const pastLoans = loans.filter((loan) => loan.status !== "activo");

  const handleExtendLoan = async (isbn) => {
    try {
      const result = await extendLoan(isbn);
      setAlert({
        type: "success",
        message: `✅ ${result.message}. Extensiones realizadas: ${result.extensionCount}`,
      });
      await loadLoans();
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        "Error desconocido al extender el préstamo";
      setAlert({
        type: "error",
        message: `⚠️ ${msg}`,
      });
    }
  };

  return (
    <div className="flex">
      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80">
          <AlertBox
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <div className="hidden md:flex">
        <Sidebar links={sidebarLinks} />
      </div>

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
            isMobile={true}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between md:hidden mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Mis préstamos</h2>
        </div>

        <h2 className="hidden md:block text-xl font-semibold mb-6">
          Panel de préstamos
        </h2>

        {loading && <p className="text-gray-500">Cargando tus préstamos...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* 📚 Préstamos activos */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Préstamos actuales</h3>

          {/* Tarjetas móviles */}
          <div className="grid gap-4 md:hidden">
            {activeLoans.length === 0 ? (
              <p className="text-gray-500">No tienes préstamos activos.</p>
            ) : (
              activeLoans.map((loan) => (
                <div
                  key={loan.isbn}
                  className={`p-4 bg-white rounded-2xl shadow-md border ${
                    isOverdue(loan.returnDate)
                      ? "border-red-400"
                      : "border-gray-200"
                  }`}
                >
                  <h4 className="font-medium">{loan.title}</h4>
                  <p className="text-sm text-gray-600">ISBN: {loan.isbn}</p>
                  <p className="text-sm text-gray-600">
                    Fecha de préstamo: {formatDate(loan.borrowedDate)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Fecha de devolución: {formatDate(loan.returnDate)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Extensiones realizadas:{" "}
                    <span className="font-semibold text-[#9810FA]">
                      {loan.extensionCount ?? 0}
                    </span>
                  </p>
                  {isOverdue(loan.returnDate) && (
                    <span className="text-red-500 font-semibold text-sm">
                      ⚠️ Préstamo atrasado
                    </span>
                  )}
                  <Button
                    size="sm"
                    className="bg-[#9810FA] text-white hover:opacity-90 mt-2"
                    onClick={() => handleExtendLoan(loan.isbn)}
                  >
                    Extender
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Tabla escritorio */}
          <div className="hidden md:block overflow-x-auto">
            {activeLoans.length === 0 ? (
              <p className="text-gray-500">No tienes préstamos activos.</p>
            ) : (
              <table className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Título</th>
                    <th className="p-3 text-left">ISBN</th>
                    <th className="p-3 text-left">Fecha préstamo</th>
                    <th className="p-3 text-left">Fecha devolución</th>
                    <th className="p-3 text-left">Extensiones</th>
                    <th className="p-3 text-left">Estado</th>
                    <th className="p-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {activeLoans.map((loan) => (
                    <tr
                      key={loan.isbn}
                      className={`border-b ${
                        isOverdue(loan.returnDate) ? "bg-red-50" : ""
                      }`}
                    >
                      <td className="p-3">{loan.title}</td>
                      <td className="p-3">{loan.isbn}</td>
                      <td className="p-3">{formatDate(loan.borrowedDate)}</td>
                      <td className="p-3">{formatDate(loan.returnDate)}</td>
                      <td className="p-3 text-center font-medium text-[#9810FA]">
                        {loan.extensionCount ?? 0}
                      </td>
                      <td className="p-3 font-medium">
                        {isOverdue(loan.returnDate) ? "Atrasado ⚠️" : "Activo"}
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          className="bg-[#9810FA] text-white hover:opacity-90"
                          onClick={() => handleExtendLoan(loan.isbn)}
                        >
                          Extender
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* 🕓 Historial */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Historial de préstamos</h3>
          <div className="hidden md:block overflow-x-auto">
            {pastLoans.length === 0 ? (
              <p className="text-gray-500">No tienes historial de préstamos.</p>
            ) : (
              <table className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Título</th>
                    <th className="p-3 text-left">ISBN</th>
                    <th className="p-3 text-left">Fecha préstamo</th>
                    <th className="p-3 text-left">Fecha devolución</th>
                    <th className="p-3 text-left">Extensiones</th>
                    <th className="p-3 text-left">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pastLoans.map((loan) => (
                    <tr key={loan.isbn} className="border-b">
                      <td className="p-3">{loan.title}</td>
                      <td className="p-3">{loan.isbn}</td>
                      <td className="p-3">{formatDate(loan.borrowedDate)}</td>
                      <td className="p-3">{formatDate(loan.actualReturnDate)}</td>
                      <td className="p-3 text-center text-[#9810FA] font-medium">
                        {loan.extensionCount ?? 0}
                      </td>
                      <td className="p-3 font-medium">
                        {loan.status === "activo" ? "Activo" : "Devuelto"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
