import { useParams, useLocation } from "react-router-dom";
import { useChat } from "../../hooks/useChat";
import Message from "../../components/Message";
import ChatInput from "../../components/ChatInput";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../data/firebaseConfig";
import "../chat/chat.css";

const Chat = () => {
  const { chatId } = useParams();
  const location = useLocation();

  const [pet, setPet] = useState(location.state?.pet || null);

  const { messages, sendMessage } = useChat(chatId);

  useEffect(() => {
    const fetchPet = async () => {
      if (!chatId) return;

      const parts = chatId.split("_");
      const petId = parts[2];

      if (!petId) return;

      const docRef = doc(db, "pets", petId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPet({ id: docSnap.id, ...docSnap.data() });
      } else {
        setPet({ nome: "Pet não encontrado", images: [] });
      }
    };

    if (!pet) fetchPet();
  }, [chatId]);

  return (
    <div className="chat-container">

      <h2>Chat</h2>

      <h3>
        Conversando sobre: {pet?.nome || "Carregando..."} 🐾
      </h3>

      <img
        className="chat-pet-image"
        src={pet?.images?.[0] || "/sem-imagem.png"}
        alt={pet?.nome}
      />

      <div className="chat-messages">
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </div>

      <ChatInput sendMessage={sendMessage} />

    </div>
  );
};

export default Chat;