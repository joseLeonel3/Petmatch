import "./login.css"
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Bolinha from "../../images/bolinhaDeGato.png";
import Patinha from "../../images/patinhaGato.png";

const Login = () => {
  return (
    <>
  <div id="loginGrade" >
    <img src={Patinha} id='Patinha' alt="" />
  
  <Box
      id="gradeLogin"
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
      }}
    >
      
      <h1>Login:</h1>
        <div>
          <p>
            New user? <Link to="/register" id="corsinha"> Register</Link>
          </p>
        </div>
      <TextField  label="Email" type="text" />
      <TextField  label="senha" type="password" />

      <Button variant="contained">
        Enviar
      </Button>
  </Box>  

    <img src={Bolinha} id='Bolinha' alt="" />
 
  </div>  

    
    </>
  );
};

export default Login;
