import { auth, db } from "../data/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const useRegisterPet = () => {
  const registerPet = async ({
    nome,
    tipoPet,
    idadePet,
    vacinado,
    vermifugado,
    motivo,

  }) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return { success: false, message: "Usuário não autenticado." };
      }

      const petRef = await addDoc(collection(db, "pets"), {
        nome,
        tipoPet,
        idadePet,
        vacinado,
        vermifugado,
        motivo,
        userId: user.uid,
        createdAt: new Date(),
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
