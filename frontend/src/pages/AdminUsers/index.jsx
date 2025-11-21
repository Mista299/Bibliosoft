import { useState, useEffect } from "react";
import { Menu, User, Book, ClipboardList, Settings, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

import Sidebar from "@/components/Sidebar";
import AlertBox from "@/components/ui/AlertBox";

import UsersTable from "@/components/users/UsersTable.jsx";
import UsersList from "@/components/users/UsersList";
import SearchBar from "@/components/SearchBar";

import EditUserDialog from "@/components/users/EditUserDialog";
import RegisterUser from "@/components/users/RegisterUser";
import BorrowedBooksDialog from "@/components/users/BorrowedBooksDialog";

import {
  fetchUsers,
  updateUserName,
  updateUserEmail,
  deleteUser,
  createUser,
  getBorrowedBooksByAdmin,
} from "@/services/userService";

import { formatError } from "@/utils/formatError";

import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const sidebarLinks = [
    { name: "Configuración", path: "/admin/settings", icon: Settings },
    { name: "Usuarios", path: "/admin/users", icon: User },
    { name: "Libros", path: "/admin/books", icon: Book },
    { name: "Préstamos", path: "/admin/loans", icon: ClipboardList },
    { name: "Devoluciones", path: "/admin/returns", icon: RotateCcw },
  ];

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const [borrowedOpen, setBorrowedOpen] = useState(false);
  const [borrowedList, setBorrowedList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  // ==========================================================
  // Cargar usuarios
  // ==========================================================
  useEffect(() => {
    setLoading(true);

    fetchUsers()
      .then((data) => setUsers(data))
      .catch((err) => {
        setAlert({
          type: "error",
          message: formatError(err),
        });

        if (err.status === 401) navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // ==========================================================
  // Autocerrar alertas
  // ==========================================================
  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(null), 4000);
    return () => clearTimeout(t);
  }, [alert]);

  // ==========================================================
  // Editar usuario
  // ==========================================================
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (id, { name, email }) => {
    try {
      if (name) {
        await updateUserName(id, { name });
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, name } : u)));
      }
      if (email) {
        await updateUserEmail(id, { email });
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, email } : u)));
      }

      setAlert({ type: "success", message: "Usuario actualizado correctamente." });
      setIsEditOpen(false);
    } catch (err) {
      setAlert({ type: "error", message: formatError(err) });
    }
  };

  // ==========================================================
  // Eliminar usuario
  // ==========================================================
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));

      setAlert({ type: "success", message: "Usuario eliminado." });
    } catch (err) {
      setAlert({ type: "error", message: formatError(err) });
    }
  };

  // ==========================================================
  // Registrar usuario
  // ==========================================================
  const handleAddUser = async (newUser) => {
    try {
      const created = await createUser(newUser);
      const user = created.user ?? created;

      setUsers((prev) => [...prev, user]);
      setRegisterOpen(false);

      setAlert({ type: "success", message: "Usuario creado correctamente." });
    } catch (err) {
      setAlert({ type: "error", message: formatError(err) });
    }
  };

  // ==========================================================
  // Préstamos del usuario
  // ==========================================================
  const handleOpenBorrowed = async (user) => {
    try {
      setSelectedUser(user);
      setBorrowedList([]);
      setBorrowedOpen(true);

      const resp = await getBorrowedBooksByAdmin(user.id);
      setBorrowedList(resp.borrowedBooks ?? resp.books ?? []);
    } catch (err) {
      setAlert({ type: "error", message: formatError(err) });
      setBorrowedOpen(false);
    }
  };

  // ==========================================================
  // Filtrar usuarios
  // ==========================================================
  const filtered = users.filter((u) => {
    const t = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(t) ||
      u.email?.toLowerCase().includes(t) ||
      (u.id || "").includes(search)
    );
  });

  // ==========================================================
  // Render
  // ==========================================================
  return (
    <div className="flex w-full min-h-screen overflow-hidden">

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
        <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar links={sidebarLinks} isMobile onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto flex flex-col w-full max-w-full">

        {/* Header móvil */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Administración — Usuarios</h2>
        </div>

        {/* Header desktop */}
        <h2 className="hidden md:block text-xl font-semibold mb-4">
          Administración — Usuarios
        </h2>

        {/* Buscador + Agregar */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Buscar usuario por nombre o cédula..."
          addLabel="Registrar usuario"
          onAdd={() => setRegisterOpen(true)}
        />

        {loading && <p className="text-gray-500">Cargando usuarios...</p>}

        {/* TABLA DESKTOP */}
        <div className="hidden md:block w-full">
          <UsersTable
            users={filtered}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onOpenBorrowed={handleOpenBorrowed}
          />
        </div>

        {/* LISTA MOBILE - ARREGLADA */}
        <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
          <UsersList
            users={filtered}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onOpenBorrowed={handleOpenBorrowed}
          />
        </div>

        {/* MODALES */}
        <EditUserDialog
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          user={selectedUser}
          onSave={handleSaveEdit}
        />

        <RegisterUser
          open={registerOpen}
          onClose={() => setRegisterOpen(false)}
          onSubmit={handleAddUser}
        />

        <BorrowedBooksDialog
          open={borrowedOpen}
          onClose={() => setBorrowedOpen(false)}
          user={selectedUser}
          borrowed={borrowedList}
        />
      </div>
    </div>
  );
}
