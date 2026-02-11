import React from "react";
import "../adicionarPet/adicionarPet.css";
import { useNavigate } from "react-router-dom";
import { useRegisterPet } from "../../hooks/useRegisterPet";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const AdicionarPet = () => {
  const [nome, setNome] = React.useState("");
  const [tipoPet, setTipoPet] = React.useState("");
  const [idadePet, setIdadePet] = React.useState("");
  const [vacinado, setVacinado] = React.useState("");
  const [vermifugado, setVermifugado] = React.useState("");
  const [motivo, setMotivo] = React.useState("");
  const [error, setError] = React.useState("");

  const { registerPet } = useRegisterPet();
  const navigate = useNavigate();

  const handleRegisterPet = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !nome ||
      !tipoPet ||
      !idadePet ||
      !vacinado ||
      !vermifugado ||
      !motivo
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    const result = await registerPet({
      nome,
      tipoPet,
      idadePet,
      vacinado,
      vermifugado,
      motivo,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <div id="AdicionarPetGrade">
      <Box
        id="AdicionarPet"
        component="form"
        onSubmit={handleRegisterPet}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <h1>Registrar Pet</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TextField
          label="Nome do pet"
          required
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel required>Tipo de pet</FormLabel>
            <RadioGroup value={tipoPet} onChange={(e) => setTipoPet(e.target.value)}>
              <FormControlLabel value="gato" control={<Radio />} label="Gato" />
              <FormControlLabel value="cachorro" control={<Radio />} label="Cachorro" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <FormLabel required>Idade</FormLabel>
            <RadioGroup value={idadePet} onChange={(e) => setIdadePet(e.target.value)}>
              <FormControlLabel value="menos_1" control={<Radio />} label="Menos de 1 ano" />
              <FormControlLabel value="1_a_4" control={<Radio />} label="1 a 4 anos" />
              <FormControlLabel value="mais_4" control={<Radio />} label="+4 anos" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel required>Vacinado?</FormLabel>
            <RadioGroup value={vacinado} onChange={(e) => setVacinado(e.target.value)}>
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <FormLabel required>Vermifugado?</FormLabel>
            <RadioGroup value={vermifugado} onChange={(e) => setVermifugado(e.target.value)}>
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>
        </Box>

        <TextareaAutosize
          minRows={4}
          placeholder="Descreva o motivo para cadastro / adoção"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          style={{ width: "100%",height: "50px", padding: 10 }}
        />

        <Button variant="contained" type="submit" sx={{ alignSelf: "center" }}>
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default AdicionarPet;
