import { useEffect, useState } from "react";
import { db, auth } from "../data/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

export const useChat = (chatId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
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

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text,
      senderId: user.uid,
      createdAt: serverTimestamp()
    });
  };

  return { messages, sendMessage };
};