
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Adminbooks from "./pages/Adminbooks";
import UserLoansPanel from "./pages/UserLoansPanel";
import AdminReturns from "./pages/AdminReturns";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/books" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/books" element={<Adminbooks />} />
      <Route path="/admin/returns" element={<AdminReturns />} />
      <Route path="/user/books" element={<UserLoansPanel />} />
      <Route path="/admin/settings" element={<SettingsPage />} />
      <Route
        path="*"
        element={
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold text-red-600 mb-2">404</h2>
            <p className="text-gray-600">Página no encontrada</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
