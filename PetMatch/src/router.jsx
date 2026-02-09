import { BrowserRouter, Routes, Route } from "react-router-dom"

import DefaultLayout from "./layout/DefaultLayout"
import Home from "./pages/home/home"
import Login from "./pages/login/login"
import Register from "./pages/register/register"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* LAYOUT ÚNICO PARA TODAS AS ROTAS */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
