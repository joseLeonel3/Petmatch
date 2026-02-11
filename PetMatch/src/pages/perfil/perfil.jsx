import "../perfil/perfil.css";
import { useEffect, useState } from "react";
import { auth, db } from "../../data/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Perfil = () => {
  const user = auth.currentUser;

  const [idade, setIdade] = useState(null);

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.birthDate) {
          calcularIdade(data.birthDate);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div id="perfil_grade">
      <div id="info_perfil">
        <div id="perfil_img">
          <h1>Perfil</h1>
        </div>

        <h3>{user?.displayName}</h3>
        <br />
        {idade !== null && (
          <p>
            Idade: <strong>{idade} anos</strong>
          </p>
        )}
      </div>

      <div>
        <div id="info_perfil2">
          <div id="resumo">botafogo</div>
          <div id="imagem">.</div>
        </div>
        <br />

        <div id="petsDono">
          <div><h3>Meus pets:</h3></div>
          <br />
          <div id="GradeImages">
            <div id="imagem">.</div>
            <div id="imagem">.</div>
            <div id="imagem">.</div>
          </div>
        </div>
        <br />

        <div id="petsAdotar">
          <div><h3>Pets em Adoção:</h3></div>
          <br />
          <div id="GradeImages">
            <div id="imagem">.</div>
            <div id="imagem">.</div>
            <div id="imagem">.</div>
          </div>          
        </div>
      </div>

    </div>
  );
};

export default Perfil;
