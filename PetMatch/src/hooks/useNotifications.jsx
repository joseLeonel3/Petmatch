import { useEffect, useState } from "react";
import { db, auth } from "../data/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      const notifs = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        if (
          data.participants?.includes(user.uid) &&
          data.lastMessage &&
          data.lastMessage.senderId !== user.uid
        ) {
          notifs.push({
            chatId: doc.id,
            ...data
          });
        }
      });

      setNotifications(notifs);
    });

    return () => unsubscribe();
  }, []);

  return { notifications };
};