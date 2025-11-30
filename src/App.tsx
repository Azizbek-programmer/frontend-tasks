import { Route, Routes, Navigate } from "react-router-dom"
import { Login } from "./pages/auth/login"
import { Register } from "./pages/auth/register"
import { MainLayout } from "./layout/main-layout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/app" element={<MainLayout />} />
    </Routes>
  )
}

export default App
