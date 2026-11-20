import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { auth, db } from "../data/firebaseConfig";

import {
  doc,
  setDoc
} from "firebase/firestore";

export const useRegister = () => {

  const registerUser = async ({
    email,
    password,
    nome,
    perfilPet,
    birthDate,
    nmrContato
  }) => {

    try {

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: nome
      });

      await setDoc(doc(db, "users", user.uid), {
        nome,
        email: email.trim(),
        perfilPet,
        birthDate,
        nmrContato,
        createdAt: new Date()
      });

      return { success: true };

    } catch (error) {

      console.error("ERRO FIREBASE:", error);
      console.error("CÓDIGO:", error.code);
      console.error("MENSAGEM:", error.message);

      return {
        success: false,
        message: error.message,
        code: error.code
      };

    }
  };

  return { registerUser };
};