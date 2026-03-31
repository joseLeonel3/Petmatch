import { useEffect, useState } from "react";
import { db, auth } from "../data/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

export const useChat = (chatId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
  if (!chatId) return;

  console.log("🔥 ESCUTANDO CHAT:", chatId);

  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    console.log("📩 Mensagens recebidas:", snapshot.docs.length);

    const msgs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setMessages(msgs);
  });

  return () => unsubscribe();
}, [chatId]);

const sendMessage = async (text) => {
  const user = auth.currentUser;

  if (!text.trim() || !user) return;

  // 🔥 envia mensagem
  await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    senderId: user.uid,
    createdAt: serverTimestamp()
  });

  // 🔥 extrai ids do chat
  const [user1, user2, petId] = chatId.split("_");

  // 🔥 salva dados do chat corretamente
  await setDoc(
    doc(db, "chats", chatId),
    {
      participants: [user1, user2], // ✅ CORRETO
      petId,
      lastMessage: {
        text,
        senderId: user.uid,
        createdAt: serverTimestamp()
      }
    },
    { merge: true }
  );
};

  return { messages, sendMessage };
};