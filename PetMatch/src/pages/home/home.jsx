import "../home/home.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button
} from "@mui/material";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../data/firebaseConfig";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PetSlide = ({ titulo, pets }) => {
  if (!pets.length) return null;

  return (
    <div className="slideCardGrade">
      <h1>{titulo}</h1>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 }
        }}
      >
        {pets.map((pet) => (
          <SwiperSlide key={pet.id}>
            <Card sx={{ borderRadius: 3, height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={pet.images?.[0]}
                alt={pet.nome}
              />

              <CardContent>
                <Typography variant="h6">{pet.nome}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {pet.motivo.slice(0, 20)}...
                </Typography>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: "#D98C9A" }}
                  component={Link}
                  to="/adocaoPage"
                  state={{ pet }}
                >
                  Ver detalhes
                </Button>
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Home = () => {
  const [gatos, setGatos] = useState([]);
  const [cachorros, setCachorros] = useState([]);
  const [loading, setLoading] = useState(true);

  const images = [
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e",
    "https://plus.unsplash.com/premium_photo-1675848493910-5474ee04c3e3",
    "https://plus.unsplash.com/premium_photo-1731693607351-d4f74ac3f7c6"
  ];

  useEffect(() => {
    const loadPets = async () => {
      try {
        const petsRef = collection(db, "pets");

        const [gatosSnap, cachorrosSnap] = await Promise.all([
          getDocs(query(petsRef, where("tipoPet", "==", "gato"))),
          getDocs(query(petsRef, where("tipoPet", "==", "cachorro")))
        ]);

        setGatos(gatosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setCachorros(cachorrosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Erro ao buscar pets:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  return (
    <div id="homeGrade">
      <Box id="slide">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={img}
                sx={{
                  width: "100%",
                  height: 450,
                  objectFit: "cover",
                  borderRadius: 2
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {loading ? (
        <p>Carregando pets...</p>
      ) : (
        <>
          <PetSlide titulo="Gatos" pets={gatos} />
          <PetSlide titulo="Cachorros" pets={cachorros} />
        </>
      )}
    </div>
  );
};

export default Home;