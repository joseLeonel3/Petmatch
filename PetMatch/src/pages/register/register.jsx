import React from "react";
import "../register/register.css";

import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { Timestamp } from "firebase/firestore";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useRegister();

  const [birthDate, setBirthDate] = React.useState(null);

  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [nome, setNome] = React.useState("");
  const [nmrContato, setNmrContato] = React.useState("");

  const [perfilPet, setPerfilPet] = React.useState("");
  const [error, setError] = React.useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (email !== confirmEmail) {
      setError("Os emails precisam ser iguais.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (!perfilPet) {
      setError("Selecione se você possui pet ou não.");
      return;
    }

    if (!birthDate) {
      setError("Informe sua data de nascimento.");
      return;
    }

    const result = await registerUser({
      email,
      password,
      nome,
      perfilPet,
      nmrContato,
      birthDate: Timestamp.fromDate(new Date(birthDate)),
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/perfil");
  };

  return (
    <div id="registerGrade">
      <Box
        id="registerLogin"
        component="form"
        onSubmit={handleRegister}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
        }}
      >
        <h1>Register:</h1>

        <p>
          Have account? <Link to="/login" id="corsinha">Login</Link>
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TextField
          label="Nome"
          required
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Confirm Email"
            required
            fullWidth
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Senha"
            required
            type="password"
            inputProps={{ minLength: 6 }}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Senha"
            required
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>

        <TextField
          label="Número de contato"
          required
          fullWidth
          placeholder="(11) 99999-9999"
          value={nmrContato}
          onChange={(e) => setNmrContato(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel>Perfil de Adoção</FormLabel>
            <RadioGroup
              value={perfilPet}
              onChange={(e) => setPerfilPet(e.target.value)}
            >
              <FormControlLabel value="possui" control={<Radio />} label="Possui pet" />
              <FormControlLabel value="nao_possui" control={<Radio />} label="Não possui pet" />
            </RadioGroup>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data de Nascimento"
              value={birthDate}
              onChange={(newValue) => setBirthDate(newValue)}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
            />
          </LocalizationProvider>
        </Box>

        <Button variant="contained" type="submit" sx={{ alignSelf: "center" }}>
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default Register;