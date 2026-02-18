import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../adocaoPage/adocaoPage.css";

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

        {dono && (
          <div id="donoPet">
            <h2>Dono do Pet</h2>

            <div className="donoCard">
              <img
                src={dono.profileImage || "/avatar.png"}
                alt="Dono"
                className="donoAvatar"
              />

              <div className="donoInfo">
                <p><h4>Nome:</h4> {dono.nome}</p>
                <p>
                  <h4>Possui pet:</h4>{" "}
                  {dono.perfilPet === "possui" ? "Sim" : "Não"}
                </p>
                <p>
                  <h4>numero de contato:</h4>{" "}
                  {dono.nmrContato || "Não informado"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdocaoPage;
