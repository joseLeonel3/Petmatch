import { signOut } from "firebase/auth";
import { auth } from "../data/firebaseConfig";

export const useLogout = () => {
  const logout = async () => {
    await signOut(auth);
  };

  return { logout };
};
