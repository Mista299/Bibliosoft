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
      setTimeout(() => {
        if (data.role === "admin") navigate("/admin/books")
        else if (data.role === "user") navigate("/user/books")
        else setAlert({ type: "error", message: "Rol desconocido ❌" })
      }, 1000)
    } catch (err) {
      console.error("Error en login:", err)
      setAlert({ type: "error", message: "No se pudo conectar con el servidor ❌" })
    }
  }

  const images = [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80"
  ]

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden bg-gray-50">
      {/* Fondo collage más oscuro */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Library ${i}`}
          className="absolute inset-0 w-full h-full object-cover opacity-35 animate-fadeIn"
          style={{
            zIndex: -i,
            transform: `translate(${i * 15}px, ${i * 10}px) rotate(${i * 2}deg)`
          }}
        />
      ))}

      {alert && (
        <div className="fixed top-4 right-4 z-50 w-80">
          <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        </div>
      )}

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-md p-6 border border-gray-200 animate-slideUp z-10">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="BiblioSoft"
            className="h-32 sm:h-70 mb-0 animate-bounce" // aumenté la altura
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-black">BiblioSoft</h1>
        </div>  
        <div className="mb-6 p-3 bg-gray-100 rounded-md border-l-4 border-black animate-fadeIn">
          <p className="font-semibold text-gray-700">Credenciales de prueba:</p>
          <p><span className="font-bold">Admin:</span> michaelpk1999@gmail.com / mistaadmin123+</p>
          <p><span className="font-bold">Usuario:</span> juanz@gmail.com / Juan123+ / cc 165165</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-white px-1 text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>

          <div className="relative">
            <label className="absolute -top-3 left-3 bg-white px-1 text-sm text-gray-600">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition transform hover:scale-105 font-semibold"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">¿No tienes cuenta?</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          type="button"
          onClick={() => setShowRegister(true)}
          className="w-full bg-[#6650A2] text-white py-2 rounded-md hover:bg-purple-500 transition transform hover:scale-105 font-semibold"
        >
          Registrarse
        </button>
      </div>

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

      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideUp { animation: slideUp 0.5s ease-out; }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 1s ease-in; }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce { animation: bounce 2s infinite; }
        `}
      </style>
    </div>
  )
}
