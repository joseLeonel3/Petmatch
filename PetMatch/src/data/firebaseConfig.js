import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu7fj10c3_Ka1MjY7zJvgPFrUCXtQfJB0",
  authDomain: "readyou-4b792.firebaseapp.com",
  projectId: "readyou-4b792",
  storageBucket: "readyou-4b792.firebasestorage.app",
  messagingSenderId: "642729907506",
  appId: "1:642729907506:web:ea3c43b95ba76d9581332b"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// EXPORTS CORRETOS
export const auth = getAuth(app);
export const db = getFirestore(app);
