import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../adocaoPage/adocaoPage.css";
import { auth } from "../../data/firebaseConfig";
import { generateChatId } from "../chat/chat";

import {
  Typography,
  Button
} from "@mui/material";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../data/firebaseConfig";

const AdocaoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pet = location.state?.pet;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dono, setDono] = useState(null);

useEffect(() => {
  const fetchDono = async () => {
    if (!pet?.userId) return; 

    try {
      const docRef = doc(db, "users", pet.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDono(docSnap.data());
      }
    } catch (error) {
      console.error("Erro ao buscar dono:", error);
    }
  };

  fetchDono();
}, [pet]);


  if (!pet) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Pet não encontrado 🐾</h2>
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>
    );
  }

  const idadeLabel = {
    menos_1: "Menos de 1 ano",
    "1_a_4": "1 a 4 anos",
    mais_4: "Mais de 4 anos",
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === pet.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? pet.images.length - 1 : prev - 1
    );
  };



const abrirChat = () => {
  const user = auth.currentUser;

  if (!user || !pet?.userId || !pet?.id) {
    console.log("Dados inválidos pro chat");
    return;
  }

  const ids = [pet.userId, user.uid].sort();

  const chatId = `${ids[0]}_${ids[1]}_${pet.id}`;

  console.log("Indo para chat:", chatId);

  navigate(`/chat/${chatId}`, {
    state: { pet }
  });

  console.log("Usuário logado:", user.uid);
  console.log("Dono do pet:", pet.userId);
};

  return (
    <div id="adocaoGrade">

      <div id="petImg" className="slider">
        <button className="slider-btn left" onClick={prevImage}>◀</button>

        <img src={pet.images[currentIndex]} alt={pet.nome} />

        <button className="slider-btn right" onClick={nextImage}>▶</button>
      </div>

      <div id="topoPet">
        <div id="infoPet">
          <h2>{pet.nome}</h2>
          <br />
          <p><strong>Descrição / Motivo:</strong></p>
          <br />
          <p>{pet.motivo}</p>
          
          <br />
          <hr />
          <br />
          
          <div id="infoEspeciPet">
            <p><strong>Tipo:</strong> {pet.tipoPet === "gato" ? "Gato 🐱" : "Cachorro 🐶"}</p>
            <p><strong>Idade:</strong> {idadeLabel[pet.idadePet]}</p>
            <p><strong>Vacinado:</strong> {pet.vacinado === "sim" ? "Sim ✅" : "Não ❌"}</p>
            <p><strong>Vermifugado:</strong> {pet.vermifugado === "sim" ? "Sim ✅" : "Não ❌"}</p>
          </div>


        </div>

<div id="donoPet">
  <h2>Dono do Pet</h2>

  {dono ? (
    <div className="donoCard">
      <img
        src={dono.profileImage || "/avatar.png"}
        alt="Dono"
        className="donoAvatar"
      />

      <div className="donoInfo">
        <p><strong>Nome:</strong> {dono.nome}</p>
        <p>
          <strong>Possui pet:</strong>{" "}
          {dono.perfilPet === "possui" ? "Sim" : "Não"}
        </p>
        <p>
          <strong>Número de contato:</strong>{" "}
          {dono.nmrContato || "Não informado"}
        </p>
      </div>
    </div>
  ) : (
    <p>Carregando dono...</p>
  )}

  <div id="botaoChatGrade">
    <Button
      fullWidth
      variant="contained"
      sx={{ backgroundColor: "#366e2f" }}
      onClick={abrirChat}
    >
      Conversar com dono
    </Button>
  </div>
</div>
      </div>
    </div>
  );
};

export default AdocaoPage;
