import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Bolinha from "../../images/bolinhaDeGato.png";
import Patinha from "../../images/patinhaGato.png";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../data/firebaseConfig";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/perfil");
    } catch{
      alert("Email ou senha inválidos");
    }
  };

  return (
    <div id="loginGrade">
      <img src={Patinha} id="Patinha" alt="" />

      <Box
        id="gradeLogin"
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 400,
        }}
      >
        <h1>Login:</h1>

        <p>
          New user? <Link to="/register" id="corsinha">Register</Link>
        </p>

        <TextField
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </Box>

      <img src={Bolinha} id="Bolinha" alt="" />
    </div>
  );
};

export default Login;