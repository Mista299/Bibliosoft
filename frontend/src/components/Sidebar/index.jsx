import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL

export default function Sidebar({ links, onClose, isMobile = false }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        Cookies.remove("token");
        if (onClose) onClose(); // cerrar drawer si está en móvil
        navigate("/login", { replace: true });
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  return (
    <aside
      onClick={(e) => e.stopPropagation()} // evita que el click dentro cierre el overlay
      className={`flex flex-col justify-between h-screen
        w-64 md:w-60 transition-all duration-300
        bg-gradient-to-b from-purple-200 via-purple-100 to-purple-50
        border-r border-purple-200 shadow-sm`}
    >
      {/* CABECERA MÓVIL */}
      {isMobile && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-purple-200 bg-purple-100">
          <span className="text-lg font-semibold text-purple-900">Menú</span>
          <button
            onClick={() => onClose && onClose()}
            aria-label="Cerrar menú"
            className="p-1.5 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <X className="h-5 w-5 text-purple-700" />
          </button>
        </div>
      )}

      {/* ENLACES */}
      <nav className={`flex flex-col gap-1 mt-4 px-4`}>
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-purple-300 text-purple-900 shadow-inner"
                  : "text-gray-700 hover:bg-purple-200 hover:text-purple-900"
              }`
            }
            onClick={() => {
              if (isMobile && onClose) onClose(); // cerrar al tocar en móvil
            }}
          >
            <Icon className="h-5 w-5" />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* CERRAR SESIÓN */}
      <div className="px-4 py-4 border-t border-purple-200 bg-purple-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
