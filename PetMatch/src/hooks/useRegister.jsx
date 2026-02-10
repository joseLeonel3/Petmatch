import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../data/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const useRegister = () => {
  const registerUser = async ({ email, password, nome, perfilPet, birthDate }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // ✅ CORREÇÃO: salva o nome no Auth
      await updateProfile(user, {
        displayName: nome,
      });

      // salva no Firestore
      await setDoc(doc(db, "users", user.uid), {
        nome,
        email,
        perfilPet,
        birthDate,
        createdAt: new Date(),
      });

      return { success: true };
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return { success: false, message: "Este email já está cadastrado." };
      }

      return { success: false, message: "Erro ao criar conta." };
    }
  };

  return { registerUser };
};
