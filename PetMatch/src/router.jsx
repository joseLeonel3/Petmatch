import { BrowserRouter, Routes, Route } from "react-router-dom"

import DefaultLayout from "./layout/DefaultLayout"
import Home from "./pages/home/home"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import Perfil from "./pages/perfil/perfil"
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* LAYOUT ÚNICO PARA TODAS AS ROTAS */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
