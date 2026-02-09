import { Outlet } from "react-router-dom"
import Navbar from "../components/navbarComponent"
import Footer from "../components/footer"

const DefaultLayout = () => {
return (
    <div className="layout">
      <Navbar />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default DefaultLayout
