import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import UserPanel from "./pages/UserPanel"
import Login from "./pages/Login"
import Adminbooks from "./pages/Adminbooks"

function App() {
  return (
      <Routes>
        {/* <Route path="/user" element={<UserPanel />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/admin/books" element={<Adminbooks />} />
      </Routes>
  )
}

export default App
