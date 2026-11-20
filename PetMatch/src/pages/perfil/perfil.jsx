import "../perfil/perfil.css";
import { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../data/firebaseConfig";

const Perfil = () => {
  const user = auth.currentUser;

  const [idade, setIdade] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  // 🔹 Dados salvos
  const [aboutMe, setAboutMe] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [petImages, setPetImages] = useState([]);

  // 🔸 Dados temporários (edição)
  const [tempAboutMe, setTempAboutMe] = useState("");
  const [tempProfileImage, setTempProfileImage] = useState("");
  const [tempPetImages, setTempPetImages] = useState([]);
  const [petImageUrl, setPetImageUrl] = useState("");

  /* ===================== UTIL ===================== */
  const calcularIdade = (birthDate) => {
    const nascimento = birthDate.toDate();
    const hoje = new Date();

    let idadeCalc = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idadeCalc--;
    }

    setIdade(idadeCalc);
  };

  /* ===================== FIRESTORE ===================== */
  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);

      await updateDoc(docRef, {
        aboutMe: tempAboutMe,
        profileImage: tempProfileImage,
        petImages: tempPetImages,
        updatedAt: new Date(),
      });

      setAboutMe(tempAboutMe);
      setProfileImage(tempProfileImage);
      setPetImages(tempPetImages);

      setOpenEdit(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil");
    }
  };

  /* ===================== LOAD USER ===================== */
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.birthDate) calcularIdade(data.birthDate);

        setAboutMe(data.aboutMe || "");
        setProfileImage(data.profileImage || "");
        setPetImages(data.petImages || []);
      }
    };

    fetchUserData();
  }, [user]);

  const handleAddPetImage = () => {
    if (!petImageUrl.trim()) return;

    setTempPetImages((prev) => [...prev, petImageUrl.trim()]);
    setPetImageUrl("");
  };

  const handleRemovePetImage = (index) => {
    setTempPetImages((prev) => prev.filter((_, i) => i !== index));
  };


  return (
    <div id="perfil_grade">

      <div id="info_perfil">
        <div id="perfil_img">
          {profileImage ? (
            <img src={profileImage} alt="Perfil" />
          ) : (
            <div id="imagem"></div>
          )}
        </div>
          <br />
        <h3>{user?.displayName}</h3>
          <br />
        {idade !== null && (
          <p>
            Idade: <strong>{idade} anos</strong>
          </p>
        )}
        <button
          onClick={() => {
            setTempAboutMe(aboutMe);
            setTempProfileImage(profileImage);
            setTempPetImages(petImages);
            setOpenEdit(true);
          }}
        >
          Editar
        </button>
      </div>

      <div>
        <div id="info_perfil2">
          <div id="resumo">
          <h2>about me</h2><br />
            {aboutMe || "Nenhuma descrição adicionada"}
          </div>

          <div id="imagem">
            {profileImage && <img src={profileImage} alt="Perfil" />}
          </div>
        </div>

        <br />

        {petImages.length === 0 ? (
          <p style={{ opacity: 0.7 }}>Você ainda não adicionou pets 🐾</p>
        ) : (
          <div id="petsDono">
            <h3>Meus pets:</h3>
            <div id="GradeImages">
              {petImages.map((img, index) => (
                <img key={index} src={img} alt="pet" />
              ))}
            </div>
          </div>
        )}
      </div>


      {openEdit && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Perfil</h2>

            <label>Foto de Perfil (URL)</label>
            <input
              type="text"
              placeholder="https://exemplo.com/foto.jpg"
              value={tempProfileImage}
              onChange={(e) => setTempProfileImage(e.target.value)}
            />

            <label>About me</label>
            <textarea
              value={tempAboutMe}
              onChange={(e) => setTempAboutMe(e.target.value)}
            />

            <label>Imagem do Pet (URL)</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="https://exemplo.com/pet.jpg"
                value={petImageUrl}
                onChange={(e) => setPetImageUrl(e.target.value)}
              />
              <button type="button" onClick={handleAddPetImage}>
                Adicionar
              </button>
            </div>

            <div className="pets-preview">
              {tempPetImages.map((img, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <img src={img} alt="pet" />
                  <button
                    onClick={() => handleRemovePetImage(index)}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button onClick={() => setOpenEdit(false)}>Cancelar</button>
              <button onClick={handleSaveProfile}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;