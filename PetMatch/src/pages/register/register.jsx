import { Link } from "react-router-dom";
import "../register/register.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import * as React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Register = () => {
  const [birthDate, setBirthDate] = React.useState(null);

  return (
    <div id="registerGrade">
      <Box
        id="registerLogin"
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
        }}
      >
        <h1>Register:</h1>

        <div>
          <p>
            Have account? <Link to="/Login" id="corsinha">Login</Link>
          </p>
        </div>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Email" type="text" fullWidth />
          <TextField label="Confirm Email" type="text" fullWidth />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Senha" type="password" fullWidth />
          <TextField label="Confirm Senha" type="password" fullWidth />
        </Box>

        {/* Radio + Data lado a lado */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel id="demo-radio-buttons-group-label">Perfil de Adoção</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Possui pet" />
              <FormControlLabel value="male" control={<Radio />} label="Não possui pet" />
            </RadioGroup>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month"]}
              label="Data de Nascimento"
              value={birthDate}
              onChange={(newValue) => setBirthDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Box>

        <Button variant="contained" sx={{ alignSelf: "flex-center" }}>
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default Register;
