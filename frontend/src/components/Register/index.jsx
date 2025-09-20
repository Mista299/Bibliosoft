import { useState } from "react"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [cedula, setCedula] = useState("")
  const [confirmarContrasena, setConfirmarContrasena] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email:", email, "Password:", password,"Nombre:", nombre, "Cédula:", cedula, "Confirmar Contraseña:", confirmarContrasena)
    // aquí luego conectas con tu backend
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-300">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Register</h1>
        <p className="text-gray-600 text-center mb-6">
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="cedula"
            placeholder="Identification number"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="nombre"
            placeholder="Full name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="confirmarContrasena"
            placeholder="Confirm password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>

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
      </div>
    </div>
  )
}
