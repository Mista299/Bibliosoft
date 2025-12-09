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
import {
  fetchUserProfile,
  putUserName,
  putUserEmail,
  putUserPassword,
} from "../../services/userService";

export default function SettingsPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "********",
    role: "user",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Cargar perfil al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const profile = await fetchUserProfile();
        setUser((prev) => ({
          ...prev,
          name: profile.name,
          email: profile.email,
          role: profile.role || "user",
        }));
      } catch (err) {
        setAlert({ type: "error", message: "No se pudo cargar el perfil." });
      }
    };
    loadUser();
  }, []);

  // Alert timer
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 4000);
    return () => clearTimeout(timer);
  }, [alert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.name && !form.email && !form.password) {
      setAlert({ type: "error", message: "⚠️ No hay cambios por guardar." });
      return;
    }

    try {
      // Actualizar campos individuales si hay cambios
      if (form.name) await putUserName(form.name);
      if (form.email) await putUserEmail(form.email);
      if (form.password) await putUserPassword(form.password);

      // Actualizar estado local
      setUser((prev) => ({
        ...prev,
        name: form.name || prev.name,
        email: form.email || prev.email,
        password: form.password ? "********" : prev.password,
      }));

      setForm({ name: "", email: "", password: "" });
      setAlert({ type: "success", message: "Cambios guardados correctamente." });
    } catch (err) {
      setAlert({ type: "error", message: "Error al guardar cambios." });
    }
  };

  return (
    <div className="flex w-full min-h-screen overflow-x-hidden bg-gray-50">

      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80">
          <AlertBox type={alert.type} message={alert.message} />
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
            isMobile
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 overflow-y-auto w-full">

        <div className="flex items-center justify-between md:hidden mb-4">
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Configuración</h2>
        </div>

        <h2 className="hidden md:block text-xl font-semibold mb-6">
          Configuración del usuario
        </h2>

        <div className="bg-white shadow-md rounded-2xl p-6 max-w-2xl w-full mx-auto">
          <h3 className="text-lg font-medium mb-4 text-gray-800">
            Información actual
          </h3>

          <div className="space-y-3 text-gray-700">
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo:</strong> {user.email}</p>
            <p><strong>Contraseña:</strong> {user.password}</p>
            <p>
              <strong>Rol:</strong>{" "}
              <span className="text-purple-600 capitalize">{user.role}</span>
            </p>
          </div>

          <hr className="my-6" />

          <h3 className="text-lg font-medium mb-4 text-gray-800">
            Actualizar información
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nuevo nombre
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ingresa nuevo nombre"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nuevo correo
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Ingresa nuevo correo"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition"
          >
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
