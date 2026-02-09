import React from 'react'
import { Link } from "react-router-dom";
import "../components/navbar.css"
import Button from '@mui/material/Button';
import Logo from "../images/logo.png" 

const navbarComponent = () => {
    const buttonStyle = {
  backgroundColor: "#D98C9A",
  "&:hover": {
    backgroundColor: "#c97b89"
  }

}

  return (
    <>
    <nav id='navbar_container'>
    
    <Link id='home' to="/"><img src={Logo} id='logo' alt="" /></Link>

 
      <ul>
        <li>
          <Button
            component={Link}
            to="/adotar"
            variant="contained"
            sx={buttonStyle}
            fullWidth
          >
            Adotar
          </Button>
        </li>

        <li>
          <Button
            component={Link}
            to="/poremadocao"
            variant="contained"
            sx={buttonStyle}
            fullWidth
          >
            Por em adoção
          </Button>
        </li>

        <li>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={buttonStyle}
            fullWidth
          >
            Login
          </Button>
        </li>
      </ul>

    </nav>

    </>
  )
}

export default navbarComponent