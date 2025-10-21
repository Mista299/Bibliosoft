import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "../../assets/Biblisoft-logo.png"
import Register from "../../components/Register"
import AlertBox from "../../components/ui/AlertBox"

const API_URL = import.meta.env.VITE_API_URL

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showRegister, setShowRegister] = useState(false)
  const [alert, setAlert] = useState(null)
  const navigate = useNavigate()

  // Auto-cierre de la alerta
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [alert])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setAlert({ type: "error", message: data.error || "Error en el login ❌" })
        return
      }

      setAlert({ type: "success", message: "Inicio de sesión exitoso ✅" })

      // Pequeña pausa para mostrar alerta antes de navegar
      setTimeout(() => navigate("/admin/books"), 1000)
    } catch (err) {
      console.error("Error en login:", err)
      setAlert({ type: "error", message: "No se pudo conectar con el servidor ❌" })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 relative">
      {/* 🔔 Alerta flotante */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80">
          <AlertBox
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email to Log in for this app
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Log in
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">¿No tienes una cuenta?</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          type="button"
          onClick={() => setShowRegister(true)}
          className="w-full bg-[#6650A2] text-white py-2 rounded-md hover:bg-purple-500 transition"
        >
          Register
        </button>

        <p className="text-xs text-center text-gray-500 mt-6">
          By clicking continue, you agree to our{" "}
          <a href="#" className="font-medium text-black underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-black underline">
            Privacy Policy
          </a>
        </p>

        {/* Logo */}
        <div className="mt-8 flex flex-col items-center">
          <img src={logo} alt="BiblioSoft" className="h-100" />
          <p className="text-center text-xl font-serif mt-2">BiblioSoft</p>
        </div>
      </div>

      {/* Modal de registro */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="relative w-full max-w-lg">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm hover:bg-red-600"
            >
              ✕
            </button>
            <Register />
          </div>
        </div>
      )}
    </div>
  )
}
