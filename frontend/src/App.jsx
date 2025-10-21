import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import UserPanel from "./pages/UserPanel"
import Login from "./pages/Login"
import Adminbooks from "./pages/Adminbooks"
import AdminReturns from "./pages/AdminReturns"


function App() {
  return (
      <Routes>
        {/* <Route path="/user" element={<UserPanel />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/books" element={<Adminbooks />} />
        <Route path="/admin/loans" element={<AdminReturns />} />

      </Routes>
  )
}

export default App
