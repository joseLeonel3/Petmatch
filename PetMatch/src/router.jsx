import { BrowserRouter, Routes, Route } from "react-router-dom"

import DefaultLayout from "./layout/DefaultLayout"
import Home from "./pages/home/home"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import Perfil from "./pages/perfil/perfil"
import PrivateRoute from "./components/PrivateRoute";
import AdicionarPet from "./pages/adicionarPet/adicionarPet"
import PetPages from "./pages/petPage/petPages"
import AdocaoPage from "./pages/adocaoPage/adocaoPage"
import Chat from "./pages/chat/chat"
import Notificacoes from "./pages/notificacoes/notificacoes"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DefaultLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AdicionarPet" element={<AdicionarPet />} />
          <Route path="/PetPages" element={<PetPages />} />
          <Route path="/adocaoPage" element={<AdocaoPage />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          
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
