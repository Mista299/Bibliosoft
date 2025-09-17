import { useState } from "react"
import logo from "../../assets/Biblisoft-logo.png"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email:", email, "Password:", password)
    // aquí luego conectas con tu backend
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
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
          <img
            src={logo} // cámbialo por tu logo en /public
            alt="BiblioSoft"
            className="h-100"
          />
          <p className="text-center text-xl font-serif mt-2">BiblioSoft</p>
        </div>
      </div>
    </div>
  )
}
