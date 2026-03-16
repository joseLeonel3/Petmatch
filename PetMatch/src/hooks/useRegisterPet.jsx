import { auth, db } from "../data/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const useRegisterPet = () => {
  const registerPet = async ({
    nome,
    tipoPet,
    idadePet,
    vacinado,
    vermifugado,
    motivo,
    images,
    
  }) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return { success: false, message: "Usuário não autenticado." };
      }

      if (!images || images.length < 3) {
        return {
          success: false,
          message: "Informe no mínimo 3 URLs de imagens.",
        };
      }

      const petRef = await addDoc(collection(db, "pets"), {
        nome,
        tipoPet,
        idadePet,
        vacinado,
        vermifugado,
        motivo,
        images,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      return { success: true, petId: petRef.id };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro ao cadastrar o pet.",
      };
    }
  };

  return { registerPet };
};
