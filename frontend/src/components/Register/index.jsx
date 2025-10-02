import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [cedula, setCedula] = useState("")
  const [confirmarContrasena, setConfirmarContrasena] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validación rápida antes de enviar
    if (password !== confirmarContrasena) {
      alert("Las contraseñas no coinciden ❌")
      return
    }

    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: cedula, // 👈 tu backend espera `id`
          name: nombre,
          email,
          password,
          vpassword: confirmarContrasena,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        // Si hay errores de validación de Zod
        if (data.errors) {
          alert(data.errors.map((err) => err.message).join("\n"))
        } else {
          alert(data.error || "Error registrando usuario")
        }
        return
      }

      alert("✅ Usuario registrado con éxito")
      console.log("Nuevo usuario:", data.user)

      // aquí podrías cerrar el modal automáticamente
      // onClose() si recibes la prop desde el Login
    } catch (err) {
      console.error("Error en registro:", err)
      alert("No se pudo conectar con el servidor ❌")
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h1 className="text-2xl font-bold text-center mb-2">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Identification number"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="text"
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
          type="password"
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
    </div>
  )
}
