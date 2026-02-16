import React, { useEffect, useState, useMemo } from "react";
import "./petPages.css";
import { db } from "../../data/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PETS_PER_PAGE = 8;

const PetPages = () => {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [species, setSpecies] = useState("");
  const [order, setOrder] = useState("recentes");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const q = query(collection(db, "pets"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const petsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPets(petsList);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = useMemo(() => {
    let list = [...pets];

    if (species) {
      list = list.filter((pet) => pet.tipoPet === species);
    }

    if (order === "antigos") {
      list.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
    } else {
      list.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
    }

    return list;
  }, [pets, species, order]);

  const totalPages = Math.ceil(filteredPets.length / PETS_PER_PAGE);
  const startIndex = (currentPage - 1) * PETS_PER_PAGE;
  const currentPets = filteredPets.slice(
    startIndex,
    startIndex + PETS_PER_PAGE
  );

  return (
    <div id="adota_Grade">
      {/* MENU */}
      <div id="menu_PetPage">
        <Box className="menu_container">
          <FormControl className="menu_select">
            <InputLabel>Espécie</InputLabel>
            <Select
              value={species}
              label="Espécie"
              onChange={(e) => setSpecies(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="gato">Gato</MenuItem>
              <MenuItem value="cachorro">Cachorro</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="menu_select">
            <InputLabel>Ordenar</InputLabel>
            <Select
              value={order}
              label="Ordenar"
              onChange={(e) => setOrder(e.target.value)}
            >
              <MenuItem value="recentes">Mais recentes</MenuItem>
              <MenuItem value="antigos">Mais antigos</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      {/* CARDS */}
      <div id="grade_Cart">
        {currentPets.map((pet) => (
          <Link
            key={pet.id}
            to="/adocaoPage"
            state={{ pet }}
            className="link_pet"
          >
            <div className="Cart">
              <div className="img_Pet">
                <img src={pet.images?.[0]} alt={pet.nome} />
              </div>

              <div className="pet_Name">
                <h2>{pet.nome}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* PAGINAÇÃO */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetPages;