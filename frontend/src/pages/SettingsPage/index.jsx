import { useState, useEffect } from "react";
import {
  Menu,
  User,
  Book,
  ClipboardList,
  Settings,
  RotateCcw,
  BookOpen,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import AlertBox from "@/components/ui/AlertBox";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  // 🧠 Estado del usuario (datos quemados)
  const [user, setUser] = useState({
    name: "María Fernanda Atencia",
    email: "mafe@example.com",
    password: "********",
    role: "user", // 🔹 Cambia a "admin" para probar el panel de administrador
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // 🧭 Sidebar dinámico según el rol del usuario
  const sidebarLinks =
    user.role === "admin"
      ? [
          { name: "Configuración", path: "/admin/settings", icon: Settings },
          { name: "Usuarios", path: "/admin/users", icon: User },
          { name: "Libros", path: "/admin/books", icon: Book },
          { name: "Préstamos", path: "/admin/loans", icon: ClipboardList },
          { name: "Devoluciones", path: "/admin/returns", icon: RotateCcw },
        ]
      : [
          { name: "Configuración", path: "/admin/settings", icon: Settings },
          { name: "Mis Libros", path: "/user/books", icon: BookOpen },
          { name: "Historial", path: "/user/history", icon: Clock },
        ];

  // 🔒 Bloquear scroll con sidebar móvil
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [sidebarOpen]);

  // ⌨️ Cerrar sidebar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && sidebarOpen) setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [sidebarOpen]);

  // 🔔 Auto-cierre de alertas
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // 🧾 Manejo de cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 Guardar cambios (simulación)
  const handleSave = async () => {
    if (!form.name && !form.email && !form.password) {
      setAlert({ type: "error", message: "⚠️ No hay cambios por guardar." });
      return;
    }

    try {
      // Simular llamada al backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser((prev) => ({
        ...prev,
        name: form.name || prev.name,
        email: form.email || prev.email,
        password: form.password ? "********" : prev.password,
      }));

      setForm({ name: "", email: "", password: "" });
      setAlert({ type: "success", message: "✅ Cambios guardados correctamente." });
    } catch (err) {
      setAlert({ type: "error", message: "❌ Error al guardar los cambios." });
    }
  };

  return (
    <div className="flex">
      {/* 🔔 Alertas */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80">
          <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        </div>
      )}

      {/* 🧭 Sidebar Desktop */}
      <div className="hidden md:flex">
        <Sidebar links={sidebarLinks} />
      </div>

      {/* 📱 Sidebar Móvil */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 transition-opacity"
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

      {/* ⚙️ Contenido principal */}
      <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">
        {/* Header móvil */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Configuración</h2>
        </div>

        {/* Header desktop */}
        <h2 className="hidden md:block text-xl font-semibold mb-6">
          Configuración del usuario
        </h2>

        {/* Tarjeta de configuración */}
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
          {/* Datos actuales */}
          <h3 className="text-lg font-medium mb-4">Información actual</h3>

          <div className="space-y-3 mb-6">
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo:</strong> {user.email}</p>
            <p><strong>Contraseña:</strong> {user.password}</p>
            <p>
              <strong>Rol:</strong>{" "}
              <span className="text-indigo-600 capitalize">{user.role}</span>
            </p>
          </div>

          <hr className="my-4" />

          {/* Formulario de edición */}
          <h3 className="text-lg font-medium mb-4">Actualizar información</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nuevo nombre:
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ingresa nuevo nombre"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nuevo correo:
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Ingresa nuevo correo"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva contraseña:
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg"
          >
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
